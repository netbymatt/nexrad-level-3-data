const fs = require('fs');
const path = require('path');

// load all products in folder automatically
const folders = fs.readdirSync(__dirname).filter((folder) => fs.lstatSync(path.join(__dirname, folder)).isDirectory());
// eslint-disable-next-line import/no-dynamic-require, global-require
const productsRaw = folders.map((folder) => require(path.join(__dirname, folder)));

// make up a list of products by integer type
const products = {};
productsRaw.forEach((product) => {
	if (products[product.code]) { throw new Error(`Duplicate product code ${product.code}`); }
	products[product.code] = product;
});

// list of available product code abbreviations for type-checking
const productAbbreviations = productsRaw.map((product) => product.abbreviation).flat();

module.exports = {
	products,
	productAbbreviations,
};
