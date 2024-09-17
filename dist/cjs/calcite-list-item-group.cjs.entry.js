/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const interactive = require('./interactive-89f913ba.js');
const resources = require('./resources-e96455bb.js');
require('./browser-69696af0.js');

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
        index.registerInstance(this, hostRef);
        this.calciteInternalListItemGroupDefaultSlotChange = index.createEvent(this, "calciteInternalListItemGroupDefaultSlotChange", 6);
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
        interactive.connectInteractive(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { disabled, heading } = this;
        return (index.h(index.Host, { key: '85b83e04247b94aa14924a0f835a1a998dea8a09' }, index.h(interactive.InteractiveContainer, { key: 'd07a3dde8836dad2a905b4621fae3c6c2c3c3966', disabled: disabled }, index.h("tr", { key: 'e0371d077ffca503468e60ea4906391eed32ae85', class: CSS.container }, index.h("td", { key: '41a9ea1a58f0cd4b6daabee4a4b628184aff0cae', class: CSS.heading, colSpan: resources.MAX_COLUMNS }, heading)), index.h("slot", { key: '74dbc9667e9ac7b420a4584b80add4692b143a14', onSlotchange: this.handleDefaultSlotChange }))));
    }
    get el() { return index.getElement(this); }
};
ListItemGroup.style = CalciteListItemGroupStyle0;

exports.calcite_list_item_group = ListItemGroup;
