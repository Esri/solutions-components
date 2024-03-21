/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-164d485a.js';
import { c as createObserver } from './observers-d04d1da9.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable-37e7fbd6.js';
import { V as Validation } from './Validation-ea480265.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    itemWrapper: "item-wrapper",
};

const radioButtonGroupCss = ":host{display:flex;flex-direction:column}:host>.item-wrapper{display:flex;max-inline-size:100vw}:host([layout=horizontal])>.item-wrapper{flex-direction:row;flex-wrap:wrap}:host([layout=horizontal][scale=s])>.item-wrapper{-moz-column-gap:1rem;column-gap:1rem}:host([layout=horizontal][scale=m])>.item-wrapper{-moz-column-gap:1.25rem;column-gap:1.25rem}:host([layout=horizontal][scale=l])>.item-wrapper{-moz-column-gap:1.5rem;column-gap:1.5rem}:host([layout=vertical])>.item-wrapper{flex-direction:column}:host([scale=s]) calcite-input-message{--calcite-input-message-spacing-value:calc(var(--calcite-spacing-xxs) * -1)}:host([scale=m]) calcite-input-message{--calcite-input-message-spacing-value:calc(var(--calcite-spacing-sm) * -1)}:host([scale=l]) calcite-input-message{--calcite-input-message-spacing-value:calc(var(--calcite-spacing-md) * -1)}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}:host([hidden]){display:none}[hidden]{display:none}";

const RadioButtonGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        var _a;
        this.passPropsToRadioButtons();
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
    }
    componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    getFocusableRadioButton() {
        var _a;
        return (_a = this.radioButtons.find((radiobutton) => !radiobutton.disabled)) !== null && _a !== void 0 ? _a : null;
    }
    //--------------------------------------------------------------------------
    //
    //  Public Method
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the fist focusable `calcite-radio-button` element in the component. */
    async setFocus() {
        var _a;
        await componentFocusable(this);
        if (this.selectedItem && !this.selectedItem.disabled) {
            return this.selectedItem.setFocus();
        }
        if (this.radioButtons.length > 0) {
            return (_a = this.getFocusableRadioButton()) === null || _a === void 0 ? void 0 : _a.setFocus();
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
        return (h(Host, { role: "radiogroup" }, h("div", { class: CSS.itemWrapper }, h("slot", null)), this.validationMessage ? (h(Validation, { icon: this.validationIcon, message: this.validationMessage, scale: this.scale, status: this.status })) : null));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "hidden": ["handleHiddenChange"],
        "disabled": ["onDisabledChange"],
        "layout": ["onLayoutChange"],
        "scale": ["onScaleChange"]
    }; }
};
RadioButtonGroup.style = radioButtonGroupCss;

export { RadioButtonGroup as calcite_radio_button_group };
