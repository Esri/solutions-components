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
// TODO navigation and accessability isn't right for the map list
//   tab does not go into the list when it's open
//   focus is not set when it opens
// TODO clarify what the List button is supposed to do
// TODO map list button tooltip does not work
// TODO map list should close if the user clicks something else...hope this will be easy when I figure out how to set focus when it opens
export class MapCard {
    constructor() {
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
    static get is() { return "map-card"; }
    static get originalStyleUrls() {
        return {
            "$": ["map-card.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["map-card.css"]
        };
    }
    static get properties() {
        return {
            "defaultWebmapId": {
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
                    "text": "string: Item ID of the web map that should be selected by default when the app loads"
                },
                "attribute": "default-webmap-id",
                "reflect": false,
                "defaultValue": "\"\""
            },
            "enableHome": {
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
                    "text": "boolean: when true the home widget will be available"
                },
                "attribute": "enable-home",
                "reflect": false
            },
            "enableLegend": {
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
                    "text": "boolean: when true the legend widget will be available"
                },
                "attribute": "enable-legend",
                "reflect": false
            },
            "enableFloorFilter": {
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
                    "text": "boolean: when true the floor filter widget will be available"
                },
                "attribute": "enable-floor-filter",
                "reflect": false
            },
            "enableFullscreen": {
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
                    "text": "boolean: when true the fullscreen widget will be available"
                },
                "attribute": "enable-fullscreen",
                "reflect": false
            },
            "enableSingleExpand": {
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
                    "text": "boolean: when true map tools will be displayed within a single expand/collapse widget\r\nwhen false widgets will be loaded individually into expand widgets"
                },
                "attribute": "enable-single-expand",
                "reflect": false,
                "defaultValue": "true"
            },
            "enableSearch": {
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
                    "text": "boolean: when true the search widget will be available"
                },
                "attribute": "enable-search",
                "reflect": false
            },
            "enableBasemap": {
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
                    "text": "boolean: when true the basemap widget will be available"
                },
                "attribute": "enable-basemap",
                "reflect": false
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
            "hidden": {
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
                    "text": "boolean: When true the map display will be hidden"
                },
                "attribute": "hidden",
                "reflect": false
            },
            "homeZoomIndex": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "number: The placement index of the home and zoom components. This index shows where to place the component relative to other components.\r\nFor example a value of 0 would place it topmost when position is top-*, leftmost for bottom-left and right most for bottom-right."
                },
                "attribute": "home-zoom-index",
                "reflect": false,
                "defaultValue": "3"
            },
            "homeZoomPosition": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "__esri.UIPosition",
                    "resolved": "\"bottom-leading\" | \"bottom-left\" | \"bottom-right\" | \"bottom-trailing\" | \"manual\" | \"top-leading\" | \"top-left\" | \"top-right\" | \"top-trailing\"",
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
                    "text": "__esri.UIPosition: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-UI.html#UIPosition\r\nThe position details for the Home and Zoom tools"
                },
                "attribute": "home-zoom-position",
                "reflect": false,
                "defaultValue": "\"top-left\""
            },
            "homeZoomToolsSize": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"s\" | \"m\" | \"l\"",
                    "resolved": "\"l\" | \"m\" | \"s\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "\"s\" | \"m\" | \"l\": Used for Zoom and Home tools"
                },
                "attribute": "home-zoom-tools-size",
                "reflect": false,
                "defaultValue": "\"m\""
            },
            "mapInfos": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "IMapInfo[]",
                    "resolved": "IMapInfo[]",
                    "references": {
                        "IMapInfo": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IMapInfo"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "IMapInfo[]: array of map infos (name and id)"
                },
                "defaultValue": "[]"
            },
            "mapWidgetsIndex": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "number: The placement index of the map widgets (legend, basemap, fullscreen etc). This index shows where to place the component relative to other components.\r\nFor example a value of 0 would place it topmost when position is top-*, leftmost for bottom-left and right most for bottom-right."
                },
                "attribute": "map-widgets-index",
                "reflect": false,
                "defaultValue": "0"
            },
            "mapWidgetsPosition": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "__esri.UIPosition",
                    "resolved": "\"bottom-leading\" | \"bottom-left\" | \"bottom-right\" | \"bottom-trailing\" | \"manual\" | \"top-leading\" | \"top-left\" | \"top-right\" | \"top-trailing\"",
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
                    "text": "__esri.UIPosition: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-UI.html#UIPosition\r\nThe position details for the Home and Zoom tools"
                },
                "attribute": "map-widgets-position",
                "reflect": false,
                "defaultValue": "\"top-right\""
            },
            "mapWidgetsSize": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"s\" | \"m\" | \"l\"",
                    "resolved": "\"l\" | \"m\" | \"s\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "\"s\" | \"m\" | \"l\": Used for optional map tool widget"
                },
                "attribute": "map-widgets-size",
                "reflect": false,
                "defaultValue": "\"m\""
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
            },
            "stackTools": {
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
                    "text": "boolean: When true the map widget tools will have no margin between them.\r\nWhen false the map widget tools will have a margin between them."
                },
                "attribute": "stack-tools",
                "reflect": false,
                "defaultValue": "true"
            },
            "theme": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "theme",
                    "resolved": "\"dark\" | \"light\"",
                    "references": {
                        "theme": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::theme"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "theme: \"light\" | \"dark\" theme to be used"
                },
                "attribute": "theme",
                "reflect": false
            },
            "toolOrder": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "string[]",
                    "resolved": "string[]",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "\r\nValid tools: \"legend\", \"search\", \"fullscreen\", \"basemap\", \"floorfilter\""
                }
            }
        };
    }
    static get states() {
        return {
            "_searchConfiguration": {},
            "_webMapInfo": {}
        };
    }
    static get events() {
        return [{
                "method": "mapChanged",
                "name": "mapChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when a new map is loaded"
                },
                "complexType": {
                    "original": "IMapChange",
                    "resolved": "IMapChange",
                    "references": {
                        "IMapChange": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IMapChange"
                        }
                    }
                }
            }, {
                "method": "beforeMapChanged",
                "name": "beforeMapChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted before a new map is loaded"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "enableHome",
                "methodName": "enableHomeWatchHandler"
            }];
    }
    static get listeners() {
        return [{
                "name": "mapInfoChange",
                "method": "mapInfoChange",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
}
