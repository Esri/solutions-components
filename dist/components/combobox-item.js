/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot.js';
import { a as getSlotted } from './dom.js';
import { g as guid } from './guid.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { e as getAncestors, i as isSingleLike, f as getDepth } from './utils2.js';
import { g as getIconScale } from './component.js';
import { d as defineCustomElement$1 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    icon: "icon",
    iconActive: "icon--active",
    iconIndent: "icon--indent",
    custom: "icon--custom",
    dot: "icon--dot",
    single: "label--single",
    label: "label",
    active: "label--active",
    selected: "label--selected",
    title: "title",
    textContainer: "text-container",
};

const comboboxItemCss = "@charset \"UTF-8\";:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([hidden]){display:none}[hidden]{display:none}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-item-spacing-indent:0.5rem;--calcite-combobox-item-selector-icon-size:1rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-item-spacing-indent:0.75rem;--calcite-combobox-item-selector-icon-size:1rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.625rem;--calcite-combobox-item-spacing-indent:1rem;--calcite-combobox-item-selector-icon-size:1.5rem}.container{--calcite-combobox-item-indent-value:calc(\n    var(--calcite-combobox-item-spacing-indent) * var(--calcite-combobox-item-spacing-indent-multiplier)\n  )}:host(:focus){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host,ul{margin:0px;display:flex;flex-direction:column;padding:0px}:host(:focus),ul:focus{outline:2px solid transparent;outline-offset:2px}.label{position:relative;box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:100%;cursor:pointer;align-items:center;color:var(--calcite-color-text-3);-webkit-text-decoration-line:none;text-decoration-line:none;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);outline-color:transparent;word-wrap:break-word;word-break:break-word;padding-block:var(--calcite-combobox-item-spacing-unit-s);padding-inline:var(--calcite-combobox-item-spacing-unit-l)}:host([disabled]) .label{cursor:default}.label--selected{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.label--active{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.label:hover,.label:active{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1);-webkit-text-decoration-line:none;text-decoration-line:none;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.title{padding-block:0;padding-inline:var(--calcite-combobox-item-spacing-unit-l)}.icon{display:inline-flex;opacity:0;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);color:var(--calcite-color-border-1)}.icon--indent{padding-inline-start:var(--calcite-combobox-item-indent-value)}.icon--custom{margin-block-start:-1px;padding-inline-start:var(--calcite-combobox-item-spacing-unit-l);color:var(--calcite-color-text-3)}.icon--active{color:var(--calcite-color-text-1)}.icon--dot{display:flex;justify-content:center;min-inline-size:var(--calcite-combobox-item-selector-icon-size)}.icon--dot:before{text-align:start;content:\"•\"}.label--active .icon{opacity:1}.label--selected .icon{opacity:1;color:var(--calcite-color-brand)}:host(:hover[disabled]) .icon{opacity:1}";

const ComboboxItem = /*@__PURE__*/ proxyCustomElement(class ComboboxItem extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteComboboxItemChange = createEvent(this, "calciteComboboxItemChange", 6);
        this.itemClickHandler = () => {
            this.toggleSelected();
        };
        this.disabled = false;
        this.selected = false;
        this.active = false;
        this.ancestors = undefined;
        this.guid = guid();
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.textLabel = undefined;
        this.value = undefined;
        this.filterDisabled = undefined;
        this.selectionMode = "multiple";
        this.scale = "m";
    }
    selectedWatchHandler() {
        this.calciteComboboxItemChange.emit();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        this.ancestors = getAncestors(this.el);
        connectConditionalSlotComponent(this);
        connectInteractive(this);
    }
    disconnectedCallback() {
        disconnectConditionalSlotComponent(this);
        disconnectInteractive(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    toggleSelected() {
        const isSinglePersistSelect = this.selectionMode === "single-persist";
        if (this.disabled || (isSinglePersistSelect && this.selected)) {
            return;
        }
        this.selected = !this.selected;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderIcon(iconPath) {
        return this.icon ? (h("calcite-icon", { class: {
                [CSS.custom]: !!this.icon,
                [CSS.iconActive]: this.icon && this.selected,
                [CSS.iconIndent]: true,
            }, flipRtl: this.iconFlipRtl, icon: this.icon || iconPath, key: "icon", scale: getIconScale(this.scale) })) : null;
    }
    renderSelectIndicator(showDot, iconPath) {
        return showDot ? (h("span", { class: {
                [CSS.icon]: true,
                [CSS.dot]: true,
                [CSS.iconIndent]: true,
            } })) : (h("calcite-icon", { class: {
                [CSS.icon]: true,
                [CSS.iconActive]: this.selected,
                [CSS.iconIndent]: true,
            }, flipRtl: this.iconFlipRtl, icon: iconPath, key: "indicator", scale: getIconScale(this.scale) }));
    }
    renderChildren() {
        if (getSlotted(this.el)) {
            return (h("ul", { key: "default-slot-container" }, h("slot", null)));
        }
        return null;
    }
    render() {
        const { disabled } = this;
        const isSingleSelect = isSingleLike(this.selectionMode);
        const showDot = isSingleSelect && !disabled;
        const defaultIcon = isSingleSelect ? "dot" : "check";
        const iconPath = disabled ? "" : defaultIcon;
        const classes = {
            [CSS.label]: true,
            [CSS.selected]: this.selected,
            [CSS.active]: this.active,
            [CSS.single]: isSingleSelect,
        };
        const depth = getDepth(this.el);
        return (h(Host, { "aria-hidden": "true" }, h(InteractiveContainer, { disabled: disabled }, h("div", { class: `container scale--${this.scale}`, style: { "--calcite-combobox-item-spacing-indent-multiplier": `${depth}` } }, h("li", { class: classes, id: this.guid, onClick: this.itemClickHandler }, this.renderSelectIndicator(showDot, iconPath), this.renderIcon(iconPath), h("span", { class: "title" }, this.textLabel)), this.renderChildren()))));
    }
    get el() { return this; }
    static get watchers() { return {
        "selected": ["selectedWatchHandler"]
    }; }
    static get style() { return comboboxItemCss; }
}, [1, "calcite-combobox-item", {
        "disabled": [516],
        "selected": [1540],
        "active": [516],
        "ancestors": [1040],
        "guid": [513],
        "icon": [513],
        "iconFlipRtl": [516, "icon-flip-rtl"],
        "textLabel": [513, "text-label"],
        "value": [8],
        "filterDisabled": [516, "filter-disabled"],
        "selectionMode": [513, "selection-mode"],
        "scale": [1]
    }, undefined, {
        "selected": ["selectedWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-combobox-item", "calcite-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-combobox-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, ComboboxItem);
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

export { ComboboxItem as C, defineCustomElement as d };
