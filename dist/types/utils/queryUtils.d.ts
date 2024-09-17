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
export declare function queryAllFeatures(start: number, layer: __esri.FeatureLayer, graphics: __esri.Graphic[]): Promise<__esri.Graphic[]>;
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
export declare function queryAllOidsWithQueryFeatures(start: number, layer: __esri.FeatureLayer, graphics: __esri.Graphic[], orderBy?: string[]): Promise<number[]>;
/**
 * Query the layer for all IDs
 *
 * @param layer the layer to retrieve features from
 *
 * @returns Promise with the featureSet from the layer that match the provided ids
 */
export declare function queryAllIds(layer: __esri.FeatureLayer): Promise<number[]>;
/**
 * Query the feature for any image attachments
 *
 * @param layer the layer to retrieve attachments from
 *
 * @returns Promise with any attachments from the feature
 */
export declare function queryAttachments(layer: __esri.FeatureLayer, objectIds: number[]): Promise<any>;
/**
 * Query the layer for OIDs based on any user drawn geometries or buffers
 *
 * @param geometries Array of geometries used for the selection of ids from the layer
 * @param layer the layer to retrieve ids from
 *
 * @returns Promise with the OIDs of features from the layer that interset the provided geometries
 */
export declare function queryObjectIds(geometries: __esri.Geometry[], layer: __esri.FeatureLayer): Promise<number[]>;
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
export declare function queryFeaturesByID(ids: number[], layer: __esri.FeatureLayer, graphics: __esri.Graphic[], returnGeometry: boolean, outSpatialReference?: __esri.SpatialReference, fields?: string[]): Promise<__esri.Graphic[]>;
/**
 * Query the layer for features that have the provided globalId
 *
 * @param globalId globalId to be used to query for a feature in a layer
 * @param layer the layer to retrieve features from
 *
 * @returns Promise with the featureSet from the layer that match the provided globalId
 */
export declare function queryFeaturesByGlobalID(globalIds: string[], layer: __esri.FeatureLayer): Promise<__esri.Graphic[]>;
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
export declare function queryFeaturesByGeometry(start: number, layer: __esri.FeatureLayer, geometry: __esri.Geometry, featuresCollection: {
    [key: string]: __esri.Graphic[];
}): Promise<{
    [key: string]: __esri.Graphic[];
}>;
/**
 * Query the layer for feature ids that match the provided where clause.
 * If no where clause is provided all features will be returned.
 *
 * @param layer the layer to retrieve features from
 * @param where the where clause for the query
 * @param orderBy any sort order to apply to the query
 *
 * @returns Promise with the ids from the layer that match the where and are sorted as defined by orderBy
 */
export declare function queryFeatureIds(layer: any, where: any, orderBy: any): Promise<number[]>;
/**
 * Query the layer for the extent of features with the provided OIDs
 *
 * @param ids array of ObjectIDs to be used to query for features in a layer
 * @param layer the layer to query
 *
 * @returns Promise with the Extent of all features that match the provided ids
 */
export declare function queryExtent(ids: number[], layer: __esri.FeatureLayer): Promise<IQueryExtentResponse>;
/**
 * Union geometries based on geometry type
 *
 * @param geometries Array of geometries to union
 * @param geometryEngine the geometry engine instance to perform the unions
 *
 * @returns Array of single unioned geometry for each geometry type
 */
export declare function getQueryGeoms(geometries: __esri.Geometry[], geometryEngine: __esri.geometryEngine): __esri.Geometry[];
