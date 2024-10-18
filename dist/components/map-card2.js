/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { c as getFeatureLayerView, b as goToSelection } from './mapViewUtils.js';
import { d as defineCustomElement$A } from './basemap-gallery2.js';
import { d as defineCustomElement$z } from './action.js';
import { d as defineCustomElement$y } from './action-bar.js';
import { d as defineCustomElement$x } from './action-group.js';
import { d as defineCustomElement$w } from './action-menu.js';
import { d as defineCustomElement$v } from './button.js';
import { d as defineCustomElement$u } from './chip.js';
import { d as defineCustomElement$t } from './combobox.js';
import { d as defineCustomElement$s } from './combobox-item.js';
import { d as defineCustomElement$r } from './dropdown.js';
import { d as defineCustomElement$q } from './dropdown-group.js';
import { d as defineCustomElement$p } from './dropdown-item.js';
import { d as defineCustomElement$o } from './filter2.js';
import { d as defineCustomElement$n } from './handle.js';
import { d as defineCustomElement$m } from './icon.js';
import { d as defineCustomElement$l } from './input.js';
import { d as defineCustomElement$k } from './label2.js';
import { d as defineCustomElement$j } from './list.js';
import { d as defineCustomElement$i } from './list-item.js';
import { d as defineCustomElement$h } from './loader.js';
import { d as defineCustomElement$g } from './notice.js';
import { d as defineCustomElement$f } from './option.js';
import { d as defineCustomElement$e } from './popover.js';
import { d as defineCustomElement$d } from './progress.js';
import { d as defineCustomElement$c } from './scrim.js';
import { d as defineCustomElement$b } from './select.js';
import { d as defineCustomElement$a } from './stack.js';
import { d as defineCustomElement$9 } from './tooltip.js';
import { d as defineCustomElement$8 } from './floor-filter2.js';
import { d as defineCustomElement$7 } from './instant-apps-social-share2.js';
import { d as defineCustomElement$6 } from './map-fullscreen2.js';
import { d as defineCustomElement$5 } from './map-layer-picker2.js';
import { d as defineCustomElement$4 } from './map-legend2.js';
import { d as defineCustomElement$3 } from './map-picker2.js';
import { d as defineCustomElement$2 } from './map-search2.js';
import { d as defineCustomElement$1 } from './map-tools2.js';

