/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const dom = require('./dom-c9c2c835.js');
const interactive = require('./interactive-3ab7044d.js');
const loadable = require('./loadable-5a794992.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./browser-d08a5f99.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    button: "button",
};
const ICONS = {
    plus: "plus",
};

const fabCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;background-color:transparent}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}calcite-button{--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}calcite-button:hover{--tw-shadow:var(--calcite-shadow-md);--tw-shadow-colored:var(--calcite-shadow-md);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}calcite-button:active{--tw-shadow:0 2px 12px -4px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.16);--tw-shadow-colored:0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([hidden]){display:none}[hidden]{display:none}";

const Fab = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        interactive.connectInteractive(this);
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
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        dom.focusElement(this.buttonEl);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { appearance, kind, disabled, loading, scale, textEnabled, icon, label, text, iconFlipRtl, } = this;
        const title = !textEnabled ? label || text || null : null;
        return (index.h(interactive.InteractiveContainer, { disabled: disabled }, index.h("calcite-button", { appearance: appearance === "solid" ? "solid" : "outline-fill", class: CSS.button, disabled: disabled, iconFlipRtl: iconFlipRtl ? "start" : null, iconStart: icon, kind: kind, label: label, loading: loading, round: true, scale: scale, title: title, type: "button", width: "auto",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (buttonEl) => {
                this.buttonEl = buttonEl;
            } }, this.textEnabled ? this.text : null)));
    }
    get el() { return index.getElement(this); }
};
Fab.style = fabCss;

exports.calcite_fab = Fab;
