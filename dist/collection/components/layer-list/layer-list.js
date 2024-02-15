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
import { h, Fragment } from "@stencil/core";
import { getAllLayers, getMapLayerHash } from "../../utils/mapViewUtils";
import { getLocaleComponentStrings } from "../../utils/locale";
import { formatNumber } from "../../utils/languageUtil";
export class LayerList {
    constructor() {
        this.mapView = undefined;
        this.layers = undefined;
        this.noLayerErrorMsg = undefined;
        this.showFeatureCount = true;
        this.showNextIcon = false;
        this._noLayersToDisplay = false;
        this._mapLayerIds = [];
        this._isLoading = false;
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Refresh the layer list which will fetch the latest layer count and update the list
     * @returns Promise that resolves when the operation is complete
     */
    async refresh() {
        await this.setLayers();
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
        this._isLoading = true;
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this.setLayers();
        this._isLoading = false;
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Fragment, null, this._isLoading && h("calcite-loader", { label: "", scale: "m" }), !this._isLoading && this.mapView && this._noLayersToDisplay &&
            h("calcite-notice", { class: "error-msg", icon: "layers-reference", kind: "danger", open: true }, h("div", { slot: "title" }, this._translations.error), h("div", { slot: "message" }, this.noLayerErrorMsg ? this.noLayerErrorMsg : this._translations.noLayerToDisplayErrorMsg)), !this._isLoading && this.mapView &&
            h("calcite-list", { "selection-appearance": "border", "selection-mode": this.showNextIcon ? "none" : "single-persist" }, this.renderLayerList())));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Fetch the ids of the layers from the map
     * @returns Promise when the operation has completed
     * @protected
     */
    async setLayers() {
        if (this.mapView) {
            await this.initLayerHash();
        }
    }
    /**
     * Create a layer hash for layer name display
     * @returns Promise when the operation has completed
     * @protected
     */
    async initLayerHash() {
        const def = [];
        this._layerItemsHash = await getMapLayerHash(this.mapView, true);
        const allMapLayers = await getAllLayers(this.mapView);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        allMapLayers.forEach(async (eachLayer) => {
            var _a, _b;
            //TODO: checking editable condition could be configurable
            if ((eachLayer === null || eachLayer === void 0 ? void 0 : eachLayer.type) === "feature" && (eachLayer === null || eachLayer === void 0 ? void 0 : eachLayer.editingEnabled) && ((_b = (_a = eachLayer === null || eachLayer === void 0 ? void 0 : eachLayer.capabilities) === null || _a === void 0 ? void 0 : _a.operations) === null || _b === void 0 ? void 0 : _b.supportsAdd)) {
                this._layerItemsHash[eachLayer.id].supportsAdd = true;
                if (this.showFeatureCount) {
                    const q = eachLayer.createQuery();
                    const result = eachLayer.queryFeatureCount(q);
                    def.push(result);
                    void result.then(async (resCount) => {
                        const formattedCount = !isNaN(resCount) ? await formatNumber(resCount, {
                            places: 0,
                            api: 4,
                            type: "decimal"
                        }) : "";
                        this._layerItemsHash[eachLayer.id].formattedFeatureCount = formattedCount;
                    });
                }
            }
        });
        await Promise.all(def).then(() => {
            const editableLayerIds = this.getEditableIds(this._layerItemsHash);
            this._mapLayerIds = editableLayerIds.reverse();
            this.handleNoLayersToDisplay();
        }, () => {
            this._mapLayerIds = [];
            this.handleNoLayersToDisplay();
        });
    }
    /**
     * Set no layers to display state and emit event
     */
    handleNoLayersToDisplay() {
        this._noLayersToDisplay = !(this._mapLayerIds.length > 0);
        this.layersListLoaded.emit(this._mapLayerIds);
    }
    /**
     * Returns the ids of all OR configured layers that support edits with the update capability
     * @param hash each layer item details
     * @returns array of layer ids
     */
    getEditableIds(hash) {
        var _a;
        const configuredLayers = ((_a = this.layers) === null || _a === void 0 ? void 0 : _a.length) > 0 ? this.layers : [];
        return Object.keys(hash).reduce((prev, cur) => {
            let showLayer = hash[cur].supportsAdd;
            if ((configuredLayers === null || configuredLayers === void 0 ? void 0 : configuredLayers.length) > 0) {
                showLayer = configuredLayers.indexOf(cur) > -1 ? hash[cur].supportsAdd : false;
            }
            if (showLayer) {
                prev.push(cur);
            }
            return prev;
        }, []);
    }
    /**
     * Render feature layer list
     * @returns layer list
     * @protected
     */
    renderLayerList() {
        return this._mapLayerIds.length > 0 && this._mapLayerIds.reduce((prev, layerId) => {
            if (this._layerItemsHash[layerId]) {
                prev.push(this.getLayerListItem(layerId));
            }
            return prev;
        }, []);
    }
    /**
     * Get each item
     * @param layerId Layer id
     * @returns individual item
     * @protected
     */
    getLayerListItem(layerId) {
        const layerName = this._layerItemsHash[layerId].name;
        const featureCount = this._layerItemsHash[layerId].formattedFeatureCount;
        return (h("calcite-list-item", { onCalciteListItemSelect: () => { this.onLayerItemSelected(layerId); } }, h("div", { class: "layer-name", slot: "content-start" }, layerName), this.showFeatureCount && featureCount !== undefined && featureCount !== "" && h("div", { class: !this.showNextIcon ? "feature-count" : "", slot: "content-end" }, "(" + featureCount + ")"), this.showNextIcon && h("calcite-icon", { icon: "chevron-right", scale: "s", slot: "content-end" })));
    }
    /**On click of layer list item emit the event along with the selected layerId and layerName
     * @param layerId Layer id
     * @protected
     */
    onLayerItemSelected(layerId) {
        this.layerSelect.emit({ layerId, layerName: this._layerItemsHash[layerId].name });
    }
    /**
     * Fetches the component's translations
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get is() { return "layer-list"; }
    static get originalStyleUrls() {
        return {
            "$": ["layer-list.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["layer-list.css"]
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
            "layers": {
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
                    "text": "string[]: If passed will show only these layers in the list if they are present in map and are editable"
                }
            },
            "noLayerErrorMsg": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "string: Error message to be displayed when no layers found"
                },
                "attribute": "no-layer-error-msg",
                "reflect": false
            },
            "showFeatureCount": {
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
                    "text": "boolean: if true display's feature count for each layer"
                },
                "attribute": "show-feature-count",
                "reflect": false,
                "defaultValue": "true"
            },
            "showNextIcon": {
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
                    "text": "boolean: If true display's arrow icon on each layer item"
                },
                "attribute": "show-next-icon",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "_noLayersToDisplay": {},
            "_mapLayerIds": {},
            "_isLoading": {},
            "_translations": {}
        };
    }
    static get events() {
        return [{
                "method": "layerSelect",
                "name": "layerSelect",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when feature layer clicked with details layerId and layerName"
                },
                "complexType": {
                    "original": "{ layerId: string, layerName: string }",
                    "resolved": "{ layerId: string; layerName: string; }",
                    "references": {}
                }
            }, {
                "method": "layersListLoaded",
                "name": "layersListLoaded",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when list of layers to be listed are created.\r\nWhen empty array received in this event means no valid layers are found to be listed"
                },
                "complexType": {
                    "original": "string[]",
                    "resolved": "string[]",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "refresh": {
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
                    "text": "Refresh the layer list which will fetch the latest layer count and update the list",
                    "tags": [{
                            "name": "returns",
                            "text": "Promise that resolves when the operation is complete"
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
}
