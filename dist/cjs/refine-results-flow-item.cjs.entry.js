/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');

const refineResultsFlowItemCss = ":host{display:block}";
const RefineResultsFlowItemStyle0 = refineResultsFlowItemCss;

const RefineResultsFlowItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
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
        return (index.h(index.Host, { key: '80b7f73a51e599fecc98483da51aa24ebbd0efed' }, index.h("slot", { key: '0824e1e1a33659e6161aab76449a6df39538398a' })));
    }
};
RefineResultsFlowItem.style = RefineResultsFlowItemStyle0;

exports.refine_results_flow_item = RefineResultsFlowItem;
