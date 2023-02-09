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
 * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
 * @param labelPageDescription Provides PDF page layout info
 * @returns Promise resolving when function is done
 */
export declare function downloadPDF(selectionSetNames: string[], layer: __esri.FeatureLayer, ids: number[], removeDuplicates: boolean, labelPageDescription: ILabel): Promise<void>;
