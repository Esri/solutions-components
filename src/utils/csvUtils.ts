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
 * @param contentArray Array of labels; each label is an array of label line strings
 * @param removeDuplicates Remove duplicate entries before exporting
 *
 * @returns Promise when the function has completed
 */
export async function exportCSV(
  columnNames: Set<string>,
  contents: Set<string>[],
  removeDuplicates = true
): Promise<void> {
  // Format values to string so it doesn't get tripped up when a value has a comma
  // another option could be to export with a different delimiter
  let outputLines = contents.map(
    values => Object.values(values).map(v => `"${v}"`).join(",") + "\r\n"
  );

  // Remove duplicates if desired
  if (removeDuplicates) {
    const uniques: Set<string> = new Set();
    outputLines.forEach(line => uniques.add(line));
    outputLines = Array.from(uniques);
  }

  // Add the column names to the output
  if (columnNames) {
    const columnNamesLine = Object.values(columnNames).map(v => `"${v}"`).join(",") + "\r\n";
    outputLines.unshift(columnNamesLine);
  }

  console.log(outputLines);

  //_downloadCSVFile(outputLines, `notify-${Date.now().toString()}`);
}

/**
 * Download the CSV file
 *
 * @param fieldNames the names for each of the features fields
 * @param attributes the features attributes
 *
 * Based on:
 * https://medium.com/@danny.pule/export-json-to-csv-file-using-javascript-a0b7bc5b00d2
 *
 * @returns void
 */
/*
function _downloadCSVFile(
  outputLines: string[],
  fileTitle: string
): void {
  const link = document.createElement("a");
  if (link.download !== undefined) {
    link.href = URL.createObjectURL(new Blob([outputLines], { type: "text/csv;charset=utf-8;" }));
    link.download = `${fileTitle}.csv` || "export.csv";
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
*/
