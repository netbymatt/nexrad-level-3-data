const nullProductFlag = (data) => {
	if (data === 0) return false;
	let reason = '';
	switch (data) {
		case 0:
			reason = false;
			break;
		case 1:
			reason = 'No accumulation available. Threshold: ‘Elapsed Time to Restart’ [TIMRS] xx minutes exceeded.';
			break;
		case 2:
			reason = 'No precipitation detected during the specified time span.';
			break;
		case 3:
			reason = 'No accumulation data available for the specified time span.';
			break;
		case 4:
			reason = 'No precipitation detected since hh:mmZ. Threshold: \'Time Without Precipitation for Resetting Storm Totals\' [RAINT] is xx minutes or No precipitation detected since RPG startup.';
			break;
		case 5:
			reason = 'No precipitation detected since hh:mmZ or No precipitation detected since RPG startup.';
			break;
		case 6:
			reason = 'No Top_of_Hour accumulation - Some problem encountered with the SQL query resulted in an error.';
			break;
		case 7:
			reason = 'No Top_of_Hour accumulation because of excessive missing time encountered.';
			break;
		default:
			reason = 'Undefined';
	}
	return {
		value: data,
		reason,
	};
};

const leadingFlags = (data) => ({
	noData: data & 0x01 === 0,
});

export {
	nullProductFlag,
	leadingFlags,
};
