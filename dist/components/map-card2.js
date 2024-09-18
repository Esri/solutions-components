/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host, Fragment } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { c as getFeatureLayerView, b as goToSelection } from './mapViewUtils.js';
import { d as defineCustomElement$z } from './basemap-gallery2.js';
import { d as defineCustomElement$y } from './action.js';
import { d as defineCustomElement$x } from './action-bar.js';
import { d as defineCustomElement$w } from './action-group.js';
import { d as defineCustomElement$v } from './action-menu.js';
import { d as defineCustomElement$u } from './button.js';
import { d as defineCustomElement$t } from './chip.js';
import { d as defineCustomElement$s } from './combobox.js';
import { d as defineCustomElement$r } from './combobox-item.js';
import { d as defineCustomElement$q } from './dropdown.js';
import { d as defineCustomElement$p } from './dropdown-group.js';
import { d as defineCustomElement$o } from './dropdown-item.js';
import { d as defineCustomElement$n } from './filter2.js';
import { d as defineCustomElement$m } from './handle.js';
import { d as defineCustomElement$l } from './icon.js';
import { d as defineCustomElement$k } from './input.js';
import { d as defineCustomElement$j } from './label2.js';
import { d as defineCustomElement$i } from './list.js';
import { d as defineCustomElement$h } from './list-item.js';
import { d as defineCustomElement$g } from './loader.js';
import { d as defineCustomElement$f } from './notice.js';
import { d as defineCustomElement$e } from './option.js';
import { d as defineCustomElement$d } from './popover.js';
import { d as defineCustomElement$c } from './progress.js';
import { d as defineCustomElement$b } from './scrim.js';
import { d as defineCustomElement$a } from './select.js';
import { d as defineCustomElement$9 } from './stack.js';
import { d as defineCustomElement$8 } from './tooltip.js';
import { d as defineCustomElement$7 } from './floor-filter2.js';
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

const mapCardCss = ":host{display:block;--calcite-label-margin-bottom:0;--calcite-block-padding:0}.map-height{height:calc(100% - 51px)}.height-full{height:100%}.height-50-px{height:50px}.box-shadow{box-shadow:none !important}.visibility-hidden-1{visibility:hidden;height:1px;}.display-none{display:none}";
const MapCardStyle0 = mapCardCss;

