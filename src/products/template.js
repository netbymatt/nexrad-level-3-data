const code = 80;
const abbreviation = 'NTP';
const description = 'Storm Total Rainfall Accumulation';

const parser = (raf) => {
	const data = {};

	return data;
};

// eslint-disable-next-line camelcase
const halfwords27_28 = (data) => ({
	halfwords27_28: data,
});

// eslint-disable-next-line camelcase
const halfwords30_53 = (data) => ({
	halfwords30_53: data,
});

module.exports = {
	code,
	abbreviation,
	description,
	parser,
	productDescription: {
		halfwords27_28,
		halfwords30_53,
	},
};
