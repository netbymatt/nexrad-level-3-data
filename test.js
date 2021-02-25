const fs = require('fs');
const parser = require('./src');

// read file

// 80 NTP Storm total accumulation
// const file = fs.readFileSync('./data/LOT_NTP_2021_01_31_11_06_30');
// 56 N0S Storm relative velocity
const file = fs.readFileSync('./data/LOT_N0S_2021_01_31_11_06_30');

// pass to parser as a string or buffer
const level3Data = parser(file);

console.log(level3Data);
console.log();
