/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
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
 * @param labelDescription Format to use for labels
 * @param removeDuplicates Remove duplicate labels before exporting
 */
export function exportPDF(labels, labelDescription, removeDuplicates = true) {
  const outputLabels = _prepareOutput(labels, removeDuplicates);
  _downloadPDFFile(outputLabels, labelDescription, `notify-${Date.now().toString()}`);
}
/**
 * Downloads the PDF file.
 *
 * @param labels Labels to write
 * @param labelDescription Format to use for labels
 * @param fileTitle Title (without file extension) to use for file; defaults to "export"
 */
function _downloadPDFFile(labels, labelDescription, fileTitle) {
  console.log("_downloadPDFFile", labels, labelDescription, fileTitle); //???
}
/**
 * Prepares labels for export.
 *
 * @param labels Array of labels to prepare
 * @param removeDuplicates Remove duplicate lines
 *
 * @returns De-duped array of labels if removeDuplicates is true
 */
function _prepareOutput(labels, removeDuplicates = true) {
  // Remove duplicates if desired
  if (removeDuplicates) {
    const uniques = new Set();
    labels.forEach(labelLines => uniques.add(labelLines.join("|")));
    labels = Array.from(uniques).map(label => label.split("|"));
  }
  return labels;
}
