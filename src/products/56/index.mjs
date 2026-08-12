import { RandomAccessFile } from '../../randomaccessfile/index.mjs';

const code = 56;
const abbreviation = ['N0S', 'N1S', 'N2S', 'N3S'];
const description = 'Storm relative velocity';

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
	productDescription,
};
