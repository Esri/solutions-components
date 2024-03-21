/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');

const optionGroupCss = ":host{display:block}:host([hidden]){display:none}[hidden]{display:none}";

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
        return (index.h(index.Fragment, null, index.h("div", null, this.label), index.h("slot", null)));
    }
    static get watchers() { return {
        "disabled": ["handlePropChange"],
        "label": ["handlePropChange"]
    }; }
};
OptionGroup.style = optionGroupCss;

exports.calcite_option_group = OptionGroup;
