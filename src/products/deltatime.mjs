// delta and time are compressed into one field
const deltaTime = (value) => ({
	deltaTime: (value & 0xFFE0) >> 5,
	nonSupplementalScan: (value & 0x001F) === 0,
	sailsScan: (value & 0x001F) === 1,
	mrleScan: (value & 0x001F) === 2,
});

export default deltaTime;
