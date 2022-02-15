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
  convertItemResourceToStorageResource,
  IItemUpdate,
  updateItem,
  UserSession,
  SolutionTemplateFormatVersion
} from "@esri/solution-common";
import { EUpdateType, IResourcePath, IResponse, ISolutionModel, ISolutionModels } from "./interfaces";
// May add to solution-common..??
import {
  addItemResource,
  IItemResourceOptions,
  removeItemResource,
  updateItemResource
} from "@esri/arcgis-rest-portal";

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
  models: ISolutionModels,
  authentication: UserSession,
  translations: any
): Promise<IResponse> {

  const itemInfo: IItemUpdate = { id };

  const params: any = {
    text: data
  };

  await _updateResources(id, models, data, authentication);

  // TODO compare data with the source data in the model...should be able to
  // understand if it has changes
  // TODO...only update if has changes
  const updateResults = await updateItem(
    itemInfo,
    authentication,
    undefined,
    params
  );

  return Promise.resolve({
    success: updateResults.success,
    message: updateResults.success ? translations.editsSaved : translations.saveFailed
  });
}

export async function _updateResources(
  solutionId: string,
  models: ISolutionModels,
  data: any,
  authentication: UserSession
): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const promises = [Promise.resolve()];
    Object.keys(models).forEach(itemId => {
      const model: ISolutionModel = models[itemId];
      _updateThumbnailResources(
        solutionId,
        model,
        promises,
        authentication
      );
      _updateFileResources(
        solutionId,
        model,
        data,
        promises,
        authentication
      );
    });

    Promise.all(promises).then(resolve, reject);
  })
}

function _updateThumbnailResources(
  solutionId: string,
  model: ISolutionModel,
  promises: Promise<any>[],
  authentication: UserSession
): void {
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
    promises.push(updateItemResource(opts));
  }
}

function _updateFileResources(
  solutionId: string,
  model: ISolutionModel,
  data: any,
  promises: Promise<any>[],
  authentication: UserSession
): void {
  // add/remove/update resources
  model.resourceFilePaths.forEach(resourceFilePath => {
    switch (resourceFilePath.updateType) {
      case EUpdateType.Add:
        promises.push(_add(
          solutionId,
          model,
          data,
          resourceFilePath,
          authentication
        ));
        break;

      case EUpdateType.Remove:
        promises.push(_remove(
          solutionId,
          model,
          data,
          resourceFilePath,
          authentication
        ));
        break;

      case EUpdateType.Update:
        promises.push(_update(
          solutionId,
          model,
          data,
          resourceFilePath,
          authentication
        ));
        break;

      default:
        break;
    }
  });
}

function _updateDataResources(
  data: any,
  id: string,
  updateType: EUpdateType,
  path: string,
  sourceFileName: string
): void {
  data.templates = data.templates.map(t => {
    if (t.itemId === id) {
      switch (updateType) {
        case EUpdateType.Add:
          t.resources.push(path);
          break;
        case EUpdateType.Update:
          // for update the filename may need to be changed to match...
          // otherwise we may need to do an remove/add
          // t.resources = t.resources.filter(r => r.indexOf(sourceFileName) < 0);
          // t.resources.push(path);
          console.log(sourceFileName)
          break;
        case EUpdateType.Remove:
          t.resources = t.resources.filter(r => r.indexOf(path) < 0);
          break;
        default:
          break;
      }
    }
    return t;
  })
}

function _add(
  solutionId: string,
  model: ISolutionModel,
  data: any,
  resourceFilePath: IResourcePath,
  authentication: UserSession
): Promise<any> {
  const storageName = convertItemResourceToStorageResource(
    model.itemId +
    ((resourceFilePath.blob as File).name === resourceFilePath.filename
      ? "_info_data"
      : "_info_dataz"),
    (resourceFilePath.blob as File).name,
    SolutionTemplateFormatVersion
  );

  const opts: IItemResourceOptions = {
    id: solutionId,
    authentication,
    resource: resourceFilePath.blob,
    name: storageName.filename,
    params: {}
  };

  if (storageName.folder) {
    opts.params = {
      resourcesPrefix: storageName.folder
    };
  }

  // set the tempate resources to match what we will add
  _updateDataResources(
    data,
    model.itemId,
    EUpdateType.Add,
    opts.params?.resourcesPrefix ? `${opts.params.resourcesPrefix}/${opts.name}` : opts.name,
    ""
  );

  return addItemResource(opts);
}

function _update(
  solutionId: string,
  model: ISolutionModel,
  data: any,
  resourceFilePath: IResourcePath,
  authentication: UserSession
): Promise<any> {
  const name: string = resourceFilePath.sourceFileName;

  const opts: IItemResourceOptions = {
    id: solutionId,
    authentication,
    resource: resourceFilePath.blob,
    name
  };

  const resources = model.resources.filter(r => r.endsWith(name));
  if (resources.length === 1) {
    const nameParts = resources[0].split("/");
    if (nameParts.length === 2) {
      opts.prefix = nameParts[0];
    }
  }

  // set the tempate resources to match what we will add
  _updateDataResources(
    data,
    model.itemId,
    EUpdateType.Update,
    `${opts.prefix}/${name}`,
    ""
  );

  return updateItemResource(opts);
}

function _remove(
  solutionId: string,
  model: ISolutionModel,
  data: any,
  resourceFilePath: IResourcePath,
  authentication: UserSession
): Promise<any> {
  const name: string = resourceFilePath.filename;
  const resources = model.resources.filter(r => r.endsWith(name));

  // set the tempate resources to match what we will add
  _updateDataResources(
    data,
    model.itemId,
    EUpdateType.Remove,
    resources[0],
    ""
  );

  const opts: IItemResourceOptions = {
    id: solutionId,
    authentication,
    resource: resources[0]
  };

  return removeItemResource(opts);
}
