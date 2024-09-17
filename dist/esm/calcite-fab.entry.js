/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, g as getElement } from './index-b793d9aa.js';
import { e as focusElement } from './dom-b5c50286.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './interactive-742ba555.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable-73f289b6.js';
import './guid-4c746a7f.js';
import './resources-defbb49f.js';
import './browser-552eb2d0.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    button: "button",
};
const ICONS = {
    plus: "plus",
};

const fabCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}calcite-button{--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}calcite-button:hover{--tw-shadow:var(--calcite-shadow-md);--tw-shadow-colored:var(--calcite-shadow-md);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}calcite-button:active{--tw-shadow:0 2px 12px -4px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.16);--tw-shadow-colored:0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteFabStyle0 = fabCss;

const Fab = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.appearance = "solid";
        this.kind = "brand";
        this.disabled = false;
        this.icon = ICONS.plus;
        this.iconFlipRtl = false;
        this.label = undefined;
        this.loading = false;
        this.scale = "m";
        this.text = undefined;
        this.textEnabled = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectInteractive(this);
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
    disconnectedCallback() {
        disconnectInteractive(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        focusElement(this.buttonEl);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { appearance, kind, disabled, loading, scale, textEnabled, icon, label, text, iconFlipRtl, } = this;
        const title = !textEnabled ? label || text || null : null;
        return (h(InteractiveContainer, { key: 'a3f179f9542d93366d6befded12604369f905580', disabled: disabled }, h("calcite-button", { key: '2adc3c8d6408743bfa905995ce75c7ed4d241733', appearance: appearance === "solid" ? "solid" : "outline-fill", class: CSS.button, disabled: disabled, iconFlipRtl: iconFlipRtl ? "start" : null, iconStart: icon, kind: kind, label: label, loading: loading, ref: (buttonEl) => {
                this.buttonEl = buttonEl;
            }, round: true, scale: scale, title: title, type: "button", width: "auto" }, this.textEnabled ? this.text : null)));
    }
    get el() { return getElement(this); }
};
Fab.style = CalciteFabStyle0;

export { Fab as calcite_fab };
