/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';

const mapLegendCss = ":host{display:block}";
const MapLegendStyle0 = mapLegendCss;

const MapLegend = /*@__PURE__*/ proxyCustomElement(class MapLegend extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.mapView = undefined;
        this.legendWidget = undefined;
    }
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  State (internal)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * esri/widgets/Legend: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Legend.html
     *
     * Legend constructor
     */
    Legend;
    /**
     * HTMLElement: The container div for the basemap gallery widget
     */
    _legendElement;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    async mapViewWatchHandler() {
        await this.mapView.when(() => {
            this._initLegend(this.mapView);
        });
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
        return this._initModules();
    }
    /**
     * StencilJS: Renders the component.
     */
    render() {
        return (h(Host, { key: '2c5cfbfd4048347ace5ff3cf17d411e85454be7a' }, h("div", { key: '3927ef8af3a4a93fbd558480a96f982ca5b477a2', ref: (el) => { this._legendElement = el; } })));
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        if (this.mapView) {
            await this.mapViewWatchHandler();
        }
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
        const [Legend] = await loadModules([
            "esri/widgets/Legend"
        ]);
        this.Legend = Legend;
    }
    /**
     * Initialize the basemap gallery or reset the current view if it already exists
     */
    _initLegend(view) {
        if (view && this.Legend) {
            if (!this.legendWidget) {
                this.legendWidget = new this.Legend({
                    container: this._legendElement,
                    view
                });
            }
            else {
                this.legendWidget.view = view;
            }
        }
    }
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"]
    }; }
    static get style() { return MapLegendStyle0; }
}, [1, "map-legend", {
        "mapView": [16],
        "legendWidget": [16]
    }, undefined, {
        "mapView": ["mapViewWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["map-legend"];
    components.forEach(tagName => { switch (tagName) {
        case "map-legend":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MapLegend);
            }
            break;
    } });
}
defineCustomElement();

export { MapLegend as M, defineCustomElement as d };
