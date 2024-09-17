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

export { queryExtent as a, queryAllIds as b, queryAllOidsWithQueryFeatures as c, queryFeaturesByGlobalID as d, queryObjectIds as e, queryFeaturesByGeometry as f, getQueryGeoms as g, queryFeaturesByID as q };
