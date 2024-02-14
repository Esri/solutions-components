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
import { EDrawMode, ESelectionMode, EWorkflowType } from "../../utils/interfaces";
import { getIdSets, getFeatureLayerView, highlightAllFeatures } from "../../utils/mapViewUtils";
import { queryFeaturesByGeometry } from "../../utils/queryUtils";
import state from "../../utils/publicNotificationStore";
import { getLocaleComponentStrings } from "../../utils/locale";
export class RefineSelection {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties (protected)
        //
        //--------------------------------------------------------------------------
        /**
         * boolean: Indicates if any new graphics should be added or removed
         */
        this._addEnabled = true;
        /**
         * ISelectionSet[]: The current list of selection sets
         */
        this._refineSets = [];
        /**
         * string[]: The list of all layers that have current selections
         */
        this._enabledLayerIds = [];
        /**
         * {<layer id>: Graphic[]}: Collection of graphics returned from queries to the layer
         */
        this._featuresCollection = {};
        this.addresseeLayer = undefined;
        this.enabledLayerIds = [];
        this.mapView = undefined;
        this.selectionSets = [];
        this.sketchLineSymbol = undefined;
        this.sketchPointSymbol = undefined;
        this.sketchPolygonSymbol = undefined;
        this._translations = undefined;
        this._selectionMode = ESelectionMode.ADD;
        this._refineLayer = undefined;
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
        await this._getTranslations();
        this._enabledLayerIds = this._getEnabledLayerIds();
        await this._setRefineSet(this._enabledLayerIds[0]);
    }
    /**
     * Renders the component.
     */
    render() {
        var _a, _b;
        const layerPickerClass = this._enabledLayerIds.length > 1 ? "display-block" : "display-none";
        return (h(Host, null, h("div", { class: layerPickerClass + " padding-top-sides-1" }, h("div", { class: "display-flex" }, h("calcite-label", { class: "font-bold width-full label-margin-0" }, h("div", { class: "display-flex" }, this._translations.inputLayer, h("calcite-icon", { class: "padding-start-1-2 icon", icon: "question", id: "refine-input-layer", scale: "s" })), h("map-layer-picker", { enabledLayerIds: this._enabledLayerIds, mapView: this.mapView, onLayerSelectionChange: (evt) => { void this._layerSelectionChange(evt); }, ref: (el) => { this._layerPicker = el; }, selectedIds: [this._refineLayer.layer.id], showTables: false })), h("calcite-popover", { closable: true, label: "", referenceElement: "refine-input-layer" }, h("span", { class: "tooltip-message" }, this._translations.inputLayerTip)))), h("div", { class: "padding-1" }, h("div", { class: "padding-bottom-1" }, h("calcite-segmented-control", { class: "w-100", width: "full" }, h("calcite-segmented-control-item", { checked: this._addEnabled, class: "w-50 word-wrap-anywhere", onClick: () => this._setSelectionMode(ESelectionMode.ADD), value: ESelectionMode.ADD }, h("span", { class: "font-weight-500" }, this._translations.add)), h("calcite-segmented-control-item", { checked: !this._addEnabled, class: "w-50 word-wrap-anywhere", onClick: () => this._setSelectionMode(ESelectionMode.REMOVE), value: ESelectionMode.REMOVE }, h("span", { class: "font-weight-500" }, this._translations.remove)))), h("div", null, h("map-draw-tools", { active: true, drawMode: EDrawMode.REFINE, mapView: this.mapView, onDrawRedo: () => this._redo(), onDrawUndo: () => this._undo(), onSketchGraphicsChange: (evt) => this._sketchGraphicsChanged(evt), pointSymbol: this.sketchPointSymbol, polygonSymbol: this.sketchPolygonSymbol, polylineSymbol: this.sketchLineSymbol, redoEnabled: ((_a = this._refineSelectionSet) === null || _a === void 0 ? void 0 : _a.redoStack.length) > 0, ref: (el) => { this._drawTools = el; }, undoEnabled: ((_b = this._refineSelectionSet) === null || _b === void 0 ? void 0 : _b.undoStack.length) > 0 })), h("br", null), (h("calcite-list", { class: "list-border" }, this._getRefineSelectionSetList())))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Set the user selected layer as the current refine layer
     *
     * @param evt contains the selected layer id
     *
     * @protected
     */
    _layerSelectionChange(evt) {
        const id = evt.detail[0];
        void this._setRefineSet(id);
    }
    /**
     * Store the current selection mode
     *
     * @param selectionMode the current selection mode ADD || REMOVE
     *
     * @protected
     */
    _setSelectionMode(selectionMode) {
        this._selectionMode = selectionMode;
    }
    /**
     * Select features based on the user drawn geometry
     *
     * @param evt ISketchGraphicsChange stores the new graphics and a boolean useOIDs
     * useOIDs is leveraged in some situations to use the feature OIDs rather than the graphic geometry
     *
     * @protected
     */
    _sketchGraphicsChanged(evt) {
        var _a;
        const geom = (_a = evt.detail) === null || _a === void 0 ? void 0 : _a.graphics[0].geometry;
        void this._selectFeatures(geom);
    }
    /**
     * Get the layer ids for all layers in the selection sets
     *
     * @protected
     */
    _getEnabledLayerIds() {
        return this.selectionSets.reduce((prev, cur) => {
            var _a;
            const id = (_a = cur === null || cur === void 0 ? void 0 : cur.layerView) === null || _a === void 0 ? void 0 : _a.layer.id;
            if (id && prev.indexOf(id) < 0) {
                prev.push(id);
            }
            else if (cur.workflowType === EWorkflowType.REFINE) {
                Object.keys(cur.refineInfos).forEach(k => {
                    if (prev.indexOf(k) < 0) {
                        prev.push(k);
                    }
                });
            }
            return prev;
        }, []);
    }
    /**
     * Set the refine layer...any adds or removes will be done against this layer
     *
     * @param id the id of the layer that should be used as the current refine layer
     *
     * @protected
     */
    async _setRefineSet(id) {
        if (!this.selectionSets.some((ss) => {
            if (ss.workflowType === EWorkflowType.REFINE) {
                this._refineSelectionSet = ss;
                return Object.keys(ss.refineInfos).indexOf(id) > -1;
            }
        })) {
            await this._initRefineSet(id, this._refineSelectionSet);
        }
        this._refineLayer = this._refineSelectionSet.refineInfos[id].layerView;
    }
    /**
     * Initialize the refine selection set
     *
     * @param id the layer id to use for the refine selection set
     * @param selectionSet the current refine selection set
     *
     * @protected
     */
    async _initRefineSet(id, selectionSet) {
        const refineInfo = {};
        refineInfo[id] = {
            addIds: [],
            removeIds: [],
            layerView: await getFeatureLayerView(this.mapView, id)
        };
        if (selectionSet) {
            selectionSet.refineInfos = Object.assign(Object.assign({}, selectionSet.refineInfos), refineInfo);
        }
        else {
            this._refineSelectionSet = {
                id: Date.now(),
                searchResult: undefined,
                buffer: undefined,
                distance: 0,
                download: true,
                unit: "feet",
                label: "Refine",
                selectedIds: [],
                layerView: undefined,
                geometries: [],
                graphics: [],
                selectLayers: [],
                workflowType: EWorkflowType.REFINE,
                searchDistanceEnabled: false,
                useLayerFeaturesEnabled: false,
                refineInfos: refineInfo,
                redoStack: [],
                undoStack: [],
                sketchGraphic: undefined
            };
            this.selectionSets.push(this._refineSelectionSet);
        }
    }
    /**
     * Undo the most current ADD or REMOVE operation
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    _undo() {
        const undoOp = this._refineSelectionSet.undoStack.pop();
        void this._updateIds(undoOp.ids, undoOp.mode === ESelectionMode.ADD ? ESelectionMode.REMOVE : ESelectionMode.ADD, this._refineSelectionSet.redoStack, undoOp.layerView);
    }
    /**
     * Redo the most current ADD or REMOVE operation
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    _redo() {
        const redoOp = this._refineSelectionSet.redoStack.pop();
        void this._updateIds(redoOp.ids, redoOp.mode === ESelectionMode.ADD ? ESelectionMode.REMOVE : ESelectionMode.ADD, this._refineSelectionSet.undoStack, redoOp.layerView);
    }
    /**
     * Create a list to show the number added/removed/total unique selected
     *
     * @returns the list node
     * @protected
     */
    _getRefineSelectionSetList() {
        const total = this._getTotal(this.selectionSets);
        let refineSet;
        this.selectionSets.some(ss => {
            if (ss.workflowType === EWorkflowType.REFINE) {
                refineSet = ss;
                return true;
            }
        });
        let numAdded = 0;
        let numRemoved = 0;
        Object.keys(refineSet.refineInfos).forEach(k => {
            numAdded += refineSet.refineInfos[k].addIds.length;
            numRemoved += refineSet.refineInfos[k].removeIds.length;
        });
        return [(h("calcite-list-item", { label: this._translations.featuresAdded.replace("{{n}}", numAdded.toString()), "non-interactive": true })), (h("calcite-list-item", { label: this._translations.featuresRemoved.replace("{{n}}", numRemoved.toString()), "non-interactive": true })), (h("calcite-list-item", { label: this._translations.totalSelected.replace("{{n}}", total.toString()), "non-interactive": true }))];
    }
    /**
     * Get the total number od ids across all selection sets
     *
     * @returns the total number of ids
     * @protected
     */
    _getTotal(selectionSets) {
        const idSets = getIdSets(selectionSets);
        return Object.keys(idSets).reduce((prev, cur) => {
            const idSet = idSets[cur];
            prev += idSet.ids.length;
            return prev;
        }, 0);
    }
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    async _getTranslations() {
        const translations = await getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
    /**
     * Select features based on the input geometry
     *
     * @param geom the geometry used for selection
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _selectFeatures(geom) {
        var _a, _b;
        this.selectionLoadingChange.emit(true);
        this._featuresCollection[(_a = this._refineLayer) === null || _a === void 0 ? void 0 : _a.layer.id] = [];
        const response = await queryFeaturesByGeometry(0, (_b = this._refineLayer) === null || _b === void 0 ? void 0 : _b.layer, geom, this._featuresCollection);
        this.selectionLoadingChange.emit(false);
        let graphics = [];
        Object.keys(response).forEach(k => {
            var _a;
            if (k === ((_a = this._refineLayer) === null || _a === void 0 ? void 0 : _a.layer.id)) {
                graphics = graphics.concat(response[k]);
            }
        });
        const oids = Array.isArray(graphics) ? graphics.map(g => { var _a; return g.attributes[(_a = g === null || g === void 0 ? void 0 : g.layer) === null || _a === void 0 ? void 0 : _a.objectIdField]; }) : [];
        await this._updateIds(oids, this._selectionMode, this._refineSelectionSet.undoStack, this._refineLayer);
        this._drawTools.clear();
    }
    /**
     * Highlight any selected features in the map
     *
     * @returns Promise resolving when function is done
     * @protected
     */
    async _highlightFeatures() {
        this._clearHighlight();
        state.highlightHandles = await highlightAllFeatures(this.selectionSets);
    }
    /**
     * Clear any highlighted features in the map
     *
     * @protected
     */
    _clearHighlight() {
        state.removeHandles();
    }
    /**
     * Update the ids for any ADD or REMOVE operation and highlight the features.
     *
     * @param oids the ids to add or remove
     * @param mode ADD or REMOVE this will control if the ids are added or removed
     * @param operationStack the undo or redo stack to push the operation to
     * @param operationMode ADD or REMOVE the mode of the individual refine operation
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _updateIds(ids, mode, operationStack, layerView) {
        let selectionSetsChanged = false;
        const refineInfos = this._refineSelectionSet.refineInfos;
        const layerId = layerView.layer.id;
        const newRefineInfo = {};
        newRefineInfo[layerId] = {
            addIds: [],
            removeIds: [],
            layerView
        };
        const idUpdates = Object.keys(refineInfos).indexOf(layerId) > -1 ?
            refineInfos[layerId] : newRefineInfo[layerId];
        if (mode === ESelectionMode.ADD) {
            idUpdates.addIds = [...new Set([...ids, ...idUpdates.addIds])];
            if (idUpdates.addIds.length > 0) {
                operationStack.push({
                    ids,
                    mode,
                    layerView
                });
            }
            if (idUpdates.removeIds.length > 0) {
                idUpdates.removeIds = idUpdates.removeIds.filter(id => ids.indexOf(id) < 0);
            }
        }
        else {
            // ids are a result of the drawn geom...so it's possible they could contain ids that do
            // not exist in other selection sets
            const validIds = this.selectionSets.reduce((prev, cur) => {
                ids.forEach(id => {
                    if (cur.workflowType !== EWorkflowType.REFINE) {
                        if (cur.selectedIds.indexOf(id) > -1) {
                            prev.push(id);
                        }
                    }
                    else {
                        Object.keys(cur.refineInfos).some(k => {
                            const refineInfo = cur.refineInfos[k];
                            if (refineInfo.layerView.layer.id === layerView.layer.id && refineInfo.addIds.indexOf(id) > -1) {
                                prev.push(id);
                                return true;
                            }
                        });
                    }
                });
                return prev;
            }, []);
            idUpdates.removeIds = [...new Set([...validIds, ...idUpdates.removeIds])];
            idUpdates.addIds = idUpdates.addIds.filter(id => validIds.indexOf(id) < 0);
            if (idUpdates.removeIds.length > 0) {
                operationStack.push({
                    ids: validIds,
                    mode,
                    layerView
                });
            }
            this.selectionSets = this.selectionSets.reduce((prev, cur) => {
                if (cur.workflowType !== EWorkflowType.REFINE &&
                    cur.layerView.layer.id === layerView.layer.id) {
                    cur.selectedIds = cur.selectedIds.filter(id => idUpdates.removeIds.indexOf(id) < 0);
                    if (cur.selectedIds.length > 0) {
                        prev.push(cur);
                    }
                    else {
                        selectionSetsChanged = true;
                    }
                }
                else {
                    prev.push(cur);
                }
                return prev;
            }, []);
        }
        this._refineSelectionSet.refineInfos[layerId] = idUpdates;
        this.selectionSets = [...this.selectionSets];
        if (selectionSetsChanged) {
            this.selectionSetsChanged.emit(this.selectionSets);
        }
        await this._highlightFeatures();
    }
    static get is() { return "refine-selection"; }
    static get originalStyleUrls() {
        return {
            "$": ["refine-selection.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["refine-selection.css"]
        };
    }
    static get properties() {
        return {
            "addresseeLayer": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.FeatureLayerView",
                    "resolved": "FeatureLayerView",
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
                    "text": "esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html"
                }
            },
            "enabledLayerIds": {
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
                    "text": "string[]: Optional list of enabled layer ids\r\n If empty all layers will be available"
                },
                "defaultValue": "[]"
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
                    "text": "esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html"
                }
            },
            "selectionSets": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "ISelectionSet[]",
                    "resolved": "ISelectionSet[]",
                    "references": {
                        "ISelectionSet": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::ISelectionSet"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "utils/interfaces/ISelectionSet: An array of user defined selection sets"
                },
                "defaultValue": "[]"
            },
            "sketchLineSymbol": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.SimpleLineSymbol",
                    "resolved": "SimpleLineSymbol",
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
                    "text": "esri/symbols/SimpleLineSymbol | JSON representation : https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html"
                }
            },
            "sketchPointSymbol": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.SimpleMarkerSymbol",
                    "resolved": "SimpleMarkerSymbol",
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
                    "text": "esri/symbols/SimpleMarkerSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html"
                }
            },
            "sketchPolygonSymbol": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.SimpleFillSymbol",
                    "resolved": "SimpleFillSymbol",
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
                    "text": "esri/symbols/SimpleFillSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html"
                }
            }
        };
    }
    static get states() {
        return {
            "_translations": {},
            "_selectionMode": {},
            "_refineLayer": {}
        };
    }
    static get events() {
        return [{
                "method": "selectionLoadingChange",
                "name": "selectionLoadingChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when selection starts or ends."
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }, {
                "method": "selectionSetsChanged",
                "name": "selectionSetsChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when selection sets change."
                },
                "complexType": {
                    "original": "ISelectionSet[]",
                    "resolved": "ISelectionSet[]",
                    "references": {
                        "ISelectionSet": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::ISelectionSet"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
}
