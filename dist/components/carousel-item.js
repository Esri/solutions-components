/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as guid } from './guid.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    container: "container",
    selected: "selected",
};

const carouselItemCss = ":host{display:flex}.container{display:none;inline-size:var(--calcite-container-size-content-fluid)}:host([selected]) .container{display:block}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteCarouselItemStyle0 = carouselItemCss;

const CarouselItem = /*@__PURE__*/ proxyCustomElement(class CarouselItem extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.guid = `calcite-carousel-item-${guid()}`;
        this.label = undefined;
        this.selected = false;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const id = this.el.id || this.guid;
        return (h(Host, { key: '5606df99edd6007701f391f095c88270eed4ccf1', id: id }, h("div", { key: '7147a10dbb3fa9292da09207709bfa5e7e857bf9', "aria-label": this.label, class: { [CSS.container]: true, [CSS.selected]: this.selected }, role: "tabpanel" }, h("slot", { key: '8b6876c8fc55afd1cac458b97063f66dff2cd9e2' }))));
    }
    get el() { return this; }
    static get style() { return CalciteCarouselItemStyle0; }
}, [1, "calcite-carousel-item", {
        "label": [1],
        "selected": [516]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-carousel-item"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-carousel-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CarouselItem);
            }
            break;
    } });
}
defineCustomElement();

export { CarouselItem as C, defineCustomElement as d };
