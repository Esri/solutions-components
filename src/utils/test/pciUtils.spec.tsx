/** @license
 * Copyright 2022 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as pciUtils from "../pciUtils";

jest.setTimeout(30000);

afterEach(() => {
  jest.restoreAllMocks();
});

describe("pciUtils", () => {
  it("calculateDeductValue", () => {
    const logMock = jest.spyOn(console, "log").mockImplementation(() => {});
    // 1
    let type = "1";
    let actual = pciUtils.calculateDeductValue(type, "L", "0.52", true);
    let expected = "1|L|7.4|0.52";
    expect(actual).toEqual(expected);
    expect(logMock).toBeCalledTimes(3);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "1|M|16|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "1|H|23.3|0.52";
    expect(actual).toEqual(expected);

    // 2
    type = "2";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "2|L|0|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "2|M|1.1|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "2|H|3.9|0.52";
    expect(actual).toEqual(expected);

    // 3
    type = "3";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "3|L|-0.2|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "3|M|0.5|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "3|H|5.2|0.52";
    expect(actual).toEqual(expected);

    // 4
    type = "4";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "4|L|5.3|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "4|M|17.9|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "4|H|42.7|0.52";
    expect(actual).toEqual(expected);

    // 5
    type = "5";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "5|L|1.1|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "5|M|10.7|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "5|H|28.1|0.52";
    expect(actual).toEqual(expected);

    // 6
    type = "6";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "6|L|5.2|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "6|M|8.1|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "6|H|16.5|0.52";
    expect(actual).toEqual(expected);

    // 7
    type = "7";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "7|L|2|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "7|M|6.7|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "7|H|11.9|0.52";
    expect(actual).toEqual(expected);

    // 8
    type = "8";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "8|L|0.8|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "8|M|7.1|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "8|H|11.5|0.52";
    expect(actual).toEqual(expected);

    // 9
    type = "9";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "9|L|2|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "9|M|4|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "9|H|6|0.52";
    expect(actual).toEqual(expected);

    // 10
    type = "10";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "10|L|0.5|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "10|M|5.7|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "10|H|13.5|0.52";
    expect(actual).toEqual(expected);

    // 11
    type = "11";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "11|L|1|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "11|M|7.1|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "11|H|15.7|0.52";
    expect(actual).toEqual(expected);

    // 12
    type = "12";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "12|L|18.8|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "12|M|18.8|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "12|H|18.8|0.52";
    expect(actual).toEqual(expected);

    // 13
    type = "13";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "13|L|46.9|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "13|M|73.4|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "13|H|93.7|0.52";
    expect(actual).toEqual(expected);

    // 14
    type = "14";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "14|L|3.3|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "14|M|-8.7|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "14|H|-1.6|0.52";
    expect(actual).toEqual(expected);

    // 15
    type = "15";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "15|L|4.9|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "15|M|13.1|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "15|H|21.1|0.52";
    expect(actual).toEqual(expected);

    // 16
    type = "16";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "16|L|1.5|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "16|M|6.6|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "16|H|13.7|0.52";
    expect(actual).toEqual(expected);

    // 17
    type = "17";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "17|L|2.4|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "17|M|7.5|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "17|H|12.7|0.52";
    expect(actual).toEqual(expected);

    // 18
    type = "18";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "18|L|-2.8|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "18|M|10|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "18|H|26.3|0.52";
    expect(actual).toEqual(expected);

    // 19
    type = "19";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = "19|L|1.4|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = "19|M|7.1|0.52";
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = "19|H|13.7|0.52";
    expect(actual).toEqual(expected);
  });
  it("calculatePCI", () => {
    const debugMessages = [
      "Deduct values sorted in descending order: 25.1,23.4,17.9,11.2,7.9,7.5,6.9,5.3",
      "Highest deduct value: 25.1",
      "Allowable number of deducts including fractions: 7.87857142857143",
      "Reduce deduct values to the m largest including the fractional part: 25.1,23.4,17.9,11.2,7.9,7.5,6.9,4.7",
      "vals: 25.1,23.4,17.9,11.2,7.9,7.5,6.9,4.7",
      "totalDV: 104.60000000000002",
      "q: 8",
      "CDV: 51.412097117472015",
      "vals: 25.1,23.4,17.9,11.2,7.9,7.5,6.9,2",
      "totalDV: 101.90000000000002",
      "q: 7",
      "CDV: 50.051756691168016",
      "vals: 25.1,23.4,17.9,11.2,7.9,7.5,2,2",
      "totalDV: 97.00000000000001",
      "q: 6",
      "CDV: 47.48916845800001",
      "vals: 25.1,23.4,17.9,11.2,7.9,2,2,2",
      "totalDV: 91.50000000000001",
      "q: 5",
      "CDV: 47.433547768125",
      "vals: 25.1,23.4,17.9,11.2,2,2,2,2",
      "totalDV: 85.60000000000001",
      "q: 4",
      "CDV: 48.57397038028801",
      "vals: 25.1,23.4,17.9,2,2,2,2,2",
      "totalDV: 76.4",
      "q: 3",
      "CDV: 48.755270187200004",
      "vals: 25.1,23.4,2,2,2,2,2,2",
      "totalDV: 60.5",
      "q: 2",
      "CDV: 44.42615179325001",
      "vals: 25.1,2,2,2,2,2,2,2",
      "totalDV: 39.1",
      "q: 1",
      "CDV: 39.1",
      "Max CDV: 51.412097117472015"
    ];

    const logMock = jest.spyOn(console, "log").mockImplementation(() => {});

    const expected = 48.6;
    const actual = pciUtils.calculatePCI("7.9,23.4,7.5,25.1,17.9,11.2,6.9,5.3", true);
    expect(actual).toEqual(expected);

    debugMessages.forEach((m, i) => {
      expect(logMock).nthCalledWith(i + 1, m);
    });
  });

  it("calculatePCI", () => {
    const logMock = jest.spyOn(console, "log").mockImplementation(() => {});

    const expected = 48.6;
    const actual = pciUtils.calculatePCI("7.9,23.4,7.5,25.1,17.9,11.2,6.9,5.3", false);
    expect(actual).toEqual(expected);

    expect(logMock).toBeCalledTimes(0);
  });

  it("calculatePCI", () => {
    const logMock = jest.spyOn(console, "log").mockImplementation(() => {});

    const expected = 92.1;
    const actual = pciUtils.calculatePCI("7.9", true);
    expect(actual).toEqual(expected);

    expect(logMock).lastCalledWith("Max CDV: 7.9")
  });
});
