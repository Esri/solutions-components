/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

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
/**
 * Export a csv of the attributes from the features that match the provided ids
 *
 * @param labels Labels to write
 */
function exportCSV(labels) {
  // Format values to string so it doesn't get tripped up when a value has a comma
  // another option could be to export with a different delimiter
  const outputLines = labels.map(label => Object.values(label).map(v => `"${v}"`).join(",") + "\r\n");
  _downloadCSVFile(outputLines, `notify-${Date.now().toString()}`);
}
/**
 * Download the CSV file
 *
 * @param outputLines Lines of output to write to file
 * @param fileTitle Title (without file extension) to use for file; defaults to "export"
 *
 * @see {@link https://medium.com/@danny.pule/export-json-to-csv-file-using-javascript-a0b7bc5b00d2}
 */
function _downloadCSVFile(outputLines, fileTitle) {
  const link = document.createElement("a");
  if (link.download !== undefined) {
    link.href = URL.createObjectURL(new Blob(outputLines, { type: "text/csv;charset=utf-8;" }));
    link.download = `${fileTitle}.csv` || "export.csv";
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

exports.exportCSV = exportCSV;

//# sourceMappingURL=csvUtils-3a56c6d8.js.map