/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const interfaces = require('./interfaces-17c631bf.js');

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
 * Query the layer for all features
 *
 * @param start zero-based index indicating where to begin retrieving features
 * @param layer the layer to retrieve features from
 * @param graphics stores the features
 *
 * @returns Promise with the featureSet from the layer that match the provided ids
 */
async function queryAllFeatures(start, layer, graphics) {
  const num = layer.capabilities.query.maxRecordCount;
  const query = {
    start,
    num,
    outFields: ["*"],
    // TODO think through this more...does this make sense
    // may be better to fetch when checkbox is clicked...
    returnGeometry: true,
    where: "1=1"
  };
  const result = await layer.queryFeatures(query);
  graphics = graphics.concat(result.features);
  return result.exceededTransferLimit ?
    queryAllFeatures(start += num, layer, graphics) :
    Promise.resolve(graphics);
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
  const queryDefs = geometries.map(g => _intersectQuery(g, layer));
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
 *
 * @param ids array of ObjectIDs to be used to query for features in a layer
 * @param layer the layer to retrieve features from
 *
 * @returns Promise with the featureSet from the layer that match the provided ids
 */
async function queryFeaturesByID(ids, layer) {
  const q = layer.createQuery();
  q.outFields = ["*"];
  q.objectIds = ids;
  return layer.queryFeatures(q);
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
  const query = {
    start,
    num,
    outFields: ["*"],
    returnGeometry: true,
    geometry
  };
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
 * Get the appropriate ObjectIds query for the provided selection set
 *
 * @param selectionSet the current selection set to fetch the query for
 * @param geometryEngine the geometry engine instance to perform the union of the user drawn graphics or buffers
 *
 * @returns A promise that will resolve with ids that intersect the selection sets geometries
 */
function getSelectionSetQuery(selectionSet, geometryEngine) {
  let q = Promise.resolve([]);
  if (selectionSet.workflowType !== interfaces.EWorkflowType.REFINE) {
    if (!selectionSet.buffer) {
      const queryGeoms = getQueryGeoms(selectionSet.geometries, geometryEngine);
      q = queryObjectIds(queryGeoms, selectionSet.layerView.layer);
    }
    else {
      // buffer is a single unioned geom
      q = queryObjectIds([selectionSet.buffer], selectionSet.layerView.layer);
    }
  }
  return q;
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
  const geoms = geometries.filter(g => g.type === type);
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
 *
 * @returns Promise resolving with an array of layer names
 *
 */
async function getMapLayerHash(mapView) {
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
async function getMapLayerIds(mapView) {
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
async function getMapLayerView(mapView, id) {
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
async function getMapLayer(mapView, id) {
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
async function flashSelection(ids, layerView, featureEffect) {
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
async function goToSelection(ids, layerView, mapView, flashFeatures = true, featureEffect = undefined) {
  const result = await queryExtent(ids, layerView.layer);
  await mapView.goTo(result.extent);
  if (flashFeatures) {
    await flashSelection(ids, layerView, featureEffect);
  }
}

exports.getMapLayerHash = getMapLayerHash;
exports.getMapLayerIds = getMapLayerIds;
exports.getMapLayerView = getMapLayerView;
exports.getQueryGeoms = getQueryGeoms;
exports.getSelectionSetQuery = getSelectionSetQuery;
exports.goToSelection = goToSelection;
exports.highlightFeatures = highlightFeatures;
exports.queryAllFeatures = queryAllFeatures;
exports.queryFeaturesByGeometry = queryFeaturesByGeometry;
exports.queryFeaturesByID = queryFeaturesByID;
exports.queryObjectIds = queryObjectIds;
