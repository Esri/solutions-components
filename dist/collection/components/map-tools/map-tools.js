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
import { getLocaleComponentStrings } from "../../utils/locale";
import { loadModules } from "../../utils/loadModules";
export class MapTools {
    constructor() {
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
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
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
                default:
                    break;
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
    static get is() { return "map-tools"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["map-tools.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["map-tools.css"]
        };
    }
    static get properties() {
        return {
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
                "reflect": false
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
            "layout": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "\"horizontal\" | \"vertical\"",
                    "resolved": "\"horizontal\" | \"vertical\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "\"horizontal\" | \"vertical\": used to control the orientation of the tools"
                },
                "attribute": "layout",
                "reflect": false,
                "defaultValue": "\"vertical\""
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
            "position": {
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
                    "text": "__esri.UIPosition: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-ui-UI.html#UIPosition\r\nThe position details for the tools"
                },
                "attribute": "position",
                "reflect": false,
                "defaultValue": "\"top-right\""
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
            "_hasFloorInfo": {},
            "_translations": {},
            "_showTools": {},
            "_showBasemapWidget": {},
            "_showFloorFilter": {},
            "_showFullscreen": {},
            "_showLegendWidget": {},
            "_showSearchWidget": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "mapView",
                "methodName": "mapViewWatchHandler"
            }, {
                "propName": "_showBasemapWidget",
                "methodName": "_showBasemapWidgetWatchHandler"
            }, {
                "propName": "_showFloorFilter",
                "methodName": "_showFloorFilterWatchHandler"
            }, {
                "propName": "_showFullscreen",
                "methodName": "_showFullscreenWatchHandler"
            }, {
                "propName": "_showLegendWidget",
                "methodName": "_showLegendWidgetWatchHandler"
            }, {
                "propName": "_showSearchWidget",
                "methodName": "_showSearchWidgetWatchHandler"
            }];
    }
}
