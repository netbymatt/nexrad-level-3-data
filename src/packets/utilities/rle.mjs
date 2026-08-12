// run length encoding expansion methods

// expand rle from rrrrvvvv, 4-bit run, 4-bit value

const rle = (byte) => {
	const run = byte >> 4;
	const value = byte & 0x0F;
	const result = [];
	for (let i = 0; i < run; i += 1) {
		result.push(value);
	}
	return result;
};

export default rle;
