/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, F as Fragment } from './index-164d485a.js';

const optionGroupCss = ":host{display:block}:host([hidden]){display:none}[hidden]{display:none}";

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
        return (h(Fragment, null, h("div", null, this.label), h("slot", null)));
    }
    static get watchers() { return {
        "disabled": ["handlePropChange"],
        "label": ["handlePropChange"]
    }; }
};
OptionGroup.style = optionGroupCss;

export { OptionGroup as calcite_option_group };
