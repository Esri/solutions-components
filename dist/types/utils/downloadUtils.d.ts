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
/// <reference types="arcgis-js-api" />
import { ILabel } from "./pdfUtils";
export { ILabel } from "./pdfUtils";
/**
 * Downloads csv of mailing labels for the provided list of ids
 *
 * @param selectionSetNames Names of the selection sets used to provide ids
 * @param layer Layer providing features and attributes for download
 * @param ids List of ids to download
 * @param formatUsingLayerPopup When true, the layer's popup is used to choose attributes for each column; when false,
 * all attributes are exported
 * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
 * @param addColumnTitle Indicates if column headings should be included in output
 * @returns Promise resolving when function is done
 */
export declare function downloadCSV(selectionSetNames: string[], layer: __esri.FeatureLayer, ids: number[], formatUsingLayerPopup: boolean, removeDuplicates?: boolean, addColumnTitle?: boolean): Promise<void>;
/**
 * Downloads csv of mailing labels for the provided list of ids
 *
 * @param selectionSetNames Names of the selection sets used to provide ids
 * @param layer Layer providing features and attributes for download
 * @param ids List of ids to download
 * @param labelPageDescription Provides PDF page layout info
 * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
 * @param includeMap When true, the first page of the output is a map showing the selection area
 * @param includeTitle When true, a title is included on every page
 * @param title Title for each page when `includeTitle` is true
 * @returns Promise resolving when function is done
 */
export declare function downloadPDF(selectionSetNames: string[], layer: __esri.FeatureLayer, ids: number[], labelPageDescription: ILabel, removeDuplicates?: boolean, includeMap?: boolean, includeTitle?: boolean, title?: string): Promise<void>;
/**
 * Converts a set of fieldInfos into template lines.
 *
 * @param fieldInfos Layer's fieldInfos structure
 * @param bypassFieldVisiblity Indicates if the configured fieldInfo visibility property should be ignored
 * @return Label spec with lines separated by `lineSeparatorChar`
 */
export declare function _convertPopupFieldsToLabelSpec(fieldInfos: __esri.FieldInfo[], bypassFieldVisiblity?: boolean): string;
/**
 * Converts the text of a custom popup into a multiline label specification; conversion splits text into
 * lines on <br>s, and removes HTML tags. It does not handle Arcade and related records.
 *
 * @param popupInfo Layer's popupInfo structure containing description, fieldInfos, and expressionInfos, e.g.,
 * "<div style='text-align: left;'>{NAME}<br />{STREET}<br />{CITY}, {STATE} {ZIP} <br /></div>"
 * @return Label spec with lines separated by `lineSeparatorChar`
 */
export declare function _convertPopupTextToLabelSpec(popupInfo: string): string;
/**
 * Creates a title from a list of selection set names.
 *
 * @param selectionSetNames Names to use in title
 * @return Title composed of the selectionSetNames separated by commas; if there are no
 * selection set names supplied, "download" is returned
 */
export declare function _createFilename(selectionSetNames: string[]): string;
