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
        this.addresseeLayer = undefined;
        this.enabledLayerIds = [];
        this.locale = undefined;
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
     * boolean: Indicates if any new graphics should be added or removed
     */
    _addEnabled = true;
    /**
     * HTMLMapDrawToolsElement: The tools used to create graphics
     */
    _drawTools;
    /**
     * ISelectionSet[]: The current list of selection sets
     */
    _refineSets = [];
    /**
     * string[]: The list of all layers that have current selections
     */
    _enabledLayerIds = [];
    /**
     * HTMLMapLayerPickerElement: The layer picker used to define what layer you are refining
     */
    _layerPicker;
    /**
     * {<layer id>: Graphic[]}: Collection of graphics returned from queries to the layer
     */
    _featuresCollection = {};
    /**
     * ISelectionSet: The current selection set to refine
     */
    _refineSelectionSet;
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
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when selection starts or ends.
     */
    selectionLoadingChange;
    /**
     * Emitted on demand when selection sets change.
     *
     */
    selectionSetsChanged;
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
        const layerPickerClass = this._enabledLayerIds.length > 1 ? "display-block" : "display-none";
        return (h(Host, { key: 'b7322ad26466e7c710b08b1cd10edf3e82d18603' }, h("div", { key: '05289c139685611149306ade3b9217c374bf54e7', class: layerPickerClass + " padding-top-sides-1" }, h("div", { key: 'a24e1b1ffb921bb493fb4c0e06b455e564077ad2', class: "display-flex" }, h("calcite-label", { key: 'a6e25d7f0ad1a3aab589bd4731a1fbea87b08b5b', class: "font-bold width-full label-margin-0" }, h("div", { key: 'd1850cec01ff43a81dfe5d71dc0b88f4fb4de147', class: "display-flex" }, this._translations.inputLayer, h("calcite-icon", { key: 'ed94bff762eb431bef9207c1db6b9dd5f56d7132', class: "padding-start-1-2 icon", flipRtl: !(this.locale?.toLowerCase() === "he"), icon: "question", id: "refine-input-layer", scale: "s" })), h("map-layer-picker", { key: '5da6c655606a2b1ad4f723c13d0b2c5a50464029', enabledLayerIds: this._enabledLayerIds, mapView: this.mapView, onLayerSelectionChange: (evt) => { void this._layerSelectionChange(evt); }, ref: (el) => { this._layerPicker = el; }, selectedIds: [this._refineLayer.layer.id], showTables: false })), h("calcite-popover", { key: '3bfe937cd5d2c8cc9a2e1b5628a86bc44b529963', closable: true, label: "", referenceElement: "refine-input-layer" }, h("span", { key: 'cc46053c7494631c07521857e90ae83dc3f440cc', class: "tooltip-message" }, this._translations.inputLayerTip)))), h("div", { key: '4ceced950b73cc06d28cac4f76d52126249bdbbd', class: "padding-1" }, h("div", { key: '5084d664578acd35c550c57d8c7a27cf97f06332', class: "padding-bottom-1" }, h("calcite-segmented-control", { key: '965f42a4b3b3c19401681be1f86ab41dcc58a24a', class: "w-100", width: "full" }, h("calcite-segmented-control-item", { key: 'dad9b9c04c8fcdda7d5cad7c044fb592b6f740bf', checked: this._addEnabled, class: "w-50 word-wrap-anywhere", onClick: () => this._setSelectionMode(ESelectionMode.ADD), value: ESelectionMode.ADD }, h("span", { key: '0cf895d959f14966736b22d4652f406c75af5c0e', class: "font-weight-500" }, this._translations.add)), h("calcite-segmented-control-item", { key: '6f0c8158159215d5a0929deb62c97db5058545a3', checked: !this._addEnabled, class: "w-50 word-wrap-anywhere", onClick: () => this._setSelectionMode(ESelectionMode.REMOVE), value: ESelectionMode.REMOVE }, h("span", { key: '77c66ccd25105c2be67178303d0652a90fa97e35', class: "font-weight-500" }, this._translations.remove)))), h("div", { key: '0e409d21bda555363c9a0e870cba3e2f9556bcbb' }, h("map-draw-tools", { key: 'd84888210ce4c31442a523dc5976fee6bd246b9c', active: true, drawMode: EDrawMode.REFINE, mapView: this.mapView, onDrawRedo: () => this._redo(), onDrawUndo: () => this._undo(), onSketchGraphicsChange: (evt) => this._sketchGraphicsChanged(evt), pointSymbol: this.sketchPointSymbol, polygonSymbol: this.sketchPolygonSymbol, polylineSymbol: this.sketchLineSymbol, redoEnabled: this._refineSelectionSet?.redoStack.length > 0, ref: (el) => { this._drawTools = el; }, undoEnabled: this._refineSelectionSet?.undoStack.length > 0 })), h("br", { key: 'b66849ca294e717352e34ac647f69bef36ba9755' }), (h("calcite-list", { key: '8e13006094c5b9d5d63d467d5938e95d00e42ded', class: "list-border" }, this._getRefineSelectionSetList())))));
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
        const geom = evt.detail?.graphics[0].geometry;
        void this._selectFeatures(geom);
    }
    /**
     * Get the layer ids for all layers in the selection sets
     *
     * @protected
     */
    _getEnabledLayerIds() {
        return this.selectionSets.reduce((prev, cur) => {
            const id = cur?.layerView?.layer.id;
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
            selectionSet.refineInfos = { ...selectionSet.refineInfos, ...refineInfo };
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
        this.selectionLoadingChange.emit(true);
        this._featuresCollection[this._refineLayer?.layer.id] = [];
        const response = await queryFeaturesByGeometry(0, this._refineLayer?.layer, geom, this._featuresCollection);
        this.selectionLoadingChange.emit(false);
        let graphics = [];
        Object.keys(response).forEach(k => {
            if (k === this._refineLayer?.layer.id) {
                graphics = graphics.concat(response[k]);
            }
        });
        const oids = Array.isArray(graphics) ? graphics.map(g => g.attributes[g?.layer?.objectIdField]) : [];
        await this._updateIds(oids, this._selectionMode, this._refineSelectionSet.undoStack, this._refineLayer);
        void this._drawTools.clear();
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
            "locale": {
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
                    "text": "string: The current user locale."
                },
                "attribute": "locale",
                "reflect": false
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
