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
import { ILabel, exportPDF } from "./pdfUtils";
import { loadModules } from "./loadModules";
import { queryFeaturesByID } from "./queryUtils";

export { ILabel } from "./pdfUtils";

interface IArcadeExecutors {
  [expressionName: string]: __esri.ArcadeExecutor;
}

interface IArcadeExecutorPromises {
  [expressionName: string]: Promise<__esri.ArcadeExecutor>;
}

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
export async function downloadCSV(
  selectionSetNames: string[],
  layer: __esri.FeatureLayer,
  ids: number[],
  formatUsingLayerPopup: boolean,
  removeDuplicates = false,
  addColumnTitle = false
): Promise<void> {
  console.log("downloadCSV using selectionSetNames " + JSON.stringify(selectionSetNames));//???
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
export async function downloadPDF(
  selectionSetNames: string[],
  layer: __esri.FeatureLayer,
  ids: number[],
  removeDuplicates: boolean,
  labelPageDescription: ILabel
): Promise<void> {
  console.log("downloadPDF using selectionSetNames " + JSON.stringify(selectionSetNames));//???
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
function _convertPopupFieldsToLabelSpec(
  fieldInfos: __esri.FieldInfo[],
  bypassFieldVisiblity = false
): string[] {
  const labelSpec: string[] = [];

  // Every visible attribute is used
  fieldInfos.forEach(
    fieldInfo => {
      if (fieldInfo.visible || bypassFieldVisiblity) {
        labelSpec.push(`{${fieldInfo.fieldName}}`);
      }
    }
  );

  return labelSpec;
};

/**
 * Converts the text of a custom popup into a multiline label specification; conversion splits text into
 * lines on <br>s, and removes HTML tags. It does not handle Arcade and related records.
 *
 * @param popupInfo Layer's popupInfo structure containing description, fieldInfos, and expressionInfos, e.g.,
 * "<div style='text-align: left;'>{NAME}<br />{STREET}<br />{CITY}, {STATE} {ZIP} <br /></div>"
 * @return Label spec
 */
function _convertPopupTextToLabelSpec(
  popupInfo: string
): string[] {
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
};

/**
 * Extracts Arcade expressions from the lines of a label format and creates an Arcade executor for each
 * referenced expression name.
 *
 * @param labelFormat Label to examine
 * @param layer Layer from which to fetch features
 * @return Promise resolving to a set of executors keyed using the expression name
 */
async function _createArcadeExecutors(
  labelFormat: string[],
  layer: __esri.FeatureLayer
): Promise<IArcadeExecutors> {
  const arcadeExecutors: IArcadeExecutors = {};

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
  const labelingProfile: __esri.Profile = arcade.createArcadeProfile("popup");

  const createArcadeExecutorPromises: IArcadeExecutorPromises = {};
  arcadeExpressionsMatches.forEach(
    (match: string) => {
      const expressionName = match.substring(match.indexOf("/") + 1, match.length - 1);

      (layer.popupTemplate.expressionInfos || []).forEach(
        expressionInfo => {
          if (expressionInfo.name === expressionName) {
            createArcadeExecutorPromises[expressionName] =
              arcade.createArcadeExecutor(expressionInfo.expression, labelingProfile);
          }
        }
      );
    }
  );

  const promises = Object.values(createArcadeExecutorPromises);
  return Promise.all(promises)
  .then(
    executors => {
      const expressionNames = Object.keys(createArcadeExecutorPromises);

      for (let i = 0; i < expressionNames.length; ++i) {
        arcadeExecutors[expressionNames[i]] = executors[i].valueOf() as __esri.ArcadeExecutor;
      }

      return arcadeExecutors;
    }
  );
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
async function _prepareLabels(
  layer: __esri.FeatureLayer,
  ids: number[],
  removeDuplicates = true,
  formatUsingLayerPopup = true,
  includeHeaderNames = false
): Promise<string[][]> {
  const [intl] = await loadModules(["esri/intl"]);

  // Get the features to export
  const featureSet = await queryFeaturesByID(ids, layer);

  // Get the label formatting, if any
  let labelFormat: string[];
  let arcadeExecutors: IArcadeExecutors = {};
  if (layer.popupEnabled) {
    // What data fields are used in the labels?
    // Example labelFormat: ['{NAME}', '{STREET}', '{CITY}, {STATE} {ZIP}']
    if (formatUsingLayerPopup && layer.popupTemplate?.content[0]?.type === "fields") {
      labelFormat = _convertPopupFieldsToLabelSpec(layer.popupTemplate.fieldInfos);

      // If popup is configured with "no attribute information", then no fields will visible
      if (labelFormat.length === 0) {
        // Can we use the popup title?
        // eslint-disable-next-line unicorn/prefer-ternary
        if (typeof layer.popupTemplate.title === "string") {
          labelFormat = [layer.popupTemplate.title];

        // Otherwise revert to using attributes
        } else {
          labelFormat = _convertPopupFieldsToLabelSpec(layer.popupTemplate.fieldInfos, true);
        }
      }

    } else if (formatUsingLayerPopup && layer.popupTemplate?.content[0]?.type === "text") {
      labelFormat = _convertPopupTextToLabelSpec(layer.popupTemplate.content[0].text);

      // Do we need any Arcade executors?
      arcadeExecutors = await _createArcadeExecutors(labelFormat, layer);
    }
  }

  // Apply the label format
  let labels: string[][];
  // eslint-disable-next-line unicorn/prefer-ternary
  if (labelFormat) {
    const arcadeExpressionRegExp = /\{expression\/\w+\}/g;

    // Convert attributes into an array of labels
    labels = featureSet.features.map(
      feature => {
        const label: string[] = [];
        labelFormat.forEach(
          labelLineTemplate => {
            let labelLine = labelLineTemplate;

            // Replace Arcade expressions
            const arcadeExpressionsMatches = labelLine.match(arcadeExpressionRegExp);
            if (arcadeExpressionsMatches) {
              arcadeExpressionsMatches.forEach(
                (match: string) => {
                  const expressionName = match.substring(match.indexOf("/") + 1, match.length - 1);
                  const replacement = arcadeExecutors[expressionName].execute({"$feature": feature});
                  labelLine = labelLine.replace(match, replacement);
                }
              )
            }

            // Replace fields; must be done after Arcade check because `substitute` will discard Arcade expressions!
            labelLine = intl.substitute(labelLine, feature.attributes).trim();

            if (labelLine.length > 0) {
              label.push(labelLine);
            }
          }
        )
        return label;
      }
    )
    // Remove empty labels
    .filter(label => label.length > 0);

  } else {
    // Export all attributes
    labels = featureSet.features.map(
      feature => {
        return Object.values(feature.attributes).map(
          attribute => `${attribute}`
        );
      }
    );
  }

  // Remove duplicates
  if (removeDuplicates) {
    const labelsAsStrings: string[] = labels.map(label => JSON.stringify(label));
    const uniqueLabels = new Set(labelsAsStrings);
    labels = Array.from(uniqueLabels,
      labelString => JSON.parse(labelString)
    );
  }

  // Add header names
  if (includeHeaderNames) {
    let headerNames = [];

    if (labelFormat) {
      headerNames = labelFormat.map(labelFormatLine => labelFormatLine.replace(/\{/g, "").replace(/\}/g, ""));

    } else {
      const featuresAttrs = featureSet.features[0].attributes;
      Object.keys(featuresAttrs).forEach(k => {
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