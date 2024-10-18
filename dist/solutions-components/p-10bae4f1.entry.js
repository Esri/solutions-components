/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './p-4e6eb06e.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './p-d6902512.js';
import { M as MAX_COLUMNS } from './p-3cadb18d.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
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
    componentDidRender() {
        updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { disabled, heading } = this;
        return (h(Host, { key: 'e1e0304c3d4fe02909fd0075de2e4f5ef806be39' }, h(InteractiveContainer, { key: '5fb0861fb58de90808e98b7061d3c906c822203c', disabled: disabled }, h("tr", { key: 'c77af78f937c3135601df2c4574b858662d5fcdb', class: CSS.container }, h("td", { key: 'f1ae6b9e09e78f87b814287f8eaeb0a105575c7a', class: CSS.heading, colSpan: MAX_COLUMNS }, heading)), h("slot", { key: '7346d5d774173403910eddd35bf700ccd1437c4f', onSlotchange: this.handleDefaultSlotChange }))));
    }
    get el() { return getElement(this); }
};
ListItemGroup.style = CalciteListItemGroupStyle0;

export { ListItemGroup as calcite_list_item_group };
