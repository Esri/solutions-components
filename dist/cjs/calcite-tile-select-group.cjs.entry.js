/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const interactive = require('./interactive-89f913ba.js');
const logger = require('./logger-1c9bfcfd.js');
require('./browser-69696af0.js');
require('./config-afe9063b.js');

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
    connectedCallback() {
        interactive.connectInteractive(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
    }
    render() {
        return (index.h(interactive.InteractiveContainer, { key: '9813d93d9b1307cd39ca8e109ef99d876710b328', disabled: this.disabled }, index.h("slot", { key: '1eec8241863a160777fd47f923996ba940c6de83' })));
    }
    get el() { return index.getElement(this); }
};
TileSelectGroup.style = CalciteTileSelectGroupStyle0;

exports.calcite_tile_select_group = TileSelectGroup;
