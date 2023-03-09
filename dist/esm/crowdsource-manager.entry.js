/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './index-c246d90e.js';
import { g as getLocaleComponentStrings } from './locale-7bf10e0a.js';
import './_commonjsHelpers-d5f9d613.js';

const crowdsourceManagerCss = ":host{display:block;--calcite-label-margin-bottom:0px}.header{width:100%;height:50px;background-color:var(--calcite-ui-foreground-2)}.header-title{display:flex;float:left}.header-controls-label{display:flex;float:right}.header-controls{height:50px}.img-background{background-repeat:no-repeat;background-size:100% 100%;width:38px;height:26px}.grid-background{background-image:url('../../assets/data/images/grid.png')}.horizontal-background{background-image:url('../../assets/data/images/horizontal.png')}.vertical-background{background-image:url('../../assets/data/images/vertical.png')}.action-center{-webkit-box-align:center;-webkit-align-items:center;-ms-grid-row-align:center;align-items:center;align-content:center;justify-content:center}.background-transparent{background-color:transparent}";

const CrowdsourceManager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h(Host, null, h("div", null, h("calcite-shell", null, h("div", { class: "header", slot: 'header' }, h("calcite-label", { class: "header-title" }, this._translations.header), h("calcite-label", { class: "header-controls-label", layout: "inline" }, this._translations.layout, h("calcite-action-bar", { class: "header-controls", "expand-disabled": true, layout: "horizontal" }, this._getActionGroup("grid-background"), this._getActionGroup("horizontal-background"), this._getActionGroup("vertical-background"))))))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  _getActionGroup(imgClass) {
    return (h("div", { class: "action-center background-transparent" }, h("calcite-action", { alignment: "center", appearance: "transparent", compact: false, onClick: () => { this._updateLayout(); }, text: "" }, h("div", { class: imgClass + " img-background" })), h("calcite-tooltip", { label: "", placement: "bottom" }, h("span", null, "tip"))));
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
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0];
  }
  get el() { return getElement(this); }
};
CrowdsourceManager.style = crowdsourceManagerCss;

export { CrowdsourceManager as crowdsource_manager };
