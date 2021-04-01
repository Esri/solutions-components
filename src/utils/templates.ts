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

//TODO need to do some filtering
// items that are dependencies should not be shown as top level items

export function getInventoryItems(
  templates: any[]
): IInventoryItem[] {
  return templates.map(t => _getItemFromTemplate(t, templates));
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
      itemDetails: _getItemDetails(t.item, t.type === "Group"),
      isResource: false, // TODO this should be removed and determined from the data
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
  isGroup: boolean
): IItemDetails {
  return {
    thumbnail: item.thumbnail || "",
    title: item.title || "",
    snippet: item.snippet || "",
    description: item.description || "",
    tags: item.tags || [],
    credits: !isGroup ? item.accessInformation || "" : "",
    termsOfUse: !isGroup ? item.licenseInfo || "" : ""
  };
}
