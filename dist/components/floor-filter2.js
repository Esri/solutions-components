/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';

const floorFilterCss = ":host{display:block}";
const FloorFilterStyle0 = floorFilterCss;

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
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  State (internal)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * esri/widgets/FloorFilter: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FloorFilter.html
     *
     * FloorFilter constructor
     */
    FloorFilter;
    /**
     * HTMLElement: The container div for the floor filter widget
     */
    _floorFilterElement;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    reactiveUtils;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _facilityHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _levelHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _siteHandle;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Watch for changes to the mapView and re-init the floor filter
     */
    async mapViewWatchHandler() {
        await this._initFloorFilter(this.mapView);
    }
    /**
     * Watch for changes to the enabled property and re-init or destroy the floor filter
     */
    async enabledWatchHandler() {
        if (this.enabled) {
            await this._initFloorFilter(this.mapView);
        }
        else if (!this.enabled) {
            this._destroyWidget();
        }
    }
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
     * Emitted on demand when the Facility is changed
     */
    facilityChanged;
    /**
     * Emitted on demand when the Level is changed
     */
    levelChanged;
    /**
     * Emitted on demand when the Site is changed
     */
    siteChanged;
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
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '58ea8b42e8d90df3f7748241c0e5a48d29c42070' }, h("div", { key: '29eaa9555b67d6deadee5438afd93694ba810f45', ref: (el) => { this._floorFilterElement = el; } })));
    }
    /**
     * StencilJS: Called once just after the component is first loaded.
     */
    async componentDidLoad() {
        if (this.mapView && !this.floorFilterWidget) {
            await this._initFloorFilter(this.mapView);
        }
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
     * Destroy the widget and remove the containing element if it exists
     *
     * @protected
     */
    _destroyWidget() {
        if (this.floorFilterWidget) {
            this.floorFilterWidget.destroy();
            this.floorFilterWidget = undefined;
        }
        if (this._floorFilterElement) {
            this._floorFilterElement.remove();
        }
    }
    /**
     * Destroy the widget and remove the containing element then re-create the container element
     *
     * @protected
     */
    _initContainer() {
        this._destroyWidget();
        this._floorFilterElement = document.createElement("div");
    }
    /**
     * Initialize the floor filter or reset the current view if it already exists
     */
    async _initFloorFilter(view) {
        const webMap = view?.map;
        await webMap.when(() => {
            if (view && this.enabled && this.FloorFilter && webMap?.floorInfo) {
                this._initContainer();
                this.floorFilterWidget = new this.FloorFilter({
                    container: this._floorFilterElement,
                    view
                });
                this._facilityHandle?.remove();
                this._facilityHandle = this.reactiveUtils.watch(() => this.floorFilterWidget.facility, (facility) => {
                    this.facilityChanged.emit(facility);
                });
                this._levelHandle?.remove();
                this._levelHandle = this.reactiveUtils.watch(() => this.floorFilterWidget.level, (level) => {
                    this.levelChanged.emit(level);
                });
                this._siteHandle?.remove();
                this._siteHandle = this.reactiveUtils.watch(() => this.floorFilterWidget.site, (site) => {
                    this.siteChanged.emit(site);
                });
            }
        });
    }
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"],
        "enabled": ["enabledWatchHandler"]
    }; }
    static get style() { return FloorFilterStyle0; }
}, [1, "floor-filter", {
        "enabled": [4],
        "floorFilterWidget": [16],
        "mapView": [16]
    }, undefined, {
        "mapView": ["mapViewWatchHandler"],
        "enabled": ["enabledWatchHandler"]
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
