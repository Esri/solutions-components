/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, F as Fragment } from './index-904bc599.js';

const optionGroupCss = ":host{display:block}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteOptionGroupStyle0 = optionGroupCss;

const OptionGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteInternalOptionGroupChange = createEvent(this, "calciteInternalOptionGroupChange", 6);
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
        return (h(Fragment, { key: '174fcf908d37aba0972b1f408938a6ce909e45ff' }, h("div", { key: '49ac7e0b58d14a8d07322c7c68670d9c5863c291' }, this.label), h("slot", { key: '07d24a3a1edf192733bcb3fcdf279f121df482ed' })));
    }
    static get watchers() { return {
        "disabled": ["handlePropChange"],
        "label": ["handlePropChange"]
    }; }
};
OptionGroup.style = CalciteOptionGroupStyle0;

export { OptionGroup as calcite_option_group };
