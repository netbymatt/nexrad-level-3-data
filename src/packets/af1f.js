const code = 0xaf1f;
const description = 'Storm Total Rainfall Accumulation';

const parser = (raf) => {
	// parse the data
	const result = {
		packetCode: raf.readUShort(),
		firstBin: raf.readShort(),
		numberBins: raf.readShort(),
		iSweepCenter: raf.readShort(),
		jSweepCenter: raf.readShort(),
		rangeScale: raf.readShort() / 1000,
		numRadials: raf.readShort(),
	};
	// also providethe packet code in hex
	result.packetCodeHex = result.packetCode.toString(16);

	// loop through the radials and bins
	// return a structure of [radial][bin]
	const radials = [];
	for (let r = 0; r < result.numRadials; r += 1) {
		// get the rle length
		const rleLength = raf.readShort() * 2;
		const radial = {
			startAngle: raf.readShort() / 10,
			angleDelta: raf.readShort() / 10,
			bins: [],
		};
		for (let rle = 0; rle < rleLength; rle += 1) {
			radial.bins.push(...rleExpand(raf.readByte()));
		}
		radials.push(radial);
	}
	result.radials = radials;

	return result;
};

// expand rle from rrrrvvvv, 4-bit run, 4-bit value
const rleExpand = (byte) => {
	const run = byte >> 4;
	const value = byte & 0x0F;
	const result = [];
	for (let i = 0; i < run; i += 1) {
		result.push(value);
	}
	return result;
};

module.exports = {
	code,
	description,
	parser,
};
