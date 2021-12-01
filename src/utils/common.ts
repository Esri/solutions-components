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

/*
 | Helper functions from solutions-common
*/

import {
  IItemUpdate,
  UserSession,
  updateItem,
  getProp as commonGetProp,
  getProps as commonGetProps,
  setCreateProp as commonSetCreateProps,
  setProp as commonSetProp
} from "@esri/solution-common";
import { getItemData as portalGetItemData } from "@esri/arcgis-rest-portal";
import { IResponse } from "./interfaces";

/**
 * Gets a property out of a deeply nested object.
 * Does not handle anything but nested object graph
 *
 * @param obj Object to retrieve value from
 * @param path Path into an object, e.g., "data.values.webmap", where "data" is a top-level property
 *             in obj
 * @return Value at end of path
 */
 export function getProp(obj: { [index: string]: any }, path: string): any {
  return commonGetProp(obj, path);
}

/**
 * Returns an array of values from an object based on an array of property paths.
 *
 * @param obj Object to retrieve values from
 * @param props Array of paths into the object e.g., "data.values.webmap", where "data" is a top-level property
 * @return Array of the values plucked from the object; only defined values are returned
 */
export function getProps(obj: any, props: string[]): any {
  return commonGetProps(obj, props);
}

/**
 * Sets a deeply nested property of an object.
 * Creates the full path if it does not exist.
 *
 * @param obj Object to set value of
 * @param path Path into an object, e.g., "data.values.webmap", where "data" is a top-level property in obj
 * @param value The value to set at the end of the path
 */
export function setCreateProp(obj: any, path: string, value: any): void {
  commonSetCreateProps(obj, path, value);
}

/**
 * Sets a deeply nested property of an object.
 * Does nothing if the full path does not exist.
 *
 * @param obj Object to set value of
 * @param path Path into an object, e.g., "data.values.webmap", where "data" is a top-level property in obj
 * @param value The value to set at the end of the path
 */
export function setProp(obj: any, path: string, value: any): void {
  commonSetProp(obj, path, value);
}

/**
 * Get an array from a list of nodes
 *
 * @param nodeList list of nodes 
 */
export function nodeListToArray<T extends Element>(nodeList: HTMLCollectionOf<T> | NodeListOf<T> | T[]): T[] {
  return Array.isArray(nodeList) ? nodeList : Array.from(nodeList);
}

/**
 * Gets the items data
 *
 * @param id for the item being requested
 * @param authentication credentials for the request
 */
export async function getItemData(
  id: string,
  authentication: UserSession
) {
  return await portalGetItemData(id, {
    authentication
  });
}

/**
 * Saves any updated templates to the current solution item
 *
 * @param templates the updated templates array
 * @param thumbnailurl url for the items thumbnail
 * @param id for the solution item
 * @param data the current solution items data
 * @param authentication credentials for the request
 * @param translations translated strings for messages
 */
export async function save(
  templates: any[],
  thumbnailurl: any,
  id: string,
  data: any,
  authentication: UserSession,
  translations: any
) {
  // need to update the solution item with the new templates array
  data.templates = templates;

  const itemInfo: IItemUpdate = { id };

  const params: any = {
    text: data
  };

  if (thumbnailurl) {
    params.thumbnail = thumbnailurl;
  }

  const updateResults = await updateItem(
    itemInfo,
    authentication,
    undefined,
    params
  );

  return {
    success: updateResults.success,
    message: updateResults.success ? translations.editsSaved : translations.saveFailed
  } as IResponse;
}
