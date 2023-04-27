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
//#region Declarations
import * as PDFCreator_jsPDF from "../assets/arcgis-pdf-creator/PDFCreator_jsPDF";
import * as PDFLabels from "../assets/arcgis-pdf-creator/PDFLabels";
import { getAssetPath } from "@stencil/core";
export { ILabel } from "../assets/arcgis-pdf-creator/PDFLabels";
//#endregion
//#region Public functions
/**
 * Exports a PDF of labels.
 *
 * @param filename Name to use for file (without file extension); defaults to "export"
 * @param labels Labels to write
 * @param labelPageDescription Page format to use for labels
 * @param includeTitle When true, a title is included on every page
 * @param title Title for each page when `includeTitle` is true
 */
export function exportPDF(filename, labels, labelPageDescription, includeTitle = false, title = "") {
  downloadPDFFile(filename, labels, labelPageDescription, includeTitle, title);
}
//#endregion
//#region Private functions
/**
 * Downloads the PDF file.
 *
 * @param filename Name to use for file (without file extension); defaults to "export"
 * @param labels Labels to write
 * @param labelPageDescription Page format to use for labels
 * @param includeTitle When true, a title is included on every page
 * @param title Title for each page when `includeTitle` is true
 */
function downloadPDFFile(filename, labels, labelPageDescription, includeTitle = false, title = "") {
  const pdfLib = new PDFCreator_jsPDF.PDFCreator_jsPDF();
  pdfLib.initialize({
    pageType: "ANSI_A"
  }, getAssetPath(`../assets/arcgis-pdf-creator/`), "en", filename // filename without ".pdf"
  )
    .then(() => {
    const labeller = new PDFLabels.PDFLabels();
    labeller.initialize(pdfLib)
      .then(async () => {
      await labeller.addLabelsToDoc(labels, labelPageDescription.labelSpec, 1, // startingPageNum
      includeTitle ? title : "" // heading
      );
      pdfLib.save();
    });
  });
}
//#endregion
