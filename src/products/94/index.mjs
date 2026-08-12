/* eslint-disable camelcase */
import { RandomAccessFile } from '../../randomaccessfile/index.mjs';
import deltaTime from '../deltatime.mjs';

const code = 94;
const abbreviation = ['NXQ', 'NYQ', 'NZQ', 'N0Q', 'NAQ', 'N1Q', 'NBQ', 'N2Q', 'N3Q'];
const description = 'Digital Base Reflectivity';

const halfwords30_53 = (data) => {
	// turn data into a random access file for bytewise parsing purposes
	const raf = new RandomAccessFile(data);
	return {
		elevationAngle: raf.readShort() / 10,
		plot: {
			minimumDataValue: raf.readShort() / 10,
			dataIncrement: raf.readShort() / 10,
			dataLevels: raf.readShort(),
		},
		dependent34_46: raf.read(26),
		maxReflectivity: raf.readShort(),	// dBZ
		dependent48_49: raf.read(4),
		...deltaTime(raf.readShort()),
		compressionMethod: raf.readShort(),
		uncompressedProductSize: (raf.readUShort() << 16) + raf.readUShort(),
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
