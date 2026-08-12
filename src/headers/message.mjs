const parseMessageHeader = (raf) => ({

	code: raf.readShort(),
	julianDate: raf.readShort(),
	seconds: raf.readInt(),
	length: raf.readInt(),
	source: raf.readShort(),
	dest: raf.readShort(),
	blocks: raf.readShort(),

});

export default parseMessageHeader;
