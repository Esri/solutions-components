/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { f as filter } from './filter.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './interactive.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { u as updateMessages, s as setUpMessages, c as connectMessages, d as disconnectMessages } from './t9n.js';
import { D as DEBOUNCE } from './resources.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './input.js';
import { d as defineCustomElement$1 } from './progress.js';
import { d as debounce } from './debounce.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    container: "container",
    searchIcon: "search-icon",
};
const ICONS = {
    search: "search",
    close: "x",
};

const filterCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;inline-size:100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{display:flex;inline-size:100%;padding:0.5rem}label{position:relative;margin-inline:0.25rem;margin-block:0px;display:flex;inline-size:100%;align-items:center;overflow:hidden}input[type=text]{margin-block-end:0.25rem;inline-size:100%;border-style:none;background-color:transparent;padding-block:0.25rem;font-family:inherit;font-size:var(--calcite-font-size--2);line-height:1rem;color:var(--calcite-color-text-1);padding-inline-end:0.25rem;padding-inline-start:1.5rem;transition:padding var(--calcite-animation-timing), box-shadow var(--calcite-animation-timing)}input[type=text]::-ms-clear{display:none}calcite-input{inline-size:100%}.search-icon{position:absolute;display:flex;color:var(--calcite-color-text-2);inset-inline-start:0;transition:inset-inline-start var(--calcite-animation-timing), inset-inline-end var(--calcite-animation-timing), opacity var(--calcite-animation-timing)}input[type=text]:focus{border-color:var(--calcite-color-brand);outline:2px solid transparent;outline-offset:2px;padding-inline:0.25rem}input[type=text]:focus~.search-icon{inset-inline-start:calc(1rem * -1);opacity:0}.clear-button{display:flex;cursor:pointer;align-items:center;border-width:0px;background-color:transparent;color:var(--calcite-color-text-2)}.clear-button:hover,.clear-button:focus{color:var(--calcite-color-text-1)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteFilterStyle0 = filterCss;

const Filter = /*@__PURE__*/ proxyCustomElement(class Filter extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteFilterChange = createEvent(this, "calciteFilterChange", 6);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.filterDebounced = debounce((value, emit = false, onFilter) => this.items.length &&
            this.updateFiltered(filter(this.items, value, this.filterProps), emit, onFilter), DEBOUNCE.filter);
        this.inputHandler = (event) => {
            const target = event.target;
            this.value = target.value;
            this.filterDebounced(target.value, true);
        };
        this.keyDownHandler = (event) => {
            if (event.defaultPrevented) {
                return;
            }
            if (event.key === "Escape") {
                this.clear();
                event.preventDefault();
            }
            if (event.key === "Enter") {
                event.preventDefault();
            }
        };
        this.clear = () => {
            this.value = "";
            this.filterDebounced("", true);
            this.setFocus();
        };
        this.items = [];
        this.disabled = false;
        this.filteredItems = [];
        this.filterProps = undefined;
        this.placeholder = undefined;
        this.scale = "m";
        this.value = "";
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.effectiveLocale = undefined;
        this.defaultMessages = undefined;
    }
    watchItemsHandler() {
        this.filterDebounced(this.value);
    }
    filterPropsHandler() {
        this.filterDebounced(this.value);
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    valueHandler(value) {
        this.filterDebounced(value);
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    async componentWillLoad() {
        setUpLoadableComponent(this);
        if (this.items.length) {
            this.updateFiltered(filter(this.items, this.value, this.filterProps));
        }
        await setUpMessages(this);
    }
    connectedCallback() {
        connectInteractive(this);
        connectLocalized(this);
        connectMessages(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLocalized(this);
        disconnectMessages(this);
        this.filterDebounced.cancel();
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Performs a filter on the component.
     *
     * This method can be useful because filtering is delayed and asynchronous.
     *
     * @param {string} value - The filter text value.
     * @returns {Promise<void>}
     */
    async filter(value = this.value) {
        return new Promise((resolve) => {
            this.value = value;
            this.filterDebounced(value, false, resolve);
        });
    }
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        return this.textInput?.setFocus();
    }
    updateFiltered(filtered, emit = false, callback) {
        this.filteredItems = filtered;
        if (emit) {
            this.calciteFilterChange.emit();
        }
        callback?.();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { disabled, scale } = this;
        return (h(InteractiveContainer, { key: 'da4ff667fdb02ae8b85c56cd717b416f3256145d', disabled: disabled }, h("div", { key: 'f4406a403101afa7c97da11f8408fa464aa8a08c', class: CSS.container }, h("label", { key: 'aace74138ebea71058044e05d4fe44cb7ee6beb2' }, h("calcite-input", { key: 'cc7dca3364cc73bf42a78d76155477af98d72552', clearable: true, disabled: disabled, icon: ICONS.search, label: this.messages.label, messageOverrides: { clear: this.messages.clear }, onCalciteInputInput: this.inputHandler, onKeyDown: this.keyDownHandler, placeholder: this.placeholder, ref: (el) => {
                this.textInput = el;
            }, scale: scale, type: "text", value: this.value })))));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "items": ["watchItemsHandler"],
        "filterProps": ["filterPropsHandler"],
        "messageOverrides": ["onMessagesChange"],
        "value": ["valueHandler"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return CalciteFilterStyle0; }
}, [17, "calcite-filter", {
        "items": [16],
        "disabled": [516],
        "filteredItems": [1040],
        "filterProps": [16],
        "placeholder": [1],
        "scale": [513],
        "value": [1025],
        "messages": [1040],
        "messageOverrides": [1040],
        "effectiveLocale": [32],
        "defaultMessages": [32],
        "filter": [64],
        "setFocus": [64]
    }, undefined, {
        "items": ["watchItemsHandler"],
        "filterProps": ["filterPropsHandler"],
        "messageOverrides": ["onMessagesChange"],
        "value": ["valueHandler"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-filter", "calcite-icon", "calcite-input", "calcite-progress"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-filter":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Filter);
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { Filter as F, defineCustomElement as d };
