/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, F as Fragment } from './index-b793d9aa.js';

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
        return (h(Fragment, { key: '4800432ff6c0701a725485bdcfc93d34ba988c86' }, h("div", { key: 'bdf722938c387afe04997ced1911d65178f699f3' }, this.label), h("slot", { key: '9ada7349b1fc675d5ec2d21aab0321666645af88' })));
    }
    static get watchers() { return {
        "disabled": ["handlePropChange"],
        "label": ["handlePropChange"]
    }; }
};
OptionGroup.style = CalciteOptionGroupStyle0;

export { OptionGroup as calcite_option_group };
