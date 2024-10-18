/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const logger = require('./logger-f177776b.js');
require('./config-e76d9931.js');

const tipGroupCss = ":host{box-sizing:border-box;display:block;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}::slotted(calcite-tip){margin:0px;border-style:none;max-inline-size:var(--calcite-tip-max-width)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTipGroupStyle0 = tipGroupCss;

logger.logger.deprecated("component", {
    name: "tip-group",
    removalVersion: 4,
    suggested: ["carousel", "carousel-item"],
});
const TipGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.groupTitle = undefined;
    }
    render() {
        return index.h("slot", { key: '40d9094358a1ef9165e9261d9ca351b2530a7584' });
    }
};
TipGroup.style = CalciteTipGroupStyle0;

exports.calcite_tip_group = TipGroup;
