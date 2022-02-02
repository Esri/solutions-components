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
  UserSession
} from "@esri/solution-common";
import { IResponse, ISolutionModel } from "./interfaces";
import { IItemResourceOptions, updateItemResource } from "@esri/arcgis-rest-portal";

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
  id: string,
  data: any,
  models: any,
  authentication: UserSession,
  translations: any,
  thumbnailurl: any,
): Promise<IResponse> {

  const params: any = {
    text: data
  };

  if (thumbnailurl) {
    params.thumbnail = thumbnailurl;
  }

  const updateResults = { success: true }

  await _updateThumbnailResources(id, models, authentication);

  return Promise.resolve({
    success: updateResults.success,
    message: updateResults.success ? translations.editsSaved : translations.saveFailed
  });
}

export async function _updateThumbnailResources(
  solutionId: string,
  models: any,
  authentication: UserSession
): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const promises = [];
    Object.keys(models).forEach(itemId => {
      const model: ISolutionModel = models[itemId];
      if (model.thumbnailNew) {
        const name: string = model.thumbnailOrigin.name;

        const opts: IItemResourceOptions = {
          id: solutionId,
          authentication,
          resource: model.thumbnailNew,
          name
        };

        const resources = model.resources.filter(r => r.endsWith(name));
        if (resources.length === 1) {
          const nameParts = resources[0].split("/");
          if (nameParts.length === 2) {
            opts.prefix = nameParts[0];
          }
        }
        promises.push(updateItemResource(opts))
      }
    });

    Promise.all(promises).then(results => {
      resolve(results);
    }, reject);
  })
}
