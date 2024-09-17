/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$7 } from './graph.js';
import { d as defineCustomElement$6 } from './icon.js';
import { d as defineCustomElement$5 } from './input.js';
import { d as defineCustomElement$4 } from './option.js';
import { d as defineCustomElement$3 } from './progress.js';
import { d as defineCustomElement$2 } from './select.js';
import { d as defineCustomElement$1 } from './slider.js';

const bufferToolsCss = ":host{display:block}.c-container{display:inline-flex}.flex-1{flex:\"1\"}.padding-end-1{padding-inline-end:1rem}.w-50{width:50%}";
const BufferToolsStyle0 = bufferToolsCss;

const BufferTools = /*@__PURE__*/ proxyCustomElement(class BufferTools extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
    get el() { return this; }
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
    static get style() { return BufferToolsStyle0; }
}, [1, "buffer-tools", {
        "appearance": [1025],
        "distance": [1026],
        "geometries": [1040],
        "max": [1026],
        "min": [1026],
        "sliderTicks": [1026, "slider-ticks"],
        "unionResults": [1028, "union-results"],
        "unit": [1025],
        "disabled": [4],
        "_translations": [32],
        "getTranslatedUnit": [64]
    }, undefined, {
        "geometries": ["geometriesWatchHandler"],
        "disabled": ["disabledWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["buffer-tools", "calcite-graph", "calcite-icon", "calcite-input", "calcite-option", "calcite-progress", "calcite-select", "calcite-slider"];
    components.forEach(tagName => { switch (tagName) {
        case "buffer-tools":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, BufferTools);
            }
            break;
        case "calcite-graph":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-option":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-select":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-slider":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { BufferTools as B, defineCustomElement as d };
