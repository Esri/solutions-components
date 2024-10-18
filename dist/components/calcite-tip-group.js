/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { l as logger } from './logger.js';

const tipGroupCss = ":host{box-sizing:border-box;display:block;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}::slotted(calcite-tip){margin:0px;border-style:none;max-inline-size:var(--calcite-tip-max-width)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTipGroupStyle0 = tipGroupCss;

logger.deprecated("component", {
    name: "tip-group",
    removalVersion: 4,
    suggested: ["carousel", "carousel-item"],
});
const TipGroup = /*@__PURE__*/ proxyCustomElement(class TipGroup extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.groupTitle = undefined;
    }
    render() {
        return h("slot", { key: '40d9094358a1ef9165e9261d9ca351b2530a7584' });
    }
    static get style() { return CalciteTipGroupStyle0; }
}, [1, "calcite-tip-group", {
        "groupTitle": [1, "group-title"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-tip-group"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-tip-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, TipGroup);
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteTipGroup = TipGroup;
const defineCustomElement = defineCustomElement$1;

export { CalciteTipGroup, defineCustomElement };
