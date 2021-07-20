// format the text data provided
// extract data from lines that follow this format
// "        U3               0                   50                <0.50            "
// using this header information
// " CIRC  AZRAN   SR STM |-LOW LEVEL-|  |--DEPTH--|  |-MAX RV-| TVS  MOTION   MSI  "
// "  ID   deg/nm     ID  RV   DV  BASE  kft STMREL%  kft    kts     deg/kts        "
// returns an array of objects

module.exports = (data) => {
	// extract relevant data
	const pages = data?.tabular?.pages;
	if (!pages) return {};
	const result = {};

	// format line by line
	pages.forEach((page) => {
		page.forEach((line) => {
			// extrat values
			const rawMatch = line.match(/ {8}([A-Z]\d) {4} *([0-9.]{1,3}) *([0-9.]{1,3}) *<?>?([0-9.]{4,6}) */);
			if (!rawMatch) return;

			// format the result
			const [, id, probSevere, probHail, maxSize] = [...rawMatch];
			// store to array
			result[id] = {
				probSevere: +probSevere,
				probHail: +probHail,
				maxSize: +maxSize,
			};
		});
	});

	return {
		hail: result,
	};
};
