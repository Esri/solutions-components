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
import { VNode } from "../../stencil-public-runtime";
import CrowdsourceManager_T9n from "../../assets/t9n/crowdsource-manager/resources.json";
import { ELayoutMode, IBasemapConfig, IMapChange, IMapInfo, ISearchConfiguration, theme } from "../../utils/interfaces";
import { LayerExpression } from "@esri/instant-apps-components";
export declare class CrowdsourceManager {
    el: HTMLCrowdsourceManagerElement;
    /**
     * string: default center point values for the map
     * ; delimited x;y pair
     */
    defaultCenter: string;
    /**
     * string: default layer expression to apply to the current layer
     */
    defaultFilter: string;
    /**
     * string: Global ID of the feature to select
     */
    defaultGlobalId: string;
    /**
     * string: when provided this layer ID will be used when the app loads
     */
    defaultLayer: string;
    /**
     * string: default zoom level
     */
    defaultLevel: string;
    /**
     * string: Object ID of feature to select
     */
    defaultOid: string;
    /**
     * string: Item ID of the web map that should be selected by default
     */
    defaultWebmap: string;
    /**
     * boolean: when true the layer table will auto refresh the data
     */
    enableAutoRefresh: boolean;
    /**
     * boolean: when true the layer table will support drag/drop of columns to adjust order
     */
    enableColumnReorder: boolean;
    /**
     * boolean: when true the export to csv button will be available
     */
    enableCSV: boolean;
    /**
     * boolean: when true the fullscreen widget will be available
     */
    enableFloorFilter: boolean;
    /**
     * boolean: when true the fullscreen widget will be available
     */
    enableFullscreen: boolean;
    /**
     * boolean: when true edits can be applied directly within the table
     */
    enableInlineEdit: boolean;
    /**
     * boolean: when true the legend widget will be available
     */
    enableLegend: boolean;
    /**
     * boolean: when true the search widget will be available
     */
    enableSearch: boolean;
    /**
     * boolean: when true the share widget will be available
     */
    enableShare: boolean;
    /**
     * boolean: when true the home widget will be available
     */
    enableHome: boolean;
    /**
     * boolean: when true the zoom widget will be available
     */
    enableZoom: boolean;
    /**
     * boolean: when true the basemap widget will be available
     */
    enableBasemap: boolean;
    /**
     * IBasemapConfig: List of any basemaps to filter out from the basemap widget
     */
    basemapConfig: IBasemapConfig;
    /**
     * boolean: when true the table will be sorted by objectid in descending order by default
     */
    showNewestFirst: boolean;
    /**
     * IMapInfo[]: array of map infos (name and id)
     */
    mapInfos: IMapInfo[];
    /**
     * boolean: When true only editable layers that support the update capability will be available
     */
    onlyShowUpdatableLayers: boolean;
    /**
     * ISearchConfiguration: Configuration details for the Search widget
     */
    searchConfiguration: ISearchConfiguration;
    /**
     * boolean: When true the share options will include embed option
     */
    shareIncludeEmbed: boolean;
    /**
     * boolean: When true the share options will include social media sharing
     */
    shareIncludeSocial: boolean;
    /**
     * theme: "light" | "dark" theme to be used
     */
    theme: theme;
    /**
     * boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table
     */
    zoomAndScrollToSelected: boolean;
    /**
     * When true the info panel with the popup details will take the full height and prevent the map from displaying
     */
    _expandPopup: boolean;
    /**
     * When true the mobile footer will be hidden
     */
    _hideFooter: boolean;
    /**
     * When true the table will be hidden
     */
    _hideTable: boolean;
    /**
     * When true the component will render an optimized view for mobile devices
     */
    _isMobile: boolean;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof CrowdsourceManager_T9n;
    /**
     * esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     */
    _layer: __esri.FeatureLayer;
    /**
     * Controls the layout of the application
     */
    _layoutMode: ELayoutMode;
    /**
     * IMapInfo: The current map info stores configuration details
     */
    _mapInfo: IMapInfo;
    /**
     * Stores the current map view
     */
    _mapView: __esri.MapView;
    /**
     * Controls the layout of the application
     */
    _panelOpen: boolean;
    /**
     * Number of selected features in the table
     */
    _numSelected: number;
    /**
     * When true only editable tables have been found and the map will be hidden
     */
    _tableOnly: boolean;
    /**
     * number[]: X,Y pair used to center the map
     */
    protected _defaultCenter: number[];
    /**
     * string: Definition expression to be used by current layer
     */
    protected _defaultFilter: LayerExpression[];
    /**
     * string[]: List of global ids that should be selected by default
     */
    protected _defaultGlobalId: string[];
    /**
     * number: zoom level the map should go to
     */
    protected _defaultLevel: number;
    /**
     * number[]: List of ids that should be selected by default
     */
    protected _defaultOid: number[];
    /**
     * HTMLLayerTableElement: The layer table element
     */
    protected _layerTable: HTMLLayerTableElement;
    /**
     * IMapChange: The current map change details
     */
    protected _mapChange: IMapChange;
    /**
     * ResizeObserver: The observer that watches for screen size changes
     */
    protected _resizeObserver: ResizeObserver;
    /**
     * boolean: When true the map view will be set after render due to popup obstructing the view
     * MapView.when is not fired when mapView is not currently visible
     */
    protected _shouldSetMapView: boolean;
    /**
     * Watch for center url param to be set
     */
    defaultCenterWatchHandler(): void;
    /**
     * Watch for filter url param to be set
     */
    defaultFilterWatchHandler(): void;
    /**
     * Watch for globalid url param to be set
     */
    defaultGlobalIdWatchHandler(): void;
    /**
     * Watch for oid url param to be set
     */
    defaultOidWatchHandler(): void;
    /**
     * Watch for zoom level param to be set
     */
    defaultLevelWatchHandler(): void;
    /**
     * When true the map zoom tools will be available
     */
    enableZoomWatchHandler(): void;
    /**
     * Listen for changes in feature selection and show or hide the map, popup, and table
     */
    featureSelectionChange(evt: CustomEvent): Promise<void>;
    /**
     * Listen for when the popup is closed in mobile mode and hide the appropriate UI elements
     */
    popupClosed(): Promise<void>;
    /**
     * Listen for idsFound event to be fired so we can know that all layer ids have been fetched
     */
    idsFound(evt: CustomEvent): Promise<void>;
    /**
     * Listen for layoutChanged event to be fired so we can adjust the layout
     */
    layoutChanged(evt: CustomEvent): Promise<void>;
    /**
     * Listen for mapChanged event to be fired then store the new mapView so components will be updated
     */
    mapChanged(evt: CustomEvent): Promise<void>;
    /**
     * Listen for beforeMapChanged and minimize the popup if it's expanded
     */
    beforeMapChanged(): Promise<void>;
    /**
     * Get the layer for the provided layer id
     */
    layerSelectionChange(evt: CustomEvent): Promise<void>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    componentWillLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): any;
    /**
     * Called after each render
     * Used to delay the setting of the mapView when the popup is expaneded and obstructs the view
     */
    componentDidRender(): Promise<void>;
    /**
     * Called once after the component is loaded
     */
    componentDidLoad(): Promise<void>;
    /**
     * Show View and Delete buttons in the footer when in isMobile is true
     *
     * @returns the footer node
     * @protected
     */
    protected _getFooter(): VNode;
    /**
     * Get the icon name to use for the divider icon based on the current layout
     *
     * @param layoutMode ELayoutMode the current layout mode
     * @param panelOpen boolean indicates if all panels are open
     *
     * @returns the icon name
     * @protected
     */
    protected _getDividerIcon(layoutMode: ELayoutMode, panelOpen: boolean): string;
    /**
     * Get the css selector names to use for the map based on the current layout
     *
     * @param layoutMode ELayoutMode the current layout mode
     * @param panelOpen boolean indicates if all panels are open
     * @param hideTable boolean when true the layer table is hidden
     *
     * @returns the css selectors
     * @protected
     */
    protected _getMapSizeClass(layoutMode: ELayoutMode, panelOpen: boolean, hideTable: boolean): string;
    /**
     * Get the css selector names to use for the table based on the current layout
     *
     * @param layoutMode ELayoutMode the current layout mode
     * @param panelOpen boolean indicates if all panels are open
     *
     * @returns the css selectors
     * @protected
     */
    protected _getTableSizeClass(layoutMode: ELayoutMode, panelOpen: boolean): string;
    /**
     * Get the table and map nodes based for the current layout
     *
     * @param layoutMode ELayoutMode the current layout mode
     * @param panelOpen boolean indicates if all panels are open
     *
     * @returns the parent node that contains the table and map
     * @protected
     */
    protected _getBody(layoutMode: ELayoutMode, panelOpen: boolean, hideTable: boolean): VNode;
    /**
     * Get the map and card nodes based for the current layout options
     *
     * @param layoutMode ELayoutMode the current layout mode
     * @param panelOpen boolean indicates if all panels are open
     * @param hideTable boolean when true the layer table is hidden
     *
     * @returns the map node
     * @protected
     */
    protected _getMapAndCard(layoutMode: ELayoutMode, panelOpen: boolean, hideTable: boolean): VNode;
    /**
     * Get the map node based for the current layout options
     *
     * @param layoutMode ELayoutMode the current layout mode
     * @param panelOpen boolean indicates if all panels are open
     *
     * @returns the map node
     * @protected
     */
    protected _getMapNode(panelOpen: boolean): VNode;
    /**
     * Get the expand node for the popup information
     *
     * @returns the expand node
     * @protected
     */
    protected _getPopupExpandNode(): VNode;
    /**
     * Toggle the popup information
     *
     * @protected
     */
    protected _togglePopup(): void;
    /**
     * Get the card node
     *
     * @returns the card node
     * @protected
     */
    protected _getCardNode(): VNode;
    /**
     * Get the table node based for the current layout
     *
     * @param layoutMode ELayoutMode the current layout mode
     * @param panelOpen boolean indicates if all panels are open
     *
     * @returns the table node
     * @protected
     */
    protected _getTable(layoutMode: ELayoutMode, panelOpen: boolean, hideTable: boolean): VNode;
    /**
     * Update the component layout when its size changes
     */
    protected _onResize(): void;
    /**
     * Open/Close the appropriate panel.
     * The panel that is toggled is dependent upon the layout mode and if using classic grid or not
     */
    protected _toggleLayout(): void;
    /**
     * Show/Hide the map, popup, and table
     *
     * @param show when true the map, popup, and table will be displayed
     */
    protected showHideMapPopupAndTable(show: boolean): void;
    /**
     * Get the current map info (configuration details) when maps change
     *
     * @returns IMapInfo for the provided id
     * @protected
     */
    protected _getMapInfo(id: string): IMapInfo;
    /**
     * Set the current map info when maps change
     *
     * @protected
     */
    protected _setMapView(): Promise<void>;
    /**
     * Add/remove zoom tools based on enableZoom prop
     *
     * @protected
     */
    protected _initMapZoom(): void;
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
