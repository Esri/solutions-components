/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
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
import { queryExtent } from "./queryUtils";
/**
 * Gets the layer names from the current map
 *
 * @param mapView the map view to fetch the layer names from
 *
 * @returns Promise resolving with an array of layer names
 *
 */
export async function getMapLayerHash(mapView) {
  let layerHash = {};
  await mapView.when(() => {
    layerHash = mapView.map.layers.toArray().reduce((prev, cur) => {
      prev[cur.id] = cur.title;
      return prev;
    }, {});
  });
  return layerHash;
}
/**
 * Gets the layer names from the current map
 *
 * @param mapView the map view to fetch the layer names from
 *
 * @returns Promise resolving with an array of layer names
 *
 */
export async function getMapLayerIds(mapView) {
  let layerIds = [];
  await mapView.when(() => {
    layerIds = mapView.map.layers.toArray().map((l) => {
      return l.id;
    });
  });
  return layerIds;
}
/**
 * Get a layer view by id
 *
 * @param mapView the map view to fetch the layer from
 * @param id the id if the layer to fetch
 *
 * @returns Promise resolving with the fetched layer view
 *
 */
export async function getMapLayerView(mapView, id) {
  const layer = await getMapLayer(mapView, id);
  return layer ? await mapView.whenLayerView(layer) : undefined;
}
/**
 * Get a layer by id
 *
 * @param mapView the map view to fetch the layer from
 * @param id the id if the layer to fetch
 *
 * @returns Promise resolving with the fetched layer
 *
 */
export async function getMapLayer(mapView, id) {
  let layers = [];
  await mapView.when(() => {
    layers = mapView.map.layers.toArray().filter((l) => {
      return l.id === id;
    });
  });
  return layers.length > 0 ? layers[0] : undefined;
}
/**
 * Highlight features by OID
 *
 * @param ids the OIDs from the layer to highlight
 * @param layerView the layer view to highlight
 * @param mapView the map view used if updateExtent is true
 * @param updateExtent optional (default false) boolean to indicate if we should zoom to the extent
 *
 * @returns Promise resolving with the highlight handle
 *
 */
export async function highlightFeatures(ids, layerView, mapView, updateExtent = false) {
  if (updateExtent) {
    await goToSelection(ids, layerView, mapView, false);
  }
  return layerView.highlight(ids);
}
/**
 * Flash features by OID
 *
 * @param ids the OIDs from the layer to highlight
 * @param layerView the layer view to highlight
 *
 * @returns Promise resolving when the operation is complete
 *
 */
export async function flashSelection(ids, layerView, featureEffect) {
  const filter = {
    objectIds: ids
  };
  layerView.featureEffect = Object.assign(Object.assign({}, featureEffect), { filter });
  setTimeout(() => {
    layerView.featureEffect = undefined;
  }, 1300);
}
/**
 * Zoom to features based on OID
 *
 * @param ids the OIDs from the layer to go to
 * @param layerView the layer view that contains the OIDs
 * @param mapView the map view to show the extent change
 * @param flashFeatures optional (default true) boolean to indicate if we should flash the features
 *
 * @returns Promise resolving when the operation is complete
 *
 */
export async function goToSelection(ids, layerView, mapView, flashFeatures = true, featureEffect = undefined) {
  const result = await queryExtent(ids, layerView.layer);
  await mapView.goTo(result.extent);
  if (flashFeatures) {
    await flashSelection(ids, layerView, featureEffect);
  }
}
//# sourceMappingURL=mapViewUtils.js.map
