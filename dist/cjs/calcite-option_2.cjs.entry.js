/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const observers = require('./observers-8fed90f3.js');
const dom = require('./dom-6a9b6275.js');
const form = require('./form-5229f1c8.js');
const interactive = require('./interactive-89f913ba.js');
const label = require('./label-26ee0ddb.js');
const loadable = require('./loadable-2e2626dc.js');
const component = require('./component-a4c6a35d.js');
const Validation = require('./Validation-aa47298a.js');
require('./browser-69696af0.js');
require('./guid-02e5380f.js');
require('./resources-dfe71ff2.js');

const optionCss = ":host{display:block}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteOptionStyle0 = optionCss;

const Option = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInternalOptionChange = index.createEvent(this, "calciteInternalOptionChange", 6);
        this.mutationObserver = observers.createObserver("mutation", () => {
            this.ensureTextContentDependentProps();
            this.calciteInternalOptionChange.emit();
        });
        this.disabled = false;
        this.label = undefined;
        this.selected = undefined;
        this.value = undefined;
    }
    handlePropChange(_newValue, _oldValue, propName) {
        if (propName === "label" || propName === "value") {
            this.ensureTextContentDependentProps();
        }
        this.calciteInternalOptionChange.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    ensureTextContentDependentProps() {
        const { el: { textContent }, internallySetLabel, internallySetValue, label, value, } = this;
        if (!label || label === internallySetLabel) {
            this.label = textContent;
            this.internallySetLabel = textContent;
        }
        if (value == null /* intentional loose equals to handle both undefined & null */ ||
            value === internallySetValue) {
            this.value = textContent;
            this.internallySetValue = textContent;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.ensureTextContentDependentProps();
        this.mutationObserver?.observe(this.el, {
            attributeFilter: ["label", "value"],
            characterData: true,
            childList: true,
            subtree: true,
        });
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        return index.h("slot", { key: '19660c07dc760b742b61169da73469d1579aeeaa' }, this.label);
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "disabled": ["handlePropChange"],
        "label": ["handlePropChange"],
        "selected": ["handlePropChange"],
        "value": ["handlePropChange"]
    }; }
};
Option.style = CalciteOptionStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    icon: "icon",
    iconContainer: "icon-container",
    select: "select",
    wrapper: "wrapper",
};
const IDS = {
    validationMessage: "selectValidationMessage",
};

const selectCss = ":host{--calcite-icon-size:1rem;--calcite-spacing-eighth:0.125rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column}.wrapper{position:relative;display:flex;align-items:stretch;inline-size:var(--select-width)}.wrapper:focus-within .icon,.wrapper:active .icon,.wrapper:hover .icon{color:var(--calcite-color-text-1)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){--calcite-select-font-size:var(--calcite-font-size--2);--calcite-select-spacing-inline:0.5rem 2rem}:host([scale=s]) .wrapper{block-size:1.5rem}:host([scale=s]) .icon-container{padding-inline:0.5rem}:host([scale=m]){--calcite-select-font-size:var(--calcite-font-size--1);--calcite-select-spacing-inline:0.75rem 2.5rem}:host([scale=m]) .wrapper{block-size:2rem}:host([scale=m]) .icon-container{padding-inline:0.75rem}:host([scale=l]){--calcite-select-font-size:var(--calcite-font-size-0);--calcite-select-spacing-inline:1rem 3rem}:host([scale=l]) .wrapper{block-size:44px}:host([scale=l]) .icon-container{padding-inline:1rem}:host([width=auto]){inline-size:auto}:host([width=half]){inline-size:50%}:host([width=full]){inline-size:100%}.select{margin:0px;box-sizing:border-box;inline-size:100%;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:0px;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);font-family:inherit;color:var(--calcite-color-text-2);outline-color:transparent;font-size:var(--calcite-select-font-size);padding-inline:var(--calcite-select-spacing-inline);border-inline-end-width:0px}.select:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}select:disabled{border-color:var(--calcite-color-border-input);--tw-bg-opacity:1}.icon-container{pointer-events:none;position:absolute;inset-block:0px;display:flex;align-items:center;border-width:0px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:transparent;color:var(--calcite-color-text-2);inset-inline-end:0px;border-inline-width:0px 1px}.icon-container .icon{color:var(--calcite-color-text-3)}:host([status=invalid]) select,:host([status=invalid]) .icon-container{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) select:focus,:host([status=invalid]) .icon-container:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.select:focus~.icon-container{border-color:transparent}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteSelectStyle0 = selectCss;

