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

import { IQueryExtentResponse } from "./interfaces";

/**
 * Query the layer for all features
 *
 * @param start zero-based index indicating where to begin retrieving features
 * @param layer the layer to retrieve features from
 * @param graphics stores the features
 *
 * @returns Promise with the featureSet from the layer that match the provided ids
 */
export async function queryAllFeatures(
  start: number,
  layer: __esri.FeatureLayer,
  graphics: __esri.Graphic[]
): Promise<__esri.Graphic[]> {
  const num = layer.capabilities.query.maxRecordCount;
  const query = layer.createQuery();
  query.start = start;
  query.num = num;
  // TODO think through this once I'm back on crowdsource...seems like we may want an arg to control this
  query.where = layer.definitionExpression || "1=1";

  const result = await layer.queryFeatures(query);

  graphics = graphics.concat(
    result.features
  );

  return result.exceededTransferLimit ?
    queryAllFeatures(start += num, layer, graphics) :
    Promise.resolve(graphics);
}

/**
 * Query the layer for all IDs
 *
 * @param layer the layer to retrieve features from
 *
 * @returns Promise with the featureSet from the layer that match the provided ids
 */
export async function queryAllIds(
  layer: __esri.FeatureLayer
): Promise<number[]> {
  const query = layer.createQuery();
  query.where = layer.definitionExpression || "1=1";
  return await layer.queryObjectIds(query);
}

/**
 * Query the feature for any image attachments
 *
 * @param layer the layer to retrieve attachments from
 *
 * @returns Promise with any attachments from the feature
 */
export async function queryAttachments(
  layer: __esri.FeatureLayer,
  objectIds: number[]
): Promise<any> {
  return await layer.queryAttachments({
    attachmentTypes: [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
      "image/tif",
      "image/tiff",
      "image/bmp"
    ],
    objectIds
  });
}

/**
 * Query the layer for OIDs based on any user drawn geometries or buffers
 *
 * @param geometries Array of geometries used for the selection of ids from the layer
 * @param layer the layer to retrieve ids from
 *
 * @returns Promise with the OIDs of features from the layer that interset the provided geometries
 */
export async function queryObjectIds(
  geometries: __esri.Geometry[],
  layer: __esri.FeatureLayer
): Promise<number[]> {
  let ids = [];
  const queryDefs = geometries ? geometries.map(g => _intersectQuery(g, layer)) : [Promise.resolve()];
  const results = await Promise.all(queryDefs);
  results.forEach(resultIds => {
    ids = [
      ...ids,
      ...resultIds || []
    ]
  });
  return ids;
}

/**
 * Query the layer for features that have the provided OIDs
 *
 * @param ids array of ObjectIDs to be used to query for features in a layer
 * @param layer the layer to retrieve features from
 * @param graphics the result graphics array
 *
 * @returns Promise with the featureSet from the layer that match the provided ids
 */
export async function queryFeaturesByID(
  ids: number[],
  layer: __esri.FeatureLayer,
  graphics: __esri.Graphic[],
  returnGeometry: boolean,
  outSpatialReference?: __esri.SpatialReference
): Promise<__esri.Graphic[]> {
  const num = layer.capabilities?.query.maxRecordCount;
  const start = 0;

  const q = layer.createQuery();
  q.start = start;
  q.returnGeometry = returnGeometry;
  q.objectIds = ids.slice(start, num);
  if (num) {
    q.num = num;
  }
  if (outSpatialReference) {
    q.outSpatialReference = outSpatialReference;
  }

  const result = await layer.queryFeatures(q);

  graphics = graphics.concat(
    result.features
  );

  const remainingIds = ids.slice(num, ids.length);
  return remainingIds.length > 0 ?
    queryFeaturesByID(remainingIds, layer, graphics, returnGeometry, outSpatialReference) :
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
export async function queryFeaturesByGlobalID(
  globalIds: string[],
  layer: __esri.FeatureLayer
): Promise<__esri.Graphic[]> {
  const globalIdField = (layer as any).globalIdField;
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
export async function queryFeaturesByGeometry(
  start: number,
  layer: __esri.FeatureLayer,
  geometry: __esri.Geometry,
  featuresCollection: {[key: string]: __esri.Graphic[]}
): Promise<{[key: string]: __esri.Graphic[]}> {
  const num = layer.capabilities.query.maxRecordCount;
  const query = layer.createQuery();
  query.start = start;
  query.num = num;
  query.geometry = geometry;

  const result = await layer.queryFeatures(query);
  featuresCollection[layer.id] = featuresCollection[layer.id].concat(
    result.features
  );

  return result.exceededTransferLimit ?
    queryFeaturesByGeometry(start += num, layer, geometry, featuresCollection) :
    Promise.resolve(featuresCollection);
}

export async function queryFeatures(
  layer: any,
  where: any,
  orderBy: any,
  start: any,
  featuresCollection: {[key: string]: __esri.Graphic[]}
): Promise<{[key: string]: __esri.Graphic[]}> {
  const newFC = {};
  newFC[layer.id] = [];
  featuresCollection = featuresCollection ? featuresCollection : newFC;
  const num = layer.capabilities.query.maxRecordCount;
  const query = layer.createQuery();
  query.start = start;
  query.num = num;
  query.where = where;
  //FeatureLayer.capabilities.queryRelated.supportsOrderBy must be true.
  //query.orderByFields = ["STATE_NAME DESC"];
  query.orderByFields = orderBy;

  const result = await layer.queryFeatures(query);
  featuresCollection[layer.id] = featuresCollection[layer.id].concat(
    result.features
  );

  return result.exceededTransferLimit ?
    queryFeatures(layer, where, orderBy, start += num, featuresCollection) :
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
 export async function queryExtent(
  ids: number[],
  layer: __esri.FeatureLayer
): Promise<IQueryExtentResponse> {
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
export function getQueryGeoms(
  geometries: __esri.Geometry[],
  geometryEngine: __esri.geometryEngine
): __esri.Geometry[] {
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
 function _unionGeoms(
  geometries: __esri.Geometry[],
  type: string,
  geometryEngine: __esri.geometryEngine
): __esri.Geometry[] {
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
async function _intersectQuery(
  geometry: __esri.Geometry,
  layer: __esri.FeatureLayer
): Promise<number[]> {
  const q = layer.createQuery();
  q.spatialRelationship = "intersects";
  q.geometry = geometry;
  return layer.queryObjectIds(q);
}
