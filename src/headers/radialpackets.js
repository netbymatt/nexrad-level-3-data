// register packet parsers

const { parser } = require('../packets');

const parse = (raf, productDescription, layerCount) => {
	const layers = [];
	for (let layerIndex = 0; layerIndex < layerCount; layerIndex += 1) {
		// store starting so skipping the block is possible if layer can't be parsed
		const startPos = raf.getPos();

		// read the header
		const layerDivider = raf.readShort();
		const layerLength = raf.readInt();
		if (layerDivider !== -1) throw new Error(`Invalid layer divider ${layerDivider} in layer ${layerDivider}`);
		if (layerLength + raf.getPos() > raf.getLength()) throw new Error(`Layer size overruns block size for layer ${layerIndex}`);

		try {
			layers.push(parser(raf, productDescription));
		} catch (e) {
			console.error(e.stack);
			// skip this layer
			raf.seek(startPos + layerLength);
			layers.push(undefined);
		}
	}
	return layers;
};

module.exports = parse;
