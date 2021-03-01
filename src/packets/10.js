const code = 16;
const description = 'Digital Radial Data Array Packet';

const parser = (raf, productDescription) => {
	// parse the data
	const result = {
		packetCode: raf.readUShort(),
		firstBin: raf.readShort(),
		numberBins: raf.readShort(),
		iSweepCenter: raf.readShort(),
		jSweepCenter: raf.readShort(),
		rangeScale: raf.readShort() / 1000,
		numberRadials: raf.readShort(),
	};
	// also providethe packet code in hex
	result.packetCodeHex = result.packetCode.toString(16);

	// set up scaling or defaults
	const scaling = {
		scale: productDescription?.plot?.scale ?? 1,
		offset: productDescription?.plot?.offset ?? 0,
	};

	// loop through the radials and bins
	// return a structure of [radial][bin]
	const radials = [];
	for (let r = 0; r < result.numberRadials; r += 1) {
		const bytesInRadial = raf.readShort();
		const radial = {
			startAngle: raf.readShort() / 10,
			angleDelta: raf.readShort() / 10,
			bins: [],
		};
		for (let i = 0; i < result.numberBins; i += 1) {
			radial.bins.push(raf.readByte() * scaling.scale + scaling.offset);
		}
		radials.push(radial);
		// must end on a halfword boundary, skip any additional data if required
		if (bytesInRadial !== result.numberBins) raf.skip(bytesInRadial - result.numberBins);
	}
	result.radials = radials;

	return result;
};

module.exports = {
	code,
	description,
	parser,
};
