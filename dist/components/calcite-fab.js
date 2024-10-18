/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { f as focusElement } from './dom.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { d as defineCustomElement$4 } from './button.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './loader.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    button: "button",
};
const ICONS = {
    plus: "plus",
};

const fabCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}calcite-button{--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}calcite-button:hover{--tw-shadow:var(--calcite-shadow-md);--tw-shadow-colored:var(--calcite-shadow-md);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}calcite-button:active{--tw-shadow:0 2px 12px -4px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.16);--tw-shadow-colored:0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteFabStyle0 = fabCss;

const Fab = /*@__PURE__*/ proxyCustomElement(class Fab extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.appearance = "solid";
        this.kind = "brand";
        this.disabled = false;
        this.icon = ICONS.plus;
        this.iconFlipRtl = false;
        this.label = undefined;
        this.loading = false;
        this.scale = "m";
        this.text = undefined;
        this.textEnabled = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        focusElement(this.buttonEl);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { appearance, kind, disabled, loading, scale, textEnabled, icon, label, text, iconFlipRtl, } = this;
        const title = !textEnabled ? label || text || null : null;
        return (h(InteractiveContainer, { key: '7953bd06defeddfed5530500901609524f7b58fd', disabled: disabled }, h("calcite-button", { key: 'c2bbe2be5e2ac375abab75024005f1eb5afed51c', appearance: appearance === "solid" ? "solid" : "outline-fill", class: CSS.button, disabled: disabled, iconFlipRtl: iconFlipRtl ? "start" : null, iconStart: icon, kind: kind, label: label, loading: loading, ref: (buttonEl) => {
                this.buttonEl = buttonEl;
            }, round: true, scale: scale, title: title, type: "button", width: "auto" }, this.textEnabled ? this.text : null)));
    }
    get el() { return this; }
    static get style() { return CalciteFabStyle0; }
}, [1, "calcite-fab", {
        "appearance": [513],
        "kind": [513],
        "disabled": [516],
        "icon": [513],
        "iconFlipRtl": [516, "icon-flip-rtl"],
        "label": [1],
        "loading": [516],
        "scale": [513],
        "text": [1],
        "textEnabled": [516, "text-enabled"],
        "setFocus": [64]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-fab", "calcite-button", "calcite-icon", "calcite-loader"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-fab":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Fab);
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteFab = Fab;
const defineCustomElement = defineCustomElement$1;

export { CalciteFab, defineCustomElement };
