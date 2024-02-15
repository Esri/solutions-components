/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const observers = require('./observers-db4527e4.js');
const dom = require('./dom-c9c2c835.js');
const form = require('./form-fed676d6.js');
const interactive = require('./interactive-3ab7044d.js');
const label = require('./label-32573e1d.js');
const loadable = require('./loadable-5a794992.js');
const component = require('./component-ac7c3bd8.js');
const Validation = require('./Validation-b02c6710.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./browser-d08a5f99.js');

const optionCss = ":host{display:block}:host([hidden]){display:none}[hidden]{display:none}";

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
        var _a;
        this.ensureTextContentDependentProps();
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, {
            attributeFilter: ["label", "value"],
            characterData: true,
            childList: true,
            subtree: true,
        });
    }
    disconnectedCallback() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        return index.h("slot", null, this.label);
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "disabled": ["handlePropChange"],
        "label": ["handlePropChange"],
        "selected": ["handlePropChange"],
        "value": ["handlePropChange"]
    }; }
};
Option.style = optionCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    icon: "icon",
    iconContainer: "icon-container",
    select: "select",
    wrapper: "wrapper",
};

const selectCss = ":host{--calcite-icon-size:1rem;--calcite-spacing-eighth:0.125rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column}.wrapper{position:relative;display:flex;align-items:stretch;inline-size:var(--select-width)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([scale=s]){--calcite-select-font-size:var(--calcite-font-size--2);--calcite-select-spacing-inline:0.5rem 2rem}:host([scale=s]) .wrapper{block-size:1.5rem}:host([scale=s]) .icon-container{padding-inline:0.5rem}:host([scale=m]){--calcite-select-font-size:var(--calcite-font-size--1);--calcite-select-spacing-inline:0.75rem 2.5rem}:host([scale=m]) .wrapper{block-size:2rem}:host([scale=m]) .icon-container{padding-inline:0.75rem}:host([scale=l]){--calcite-select-font-size:var(--calcite-font-size-0);--calcite-select-spacing-inline:1rem 3rem}:host([scale=l]) .wrapper{block-size:44px}:host([scale=l]) .icon-container{padding-inline:1rem}:host([width=auto]){inline-size:auto}:host([width=half]){inline-size:50%}:host([width=full]){inline-size:100%}.select{margin:0px;box-sizing:border-box;inline-size:100%;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:0px;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);font-family:inherit;color:var(--calcite-color-text-2);outline-color:transparent;font-size:var(--calcite-select-font-size);padding-inline:var(--calcite-select-spacing-inline);border-inline-end-width:0px}.select:focus{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.select:hover{background-color:var(--calcite-color-foreground-2)}select:disabled{border-color:var(--calcite-color-border-input);--tw-bg-opacity:1}.icon-container{pointer-events:none;position:absolute;inset-block:0px;display:flex;align-items:center;border-width:0px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:transparent;color:var(--calcite-color-text-2);inset-inline-end:0px;border-inline-width:0px 1px}:host([status=invalid]) select,:host([status=invalid]) .icon-container{border-color:var(--calcite-color-status-danger)}:host([status=invalid]) select:focus,:host([status=invalid]) .icon-container:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.select:focus~.icon-container{border-color:transparent}.validation-container{display:flex;flex-direction:column;align-items:flex-start;align-self:stretch}:host([scale=m]) .validation-container,:host([scale=l]) .validation-container{padding-block-start:0.5rem}:host([scale=s]) .validation-container{padding-block-start:0.25rem}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";

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
            optionsAndGroups.forEach((optionOrGroup) => { var _a; return (_a = this.selectEl) === null || _a === void 0 ? void 0 : _a.append(this.toNativeElement(optionOrGroup)); });
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
        this.name = undefined;
        this.required = false;
        this.scale = "m";
        this.status = "idle";
        this.value = null;
        this.selectedOption = undefined;
        this.width = "auto";
    }
    valueHandler(value) {
        const items = this.el.querySelectorAll("calcite-option");
        items.forEach((item) => (item.selected = item.value === value));
    }
    selectedOptionHandler(selectedOption) {
        this.value = selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        var _a;
        const { el } = this;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(el, {
            subtree: true,
            childList: true,
        });
        interactive.connectInteractive(this);
        label.connectLabel(this);
        form.connectForm(this);
    }
    disconnectedCallback() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        interactive.disconnectInteractive(this);
        label.disconnectLabel(this);
        form.disconnectForm(this);
    }
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        var _a, _b;
        loadable.setComponentLoaded(this);
        form.afterConnectDefaultValueSet(this, (_b = (_a = this.selectedOption) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "");
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
        return (index.h(index.Host, null, index.h(interactive.InteractiveContainer, { disabled: disabled }, index.h("div", { class: CSS.wrapper }, index.h("select", { "aria-label": label.getLabelText(this), class: CSS.select, disabled: disabled, onChange: this.handleInternalSelectChange,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.storeSelectRef }, index.h("slot", null)), this.renderChevron(), index.h(form.HiddenFormInputSlot, { component: this })), this.validationMessage ? (index.h(Validation.Validation, { icon: this.validationIcon, message: this.validationMessage, scale: this.scale, status: this.status })) : null)));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "value": ["valueHandler"],
        "selectedOption": ["selectedOptionHandler"]
    }; }
};
Select.style = selectCss;

exports.calcite_option = Option;
exports.calcite_select = Select;
