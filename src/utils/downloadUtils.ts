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
//import * as common from "@esri/solution-common";

export { ILabel } from "./pdfUtils";

/*
interface IArcadeExecutors {
  [expressionName: string]: __esri.ArcadeExecutor;
}

interface IArcadeExecutorPromises {
  [expressionName: string]: Promise<__esri.ArcadeExecutor>;
}
*/

export interface IAttributeOrigNames {
  [lowercaseName: string]: string;
}

export interface IAttributeDomains {
  [attributeName: string]: __esri.CodedValueDomain | __esri.RangeDomain | __esri.InheritedDomain | null;
}

export interface IAttributeFormats {
  [attributeName: string]: __esri.FieldInfoFormat;
}

export interface IAttributeTypes {
  [attributeName: string]: string;
}

export interface ILabelFormat {
  type: "pattern" | "executor" | "unsupported";
  format: string | __esri.ArcadeExecutor | undefined;
}

export interface ILabelFormatProps {
  layer: __esri.FeatureLayer;
  attributeFormats: IAttributeFormats;
  relationshipId: number | undefined;
  labelFormat: ILabelFormat;
}

export interface ILayerRelationshipQuery {
  layer: __esri.FeatureLayer;
  relatedQuery: IRelatedFeaturesQuery;
}

export interface ILayerRelationshipQueryHash {
  [relationshipId: string]: ILayerRelationshipQuery;
}

// Class RelationshipQuery doesn't appear to work, and so since
// https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#queryRelatedFeatures
// says that the relationshipQuery argument is autocast, we'll set up a variant for the class
interface IRelatedFeaturesQuery {
  outFields: string[];
  relationshipId: string;
  returnGeometry: boolean;
  objectIds?: number;
}

const lineSeparatorChar = "|";

import {
  IFeature,
  IQueryRelatedOptions,
  IQueryRelatedResponse,
  IRelatedRecordGroup,
  queryRelated
} from "@esri/arcgis-rest-feature-layer";
/**
 * Get the related records for a feature service.
 *
 * @param url Feature service's URL, e.g., layer.url
 * @param layerId Id of layer within a feature service
 * @param relationshipId Id of relationship
 * @param objectIds Objects in the feature service whose related records are sought
 */
export function getFeatureServiceRelatedRecords(
  url: string,
  layerId: number,
  relationshipId?: number,
  objectIds?: number[]
): Promise<IQueryRelatedResponse> {
  // See if the URL points to a service rather than a layer
  const endOfUrl = url.substring(url.lastIndexOf("/") + 1);
  if (isNaN(parseInt(endOfUrl))) {
    url += "/" + layerId.toString();
  }

  const options: IQueryRelatedOptions = {
    url,
    relationshipId,
    objectIds
  }

  return queryRelated(options);
}

//#endregion
// ------------------------------------------------------------------------------------------------------------------ //
//#region Public functions

/**
 * Create and consolidate labels from all layers
 *
 * @param webmap Webmap containing layer
 * @param exportInfos Key details about what to export (ids, layer, and selectionSetNames)
 * @param formatUsingLayerPopup When true, the layer's popup is used to choose attributes for each column; when false,
 * all attributes are exported
 * @param includeHeaderNames Add the label format at the front of the list of generated labels
 * @returns selectionSetNames that will be used for export filenames
 */
export async function consolidateLabels(
  webmap: __esri.Map,
  exportInfos: IExportInfos,
  formatUsingLayerPopup = true,
  includeHeaderNames = false,
  isCSVExport = false
): Promise<string[][]> {
  const labelRequests = [];

  Object.keys(exportInfos).forEach(k => {
    const labelInfo: IExportInfo = exportInfos[k];
    labelRequests.push(
      _prepareLabels(webmap, labelInfo.layerView?.layer || labelInfo.layer, labelInfo.ids, formatUsingLayerPopup, includeHeaderNames)
    );
    if (isCSVExport) {
      // add the layer id as a temp value separator that we can use to split values for CSV export
      labelRequests.push(Promise.resolve([[k]]));
    }
  });

  const labels = await Promise.all(labelRequests);
  return labels.reduce((prev, cur) => prev.concat(cur), []);
}

/**
 * Downloads csv of mailing labels for the provided list of ids
 *
 * @param webmap Webmap containing layer
 * @param exportInfos Key details about what to export (ids, layer, and selectionSetNames)
 * @param formatUsingLayerPopup When true, the layer's popup is used to choose attributes for each column; when false,
 * all attributes are exported
 * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
 * @param addColumnTitle Indicates if column headings should be included in output
 * @returns Promise resolving when function is done
 */
