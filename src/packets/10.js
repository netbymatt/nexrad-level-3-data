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

	// create a lookup table mapping raw bin values to scaled values
	const scaled = [];
	let start = 0;
	if (productDescription.plot.leadingFlags.noData === 0) {
		start = 1;
		scaled[0] = null;
	}
	for (let i = start; i < productDescription.plot.maxDataValue; i += 1) {
		scaled.push(((i - scaling.offset) / scaling.scale) * (productDescription?.plot?.definedScalingFactor ?? 1));
	}

	// loop through the radials and bins
	// return a structure of [radial][bin]
	// radials provides scaled values per the product's scaling, radialsRaw provides bytes as read from the file
	const radials = [];
	const radialsRaw = [];
	for (let r = 0; r < result.numberRadials; r += 1) {
		const bytesInRadial = raf.readShort();
		const radial = {
			startAngle: raf.readShort() / 10,
			angleDelta: raf.readShort() / 10,
			bins: [],
		};
		const radialRaw = { ...radial, bins: [] };
		for (let i = 0; i < result.numberBins; i += 1) {
			const value = raf.readByte();
			radial.bins.push(scaled[value]);
			radialRaw.bins.push(value);
		}
		radials.push(radial);
		radialsRaw.push(radialRaw);
		// must end on a halfword boundary, skip any additional data if required
		if (bytesInRadial !== result.numberBins) raf.skip(bytesInRadial - result.numberBins);
	}
	result.radials = radials;
	result.radialsRaw = radialsRaw;

	return result;
};

module.exports = {
	code,
	description,
	parser,
};
