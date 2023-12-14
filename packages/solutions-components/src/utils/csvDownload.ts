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

//#region Public functions

/**
 * Download the CSV file
 *
 * @param title Title (without file extension) to use for file; defaults to "export"
 * @param outputLines Lines of output to write to file
 *
 * @see {@link https://medium.com/@danny.pule/export-json-to-csv-file-using-javascript-a0b7bc5b00d2}
 */
export function downloadCSVFile(
  title: string,
  outputLines: string[]
): void {
  const link = document.createElement("a");
  if (link.download !== undefined) {
    link.href = URL.createObjectURL(new Blob(outputLines, { type: "text/csv;charset=utf-8;" }));
    link.download = `${title}.csv` || "export.csv";
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

//#endregion
