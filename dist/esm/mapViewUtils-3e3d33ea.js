/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { a as EWorkflowType } from './interfaces-659e3836.js';

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
 * Query the layer for all OIDs valid for any definition expressions applied to the layer.
 *
 * This query allows OIDs to be returned in the same order as shown in the FeatureTable.
 * FeatureLayer.queryObjectIds can return OIDs in a different order.
 *
 * @param start zero-based index indicating where to begin retrieving features
 * @param layer the layer to retrieve features from
 * @param graphics stores the features
 * @param orderBy One or more field names used to order the query results.
 *                Specify ASC (ascending) or DESC (descending) after the field name to control the order.
 *                The default order is ASC.
 *
 * @returns Promise with the OIDs sorted based on any orderBy definitions
 */
async function queryAllOidsWithQueryFeatures(start, layer, graphics, orderBy) {
    const num = layer.capabilities.query.maxRecordCount;
    const query = layer.createQuery();
    query.start = start;
    query.num = num;
    query.returnGeometry = false;
    query.orderByFields = orderBy;
    query.outFields = [layer.objectIdField];
    query.where = layer.definitionExpression || "1=1";
    const result = await layer.queryFeatures(query);
    graphics = graphics.concat(result.features);
    return result.exceededTransferLimit ?
        queryAllOidsWithQueryFeatures(start += num, layer, graphics, orderBy) :
        Promise.resolve(graphics.map(g => g.attributes[layer.objectIdField]));
}
/**
 * Query the layer for all IDs
 *
 * @param layer the layer to retrieve features from
 *
 * @returns Promise with the featureSet from the layer that match the provided ids
 */
async function queryAllIds(layer) {
    const query = layer.createQuery();
    query.where = layer.definitionExpression || "1=1";
    return await layer.queryObjectIds(query);
}
/**
 * Query the layer for OIDs based on any user drawn geometries or buffers
 *
 * @param geometries Array of geometries used for the selection of ids from the layer
 * @param layer the layer to retrieve ids from
 *
 * @returns Promise with the OIDs of features from the layer that interset the provided geometries
 */
async function queryObjectIds(geometries, layer) {
    let ids = [];
    const queryDefs = geometries ? geometries.map(g => _intersectQuery(g, layer)) : [Promise.resolve()];
    const results = await Promise.all(queryDefs);
    results.forEach(resultIds => {
        ids = [
            ...ids,
            ...resultIds || []
        ];
    });
    return ids;
}
/**
 * Query the layer for features that have the provided OIDs
 * If no ids are provided all features will be returned
 *
 * @param ids array of ObjectIDs to be used to query for features in a layer
 * @param layer the layer to retrieve features from
 * @param graphics the result graphics array
 *
 * @returns Promise with the featureSet from the layer that match the provided ids
 */
async function queryFeaturesByID(ids, layer, graphics, returnGeometry, outSpatialReference, fields) {
    const num = layer.capabilities?.query.maxRecordCount;
    const start = 0;
    if (ids.length === 0) {
        ids = await layer.queryObjectIds();
    }
    const q = layer.createQuery();
    q.returnGeometry = returnGeometry;
    q.objectIds = ids.slice(start, num);
    if (outSpatialReference) {
        q.outSpatialReference = outSpatialReference;
    }
    if (fields) {
        q.outFields = fields;
    }
    const result = await layer.queryFeatures(q);
    graphics = graphics.concat(result.features);
    const remainingIds = ids.slice(num, ids.length);
    return remainingIds.length > 0 ?
        queryFeaturesByID(remainingIds, layer, graphics, returnGeometry, outSpatialReference, fields) :
        Promise.resolve(graphics);
}
/**
 * Query the layer for features that have the provided globalId
 *
 * @param globalId globalId to be used to query for a feature in a layer
 * @param layer the layer to retrieve features from
 *
 * @returns Promise with the featureSet from the layer that match the provided globalId
 */
async function queryFeaturesByGlobalID(globalIds, layer) {
    const globalIdField = layer.globalIdField;
    if (!globalIdField) {
        return [];
    }
    const q = layer.createQuery();
    q.returnGeometry = false;
    q.outFields = [layer.objectIdField];
    q.where = globalIds.map(g => `${globalIdField} = '${g}'`).join(" or ");
    const result = await layer.queryFeatures(q);
    return result.features;
}
/**
 * Query the layer for features that intersect the provided geometry
 *
 * @param start zero-based index indicating where to begin retrieving features
 * @param layer the layer to retrieve features from
 * @param geometry the geometry to apply to the spatial filter
 * @param featuresCollection
 *
 * @returns Promise with the featureSet from the layer that match the provided ids
 */
async function queryFeaturesByGeometry(start, layer, geometry, featuresCollection) {
    const num = layer.capabilities.query.maxRecordCount;
    const query = layer.createQuery();
    query.start = start;
    query.num = num;
    query.geometry = geometry;
    const result = await layer.queryFeatures(query);
    featuresCollection[layer.id] = featuresCollection[layer.id].concat(result.features);
    return result.exceededTransferLimit ?
        queryFeaturesByGeometry(start += num, layer, geometry, featuresCollection) :
        Promise.resolve(featuresCollection);
}
/**
 * Query the layer for the extent of features with the provided OIDs
 *
 * @param ids array of ObjectIDs to be used to query for features in a layer
 * @param layer the layer to query
 *
 * @returns Promise with the Extent of all features that match the provided ids
 */
async function queryExtent(ids, layer) {
    const query = layer.createQuery();
    query.objectIds = ids;
    return layer.queryExtent(query);
}
/**
 * Union geometries based on geometry type
 *
 * @param geometries Array of geometries to union
 * @param geometryEngine the geometry engine instance to perform the unions
 *
 * @returns Array of single unioned geometry for each geometry type
 */
function getQueryGeoms(geometries, geometryEngine) {
    // sort and union by geom type so we have a single geom for each type to query with
    return [
        ..._unionGeoms(geometries, "polygon", geometryEngine),
        ..._unionGeoms(geometries, "polyline", geometryEngine),
        ..._unionGeoms(geometries, "point", geometryEngine)
    ];
}
/**
 * Union geometries based on geometry type
 *
 * @param geometries array of geometries to union
 * @param type the current geometry type to union
 * @param geometryEngine the geometry engine instance to perform the unions
 *
 * @returns Array of single unioned geometry for the provided geometry type
 */
function _unionGeoms(geometries, type, geometryEngine) {
    const geoms = geometries?.filter(g => g.type === type) || [];
    return geoms.length <= 1 ? geoms : [geometryEngine.union(geoms)];
}
/**
 * Query the layer for ObjectIds of features that intersect the provided geometry
 *
 * @param geometry Geometry used for the selection of ids from the select layer view
 * @param layer the layer to query
 *
 * @returns Promise that will contain the selected ids
 */
async function _intersectQuery(geometry, layer) {
    const q = layer.createQuery();
    q.spatialRelationship = "intersects";
    q.geometry = geometry;
    return layer.queryObjectIds(q);
}

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

export { getAllLayers as a, getAllTables as b, getFeatureLayerView as c, getMapLayerHash as d, goToSelection as e, queryAllIds as f, getLayerOrTable as g, highlightFeatures as h, queryAllOidsWithQueryFeatures as i, queryFeaturesByGlobalID as j, queryObjectIds as k, getQueryGeoms as l, queryFeaturesByGeometry as m, getIdSets as n, highlightAllFeatures as o, getMapTableHash as p, queryFeaturesByID as q };
