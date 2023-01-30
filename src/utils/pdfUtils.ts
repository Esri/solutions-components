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
 * Exports a PDF of labels.
 *
 * @param labels Labels to write
 * @param labelFormat Field format per label
 * @param labelPageDescription Page format to use for labels
 * @param removeDuplicates Remove duplicate labels before exporting
 */
export function exportPDF(
  labels: string[][],
  labelFormat: string[],
  labelPageDescription: any,
  removeDuplicates = true
): void {
  const outputLabels = _prepareOutput(labels, labelFormat, removeDuplicates);

  _downloadPDFFile(outputLabels, labelPageDescription, `notify-${Date.now().toString()}`);
}

/**
 * Downloads the PDF file.
 *
 * @param labels Labels to write
 * @param labelPageDescription Page format to use for labels
 * @param fileTitle Title (without file extension) to use for file; defaults to "export"
 */
function _downloadPDFFile(
  labels: string[][],
  labelPageDescription: any,
  fileTitle: string
): void {
  console.log("_downloadPDFFile", labels, labelPageDescription, fileTitle);//???
}

/**
 * Prepares labels for export.
 *
 * @param labels Array of labels to prepare
 * @param labelFormat Field format per label
 * @param removeDuplicates Remove duplicate lines
 *
 * @returns De-duped array of labels if removeDuplicates is true
 */
function _prepareOutput(
  labels: string[][],
  labelFormat: string[],
  removeDuplicates = true
): string[][] {
  // Format the input into labels
  console.log(labelFormat);

  // Remove duplicates if desired
  if (removeDuplicates) {
    const uniques: Set<string> = new Set();
    labels.forEach(labelLines => uniques.add(labelLines.join("|")));
    labels = Array.from(uniques).map(label => label.split("|"));
  }

  return labels;
}