export async function downloadCSV(
  webmap: __esri.Map,
  exportInfos: IExportInfos,
  formatUsingLayerPopup: boolean,
  removeDuplicates = false,
  addColumnTitle = false
): Promise<void> {
  let labels = await consolidateLabels(webmap, exportInfos, formatUsingLayerPopup, addColumnTitle, true);
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
 * @param webmap Webmap containing layer
 * @param exportInfos Key details about what to export (ids, layer, and selectionSetNames)
 * @param labelPageDescription Provides PDF page layout info
 * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
 * @param title Title for each page
 * @param initialImageDataUrl Data URL of image for first page
 * @returns Promise resolving when function is done
 */
export async function downloadPDF(
  webmap: __esri.Map,
  exportInfos: IExportInfos,
  labelPageDescription: ILabel,
  removeDuplicates = false,
  title = "",
  initialImageDataUrl = ""
): Promise<void> {
  let labels = await consolidateLabels(webmap, exportInfos);
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

//#endregion
// ------------------------------------------------------------------------------------------------------------------ //
//#region Private functions

/**
 * Converts the text of a custom popup into a multiline label specification; conversion splits text into
 * lines on <br>s, and removes HTML tags.
 *
 * @param labelText Layer's popup text, e.g.,
 * "<div style='text-align: left;'>{NAME}<br />{STREET}<br />{CITY}, {STATE} {ZIP} <br /></div>"
 * @return Cleaned-up popup text with lines separated by `lineSeparatorChar`
 */
export function _cleanupLabel(
  labelText: string,
): string {
  // Replace <br> variants with the line separator character
  labelText = labelText.replace(/<br\s*\/?>/gi, lineSeparatorChar);

  // Replace <p> variants with the line separator character, except in the first position
  labelText = labelText.replace(/<p[^>]*>/gi, lineSeparatorChar).trim().replace(/^\|/, "");

  // Remove </p>
  labelText = labelText.replace(/<\/p>/gi, "");

  // Replace \n with the line separator character
  labelText = labelText.replace(/\n/gi, "|");

  // Remove remaining HTML tags, replace 0xA0 that popup uses for spaces, and replace some char representations
  labelText = labelText
    .replace(/<[\s.]*[^<>]*\/?>/gi, "")
    .replace(/\xA0/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ");

  // Trim each line
  labelText = labelText.replace(/\s*\|\s*/g, "|");

  // Remove empty lines
  while (labelText.match(/\|\|/)) {
    labelText = labelText.replace(/\|\|/, "|");
  }

  // Remove leading and trailing line feeds
  labelText = labelText.replace(/^\|/, "");
  labelText = labelText.replace(/\|$/, "");

  return labelText;
};

/**
 * Converts a set of fieldInfos into template lines.
 *
 * @param fieldInfos Layer's fieldInfos structure
 * @param bypassFieldVisiblity Indicates if the configured fieldInfo visibility property should be ignored
 * @return "pattern" label spec with lines separated by `lineSeparatorChar`
 */
export function _convertPopupFieldsToLabelSpec(
  fieldInfos: __esri.FieldInfo[],
  bypassFieldVisiblity = false
): ILabelFormat {
  const labelSpec: string[] = [];

  // Every visible attribute is used
  fieldInfos.forEach(
    fieldInfo => {
      if (fieldInfo.visible || bypassFieldVisiblity) {
        labelSpec.push(`{${fieldInfo.fieldName}}`);
      }
    }
  );

  return {
    type: "pattern",
    format: labelSpec.join(lineSeparatorChar)
  } as ILabelFormat;
};

/**
 * Converts the text of a custom popup into a multiline label specification; conversion splits text into
 * lines on <br>s, and removes HTML tags. It does not handle Arcade and related records.
 *
 * @param labelText Layer's labelText structure containing description, fieldInfos, and expressionInfos, e.g.,
 * "<div style='text-align: left;'>{NAME}<br />{STREET}<br />{CITY}, {STATE} {ZIP} <br /></div>"
 * @return "pattern" label spec with lines separated by `lineSeparatorChar`
 */
export function _convertPopupTextToLabelSpec(
  popupInfo: string,
): ILabelFormat {
  return {
    type: "pattern",
    format: _cleanupLabel(popupInfo)
  } as ILabelFormat;
};

/**
 * Converts an Arcade expression of a custom popup into a multiline label specification.
 *
 * @param expressionInfo Structure containing expression and info about it
 * @return Promise resolving to an "executor" label spec
 */
export async function _convertPopupArcadeToLabelSpec(
  expressionInfo: __esri.ElementExpressionInfo
): Promise<ILabelFormat> {
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
  const executor = await arcade.createArcadeExecutor(expressionInfo.expression, labelingProfile);

  return Promise.resolve({
    type: "executor",
    format: executor
  } as ILabelFormat);
}

/**
 * Extracts Arcade expressions from the lines of a label format and creates an Arcade executor for each
 * referenced expression name.
 *
 * @param labelFormat Label to examine
 * @param layer Layer from which to fetch features
 * @return Promise resolving to a set of executors keyed using the expression name
 */
/*
async function _createArcadeExecutors(
  labelFormat: string,
  layer: __esri.FeatureLayer
): Promise<IArcadeExecutors> {
  const arcadeExecutors: IArcadeExecutors = {};

  // Are any Arcade expressions in the layer?
  if (!Array.isArray(layer.popupTemplate.expressionInfos) || layer.popupTemplate.expressionInfos.length === 0) {
    return Promise.resolve(arcadeExecutors);
  }

  // Are there any Arcade expressions in the label format?
  const arcadeExpressionRegExp = /\{expression\/\w+\}/g;
  const arcadeExpressionsMatches = labelFormat.match(arcadeExpressionRegExp);
  if (!arcadeExpressionsMatches) {
    return Promise.resolve(arcadeExecutors);
  }

  // Generate an Arcade executor for each match
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
*/

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
 * Extracts Arcade expression references from the lines of a label format.
 *
 * @param labelFormat Label to examine
 * @return Array of Arcade expression references, e.g., ["{expression/expr1}", "{expression/expr2}"]
 */
export function _getExpressionsFromLabel(
  labelFormat: string
): string[] {
  const arcadeExpressionRegExp = /\{expression\/\w+\}/g;
  return labelFormat.match(arcadeExpressionRegExp) ?? [];
}

/**
 * Extracts field name expressions from the lines of a label format.
 *
 * @param labelFormat Label to examine
 * @returns Array of field name expressions, e.g., ["{NAME}", "{STREET}", "{CITY}", "{STATE}", "{ZIP}"]
 */
export function _getFieldExpressionsFromLabel(
  labelFormat: string
): string[] {
  // Get all fields
  const fieldExpressions: string[] = [];

  let iStart = 0;
  while (iStart < labelFormat.length) {
    const iOpen = labelFormat.indexOf("{", iStart); // Find the next open brace
    if (iOpen < 0) { break; } // No more open braces
    const iClose = labelFormat.indexOf("}", iOpen); // Find the matching close brace
    if (iClose < 0) { break; } // No more close braces
    const fieldName = labelFormat.substring(iOpen, iClose + 1); // Extract the field name with braces
    fieldExpressions.push(fieldName);
    iStart = iClose + 1; // Start looking for the next field name after the close brace
  }

  // Get the Arcade expressions
  const arcadeExpressions = _getExpressionsFromLabel(labelFormat);

  // Remove the Arcade expressions from the returned list of field expressions
  return fieldExpressions.filter(fieldExpression => arcadeExpressions.indexOf(fieldExpression) < 0);
}

/**
 * Extracts field names from field name expressions.
 *
 * @param fieldExpressions Array of field name expressions, e.g., ["{NAME}", "{STREET}", "{CITY}", "{STATE}", "{ZIP}"]
 * @returns Array of field names, e.g., ["NAME", "STREET", "CITY", "STATE", "ZIP"]
 */
export function _getFieldNamesFromFieldExpressions(
  fieldExpressions: string[]
): string[] {
  return fieldExpressions.map(
    expr => expr.substring(1, expr.length - 1)
  )
}

/**
 * Extracts the label format from the layer.
 *
 * @param webmap Webmap containing layer
 * @param layer Layer with label format
 * @param formatUsingLayerPopup When true, the layer's popup is used to choose attributes for each column; when false,
 * all attributes are exported
 * @returns A Promise resolving to the format of a single label with fields coerced to lowercase, e.g.,
 * for ILabelFormatProps type "pattern": "{name}|{street}|{city}, {state} {zip}"
 */
export async function _getLabelFormat(
  webmap: __esri.Map,
  layer: __esri.FeatureLayer,
  formatUsingLayerPopup: boolean
): Promise<ILabelFormatProps> {
  let labelFormatProps: ILabelFormatProps = {
    layer,
    attributeFormats: {},
    relationshipId: undefined,
    labelFormat: {
      type: "unsupported",
      format: undefined
    }
  };

  if (layer.popupEnabled) {
    layer.popupTemplate.fieldInfos.forEach(
      // Extract any format info that we have
      fieldInfo => {
        if (fieldInfo.format) {
          labelFormatProps.attributeFormats[fieldInfo.fieldName.toLowerCase()] = fieldInfo.format;
        }
      }
    );

    // What is the nature of the label content?

    // Fields list
    if (formatUsingLayerPopup) {
      const labelFormatType = layer.popupTemplate?.content[0]?.type;

      if (labelFormatType === "relationship") {
        const relationshipId = layer.popupTemplate.content[0].relationshipId;

        const webmapLayers = webmap.layers.toArray().concat(webmap.tables.toArray())
        .filter((entry: __esri.FeatureLayer) =>
          entry.type === "feature"
          && entry.id !== layer.id
          && entry.relationships
          && entry.relationships.some(relationship => relationship.id === relationshipId));

        labelFormatProps = await _getLabelFormat(webmap, webmapLayers[0] as __esri.FeatureLayer, formatUsingLayerPopup);
        labelFormatProps.relationshipId = relationshipId;

      } else if (labelFormatType === "fields") {
        labelFormatProps.labelFormat = _convertPopupFieldsToLabelSpec(layer.popupTemplate.fieldInfos);

        // If popup is configured with "no attribute information", then no fields will visible
        if ((labelFormatProps.labelFormat.format as string).length === 0) {
          // Can we use the popup title?
          labelFormatProps.labelFormat = layer.popupTemplate.title && typeof layer.popupTemplate.title === "string" ?
            { type: "pattern", format: layer.popupTemplate.title } as ILabelFormat
            :
            // Otherwise revert to using attributes
            _convertPopupFieldsToLabelSpec(layer.popupTemplate.fieldInfos, true);
        }

      // Example text: '<p>{name} {age} years &nbsp;</p><p>started: {start}</p>'
      } else if (labelFormatType === "text") {
        labelFormatProps.labelFormat = _convertPopupTextToLabelSpec(layer.popupTemplate.content[0].text);

      // Example expression: 'var feat = $feature\nvar label = `\n\t${feat["name"]} ${feat["age"]} years <br>\n\tstarted: ${feat["start"]}\n`\n\nreturn { \n  type : \'text\', \n  text : label\n}',
      } else if (labelFormatType === "expression") {
        labelFormatProps.labelFormat = await _convertPopupArcadeToLabelSpec(layer.popupTemplate.content[0].expressionInfo);

      // Fallback to all fields
      } else {
        labelFormatProps.labelFormat = _convertPopupFieldsToLabelSpec(layer.popupTemplate.fieldInfos);
      }
    }
  }

  return Promise.resolve(labelFormatProps);
}

/**
 * Extract selectionSetNames from the provided exportInfos
 *
 * @param exportInfos Key details about what to export (ids, layer, and selectionSetNames)
 * @returns selectionSetNames that will be used for export filenames
 */
export function _getSelectionSetNames(
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
 * Prepares an attribute's value by applying domain and type information.
 *
 * @param attributeValue Value of attribute
 * @param attributeType Type of attribute
 * @param attributeDomain Domain info for attribute, if any
 * @param attributeFormat Format info for attribute, if any
 * @param intl esri/intl
 * @return Attribute value modified appropriate to domain and type and converted to a string
 */
export function _prepareAttributeValue(
  attributeValue: any,
  attributeType: string,
  attributeDomain: __esri.CodedValueDomain | __esri.RangeDomain | __esri.InheritedDomain | null,
  attributeFormat: __esri.FieldInfoFormat,
  intl: any
): string {
  if (attributeValue === null || typeof attributeValue === "undefined") {
    return "";
  }

  if (attributeDomain && (attributeDomain as __esri.CodedValueDomain).type === "coded-value") {
    // "coded-value" domain field
    const value = (attributeDomain as __esri.CodedValueDomain).getName(attributeValue);
    return value.toString();
  } else {
    // Non-domain field or unsupported domain type
    let value = attributeValue;

    switch (attributeType) {
      case "date":
        if (attributeFormat?.dateFormat) {
          const dateFormatIntlOptions = intl.convertDateFormatToIntlOptions(attributeFormat.dateFormat as any);
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
 * @param webmap Webmap containing layer
 * @param layer Layer from which to fetch features
 * @param ids List of ids to download
 * @param formatUsingLayerPopup When true, the layer's popup is used to choose attributes for each column; when false,
 * all attributes are exported
 * @param includeHeaderNames Add the label format at the front of the list of generated labels
 * @returns Promise resolving when function is done
 */
export async function _prepareLabels(
  webmap: __esri.Map,
  layer: __esri.FeatureLayer,
  ids: number[],
  formatUsingLayerPopup = true,
  includeHeaderNames = false
): Promise<string[][]> {
  // Get the label formatting, if any
  const labelFormatProps: ILabelFormatProps = await _getLabelFormat(webmap, layer, formatUsingLayerPopup);

  // Because the label may actually come from a related layer, we'll use the layer that comes back from _getLabelFormat.
  // That function returns the supplied layer in all cases except for a "relationship" type of popup.
  const featureLayer = labelFormatProps.layer;

  let featureSet: __esri.Graphic[] = [];
  if (typeof(labelFormatProps.relationshipId) !== "undefined") {
    // Get the related items for each id
    const relatedRecResponse = await getFeatureServiceRelatedRecords(layer.url, layer.layerId, labelFormatProps.relationshipId, ids);

    const objectIdField = layer.objectIdField;
    let relatedFeatureIds: number[] = [];
    relatedRecResponse.relatedRecordGroups.forEach(
      (relatedRecGroup: IRelatedRecordGroup) => {
        relatedFeatureIds = relatedFeatureIds.concat(relatedRecGroup.relatedRecords.map((rec: IFeature) => rec.attributes[objectIdField]));
      }
    );

    // Remove duplicates
    relatedFeatureIds.sort();
    relatedFeatureIds = relatedFeatureIds.filter((id, i) => i === 0 ? true : id !== relatedFeatureIds[i-1]);

    // Get the full items
    featureSet = await queryFeaturesByID(relatedFeatureIds, featureLayer, [], false);

  } else {
    // Get the features to export
    featureSet = await queryFeaturesByID(ids, featureLayer, [], false);
  }

  // Get field data types. Do we have any domain-based fields?
  const attributeOrigNames: IAttributeOrigNames = {};
  const attributeTypes: IAttributeTypes = {};
  const attributeDomains: IAttributeDomains = {};
  featureLayer.fields.forEach(
    field => {
      const lowercaseFieldname = field.name.toLowerCase();
      attributeOrigNames[lowercaseFieldname] = field.name;
      attributeDomains[lowercaseFieldname] = field.domain;
      attributeTypes[lowercaseFieldname] = field.type;
    }
  );

  // Apply the label format
  const labels
    = labelFormatProps.labelFormat.type === "pattern" ?
    // Export attributes in format
    await _prepareLabelsFromPattern(/*layer,*/ featureSet, attributeOrigNames, attributeTypes, attributeDomains,
      labelFormatProps.attributeFormats, labelFormatProps.labelFormat.format as string, includeHeaderNames)

    : labelFormatProps.labelFormat.type === "executor" ?
    // Export attributes in expression
    await _prepareLabelsUsingExecutor(featureSet, labelFormatProps.labelFormat.format as __esri.ArcadeExecutor)

    :
    // Export all attributes
    await _prepareLabelsFromAll(featureSet, attributeTypes, attributeDomains, includeHeaderNames);

  return Promise.resolve(labels);
}

/**
 * Creates labels from all attributes in items.
 *
 * @param featureSet Features to convert to labels
 * @param attributeTypes Type for each attribute in a feature
 * @param attributeDomains Domains for each attribute in a feature
 * @param includeHeaderNames Add the label format at the front of the list of generated labels
 * @returns Promise resolving with list of labels, each of which is a list of label lines
 */
export async function _prepareLabelsFromAll(
  featureSet: __esri.Graphic[],
  attributeTypes: IAttributeTypes,
  attributeDomains: IAttributeDomains,
  includeHeaderNames = false
): Promise<string[][]> {
  const [intl] = await loadModules(["esri/intl"]);

  // Export all attributes
  const labels = featureSet.map(
    feature => {
      return Object.keys(feature.attributes).map(
        (attributeName: string) => {
          const lowercaseFieldname = attributeName.toLowerCase();
          return _prepareAttributeValue(feature.attributes[attributeName],
            attributeTypes[lowercaseFieldname], attributeDomains[lowercaseFieldname],
            null, intl);
        }
      );
    }
  );

  // Add header names
  if (includeHeaderNames) {
    const headerNames = [];
    const featuresAttrs = featureSet[0].attributes;
    Object.keys(featuresAttrs).forEach(k => {
      headerNames.push(k);
    });
    labels.unshift(headerNames);
  }

  return Promise.resolve(labels);
}

/**
 * Creates labels from attributes in a layer popup.
 *
 * @param featureSet Features to convert to labels
 * @param attributeOrigNames Mapping from lowercase field names to original field names
 * @param attributeTypes Type for each attribute in a feature
 * @param attributeDomains Domains for each attribute in a feature
 * @param attributeFormats Formats for each attribute in a feature
 * @param labelFormat Format for label
 * @param includeHeaderNames Add the label format at the front of the list of generated labels
 * @returns Promise resolving with list of labels, each of which is a list of label lines
 */
export async function _prepareLabelsFromPattern(
  //layer: __esri.FeatureLayer,
  featureSet: __esri.Graphic[],
  attributeOrigNames: IAttributeOrigNames,
  attributeTypes: IAttributeTypes,
  attributeDomains: IAttributeDomains,
  attributeFormats: IAttributeFormats,
  labelFormat: string,
  includeHeaderNames = false
): Promise<string[][]> {
  const [intl] = await loadModules(["esri/intl"]);

  // Find the label fields that we need to replace with values
  const attributeExpressionMatches = _getFieldExpressionsFromLabel(labelFormat);
  const attributeNames = _getFieldNamesFromFieldExpressions(attributeExpressionMatches);

  // Do we need any Arcade executors?
  //const arcadeExecutors = await _createArcadeExecutors(labelFormat, layer);
  //const arcadeExpressionRegExp = /\{expression\/\w+\}/g;

  // Find the label fields that we need to replace with values
  //const arcadeExpressionMatches = labelFormat.match(arcadeExpressionRegExp) ?? [];

  // Convert feature attributes into an array of labels
  const labels = await Promise.all(featureSet.map(
    async feature => {
      let labelPrep = labelFormat;

      /*
      // Replace Arcade expressions in this feature
      for (let i = 0; i < arcadeExpressionMatches.length; i++) {
        const match: string = arcadeExpressionMatches[i];
        const expressionName = match.substring(match.indexOf("/") + 1, match.length - 1);
        const value = await arcadeExecutors[expressionName].executeAsync({"$feature": feature, "$layer", layer});
        labelPrep = labelPrep.replace(match, value);
      }
      */

      // Replace non-Arcade fields in this feature
      attributeNames.forEach(
        (attributeName: string, i: number) => {
          const lowercaseFieldname = attributeName.toLowerCase();
          const value = _prepareAttributeValue(feature.attributes[attributeOrigNames[lowercaseFieldname]],
            attributeTypes[lowercaseFieldname], attributeDomains[lowercaseFieldname],
            attributeFormats[lowercaseFieldname], intl);
          labelPrep = labelPrep.replace(attributeExpressionMatches[i], value);

        },
      )

      // Split label into lines
      let label = labelPrep.split(lineSeparatorChar);

      // Trim lines
      label = label.map(line => _cleanupLabel(line));

      return label;
    }
  ));

  // Add header names
  if (includeHeaderNames) {
    labels.unshift(attributeNames);
  }

  return Promise.resolve(labels);
}

/**
 * Creates labels from attributes in an Arcade label.
 *
 * @param featureSet Features to convert to labels
 * @param labelFormat Arcade executor for label
 * @returns Promise resolving with list of labels, each of which is a list of label lines
 */
export async function _prepareLabelsUsingExecutor(
  featureSet: __esri.Graphic[],
  labelFormat: __esri.ArcadeExecutor
): Promise<string[][]> {
  // Convert feature attributes into an array of labels
  const execResults = await Promise.all(featureSet.map(
    async feature => {
      return labelFormat.executeAsync({"$feature": feature});
    }
  ));

  const labels = execResults.map(
    result => _cleanupLabel(result.text).split(lineSeparatorChar)
  )

  return Promise.resolve(labels);
}

//#endregion
