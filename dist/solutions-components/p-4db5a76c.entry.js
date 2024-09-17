/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, g as getElement, h, H as Host } from './p-6eb37ed2.js';
import { l as loadModules, g as getLocaleComponentStrings } from './p-2058b5d9.js';
import { z as setRequestedIcon } from './p-68ec5c15.js';
import { f as EDrawMode } from './p-80cb7c73.js';
import { s as state } from './p-5dcec135.js';
import './p-0a24ad5f.js';
import './p-d4056c1c.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';
import './p-720a12c0.js';

const bufferToolsCss = ":host{display:block}.c-container{display:inline-flex}.flex-1{flex:\"1\"}.padding-end-1{padding-inline-end:1rem}.w-50{width:50%}";
const BufferToolsStyle0 = bufferToolsCss;

const BufferTools = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.bufferComplete = createEvent(this, "bufferComplete", 7);
        this.distanceChanged = createEvent(this, "distanceChanged", 7);
        this.unitChanged = createEvent(this, "unitChanged", 7);
        this.appearance = "text";
        this.distance = 0;
        this.geometries = [];
        this.max = undefined;
        this.min = 0;
        this.sliderTicks = 10;
        this.unionResults = true;
        this.unit = "meters";
        this.disabled = false;
        this._translations = undefined;
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * geometryEngine: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html
     */
    _geometryEngine;
    /**
     * Timeout: https://nodejs.org/en/docs/guides/timers-in-node/
     */
    _bufferTimeout;
    /**
     * HTMLCalciteSelectElement: The html element for selecting buffer unit
     */
    _unitElement;
    /**
     * Key Value pair: Lookup hash for translated units
     */
    _units;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the geometries prop is changed.
     * Buffer each of the geometries.
     *
     */
    geometriesWatchHandler() {
        this._buffer();
    }
    disabledWatchHandler() {
        this._buffer();
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Get the translated unit for display
     *
     * @returns Promise resolving with the translated unit
     */
    async getTranslatedUnit(unit) {
        if (!this._units) {
            await this._defineTranslations();
        }
        return this._units[unit];
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when a buffer is generated.
     */
    bufferComplete;
    /**
     * Emitted on demand when the distance value changes
     */
    distanceChanged;
    /**
     * Emitted on demand when the unit changes
     */
    unitChanged;
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
        await this._defineTranslations();
        await this._initModules();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '63b775eca8dd10785df7b58be3a79eaa6cf4c049' }, this.appearance === "text" ? this._getTextBoxDisplay() : this._getSliderDisplay()));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Loads translations and defines unit names using those translations.
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _defineTranslations() {
        await this._getTranslations();
        this._initTranslatedUnits();
    }
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _initModules() {
        const [geometryEngine] = await loadModules([
            "esri/geometry/geometryEngine"
        ]);
        this._geometryEngine = geometryEngine;
    }
    /**
     * Init the lookup hash for translated units
     *
     * @protected
     */
    _initTranslatedUnits() {
        this._units = {
            "feet": this._translations.feet,
            "meters": this._translations.meters,
            "miles": this._translations.miles,
            "kilometers": this._translations.kilometers
        };
    }
    /**
     * Gets the nodes for each of the possible distance units
     *
     * @returns An array of option nodes
     *
     * @protected
     */
    _getUnits() {
        return Object.keys(this._units).map(u => {
            return (h("calcite-option", { label: this._units[u], selected: this.unit === u, value: u }));
        });
    }
    /**
     * Store the user defined distance value and create a buffer
     *
     * @param event the event from the calcite input control
     *
     * @protected
     */
    _setDistance(event) {
        const v = parseInt(event.target.value, 10);
        if (this.distance !== v && v >= this.min) {
            this.distanceChanged.emit({
                oldValue: this.distance,
                newValue: v
            });
            this.distance = v;
            if (this.distance > 0) {
                this._buffer();
            }
            else {
                this.bufferComplete.emit(undefined);
            }
        }
    }
    /**
     * Store the user defined unit value and create a buffer
     *
     * @protected
     */
    _setUnit(unit) {
        this.unitChanged.emit({
            oldValue: this.unit,
            newValue: unit
        });
        this.unit = unit;
        this._buffer();
    }
    /**
     * Create buffer geometry based on the user defined unit and distance
     *
     * @protected
     */
    _buffer() {
        if (!this.disabled) {
            if (this._bufferTimeout) {
                clearTimeout(this._bufferTimeout);
            }
            this._bufferTimeout = setTimeout(() => {
                if (this.geometries?.length > 0 && this.unit && this.distance > 0) {
                    const geom = this.geometries[0];
                    const sr = geom.spatialReference;
                    const buffer = (sr.isWGS84 || sr.isWebMercator) ?
                        this._geometryEngine.geodesicBuffer(this.geometries, this.distance, this.unit, this.unionResults) : this._geometryEngine.buffer(this.geometries, this.distance, this.unit, this.unionResults);
                    this.bufferComplete.emit(buffer);
                }
            }, 400);
        }
        else {
            this.bufferComplete.emit(undefined);
        }
    }
    /**
     * Render distance and unit as calcite input and select controls
     * This option will be used when the "appearance" prop is set to "text"
     *
     * @returns a node with the supporting controls
     *
     * @protected
     */
    _getTextBoxDisplay() {
        return (h("div", { class: "c-container" }, h("calcite-input", { class: "padding-end-1 w-50", max: this.max && this.max > 0 ? this.max : undefined, min: this.min, "number-button-type": "vertical", onCalciteInputInput: (evt) => this._setDistance(evt), placeholder: "0", type: "number", value: this.distance ? this.distance.toString() : undefined }), h("calcite-select", { class: "flex-1 w-50", label: "label", onCalciteSelectChange: () => this._setUnit(this._unitElement.value), ref: (el) => { this._unitElement = el; } }, this._getUnits())));
    }
    /**
     * Render distance control as a slider
     * This option will be used when the "appearance" prop is set to "slider"
     *
     * @returns a node with the supporting control
     *
     * @protected
     */
    _getSliderDisplay() {
        return (h("div", null, h("calcite-slider", { labelHandles: true, max: this.max && this.max > 0 ? this.max : undefined, min: this.min, ticks: this.sliderTicks })));
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
    /** Provides access to protected methods for unit testing.
    *
    *  @param methodName Name of protected method to run
    *  @param arg1 First argument to forward to method, e.g., for "_setDistance", `CustomEvent`
    *  @returns
    */
    _testAccess(methodName, arg1) {
        switch (methodName) {
            case "_setUnit":
                return this._setUnit(arg1);
            case "_setDistance":
                return this._setDistance(arg1);
        }
        return null;
    }
    static get watchers() { return {
        "geometries": ["geometriesWatchHandler"],
        "disabled": ["disabledWatchHandler"]
    }; }
};
BufferTools.style = BufferToolsStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const StatusIconDefaults = {
    valid: "check-circle",
    invalid: "exclamation-mark-triangle",
    idle: "information",
};

