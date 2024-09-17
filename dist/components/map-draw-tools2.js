/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { b as EDrawMode } from './interfaces.js';
import { l as loadModules } from './loadModules.js';
import { s as state } from './publicNotificationStore.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$3 } from './action.js';
import { d as defineCustomElement$2 } from './icon.js';
import { d as defineCustomElement$1 } from './loader.js';

const mapDrawToolsCss = ":host{display:block}.border{outline:1px solid var(--calcite-color-border-input)}.div-visible{display:inherit}.div-not-visible{display:none !important}.padding-top-1-2{padding-top:.5rem}.main-label{display:flex;float:left}html[dir=\"rtl\"] .main-label{display:flex;float:right}.margin-top-1{margin-top:1rem}.border-left{border-left:1px solid rgba(110,110,110,.3)}.border-left[dir=\"rtl\"]{border-right:1px solid rgba(110,110,110,.3)}.esri-widget{box-sizing:border-box;color:#323232;font-size:14px;font-family:\"Avenir Next\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;line-height:1.3em;background-color:#fff;--esri-widget-padding-v:12px;--esri-widget-padding-h:15px;--esri-widget-padding:var(--esri-widget-padding-v) var(--esri-widget-padding-h)}.esri-sketch__panel{align-items:center;display:flex;flex-flow:row wrap;padding:0;justify-content:flex-start !important}.esri-sketch__section{align-items:center;display:flex;flex-flow:row wrap;padding:0 7px;margin:6px 0}";
const MapDrawToolsStyle0 = mapDrawToolsCss;

