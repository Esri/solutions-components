/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { p as pdfUtils } from './labelFormats.js';
import { d as defineCustomElement$4 } from './checkbox.js';
import { d as defineCustomElement$3 } from './label.js';
import { d as defineCustomElement$2 } from './check-list2.js';

const configPdfDownloadCss = ":host{display:block}.label-spacing{--calcite-label-margin-bottom:0}.padding-block-end-1{-webkit-padding-after:1rem;padding-block-end:1rem}.padding-inline-start-1{-webkit-padding-start:1rem;padding-inline-start:1rem}";

const ConfigPdfDownload$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.defaultChecked = true;
    this._formatOptions = [];
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
    const formatOptions = await this._formatOptionsCheckList.getConfigInfo();
    const csvOptions = await this._csvOptionsCheckList.getConfigInfo();
    return Object.assign(Object.assign({}, formatOptions), csvOptions);
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
    await this._setFormatOptions();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", null, h("div", { class: "padding-block-end-1" }, h("calcite-label", { class: "label-spacing" }, this._translations.availableLabelFormats)), h("div", { class: "padding-block-end-1 padding-inline-start-1" }, h("check-list", { defaultChecked: this.defaultChecked, ref: (el) => { this._formatOptionsCheckList = el; }, values: this._formatOptions })), h("div", { class: "padding-block-end-1" }, h("calcite-label", { class: "label-spacing" }, this._translations.csvOptions)), h("div", { class: "padding-block-end-1 padding-inline-start-1" }, h("check-list", { defaultChecked: this.defaultChecked, ref: (el) => { this._csvOptionsCheckList = el; }, values: [this._translations.csvColumnTitle] })))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Fetch the names of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  async _setFormatOptions() {
    const s = pdfUtils;
    const sortedPdfIndo = (s.default || s).sort((a, b) => {
      const _a = parseInt(a.descriptionPDF.labelsPerPageDisplay, 10);
      const _b = parseInt(b.descriptionPDF.labelsPerPageDisplay, 10);
      return _a < _b ? -1 : _a > _b ? 1 : 0;
    });
    this._formatOptions = sortedPdfIndo.map(l => {
      return this._getLabelSizeText(l);
    });
  }
  /**
   * Gets the formatted pdf export size text
   *
   * @param labelInfo current user selected label info
   *
   * @returns the pdf label as a string
   * @protected
   */
  _getLabelSizeText(labelInfo) {
    const lNum = labelInfo.descriptionPDF.labelsPerPageDisplay;
    const lSize = `${labelInfo.descriptionPDF.labelWidthDisplay} x ${labelInfo.descriptionPDF.labelHeightDisplay}`;
    return this._translations.pdfLabel.replace("{{n}}", lNum).replace("{{labelSize}}", lSize);
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
  get el() { return this; }
  static get style() { return configPdfDownloadCss; }
}, [1, "config-pdf-download", {
    "defaultChecked": [516, "default-checked"],
    "_formatOptions": [32],
    "_translations": [32],
    "getConfigInfo": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["config-pdf-download", "calcite-checkbox", "calcite-label", "check-list"];
  components.forEach(tagName => { switch (tagName) {
    case "config-pdf-download":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ConfigPdfDownload$1);
      }
      break;
    case "calcite-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "calcite-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "check-list":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}
defineCustomElement$1();

const ConfigPdfDownload = ConfigPdfDownload$1;
const defineCustomElement = defineCustomElement$1;

export { ConfigPdfDownload, defineCustomElement };
