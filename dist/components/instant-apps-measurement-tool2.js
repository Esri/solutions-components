/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules2.js';

const instantAppsMeasurementToolCss = ".sc-instant-apps-measurement-tool-h .esri-measurement.sc-instant-apps-measurement-tool,.sc-instant-apps-measurement-tool-h .esri-coordinate-conversion.sc-instant-apps-measurement-tool{width:300px}.sc-instant-apps-measurement-tool-h .instant-apps-measurement-tool__hide.sc-instant-apps-measurement-tool{display:none}";
const InstantAppsMeasurementToolStyle0 = instantAppsMeasurementToolCss;

const base = 'instant-apps-measurement-tool';
const CSS = {
    base,
    hide: `${base}__hide`,
};
const InstantAppsMeasurementTool = /*@__PURE__*/ proxyCustomElement(class InstantAppsMeasurementTool extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.view = undefined;
        this.measureConfiguration = undefined;
        this.activeTool = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    async componentWillLoad() {
        await this._initModules();
    }
    componentDidLoad() {
        this._init();
    }
    render() {
        return (h(Host, { key: 'f49b77294093fbd2a6b31cb1081367b9151f575b' }, h("div", { key: '9a6ac16c6184c4416e9f2a287e0faaf9ff0a533b', class: CSS.base }, h("div", { key: '5ba7577ad0b9978113e854fcea10086f2758d07c', ref: el => {
                this._measureElement = el;
            } }), h("div", { key: 'adcacc2ea84e2c3d292407df71336a4d2cace92a', class: CSS.hide, ref: el => {
                this._coordinateElement = el;
            } }))));
    }
    disconnectedCallback() {
        var _a, _b;
        (_a = this._measureWidget) === null || _a === void 0 ? void 0 : _a.destroy();
        (_b = this._coordinateWidget) === null || _b === void 0 ? void 0 : _b.destroy();
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
        const [Measurement, CoordinateConversion, Conversion] = await loadModules([
            'esri/widgets/Measurement',
            'esri/widgets/CoordinateConversion',
            'esri/widgets/CoordinateConversion/support/Conversion',
        ]);
        this.Measurement = Measurement;
        this.CoordinateConversion = CoordinateConversion;
        this.Conversion = Conversion;
    }
    /**
     * Initialize the measurement widget
     *
     */
    _init() {
        this._initMeasurementWidget();
        this._initCoordinateWidget();
    }
    _updateToolType(tool) {
        this._setActiveTool(tool);
    }
    /**
     * Initialize the measurement widget and listen to key events
     *
     * @protected
     */
    _initMeasurementWidget() {
        if (this.view && this._measureElement && !this._measureWidget) {
            this._measureWidget = new this.Measurement(Object.assign({ view: this.view, container: this._measureElement }, this.measureConfiguration));
            if (this.measureConfiguration.activeToolType)
                this._setActiveTool(this.measureConfiguration.activeToolType);
        }
    }
    _setActiveTool(tool) {
        var _a, _b, _c;
        const viewType = this.view.type;
        this._measureWidget.clear();
        (_a = this._coordinateElement) === null || _a === void 0 ? void 0 : _a.classList.add(CSS.hide);
        if (tool === 'distance') {
            this._measureWidget.activeTool = viewType === '2d' ? 'distance' : 'direct-line';
        }
        else if (tool === 'area') {
            this._measureWidget.activeTool = 'area';
        }
        else if (tool === 'point') {
            (_c = (_b = this._coordinateElement) === null || _b === void 0 ? void 0 : _b.classList) === null || _c === void 0 ? void 0 : _c.remove(CSS.hide);
        }
    }
    _initCoordinateWidget() {
        var _a, _b;
        const { activeToolType, coordinateFormat } = this.measureConfiguration;
        if ((this === null || this === void 0 ? void 0 : this.view) && this._coordinateElement && !this._coordinateWidget) {
            this._coordinateWidget = new this.CoordinateConversion({ view: this.view, storageEnabled: false, container: this._coordinateElement });
            if (coordinateFormat != null) {
                const format = this._coordinateWidget.formats.find(f => {
                    return f.name === coordinateFormat;
                });
                (_b = (_a = this._coordinateWidget) === null || _a === void 0 ? void 0 : _a.conversions) === null || _b === void 0 ? void 0 : _b.splice(0, 0, new this.Conversion({ format }));
            }
        }
        if (activeToolType != null)
            this._setActiveTool(activeToolType);
    }
    get el() { return this; }
    static get watchers() { return {
        "activeTool": ["_updateToolType"]
    }; }
    static get style() { return InstantAppsMeasurementToolStyle0; }
}, [2, "instant-apps-measurement-tool", {
        "view": [16],
        "measureConfiguration": [16],
        "activeTool": [1, "active-tool"]
    }, undefined, {
        "activeTool": ["_updateToolType"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-measurement-tool"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-measurement-tool":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsMeasurementTool);
            }
            break;
    } });
}
defineCustomElement();

export { InstantAppsMeasurementTool as I, defineCustomElement as d };
