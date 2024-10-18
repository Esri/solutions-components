/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { x as slotChangeHasContent, t as toAriaBoolean } from './dom.js';
import { d as defineCustomElement$1 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const SLOTS = {
    input: "input",
};
const CSS = {
    label: "label",
    labelScale: (scale) => `label--scale-${scale}`,
    labelHorizontal: "label--horizontal",
    labelOutline: "label--outline",
    labelOutlineFill: "label--outline-fill",
    icon: "icon",
    iconSolo: "icon--solo",
};

const segmentedControlItemCss = ":host{display:flex;cursor:pointer;align-self:stretch;font-weight:var(--calcite-font-weight-normal);transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out, border-color var(--calcite-animation-timing) ease-in-out}:host label{pointer-events:none;margin:0.125rem;box-sizing:border-box;display:flex;flex:1 1 0%;align-items:center;color:var(--calcite-color-text-3);transition:background-color var(--calcite-internal-animation-timing-fast) ease-in-out, border-color var(--calcite-internal-animation-timing-fast) ease-in-out, color var(--calcite-internal-animation-timing-fast) ease-in-out}.label--horizontal{justify-content:center}:host{outline-color:transparent}:host(:focus){outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          );outline-offset:-1px}.label--scale-s{padding-inline:0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem;padding-block:0.125rem}.label--scale-m{padding-inline:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem;padding-block:0.375rem}.label--scale-l{padding-inline:1rem;padding-block:0.625rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host(:hover) label{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1)}:host(:active) label{background-color:var(--calcite-color-foreground-3)}:host([checked]) label{cursor:default;border-color:var(--calcite-color-brand);background-color:var(--calcite-color-brand);color:var(--calcite-color-text-inverse)}:host([checked]) .label--outline,:host([checked]) .label--outline-fill{border-color:var(--calcite-color-brand);background-color:var(--calcite-color-foreground-1);box-shadow:inset 0 0 0 1px var(--calcite-color-brand);color:var(--calcite-color-brand)}:host([checked]) .label--outline{background-color:transparent}::slotted(input){display:none}@media (forced-colors: active){:host([checked]) label{background-color:highlight}:host([checked]) .label--outline,:host([checked]) .label--outline-fill{outline:2px solid transparent;outline-offset:2px}:host([checked]) label:not([class~=label--outline]) .icon{color:highlightText}}.icon{position:relative;margin:0px;display:inline-flex;line-height:inherit;margin-inline-start:var(--calcite-internal-segmented-control-icon-margin-start);margin-inline-end:var(--calcite-internal-segmented-control-icon-margin-end)}:host([icon-start]) .label--scale-s{--calcite-internal-segmented-control-icon-margin-end:0.5rem}:host([icon-end]) .label--scale-s{--calcite-internal-segmented-control-icon-margin-start:0.5rem}:host([icon-start]) .label--scale-m{--calcite-internal-segmented-control-icon-margin-end:0.75rem}:host([icon-end]) .label--scale-m{--calcite-internal-segmented-control-icon-margin-start:0.75rem}:host([icon-start]) .label--scale-l{--calcite-internal-segmented-control-icon-margin-end:1rem}:host([icon-end]) .label--scale-l{--calcite-internal-segmented-control-icon-margin-start:1rem}.label .icon--solo{--calcite-internal-segmented-control-icon-margin-start:0;--calcite-internal-segmented-control-icon-margin-end:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteSegmentedControlItemStyle0 = segmentedControlItemCss;

const SegmentedControlItem = /*@__PURE__*/ proxyCustomElement(class SegmentedControlItem extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInternalSegmentedControlItemChange = createEvent(this, "calciteInternalSegmentedControlItemChange", 6);
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.handleSlotChange = (event) => {
            this.hasSlottedContent = slotChangeHasContent(event);
        };
        this.checked = false;
        this.iconFlipRtl = false;
        this.iconStart = undefined;
        this.iconEnd = undefined;
        this.value = undefined;
        this.appearance = "solid";
        this.layout = "horizontal";
        this.scale = "m";
        this.hasSlottedContent = false;
    }
    handleCheckedChange() {
        this.calciteInternalSegmentedControlItemChange.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    renderIcon(icon, solo = false) {
        return icon ? (h("calcite-icon", { class: {
                [CSS.icon]: true,
                [CSS.iconSolo]: solo,
            }, flipRtl: this.iconFlipRtl, icon: icon, scale: "s" })) : null;
    }
    render() {
        const { appearance, checked, layout, scale, value } = this;
        return (h(Host, { key: 'f4aa9eaa2e02dae97e647f25b764e1a283f2ad66', "aria-checked": toAriaBoolean(checked), "aria-label": value, role: "radio" }, h("label", { key: '9e3460a279d8c3b876897ea58a004ddd1a43cfc8', class: {
                [CSS.label]: true,
                [CSS.labelScale(scale)]: true,
                [CSS.labelHorizontal]: layout === "horizontal",
                [CSS.labelOutline]: appearance === "outline",
                [CSS.labelOutlineFill]: appearance === "outline-fill",
            } }, this.renderContent())));
    }
    renderContent() {
        const { hasSlottedContent, iconEnd, iconStart } = this;
        const effectiveIcon = iconStart || iconEnd;
        const canRenderIconOnly = !hasSlottedContent && effectiveIcon;
        if (canRenderIconOnly) {
            return [this.renderIcon(effectiveIcon, true), h("slot", { onSlotchange: this.handleSlotChange })];
        }
        return [
            this.renderIcon(iconStart),
            h("slot", { onSlotchange: this.handleSlotChange }),
            h("slot", { name: SLOTS.input }),
            this.renderIcon(iconEnd),
        ];
    }
    get el() { return this; }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
    static get style() { return CalciteSegmentedControlItemStyle0; }
}, [1, "calcite-segmented-control-item", {
        "checked": [1540],
        "iconFlipRtl": [516, "icon-flip-rtl"],
        "iconStart": [513, "icon-start"],
        "iconEnd": [513, "icon-end"],
        "value": [1032],
        "appearance": [1],
        "layout": [1],
        "scale": [1],
        "hasSlottedContent": [32]
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
