/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const locale = require('./locale-8c42ba7a.js');
const interfaces = require('./interfaces-7cd0a48a.js');
require('./esri-loader-a91c0ec1.js');
require('./_commonjsHelpers-384729db.js');

const layoutManagerCss = ":host{display:block}.action-center{-webkit-box-align:center;-webkit-align-items:center;-ms-grid-row-align:center;align-items:center;align-content:center;justify-content:center}.display-flex{display:flex}.icon-color{--calcite-color-icon-color:var(--calcite-color-brand)}.icon{cursor:pointer}.tooltip-message{padding:5px 8px;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-2)}.header-text{font-size:var(--calcite-font-size-0);font-weight:var(--calcite-font-weight-medium);padding-inline:0.75rem;padding-block:0.875rem;line-height:1.25rem}.img-background{background-repeat:no-repeat;background-size:100% 100%;width:38px;height:26px}.grid-background{background-image:url('../../assets/data/images/grid.png')}.horizontal-background{background-image:url('../../assets/data/images/horizontal.png')}.vertical-background{background-image:url('../../assets/data/images/vertical.png')}";

const LayoutManager = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.layoutChanged = index.createEvent(this, "layoutChanged", 7);
        //--------------------------------------------------------------------------
        //
        //  Properties (protected)
        //
        //--------------------------------------------------------------------------
        /**
         * Controls the layout of the application
         */
        this._layoutMode = interfaces.ELayoutMode.GRID;
        this._translations = undefined;
    }
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
        return (index.h(index.Host, null, index.h("div", { class: "display-flex" }, index.h("div", { class: "display-flex action-center" }, index.h("calcite-icon", { class: "icon icon-color", icon: "information", id: "app-information-icon", scale: "s" }), index.h("calcite-popover", { closable: true, label: "", referenceElement: "app-information-icon" }, index.h("span", { class: "tooltip-message" }, this._translations.appInfo))), index.h("div", { class: "header-text" }, this._translations.layout), this._getAction("grid-background", interfaces.ELayoutMode.GRID, this._translations.grid), this._getAction("vertical-background", interfaces.ELayoutMode.VERTICAL, this._translations.vertical), this._getAction("horizontal-background", interfaces.ELayoutMode.HORIZONTAL, this._translations.horizontal))));
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
    get el() { return index.getElement(this); }
};
LayoutManager.style = layoutManagerCss;

exports.layout_manager = LayoutManager;
