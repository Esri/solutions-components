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
import * as grid from "../assets/arcgis-pdf-creator/grid";
import * as PDFCreator from "../assets/arcgis-pdf-creator/PDFCreator";
import * as PDFCreator_jsPDF from "../assets/arcgis-pdf-creator/PDFCreator_jsPDF";
/**
 * Exports a PDF of labels.
 *
 * @param labels Labels to write
 * @param labelPageDescription Page format to use for labels
 */
export function exportPDF(labels, labelPageDescription) {
  _downloadPDFFile(labels, labelPageDescription, `notify-${Date.now().toString()}`);
}
/**
 * Downloads the PDF file.
 *
 * @param labels Labels to write
 * @param labelPageDescription Page format to use for labels
 * @param fileTitle Title (without file extension) to use for file; defaults to "export"
 */
function _downloadPDFFile(labels, labelPageDescription, fileTitle) {
  console.log("_downloadPDFFile", labels, labelPageDescription, fileTitle); //???
  console.log(JSON.stringify((new PDFCreator()).getPageSize("A4")));
  const pdfLib = new PDFCreator_jsPDF();
  pdfLib.initialize({
    pageType: "ANSI_A"
  }, "../../dist/", "en", "My Labels", false)
    .then(() => {
    // Draw frame with tick marks
    grid.drawMeasurementLines(pdfLib);
    // Draw a grid of boxes
    grid.drawGridOfBoxes(pdfLib, {
      numAcross: 10,
      numDown: 10,
      x0: 0.25,
      y0: 0.25,
      width: 0.5,
      height: 0.25,
      horizGap: 0.25,
      vertGap: 0.25,
      lineProperties: {
        thickness: 0.01,
        color: "00ff00",
        opacity: 0.75 // 0..1
      }
    } // as pdfLib.IGridOptions
    );
    pdfLib.save();
  });
}
