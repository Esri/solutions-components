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
 * @param contents Array of content to convert into lines of output
 * @param labelDescription Format to use for labels
 * @param removeDuplicates Remove duplicate labels before exporting
 */
export function exportPDF(
  contents: string[][],
  labelDescription: any,
  removeDuplicates = true
): void {
  const outputLabels = _prepareOutput(contents, removeDuplicates);
  console.log(outputLabels, labelDescription);//???

  //_downloadPDFFile(outputLabels, labelDescription, `notify-${Date.now().toString()}`);
}

/**
 * Download the PDF file
 *
 * @param labels Labels to write
 * @param labelDescription Format to use for labels
 * @param fileTitle Title (without file extension) to use for file; defaults to "export"
 */
/*
function _downloadPDFFile(
  fieldNames: {[key: string]: string},
  attributes: {[key: string]: string}[],
  fileTitle: string
): void {
  if (fieldNames) {
    attributes.unshift(fieldNames);
  }
  // format values to string so it doesn't get tripped up when a value has a comma
  // another option could be to export with a different delimiter
  const csv = attributes.reduce((prev, cur) => {
    return prev + Object.values(cur).map(v => `"${v}"`).join(",") + "\r\n";
  }, "");
  const link = document.createElement("a");
  if (link.download !== undefined) {
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    link.download = `${fileTitle}.csv` || "export.csv";
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
*/

/**
 * Converts output into an array of labels.
 *
 * @param contents Array of content to convert into an array of labels
 * @param removeDuplicates Remove duplicate lines
 *
 * @returns Array of labels; each label consists of an array of strings
 */
function _prepareOutput(
  contents: string[][],
  removeDuplicates = true
): string[][] {
  // Remove duplicates if desired
  if (removeDuplicates) {
    const uniques: Set<string> = new Set();
    contents.forEach(label => uniques.add(JSON.stringify(label)));
    console.log(Array.from(uniques));//???
    contents = [Array.from(uniques)];
  }

  return contents;
}
