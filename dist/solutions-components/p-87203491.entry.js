/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './p-4e6eb06e.js';
import { d as focusElement, t as toAriaBoolean } from './p-621ad249.js';
import { c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './p-6adaac20.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './p-d6902512.js';
import { i as isActivationKey } from './p-233f219c.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './p-d25fc2c2.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './p-ad9d1221.js';
import './p-7d542581.js';
import './p-91371f97.js';
import './p-4a291f79.js';
import './p-4f82eb55.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    container: "container",
    track: "track",
    handle: "handle",
};

const switchCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]) .container{block-size:0.75rem}:host([scale=s]) .track{block-size:0.75rem;inline-size:1.5rem}:host([scale=s]) .handle{block-size:0.5rem;inline-size:0.5rem}:host([scale=m]) .container{block-size:1rem}:host([scale=m]) .track{block-size:1rem;inline-size:2rem}:host([scale=m]) .handle{block-size:0.75rem;inline-size:0.75rem}:host([scale=l]) .container{block-size:1.5rem}:host([scale=l]) .track{block-size:1.5rem;inline-size:3rem}:host([scale=l]) .handle{block-size:1.25rem;inline-size:1.25rem}:host{position:relative;display:inline-block;inline-size:auto;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle;tap-highlight-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{outline-width:0px}.track{pointer-events:none;position:relative;box-sizing:border-box;display:inline-block;border-radius:9999px;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-2);background-color:var(--calcite-color-foreground-2);vertical-align:top;outline-color:transparent}.container:focus .track{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.handle{pointer-events:none;position:absolute;display:block;border-radius:9999px;border-width:2px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);transition-property:all;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);inset-block-start:-1px;inset-inline:-1px auto}.container:hover .handle,.container:focus .handle{border-color:var(--calcite-color-brand);box-shadow:inset 0 0 0 1px var(--calcite-color-brand)}:host([checked]) .track{border-color:var(--calcite-color-brand-hover);background-color:var(--calcite-color-brand)}:host([checked]) .handle{border-color:var(--calcite-color-brand);inset-inline:auto -1px}:host([checked]) .container:hover .handle{border-color:var(--calcite-color-brand-hover);box-shadow:inset 0 0 0 1px var(--calcite-color-brand-hover)}@media (forced-colors: active){:host([checked]) .track{background-color:canvasText}}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteSwitchStyle0 = switchCss;

const Switch = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteSwitchChange = createEvent(this, "calciteSwitchChange", 6);
        this.keyDownHandler = (event) => {
            if (!this.disabled && isActivationKey(event.key)) {
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
        this.setSwitchEl = (el) => {
            this.switchEl = el;
        };
        this.disabled = false;
        this.form = undefined;
        this.label = undefined;
        this.name = undefined;
        this.scale = "m";
        this.checked = false;
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
        focusElement(this.switchEl);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    syncHiddenFormInput(input) {
        input.type = "checkbox";
    }
    onLabelClick() {
        if (!this.disabled) {
            this.toggle();
            this.setFocus();
        }
    }
    toggle() {
        this.checked = !this.checked;
        this.calciteSwitchChange.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectLabel(this);
        connectForm(this);
    }
    componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        disconnectLabel(this);
        disconnectForm(this);
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
        return (h(Host, { key: '7731df888262acc136e2099fe599c6290967fea7', onClick: this.clickHandler, onKeyDown: this.keyDownHandler }, h(InteractiveContainer, { key: '6bc3781eb46221cbe022c6e6b3e7bad267e4d2c6', disabled: this.disabled }, h("div", { key: '1670db00b1cdb4ad8f013ff0dae914683db2004c', "aria-checked": toAriaBoolean(this.checked), "aria-label": getLabelText(this), class: CSS.container, ref: this.setSwitchEl, role: "switch", tabIndex: 0 }, h("div", { key: '3c6e6d5abc6df9d745e361a65d06f4e7c1a3da16', class: CSS.track }, h("div", { key: '0973b399396b9bd44ac9d2c17b374e2fbfe77b5e', class: CSS.handle })), h(HiddenFormInputSlot, { key: '7776a1881b7b6d43c543e4f388ae6cb4301b4181', component: this })))));
    }
    get el() { return getElement(this); }
};
Switch.style = CalciteSwitchStyle0;

export { Switch as calcite_switch };
