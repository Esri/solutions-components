/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$h } from './action.js';
import { d as defineCustomElement$g } from './action-bar.js';
import { d as defineCustomElement$f } from './action-group.js';
import { d as defineCustomElement$e } from './action-menu.js';
import { d as defineCustomElement$d } from './button.js';
import { d as defineCustomElement$c } from './filter2.js';
import { d as defineCustomElement$b } from './handle.js';
import { d as defineCustomElement$a } from './icon.js';
import { d as defineCustomElement$9 } from './input.js';
import { d as defineCustomElement$8 } from './list.js';
import { d as defineCustomElement$7 } from './list-item.js';
import { d as defineCustomElement$6 } from './loader.js';
import { d as defineCustomElement$5 } from './popover.js';
import { d as defineCustomElement$4 } from './progress.js';
import { d as defineCustomElement$3 } from './scrim.js';
import { d as defineCustomElement$2 } from './stack.js';
import { d as defineCustomElement$1 } from './tooltip.js';

const mapPickerCss = ":host{display:block;--solutions-theme-foreground-color:var(--calcite-color-foreground-1)}.width-full{width:100%}.width-25{width:25% !important}.height-full{height:100%}.display-flex{display:flex}.border-bottom-1{border-width:0px;border-bottom-width:1px;border-style:solid;border-color:var(--calcite-color-border-3)}.border-right{border-right:1px solid var(--calcite-color-border-3)}.action-bar-size{height:51px;width:100%}.map-list{position:absolute;display:flex;flex-direction:column;overflow:hidden;animation:calcite-scrim-fade-in var(--calcite-internal-animation-timing-medium) ease-in-out;background-color:var(--calcite-color-background);z-index:1000;width:100%;height:-moz-fit-content;height:fit-content}.display-none{display:none}.align-center{align-items:center}";
const MapPickerStyle0 = mapPickerCss;

const MapPicker = /*@__PURE__*/ proxyCustomElement(class MapPicker extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.mapInfoChange = createEvent(this, "mapInfoChange", 7);
        this.mapInfos = [];
        this.isMapLayout = undefined;
        this._mapListExpanded = false;
        this._translations = undefined;
        this._webMapInfo = undefined;
    }
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * HTMLCalciteListElement: this list of map names
     */
    _list;
    /**
     * string: the id of map currently displayed
     */
    _loadedId = "";
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the _webMapInfo prop is changed.
     */
    _webMapInfoWatchHandler(v, oldV) {
        if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
            this._loadedId = v?.id;
            this.mapInfoChange.emit(v);
        }
    }
    /**
     * Called each time the mapInfos prop is changed.
     */
    async mapInfosWatchHandler(v, oldV) {
        if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
            this._webMapSelected(v[0]);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    async setMapByID(id) {
        const mapInfos = this.mapInfos?.filter(i => i.id === id);
        if (id && mapInfos?.length > 0) {
            this._webMapSelected(mapInfos[0]);
        }
    }
    /**
     * Closes the list
     */
    async close() {
        if (this._mapListExpanded) {
            this._mapListExpanded = false;
        }
    }
    /**
     * Expands the list
     */
    async toggle(mapListExpanded) {
        this._mapListExpanded = mapListExpanded;
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted when a new map is loaded
     */
    mapInfoChange;
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
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: 'd9ee2182be2b3fbec5235e814d4929fa4d23a234' }, this._getToolbar(), this._getMapNameList(this._mapListExpanded)));
    }
    /**
     * Called once after the component has loaded
     */
    async componentDidLoad() {
        const webMapInfo = this.mapInfos && this.mapInfos.length > 0 ? this.mapInfos[0] : undefined;
        if (webMapInfo) {
            this._webMapSelected(webMapInfo);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Get a calcite action group for the map list
     * Actions do not support multiple icons so this uses a block
     *
     * @returns the dom node for the action group
     *
     * @protected
     */
    _getMapPicker() {
        const id = "map-picker-expand-toggle";
        const mapListIcon = this._mapListExpanded ? "chevron-up" : "chevron-down";
        return (h("div", { class: "width-full" }, h("calcite-button", { alignment: "icon-end-space-between", appearance: "transparent", class: "width-full height-full", iconEnd: mapListIcon, id: id, kind: "neutral", onClick: () => this._chooseMap(), width: "full" }, this._webMapInfo?.name), h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": id }, h("span", null, this._translations.switchMap))));
    }
    /**
     * Create the toolbar (controls used for map and app interactions)
     *
     * @returns The dom node with the toolbar
     *
     * @protected
     */
    _getToolbar() {
        return (h("div", { class: "display-flex border-right" }, h("calcite-action-bar", { class: "border-bottom-1 action-bar-size", "expand-disabled": true, layout: "horizontal", slot: "header" }, this._getMapPicker())));
    }
    /**
     * Get a pick list for all maps in mapInfos
     *
     * @param show boolean to indicate if the list should be shown or hidden
     *
     * @returns the dom node for the list of maps
     *
     * @protected
     */
    _getMapNameList(show) {
        const width = this.isMapLayout ? "width-25" : "width-full";
        const listClass = show ? `map-list border-bottom-1 ${width}` : "display-none";
        return (h("div", { class: listClass }, h("calcite-list", { id: "mapList", ref: (el) => this._list = el, selectionAppearance: "border", selectionMode: "single" }, this.mapInfos.map(mapInfo => {
            return (h("calcite-list-item", { label: mapInfo.name, onClick: () => this._webMapSelected(mapInfo), selected: mapInfo.id === this._loadedId, value: mapInfo.id }));
        }))));
    }
    /**
     * Fired when the user clicks on the map list
     *
     * @param webMapInfo the web map id and name selected from the list
     */
    _webMapSelected(webMapInfo) {
        this._mapListExpanded = false;
        this._webMapInfo = webMapInfo;
    }
    /**
     * Toggles the open/close state of the map list
     *
     * @returns the dom node for the action group
     *
     * @protected
     */
    _chooseMap() {
        this._mapListExpanded = !this._mapListExpanded;
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
    static get watchers() { return {
        "_webMapInfo": ["_webMapInfoWatchHandler"],
        "mapInfos": ["mapInfosWatchHandler"]
    }; }
    static get style() { return MapPickerStyle0; }
}, [1, "map-picker", {
        "mapInfos": [16],
        "isMapLayout": [4, "is-map-layout"],
        "_mapListExpanded": [32],
        "_translations": [32],
        "_webMapInfo": [32],
        "setMapByID": [64],
        "close": [64],
        "toggle": [64]
    }, undefined, {
        "_webMapInfo": ["_webMapInfoWatchHandler"],
        "mapInfos": ["mapInfosWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["map-picker", "calcite-action", "calcite-action-bar", "calcite-action-group", "calcite-action-menu", "calcite-button", "calcite-filter", "calcite-handle", "calcite-icon", "calcite-input", "calcite-list", "calcite-list-item", "calcite-loader", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-stack", "calcite-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "map-picker":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MapPicker);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-action-bar":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-action-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-list-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-stack":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { MapPicker as M, defineCustomElement as d };
