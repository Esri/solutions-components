/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const logger = require('./logger-1c9bfcfd.js');
require('./config-afe9063b.js');

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
        return index.h("slot", { key: '681e94955211786b05696219046985063b2c3824' });
    }
};
TipGroup.style = CalciteTipGroupStyle0;

exports.calcite_tip_group = TipGroup;
