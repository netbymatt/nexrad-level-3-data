const { parser } = require('../packets');

const parse = (raf) => {
	const result = {
		blockDivider: raf.readShort(),
		blockId: raf.readShort(),
		blockLength: raf.readInt(),
		numberPages: raf.readShort(),
		pages: [],
	};

	// test some known values
	if (result.blockDivider !== -1) throw new Error(`Invalid graphic block divider: ${result.blockDivider}`);
	if (result.blockId !== 2) throw new Error(`Invalid graphic id: ${result.blockId}`);
	if (result.numberPages < 1 || result.numberPages > 48 - 1) throw new Error(`Invalid graphic number of pages: ${result.numberPages}`);

	// read each page
	for (let pageNum = 0; pageNum < result.numberPages; pageNum += 1) {
		const page = {
			number: raf.readShort(),
			length: raf.readShort(),
			packets: [],
		};

		// calculate end byte
		const endByte = raf.getPos() + page.length;

		// test page number
		if (pageNum + 1 !== page.number) throw new Error(`Invalid page number: ${page.number}`);

		// loop through all packets
		while (raf.getPos() < endByte) {
			page.packets.push(parser(raf));
		}

		result.pages.push(page);
	}

	return result;
};

//

module.exports = parse;
