const code = 74;
const abbreviation = ['RCM'];
const description = 'Radar Coded Message';
const { RandomAccessFile } = require('../../randomaccessfile');
const formatter = require('./formatter');

// 248 Nmi, Geographic and Non-geographic alphanumeric

module.exports = {
	code,
	abbreviation,
	description,
	formatter,

	productDescription: {

	},
};
