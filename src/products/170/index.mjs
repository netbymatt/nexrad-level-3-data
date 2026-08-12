/* eslint-disable camelcase */
import { RandomAccessFile } from '../../randomaccessfile/index.mjs';
import { nullProductFlag, leadingFlags } from '../productflags.mjs';

const code = 170;
const abbreviation = 'DAA';
const description = 'Digital One Hour Accumulation';

const halfwords27_28 = (data) => {
	// turn data into a random access file for bytewise parsing purposes
	const raf = new RandomAccessFile(data);
	return {
		thresholdMinTime: raf.readShort(),
		totalTime: raf.readShort(),
	};
};

const halfwords30_53 = (data) => {
	// turn data into a random access file for bytewise parsing purposes
	const raf = new RandomAccessFile(data);
	return {
		nullProductFlag: nullProductFlag(raf.readShort()),
		plot: {
			scale: raf.readFloat() * 100,
			offset: raf.readFloat(),
			dependent35: raf.readShort(),
			maxDataValue: raf.readShort(),
			leadingFlags: leadingFlags(raf.readShort()),
			trailingFlags: raf.readShort(),
		},
		dependent39_46: raf.read(16),
		maxAccumulation: raf.readShort() / 10,
		accumulationEndDate: raf.readShort(),
		accumulationEndMinutes: raf.readShort(),
		meanFieldBias: raf.readShort() / 1000,
		compressionMethod: raf.readShort(),
		uncompressedSize: (raf.readUShort() << 16) + raf.readUShort(),
	};
};

const productDescription = {
	halfwords27_28,
	halfwords30_53,
};

export {
	code,
	abbreviation,
	description,
	productDescription,
};
