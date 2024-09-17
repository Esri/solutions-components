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
import * as csvDownload from "./csvDownload";
//#endregion
//#region Public functions
/**
 * Export a csv of the attributes from the features that match the provided ids
 *
 * @param filename Name to use for file
 * @param labels Labels to write
 */
export function exportCSV(filename, labels) {
    // Format values to string so it doesn't get tripped up when a value has a comma
    // another option could be to export with a different delimiter
    const outputLines = labels.map(label => Object.values(label).map(v => `"${v}"`).join(",") + "\r\n");
    csvDownload.downloadCSVFile(filename, outputLines);
}
//#endregion
