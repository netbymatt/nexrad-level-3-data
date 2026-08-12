/* eslint-disable camelcase */
import { RandomAccessFile } from '../../randomaccessfile/index.mjs';

// uses the same data coding as 165
import { supplemental } from '../165/index.mjs';

const code = 177;
const abbreviation = 'HHC';
const description = 'Hybrid Hydrometeor Classification';

const halfwords27_28 = (data) => ({
	halfwords27_28: data,
});

const halfwords30_53 = (data) => {
	// turn data into a random access file for bytewise parsing purposes
	const raf = new RandomAccessFile(data);
	return {
		dependent30_46: raf.read(34),
		modeFilter: raf.readShort(),
		hybridRatePercentBinsFilled: raf.readShort() / 100,
		highestElevation: raf.readShort() / 10,
		dependent50: raf.read(2),
		compressionMethod: raf.readShort(),
		uncompressedSize: (raf.readUShort() << 16) + raf.readUShort(),
		plot: { maxDataValue: 150 },
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
	supplemental,
};
