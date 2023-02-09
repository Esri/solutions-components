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

import {
  IDeployFileCopyPath,
  IItemTemplate
} from '@esri/solution-common';

/**
 * Resource update types
 */
export enum EUpdateType {
  Add,
  Update,
  Remove,
  None,
  Obsolete
}

export enum EExportType {
  PDF,
  CSV
}

export enum EPageType {
  LIST,
  SELECT,
  REFINE,
  PDF,
  CSV
}

export enum ERefineMode {
  ALL="ALL", // Used for the refine selection workflow
  SUBSET="SUBSET" // Used as a part interactive selection "Use layer features"
}

export enum ESelectionMode {
  ADD="ADD",
  REMOVE="REMOVE"
}

export enum EWorkflowType {
  SEARCH="SEARCH",
  SELECT="SELECT",
  SKETCH="SKETCH",
  REFINE="REFINE"
}

export enum ESelectionType {
  POINT="POINT",
  LINE="LINE",
  POLY="POLY",
  RECT="RECT"
}

export enum ESketchType {
  "LAYER"="LAYER",
  "INTERACTIVE"="INTERACTIVE"
}

export enum EExpandType {
  EXPAND="EXPAND",
  COLLAPSE="COLLAPSE"
}

/* eslint-enable no-unused-vars */

export type SelectionMode = "single" | "multi";

export type ValidSize = 6|10|14|20|30|60|80;

export type DistanceUnit = "feet"|"meters"|"miles"|"kilometers";

export interface IExportOptions {
  csvOptions: ICsvOptions;
  pdfOptions: IPdfOptions;
}

export interface ICsvOptions {
  enabled: boolean;
  addColumnTitle: boolean;
}

export interface IPdfOptions {
  enabled: boolean;
  enabledSizeValues: ValidSize[];
}

export interface ISearchConfiguration {
  activeSourceIndex?: number;
  allPlaceholder?: string;
  includeDefaultSources?: boolean;
  searchAllEnabled?: boolean;
  sources: Array<ILocatorSourceConfigItem | ILayerSourceConfigItem>;
}

interface ISearchSourceConfigItem {
  maxResults: number;
  maxSuggestions: number;
  minSuggestCharacters: number;
  name: string;
  suggestionsEnabled: boolean;
  placeholder: string;
  withinViewEnabled: boolean;
  zoomScale: number;
}

export interface ILocatorSourceConfigItem extends ISearchSourceConfigItem {
  url: string;
  singleLineFieldName: string;
  countryCode: string;
}

export interface ILayerSourceConfigItem extends ISearchSourceConfigItem {
  displayField: string;
  exactMatch: boolean;
  layer: {
    url: string | __esri.FeatureLayer;
    id: string;
  };
  outFields: string[];
  searchFields: string;
  popupTemplate: any;
  popupEnabled: boolean;
}

export interface IValueChange {
  oldValue: number | string;
  newValue: number | string;
}

/**
 * Layer id and title key value pair
 */
export interface ILayerHash {
  [key: string]: string;
}

/**
 * Key details from the templates item
 */
export interface IItemDetails {
  accessInformation?: string;
  description?: string;
  licenseInfo?: string;
  snippet: string;
  tags: string[];
  title: string;
  [key: string]: any;
}

/**
 * Key details used to show solution contents
 */
export interface IInventoryItem {
  id: string;
  title: string;
  dependencies?: IInventoryItem[];
  type: string;
  typeKeywords: string[];
}

/**
 * A templates share details
 */
export interface IItemShare {
  id: string;
  title: string;
  isShared: boolean;
  shareItem: boolean;
  type: string;
  typeKeywords: string[];
}

/**
 * Organization based variables the user can insert at runtime
 */
export interface IOrganizationVariableItem {
  id: string;
  title: string;
  value: string;
}

/**
 * Key details for items that support upload/download
 */
export interface IResourceItem {
  name: string;
  url: string;
}

/**
 * Standardized response type for promises
 */
export interface IResponse {
  success: boolean;
  message: string;
}

/**
 * Solution configuration details used to display solution contents
 */
export interface ISolutionConfiguration {
  contents: IInventoryItem[];
}

/**
 * Details used to display and store information about the item
 */
