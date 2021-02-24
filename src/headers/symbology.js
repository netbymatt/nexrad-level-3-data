const parse = (raf) => {
	const result = {
		blockDivider: raf.readShort(),
		blockId: raf.readShort(),
		blockLength: raf.readInt(),
		numberLayers: raf.readShort(),
		layerDivider: raf.readShort(),
		layerLength: raf.readInt(),
	};

	// test some known values
	if (result.blockDivider !== -1) throw new Error(`Invalid symbology block divider: ${result.blockDivider}`);
	if (result.blockId !== 1) throw new Error(`Invalid symbology id: ${result.blockId}`);
	if (result.layerDivider !== -1) throw new Error(`Invalid symbology layer divider: ${result.layerDivider}`);

	return result;
};

//

module.exports = parse;
