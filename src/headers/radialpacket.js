// register packet parsers
/* eslint-disable global-require */
const packetsRaw = [
	require('../packets/af1f'),
];
	/* eslint-enable global-require */

// make up a list of packet parsers by integer type
const packets = {};
packetsRaw.forEach((packet) => {
	if (packets[packet.code]) throw new Error(`Duplicate packet code ${packet.code}`);
	packets[packet.code] = packet;
});

const parse = (raf) => {
	// get the packet code and then jump back in the file
	const packetCode = raf.readUShort();
	raf.skip(-2);

	// turn into hex packet code
	const packetCodeHex = packetCode.toString(16);

	// look up the packet code
	const packet = packets[packetCode];
	if (!packet) throw new Error(`Unsupported packet code ${packetCodeHex}`);

	return packet.parser(raf);
};

module.exports = parse;
