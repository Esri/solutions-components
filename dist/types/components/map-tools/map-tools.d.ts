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
import { VNode } from '../../stencil-public-runtime';
import MapTools_T9n from "../../assets/t9n/map-tools/resources.json";
import { IBasemapConfig, ISearchConfiguration } from "../../utils/interfaces";
export declare class MapTools {
    el: HTMLMapToolsElement;
    /**
     * IBasemapConfig: List of any basemaps to filter out from the basemap widget
     */
    basemapConfig: IBasemapConfig;
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
     * boolean: when true the search widget will be available
     */
    enableSearch: boolean;
    /**
     * boolean: when true the basemap widget will be available
     */
    enableBasemap: boolean;
    /**
     * boolean: when true the home widget will be available
     */
    enableHome: boolean;
    /**
     * boolean: when true map tools will be displayed within a single expand/collapse widget
     * when false widgets will be loaded individually into expand widgets
     */
    enableSingleExpand: boolean;
    /**
     * "s" | "m" | "l": Used for Zoom and Home tools
     */
    homeZoomToolsSize: "s" | "m" | "l";
    /**
     * "horizontal" | "vertical": used to control the orientation of the tools
     */
    layout: "horizontal" | "vertical";
    /**
     * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    mapView: __esri.MapView;
    /**
     * "s" | "m" | "l": Used for optional map tool widget
     */
    mapWidgetsSize: "s" | "m" | "l";
    /**
     * __esri.UIPosition: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-UI.html#UIPosition
     * The position details for the tools
     */
    position: __esri.UIPosition;
    /**
     * ISearchConfiguration: Configuration details for the Search widget
     */
    searchConfiguration: ISearchConfiguration;
    /**
     * boolean: When true the map widget tools will have no margin between them.
     * When false the map widget tools will have a margin between them.
     */
    stackTools: boolean;
    /**
     *
     * Valid tools: "legend", "search", "fullscreen", "basemap", "floorfilter"
     */
    toolOrder: string[];
    /**
     * When true the map supports floor awareness
     */
    _hasFloorInfo: boolean;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof MapTools_T9n;
    /**
     * When true the tool action bar will be displayed
     */
    _showTools: boolean;
    /**
     * When true the basemap picker will be displayed
     */
    _showBasemapWidget: boolean;
    /**
     * When true the floor filter widget will be displayed
     */
    _showFloorFilter: boolean;
    /**
     * When true the map will be displayed in fullscreen mode
     */
    _showFullscreen: boolean;
    /**
     * When true the legend widget will be displayed
     */
    _showLegendWidget: boolean;
    /**
     * When true the search widget will be displayed
     */
    _showSearchWidget: boolean;
    /**
     * esri/widgets/Expand: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Expand.html
     */
    protected Expand: typeof import("esri/widgets/Expand");
    /**
     * HTMLMapSearchElement: The search element node
     */
    protected _basemapElement: HTMLBasemapGalleryElement;
    /**
     * HTMLFloorFilterElement: The floor filter element node
     */
    protected _floorFilterElement: HTMLFloorFilterElement;
    /**
     * HTMLMapFullscreenElement: The fullscreen element node
     */
    protected _fullscreenElement: HTMLMapFullscreenElement;
    /**
     * HTMLLegendElement: The legend element node
     */
    protected _legendElement: HTMLMapLegendElement;
    /**
     * HTMLMapSearchElement: The search element node
     */
    protected _searchElement: HTMLMapSearchElement;
    /**
     * string[]: List of widget names that have been added to the UI
     * This prop is only used when enableSingleExpand is false
     */
    protected _widgets: any[];
    /**
     * When the mapView loads check if it supports floor awareness
     */
    mapViewWatchHandler(): Promise<void>;
    /**
     * When the _showBasemapWidget property is true display the basemap gallery
     */
    _showBasemapWidgetWatchHandler(v: boolean): Promise<void>;
    /**
     * When the _showBasemapWidget property is true display the basemap gallery
     */
    _showFloorFilterWatchHandler(v: boolean): Promise<void>;
    /**
     * When the _showFullscreen property is true the app will consume the full screen
     */
    _showFullscreenWatchHandler(v: boolean): Promise<void>;
    /**
     * When the _showLegendWidget property is true display the search widget
     */
    _showLegendWidgetWatchHandler(v: boolean): Promise<void>;
    /**
     * When the _showSearchWidget property is true display the search widget
     */
    _showSearchWidgetWatchHandler(v: boolean): Promise<void>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad(): Promise<void>;
    /**
     * StencilJS: Renders the component.
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
     * Set the size of the zoom tools based on the user defined homeZoomToolsSize variable.
     *
     * @protected
     */
    protected _setZoomToolsSize(): void;
    /**
     * Get the map widgets considering the user defined enabled values and tool order
     *
     * @protected
     */
    protected _getMapWidgets(toolOrder: string[]): VNode[];
    /**
     * Respond to fullscreen state change and ensure our state var is in sync
     *
     * @param state The fullscreen view model's state.
     *
     * @protected
     */
    protected _fullscreenStateChange(state: string): void;
    /**
     * Get a calcite action group for the current action
     *
     * @param icon the icon to display for the current action
     * @param disabled should the action be disabled
     * @param tip information tip to display helpful details to end user
     * @param func the associated onClick function to execute
     *
     * @returns the dom node for the action group
     *
     * @protected
     */
    protected _getActionGroup(icon: string, disabled: boolean, tip: string, func: any): VNode;
    /**
     * Add the widget to the UI and optionally to an Expand widget
     *
     * @param name the icon to display for the current action
     * @param content the widget to display
     * @param internalExpand when true the widget will be added to an Expand widget
     *
     * @protected
     */
    protected _getWidget(name: string, content: any, internalExpand: boolean): undefined;
    /**
     * Show/Hide the legend widget
     */
    protected _showLegend(): void;
    /**
     * Show/Hide the search widget
     */
    protected _search(): void;
    /**
     * Show/Hide the basemap picker
     */
    protected _toggleBasemapPicker(): void;
    /**
     * Show/Hide the floor filter
     */
    protected _toggleFloorFilter(): void;
    /**
     * Enter/Exit fullscreen mode
     */
    protected _expand(): void;
    /**
     * Show/Hide the map tools
     */
    protected _toggleTools(): void;
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
