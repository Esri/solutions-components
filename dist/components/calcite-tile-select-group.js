/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './interactive.js';
import { l as logger } from './logger.js';

const tileSelectGroupCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;flex-wrap:wrap}:host ::slotted(calcite-tile-select){margin-block-end:1px;margin-inline-end:1px}:host([layout=vertical]){flex-direction:column}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTileSelectGroupStyle0 = tileSelectGroupCss;

logger.deprecated("component", {
    name: "tile-select-group",
    removalVersion: 4,
    suggested: ["tile", "tile-group"],
});
const TileSelectGroup = /*@__PURE__*/ proxyCustomElement(class TileSelectGroup extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
    get el() { return this; }
    static get style() { return CalciteTileSelectGroupStyle0; }
}, [1, "calcite-tile-select-group", {
        "disabled": [516],
        "layout": [513]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-tile-select-group"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-tile-select-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, TileSelectGroup);
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteTileSelectGroup = TileSelectGroup;
const defineCustomElement = defineCustomElement$1;

export { CalciteTileSelectGroup, defineCustomElement };