const inputMessageCss = ":host{box-sizing:border-box;display:flex;block-size:auto;inline-size:100%;align-items:center;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);opacity:1;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;--calcite-input-message-spacing-value:0.25rem;margin-block-start:var(--calcite-input-message-spacing-value)}.calcite-input-message-icon{pointer-events:none;display:inline-flex;flex-shrink:0;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;margin-inline-end:0.5rem}:host([status=invalid]) .calcite-input-message-icon{color:var(--calcite-color-status-danger)}:host([status=warning]) .calcite-input-message-icon{color:var(--calcite-color-status-warning)}:host([status=valid]) .calcite-input-message-icon{color:var(--calcite-color-status-success)}:host([status=idle]) .calcite-input-message-icon{color:var(--calcite-color-brand)}:host([scale=s]){font-size:var(--calcite-font-size--3);line-height:0.75rem}:host([scale=m]){font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=l]){font-size:var(--calcite-font-size--1);line-height:1rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteInputMessageStyle0 = inputMessageCss;

const InputMessage = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.scale = "m";
        this.status = "idle";
    }
    handleIconEl() {
        this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
    }
    render() {
        const hidden = this.el.hidden;
        return (h(Host, { key: '4abc6b1bd6e85531a00bd92de1c18c6b9c27375b', "calcite-hydrated-hidden": hidden }, this.renderIcon(this.requestedIcon), h("slot", { key: 'f357f91ba9e220ea524c4aa14bf2b0c09b1c7064' })));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    renderIcon(iconName) {
        if (iconName) {
            return (h("calcite-icon", { class: "calcite-input-message-icon", flipRtl: this.iconFlipRtl, icon: iconName, scale: "s" }));
        }
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "status": ["handleIconEl"],
        "icon": ["handleIconEl"]
    }; }
};
InputMessage.style = CalciteInputMessageStyle0;

const mapDrawToolsCss = ":host{display:block}.border{outline:1px solid var(--calcite-color-border-input)}.div-visible{display:inherit}.div-not-visible{display:none !important}.padding-top-1-2{padding-top:.5rem}.main-label{display:flex;float:left}html[dir=\"rtl\"] .main-label{display:flex;float:right}.margin-top-1{margin-top:1rem}.border-left{border-left:1px solid rgba(110,110,110,.3)}.border-left[dir=\"rtl\"]{border-right:1px solid rgba(110,110,110,.3)}.esri-widget{box-sizing:border-box;color:#323232;font-size:14px;font-family:\"Avenir Next\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;line-height:1.3em;background-color:#fff;--esri-widget-padding-v:12px;--esri-widget-padding-h:15px;--esri-widget-padding:var(--esri-widget-padding-v) var(--esri-widget-padding-h)}.esri-sketch__panel{align-items:center;display:flex;flex-flow:row wrap;padding:0;justify-content:flex-start !important}.esri-sketch__section{align-items:center;display:flex;flex-flow:row wrap;padding:0 7px;margin:6px 0}";
const MapDrawToolsStyle0 = mapDrawToolsCss;

const MapDrawTools = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
    get el() { return getElement(this); }
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
};
MapDrawTools.style = MapDrawToolsStyle0;

export { BufferTools as buffer_tools, InputMessage as calcite_input_message, MapDrawTools as map_draw_tools };
