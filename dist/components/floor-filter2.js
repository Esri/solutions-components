/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';

const floorFilterCss = ":host{display:block}";

const FloorFilter = /*@__PURE__*/ proxyCustomElement(class FloorFilter extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.facilityChanged = createEvent(this, "facilityChanged", 7);
        this.levelChanged = createEvent(this, "levelChanged", 7);
        this.siteChanged = createEvent(this, "siteChanged", 7);
        this.enabled = undefined;
        this.floorFilterWidget = undefined;
        this.mapView = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    async mapViewWatchHandler() {
        const webMap = this.mapView.map;
        await webMap.when(() => {
            if (this.floorFilterWidget) {
                this.floorFilterWidget.destroy();
                this.floorFilterWidget = undefined;
            }
            if (this._floorFilterElement) {
                this._floorFilterElement.remove();
                this._floorFilterElement = document.createElement("div");
            }
            this._initFloorFilter(this.mapView, webMap);
        });
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
        return this._initModules();
    }
    render() {
        return (h(Host, null, h("div", { ref: (el) => { this._floorFilterElement = el; } })));
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
        const [FloorFilter, reactiveUtils] = await loadModules([
            "esri/widgets/FloorFilter",
            "esri/core/reactiveUtils"
        ]);
        this.FloorFilter = FloorFilter;
        this.reactiveUtils = reactiveUtils;
    }
    /**
     * Initialize the floor filter or reset the current view if it already exists
     */
    _initFloorFilter(view, webMap) {
        var _a, _b, _c;
        if (view && this.enabled && this.FloorFilter && (webMap === null || webMap === void 0 ? void 0 : webMap.floorInfo)) {
            this.floorFilterWidget = new this.FloorFilter({
                container: this._floorFilterElement,
                view
            });
            (_a = this._facilityHandle) === null || _a === void 0 ? void 0 : _a.remove();
            this._facilityHandle = this.reactiveUtils.watch(() => this.floorFilterWidget.facility, (facility) => {
                this.facilityChanged.emit(facility);
            });
            (_b = this._levelHandle) === null || _b === void 0 ? void 0 : _b.remove();
            this._levelHandle = this.reactiveUtils.watch(() => this.floorFilterWidget.level, (level) => {
                this.levelChanged.emit(level);
            });
            (_c = this._siteHandle) === null || _c === void 0 ? void 0 : _c.remove();
            this._siteHandle = this.reactiveUtils.watch(() => this.floorFilterWidget.site, (site) => {
                this.siteChanged.emit(site);
            });
        }
    }
    get el() { return this; }
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"]
    }; }
    static get style() { return floorFilterCss; }
}, [1, "floor-filter", {
        "enabled": [4],
        "floorFilterWidget": [16],
        "mapView": [16]
    }, undefined, {
        "mapView": ["mapViewWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["floor-filter"];
    components.forEach(tagName => { switch (tagName) {
        case "floor-filter":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, FloorFilter);
            }
            break;
    } });
}
defineCustomElement();

export { FloorFilter as F, defineCustomElement as d };