export interface ISolutionTemplateEdit {
  itemId: string;
  type: string;
  details: IItemDetails;
  data: any;
  properties: any;
  thumbnail: any;
  resourceFilePaths: IResourcePath[];
  groupDetails?: IItemShare[];
}

export interface IItemTemplateEdit extends IItemTemplate {
  resourceFilePaths: IResourcePath[];
  thumbnail: any;
  groupDetails?: IItemShare[];
}

/**
 * A list of solution state info for each template in a solution
 */
export interface ISolutionTemplateEdits {
  [templateId: string]: ISolutionTemplateEdit;
}

//???
export interface ISolutionModel {
  dataModel: monaco.editor.ITextModel;
  dataOriginValue: string;
  propsModel: monaco.editor.ITextModel;
  propsOriginValue: string;
  propsDiffOriginValue: string;
  state: any;
  shareInfo: any;
  isEditing: boolean;
  itemId: string;
  updateItemValues: any;
  originalItemValues: any;
  name: string;
  title: string;
  itemOriginValue: string;
  spatialReference: any;
  resources: string[];
  resourceFilePaths: IResourcePath[];
  sourceResourceFilePaths: IResourcePath[];
  thumbnailOrigin: any;
  thumbnailNew: any;
  type: string;
}

/**
 * A list of solution models for each template in a solution
 */
export interface ISolutionModels {
  [key: string]: ISolutionModel;
}
//???

/**
 * Feature service name and whether the service is enabled for SR configuration
 */
export interface IFeatureServiceEnabledStatus {
  name: string;
  enabled: boolean;
}

/**
 * Hash of service name: enabled (should it honor the user defined spatial reference)
 */
export interface IServiceInfo {
  [key: string]: boolean;
}

/**
 * Key spatial reference information for the solution
 */
export interface ISolutionSpatialReferenceInfo {
  enabled: boolean;
  services: IServiceInfo;
  spatialReference: string | number;
}

/**
 * Key spatial reference information
 */
export interface ISpatialRefRepresentation {
  display: string;
  usingWkid: boolean;
  wkid: number;
  wkt: string;
}

/**
 * Stores the data object for a template and indicator if it supports upload/download
 */
export interface ITemplateData {
  resourceItem?: IResourceItem;
  value?: any;
}

/**
 * Stores updated templates that contain runtime changes from the user
 */
export interface IUpdateTemplateResponse {
  templates: any[];
  errors: string[];
}

/**
 * Solution template based variables that the user can insert at runtime
 */
export interface IVariableItem {
  id: string;
  title: string;
  type?: string;
  value: string;
  dependencies?: IVariableItem[];
}

/**
 * WKID label and extent
 */
export interface IWkidDescription {
  label: string;
  defaultExtent: string;
}

/**
 * Key details to manage resources
 */
export interface IResourcePath extends IDeployFileCopyPath {
  blob?: any; // This will only be set when a new file is uploaded (add or update)
  sourceFileName?: string; // This will only be set when a file is being updated
  updateType: EUpdateType;
}

/**
 * A templates share details
 */
export interface ISearchConfig {
  layers: string[];
  layerUrl: string;
  locators: string[];
  locatorUrl: string;
}

export interface ISearchResult {
  graphics: __esri.Graphic[];
  name: string;
}

export interface ISelectionSet {
  id: number; // Date.Now() when the item is created...used to update a selection set
  workflowType: EWorkflowType;
  searchResult: any;
  buffer: __esri.Geometry;
  distance: number;
  download: boolean;
  unit: DistanceUnit;
  label: string;
  selectedIds: number[];
  layerView: __esri.FeatureLayerView;
  geometries: __esri.Geometry[];
  refineSelectLayers: __esri.FeatureLayerView[];
  refineIds: IRefineIds;
  redoStack?: IRefineOperation[];
  undoStack?: IRefineOperation[];
}

export interface IRefineIds {
  addIds: number[];
  removeIds: number[];
}

export interface IQueryExtentResponse {
  count: number;
  extent: __esri.Extent;
}

export interface IRefineOperation {
  mode: ESelectionMode;
  ids: number[];
}

export interface IInfoCardValues {
  [key: string]: string;
}

export interface IMediaCardValues {
  name: string;
  description: string;
  url: string;
}

export interface IMapInfo {
  id: string;
  name: string;
}
