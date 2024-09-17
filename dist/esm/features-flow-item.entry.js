/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, g as getElement, h, H as Host } from './index-b793d9aa.js';

const featuresFlowItemCss = ":host{display:block}";
const FeaturesFlowItemStyle0 = featuresFlowItemCss;

const FeaturesFlowItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  State (internal)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    render() {
        return (h(Host, { key: '0070ec5f638adacbae77befed92f4aa61a675c8f' }, h("slot", { key: 'c13088ad63e931160712bdb385e431f63ca14862' })));
    }
};
FeaturesFlowItem.style = FeaturesFlowItemStyle0;

export { FeaturesFlowItem as features_flow_item };
