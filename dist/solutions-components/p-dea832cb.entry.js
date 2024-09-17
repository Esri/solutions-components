/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './p-6eb37ed2.js';
import { t as toAriaBoolean, a as getElementDir, A as slotChangeHasContent } from './p-68ec5c15.js';
import { a as afterConnectDefaultValueSet, c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './p-9f63a45c.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './p-415cf05e.js';
import { c as connectLabel, d as disconnectLabel } from './p-ac52e0ba.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './p-18f18ab3.js';
import { c as createObserver } from './p-c638d28e.js';
import { V as Validation } from './p-40724bfb.js';
import { i as isBrowser } from './p-acaae81d.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';
import './p-d559f79c.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS$1 = {
    itemWrapper: "item-wrapper",
};
const IDS = {
    validationMessage: "segmentedControlValidationMessage",
};

const segmentedControlCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column}.item-wrapper{display:flex;background-color:var(--calcite-color-foreground-1);inline-size:-moz-fit-content;inline-size:fit-content;outline:1px solid var(--calcite-color-border-input);outline-offset:-1px}:host([appearance=outline])>.item-wrapper{background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([layout=vertical])>.item-wrapper{flex-direction:column;align-items:flex-start;align-self:flex-start}:host([width=full])>.item-wrapper{inline-size:100%;min-inline-size:-moz-fit-content;min-inline-size:fit-content}:host([width=full])>.item-wrapper ::slotted(calcite-segmented-control-item){flex:1 1 auto}:host([width=full][layout=vertical])>.item-wrapper ::slotted(calcite-segmented-control-item){justify-content:flex-start}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteSegmentedControlStyle0 = segmentedControlCss;

const SegmentedControl = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteSegmentedControlChange = createEvent(this, "calciteSegmentedControlChange", 6);
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
        this.mutationObserver = createObserver("mutation", () => this.setUpItems());
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
        this.validity = {
            valid: false,
            badInput: false,
            customError: false,
            patternMismatch: false,
            rangeOverflow: false,
            rangeUnderflow: false,
            stepMismatch: false,
            tooLong: false,
            tooShort: false,
            typeMismatch: false,
            valueMissing: false,
        };
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
        this.value = newItem?.value;
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
        setUpLoadableComponent(this);
        this.setUpItems();
    }
    componentDidLoad() {
        afterConnectDefaultValueSet(this, this.value);
        setComponentLoaded(this);
    }
    connectedCallback() {
        connectInteractive(this);
        connectLabel(this);
        connectForm(this);
        this.mutationObserver?.observe(this.el, { childList: true });
        this.handleItemPropChange();
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLabel(this);
        disconnectForm(this);
        this.mutationObserver?.unobserve(this.el);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    render() {
        return (h(Host, { key: '15d2892515a26a3d97657819a2f7e4ec1bfa132b', onClick: this.handleClick, role: "radiogroup" }, h("div", { key: '5cf92b36bed0d722d548bbda4804fe3e2a8c0c6a', "aria-errormessage": IDS.validationMessage, "aria-invalid": toAriaBoolean(this.status === "invalid"), class: CSS$1.itemWrapper }, h(InteractiveContainer, { key: '3cdc812ffe33a9651dd4308b8fe8db582e3055de', disabled: this.disabled }, h("slot", { key: '4e81e1944e237c65f4bf06b8270a5c23f8c49bd3' }), h(HiddenFormInputSlot, { key: 'b0ccbb1b76b295ab87912c43b0cbbb936c7fea6e', component: this }))), this.validationMessage && this.status === "invalid" ? (h(Validation, { icon: this.validationIcon, id: IDS.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status })) : null));
    }
    handleSelected(event) {
        event.preventDefault();
        const el = event.target;
        if (el.checked) {
            this.selectItem(el);
        }
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
        if (getElementDir(el) === "rtl") {
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
            case "ArrowUp": {
                event.preventDefault();
                const previous = selectedIndex < 1 ? items[items.length - 1] : items[selectedIndex - 1];
                this.selectItem(previous, true);
                return;
            }
            case "ArrowRight":
            case "ArrowDown": {
                event.preventDefault();
                const next = selectedIndex === -1 ? items[1] : items[selectedIndex + 1] || items[0];
                this.selectItem(next, true);
                return;
            }
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
        await componentFocusable(this);
        (this.selectedItem || this.getItems()[0])?.focus();
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
        if (isBrowser() && match) {
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "appearance": ["handlePropsChange"],
        "layout": ["handlePropsChange"],
        "scale": ["handlePropsChange"],
        "value": ["valueHandler"],
        "selectedItem": ["handleSelectedItemChange"]
    }; }
};
SegmentedControl.style = CalciteSegmentedControlStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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

const SegmentedControlItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h(Host, { key: '71f135787c759f1e4ae51c0e0d97164ccfc0b1e1', "aria-checked": toAriaBoolean(checked), "aria-label": value, role: "radio" }, h("label", { key: 'e648e7765db0a7e3a4bc5d699475f0883c031c6d', class: {
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
};
SegmentedControlItem.style = CalciteSegmentedControlItemStyle0;

export { SegmentedControl as calcite_segmented_control, SegmentedControlItem as calcite_segmented_control_item };
