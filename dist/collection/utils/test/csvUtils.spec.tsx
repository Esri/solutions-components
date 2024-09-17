/** @license
 * Copyright 2023 Esri
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

import * as csvDownload from "../csvDownload";
import * as csvUtils from "../csvUtils";
import {expect, jest} from "@jest/globals";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("csvUtils", () => {

  describe("exportCSV", () => {

    it("prepares output lines 1", () => {
      const title = "title";
      const labels = [
        ["Cyd Charise", "1922 Main St", "Amarillo, TX 79118"],
        ["Fred Astaire", "1899 Main St", "Omaha, NE 68022"],
        ["Gene Kelly", "1912 Main St", "Pittsburgh, PA 15215"],
        ["Ginger Rogers", "1911 Main St", "Independence, MO 64050"]
      ];
      const expectedOutputLines = [
        "\"Cyd Charise\",\"1922 Main St\",\"Amarillo, TX 79118\"\r\n",
        "\"Fred Astaire\",\"1899 Main St\",\"Omaha, NE 68022\"\r\n",
        "\"Gene Kelly\",\"1912 Main St\",\"Pittsburgh, PA 15215\"\r\n",
        "\"Ginger Rogers\",\"1911 Main St\",\"Independence, MO 64050\"\r\n"
      ];

      const downloadCSVFileMock = jest.spyOn(csvDownload, "downloadCSVFile")
        .mockImplementation(() => {});
      csvUtils.exportCSV(title, labels);
      expect(downloadCSVFileMock).toBeCalledTimes(1);
      expect(downloadCSVFileMock.mock.calls[0][0]).toEqual(title);
      expect(downloadCSVFileMock.mock.calls[0][1]).toEqual(expectedOutputLines);
    });

  });

});
