import { expect } from 'chai';

import User from '../src/user';

describe('User', function() {
  let user;
  let recipes;

  beforeEach(function() {
    let sampleUserData = [
      {
        "id": 1,
        "name": "Saige O'Kon",
        "pantry": [
          {
            "ingredient": 11477,
            "amount": 1
          },
          {
            "ingredient": 93820,
            "amount": 1
          },
          {
            "ingredient": 11297,
            "amount": 3
          },
          {
            "ingredient": 11547,
            "amount": 5
          },
          {
            "ingredient": 1082047,
            "amount": 5
          },
          {
            "ingredient": 1032050,
            "amount": 1
          },
          {
            "ingredient": 20081,
            "amount": 4
          },
          {
            "ingredient": 11215,
            "amount": 2
          },
          {
            "ingredient": 10514037,
            "amount": 2
          },
          {
            "ingredient": 2047,
            "amount": 2
          },
          {
            "ingredient": 12179,
            "amount": 1
          },
          {
            "ingredient": 1123,
            "amount": 4
          },
          {
            "ingredient": 11282,
            "amount": 5
          },
          {
            "ingredient": 9016,
            "amount": 4
          },
          {
            "ingredient": 14003,
            "amount": 4
          },
          {
            "ingredient": 6194,
            "amount": 2
          },
          {
            "ingredient": 16112,
            "amount": 1
          },
          {
            "ingredient": 6172,
            "amount": 3
          },
          {
            "ingredient": 2044,
            "amount": 2
          },
          {
            "ingredient": 2050,
            "amount": 3
          },
          {
            "ingredient": 1032009,
            "amount": 2
          },
          {
            "ingredient": 5114,
            "amount": 4
          },
          {
            "ingredient": 11282,
            "amount": 2
          },
          {
            "ingredient": 9412,
            "amount": 4
          },
          {
            "ingredient": 1017,
            "amount": 2
          },
          {
            "ingredient": 1056,
            "amount": 1
          },
          {
            "ingredient": 10220052,
            "amount": 5
          },
          {
            "ingredient": 2024,
            "amount": 4
          },
          {
            "ingredient": 1006972,
            "amount": 4
          },
          {
            "ingredient": 11124,
            "amount": 1
          },
          {
            "ingredient": 18371,
            "amount": 5
          },
          {
            "ingredient": 18371,
            "amount": 4
          },
          {
            "ingredient": 1001,
            "amount": 4
          },
          {
            "ingredient": 1082047,
            "amount": 4
          },
          {
            "ingredient": 11215,
            "amount": 4
          },
          {
            "ingredient": 18064,
            "amount": 3
          },
          {
            "ingredient": 11291,
            "amount": 3
          },
          {
            "ingredient": 1082047,
            "amount": 2
          },
          {
            "ingredient": 1001,
            "amount": 1
          },
          {
            "ingredient": 1082047,
            "amount": 1
          },
          {
            "ingredient": 6172,
            "amount": 2
          },
          {
            "ingredient": 20081,
            "amount": 2
          },
          {
            "ingredient": 99223,
            "amount": 4
          },
          {
            "ingredient": 11547,
            "amount": 1
          },
          {
            "ingredient": 10118368,
            "amount": 4
          },
          {
            "ingredient": 18350,
            "amount": 3
          },
          {
            "ingredient": 10018079,
            "amount": 4
          },
          {
            "ingredient": 18371,
            "amount": 3
          },
          {
            "ingredient": 1230,
            "amount": 3
          },
          {
            "ingredient": 2024,
            "amount": 1
          },
          {
            "ingredient": 4513,
            "amount": 4
          },
          {
            "ingredient": 11282,
            "amount": 5
          },
          {
            "ingredient": 1032050,
            "amount": 4
          },
          {
            "ingredient": 1001009,
            "amount": 2
          },
          {
            "ingredient": 2004,
            "amount": 2
          },
          {
            "ingredient": 11477,
            "amount": 5
          },
          {
            "ingredient": 1123,
            "amount": 2
          },
          {
            "ingredient": 9152,
            "amount": 4
          },
          {
            "ingredient": 1001,
            "amount": 5
          },
          {
            "ingredient": 1123,
            "amount": 1
          },
          {
            "ingredient": 5114,
            "amount": 4
          },
          {
            "ingredient": 19165,
            "amount": 4
          },
          {
            "ingredient": 10019087,
            "amount": 2
          },
          {
            "ingredient": 1009054,
            "amount": 3
          },
          {
            "ingredient": 5006,
            "amount": 3
          },
          {
            "ingredient": 2025,
            "amount": 2
          },
          {
            "ingredient": 18137,
            "amount": 4
          },
          {
            "ingredient": 2047,
            "amount": 2
          },
          {
            "ingredient": 9412,
            "amount": 3
          },
          {
            "ingredient": 10611282,
            "amount": 5
          },
          {
            "ingredient": 1012010,
            "amount": 5
          },
          {
            "ingredient": 1082047,
            "amount": 5
          },
          {
            "ingredient": 93607,
            "amount": 3
          },
          {
            "ingredient": 14106,
            "amount": 5
          },
          {
            "ingredient": 11020421,
            "amount": 2
          },
          {
            "ingredient": 1123,
            "amount": 5
          },
          {
            "ingredient": 11297,
            "amount": 3
          },
          {
            "ingredient": 19903,
            "amount": 3
          },
          {
            "ingredient": 9299,
            "amount": 1
          },
          {
            "ingredient": 19334,
            "amount": 3
          },
          {
            "ingredient": 1123,
            "amount": 5
          },
          {
            "ingredient": 1077,
            "amount": 1
          },
          {
            "ingredient": 20081,
            "amount": 1
          },
          {
            "ingredient": 6150,
            "amount": 2
          },
          {
            "ingredient": 1124,
            "amount": 1
          },
          {
            "ingredient": 2050,
            "amount": 5
          },
          {
            "ingredient": 93628,
            "amount": 1
          },
          {
            "ingredient": 1011,
            "amount": 5
          },
          {
            "ingredient": 1032009,
            "amount": 3
          },
          {
            "ingredient": 4053,
            "amount": 1
          },
          {
            "ingredient": 19157,
            "amount": 2
          },
          {
            "ingredient": 10011693,
            "amount": 4
          },
          {
            "ingredient": 1123,
            "amount": 4
          },
          {
            "ingredient": 16058,
            "amount": 1
          },
          {
            "ingredient": 2049,
            "amount": 5
          },
          {
            "ingredient": 9412,
            "amount": 3
          },
          {
            "ingredient": 18064,
            "amount": 4
          },
          {
            "ingredient": 11215,
            "amount": 3
          },
          {
            "ingredient": 14106,
            "amount": 4
          },
          {
            "ingredient": 1056,
            "amount": 1
          },
          {
            "ingredient": 11352,
            "amount": 1
          },
          {
            "ingredient": 93607,
            "amount": 3
          },
          {
            "ingredient": 2050,
            "amount": 4
          },
          {
            "ingredient": 1102047,
            "amount": 3
          },
          {
            "ingredient": 2047,
            "amount": 2
          },
          {
            "ingredient": 93677,
            "amount": 4
          },
          {
            "ingredient": 1082047,
            "amount": 2
          },
          {
            "ingredient": 4058,
            "amount": 1
          },
          {
            "ingredient": 19206,
            "amount": 3
          },
          {
            "ingredient": 11215,
            "amount": 1
          },
          {
            "ingredient": 11821,
            "amount": 3
          },
          {
            "ingredient": 20081,
            "amount": 4
          },
          {
            "ingredient": 18371,
            "amount": 1
          },
          {
            "ingredient": 4513,
            "amount": 5
          },
          {
            "ingredient": 5006,
            "amount": 2
          },
          {
            "ingredient": 1002035,
            "amount": 5
          },
          {
            "ingredient": 1145,
            "amount": 1
          },
          {
            "ingredient": 1230,
            "amount": 2
          },
          {
            "ingredient": 11111111,
            "amount": 1
          },
          {
            "ingredient": 9152,
            "amount": 3
          },
          {
            "ingredient": 1002030,
            "amount": 5
          },
          {
            "ingredient": 18371,
            "amount": 3
          },
          {
            "ingredient": 1145,
            "amount": 2
          },
          {
            "ingredient": 1017,
            "amount": 4
          },
          {
            "ingredient": 1032009,
            "amount": 3
          },
          {
            "ingredient": 1001,
            "amount": 2
          },
          {
            "ingredient": 1077,
            "amount": 4
          },
          {
            "ingredient": 11477,
            "amount": 2
          },
          {
            "ingredient": 11216,
            "amount": 3
          },
          {
            "ingredient": 2047,
            "amount": 2
          },
          {
            "ingredient": 12061,
            "amount": 5
          },
          {
            "ingredient": 10111111,
            "amount": 2
          },
          {
            "ingredient": 2047,
            "amount": 4
          },
          {
            "ingredient": 11282,
            "amount": 3
          },
          {
            "ingredient": 2050,
            "amount": 4
          },
          {
            "ingredient": 11477,
            "amount": 5
          },
          {
            "ingredient": 1002050,
            "amount": 5
          },
          {
            "ingredient": 15001,
            "amount": 4
          },
          {
            "ingredient": 1102047,
            "amount": 2
          },
          {
            "ingredient": 19335,
            "amount": 2
          },
          {
            "ingredient": 1124,
            "amount": 3
          },
          {
            "ingredient": 6150,
            "amount": 1
          },
          {
            "ingredient": 16124,
            "amount": 2
          },
          {
            "ingredient": 10511282,
            "amount": 3
          },
          {
            "ingredient": 1451111,
            "amount": 5
          },
          {
            "ingredient": 11297,
            "amount": 1
          },
          {
            "ingredient": 11165,
            "amount": 5
          },
          {
            "ingredient": 1002013,
            "amount": 5
          },
          {
            "ingredient": 11333,
            "amount": 5
          },
          {
            "ingredient": 1034053,
            "amount": 5
          },
          {
            "ingredient": 12179,
            "amount": 1
          },
          {
            "ingredient": 9040,
            "amount": 3
          },
          {
            "ingredient": 10011693,
            "amount": 3
          },
          {
            "ingredient": 14412,
            "amount": 2
          },
          {
            "ingredient": 1077,
            "amount": 2
          },
          {
            "ingredient": 1123,
            "amount": 4
          },
          {
            "ingredient": 1009159,
            "amount": 2
          },
          {
            "ingredient": 1031,
            "amount": 2
          },
          {
            "ingredient": 19206,
            "amount": 3
          },
          {
            "ingredient": 19335,
            "amount": 3
          },
          {
            "ingredient": 15152,
            "amount": 4
          },
          {
            "ingredient": 1145,
            "amount": 2
          },
          {
            "ingredient": 9003,
            "amount": 5
          },
          {
            "ingredient": 1077,
            "amount": 5
          },
          {
            "ingredient": 10011693,
            "amount": 1
          },
          {
            "ingredient": 10011693,
            "amount": 3
          },
          {
            "ingredient": 18371,
            "amount": 4
          },
          {
            "ingredient": 1082047,
            "amount": 3
          },
          {
            "ingredient": 20081,
            "amount": 5
          },
          {
            "ingredient": 1082047,
            "amount": 1
          },
          {
            "ingredient": 18372,
            "amount": 3
          },
          {
            "ingredient": 2044,
            "amount": 4
          },
          {
            "ingredient": 98913,
            "amount": 5
          },
          {
            "ingredient": 9152,
            "amount": 3
          },
          {
            "ingredient": 93605,
            "amount": 4
          },
          {
            "ingredient": 11215,
            "amount": 4
          },
          {
            "ingredient": 93628,
            "amount": 2
          },
          {
            "ingredient": 18137,
            "amount": 3
          },
          {
            "ingredient": 19335,
            "amount": 3
          },
          {
            "ingredient": 10062,
            "amount": 5
          },
          {
            "ingredient": 11265,
            "amount": 1
          },
          {
            "ingredient": 1002013,
            "amount": 4
          },
          {
            "ingredient": 1002030,
            "amount": 2
          },
          {
            "ingredient": 1001,
            "amount": 5
          },
          {
            "ingredient": 15152,
            "amount": 2
          },
          {
            "ingredient": 1049,
            "amount": 3
          },
          {
            "ingredient": 93605,
            "amount": 3
          },
          {
            "ingredient": 2027,
            "amount": 3
          },
          {
            "ingredient": 1002030,
            "amount": 1
          },
          {
            "ingredient": 1451111,
            "amount": 5
          },
          {
            "ingredient": 12061,
            "amount": 2
          },
          {
            "ingredient": 11297,
            "amount": 5
          },
          {
            "ingredient": 5114,
            "amount": 5
          },
          {
            "ingredient": 18372,
            "amount": 3
          },
          {
            "ingredient": 14106,
            "amount": 3
          },
          {
            "ingredient": 11529,
            "amount": 2
          },
          {
            "ingredient": 10611282,
            "amount": 5
          },
          {
            "ingredient": 9003,
            "amount": 5
          },
          {
            "ingredient": 12179,
            "amount": 1
          },
          {
            "ingredient": 10914037,
            "amount": 3
          },
          {
            "ingredient": 1082047,
            "amount": 1
          },
          {
            "ingredient": 9160,
            "amount": 1
          },
          {
            "ingredient": 12179,
            "amount": 5
          },
          {
            "ingredient": 9156,
            "amount": 5
          },
          {
            "ingredient": 1001,
            "amount": 1
          },
          {
            "ingredient": 9152,
            "amount": 4
          },
          {
            "ingredient": 11098,
            "amount": 3
          },
          {
            "ingredient": 2047,
            "amount": 1
          },
          {
            "ingredient": 20027,
            "amount": 5
          },
          {
            "ingredient": 1082047,
            "amount": 5
          },
          {
            "ingredient": 18372,
            "amount": 1
          },
          {
            "ingredient": 18371,
            "amount": 1
          },
          {
            "ingredient": 20137,
            "amount": 2
          },
          {
            "ingredient": 99223,
            "amount": 2
          },
          {
            "ingredient": 1123,
            "amount": 1
          },
          {
            "ingredient": 19335,
            "amount": 1
          },
          {
            "ingredient": 15152,
            "amount": 3
          },
          {
            "ingredient": 2027,
            "amount": 4
          },
          {
            "ingredient": 10111111,
            "amount": 2
          },
          {
            "ingredient": 1002030,
            "amount": 1
          },
          {
            "ingredient": 93677,
            "amount": 1
          },
          {
            "ingredient": 10111111,
            "amount": 1
          },
          {
            "ingredient": 10043155,
            "amount": 4
          },
          {
            "ingredient": 14106,
            "amount": 1
          },
          {
            "ingredient": 2043,
            "amount": 3
          },
          {
            "ingredient": 2036,
            "amount": 4
          },
          {
            "ingredient": 1145,
            "amount": 4
          },
          {
            "ingredient": 9037,
            "amount": 5
          }
        ]
      },
      {
        "id": 2,
        "name": "Ephraim Goyette",
        "pantry": [
          {
            "ingredient": 6150,
            "amount": 5
          },
          {
            "ingredient": 1032009,
            "amount": 3
          },
          {
            "ingredient": 11979,
            "amount": 5
          },
          {
            "ingredient": 1082047,
            "amount": 1
          },
          {
            "ingredient": 1034053,
            "amount": 4
          },
          {
            "ingredient": 99009,
            "amount": 4
          },
          {
            "ingredient": 2050,
            "amount": 1
          },
          {
            "ingredient": 19335,
            "amount": 2
          },
          {
            "ingredient": 1145,
            "amount": 1
          },
          {
            "ingredient": 9206,
            "amount": 1
          },
          {
            "ingredient": 18371,
            "amount": 3
          },
          {
            "ingredient": 19336,
            "amount": 4
          },
          {
            "ingredient": 14003,
            "amount": 4
          },
          {
            "ingredient": 2050,
            "amount": 1
          },
          {
            "ingredient": 11215,
            "amount": 3
          },
          {
            "ingredient": 9152,
            "amount": 1
          },
          {
            "ingredient": 11297,
            "amount": 5
          },
          {
            "ingredient": 11216,
            "amount": 3
          },
          {
            "ingredient": 1123,
            "amount": 1
          },
          {
            "ingredient": 19335,
            "amount": 1
          },
          {
            "ingredient": 16112,
            "amount": 3
          },
          {
            "ingredient": 16112,
            "amount": 4
          },
          {
            "ingredient": 11352,
            "amount": 1
          },
          {
            "ingredient": 4053,
            "amount": 4
          },
          {
            "ingredient": 1032009,
            "amount": 5
          },
          {
            "ingredient": 10011693,
            "amount": 1
          },
          {
            "ingredient": 5114,
            "amount": 3
          },
          {
            "ingredient": 1034053,
            "amount": 2
          },
          {
            "ingredient": 11529,
            "amount": 2
          },
          {
            "ingredient": 99144,
            "amount": 1
          },
          {
            "ingredient": 1001,
            "amount": 3
          },
          {
            "ingredient": 2027,
            "amount": 4
          },
          {
            "ingredient": 1002030,
            "amount": 1
          },
          {
            "ingredient": 20081,
            "amount": 4
          },
          {
            "ingredient": 1077,
            "amount": 2
          },
          {
            "ingredient": 11956,
            "amount": 2
          },
          {
            "ingredient": 19335,
            "amount": 2
          },
          {
            "ingredient": 11020421,
            "amount": 4
          },
          {
            "ingredient": 1145,
            "amount": 5
          },
          {
            "ingredient": 11209,
            "amount": 2
          },
          {
            "ingredient": 19336,
            "amount": 3
          },
          {
            "ingredient": 1001009,
            "amount": 5
          },
          {
            "ingredient": 11485,
            "amount": 1
          },
          {
            "ingredient": 11215,
            "amount": 1
          },
          {
            "ingredient": 11979,
            "amount": 2
          },
          {
            "ingredient": 14106,
            "amount": 3
          },
          {
            "ingredient": 10118029,
            "amount": 1
          },
          {
            "ingredient": 11215,
            "amount": 5
          },
          {
            "ingredient": 18371,
            "amount": 3
          },
          {
            "ingredient": 2009,
            "amount": 1
          },
          {
            "ingredient": 1001009,
            "amount": 4
          },
          {
            "ingredient": 1002035,
            "amount": 1
          },
          {
            "ingredient": 14106,
            "amount": 1
          },
          {
            "ingredient": 5114,
            "amount": 5
          },
          {
            "ingredient": 1123,
            "amount": 5
          },
          {
            "ingredient": 11529,
            "amount": 5
          },
          {
            "ingredient": 11216,
            "amount": 1
          },
          {
            "ingredient": 1077,
            "amount": 3
          },
          {
            "ingredient": 1056,
            "amount": 5
          },
          {
            "ingredient": 16124,
            "amount": 3
          },
          {
            "ingredient": 5096,
            "amount": 2
          },
          {
            "ingredient": 1123,
            "amount": 5
          },
          {
            "ingredient": 1145,
            "amount": 2
          },
          {
            "ingredient": 4058,
            "amount": 4
          },
          {
            "ingredient": 2031,
            "amount": 4
          },
          {
            "ingredient": 1002013,
            "amount": 3
          },
          {
            "ingredient": null,
            "amount": 3
          },
          {
            "ingredient": 6147,
            "amount": 3
          },
          {
            "ingredient": 2025,
            "amount": 4
          },
          {
            "ingredient": 19912,
            "amount": 1
          },
          {
            "ingredient": 11282,
            "amount": 4
          },
          {
            "ingredient": 1001,
            "amount": 2
          },
          {
            "ingredient": 2027,
            "amount": 2
          },
          {
            "ingredient": 10011282,
            "amount": 1
          },
          {
            "ingredient": 1082047,
            "amount": 1
          },
          {
            "ingredient": 98975,
            "amount": 5
          },
          {
            "ingredient": 11215,
            "amount": 3
          },
          {
            "ingredient": 14106,
            "amount": 4
          },
          {
            "ingredient": 4513,
            "amount": 4
          },
          {
            "ingredient": 20027,
            "amount": 3
          },
          {
            "ingredient": 20081,
            "amount": 5
          },
          {
            "ingredient": 11333,
            "amount": 2
          },
          {
            "ingredient": 19177,
            "amount": 2
          },
          {
            "ingredient": 2027,
            "amount": 1
          },
          {
            "ingredient": 1002050,
            "amount": 1
          },
          {
            "ingredient": 11821,
            "amount": 4
          },
          {
            "ingredient": 1001,
            "amount": 4
          },
          {
            "ingredient": 1002030,
            "amount": 1
          },
          {
            "ingredient": 4053,
            "amount": 3
          },
          {
            "ingredient": 9037,
            "amount": 3
          },
          {
            "ingredient": 18372,
            "amount": 3
          },
          {
            "ingredient": 11282,
            "amount": 2
          },
          {
            "ingredient": 9087,
            "amount": 5
          },
          {
            "ingredient": 93605,
            "amount": 2
          },
          {
            "ingredient": 20409,
            "amount": 1
          },
          {
            "ingredient": 1077,
            "amount": 1
          },
          {
            "ingredient": 23572,
            "amount": 4
          },
          {
            "ingredient": 19335,
            "amount": 5
          },
          {
            "ingredient": 1002030,
            "amount": 4
          },
          {
            "ingredient": 1012047,
            "amount": 2
          },
          {
            "ingredient": 8402,
            "amount": 2
          },
          {
            "ingredient": 99009,
            "amount": 5
          },
          {
            "ingredient": 11291,
            "amount": 5
          },
          {
            "ingredient": 19081,
            "amount": 1
          },
          {
            "ingredient": 11111111,
            "amount": 4
          },
          {
            "ingredient": 1102047,
            "amount": 5
          },
          {
            "ingredient": 1123,
            "amount": 1
          },
          {
            "ingredient": 19335,
            "amount": 5
          },
          {
            "ingredient": 10611282,
            "amount": 1
          },
          {
            "ingredient": 19157,
            "amount": 5
          },
          {
            "ingredient": 14106,
            "amount": 4
          },
          {
            "ingredient": 6194,
            "amount": 2
          },
          {
            "ingredient": 4053,
            "amount": 2
          },
          {
            "ingredient": 99009,
            "amount": 5
          },
          {
            "ingredient": 2010,
            "amount": 2
          },
          {
            "ingredient": 1002030,
            "amount": 2
          },
          {
            "ingredient": 2049,
            "amount": 5
          },
          {
            "ingredient": 20081,
            "amount": 5
          },
          {
            "ingredient": 9152,
            "amount": 4
          },
          {
            "ingredient": 11529,
            "amount": 2
          },
          {
            "ingredient": 1034053,
            "amount": 3
          },
          {
            "ingredient": 18371,
            "amount": 1
          },
          {
            "ingredient": 19296,
            "amount": 1
          },
          {
            "ingredient": 15175,
            "amount": 2
          },
          {
            "ingredient": 20409,
            "amount": 1
          },
          {
            "ingredient": 11477,
            "amount": 1
          },
          {
            "ingredient": 1001,
            "amount": 3
          },
          {
            "ingredient": 16051,
            "amount": 1
          },
          {
            "ingredient": 1056,
            "amount": 2
          },
          {
            "ingredient": 2047,
            "amount": 1
          },
          {
            "ingredient": 4047,
            "amount": 3
          },
          {
            "ingredient": 98913,
            "amount": 1
          },
          {
            "ingredient": 1123,
            "amount": 2
          },
          {
            "ingredient": 19335,
            "amount": 2
          },
          {
            "ingredient": 93607,
            "amount": 1
          },
          {
            "ingredient": 2018,
            "amount": 1
          },
          {
            "ingredient": 18371,
            "amount": 4
          },
          {
            "ingredient": 19296,
            "amount": 5
          },
          {
            "ingredient": 19335,
            "amount": 5
          },
          {
            "ingredient": 1034053,
            "amount": 4
          },
          {
            "ingredient": 18371,
            "amount": 2
          },
          {
            "ingredient": 18372,
            "amount": 1
          },
          {
            "ingredient": 1077,
            "amount": 3
          },
          {
            "ingredient": 2047,
            "amount": 5
          },
          {
            "ingredient": 10043155,
            "amount": 3
          },
          {
            "ingredient": 2047,
            "amount": 2
          },
          {
            "ingredient": 19177,
            "amount": 1
          },
          {
            "ingredient": 1057,
            "amount": 3
          },
          {
            "ingredient": 1006972,
            "amount": 3
          },
          {
            "ingredient": 93628,
            "amount": 5
          },
          {
            "ingredient": 1214,
            "amount": 5
          },
          {
            "ingredient": 9286,
            "amount": 5
          },
          {
            "ingredient": 1032009,
            "amount": 3
          },
          {
            "ingredient": 2009,
            "amount": 1
          },
          {
            "ingredient": 9160,
            "amount": 2
          },
          {
            "ingredient": 2047,
            "amount": 1
          },
          {
            "ingredient": 2010,
            "amount": 1
          },
          {
            "ingredient": 93828,
            "amount": 4
          },
          {
            "ingredient": 10019165,
            "amount": 1
          },
          {
            "ingredient": 6172,
            "amount": 3
          },
          {
            "ingredient": 18372,
            "amount": 4
          },
          {
            "ingredient": 1145,
            "amount": 4
          },
          {
            "ingredient": 12061,
            "amount": 5
          },
          {
            "ingredient": 11216,
            "amount": 1
          },
          {
            "ingredient": 2009,
            "amount": 4
          },
          {
            "ingredient": 11477,
            "amount": 5
          },
          {
            "ingredient": 19336,
            "amount": 2
          },
          {
            "ingredient": 12061,
            "amount": 1
          },
          {
            "ingredient": 18372,
            "amount": 4
          },
          {
            "ingredient": 11424,
            "amount": 5
          },
          {
            "ingredient": 14003,
            "amount": 2
          },
          {
            "ingredient": 20081,
            "amount": 2
          },
          {
            "ingredient": 11353,
            "amount": 1
          },
          {
            "ingredient": 16161,
            "amount": 3
          },
          {
            "ingredient": 1002035,
            "amount": 4
          },
          {
            "ingredient": 1002030,
            "amount": 1
          },
          {
            "ingredient": 19335,
            "amount": 5
          },
          {
            "ingredient": 2050,
            "amount": 2
          },
          {
            "ingredient": 19230,
            "amount": 1
          },
          {
            "ingredient": 18372,
            "amount": 2
          },
          {
            "ingredient": 19296,
            "amount": 4
          },
          {
            "ingredient": 12061,
            "amount": 5
          },
          {
            "ingredient": 1102047,
            "amount": 4
          },
          {
            "ingredient": 1082047,
            "amount": 5
          },
          {
            "ingredient": 93628,
            "amount": 4
          },
          {
            "ingredient": 11111111,
            "amount": 5
          },
          {
            "ingredient": 16124,
            "amount": 4
          },
          {
            "ingredient": 1057,
            "amount": 5
          },
          {
            "ingredient": 9299,
            "amount": 5
          },
          {
            "ingredient": 2043,
            "amount": 2
          },
          {
            "ingredient": 6615,
            "amount": 3
          },
          {
            "ingredient": 2050,
            "amount": 3
          },
          {
            "ingredient": 1002030,
            "amount": 5
          },
          {
            "ingredient": 1009054,
            "amount": 2
          },
          {
            "ingredient": 1123,
            "amount": 4
          },
          {
            "ingredient": 11215,
            "amount": 2
          },
          {
            "ingredient": 1033,
            "amount": 5
          },
          {
            "ingredient": 93628,
            "amount": 5
          },
          {
            "ingredient": 20081,
            "amount": 5
          },
          {
            "ingredient": 11215,
            "amount": 1
          },
          {
            "ingredient": 11215,
            "amount": 5
          },
          {
            "ingredient": 9003,
            "amount": 3
          },
          {
            "ingredient": 20137,
            "amount": 1
          },
          {
            "ingredient": 18371,
            "amount": 2
          },
          {
            "ingredient": 18372,
            "amount": 1
          },
          {
            "ingredient": 19335,
            "amount": 4
          },
          {
            "ingredient": 19911,
            "amount": 3
          },
          {
            "ingredient": 6194,
            "amount": 1
          },
          {
            "ingredient": 1082047,
            "amount": 3
          },
          {
            "ingredient": 11485,
            "amount": 1
          },
          {
            "ingredient": 10019165,
            "amount": 4
          },
          {
            "ingredient": 10920420,
            "amount": 1
          },
          {
            "ingredient": 1124,
            "amount": 5
          },
          {
            "ingredient": 10011693,
            "amount": 3
          },
          {
            "ingredient": 2050,
            "amount": 4
          },
          {
            "ingredient": 23078,
            "amount": 2
          },
          {
            "ingredient": 11282,
            "amount": 1
          },
          {
            "ingredient": 15152,
            "amount": 1
          },
          {
            "ingredient": 11165,
            "amount": 1
          },
          {
            "ingredient": 14106,
            "amount": 2
          },
          {
            "ingredient": 1125,
            "amount": 5
          },
          {
            "ingredient": 8061,
            "amount": 2
          },
          {
            "ingredient": 11215,
            "amount": 1
          },
          {
            "ingredient": 10010219,
            "amount": 4
          },
          {
            "ingredient": 18064,
            "amount": 1
          },
          {
            "ingredient": 1001,
            "amount": 4
          },
          {
            "ingredient": 11215,
            "amount": 5
          },
          {
            "ingredient": 23572,
            "amount": 3
          },
          {
            "ingredient": 11282,
            "amount": 4
          },
          {
            "ingredient": 93677,
            "amount": 3
          },
          {
            "ingredient": 1001,
            "amount": 2
          },
          {
            "ingredient": 10018079,
            "amount": 2
          },
          {
            "ingredient": 1089003,
            "amount": 1
          },
          {
            "ingredient": 4513,
            "amount": 3
          },
          {
            "ingredient": 12120,
            "amount": 3
          },
          {
            "ingredient": 10716050,
            "amount": 2
          },
          {
            "ingredient": 2047,
            "amount": 4
          },
          {
            "ingredient": 11333,
            "amount": 5
          },
          {
            "ingredient": 10514534,
            "amount": 3
          },
          {
            "ingredient": 9003,
            "amount": 2
          },
          {
            "ingredient": 1012047,
            "amount": 3
          },
          {
            "ingredient": 4053,
            "amount": 2
          },
          {
            "ingredient": 18137,
            "amount": 1
          },
          {
            "ingredient": 19206,
            "amount": 2
          },
          {
            "ingredient": 10511282,
            "amount": 1
          },
          {
            "ingredient": 6150,
            "amount": 4
          },
          {
            "ingredient": 1123,
            "amount": 4
          },
          {
            "ingredient": 9286,
            "amount": 3
          },
          {
            "ingredient": 2050,
            "amount": 2
          },
          {
            "ingredient": 9016,
            "amount": 2
          },
          {
            "ingredient": 1019,
            "amount": 3
          },
          {
            "ingredient": 6150,
            "amount": 1
          },
          {
            "ingredient": 9150,
            "amount": 2
          },
          {
            "ingredient": 10011693,
            "amount": 5
          },
          {
            "ingredient": 2050,
            "amount": 3
          },
          {
            "ingredient": 14132,
            "amount": 3
          },
          {
            "ingredient": 11282,
            "amount": 5
          },
          {
            "ingredient": 14106,
            "amount": 3
          },
          {
            "ingredient": 1001,
            "amount": 4
          },
          {
            "ingredient": 2010,
            "amount": 3
          },
          {
            "ingredient": 93607,
            "amount": 1
          },
          {
            "ingredient": 1001001,
            "amount": 1
          },
          {
            "ingredient": 10123,
            "amount": 5
          },
          {
            "ingredient": 20081,
            "amount": 4
          },
          {
            "ingredient": 1009054,
            "amount": 1
          },
          {
            "ingredient": 10514534,
            "amount": 1
          },
          {
            "ingredient": 9316,
            "amount": 5
          },
          {
            "ingredient": 10511282,
            "amount": 3
          },
          {
            "ingredient": 1124,
            "amount": 3
          },
          {
            "ingredient": 11507,
            "amount": 4
          },
          {
            "ingredient": 14003,
            "amount": 2
          },
          {
            "ingredient": 10011693,
            "amount": 2
          },
          {
            "ingredient": 11547,
            "amount": 1
          },
          {
            "ingredient": 9152,
            "amount": 4
          },
          {
            "ingredient": 20081,
            "amount": 2
          },
          {
            "ingredient": 2024,
            "amount": 3
          },
          {
            "ingredient": 1017,
            "amount": 4
          },
          {
            "ingredient": 14412,
            "amount": 5
          },
          {
            "ingredient": 9302,
            "amount": 5
          },
          {
            "ingredient": 2047,
            "amount": 5
          },
          {
            "ingredient": 11216,
            "amount": 4
          },
          {
            "ingredient": 6194,
            "amount": 5
          },
          {
            "ingredient": 1002030,
            "amount": 4
          },
          {
            "ingredient": 6194,
            "amount": 4
          },
          {
            "ingredient": 23636,
            "amount": 2
          },
          {
            "ingredient": 93628,
            "amount": 5
          },
          {
            "ingredient": 2047,
            "amount": 3
          },
          {
            "ingredient": 4053,
            "amount": 3
          },
          {
            "ingredient": 19335,
            "amount": 4
          },
          {
            "ingredient": 16161,
            "amount": 4
          },
          {
            "ingredient": 1011256,
            "amount": 1
          },
          {
            "ingredient": 1002030,
            "amount": 1
          },
          {
            "ingredient": 2047,
            "amount": 3
          },
          {
            "ingredient": 12061,
            "amount": 1
          },
          {
            "ingredient": 2009,
            "amount": 1
          },
          {
            "ingredient": 11507,
            "amount": 3
          },
          {
            "ingredient": 1102047,
            "amount": 2
          },
          {
            "ingredient": 10220445,
            "amount": 3
          },
          {
            "ingredient": 11297,
            "amount": 3
          },
          {
            "ingredient": 1019,
            "amount": 2
          },
          {
            "ingredient": 11297,
            "amount": 5
          },
          {
            "ingredient": 2029,
            "amount": 2
          },
          {
            "ingredient": 11821,
            "amount": 2
          },
          {
            "ingredient": 6164,
            "amount": 3
          },
          {
            "ingredient": 11216,
            "amount": 4
          },
          {
            "ingredient": 10514037,
            "amount": 1
          },
          {
            "ingredient": 1032009,
            "amount": 1
          },
          {
            "ingredient": 4053,
            "amount": 3
          },
          {
            "ingredient": 2053,
            "amount": 5
          },
          {
            "ingredient": 4053,
            "amount": 3
          },
          {
            "ingredient": 93607,
            "amount": 4
          },
          {
            "ingredient": 93607,
            "amount": 4
          },
          {
            "ingredient": 2027,
            "amount": 5
          },
          {
            "ingredient": 1002030,
            "amount": 5
          },
          {
            "ingredient": 99223,
            "amount": 2
          },
          {
            "ingredient": 9019,
            "amount": 3
          },
          {
            "ingredient": 1124,
            "amount": 3
          },
          {
            "ingredient": 1001053,
            "amount": 2
          },
          {
            "ingredient": 98913,
            "amount": 2
          },
          {
            "ingredient": 12061,
            "amount": 4
          },
          {
            "ingredient": 93653,
            "amount": 2
          },
          {
            "ingredient": 9206,
            "amount": 2
          },
          {
            "ingredient": 2025,
            "amount": 4
          },
          {
            "ingredient": 1123,
            "amount": 2
          },
          {
            "ingredient": 2025,
            "amount": 2
          },
          {
            "ingredient": 93607,
            "amount": 1
          },
          {
            "ingredient": 9302,
            "amount": 3
          },
          {
            "ingredient": 6615,
            "amount": 4
          },
          {
            "ingredient": 2027,
            "amount": 1
          },
          {
            "ingredient": 11215,
            "amount": 5
          },
          {
            "ingredient": 2025,
            "amount": 5
          },
          {
            "ingredient": 11206,
            "amount": 5
          },
          {
            "ingredient": 1001,
            "amount": 1
          },
          {
            "ingredient": 2050,
            "amount": 2
          },
          {
            "ingredient": 11821,
            "amount": 1
          },
          {
            "ingredient": 4582,
            "amount": 3
          },
          {
            "ingredient": 11124,
            "amount": 3
          },
          {
            "ingredient": 1125,
            "amount": 3
          },
          {
            "ingredient": 4053,
            "amount": 5
          },
          {
            "ingredient": 11282,
            "amount": 2
          },
          {
            "ingredient": 10514037,
            "amount": 2
          },
          {
            "ingredient": 1123,
            "amount": 3
          },
          {
            "ingredient": 11165,
            "amount": 3
          },
          {
            "ingredient": 19911,
            "amount": 5
          },
          {
            "ingredient": 10019903,
            "amount": 3
          },
          {
            "ingredient": 8061,
            "amount": 4
          },
          {
            "ingredient": 1116,
            "amount": 2
          },
          {
            "ingredient": 19334,
            "amount": 5
          },
          {
            "ingredient": 4053,
            "amount": 2
          },
          {
            "ingredient": 2024,
            "amount": 4
          },
          {
            "ingredient": 19335,
            "amount": 3
          },
          {
            "ingredient": 1056,
            "amount": 2
          },
          {
            "ingredient": 1123,
            "amount": 2
          },
          {
            "ingredient": 10211821,
            "amount": 1
          },
          {
            "ingredient": 2009,
            "amount": 1
          },
          {
            "ingredient": 1001,
            "amount": 4
          },
          {
            "ingredient": 19296,
            "amount": 5
          },
          {
            "ingredient": 2047,
            "amount": 4
          },
          {
            "ingredient": 18371,
            "amount": 4
          },
          {
            "ingredient": 9286,
            "amount": 3
          },
          {
            "ingredient": 1123,
            "amount": 1
          },
          {
            "ingredient": 18372,
            "amount": 5
          },
          {
            "ingredient": 1001,
            "amount": 5
          },
          {
            "ingredient": 20081,
            "amount": 3
          },
          {
            "ingredient": 1123,
            "amount": 2
          },
          {
            "ingredient": 1001,
            "amount": 5
          },
          {
            "ingredient": 9019,
            "amount": 3
          },
          {
            "ingredient": 10118029,
            "amount": 3
          },
          {
            "ingredient": 19336,
            "amount": 1
          },
          {
            "ingredient": 2047,
            "amount": 3
          },
          {
            "ingredient": 1125,
            "amount": 5
          },
          {
            "ingredient": 11492,
            "amount": 3
          },
          {
            "ingredient": 4053,
            "amount": 4
          },
          {
            "ingredient": 19335,
            "amount": 2
          },
          {
            "ingredient": 1002014,
            "amount": 2
          },
          {
            "ingredient": 11333,
            "amount": 4
          },
          {
            "ingredient": 18137,
            "amount": 2
          },
          {
            "ingredient": 1082047,
            "amount": 4
          },
          {
            "ingredient": 20081,
            "amount": 2
          },
          {
            "ingredient": 1001,
            "amount": 2
          },
          {
            "ingredient": 9299,
            "amount": 4
          },
          {
            "ingredient": 11291,
            "amount": 2
          },
          {
            "ingredient": 9019,
            "amount": 2
          },
          {
            "ingredient": 1057,
            "amount": 4
          },
          {
            "ingredient": 13411111,
            "amount": 4
          },
          {
            "ingredient": 18371,
            "amount": 5
          },
          {
            "ingredient": 16124,
            "amount": 3
          },
          {
            "ingredient": 5096,
            "amount": 3
          },
          {
            "ingredient": 23572,
            "amount": 4
          },
          {
            "ingredient": 1009159,
            "amount": 5
          },
          {
            "ingredient": 11485,
            "amount": 5
          },
          {
            "ingredient": 19335,
            "amount": 4
          },
          {
            "ingredient": 1031,
            "amount": 3
          },
          {
            "ingredient": 9299,
            "amount": 3
          },
          {
            "ingredient": 1102047,
            "amount": 1
          },
          {
            "ingredient": 1082047,
            "amount": 1
          },
          {
            "ingredient": 1001053,
            "amount": 1
          },
          {
            "ingredient": 1034053,
            "amount": 2
          },
          {
            "ingredient": 12120,
            "amount": 5
          },
          {
            "ingredient": 1025,
            "amount": 4
          },
          {
            "ingredient": 1082047,
            "amount": 4
          },
          {
            "ingredient": 11477,
            "amount": 4
          },
          {
            "ingredient": 2053,
            "amount": 5
          },
          {
            "ingredient": 11529,
            "amount": 2
          },
          {
            "ingredient": 1032009,
            "amount": 2
          },
          {
            "ingredient": 1057,
            "amount": 1
          },
          {
            "ingredient": 1123,
            "amount": 5
          },
          {
            "ingredient": 2050,
            "amount": 4
          },
          {
            "ingredient": 11297,
            "amount": 1
          },
          {
            "ingredient": 2043,
            "amount": 4
          },
          {
            "ingredient": 1123,
            "amount": 4
          },
          {
            "ingredient": 12061,
            "amount": 1
          },
          {
            "ingredient": 1077,
            "amount": 2
          },
          {
            "ingredient": 6194,
            "amount": 4
          },
          {
            "ingredient": 16124,
            "amount": 4
          },
          {
            "ingredient": 2047,
            "amount": 2
          },
          {
            "ingredient": 2027,
            "amount": 3
          },
          {
            "ingredient": 11215,
            "amount": 3
          },
          {
            "ingredient": 11282,
            "amount": 2
          },
          {
            "ingredient": 10118368,
            "amount": 3
          },
          {
            "ingredient": 1123,
            "amount": 4
          },
          {
            "ingredient": 19165,
            "amount": 2
          },
          {
            "ingredient": 11216,
            "amount": 3
          },
          {
            "ingredient": 98975,
            "amount": 2
          },
          {
            "ingredient": 12061,
            "amount": 1
          },
          {
            "ingredient": 93607,
            "amount": 1
          },
          {
            "ingredient": 1123,
            "amount": 2
          },
          {
            "ingredient": 2047,
            "amount": 2
          },
          {
            "ingredient": 1032009,
            "amount": 5
          },
          {
            "ingredient": 1011256,
            "amount": 5
          },
          {
            "ingredient": 20027,
            "amount": 3
          },
          {
            "ingredient": 10514534,
            "amount": 1
          },
          {
            "ingredient": 9040,
            "amount": 5
          },
          {
            "ingredient": 11353,
            "amount": 2
          },
          {
            "ingredient": 1001,
            "amount": 2
          },
          {
            "ingredient": 9412,
            "amount": 5
          },
          {
            "ingredient": 1001,
            "amount": 4
          },
          {
            "ingredient": 1123,
            "amount": 4
          },
          {
            "ingredient": 18372,
            "amount": 1
          },
          {
            "ingredient": 19081,
            "amount": 4
          },
          {
            "ingredient": 11143,
            "amount": 1
          },
          {
            "ingredient": 18137,
            "amount": 4
          },
          {
            "ingredient": 20081,
            "amount": 5
          },
          {
            "ingredient": 11353,
            "amount": 5
          },
          {
            "ingredient": 9286,
            "amount": 1
          },
          {
            "ingredient": 11547,
            "amount": 1
          },
          {
            "ingredient": 1032009,
            "amount": 3
          },
          {
            "ingredient": 12061,
            "amount": 5
          },
          {
            "ingredient": 2043,
            "amount": 3
          },
          {
            "ingredient": 19296,
            "amount": 4
          },
          {
            "ingredient": 11955,
            "amount": 1
          },
          {
            "ingredient": 11215,
            "amount": 5
          },
          {
            "ingredient": 9019,
            "amount": 4
          },
          {
            "ingredient": 11206,
            "amount": 4
          },
          {
            "ingredient": 10862,
            "amount": 4
          },
          {
            "ingredient": 1089003,
            "amount": 4
          },
          {
            "ingredient": 14003,
            "amount": 3
          },
          {
            "ingredient": 2031,
            "amount": 1
          },
          {
            "ingredient": 11298,
            "amount": 5
          },
          {
            "ingredient": 18064,
            "amount": 4
          },
          {
            "ingredient": 11020421,
            "amount": 2
          },
          {
            "ingredient": 12179,
            "amount": 5
          },
          {
            "ingredient": 1145,
            "amount": 5
          },
          {
            "ingredient": 2050,
            "amount": 4
          },
          {
            "ingredient": 1082047,
            "amount": 2
          },
          {
            "ingredient": 11282,
            "amount": 5
          },
          {
            "ingredient": 12135,
            "amount": 3
          },
          {
            "ingredient": 5006,
            "amount": 1
          },
          {
            "ingredient": 14106,
            "amount": 4
          },
          {
            "ingredient": 12211111,
            "amount": 2
          },
          {
            "ingredient": 11529,
            "amount": 1
          },
          {
            "ingredient": 1034053,
            "amount": 5
          },
          {
            "ingredient": 18372,
            "amount": 1
          },
          {
            "ingredient": 4053,
            "amount": 4
          },
          {
            "ingredient": 2029,
            "amount": 3
          },
          {
            "ingredient": 10062,
            "amount": 1
          },
          {
            "ingredient": 2025,
            "amount": 2
          },
          {
            "ingredient": 2031,
            "amount": 5
          }
        ]
      },
      {
        "id": 3,
        "name": "Nelda Bosco",
        "pantry": [
          {
            "ingredient": 1056,
            "amount": 3
          },
          {
            "ingredient": 2027,
            "amount": 5
          },
          {
            "ingredient": 1009159,
            "amount": 1
          },
          {
            "ingredient": 2018,
            "amount": 1
          },
          {
            "ingredient": 23078,
            "amount": 5
          },
          {
            "ingredient": 23636,
            "amount": 2
          },
          {
            "ingredient": 93628,
            "amount": 5
          },
          {
            "ingredient": 10018079,
            "amount": 1
          },
          {
            "ingredient": 19081,
            "amount": 1
          },
          {
            "ingredient": 93747,
            "amount": 5
          },
          {
            "ingredient": 19335,
            "amount": 1
          },
          {
            "ingredient": 10123,
            "amount": 3
          },
          {
            "ingredient": 11209,
            "amount": 3
          },
          {
            "ingredient": 10010219,
            "amount": 4
          },
          {
            "ingredient": 9412,
            "amount": 3
          },
          {
            "ingredient": 1001,
            "amount": 4
          },
          {
            "ingredient": 11529,
            "amount": 5
          },
          {
            "ingredient": 1082047,
            "amount": 5
          },
          {
            "ingredient": 2043,
            "amount": 1
          },
          {
            "ingredient": 11821,
            "amount": 3
          },
          {
            "ingredient": 4582,
            "amount": 2
          },
          {
            "ingredient": 1125,
            "amount": 2
          },
          {
            "ingredient": 2021,
            "amount": 1
          },
          {
            "ingredient": 19336,
            "amount": 1
          },
          {
            "ingredient": 19335,
            "amount": 2
          },
          {
            "ingredient": 20027,
            "amount": 3
          },
          {
            "ingredient": 10123,
            "amount": 1
          },
          {
            "ingredient": 1001,
            "amount": 3
          },
          {
            "ingredient": 11143,
            "amount": 5
          },
          {
            "ingredient": 1012042,
            "amount": 3
          },
          {
            "ingredient": 14132,
            "amount": 5
          },
          {
            "ingredient": 1123,
            "amount": 2
          },
          {
            "ingredient": 14412,
            "amount": 3
          },
          {
            "ingredient": 11298,
            "amount": 5
          },
          {
            "ingredient": 1011256,
            "amount": 5
          },
          {
            "ingredient": 2004,
            "amount": 3
          },
          {
            "ingredient": 11215,
            "amount": 5
          },
          {
            "ingredient": 11209,
            "amount": 1
          },
          {
            "ingredient": 10019087,
            "amount": 3
          },
          {
            "ingredient": 1022053,
            "amount": 4
          },
          {
            "ingredient": 19335,
            "amount": 5
          },
          {
            "ingredient": 1123,
            "amount": 2
          },
          {
            "ingredient": 6615,
            "amount": 3
          },
          {
            "ingredient": 12698,
            "amount": 3
          },
          {
            "ingredient": 11215,
            "amount": 5
          },
          {
            "ingredient": 14412,
            "amount": 4
          },
          {
            "ingredient": 11477,
            "amount": 3
          },
          {
            "ingredient": 10011693,
            "amount": 1
          },
          {
            "ingredient": 14106,
            "amount": 1
          },
          {
            "ingredient": 16124,
            "amount": 5
          },
          {
            "ingredient": 1001,
            "amount": 2
          },
          {
            "ingredient": 20081,
            "amount": 3
          },
          {
            "ingredient": 1082047,
            "amount": 2
          },
          {
            "ingredient": 4513,
            "amount": 5
          },
          {
            "ingredient": 1034053,
            "amount": 4
          },
          {
            "ingredient": 16058,
            "amount": 2
          },
          {
            "ingredient": 11124,
            "amount": 1
          },
          {
            "ingredient": 1001053,
            "amount": 3
          },
          {
            "ingredient": 11297,
            "amount": 3
          },
          {
            "ingredient": 10914037,
            "amount": 3
          },
          {
            "ingredient": 1214,
            "amount": 3
          },
          {
            "ingredient": 12211111,
            "amount": 3
          },
          {
            "ingredient": 1031,
            "amount": 4
          },
          {
            "ingredient": 93655,
            "amount": 3
          },
          {
            "ingredient": 93747,
            "amount": 4
          },
          {
            "ingredient": 93677,
            "amount": 5
          },
          {
            "ingredient": 1057,
            "amount": 2
          },
          {
            "ingredient": 2069,
            "amount": 4
          },
          {
            "ingredient": 11111111,
            "amount": 3
          },
          {
            "ingredient": 2047,
            "amount": 1
          },
          {
            "ingredient": 1124,
            "amount": 2
          },
          {
            "ingredient": 6080,
            "amount": 2
          },
          {
            "ingredient": 20081,
            "amount": 5
          },
          {
            "ingredient": 20081,
            "amount": 4
          },
          {
            "ingredient": 9156,
            "amount": 5
          },
          {
            "ingredient": 10019165,
            "amount": 2
          },
          {
            "ingredient": 2050,
            "amount": 1
          },
          {
            "ingredient": 1001,
            "amount": 4
          },
          {
            "ingredient": 18372,
            "amount": 3
          },
          {
            "ingredient": 11215,
            "amount": 3
          },
          {
            "ingredient": 5006,
            "amount": 1
          },
          {
            "ingredient": 1089003,
            "amount": 5
          },
          {
            "ingredient": 11529,
            "amount": 1
          },
          {
            "ingredient": 2047,
            "amount": 4
          },
          {
            "ingredient": 1012047,
            "amount": 2
          },
          {
            "ingredient": 2047,
            "amount": 5
          },
          {
            "ingredient": 2018,
            "amount": 2
          },
          {
            "ingredient": 6150,
            "amount": 1
          },
          {
            "ingredient": 1001053,
            "amount": 2
          },
          {
            "ingredient": 2047,
            "amount": 4
          },
          {
            "ingredient": 4053,
            "amount": 3
          },
          {
            "ingredient": 18372,
            "amount": 2
          },
          {
            "ingredient": 1012010,
            "amount": 5
          },
          {
            "ingredient": 4513,
            "amount": 1
          },
          {
            "ingredient": 9156,
            "amount": 3
          },
          {
            "ingredient": 1001009,
            "amount": 4
          },
          {
            "ingredient": 9016,
            "amount": 2
          },
          {
            "ingredient": 1123,
            "amount": 5
          },
          {
            "ingredient": 19296,
            "amount": 4
          },
          {
            "ingredient": 10220054,
            "amount": 1
          },
          {
            "ingredient": 12061,
            "amount": 3
          },
          {
            "ingredient": 93820,
            "amount": 3
          },
          {
            "ingredient": 2044,
            "amount": 3
          },
          {
            "ingredient": 18371,
            "amount": 2
          },
          {
            "ingredient": 1230,
            "amount": 4
          },
          {
            "ingredient": 93605,
            "amount": 2
          },
          {
            "ingredient": 1123,
            "amount": 1
          },
          {
            "ingredient": 1082047,
            "amount": 3
          },
          {
            "ingredient": 1145,
            "amount": 1
          },
          {
            "ingredient": 10862,
            "amount": 4
          },
          {
            "ingredient": 14106,
            "amount": 3
          },
          {
            "ingredient": 11547,
            "amount": 3
          },
          {
            "ingredient": 9156,
            "amount": 4
          },
          {
            "ingredient": 5006,
            "amount": 2
          },
          {
            "ingredient": 2021,
            "amount": 4
          },
          {
            "ingredient": 1019,
            "amount": 5
          },
          {
            "ingredient": 19335,
            "amount": 5
          },
          {
            "ingredient": 11215,
            "amount": 4
          },
          {
            "ingredient": 10123,
            "amount": 5
          },
          {
            "ingredient": 4615,
            "amount": 1
          },
          {
            "ingredient": 11291,
            "amount": 2
          },
          {
            "ingredient": 11291,
            "amount": 4
          },
          {
            "ingredient": 1009159,
            "amount": 4
          },
          {
            "ingredient": 20081,
            "amount": 5
          },
          {
            "ingredient": 9152,
            "amount": 2
          },
          {
            "ingredient": 20081,
            "amount": 3
          },
          {
            "ingredient": 1001,
            "amount": 1
          },
          {
            "ingredient": 1019,
            "amount": 2
          },
          {
            "ingredient": 99223,
            "amount": 2
          },
          {
            "ingredient": 99144,
            "amount": 1
          },
          {
            "ingredient": 18372,
            "amount": 3
          },
          {
            "ingredient": 9152,
            "amount": 5
          },
          {
            "ingredient": 16124,
            "amount": 5
          },
          {
            "ingredient": 1123,
            "amount": 5
          },
          {
            "ingredient": 2009,
            "amount": 5
          },
          {
            "ingredient": 1001,
            "amount": 4
          },
          {
            "ingredient": 1001,
            "amount": 5
          },
          {
            "ingredient": 19903,
            "amount": 1
          },
          {
            "ingredient": 19911,
            "amount": 4
          },
          {
            "ingredient": 1002013,
            "amount": 2
          },
          {
            "ingredient": 11547,
            "amount": 5
          },
          {
            "ingredient": 6080,
            "amount": 1
          },
          {
            "ingredient": 18064,
            "amount": 4
          },
          {
            "ingredient": 6615,
            "amount": 5
          },
          {
            "ingredient": 93655,
            "amount": 1
          },
          {
            "ingredient": 10011693,
            "amount": 3
          },
          {
            "ingredient": 12179,
            "amount": 4
          },
          {
            "ingredient": 18137,
            "amount": 5
          },
          {
            "ingredient": 10716050,
            "amount": 2
          },
          {
            "ingredient": 1077,
            "amount": 3
          },
          {
            "ingredient": 1077,
            "amount": 3
          },
          {
            "ingredient": 11215,
            "amount": 4
          },
          {
            "ingredient": 2050,
            "amount": 3
          },
          {
            "ingredient": 9152,
            "amount": 3
          },
          {
            "ingredient": 10220445,
            "amount": 2
          },
          {
            "ingredient": 2010,
            "amount": 5
          },
          {
            "ingredient": 1001,
            "amount": 2
          },
          {
            "ingredient": 4053,
            "amount": 2
          },
          {
            "ingredient": 4513,
            "amount": 5
          },
          {
            "ingredient": 2049,
            "amount": 1
          },
          {
            "ingredient": 1022020,
            "amount": 2
          },
          {
            "ingredient": 2036,
            "amount": 1
          },
          {
            "ingredient": 2050,
            "amount": 5
          },
          {
            "ingredient": 1049,
            "amount": 4
          },
          {
            "ingredient": 11507,
            "amount": 3
          },
          {
            "ingredient": 93820,
            "amount": 4
          },
          {
            "ingredient": 1124,
            "amount": 3
          },
          {
            "ingredient": 9150,
            "amount": 3
          },
          {
            "ingredient": 1002035,
            "amount": 5
          },
          {
            "ingredient": 18371,
            "amount": 3
          },
          {
            "ingredient": 11282,
            "amount": 5
          },
          {
            "ingredient": 19334,
            "amount": 5
          },
          {
            "ingredient": 11124,
            "amount": 3
          },
          {
            "ingredient": 14106,
            "amount": 5
          },
          {
            "ingredient": 1053,
            "amount": 4
          },
          {
            "ingredient": 4053,
            "amount": 1
          },
          {
            "ingredient": 9156,
            "amount": 2
          },
          {
            "ingredient": 2031,
            "amount": 4
          },
          {
            "ingredient": 11955,
            "amount": 3
          },
          {
            "ingredient": 11529,
            "amount": 2
          },
          {
            "ingredient": 9302,
            "amount": 1
          },
          {
            "ingredient": 2063,
            "amount": 3
          },
          {
            "ingredient": 11215,
            "amount": 1
          },
          {
            "ingredient": 1012010,
            "amount": 2
          },
          {
            "ingredient": 1451111,
            "amount": 4
          },
          {
            "ingredient": 6150,
            "amount": 2
          },
          {
            "ingredient": 4053,
            "amount": 5
          },
          {
            "ingredient": 1001,
            "amount": 4
          },
          {
            "ingredient": 11298,
            "amount": 3
          },
          {
            "ingredient": 20081,
            "amount": 3
          },
          {
            "ingredient": 1011256,
            "amount": 1
          },
          {
            "ingredient": 16124,
            "amount": 2
          },
          {
            "ingredient": 11463,
            "amount": 3
          },
          {
            "ingredient": 1006972,
            "amount": 2
          },
          {
            "ingredient": 2049,
            "amount": 1
          },
          {
            "ingredient": 2025,
            "amount": 2
          },
          {
            "ingredient": 19150,
            "amount": 4
          },
          {
            "ingredient": 18371,
            "amount": 3
          },
          {
            "ingredient": 19335,
            "amount": 2
          },
          {
            "ingredient": 2047,
            "amount": 3
          },
          {
            "ingredient": null,
            "amount": 5
          },
          {
            "ingredient": 11124,
            "amount": 3
          },
          {
            "ingredient": 12087,
            "amount": 5
          },
          {
            "ingredient": 11282,
            "amount": 2
          },
          {
            "ingredient": 4513,
            "amount": 5
          },
          {
            "ingredient": 16058,
            "amount": 5
          },
          {
            "ingredient": 1077,
            "amount": 3
          },
          {
            "ingredient": 2049,
            "amount": 5
          },
          {
            "ingredient": 16058,
            "amount": 3
          },
          {
            "ingredient": 19165,
            "amount": 1
          },
          {
            "ingredient": 10123,
            "amount": 5
          },
          {
            "ingredient": 2047,
            "amount": 2
          },
          {
            "ingredient": 16057,
            "amount": 5
          },
          {
            "ingredient": 19335,
            "amount": 5
          },
          {
            "ingredient": 19335,
            "amount": 2
          },
          {
            "ingredient": 1145,
            "amount": 5
          },
          {
            "ingredient": 12087,
            "amount": 4
          },
          {
            "ingredient": 19335,
            "amount": 3
          },
          {
            "ingredient": 1002014,
            "amount": 4
          },
          {
            "ingredient": 1082047,
            "amount": 2
          },
          {
            "ingredient": 9087,
            "amount": 5
          },
          {
            "ingredient": 99223,
            "amount": 5
          },
          {
            "ingredient": 1034053,
            "amount": 2
          },
          {
            "ingredient": 1017,
            "amount": 2
          },
          {
            "ingredient": 1001,
            "amount": 1
          },
          {
            "ingredient": 99009,
            "amount": 1
          },
          {
            "ingredient": 1012010,
            "amount": 1
          },
          {
            "ingredient": 2047,
            "amount": 2
          },
          {
            "ingredient": 4053,
            "amount": 3
          },
          {
            "ingredient": 11529,
            "amount": 1
          },
          {
            "ingredient": 11215,
            "amount": 3
          },
          {
            "ingredient": 2029,
            "amount": 5
          },
          {
            "ingredient": 1012068,
            "amount": 1
          },
          {
            "ingredient": 1123,
            "amount": 1
          },
          {
            "ingredient": 4053,
            "amount": 3
          },
          {
            "ingredient": 19335,
            "amount": 2
          },
          {
            "ingredient": 9302,
            "amount": 2
          },
          {
            "ingredient": 2028,
            "amount": 2
          },
          {
            "ingredient": 4513,
            "amount": 1
          },
          {
            "ingredient": 1056,
            "amount": 5
          },
          {
            "ingredient": 19177,
            "amount": 4
          },
          {
            "ingredient": 11215,
            "amount": 3
          },
          {
            "ingredient": 4053,
            "amount": 5
          },
          {
            "ingredient": 10862,
            "amount": 1
          },
          {
            "ingredient": 98861,
            "amount": 1
          },
          {
            "ingredient": 6615,
            "amount": 5
          },
          {
            "ingredient": 16124,
            "amount": 3
          },
          {
            "ingredient": 11477,
            "amount": 3
          },
          {
            "ingredient": 19296,
            "amount": 5
          },
          {
            "ingredient": 19334,
            "amount": 2
          },
          {
            "ingredient": 4047,
            "amount": 3
          },
          {
            "ingredient": 2036,
            "amount": 2
          },
          {
            "ingredient": 2009,
            "amount": 3
          },
          {
            "ingredient": 93707,
            "amount": 2
          },
          {
            "ingredient": 20081,
            "amount": 2
          },
          {
            "ingredient": 19336,
            "amount": 3
          },
          {
            "ingredient": 20081,
            "amount": 2
          },
          {
            "ingredient": 20081,
            "amount": 1
          },
          {
            "ingredient": 20027,
            "amount": 3
          },
          {
            "ingredient": 20317,
            "amount": 4
          },
          {
            "ingredient": 9152,
            "amount": 1
          },
          {
            "ingredient": 2021,
            "amount": 3
          },
          {
            "ingredient": 11529,
            "amount": 1
          },
          {
            "ingredient": 1009159,
            "amount": 3
          },
          {
            "ingredient": 1032009,
            "amount": 5
          },
          {
            "ingredient": 1002014,
            "amount": 3
          },
          {
            "ingredient": 1145,
            "amount": 3
          },
          {
            "ingredient": 2031,
            "amount": 4
          },
          {
            "ingredient": 11215,
            "amount": 4
          },
          {
            "ingredient": 10011693,
            "amount": 3
          },
          {
            "ingredient": 2028,
            "amount": 5
          },
          {
            "ingredient": 4058,
            "amount": 1
          },
          {
            "ingredient": 1002030,
            "amount": 2
          },
          {
            "ingredient": 10011693,
            "amount": 5
          },
          {
            "ingredient": 11282,
            "amount": 3
          },
          {
            "ingredient": 5006,
            "amount": 4
          },
          {
            "ingredient": 10019165,
            "amount": 3
          },
          {
            "ingredient": 20081,
            "amount": 5
          },
          {
            "ingredient": 11124,
            "amount": 3
          },
          {
            "ingredient": 4053,
            "amount": 5
          },
          {
            "ingredient": 9152,
            "amount": 4
          },
          {
            "ingredient": 11291,
            "amount": 2
          },
          {
            "ingredient": 16058,
            "amount": 2
          },
          {
            "ingredient": 19334,
            "amount": 3
          },
          {
            "ingredient": 10060,
            "amount": 2
          },
          {
            "ingredient": 93707,
            "amount": 4
          },
          {
            "ingredient": 16161,
            "amount": 4
          },
          {
            "ingredient": 18371,
            "amount": 4
          },
          {
            "ingredient": 18371,
            "amount": 2
          },
          {
            "ingredient": 9152,
            "amount": 4
          },
          {
            "ingredient": 16051,
            "amount": 3
          },
          {
            "ingredient": 11463,
            "amount": 2
          },
          {
            "ingredient": 1001,
            "amount": 3
          },
          {
            "ingredient": 2025,
            "amount": 5
          },
          {
            "ingredient": 1145,
            "amount": 5
          },
          {
            "ingredient": 19336,
            "amount": 4
          },
          {
            "ingredient": 19081,
            "amount": 5
          },
          {
            "ingredient": 9087,
            "amount": 1
          },
          {
            "ingredient": 93828,
            "amount": 3
          },
          {
            "ingredient": 11206,
            "amount": 5
          },
          {
            "ingredient": 1049,
            "amount": 4
          },
          {
            "ingredient": 93653,
            "amount": 3
          },
          {
            "ingredient": 2028,
            "amount": 1
          },
          {
            "ingredient": 4053,
            "amount": 5
          },
          {
            "ingredient": 4582,
            "amount": 3
          },
          {
            "ingredient": 9152,
            "amount": 4
          },
          {
            "ingredient": 10914037,
            "amount": 1
          },
          {
            "ingredient": 1102047,
            "amount": 3
          },
          {
            "ingredient": 18371,
            "amount": 4
          },
          {
            "ingredient": 4053,
            "amount": 4
          },
          {
            "ingredient": 14106,
            "amount": 5
          },
          {
            "ingredient": 93653,
            "amount": 2
          },
          {
            "ingredient": 19081,
            "amount": 3
          },
          {
            "ingredient": 10111111,
            "amount": 1
          },
          {
            "ingredient": 14412,
            "amount": 5
          },
          {
            "ingredient": 23078,
            "amount": 4
          },
          {
            "ingredient": 11215,
            "amount": 4
          },
          {
            "ingredient": 1001,
            "amount": 1
          },
          {
            "ingredient": 11291,
            "amount": 3
          },
          {
            "ingredient": 1124,
            "amount": 4
          },
          {
            "ingredient": 9019,
            "amount": 2
          },
          {
            "ingredient": 10920420,
            "amount": 4
          },
          {
            "ingredient": 1145,
            "amount": 5
          },
          {
            "ingredient": 2047,
            "amount": 1
          },
          {
            "ingredient": 9152,
            "amount": 3
          },
          {
            "ingredient": 19296,
            "amount": 5
          },
          {
            "ingredient": 2024,
            "amount": 1
          },
          {
            "ingredient": 4047,
            "amount": 2
          },
          {
            "ingredient": 1123,
            "amount": 2
          },
          {
            "ingredient": 19335,
            "amount": 2
          },
          {
            "ingredient": 9152,
            "amount": 2
          },
          {
            "ingredient": 10211821,
            "amount": 3
          },
          {
            "ingredient": 9152,
            "amount": 1
          }
        ]
      },
    ]
    let userData = sampleUserData[0];
    user = new User(userData)
    recipes = [
    {
        "name": "Loaded Chocolate Chip Pudding Cookie Cups",
        "id": 595736,
        "image": "https://spoonacular.com/recipeImages/595736-556x370.jpg",
        "ingredients": [
          {
            "name": "all purpose flour",
            "id": 20081,
            "quantity": {
              "amount": 1.5,
              "unit": "c"
            }
          },
          {
            "name": "baking soda",
            "id": 18372,
            "quantity": {
              "amount": 0.5,
              "unit": "tsp"
            }
          },
          {
            "name": "egg",
            "id": 1123,
            "quantity": {
              "amount": 1,
              "unit": "large"
            }
          },
          {
            "name": "granulated sugar",
            "id": 19335,
            "quantity": {
              "amount": 0.5,
              "unit": "c"
            }
          },
          {
            "name": "instant vanilla pudding mix",
            "id": 19206,
            "quantity": {
              "amount": 3,
              "unit": "Tbsp"
            }
          },
          {
            "name": "light brown sugar",
            "id": 19334,
            "quantity": {
              "amount": 0.5,
              "unit": "c"
            }
          },
          {
            "name": "salt",
            "id": 2047,
            "quantity": {
              "amount": 0.5,
              "unit": "tsp"
            }
          },
          {
            "name": "sea salt",
            "id": 1012047,
            "quantity": {
              "amount": 24,
              "unit": "servings"
            }
          },
          {
            "name": "semisweet chocolate chips",
            "id": 10019903,
            "quantity": {
              "amount": 2,
              "unit": "c"
            }
          },
          {
            "name": "unsalted butter",
            "id": 1145,
            "quantity": {
              "amount": 0.5,
              "unit": "c"
            }
          },
          {
            "name": "vanilla extract",
            "id": 2050,
            "quantity": {
              "amount": 0.5,
              "unit": "tsp"
            }
          }
        ],
        "instructions": [
          {
            "number": 1,
            "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy."
          },
          {
            "number": 2,
            "instruction": "Add egg and vanilla and mix until combined."
          },
          {
            "number": 3,
            "instruction": "Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees."
          },
          {
            "number": 4,
            "instruction": "Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt."
          },
          {
            "number": 5,
            "instruction": "Bake for 9 to 10 minutes, or until you see the edges start to brown."
          },
          {
            "number": 6,
            "instruction": "Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce."
          }
        ],
        "tags": [
          "antipasti",
          "starter",
          "snack",
          "appetizer",
          "antipasto",
          "hor d'oeuvre"
        ]
      },
      {
        "name": "Maple Dijon Apple Cider Grilled Pork Chops",
        "id": 678353,
        "image": "https://spoonacular.com/recipeImages/678353-556x370.jpg",
        "ingredients": [
          {
            "name": "apple cider",
            "id": 1009016,
            "quantity": {
              "amount": 1.5,
              "unit": "cups"
            }
          },
          {
            "name": "apples",
            "id": 9003,
            "quantity": {
              "amount": 2,
              "unit": ""
            }
          },
          {
            "name": "cornstarch",
            "id": 20027,
            "quantity": {
              "amount": 1,
              "unit": "tablespoon"
            }
          },
          {
            "name": "dijon mustard",
            "id": 1002046,
            "quantity": {
              "amount": 1,
              "unit": "tablespoon"
            }
          },
          {
            "name": "garlic",
            "id": 11215,
            "quantity": {
              "amount": 1,
              "unit": "clove"
            }
          },
          {
            "name": "grainy mustard",
            "id": 1012046,
            "quantity": {
              "amount": 1,
              "unit": "tablespoon"
            }
          },
          {
            "name": "maple syrup",
            "id": 19911,
            "quantity": {
              "amount": 0.25,
              "unit": "cup"
            }
          },
          {
            "name": "Miso Soybean Paste",
            "id": 16112,
            "quantity": {
              "amount": 1,
              "unit": "tablespoon"
            }
          },
          {
            "name": "pork chops",
            "id": 10010062,
            "quantity": {
              "amount": 24,
              "unit": "ounce"
            }
          },
          {
            "name": "salt and pepper",
            "id": 1102047,
            "quantity": {
              "amount": 4,
              "unit": "servings"
            }
          },
          {
            "name": "soy sauce",
            "id": 16124,
            "quantity": {
              "amount": 1,
              "unit": "tablespoon"
            }
          },
          {
            "name": "sriracha",
            "id": 1016168,
            "quantity": {
              "amount": 1,
              "unit": "tablespoon"
            }
          }
        ],
        "instructions": [
          {
            "number": 1,
            "instruction": "Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!"
          }
        ],
        "tags": [
          "lunch",
          "main course",
          "main dish",
          "dinner"
        ]
      }
    ]

  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceOf(User);
  })

  it('should take in the user\'s data as an argument', () => {
    expect(user.id).to.equal(1);
    expect(user.name).to.equal('Saige O\'Kon');
    expect(user.pantry[0].ingredient).to.equal(11477);
    expect(user.favoriteRecipes).to.deep.equal([]);
    expect(user.recipesToCook).to.deep.equal([]);
  });

  it('should be able to add a recipe to favoriteRecipes', () => {
    user.saveRecipe(recipes[0]);

    expect(user.favoriteRecipes[0].name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('should be able to remove a recipe from user\'s favoriteRecipes', () => {
    user.saveRecipe(recipes[1]);
    user.removeRecipe(recipes[1]);

    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('should be able to decide to cook a recipe', () => {
    user.decideToCook(recipes[0]);

    expect(user.recipesToCook[0].name).to.equal('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('should be able to filter favoriteRecipes by type', () => {
    user.saveRecipe(recipes[0])
    user.saveRecipe(recipes[1]);
    user.filterFavoriteRecipes('dinner');

    expect(user.filterFavoriteRecipes('dinner')).to.deep.equal([recipes[1]]);
  });

  it('should be able to filter recipesToCook by type', () => {
    user.decideToCook(recipes[0])
    user.decideToCook(recipes[1]);
    user.filterRecipesToCook('starter');

    expect(user.filterRecipesToCook('starter')).to.deep.equal([recipes[0]]);
  });

  it('should be able to search saved recipes by name', () => {
    user.saveRecipe(recipes[0])
    user.saveRecipe(recipes[1]);
    user.searchSavedRecipes('Loaded Chocolate Chip Pudding Cookie Cups');

    expect(user.searchSavedRecipes('Loaded Chocolate Chip Pudding Cookie Cups')).to.deep.equal([recipes[0]]);
  });

  it('should be able to search saved recipes by ingredient', () => {
    user.saveRecipe(recipes[0])
    user.saveRecipe(recipes[1]);
    user.searchSavedRecipes('all purpose flour');

    expect(user.searchSavedRecipes('all purpose flour')).to.deep.equal([recipes[0]]);
  });
});
