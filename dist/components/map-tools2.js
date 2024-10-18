/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { l as loadModules } from './loadModules.js';
import { d as defineCustomElement$9 } from './basemap-gallery2.js';
import { d as defineCustomElement$8 } from './action.js';
import { d as defineCustomElement$7 } from './icon.js';
import { d as defineCustomElement$6 } from './loader.js';
import { d as defineCustomElement$5 } from './tooltip.js';
import { d as defineCustomElement$4 } from './floor-filter2.js';
import { d as defineCustomElement$3 } from './map-fullscreen2.js';
import { d as defineCustomElement$2 } from './map-legend2.js';
import { d as defineCustomElement$1 } from './map-search2.js';

const mapToolsCss = ":host{display:block}.display-none{display:none}.margin-top-1-2{margin-top:0.5rem}.square-32{width:32px;height:32px}.square-40{width:40px;height:40px}.square-48{width:48px;height:48px}.width-40{width:40px}.square-40-41{width:40px;height:41px}.border-bottom{border-bottom:1px solid var(--calcite-color-border-3)}.box-shadow{box-shadow:0 1px 2px rgba(0, 0, 0, 0.3)}.margin-bottom-1-2{margin-bottom:0.5rem}";
const MapToolsStyle0 = mapToolsCss;

const MapTools = /*@__PURE__*/ proxyCustomElement(class MapTools extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.basemapConfig = undefined;
        this.enableLegend = undefined;
        this.enableFloorFilter = undefined;
        this.enableFullscreen = undefined;
        this.enableSearch = undefined;
        this.enableBasemap = undefined;
        this.enableHome = undefined;
        this.enableSingleExpand = undefined;
        this.homeZoomToolsSize = "m";
        this.layout = "vertical";
        this.mapView = undefined;
        this.mapWidgetsSize = "m";
        this.position = "top-right";
        this.searchConfiguration = undefined;
        this.stackTools = true;
        this.toolOrder = undefined;
        this._hasFloorInfo = false;
        this._translations = undefined;
        this._showTools = true;
        this._showBasemapWidget = false;
        this._showFloorFilter = false;
        this._showFullscreen = false;
        this._showLegendWidget = false;
        this._showSearchWidget = false;
    }
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * esri/widgets/Expand: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Expand.html
     */
    Expand;
    /**
     * HTMLMapSearchElement: The search element node
     */
    _basemapElement;
    /**
     * HTMLFloorFilterElement: The floor filter element node
     */
    _floorFilterElement;
    /**
     * HTMLMapFullscreenElement: The fullscreen element node
     */
    _fullscreenElement;
    /**
     * HTMLLegendElement: The legend element node
     */
    _legendElement;
    /**
     * HTMLMapSearchElement: The search element node
     */
    _searchElement;
    /**
     * string[]: List of widget names that have been added to the UI
     * This prop is only used when enableSingleExpand is false
     */
    _widgets = [];
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * When the mapView loads check if it supports floor awareness
     */
    async mapViewWatchHandler() {
        await this.mapView.when(() => {
            this._hasFloorInfo = this.mapView?.map?.floorInfo;
        });
    }
    /**
     * When the _showBasemapWidget property is true display the basemap gallery
     */
    async _showBasemapWidgetWatchHandler(v) {
        if (v) {
            this.mapView.ui.add(this._basemapElement.basemapWidget, {
                position: this.position,
                index: 1
            });
        }
        else {
            this.mapView.ui.remove(this._basemapElement.basemapWidget);
        }
    }
    /**
     * When the _showBasemapWidget property is true display the basemap gallery
     */
    async _showFloorFilterWatchHandler(v) {
        const widget = this._floorFilterElement.floorFilterWidget;
        if (v) {
            this.mapView.ui.add(widget, {
                position: this.position,
                index: 1
            });
        }
        else {
            this.mapView.ui.remove(widget);
        }
    }
    /**
     * When the _showFullscreen property is true the app will consume the full screen
     */
    async _showFullscreenWatchHandler(v) {
        const fs = this._fullscreenElement.fullscreenWidget;
        if (v) {
            if (fs.viewModel.state === "ready") {
                fs.viewModel.enter();
            }
        }
        else {
            if (fs.viewModel.state === "active") {
                fs.viewModel.exit();
            }
        }
    }
    /**
     * When the _showLegendWidget property is true display the search widget
     */
    async _showLegendWidgetWatchHandler(v) {
        if (v) {
            this.mapView.ui.add(this._legendElement.legendWidget, {
                position: this.position,
                index: 1
            });
        }
        else {
            this.mapView.ui.remove(this._legendElement.legendWidget);
        }
    }
    /**
     * When the _showSearchWidget property is true display the search widget
     */
    async _showSearchWidgetWatchHandler(v) {
        if (v) {
            this.mapView.ui.add(this._searchElement.searchWidget, {
                position: this.position,
                index: 1
            });
        }
        else {
            this.mapView.ui.remove(this._searchElement.searchWidget);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
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
     * StencilJS: Renders the component.
     */
    render() {
        this._setZoomToolsSize();
        const toggleIcon = this._showTools ? "chevrons-up" : "chevrons-down";
        const toolsClass = this._showTools ? "" : "display-none";
        const searchClass = this._showSearchWidget ? "" : "display-none";
        const basemapClass = this._showBasemapWidget ? "" : "display-none";
        const legendClass = this._showLegendWidget ? "" : "display-none";
        const floorFilterClass = this._showFloorFilter ? "" : "display-none";
        const fullscreenClass = this._showFullscreen ? "" : "display-none";
        const expandTip = this._showTools ? this._translations.collapse : this._translations.expand;
        const containerClass = !this.enableBasemap && !this.enableFullscreen && !this.enableLegend && !this.enableSearch ? "display-none" : "";
        const toolMarginClass = this.enableSingleExpand ? "margin-top-1-2" : "";
        const toolOrder = this.toolOrder ? this.toolOrder : ["legend", "search", "fullscreen", "floorfilter"];
        const shadowClass = this.stackTools ? "box-shadow" : "";
        return (h(Host, { key: '224b99c53e7f8ac9c072efbd2c2093c6c9684a9a' }, h("div", { key: 'ead56063c6aa28146d4c50044b6e7c98fd2ed1ab', class: containerClass }, this.enableSingleExpand ? (h("div", { class: "box-shadow" }, this._getActionGroup(toggleIcon, false, expandTip, () => this._toggleTools()))) : undefined, h("div", { key: '3fd7a2bd6225c10b89e282d4521486ad7eb5802a', class: `${toolMarginClass} ${shadowClass} ${toolsClass}` }, this._getMapWidgets(toolOrder))), h("basemap-gallery", { key: '43063099ee4b3a72d96b2ae6e4ca750dff109ae2', basemapConfig: this.basemapConfig, class: basemapClass, mapView: this.mapView, ref: (el) => { this._basemapElement = el; } }), h("map-search", { key: '5c149ea67f2a2450864e968a50acce565d95e0b6', class: searchClass, mapView: this.mapView, ref: (el) => { this._searchElement = el; }, resultGraphicEnabled: true, searchConfiguration: this.searchConfiguration }), h("map-legend", { key: 'd3add3a5f820c5d654fec793d3e6e46b6a8919a3', class: legendClass, mapView: this.mapView, ref: (el) => { this._legendElement = el; } }), h("map-fullscreen", { key: 'e18a3a5d021d76e7c8fa9ecf3903105d5a43bed2', class: fullscreenClass, mapView: this.mapView, onFullscreenStateChange: (evt) => this._fullscreenStateChange(evt.detail), ref: (el) => { this._fullscreenElement = el; } }), h("floor-filter", { key: 'cb5d92e503248818e9627ba4ee8d70c81495599d', class: floorFilterClass, enabled: this.enableFloorFilter, mapView: this.mapView, ref: (el) => { this._floorFilterElement = el; } })));
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
        const [Expand] = await loadModules([
            "esri/widgets/Expand"
        ]);
        this.Expand = Expand;
    }
    /**
     * Set the size of the zoom tools based on the user defined homeZoomToolsSize variable.
     *
     * @protected
     */
    _setZoomToolsSize() {
        const zoomIn = document.getElementsByClassName("esri-zoom")[0]?.children[0];
        const zoomOut = document.getElementsByClassName("esri-zoom")[0]?.children[1];
        if (zoomIn && zoomOut) {
            const size = this.homeZoomToolsSize === "s" ? "32px" : this.homeZoomToolsSize === "m" ? "40px" : "48px";
            zoomIn.style.width = size;
            zoomIn.style.height = size;
            zoomOut.style.width = size;
            zoomOut.style.height = size;
        }
    }
    /**
     * Get the map widgets considering the user defined enabled values and tool order
     *
     * @protected
     */
    _getMapWidgets(toolOrder) {
        const fullscreenIcon = this._showFullscreen ? "full-screen-exit" : "full-screen";
        const fullscreenTip = this._showFullscreen ? this._translations.exitFullscreen : this._translations.enterFullscreen;
        return toolOrder.map(t => {
            switch (t) {
                case "legend":
                    return this.enableLegend && this.enableSingleExpand ?
                        this._getActionGroup("legend", false, this._translations.legend, () => this._showLegend()) :
                        this.enableLegend ? this._getWidget(t, this._legendElement?.legendWidget, true) : undefined;
                case "search":
                    return this.enableSearch && this.enableSingleExpand ?
                        this._getActionGroup("magnifying-glass", false, this._translations.search, () => this._search()) :
                        this.enableSearch ? this._getWidget(t, this._searchElement?.searchWidget, true) : undefined;
                case "fullscreen":
                    return this.enableFullscreen && this.enableSingleExpand ?
                        this._getActionGroup(fullscreenIcon, false, fullscreenTip, () => this._expand()) :
                        this.enableFullscreen ? this._getWidget(t, this._fullscreenElement?.fullscreenWidget, false) : undefined;
                case "basemap":
                    return this.enableBasemap && this.enableSingleExpand ?
                        this._getActionGroup("basemap", false, this._translations.basemap, () => this._toggleBasemapPicker()) :
                        this.enableBasemap ? this._getWidget(t, this._basemapElement?.basemapWidget, true) : undefined;
                case "floorfilter":
                    return this.enableFloorFilter && this._hasFloorInfo && this.enableSingleExpand ?
                        this._getActionGroup("urban-model", false, this._translations.floorFilter, () => this._toggleFloorFilter()) :
                        this.enableFloorFilter && this._hasFloorInfo ? this._getWidget(t, this._floorFilterElement?.floorFilterWidget, true) : undefined;
            }
        });
    }
    /**
     * Respond to fullscreen state change and ensure our state var is in sync
     *
     * @param state The fullscreen view model's state.
     *
     * @protected
     */
    _fullscreenStateChange(state) {
        if (state === "ready" && this._showFullscreen) {
            this._showFullscreen = false;
        }
        else if (state === "active" && !this._showFullscreen) {
            this._showFullscreen = true;
        }
    }
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
    _getActionGroup(icon, disabled, tip, func) {
        const sizeClass = this.mapWidgetsSize === "s" ? "square-32" : this.mapWidgetsSize === "m" ? "square-40" : "square-48";
        const stackClass = this.stackTools ? "" : "margin-bottom-1-2";
        const shadowClass = this.stackTools ? "" : "box-shadow";
        return (h("div", null, h("calcite-action", { alignment: "center", class: `${sizeClass} ${stackClass} border-bottom ${shadowClass}`, compact: false, disabled: disabled, icon: icon, id: icon, onClick: func, scale: "s", text: "" }, h("calcite-icon", { icon: "cheveron-up", scale: "s", slot: "icon" })), h("calcite-tooltip", { label: "", placement: "trailing", "reference-element": icon }, h("span", null, tip))));
    }
    /**
     * Add the widget to the UI and optionally to an Expand widget
     *
     * @param name the icon to display for the current action
     * @param content the widget to display
     * @param internalExpand when true the widget will be added to an Expand widget
     *
     * @protected
     */
    _getWidget(name, content, internalExpand) {
        if (this._widgets.indexOf(name) < 0 && this.mapView && content) {
            const i = this.toolOrder.indexOf(name);
            const exp = new this.Expand({
                view: this.mapView,
                content
            });
            const v = this.enableHome ? 2 : 1;
            this.mapView.ui.add(internalExpand ? exp : content, {
                position: this.position,
                index: i > -1 ? i + v : 1
            });
            this._widgets.push(name);
        }
    }
    /**
     * Show/Hide the legend widget
     */
    _showLegend() {
        this._showLegendWidget = !this._showLegendWidget;
        this._showTools = false;
    }
    /**
     * Show/Hide the search widget
     */
    _search() {
        this._showSearchWidget = !this._showSearchWidget;
        this._showTools = false;
    }
    /**
     * Show/Hide the basemap picker
     */
    _toggleBasemapPicker() {
        this._showBasemapWidget = !this._showBasemapWidget;
        this._showTools = false;
    }
    /**
     * Show/Hide the floor filter
     */
    _toggleFloorFilter() {
        this._showFloorFilter = !this._showFloorFilter;
        this._showTools = false;
    }
    /**
     * Enter/Exit fullscreen mode
     */
    _expand() {
        this._showFullscreen = !this._showFullscreen;
    }
    /**
     * Show/Hide the map tools
     */
    _toggleTools() {
        if (!this._showTools) {
            this._showBasemapWidget = false;
            this._showSearchWidget = false;
            this._showLegendWidget = false;
            this._showFloorFilter = false;
        }
        this._showTools = !this._showTools;
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
        "mapView": ["mapViewWatchHandler"],
        "_showBasemapWidget": ["_showBasemapWidgetWatchHandler"],
        "_showFloorFilter": ["_showFloorFilterWatchHandler"],
        "_showFullscreen": ["_showFullscreenWatchHandler"],
        "_showLegendWidget": ["_showLegendWidgetWatchHandler"],
        "_showSearchWidget": ["_showSearchWidgetWatchHandler"]
    }; }
    static get style() { return MapToolsStyle0; }
}, [1, "map-tools", {
        "basemapConfig": [16],
        "enableLegend": [4, "enable-legend"],
        "enableFloorFilter": [4, "enable-floor-filter"],
        "enableFullscreen": [4, "enable-fullscreen"],
        "enableSearch": [4, "enable-search"],
        "enableBasemap": [4, "enable-basemap"],
        "enableHome": [4, "enable-home"],
        "enableSingleExpand": [4, "enable-single-expand"],
        "homeZoomToolsSize": [1, "home-zoom-tools-size"],
        "layout": [1],
        "mapView": [16],
        "mapWidgetsSize": [1, "map-widgets-size"],
        "position": [1],
        "searchConfiguration": [16],
        "stackTools": [4, "stack-tools"],
        "toolOrder": [16],
        "_hasFloorInfo": [32],
        "_translations": [32],
        "_showTools": [32],
        "_showBasemapWidget": [32],
        "_showFloorFilter": [32],
        "_showFullscreen": [32],
        "_showLegendWidget": [32],
        "_showSearchWidget": [32]
    }, undefined, {
        "mapView": ["mapViewWatchHandler"],
        "_showBasemapWidget": ["_showBasemapWidgetWatchHandler"],
        "_showFloorFilter": ["_showFloorFilterWatchHandler"],
        "_showFullscreen": ["_showFullscreenWatchHandler"],
        "_showLegendWidget": ["_showLegendWidgetWatchHandler"],
        "_showSearchWidget": ["_showSearchWidgetWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["map-tools", "basemap-gallery", "calcite-action", "calcite-icon", "calcite-loader", "calcite-tooltip", "floor-filter", "map-fullscreen", "map-legend", "map-search"];
    components.forEach(tagName => { switch (tagName) {
        case "map-tools":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MapTools);
            }
            break;
        case "basemap-gallery":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "floor-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "map-fullscreen":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "map-legend":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "map-search":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { MapTools as M, defineCustomElement as d };
