const messageHeader = require('./message');
const { parse: productDescription } = require('./productdescription');

const parse = (raf, product) => {
	const result = {
		blockDivider: raf.readShort(),
		blockId: raf.readShort(),
		blockLength: raf.readInt(),
		messageHeader: messageHeader(raf),
		productDescription: productDescription(raf, product),
		blockDivider2: raf.readShort(),
		totalPages: raf.readShort(),
		charactersPerLine: raf.readShort(),
		pages: [],
	};

	// test some known values
	if (result.blockDivider !== -1) throw new Error(`Invalid tabular block divider: ${result.blockDivider}`);
	if (result.blockId !== 3) throw new Error(`Invalid tabular id: ${result.blockId}`);
	if (result.blockDivider2 !== -1) throw new Error(`Invalid second tabular block divider: ${result.blockDivider2}`);

	// loop through data until end of page reached
	for (let i = 0; i < result.totalPages; i += 1) {
		// page string
		const lines = [];
		let line = '';
		// loop through lines until end of page reached
		// read two characters at a time to detect end of page
		let chars = raf.readShort();
		while (chars !== -1) {
			// not in specification, but appears to be a line ending
			if (chars !== 0x0050) {
				// write the first character to the line
				line += String.fromCharCode(chars >> 8);
				// test length
				if (line.length % result.charactersPerLine === 0) { lines.push(line); line = ''; }
				// write the first character to the line
				line += String.fromCharCode(chars & 0x00FF);
				// test length
				if (line.length % result.charactersPerLine === 0) { lines.push(line); line = ''; }
			}
			// get next characters
			chars = raf.readShort();
		}
		result.pages.push(lines);
	}

	return result;
};

//

module.exports = parse;
