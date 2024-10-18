/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const dom = require('./dom-795d4a33.js');
const form = require('./form-6dd8050a.js');
const interactive = require('./interactive-a128ac30.js');
const label = require('./label-726fc287.js');
const loadable = require('./loadable-1c888c87.js');
const Validation = require('./Validation-55fc2417.js');
const browser = require('./browser-333a21c5.js');
require('./guid-e84a8375.js');
require('./resources-18f799c7.js');
require('./component-5d190962.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
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
        this.items = [];
        this.handleDefaultSlotChange = (event) => {
            const items = dom.slotChangeGetAssignedElements(event).filter((el) => el.matches("calcite-segmented-control-item"));
            this.items = items;
            this.handleSelectedItem();
            this.handleItemPropChange();
        };
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
        const { items } = this;
        items.forEach((item) => (item.checked = item.value === value));
    }
    handleSelectedItemChange(newItem, oldItem) {
        this.value = newItem?.value;
        if (newItem === oldItem) {
            return;
        }
        const { items } = this;
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
    }
    componentDidLoad() {
        form.afterConnectDefaultValueSet(this, this.value);
        loadable.setComponentLoaded(this);
    }
    connectedCallback() {
        label.connectLabel(this);
        form.connectForm(this);
    }
    disconnectedCallback() {
        label.disconnectLabel(this);
        form.disconnectForm(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    render() {
        return (index.h(index.Host, { key: 'ac313987378a112da88c90e368d19efc06ce79f3', onClick: this.handleClick, role: "radiogroup" }, index.h("div", { key: 'bef3d657abe624bb76e57561b5a035f374c38faf', "aria-errormessage": IDS.validationMessage, "aria-invalid": dom.toAriaBoolean(this.status === "invalid"), class: CSS$1.itemWrapper }, index.h(interactive.InteractiveContainer, { key: 'a6e66f9d51e2aa5eabdc3cda5a551c16b9493563', disabled: this.disabled }, index.h("slot", { key: 'e7b4be362a356570aa639b3c32074ed686391d86', onSlotchange: this.handleDefaultSlotChange }), index.h(form.HiddenFormInputSlot, { key: '22afaeb8f4250514b981079875183561b5432393', component: this }))), this.validationMessage && this.status === "invalid" ? (index.h(Validation.Validation, { icon: this.validationIcon, id: IDS.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status })) : null));
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
        if (dom.getElementDir(el) === "rtl") {
            if (key === "ArrowRight") {
                adjustedKey = "ArrowLeft";
            }
            if (key === "ArrowLeft") {
                adjustedKey = "ArrowRight";
            }
        }
        const { items } = this;
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
        await loadable.componentFocusable(this);
        (this.selectedItem || this.items[0])?.focus();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    handleItemPropChange() {
        const { items } = this;
        items.forEach((item) => {
            item.appearance = this.appearance;
            item.layout = this.layout;
            item.scale = this.scale;
        });
    }
    handleSelectedItem() {
        const { items } = this;
        const lastChecked = items.filter((item) => item.checked).pop();
        if (lastChecked) {
            this.selectItem(lastChecked);
        }
        else if (items[0]) {
            items[0].tabIndex = 0;
        }
    }
    onLabelClick() {
        this.setFocus();
    }
    selectItem(selected, emit = false) {
        if (selected === this.selectedItem) {
            return;
        }
        const { items } = this;
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
        if (browser.isBrowser() && match) {
            match.focus();
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
SegmentedControl.style = CalciteSegmentedControlStyle0;

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

const SegmentedControlItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInternalSegmentedControlItemChange = index.createEvent(this, "calciteInternalSegmentedControlItemChange", 6);
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.handleSlotChange = (event) => {
            this.hasSlottedContent = dom.slotChangeHasContent(event);
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
        return icon ? (index.h("calcite-icon", { class: {
                [CSS.icon]: true,
                [CSS.iconSolo]: solo,
            }, flipRtl: this.iconFlipRtl, icon: icon, scale: "s" })) : null;
    }
    render() {
        const { appearance, checked, layout, scale, value } = this;
        return (index.h(index.Host, { key: 'f4aa9eaa2e02dae97e647f25b764e1a283f2ad66', "aria-checked": dom.toAriaBoolean(checked), "aria-label": value, role: "radio" }, index.h("label", { key: '9e3460a279d8c3b876897ea58a004ddd1a43cfc8', class: {
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
            return [this.renderIcon(effectiveIcon, true), index.h("slot", { onSlotchange: this.handleSlotChange })];
        }
        return [
            this.renderIcon(iconStart),
            index.h("slot", { onSlotchange: this.handleSlotChange }),
            index.h("slot", { name: SLOTS.input }),
            this.renderIcon(iconEnd),
        ];
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "checked": ["handleCheckedChange"]
    }; }
};
SegmentedControlItem.style = CalciteSegmentedControlItemStyle0;

exports.calcite_segmented_control = SegmentedControl;
exports.calcite_segmented_control_item = SegmentedControlItem;
