/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot.js';
import { a as getSlotted } from './dom.js';
import { g as guid } from './guid.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { f as getAncestors, i as isSingleLike, j as getDepth } from './utils2.js';
import { g as getIconScale } from './component.js';
import { d as defineCustomElement$1 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    active: "label--active",
    centerContent: "center-content",
    container: "container",
    custom: "icon--custom",
    description: "description",
    dot: "icon--dot",
    filterMatch: "filter-match",
    icon: "icon",
    iconActive: "icon--active",
    label: "label",
    scale: (scale) => `scale--${scale}`,
    selected: "label--selected",
    shortText: "short-text",
    single: "label--single",
    textContainer: "text-container",
    title: "title",
};
const SLOTS = {
    contentEnd: "content-end",
};

const comboboxItemCss = "@charset \"UTF-8\";:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([hidden]){display:none}[hidden]{display:none}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-item-spacing-indent:0.5rem;--calcite-combobox-item-selector-icon-size:1rem;--calcite-internal-combobox-item-description-font-size:var(--calcite-font-size-xs)}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.375rem;--calcite-combobox-item-spacing-indent:0.75rem;--calcite-combobox-item-selector-icon-size:1rem;--calcite-internal-combobox-item-description-font-size:var(--calcite-font-size-sm)}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.625rem;--calcite-combobox-item-spacing-indent:1rem;--calcite-combobox-item-selector-icon-size:1.5rem;--calcite-internal-combobox-item-description-font-size:var(--calcite-font-size)}.container{--calcite-combobox-item-indent-value:calc(\n    var(--calcite-combobox-item-spacing-indent) * var(--calcite-combobox-item-spacing-indent-multiplier)\n  )}:host(:focus){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host,ul{margin:0px;display:flex;flex-direction:column;padding:0px}:host(:focus),ul:focus{outline:2px solid transparent;outline-offset:2px}.label{position:relative;box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:100%;cursor:pointer;align-items:center;color:var(--calcite-color-text-3);text-decoration-line:none;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);outline-color:transparent;word-wrap:break-word;word-break:break-word;justify-content:space-around;gap:var(--calcite-combobox-item-spacing-unit-l);padding-block:var(--calcite-combobox-item-spacing-unit-s);padding-inline:var(--calcite-combobox-item-spacing-unit-l);padding-inline-start:var(--calcite-combobox-item-indent-value)}:host([disabled]) .label{cursor:default}.label--selected{color:var(--calcite-color-text-1)}.label--selected .title{font-weight:var(--calcite-font-weight-medium)}.label--active{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.label:hover,.label:active{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1);text-decoration-line:none;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.icon{display:inline-flex;opacity:0;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);color:var(--calcite-color-border-1)}.icon--custom{margin-block-start:-1px;color:var(--calcite-color-text-3)}.icon--active{color:var(--calcite-color-text-1)}.icon--dot{display:flex;justify-content:center;min-inline-size:var(--calcite-combobox-item-selector-icon-size)}.icon--dot::before{text-align:start;content:\"•\"}.label--active .icon{opacity:1}.label--selected .icon{opacity:1;color:var(--calcite-color-brand)}:host(:hover[disabled]) .icon{opacity:1}.filter-match{font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-current)}.center-content{display:flex;flex-direction:column;flex-grow:1;padding-block:0}.description{font-size:var(--calcite-internal-combobox-item-description-font-size)}:host([selected]) .description,:host(:hover) .description{color:var(--calcite-color-text-2)}.short-text{color:var(--calcite-color-text-3);white-space:nowrap}.title{color:var(--calcite-color-text-1)}.title,.description,.short-text{line-height:var(--calcite-font-line-height-relative-snug)}";
const CalciteComboboxItemStyle0 = comboboxItemCss;

