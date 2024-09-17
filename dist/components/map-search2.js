/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';

const mapSearchCss = ":host{display:block}.search-widget{width:100% !important;border:1px solid var(--calcite-color-border-input)}";
const MapSearchStyle0 = mapSearchCss;

const MapSearch = /*@__PURE__*/ proxyCustomElement(class MapSearch extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.mapView = undefined;
        this.popupEnabled = false;
        this.resultGraphicEnabled = false;
        this.searchConfiguration = undefined;
        this.searchTerm = undefined;
        this.searchWidget = undefined;
    }
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
     * esri/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     */
    FeatureLayer;
    /**
     * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
     */
    Search;
    /**
     * HTMLElement: The container div for the search widget
     */
    _searchElement;
    /**
     * An array of objects representing the results of search
     */
    _searchResult;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the searchConfiguration prop is changed.
     *
     * @returns Promise when complete
     */
    async watchSearchConfigurationHandler() {
        this._initSearchWidget();
    }
    /**
     * Called each time the mapView prop is changed.
     *
     * @returns Promise when complete
     */
    async mapViewWatchHandler() {
        await this.mapView.when(() => {
            this._initSearchWidget();
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
        await this._initModules();
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        return this._initSearchWidget();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '0c34af04212bf27998363a55afbfe76f57124a93' }, h("div", { key: '2bec13054279a3ca132056269a71356c542354ef', class: "search-widget", ref: (el) => { this._searchElement = el; } })));
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
        const [Search, FeatureLayer] = await loadModules([
            "esri/widgets/Search",
            "esri/layers/FeatureLayer"
        ]);
        this.Search = Search;
        this.FeatureLayer = FeatureLayer;
    }
    /**
     * Initialize the search widget
     *
     * @protected
     */
    _initSearchWidget() {
        if (this.mapView && this._searchElement && !this.searchWidget) {
            let searchOptions = {
                view: this.mapView,
                container: this._searchElement,
                searchTerm: this.searchTerm
            };
            if (this.searchConfiguration) {
                const searchConfiguration = this._getSearchConfig(this.searchConfiguration, this.mapView);
                searchOptions = {
                    ...searchConfiguration
                };
            }
            this.searchWidget = new this.Search(searchOptions);
            this.searchWidget.popupEnabled = this.popupEnabled;
            this.searchWidget.resultGraphicEnabled = this.resultGraphicEnabled;
        }
        else {
            if (this.searchWidget) {
                this.searchWidget.view = this.mapView;
            }
        }
    }
    /**
     * Initialize the search widget based on user defined configuration
     *
     * @param searchConfiguration search configuration defined by the user
     * @param view the current map view
     *
     * @protected
     */
    _getSearchConfig(searchConfiguration, view) {
        const INCLUDE_DEFAULT_SOURCES = "includeDefaultSources";
        const sources = searchConfiguration.sources;
        if (sources?.length > 0) {
            searchConfiguration[INCLUDE_DEFAULT_SOURCES] = false;
            sources.forEach((source) => {
                const isLayerSource = source.hasOwnProperty("layer");
                if (isLayerSource) {
                    const layerSource = source;
                    const layerId = layerSource.layer?.id;
                    const layerFromMap = layerId ? view.map.findLayerById(layerId) : null;
                    const layerUrl = layerSource?.layer?.url;
                    if (layerFromMap) {
                        layerSource.layer = layerFromMap;
                    }
                    else if (layerUrl) {
                        layerSource.layer = new this.FeatureLayer(layerUrl);
                    }
                }
            });
            sources?.forEach((source) => {
                const isLocatorSource = source.hasOwnProperty("locator");
                if (isLocatorSource) {
                    const locatorSource = source;
                    if (locatorSource?.name === "ArcGIS World Geocoding Service") {
                        const outFields = locatorSource.outFields || ["Addr_type", "Match_addr", "StAddr", "City"];
                        locatorSource.outFields = outFields;
                        locatorSource.singleLineFieldName = "SingleLine";
                    }
                    locatorSource.url = locatorSource.url;
                    delete locatorSource.url;
                }
            });
        }
        else {
            searchConfiguration = {
                ...searchConfiguration,
                includeDefaultSources: true
            };
        }
        return searchConfiguration;
    }
    static get watchers() { return {
        "searchConfiguration": ["watchSearchConfigurationHandler"],
        "mapView": ["mapViewWatchHandler"]
    }; }
    static get style() { return MapSearchStyle0; }
}, [1, "map-search", {
        "mapView": [16],
        "popupEnabled": [4, "popup-enabled"],
        "resultGraphicEnabled": [4, "result-graphic-enabled"],
        "searchConfiguration": [16],
        "searchTerm": [1, "search-term"],
        "searchWidget": [16]
    }, undefined, {
        "searchConfiguration": ["watchSearchConfigurationHandler"],
        "mapView": ["mapViewWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["map-search"];
    components.forEach(tagName => { switch (tagName) {
        case "map-search":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MapSearch);
            }
            break;
    } });
}
defineCustomElement();

export { MapSearch as M, defineCustomElement as d };
