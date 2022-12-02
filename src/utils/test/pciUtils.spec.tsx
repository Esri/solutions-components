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
    let expected = 7.4;
    expect(actual).toEqual(expected);
    expect(logMock).toBeCalledTimes(2);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 16;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 23.3;
    expect(actual).toEqual(expected);

    // 2
    type = "2";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = -0;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 1.1;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 3.9;
    expect(actual).toEqual(expected);

    // 3
    type = "3";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = -0.2;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 0.5;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 5.2;
    expect(actual).toEqual(expected);

    // 4
    type = "4";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = 5.3;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 17.9;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 42.7;
    expect(actual).toEqual(expected);

    // 5
    type = "5";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = 1.1;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 10.7;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 28.1;
    expect(actual).toEqual(expected);

    // 6
    type = "6";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = 5.2;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 8.1;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 16.5;
    expect(actual).toEqual(expected);

    // 7
    type = "7";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = 2;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 6.7;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 11.9;
    expect(actual).toEqual(expected);

    // 8
    type = "8";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = 0.8;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 7.1;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 11.5;
    expect(actual).toEqual(expected);

    // 9
    type = "9";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = 2;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 4;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 6;
    expect(actual).toEqual(expected);

    // 10
    type = "10";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = 0.5;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 5.7;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 13.5;
    expect(actual).toEqual(expected);

    // 11
    type = "11";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = 1;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 7.1;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 15.7;
    expect(actual).toEqual(expected);

    // 12
    type = "12";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = 18.8;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 18.8;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 18.8;
    expect(actual).toEqual(expected);

    // 13
    type = "13";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = 46.9;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 73.4;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 93.7;
    expect(actual).toEqual(expected);

    // 14
    type = "14";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = 3.3;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = -8.7;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = -1.6;
    expect(actual).toEqual(expected);

    // 15
    type = "15";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = 4.9;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 13.1;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 21.1;
    expect(actual).toEqual(expected);

    // 16
    type = "16";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = 1.5;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 6.6;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 13.7;
    expect(actual).toEqual(expected);

    // 17
    type = "17";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = 2.4;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 7.5;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 12.7;
    expect(actual).toEqual(expected);

    // 18
    type = "18";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = -2.8;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 10;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 26.3;
    expect(actual).toEqual(expected);

    // 19
    type = "19";
    actual = pciUtils.calculateDeductValue(type, "L", "0.52");
    expected = 1.4;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "M", "0.52");
    expected = 7.1;
    expect(actual).toEqual(expected);

    actual = pciUtils.calculateDeductValue(type, "H", "0.52");
    expected = 13.7;
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
    const actual = pciUtils.calculatePCI("7.9,23.4,7.5,25.1,17.9,11.2,6.9,5.3", "1", true);
    expect(actual).toEqual(expected);

    debugMessages.forEach((m, i) => {
      expect(logMock).nthCalledWith(i + 1, m);
    });
  });

  it("calculatePCI", () => {
    const logMock = jest.spyOn(console, "log").mockImplementation(() => {});

    const expected = 48.6;
    const actual = pciUtils.calculatePCI("7.9,23.4,7.5,25.1,17.9,11.2,6.9,5.3", "1", false);
    expect(actual).toEqual(expected);

    expect(logMock).toBeCalledTimes(0);
  });

  it("calculatePCI", () => {
    const logMock = jest.spyOn(console, "log").mockImplementation(() => {});

    const expected = 92.1;
    const actual = pciUtils.calculatePCI("7.9", "1", true);
    expect(actual).toEqual(expected);

    expect(logMock).lastCalledWith("Max CDV: 7.9")
  });
});
