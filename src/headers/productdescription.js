const MODE_MAINTENANCE = 0;
const MODE_CLEAN_AIR = 1;
const MODE_PRECIPITATION = 2;

const parse = (raf, product) => {
	const result = {
		abbreviation: product.abbreviation,
		description: product.description,
		divider: raf.readShort(),
		latitude: raf.readInt() / 1000,
		longitude: raf.readInt() / 1000,
		height: raf.readShort(),
		code: raf.readShort(),
		mode: raf.readShort(),
		vcp: raf.readShort(),
		sequenceNumber: raf.readShort(),
		volumeScanNumber: raf.readShort(),
		volumeScanDate: raf.readShort(),
		volumeScanTime: raf.readInt(),
		productDate: raf.readShort(),
		productTime: raf.readInt(),
		// halfwords 27-28 are product dependent
		...(product?.productDescription?.halfwords27_28?.(raf.read(4)) ?? { dependent27_28: raf.read(4) }),
		elevationNumber: raf.readShort(),
		// halfwords 30-53 are product dependent
		...(product?.productDescription?.halfwords30_53?.(raf.read(48)) ?? { dependent30_53: raf.read(48) }),
		version: raf.readByte(),
		spotBlank: raf.readByte(),
		offsetSymbology: raf.readInt(),
		offsetGraphic: raf.readInt(),
		offsetTabular: raf.readInt(),
		supplemental: product.supplemental,
	};

	// check fixed data values
	if (result.divider !== -1) throw new Error(`Invalid product description divider: ${result.divider}`);
	return result;
};

//

module.exports = {
	parse,
	MODE_MAINTENANCE,
	MODE_CLEAN_AIR,
	MODE_PRECIPITATION,
};
