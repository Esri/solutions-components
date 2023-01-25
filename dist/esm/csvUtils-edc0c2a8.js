/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { c as queryFeaturesByID } from './mapViewUtils-31d2c2bb.js';

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
/**
 * Export a csv of the attributes from the features that match the provided ids
 *
 * @param layerView layer view to query
 * @param ids number array of ids to export to csv
 *
 * @returns Promise when the function has completed
 */
async function exportCSV(layerView, ids) {
  const featureSet = await queryFeaturesByID(ids, layerView.layer);
  const attributes = featureSet.features.map(f => f.attributes);
  const fieldNames = {};
  const entry = attributes[0];
  Object.keys(entry).forEach(k => {
    if (entry.hasOwnProperty(k)) {
      fieldNames[k] = k;
    }
  });
  _downloadCSVFile(fieldNames, attributes, `notify-${Date.now().toString()}`);
}
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
function _downloadCSVFile(fieldNames, attributes, fileTitle) {
  if (fieldNames) {
    attributes.unshift(fieldNames);
  }
  // format values to string so it doesn't get tripped up when a value has a comma
  // another option could be to export with a different delimiter
  const csv = attributes.reduce((prev, cur) => {
    return prev + Object.values(cur).map(v => `"${v}"`).join(",") + "\r\n";
  }, "");
  const link = document.createElement("a");
  if (link.download !== undefined) {
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    link.download = `${fileTitle}.csv` || "export.csv";
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export { exportCSV as e };
