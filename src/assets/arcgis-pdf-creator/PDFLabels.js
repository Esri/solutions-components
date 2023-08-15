/* @preserve
* arcgis-pdf-creator v0.0.1
* Tue Aug 15 2023 09:31:48 GMT-0700 (Pacific Daylight Time)
*/
'use strict';

var grid = require('./grid.js');

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
//====================================================================================================================//
class PDFLabels {
    // Properties are public for testing purposes
    PDFCreator;
    labelFormats;
    //-- Public methods ------------------------------------------------------------------------------------------------//
    /**
     * Add labels to a PDF doc, starting at the beginning of the specified PDF doc page.
     *
     * @param labels Array of labels; each label consists of one or more line strings
     * @param labelSpec Properties describing page dimensions of labels sheet
     * @param startingPageNum The 1-based page number to start printing labels into; page is assumed to be blank & to exist
     * @param heading Line to add at top of label page outside of labels
     * @param progressCallback Callback with percent done in range 0..100
     * @returns Promise which, when resolved, returns the 1-based page number of the last page containing labels
     *
     * @class PDFLabels
     */
    addLabelsToDoc(labels, labelSpec, startingPageNum, heading, progressCallback) {
        return new Promise((resolve) => {
            const labelsPerPageDisplay = labelSpec.numLabelsAcross * labelSpec.numLabelsDown;
            let column;
            let row;
            let currentLabelLeft;
            let currentLabelTop;
            const maxLabelTextWidth = labelSpec.labelWidth - (2 * labelSpec.labelPadding);
            // Draw
            let currentPageNum = startingPageNum;
            const topOfFirstLabel = labelSpec.pageProperties.topMargin - this.PDFCreator.pageOptions.topMargin;
            if (heading) {
                this.drawSupplementalText(heading, 0, -0.1);
            }
            for (let iLabel = 0, iNonBlankLabel = 0; iLabel < labels.length; iLabel++) {
                if (progressCallback) {
                    progressCallback(Math.round(iLabel / labels.length * 100));
                }
                // Trim lines and discard blank ones
                let labelLines = labels[iLabel].map((line) => line.trim()).filter((line) => line.length > 0);
                if (labelLines.length === 0) {
                    continue;
                }
                // Are we at the beginning of a page or column?
                if (iNonBlankLabel % labelsPerPageDisplay === 0) {
                    if (iNonBlankLabel > 0) {
                        // Advance to next page
                        this.PDFCreator.addPage();
                        ++currentPageNum;
                        if (heading) {
                            this.drawSupplementalText(heading, 0, -0.1);
                        }
                    }
                    // Prep the new page
                    column = 0;
                    currentLabelLeft = 0;
                    row = 0;
                }
                else if (iNonBlankLabel % labelSpec.numLabelsDown === 0) {
                    // Advance to next column
                    currentLabelLeft = (++column * (labelSpec.labelWidth + labelSpec.horizGapIn));
                    row = 0;
                }
                // Draw the label
                const minimumFontSize = 4;
                // Temporarily reduce the font size if we have more lines than the label can hold
                let fontPoints = labelSpec.fontSizePx;
                if (labelSpec.maxNumLabelLines < labelLines.length) {
                    fontPoints = Math.max(Math.floor(labelSpec.maxNumLabelLines / labelLines.length * labelSpec.fontSizePx), minimumFontSize);
                }
                // Temporarily reduce the font size farther if label lines are too long
                fontPoints = this._getFontSizeForOverlongLines(labelLines, maxLabelTextWidth, fontPoints, minimumFontSize);
                // Clip overlong lines; append ellipses to clipped lines
                labelLines = this._clipOverlongLines(labelLines, maxLabelTextWidth, fontPoints);
                const labelLineHeight = this.PDFCreator.fontAscenderDescenderHeight(fontPoints);
                // Draw label
                currentLabelTop = topOfFirstLabel + (row++ * (labelSpec.labelHeight + labelSpec.vertGapIn));
                labelLines.forEach((line) => {
                    this.PDFCreator.drawText(line, {
                        left: currentLabelLeft + labelSpec.labelPadding,
                        top: currentLabelTop + labelSpec.labelPadding,
                        fontPoints,
                        fontColor: "000000"
                    });
                    currentLabelTop += labelLineHeight;
                });
                ++iNonBlankLabel;
            }
            if (progressCallback) {
                progressCallback(100);
            }
            resolve(currentPageNum);
        });
    }
    drawLabelGuidelines(labelSpec, labelBoundaryLinesProperties = null) {
        // Label boundaries
        if (labelBoundaryLinesProperties !== null) {
            grid.drawGridOfBoxes(this.PDFCreator, {
                // Margins in the page spec are absolute but we draw in within the margins
                x0: labelSpec.pageProperties.leftMargin - this.PDFCreator.pageOptions.leftMargin,
                y0: labelSpec.pageProperties.topMargin - this.PDFCreator.pageOptions.topMargin,
                numAcross: labelSpec.numLabelsAcross,
                numDown: labelSpec.numLabelsDown,
                width: labelSpec.labelWidth,
                height: labelSpec.labelHeight,
                horizGap: labelSpec.horizGapIn,
                vertGap: labelSpec.vertGapIn,
                lineProperties: labelBoundaryLinesProperties
            });
        }
    }
    /**
     * Draws supplemental text such as a heading or footer.
     *
     * @param text Text to draw
     * @param left Offset from left edge of document to left edge of text
     * @param top Offset from top of document to top of text
     */
    drawSupplementalText(text, left, top) {
        const fontPoints = 6;
        this.PDFCreator.drawText(text, {
            left,
            top,
            fontPoints,
            fontColor: "000000"
        });
    }
    /**
     * Returns the UI descriptions of the label formats.
     *
     * @returns List of label format descriptions
     *
     * @class PDFLabels
     */
    getAvailableLabelFormats() {
        if (this.labelFormats.length > 0) {
            return this.labelFormats.map((format) => format.descriptionPDF);
        }
        else {
            return [];
        }
    }
    /**
     * Returns the format of the specified label.
     *
     * @param averyPartNumber Avery® label base part number, e.g., "*60" (versus actual part numbers "5160", "8160",
     * "8460", "48160"--all of which are 1" x 2-5/8" rectangular labels)
     * @returns List of label format descriptions
     *
     * @class PDFLabels
     */
    getLabelFormat(averyPartNumber) {
        if (this.labelFormats.length > 0) {
            const matches = this.labelFormats.filter((format) => averyPartNumber === format.descriptionPDF.averyPartNumber);
            if (matches.length > 0) {
                return matches[0];
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }
    /**
     * Loads language font file and label formats into a jsPDF `doc` object.
     *
     * @param PDFCreator PDF-drawing library
     * @throws TypeError "startPDFLabelDoc is stomping on labelFormats property" if the `labelFormats` property
     * is found in doc before the label formats are loaded into the doc.
     *
     * @class PDFLabels
     */
    initialize(PDFCreator) {
        this.PDFCreator = PDFCreator;
        // tslint:disable-next-line: no-floating-promises
        return this._loadLabelFormats(PDFCreator.dataPath)
            .then((labelFormats) => {
            this.labelFormats = labelFormats;
            return Promise.resolve();
        });
    }
    /**
     * Removes duplicates and empties, trims label lines, and returns a sorted list.
     *
     * @class PDFLabels
     */
    removeDuplicates(labels) {
        // Screen out empty labels
        const nonEmptyLabels = labels.filter((label) => Array.isArray(label) && label.length > 0);
        // Screen out duplicates and sort the results
        // Combine the lines of each label into a single string
        const compressedLabels = nonEmptyLabels.map((label) => label.map((labelLine) => labelLine.trim())
            .join("?"));
        // Get unique values
        const uniqueLabels = {};
        compressedLabels.forEach((comprLabel) => uniqueLabels[comprLabel] = true);
        // Sort the unique labels and reconstruct the lines of each label
        const screenedLabels = Object.keys(uniqueLabels)
            .sort()
            .map((label) => label.split("?"));
        return screenedLabels;
    }
    //-- Private methods -----------------------------------------------------------------------------------------------//
    /**
     * Calculates the baseline position of the first line of text in a label.
     *
     * @param labelTop Offset from top of document to top of label
     * @param labelHeight Height of each label in doc units
     * @param numLabelLines Number of lines to be drawn in the label
     * @param fontHeight Height of text in doc units
     * @param verticalFontGap Spacing between lines of text in doc units
     * @returns Baseline position
     *
     * @class PDFLabels
     * @private
     */
    _calculateLabelFirstLineBase(labelTop, labelHeight, numLabelLines, fontHeight, verticalFontGap) {
        const labelVerticalMidpoint = labelTop + (labelHeight / 2);
        return labelVerticalMidpoint +
            (2 - numLabelLines) / 2 * fontHeight +
            (1 - numLabelLines) / 2 * verticalFontGap;
    }
    /**
     * Trims a set of text lines to fit within specified bounds.
     *
     * @param lines Text lines to be trimmed
     * @param maxTextWidth The maximum width permitted for the drawing of the text in doc units
     * @param fontSize Text size in points
     * @returns A copy of lines trimmed as necessary
     *
     * @class PDFLabels
     * @private
     */
    _clipOverlongLines(lines, maxTextWidth, fontSize) {
        const trimmedLines = [];
        lines.forEach(line => {
            line = line.trim();
            if (this.PDFCreator.getTextWidth(line, fontSize) > maxTextWidth) {
                do {
                    line = line.slice(0, -1);
                } while (this.PDFCreator.getTextWidth(line, fontSize) > maxTextWidth);
                line += '...';
            }
            trimmedLines.push(line);
        });
        return trimmedLines;
    }
    /**
     * Trims a set of text lines to fit within specified bounds.
     *
     * @param lines Text lines to be checked
     * @param maxTextWidth The maximum width permitted for the drawing of the text in doc units
     * @param preferredFontSize Initial text size in points
     * @param minimumFontSize The smallest acceptable font size in points
     * @returns The maximum of `minimumFontSize` and the font size in points that should help all lines
     * of the label to fit on the label
     *
     * @class PDFLabels
     * @private
     */
    _getFontSizeForOverlongLines(lines, maxTextWidth, preferredFontSize, minimumFontSize) {
        let fontSize = preferredFontSize;
        lines.forEach(line => {
            line = line.trim();
            if (this.PDFCreator.getTextWidth(line, fontSize) > maxTextWidth) {
                do {
                    --fontSize;
                } while (this.PDFCreator.getTextWidth(line, fontSize) > maxTextWidth && fontSize > minimumFontSize);
            }
        });
        return fontSize;
    }
    /**
     * Loads the label formats.
     *
     * @param dataPath Path to the library's data files
     * @returns Promise resolving to the label formats JSON
     *
     * @class PDFLabels
     * @private
     */
    async _loadLabelFormats(dataPath) {
        const labelFormatsFile = await fetch(dataPath + "labelFormats.json");
        const labelFormatsJson = await labelFormatsFile.json();
        return labelFormatsJson;
    }
}

exports.PDFLabels = PDFLabels;
