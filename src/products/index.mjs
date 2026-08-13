import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// load all products in folder automatically

const foldersRaw = (await fs.readdir(import.meta.dirname));
const foldersChecked = await Promise.all(foldersRaw.map(async (folder) => (await fs.lstat(path.join(import.meta.dirname, folder))).isDirectory()));
const folders = foldersRaw.filter((_, i) => foldersChecked[i]);

const productsRaw = await Promise.all(
	folders.map((folder) => import(pathToFileURL(path.join(import.meta.dirname, folder, 'index.mjs')))),
);

// make up a list of products by integer type
const products = {};
productsRaw.forEach((product) => {
	if (products[product.code]) {
		throw new Error(`Duplicate product code ${product.code}`);
	}
	products[product.code] = product;
});

// list of available product code abbreviations for type-checking
const productAbbreviations = productsRaw.map((product) => product.abbreviation).flat();

export {
	products,
	productAbbreviations,
};
