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
import { UserSession } from "@esri/solution-common";
import { IResponse, ISolutionModels } from "./interfaces";
/**
 * Get an array from a list of nodes
 *
 * @param nodeList list of nodes
 *
 * @returns array of nodes
 */
export declare function nodeListToArray<T extends Element>(nodeList: HTMLCollectionOf<T> | NodeListOf<T> | T[]): T[];
/**
 * Saves any updated templates to the current solution item
 *
 * @param templates the updated templates array
 * @param thumbnailurl url for the items thumbnail
 * @param id for the solution item
 * @param data the current solution items data
 * @param authentication credentials for the request
 * @param translations translated strings for messages
 *
 * @returns a promise that will resolve with a success true/false response
 */
export declare function save(id: string, data: any, models: ISolutionModels, authentication: UserSession, translations: any): Promise<IResponse>;
/**
 * Updates the solutions thumbnail and data resources
 *
 * @param solutionId id for the solution
 * @param models the models for the solutions templates
 * @param data the current data object for the solution
 * @param authentication credentials for the request
 *
 * @returns a promise that will resolve with response results
 */
export declare function _updateResources(solutionId: string, models: ISolutionModels, data: any, authentication: UserSession): Promise<any>;
