/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const locale = require('./locale-339b55f0.js');
const interfaces = require('./interfaces-09c4c40e.js');
require('./esri-loader-08dc41bd.js');
require('./_commonjsHelpers-baf43783.js');

const layoutManagerCss = ":host{display:block}.action-center{-webkit-box-align:center;-webkit-align-items:center;-ms-grid-row-align:center;align-items:center;align-content:center;justify-content:center}.display-flex{display:flex}.icon-color{--calcite-color-icon-color:var(--calcite-color-brand)}.icon{cursor:pointer}.tooltip-message{padding:5px 8px;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}.header-text{font-size:var(--calcite-font-size-0);font-weight:var(--calcite-font-weight-medium);padding-inline:0.75rem;padding-block:0.875rem;line-height:1.25rem}.img-background{background-repeat:no-repeat;background-size:100% 100%;width:38px;height:26px}.grid-background{background-image:url('../../assets/data/images/grid.png')}.horizontal-background{background-image:url('../../assets/data/images/horizontal.png')}.vertical-background{background-image:url('../../assets/data/images/vertical.png')}";
const LayoutManagerStyle0 = layoutManagerCss;

const LayoutManager = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.layoutChanged = index.createEvent(this, "layoutChanged", 7);
        this._translations = undefined;
    }
    get el() { return index.getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Controls the layout of the application
     */
    _layoutMode = interfaces.ELayoutMode.GRID;
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
    /**
     * Emitted when the layout should change
     */
    layoutChanged;
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        return (index.h(index.Host, { key: '030b3a829da8eceb1ed2588ec9d0cf56e6c3b801' }, index.h("div", { key: 'c883b792dae7fd3118d50ca19529ad215812636a', class: "display-flex" }, index.h("div", { key: '24a8dacb438879ad29ad216d904c0c12229937c8', class: "display-flex action-center" }, index.h("calcite-icon", { key: 'd8ab7b953f906c807a5a3b8f6a38736e5da7308e', class: "icon icon-color", icon: "information", id: "app-information-icon", scale: "s" }), index.h("calcite-popover", { key: 'f43e72d3edbb29dadd4d7bf16e0f2028f16fa515', closable: true, label: "", referenceElement: "app-information-icon" }, index.h("span", { key: '0059d393750540cbcfe0051a9440447c261ec99f', class: "tooltip-message" }, this._translations.appInfo))), index.h("div", { key: 'ea6e944271a0538cc6c8558c08c9940f9a84a6bf', class: "header-text" }, this._translations.layout), this._getAction("grid-background", interfaces.ELayoutMode.GRID, this._translations.grid), this._getAction("vertical-background", interfaces.ELayoutMode.VERTICAL, this._translations.vertical), this._getAction("horizontal-background", interfaces.ELayoutMode.HORIZONTAL, this._translations.horizontal))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Store and emit the current layout mode
     *
     * @param imgClass string the css class to use
     * @param layoutMode ELayoutMode the associated layout mode for the current action
     * @param tip string the value to display as the tooltip for the action
     *
     * @protected
     */
    _getAction(imgClass, layoutMode, tip) {
        return (index.h("div", null, index.h("calcite-action", { alignment: "center", appearance: "transparent", compact: false, id: imgClass, indicator: layoutMode === this._layoutMode, onClick: () => { this._setLayoutMode(layoutMode); }, text: "" }, index.h("div", { class: imgClass + " img-background" })), index.h("calcite-tooltip", { label: "", placement: "bottom", "reference-element": imgClass }, index.h("span", null, tip))));
    }
    /**
     * Store and emit the current layout mode
     *
     * @param layoutMode ELayoutMode the current layout mode
     *
     * @protected
     */
    _setLayoutMode(layoutMode) {
        this._layoutMode = layoutMode;
        this.layoutChanged.emit(this._layoutMode);
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await locale.getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
};
LayoutManager.style = LayoutManagerStyle0;

exports.layout_manager = LayoutManager;
