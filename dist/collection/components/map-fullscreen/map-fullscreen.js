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
export class MapFullscreen {
    constructor() {
        this.mapView = undefined;
        this.fullscreenWidget = undefined;
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
     * esri/widgets/Fullscreen: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Fullscreen.html
     */
    Fullscreen;
    /**
     * HTMLElement: The container div for the Fullscreen widget
     */
    _fullscreenElement;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _fullscreenStateChangeHandle;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    reactiveUtils;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the mapView prop is changed.
     *
     * @returns Promise when complete
     */
    async mapViewWatchHandler() {
        await this.mapView.when(async () => {
            await this._initFullscreenWidget();
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
    /**
     * Emitted on demand when the fullscreen widget state has changed
     */
    fullscreenStateChange;
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
        return (h(Host, { key: '57cf43d121435c4db3c4847bb909ee77986d2f39' }, h("div", { key: 'e748dbb1924d588d3aa3cef1cfc7d9524a08ff1e', class: "fullscreen-widget", ref: (el) => { this._fullscreenElement = el; } })));
    }
    /**
     * StencilJS: Called just after the component updates.
     * It's never called during the first render().
     */
    async componentDidUpdate() {
        await this._initFullscreenWidget();
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this._initFullscreenWidget();
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
        const [Fullscreen, reactiveUtils] = await loadModules([
            "esri/widgets/Fullscreen",
            "esri/core/reactiveUtils"
        ]);
        this.Fullscreen = Fullscreen;
        this.reactiveUtils = reactiveUtils;
    }
    /**
     * Initialize the search widget
     *
     * @protected
     */
    async _initFullscreenWidget() {
        if (this.mapView && this._fullscreenElement && !this.fullscreenWidget) {
            this.fullscreenWidget = new this.Fullscreen({
                view: this.mapView
            });
            await this.fullscreenWidget.when(() => {
                if (this._fullscreenStateChangeHandle) {
                    this._fullscreenStateChangeHandle.remove();
                }
                this._fullscreenStateChangeHandle = this.reactiveUtils.watch(() => this.fullscreenWidget.viewModel.state, (state) => this.fullscreenStateChange.emit(state));
            });
        }
        else if (this.fullscreenWidget) {
            this.fullscreenWidget.view = this.mapView;
        }
    }
    static get is() { return "map-fullscreen"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["map-fullscreen.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["map-fullscreen.css"]
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
            "fullscreenWidget": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.Fullscreen",
                    "resolved": "Fullscreen",
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
                    "text": "esri/widgets/Fullscreen: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Fullscreen.html"
                }
            }
        };
    }
    static get events() {
        return [{
                "method": "fullscreenStateChange",
                "name": "fullscreenStateChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when the fullscreen widget state has changed"
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }];
    }
    static get watchers() {
        return [{
                "propName": "mapView",
                "methodName": "mapViewWatchHandler"
            }];
    }
}
