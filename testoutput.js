const fs = require('fs');
const parser = require('./src');

// get a list of all data files
const files = fs.readdirSync('./data/');

// test each file
files.forEach((file) => {
	console.log(file);
	try {
		const rawFile = fs.readFileSync(`./data/${file}`);
		const data = parser(rawFile);
		console.log(data);
		// write to disk
		fs.writeFileSync(`./output/${file}.json`, JSON.stringify(data, null, 2));
	} catch (e) {
		console.error(e.stack);
	}
});

console.log();
