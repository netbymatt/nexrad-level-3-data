const { parser } = require('../packets');

const parse = (raf) => {
	const blockDivider = raf.readShort();
	const blockId = raf.readShort();
	const blockLength = raf.readInt();

	// test some known values
	if (blockDivider !== -1) throw new Error(`Invalid graphic block divider: ${blockDivider}`);
	if (blockId !== 2) throw new Error(`Invalid graphic id: ${blockId}`);
	if (blockLength < 1 || blockLength > 65535) throw new Error(`Invalid block length ${blockLength}`);
	if ((blockLength + raf.getPos() - 8) > raf.getLength()) throw new Error(`Block length ${blockLength} overruns file length for block id: ${blockId}`);

	const result = {
		numberPages: raf.readShort(),
		pages: [],
	};

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
