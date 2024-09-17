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
import { IExportInfos } from "../utils/interfaces";
export { ILabel } from "./pdfUtils";
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
/**
 * Related record query request options with new exceededTransferLimit property.
 */
export interface IQueryRelatedOptionsOffset extends IQueryRelatedOptions {
    params: {
        resultOffset: number;
    };
}
/**
 * Related record response structure with new exceededTransferLimit property.
 */
export interface IQueryRelatedResponseOffset extends IQueryRelatedResponse {
    exceededTransferLimit?: boolean;
}
interface IRelatedFeaturesQuery {
    outFields: string[];
    relationshipId: string;
    returnGeometry: boolean;
    objectIds?: number;
}
import { IQueryRelatedOptions, IQueryRelatedResponse, IRelatedRecordGroup } from "@esri/arcgis-rest-feature-layer";
/**
 * Create and consolidate labels from all layers
 *
 * @param webmap Webmap containing layer
 * @param exportInfos Key details about what to export (ids, layer, and selectionSetNames)
 * @param formatUsingLayerPopup When true, the layer's popup is used to choose attributes for each column; when false,
 * all attributes are exported
 * @param includeHeaderNames Add a heading entries at the beginning of the list of generated labels
 * @param isCSVExport Indicates if the export is for a CSV file
 * @param fields Fields to include in the export
 * @param useFieldAliasNames Indicates if field alias names should be used in the export
 * @param filterFields Indicates if fields should be filtered
 * @returns selectionSetNames that will be used for export filenames
 */
export declare function consolidateLabels(webmap: __esri.Map, exportInfos: IExportInfos, formatUsingLayerPopup?: boolean, includeHeaderNames?: boolean, isCSVExport?: boolean, fields?: any, useFieldAliasNames?: boolean, filterFields?: boolean): Promise<string[][]>;
/**
 * Downloads csv of mailing labels for the provided list of ids
 *
 * @param webmap Webmap containing layer
 * @param exportInfos Key details about what to export (ids, layer, and selectionSetNames)
 * @param formatUsingLayerPopup When true, the layer's popup is used to choose attributes for each column; when false,
 * all attributes are exported
 * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
 * @param addColumnTitle Indicates if column headings should be included in output
 * @param fields Fields to include in the export
 * @param useFieldAliasNames Indicates if field alias names should be used in the export
 * @param filterFields Indicates if fields should be filtered
 * @returns Promise resolving when function is done
 */
export declare function downloadCSV(webmap: __esri.Map, exportInfos: IExportInfos, formatUsingLayerPopup: boolean, removeDuplicates?: boolean, addColumnTitle?: boolean, fields?: any, useFieldAliasNames?: boolean, filterFields?: boolean): Promise<void>;
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
export declare function downloadPDF(webmap: __esri.Map, exportInfos: IExportInfos, labelPageDescription: ILabel, removeDuplicates?: boolean, title?: string, initialImageDataUrl?: string): Promise<void>;
/**
 * Remove any duplicate labels
 *
 * @param labels Labels to evaluate for duplicates
 * @returns labels with duplicates removed
 */
export declare function removeDuplicateLabels(labels: string[][]): string[][];
/**
 * Converts the text of a custom popup into a multiline label specification; conversion splits text into
 * lines on <br>s, and removes HTML tags.
 *
 * @param labelText Layer's popup text, e.g.,
 * "<div style='text-align: left;'>{NAME}<br />{STREET}<br />{CITY}, {STATE} {ZIP} <br /></div>"
 * @return Cleaned-up popup text with lines separated by `lineSeparatorChar`
 */
export declare function _cleanupLabel(labelText: string): string;
/**
 * Converts a set of fieldInfos into template lines.
 *
 * @param fieldInfos Layer's fieldInfos structure
 * @param bypassFieldVisiblity Indicates if the configured fieldInfo visibility property should be ignored
 * @return "pattern" label spec with lines separated by `lineSeparatorChar`
 */
export declare function _convertPopupFieldsToLabelSpec(fieldInfos: __esri.FieldInfo[], bypassFieldVisiblity?: boolean): ILabelFormat;
/**
 * Converts the text of a custom popup into a multiline label specification; conversion splits text into
 * lines on <br>s, and removes HTML tags. It does not handle Arcade and related records.
 *
 * @param labelText Layer's labelText structure containing description, fieldInfos, and expressionInfos, e.g.,
 * "<div style='text-align: left;'>{NAME}<br />{STREET}<br />{CITY}, {STATE} {ZIP} <br /></div>"
 * @return "pattern" label spec with lines separated by `lineSeparatorChar`
 */
export declare function _convertPopupTextToLabelSpec(popupInfo: string): ILabelFormat;
/**
 * Converts an Arcade expression of a custom popup into a multiline label specification.
 *
 * @param expressionInfo Structure containing expression and info about it
 * @return Promise resolving to an "executor" label spec
 */
export declare function _convertPopupArcadeToLabelSpec(expressionInfo: __esri.ElementExpressionInfo): Promise<ILabelFormat>;
/**
 * Creates a title from a list of selection set names.
 *
 * @param selectionSetNames Names to use in title
 * @return Title composed of the selectionSetNames separated by commas; if there are no
 * selection set names supplied, "download" is returned
 */
export declare function _createFilename(selectionSetNames: string[]): string;
/**
 * Creates headings from a label format.
 *
 * @param labelFormat Format for label
 * @returns A list of headings, with one heading for each line in the label format
 */