const ComboboxItem = /*@__PURE__*/ proxyCustomElement(class ComboboxItem extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteComboboxItemChange = createEvent(this, "calciteComboboxItemChange", 6);
        this.calciteInternalComboboxItemChange = createEvent(this, "calciteInternalComboboxItemChange", 6);
        this.itemClickHandler = () => {
            this.toggleSelected();
        };
        this.active = false;
        this.ancestors = undefined;
        this.description = undefined;
        this.disabled = false;
        this.filterDisabled = undefined;
        this.filterTextMatchPattern = undefined;
        this.guid = guid();
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.metadata = undefined;
        this.scale = "m";
        this.selected = false;
        this.selectionMode = "multiple";
        this.shortHeading = undefined;
        this.heading = undefined;
        this.textLabel = undefined;
        this.value = undefined;
        this.label = undefined;
    }
    handleComboboxItemPropsChange() {
        this.calciteInternalComboboxItemChange.emit();
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
    }
    disconnectedCallback() {
        disconnectConditionalSlotComponent(this);
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
            }, flipRtl: this.iconFlipRtl, icon: this.icon || iconPath, key: "icon", scale: getIconScale(this.scale) })) : null;
    }
    renderSelectIndicator(showDot, iconPath) {
        return showDot ? (h("span", { class: {
                [CSS.icon]: true,
                [CSS.dot]: true,
            } })) : (h("calcite-icon", { class: {
                [CSS.icon]: true,
                [CSS.iconActive]: this.selected,
            }, flipRtl: this.iconFlipRtl, icon: iconPath, key: "indicator", scale: getIconScale(this.scale) }));
    }
    renderChildren() {
        if (getSlotted(this.el)) {
            return (h("ul", { key: "default-slot-container" }, h("slot", null)));
        }
        return null;
    }
    render() {
        const { disabled, heading, label, textLabel, value } = this;
        const isSingleSelect = isSingleLike(this.selectionMode);
        const defaultIcon = isSingleSelect ? undefined : "check";
        const headingText = heading || textLabel;
        const iconPath = disabled ? undefined : defaultIcon;
        const itemLabel = label || value;
        const showDot = isSingleSelect && !disabled;
        const classes = {
            [CSS.label]: true,
            [CSS.selected]: this.selected,
            [CSS.active]: this.active,
            [CSS.single]: isSingleSelect,
        };
        const depth = getDepth(this.el) + 1;
        return (h(Host, { key: '484c17421421afe7739dc37cc3edb46c2fd0e083', "aria-hidden": "true", "aria-label": itemLabel }, h(InteractiveContainer, { key: '71135810fa4af5e17b668d13af219c7575085a9e', disabled: disabled }, h("div", { key: '2db3e68f23449032b1ac5957a9376a68815e03c5', class: {
                [CSS.container]: true,
                [CSS.scale(this.scale)]: true,
            }, style: { "--calcite-combobox-item-spacing-indent-multiplier": `${depth}` } }, h("li", { key: '153f7e8af6cb925630fb08fc5cfcf4a8df48ad2a', class: classes, id: this.guid, onClick: this.itemClickHandler }, this.renderSelectIndicator(showDot, iconPath), this.renderIcon(iconPath), h("div", { key: '4d9bbd0bc113dc2196e3141a84f6137e7d48b95e', class: CSS.centerContent }, h("div", { key: 'd531d42c8af37b9fbdbda7457e88f4688427911b', class: CSS.title }, this.renderTextContent(headingText)), this.description ? (h("div", { class: CSS.description }, this.renderTextContent(this.description))) : null), this.shortHeading ? (h("div", { class: CSS.shortText }, this.renderTextContent(this.shortHeading))) : null, h("slot", { key: 'f4c71258fff023a30662c7105e1a7492edafa14a', name: SLOTS.contentEnd })), this.renderChildren()))));
    }
    renderTextContent(text) {
        const pattern = this.filterTextMatchPattern;
        if (!pattern || !text) {
            return text;
        }
        const parts = text.split(pattern);
        if (parts.length > 1) {
            // we only highlight the first match
            parts[1] = h("mark", { class: CSS.filterMatch }, parts[1]);
        }
        return parts;
    }
    get el() { return this; }
    static get watchers() { return {
        "disabled": ["handleComboboxItemPropsChange"],
        "textLabel": ["handleComboboxItemPropsChange"],
        "selected": ["selectedWatchHandler"]
    }; }
    static get style() { return CalciteComboboxItemStyle0; }
}, [1, "calcite-combobox-item", {
        "active": [516],
        "ancestors": [1040],
        "description": [1],
        "disabled": [516],
        "filterDisabled": [516, "filter-disabled"],
        "filterTextMatchPattern": [16],
        "guid": [513],
        "icon": [513],
        "iconFlipRtl": [516, "icon-flip-rtl"],
        "metadata": [16],
        "scale": [1],
        "selected": [1540],
        "selectionMode": [513, "selection-mode"],
        "shortHeading": [1, "short-heading"],
        "heading": [1],
        "textLabel": [513, "text-label"],
        "value": [8],
        "label": [8]
    }, undefined, {
        "disabled": ["handleComboboxItemPropsChange"],
        "textLabel": ["handleComboboxItemPropsChange"],
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
