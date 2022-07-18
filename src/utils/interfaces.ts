/** @license
 * Copyright 2021 Esri
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
 * Resource update types
 */
/* eslint-disable no-unused-vars */
export enum EUpdateType {
  Add,
  Update,
  Remove,
  None
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
  ADD="ADD",
  REMOVE="REMOVE"
}

export enum EWorkflowType {
  SEARCH="SEARCH",
  SELECT="SELECT",
  SKETCH="SKETCH"
}
/* eslint-enable no-unused-vars */

export type SelectionMode = "single" | "multi";

/**
 * Key details from the templates item
 */
export interface IItemDetails {
  title: string;
  snippet: string;
  description: string;
  tags: string[];
  accessInformation?: string;
  licenseInfo?: string;
  itemId: string;
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
  solutionItem: ISolutionItem;
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
export interface ISolutionItem {
  itemId: string;
  itemDetails: any; //use the interface
  isResource: boolean; // this should be removed and determined from the data
  data: ITemplateData;
  properties: ITemplateData;
  type: string;
  groupDetails?: IItemShare[];
}

/**
 * Key state info for a solution template
 */
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
  spatialReference: any;
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
export interface IResourcePath {
  url: string;
  type: number;
  filename: string;
  blob?: any; // This will only be set when a new file is uploaded (add or update)
  sourceFileName?: string; // This will only be set when a file is being updated
  updateType: EUpdateType
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

export interface ISelectionSet {
  id: number; // Date.Now() when the item is created...used to update a selection set
  workflowType: EWorkflowType;
  searchResult: any;
  selectLayers: any;
  graphics: __esri.Graphic[];
  buffer: __esri.Geometry;
  distance: number;
  unit: __esri.LinearUnits;
  numSelected: number;
  label: string;
  selectedFeatures: __esri.Graphic[],
  layerView: __esri.FeatureLayerView,
  geometries: __esri.Geometry[],
  sketchGraphics: __esri.Graphic[]
}
