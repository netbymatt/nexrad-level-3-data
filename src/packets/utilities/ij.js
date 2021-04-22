// i,j coordinate functions

// i,j to azimuth/nmi

// default is 4096 i/j units, 248 mi range, converted to nautical miles = 1nmi = 1.15078mi
const ijToAzDeg = (i, j, rawMax = 4096, range = 248, conversion = 1.15078) => {
	// calculate nautical miles
	const nm = ((Math.sqrt(i ** 2 + j ** 2) / rawMax) * range) * conversion;
	let deg = 0;
	// short circuit potential divide by zero
	if (i === 0) {
		// calculate degrees, then rotate due to north = up = 0 deg convention
		deg = (Math.atan(-j / i) * 180) / Math.PI + 90;
		// coerce to 0<=deg<360
		if (deg < 0) deg += 180;
	}
	return {
		deg,
		nm,
	};
};

module.exports = {
	ijToAzDeg,
};
