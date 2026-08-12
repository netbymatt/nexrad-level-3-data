/* eslint-disable camelcase */
import { RandomAccessFile } from '../../randomaccessfile/index.mjs';

const code = 78;
const abbreviation = 'N1P';
const description = 'One-hour precipitation';

const halfwords30_53 = (data) => {
	// turn data into a random access file for bytewise parsing purposes
	const raf = new RandomAccessFile(data);
	raf.seek(34);
	return {
		maxRainfall: raf.readShort() / 10,
		meanFieldBias: raf.readShort() / 100,
		sampleSize: raf.readShort() / 100,
		endRanifallDate: raf.readShort(),
		endRainfallMinutes: raf.readShort(),
		plot: {
			maxDataValue: 16,
		},
	};
};

const productDescription = {
	halfwords30_53,
};

export {
	code,
	abbreviation,
	description,
	productDescription,
};
