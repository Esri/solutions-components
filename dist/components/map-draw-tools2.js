/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { s as state } from './publicNotificationStore.js';
import { g as getLocaleComponentStrings } from './locale.js';

const mapDrawToolsCss = ":host{display:block}.border{outline:1px solid var(--calcite-ui-border-input)}.div-visible{display:inherit}.div-not-visible{display:none !important}.padding-top-1-2{padding-top:.5rem}.main-label{display:flex;float:left}html[dir=\"rtl\"] .main-label{display:flex;float:right}.margin-top-1{margin-top:1rem}";

const MapDrawTools = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.selectionLoadingChange = createEvent(this, "selectionLoadingChange", 7);
    this.sketchGraphicsChange = createEvent(this, "sketchGraphicsChange", 7);
    this.active = false;
    this.graphics = undefined;
    this.mapView = undefined;
    this.pointSymbol = undefined;
    this.polylineSymbol = undefined;
    this.polygonSymbol = undefined;
    this._translations = undefined;
    this._selectionMode = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the graphics prop is changed.
   */
  graphicsWatchHandler(v, oldV) {
    if (v && v.length > 0 && JSON.stringify(v) !== JSON.stringify(oldV) && this._sketchGraphicsLayer) {
      this._sketchGraphicsLayer.removeAll();
      this._sketchGraphicsLayer.addMany(v);
    }
  }
  /**
   * Called each time the mapView prop is changed.
   */
  mapViewWatchHandler(v, oldV) {
    if (v && v !== oldV) {
      this._init();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------
  /**
   * Clears the user drawn graphics
   *
   * @returns Promise that resolves when the operation is complete
   */
  async clear() {
    this._clearSketch();
  }
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
    await this._initModules();
  }
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   *
   * @returns Promise when complete
   */
  componentDidLoad() {
    this._init();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { class: "border" }, h("div", { ref: (el) => { this._sketchElement = el; } }))));
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
    const [GraphicsLayer, Sketch, SketchViewModel] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/widgets/Sketch",
      "esri/widgets/Sketch/SketchViewModel"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.Sketch = Sketch;
    this.SketchViewModel = SketchViewModel;
  }
  /**
   * Initialize the graphics layer and the tools that support creating new graphics
   *
   * @protected
   */
  _init() {
    if (this.mapView && this._sketchElement) {
      this._initGraphicsLayer();
      this._initSketch();
    }
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
   * Initialize the skecth widget
   *
   * @protected
   */
  _initSketch() {
    this._sketchWidget = new this.Sketch({
      layer: this._sketchGraphicsLayer,
      view: this.mapView,
      container: this._sketchElement,
      defaultUpdateOptions: {
        tool: "reshape",
        toggleToolOnClick: false
      },
      creationMode: "single",
      defaultCreateOptions: {
        mode: "hybrid"
      },
      visibleElements: {
        selectionTools: {
          "lasso-selection": false,
          "rectangle-selection": false
        }, createTools: {
          circle: false
        },
        undoRedoMenu: true
      }
    });
    this._sketchViewModel = new this.SketchViewModel({
      view: this.mapView,
      layer: this._sketchGraphicsLayer
    });
    this._sketchWidget.viewModel.polylineSymbol = this.polylineSymbol;
    this._sketchWidget.viewModel.pointSymbol = this.pointSymbol;
    this._sketchWidget.viewModel.polygonSymbol = this.polygonSymbol;
    this._sketchWidget.on("create", (evt) => {
      if (evt.state === "complete") {
        this.graphics = [evt.graphic];
        this.sketchGraphicsChange.emit({
          graphics: this.graphics,
          useOIDs: false
        });
      }
    });
    this._sketchWidget.on("update", (evt) => {
      var _a;
      const eventType = (_a = evt === null || evt === void 0 ? void 0 : evt.toolEventInfo) === null || _a === void 0 ? void 0 : _a.type;
      if (eventType === "reshape-stop" || eventType === "move-stop") {
        this.graphics = evt.graphics;
        this.sketchGraphicsChange.emit({
          graphics: this.graphics,
          useOIDs: false
        });
      }
    });
    this._sketchWidget.on("delete", () => {
      this.graphics = [];
      this.sketchGraphicsChange.emit({
        graphics: this.graphics,
        useOIDs: false
      });
    });
    this._sketchWidget.on("undo", (evt) => {
      this.graphics = evt.graphics;
      this.sketchGraphicsChange.emit({
        graphics: this.graphics,
        useOIDs: false
      });
    });
    this._sketchWidget.on("redo", (evt) => {
      this.graphics = evt.graphics;
      this.sketchGraphicsChange.emit({
        graphics: this.graphics,
        useOIDs: false
      });
    });
  }
  /**
   * Clear any stored graphics and remove all graphics from the graphics layer
   *
   * @protected
   */
  _clearSketch() {
    var _a;
    this._sketchWidget.viewModel.cancel();
    this.graphics = [];
    (_a = this._sketchGraphicsLayer) === null || _a === void 0 ? void 0 : _a.removeAll();
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
    "graphics": ["graphicsWatchHandler"],
    "mapView": ["mapViewWatchHandler"]
  }; }
  static get style() { return mapDrawToolsCss; }
}, [0, "map-draw-tools", {
    "active": [4],
    "graphics": [1040],
    "mapView": [1040],
    "pointSymbol": [1040],
    "polylineSymbol": [1040],
    "polygonSymbol": [1040],
    "_translations": [32],
    "_selectionMode": [32],
    "clear": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["map-draw-tools"];
  components.forEach(tagName => { switch (tagName) {
    case "map-draw-tools":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MapDrawTools);
      }
      break;
  } });
}
defineCustomElement();

export { MapDrawTools as M, defineCustomElement as d };
