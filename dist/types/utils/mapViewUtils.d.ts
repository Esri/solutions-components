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
import { ILayerHash } from "./interfaces";
/**
 * Gets the layer names from the current map
 *
 * @param mapView the map view to fetch the layer names from
 *
 * @returns Promise resolving with an array of layer names
 *
 */
export declare function getMapLayerHash(mapView: __esri.MapView): Promise<ILayerHash>;
/**
 * Gets the layer names from the current map
 *
 * @param mapView the map view to fetch the layer names from
 *
 * @returns Promise resolving with an array of layer names
 *
 */
export declare function getMapLayerIds(mapView: __esri.MapView): Promise<string[]>;
/**
 * Get a layer view by id
 *
 * @param mapView the map view to fetch the layer from
 * @param id the id if the layer to fetch
 *
 * @returns Promise resolving with the fetched layer view
 *
 */
export declare function getMapLayerView(mapView: __esri.MapView, id: string): Promise<__esri.FeatureLayerView>;
/**
 * Get a layer by id
 *
 * @param mapView the map view to fetch the layer from
 * @param id the id if the layer to fetch
 *
 * @returns Promise resolving with the fetched layer
 *
 */
export declare function getMapLayer(mapView: __esri.MapView, id: string): Promise<__esri.FeatureLayer>;
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
export declare function highlightFeatures(ids: number[], layerView: __esri.FeatureLayerView, mapView: __esri.MapView, updateExtent?: boolean): Promise<__esri.Handle>;
/**
 * Flash features by OID
 *
 * @param ids the OIDs from the layer to highlight
 * @param layerView the layer view to highlight
 *
 * @returns Promise resolving when the operation is complete
 *
 */
export declare function flashSelection(ids: number[], layerView: __esri.FeatureLayerView, featureEffect: __esri.FeatureEffect): Promise<void>;
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
export declare function goToSelection(ids: number[], layerView: __esri.FeatureLayerView, mapView: __esri.MapView, flashFeatures?: boolean, featureEffect?: __esri.FeatureEffect): Promise<void>;
