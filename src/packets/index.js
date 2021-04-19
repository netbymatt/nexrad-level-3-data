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

// generic packet parser
const parser = (raf, productDescription) => {
	// get the packet code and then jump back in the file so it can be consumed by the packet parser
	const packetCode = raf.readUShort();
	raf.skip(-2);

	// turn into hex packet code
	const packetCodeHex = packetCode.toString(16).padStart(4, '0');

	// look up the packet code
	const packet = packets[packetCode];
	// first layer always results in an error
	if (!packet) throw new Error(`Unsupported packet code 0x${packetCodeHex}`);
	return packet.parser(raf, productDescription);
};

module.exports = {
	packets,
	parser,
};
