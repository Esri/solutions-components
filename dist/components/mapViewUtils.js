/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { a as queryExtent } from './queryUtils.js';
import { E as EWorkflowType } from './interfaces.js';

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
 * @param onlyShowUpdatableLayers when true only layers that support editing and updates will be returned
 *
 * @returns Promise resolving with an array of layer names
 *
 */
async function getMapLayerHash(mapView, onlyShowUpdatableLayers) {
    let layerHash;
    await mapView.when(() => {
        layerHash = mapView.map.allLayers.toArray().reduce((prev, cur) => {
            if (cur.type === "feature" || cur?.type === "subtype-group") {
                prev[cur.id] = {
                    name: cur.title,
                    supportsUpdate: undefined
                };
            }
            return prev;
        }, {});
    });
    return _getFinalHash(onlyShowUpdatableLayers, layerHash, mapView);
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
async function getMapTableHash(mapView, onlyShowUpdatableTables) {
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
    return _getFinalHash(onlyShowUpdatableTables, tableHash, mapView);
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
async function _getFinalHash(onlyShowUpdatable, hash, mapView) {
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
    }
    else {
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
async function getFeatureLayerView(mapView, id) {
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
async function getLayerOrTable(mapView, id) {
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
async function getAllLayers(mapView) {
    const layers = mapView.map.allLayers.toArray();
    let layerViewPromises;
    await mapView.when(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        layerViewPromises = layers.map(l => mapView.whenLayerView(l));
    });
    await Promise.allSettled(layerViewPromises);
    return layers;
}
/**
 * Get all of the tables from the current map when the map and their layerView is ready
 * @param mapView the map view to fetch the table names from
 * @returns Promise resolving with an array of all tables
 *
 */
async function getAllTables(mapView) {
    const tables = mapView.map.allTables.toArray();
    let layerViewPromises;
    await mapView.when(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        layerViewPromises = tables.map(t => t.load());
    });
    await Promise.allSettled(layerViewPromises);
    return tables;
}
/**
 * Highlight features by OID
 *
 * @param ids the OIDs from the layer to highlight
 * @param layerView the layer view to highlight
 * @param mapView the map view used if updateExtent is true
 * @param updateExtent optional (default false) boolean to indicate if we should zoom to the extent
 * @param zoomToScale optional (default 0) zoomScale that individual points will use when zoomed to
 *
 * @returns Promise resolving with the highlight handle
 */
async function highlightFeatures(ids, layerView, mapView, updateExtent = false, zoomToScale = 0) {
    if (updateExtent) {
        await goToSelection(ids, layerView, mapView, false, undefined, zoomToScale);
        //wait for sometime to load the feature in layerView then only the highlight will work
        await new Promise(resolve => setTimeout(resolve, 1000));
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
async function highlightAllFeatures(selectionSets) {
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
function getIdSets(selectionSets) {
    return selectionSets.reduce((prev, cur) => {
        const lv = cur.layerView;
        const id = lv?.layer.id;
        if (id && Object.keys(prev).indexOf(id) > -1) {
            prev[id].ids = [...new Set([
                    ...cur.selectedIds,
                    ...prev[id].ids
                ])];
        }
        else if (id) {
            prev[id] = {
                layerView: lv,
                ids: cur.selectedIds
            };
        }
        if (cur.workflowType === EWorkflowType.REFINE) {
            Object.keys(cur.refineInfos).forEach(k => {
                const refineInfo = cur.refineInfos[k];
                if (Object.keys(prev).indexOf(k) > -1) {
                    prev[k].ids = [...new Set([
                            ...refineInfo.addIds,
                            ...prev[k].ids
                        ])];
                    prev[k].ids = prev[k].ids.filter(_id => refineInfo.removeIds.indexOf(_id) < 0);
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
async function flashSelection(ids, layerView, featureEffect) {
    const filter = {
        objectIds: ids
    };
    layerView.featureEffect = {
        ...featureEffect,
        filter
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
 * @param featureEffect optional (default undefined) feature effect when flashing the features
 * @param zoomToScale optional (default to 0) zoomScale that individual points will use when zoomed to
 * @returns Promise resolving when the operation is complete
 *
 */
async function goToSelection(ids, layerView, mapView, flashFeatures = true, featureEffect = undefined, zoomToScale = 0) {
    const result = await queryExtent(ids, layerView.layer);
    const goToParams = { target: result.extent };
    if (result.count === 1 && layerView.layer.geometryType === 'point' && zoomToScale) {
        goToParams.scale = zoomToScale;
    }
    await mapView.goTo(goToParams);
    if (flashFeatures) {
        await flashSelection(ids, layerView, featureEffect);
    }
}

export { getAllLayers as a, goToSelection as b, getFeatureLayerView as c, getMapLayerHash as d, getMapTableHash as e, getAllTables as f, getLayerOrTable as g, highlightFeatures as h, getIdSets as i, highlightAllFeatures as j };
