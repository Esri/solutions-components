/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';

const mapFullscreenCss = ":host{display:block}";

const MapFullscreen = /*@__PURE__*/ proxyCustomElement(class MapFullscreen extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.fullscreenStateChange = createEvent(this, "fullscreenStateChange", 7);
        this.mapView = undefined;
        this.fullscreenWidget = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the mapView prop is changed.
     *
     * @returns Promise when complete
     */
    async mapViewWatchHandler() {
        await this.mapView.when(async () => {
            await this._initFullscreenWidget();
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
        await this._initModules();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, null, h("div", { class: "fullscreen-widget", ref: (el) => { this._fullscreenElement = el; } })));
    }
    /**
     * StencilJS: Called just after the component updates.
     * It's never called during the first render().
     */
    async componentDidUpdate() {
        await this._initFullscreenWidget();
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this._initFullscreenWidget();
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
        const [Fullscreen, reactiveUtils] = await loadModules([
            "esri/widgets/Fullscreen",
            "esri/core/reactiveUtils"
        ]);
        this.Fullscreen = Fullscreen;
        this.reactiveUtils = reactiveUtils;
    }
    /**
     * Initialize the search widget
     *
     * @protected
     */
    async _initFullscreenWidget() {
        if (this.mapView && this._fullscreenElement && !this.fullscreenWidget) {
            this.fullscreenWidget = new this.Fullscreen({
                view: this.mapView
            });
            await this.fullscreenWidget.when(() => {
                if (this._fullscreenStateChangeHandle) {
                    this._fullscreenStateChangeHandle.remove();
                }
                this._fullscreenStateChangeHandle = this.reactiveUtils.watch(() => this.fullscreenWidget.viewModel.state, (state) => this.fullscreenStateChange.emit(state));
            });
        }
        else if (this.fullscreenWidget) {
            this.fullscreenWidget.view = this.mapView;
        }
    }
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"]
    }; }
    static get style() { return mapFullscreenCss; }
}, [1, "map-fullscreen", {
        "mapView": [16],
        "fullscreenWidget": [16]
    }, undefined, {
        "mapView": ["mapViewWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["map-fullscreen"];
    components.forEach(tagName => { switch (tagName) {
        case "map-fullscreen":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MapFullscreen);
            }
            break;
    } });
}
defineCustomElement();

export { MapFullscreen as M, defineCustomElement as d };
