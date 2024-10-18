/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';

const basemapGalleryCss = ":host{display:block}";
const BasemapGalleryStyle0 = basemapGalleryCss;

const BasemapGallery = /*@__PURE__*/ proxyCustomElement(class BasemapGallery extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.mapView = undefined;
        this.basemapConfig = undefined;
        this.basemapWidget = undefined;
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
     * esri/widgets/BasemapGallery: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html
     *
     * BasemapGallery constructor
     */
    BasemapGallery;
    /**
     * esri/widgets/BasemapGallery/support/PortalBasemapsSource: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery-support-PortalBasemapsSource.html
     *
     * PortalBasemapsSource constructor
     */
    PortalBasemapsSource;
    /**
     * HTMLElement: The container div for the basemap gallery widget
     */
    _basemapElement;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    async basemapConfigWatchHandler() {
        if (this.basemapWidget?.source) {
            const portalBasemapsSource = this.basemapWidget?.source;
            portalBasemapsSource.query = this.basemapConfig?.basemapGroupId ? `id:${this.basemapConfig.basemapGroupId}` : null;
            await portalBasemapsSource.refresh();
        }
    }
    async mapViewWatchHandler() {
        await this.mapView.when(() => {
            void this._initBaseMapGallery(this.mapView);
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
        return (h(Host, { key: '1f8be0f65a784ffaac49b8a5a15ebd6fb72d6643' }, h("div", { key: '2c1bde6c0624b476f6c34302ea843da195f535cb', ref: (el) => { this._basemapElement = el; } })));
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
        const [BasemapGallery, PortalBasemapsSource] = await loadModules([
            "esri/widgets/BasemapGallery",
            "esri/widgets/BasemapGallery/support/PortalBasemapsSource"
        ]);
        this.BasemapGallery = BasemapGallery;
        this.PortalBasemapsSource = PortalBasemapsSource;
    }
    /**
     * Initialize the basemap gallery or reset the current view if it already exists
     *
     * @protected
     */
    async _initBaseMapGallery(view) {
        if (this.BasemapGallery) {
            if (this.basemapWidget) {
                this.basemapWidget.destroy();
            }
            const source = new this.PortalBasemapsSource({
                query: this.basemapConfig?.basemapGroupId ? `id:${this.basemapConfig.basemapGroupId}` : null,
                filterFunction: this.basemapConfig ? (basemap) => {
                    return !this.basemapConfig.basemapIdsToFilter.includes(basemap.portalItem.id);
                } : () => true
            });
            await source.refresh();
            this.basemapWidget = new this.BasemapGallery({
                container: this._basemapElement,
                view,
                source
            });
        }
    }
    static get watchers() { return {
        "basemapConfig": ["basemapConfigWatchHandler"],
        "mapView": ["mapViewWatchHandler"]
    }; }
    static get style() { return BasemapGalleryStyle0; }
}, [1, "basemap-gallery", {
        "mapView": [16],
        "basemapConfig": [16],
        "basemapWidget": [16]
    }, undefined, {
        "basemapConfig": ["basemapConfigWatchHandler"],
        "mapView": ["mapViewWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["basemap-gallery"];
    components.forEach(tagName => { switch (tagName) {
        case "basemap-gallery":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, BasemapGallery);
            }
            break;
    } });
}
defineCustomElement();

export { BasemapGallery as B, defineCustomElement as d };
