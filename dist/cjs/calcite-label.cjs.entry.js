/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const label = require('./label-32573e1d.js');
require('./dom-c9c2c835.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./component-ac7c3bd8.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    container: "container",
};

const labelCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}:host([alignment=start]){text-align:start}:host([alignment=end]){text-align:end}:host([alignment=center]){text-align:center}:host([scale=s]) .container{gap:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem;margin-block-end:var(--calcite-label-margin-bottom, 0.5rem)}:host([scale=m]) .container{gap:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem;margin-block-end:var(--calcite-label-margin-bottom, 0.75rem)}:host([scale=l]) .container{gap:0.5rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;margin-block-end:var(--calcite-label-margin-bottom, 1rem)}:host .container{margin-inline:0px;margin-block-start:0px;inline-size:100%;line-height:1.375;color:var(--calcite-color-text-1)}:host([layout=default]) .container{display:flex;flex-direction:column}:host([layout=inline]) .container,:host([layout=inline-space-between]) .container{display:flex;flex-direction:row;align-items:center;gap:0.5rem}:host([layout=inline][scale=l]) .container{gap:0.75rem}:host([layout=inline-space-between]) .container{justify-content:space-between}:host([disabled])>.container{opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted(*[disabled]),:host([disabled]) ::slotted(*[disabled] *){--tw-bg-opacity:1}:host([disabled]) ::slotted(calcite-input-message:not([active])){--tw-bg-opacity:0}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";

const Label = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInternalLabelClick = index.createEvent(this, "calciteInternalLabelClick", 2);
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.labelClickHandler = (event) => {
            this.calciteInternalLabelClick.emit({
                sourceEvent: event,
            });
        };
        this.alignment = "start";
        this.for = undefined;
        this.scale = "m";
        this.layout = "default";
    }
    handleForChange() {
        label.associateExplicitLabelToUnlabeledComponent(this.el);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        document.dispatchEvent(new CustomEvent(label.labelConnectedEvent));
    }
    disconnectedCallback() {
        document.dispatchEvent(new CustomEvent(label.labelDisconnectedEvent));
    }
    render() {
        return (index.h(index.Host, { onClick: this.labelClickHandler }, index.h("div", { class: CSS.container }, index.h("slot", null))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "for": ["handleForChange"]
    }; }
};
Label.style = labelCss;

exports.calcite_label = Label;