const MapCard = /*@__PURE__*/ proxyCustomElement(class MapCard extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.mapChanged = createEvent(this, "mapChanged", 7);
        this.beforeMapChanged = createEvent(this, "beforeMapChanged", 7);
        this.toggleFilter = createEvent(this, "toggleFilter", 7);
        this.appProxies = undefined;
        this.defaultWebmapId = "";
        this.defaultLayerId = undefined;
        this.enableHome = undefined;
        this.enableLegend = undefined;
        this.enableFloorFilter = undefined;
        this.enableFullscreen = undefined;
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
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Add/remove home widget
     */
    enableHomeWatchHandler() {
        this._initHome();
    }
    /**
     * watch for changes in layer view and verify if it has editing enabled
     */
    async selectedLayerWatchHandler() {
        await this.selectedLayer?.when(async () => {
            this._definitionExpression = this.selectedLayer.definitionExpression;
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
    async filterReset() {
        this._filterActive = false;
    }
    /**
     * updates the filter
     */
    async updateFilter() {
        this._filterActive = this._definitionExpression !== this.selectedLayer.definitionExpression;
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
    }
    /**
     * Renders the component.
     */
    render() {
        const mapContainerClass = this.isMapLayout ? "display-flex height-50-px" : "";
        const mapClass = this.hidden ? "visibility-hidden-1" : "";
        const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
        const mapPickerClass = this.mapInfos?.length > 1 ? "" : "display-none";
        const mapHeightClass = this.mapInfos?.length > 1 ? "map-height" : "height-full";
        const containerClass = this.isMobile ? "width-full" : "";
        const mobileClass = this.isMobile ? "border-top" : "";
        const headerElements = this.isMapLayout ? "" : "display-none";
        return (h(Host, { key: '31938d03953ffbb7d1156bd4f8136836e2c29a6a' }, h("div", { key: 'c298d792ed46da31300944e7dedacf1f0c971cdb', class: `${mapContainerClass}` }, h("map-picker", { key: '10a9995b86c8f3ce04dca4046354e3db3446c5cb', class: mapPickerClass, isMapLayout: this.isMapLayout, mapInfos: this.mapInfos, ref: (el) => this._mapPicker = el }), h("div", { key: '2e1b4ef40137122977f67bab1ebed51e27f3b0f8', class: `mapView-header display-flex ${headerElements}` }, h("div", { key: '982cd5b0077463609757b3eb4682e3b9482c8242', class: `border-end ${containerClass} ${mobileClass}`, id: "solutions-map-layer-picker-container" }, this.mapView && h("map-layer-picker", { key: '7bdce958962fe21a52dc2a3d41f0fdaa15863737', appearance: "transparent", defaultLayerId: this.defaultLayerId, display: "inline-flex", height: 50, isMobile: this.isMobile, mapView: this.mapView, onlyShowUpdatableLayers: this.onlyShowUpdatableLayers, placeholderIcon: "layers", scale: "l", selectedIds: this.selectedLayer ? [this.selectedLayer.id] : [], showSingleLayerAsLabel: true, showTables: true, type: "dropdown" })), this._getDropDownItem())), h("div", { key: '40a50c92853ab910a5a38c896e704a0acc6ced73', class: `${mapHeightClass} ${mapClass}`, ref: (el) => (this._mapDiv = el) }), h("map-tools", { key: 'f9219fcb363250623183df8fdf8c329b567ca7a6', basemapConfig: this.basemapConfig, class: `box-shadow ${themeClass}`, enableBasemap: this.enableBasemap, enableFloorFilter: this.enableFloorFilter, enableFullscreen: this.enableFullscreen, enableHome: this.enableHome, enableLegend: this.enableLegend, enableSearch: this.enableSearch, enableSingleExpand: this.enableSingleExpand, homeZoomToolsSize: this.homeZoomToolsSize, mapView: this.mapView, mapWidgetsSize: this.mapWidgetsSize, position: this.mapWidgetsPosition, ref: (el) => this._mapTools = el, searchConfiguration: this._searchConfiguration, stackTools: this.stackTools, toolOrder: this.toolOrder })));
    }
    /**
     * Called each time after the component is loaded
     */
    async componentDidRender() {
        document.onclick = (e) => this._handleDocumentClick(e);
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
        if (this._showHideOpen && id !== "solutions-subset-list" && id !== "solutions-more" && id !== "chevron-down") {
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
     * Get Dropdown action item
     * @returns Dropdown item
     */
    _getDropDownItem() {
        return (h("calcite-dropdown", { closeOnSelectDisabled: true, disabled: this.selectedLayer === undefined, id: "solutions-more", onCalciteDropdownBeforeClose: () => this._forceShowHide(), ref: (el) => this._moreDropdown = el, widthScale: "l" }, h("calcite-action", { appearance: "solid", id: 'solutions-more', label: "", onClick: () => this._toggleShowHide(), slot: "trigger", text: "" }, h("calcite-button", { appearance: "transparent", iconEnd: this._showHideOpen ? "chevron-up" : "chevron-down", kind: "neutral" }, this._translations.more)), h("calcite-dropdown-group", { selectionMode: "none" }, this._getDropDownItems())));
    }
    /**
     * Gets the dropdown items
     * @returns dropdown items
     */
    _getDropDownItems() {
        const featureSelected = this.selectedFeaturesIds?.length > 0;
        const showMultipleEdits = this.selectedFeaturesIds?.length > 1;
        const hasFilterExpressions = this._hasFilterExpressions();
        return (h(Fragment, null, h("calcite-dropdown-group", { selectionMode: "none" }, h("calcite-dropdown-item", { disabled: !showMultipleEdits, iconStart: "pencil", id: "solutions-subset-list", onClick: () => alert(this._translations.editMultiple) }, this._translations.editMultiple)), h("calcite-dropdown-group", { selectionMode: "none" }, h("calcite-dropdown-item", { iconStart: "refresh", id: "solutions-subset-list", onClick: () => { this.selectedLayer.refresh(); } }, this._translations.refresh)), h("calcite-dropdown-group", { selectionMode: "none" }, h("calcite-dropdown-item", { disabled: !featureSelected, iconStart: "zoom-to-object", id: "solutions-subset-list", onClick: this._zoom.bind(this) }, this._translations.zoom)), hasFilterExpressions &&
            h("calcite-dropdown-group", null, h("calcite-dropdown-item", { disabled: false, iconStart: "filter", id: "solutions-subset-list", onClick: this._toggleFilter.bind(this), selected: this._filterActive }, this._translations.filters))));
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
        "enableHome": ["enableHomeWatchHandler"],
        "selectedLayer": ["selectedLayerWatchHandler"]
    }; }
    static get style() { return MapCardStyle0; }
}, [0, "map-card", {
        "appProxies": [8, "app-proxies"],
        "defaultWebmapId": [1, "default-webmap-id"],
        "defaultLayerId": [1, "default-layer-id"],
        "enableHome": [4, "enable-home"],
        "enableLegend": [4, "enable-legend"],
        "enableFloorFilter": [4, "enable-floor-filter"],
        "enableFullscreen": [4, "enable-fullscreen"],
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
        "filterReset": [64],
        "updateFilter": [64]
    }, [[8, "mapInfoChange", "mapInfoChange"], [8, "noLayersFound", "noLayersFound"]], {
        "enableHome": ["enableHomeWatchHandler"],
        "selectedLayer": ["selectedLayerWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["map-card", "basemap-gallery", "calcite-action", "calcite-action-bar", "calcite-action-group", "calcite-action-menu", "calcite-button", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-dropdown", "calcite-dropdown-group", "calcite-dropdown-item", "calcite-filter", "calcite-handle", "calcite-icon", "calcite-input", "calcite-label", "calcite-list", "calcite-list-item", "calcite-loader", "calcite-notice", "calcite-option", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-select", "calcite-stack", "calcite-tooltip", "floor-filter", "map-fullscreen", "map-layer-picker", "map-legend", "map-picker", "map-search", "map-tools"];
    components.forEach(tagName => { switch (tagName) {
        case "map-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MapCard);
            }
            break;
        case "basemap-gallery":
            if (!customElements.get(tagName)) {
                defineCustomElement$z();
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$y();
            }
            break;
        case "calcite-action-bar":
            if (!customElements.get(tagName)) {
                defineCustomElement$x();
            }
            break;
        case "calcite-action-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$w();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$v();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$u();
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$t();
            }
            break;
        case "calcite-combobox":
            if (!customElements.get(tagName)) {
                defineCustomElement$s();
            }
            break;
        case "calcite-combobox-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$r();
            }
            break;
        case "calcite-dropdown":
            if (!customElements.get(tagName)) {
                defineCustomElement$q();
            }
            break;
        case "calcite-dropdown-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$p();
            }
            break;
        case "calcite-dropdown-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$o();
            }
            break;
        case "calcite-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$n();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$m();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$l();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "calcite-label":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "calcite-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "calcite-list-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-stack":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "floor-filter":
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
