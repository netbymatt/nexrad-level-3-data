/* eslint-disable no-console */
import fs from 'node:fs/promises';
import nexradLevel3Data from './src/index.mjs';

// get a list of all data files
const files = await fs.readdir('./data/');

// test each file
console.log('Testing files without errors');
await Promise.all(files.map(async (file) => {
	console.log(file);
	try {
		const rawFile = await fs.readFile(`./data/${file}`);
		const data = nexradLevel3Data(rawFile);
		console.log(data);
		// write to disk
		await fs.writeFile(`./output/${file}.json`, JSON.stringify(data, null, 2));
	} catch (e) {
		console.error(e.stack);
	}
}));

// test each file with known errors
console.log('Testing files with errors');
const errors = await fs.readdir('./data-error/');
await Promise.all(errors.map(async (file) => {
	console.log(file);
	try {
		const rawFile = await fs.readFile(`./data-error/${file}`);
		const data = nexradLevel3Data(rawFile);
		console.log(data);
		// write to disk
		await fs.writeFile(`./output/${file}.json`, JSON.stringify(data, null, 2));
	} catch (e) {
		console.error(e.stack);
	}
}));

console.log();
