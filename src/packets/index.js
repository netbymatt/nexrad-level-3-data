const fs = require('fs');
const path = require('path');

// load all packets in folder automatically
const files = fs.readdirSync(__dirname).filter((file) => !fs.lstatSync(path.join(__dirname, file)).isDirectory() && file !== 'index.js');
// eslint-disable-next-line import/no-dynamic-require, global-require
const packetsRaw = files.map((file) => require(path.join(__dirname, file)));

// make up a list of packets by integer type
const packets = {};
packetsRaw.forEach((packet) => {
	if (packets[packet.code]) { throw new Error(`Duplicate packet code ${packet.code}`); }
	packets[packet.code] = packet;
});

module.exports = {
	packets,
};
