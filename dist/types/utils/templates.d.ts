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
import { IInventoryItem, IOrganizationVariableItem, IVariableItem } from '../utils/interfaces';
import { IItemTemplate } from '@esri/solution-common';
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
 * Explore the solution item templates for variables we will allow users to insert at runtime
 *
 * @param templates a list of item templates from the solution
 * @param translations nls translation object
 *
 * @returns a list of variables from the solution item templates
 */
export declare function getSolutionVariables(templates: any[], translations: any): IVariableItem[];
/**
 * Set key organization variables we will allow users to insert at runtime
 *
 * @param translations nls translation object
 *
 * @returns a list of variables for the organization
 */
export declare function getOrganizationVariables(translations: any): IOrganizationVariableItem[];
