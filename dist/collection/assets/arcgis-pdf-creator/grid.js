/* @preserve
* arcgis-pdf-creator v0.0.1
* Thu Apr 27 2023 17:20:32 GMT-0700 (Pacific Daylight Time)
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
//--------------------------------------------------------------------------------------------------------------------//
/**
 * Draws a grid of boxes with optional gaps between boxes.
 *
 * @param PDFCreator PDF-drawing library
 * @param numAcross Number of boxes in each row
 * @param numDown Number of boxes in each column
 * @param x0 Offset in doc units to left edge of leftmost column of boxes
 * @param y0 Offset in doc units to top edge of topmost row of boxes
 * @param width Width of each box in doc units
 * @param height Height of each box in doc units
 * @param horizGap Gap in doc units between two boxes in the same row
 * @param vertGap Gap in doc units between two boxes in the same column
 * @param lineProperties Drawing properties for grid lines
 */
function drawGridOfBoxes(PDFCreator, options = {
    numAcross: 1,
    numDown: 1,
    x0: 0,
    y0: 0,
    width: 1,
    height: 1,
    horizGap: 0,
    vertGap: 0,
    lineProperties: {
        thickness: 0,
        color: "",
        opacity: 1 // 0..1
    }
}) {
    // Draw the set of boxes
    for (let j = 0; j < options.numDown; ++j) {
        for (let i = 0; i < options.numAcross; ++i) {
            PDFCreator.drawRectangle({
                left: options.x0 + i * (options.width + options.horizGap),
                top: options.y0 + j * (options.height + options.vertGap),
                width: options.width,
                height: options.height,
                lineProperties: options.lineProperties
            });
        }
    }
}
/**
 * Draws a set of horizontal tick marks down the page.
 *
 * @param PDFCreator PDF-drawing library
 * @param yTickTop Vertical offset in doc units to topmost tick mark
 * @param xTickLeft Horizontal offset in doc units from left of page to left of each tick mark
 * @param numberOfTicks Number of lines to draw in set
 * @param tickLength Length of each tick mark in doc units
 * @param tickInterval Gap between each tick mark in doc units
 */
function drawHorizontallMeasurementTicks(PDFCreator, yTickTop, xTickLeft, numberOfTicks, tickLength, tickInterval) {
    for (let y = yTickTop, i = 0; i < numberOfTicks; y += tickInterval, i++) {
        PDFCreator.drawLine({
            x1: xTickLeft,
            y1: y,
            x2: xTickLeft + tickLength,
            y2: y
        });
    }
}
/**
 * Draws a measurement grid useful for checking scaling and for adjusting offsets.
 *
 * @param PDFCreator PDF-drawing library
 * @param tickOptions Drawing properties for ticks
 *
 * @note Note that grid lines will not appear if outside of printer's page print area
 */
function drawMeasurementLines(PDFCreator, options = {
    tickLength: 0.05,
    tickInterval: 1,
    lineProperties: {
        thickness: 0.001,
        color: "0000ff",
        opacity: 0.5 // 0..1
    }
}) {
    // Draw box showing margins
    PDFCreator.drawNeatline(options.lineProperties);
    // Update the line options for the tick marks
    const updatedOptions = {
        ...PDFCreator.lineOptions,
        ...options
    };
    PDFCreator.updateLineProperties(updatedOptions.lineProperties);
    PDFCreator.lineOptions = updatedOptions;
    // Draw tick marks along horizontal margin lines
    const numHorizontalTicks = numberOfTicks(PDFCreator.pageOptions.width, PDFCreator.pageOptions.leftMargin, PDFCreator.pageOptions.rightMargin, options.tickInterval);
    drawVerticalMeasurementTicks(PDFCreator, 0, // first (left) tick within margins
    0, // top of tick
    numHorizontalTicks, options.tickLength, options.tickInterval // tick properties
    );
    drawVerticalMeasurementTicks(PDFCreator, 0, // first (left) tick
    PDFCreator.pageOptions.height - PDFCreator.pageOptions.topMargin - PDFCreator.pageOptions.bottomMargin, // top of tick
    numHorizontalTicks, -options.tickLength, options.tickInterval // tick properties
    );
    // Draw tick marks along vertical margin lines
    const numVerticalTicks = numberOfTicks(PDFCreator.pageOptions.height, PDFCreator.pageOptions.topMargin, PDFCreator.pageOptions.bottomMargin, options.tickInterval);
    drawHorizontallMeasurementTicks(PDFCreator, 0, // first (top) tick
    0, // left of tick
    numVerticalTicks, options.tickLength, options.tickInterval // tick properties
    );
    drawHorizontallMeasurementTicks(PDFCreator, 0, // first (top) tick
    PDFCreator.pageOptions.width - PDFCreator.pageOptions.leftMargin - PDFCreator.pageOptions.rightMargin, // left of tick
    numVerticalTicks, -options.tickLength, options.tickInterval // tick properties
    );
}
/**
 * Draws a set of vertical tick marks across the page.
 *
 * @param PDFCreator PDF-drawing library
 * @param xLeftTick Horizontal offset in doc units to leftmost tick mark
 * @param yTickTop Vertical offset in doc units from top of page to top of each tick mark
 * @param numberOfTicks Number of lines to draw in set
 * @param tickLength Length of each tick mark in doc units
 * @param tickInterval Gap between each tick mark in doc units
 */
function drawVerticalMeasurementTicks(PDFCreator, xLeftTick, yTickTop, numberOfTicks, tickLength, tickInterval) {
    for (let x = xLeftTick, i = 0; i < numberOfTicks; x += tickInterval, i++) {
        PDFCreator.drawLine({
            x1: x,
            y1: yTickTop,
            x2: x,
            y2: yTickTop + tickLength
        });
    }
}
/**
 * Calculates the number of ticks to draw given the total dimension and margins.
 *
 * @param total Total dimension of space to fill with tick marks;, e.g., width
 * @param marginA A margin to remove from the total; e.g., left margin
 * @param marginB A margin to remove from the total; e.g., right margin
 * @param interval Gap between tick marks
 *
 * @return Number of ticks; assumes that ticks start at marginA and continue to marginB
 */
function numberOfTicks(total, marginA, marginB, interval) {
    return 1 + Math.floor(((total - marginA - marginB) / interval) + 0.01);
}

export { drawGridOfBoxes, drawHorizontallMeasurementTicks, drawMeasurementLines, drawVerticalMeasurementTicks, numberOfTicks };
