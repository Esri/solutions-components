/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c6979cbb.js');
const locale = require('./locale-fadee9a0.js');
require('./_commonjsHelpers-6aafa5de.js');

const configDrawToolsCss = ":host{display:block}.label-spacing{--calcite-label-margin-bottom:0}.padding-block-end-1{-webkit-padding-after:1rem;padding-block-end:1rem}.padding-inline-start-1{-webkit-padding-start:1rem;padding-inline-start:1rem}";

const ConfigDrawTools = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.defaultChecked = true;
    this._translations = undefined;
  }
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
  /**
   * Returns a key/value pair that represents the checkbox value and checked state
   *
   * @returns Promise with the state of the checkboxes
   */
  async getConfigInfo() {
    return this._checkList.getConfigInfo();
  }
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
    const nlsTypes = this._translations.types || {};
    const types = Object.keys(nlsTypes).map(k => nlsTypes[k]);
    return (index.h(index.Host, null, index.h("div", null, index.h("div", { class: "padding-block-end-1" }, index.h("calcite-label", { class: "label-spacing" }, this._translations.drawTools)), index.h("div", { class: "padding-inline-start-1" }, index.h("check-list", { defaultChecked: this.defaultChecked, ref: (el) => { this._checkList = el; }, values: types })))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
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
ConfigDrawTools.style = configDrawToolsCss;

exports.config_draw_tools = ConfigDrawTools;
