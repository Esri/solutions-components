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

/*
 | Helper functions used in multiple components for public notification
*/

import { ISelectionSet } from "./interfaces";

export function getSelectionIds(
  selectionSets: ISelectionSet[]
): number[] {
  return Object.keys(selectionSets).reduce((prev, cur) => {
    return [
      ...prev,
      ...selectionSets[cur].download ? selectionSets[cur].selectedIds : []
    ]
  }, []);
}

export function getSelectionIdsAndViews(
  selectionSets: ISelectionSet[]
): any {
  return selectionSets.reduce((prev, cur) => {
    if (Object.keys(prev).indexOf(cur.layerView.layer.id) > -1) {
      prev[cur.layerView.layer.id].ids = [
        ...prev[cur.layerView.layer.id].ids,
        ...cur.selectedIds
      ];
      prev[cur.layerView.layer.id].selectionSetNames.push(cur.label)
    } else {
      prev[cur.layerView.layer.id] = {
        ids: cur.selectedIds,
        layerView: cur.layerView,
        selectionSetNames: [cur.label]
      }
    }
    return prev;
  }, {});
}

export function getTotal(
  selectionSets: ISelectionSet[]
): number {
  return [...new Set(getSelectionIds(selectionSets))].length;
}
