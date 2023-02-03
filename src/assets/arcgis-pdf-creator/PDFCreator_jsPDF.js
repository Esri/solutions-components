/* @preserve
* arcgis-pdf-creator v0.0.1
* Fri Feb 03 2023 09:47:02 GMT-0800 (Pacific Standard Time)
*/
import * as jspdf from 'jspdf';
import { PDFCreator, EPageType } from './PDFCreator.js';

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
class PDFCreator_jsPDF extends PDFCreator {
    constructor(jspdfToUse = null) {
        super();
        this.jsDoc = jspdfToUse;
    }
    //-- Public methods ------------------------------------------------------------------------------------------------//
    /**
     * @class PDFCreator_jsPDF
     */
    addPage() {
        super.addPage();
        this.jsDoc.addPage();
        if (this.pageOptions.drawNeatline) {
            this.drawNeatline();
        }
    }
    /**
     * Converts a locale into a jsPDF language code.
     *
     * @param lang Locale such as "en" or "en-gb"
     * @returns jsPDF_lang_code jsPDF language code such as "en" or "en-GB", mapping AGO locales "it-it" & "pt-pt"
     * into "it" & "pt", respectively, to match jsPDF offering
     *
     * @class PDFCreator_jsPDF
     */
    convertLocaleToJsPDFLanguageCode(lang) {
        let jsPDF_lang;
        if (lang === "it-it") {
            jsPDF_lang = "it";
        }
        else if (lang === "pt-pt") {
            jsPDF_lang = "pt";
        }
        else {
            const langParts = lang.split("-");
            if (langParts.length === 1) {
                jsPDF_lang = lang;
            }
            else {
                jsPDF_lang = (langParts[0] + "-" + langParts[1].toUpperCase());
            }
        }
        return jsPDF_lang;
    }
    /**
     * @class PDFCreator_jsPDF
     */
    drawLine(options) {
        // Update this.lineOptions
        super.drawLine(options);
        this.jsDoc.line(this.pageOptions.leftMargin + this.lineOptions.x1, this.pageOptions.topMargin + this.lineOptions.y1, this.pageOptions.leftMargin + this.lineOptions.x2, this.pageOptions.topMargin + this.lineOptions.y2, (this.lineOptions.lineProperties.color ? "S" : "") // line vs. nothing
        );
    }
    /**
     * @class PDFCreator_jsPDF
     */
    drawRectangle(options) {
        // Update this.rectangleOptions
        super.drawRectangle(options);
        this.jsDoc.rect(this.pageOptions.leftMargin + this.rectangleOptions.left, this.pageOptions.topMargin + this.rectangleOptions.top, this.rectangleOptions.width, this.rectangleOptions.height, (this.rectangleOptions.lineProperties.color ?
            (this.rectangleOptions.fillColor ? "FD" : "S") : // border + fill vs. border only
            (this.rectangleOptions.fillColor ? "F" : "") // fill only vs. nothing
        ));
    }
    /**
     * @class PDFCreator_jsPDF
     */
    drawTable(text, options) {
        // Update this.tableOptions
        super.drawTable(text, options);
        /*
        let left = this.pageOptions.leftRightMargin + this.textOptions.left;
        if (this.lang === "ar" || this.lang === "he") {
          const textWidth =
            (this.jsDoc.context2d.measureText(text[0][0]) as any).width *  //???
            this.fontProps.fontResolutionInchesPerPoint;
          left = this.pageOptions.width - this.pageOptions.leftRightMargin - textWidth - this.textOptions.left;
        }
        this.jsDoc.text(
          text[0][0],  //???
          left,
          this.pageOptions.topBottomMargin + this.textOptions.top
        );
        */
        const left = this.pageOptions.leftMargin + this.textOptions.left;
        const top = this.pageOptions.topMargin + this.textOptions.top;
        this.jsDoc.text(text[0][0], left, top);
    }
    /**
     * @class PDFCreator_jsPDF
     */
    drawText(text, options) {
        // Update this.textOptions
        super.drawText(text, options);
        let left = this.pageOptions.leftMargin + this.textOptions.left;
        if (this.lang === "ar" || this.lang === "he") {
            const textWidth = this.jsDoc.context2d.measureText(text).width *
                this.fontProps.fontResolutionInchesPerPoint;
            left = this.pageOptions.width - this.pageOptions.leftMargin - textWidth - this.textOptions.left;
        }
        const top = this.pageOptions.topMargin + this.textOptions.top + this.fontAscenderBaselineHeight(this.textOptions.fontPoints);
        this.jsDoc.text(text, left, top);
    }
    /**
     * Estimates with width of a string.
     *
     * @param {string} text String to estimate
     * @param fontSize Text size in points
     * @returns {number} Estimated width of text in doc units
     *
     * @class PDFCreator_jsPDF
     */
    getTextWidth(text, fontSize) {
        return this.jsDoc.getStringUnitWidth(text) * fontSize / this.jsDoc.internal.scaleFactor;
    }
    /**
     * @class PDFCreator_jsPDF
     */
    async initialize(pageProperties = {}, dataPath = "", lang = "en", title = "", drawNeatline = false) {
        await super.initialize(pageProperties, dataPath, lang, title, drawNeatline);
        // Start the PDF document if it hasn't already been started
        if (!this.jsDoc) {
            this.jsDoc = new jspdf.jsPDF({
                format: pageProperties.pageType === EPageType.A4 ? "a4" : "letter",
                orientation: "portrait",
                putOnlyUsedFonts: true,
                unit: "in"
            });
        }
        this.jsDoc.setDocumentProperties({
            title: this.title,
            keywords: "Created with ArcGIS Online"
        });
        if (this.pageOptions.drawNeatline) {
            this.drawNeatline();
        }
        await this.setFont(lang);
    }
    /**
     * @class PDFCreator_jsPDF
     */
    save() {
        this.jsDoc.save(this.title + ".pdf");
    }
    /**
     * @class PDFCreator_jsPDF
     */
    setDrawColor(drawColor, opacity = 1 // 0..1
    ) {
        const rgb = this.hexToRGB(drawColor, opacity);
        // String inputs are in range 0..1, but jsPDF's TypeScript definitions don't have that variant
        this.jsDoc.setDrawColor(rgb.r.toString(), rgb.g.toString(), rgb.b.toString());
    }
    /**
     * @class PDFCreator_jsPDF
     */
    setFillColor(fillColor, opacity = 1 // 0..1
    ) {
        const rgb = this.hexToRGB(fillColor, opacity);
        // String inputs are in range 0..1, but jsPDF's TypeScript definitions don't have that variant
        this.jsDoc.setFillColor(rgb.r.toString(), rgb.g.toString(), rgb.b.toString());
    }
    /**
     * @class PDFCreator_jsPDF
     */
    setFont(lang) {
        this.jsDoc.setLanguage(this.convertLocaleToJsPDFLanguageCode(lang));
        const fontFileName = this.getFontFileName(lang);
        // Short-circuit loading font if we already have it.
        if (this.jsDoc.existsFileInVFS(fontFileName + ".ttf")) {
            this.jsDoc.setFont(fontFileName, "normal", "normal");
            return Promise.resolve();
        }
        // Load the necessary font file
        return fetch(this.dataPath + fontFileName + ".txt")
            .then((fontFile) => {
            return fontFile.text();
        })
            .then((font) => {
            this.jsDoc.addFileToVFS(fontFileName + ".ttf", font);
            this.jsDoc.addFont(fontFileName + ".ttf", fontFileName, "normal", "normal");
            this.jsDoc.setFont(fontFileName, "normal", "normal");
            return Promise.resolve();
        });
    }
    /**
     * @class PDFCreator_jsPDF
     */
    setFontColor(fontColor) {
        const rgb = this.hexToRGB(fontColor);
        // String inputs are in range 0..1, but jsPDF's TypeScript definitions don't have that variant
        this.jsDoc.setTextColor(rgb.r.toString(), rgb.g.toString(), rgb.b.toString());
    }
    /**
     * @class PDFCreator_jsPDF
     */
    setFontSize(fontPoints) {
        this.jsDoc.setFontSize(fontPoints);
    }
    /**
     * @class PDFCreator_jsPDF
     */
    setLineWidth(width) {
        this.jsDoc.setLineWidth(width);
    }
}

export { PDFCreator_jsPDF };
