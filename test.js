const fs = require('fs');
const parser = require('./src');

// read file

// 56 N0S Storm relative velocity
// const file = fs.readFileSync('./data/LOT_N0S_2021_01_31_11_06_30');

// 58 NTP Storm Tracking Information
// const file = fs.readFileSync('./data/JAX_NST_2021_04_11_19_37_00');
// const file = fs.readFileSync('./data/TBW_NST_2021_04_19_19_02');

// 59 NHI Hail Index
// const file = fs.readFileSync('./data/DTW_NHI_2021_04_08_19_47');
const file = fs.readFileSync('./data/TBW_NHI_2021_04_19_19_02');

// 78 One-hour precipitation
// const file = fs.readFileSync('./data/LOT_N1P_2021_01_31_11_06_30');

// 80 NTP Storm total accumulation
// const file = fs.readFileSync('./data/LOT_NTP_2021_01_31_11_06_30');

// 165 N0H Hydrometeor classification
// const file = fs.readFileSync('./data/LOT_N0H_2021_01_31_11_06_30');

// 172 DTA Storm Total Precipitation
// const file = fs.readFileSync('./data/LOT_DTA_2021_02_28_15_05_33');

// 177 HHC Hybrid Hydrometeor classification
// const file = fs.readFileSync('./data/LOT_HHC_2021_01_31_11_06_30');

// pass to parser as a string or buffer
const level3Data = parser(file);

console.log(level3Data);
console.log();
