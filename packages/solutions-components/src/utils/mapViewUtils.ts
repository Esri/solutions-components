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
import { EWorkflowType, IMapItemHash, ISelectionSet } from "./interfaces";

/**
 * Gets the layer names from the current map
 *
 * @param mapView the map view to fetch the layer names from
 * @param onlyShowUpdatableLayers when true only layers that support editing and updates will be returned
 *
 * @returns Promise resolving with an array of layer names
 *
 */
export async function getMapLayerHash(
  mapView: __esri.MapView,
  onlyShowUpdatableLayers: boolean
): Promise<IMapItemHash> {
  let layerHash;
  await mapView.when(() => {
    layerHash = mapView.map.allLayers.toArray().reduce((prev, cur) => {
      if (cur.type === "feature") {
        prev[cur.id] = {
          name: cur.title,
          supportsUpdate: undefined
        };
      }
      return prev;
    }, {});
  });
  return _getFinalHash(
    onlyShowUpdatableLayers,
    layerHash,
    mapView
  );
}

/**
 * Gets the table names from the current map
 *
 * @param mapView the map view to fetch the table names from
 * @param onlyShowUpdatableLayers when true only layers that support editing and updates will be returned
 *
 * @returns Promise resolving with an array of table names
 *
 */
export async function getMapTableHash(
  mapView: __esri.MapView,
  onlyShowUpdatableTables: boolean
): Promise<IMapItemHash> {
  let tableHash;
  await mapView.when(() => {
    tableHash = mapView.map.allTables.toArray().reduce((prev, cur) => {
      prev[cur.id] = {
        name: cur.title,
        supportsUpdate: undefined
      };
      return prev;
    }, {});
  });
  return _getFinalHash(
    onlyShowUpdatableTables,
    tableHash,
    mapView
  );
}

/**
 * Get the final hash
 *
 * @param onlyShowUpdatable boolean when true only layers that support editing and the update capability will be returned
 * @param hash IMapItemHash key: layer id, values: name, supportsUpdate
 * @param mapView the map view to fetch the layer from
 *
 * @returns Promise resolving with IMapItemHash
 *
 */
async function _getFinalHash(
  onlyShowUpdatable: boolean,
  hash: IMapItemHash,
  mapView: __esri.MapView
): Promise<IMapItemHash> {
  if (onlyShowUpdatable) {
    const editableHash = {};
    const keys = Object.keys(hash);
    for (let i = 0; i < keys.length; i++) {
      const id = keys[i];
      const layer = await getLayerOrTable(mapView, id);
      await layer.load();
      await layer.when();
      editableHash[id] = {
        name: hash[id].name,
        supportsUpdate: layer.editingEnabled && layer.capabilities.operations.supportsUpdate
      };
    }
    return editableHash;
  } else {
    return hash;
  }
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
export async function getFeatureLayerView(
  mapView: __esri.MapView,
  id: string
): Promise<__esri.FeatureLayerView> {
  const layer = await getLayerOrTable(mapView, id);
  return layer ? await mapView.whenLayerView(layer) : undefined;
}

/**
 * Get a layer or table by id
 *
 * @param mapView the map view to fetch the layer from
 * @param id the id of the layer or table to fetch
 *
 * @returns Promise resolving with the fetched layer or table
 *
 */
export async function getLayerOrTable(
  mapView: __esri.MapView,
  id: string
): Promise<__esri.FeatureLayer> {
  let layers = [];
  await mapView.when(() => {
    layers = [
      ...mapView.map.allLayers.toArray(),
      ...mapView.map.allTables.toArray()
    ].filter((l) => {
      return l.id === id;
    });
  });
  return layers.length > 0 ? layers[0] : undefined;
}

/**
 * Gets all of the layers from the current map when the map and their layerView is ready
 *
 * @param mapView the map view to fetch the layer names from
 *
 * @returns Promise resolving with an array of all layers
 *
 */
export async function getAllLayers(
  mapView: __esri.MapView
): Promise<__esri.Layer[]> {
  const layers = mapView.map.allLayers.toArray();
  let layerViewPromises;
  await mapView.when(() => {
    layerViewPromises = layers.map(l => mapView.whenLayerView(l));
  });
  await Promise.allSettled(layerViewPromises);
  return layers;
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
 */
export async function highlightFeatures(
  ids: number[],
  layerView: __esri.FeatureLayerView,
  mapView: __esri.MapView,
  updateExtent = false
): Promise<__esri.Handle> {
  if (updateExtent) {
    await goToSelection(ids, layerView, mapView, false);
  }
  return layerView.highlight(ids);
}

/**
 * Highlights features from all sets including the refine set
 *
 * @param selectionSets The selection sets to highlight
 *
 * @returns Promise resolving with the highlight handles
 *
 */
export async function highlightAllFeatures(
  selectionSets: ISelectionSet[]
): Promise<__esri.Handle[]> {

  const highlightInfos = getIdSets(selectionSets);

  return Object.keys(highlightInfos).reduce((prev, cur) => {
    const highlightInfo = highlightInfos[cur];
    prev.push(highlightInfo.layerView.highlight(highlightInfo.ids));
    return prev;
  }, []);
}

/**
 * Highlights features from all sets including the refine set
 *
 * @param selectionSets The selection sets to highlight
 *
 * @returns Promise resolving with the highlight handles
 *
 */
export function getIdSets(
  selectionSets: ISelectionSet[]
): any {
  return selectionSets.reduce((prev, cur) => {
    const lv = cur.layerView;
    const id = lv?.layer.id;
    if (id && Object.keys(prev).indexOf(id) > -1) {
      prev[id].ids = [...new Set([
        ...cur.selectedIds,
        ...prev[id].ids
      ])];
    } else if (id) {
      prev[id] = {
        layerView: lv,
        ids: cur.selectedIds
      }
    }
    if (cur.workflowType === EWorkflowType.REFINE) {
      Object.keys(cur.refineInfos).forEach(k => {
        const refineInfo = cur.refineInfos[k];
        if (Object.keys(prev).indexOf(k) > -1) {
          prev[k].ids = [...new Set([
            ...refineInfo.addIds,
            ...prev[k].ids
          ])];
          prev[k].ids = prev[k].ids.filter(_id => refineInfo.removeIds.indexOf(_id) < 0)
        }
      });
    }
    return prev;
  }, {});
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
export async function flashSelection(
  ids: number[],
  layerView: __esri.FeatureLayerView,
  featureEffect: __esri.FeatureEffect
): Promise<void> {
  const filter = {
    objectIds: ids
  } as __esri.FeatureFilter;
  layerView.featureEffect = {
    ...featureEffect,
    filter
  } as __esri.FeatureEffect;

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
export async function goToSelection(
  ids: number[],
  layerView: __esri.FeatureLayerView,
  mapView: __esri.MapView,
  flashFeatures = true,
  featureEffect: __esri.FeatureEffect = undefined
): Promise<void> {
  const result = await queryExtent(ids, layerView.layer);
  await mapView.goTo(result.extent);
  if (flashFeatures) {
    await flashSelection(ids, layerView, featureEffect);
  }
}
