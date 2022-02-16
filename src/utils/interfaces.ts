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

 export enum EUpdateType {
  Add,
  Update,
  Remove,
  None
}

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

export interface IResourcePath {
  url: string;
  type: number;
  filename: string;
  blob?: any; // This will only be set when a new file is uploaded (add or update)
  sourceFileName?: string; // This will only be set when a file is being updated
  updateType: EUpdateType
}
