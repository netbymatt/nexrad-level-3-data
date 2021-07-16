const code = 28;
const description = 'Serialized data';
const xdr = require('js-xdr');

const parser = (raf) => {
	// packet header
	const packetCode = raf.readUShort();
	// reserved
	const reserved = raf.readShort();
	const packetLength = raf.readUInt();

	// test packet code
	if (packetCode !== code) throw new Error(`Packet codes do not match ${code} !== ${packetCode}`);
	if (reserved !== 0) throw new Error('Packet reserved data is not zero');

	// pass to xdr parser
	const data = raf.buffer.slice(raf.getPos());
	xdr;

	return result;
};

module.exports = {
	code,
	description,
	parser,
};
