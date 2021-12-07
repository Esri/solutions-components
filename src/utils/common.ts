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
  updateItem
} from "@esri/solution-common";
import { IResponse } from "./interfaces";

/**
 * Get an array from a list of nodes
 *
 * @param nodeList list of nodes 
 */
 export function nodeListToArray<T extends Element>(nodeList: HTMLCollectionOf<T> | NodeListOf<T> | T[]): T[] {
  return Array.isArray(nodeList) ? nodeList : Array.from(nodeList);
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
