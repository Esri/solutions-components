/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-6654298b.js');
const locale = require('./locale-b113c6b2.js');
require('./_commonjsHelpers-384729db.js');

const addRecordModalCss = ":host{display:block;--calcite-label-margin-bottom:0px}.padding-bottom-1{padding-bottom:1rem}.font-bold{font-weight:bold}.font-500{font-weight:500}.display-none{display:none}";

const AddRecordModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.open = false;
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
    return (index.h(index.Host, null, index.h("div", null, index.h("calcite-modal", { open: this.open, width: "s" }, index.h("div", { class: "font-500", slot: "header" }, this._translations.addRecord), index.h("div", { slot: "content" }, index.h("div", null, index.h("div", { class: "padding-bottom-1" }, index.h("calcite-label", { class: "font-bold" }, this._translations.source, index.h("calcite-input", { placeholder: this._translations.textField, type: 'textarea' }))), index.h("div", { class: "padding-bottom-1" }, index.h("calcite-label", { class: "font-bold" }, this._translations.publicView, index.h("calcite-input", { placeholder: this._translations.textField, type: 'textarea' }))), index.h("div", { class: "padding-bottom-1" }, index.h("calcite-label", { class: "font-bold" }, this._translations.attachments, index.h("div", null, index.h("input", { class: "display-none", onChange: (event) => (this._updateAttachment(event)), ref: (el) => (this._browseForAttachment = el), type: "file" }), index.h("calcite-button", { appearance: "solid", color: "neutral", onClick: () => this._browse(), width: 'auto' }, this._translations.browse)))))), index.h("calcite-button", { appearance: "outline", onClick: () => this._cancel(), slot: "secondary", width: "full" }, this._translations.cancel), index.h("calcite-button", { appearance: "solid", onClick: () => this._save(), slot: "primary", width: "full" }, this._translations.save)))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Opens the browse dialog
   *
   * @returns void
   */
  _browse() {
    this._browseForAttachment.click();
  }
  /**
   * Closes the modal
   *
   * @returns void
   */
  _cancel() {
    this.open = false;
  }
  // TODO needs to be implemented will handle save of the record
  _save() {
    this.open = false;
  }
  /**
   * Gets the result file from browse
   *
   * @param event The input controls event that contains the new file
   */
  _updateAttachment(event) {
    const files = event.target.files;
    if (files && files[0]) {
      console.log(files[0]);
    }
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
AddRecordModal.style = addRecordModalCss;

exports.add_record_modal = AddRecordModal;
