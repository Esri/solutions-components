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
export class FloorFilter {
    constructor() {
        this.enabled = undefined;
        this.floorFilterWidget = undefined;
        this.mapView = undefined;
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
     * esri/widgets/FloorFilter: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FloorFilter.html
     *
     * FloorFilter constructor
     */
    FloorFilter;
    /**
     * HTMLElement: The container div for the floor filter widget
     */
    _floorFilterElement;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    reactiveUtils;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _facilityHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _levelHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _siteHandle;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Watch for changes to the mapView and re-init the floor filter
     */
    async mapViewWatchHandler() {
        await this._initFloorFilter(this.mapView);
    }
    /**
     * Watch for changes to the enabled property and re-init or destroy the floor filter
     */
    async enabledWatchHandler() {
        if (this.enabled) {
            await this._initFloorFilter(this.mapView);
        }
        else if (!this.enabled) {
            this._destroyWidget();
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
    /**
     * Emitted on demand when the Facility is changed
     */
    facilityChanged;
    /**
     * Emitted on demand when the Level is changed
     */
    levelChanged;
    /**
     * Emitted on demand when the Site is changed
     */
    siteChanged;
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
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '8c59ed98841f476670392c6ebd9dc764d72f4733' }, h("div", { key: 'b2400febc768a595dbcc6933af1565da173d97f5', ref: (el) => { this._floorFilterElement = el; } })));
    }
    /**
     * StencilJS: Called once just after the component is first loaded.
     */
    async componentDidLoad() {
        if (this.mapView && !this.floorFilterWidget) {
            await this._initFloorFilter(this.mapView);
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
        const [FloorFilter, reactiveUtils] = await loadModules([
            "esri/widgets/FloorFilter",
            "esri/core/reactiveUtils"
        ]);
        this.FloorFilter = FloorFilter;
        this.reactiveUtils = reactiveUtils;
    }
    /**
     * Destroy the widget and remove the containing element if it exists
     *
     * @protected
     */
    _destroyWidget() {
        if (this.floorFilterWidget) {
            this.floorFilterWidget.destroy();
            this.floorFilterWidget = undefined;
        }
        if (this._floorFilterElement) {
            this._floorFilterElement.remove();
        }
    }
    /**
     * Destroy the widget and remove the containing element then re-create the container element
     *
     * @protected
     */
    _initContainer() {
        this._destroyWidget();
        this._floorFilterElement = document.createElement("div");
    }
    /**
     * Initialize the floor filter or reset the current view if it already exists
     */
    async _initFloorFilter(view) {
        const webMap = view?.map;
        await webMap.when(() => {
            if (view && this.enabled && this.FloorFilter && webMap?.floorInfo) {
                this._initContainer();
                this.floorFilterWidget = new this.FloorFilter({
                    container: this._floorFilterElement,
                    view
                });
                this._facilityHandle?.remove();
                this._facilityHandle = this.reactiveUtils.watch(() => this.floorFilterWidget.facility, (facility) => {
                    this.facilityChanged.emit(facility);
                });
                this._levelHandle?.remove();
                this._levelHandle = this.reactiveUtils.watch(() => this.floorFilterWidget.level, (level) => {
                    this.levelChanged.emit(level);
                });
                this._siteHandle?.remove();
                this._siteHandle = this.reactiveUtils.watch(() => this.floorFilterWidget.site, (site) => {
                    this.siteChanged.emit(site);
                });
            }
        });
    }
    static get is() { return "floor-filter"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["floor-filter.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["floor-filter.css"]
        };
    }
    static get properties() {
        return {
            "enabled": {
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
                    "text": "boolean: when true the Floor Filter widget will be available"
                },
                "attribute": "enabled",
                "reflect": false
            },
            "floorFilterWidget": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.FloorFilter",
                    "resolved": "FloorFilter",
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
                    "text": "esri/widgets/FloorFilter: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FloorFilter.html\r\n\r\nFloorFilter instance"
                }
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
            }
        };
    }
    static get events() {
        return [{
                "method": "facilityChanged",
                "name": "facilityChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when the Facility is changed"
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }, {
                "method": "levelChanged",
                "name": "levelChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when the Level is changed"
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }, {
                "method": "siteChanged",
                "name": "siteChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when the Site is changed"
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "mapView",
                "methodName": "mapViewWatchHandler"
            }, {
                "propName": "enabled",
                "methodName": "enabledWatchHandler"
            }];
    }
}
