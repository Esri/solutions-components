/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as createObserver } from './observers.js';
import { t as toAriaBoolean } from './dom.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { V as Validation } from './Validation.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    itemWrapper: "item-wrapper",
};
const IDS = {
    validationMessage: "radioButtonGroupValidationMessage",
};

const radioButtonGroupCss = ":host{display:flex;flex-direction:column}:host>.item-wrapper{display:flex;max-inline-size:100vw}:host([layout=horizontal])>.item-wrapper{flex-direction:row;flex-wrap:wrap}:host([layout=horizontal][scale=s])>.item-wrapper{-moz-column-gap:1rem;column-gap:1rem}:host([layout=horizontal][scale=m])>.item-wrapper{-moz-column-gap:1.25rem;column-gap:1.25rem}:host([layout=horizontal][scale=l])>.item-wrapper{-moz-column-gap:1.5rem;column-gap:1.5rem}:host([layout=vertical])>.item-wrapper{flex-direction:column;inline-size:-moz-fit-content;inline-size:fit-content}:host([scale=s]) calcite-input-message{--calcite-input-message-spacing-value:calc(var(--calcite-spacing-xxs) * -1)}:host([scale=m]) calcite-input-message{--calcite-input-message-spacing-value:calc(var(--calcite-spacing-sm) * -1)}:host([scale=l]) calcite-input-message{--calcite-input-message-spacing-value:calc(var(--calcite-spacing-md) * -1)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteRadioButtonGroupStyle0 = radioButtonGroupCss;

const RadioButtonGroup = /*@__PURE__*/ proxyCustomElement(class RadioButtonGroup extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteRadioButtonGroupChange = createEvent(this, "calciteRadioButtonGroupChange", 6);
        this.mutationObserver = createObserver("mutation", () => this.passPropsToRadioButtons());
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.passPropsToRadioButtons = () => {
            this.radioButtons = Array.from(this.el.querySelectorAll("calcite-radio-button"));
            this.selectedItem =
                Array.from(this.radioButtons).find((radioButton) => radioButton.checked) || null;
            if (this.radioButtons.length > 0) {
                this.radioButtons.forEach((radioButton) => {
                    radioButton.disabled = this.disabled || radioButton.disabled;
                    radioButton.hidden = this.el.hidden;
                    radioButton.name = this.name;
                    radioButton.required = this.required;
                    radioButton.scale = this.scale;
                });
            }
        };
        this.disabled = false;
        this.layout = "horizontal";
        this.name = undefined;
        this.required = false;
        this.selectedItem = null;
        this.scale = "m";
        this.status = "idle";
        this.validationMessage = undefined;
        this.validationIcon = undefined;
        this.radioButtons = [];
    }
    //--------------------------------------------------------------------------
    //
    //  Global attributes
    //
    //--------------------------------------------------------------------------
    handleHiddenChange() {
        this.passPropsToRadioButtons();
    }
    onDisabledChange() {
        this.passPropsToRadioButtons();
    }
    onLayoutChange() {
        this.passPropsToRadioButtons();
    }
    onScaleChange() {
        this.passPropsToRadioButtons();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.passPropsToRadioButtons();
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    }
    componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
    }
    getFocusableRadioButton() {
        return this.radioButtons.find((radiobutton) => !radiobutton.disabled) ?? null;
    }
    //--------------------------------------------------------------------------
    //
    //  Public Method
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the fist focusable `calcite-radio-button` element in the component. */
    async setFocus() {
        await componentFocusable(this);
        if (this.selectedItem && !this.selectedItem.disabled) {
            return this.selectedItem.setFocus();
        }
        if (this.radioButtons.length > 0) {
            return this.getFocusableRadioButton()?.setFocus();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    radioButtonChangeHandler(event) {
        this.selectedItem = event.target;
        this.calciteRadioButtonGroupChange.emit();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return (h(Host, { key: '9a30f9b99f3f7dd6b237d951f71eac2cce3b595f', role: "radiogroup" }, h("div", { key: '8e6e1498148c9d25c039e72b73bd3987c782af64', "aria-errormessage": IDS.validationMessage, "aria-invalid": toAriaBoolean(this.status === "invalid"), class: CSS.itemWrapper }, h("slot", { key: '8b7a7b9c32e10a15f40495972d4f0b46726f22dc' })), this.validationMessage && this.status === "invalid" ? (h(Validation, { icon: this.validationIcon, id: IDS.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status })) : null));
    }
    get el() { return this; }
    static get watchers() { return {
        "hidden": ["handleHiddenChange"],
        "disabled": ["onDisabledChange"],
        "layout": ["onLayoutChange"],
        "scale": ["onScaleChange"]
    }; }
    static get style() { return CalciteRadioButtonGroupStyle0; }
}, [1, "calcite-radio-button-group", {
        "disabled": [516],
        "layout": [513],
        "name": [513],
        "required": [516],
        "selectedItem": [1040],
        "scale": [513],
        "status": [513],
        "validationMessage": [1, "validation-message"],
        "validationIcon": [520, "validation-icon"],
        "radioButtons": [32],
        "setFocus": [64]
    }, [[0, "calciteRadioButtonChange", "radioButtonChangeHandler"]], {
        "hidden": ["handleHiddenChange"],
        "disabled": ["onDisabledChange"],
        "layout": ["onLayoutChange"],
        "scale": ["onScaleChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-radio-button-group"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-radio-button-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RadioButtonGroup);
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteRadioButtonGroup = RadioButtonGroup;
const defineCustomElement = defineCustomElement$1;

export { CalciteRadioButtonGroup, defineCustomElement };
