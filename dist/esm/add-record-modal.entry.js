/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './index-09deaa39.js';
import { g as getLocaleComponentStrings } from './locale-a5a0b545.js';
import './_commonjsHelpers-8fd39c50.js';

const addRecordModalCss = ":host{display:block;--calcite-label-margin-bottom:0px}.padding-bottom-1{padding-bottom:1rem}.font-bold{font-weight:bold}.font-500{font-weight:500}.display-none{display:none}";

const AddRecordModal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h(Host, null, h("div", null, h("calcite-modal", { open: this.open, width: "s" }, h("div", { class: "font-500", slot: "header" }, this._translations.addRecord), h("div", { slot: "content" }, h("div", null, h("div", { class: "padding-bottom-1" }, h("calcite-label", { class: "font-bold" }, this._translations.source, h("calcite-input", { placeholder: this._translations.textField, type: 'textarea' }))), h("div", { class: "padding-bottom-1" }, h("calcite-label", { class: "font-bold" }, this._translations.publicView, h("calcite-input", { placeholder: this._translations.textField, type: 'textarea' }))), h("div", { class: "padding-bottom-1" }, h("calcite-label", { class: "font-bold" }, this._translations.attachments, h("div", null, h("input", { class: "display-none", onChange: (event) => (this._updateAttachment(event)), ref: (el) => (this._browseForAttachment = el), type: "file" }), h("calcite-button", { appearance: "solid", color: "neutral", onClick: () => this._browse(), width: 'auto' }, this._translations.browse)))))), h("calcite-button", { appearance: "outline", onClick: () => this._cancel(), slot: "secondary", width: "full" }, this._translations.cancel), h("calcite-button", { appearance: "solid", onClick: () => this._save(), slot: "primary", width: "full" }, this._translations.save)))));
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
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0];
  }
  get el() { return getElement(this); }
};
AddRecordModal.style = addRecordModalCss;

export { AddRecordModal as add_record_modal };

//# sourceMappingURL=add-record-modal.entry.js.map