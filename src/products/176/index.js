const code = 176;
const abbreviation = 'DPR';
const description = 'Digital Precipitation Rate';
const { RandomAccessFile } = require('../../randomaccessfile');

// eslint-disable-next-line camelcase
const halfwords27_28 = (data) => {
	// turn data into a random access file for bytewise parsing purposes
	const raf = new RandomAccessFile(data);
	return {
		accumulationStartDate: raf.readShort(),
		accumulationStartMinutes: raf.readShort(),
	};
};

// eslint-disable-next-line camelcase
const halfwords30_53 = (data) => {
	// turn data into a random access file for bytewise parsing purposes
	const raf = new RandomAccessFile(data);
	return {
		precipitationDetected: raf.readByte(),
		gaugeBias: raf.readByte(),
		plot: {
			scale: raf.readFloat() * 100,
			offset: raf.readFloat(),
			dependent35: raf.readShort(),
			maxDataValue: raf.readShort(),
			leadingFlags: leadingFlags(raf.readShort()),
			trailingFlags: raf.readShort(),
		},
		dependent39_46: raf.read(16),
		maxRate: raf.readShort() / 1000,
		percentBinsFilled: raf.readShort() / 100,
		highestElevationUsed: raf.readShort() / 10,
		meanFieldBias: raf.readShort() / 1000,
		compressionMethod: raf.readShort(),
		uncompressedSize: (raf.readUShort() << 16) + raf.readUShort(),
	};
};

const leadingFlags = (data) => ({
	noData: data & 0x01 === 0,
});

module.exports = {
	code,
	abbreviation,
	description,
	productDescription: {
		halfwords27_28,
		halfwords30_53,
	},
};
