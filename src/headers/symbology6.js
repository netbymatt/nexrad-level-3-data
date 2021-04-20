// block id 6 is undocumented but appears to be text

const parse = (raf) => {
	const pages = [];

	// loop until a -1 is encounted
	let length = raf.readShort();
	do {
		while (length !== -1) {
			pages.push(raf.readString(length));
			length = raf.readShort();
		}
		length = raf.readShort();
	} while (length === 80);

	// roll back the 4 bytes used to detect the end of the text area
	raf.skip(-4);

	return { pages };
};

//

module.exports = parse;
