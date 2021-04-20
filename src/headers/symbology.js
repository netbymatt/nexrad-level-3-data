const symbology6 = require('./symbology6');

const parse = (raf) => {
	const blockDivider = raf.readShort();
	const blockId = raf.readShort();
	// block id 6 is undocumented but appears to be text
	if (blockId === 6) return symbology6(raf);
	const blockLength = raf.readInt();

	// test some known values
	if (blockDivider !== -1) throw new Error(`Invalid symbology block divider: ${blockDivider}`);
	if (blockId !== 1) throw new Error(`Invalid symbology id: ${blockId}`);
	if ((blockLength + raf.getPos() - 8) > raf.getLength()) throw new Error(`Block length ${blockLength} overruns file length for block id: ${blockId}`);

	const result = {
		numberLayers: raf.readShort(),
	};

	return result;
};

//

module.exports = parse;
