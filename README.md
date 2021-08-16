# nexrad-level-3-data

A javascript implementation for decoding Nexrad Level III radar files.

You can find more information on how radar data is encoded at [NOAA](https://www.roc.noaa.gov/WSR88D/BuildInfo/Files.aspx). The work in this project is based mainly on the document [2620001 ICD FOR THE RPG TO CLASS 1 USER - Build 19.0](https://www.roc.noaa.gov/wsr88d/PublicDocs/ICDs/2620001Y.pdf).

## Contents
1. [Install](#install)
1. [Usage](#usage)
1. [Examples](#examples)
1. [Testing](#testing)
1. [API](#api)
1. [Background Information](#background-information)
1. [Work In Progress](#work-in-progress)
1. [ToDo](#todo)
1. [Acknowledgements](#acknowledgements)

## Install

``` bash
$ npm install nexrad-level-3-data
```

## Usage
Usage is straight forward, provide a string or buffer containing any of the [available products](#available-products).
``` javascript
const fs = require('fs');
const parser = require('nexrad-level-3-data');

const file = fs.readFileSync('./data/LOT_N0H_2021_01_31_11_06_30');
const level3Data = parser(file);

console.log(level3Data);
```

## Examples
Data and corresponding output are provided for quick and easy testing and experimentation. Please see the ```./data``` and ```./output``` folders.

An example of plotting data produced from this library can be found in [nexrad-level-3-plot](https://github.com/netbymatt/nexrad-level-3-plot)

## Testing
A test script is provided and will generate ```.json``` output from all of the files in the ```./data``` folder.
```
npm test
```
A successful test will generate several ```.json``` files in the ```./output``` folder and will not log any errors to the console.

## API

The parser will read files as either a string or a buffer. Streams are not supported. The parser will return an object representing the data as defined in https://www.roc.noaa.gov/wsr88d/PublicDocs/ICDs/2620001Y.pdf

In some situations additional data is provided in the productDescription property including a friendly name for the type of data or product legends to aid in decoding the data. Values are automatically parsed as integers, floats and strings as defined in the specification.

The parser makes some rudimentary checks to confirm data is valid. These checks include:
- Testing for the correct value for known separators and other fixed values in the specification.
- Testing offsets for locations outside of the file provided

The parser will also return rich error where possible indicating that a specific product or packet type is not supported.

## Background Information
Nexrad radar sites provide data in two formats: Level 2 and Level 3. Level 1 is used internally by the system and converted to Level 2 which is made available to end users. These products are detailed at https://www.ncdc.noaa.gov/data-access/radar-data/nexrad-products

### Level 2 Data
Level 2 data can be considered raw data from the radar and provides the "Reflectivity" products that you're used to seeing on web sites and the local news. It also provides velocity data and several more advanced data outputs.

### Level 3 Data
Level 3 data combines Level 2 data to provide additional information about the precipitation and air around the radar site. Some easier to understand forms of this data include:

- Precipitation type, known as the Hydrometeor classification (Products N0H, N1H, N2H, N3H, packet code 165)
- Various precipitation totals over 1-hour, 3-hour and storm duration. (Products N1P, N3P, NTP, OHA, DAA, PTA, DTA, packet codes 78, 79, 80, 169, 170, 171, 172)
- Storm relative velocity (N0S, N1S, N2S, N3S packet code 56)

Level 3 data is available in real-time through the AWS S3 bucket s3://unidata-nexrad-level3/

Additional documentation on the AWS bucket is available at https://registry.opendata.aws/noaa-nexrad/

The file naming convention is: SSS_PPP_YYYY_MM_DD_HH_MM_SS
| Code | Meaning |
|---|---|
| SSS | Radar site ICAO without leading K ([List](https://www.roc.noaa.gov/WSR88D/Maps.aspx)) |
| PPP | Product code [List](https://www.ncdc.noaa.gov/data-access/radar-data/nexrad-products)|
| YYYY | 4-digit year |
| MM | 2-digit month |
| DD | 2-digit day |
| HH | 2-digit, 24-hour hour |
| MM | 2-digit minute |
| SS | 2-digit seconds |

## Work In Progress
I've developed parsing algorithms for that the products that I needed most for my own use. I'm open to requests or pull requests that add additional parsing algorithms. Available products are listed below.
### Available Products
|ID|Product Code(s)|Description|
|---|---|---|
|56|N0S, N1S, N2S, N3S|Storm relative velocity|
|58|NST|Storm Tracking Information|
|59|NHI|Hail Index|
|61|NTV|Tornadic Vortex Signature|
|62|NSS|Storm Structure|
|78|N1P|One-hour precipitation|
|80|NTP|Storm Total Rainfall Accumulation|
|94|NXQ, ...|Digital Base Reflectivity|
|141|NMD|Mesocyclone|
|165|N0H, N1H, N2H, N3H|Hydrometeor Classification
|170|DAA|Digital One Hour Accumulation
|172|DTA|Storm Total Precipitation
|177|HHC|Hybrid Hydrometeor Classification
### Supported Packet Types
|Code|Description|
|---|---|
|0x0001|Text and Special Symbol Packets|
|0x0002|Text and Special Symbol Packets|
|0x0006|Linked Vector Packet|
|0x0008|Unlinked Vector Packet|
|0x000F|Special Graphic Symbol Packet|
|0x0010|Digital Radial Data Array Packet|
|0x0012|Tornado Vortex Signature|
|0x0013|Special Graphic Symbol Packet|
|0x0015|Special Graphic Symbol Packet|
|0x0016|Cell Trend Data Packet|
|0x0017|Special Graphic Symbol Packet|
|0x0018|Special Graphic Symbol Packet|
|0xAF1F|Radial Data Packet (16 Data Levels)|

## ToDo
* Add support for additional radial products
* Add support for raster products

## Acknowledgements
The code for this project is based upon:
- [Unidata](https://github.com/Unidata/thredds/blob/master/cdm/src/main/java/ucar/nc2/iosp/nexrad2/)
- [nexrad-radar-data](https://github.com/bartholomew91/nexrad-radar-data)
- And my own fork of the above [netbymatt/nexrad-radar-data](https://github.com/netbymatt/nexrad-radar-data)