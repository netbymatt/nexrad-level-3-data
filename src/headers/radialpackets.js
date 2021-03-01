// register packet parsers

const { packets } = require('../packets');

const parse = (raf, productDescription, layerCount) => {
	const layers = [];
	for (let layer = 0; layer < layerCount; layer += 1) {
		// the first layer divider and layer length are consumed by the symbology header, all layers after this must consume these here
		if (layer > 0) {
			const layerDivider = raf.readShort();
			const layerLength = raf.readShort();
			if (layerDivider !== -1) throw new Error(`Invalid layer divider ${layerDivider} in layer ${layerDivider}`);
			if (layerLength + raf.getPos() > raf.getLength()) throw new Error(`Layer size overruns block size for layer ${layer}`);
		}

		// get the packet code and then jump back in the file so it can be consumed by the packet parser
		const packetCode = raf.readUShort();
		raf.skip(-2);

		// turn into hex packet code
		const packetCodeHex = packetCode.toString(16).padStart(4, '0');

		// look up the packet code
		const packet = packets[packetCode];
		// first layer always results in an error
		if (!packet && layer === 0) throw new Error(`Unsupported packet code 0x${packetCodeHex}`);
		if (!packet) {
			console.warn(`Unsupported packet code 0x${packetCodeHex} in layer ${layer}`);
		} else {
			// parse the packet and add to layers
			layers.push(packet.parser(raf, productDescription));
		}
	}
	return layers;
};

module.exports = parse;
