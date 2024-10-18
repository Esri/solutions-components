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
import { IFeatureServiceEnabledStatus, IInventoryItem, IOrganizationVariableItem, ISolutionModels, IVariableItem } from '../utils/interfaces';
import { IItemTemplate } from '@esri/solution-common';
/**
 * Gets a list of Feature Services that are not views along with an enabled property that indicates
 * if the service currently uses a spatial reference variable.
 *
 * @param templates a list of item templates from the solution
 *
 * @returns a list of feature service names and an enabled property to indicate
 * if they currently use a spatial reference variable.
 */
export declare function getFeatureServices(templates: IItemTemplate[]): IFeatureServiceEnabledStatus[];
/**
 * Sort the solution items
 *
 * @param templates a list of item templates from the solution
 *
 * @returns a sorted list of solution items
 */
export declare function getInventoryItems(templates: IItemTemplate[]): IInventoryItem[];
/**
 * Create item hierarchy that will avoid issues from cylical dependencies
 *
 * @param templates a list of item templates from the solution
 *
 * @returns a hierarchy for item and item dependency display
 */
export declare function getItemHierarchy(templates: IItemTemplate[]): any[];
/**
 * Create and store text models for the editor as well as other key values such as the original values
 * that can be used to clear any temp edits.
 *
 * @param templates a list of item templates from the solution
 *
 * @returns a list of models and key values
 */
export declare function getModels(templates: any[]): ISolutionModels;
/**
 * Set key organization variables we will allow users to insert at runtime
 *
 * @param translations nls translation object
 *
 * @returns a list of variables for the organization
 */
export declare function getOrganizationVariables(translations: any): IOrganizationVariableItem[];
/**
 * Explore the solution item templates for variables we will allow users to insert at runtime
 *
 * @param templates a list of item templates from the solution
 * @param translations nls translation object
 *
 * @returns a list of variables from the solution item templates
 */
export declare function getSolutionVariables(templates: any[], translations: any): IVariableItem[];
/**
 * Stores basic spatial reference information that is used to determine if a custom spatial reference parameter will
 * be exposed while deploying this solution and if so what feature services will support it and what will the default wkid be
 *
 * @param services a list of objects with service name and enabled property (indicates if they currently use a spatial reference var)
 * @param data the data object of a solution item
 *
 * @returns an object that stores if a custom spatial reference parameter is enabled/disabled,
 * a list of services and if they are enabled/disabled, and the default wkid
 */
export declare function getSpatialReferenceInfo(services: any[], data: any): any;