function isHTTP(url) {
    return url?.indexOf("http://") !== -1;
}
function upgradeToHttps(url) {
    return isHTTP(url) ? url.replace(/^http:\/\//, "https://") : url;
}

function joinAppProxies(map, config, appProxies) {
    if (appProxies) {
        appProxies.forEach((proxy) => {
            map.allLayers.forEach((layer) => {
                if (layer && layer.url === proxy.sourceUrl) {
                    // directly change the layer url to the proxy url
                    layer.url = upgradeToHttps(proxy.proxyUrl);
                    // Replace the layer's portalItem's url with the proxy url too, otherwise anonymous viewers get a sign-in prompt.
                    if (layer.portalItem) {
                        layer.portalItem.when(() => {
                            // layer.portalItem exists, see above. Not sure why typescript thinks it could be undefined here.
                            layer.portalItem.url = upgradeToHttps(proxy.proxyUrl);
                        });
                    }
                    // also add a request interceptor in case we missed any requests to the original url, or the jsapi team adds new requests in the future.
                    config.request?.interceptors?.push({
                        // this interceptor only applies to requests made to this proxy's sourceUrl (the layer's original url).
                        urls: proxy.sourceUrl,
                        before: (params) => {
                            // change requests from the original url to the proxy url
                            if (params.url && params.url === proxy.sourceUrl) {
                                params.url = upgradeToHttps(proxy.proxyUrl);
                            }
                        },
                    });
                }
            });
        });
    }
    return map;
}

const mapCardCss = ":host{display:block;--calcite-label-margin-bottom:0;--calcite-block-padding:0}.map-height{height:calc(100% - 53px)}.height-full{height:100%}.height-49-px{height:49px}.box-shadow{box-shadow:none !important}.visibility-hidden-1{visibility:hidden;height:1px;}.display-none{display:none}.display-block{display:block}";
const MapCardStyle0 = mapCardCss;

const MapCard = /*@__PURE__*/ proxyCustomElement(class MapCard extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.mapChanged = createEvent(this, "mapChanged", 7);
        this.beforeMapChanged = createEvent(this, "beforeMapChanged", 7);
        this.toggleFilter = createEvent(this, "toggleFilter", 7);
        this.clearSelection = createEvent(this, "clearSelection", 7);
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
    get el() { return this; }
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
    static get watchers() { return {
        "appLayout": ["appLayoutWatchHandler"],
        "enableHome": ["enableHomeWatchHandler"],
        "enableShare": ["enableShareWatchHandler"],
        "mapView": ["mapViewWatchHandler"],
        "selectedLayer": ["selectedLayerWatchHandler"],
        "selectedFeaturesIds": ["selectedFeaturesIdsWatchHandler"],
        "_controlsThatFit": ["_controlsThatFitWatchHandler"]
    }; }
    static get style() { return MapCardStyle0; }
}, [0, "map-card", {
        "appLayout": [1, "app-layout"],
        "appProxies": [8, "app-proxies"],
        "defaultWebmapId": [1, "default-webmap-id"],
        "defaultLayerId": [1, "default-layer-id"],
        "enableHome": [4, "enable-home"],
        "enableLegend": [4, "enable-legend"],
        "enableFloorFilter": [4, "enable-floor-filter"],
        "enableFullscreen": [4, "enable-fullscreen"],
        "enableShare": [4, "enable-share"],
        "enableSingleExpand": [4, "enable-single-expand"],
        "enableSearch": [4, "enable-search"],
        "enableBasemap": [4, "enable-basemap"],
        "basemapConfig": [16],
        "hidden": [4],
        "homeZoomIndex": [2, "home-zoom-index"],
        "homeZoomPosition": [1, "home-zoom-position"],
        "homeZoomToolsSize": [1, "home-zoom-tools-size"],
        "mapInfos": [16],
        "mapWidgetsIndex": [2, "map-widgets-index"],
        "mapWidgetsPosition": [1, "map-widgets-position"],
        "mapWidgetsSize": [1, "map-widgets-size"],
        "mapView": [16],
        "stackTools": [4, "stack-tools"],
        "theme": [1],
        "toolOrder": [16],
        "isMapLayout": [4, "is-map-layout"],
        "shareIncludeEmbed": [4, "share-include-embed"],
        "shareIncludeSocial": [4, "share-include-social"],
        "selectedFeaturesIds": [16],
        "selectedLayer": [16],
        "zoomToScale": [2, "zoom-to-scale"],
        "onlyShowUpdatableLayers": [4, "only-show-updatable-layers"],
        "isMobile": [4, "is-mobile"],
        "mapInfo": [16],
        "_translations": [32],
        "_searchConfiguration": [32],
        "_webMapInfo": [32],
        "_showHideOpen": [32],
        "_toolInfos": [32],
        "_controlsThatFit": [32],
        "resetFilter": [64],
        "updateFilterState": [64],
        "updateLayer": [64]
    }, [[8, "mapInfoChange", "mapInfoChange"], [8, "noLayersFound", "noLayersFound"], [8, "layerSelectionChange", "layerSelectionChange"]], {
        "appLayout": ["appLayoutWatchHandler"],
        "enableHome": ["enableHomeWatchHandler"],
        "enableShare": ["enableShareWatchHandler"],
        "mapView": ["mapViewWatchHandler"],
        "selectedLayer": ["selectedLayerWatchHandler"],
        "selectedFeaturesIds": ["selectedFeaturesIdsWatchHandler"],
        "_controlsThatFit": ["_controlsThatFitWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["map-card", "basemap-gallery", "calcite-action", "calcite-action-bar", "calcite-action-group", "calcite-action-menu", "calcite-button", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-dropdown", "calcite-dropdown-group", "calcite-dropdown-item", "calcite-filter", "calcite-handle", "calcite-icon", "calcite-input", "calcite-label", "calcite-list", "calcite-list-item", "calcite-loader", "calcite-notice", "calcite-option", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-select", "calcite-stack", "calcite-tooltip", "floor-filter", "instant-apps-social-share", "map-fullscreen", "map-layer-picker", "map-legend", "map-picker", "map-search", "map-tools"];
    components.forEach(tagName => { switch (tagName) {
        case "map-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MapCard);
            }
            break;
        case "basemap-gallery":
            if (!customElements.get(tagName)) {
                defineCustomElement$A();
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$z();
            }
            break;
        case "calcite-action-bar":
            if (!customElements.get(tagName)) {
                defineCustomElement$y();
            }
            break;
        case "calcite-action-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$x();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$w();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$v();
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$u();
            }
            break;
        case "calcite-combobox":
            if (!customElements.get(tagName)) {
                defineCustomElement$t();
            }
            break;
        case "calcite-combobox-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$s();
            }
            break;
        case "calcite-dropdown":
            if (!customElements.get(tagName)) {
                defineCustomElement$r();
            }
            break;
        case "calcite-dropdown-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$q();
            }
            break;
        case "calcite-dropdown-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$p();
            }
            break;
        case "calcite-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$o();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$n();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$m();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$l();
            }
            break;
        case "calcite-label":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "calcite-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "calcite-list-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-stack":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "floor-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "instant-apps-social-share":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "map-fullscreen":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "map-layer-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "map-legend":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "map-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "map-search":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "map-tools":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { MapCard as M, defineCustomElement as d };
