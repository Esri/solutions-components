/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { s as setRequestedIcon } from './dom.js';
import { d as defineCustomElement$1 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const StatusIconDefaults = {
    valid: "check-circle",
    invalid: "exclamation-mark-triangle",
    idle: "information",
};

const inputMessageCss = ":host{box-sizing:border-box;display:flex;block-size:auto;inline-size:100%;align-items:center;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);opacity:1;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;--calcite-input-message-spacing-value:0.25rem;margin-block-start:var(--calcite-input-message-spacing-value)}.calcite-input-message-icon{pointer-events:none;display:inline-flex;flex-shrink:0;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;margin-inline-end:0.5rem}:host([status=invalid]) .calcite-input-message-icon{color:var(--calcite-color-status-danger)}:host([status=warning]) .calcite-input-message-icon{color:var(--calcite-color-status-warning)}:host([status=valid]) .calcite-input-message-icon{color:var(--calcite-color-status-success)}:host([status=idle]) .calcite-input-message-icon{color:var(--calcite-color-brand)}:host([scale=s]){font-size:var(--calcite-font-size--3);line-height:0.75rem}:host([scale=m]){font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=l]){font-size:var(--calcite-font-size--1);line-height:1rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteInputMessageStyle0 = inputMessageCss;

const InputMessage = /*@__PURE__*/ proxyCustomElement(class InputMessage extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.scale = "m";
        this.status = "idle";
    }
    handleIconEl() {
        this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
    }
    render() {
        const hidden = this.el.hidden;
        return (h(Host, { key: '4abc6b1bd6e85531a00bd92de1c18c6b9c27375b', "calcite-hydrated-hidden": hidden }, this.renderIcon(this.requestedIcon), h("slot", { key: 'f357f91ba9e220ea524c4aa14bf2b0c09b1c7064' })));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    renderIcon(iconName) {
        if (iconName) {
            return (h("calcite-icon", { class: "calcite-input-message-icon", flipRtl: this.iconFlipRtl, icon: iconName, scale: "s" }));
        }
    }
    get el() { return this; }
    static get watchers() { return {
        "status": ["handleIconEl"],
        "icon": ["handleIconEl"]
    }; }
    static get style() { return CalciteInputMessageStyle0; }
}, [1, "calcite-input-message", {
        "icon": [520],
        "iconFlipRtl": [516, "icon-flip-rtl"],
        "scale": [513],
        "status": [513]
    }, undefined, {
        "status": ["handleIconEl"],
        "icon": ["handleIconEl"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-input-message", "calcite-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-input-message":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InputMessage);
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

export { InputMessage as I, defineCustomElement as d };
