/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { e as ESelectionMode, b as EDrawMode, E as EWorkflowType } from './interfaces.js';
import { c as getFeatureLayerView, i as getIdSets, j as highlightAllFeatures } from './mapViewUtils.js';
import { f as queryFeaturesByGeometry } from './queryUtils.js';
import { s as state } from './publicNotificationStore.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$s } from './action.js';
import { d as defineCustomElement$r } from './button.js';
import { d as defineCustomElement$q } from './chip.js';
import { d as defineCustomElement$p } from './combobox.js';
import { d as defineCustomElement$o } from './combobox-item.js';
import { d as defineCustomElement$n } from './dropdown.js';
import { d as defineCustomElement$m } from './dropdown-group.js';
import { d as defineCustomElement$l } from './dropdown-item.js';
import { d as defineCustomElement$k } from './filter2.js';
import { d as defineCustomElement$j } from './handle.js';
import { d as defineCustomElement$i } from './icon.js';
import { d as defineCustomElement$h } from './input.js';
import { d as defineCustomElement$g } from './label2.js';
import { d as defineCustomElement$f } from './list.js';
import { d as defineCustomElement$e } from './list-item.js';
import { d as defineCustomElement$d } from './loader.js';
import { d as defineCustomElement$c } from './notice.js';
import { d as defineCustomElement$b } from './option.js';
import { d as defineCustomElement$a } from './popover.js';
import { d as defineCustomElement$9 } from './progress.js';
import { d as defineCustomElement$8 } from './scrim.js';
import { d as defineCustomElement$7 } from './segmented-control.js';
import { d as defineCustomElement$6 } from './segmented-control-item.js';
import { d as defineCustomElement$5 } from './select.js';
import { d as defineCustomElement$4 } from './stack.js';
import { d as defineCustomElement$3 } from './tooltip.js';
import { d as defineCustomElement$2 } from './map-draw-tools2.js';
import { d as defineCustomElement$1 } from './map-layer-picker2.js';

const refineSelectionCss = ":host{display:block}.div-visible{display:inherit}.div-not-visible{display:none !important}.padding-top-1-2{padding-top:.5rem}.main-label{display:flex;float:left}html[dir=\"rtl\"] .main-label{display:flex;float:right}.border{outline:1px solid var(--calcite-color-border-input)}.margin-top-1{margin-top:1rem}.esri-sketch{display:flex;flex-flow:column wrap}.esri-widget{box-sizing:border-box;color:#323232;font-size:14px;font-family:\"Avenir Next\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;line-height:1.3em;background-color:var(--calcite-color-foreground-1)}.esri-sketch__panel{align-items:center;display:flex;flex-flow:row nowrap;padding:0}*/ .esri-sketch__tool-section{border-right:1px solid rgba(110, 110, 110, .3)}.esri-sketch__section{align-items:center;display:flex;flex-flow:row nowrap;padding:0 7px;margin:6px 0;border-right:1px solid rgba(110, 110, 110, .3)}.display-flex{display:flex}.font-bold{font-weight:bold}.width-full{width:100%}.label-margin-0{--calcite-label-margin-bottom:0}.padding-start-1-2{padding-inline-start:0.5rem}.font-weight-500{font-weight:500}.word-wrap-anywhere{word-wrap:anywhere}";
const RefineSelectionStyle0 = refineSelectionCss;

const RefineSelection = /*@__PURE__*/ proxyCustomElement(class RefineSelection extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.selectionLoadingChange = createEvent(this, "selectionLoadingChange", 7);
        this.selectionSetsChanged = createEvent(this, "selectionSetsChanged", 7);
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
    get el() { return this; }
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
    static get style() { return RefineSelectionStyle0; }
}, [0, "refine-selection", {
        "addresseeLayer": [16],
        "enabledLayerIds": [16],
        "locale": [1],
        "mapView": [16],
        "selectionSets": [1040],
        "sketchLineSymbol": [16],
        "sketchPointSymbol": [16],
        "sketchPolygonSymbol": [16],
        "_translations": [32],
        "_selectionMode": [32],
        "_refineLayer": [32]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["refine-selection", "calcite-action", "calcite-button", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-dropdown", "calcite-dropdown-group", "calcite-dropdown-item", "calcite-filter", "calcite-handle", "calcite-icon", "calcite-input", "calcite-label", "calcite-list", "calcite-list-item", "calcite-loader", "calcite-notice", "calcite-option", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-segmented-control", "calcite-segmented-control-item", "calcite-select", "calcite-stack", "calcite-tooltip", "map-draw-tools", "map-layer-picker"];
    components.forEach(tagName => { switch (tagName) {
        case "refine-selection":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RefineSelection);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$s();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$r();
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$q();
            }
            break;
        case "calcite-combobox":
            if (!customElements.get(tagName)) {
                defineCustomElement$p();
            }
            break;
        case "calcite-combobox-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$o();
            }
            break;
        case "calcite-dropdown":
            if (!customElements.get(tagName)) {
                defineCustomElement$n();
            }
            break;
        case "calcite-dropdown-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$m();
            }
            break;
        case "calcite-dropdown-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$l();
            }
            break;
        case "calcite-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-label":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-list-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-segmented-control":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-segmented-control-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-stack":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "map-draw-tools":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "map-layer-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RefineSelection as R, defineCustomElement as d };
