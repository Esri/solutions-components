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
import { EventEmitter } from "../../stencil-public-runtime";
import { IBasemapConfig, IMapChange, IMapInfo, ISearchConfiguration, theme } from "../../utils/interfaces";
export declare class MapCard {
    el: HTMLMapCardElement;
    /**
     * string: Item ID of the web map that should be selected by default when the app loads
     */
    defaultWebmapId: string;
    /**
     * boolean: when true the home widget will be available
     */
    enableHome: boolean;
    /**
     * boolean: when true the legend widget will be available
     */
    enableLegend: boolean;
    /**
     * boolean: when true the floor filter widget will be available
     */
    enableFloorFilter: boolean;
    /**
     * boolean: when true the fullscreen widget will be available
     */
    enableFullscreen: boolean;
    /**
     * boolean: when true map tools will be displayed within a single expand/collapse widget
     * when false widgets will be loaded individually into expand widgets
     */
    enableSingleExpand: boolean;
    /**
     * boolean: when true the search widget will be available
     */
    enableSearch: boolean;
    /**
     * boolean: when true the basemap widget will be available
     */
    enableBasemap: boolean;
    /**
     * IBasemapConfig: List of any basemaps to filter out from the basemap widget
     */
    basemapConfig: IBasemapConfig;
    /**
     * boolean: When true the map display will be hidden
     */
    hidden: boolean;
    /**
     * number: The placement index of the home and zoom components. This index shows where to place the component relative to other components.
     * For example a value of 0 would place it topmost when position is top-*, leftmost for bottom-left and right most for bottom-right.
     */
    homeZoomIndex: number;
    /**
     * __esri.UIPosition: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-UI.html#UIPosition
     * The position details for the Home and Zoom tools
     */
    homeZoomPosition: __esri.UIPosition;
    /**
     * "s" | "m" | "l": Used for Zoom and Home tools
     */
    homeZoomToolsSize: "s" | "m" | "l";
    /**
     * IMapInfo[]: array of map infos (name and id)
     */
    mapInfos: IMapInfo[];
    /**
     * number: The placement index of the map widgets (legend, basemap, fullscreen etc). This index shows where to place the component relative to other components.
     * For example a value of 0 would place it topmost when position is top-*, leftmost for bottom-left and right most for bottom-right.
     */
    mapWidgetsIndex: number;
    /**
     * __esri.UIPosition: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-UI.html#UIPosition
     * The position details for the Home and Zoom tools
     */
    mapWidgetsPosition: __esri.UIPosition;
    /**
     * "s" | "m" | "l": Used for optional map tool widget
     */
    mapWidgetsSize: "s" | "m" | "l";
    /**
     * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * boolean: When true the map widget tools will have no margin between them.
     * When false the map widget tools will have a margin between them.
     */
    stackTools: boolean;
    /**
     * theme: "light" | "dark" theme to be used
     */
    theme: theme;
    /**
     *
     * Valid tools: "legend", "search", "fullscreen", "basemap", "floorfilter"
     */
    toolOrder: string[];
    /**
     * ISearchConfiguration: Configuration details for the Search widget
     */
    _searchConfiguration: ISearchConfiguration;
    /**
     * IMapInfo: id and name of the map to display
     */
    _webMapInfo: IMapInfo;
    /**
     * esri/widgets/Home: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Home.html
     */
    protected Home: typeof import("esri/widgets/Home");
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    protected MapView: typeof import("esri/views/MapView");
    /**
     * esri/WebMap: https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html
     */
    protected WebMap: typeof import("esri/WebMap");
    /**
     * boolean: When true the default map provided via url params has been loaded and should no longer override other maps
     */
    protected _defaultWebmapHonored: boolean;
    /**
     * esri/widgets/Home: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Home.html
     */
    protected _homeWidget: __esri.Home;
    /**
     * string: the id of map currently displayed
     */
    protected _loadedId: string;
    /**
     * HTMLDivElement: the container div for the map
     */
    protected _mapDiv: HTMLDivElement;
    /**
     * HTMLMapPickerElement: map layer picker element
     */
    protected _mapPicker: HTMLMapPickerElement;
    /**
     * HTMLMapToolsElement: the container div for the map tools
     */
    protected _mapTools: HTMLMapToolsElement;
    /**
     * Add/remove home widget
     */
    enableHomeWatchHandler(): void;
    /**
     * Emitted when a new map is loaded
     */
    mapChanged: EventEmitter<IMapChange>;
    /**
     * Emitted before a new map is loaded
     */
    beforeMapChanged: EventEmitter<void>;
    /**
     * Listen for changes to map info and load the appropriate map
     */
    mapInfoChange(evt: CustomEvent): Promise<void>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): any;
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _initModules(): Promise<void>;
    /**
     * Load the webmap for the provided webMapInfo
     *
     * @param webMapInfo the webmap id and name to load
     */
    protected _loadMap(webMapInfo: IMapInfo): Promise<void>;
    /**
     * Add/remove the home widget base on enableHome prop
     *
     * @protected
     */
    protected _initHome(): void;
}
