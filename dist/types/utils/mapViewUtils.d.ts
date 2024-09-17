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
import { IMapItemHash, ISelectionSet } from "./interfaces";
/**
 * Gets the layer names from the current map
 *
 * @param mapView the map view to fetch the layer names from
 * @param onlyShowUpdatableLayers when true only layers that support editing and updates will be returned
 *
 * @returns Promise resolving with an array of layer names
 *
 */
export declare function getMapLayerHash(mapView: __esri.MapView, onlyShowUpdatableLayers: boolean): Promise<IMapItemHash>;
/**
 * Gets the table names from the current map
 *
 * @param mapView the map view to fetch the table names from
 * @param onlyShowUpdatableLayers when true only layers that support editing and updates will be returned
 *
 * @returns Promise resolving with an array of table names
 *
 */
export declare function getMapTableHash(mapView: __esri.MapView, onlyShowUpdatableTables: boolean): Promise<IMapItemHash>;
/**
 * Get a layer view by id
 *
 * @param mapView the map view to fetch the layer from
 * @param id the id if the layer to fetch
 *
 * @returns Promise resolving with the fetched layer view
 *
 */
export declare function getFeatureLayerView(mapView: __esri.MapView, id: string): Promise<__esri.FeatureLayerView>;
/**
 * Get a layer or table by id
 *
 * @param mapView the map view to fetch the layer from
 * @param id the id of the layer or table to fetch
 *
 * @returns Promise resolving with the fetched layer or table
 *
 */
export declare function getLayerOrTable(mapView: __esri.MapView, id: string): Promise<__esri.FeatureLayer>;
/**
 * Gets all of the layers from the current map when the map and their layerView is ready
 *
 * @param mapView the map view to fetch the layer names from
 *
 * @returns Promise resolving with an array of all layers
 *
 */
export declare function getAllLayers(mapView: __esri.MapView): Promise<__esri.Layer[]>;
/**
 * Get all of the tables from the current map when the map and their layerView is ready
 * @param mapView the map view to fetch the table names from
 * @returns Promise resolving with an array of all tables
 *
 */
export declare function getAllTables(mapView: __esri.MapView): Promise<__esri.Layer[]>;
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
export declare function highlightFeatures(ids: number[], layerView: __esri.FeatureLayerView, mapView: __esri.MapView, updateExtent?: boolean, zoomToScale?: number): Promise<__esri.Handle>;
/**
 * Highlights features from all sets including the refine set
 *
 * @param selectionSets The selection sets to highlight
 *
 * @returns Promise resolving with the highlight handles
 *
 */
export declare function highlightAllFeatures(selectionSets: ISelectionSet[]): Promise<__esri.Handle[]>;
/**
 * Highlights features from all sets including the refine set
 *
 * @param selectionSets The selection sets to highlight
 *
 * @returns Promise resolving with the highlight handles
 *
 */
export declare function getIdSets(selectionSets: ISelectionSet[]): any;
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
 * @param featureEffect optional (default undefined) feature effect when flashing the features
 * @param zoomToScale optional (default to 0) zoomScale that individual points will use when zoomed to
 * @returns Promise resolving when the operation is complete
 *
 */
export declare function goToSelection(ids: number[], layerView: __esri.FeatureLayerView, mapView: __esri.MapView, flashFeatures?: boolean, featureEffect?: __esri.FeatureEffect, zoomToScale?: number): Promise<void>;
