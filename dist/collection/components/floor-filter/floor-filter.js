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
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    async mapViewWatchHandler() {
        await this.mapView.when(() => {
            this._initFloorFilter(this.mapView);
        });
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
        return this._initModules();
    }
    render() {
        return (h(Host, null, h("div", { ref: (el) => { this._floorFilterElement = el; } })));
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
     * Initialize the floor filter or reset the current view if it already exists
     */
    _initFloorFilter(view) {
        var _a;
        if (view && this.enabled && this.FloorFilter && ((_a = view === null || view === void 0 ? void 0 : view.map) === null || _a === void 0 ? void 0 : _a.floorInfo)) {
            if (!this.floorFilterWidget) {
                this.floorFilterWidget = new this.FloorFilter({
                    container: this._floorFilterElement,
                    view
                });
                if (this._levelHandle) {
                    this._levelHandle.remove();
                }
                this._levelHandle = this.reactiveUtils.watch(() => this.floorFilterWidget.level, (level) => {
                    this.levelChanged.emit(level);
                });
            }
            else {
                this.floorFilterWidget.view = view;
            }
        }
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
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "mapView",
                "methodName": "mapViewWatchHandler"
            }];
    }
}
