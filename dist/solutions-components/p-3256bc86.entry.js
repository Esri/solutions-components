/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, g as getElement } from './p-4e6eb06e.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './p-d6902512.js';
import { l as logger } from './p-fa80bc7e.js';
import './p-a02e2069.js';

const tileSelectGroupCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-wrap:wrap}:host ::slotted(calcite-tile-select){margin-block-end:1px;margin-inline-end:1px}:host([layout=vertical]){flex-direction:column}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTileSelectGroupStyle0 = tileSelectGroupCss;

logger.deprecated("component", {
    name: "tile-select-group",
    removalVersion: 4,
    suggested: ["tile", "tile-group"],
});
const TileSelectGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.disabled = false;
        this.layout = "horizontal";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidRender() {
        updateHostInteraction(this);
    }
    render() {
        return (h(InteractiveContainer, { key: '7ecdf608b21ec8854addcb9138e2540af1fb90f5', disabled: this.disabled }, h("slot", { key: '67187ad6c8e5dd195cd2e905cfc78810b7566343' })));
    }
    get el() { return getElement(this); }
};
TileSelectGroup.style = CalciteTileSelectGroupStyle0;

export { TileSelectGroup as calcite_tile_select_group };
