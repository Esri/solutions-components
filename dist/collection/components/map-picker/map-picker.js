/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/** @license
 * Copyright 2023 Esri
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
export class MapPicker {
    constructor() {
        this.mapInfos = [];
        this.isMapLayout = undefined;
        this._mapListExpanded = false;
        this._translations = undefined;
        this._webMapInfo = undefined;
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
     * HTMLCalciteListElement: this list of map names
     */
    _list;
    /**
     * string: the id of map currently displayed
     */
    _loadedId = "";
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the _webMapInfo prop is changed.
     */
    _webMapInfoWatchHandler(v, oldV) {
        if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
            this._loadedId = v?.id;
            this.mapInfoChange.emit(v);
        }
    }
    /**
     * Called each time the mapInfos prop is changed.
     */
    async mapInfosWatchHandler(v, oldV) {
        if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
            this._webMapSelected(v[0]);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    async setMapByID(id) {
        const mapInfos = this.mapInfos?.filter(i => i.id === id);
        if (id && mapInfos?.length > 0) {
            this._webMapSelected(mapInfos[0]);
        }
    }
    /**
     * Closes the list
     */
    async close() {
        if (this._mapListExpanded) {
            this._mapListExpanded = false;
        }
    }
    /**
     * Expands the list
     */
    async toggle(mapListExpanded) {
        this._mapListExpanded = mapListExpanded;
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted when a new map is loaded
     */
    mapInfoChange;
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '9ac9f64b29fe9b9c4a4b2236c1a07e1ef4e845ce' }, this._getToolbar(), this._getMapNameList(this._mapListExpanded)));
    }
    /**
     * Called once after the component has loaded
     */
    async componentDidLoad() {
        const webMapInfo = this.mapInfos && this.mapInfos.length > 0 ? this.mapInfos[0] : undefined;
        if (webMapInfo) {
            this._webMapSelected(webMapInfo);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Get a calcite action group for the map list
     * Actions do not support multiple icons so this uses a block
     *
     * @returns the dom node for the action group
     *
     * @protected
     */
    _getMapPicker() {
        const id = "map-picker-expand-toggle";
        const mapListIcon = this._mapListExpanded ? "chevron-up" : "chevron-down";
        return (h("div", { class: "width-full" }, h("calcite-button", { alignment: "icon-end-space-between", appearance: "transparent", class: "width-full height-full", iconEnd: mapListIcon, id: id, kind: "neutral", onClick: () => this._chooseMap(), width: "full" }, this._webMapInfo?.name), h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": id }, h("span", null, this._translations.switchMap))));
    }
    /**
     * Create the toolbar (controls used for map and app interactions)
     *
     * @returns The dom node with the toolbar
     *
     * @protected
     */
    _getToolbar() {
        return (h("div", { class: "display-flex border-right" }, h("calcite-action-bar", { class: "border-bottom-1 action-bar-size", "expand-disabled": true, layout: "horizontal", slot: "header" }, this._getMapPicker())));
    }
    /**
     * Get a pick list for all maps in mapInfos
     *
     * @param show boolean to indicate if the list should be shown or hidden
     *
     * @returns the dom node for the list of maps
     *
     * @protected
     */
    _getMapNameList(show) {
        const width = this.isMapLayout ? "width-25" : "width-full";
        const listClass = show ? `map-list border-bottom-1 ${width}` : "display-none";
        return (h("div", { class: listClass }, h("calcite-list", { id: "mapList", ref: (el) => this._list = el, selectionAppearance: "border", selectionMode: "single" }, this.mapInfos.map(mapInfo => {
            return (h("calcite-list-item", { label: mapInfo.name, onClick: () => this._webMapSelected(mapInfo), selected: mapInfo.id === this._loadedId, value: mapInfo.id }));
        }))));
    }
    /**
     * Fired when the user clicks on the map list
     *
     * @param webMapInfo the web map id and name selected from the list
     */
    _webMapSelected(webMapInfo) {
        this._mapListExpanded = false;
        this._webMapInfo = webMapInfo;
    }
    /**
     * Toggles the open/close state of the map list
     *
     * @returns the dom node for the action group
     *
     * @protected
     */
    _chooseMap() {
        this._mapListExpanded = !this._mapListExpanded;
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
    static get is() { return "map-picker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["map-picker.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["map-picker.css"]
        };
    }
    static get properties() {
        return {
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
            "isMapLayout": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "boolean: when true map list will shown in half width."
                },
                "attribute": "is-map-layout",
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "_mapListExpanded": {},
            "_translations": {},
            "_webMapInfo": {}
        };
    }
    static get events() {
        return [{
                "method": "mapInfoChange",
                "name": "mapInfoChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when a new map is loaded"
                },
                "complexType": {
                    "original": "IMapInfo",
                    "resolved": "IMapInfo",
                    "references": {
                        "IMapInfo": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IMapInfo"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "setMapByID": {
                "complexType": {
                    "signature": "(id: string) => Promise<void>",
                    "parameters": [{
                            "name": "id",
                            "type": "string",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            },
            "close": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Closes the list",
                    "tags": []
                }
            },
            "toggle": {
                "complexType": {
                    "signature": "(mapListExpanded: boolean) => Promise<void>",
                    "parameters": [{
                            "name": "mapListExpanded",
                            "type": "boolean",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Expands the list",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "_webMapInfo",
                "methodName": "_webMapInfoWatchHandler"
            }, {
                "propName": "mapInfos",
                "methodName": "mapInfosWatchHandler"
            }];
    }
}
