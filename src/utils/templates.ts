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
 | Helper functions to get required values from solutions templates
*/

import { IItemDetails } from "../components/solution-item-details/solution-item-details";
import { IInventoryItem } from "../components/solution-contents/solution-contents";

export interface ISolutionModel {
  dataModel: monaco.editor.ITextModel;
  dataOriginValue: string;
  propsModel: monaco.editor.ITextModel;
  propsOriginValue: string;
  propsDiffOriginValue: string;
  state: any;
  isEditing: boolean;
  itemId: string;
  updateItemValues: any;
  originalItemValues: any;
  name: string;
  title: string;
  itemOriginValue: string;
  spatialReference: any;
}

interface ISolutionModels {
  [key: string]: ISolutionModel;
} 

export function getInventoryItems(
  templates: any[]
): IInventoryItem[] {
  const topLevelItemIds = _getTopLevelItemIds(templates);
  return templates.reduce((prev, cur) => {
    if (topLevelItemIds.indexOf(cur.itemId) > -1) {
      prev.push(_getItemFromTemplate(cur, templates))
    }
    return prev;
  }, []);
}

export function getModels(templates: any[]): ISolutionModels {
  const ids: string[] = [];
  const models: ISolutionModels = {};
  const monacoDefined = typeof(monaco) !== "undefined";
  templates.forEach(t => {
    if (ids.indexOf(t.itemId) < 0) {
      ids.push(t.itemId);
      models[t.itemId] = {
        dataModel: monacoDefined ? monaco.editor.createModel(JSON.stringify(t.data, null, '\t'), "json") : undefined,
        dataOriginValue: JSON.stringify(t.data),
        propsModel: monacoDefined ? monaco.editor.createModel(JSON.stringify(t.properties, null, '\t'), "json") : undefined,
        propsOriginValue: JSON.stringify(t.properties),
        propsDiffOriginValue: JSON.stringify(t.properties),
        state: undefined,
        isEditing: false,
        itemId: t.itemId,
        updateItemValues: {},
        originalItemValues: {},
        name: t.item?.name,
        title: t.item?.title,
        itemOriginValue: JSON.stringify(t.item),
        spatialReference: t.properties?.service?.spatialReference
      };
    }
  });
  return models;
}

export function getFeatureServices(
  templates: any[]
): any[] {
  return templates.reduce((prev, cur) => {
    const name: string = cur.item.title || cur.item.name;
    if (cur.type === "Feature Service" &&
      cur.item.typeKeywords.indexOf("View Service") < 0 &&
      prev.indexOf(name) < 0
    ) {
      prev.push(name)
    }
    return prev;
  }, []);
}

export function getSpatialReferenceInfo(
  services: string[]
): any {
  const defaultServices: any = {};
  services.forEach(service => {
    defaultServices[service] = true;
  });
  return {
    enabled: false,
    services: defaultServices,
    spatialReference: undefined
  }
}

function _getItemFromTemplate(
  t: any,
  templates: any[]
): IInventoryItem {
  return {
    id: t.itemId || "",
    title: t.item.title || "",
    dependencies: _getDependencies(t.dependencies || [], templates),
    type: t.item.type || "",
    typeKeywords: t.item.typeKeywords || [],
    solutionItem: {
      itemId: t.itemId,
      itemDetails: _getItemDetails(t.item, t.type === "Group", t.itemId),
      isResource: _getIsResource(t),
      data: t.data,
      properties: t.properties,
      type: t.type
    }
  };
}

function _getDependencies(
  dependencies: string[],
  templates: any[]
): IInventoryItem[] {
  return templates.reduce((prev, curr) => {
    if (dependencies.indexOf(curr.itemId) > -1) {
      prev.push(_getItemFromTemplate(curr, templates))
    }
    return prev;
  }, []);
}

function _getItemDetails(
  item: any,
  isGroup: boolean,
  itemId: string
): IItemDetails {
  return {
    itemId,
    thumbnail: item.thumbnail || "",
    title: item.title || "",
    snippet: item.snippet || "",
    description: item.description || "",
    tags: item.tags || [],
    accessInformation: !isGroup ? item.accessInformation || "" : "",
    licenseInfo: !isGroup ? item.licenseInfo || "" : ""
  };
}

function _getIsResource(
  template: any
): boolean {
  return template.type !== "Group" && JSON.stringify(template.data) === "{}";
}

function _getTopLevelItemIds(templates: any[]) {
  // Find the top-level nodes. Start with all nodes, then remove those that other nodes depend on
  const topLevelItemCandidateIds = templates.map((template) => template.itemId);
  templates.forEach((template) => {
    (template.dependencies || []).forEach((dependencyId) => {
      const iNode = topLevelItemCandidateIds.indexOf(dependencyId);
      if (iNode >= 0) {
        // Node is somebody's dependency, so remove the node from the list of top-level nodes
        // If iNode == -1, then it's a shared dependency and it has already been removed
        topLevelItemCandidateIds.splice(iNode, 1);
      }
    });
  });
  return topLevelItemCandidateIds;
}
