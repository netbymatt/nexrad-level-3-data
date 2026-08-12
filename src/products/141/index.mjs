/* eslint-disable camelcase */
import formatter from './formatter.mjs';
import { RandomAccessFile } from '../../randomaccessfile/index.mjs';

const code = 141;
const abbreviation = ['NMD'];
const description = 'Mesocyclone';

// 124 Nmi, Geographic and Non-geographic alphanumeric

const halfwords27_28 = (data) => {
	const raf = new RandomAccessFile(data);
	return {
		minimumReflectivity: raf.readShort(),
		overlapDisplayFilter: raf.readShort(),
	};
};

const halfwords30_53 = (data) => {
	const raf = new RandomAccessFile(data);
	return {
		filterStrengthRank: raf.readShort(),
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
	formatter,
	productDescription,
};
