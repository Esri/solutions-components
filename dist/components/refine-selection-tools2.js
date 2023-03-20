/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as ESelectionType, f as ERefineMode, e as ESelectionMode } from './interfaces3.js';
import { l as loadModules } from './loadModules.js';
import { a as getMapLayerView, h as highlightFeatures, d as defineCustomElement$1 } from './map-layer-picker2.js';
import { d as queryFeaturesByGeometry } from './queryUtils.js';
import { s as state } from './publicNotificationStore.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$9 } from './action.js';
import { d as defineCustomElement$8 } from './chip.js';
import { d as defineCustomElement$7 } from './combobox.js';
import { d as defineCustomElement$6 } from './combobox-item.js';
import { d as defineCustomElement$5 } from './icon.js';
import { d as defineCustomElement$4 } from './loader.js';
import { d as defineCustomElement$3 } from './option.js';
import { d as defineCustomElement$2 } from './select.js';

const refineSelectionToolsCss = ":host{display:block}.div-visible{display:inherit}.div-not-visible{display:none !important}.padding-top-1-2{padding-top:.5rem}.main-label{display:flex;float:left}html[dir=\"rtl\"] .main-label{display:flex;float:right}.border{outline:1px solid var(--calcite-ui-border-input)}.margin-top-1{margin-top:1rem}.esri-sketch{display:flex;flex-flow:column wrap}.esri-widget{box-sizing:border-box;color:#323232;font-size:14px;font-family:\"Avenir Next\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;line-height:1.3em;background-color:var(--calcite-ui-foreground-1)}.esri-sketch__panel{align-items:center;display:flex;flex-flow:row nowrap;padding:0}*/ .esri-sketch__tool-section{border-right:1px solid rgba(110,110,110,.3)}.esri-sketch__section{align-items:center;display:flex;flex-flow:row nowrap;padding:0 7px;margin:6px 0;border-right:1px solid rgba(110,110,110,.3)}";

