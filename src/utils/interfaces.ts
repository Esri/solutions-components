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

export interface IItemDetails {
  thumbnail: string;
  title: string;
  snippet: string;
  description: string;
  tags: string[];
  accessInformation?: string;
  licenseInfo?: string;
  itemId: string;
}

export interface IInventoryItem {
  id: string;
  title: string;
  dependencies?: IInventoryItem[];
  type: string;
  typeKeywords: string[];
  solutionItem: ISolutionItem;
}

export interface IItemShare {
  id: string;
  title: string;
  isShared: boolean;
  shareItem: boolean;
  type: string;
  typeKeywords: string[];
}

export interface IOrganizationVariableItem {
  id: string;
  title: string;
  value: string;
}

export interface IResourceItem {
  name: string;
  url: string;
}

export interface IResponse {
  success: boolean;
  message: string;
}

export interface ISolutionConfiguration {
  contents: IInventoryItem[];
}

export interface ISolutionItem {
  itemId: string;
  itemDetails: any; //use the interface
  isResource: boolean; // this should be removed and determined from the data
  data: ITemplateData;
  properties: ITemplateData;
  type: string;
  groupDetails?: IItemShare[];
}

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
}

export interface ISolutionModels {
  [key: string]: ISolutionModel;
}

export interface ISpatialRefRepresentation {
  display: string;
  usingWkid: boolean;
  wkid: number;
  wkt: string;
}

export interface ITemplateData {
  resourceItem?: IResourceItem;
  value?: any;
}

export interface IUpdateTemplateResponse {
  templates: any[];
  errors: string[];
}

export interface IVariableItem {
  id: string;
  title: string;
  type?: string;
  value: string;
  dependencies?: IVariableItem[];
}

export interface IWkidDescription {
  label: string;
  defaultExtent: string;
}