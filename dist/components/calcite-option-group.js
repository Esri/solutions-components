/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Fragment } from '@stencil/core/internal/client';

const optionGroupCss = ":host{display:block}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteOptionGroupStyle0 = optionGroupCss;

const OptionGroup = /*@__PURE__*/ proxyCustomElement(class OptionGroup extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInternalOptionGroupChange = createEvent(this, "calciteInternalOptionGroupChange", 6);
        this.disabled = false;
        this.label = undefined;
    }
    handlePropChange() {
        this.calciteInternalOptionGroupChange.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        return (h(Fragment, { key: '174fcf908d37aba0972b1f408938a6ce909e45ff' }, h("div", { key: '49ac7e0b58d14a8d07322c7c68670d9c5863c291' }, this.label), h("slot", { key: '07d24a3a1edf192733bcb3fcdf279f121df482ed' })));
    }
    static get watchers() { return {
        "disabled": ["handlePropChange"],
        "label": ["handlePropChange"]
    }; }
    static get style() { return CalciteOptionGroupStyle0; }
}, [1, "calcite-option-group", {
        "disabled": [516],
        "label": [1]
    }, undefined, {
        "disabled": ["handlePropChange"],
        "label": ["handlePropChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-option-group"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-option-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, OptionGroup);
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteOptionGroup = OptionGroup;
const defineCustomElement = defineCustomElement$1;

export { CalciteOptionGroup, defineCustomElement };
