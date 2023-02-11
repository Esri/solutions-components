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
import { exportCSV } from "./csvUtils";
import { exportPDF } from "./pdfUtils";
import { loadModules } from "./loadModules";
import { queryFeaturesByID } from "./queryUtils";
export { ILabel } from "./pdfUtils";
//#endregion
//#region Public functions
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
export async function downloadCSV(selectionSetNames, layer, ids, formatUsingLayerPopup, removeDuplicates = false, addColumnTitle = false) {
  console.log("downloadCSV using selectionSetNames " + JSON.stringify(selectionSetNames)); //???
  const labels = await _prepareLabels(layer, ids, removeDuplicates, formatUsingLayerPopup, addColumnTitle);
  exportCSV(labels);
  return Promise.resolve();
}
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
export async function downloadPDF(selectionSetNames, layer, ids, removeDuplicates, labelPageDescription) {
  console.log("downloadPDF using selectionSetNames " + JSON.stringify(selectionSetNames)); //???
  const labels = await _prepareLabels(layer, ids, removeDuplicates);
  exportPDF(labels, labelPageDescription);
  return Promise.resolve();
}
//#endregion
//#region Private functions
/**
 * Converts a set of fieldInfos into template lines.
 *
 * @param fieldInfos Layer's fieldInfos structure
 * @param bypassFieldVisiblity Indicates if the configured fieldInfo visibility property should be ignored
 * @return Label spec
 */
function _convertPopupFieldsToLabelSpec(fieldInfos, bypassFieldVisiblity = false) {
  const labelSpec = [];
  // Every visible attribute is used
  fieldInfos.forEach(fieldInfo => {
    if (fieldInfo.visible || bypassFieldVisiblity) {
      labelSpec.push(`{${fieldInfo.fieldName}}`);
    }
  });
  return labelSpec;
}
;
/**
 * Converts the text of a custom popup into a multiline label specification; conversion splits text into
 * lines on <br>s, and removes HTML tags. It does not handle Arcade and related records.
 *
 * @param popupInfo Layer's popupInfo structure containing description, fieldInfos, and expressionInfos, e.g.,
 * "<div style='text-align: left;'>{NAME}<br />{STREET}<br />{CITY}, {STATE} {ZIP} <br /></div>"
 * @return Label spec
 */
function _convertPopupTextToLabelSpec(popupInfo) {
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
//???
async function _createArcadeExecutors(labelFormat, layer) {
  const arcadeExecutors = {};
  // Are any Arcade expressions in the layer?
  if (!Array.isArray(layer.popupTemplate.expressionInfos) || layer.popupTemplate.expressionInfos.length === 0) {
    return Promise.resolve(arcadeExecutors);
  }
  // Are there any Arcade expressions in the label format?
  const arcadeExpressionRegExp = /\{expression\/\w+\}/g;
  const arcadeExpressionsMatches = labelFormat.join("|").match(arcadeExpressionRegExp);
  if (!arcadeExpressionsMatches) {
    return Promise.resolve(arcadeExecutors);
  }
  // Generate an Arcade executor for each match
  const [arcade] = await loadModules(["esri/arcade"]);
  const labelingProfile = arcade.createArcadeProfile("popup");
  const createArcadeExecutorPromises = {};
  arcadeExpressionsMatches.forEach(match => {
    const expressionName = match.substring(match.indexOf("/") + 1, match.length - 1);
    console.log("expressionName: " + expressionName); //???
    (layer.popupTemplate.expressionInfos || []).forEach(expressionInfo => {
      if (expressionInfo.name === expressionName) {
        console.log("    create executor promise for " + expressionName); //???
        createArcadeExecutorPromises[expressionName] =
          arcade.createArcadeExecutor(expressionInfo.expression, labelingProfile);
      }
    });
  });
  const promises = Object.values(createArcadeExecutorPromises);
  return Promise.all(promises)
    .then(executors => {
    const expressionNames = Object.keys(createArcadeExecutorPromises);
    for (let i = 0; i < expressionNames.length; ++i) {
      arcadeExecutors[expressionNames[i]] = executors[expressionNames[i]];
    }
    return arcadeExecutors;
  });
}
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
  var _a, _b, _c, _d;
  const [intl] = await loadModules(["esri/intl"]);
  // Get the attributes of the features to export
  const featureSet = await queryFeaturesByID(ids, layer);
  const featuresAttrs = featureSet.features.map(f => f.attributes);
  /*
    const allValues = featureSet.features.map( (feature) => {
      return labelExecutor.execute({
        "$feature": feature
      });
    });
    console.log(JSON.stringify(allValues, null, 2));//???
  */
  // Get the label formatting, if any
  let labelFormat;
  let arcadeExecutors = {};
  if (layer.popupEnabled) {
    // What data fields are used in the labels?
    // Example labelFormat: ['{NAME}', '{STREET}', '{CITY}, {STATE} {ZIP}']
    if (formatUsingLayerPopup && ((_b = (_a = layer.popupTemplate) === null || _a === void 0 ? void 0 : _a.content[0]) === null || _b === void 0 ? void 0 : _b.type) === "fields") {
      labelFormat = _convertPopupFieldsToLabelSpec(layer.popupTemplate.fieldInfos);
      // If popup is configured with "no attribute information", then no fields will visible
      if (labelFormat.length === 0) {
        // Can we use the popup title?
        // eslint-disable-next-line unicorn/prefer-ternary
        if (typeof layer.popupTemplate.title === "string") {
          labelFormat = [layer.popupTemplate.title];
          // Otherwise revert to using attributes
        }
        else {
          labelFormat = _convertPopupFieldsToLabelSpec(layer.popupTemplate.fieldInfos, true);
        }
      }
    }
    else if (formatUsingLayerPopup && ((_d = (_c = layer.popupTemplate) === null || _c === void 0 ? void 0 : _c.content[0]) === null || _d === void 0 ? void 0 : _d.type) === "text") {
      labelFormat = _convertPopupTextToLabelSpec(layer.popupTemplate.content[0].text);
      // Do we need any Arcade executors?
      arcadeExecutors = await _createArcadeExecutors(labelFormat, layer);
    }
  }
  console.log("Number of arcade executors: " + Object.keys(arcadeExecutors).length.toString()); //???
  // Apply the label format
  let labels;
  // eslint-disable-next-line unicorn/prefer-ternary
  if (labelFormat) {
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
    if (labelFormat) {
      headerNames = labelFormat.map(labelFormatLine => labelFormatLine.replace(/\{/g, "").replace(/\}/g, ""));
    }
    else {
      Object.keys(featuresAttrs[0]).forEach(k => {
        if (featuresAttrs[0].hasOwnProperty(k)) {
          headerNames.push(k);
        }
      });
    }
    labels.unshift(headerNames);
  }
  return Promise.resolve(labels);
}
//#endregion