export declare function _extractHeaderNames(labelFormat: string): string[];
/**
 * Extracts Arcade expression references from the lines of a label format.
 *
 * @param labelFormat Label to examine
 * @return Array of Arcade expression references, e.g., ["{expression/expr1}", "{expression/expr2}"]
 */
export declare function _getExpressionsFromLabel(labelFormat: string): string[];
/**
 * Gets the related records for a feature service.
 *
 * @param url Feature service's URL, e.g., layer.url
 * @param layerId Id of layer within a feature service
 * @param relationshipId Id of relationship
 * @param objectIds Objects in the feature service whose related records are sought
 * @returns Promise resolving to an array of objects and their related records
 */
export declare function _getFeatureServiceRelatedRecords(url: string, layerId: number, relationshipId?: number, objectIds?: number[]): Promise<IRelatedRecordGroup[]>;
/**
 * Gets a tranche of related records for a feature service.
 *
 * @param options Options for arcgis-rest-js' queryRelated function
 * @param relationships Array of related records accumulated so far
 * @param resultOffset Number of records already retrieved
 * @returns Promise resolving to an array of objects and their related records
 */
export declare function _getFeatureServiceRelatedRecordsTranche(options: IQueryRelatedOptions, relationships?: IRelatedRecordGroup[], resultOffset?: number): Promise<IRelatedRecordGroup[]>;
/**
 * Extracts field name expressions from the lines of a label format.
 *
 * @param labelFormat Label to examine
 * @returns Array of field name expressions, e.g., ["{NAME}", "{STREET}", "{CITY}", "{STATE}", "{ZIP}"]
 */
export declare function _getFieldExpressionsFromLabel(labelFormat: string): string[];
/**
 * Extracts field names from field name expressions.
 *
 * @param fieldExpressions Array of field name expressions, e.g., ["{NAME}", "{STREET}", "{CITY}", "{STATE}", "{ZIP}"]
 * @returns Array of field names, e.g., ["NAME", "STREET", "CITY", "STATE", "ZIP"]
 */
export declare function _getFieldNamesFromFieldExpressions(fieldExpressions: string[]): string[];
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
export declare function _getLabelFormat(webmap: __esri.Map, layer: __esri.FeatureLayer, formatUsingLayerPopup: boolean): Promise<ILabelFormatProps>;
/**
 * Extract selectionSetNames from the provided exportInfos
 *
 * @param exportInfos Key details about what to export (ids, layer, and selectionSetNames)
 * @returns selectionSetNames that will be used for export filenames
 */
export declare function _getSelectionSetNames(exportInfos: IExportInfos, id?: RegExp): string[];
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
export declare function _prepareAttributeValue(attributeValue: any, attributeType: string, attributeDomain: __esri.CodedValueDomain | __esri.RangeDomain | __esri.InheritedDomain | null, attributeFormat: __esri.FieldInfoFormat, intl: any): string;
/**
 * Creates labels from items.
 *
 * @param webmap Webmap containing layer
 * @param layer Layer from which to fetch features
 * @param ids List of ids to download
 * @param formatUsingLayerPopup When true, the layer's popup is used to choose attributes for each column; when false,
 * all attributes are exported
 * @param includeHeaderNames Add a heading entries at the beginning of the list of generated labels
 * @returns Promise resolving when function is done
 */
export declare function _prepareLabels(webmap: __esri.Map, layer: __esri.FeatureLayer, ids: number[], formatUsingLayerPopup?: boolean, includeHeaderNames?: boolean, fields?: any, useFieldAliasNames?: boolean, filterFields?: boolean): Promise<string[][]>;
/**
 * Creates labels from all attributes in items.
 *
 * @param featureSet Features to convert to labels
 * @param attributeTypes Type for each attribute in a feature
 * @param attributeDomains Domains for each attribute in a feature
 * @param includeHeaderNames Add a heading entries at the beginning of the list of generated labels
 * @returns Promise resolving with list of labels, each of which is a list of label lines
 */
export declare function _prepareLabelsFromAll(featureSet: __esri.Graphic[], attributeTypes: IAttributeTypes, attributeDomains: IAttributeDomains, includeHeaderNames?: boolean, useFieldAliasNames?: boolean): Promise<string[][]>;
/**
 * Creates labels from attributes in a layer popup.
 *
 * @param featureSet Features to convert to labels
 * @param attributeOrigNames Mapping from lowercase field names to original field names
 * @param attributeTypes Type for each attribute in a feature
 * @param attributeDomains Domains for each attribute in a feature
 * @param attributeFormats Formats for each attribute in a feature
 * @param labelFormat Format for label
 * @param includeHeaderNames Add a heading entries at the beginning of the list of generated labels
 * @returns Promise resolving with list of labels, each of which is a list of label lines
 */
export declare function _prepareLabelsFromPattern(layer: __esri.FeatureLayer, featureSet: __esri.Graphic[], attributeOrigNames: IAttributeOrigNames, attributeTypes: IAttributeTypes, attributeDomains: IAttributeDomains, attributeFormats: IAttributeFormats, labelFormat: string, includeHeaderNames?: boolean): Promise<string[][]>;
/**
 * Creates labels from attributes in an Arcade label.
 *
 * @param featureSet Features to convert to labels
 * @param labelFormat Arcade executor for label
 * @returns Promise resolving with list of labels, each of which is a list of label lines
 */
export declare function _prepareLabelsUsingExecutor(featureSet: __esri.Graphic[], labelFormat: __esri.ArcadeExecutor): Promise<string[][]>;
