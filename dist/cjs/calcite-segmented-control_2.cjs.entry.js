/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const dom = require('./dom-c9c2c835.js');
const form = require('./form-fed676d6.js');
const interactive = require('./interactive-3ab7044d.js');
const label = require('./label-32573e1d.js');
const loadable = require('./loadable-5a794992.js');
const observers = require('./observers-db4527e4.js');
const Validation = require('./Validation-b02c6710.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./browser-d08a5f99.js');
require('./component-ac7c3bd8.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS$1 = {
    itemWrapper: "item-wrapper",
};

const segmentedControlCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column}.item-wrapper{display:flex;background-color:var(--calcite-color-foreground-1);inline-size:-moz-fit-content;inline-size:fit-content;outline:1px solid var(--calcite-color-border-input);outline-offset:-1px}:host([appearance=outline])>.item-wrapper{background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([layout=vertical])>.item-wrapper{flex-direction:column;align-items:flex-start;align-self:flex-start}:host([width=full])>.item-wrapper{inline-size:100%;min-inline-size:-moz-fit-content;min-inline-size:fit-content}:host([width=full])>.item-wrapper ::slotted(calcite-segmented-control-item){flex:1 1 auto}:host([width=full][layout=vertical])>.item-wrapper ::slotted(calcite-segmented-control-item){justify-content:flex-start}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";

const SegmentedControl = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteSegmentedControlChange = index.createEvent(this, "calciteSegmentedControlChange", 6);
        //--------------------------------------------------------------------------
        //
        //  Event Listeners
        //
        //--------------------------------------------------------------------------
        this.handleClick = (event) => {
            if (this.disabled) {
                return;
            }
            if (event.target.localName === "calcite-segmented-control-item") {
                this.selectItem(event.target, true);
            }
        };
        this.mutationObserver = observers.createObserver("mutation", () => this.setUpItems());
        this.appearance = "solid";
        this.disabled = false;
        this.form = undefined;
        this.required = false;
        this.name = undefined;
        this.layout = "horizontal";
        this.scale = "m";
        this.value = null;
        this.selectedItem = undefined;
        this.status = "idle";
        this.validationMessage = undefined;
        this.validationIcon = undefined;
        this.width = "auto";
    }
    handlePropsChange() {
        this.handleItemPropChange();
    }
    valueHandler(value) {
        const items = this.getItems();
        items.forEach((item) => (item.checked = item.value === value));
    }
    handleSelectedItemChange(newItem, oldItem) {
        this.value = newItem === null || newItem === void 0 ? void 0 : newItem.value;
        if (newItem === oldItem) {
            return;
        }
        const items = this.getItems();
        const match = items.filter((item) => item === newItem).pop();
        if (match) {
            this.selectItem(match);
        }
        else if (items[0]) {
            items[0].tabIndex = 0;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        this.setUpItems();
    }
    componentDidLoad() {
        form.afterConnectDefaultValueSet(this, this.value);
        loadable.setComponentLoaded(this);
    }
    connectedCallback() {
        var _a;
        interactive.connectInteractive(this);
        label.connectLabel(this);
        form.connectForm(this);
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true });
        this.handleItemPropChange();
    }
    disconnectedCallback() {
        var _a;
        interactive.disconnectInteractive(this);
        label.disconnectLabel(this);
        form.disconnectForm(this);
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.unobserve(this.el);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    render() {
        return (index.h(index.Host, { onClick: this.handleClick, role: "radiogroup" }, index.h("div", { class: CSS$1.itemWrapper }, index.h(interactive.InteractiveContainer, { disabled: this.disabled }, index.h("slot", null), index.h(form.HiddenFormInputSlot, { component: this }))), this.validationMessage ? (index.h(Validation.Validation, { icon: this.validationIcon, message: this.validationMessage, scale: this.scale, status: this.status })) : null));
    }
    handleSelected(event) {
        event.preventDefault();
        this.selectItem(event.target);
        event.stopPropagation();
    }
    handleKeyDown(event) {
        const keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "];
        const { key } = event;
        const { el, selectedItem } = this;
        if (keys.indexOf(key) === -1) {
            return;
        }
        let adjustedKey = key;
        if (dom.getElementDir(el) === "rtl") {
            if (key === "ArrowRight") {
                adjustedKey = "ArrowLeft";
            }
            if (key === "ArrowLeft") {
                adjustedKey = "ArrowRight";
            }
        }
        const items = this.getItems();
        let selectedIndex = -1;
        items.forEach((item, index) => {
            if (item === selectedItem) {
                selectedIndex = index;
            }
        });
        switch (adjustedKey) {
            case "ArrowLeft":
            case "ArrowUp":
                event.preventDefault();
                const previous = selectedIndex < 1 ? items[items.length - 1] : items[selectedIndex - 1];
                this.selectItem(previous, true);
                return;
            case "ArrowRight":
            case "ArrowDown":
                event.preventDefault();
                const next = selectedIndex === -1 ? items[1] : items[selectedIndex + 1] || items[0];
                this.selectItem(next, true);
                return;
            case " ":
                event.preventDefault();
                this.selectItem(event.target, true);
                return;
            default:
                return;
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        var _a;
        await loadable.componentFocusable(this);
        (_a = (this.selectedItem || this.getItems()[0])) === null || _a === void 0 ? void 0 : _a.focus();
    }
    handleItemPropChange() {
        const items = this.getItems();
        items.forEach((item) => {
            item.appearance = this.appearance;
            item.layout = this.layout;
            item.scale = this.scale;
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    onLabelClick() {
        this.setFocus();
    }
    getItems() {
        return Array.from(this.el.querySelectorAll("calcite-segmented-control-item"));
    }
    selectItem(selected, emit = false) {
        if (selected === this.selectedItem) {
            return;
        }
        const items = this.getItems();
        let match = null;
        items.forEach((item) => {
            const matches = item === selected;
            if ((matches && !item.checked) || (!matches && item.checked)) {
                item.checked = matches;
            }
            item.tabIndex = matches ? 0 : -1;
            if (matches) {
                match = item;
                if (emit) {
                    this.calciteSegmentedControlChange.emit();
                }
            }
        });
        this.selectedItem = match;
        if (match) {
            match.focus();
        }
    }
    setUpItems() {
        const items = this.getItems();
        const lastChecked = items.filter((item) => item.checked).pop();
        if (lastChecked) {
            this.selectItem(lastChecked);
        }
        else if (items[0]) {
            items[0].tabIndex = 0;
        }
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "appearance": ["handlePropsChange"],
        "layout": ["handlePropsChange"],
        "scale": ["handlePropsChange"],
        "value": ["valueHandler"],
        "selectedItem": ["handleSelectedItemChange"]
    }; }
};
SegmentedControl.style = segmentedControlCss;

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

const SegmentedControlItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInternalSegmentedControlItemChange = index.createEvent(this, "calciteInternalSegmentedControlItemChange", 6);
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
        const iconStartEl = this.iconStart ? (index.h("calcite-icon", { class: CSS.segmentedControlItemIcon, flipRtl: this.iconFlipRtl, icon: this.iconStart, key: "icon-start", scale: "s" })) : null;
        const iconEndEl = this.iconEnd ? (index.h("calcite-icon", { class: CSS.segmentedControlItemIcon, flipRtl: this.iconFlipRtl, icon: this.iconEnd, key: "icon-end", scale: "s" })) : null;
        return (index.h(index.Host, { "aria-checked": dom.toAriaBoolean(checked), "aria-label": value, role: "radio" }, index.h("label", { class: {
                "label--scale-s": scale === "s",
                "label--scale-m": scale === "m",
                "label--scale-l": scale === "l",
                "label--horizontal": layout === "horizontal",
                "label--outline": appearance === "outline",
                "label--outline-fill": appearance === "outline-fill",
            } }, this.iconStart ? iconStartEl : null, index.h("slot", null, value), index.h("slot", { name: SLOTS.input }), this.iconEnd ? iconEndEl : null)));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
};
SegmentedControlItem.style = segmentedControlItemCss;

exports.calcite_segmented_control = SegmentedControl;
exports.calcite_segmented_control_item = SegmentedControlItem;