const MapDrawTools = /*@__PURE__*/ proxyCustomElement(class MapDrawTools extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.selectionLoadingChange = createEvent(this, "selectionLoadingChange", 7);
        this.sketchGraphicsChange = createEvent(this, "sketchGraphicsChange", 7);
        this.drawUndo = createEvent(this, "drawUndo", 7);
        this.drawRedo = createEvent(this, "drawRedo", 7);
        this.active = false;
        this.drawMode = EDrawMode.SKETCH;
        this.editGraphicsEnabled = true;
        this.graphics = undefined;
        this.mapView = undefined;
        this.pointSymbol = undefined;
        this.polylineSymbol = undefined;
        this.polygonSymbol = undefined;
        this.redoEnabled = false;
        this.undoEnabled = false;
        this._translations = undefined;
        this._selectionMode = undefined;
    }
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html?#constructors-summary
     */
    GraphicsLayer;
    /**
     * esri/widgets/Sketch/SketchViewModel: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html
     * The sketch view model constructor
     */
    SketchViewModel;
    /**
     * esri/widgets/Sketch: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html#constructors-summary
     */
    Sketch;
    /**
     * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
     * The graphics layer used to show selections.
     */
    _sketchGraphicsLayer;
    /**
     * esri/widgets/Sketch/SketchViewModel: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html
     */
    _sketchViewModel;
    /**
     * esri/widgets/Sketch: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html#constructors-summary
     */
    _sketchWidget;
    /**
     * The container element for the sketch widget
     */
    _sketchElement;
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
            this._updateGraphicsSymbols(v);
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
    /**
     * Set the sketch widget to update mode with the current graphic
     *
     * @returns Promise that resolves when the operation is complete
     */
    async updateGraphics() {
        this._updateGraphics();
    }
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
     * Emitted on demand when the sketch graphics change.
     */
    sketchGraphicsChange;
    /**
     * Emitted on demand when the undo action is clicked.
     */
    drawUndo;
    /**
     * Emitted on demand when the redo action is clicked.
     */
    drawRedo;
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
     * StencilJS: Called every time the component is disconnected from the DOM
     */
    disconnectedCallback() {
        // cancel any existing create operations
        this._sketchWidget.cancel();
        // clear any current temp sketch
        this._clearSketch();
    }
    /**
     * Renders the component.
     */
    render() {
        const containerClass = this.drawMode === EDrawMode.SKETCH ?
            "border" : "border esri-widget esri-sketch__panel";
        const undoRedoClass = this.drawMode === EDrawMode.SKETCH ?
            "display-none" : "esri-widget esri-sketch__panel border-left esri-sketch__section";
        return (h(Host, { key: '29a6976363bf4d6d256a80235fddc4d9f29d3314' }, h("div", { key: 'a377200e030bf41964215c4d456f1aabb3ce0fa1', class: containerClass }, h("div", { key: 'de5b692eaa3d529099e1515daad6345393200039', ref: (el) => { this._sketchElement = el; } }), h("div", { key: '8a710aface1f6c50cb124b0e0a740ae7ba6822be', class: undoRedoClass }, h("calcite-action", { key: '259c132f9b45e9442f9c8060c7ebbeb1ce614e58', disabled: !this.undoEnabled, icon: "undo", onClick: () => this._undo(), scale: "s", text: this._translations.undo }), h("calcite-action", { key: '3a9f249a0f601e1975f73dcd05f53ab768e5f4e2', disabled: !this.redoEnabled, icon: "redo", onClick: () => this._redo(), scale: "s", text: this._translations.redo })))));
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
            state.managedLayers[title] = "sketch";
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
        const sketchOptions = {
            layer: this._sketchGraphicsLayer,
            view: this.mapView,
            defaultCreateOptions: {
                mode: "hybrid"
            },
            defaultUpdateOptions: {
                preserveAspectRatio: false,
                enableScaling: false,
                enableRotation: false,
                tool: "reshape",
                toggleToolOnClick: false
            }
        };
        this._sketchWidget = new this.Sketch({
            ...sketchOptions,
            container: this._sketchElement,
            creationMode: "single",
            visibleElements: {
                duplicateButton: false,
                selectionTools: {
                    "lasso-selection": false,
                    "rectangle-selection": false
                }, createTools: {
                    circle: false
                },
                undoRedoMenu: false,
                settingsMenu: this.drawMode === EDrawMode.SKETCH
            }
        });
        this._sketchViewModel = new this.SketchViewModel({
            ...sketchOptions
        });
        this._sketchWidget.viewModel.polylineSymbol = this.polylineSymbol;
        this._sketchWidget.viewModel.pointSymbol = this.pointSymbol;
        this._sketchWidget.viewModel.polygonSymbol = this.polygonSymbol;
        let forceCreate = false;
        this._sketchWidget.on("create", (evt) => {
            if (evt.state === "complete") {
                this.graphics = [evt.graphic];
                this.sketchGraphicsChange.emit({
                    graphics: this.graphics,
                    useOIDs: false
                });
                if (this.drawMode === EDrawMode.REFINE) {
                    // calling create during complete will force the cancel event
                    // https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html#event-create
                    forceCreate = true;
                    this._sketchWidget.viewModel.create(evt.tool);
                }
            }
            if (evt.state === "cancel" && this.drawMode === EDrawMode.REFINE && forceCreate) {
                forceCreate = !forceCreate;
                this._sketchWidget.viewModel.create(evt.tool);
            }
        });
        this._sketchWidget.on("update", (evt) => {
            if (!this.editGraphicsEnabled) {
                this._sketchWidget.viewModel.cancel();
                this._sketchViewModel.cancel();
            }
            else {
                const eventType = evt?.toolEventInfo?.type;
                if (eventType === "reshape-stop" || eventType === "move-stop") {
                    this.graphics = evt.graphics;
                    this.sketchGraphicsChange.emit({
                        graphics: this.graphics,
                        useOIDs: false
                    });
                }
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
        this._sketchWidget?.viewModel.cancel();
        this.graphics = [];
        this._sketchGraphicsLayer?.removeAll();
    }
    /**
     * Emit the undo event
     *
     * @protected
     */
    _undo() {
        this.drawUndo.emit();
    }
    /**
     * Emit the undo event
     *
     * @protected
     */
    _redo() {
        this.drawRedo.emit();
    }
    /**
     * Set the sketch widget to update mode with the current graphic
     *
     * reshape tool only supports a single graphic
     *
     * @protected
     */
    _updateGraphics() {
        setTimeout(() => {
            if (this.graphics.length === 1) {
                void this._sketchWidget.update(this.graphics, {
                    tool: "reshape",
                    enableRotation: false,
                    enableScaling: false,
                    preserveAspectRatio: false,
                    toggleToolOnClick: false
                });
            }
        }, 100);
    }
    /**
     * Any time graphics are added update the symbology so they will always be consistent
     * regardless of where they are from.
     * https://github.com/Esri/solutions-components/issues/246
     *
     * reshape tool only supports a single graphic
     *
     * @protected
     */
    _updateGraphicsSymbols(graphics) {
        // graphics will only be of one gemetry type
        const graphic = graphics[0];
        const type = graphic.geometry.type;
        const symbol = type === "point" ? this.pointSymbol :
            type === "polyline" ? this.polylineSymbol :
                type === "polygon" ? this.polygonSymbol : undefined;
        if (symbol) {
            graphics.forEach(g => g.symbol = symbol);
        }
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
    static get watchers() { return {
        "graphics": ["graphicsWatchHandler"],
        "mapView": ["mapViewWatchHandler"]
    }; }
    static get style() { return MapDrawToolsStyle0; }
}, [0, "map-draw-tools", {
        "active": [4],
        "drawMode": [1, "draw-mode"],
        "editGraphicsEnabled": [4, "edit-graphics-enabled"],
        "graphics": [1040],
        "mapView": [1040],
        "pointSymbol": [1040],
        "polylineSymbol": [1040],
        "polygonSymbol": [1040],
        "redoEnabled": [4, "redo-enabled"],
        "undoEnabled": [4, "undo-enabled"],
        "_translations": [32],
        "_selectionMode": [32],
        "clear": [64],
        "updateGraphics": [64]
    }, undefined, {
        "graphics": ["graphicsWatchHandler"],
        "mapView": ["mapViewWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["map-draw-tools", "calcite-action", "calcite-icon", "calcite-loader"];
    components.forEach(tagName => { switch (tagName) {
        case "map-draw-tools":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MapDrawTools);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { MapDrawTools as M, defineCustomElement as d };