function isOption(optionOrGroup) {
    return optionOrGroup.tagName === "CALCITE-OPTION";
}
function isOptionGroup(optionOrGroup) {
    return optionOrGroup.tagName === "CALCITE-OPTION-GROUP";
}
const Select = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteSelectChange = index.createEvent(this, "calciteSelectChange", 6);
        this.componentToNativeEl = new Map();
        this.mutationObserver = observers.createObserver("mutation", () => this.populateInternalSelect());
        this.handleInternalSelectChange = () => {
            const selected = this.selectEl.selectedOptions[0];
            this.selectFromNativeOption(selected);
            requestAnimationFrame(() => this.emitChangeEvent());
        };
        this.populateInternalSelect = () => {
            const optionsAndGroups = Array.from(this.el.children).filter((child) => child.tagName === "CALCITE-OPTION" || child.tagName === "CALCITE-OPTION-GROUP");
            this.clearInternalSelect();
            optionsAndGroups.forEach((optionOrGroup) => this.selectEl?.append(this.toNativeElement(optionOrGroup)));
        };
        this.storeSelectRef = (node) => {
            this.selectEl = node;
            this.populateInternalSelect();
            const selected = this.selectEl.selectedOptions[0];
            this.selectFromNativeOption(selected);
        };
        this.emitChangeEvent = () => {
            this.calciteSelectChange.emit();
        };
        this.disabled = false;
        this.form = undefined;
        this.label = undefined;
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
        this.name = undefined;
        this.required = false;
        this.scale = "m";
        this.status = "idle";
        this.value = null;
        this.selectedOption = undefined;
        this.width = "auto";
    }
    valueHandler(value) {
        this.updateItemsFromValue(value);
    }
    selectedOptionHandler(selectedOption) {
        this.value = selectedOption?.value;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        const { el } = this;
        this.mutationObserver?.observe(el, {
            subtree: true,
            childList: true,
        });
        interactive.connectInteractive(this);
        label.connectLabel(this);
        form.connectForm(this);
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
        interactive.disconnectInteractive(this);
        label.disconnectLabel(this);
        form.disconnectForm(this);
    }
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        if (typeof this.value === "string") {
            this.updateItemsFromValue(this.value);
        }
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
        form.afterConnectDefaultValueSet(this, this.selectedOption?.value ?? "");
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        dom.focusElement(this.selectEl);
    }
    handleOptionOrGroupChange(event) {
        event.stopPropagation();
        const optionOrGroup = event.target;
        const nativeEl = this.componentToNativeEl.get(optionOrGroup);
        if (!nativeEl) {
            return;
        }
        this.updateNativeElement(optionOrGroup, nativeEl);
        if (isOption(optionOrGroup) && optionOrGroup.selected) {
            this.deselectAllExcept(optionOrGroup);
            this.selectedOption = optionOrGroup;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    onLabelClick() {
        this.setFocus();
    }
    updateItemsFromValue(value) {
        this.el
            .querySelectorAll("calcite-option")
            .forEach((item) => (item.selected = item.value === value));
    }
    updateNativeElement(optionOrGroup, nativeOptionOrGroup) {
        nativeOptionOrGroup.disabled = optionOrGroup.disabled;
        nativeOptionOrGroup.label = optionOrGroup.label;
        if (isOption(optionOrGroup)) {
            const option = nativeOptionOrGroup;
            option.selected = optionOrGroup.selected;
            option.value = optionOrGroup.value;
            // need to set innerText for mobile
            // see https://stackoverflow.com/questions/35021620/ios-safari-not-showing-all-options-for-select-menu/41749701
            option.innerText = optionOrGroup.label;
        }
    }
    clearInternalSelect() {
        this.componentToNativeEl.forEach((value) => value.remove());
        this.componentToNativeEl.clear();
    }
    selectFromNativeOption(nativeOption) {
        if (!nativeOption) {
            return;
        }
        let futureSelected;
        this.componentToNativeEl.forEach((nativeOptionOrGroup, optionOrGroup) => {
            if (isOption(optionOrGroup) && nativeOptionOrGroup === nativeOption) {
                optionOrGroup.selected = true;
                futureSelected = optionOrGroup;
                this.deselectAllExcept(optionOrGroup);
            }
        });
        if (futureSelected) {
            this.selectedOption = futureSelected;
        }
    }
    toNativeElement(optionOrGroup) {
        if (isOption(optionOrGroup)) {
            const option = document.createElement("option");
            this.updateNativeElement(optionOrGroup, option);
            this.componentToNativeEl.set(optionOrGroup, option);
            return option;
        }
        if (isOptionGroup(optionOrGroup)) {
            const group = document.createElement("optgroup");
            this.updateNativeElement(optionOrGroup, group);
            Array.from(optionOrGroup.children).forEach((option) => {
                const nativeOption = this.toNativeElement(option);
                group.append(nativeOption);
                this.componentToNativeEl.set(optionOrGroup, nativeOption);
            });
            this.componentToNativeEl.set(optionOrGroup, group);
            return group;
        }
        throw new Error("unsupported element child provided");
    }
    deselectAllExcept(except) {
        this.el.querySelectorAll("calcite-option").forEach((option) => {
            if (option === except) {
                return;
            }
            option.selected = false;
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    renderChevron() {
        return (index.h("div", { class: CSS.iconContainer }, index.h("calcite-icon", { class: CSS.icon, icon: "chevron-down", scale: component.getIconScale(this.scale) })));
    }
    render() {
        const { disabled } = this;
        return (index.h(index.Host, { key: '70938120b9aaac3ab07b8bd73ca8e7909c2ea11d' }, index.h(interactive.InteractiveContainer, { key: 'bd7b8839b27ff53f51d1a4fc2e3590b9fb8ab913', disabled: disabled }, index.h("div", { key: '3dbf7d32dc39c929f7f939e1e1cc72ca6d0b386f', class: CSS.wrapper }, index.h("select", { key: 'e6763a83fed5e7162d94d93e82e770dbbd238bd7', "aria-errormessage": IDS.validationMessage, "aria-invalid": dom.toAriaBoolean(this.status === "invalid"), "aria-label": label.getLabelText(this), class: CSS.select, disabled: disabled, onChange: this.handleInternalSelectChange, ref: this.storeSelectRef }, index.h("slot", { key: '68fc9d08be9144e1f874602ecdf46f3cc0eceb05' })), this.renderChevron(), index.h(form.HiddenFormInputSlot, { key: '6d5ec3ed6f6d2551679a7e17c9023f32b67b4a2c', component: this })), this.validationMessage && this.status === "invalid" ? (index.h(Validation.Validation, { icon: this.validationIcon, id: IDS.validationMessage, message: this.validationMessage, scale: this.scale, status: this.status })) : null)));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "value": ["valueHandler"],
        "selectedOption": ["selectedOptionHandler"]
    }; }
};
Select.style = CalciteSelectStyle0;

exports.calcite_option = Option;
exports.calcite_select = Select;
