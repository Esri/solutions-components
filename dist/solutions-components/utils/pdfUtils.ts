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
 * @param labels Labels to write
 * @param labelPageDescription Page format to use for labels
 */
export function exportPDF(
  labels: string[][],
  labelPageDescription: PDFLabels.ILabel
): void {
  _downloadPDFFile(labels, labelPageDescription, `notify-${Date.now().toString()}`);
}

//#endregion
//#region Private functions

/**
 * Downloads the PDF file.
 *
 * @param labels Labels to write
 * @param labelPageDescription Page format to use for labels
 * @param fileTitle Title (without file extension) to use for file; defaults to "export"
 */
function _downloadPDFFile(
  labels: string[][],
  labelPageDescription: PDFLabels.ILabel,
  fileTitle: string
): void {
  const pdfLib = new PDFCreator_jsPDF.PDFCreator_jsPDF();
  pdfLib.initialize(
    {
      pageType: "ANSI_A"
    }, getAssetPath(`../assets/arcgis-pdf-creator/`), "en",
    fileTitle, false
  )
  .then(
    () => {
      const labeller = new PDFLabels.PDFLabels();
      labeller.initialize(pdfLib)
      .then(
        async () => {
          await labeller.addLabelsToDoc(
            labels,
            labelPageDescription.labelSpec,
            1
          );

          pdfLib.save();
        }
      );
    }
  );

}

//#endregion