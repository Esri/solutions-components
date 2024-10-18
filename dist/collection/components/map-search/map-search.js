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
export class MapSearch {
    constructor() {
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
        return (h(Host, { key: '482d8d891f8c6905eefee8b26f0837a4c7c2e525' }, h("div", { key: '9a3993ab8a7506299cf2bdbfab23b47ac7fe3037', class: "search-widget", ref: (el) => { this._searchElement = el; } })));
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
    static get is() { return "map-search"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["map-search.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["map-search.css"]
        };
    }
    static get properties() {
        return {
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
                    "text": "esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html"
                }
            },
            "popupEnabled": {
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
                    "text": "boolean: When true the selected feature popup will be shown when serach result is found"
                },
                "attribute": "popup-enabled",
                "reflect": false,
                "defaultValue": "false"
            },
            "resultGraphicEnabled": {
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
                    "text": "boolean: When true a graphic will be added for the search result"
                },
                "attribute": "result-graphic-enabled",
                "reflect": false,
                "defaultValue": "false"
            },
            "searchConfiguration": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "ISearchConfiguration",
                    "resolved": "ISearchConfiguration",
                    "references": {
                        "ISearchConfiguration": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::ISearchConfiguration"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "ISearchConfiguration: Configuration details for the Search widget"
                }
            },
            "searchTerm": {
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
                    "text": "string: Text entered by the end user.\r\nUsed to search against the locator."
                },
                "attribute": "search-term",
                "reflect": false
            },
            "searchWidget": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.widgetsSearch",
                    "resolved": "widgetsSearch",
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
                    "text": "esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html"
                }
            }
        };
    }
    static get watchers() {
        return [{
                "propName": "searchConfiguration",
                "methodName": "watchSearchConfigurationHandler"
            }, {
                "propName": "mapView",
                "methodName": "mapViewWatchHandler"
            }];
    }
}
