// register packet parsers

const { parser } = require('../packets');

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

		layers.push(parser(raf, productDescription));
	}
	return layers;
};

module.exports = parse;
