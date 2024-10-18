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
import { Host, h } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import { joinAppProxies } from "templates-common-library-esm/functionality/proxy";
import { getLocaleComponentStrings } from "../../utils/locale";
import { getFeatureLayerView, goToSelection } from "../../utils/mapViewUtils";
import "@esri/instant-apps-components/dist/components/instant-apps-social-share";
// TODO navigation and accessability isn't right for the map list
//   tab does not go into the list when it's open
//   focus is not set when it opens
// TODO clarify what the List button is supposed to do
// TODO map list button tooltip does not work
// TODO map list should close if the user clicks something else...hope this will be easy when I figure out how to set focus when it opens
export class MapCard {
    constructor() {
        this.appLayout = undefined;
        this.appProxies = undefined;
        this.defaultWebmapId = "";
        this.defaultLayerId = undefined;
        this.enableHome = undefined;
        this.enableLegend = undefined;
        this.enableFloorFilter = undefined;
        this.enableFullscreen = undefined;
        this.enableShare = false;
        this.enableSingleExpand = true;
        this.enableSearch = undefined;
        this.enableBasemap = undefined;
        this.basemapConfig = undefined;
        this.hidden = undefined;
        this.homeZoomIndex = 3;
        this.homeZoomPosition = "top-left";
        this.homeZoomToolsSize = "m";
        this.mapInfos = [];
        this.mapWidgetsIndex = 0;
        this.mapWidgetsPosition = "top-right";
        this.mapWidgetsSize = "m";
        this.mapView = undefined;
        this.stackTools = true;
        this.theme = undefined;
        this.toolOrder = undefined;
        this.isMapLayout = undefined;
        this.shareIncludeEmbed = undefined;
        this.shareIncludeSocial = undefined;
        this.selectedFeaturesIds = undefined;
        this.selectedLayer = undefined;
        this.zoomToScale = undefined;
        this.onlyShowUpdatableLayers = undefined;
        this.isMobile = undefined;
        this.mapInfo = undefined;
        this._translations = undefined;
        this._searchConfiguration = undefined;
        this._webMapInfo = undefined;
        this._showHideOpen = false;
        this._toolInfos = undefined;
        this._controlsThatFit = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * esri/config: https://developers.arcgis.com/javascript/latest/api-reference/esri-config.html
     */
    esriConfig;
    /**
     * esri/widgets/Home: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Home.html
     */
    Home;
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     */
    MapView;
    /**
     * esri/WebMap: https://developers.arcgis.com/javascript/latest/api-reference/esri-WebMap.html
     */
    WebMap;
    /**
     * boolean: When true the default map provided via url params has been loaded and should no longer override other maps
     */
    _defaultWebmapHonored = false;
    /**
     * esri/widgets/Home: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Home.html
     */
    _homeWidget;
    /**
     * string: the id of map currently displayed
     */
    _loadedId = "";
    /**
     * HTMLDivElement: the container div for the map
     */
    _mapDiv;
    /**
     * HTMLMapPickerElement: map layer picker element
     */
    _mapPicker;
    /**
     * HTMLMapToolsElement: the container div for the map tools
     */
    _mapTools;
    /**
     * HTMLCalciteDropdownElement: Dropdown the will support overflow tools that won't fit in the current display
     */
    _moreDropdown;
    /**
     * boolean: When true the show/hide fields list is forced open
     */
    _mapListExpanded = false;
    /**
     * boolean: When true an indicator will be shown on the action
     */
    _filterActive = false;
    /**
     * string: The current layers definition expression
     */
    _definitionExpression;
    /**
     * HTMLMapLayerPickerElement: The Map layer picker refrence element
     */
    _mapLayerPicker;
    /**
     * ResizeObserver: The observer that watches for toolbar size changes
     */
    _resizeObserver;
    /**
     * HTMLInstantAppsSocialShareElement: Element to support app sharing to social media
     */
    _shareNode;
    /**
     * HTMLCalciteDropdownElement: Dropdown the will support show/hide of table columns
     */
    _showHideDropdown;
    /**
     * HTMLDivElement: The toolbars containing node
     */
    _toolbar;
    /**
     * any: Timeout used to limit redundancy for toolbar resizing
     */
    _timeout;
    /**
     * IToolSizeInfo[]: Id and Width for the current tools
     */
    _toolbarSizeInfos;
    /**
     * IToolSizeInfo[]: The default list of tool size info for tools that should display outside of the dropdown
     */
    _defaultVisibleToolSizeInfos;
    /**
     * boolean: When true the observer has been set and we don't need to set it again
     */
    _observerSet = false;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Update the url params when the appLayout changes
     */
    appLayoutWatchHandler() {
        this._updateShareUrl();
    }
    /**
     * Add/remove home widget
     */
    enableHomeWatchHandler() {
        this._initHome();
    }
    /**
     * Update the toolbar when the share button is enabled/disabled
     */
    enableShareWatchHandler() {
        // this should be caught by component did render and is when I test locally
        // however have had reported case where it is not somehow on devext so adding explicit check here
        if (this._toolbar) {
            this._updateToolbar();
        }
    }
    /**
     * watch for changes in map view and get the first layer
     */
    async mapViewWatchHandler() {
        if (this.mapView) {
            this._updateShareUrl();
        }
    }
    /**
     * watch for changes in layer view and verify if it has editing enabled
     */
    async selectedLayerWatchHandler() {
        await this.selectedLayer?.when(async () => {
            this._definitionExpression = this.selectedLayer.definitionExpression;
        });
    }
    /**
     * watch for features ids changes
     */
    async selectedFeaturesIdsWatchHandler() {
        this._updateShareUrl();
        this._validateEnabledActions();
    }
    /**
     * watch for changes to the list of controls that will currently fit in the display
     */
    _controlsThatFitWatchHandler() {
        const ids = this._controlsThatFit ? this._controlsThatFit.reduce((prev, cur) => {
            prev.push(cur.id);
            return prev;
        }, []) : [];
        this._toolInfos = this._toolInfos?.map(ti => {
            if (ti && this._controlsThatFit) {
                const id = this._getId(ti.icon);
                ti.isOverflow = ids.indexOf(id) < 0;
                return ti;
            }
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Reset the filter
     */
    async resetFilter() {
        this._filterActive = false;
        this._updateShareUrl();
    }
    /**
     * updates the filter
     */
    async updateFilterState() {
        this._filterActive = this._definitionExpression !== this.selectedLayer.definitionExpression;
        this._updateShareUrl();
    }
    /**
     * updates the layer in map layer picker
     */
    async updateLayer() {
        void this._mapLayerPicker.updateLayer();
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted when a new map is loaded
     */
    mapChanged;
    /**
     * Emitted before a new map is loaded
     */
    beforeMapChanged;
    /**
     * Emitted on demand when filter action is clicked
     */
    toggleFilter;
    /**
     * Emitted on demand when clear selection button is clicked
     */
    clearSelection;
    /**
     * Listen for changes to map info and load the appropriate map
     */
    async mapInfoChange(evt) {
        await this._loadMap(evt.detail);
    }
    /**
     * Listen for change when mapview doesn't contain any layer
     */
    noLayersFound() {
        this.selectedLayer = undefined;
        this.selectedFeaturesIds = [];
    }
    /**
     * Handles layer selection change to show new table
     */
    layerSelectionChange() {
        setTimeout(() => {
            this._initToolInfos();
        }, 50);
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    async componentWillLoad() {
        await this._getTranslations();
        await this._initModules();
        this._initToolInfos();
        if (!this._resizeObserver) {
            this._resizeObserver = new ResizeObserver(() => this._updateToolbar());
        }
    }
    /**
     * Renders the component.
     */
    render() {
        const mapContainerClass = this.isMapLayout ? "display-flex height-49-px" : "";
        const mapClass = this.hidden ? "visibility-hidden-1" : "";
        const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
        const mapHeightClass = this.mapInfos?.length > 1 || this.isMapLayout ? "map-height" : "height-full";
        const progressClass = this.isMapLayout ? "" : "display-none";
        this._validateActiveActions();
        return (h(Host, { key: 'd4e5ff9c4aa08a4effe19a54a1a48463cb8b3774' }, h("div", { key: '51ee35d267d5ef081a4c160de3e03b1790d328c8', class: `${mapContainerClass} width-full`, ref: (el) => this._toolbar = el }, this._getActionBar(), !this.isMobile && this.isMapLayout && this._getDropdown("more-table-options"), this.enableShare && !this.isMobile && this.isMapLayout ? this._getShare("share") : undefined), h("calcite-progress", { key: '70a5c232aae8a9ff6740fd326e6ba6fe61936541', class: progressClass, value: 0 }), h("div", { key: 'c399acc019d7f0a16dbb644eee4cfdd1e6e83c7c', class: `${mapHeightClass} ${mapClass}`, ref: (el) => (this._mapDiv = el) }), h("map-tools", { key: 'c6a88ccfa140fe9b0d059f74b9254af6ef0997ce', basemapConfig: this.basemapConfig, class: `box-shadow ${themeClass}`, enableBasemap: this.enableBasemap, enableFloorFilter: this.enableFloorFilter, enableFullscreen: this.enableFullscreen, enableHome: this.enableHome, enableLegend: this.enableLegend, enableSearch: this.enableSearch, enableSingleExpand: this.enableSingleExpand, homeZoomToolsSize: this.homeZoomToolsSize, mapView: this.mapView, mapWidgetsSize: this.mapWidgetsSize, position: this.mapWidgetsPosition, ref: (el) => this._mapTools = el, searchConfiguration: this._searchConfiguration, stackTools: this.stackTools, toolOrder: this.toolOrder })));
    }
    /**
     * Called each time after the component is loaded
     */
    async componentDidRender() {
        if (this.isMapLayout) {
            this._updateToolbar();
        }
        document.onclick = (e) => this._handleDocumentClick(e);
    }
    /**
     * Called once after the component is loaded
     */
    async componentDidLoad() {
        if (!this.isMobile && !this._observerSet) {
            this._resizeObserver.observe(this._toolbar);
            this._observerSet = true;
        }
        this._updateShareUrl();
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _initModules() {
        const [WebMap, MapView, Home, esriConfig] = await loadModules([
            "esri/WebMap",
            "esri/views/MapView",
            "esri/widgets/Home",
            "esri/config"
        ]);
        this.WebMap = WebMap;
        this.MapView = MapView;
        this.Home = Home;
        this.esriConfig = esriConfig;
    }
    /**
     * Load the webmap for the provided webMapInfo
     *
     * @param webMapInfo the webmap id and name to load
     */
    async _loadMap(webMapInfo) {
        // on the first render use the default webmap id if provided otherwise use the first child of the provided mapInfos
        const loadDefaultMap = !this._defaultWebmapHonored && this.defaultWebmapId;
        const defaultMap = this.mapInfos?.filter(i => i.id === this.defaultWebmapId);
        const mapConfigChanged = JSON.stringify(webMapInfo) !== JSON.stringify(this._webMapInfo);
        this._webMapInfo = loadDefaultMap && defaultMap ? defaultMap[0] :
            !webMapInfo?.id && this.mapInfos.length > 0 ? this.mapInfos[0] : webMapInfo;
        const id = this._webMapInfo.id;
        const isDefaultMap = loadDefaultMap && webMapInfo?.id === this.defaultWebmapId;
        if ((this._loadedId !== id && !loadDefaultMap) || isDefaultMap) {
            const webMap = new this.WebMap({
                portalItem: { id }
            });
            if (this.appProxies) {
                await webMap.load();
                await joinAppProxies(webMap, this.esriConfig, this.appProxies);
            }
            this.mapView = new this.MapView({
                container: this._mapDiv,
                map: webMap,
                resizeAlign: "center"
            });
            this._loadedId = id;
            this._searchConfiguration = this._webMapInfo.searchConfiguration;
            this.beforeMapChanged.emit();
            await this.mapView.when(() => {
                this._initHome();
                this.mapView.ui.add(this._mapTools, { position: this.mapWidgetsPosition, index: this.mapWidgetsIndex });
                this._defaultWebmapHonored = isDefaultMap ? true : this._defaultWebmapHonored;
                this.mapChanged.emit({
                    id: id,
                    mapView: this.mapView
                });
            });
        }
        else if (loadDefaultMap) {
            this._defaultWebmapHonored = true;
            void this._mapPicker.setMapByID(id);
        }
        else if (mapConfigChanged) {
            // Map is the same so no need to reload but we need to update for any changes from the config
            this._searchConfiguration = this._webMapInfo.searchConfiguration;
            this.beforeMapChanged.emit();
            this.mapChanged.emit({
                id: id,
                mapView: this.mapView
            });
        }
        this._updateShareUrl();
    }
    /**
     * Add/Remove tools from the action bar and dropdown based on available size
     * @protected
     */
    _updateToolbar() {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
        if (!this.isMobile && this._toolbar && this._toolInfos) {
            this._timeout = setTimeout(() => {
                clearTimeout(this._timeout);
                this._setToolbarSizeInfos();
                const toolbarWidth = this._toolbar.offsetWidth;
                let controlsWidth = this._toolbarSizeInfos.reduce((prev, cur) => {
                    prev += cur.width;
                    return prev;
                }, 0);
                const skipControls = ["solutions-more", "solutions-map-layer-picker-container", "map-picker", "solutions-action-share"];
                if (controlsWidth > toolbarWidth) {
                    if (this._toolbarSizeInfos.length > 0) {
                        const controlsThatFit = [...this._toolbarSizeInfos].reverse().reduce((prev, cur) => {
                            if (skipControls.indexOf(cur.id) < 0) {
                                if (controlsWidth > toolbarWidth) {
                                    controlsWidth -= cur.width;
                                }
                                else {
                                    prev.push(cur);
                                }
                            }
                            return prev;
                        }, []).reverse();
                        this._setControlsThatFit(controlsThatFit, skipControls);
                    }
                }
                else {
                    if (this._defaultVisibleToolSizeInfos) {
                        const currentTools = this._toolbarSizeInfos.reduce((prev, cur) => {
                            prev.push(cur.id);
                            return prev;
                        }, []);
                        let forceFinish = false;
                        const controlsThatFit = [...this._defaultVisibleToolSizeInfos].reduce((prev, cur) => {
                            if (!forceFinish && skipControls.indexOf(cur.id) < 0 &&
                                (currentTools.indexOf(cur.id) > -1 || (controlsWidth + cur.width) <= toolbarWidth)) {
                                if (currentTools.indexOf(cur.id) < 0) {
                                    controlsWidth += cur.width;
                                }
                                prev.push(cur);
                            }
                            else if (skipControls.indexOf(cur.id) < 0 && (controlsWidth + cur.width) > toolbarWidth) {
                                // exit the first time we evalute this as true...otherwise it will add the next control that will fit
                                // and not preserve the overall order of controls
                                forceFinish = true;
                            }
                            return prev;
                        }, []);
                        this._setControlsThatFit(controlsThatFit, skipControls);
                    }
                }
            }, 250);
        }
    }
    /**
     * Validate if controls that fit the current display has changed or
     * is different from what is currently displayed
     * @param _setControlsThatFit
     * @param skipControls
     * @protected
     */
    _setControlsThatFit(controlsThatFit, skipControls) {
        let update = JSON.stringify(controlsThatFit) !== JSON.stringify(this._controlsThatFit);
        const actionbar = document.getElementById("solutions-action-bar");
        actionbar?.childNodes?.forEach((n) => {
            if (skipControls.indexOf(n.id) < 0 && !update) {
                update = this._controlsThatFit.map(c => c.id).indexOf(n.id) < 0;
            }
        });
        if (update) {
            this._controlsThatFit = [...controlsThatFit];
        }
    }
    /**
     * Get the id and size for the toolbars current items
     * @protected
     */
    _setToolbarSizeInfos() {
        let hasWidth = false;
        this._toolbarSizeInfos = [];
        this._toolbar.childNodes.forEach((c, i) => {
            // handle the action bar
            if (i === 0) {
                c.childNodes.forEach((actionbarChild) => {
                    this._toolbarSizeInfos.push({
                        id: actionbarChild.id,
                        width: actionbarChild.offsetWidth
                    });
                    if (!hasWidth) {
                        hasWidth = actionbarChild.offsetWidth > 0;
                    }
                });
            }
            else if (!c.referenceElement) {
                // skip tooltips
                this._toolbarSizeInfos.push({
                    id: c.id,
                    width: c.offsetWidth
                });
                if (!hasWidth) {
                    hasWidth = c.offsetWidth > 0;
                }
            }
        });
        if (hasWidth && !this._defaultVisibleToolSizeInfos) {
            this._defaultVisibleToolSizeInfos = [...this._toolbarSizeInfos];
        }
    }
    /**
     * Gets a row of controls that can be used for various interactions with the table
     *
     * @returns The dom node that contains the controls
     * @protected
     */
    _getActionBar() {
        const mapPickerClass = this.mapInfos?.length > 1 ? "" : "display-none";
        const containerClass = this.isMapLayout ? "display-flex" : "display-block";
        const mobileClass = this.isMobile ? "border-top" : "";
        const headerElements = this.isMapLayout ? "" : "display-none";
        return (h("calcite-action-bar", { class: containerClass, expandDisabled: true, expanded: true, id: this._getId("bar"), layout: "horizontal" }, h("map-picker", { class: mapPickerClass, isMapLayout: this.isMapLayout, mapInfos: this.mapInfos, ref: (el) => this._mapPicker = el }), h("div", { class: `mapView-header display-flex ${headerElements}` }, h("div", { class: `border-end ${containerClass} ${mobileClass}`, id: "solutions-map-layer-picker-container" }, this.mapView && h("map-layer-picker", { appearance: "transparent", defaultLayerId: this.defaultLayerId, display: "inline-flex", height: 50, isMobile: this.isMobile, mapView: this.mapView, onlyShowUpdatableLayers: this.onlyShowUpdatableLayers, placeholderIcon: "layers", ref: (el) => this._mapLayerPicker = el, scale: "l", selectedIds: this.selectedLayer ? [this.selectedLayer.id] : [], showSingleLayerAsLabel: true, showTables: true, showTablesDisabled: true, type: "dropdown" }))), !this.isMobile && this.isMapLayout ? this._getActions() : undefined));
    }
    /**
     * Get a list of toolInfos that should display in the dropdown
     *
     * @param id string the id for the dropdown and its tooltip
     *
     * @returns VNode the dropdown node
     * @protected
     */
    _getDropdown(id) {
        const dropdownItems = this._getDropdownItems();
        return dropdownItems.length > 0 ? (h("calcite-dropdown", { closeOnSelectDisabled: true, disabled: this.selectedLayer === undefined, id: "solutions-more", onCalciteDropdownBeforeClose: () => this._forceShowHide(), ref: (el) => this._moreDropdown = el }, h("calcite-action", { appearance: "solid", id: id, label: "", onClick: () => this._closeShowHide(), slot: "trigger", text: "" }, h("calcite-button", { appearance: "transparent", iconEnd: "chevron-down", kind: "neutral" }, this._translations.more)), h("calcite-dropdown-group", { "selection-mode": "none" }, dropdownItems.map(item => {
            return (h("calcite-dropdown-group", { class: item.disabled ? "disabled" : "", selectionMode: "none" }, h("calcite-dropdown-item", { disabled: item.loading, iconStart: item.icon, id: "solutions-subset-list", onClick: item.func }, item.loading ? (h("div", { class: "display-flex" }, h("calcite-loader", { inline: true, label: item.label, scale: "m" }), item.label)) : item.label)));
        })))) : undefined;
    }
    /**
     * Get an action and tooltip for share
     *
     * @param icon string the name of the icon to display, will also be used in its id
     *
     * @returns VNode The node representing the DOM element that will contain the action
     */
    _getShare(icon) {
        return (h("div", { class: "share-action", id: this._getId(icon) }, h("instant-apps-social-share", { autoUpdateShareUrl: false, class: "instant-app-share", embed: this.shareIncludeEmbed, popoverButtonIconScale: "s", ref: el => {
                this._shareNode = el;
                this._updateShareUrl();
            }, scale: "m", shareButtonColor: "neutral", shareButtonType: "action", socialMedia: this.shareIncludeSocial, view: this.mapView }), this._getToolTip("bottom", icon, this._translations.share)));
    }
    /**
     * Called each time the values that are used for custom url params change
     */
    _updateShareUrl() {
        const url = this._shareNode?.shareUrl;
        if (!url) {
            return;
        }
        const urlObj = new URL(url);
        //set the additional search params
        if (this._loadedId) {
            urlObj.searchParams.set("webmap", this._loadedId);
        }
        else {
            urlObj.searchParams.delete("webmap");
        }
        if (this.selectedLayer?.id) {
            urlObj.searchParams.set("layer", this.selectedLayer.id);
        }
        else {
            urlObj.searchParams.delete("layer");
        }
        if (this.selectedFeaturesIds?.length > 0) {
            urlObj.searchParams.set("oid", this.selectedFeaturesIds.join(","));
        }
        else {
            urlObj.searchParams.delete("oid");
        }
        urlObj.searchParams.set("applayout", this.appLayout);
        this._shareNode.shareUrl = urlObj.href;
    }
    /**
     * Open show/hide dropdown
     * @protected
     */
    _closeShowHide() {
        this._showHideOpen = false;
    }
    /**
     * Get a list of toolInfos that should display in the dropdown
     *
     * @returns IToolInfo[] the list of toolInfos that should display in the dropdown
     * @protected
     */
    _getDropdownItems() {
        return this._toolInfos?.filter(toolInfo => toolInfo && toolInfo.isOverflow);
    }
    /**
     * Get the full list of toolInfos.
     * Order is important. They should be listed in the order they should display in the UI from
     * Left to Right for the action bar and Top to Bottom for the dropdown.
     * @protected
     */
    _initToolInfos() {
        const featuresSelected = this.selectedFeaturesIds?.length > 0;
        const hasFilterExpressions = this._hasFilterExpressions();
        // hide multiple edits for R03
        const showMultipleEdits = this.selectedFeaturesIds?.length > 1 && false;
        if (this._translations) {
            this._toolInfos = [
                {
                    active: false,
                    icon: "zoom-to-object",
                    indicator: false,
                    label: this._translations.zoom,
                    func: () => this._zoom(),
                    disabled: !featuresSelected,
                    isOverflow: false
                },
                hasFilterExpressions ? {
                    active: false,
                    icon: "filter",
                    indicator: false,
                    label: this._translations.filters,
                    func: () => this._toggleFilter(),
                    disabled: false,
                    isOverflow: false
                } : undefined,
                showMultipleEdits ? {
                    active: false,
                    icon: "pencil",
                    indicator: false,
                    label: this._translations.editMultiple,
                    func: () => alert(this._translations.editMultiple),
                    disabled: !showMultipleEdits,
                    isOverflow: false,
                } : undefined,
                {
                    active: false,
                    icon: "refresh",
                    indicator: false,
                    label: this._translations.refresh,
                    func: () => this.selectedLayer.refresh(),
                    disabled: false,
                    isOverflow: false
                },
                {
                    active: false,
                    icon: "erase",
                    indicator: false,
                    label: this._translations.clearSelection,
                    func: () => this.clearSelection.emit(),
                    disabled: !featuresSelected,
                    isOverflow: false
                }
            ];
            this._defaultVisibleToolSizeInfos = undefined;
        }
    }
    /**
     * Update actions active prop based on a stored value
     * @protected
     */
    _validateActiveActions() {
        const activeDependant = [
            "filter"
        ];
        this._toolInfos?.forEach(ti => {
            if (ti && activeDependant.indexOf(ti.icon) > -1) {
                if (ti.icon === "filter") {
                    ti.indicator = this._filterActive;
                }
            }
        });
    }
    /**
     * Update actions enabled prop based on number of selected indexes
     * @protected
     */
    _validateEnabledActions() {
        const featuresSelected = this.selectedFeaturesIds?.length > 0;
        const showMultipleEdits = this.selectedFeaturesIds?.length > 1 && this.selectedLayer?.capabilities?.operations?.supportsUpdate;
        const selectionDependant = [
            "zoom-to-object",
            "pencil",
            "erase"
        ];
        this._toolInfos?.forEach(ti => {
            if (ti && selectionDependant.indexOf(ti.icon) > -1) {
                // disable the pencil icon if multiple features are not selected
                // For other icons disable them if any feature is not selected
                ti.disabled = ti.icon === "pencil" ? !showMultipleEdits : !featuresSelected;
            }
        });
    }
    /**
     * Add/remove the home widget base on enableHome prop
     *
     * @protected
     */
    _initHome() {
        if (this.enableHome) {
            this._homeWidget = new this.Home({
                view: this.mapView
            });
            this.mapView.ui.add(this._homeWidget, { position: this.homeZoomPosition, index: this.homeZoomIndex });
            const size = this.homeZoomToolsSize === "s" ? "32px" : this.homeZoomToolsSize === "m" ? "40px" : "48px";
            this._homeWidget.domNode.style.height = size;
            this._homeWidget.domNode.style.width = size;
        }
        else if (this._homeWidget) {
            this.mapView.ui.remove(this._homeWidget);
        }
    }
    /**
     * Toggle show/hide dropdown
     */
    _toggleShowHide() {
        this._showHideOpen = !this._showHideOpen;
    }
    /**
     * Open show/hide dropdown
     */
    _forceShowHide() {
        if (this._moreDropdown) {
            this._moreDropdown.open = this._showHideOpen;
        }
    }
    /**
     * Close show/hide dropdown when the user clicks outside of it
     */
    _handleDocumentClick(e) {
        const id = e.target?.id;
        if (id === "solutions-subset-list") {
            this._moreDropdown.open = true;
        }
        else if (this._showHideOpen && id !== "solutions-subset-list" && id !== "solutions-more" && id !== "chevron-down") {
            if (this._moreDropdown) {
                this._showHideOpen = false;
                this._moreDropdown.open = false;
            }
        }
        // if clicked on map picker then toggle the dropdown
        if (e.target.tagName === 'MAP-PICKER') {
            this._mapListExpanded = !this._mapListExpanded;
            void this._mapPicker.toggle(this._mapListExpanded);
        }
        // if clicked on other place then just close the dropdown
        if (e.target.tagName !== 'MAP-PICKER') {
            this._mapListExpanded = false;
            void this._mapPicker.close();
        }
    }
    /**
     * Zoom to all selected features
     *
     * @returns a promise that will resolve when the operation is complete
     */
    async _zoom() {
        if (this.selectedLayer) {
            const selectedLayerView = await getFeatureLayerView(this.mapView, this.selectedLayer.id);
            await goToSelection(this.selectedFeaturesIds, selectedLayerView, this.mapView, true, undefined, this.zoomToScale);
        }
    }
    /**
     * toggle the filter
     * @protected
     */
    async _toggleFilter() {
        this.toggleFilter.emit();
    }
    /**
     * Return true when we have at least 1 layer expression for the current layer
     *
     * @returns boolean
     */
    _hasFilterExpressions() {
        let layerExpressions;
        if (this.mapInfo?.filterConfig?.layerExpressions && this.selectedLayer?.id) {
            layerExpressions = this.mapInfo.filterConfig.layerExpressions.filter((exp) => exp.id === this.selectedLayer.id);
        }
        return layerExpressions?.length > 0;
    }
    /**
     * Get the actions that are used for various interactions with the table
     *
     * @returns VNode[] the action nodes
     */
    _getActions() {
        const actions = this._getActionItems();
        return actions?.reduce((prev, cur) => {
            if (cur && !cur.isOverflow) {
                prev.push(this._getAction(cur.active, cur.icon, cur.indicator, cur.label, cur.func, cur.disabled, cur.loading));
            }
            return prev;
        }, []);
    }
    /**
     * Get a tooltip
     *
     * @param placement string where the tooltip should display
     * @param referenceElement string the element the tooltip will be associated with
     * @param text string the text to display in the tooltip
     *
     * @returns VNode The tooltip node
     */
    _getToolTip(placement, referenceElement, text) {
        return document.getElementById(referenceElement) ? (h("calcite-tooltip", { placement: placement, "reference-element": "map-" + referenceElement }, h("span", null, text))) : undefined;
    }
    /**
     * Get a list of toolInfos that should display outside of the dropdown
     *
     * @returns IToolInfo[] the list of toolInfos that should not display in the overflow dropdown
     */
    _getActionItems() {
        return this._toolInfos?.filter(toolInfo => toolInfo && !toolInfo.isOverflow);
    }
    /**
     * Get an action and tooltip
     *
     * @param active boolean if true the icon is in use
     * @param icon string the name of the icon to display, will also be used as the id
     * @param indicator if true the icon will shown using indicator
     * @param label string the text to display and label the action
     * @param func any the function to execute
     * @param disabled boolean when true the user will not be able to interact with the action
     * @param loading if true loading indicator will shown
     * @param slot slot for the action
     *
     * @returns VNode The node representing the DOM element that will contain the action
     */
    _getAction(active, icon, indicator, label, func, disabled, loading, slot) {
        const _disabled = this.selectedLayer === undefined ? true : disabled;
        return (h("div", { class: "display-flex", id: this._getId(icon), slot: slot }, h("calcite-action", { active: active, appearance: "solid", disabled: _disabled, icon: icon, id: "map-" + icon, indicator: indicator, label: label, loading: loading, onClick: func, text: label, textEnabled: true }), this._getToolTip("bottom", icon, label)));
    }
    /**
     * Get an id with a prefix to the user supplied value
     *
     * @param id the unique value for the id
     *
     * @returns the new id with the prefix value
     */
    _getId(id) {
        return `solutions-action-${id}`;
    }
    /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get is() { return "map-card"; }
    static get originalStyleUrls() {
        return {
            "$": ["map-card.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["map-card.css"]
        };
    }
    static get properties() {
        return {
            "appLayout": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "AppLayout",
                    "resolved": "\"mapView\" | \"splitView\" | \"tableView\"",
                    "references": {
                        "AppLayout": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::AppLayout"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "AppLayout: the current app layout"
                },
                "attribute": "app-layout",
                "reflect": false
            },
            "appProxies": {
                "type": "any",
                "mutable": false,
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Array of objects containing proxy information for premium platform services."
                },
                "attribute": "app-proxies",
                "reflect": false
            },
            "defaultWebmapId": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "string: Item ID of the web map that should be selected by default when the app loads"
                },
                "attribute": "default-webmap-id",
                "reflect": false,
                "defaultValue": "\"\""
            },
            "defaultLayerId": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "string: when provided this layer ID will be used when the app loads"
                },
                "attribute": "default-layer-id",
                "reflect": false
            },
            "enableHome": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: when true the home widget will be available"
                },
                "attribute": "enable-home",
                "reflect": false
            },
            "enableLegend": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: when true the legend widget will be available"
                },
                "attribute": "enable-legend",
                "reflect": false
            },
            "enableFloorFilter": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: when true the floor filter widget will be available"
                },
                "attribute": "enable-floor-filter",
                "reflect": false
            },
            "enableFullscreen": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: when true the fullscreen widget will be available"
                },
                "attribute": "enable-fullscreen",
                "reflect": false
            },
            "enableShare": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: when true the share widget will be available"
                },
                "attribute": "enable-share",
                "reflect": false,
                "defaultValue": "false"
            },
            "enableSingleExpand": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: when true map tools will be displayed within a single expand/collapse widget\r\nwhen false widgets will be loaded individually into expand widgets"
                },
                "attribute": "enable-single-expand",
                "reflect": false,
                "defaultValue": "true"
            },
            "enableSearch": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: when true the search widget will be available"
                },
                "attribute": "enable-search",
                "reflect": false
            },
            "enableBasemap": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: when true the basemap widget will be available"
                },
                "attribute": "enable-basemap",
                "reflect": false
            },
            "basemapConfig": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "IBasemapConfig",
                    "resolved": "IBasemapConfig",
                    "references": {
                        "IBasemapConfig": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IBasemapConfig"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "IBasemapConfig: List of any basemaps to filter out from the basemap widget"
                }
            },
            "hidden": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: When true the map display will be hidden"
                },
                "attribute": "hidden",
                "reflect": false
            },
            "homeZoomIndex": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "number: The placement index of the home and zoom components. This index shows where to place the component relative to other components.\r\nFor example a value of 0 would place it topmost when position is top-*, leftmost for bottom-left and right most for bottom-right."
                },
                "attribute": "home-zoom-index",
                "reflect": false,
                "defaultValue": "3"
            },
            "homeZoomPosition": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "__esri.UIPosition",
                    "resolved": "\"bottom-leading\" | \"bottom-left\" | \"bottom-right\" | \"bottom-trailing\" | \"manual\" | \"top-leading\" | \"top-left\" | \"top-right\" | \"top-trailing\"",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "__esri.UIPosition: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-UI.html#UIPosition\r\nThe position details for the Home and Zoom tools"
                },
                "attribute": "home-zoom-position",
                "reflect": false,
                "defaultValue": "\"top-left\""
            },
            "homeZoomToolsSize": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"s\" | \"m\" | \"l\"",
                    "resolved": "\"l\" | \"m\" | \"s\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "\"s\" | \"m\" | \"l\": Used for Zoom and Home tools"
                },
                "attribute": "home-zoom-tools-size",
                "reflect": false,
                "defaultValue": "\"m\""
            },
            "mapInfos": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "IMapInfo[]",
                    "resolved": "IMapInfo[]",
                    "references": {
                        "IMapInfo": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IMapInfo"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "IMapInfo[]: array of map infos (name and id)"
                },
                "defaultValue": "[]"
            },
            "mapWidgetsIndex": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "number: The placement index of the map widgets (legend, basemap, fullscreen etc). This index shows where to place the component relative to other components.\r\nFor example a value of 0 would place it topmost when position is top-*, leftmost for bottom-left and right most for bottom-right."
                },
                "attribute": "map-widgets-index",
                "reflect": false,
                "defaultValue": "0"
            },
            "mapWidgetsPosition": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "__esri.UIPosition",
                    "resolved": "\"bottom-leading\" | \"bottom-left\" | \"bottom-right\" | \"bottom-trailing\" | \"manual\" | \"top-leading\" | \"top-left\" | \"top-right\" | \"top-trailing\"",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "__esri.UIPosition: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-UI.html#UIPosition\r\nThe position details for the Home and Zoom tools"
                },
                "attribute": "map-widgets-position",
                "reflect": false,
                "defaultValue": "\"top-right\""
            },
            "mapWidgetsSize": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"s\" | \"m\" | \"l\"",
                    "resolved": "\"l\" | \"m\" | \"s\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "\"s\" | \"m\" | \"l\": Used for optional map tool widget"
                },
                "attribute": "map-widgets-size",
                "reflect": false,
                "defaultValue": "\"m\""
            },
            "mapView": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.MapView",
                    "resolved": "MapView",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html"
                }
            },
            "stackTools": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: When true the map widget tools will have no margin between them.\r\nWhen false the map widget tools will have a margin between them."
                },
                "attribute": "stack-tools",
                "reflect": false,
                "defaultValue": "true"
            },
            "theme": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "theme",
                    "resolved": "\"dark\" | \"light\"",
                    "references": {
                        "theme": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::theme"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "theme: \"light\" | \"dark\" theme to be used"
                },
                "attribute": "theme",
                "reflect": false
            },
            "toolOrder": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "string[]",
                    "resolved": "string[]",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "\r\nValid tools: \"legend\", \"search\", \"fullscreen\", \"basemap\", \"floorfilter\""
                }
            },
            "isMapLayout": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: When true map will shown is full screen"
                },
                "attribute": "is-map-layout",
                "reflect": false
            },
            "shareIncludeEmbed": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: When true the share options will include embed option"
                },
                "attribute": "share-include-embed",
                "reflect": false
            },
            "shareIncludeSocial": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: When true the share options will include social media sharing"
                },
                "attribute": "share-include-social",
                "reflect": false
            },
            "selectedFeaturesIds": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "number[]",
                    "resolved": "number[]",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "number[]: A list of ids that are currently selected"
                }
            },
            "selectedLayer": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.FeatureLayer",
                    "resolved": "FeatureLayer",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "__esri.FeatureLayer: Selected layer"
                }
            },
            "zoomToScale": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "number: default scale to zoom to when zooming to a single point feature"
                },
                "attribute": "zoom-to-scale",
                "reflect": false
            },
            "onlyShowUpdatableLayers": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: When true only editable layers that support the update capability will be available"
                },
                "attribute": "only-show-updatable-layers",
                "reflect": false
            },
            "isMobile": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "When true the component will render an optimized view for mobile devices"
                },
                "attribute": "is-mobile",
                "reflect": false
            },
            "mapInfo": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "IMapInfo",
                    "resolved": "IMapInfo",
                    "references": {
                        "IMapInfo": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IMapInfo"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "IMapInfo: key configuration details about the current map"
                }
            }
        };
    }
    static get states() {
        return {
            "_translations": {},
            "_searchConfiguration": {},
            "_webMapInfo": {},
            "_showHideOpen": {},
            "_toolInfos": {},
            "_controlsThatFit": {}
        };
    }
    static get events() {
        return [{
                "method": "mapChanged",
                "name": "mapChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when a new map is loaded"
                },
                "complexType": {
                    "original": "IMapChange",
                    "resolved": "IMapChange",
                    "references": {
                        "IMapChange": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IMapChange"
                        }
                    }
                }
            }, {
                "method": "beforeMapChanged",
                "name": "beforeMapChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted before a new map is loaded"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "toggleFilter",
                "name": "toggleFilter",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when filter action is clicked"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "clearSelection",
                "name": "clearSelection",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when clear selection button is clicked"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "resetFilter": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Reset the filter",
                    "tags": []
                }
            },
            "updateFilterState": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "updates the filter",
                    "tags": []
                }
            },
            "updateLayer": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "updates the layer in map layer picker",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "appLayout",
                "methodName": "appLayoutWatchHandler"
            }, {
                "propName": "enableHome",
                "methodName": "enableHomeWatchHandler"
            }, {
                "propName": "enableShare",
                "methodName": "enableShareWatchHandler"
            }, {
                "propName": "mapView",
                "methodName": "mapViewWatchHandler"
            }, {
                "propName": "selectedLayer",
                "methodName": "selectedLayerWatchHandler"
            }, {
                "propName": "selectedFeaturesIds",
                "methodName": "selectedFeaturesIdsWatchHandler"
            }, {
                "propName": "_controlsThatFit",
                "methodName": "_controlsThatFitWatchHandler"
            }];
    }
    static get listeners() {
        return [{
                "name": "mapInfoChange",
                "method": "mapInfoChange",
                "target": "window",
                "capture": false,
                "passive": false
            }, {
                "name": "noLayersFound",
                "method": "noLayersFound",
                "target": "window",
                "capture": false,
                "passive": false
            }, {
                "name": "layerSelectionChange",
                "method": "layerSelectionChange",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
}
