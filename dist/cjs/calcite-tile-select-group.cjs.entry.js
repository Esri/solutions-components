/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const interactive = require('./interactive-a128ac30.js');
const logger = require('./logger-f177776b.js');
require('./config-e76d9931.js');

const tileSelectGroupCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-wrap:wrap}:host ::slotted(calcite-tile-select){margin-block-end:1px;margin-inline-end:1px}:host([layout=vertical]){flex-direction:column}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTileSelectGroupStyle0 = tileSelectGroupCss;

logger.logger.deprecated("component", {
    name: "tile-select-group",
    removalVersion: 4,
    suggested: ["tile", "tile-group"],
});
const TileSelectGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.disabled = false;
        this.layout = "horizontal";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    render() {
        return (index.h(interactive.InteractiveContainer, { key: '7ecdf608b21ec8854addcb9138e2540af1fb90f5', disabled: this.disabled }, index.h("slot", { key: '67187ad6c8e5dd195cd2e905cfc78810b7566343' })));
    }
    get el() { return index.getElement(this); }
};
TileSelectGroup.style = CalciteTileSelectGroupStyle0;

exports.calcite_tile_select_group = TileSelectGroup;
