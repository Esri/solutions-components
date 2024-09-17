/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-b793d9aa.js';
import { a as getElementDir, t as toAriaBoolean } from './dom-b5c50286.js';
import { c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './form-ba965042.js';
import { g as guid } from './guid-4c746a7f.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive-742ba555.js';
import { i as isActivationKey } from './key-58898f0a.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './label-0b82858a.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable-73f289b6.js';
import { C as CSS_UTILITY } from './resources-defbb49f.js';
import './browser-552eb2d0.js';
import './component-c2c32481.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    toggle: "toggle",
    check: "check-svg",
};

const checkboxCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]){--calcite-checkbox-size:0.75rem}:host([scale=m]){--calcite-checkbox-size:var(--calcite-font-size--1)}:host([scale=l]){--calcite-checkbox-size:1rem}:host{position:relative;display:inline-flex;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}:host .check-svg,:host .toggle{inline-size:var(--calcite-checkbox-size);block-size:var(--calcite-checkbox-size)}:host .check-svg{pointer-events:none;box-sizing:border-box;display:block;overflow:hidden;background-color:var(--calcite-color-foreground-1);fill:currentColor;stroke:currentColor;stroke-width:1;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;box-shadow:inset 0 0 0 1px var(--calcite-color-border-input);color:var(--calcite-color-background)}:host([status=invalid]:not([checked])) .check-svg{box-shadow:inset 0 0 0 1px var(--calcite-color-status-danger)}:host([status=invalid]:not([checked])) .toggle:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([checked]) .check-svg,:host([indeterminate]) .check-svg{background-color:var(--calcite-color-brand);box-shadow:inset 0 0 0 1px var(--calcite-color-brand)}:host([hovered]) .toggle .check-svg,:host .toggle:hover .check-svg{box-shadow:inset 0 0 0 2px var(--calcite-color-brand)}.toggle{position:relative;outline-color:transparent}.toggle:active,.toggle:focus,.toggle:focus-visible{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.toggle::after,.toggle::before{inset-block-start:50%;inset-inline-start:50%;min-block-size:1.5rem;min-inline-size:1.5rem;position:absolute}.toggle:not(.calcite--rtl)::after{content:\"\";transform:translateX(-50%) translateY(-50%)}.toggle.calcite--rtl::before{content:\"\";transform:translateX(50%) translateY(-50%)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteCheckboxStyle0 = checkboxCss;

const Checkbox = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteInternalCheckboxBlur = createEvent(this, "calciteInternalCheckboxBlur", 6);
        this.calciteCheckboxChange = createEvent(this, "calciteCheckboxChange", 6);
        this.calciteInternalCheckboxFocus = createEvent(this, "calciteInternalCheckboxFocus", 6);
        this.checkedPath = "M5.5 12L2 8.689l.637-.636L5.5 10.727l8.022-7.87.637.637z";
        this.indeterminatePath = "M13 8v1H3V8z";
        this.getPath = () => this.indeterminate ? this.indeterminatePath : this.checked ? this.checkedPath : "";
        this.toggle = () => {
            if (!this.disabled) {
                this.checked = !this.checked;
                this.setFocus();
                this.indeterminate = false;
                this.calciteCheckboxChange.emit();
            }
        };
        this.keyDownHandler = (event) => {
            if (isActivationKey(event.key)) {
                this.toggle();
                event.preventDefault();
            }
        };
        this.clickHandler = () => {
            if (this.disabled) {
                return;
            }
            this.toggle();
        };
        //--------------------------------------------------------------------------
        //
        //  Event Listeners
        //
        //--------------------------------------------------------------------------
        this.onToggleBlur = () => {
            this.calciteInternalCheckboxBlur.emit(false);
        };
        this.onToggleFocus = () => {
            this.calciteInternalCheckboxFocus.emit(true);
        };
        this.onLabelClick = () => {
            this.toggle();
        };
        this.checked = false;
        this.disabled = false;
        this.form = undefined;
        this.guid = undefined;
        this.hovered = false;
        this.indeterminate = false;
        this.label = undefined;
        this.name = undefined;
        this.required = false;
        this.scale = "m";
        this.status = "idle";
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
        this.value = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        this.toggleEl?.focus();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    syncHiddenFormInput(input) {
        input.type = "checkbox";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.guid = this.el.id || `calcite-checkbox-${guid()}`;
        connectInteractive(this);
        connectLabel(this);
        connectForm(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLabel(this);
        disconnectForm(this);
    }
    componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const rtl = getElementDir(this.el) === "rtl";
        return (h(Host, { key: '29feebf02ef9c71ea9e6dafe0f5ed11b0cb89848', onClick: this.clickHandler, onKeyDown: this.keyDownHandler }, h(InteractiveContainer, { key: 'e89b0df0f5638181e233bce9c454e48c6963de19', disabled: this.disabled }, h("div", { key: '25a91677124b2b77e6e30bf371afce3153c26761', "aria-checked": toAriaBoolean(this.checked), "aria-label": getLabelText(this), class: {
                [CSS.toggle]: true,
                [CSS_UTILITY.rtl]: rtl,
            }, onBlur: this.onToggleBlur, onFocus: this.onToggleFocus, ref: (toggleEl) => (this.toggleEl = toggleEl), role: "checkbox", tabIndex: this.disabled ? undefined : 0 }, h("svg", { key: '1aae8a62a1f771e2d3e7fb731bae49e608f15617', "aria-hidden": "true", class: CSS.check, viewBox: "0 0 16 16" }, h("path", { key: '27ea5db7e99c8f82f5e7773b684f64e9d9a8101a', d: this.getPath() })), h("slot", { key: 'c6ea3d961bc6b3b7018378b8044691b88d65f2d3' })), h(HiddenFormInputSlot, { key: 'bf3c47ad291541078a94dd46205e912622e85411', component: this }))));
    }
    get el() { return getElement(this); }
};
Checkbox.style = CalciteCheckboxStyle0;

export { Checkbox as calcite_checkbox };
