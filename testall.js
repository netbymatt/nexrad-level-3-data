const fs = require('fs');
const parser = require('./src');

// get a list of all data files
const files = fs.readdirSync('./data/');

// test each file
files.forEach((file) => {
	console.log(file);
	try {
		const data = fs.readFileSync(`./data/${file}`);
		console.log(parser(data));
	} catch (e) {
		console.error(e.stack);
	}
});

console.log();
