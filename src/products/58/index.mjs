import { RandomAccessFile } from '../../randomaccessfile/index.mjs';
import formatter from './formatter.mjs';

const code = 58;
const abbreviation = ['NST'];
const description = 'Storm Tracking Information';

// 248 Nmi, Geographic and Non-geographic alphanumeric

// eslint-disable-next-line camelcase
const halfwords30_53 = (data) => {
	// turn data into a random access file for bytewise parsing purposes
	const raf = new RandomAccessFile(data);
	return {
		elevationAngle: raf.readShort() / 10,
		dependent31_46: raf.read(32),
		maxNegativeVelocity: raf.readShort(),	// knots
		maxPositiveVelocity: raf.readShort(),	// knots
		motionSourceFlag: raf.readShort(),	// = -1
		dependent50: raf.readShort(),
		averageStormSpeed: raf.readShort() / 10,	// knots
		averageStormDirection: raf.readShort() / 10, // degrees
	};
};
const productDescription = {
	// eslint-disable-next-line camelcase
	halfwords30_53,
};

export {
	code,
	abbreviation,
	description,
	formatter,

	productDescription,
};
