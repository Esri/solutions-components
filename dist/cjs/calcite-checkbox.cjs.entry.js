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
const guid = require('./guid-e84a8375.js');
const interactive = require('./interactive-a128ac30.js');
const key = require('./key-47c9469a.js');
const label = require('./label-726fc287.js');
const loadable = require('./loadable-1c888c87.js');
const resources = require('./resources-18f799c7.js');
require('./component-5d190962.js');
require('./browser-333a21c5.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    toggle: "toggle",
    check: "check-svg",
};

const checkboxCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]) .check-svg,:host([scale=s]) .toggle{inline-size:var(--calcite-checkbox-size, 0.75rem);block-size:var(--calcite-checkbox-size, 0.75rem)}:host([scale=m]) .check-svg,:host([scale=m]) .toggle{inline-size:var(--calcite-checkbox-size, var(--calcite-font-size--1));block-size:var(--calcite-checkbox-size, var(--calcite-font-size--1))}:host([scale=l]) .check-svg,:host([scale=l]) .toggle{inline-size:var(--calcite-checkbox-size, 1rem);block-size:var(--calcite-checkbox-size, 1rem)}:host{position:relative;display:inline-flex;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}:host .check-svg{pointer-events:none;box-sizing:border-box;display:block;overflow:hidden;background-color:var(--calcite-color-foreground-1);fill:currentColor;stroke:currentColor;stroke-width:1;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;box-shadow:inset 0 0 0 1px var(--calcite-checkbox-border-color, var(--calcite-color-border-input));color:var(--calcite-checkbox-icon-color, var(--calcite-color-background))}:host([status=invalid]:not([checked])) .check-svg{box-shadow:inset 0 0 0 1px var(--calcite-color-status-danger)}:host([status=invalid]:not([checked])) .toggle:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([checked]) .check-svg,:host([indeterminate]) .check-svg{background-color:var(--calcite-color-brand);box-shadow:inset 0 0 0 1px var(--calcite-color-brand)}:host([hovered]) .toggle .check-svg,:host .toggle:hover .check-svg{box-shadow:inset 0 0 0 2px var(--calcite-checkbox-border-color-hover, var(--calcite-color-brand))}.toggle{position:relative;outline-color:transparent}.toggle:active,.toggle:focus,.toggle:focus-visible{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.toggle::after,.toggle::before{inset-block-start:50%;inset-inline-start:50%;min-block-size:1.5rem;min-inline-size:1.5rem;position:absolute}.toggle:not(.calcite--rtl)::after{content:\"\";transform:translateX(-50%) translateY(-50%)}.toggle.calcite--rtl::before{content:\"\";transform:translateX(50%) translateY(-50%)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteCheckboxStyle0 = checkboxCss;

const Checkbox = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInternalCheckboxBlur = index.createEvent(this, "calciteInternalCheckboxBlur", 6);
        this.calciteCheckboxChange = index.createEvent(this, "calciteCheckboxChange", 6);
        this.calciteInternalCheckboxFocus = index.createEvent(this, "calciteInternalCheckboxFocus", 6);
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
            if (key.isActivationKey(event.key)) {
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
        await loadable.componentFocusable(this);
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
        this.guid = this.el.id || `calcite-checkbox-${guid.guid()}`;
        label.connectLabel(this);
        form.connectForm(this);
    }
    disconnectedCallback() {
        label.disconnectLabel(this);
        form.disconnectForm(this);
    }
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const rtl = dom.getElementDir(this.el) === "rtl";
        return (index.h(index.Host, { key: '146f32544b1a2d6d3c0292462edb979699e4b75a', onClick: this.clickHandler, onKeyDown: this.keyDownHandler }, index.h(interactive.InteractiveContainer, { key: 'd5897a38a203d29967ec1f1e618a7b37d60d9b95', disabled: this.disabled }, index.h("div", { key: '17739f11d7e6368788941434ff8ef6f5d6291cd9', "aria-checked": dom.toAriaBoolean(this.checked), "aria-label": label.getLabelText(this), class: {
                [CSS.toggle]: true,
                [resources.CSS_UTILITY.rtl]: rtl,
            }, onBlur: this.onToggleBlur, onFocus: this.onToggleFocus, ref: (toggleEl) => (this.toggleEl = toggleEl), role: "checkbox", tabIndex: this.disabled ? undefined : 0 }, index.h("svg", { key: '99df5e78e296d086a6782983a929bd149c3c4e39', "aria-hidden": "true", class: CSS.check, viewBox: "0 0 16 16" }, index.h("path", { key: '57458a12cf5feeada4c57dfc51c5b62f1e73d49b', d: this.getPath() })), index.h("slot", { key: 'ad29699957eb1d3f041549d7057b4842d3396b3c' })), index.h(form.HiddenFormInputSlot, { key: '1b2a325739b08d7f21d4abee49fe27f632f78183', component: this }))));
    }
    get el() { return index.getElement(this); }
};
Checkbox.style = CalciteCheckboxStyle0;

exports.calcite_checkbox = Checkbox;
