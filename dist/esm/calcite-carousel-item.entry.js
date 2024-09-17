/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './index-b793d9aa.js';
import { g as guid } from './guid-4c746a7f.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    container: "container",
    selected: "selected",
};

const carouselItemCss = ":host{display:flex}.container{display:none;inline-size:var(--calcite-container-size-content-fluid)}:host([selected]) .container{display:block}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteCarouselItemStyle0 = carouselItemCss;

const CarouselItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h(Host, { key: '6d4ac387ae1b4748050c82d8387edd30e6c0e662', id: id }, h("div", { key: 'c6a4c67d99dd6e34198b2d128efb518e757277ce', "aria-label": this.label, class: { [CSS.container]: true, [CSS.selected]: this.selected }, role: "tabpanel" }, h("slot", { key: '2ed94883d41dba5430a39933c6fe91bb25b12703' }))));
    }
    get el() { return getElement(this); }
};
CarouselItem.style = CalciteCarouselItemStyle0;

export { CarouselItem as calcite_carousel_item };
