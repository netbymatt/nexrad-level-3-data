const code = 2;
const description = 'Text and Special Symbol Packets';

const parser = (raf) => {
	// parse the data
	const result = {
		packetCode: raf.readUShort(),
		lengthOfBlock: raf.readShort(),
		iStartingPoint: raf.readShort(),
		jStartingPoint: raf.readShort(),
	};
	// also providethe packet code in hex
	result.packetCodeHex = result.packetCode.toString(16);

	// read the result length
	result.text = raf.readString(result.lengthOfBlock - 4);

	return result;
};

module.exports = {
	code,
	description,
	parser,
};