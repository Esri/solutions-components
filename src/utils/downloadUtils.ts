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
import { IExportInfo, IExportInfos } from "../utils/interfaces";

export { ILabel } from "./pdfUtils";

interface IAttributeDomains {
  [attributeName: string]: __esri.CodedValueDomain | __esri.RangeDomain | __esri.InheritedDomain | null;
}

interface IAttributeFormats {
  [attributeName: string]: __esri.FieldInfoFormat;
}

interface IAttributeTypes {
  [attributeName: string]: string;
}

const lineSeparatorChar = "|";

//#endregion
//#region Public functions

/**
 * Downloads csv of mailing labels for the provided list of ids
 *
 * @param exportInfos Key details about what to export (ids, layer, and selectionSetNames)
 * @param formatUsingLayerPopup When true, the layer's popup is used to choose attributes for each column; when false,
 * all attributes are exported
 * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
 * @param addColumnTitle Indicates if column headings should be included in output
 * @returns Promise resolving when function is done
 */
export async function downloadCSV(
  exportInfos: IExportInfos,
  formatUsingLayerPopup: boolean,
  removeDuplicates = false,
  addColumnTitle = false
): Promise<void> {
  let labels = await consolidateLabels(exportInfos, formatUsingLayerPopup, addColumnTitle, true);
  labels = removeDuplicates ? removeDuplicateLabels(labels) : labels;

  const layerIds = Object.keys(exportInfos);

  let layerLabels = [];
  labels.forEach(label => {
    const id = label[0];
    // layerIds are stored as value separator at the end of the values for a given layer
    if (layerIds.indexOf(id) < 0) {
      layerLabels.push(label);
    } else {
      const selectionSetNames = _getSelectionSetNames(exportInfos, new RegExp(`\\b${id}\\b`));

      // once we see the layerId we have reached the end of it's values and should export
      exportCSV(_createFilename(selectionSetNames), layerLabels);
      layerLabels = [];
    }
  });

  return Promise.resolve();
}

/**
 * Downloads csv of mailing labels for the provided list of ids
 *
 * @param exportInfos Key details about what to export (ids, layer, and selectionSetNames)
 * @param labelPageDescription Provides PDF page layout info
 * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
 * @param title Title for each page
 * @param initialImageDataUrl Data URL of image for first page
 * @returns Promise resolving when function is done
 */
export async function downloadPDF(
  exportInfos: IExportInfos,
  labelPageDescription: ILabel,
  removeDuplicates = false,
  title = "",
  initialImageDataUrl = ""
): Promise<void> {
  let labels = await consolidateLabels(exportInfos);
  const selectionSetNames = _getSelectionSetNames(exportInfos);

  labels =
    // Remove empty lines in labels
    labels.map(labelLines => labelLines.filter(line => line.length > 0))
    // Remove empty labels
    .filter(label => label.length > 0);

  labels = removeDuplicates ? removeDuplicateLabels(labels) : labels;

  exportPDF(_createFilename(selectionSetNames), labels, labelPageDescription, title, initialImageDataUrl);

  return Promise.resolve();
}

//#endregion
//#region Private functions

/**
 * Converts a set of fieldInfos into template lines.
 *
 * @param fieldInfos Layer's fieldInfos structure
 * @param bypassFieldVisiblity Indicates if the configured fieldInfo visibility property should be ignored
 * @return Label spec with lines separated by `lineSeparatorChar`
 */
export function _convertPopupFieldsToLabelSpec(
  fieldInfos: __esri.FieldInfo[],
  bypassFieldVisiblity = false
): string {
  const labelSpec: string[] = [];

  // Every visible attribute is used
  fieldInfos.forEach(
    fieldInfo => {
      if (fieldInfo.visible || bypassFieldVisiblity) {
        labelSpec.push(`{${fieldInfo.fieldName}}`);
      }
    }
  );

  return labelSpec.join(lineSeparatorChar);
};

