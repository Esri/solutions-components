/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { c as createObserver } from './observers.js';

const optionCss = ":host{display:block}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteOptionStyle0 = optionCss;

const Option = /*@__PURE__*/ proxyCustomElement(class Option extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInternalOptionChange = createEvent(this, "calciteInternalOptionChange", 6);
        this.mutationObserver = createObserver("mutation", () => {
            this.ensureTextContentDependentProps();
            this.calciteInternalOptionChange.emit();
        });
        this.disabled = false;
        this.label = undefined;
        this.selected = undefined;
        this.value = undefined;
    }
    handlePropChange(_newValue, _oldValue, propName) {
        if (propName === "label" || propName === "value") {
            this.ensureTextContentDependentProps();
        }
        this.calciteInternalOptionChange.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    ensureTextContentDependentProps() {
        const { el: { textContent }, internallySetLabel, internallySetValue, label, value, } = this;
        if (!label || label === internallySetLabel) {
            this.label = textContent;
            this.internallySetLabel = textContent;
        }
        if (value == null /* intentional loose equals to handle both undefined & null */ ||
            value === internallySetValue) {
            this.value = textContent;
            this.internallySetValue = textContent;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.ensureTextContentDependentProps();
        this.mutationObserver?.observe(this.el, {
            attributeFilter: ["label", "value"],
            characterData: true,
            childList: true,
            subtree: true,
        });
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        return h("slot", { key: 'e5df72ac4455ee2e14c0e48a40739a9a271c9c57' }, this.label);
    }
    get el() { return this; }
    static get watchers() { return {
        "disabled": ["handlePropChange"],
        "label": ["handlePropChange"],
        "selected": ["handlePropChange"],
        "value": ["handlePropChange"]
    }; }
    static get style() { return CalciteOptionStyle0; }
}, [1, "calcite-option", {
        "disabled": [516],
        "label": [1025],
        "selected": [516],
        "value": [1032]
    }, undefined, {
        "disabled": ["handlePropChange"],
        "label": ["handlePropChange"],
        "selected": ["handlePropChange"],
        "value": ["handlePropChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-option"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-option":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Option);
            }
            break;
    } });
}
defineCustomElement();

export { Option as O, defineCustomElement as d };
