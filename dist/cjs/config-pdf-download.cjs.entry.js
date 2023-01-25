/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ee607805.js');
const locale = require('./locale-d15229c4.js');
const labelFormats = require('./labelFormats-ae8916fd.js');
require('./_commonjsHelpers-6aafa5de.js');

const configPdfDownloadCss = ":host{display:block}.label-spacing{--calcite-label-margin-bottom:0}.padding-block-end-1{-webkit-padding-after:1rem;padding-block-end:1rem}.padding-inline-start-1{-webkit-padding-start:1rem;padding-inline-start:1rem}";

const ConfigPdfDownload = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, null, index.h("div", null, index.h("div", { class: "padding-block-end-1" }, index.h("calcite-label", { class: "label-spacing" }, this._translations.availableLabelFormats)), index.h("div", { class: "padding-block-end-1 padding-inline-start-1" }, index.h("check-list", { defaultChecked: this.defaultChecked, ref: (el) => { this._formatOptionsCheckList = el; }, values: this._formatOptions })), index.h("div", { class: "padding-block-end-1" }, index.h("calcite-label", { class: "label-spacing" }, this._translations.csvOptions)), index.h("div", { class: "padding-block-end-1 padding-inline-start-1" }, index.h("check-list", { defaultChecked: this.defaultChecked, ref: (el) => { this._csvOptionsCheckList = el; }, values: [this._translations.csvColumnTitle] })))));
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
    const s = labelFormats.pdfUtils;
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
    const messages = await locale.getLocaleComponentStrings(this.el);
    this._translations = messages[0];
  }
  get el() { return index.getElement(this); }
};
ConfigPdfDownload.style = configPdfDownloadCss;

exports.config_pdf_download = ConfigPdfDownload;
