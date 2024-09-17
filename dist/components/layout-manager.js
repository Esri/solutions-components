/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { a as ELayoutMode } from './interfaces.js';
import { d as defineCustomElement$6 } from './action.js';
import { d as defineCustomElement$5 } from './icon.js';
import { d as defineCustomElement$4 } from './loader.js';
import { d as defineCustomElement$3 } from './popover.js';
import { d as defineCustomElement$2 } from './tooltip.js';

const layoutManagerCss = ":host{display:block}.action-center{-webkit-box-align:center;-webkit-align-items:center;-ms-grid-row-align:center;align-items:center;align-content:center;justify-content:center}.display-flex{display:flex}.icon-color{--calcite-color-icon-color:var(--calcite-color-brand)}.icon{cursor:pointer}.tooltip-message{padding:5px 8px;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}.header-text{font-size:var(--calcite-font-size-0);font-weight:var(--calcite-font-weight-medium);padding-inline:0.75rem;padding-block:0.875rem;line-height:1.25rem}.img-background{background-repeat:no-repeat;background-size:100% 100%;width:38px;height:26px}.grid-background{background-image:url('../../assets/data/images/grid.png')}.horizontal-background{background-image:url('../../assets/data/images/horizontal.png')}.vertical-background{background-image:url('../../assets/data/images/vertical.png')}";
const LayoutManagerStyle0 = layoutManagerCss;

const LayoutManager$1 = /*@__PURE__*/ proxyCustomElement(class LayoutManager extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.layoutChanged = createEvent(this, "layoutChanged", 7);
        this._translations = undefined;
    }
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Controls the layout of the application
     */
    _layoutMode = ELayoutMode.GRID;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
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
     * Emitted when the layout should change
     */
    layoutChanged;
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
        return (h(Host, { key: 'b21325b44c55b4169b7c14ee8a72d4fb329049c0' }, h("div", { key: '9aa53161553d8daecde88138017758885747d357', class: "display-flex" }, h("div", { key: '4efeebd0ee5b9d288ae37a2f3697049eb71c5d4c', class: "display-flex action-center" }, h("calcite-icon", { key: 'aa2a89bc8b1974c56997478c7a1c4080e2f0e5e1', class: "icon icon-color", icon: "information", id: "app-information-icon", scale: "s" }), h("calcite-popover", { key: '920120df5f5036770308422dafe6c76201af303b', closable: true, label: "", referenceElement: "app-information-icon" }, h("span", { key: 'ed38dc29dd382563b9c38fd171f7380965b88fef', class: "tooltip-message" }, this._translations.appInfo))), h("div", { key: '5d09996c91decfea662e159625ab4c8dd06154ba', class: "header-text" }, this._translations.layout), this._getAction("grid-background", ELayoutMode.GRID, this._translations.grid), this._getAction("vertical-background", ELayoutMode.VERTICAL, this._translations.vertical), this._getAction("horizontal-background", ELayoutMode.HORIZONTAL, this._translations.horizontal))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Store and emit the current layout mode
     *
     * @param imgClass string the css class to use
     * @param layoutMode ELayoutMode the associated layout mode for the current action
     * @param tip string the value to display as the tooltip for the action
     *
     * @protected
     */
    _getAction(imgClass, layoutMode, tip) {
        return (h("div", null, h("calcite-action", { alignment: "center", appearance: "transparent", compact: false, id: imgClass, indicator: layoutMode === this._layoutMode, onClick: () => { this._setLayoutMode(layoutMode); }, text: "" }, h("div", { class: imgClass + " img-background" })), h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": imgClass }, h("span", null, tip))));
    }
    /**
     * Store and emit the current layout mode
     *
     * @param layoutMode ELayoutMode the current layout mode
     *
     * @protected
     */
    _setLayoutMode(layoutMode) {
        this._layoutMode = layoutMode;
        this.layoutChanged.emit(this._layoutMode);
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
    static get style() { return LayoutManagerStyle0; }
}, [1, "layout-manager", {
        "_translations": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["layout-manager", "calcite-action", "calcite-icon", "calcite-loader", "calcite-popover", "calcite-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "layout-manager":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, LayoutManager$1);
            }
            break;
        case "calcite-action":
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
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const LayoutManager = LayoutManager$1;
const defineCustomElement = defineCustomElement$1;

export { LayoutManager, defineCustomElement };
