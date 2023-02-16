/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$9 } from './button.js';
import { d as defineCustomElement$8 } from './icon.js';
import { d as defineCustomElement$7 } from './input.js';
import { d as defineCustomElement$6 } from './label.js';
import { d as defineCustomElement$5 } from './loader.js';
import { d as defineCustomElement$4 } from './modal.js';
import { d as defineCustomElement$3 } from './progress.js';
import { d as defineCustomElement$2 } from './scrim.js';

const addRecordModalCss = ":host{display:block;--calcite-label-margin-bottom:0px}.padding-bottom-1{padding-bottom:1rem}.font-bold{font-weight:bold}.font-500{font-weight:500}.display-none{display:none}";

const AddRecordModal$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  get el() { return this; }
  static get style() { return addRecordModalCss; }
}, [1, "add-record-modal", {
    "open": [1028],
    "_translations": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["add-record-modal", "calcite-button", "calcite-icon", "calcite-input", "calcite-label", "calcite-loader", "calcite-modal", "calcite-progress", "calcite-scrim"];
  components.forEach(tagName => { switch (tagName) {
    case "add-record-modal":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, AddRecordModal$1);
      }
      break;
    case "calcite-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "calcite-input":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "calcite-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "calcite-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "calcite-progress":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "calcite-scrim":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}
defineCustomElement$1();

const AddRecordModal = AddRecordModal$1;
const defineCustomElement = defineCustomElement$1;

export { AddRecordModal, defineCustomElement };
