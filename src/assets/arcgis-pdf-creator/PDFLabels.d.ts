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
import * as PDFCreator from "./PDFCreator";
/**
 * Properties of a page of labels.
 */
export interface ILabel {
    /**
     * User-interface description of label type.
     */
    descriptionPDF: ILabelDescription;
    /**
     * Properties describing page dimensions of labels sheet.
     */
    labelSpec: ILabelSpec;
}
/**
 * User-interface description of label type.
 */
export interface ILabelDescription {
    /**
     * Width of label for display, e.g., "2-5/8"
     */
    labelWidthDisplay: string;
    /**
     * Height of label for display, e.g., "1"
     */
    labelHeightDisplay: string;
    /**
     * Number of labels on page, e.g., "30"
     */
    labelsPerPageDisplay: string;
    /**
     * Avery® part number, e.g., "*60"
     */
    averyPartNumber: string;
}
/**
 * Properties describing page dimensions of labels sheet.
 */
export interface ILabelSpec {
    /**
     * Flag indicating the nature of the label product, e.g., "AVERY", "CSV"
     */
    type: string;
    /**
     * Properties describing page dimensions in doc units.
     */
    pageProperties: PDFCreator.IPageProperties;
    /**
     * Count of labels across the width of the page
     */
    numLabelsAcross: number;
    /**
     * Count of labels down the length of the page
     */
    numLabelsDown: number;
    /**
     * Width of a label in doc units
     */
    labelWidth: number;
    /**
     * Height of a label in doc units
     */
    labelHeight: number;
    /**
     * Gap between each column of labels in doc units
     */
    horizGapIn: number;
    /**
     * Gap between each row of labels in doc units
     */
    vertGapIn: number;
    /**
     * Amount of padding within labels in doc units
     */
    labelPadding: number;
    /**
     * Font size for text put in each label in pixels
     */
    fontSizePx: number;
    /**
     * Maximum number of lines that a label is permitted to hold; subsequent lines will not be written
     */
    maxNumLabelLines: number;
}
/**
 * Function signature for reporting progress in function addLabelsToDoc.
 *
 */
export type IAddLabelsToDocProgressCallback = (
/**
 * Percent done; range 0..100
 */
percentDone: number) => void;
export declare class PDFLabels {
    PDFCreator: PDFCreator.PDFCreator;
    labelFormats: ILabel[];
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
    addLabelsToDoc(labels: string[][], labelSpec: ILabelSpec, startingPageNum: number, heading?: string, progressCallback?: IAddLabelsToDocProgressCallback): Promise<number>;
    drawLabelGuidelines(labelSpec: ILabelSpec, labelBoundaryLinesProperties?: PDFCreator.ILineProperties): void;
    /**
     * Draws supplemental text such as a heading or footer.
     *
     * @param text Text to draw
     * @param left Offset from left edge of document to left edge of text
     * @param top Offset from top of document to top of text
     */
    drawSupplementalText(text: string, left: number, top: number): void;
    /**
     * Returns the UI descriptions of the label formats.
     *
     * @returns List of label format descriptions
     *
     * @class PDFLabels
     */
    getAvailableLabelFormats(): ILabelDescription[];
    /**
     * Returns the format of the specified label.
     *
     * @param averyPartNumber Avery® label base part number, e.g., "*60" (versus actual part numbers "5160", "8160",
     * "8460", "48160"--all of which are 1" x 2-5/8" rectangular labels)
     * @returns List of label format descriptions
     *
     * @class PDFLabels
     */
    getLabelFormat(averyPartNumber: string): ILabel;
    /**
     * Loads language font file and label formats into a jsPDF `doc` object.
     *
     * @param PDFCreator PDF-drawing library
     * @throws TypeError "startPDFLabelDoc is stomping on labelFormats property" if the `labelFormats` property
     * is found in doc before the label formats are loaded into the doc.
     *
     * @class PDFLabels
     */
    initialize(PDFCreator: PDFCreator.PDFCreator): Promise<void>;
    /**
     * Removes duplicates and empties, trims label lines, and returns a sorted list.
     *
     * @class PDFLabels
     */
    removeDuplicates(labels: string[][]): string[][];
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
    _calculateLabelFirstLineBase(labelTop: number, labelHeight: number, numLabelLines: number, fontHeight: number, verticalFontGap: number): number;
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
    _clipOverlongLines(lines: string[], maxTextWidth: number, fontSize: number): string[];
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
    _getFontSizeForOverlongLines(lines: string[], maxTextWidth: number, preferredFontSize: number, minimumFontSize: number): number;
    /**
     * Loads the label formats.
     *
     * @param dataPath Path to the library's data files
     * @returns Promise resolving to the label formats JSON
     *
     * @class PDFLabels
     * @private
     */
    _loadLabelFormats(dataPath: string): Promise<ILabel[]>;
}