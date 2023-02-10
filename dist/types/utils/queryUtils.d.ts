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
/// <reference types="arcgis-js-api" />
import { ISelectionSet, IQueryExtentResponse } from "./interfaces";
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
 *
 * @param ids array of ObjectIDs to be used to query for features in a layer
 * @param layer the layer to retrieve features from
 *
 * @returns Promise with the featureSet from the layer that match the provided ids
 */
export declare function queryFeaturesByID(ids: number[], layer: __esri.FeatureLayer): Promise<__esri.FeatureSet>;
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
/**
 * Get the appropriate ObjectIds query for the provided selection set
 *
 * @param selectionSet the current selection set to fetch the query for
 * @param geometryEngine the geometry engine instance to perform the union of the user drawn graphics or buffers
 *
 * @returns A promise that will resolve with ids that intersect the selection sets geometries
 */
export declare function getSelectionSetQuery(selectionSet: ISelectionSet, geometryEngine: __esri.geometryEngine): Promise<number[]>;
