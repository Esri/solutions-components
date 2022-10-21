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

import { EWorkflowType, ISelectionSet } from "./interfaces";

/**
 * Query the selectLayerView based on any user drawn geometries or buffers
 *
 * @param geometries Array of geometries used for the selection of ids from the select layer view
 *
 * @returns Promise when the selection is complete and the graphics have been highlighted
 */
export async function queryObjectIds(
  geometries: __esri.Geometry[],
  layer: __esri.FeatureLayer
): Promise<number[]> {
  let ids = [];
  const queryDefs = geometries.map(g => _query(g, layer))
  const results = await Promise.all(queryDefs);
  results.forEach(resultIds => {
    ids = [
      ...ids,
      ...resultIds
    ]
  });
  return ids;
}

/**
 * Query the selectLayerView based on any user drawn geometries or buffers
 *
 * @param geometries Array of geometries used for the selection of ids from the select layer view
 *
 * @returns Promise when the selection is complete and the graphics have been highlighted
 */
 export async function queryFeatures(
  ids: number[],
  layer: __esri.FeatureLayer
): Promise<__esri.FeatureSet> {
  const q = layer.createQuery();
  q.outFields = ["*"];
  q.objectIds = ids;
  return layer.queryFeatures(q);
}

/**
 * Query the selectLayerView based on any user drawn geometries or buffers
 *
 * @param geometries Array of geometries used for the selection of ids from the select layer view
 *
 * @returns Promise when the selection is complete and the graphics have been highlighted
 */
 export async function queryExtent(
  ids: number[],
  layer: __esri.FeatureLayer
): Promise<any> {
  const query = layer.createQuery();
  query.objectIds = ids;
  return layer.queryExtent(query);
}

export function getQueryGeoms(
  geometries: __esri.Geometry[],
  geometryEngine: __esri.geometryEngine
) {
  // sort and union by geom type so we have a single geom for each type to query with
  return [
    ..._unionGeoms(geometries, "polygon", geometryEngine),
    ..._unionGeoms(geometries, "polyline", geometryEngine),
    ..._unionGeoms(geometries, "point", geometryEngine)
  ];
}

/**
 * Query the selectLayerView based on any user drawn geometries or buffers
 *
 * @param geometries Array of geometries used for the selection of ids from the select layer view
 *
 * @returns Promise when the selection is complete and the graphics have been highlighted
 */
function _unionGeoms(
  geometries: __esri.Geometry[],
  type: string,
  geometryEngine: __esri.geometryEngine
): __esri.Geometry[] {
  // May make this a class and load the geom engine directly
  const geoms = geometries.filter(g => g.type === type);
  return geoms.length <= 1 ? geoms : [geometryEngine.union(geoms)];
}

export async function queryPage(
  page: number,
  layer: __esri.FeatureLayer,
  geom: __esri.Geometry,
  featuresCollection: {[key: string]: __esri.Graphic[]}
): Promise<any> {
  const num = layer.capabilities.query.maxRecordCount;
  const query = {
    start: page,
    num,
    outFields: ["*"],
    returnGeometry: true,
    geometry: geom
  };

  const result = await layer.queryFeatures(query);
  featuresCollection[layer.title] = featuresCollection[layer.title].concat(
    result.features
  );

  return result.exceededTransferLimit ?
    queryPage(page += num, layer, geom, featuresCollection) :
    Promise.resolve(featuresCollection);
}

export function getSelectionSetQuery(
  selectionSet: ISelectionSet,
  geometryEngine: __esri.geometryEngine
) {
  let q = Promise.resolve([]);
  switch (selectionSet.workflowType) {
    case EWorkflowType.REFINE:
      q = _getRefineQuery(selectionSet);
      break;
    case EWorkflowType.SEARCH:
      q = _getSearchQuery(selectionSet);
      break;
    case EWorkflowType.SELECT:
      q = _getSelectQuery(selectionSet);
      break;
    case EWorkflowType.SKETCH:
      q = _getSketchQuery(selectionSet, geometryEngine);
      break;
  }
  return q;
}

function _getSketchQuery(
  selectionSet: ISelectionSet,
  geometryEngine: __esri.geometryEngine
) {
  if (!selectionSet.buffer) {
    const queryGeoms = getQueryGeoms(
      selectionSet.geometries,
      geometryEngine
    );
    return queryObjectIds(
      queryGeoms,
      selectionSet.layerView.layer
    );
  } else {
    // buffer is a single unioned geom
    return queryObjectIds(
      [selectionSet.buffer],
      selectionSet.layerView.layer
    );
  }
}

function _getSelectQuery(
  selectionSet: ISelectionSet
) {
  if (!selectionSet.buffer) {
    const queryGeoms = getQueryGeoms(
      selectionSet.geometries,
      this._geometryEngine
    );
    return queryObjectIds(
      queryGeoms,
      selectionSet.layerView.layer
    );
  } else {
    // buffer is a single unioned geom
    return queryObjectIds(
      [selectionSet.buffer],
      selectionSet.layerView.layer
    );
  }
}

function _getSearchQuery(
  selectionSet: ISelectionSet
) {
  if (!selectionSet.buffer) {
    const queryGeoms = getQueryGeoms(
      selectionSet.geometries,
      this._geometryEngine
    );
    return queryObjectIds(
      queryGeoms,
      selectionSet.layerView.layer
    );
  } else {
    // buffer is a single unioned geom
    return queryObjectIds(
      [selectionSet.buffer],
      selectionSet.layerView.layer
    );
  }
}

function _getRefineQuery(
  selectionSet: ISelectionSet
) {
  if (!selectionSet.buffer) {
    const queryGeoms = getQueryGeoms(
      selectionSet.geometries,
      this._geometryEngine
    );
    return queryObjectIds(
      queryGeoms,
      selectionSet.layerView.layer
    );
  } else {
    // buffer is a single unioned geom
    return queryObjectIds(
      [selectionSet.buffer],
      selectionSet.layerView.layer
    );
  }
}

/**
 * Query the layer
 *
 * @param geometry Geometry used for the selection of ids from the select layer view
 *
 * @returns Promise that will contain the selected ids
 */
async function _query(
  geometry: __esri.Geometry,
  layer: __esri.FeatureLayer
): Promise<number[]> {
  const q = layer.createQuery();
  q.spatialRelationship = "intersects";
  q.geometry = geometry;
  return layer.queryObjectIds(q);
}
