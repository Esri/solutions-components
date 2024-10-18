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
export class BasemapGallery {
    constructor() {
        this.mapView = undefined;
        this.basemapConfig = undefined;
        this.basemapWidget = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
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
    static get is() { return "basemap-gallery"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["basemap-gallery.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["basemap-gallery.css"]
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
                    "text": "esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html"
                }
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
            "basemapWidget": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.BasemapGallery",
                    "resolved": "BasemapGallery",
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
                    "text": "esri/widgets/BasemapGallery: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-BasemapGallery.html\r\n\r\nBasemapGallery instance"
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "basemapConfig",
                "methodName": "basemapConfigWatchHandler"
            }, {
                "propName": "mapView",
                "methodName": "mapViewWatchHandler"
            }];
    }
}
