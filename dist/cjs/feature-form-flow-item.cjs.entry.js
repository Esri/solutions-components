/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');

const featureFormFlowItemCss = ":host{display:block}";

const FeatureFormFlowItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
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
        return (index.h(index.Host, null, index.h("slot", null)));
    }
    get el() { return index.getElement(this); }
};
FeatureFormFlowItem.style = featureFormFlowItemCss;

exports.feature_form_flow_item = FeatureFormFlowItem;
