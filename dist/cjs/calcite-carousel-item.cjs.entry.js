/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const guid = require('./guid-02e5380f.js');

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
        index.registerInstance(this, hostRef);
        this.guid = `calcite-carousel-item-${guid.guid()}`;
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
        return (index.h(index.Host, { key: '6d4ac387ae1b4748050c82d8387edd30e6c0e662', id: id }, index.h("div", { key: 'c6a4c67d99dd6e34198b2d128efb518e757277ce', "aria-label": this.label, class: { [CSS.container]: true, [CSS.selected]: this.selected }, role: "tabpanel" }, index.h("slot", { key: '2ed94883d41dba5430a39933c6fe91bb25b12703' }))));
    }
    get el() { return index.getElement(this); }
};
CarouselItem.style = CalciteCarouselItemStyle0;

exports.calcite_carousel_item = CarouselItem;