/**
 * Converts the text of a custom popup into a multiline label specification; conversion splits text into
 * lines on <br>s, and removes HTML tags. It does not handle Arcade and related records.
 *
 * @param popupInfo Layer's popupInfo structure containing description, fieldInfos, and expressionInfos, e.g.,
 * "<div style='text-align: left;'>{NAME}<br />{STREET}<br />{CITY}, {STATE} {ZIP} <br /></div>"
 * @return Label spec with lines separated by `lineSeparatorChar`
 */
export function _convertPopupTextToLabelSpec(
  popupInfo: string,
): string {
  // Replace <br> variants with the line separator character
  popupInfo = popupInfo.replace(/<br\s*\/?>/gi, lineSeparatorChar);

  // Replace <p> variants with the line separator character, except in the first position
  popupInfo = popupInfo.replace(/<p[^>]*>/gi, lineSeparatorChar).trim().replace(/^\|/, "");

  // Remove </p>
  popupInfo = popupInfo.replace(/<\/p>/gi, "");

  // Replace \n with the line separator character
  popupInfo = popupInfo.replace(/\n/gi, "|");

  // Remove remaining HTML tags, replace 0xA0 that popup uses for spaces, and replace some char representations
  let labelSpec = popupInfo
    .replace(/<[\s.]*[^<>]*\/?>/gi, "")
    .replace(/\xA0/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ");

  // Trim each line
  labelSpec = labelSpec.replace(/\s*\|\s*/g, "|");

  // Remove empty lines
  while (labelSpec.match(/\|\|/)) {
    labelSpec = labelSpec.replace(/\|\|/, "|");
  }

  // Remove leading and trailing line feeds
  labelSpec = labelSpec.replace(/^\|/, "");
  labelSpec = labelSpec.replace(/\|$/, "");

  return labelSpec.trim();
};

/**
 * Creates an Arcade expression executor for a label format.
 *
 * @param expression Label to examine
 * @return Promise resolving to executor
 */
async function _createArcadeExecutor(
  expression: string
): Promise<__esri.ArcadeExecutor> {
  // Generate an Arcade executor
  const [arcade] = await loadModules(["esri/arcade"]);
  const labelingProfile: __esri.Profile = {
    variables: [
      {
        name: "$feature",
        type: "feature"
      },
      {
        name: "$layer",
        type: "featureSet"
      },
      {
        name: "$datastore",
        type: "featureSetCollection"
      },
      {
        name: "$map",
        type: "featureSetCollection"
      }
    ]
  };

   return arcade.createArcadeExecutor(expression, labelingProfile);
};

/**
 * Creates a title from a list of selection set names.
 *
 * @param selectionSetNames Names to use in title
 * @return Title composed of the selectionSetNames separated by commas; if there are no
 * selection set names supplied, "download" is returned
 */
export function _createFilename(
  selectionSetNames: string[]
): string {
  // Windows doesn't permit the characters \/:*?"<>|
  const title = selectionSetNames.length > 0 ? selectionSetNames.join(", ") : "download";
  return title;
}

/**
 * Prepares an attribute's value by applying domain and type information.
 *
 * @param attributeValue Value of attribute
 * @param attributeType Type of attribute
 * @param attributeDomain Domain info for attribute, if any
 * @param attributeFormat Format info for attribute, if any
 * @param intl esri/intl
 * @return Attribute value modified appropriate to domain and type
 */
function _prepareAttributeValue(
  attributeValue: any,
  attributeType: string,
  attributeDomain: __esri.CodedValueDomain | __esri.RangeDomain | __esri.InheritedDomain | null,
  attributeFormat: __esri.FieldInfoFormat,
  intl: any
): any {
  if (attributeDomain && (attributeDomain as __esri.CodedValueDomain).type === "coded-value") {
    // "coded-value" domain field
    const value = (attributeDomain as __esri.CodedValueDomain).getName(attributeValue);
    return value;
  } else {
    // Non-domain field or unsupported domain type
    let value = attributeValue;

    switch (attributeType) {
      case "date":
        if (attributeFormat?.dateFormat) {
          const dateFormatIntlOptions = intl.convertDateFormatToIntlOptions(attributeFormat.dateFormat);
          value = intl.formatDate(value, dateFormatIntlOptions);
        } else {
          value = intl.formatDate(value);
        }

        // Format date produces odd characters for the space between the time and the AM/PM text,
        // e.g., "12/31/1969, 4:00â€¯PM"
        value = value.replace(/\xe2\x80\xaf/g, "");
        break;

      case "double":
      case "integer":
      case "long":
      case "small-integer":
        if (attributeFormat) {
          const numberFormatIntlOptions = intl.convertNumberFormatToIntlOptions(attributeFormat)
          value = intl.formatNumber(value, numberFormatIntlOptions);
        } else {
          value = intl.formatNumber(value);
        }
        break;
    }
    return value;
  }
}

/**
 * Creates labels from items.
 *
 * @param layer Layer from which to fetch features
 * @param ids List of ids to download
 * @param formatUsingLayerPopup When true, the layer's popup is used to choose attributes for each column; when false,
 * all attributes are exported
 * @param includeHeaderNames Add the label format at the front of the list of generated labels
 * @returns Promise resolving when function is done
 */
async function _prepareLabels(
  layer: __esri.FeatureLayer,
  ids: number[],
  formatUsingLayerPopup = true,
  includeHeaderNames = false
): Promise<string[][]> {
  const [intl] = await loadModules(["esri/intl"]);

  // Get the features to export
  const featureSet = await queryFeaturesByID(ids, layer, [], false);

  // Get field data types. Do we have any domain-based fields?
  const attributeTypes: IAttributeTypes = {};
  const attributeDomains: IAttributeDomains = {};
  layer.fields.forEach(
    field => {
      attributeTypes[field.name] = field.type;
      attributeDomains[field.name] = field.domain;
    }
  );
  const attributeFormats: IAttributeFormats = {};

  // Get the label formatting, if any
  let labelFormat: string;
  let arcadeExecutor: __esri.ArcadeExecutor;
  if (layer.popupEnabled) {
    layer.popupTemplate.fieldInfos.forEach(
      // Extract any format info that we have
      fieldInfo => {
        if (fieldInfo.format) {
          attributeFormats[fieldInfo.fieldName] = fieldInfo.format;
        }
      }
    );

    // What data fields are used in the labels?
    // Example labelFormat: ['{NAME}', '{STREET}', '{CITY}, {STATE} {ZIP}']
    if (formatUsingLayerPopup && layer.popupTemplate?.content[0]?.type === "fields") {
      labelFormat = _convertPopupFieldsToLabelSpec(layer.popupTemplate.fieldInfos);

      // If popup is configured with "no attribute information", then no fields will visible
      if (labelFormat.length === 0) {
        // Can we use the popup title?
        // eslint-disable-next-line unicorn/prefer-ternary
        if (typeof layer.popupTemplate.title === "string") {
          labelFormat = layer.popupTemplate.title;

        // Otherwise revert to using attributes
        } else {
          labelFormat = _convertPopupFieldsToLabelSpec(layer.popupTemplate.fieldInfos, true);
        }
      }

    } else if (formatUsingLayerPopup && layer.popupTemplate?.content[0]?.type === "text") {
      labelFormat = _convertPopupTextToLabelSpec(layer.popupTemplate.content[0].text);

    } else if (formatUsingLayerPopup && layer.popupTemplate?.content[0]?.type === "expression") {
      const arcadeText = layer.popupTemplate.content[0].expressionInfo.expression;

      // Create the Arcade executor
      arcadeExecutor = await _createArcadeExecutor(arcadeText);
    }
  }

  // Apply the label format
  let labels: string[][];
  // eslint-disable-next-line unicorn/prefer-ternary
  if (labelFormat || arcadeExecutor) {
    // Convert feature attributes into an array of labels
    labels = await Promise.all(featureSet.map(
      async feature => {
        let labelPrep = labelFormat;

        if (arcadeExecutor) {
          // Replace Arcade expressions in this feature
          labelPrep = (await arcadeExecutor.executeAsync({"$feature": feature})).text;

          // Replace "<br>" and "\n\t" with line separator character
          labelPrep = labelPrep
            .replace(/<br\s*\/?>/gi, lineSeparatorChar)
            .replace(/\\n\\t/gi, lineSeparatorChar)
            .replace(/\|\|/g, lineSeparatorChar)
            .replace(/^\|/, "")
            .replace(/\|$/, "");

        } else {
          const attributeRegExp = /\{\w+\}/g;
          const attributeMatches = labelFormat.match(attributeRegExp) ?? [];

          // Replace non-Arcade fields in this feature
          attributeMatches.forEach(
            (match: string) => {
              const attributeName = match.substring(1, match.length - 1);

              const value = _prepareAttributeValue(feature.attributes[attributeName],
                attributeTypes[attributeName], attributeDomains[attributeName],
                attributeFormats[attributeName], intl);
              labelPrep = labelPrep.replace(match, value);

            }
          )
        }

        // Split label into lines
        let label = labelPrep.split(lineSeparatorChar);

        // Trim lines
        label = label.map(line => line.trim());

        return label;
      }
    ));

  } else {
    // Export all attributes
    labels = featureSet.map(
      feature => {
        return Object.keys(feature.attributes).map(
          (attributeName: string) => {
            const value =  _prepareAttributeValue(feature.attributes[attributeName],
              attributeTypes[attributeName], attributeDomains[attributeName],
              null, intl);
            return `${value}`;
          }
        );
      }
    );
  }

  // Add header names
  if (includeHeaderNames) {
    let headerNames = [];

    if (labelFormat) {
      headerNames = labelFormat.replace(/\{/g, "").replace(/\}/g, "").split(lineSeparatorChar);

    } else {
      const featuresAttrs = featureSet[0].attributes;
      Object.keys(featuresAttrs).forEach(k => {
        headerNames.push(k);
      });
    }

    labels.unshift(headerNames);
  }

  return Promise.resolve(labels);
}

/**
 * Remove any duplicate labels
 *
 * @param labels Labels to evaluate for duplicates
 * @returns labels with duplicates removed
 */
export function removeDuplicateLabels(
  labels: string[][]
): string[][] {
  const labelsAsStrings: string[] = labels.map(label => JSON.stringify(label));
  const uniqueLabels = new Set(labelsAsStrings);
  return Array.from(uniqueLabels,
    labelString => JSON.parse(labelString)
  );
}

/**
 * Extract selectionSetNames from the provided exportInfos
 *
 * @param exportInfos Key details about what to export (ids, layer, and selectionSetNames)
 * @returns selectionSetNames that will be used for export filenames
 */
function _getSelectionSetNames(
  exportInfos: IExportInfos,
  id = /.+/
): string[] {
  let selectionSetNames: string[] = [];
  Object.keys(exportInfos).forEach(k => {
    const exportInfo: IExportInfo = exportInfos[k];
    if (id.test(k)) {
      selectionSetNames = selectionSetNames.concat(exportInfo.selectionSetNames);
    }
  });
  return selectionSetNames;
}

/**
 * Create and consolidate labels from all layers
 *
 * @param exportInfos Key details about what to export (ids, layer, and selectionSetNames)
 * @param formatUsingLayerPopup When true, the layer's popup is used to choose attributes for each column; when false,
 * all attributes are exported
 * @param includeHeaderNames Add the label format at the front of the list of generated labels
 * @returns selectionSetNames that will be used for export filenames
 */
export async function consolidateLabels(
  exportInfos: IExportInfos,
  formatUsingLayerPopup = true,
  includeHeaderNames = false,
  isCSVExport = false
): Promise<string[][]> {
  const labelRequests = [];

  Object.keys(exportInfos).forEach(k => {
    const labelInfo: IExportInfo = exportInfos[k];
    labelRequests.push(_prepareLabels(labelInfo.layerView?.layer || labelInfo.layer, labelInfo.ids, formatUsingLayerPopup, includeHeaderNames));
    if (isCSVExport) {
      // add the layer id as a temp value separator that we can use to split values for CSV export
      labelRequests.push(Promise.resolve([[k]]));
    }
  });

  const labels = await Promise.all(labelRequests);
  return labels.reduce((prev, cur) => prev.concat(cur), []);
}

//#endregion
