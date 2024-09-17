/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, g as getElement } from './index-b793d9aa.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './interactive-742ba555.js';
import { l as logger } from './logger-0d6e5bfe.js';
import './browser-552eb2d0.js';
import './config-2fa7bb77.js';

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
    connectedCallback() {
        connectInteractive(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
    }
    render() {
        return (h(InteractiveContainer, { key: '9813d93d9b1307cd39ca8e109ef99d876710b328', disabled: this.disabled }, h("slot", { key: '1eec8241863a160777fd47f923996ba940c6de83' })));
    }
    get el() { return getElement(this); }
};
TileSelectGroup.style = CalciteTileSelectGroupStyle0;

export { TileSelectGroup as calcite_tile_select_group };
