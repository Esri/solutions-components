/* @preserve
* arcgis-pdf-creator v0.0.1
* Tue Aug 15 2023 09:31:48 GMT-0700 (Pacific Daylight Time)
*/
'use strict';

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
/*
  This module contains a generic superclass that models a PDF creator
  and two subclasses that are adaptors to two PDF libraries. This structure
  enables us to choose the PDF library to work with since each has strengths
  over the other.

  Superclass: PDFCreator
  Subclass for the jsPDF library: PDFCreator_jsPDF
*/
//--------------------------------------------------------------------------------------------------------------------//
exports.EPageType = void 0;
(function (EPageType) {
    EPageType["A4"] = "A4";
    EPageType["ANSI_A"] = "ANSI A";
})(exports.EPageType || (exports.EPageType = {}));
//====================================================================================================================//
class PDFCreator {
    // Properties are public for testing purposes
    dataPath = "";
    lang = "en";
    title = "";
    fontProps = {
        fontResolutionInchesPerPoint: 1 / 72,
        fontFullHeightRatio: 1.28
    };
    imageOptions = {
        x: 0,
        y: 0,
        width: 0,
        height: 0, // inches
    };
    lineOptions = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        lineProperties: {
            thickness: 0.1,
            color: "000000",
            opacity: 1 // 0..1
        }
    };
    pageOptions = {
        pageType: exports.EPageType.ANSI_A,
        width: 8.5,
        height: 11,
        leftMargin: 0.25,
        rightMargin: 0.25,
        topMargin: 0.25,
        bottomMargin: 0.25,
        drawNeatline: false
    };
    rectangleOptions = {
        left: 0,
        top: 0,
        width: 8.5,
        height: 11,
        lineProperties: {
            thickness: 0.1,
            color: "000000",
            opacity: 1 // 0..1
        },
        fillColor: "",
        fillOpacity: 1 // 0..1
    };
    tableOptions = {
        lineProperties: {
            thickness: 0.1,
            color: "",
            opacity: 1 // 0..1
        },
        textProperties: {
            left: 0,
            top: 0,
            fontPoints: 1,
            fontColor: "000000" // i.e., black
        }
    };
    textOptions = {
        left: 0,
        top: 0,
        fontPoints: 1,
        fontColor: "000000" // i.e., black
    };
    //-- Static methods ------------------------------------------------------------------------------------------------//
    /**
     * @class PDFCreator
     */
    static getPageSize(pageType) {
        if (typeof pageType === "string") {
            pageType = pageType === exports.EPageType.A4 ? exports.EPageType.A4 : exports.EPageType.ANSI_A;
        }
        switch (pageType) {
            case exports.EPageType.A4:
                return {
                    width: 8.25,
                    height: 11.708333
                };
            case exports.EPageType.ANSI_A:
                return {
                    width: 8.5,
                    height: 11
                };
        }
    }
    //-- Public methods ------------------------------------------------------------------------------------------------//
    /**
     * Adds a page to the document being created.
     *
     * @class PDFCreator
     */
    addPage() {
    }
    /**
     * Calculates a color intensity that emulates an opacity being applied to it.
     *
     * @param colorIntensity Color value to start with; range 0..1
     * @param opacity Opacity to apply; range 0..1
     *
     * @return Color intensity emulating the application of opacity. It works by applying the opacity value
     * to the input colorIntensity and adding the inverse of the opacity. E.g., if opacity is 1, the original
     * colorIntensity is returned; if opacity is 0, 1 is returned; if opacity is 0.5; colorIntensity/2 + 0.5 is
     * returned. It's odd, but when applied to an RGB value, it produces the desired effect.
     *
     * @class PDFCreator
     */
    applyOpacity(colorIntensity, opacity) {
        const backgroundColorIntensity = 1;
        return (colorIntensity * opacity) + backgroundColorIntensity * (1 - opacity);
    }
    /**
     * Draws a PNG image into the page.
     *
     * @params imageDataUrl Image to add to page
     * @params options Position information
     *
     * @class PDFCreator
     */
    drawImage(imageDataUrl, options) {
    }
    /**
     * @class PDFCreator
     */
    drawLine(options) {
        const updatedOptions = {
            ...this.lineOptions,
            ...options
        };
        updatedOptions.lineProperties = {
            ...this.lineOptions.lineProperties,
            ...options.lineProperties
        };
        this.updateLineProperties(updatedOptions.lineProperties);
        this.lineOptions = updatedOptions;
    }
    /**
     * @class PDFCreator
     */
    drawNeatline(lineProperties = {
        thickness: 0.005,
        color: "0000ff",
        opacity: 0.2
    }) {
        this.drawRectangle({
            left: 0,
            top: 0,
            width: this.pageOptions.width - this.pageOptions.leftMargin - this.pageOptions.rightMargin,
            height: this.pageOptions.height - this.pageOptions.topMargin - this.pageOptions.bottomMargin,
            lineProperties
        });
    }
    /**
     * @class PDFCreator
     */
    drawRectangle(options) {
        const updatedOptions = {
            ...this.rectangleOptions,
            ...options
        };
        updatedOptions.lineProperties = {
            ...this.lineOptions.lineProperties,
            ...options.lineProperties
        };
        this.updateLineProperties(updatedOptions.lineProperties);
        if (this.rectangleOptions.fillColor !== updatedOptions.fillColor ||
            this.rectangleOptions.fillOpacity !== updatedOptions.fillOpacity) {
            this.setFillColor(updatedOptions.fillColor, updatedOptions.fillOpacity);
        }
        this.rectangleOptions = updatedOptions;
    }
    /**
     * @class PDFCreator
     */
    drawTable(text, options) {
        const updatedOptions = {};
        updatedOptions.lineProperties = {
            ...this.tableOptions.lineProperties,
            ...options.lineProperties
        };
        updatedOptions.textProperties = {
            ...this.tableOptions.textProperties,
            ...options.textProperties
        };
        if (this.tableOptions.textProperties.fontPoints !== updatedOptions.textProperties.fontPoints) {
            this.setFontSize(updatedOptions.textProperties.fontPoints);
        }
        if (this.tableOptions.textProperties.fontColor !== updatedOptions.textProperties.fontColor) {
            this.setFontColor(updatedOptions.textProperties.fontColor);
        }
        this.updateLineProperties(updatedOptions.lineProperties);
        this.tableOptions = updatedOptions;
    }
    /**
     * @class PDFCreator
     */
    drawText(text, options) {
        const updatedOptions = {
            ...this.textOptions,
            ...options
        };
        if (this.textOptions.fontPoints !== updatedOptions.fontPoints) {
            this.setFontSize(updatedOptions.fontPoints);
        }
        if (this.textOptions.fontColor !== updatedOptions.fontColor) {
            this.setFontColor(updatedOptions.fontColor);
        }
        this.textOptions = updatedOptions;
    }
    /**
     * Calculates document units from top of font ascenders to baseline.
     *
     * @class PDFCreator
     */
    fontAscenderBaselineHeight(fontPoints) {
        return fontPoints * this.fontProps.fontResolutionInchesPerPoint;
    }
    /**
     * Calculates document units from top of font ascenders to bottom of descenders.
     *
     * @class PDFCreator
     */
    fontAscenderDescenderHeight(fontPoints) {
        return this.fontProps.fontFullHeightRatio * this.fontAscenderBaselineHeight(fontPoints);
    }
    /**
     * Returns the name of the font file supporting the specified locale.
     *
     * @param lang Locale such as "en" or "zh-tw"
     * @returns Font name, e.g., "0b7681dc140844ee9f409bdac249fbf0-japanese"
     *
     * @class PDFCreator
     */
    getFontFileName(lang) {
        let fontFile = "0b7681dc140844ee9f409bdac249fbf0-general";
        if (lang === "ja") {
            fontFile = "0b7681dc140844ee9f409bdac249fbf0-japanese";
        }
        else if (lang === "ko") {
            fontFile = "0b7681dc140844ee9f409bdac249fbf0-korean";
        }
        else if (lang === "zh-cn") {
            fontFile = "0b7681dc140844ee9f409bdac249fbf0-simplified-chinese";
        }
        else if (lang === "zh-hk" || lang === "zh-tw") {
            fontFile = "0b7681dc140844ee9f409bdac249fbf0-traditional-chinese";
        }
        return fontFile;
    }
    /**
     * Estimates with width of a string.
     *
     * @param text String to estimate
     * @param fontSize Text size in points
     * @returns Estimated width of text using (points x 1/72 inches/point) * 0.6;
     * need to override this generalized function with a specific PDF generator;
     * the 0.6 width:height ratio comes from https://www.fhwa.dot.gov/publications/research/safety/98057/ch03.cfm#width
     *
     * @class PDFCreator
     */
    getTextWidth(text, fontSize) {
        const ratioWidthToHeight = 0.6;
        // Return a value for testing
        return text.length * fontSize * this.fontProps.fontResolutionInchesPerPoint * ratioWidthToHeight;
    }
    /**
     * @class PDFCreator
     */
    hexToRGB(hex, opacity = 1 // 0..1
    ) {
        const colorParts = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return colorParts ? {
            r: this.applyOpacity(parseInt(colorParts[1], 16) / 255, opacity),
            g: this.applyOpacity(parseInt(colorParts[2], 16) / 255, opacity),
            b: this.applyOpacity(parseInt(colorParts[3], 16) / 255, opacity)
        } : {
            r: 0,
            g: 0,
            b: 0
        };
    }
    /**
     * @class PDFCreator
     */
    async initialize(pageProperties = {}, dataPath = "", lang = "en", title = "", drawNeatline = false) {
        if (JSON.stringify(pageProperties) !== "{}") {
            this.pageOptions.pageType = pageProperties.pageType === exports.EPageType.A4 ? exports.EPageType.A4 : exports.EPageType.ANSI_A;
            const pageSize = PDFCreator.getPageSize(this.pageOptions.pageType);
            this.pageOptions.width = pageSize.width;
            this.pageOptions.height = pageSize.height;
            this.pageOptions.leftMargin = pageProperties.leftMargin ?? this.pageOptions.leftMargin;
            this.pageOptions.rightMargin = pageProperties.rightMargin ?? this.pageOptions.rightMargin;
            this.pageOptions.topMargin = pageProperties.topMargin ?? this.pageOptions.topMargin;
            this.pageOptions.bottomMargin = pageProperties.bottomMargin ?? this.pageOptions.bottomMargin;
        }
        this.dataPath = dataPath;
        this.lang = lang;
        this.title = title || "PDF Document";
        this.pageOptions.drawNeatline = drawNeatline;
        return Promise.resolve();
    }
    /**
     * @class PDFCreator
     */
    save() {
    }
    /**
     * @class PDFCreator
     */
    setDrawColor(drawColor, // eslint-disable-line @typescript-eslint/no-unused-vars
    opacity = 1 // eslint-disable-line @typescript-eslint/no-unused-vars
    ) {
    }
    /**
     * @class PDFCreator
     */
    setFillColor(fillColor, // eslint-disable-line @typescript-eslint/no-unused-vars
    opacity = 1 // eslint-disable-line @typescript-eslint/no-unused-vars
    ) {
    }
    /**
     * @class PDFCreator
     */
    setFont(lang // eslint-disable-line @typescript-eslint/no-unused-vars
    ) {
        return Promise.resolve();
    }
    /**
     * @class PDFCreator
     */
    setFontColor(fontColor // eslint-disable-line @typescript-eslint/no-unused-vars
    ) {
    }
    /**
     * @class PDFCreator
     */
    setFontSize(fontPoints // eslint-disable-line @typescript-eslint/no-unused-vars
    ) {
    }
    /**
     * @class PDFCreator
     */
    setLang(lang) {
        if (this.lang !== lang) {
            this.lang = lang;
            return this.setFont(lang);
        }
        else {
            return Promise.resolve();
        }
    }
    /**
     * @class PDFCreator
     */
    setLineWidth(width // eslint-disable-line @typescript-eslint/no-unused-vars
    ) {
    }
    updateLineProperties(updatedProps) {
        if (this.lineOptions.lineProperties.thickness !== updatedProps.thickness) {
            this.setLineWidth(updatedProps.thickness); // Note that this changes the drawing width for ALL vectors!
        }
        if (this.lineOptions.lineProperties.color !== updatedProps.color ||
            this.lineOptions.lineProperties.opacity !== updatedProps.opacity) {
            this.setDrawColor(updatedProps.color, updatedProps.opacity); // Note that this changes the drawing color & opacity for ALL vectors!
        }
        this.lineOptions.lineProperties = updatedProps;
    }
}

exports.PDFCreator = PDFCreator;
