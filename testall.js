const fs = require('fs');
const parser = require('./src');

// get a list of all data files
const files = fs.readdirSync('./data/');

// test each file
files.forEach((file) => {
	console.log(file);
	const data = fs.readFileSync(`./data/${file}`);
	console.log(parser(data));
});

// pass to parser as a string or buffer
// const level3Data = parser(file);
