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
/**
 * Export a csv of the attributes from the features that match the provided ids
 *
 * @param layerView layer view to query
 * @param ids number array of ids to export to csv
 * @param labelDescription Format to use for labels
 * @param removeDuplicates Remove duplicate labels before exporting
 *
 * @returns Promise when the function has completed
 */
export declare function exportPDF(layerView: __esri.FeatureLayerView, ids: number[], labelDescription: any, removeDuplicates?: boolean): Promise<void>;
/**
 * Download the CSV file
 *
 * @param fieldNames the names for each of the features fields
 * @param attributes the features attributes
 *
 * Based on:
 * https://medium.com/@danny.pule/export-json-to-csv-file-using-javascript-a0b7bc5b00d2
 *
 * @returns void
 */
