/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-904bc599.js';
import { a as associateExplicitLabelToUnlabeledComponent, l as labelConnectedEvent, b as labelDisconnectedEvent } from './label-272c5973.js';
import './dom-75c641a7.js';
import './guid-b0fb1de3.js';
import './resources-8e2ed936.js';
import './component-83541c88.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    container: "container",
};

const labelCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}:host([alignment=start]){text-align:start}:host([alignment=end]){text-align:end}:host([alignment=center]){text-align:center}:host([scale=s]) .container{gap:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem;margin-block-end:var(--calcite-label-margin-bottom, 0.5rem)}:host([scale=m]) .container{gap:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem;margin-block-end:var(--calcite-label-margin-bottom, 0.75rem)}:host([scale=l]) .container{gap:0.5rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;margin-block-end:var(--calcite-label-margin-bottom, 1rem)}:host .container{margin-inline:0px;margin-block-start:0px;inline-size:100%;line-height:1.375;color:var(--calcite-color-text-1)}:host([layout=default]) .container{display:flex;flex-direction:column}:host([layout=inline]) .container,:host([layout=inline-space-between]) .container{display:flex;flex-direction:row;align-items:center;gap:0.5rem}:host([layout=inline][scale=l]) .container{gap:0.75rem}:host([layout=inline-space-between]) .container{justify-content:space-between}:host([disabled])>.container{opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted(*[disabled]),:host([disabled]) ::slotted(*[disabled] *){--tw-bg-opacity:1}:host([disabled]) ::slotted(calcite-input-message:not([active])){--tw-bg-opacity:0}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteLabelStyle0 = labelCss;

const Label = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteInternalLabelClick = createEvent(this, "calciteInternalLabelClick", 2);
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.labelClickHandler = (event) => {
            if (window.getSelection()?.type === "Range") {
                return;
            }
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
        associateExplicitLabelToUnlabeledComponent(this.el);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        document.dispatchEvent(new CustomEvent(labelConnectedEvent));
    }
    disconnectedCallback() {
        document.dispatchEvent(new CustomEvent(labelDisconnectedEvent));
    }
    render() {
        return (h(Host, { key: 'c3eff09792519c9e5a76ee28e3754db83b536f99', onClick: this.labelClickHandler }, h("div", { key: '387902edd9b59be290f95ad6c2721584037d7256', class: CSS.container }, h("slot", { key: 'b54d782522e95323333040e40e1a6dd06b52a575' }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "for": ["handleForChange"]
    }; }
};
Label.style = CalciteLabelStyle0;

export { Label as calcite_label };
