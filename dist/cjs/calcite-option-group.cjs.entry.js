/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');

const optionGroupCss = ":host{display:block}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteOptionGroupStyle0 = optionGroupCss;

const OptionGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInternalOptionGroupChange = index.createEvent(this, "calciteInternalOptionGroupChange", 6);
        this.disabled = false;
        this.label = undefined;
    }
    handlePropChange() {
        this.calciteInternalOptionGroupChange.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        return (index.h(index.Fragment, { key: '4800432ff6c0701a725485bdcfc93d34ba988c86' }, index.h("div", { key: 'bdf722938c387afe04997ced1911d65178f699f3' }, this.label), index.h("slot", { key: '9ada7349b1fc675d5ec2d21aab0321666645af88' })));
    }
    static get watchers() { return {
        "disabled": ["handlePropChange"],
        "label": ["handlePropChange"]
    }; }
};
OptionGroup.style = CalciteOptionGroupStyle0;

exports.calcite_option_group = OptionGroup;
