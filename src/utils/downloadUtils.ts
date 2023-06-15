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

interface IArcadeExecutors {
  [expressionName: string]: __esri.ArcadeExecutor;
}

interface IArcadeExecutorPromises {
  [expressionName: string]: Promise<__esri.ArcadeExecutor>;
}

interface IAttributeDomains {
  [attributeName: string]: __esri.CodedValueDomain | __esri.RangeDomain | __esri.InheritedDomain | null;
}

interface IAttributeFormats {
  [attributeName: string]: __esri.FieldInfoFormat;
}

interface IAttributeTypes {
  [attributeName: string]: string;
}

interface ILayerRelationshipQuery {
  layer: __esri.FeatureLayer;
  relatedQuery: IRelatedFeaturesQuery;
}

interface ILayerRelationshipQueryHash {
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
 * Extracts Arcade expressions from the lines of a label format and creates an Arcade executor for each
 * referenced expression name.
 *
 * @param labelFormat Label to examine
 * @param layer Layer from which to fetch features
 * @return Promise resolving to a set of executors keyed using the expression name
 */
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
 * Creates relationship queries for each relationship flag in a popup.
 * @param layer Layer whose popup is to be examined
 * @return Hash of relationships by their id, or null if there are no relationship flags in the
 * popup; each relationship has the properties layer and relatedQuery for the related layer
 * and the query for that layer
 */
export function _createRelationshipQueries(
  layer: __esri.FeatureLayer,
): ILayerRelationshipQueryHash {

  const relationships: ILayerRelationshipQueryHash = {};
  const relationshipFieldPattern = /\{relationships\/\d+\//gm;
  const relationshipIdPattern = /\d+/;

  // Test if this popup has any relationship references
  const matches = layer.popupTemplate.content[0].text.match(relationshipFieldPattern);
  if (matches) {
    matches.forEach(match => {
      // Add a query to a found relationship if we don't already have one
      const id = match.match(relationshipIdPattern)[0];
      if (!relationships.hasOwnProperty(id)) {
        const relatedQuery: IRelatedFeaturesQuery = {
          outFields: ['*'],
          relationshipId: id,
          returnGeometry: false
        };
        relationships[id] = {
          layer,
          relatedQuery
        } as ILayerRelationshipQuery;
      }
    });
  }

  return relationships;
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
  const featureSet = await queryFeaturesByID(ids, layer, []);

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
  let relationshipQueries: ILayerRelationshipQueryHash = {};
  let arcadeExecutors: IArcadeExecutors = {};
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

      // Do we need any relationship queries?
      relationshipQueries = _createRelationshipQueries(layer);

      // Do we need any Arcade executors?
      arcadeExecutors = await _createArcadeExecutors(labelFormat, layer);
    }
  }

  // Apply the label format
  let labels: string[][];
  // eslint-disable-next-line unicorn/prefer-ternary
  if (labelFormat) {
    const arcadeExpressionRegExp = /\{expression\/\w+\}/g;
    const attributeRegExp = /\{\w+\}/g;

    // Find the label fields that we need to replace with values
    const arcadeExpressionMatches = labelFormat.match(arcadeExpressionRegExp) ?? [];
    const attributeMatches = labelFormat.match(attributeRegExp) ?? [];

    // Convert feature attributes into an array of labels
    const relationshipKeys = Object.keys(relationshipQueries);
    labels = await Promise.all(featureSet.map(
      async feature => {
        let labelPrep = labelFormat;

        // Replace Arcade expressions in this feature
        arcadeExpressionMatches.forEach(
          (match: string) => {
            const expressionName = match.substring(match.indexOf("/") + 1, match.length - 1);
            const value = arcadeExecutors[expressionName].execute({"$feature": feature});
            labelPrep = labelPrep.replace(match, value);
          }
        )

        // Replace relationship expressions in this feature
        const relatedFeatureQueries = [] as Promise<__esri.FeatureSet>[];
        const relationshipIds = [] as string[];
        relationshipKeys.forEach(
          (relationshipId) => {
            const relationship = relationshipQueries[relationshipId];
            const objectId = feature.attributes[relationship.layer.objectIdField];
            const relatedQuery = {
              ...relationship.relatedQuery,
              objectIds: [objectId]
            };
            relatedFeatureQueries.push(relationship.layer.queryRelatedFeatures(relatedQuery as any));
            relationshipIds.push(relationshipId);
          }
        );

        // Wait for all of the queries for related records for this label
        const relatedFeatureQueryResults = await Promise.all(relatedFeatureQueries);
        relatedFeatureQueryResults.forEach(
          (relatedFeatureQueryResult, i) => {
            // We have an object with FeatureSets grouped by source layer or table objectIds
            const relationshipId = relationshipIds[i];

            // Run through the source layer or table objectIds
            Object.keys(relatedFeatureQueryResult).forEach(
              relatedFeatureSetId => {
                // We have a feature set
                const relatedFeatures = relatedFeatureQueryResult[relatedFeatureSetId].features;

                // Get the values from each feature and replace them in the label
                relatedFeatures.forEach(
                  feature => {
                    // Merge the base and related feature attributes and create the label
                    // Prefix related feature's attributes with "relationships/<id>/" to match popup
                    const rePrefix = "\{relationships/" + relationshipId + "/";
                    const reSuffix = "\}";

                    const attributes = feature.attributes;
                    Object.keys(attributes).forEach(
                      attributeName => {
                        // Replace the value using the attribute name as a relationship
                        const attributeRelationshipRegExp = new RegExp(rePrefix + attributeName + reSuffix, "g");
                        labelPrep = labelPrep.replaceAll(attributeRelationshipRegExp, attributes[attributeName]);
                      }
                    );
                  }
                );
              }
            );
          }
        );

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
    labelRequests.push(_prepareLabels(labelInfo.layerView.layer, labelInfo.ids, formatUsingLayerPopup, includeHeaderNames));
    if (isCSVExport) {
      // add the layer id as a temp value separator that we can use to split values for CSV export
      labelRequests.push(Promise.resolve([[k]]));
    }
  });

  const labels = await Promise.all(labelRequests);
  return labels.reduce((prev, cur) => prev.concat(cur), []);
}

//#endregion
