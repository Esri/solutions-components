/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { t as toAriaBoolean } from './dom.js';
import { d as defineCustomElement$1 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const SLOTS = {
    input: "input",
};
const CSS = {
    segmentedControlItemIcon: "segmented-control-item-icon",
};

const segmentedControlItemCss = ":host{display:flex;cursor:pointer;align-self:stretch;font-weight:var(--calcite-font-weight-normal);transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out, border-color var(--calcite-animation-timing) ease-in-out}:host label{pointer-events:none;margin:0.125rem;box-sizing:border-box;display:flex;flex:1 1 0%;align-items:center;color:var(--calcite-color-text-3);transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out, border-color var(--calcite-internal-animation-timing-fast) ease-in-out, color var(--calcite-internal-animation-timing-fast) ease-in-out}.label--horizontal{justify-content:center}:host{outline-color:transparent}:host(:focus){outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          );outline-offset:-1px}.label--scale-s{padding-inline:0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem;padding-block:0.125rem}.label--scale-m{padding-inline:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem;padding-block:0.375rem}.label--scale-l{padding-inline:1rem;padding-block:0.625rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host(:hover) label{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1)}:host(:active) label{background-color:var(--calcite-color-foreground-3)}:host([checked]) label{cursor:default;border-color:var(--calcite-color-brand);background-color:var(--calcite-color-brand);color:var(--calcite-color-text-inverse)}:host([checked]) .label--outline,:host([checked]) .label--outline-fill{border-color:var(--calcite-color-brand);background-color:var(--calcite-color-foreground-1);box-shadow:inset 0 0 0 1px var(--calcite-color-brand);color:var(--calcite-color-brand)}:host([checked]) .label--outline{background-color:transparent}::slotted(input){display:none}@media (forced-colors: active){:host([checked]) label{background-color:highlight}:host([checked]) .label--outline,:host([checked]) .label--outline-fill{outline:2px solid transparent;outline-offset:2px}:host([checked]) label:not([class~=label--outline]) .segmented-control-item-icon{color:highlightText}}.segmented-control-item-icon{position:relative;margin:0px;display:inline-flex;line-height:inherit}:host([icon-start]) .label--scale-s .segmented-control-item-icon{margin-inline-end:0.5rem}:host([icon-end]) .label--scale-s .segmented-control-item-icon{margin-inline-start:0.5rem}:host([icon-start]) .label--scale-m .segmented-control-item-icon{margin-inline-end:0.75rem}:host([icon-end]) .label--scale-m .segmented-control-item-icon{margin-inline-start:0.75rem}:host([icon-start]) .label--scale-l .segmented-control-item-icon{margin-inline-end:1rem}:host([icon-end]) .label--scale-l .segmented-control-item-icon{margin-inline-start:1rem}:host([hidden]){display:none}[hidden]{display:none}";

const SegmentedControlItem = /*@__PURE__*/ proxyCustomElement(class SegmentedControlItem extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInternalSegmentedControlItemChange = createEvent(this, "calciteInternalSegmentedControlItemChange", 6);
        this.checked = false;
        this.iconFlipRtl = false;
        this.iconStart = undefined;
        this.iconEnd = undefined;
        this.value = undefined;
        this.appearance = "solid";
        this.layout = "horizontal";
        this.scale = "m";
    }
    handleCheckedChange() {
        this.calciteInternalSegmentedControlItemChange.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const { appearance, checked, layout, scale, value } = this;
        const iconStartEl = this.iconStart ? (h("calcite-icon", { class: CSS.segmentedControlItemIcon, flipRtl: this.iconFlipRtl, icon: this.iconStart, key: "icon-start", scale: "s" })) : null;
        const iconEndEl = this.iconEnd ? (h("calcite-icon", { class: CSS.segmentedControlItemIcon, flipRtl: this.iconFlipRtl, icon: this.iconEnd, key: "icon-end", scale: "s" })) : null;
        return (h(Host, { "aria-checked": toAriaBoolean(checked), "aria-label": value, role: "radio" }, h("label", { class: {
                "label--scale-s": scale === "s",
                "label--scale-m": scale === "m",
                "label--scale-l": scale === "l",
                "label--horizontal": layout === "horizontal",
                "label--outline": appearance === "outline",
                "label--outline-fill": appearance === "outline-fill",
            } }, this.iconStart ? iconStartEl : null, h("slot", null, value), h("slot", { name: SLOTS.input }), this.iconEnd ? iconEndEl : null)));
    }
    get el() { return this; }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
    static get style() { return segmentedControlItemCss; }
}, [1, "calcite-segmented-control-item", {
        "checked": [1540],
        "iconFlipRtl": [516, "icon-flip-rtl"],
        "iconStart": [513, "icon-start"],
        "iconEnd": [513, "icon-end"],
        "value": [1032],
        "appearance": [1],
        "layout": [1],
        "scale": [1]
    }, undefined, {
        "checked": ["handleCheckedChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-segmented-control-item", "calcite-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-segmented-control-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SegmentedControlItem);
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { SegmentedControlItem as S, defineCustomElement as d };
