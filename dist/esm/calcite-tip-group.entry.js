/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h } from './index-164d485a.js';

const tipGroupCss = ":host{box-sizing:border-box;display:block;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}::slotted(calcite-tip){margin:0px;border-style:none;max-inline-size:var(--calcite-tip-max-width)}:host([hidden]){display:none}[hidden]{display:none}";

const TipGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.groupTitle = undefined;
    }
    render() {
        return h("slot", null);
    }
};
TipGroup.style = tipGroupCss;

export { TipGroup as calcite_tip_group };
