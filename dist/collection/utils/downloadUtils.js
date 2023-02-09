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
export { ILabel } from "./pdfUtils";
import { exportCSV } from "./csvUtils";
import { exportPDF } from "./pdfUtils";
import { loadModules } from "./loadModules";
import { queryFeaturesByID } from "./queryUtils";
//#endregion
//#region Public functions
/**
 * Downloads csv of mailing labels for the provided list of ids
 *
 * @param layer Layer providing features and attributes for download
 * @param ids List of ids to download
 * @param formatUsingLayerPopup When true, the layer's popup is used to choose attributes for each column; when false,
 * all attributes are exported
 * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
 * @param addColumnTitle Indicates if column headings should be included in output
 * @returns Promise resolving when function is done
 */
export async function downloadCSV(layer, ids, formatUsingLayerPopup, removeDuplicates = false, addColumnTitle = false) {
  const labels = await _prepareLabels(layer, ids, removeDuplicates, formatUsingLayerPopup, addColumnTitle);
  exportCSV(labels);
  return Promise.resolve();
}
/**
 * Downloads csv of mailing labels for the provided list of ids
 *
 * @param layer Layer providing features and attributes for download
 * @param ids List of ids to download
 * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
 * @param labelPageDescription Provides PDF page layout info
 * @returns Promise resolving when function is done
 */
export async function downloadPDF(layer, ids, removeDuplicates, labelPageDescription) {
  const labels = await _prepareLabels(layer, ids, removeDuplicates);
  exportPDF(labels, labelPageDescription);
  return Promise.resolve();
}
//#endregion
//#region Private functions
/**
 * Converts the text of a custom popup into a multiline label specification; conversion splits text into
 * lines on <br>s, and removes HTML tags. It does not handle Arcade and related records.
 *
 * @param popupInfo Layer's popupInfo structure containing description, fieldInfos, and expressionInfos, e.g.,
 * "<div style='text-align: left;'>{NAME}<br />{STREET}<br />{CITY}, {STATE} {ZIP} <br /></div>"
 * @return Label spec
 */
function _convertPopupToLabelSpec(popupInfo) {
  // Replace <br>, <br/> with |
  popupInfo = popupInfo.replace(/<br\s*\/?>/gi, "|");
  // Remove remaining HTML tags, replace 0xA0 that popup uses for spaces, replace some char representations,
  // and split the label back into individual lines
  let labelSpec = popupInfo
    .replace(/<[\s.]*[^<>]*\/?>/gi, "")
    .replace(/\xA0/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ")
    .split("|");
  // Trim lines and remove empties
  labelSpec = labelSpec.map(line => line.trim()).filter(line => line.length > 0);
  return labelSpec;
}
;
/**
 * Creates labels from items.
 *
 * @param layer Layer from which to fetch features
 * @param ids List of ids to download
 * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
 * @param formatUsingLayerPopup When true, the layer's popup is used to choose attributes for each column; when false,
 * all attributes are exported
 * @param includeHeaderNames Add the label format at the front of the list of generated labels
 * @returns Promise resolving when function is done
 */
async function _prepareLabels(layer, ids, removeDuplicates = true, formatUsingLayerPopup = true, includeHeaderNames = false) {
  // Get the attributes of the features to export
  const featureSet = await queryFeaturesByID(ids, layer);
  const featuresAttrs = featureSet.features.map(f => f.attributes);
  const [intl] = await loadModules([
    "esri/intl"
  ]);
  let labels;
  let labelFormat;
  if (formatUsingLayerPopup) {
    // What data fields are used in the labels?
    // Example labelFormat: ['{NAME}', '{STREET}', '{CITY}, {STATE} {ZIP}']
    labelFormat = _convertPopupToLabelSpec(layer.popupTemplate.content[0].text);
    // Convert attributes into an array of labels
    labels = featuresAttrs.map(featureAttributes => {
      const label = [];
      labelFormat.forEach(labelLineTemplate => {
        const labelLine = intl.substitute(labelLineTemplate, featureAttributes).trim();
        if (labelLine.length > 0) {
          label.push(labelLine);
        }
      });
      return label;
    })
      // Remove empty labels
      .filter(label => label.length > 0);
  }
  else {
    // Export all attributes
    labels = featuresAttrs.map(featureAttributes => {
      return Object.values(featureAttributes).map(attribute => `${attribute}`);
    });
  }
  // Remove duplicates
  if (removeDuplicates) {
    const labelsAsStrings = labels.map(label => JSON.stringify(label));
    const uniqueLabels = new Set(labelsAsStrings);
    labels = Array.from(uniqueLabels, labelString => JSON.parse(labelString));
  }
  // Add header names
  if (includeHeaderNames) {
    let headerNames = [];
    if (formatUsingLayerPopup) {
      headerNames = labelFormat.map(labelFormatLine => labelFormatLine.replace(/\{/g, "").replace(/\}/g, ""));
    }
    else {
      Object.keys(featuresAttrs[0]).forEach(k => {
        if (featuresAttrs.hasOwnProperty(k)) {
          headerNames.push(k);
        }
      });
    }
    labels.unshift(headerNames);
  }
  return Promise.resolve(labels);
}
//#endregion
