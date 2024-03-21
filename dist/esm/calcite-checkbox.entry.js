/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-164d485a.js';
import { t as toAriaBoolean } from './dom-38c6f027.js';
import { c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './form-50dcd52e.js';
import { g as guid } from './guid-b75a5f7b.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive-39bf5602.js';
import { i as isActivationKey } from './key-c83d835f.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './label-b4cea72e.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable-37e7fbd6.js';
import './resources-8834f920.js';
import './browser-d60104bd.js';
import './component-edd2c3cd.js';

const checkboxCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]){--calcite-checkbox-size:0.75rem}:host([scale=m]){--calcite-checkbox-size:var(--calcite-font-size--1)}:host([scale=l]){--calcite-checkbox-size:1rem}:host{position:relative;display:inline-flex;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}:host .check-svg,:host .toggle{inline-size:var(--calcite-checkbox-size);block-size:var(--calcite-checkbox-size)}:host .check-svg{pointer-events:none;box-sizing:border-box;display:block;overflow:hidden;background-color:var(--calcite-color-foreground-1);fill:currentColor;stroke:currentColor;stroke-width:1;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;box-shadow:inset 0 0 0 1px var(--calcite-color-border-input);color:var(--calcite-color-background)}:host([status=invalid]:not([checked])) .check-svg{box-shadow:inset 0 0 0 1px var(--calcite-color-status-danger)}:host([status=invalid]:not([checked])) .toggle:focus{outline:2px solid var(--calcite-color-status-danger);outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([checked]) .check-svg,:host([indeterminate]) .check-svg{background-color:var(--calcite-color-brand);box-shadow:inset 0 0 0 1px var(--calcite-color-brand)}:host([hovered]) .toggle .check-svg,:host .toggle:hover .check-svg{box-shadow:inset 0 0 0 2px var(--calcite-color-brand)}.toggle{position:relative;outline-color:transparent}.toggle:active,.toggle:focus,.toggle:focus-visible{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.toggle::after{content:\"\";inset-block-start:50%;inset-inline-start:50%;min-block-size:1.5rem;min-inline-size:1.5rem;position:absolute;transform:translateX(-50%) translateY(-50%)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";

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
        this.value = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        var _a;
        await componentFocusable(this);
        (_a = this.toggleEl) === null || _a === void 0 ? void 0 : _a.focus();
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
        return (h(Host, { onClick: this.clickHandler, onKeyDown: this.keyDownHandler }, h(InteractiveContainer, { disabled: this.disabled }, h("div", { "aria-checked": toAriaBoolean(this.checked), "aria-label": getLabelText(this), class: "toggle", onBlur: this.onToggleBlur, onFocus: this.onToggleFocus, role: "checkbox", tabIndex: this.disabled ? undefined : 0,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (toggleEl) => (this.toggleEl = toggleEl) }, h("svg", { "aria-hidden": "true", class: "check-svg", viewBox: "0 0 16 16" }, h("path", { d: this.getPath() })), h("slot", null)), h(HiddenFormInputSlot, { component: this }))));
    }
    get el() { return getElement(this); }
};
Checkbox.style = checkboxCss;

export { Checkbox as calcite_checkbox };
