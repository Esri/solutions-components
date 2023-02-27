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
import { EWorkflowType } from "./interfaces";
/**
 * Query the layer for all features
 *
 * @param start zero-based index indicating where to begin retrieving features
 * @param layer the layer to retrieve features from
 * @param graphics stores the features
 *
 * @returns Promise with the featureSet from the layer that match the provided ids
 */
export async function queryAllFeatures(start, layer, graphics) {
  const num = layer.capabilities.query.maxRecordCount;
  const query = layer.createQuery();
  query.start = start;
  query.num = num;
  // TODO think through this once I'm back on crowdsource...seems like we may want an arg to control this
  query.where = layer.definitionExpression || "1=1";
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
export async function queryObjectIds(geometries, layer) {
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
 *
 * @param ids array of ObjectIDs to be used to query for features in a layer
 * @param layer the layer to retrieve features from
 *
 * @returns Promise with the featureSet from the layer that match the provided ids
 */
export async function queryFeaturesByID(ids, layer) {
  const q = layer.createQuery();
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
export async function queryFeaturesByGeometry(start, layer, geometry, featuresCollection) {
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
export async function queryExtent(ids, layer) {
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
export function getQueryGeoms(geometries, geometryEngine) {
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
export function getSelectionSetQuery(selectionSet, geometryEngine) {
  let q = Promise.resolve([]);
  if (selectionSet.workflowType !== EWorkflowType.REFINE) {
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
  const geoms = (geometries === null || geometries === void 0 ? void 0 : geometries.filter(g => g.type === type)) || [];
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
