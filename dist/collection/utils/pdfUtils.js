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
import * as PDFCreator from "../assets/arcgis-pdf-creator/PDFCreator";
import * as PDFCreator_jsPDF from "../assets/arcgis-pdf-creator/PDFCreator_jsPDF";
import * as PDFLabels from "../assets/arcgis-pdf-creator/PDFLabels";
import { getAssetPath } from "@stencil/core";
//#endregion
//#region Public functions
/**
 * Exports a PDF of labels.
 *
 * @param filename Name to use for file (without file extension); defaults to "export"
 * @param labels Labels to write
 * @param labelPageDescription Page format to use for labels
 * @param title Title for each page
* @param initialImageDataUrl Data URL of image for first page
 */
export function exportPDF(filename, labels, labelPageDescription, title = "", initialImageDataUrl = "") {
    void downloadPDFFile(filename, labels, labelPageDescription, title, initialImageDataUrl);
}
//#endregion
//#region Private functions
/**
 * Downloads the PDF file.
 *
 * @param filename Name to use for file (without file extension); defaults to "export"
 * @param labels Labels to write
 * @param labelPageDescription Page format to use for labels
 * @param title Title for each page
 * @param initialImageDataUrl Data URL of image for first page
 */
async function downloadPDFFile(filename, labels, labelPageDescription, title = "", initialImageDataUrl = "") {
    const pdfLib = new PDFCreator_jsPDF.PDFCreator_jsPDF();
    await pdfLib.initialize({
        pageType: "ANSI_A"
    }, getAssetPath(`assets/arcgis-pdf-creator/`), "en", filename // filename without ".pdf"
    );
    const labeller = new PDFLabels.PDFLabels();
    await labeller.initialize(pdfLib);
    const labelSpec = labelPageDescription.labelSpec;
    let startingPageNum = 1;
    // Add the screenshot to the PDF
    if (initialImageDataUrl) {
        const pageProperties = labelSpec.pageProperties;
        const pageSize = PDFCreator.PDFCreator.getPageSize(pageProperties.pageType);
        pdfLib.drawImage(initialImageDataUrl, {
            x: pageProperties.leftMargin,
            y: pageProperties.topMargin,
            width: pageSize.width - pageProperties.leftMargin - pageProperties.rightMargin,
            height: pageSize.height - pageProperties.topMargin - pageProperties.bottomMargin
        });
        if (title) {
            labeller.drawSupplementalText(title, 0, -0.1);
        }
        if (labels.length > 0) {
            pdfLib.addPage();
            ++startingPageNum;
        }
    }
    // Add the labels to the PDF
    await labeller.addLabelsToDoc(labels, labelSpec, startingPageNum, title // heading
    );
    pdfLib.save();
}
//#endregion
