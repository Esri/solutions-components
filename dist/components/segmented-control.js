/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { t as toAriaBoolean, g as getElementDir } from './dom.js';
import { a as afterConnectDefaultValueSet, c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './form.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { c as connectLabel, d as disconnectLabel } from './label.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { c as createObserver } from './observers.js';
import { V as Validation } from './Validation.js';
import { i as isBrowser } from './browser.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    itemWrapper: "item-wrapper",
};
const IDS = {
    validationMessage: "segmentedControlValidationMessage",
};

const segmentedControlCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column}.item-wrapper{display:flex;background-color:var(--calcite-color-foreground-1);inline-size:-moz-fit-content;inline-size:fit-content;outline:1px solid var(--calcite-color-border-input);outline-offset:-1px}:host([appearance=outline])>.item-wrapper{background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([layout=vertical])>.item-wrapper{flex-direction:column;align-items:flex-start;align-self:flex-start}:host([width=full])>.item-wrapper{inline-size:100%;min-inline-size:-moz-fit-content;min-inline-size:fit-content}:host([width=full])>.item-wrapper ::slotted(calcite-segmented-control-item){flex:1 1 auto}:host([width=full][layout=vertical])>.item-wrapper ::slotted(calcite-segmented-control-item){justify-content:flex-start}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteSegmentedControlStyle0 = segmentedControlCss;

const SegmentedControl = /*@__PURE__*/ proxyCustomElement(class SegmentedControl extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
        return (h(Host, { key: '15d2892515a26a3d97657819a2f7e4ec1bfa132b', onClick: this.handleClick, role: "radiogroup" }, h("div", { key: '5cf92b36bed0d722d548bbda4804fe3e2a8c0c6a', "aria-errormessage": IDS.validationMessage, "aria-invalid": toAriaBoolean(this.status === "invalid"), class: CSS.itemWrapper }, h(InteractiveContainer, { key: '3cdc812ffe33a9651dd4308b8fe8db582e3055de', disabled: this.disabled }, h("slot", { key: '4e81e1944e237c65f4bf06b8270a5c23f8c49bd3' }), h(HiddenFormInputSlot, { key: 'b0ccbb1b76b295ab87912c43b0cbbb936c7fea6e', component: this }))), this.validationMessage && this.status === "invalid" ? (h(Validation, { icon: this.validationIcon, id: IDS.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status })) : null));
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
    get el() { return this; }
    static get watchers() { return {
        "appearance": ["handlePropsChange"],
        "layout": ["handlePropsChange"],
        "scale": ["handlePropsChange"],
        "value": ["valueHandler"],
        "selectedItem": ["handleSelectedItemChange"]
    }; }
    static get style() { return CalciteSegmentedControlStyle0; }
}, [1, "calcite-segmented-control", {
        "appearance": [513],
        "disabled": [516],
        "form": [513],
        "required": [516],
        "name": [513],
        "layout": [513],
        "scale": [513],
        "value": [1025],
        "selectedItem": [1040],
        "status": [513],
        "validationMessage": [1, "validation-message"],
        "validationIcon": [520, "validation-icon"],
        "validity": [1040],
        "width": [513],
        "setFocus": [64]
    }, [[0, "calciteInternalSegmentedControlItemChange", "handleSelected"], [0, "keydown", "handleKeyDown"]], {
        "appearance": ["handlePropsChange"],
        "layout": ["handlePropsChange"],
        "scale": ["handlePropsChange"],
        "value": ["valueHandler"],
        "selectedItem": ["handleSelectedItemChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-segmented-control"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-segmented-control":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SegmentedControl);
            }
            break;
    } });
}
defineCustomElement();

export { SegmentedControl as S, defineCustomElement as d };
