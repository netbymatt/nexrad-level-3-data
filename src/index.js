const { RandomAccessFile } = require('./randomaccessfile');
const textHeader = require('./headers/text');
const messageHeader = require('./headers/message');
const { parse: productDescription } = require('./headers/productdescription');
const symbologyHeader = require('./headers/symbology');
const radialPacketHeader = require('./headers/radialpacket');

// register product parsers
/* eslint-disable global-require */
const productsRaw = [
	require('./products/80'),
];
/* eslint-enable global-require */

// make up a list of products by integer type
const products = {};
productsRaw.forEach((product) => {
	if (products[product.code]) throw new Error(`Duplicate product code ${product.code}`);
	products[product.code] = product;
});

// list of available product code abbreviations for type-checking
const productAbbreviations = productsRaw.map((product) => product.abbreviation);

// parse data provided from string or buffer
const nexradLevel3Data = (file) => {
	// convert to random access file
	const raf = new RandomAccessFile(file);

	// result object
	const result = {};

	// get the header
	result.textHeader = textHeader(raf);

	// text header is not accounted for in data description. Note the length here for additional offset calculations
	const textHeaderLength = raf.getPos();

	// test for valid file
	if (!result.textHeader.fileType.startsWith('SDUS')) throw new Error(`Incorrect file type header: ${result.textHeader.fileType}`);
	if (!productAbbreviations.includes(result.textHeader.type)) throw new Error(`Unsupported product type: ${result.textHeader.type}`);

	// message header
	result.messageHeader = messageHeader(raf);
	// get the product
	const product = products[result.messageHeader.code.toString()];

	// test for product type again
	if (!product) throw new Error(`Unsupported product code: ${result.messageHeader.code}`);

	// product description
	result.productDescription = productDescription(raf, product);

	// jump to symbology, convert halfwords to bytes
	const offsetSymbologyBytes = textHeaderLength + result.productDescription.offsetSymbology * 2;
	// error checking
	if (offsetSymbologyBytes > raf.getLength()) throw new Error(`Invalid symbology offset: ${result.productDescription.offsetSymbology}`);
	raf.seek(offsetSymbologyBytes);

	// read the symbology header
	result.symbology = symbologyHeader(raf);

	// read the radial packet header
	result.radialPacketHeader = radialPacketHeader(raf);

	return result;
};

module.exports = nexradLevel3Data;
