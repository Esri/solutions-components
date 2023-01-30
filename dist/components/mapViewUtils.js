/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { e as queryExtent } from './queryUtils.js';

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
/**
 * Gets the layer names from the current map
 *
 * @param mapView the map view to fetch the layer names from
 *
 * @returns Promise resolving with an array of layer names
 *
 */
async function getMapLayerNames(mapView) {
  let layerNames = [];
  await mapView.when(() => {
    layerNames = mapView.map.layers.toArray().map((l) => {
      return l.title;
    });
  });
  return layerNames;
}
/**
 * Get a layer view by title
 *
 * @param mapView the map view to fetch the layer from
 * @param title the title if the layer to fetch
 *
 * @returns Promise resolving with the fetched layer view
 *
 */
async function getMapLayerView(mapView, title) {
  const layer = await getMapLayer(mapView, title);
  return layer ? await mapView.whenLayerView(layer) : undefined;
}
/**
 * Get a layer by title
 *
 * @param mapView the map view to fetch the layer from
 * @param title the title if the layer to fetch
 *
 * @returns Promise resolving with the fetched layer
 *
 */
async function getMapLayer(mapView, title) {
  let layers = [];
  await mapView.when(() => {
    layers = mapView.map.layers.toArray().filter((l) => {
      return l.title === title;
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
async function highlightFeatures(ids, layerView, mapView, updateExtent = false) {
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
async function flashSelection(ids, layerView) {
  const featureFilter = {
    objectIds: ids
  };
  layerView.featureEffect = {
    filter: featureFilter,
    includedEffect: "invert(100%)",
    excludedEffect: "blur(5px)"
  };
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
async function goToSelection(ids, layerView, mapView, flashFeatures = true) {
  const result = await queryExtent(ids, layerView.layer);
  await mapView.goTo(result.extent);
  if (flashFeatures) {
    await flashSelection(ids, layerView);
  }
}

export { goToSelection as a, getMapLayerView as b, getMapLayerNames as g, highlightFeatures as h };
