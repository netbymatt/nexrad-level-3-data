const code = 10;
const description = 'Unlinked Vector Packet';

// i and j = -2048 < i,j < 2047

const parser = (raf) => {
	// parse the data
	const result = {
		packetCode: raf.readUShort(),
		lengthOfBlock: raf.readShort(),
		color: raf.readShort(),
		vectors: [],
	};
	// also provide the packet code in hex
	result.packetCodeHex = result.packetCode.toString(16);

	// calculate end byte (off by 2 from result.color)
	const endByte = raf.getPos() + result.lengthOfBlock - 2;

	// read vectors for length of packet
	while (raf.getPos() < endByte) {
		// read start and end coordinate pairs per vector
		result.vectors.push({
			start: {
				i: raf.readShort(),
				j: raf.readShort(),

			},
			end: {
				i: raf.readShort(),
				j: raf.readShort(),
			},
		});
	}

	return result;
};

module.exports = {
	code,
	description,
	parser,
};
