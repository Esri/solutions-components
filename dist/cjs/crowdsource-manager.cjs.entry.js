/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c6979cbb.js');
const locale = require('./locale-04da9a8c.js');
require('./_commonjsHelpers-384729db.js');

const crowdsourceManagerCss = ":host{display:block;--calcite-label-margin-bottom:0px}.header{width:100%;height:50px;background-color:var(--calcite-ui-foreground-2)}.header-title{display:flex;float:left}.header-controls-label{display:flex;float:right}.header-controls{height:50px}.img-background{background-repeat:no-repeat;background-size:100% 100%;width:38px;height:26px}.grid-background{background-image:url('../../assets/data/images/grid.png')}.horizontal-background{background-image:url('../../assets/data/images/horizontal.png')}.vertical-background{background-image:url('../../assets/data/images/vertical.png')}.action-center{-webkit-box-align:center;-webkit-align-items:center;-ms-grid-row-align:center;align-items:center;align-content:center;justify-content:center}.background-transparent{background-color:transparent}";

const CrowdsourceManager = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this._translations = undefined;
  }
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
  async componentWillLoad() {
    await this._getTranslations();
  }
  render() {
    return (index.h(index.Host, null, index.h("div", null, index.h("calcite-shell", null, index.h("div", { class: "header", slot: 'header' }, index.h("calcite-label", { class: "header-title" }, this._translations.header), index.h("calcite-label", { class: "header-controls-label", layout: "inline" }, this._translations.layout, index.h("calcite-action-bar", { class: "header-controls", "expand-disabled": true, layout: "horizontal" }, this._getActionGroup("grid-background"), this._getActionGroup("horizontal-background"), this._getActionGroup("vertical-background"))))))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  _getActionGroup(imgClass) {
    return (index.h("div", { class: "action-center background-transparent" }, index.h("calcite-action", { alignment: "center", appearance: "transparent", compact: false, onClick: () => { this._updateLayout(); }, text: "" }, index.h("div", { class: imgClass + " img-background" })), index.h("calcite-tooltip", { label: "", placement: "bottom" }, index.h("span", null, "tip"))));
  }
  _updateLayout() {
    console.log("A");
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
CrowdsourceManager.style = crowdsourceManagerCss;

exports.crowdsource_manager = CrowdsourceManager;
