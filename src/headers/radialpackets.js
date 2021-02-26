// register packet parsers
/* eslint-disable global-require */
const packetsRaw = [
	require('../packets/af1f'),
	require('../packets/10'),
];
	/* eslint-enable global-require */

// make up a list of packet parsers by integer type
const packets = {};
packetsRaw.forEach((packet) => {
	if (packets[packet.code]) throw new Error(`Duplicate packet code ${packet.code}`);
	packets[packet.code] = packet;
});

const parse = (raf, layerCount) => {
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
		const packetCodeHex = packetCode.toString(16);

		// look up the packet code
		const packet = packets[packetCode];
		if (!packet) throw new Error(`Unsupported packet code 0x${packetCodeHex}`);

		// parse the packet and add to layers
		layers.push(packet.parser(raf));
	}
	return layers;
};

module.exports = parse;
