const code = 19;
const description = 'Special Graphic Symbol Packet';

// feature key
const featureKey = {
	1: 'mesocyclone (extrapolated)',
	3: 'mesocyclone (persistent, new or increasing)',
	5: 'TVS (extrapolated)',
	6: 'ETVS (extrapolated)',
	7: 'TVS (persistent, new or increasing)',
	8: 'ETVS (persistent, new or increasing)',
	9: 'MDA Circulation with Strength Rank >= 5 AND with a Base Height <= 1 km ARL or with its base on the lowest elevation angle',
	10: 'MDA Circulation with Strength Rank >= 5 AND with a Base Height > 1 km ARL AND that Base is not on the lowest elevation angle',
	11: ' MDA Circulation with Strength Rank< 5',
};

const parser = (raf) => {
	// parse the data
	const result = {
		packetCode: raf.readUShort(),
		lengthOfBlock: raf.readShort(),
		points: [],
	};
	// also providethe packet code in hex
	result.packetCodeHex = result.packetCode.toString(16);

	// read all special symbols
	let i = 0;
	for (i = 0; (i < result.lengthOfBlock) && (i + 8 < result.lengthOfBlock); i += 8) {
		const iStartingPoint = raf.readShort();
		const jStartingPoint = raf.readShort();
		const pointFeatureType = raf.readShort();
		const pointFeatureAttribute = raf.readShort();
		result.points.push({
			iStartingPoint,
			jStartingPoint,
			pointFeatureType,
			pointFeatureAttribute,
		});
	}

	// skip past extra data
	raf.skip(result.lengthOfBlock - i);

	return result;
};

module.exports = {
	code,
	description,
	parser,
	key: featureKey,
};