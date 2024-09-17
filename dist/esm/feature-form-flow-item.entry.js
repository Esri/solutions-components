/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, g as getElement, h, H as Host } from './index-b793d9aa.js';

const featureFormFlowItemCss = ":host{display:block}";
const FeatureFormFlowItemStyle0 = featureFormFlowItemCss;

const FeatureFormFlowItem = class {
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
        return (h(Host, { key: 'e4cd5ed27b476b7f5ed699ed13422b54b84be2e5' }, h("slot", { key: 'b73e8f8b52ac166b0e85f3114ed0fb0d57a7fec9' })));
    }
};
FeatureFormFlowItem.style = FeatureFormFlowItemStyle0;

export { FeatureFormFlowItem as feature_form_flow_item };
