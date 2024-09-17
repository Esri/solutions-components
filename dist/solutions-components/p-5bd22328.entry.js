/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './p-6eb37ed2.js';
import { e as focusElement, t as toAriaBoolean } from './p-68ec5c15.js';
import { c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './p-9f63a45c.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './p-415cf05e.js';
import { i as isActivationKey } from './p-fe6f7734.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './p-ac52e0ba.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './p-18f18ab3.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';
import './p-acaae81d.js';
import './p-d559f79c.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    container: "container",
    track: "track",
    handle: "handle",
};

const switchCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]) .container{block-size:0.75rem}:host([scale=s]) .track{block-size:0.75rem;inline-size:1.5rem}:host([scale=s]) .handle{block-size:0.5rem;inline-size:0.5rem}:host([scale=m]) .container{block-size:1rem}:host([scale=m]) .track{block-size:1rem;inline-size:2rem}:host([scale=m]) .handle{block-size:0.75rem;inline-size:0.75rem}:host([scale=l]) .container{block-size:1.5rem}:host([scale=l]) .track{block-size:1.5rem;inline-size:3rem}:host([scale=l]) .handle{block-size:1.25rem;inline-size:1.25rem}:host{position:relative;display:inline-block;inline-size:auto;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;vertical-align:middle;tap-highlight-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{outline-width:0px}.track{pointer-events:none;position:relative;box-sizing:border-box;display:inline-block;border-radius:9999px;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-2);background-color:var(--calcite-color-foreground-2);vertical-align:top;outline-color:transparent}:host(:focus) .track{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.handle{pointer-events:none;position:absolute;display:block;border-radius:9999px;border-width:2px;border-style:solid;border-color:var(--calcite-color-border-input);background-color:var(--calcite-color-foreground-1);transition-property:all;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);inset-block-start:-1px;inset-inline:-1px auto}.container:hover .handle,:host(:focus) .handle{border-color:var(--calcite-color-brand);box-shadow:inset 0 0 0 1px var(--calcite-color-brand)}:host([checked]) .track{border-color:var(--calcite-color-brand-hover);background-color:var(--calcite-color-brand)}:host([checked]) .handle{border-color:var(--calcite-color-brand);inset-inline:auto -1px}:host([checked]) .container:hover .handle{border-color:var(--calcite-color-brand-hover);box-shadow:inset 0 0 0 1px var(--calcite-color-brand-hover)}@media (forced-colors: active){:host([checked]) .track{background-color:canvasText}}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}:host([hidden]){display:none}[hidden]{display:none}";
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
        connectInteractive(this);
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
        disconnectInteractive(this);
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
        return (h(Host, { key: '2e5e3a9e0dcc88431502cd2bbea8323a1898ef9a', onClick: this.clickHandler, onKeyDown: this.keyDownHandler }, h(InteractiveContainer, { key: '73c50c102fe522422e08835b653dc8651eca6bae', disabled: this.disabled }, h("div", { key: 'f0020b33ecee02265dcd4d712f729638ccabb14e', "aria-checked": toAriaBoolean(this.checked), "aria-label": getLabelText(this), class: CSS.container, ref: this.setSwitchEl, role: "switch", tabIndex: 0 }, h("div", { key: '03b2f583e888ea429025b74ca43b22a4dd957ee5', class: CSS.track }, h("div", { key: '3045c61b33731f692ecf201cb6ffea2a164f6297', class: CSS.handle })), h(HiddenFormInputSlot, { key: 'f1a1c1bda4e85b357936c962175e0942dc0b0001', component: this })))));
    }
    get el() { return getElement(this); }
};
Switch.style = CalciteSwitchStyle0;

export { Switch as calcite_switch };
