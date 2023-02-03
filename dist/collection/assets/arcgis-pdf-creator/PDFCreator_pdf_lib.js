/* @preserve
* arcgis-pdf-creator v0.0.1
* Thu Feb 02 2023 18:00:55 GMT-0800 (Pacific Standard Time)
*/
import * as fontkit from '@pdf-lib/fontkit';
import { PDFCreator, EPageType } from './PDFCreator.js';
import * as pdfLib from 'pdf-lib';

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
//--------------------------------------------------------------------------------------------------------------------//
class PDFCreator_pdf_lib extends PDFCreator {
    constructor() {
        // Properties are public for testing purposes
        super(...arguments);
        this.loadedFonts = [];
    }
    //-- Public methods ------------------------------------------------------------------------------------------------//
    /**
     * @class PDFCreator_pdf_lib
     */
    addPage() {
        super.addPage();
        this.pdfPage = this.pdfDoc.addPage(this.pageOptions.pageType === EPageType.A4 ? pdfLib.PageSizes.A4 : pdfLib.PageSizes.Letter);
        if (this.pageOptions.drawNeatline) {
            this.drawNeatline();
        }
    }
    /**
     * @class PDFCreator_pdf_lib
     */
    drawLine(options) {
        // Update this.lineOptions
        super.drawLine(options);
        const drawOptions = {
            start: {
                x: (this.pageOptions.leftMargin + this.lineOptions.x1) / this.fontProps.fontResolutionInchesPerPoint,
                y: (this.pageOptions.height - (this.pageOptions.topMargin + this.lineOptions.y1)) / this.fontProps.fontResolutionInchesPerPoint
            },
            end: {
                x: (this.pageOptions.leftMargin + this.lineOptions.x2) / this.fontProps.fontResolutionInchesPerPoint,
                y: (this.pageOptions.height - (this.pageOptions.topMargin + this.lineOptions.y2)) / this.fontProps.fontResolutionInchesPerPoint
            }
        };
        if (this.lineOptions.lineProperties.thickness > 0 && this.lineOptions.lineProperties.color) {
            drawOptions.thickness = this.lineOptions.lineProperties.thickness;
            drawOptions.color = this.getPdfLibColor(this.lineOptions.lineProperties.color);
            drawOptions.opacity = this.lineOptions.lineProperties.opacity;
        }
        this.pdfPage.drawLine(drawOptions);
    }
    /**
     * @class PDFCreator_pdf_lib
     */
    drawRectangle(options) {
        // Update this.rectangleOptions
        super.drawRectangle(options);
        const drawOptions = {
            x: (this.pageOptions.leftMargin + this.rectangleOptions.left) / this.fontProps.fontResolutionInchesPerPoint,
            y: (this.pageOptions.height - (this.pageOptions.topMargin + this.rectangleOptions.top)) / this.fontProps.fontResolutionInchesPerPoint,
            width: this.rectangleOptions.width / this.fontProps.fontResolutionInchesPerPoint,
            height: -(this.rectangleOptions.height / this.fontProps.fontResolutionInchesPerPoint)
        };
        if (this.rectangleOptions.lineProperties.thickness > 0 && this.rectangleOptions.lineProperties.color) {
            drawOptions.borderWidth = this.rectangleOptions.lineProperties.thickness;
            drawOptions.borderColor = this.getPdfLibColor(this.rectangleOptions.lineProperties.color);
            drawOptions.borderOpacity = this.rectangleOptions.lineProperties.opacity;
        }
        if (this.rectangleOptions.fillColor) {
            drawOptions.color = this.getPdfLibColor(this.rectangleOptions.fillColor);
            drawOptions.opacity = this.rectangleOptions.fillOpacity;
        }
        this.pdfPage.drawRectangle(drawOptions);
    }
    /**
     * @class PDFCreator_pdf_lib
     */
    drawTable(text, options) {
        // Update this.tableOptions
        super.drawTable(text, options);
        if (text.length === 0) {
            return;
        }
        let drawOptions = {
            x: (this.pageOptions.leftMargin + this.tableOptions.textProperties.left) / this.fontProps.fontResolutionInchesPerPoint,
            y: (this.pageOptions.height - (this.pageOptions.topMargin + this.tableOptions.textProperties.top)) / this.fontProps.fontResolutionInchesPerPoint,
            width: (this.pageOptions.width - 2 * (this.pageOptions.leftMargin + this.tableOptions.textProperties.left)) / this.fontProps.fontResolutionInchesPerPoint,
            height: -(0.4 / this.fontProps.fontResolutionInchesPerPoint)
        };
        if (this.tableOptions.lineProperties.thickness > 0 && this.tableOptions.lineProperties.color) {
            drawOptions.borderWidth = this.tableOptions.lineProperties.thickness;
            drawOptions.borderColor = this.getPdfLibColor(this.tableOptions.lineProperties.color);
        }
        this.pdfPage.drawRectangle(drawOptions);
        /*
        let left = this.pageOptions.leftMargin + this.textOptions.left;
        if (this.lang === "ar" || this.lang === "he") {
          const textWidth =
            (this.jsDoc.context2d.measureText(text) as any).width *
            this.fontProps.fontResolutionInchesPerPoint;
          left = this.pageOptions.width - this.pageOptions.leftMargin - textWidth - this.textOptions.left;
        }
        this.pdfPage.drawText(
          text[0][0],  //???
          left,
          this.pageOptions.topMargin + this.textOptions.top
        );
        */
        drawOptions = {
            x: (this.pageOptions.leftMargin + this.tableOptions.textProperties.left) / this.fontProps.fontResolutionInchesPerPoint,
            y: (this.pageOptions.height -
                (this.pageOptions.topMargin + this.tableOptions.textProperties.top + this.fontAscenderBaselineHeight(this.textOptions.fontPoints))) / this.fontProps.fontResolutionInchesPerPoint,
            size: this.tableOptions.textProperties.fontPoints,
            color: this.getPdfLibColor(this.tableOptions.textProperties.fontColor)
        };
        this.pdfPage.drawText(text[0][0], drawOptions);
    }
    /**
     * @class PDFCreator_pdf_lib
     */
    drawText(text, options) {
        // Update this.textOptions
        super.drawText(text, options);
        // Library measures up from bottom of page
        let x = this.pageOptions.leftMargin + this.textOptions.left;
        let y = this.pageOptions.height -
            (this.pageOptions.topMargin + this.textOptions.top + this.fontAscenderBaselineHeight(this.textOptions.fontPoints));
        // Library uses points for coordinates
        x /= this.fontProps.fontResolutionInchesPerPoint;
        y /= this.fontProps.fontResolutionInchesPerPoint;
        const drawOptions = {
            x,
            y,
            size: this.textOptions.fontPoints,
            color: this.getPdfLibColor(this.textOptions.fontColor)
        };
        this.pdfPage.drawText(text, drawOptions);
    }
    /**
     * @class PDFCreator_pdf_lib
     */
    getPdfLibColor(fontColor) {
        const rgb = this.hexToRGB(fontColor);
        return pdfLib.rgb(rgb.r, rgb.g, rgb.b);
    }
    /**
     * Estimates with width of a string.
     *
     * @param {string} text String to estimate
     * @param fontSize Text size in points
     * @returns {number} Estimated width of text in doc units
     *
     * @class PDFCreator_pdf_lib
     */
    getTextWidth(text, fontSize) {
        return this.font.widthOfTextAtSize(text, fontSize) * this.fontProps.fontResolutionInchesPerPoint;
    }
    /**
     * @class PDFCreator_pdf_lib
     */
    async initialize(pageProperties = {}, dataPath = "", lang = "en", title = "", drawNeatline = false, encodedPDF = undefined) {
        await super.initialize(pageProperties, dataPath, lang, title, drawNeatline);
        let pdfDocPromise;
        // Open an existing PDF document
        if (encodedPDF) {
            pdfDocPromise = pdfLib.PDFDocument.load(encodedPDF);
        }
        else {
            pdfDocPromise = pdfLib.PDFDocument.create();
        }
        // Start the PDF document
        this.pdfDoc = await pdfDocPromise;
        // Patch in tool for custom fonts
        this.pdfDoc.registerFontkit(fontkit);
        this.pdfDoc.setKeywords(["Created with ArcGIS Online"]);
        this.addPage();
        await this.setFont(lang);
    }
    /**
     * @class PDFCreator_pdf_lib
     */
    async save() {
        const base64DataUri = await this.pdfDoc.saveAsBase64({ dataUri: true });
        const link = document.createElement("a");
        link.style.visibility = "hidden";
        link.href = base64DataUri;
        link.download = this.title + ".pdf";
        link.click();
    }
    /**
     * @class PDFCreator_pdf_lib
     */
    setFont(lang) {
        const fontName = this.getFontFileName(lang);
        // Short-circuit loading font if we already have it.
        if (this.loadedFonts.includes(fontName)) {
            this.font = this.pdfDoc.fonts.filter((font) => font.name === fontName)[0];
            this.pdfPage.setFont(this.font);
            return Promise.resolve();
        }
        // Load the necessary font file
        const fontFileName = this.getFontFileName(lang);
        return fetch(this.dataPath + fontFileName + ".txt")
            .then((fontFile) => {
            return fontFile.text();
        })
            .then((font) => {
            return this.pdfDoc.embedFont(font, {
                subset: true,
                features: { liga: false },
            });
        })
            .then((font) => {
            this.font = font;
            this.pdfPage.setFont(this.font);
            this.loadedFonts.push(font.name);
            return Promise.resolve();
        });
    }
}

export { PDFCreator_pdf_lib };