const RefineSelectionTools = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.selectionLoadingChange = createEvent(this, "selectionLoadingChange", 7);
    this.refineSelectionGraphicsChange = createEvent(this, "refineSelectionGraphicsChange", 7);
    this.refineSelectionIdsChange = createEvent(this, "refineSelectionIdsChange", 7);
    /**
     * {<layer id>: Graphic[]}: Collection of graphics returned from queries to the layer
     */
    this._featuresCollection = {};
    this.active = false;
    this.border = false;
    this.enabledLayerIds = [];
    this.graphics = undefined;
    this.ids = [];
    this.layerView = undefined;
    this.layerViews = [];
    this.mapView = undefined;
    this.mode = undefined;
    this.refineMode = undefined;
    this.refineSelectionSet = undefined;
    this.useLayerPicker = true;
    this._selectEnabled = false;
    this._selectionMode = undefined;
    this._translations = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the ids prop is changed.
   * Highlight the features based on the provided ids
   */
  idsWatchHandler(v, oldV) {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      void this._highlightFeatures(v);
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------
  /**
   * Reset the ids collection
   *
   * @returns Promise when complete
   */
  async reset() {
    this.ids = [];
  }
  /**
   * Clear current highlight handle
   *
   * @returns Promise when complete
   */
  async clearHighlight() {
    this._clearHighlight();
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
    await this._initModules();
  }
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  componentDidLoad() {
    this._init();
  }
  /**
   * StencilJS: Called every time the component is disconnected from the DOM, ie,
   * it can be dispatched more than once, DO not confuse with a "onDestroy" kind of event.
   */
  disconnectedCallback() {
    this.active = false;
  }
  /**
   * Called every time the component is connected to the DOM.
   * When the component is first connected, this method is called before componentWillLoad.
   */
  connectedCallback() {
    this.active = true;
    if (this.ids.length > 0) {
      this._selectEnabled = true;
      void this._highlightFeatures(this.ids);
    }
  }
  /**
   * Renders the component.
   */
  render() {
    var _a, _b;
    const showLayerPickerClass = this.useLayerPicker ? "div-visible" : "div-not-visible";
    const drawClass = this.border ? " border" : "";
    const showUndoRedo = this.refineMode === ERefineMode.ALL ? "div-visible" : "div-not-visible";
    return (h(Host, null, h("div", null, h("map-layer-picker", { class: showLayerPickerClass, enabledLayerIds: this.enabledLayerIds, mapView: this.mapView, onLayerSelectionChange: (evt) => { void this._layerSelectionChange(evt); }, selectedLayerIds: this.layerViews.map(l => l.layer.id), selectionMode: "single" }), h("div", { class: "margin-top-1" + drawClass }, h("div", { class: "esri-sketch esri-widget" }, h("div", { class: "esri-sketch__panel" }, h("div", { class: "esri-sketch__tool-section esri-sketch__section" }, h("calcite-action", { disabled: !this._selectEnabled, icon: "pin", onClick: () => this._setSelectionMode(ESelectionType.POINT), scale: "s", text: this._translations.select }), h("calcite-action", { disabled: !this._selectEnabled, icon: "line", onClick: () => this._setSelectionMode(ESelectionType.LINE), scale: "s", text: this._translations.selectLine }), h("calcite-action", { disabled: !this._selectEnabled, icon: "polygon", onClick: () => this._setSelectionMode(ESelectionType.POLY), scale: "s", text: this._translations.selectPolygon }), h("calcite-action", { disabled: !this._selectEnabled, icon: "rectangle", onClick: () => this._setSelectionMode(ESelectionType.RECT), scale: "s", text: this._translations.selectRectangle })), h("div", { class: showUndoRedo + " esri-sketch__tool-section esri-sketch__section" }, h("calcite-action", { disabled: ((_a = this.refineSelectionSet) === null || _a === void 0 ? void 0 : _a.undoStack) ? this.refineSelectionSet.undoStack.length === 0 : true, icon: "undo", onClick: () => this._undo(), scale: "s", text: this._translations.undo }), h("calcite-action", { disabled: ((_b = this.refineSelectionSet) === null || _b === void 0 ? void 0 : _b.redoStack) ? this.refineSelectionSet.redoStack.length === 0 : true, icon: "redo", onClick: () => this._redo(), scale: "s", text: this._translations.redo }))))))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Initialize the graphics layer and skecth view model
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  _init() {
    this._initGraphicsLayer();
    this._initSketchViewModel();
  }
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _initModules() {
    const [GraphicsLayer, SketchViewModel] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/widgets/Sketch/SketchViewModel"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.SketchViewModel = SketchViewModel;
  }
  /**
   * Initialize the skecth view model
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  _initSketchViewModel() {
    this._sketchViewModel = new this.SketchViewModel({
      layer: this._sketchGraphicsLayer,
      defaultUpdateOptions: {
        tool: "reshape",
        toggleToolOnClick: false
      },
      view: this.mapView
    });
    this._sketchViewModel.on("create", (event) => {
      if (event.state === "complete" && this.active) {
        this._featuresCollection = {};
        this._sketchGeometry = event.graphic.geometry;
        void this._selectFeatures(this._sketchGeometry);
      }
    });
  }
  /**
   * Clear any skecth graphics
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  _clear() {
    this._sketchGeometry = null;
    this._sketchViewModel.cancel();
    this._sketchGraphicsLayer.removeAll();
  }
  /**
   * Initialize the graphics layer
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  _initGraphicsLayer() {
    const title = this._translations.sketchLayer;
    const sketchIndex = this.mapView.map.layers.findIndex((l) => l.title === title);
    if (sketchIndex > -1) {
      this._sketchGraphicsLayer = this.mapView.map.layers.getItemAt(sketchIndex);
    }
    else {
      this._sketchGraphicsLayer = new this.GraphicsLayer({ title, listMode: "hide" });
      state.managedLayers.push(title);
      this.mapView.map.layers.add(this._sketchGraphicsLayer);
    }
    if (this.graphics && this.graphics.length > 0) {
      this._sketchGraphicsLayer.addMany(this.graphics);
    }
  }
  /**
   * Clear selection based on map click
   *
   * @protected
   */
  _initHitTest() {
    if (this._hitTestHandle) {
      this._hitTestHandle.remove();
    }
    this._hitTestHandle = this.mapView.on("click", (event) => {
      event.stopPropagation();
      const opts = {
        include: this.layerViews.map(lv => lv.layer)
      };
      void this.mapView.hitTest(event, opts).then((response) => {
        let graphics = [];
        if (response.results.length > 0) {
          graphics = response.results.reduce((prev, cur) => {
            const g = cur === null || cur === void 0 ? void 0 : cur.graphic;
            if (g) {
              prev.push(g);
            }
            return prev;
          }, []);
        }
        this.refineSelectionGraphicsChange.emit({ graphics, useOIDs: false });
        this._clear();
      });
    });
  }
  /**
   * Gets the layer views from the map when the layer selection changes
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _layerSelectionChange(evt) {
    if (Array.isArray(evt.detail) && evt.detail.length > 0) {
      this._selectEnabled = true;
      const layerPromises = evt.detail.map(id => {
        return getMapLayerView(this.mapView, id);
      });
      return Promise.all(layerPromises).then((layerViews) => {
        this.layerViews = layerViews;
      });
    }
    else {
      this._selectEnabled = false;
    }
  }
  /**
   * Store the current selection mode
   *
   * @protected
   */
  _setSelectionMode(mode) {
    this._selectionMode = mode;
    if (this._hitTestHandle) {
      this._hitTestHandle.remove();
    }
    switch (this._selectionMode) {
      case ESelectionType.POINT:
        this._sketchViewModel.create("point");
        //this._initHitTest();
        break;
      case ESelectionType.LINE:
        this._sketchViewModel.create("polyline");
        break;
      case ESelectionType.POLY:
        this._sketchViewModel.create("polygon");
        break;
      case ESelectionType.RECT:
        this._sketchViewModel.create("rectangle");
        break;
    }
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
    const queryFeaturePromises = this.layerViews.map(layerView => {
      this._featuresCollection[layerView.layer.id] = [];
      return queryFeaturesByGeometry(0, layerView.layer, geom, this._featuresCollection);
    });
    return Promise.all(queryFeaturePromises).then(async (response) => {
      this.selectionLoadingChange.emit(false);
      let graphics = [];
      response.forEach(r => {
        Object.keys(r).forEach(k => {
          graphics = graphics.concat(r[k]);
        });
      });
      if (this.refineMode === ERefineMode.SUBSET) {
        this.refineSelectionGraphicsChange.emit({
          graphics,
          useOIDs: this.layerViews[0].layer.title === this.layerView.layer.title
        });
      }
      else {
        const oids = Array.isArray(graphics) ? graphics.map(g => { var _a; return g.attributes[(_a = g === null || g === void 0 ? void 0 : g.layer) === null || _a === void 0 ? void 0 : _a.objectIdField]; }) : [];
        await this._updateIds(oids, this.mode, this.refineSelectionSet.undoStack, this.mode);
      }
      this._clear();
    });
  }
  /**
   * Highlight any selected features in the map
   *
   * @returns Promise resolving when function is done
   * @protected
   */
  async _highlightFeatures(ids, updateExtent = false) {
    this._clearHighlight();
    if (ids.length > 0) {
      state.highlightHandle = await highlightFeatures(ids, this.layerViews[0], this.mapView, updateExtent);
    }
  }
  /**
   * Clear any highlighted features in the map
   *
   * @protected
   */
  _clearHighlight() {
    var _a;
    (_a = state.highlightHandle) === null || _a === void 0 ? void 0 : _a.remove();
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
  async _updateIds(oids, mode, operationStack, operationMode) {
    const idUpdates = { addIds: [], removeIds: [] };
    if (mode === ESelectionMode.ADD) {
      idUpdates.addIds = oids.filter(id => this.ids.indexOf(id) < 0);
      this.ids = [...this.ids, ...idUpdates.addIds];
      if (idUpdates.addIds.length > 0) {
        operationStack.push({ mode: operationMode, ids: idUpdates.addIds });
      }
    }
    else {
      idUpdates.removeIds = oids.filter(id => this.ids.indexOf(id) > -1);
      this.ids = this.ids.filter(id => idUpdates.removeIds.indexOf(id) < 0);
      if (idUpdates.removeIds.length > 0) {
        operationStack.push({ mode: operationMode, ids: idUpdates.removeIds });
      }
    }
    await this._highlightFeatures(this.ids).then(() => {
      this.refineSelectionIdsChange.emit(idUpdates);
    });
  }
  /**
   * Undo the most current ADD or REMOVE operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  _undo() {
    const undoOp = this.refineSelectionSet.undoStack.pop();
    void this._updateIds(undoOp.ids, undoOp.mode === ESelectionMode.ADD ? ESelectionMode.REMOVE : ESelectionMode.ADD, this.refineSelectionSet.redoStack, undoOp.mode);
  }
  /**
   * Redo the most current ADD or REMOVE operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  _redo() {
    const redoOp = this.refineSelectionSet.redoStack.pop();
    void this._updateIds(redoOp.ids, redoOp.mode, this.refineSelectionSet.undoStack, redoOp.mode);
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
  get el() { return this; }
  static get watchers() { return {
    "ids": ["idsWatchHandler"]
  }; }
  static get style() { return refineSelectionToolsCss; }
}, [1, "refine-selection-tools", {
    "active": [4],
    "border": [4],
    "enabledLayerIds": [16],
    "graphics": [1040],
    "ids": [16],
    "layerView": [16],
    "layerViews": [16],
    "mapView": [16],
    "mode": [1],
    "refineMode": [1, "refine-mode"],
    "refineSelectionSet": [1040],
    "useLayerPicker": [4, "use-layer-picker"],
    "_selectEnabled": [32],
    "_selectionMode": [32],
    "_translations": [32],
    "reset": [64],
    "clearHighlight": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["refine-selection-tools", "calcite-action", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-icon", "calcite-loader", "calcite-option", "calcite-select", "map-layer-picker"];
  components.forEach(tagName => { switch (tagName) {
    case "refine-selection-tools":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, RefineSelectionTools);
      }
      break;
    case "calcite-action":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "calcite-chip":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "calcite-combobox":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "calcite-combobox-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "calcite-option":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "calcite-select":
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

export { RefineSelectionTools as R, defineCustomElement as d };
