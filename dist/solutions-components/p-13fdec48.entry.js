/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './p-6eb37ed2.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './p-415cf05e.js';
import { M as MAX_COLUMNS } from './p-8241cd35.js';
import './p-acaae81d.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    container: "container",
    heading: "heading",
};

const listItemGroupCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-direction:column;background-color:var(--calcite-color-foreground-1)}:host([filter-hidden]){display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{margin:0px;display:flex;flex:1 1 0%;padding:0.75rem;font-size:var(--calcite-font-size--1);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2)}.heading{padding:0px}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteListItemGroupStyle0 = listItemGroupCss;

const ListItemGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteInternalListItemGroupDefaultSlotChange = createEvent(this, "calciteInternalListItemGroupDefaultSlotChange", 6);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleDefaultSlotChange = () => {
            this.calciteInternalListItemGroupDefaultSlotChange.emit();
        };
        this.disabled = false;
        this.filterHidden = false;
        this.heading = undefined;
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectInteractive(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { disabled, heading } = this;
        return (h(Host, { key: '85b83e04247b94aa14924a0f835a1a998dea8a09' }, h(InteractiveContainer, { key: 'd07a3dde8836dad2a905b4621fae3c6c2c3c3966', disabled: disabled }, h("tr", { key: 'e0371d077ffca503468e60ea4906391eed32ae85', class: CSS.container }, h("td", { key: '41a9ea1a58f0cd4b6daabee4a4b628184aff0cae', class: CSS.heading, colSpan: MAX_COLUMNS }, heading)), h("slot", { key: '74dbc9667e9ac7b420a4584b80add4692b143a14', onSlotchange: this.handleDefaultSlotChange }))));
    }
    get el() { return getElement(this); }
};
ListItemGroup.style = CalciteListItemGroupStyle0;

export { ListItemGroup as calcite_list_item_group };
