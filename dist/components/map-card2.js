/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { d as defineCustomElement$o } from './basemap-gallery2.js';
import { d as defineCustomElement$n } from './action.js';
import { d as defineCustomElement$m } from './action-bar.js';
import { d as defineCustomElement$l } from './action-group.js';
import { d as defineCustomElement$k } from './action-menu.js';
import { d as defineCustomElement$j } from './button.js';
import { d as defineCustomElement$i } from './filter2.js';
import { d as defineCustomElement$h } from './handle.js';
import { d as defineCustomElement$g } from './icon.js';
import { d as defineCustomElement$f } from './input.js';
import { d as defineCustomElement$e } from './list.js';
import { d as defineCustomElement$d } from './list-item.js';
import { d as defineCustomElement$c } from './loader.js';
import { d as defineCustomElement$b } from './popover.js';
import { d as defineCustomElement$a } from './progress.js';
import { d as defineCustomElement$9 } from './scrim.js';
import { d as defineCustomElement$8 } from './stack.js';
import { d as defineCustomElement$7 } from './tooltip.js';
import { d as defineCustomElement$6 } from './floor-filter2.js';
import { d as defineCustomElement$5 } from './map-fullscreen2.js';
import { d as defineCustomElement$4 } from './map-legend2.js';
import { d as defineCustomElement$3 } from './map-picker2.js';
import { d as defineCustomElement$2 } from './map-search2.js';
import { d as defineCustomElement$1 } from './map-tools2.js';

const mapCardCss = ":host{display:block;--calcite-label-margin-bottom:0;--calcite-block-padding:0}.map-height{height:calc(100% - 51px)}.height-full{height:100%}.box-shadow{box-shadow:none !important}.visibility-hidden-1{visibility:hidden;height:1px;}.display-none{display:none}";

const MapCard = /*@__PURE__*/ proxyCustomElement(class MapCard extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.mapChanged = createEvent(this, "mapChanged", 7);
        this.beforeMapChanged = createEvent(this, "beforeMapChanged", 7);
        /**
         * boolean: When true the default map provided via url params has been loaded and should no longer override other maps
         */
        this._defaultWebmapHonored = false;
        /**
         * string: the id of map currently displayed
         */
        this._loadedId = "";
        this.defaultWebmapId = "";
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
        this._searchConfiguration = undefined;
        this._webMapInfo = undefined;
    }
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
     * Listen for changes to map info and load the appropriate map
     */
    async mapInfoChange(evt) {
        await this._loadMap(evt.detail);
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
        await this._initModules();
    }
    /**
     * Renders the component.
     */
    render() {
        var _a, _b;
        const mapClass = this.hidden ? "visibility-hidden-1" : "";
        const themeClass = this.theme === "dark" ? "calcite-mode-dark" : "calcite-mode-light";
        const mapPickerClass = ((_a = this.mapInfos) === null || _a === void 0 ? void 0 : _a.length) > 1 ? "" : "display-none";
        const mapHeightClass = ((_b = this.mapInfos) === null || _b === void 0 ? void 0 : _b.length) > 1 ? "map-height" : "height-full";
        return (h(Host, null, h("map-picker", { class: mapPickerClass, mapInfos: this.mapInfos, ref: (el) => this._mapPicker = el }), h("div", { class: `${mapHeightClass} ${mapClass}`, ref: (el) => (this._mapDiv = el) }), h("map-tools", { basemapConfig: this.basemapConfig, class: `box-shadow ${themeClass}`, enableBasemap: this.enableBasemap, enableFloorFilter: this.enableFloorFilter, enableFullscreen: this.enableFullscreen, enableHome: this.enableHome, enableLegend: this.enableLegend, enableSearch: this.enableSearch, enableSingleExpand: this.enableSingleExpand, homeZoomToolsSize: this.homeZoomToolsSize, mapView: this.mapView, mapWidgetsSize: this.mapWidgetsSize, position: this.mapWidgetsPosition, ref: (el) => this._mapTools = el, searchConfiguration: this._searchConfiguration, stackTools: this.stackTools, toolOrder: this.toolOrder })));
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
        const [WebMap, MapView, Home] = await loadModules([
            "esri/WebMap",
            "esri/views/MapView",
            "esri/widgets/Home"
        ]);
        this.WebMap = WebMap;
        this.MapView = MapView;
        this.Home = Home;
    }
    /**
     * Load the webmap for the provided webMapInfo
     *
     * @param webMapInfo the webmap id and name to load
     */
    async _loadMap(webMapInfo) {
        var _a;
        // on the first render use the default webmap id if provided otherwise use the first child of the provided mapInfos
        const loadDefaultMap = !this._defaultWebmapHonored && this.defaultWebmapId;
        const defaultMap = (_a = this.mapInfos) === null || _a === void 0 ? void 0 : _a.filter(i => i.id === this.defaultWebmapId);
        const mapConfigChanged = JSON.stringify(webMapInfo) !== JSON.stringify(this._webMapInfo);
        this._webMapInfo = loadDefaultMap && defaultMap ? defaultMap[0] :
            !(webMapInfo === null || webMapInfo === void 0 ? void 0 : webMapInfo.id) && this.mapInfos.length > 0 ? this.mapInfos[0] : webMapInfo;
        const id = this._webMapInfo.id;
        const isDefaultMap = loadDefaultMap && (webMapInfo === null || webMapInfo === void 0 ? void 0 : webMapInfo.id) === this.defaultWebmapId;
        if ((this._loadedId !== id && !loadDefaultMap) || isDefaultMap) {
            const webMap = new this.WebMap({
                portalItem: { id }
            });
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
            this._mapPicker.setMapByID(id);
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
    get el() { return this; }
    static get watchers() { return {
        "enableHome": ["enableHomeWatchHandler"]
    }; }
    static get style() { return mapCardCss; }
}, [0, "map-card", {
        "defaultWebmapId": [1, "default-webmap-id"],
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
        "_searchConfiguration": [32],
        "_webMapInfo": [32]
    }, [[8, "mapInfoChange", "mapInfoChange"]], {
        "enableHome": ["enableHomeWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["map-card", "basemap-gallery", "calcite-action", "calcite-action-bar", "calcite-action-group", "calcite-action-menu", "calcite-button", "calcite-filter", "calcite-handle", "calcite-icon", "calcite-input", "calcite-list", "calcite-list-item", "calcite-loader", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-stack", "calcite-tooltip", "floor-filter", "map-fullscreen", "map-legend", "map-picker", "map-search", "map-tools"];
    components.forEach(tagName => { switch (tagName) {
        case "map-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MapCard);
            }
            break;
        case "basemap-gallery":
            if (!customElements.get(tagName)) {
                defineCustomElement$o();
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$n();
            }
            break;
        case "calcite-action-bar":
            if (!customElements.get(tagName)) {
                defineCustomElement$m();
            }
            break;
        case "calcite-action-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$l();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "calcite-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-list-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-stack":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "floor-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "map-fullscreen":
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
