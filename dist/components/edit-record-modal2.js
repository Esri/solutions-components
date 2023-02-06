/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$8 } from './button.js';
import { d as defineCustomElement$7 } from './icon.js';
import { d as defineCustomElement$6 } from './input.js';
import { d as defineCustomElement$5 } from './label.js';
import { d as defineCustomElement$4 } from './loader.js';
import { d as defineCustomElement$3 } from './modal.js';
import { d as defineCustomElement$2 } from './progress.js';
import { d as defineCustomElement$1 } from './scrim.js';

const editRecordModalCss = ":host{display:block}.padding-bottom-1{padding-bottom:1rem}.font-bold{font-weight:var(--calcite-font-weight-bold)}.font-500{font-weight:var(--calcite-font-weight-medium)}.font-italic{font-style:italic}";

const EditRecordModal = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.open = false;
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
    return (h(Host, null, h("div", null, h("calcite-modal", { open: this.open, width: "s" }, h("div", { class: "font-500", slot: "header" }, this._translations.editMultiple), h("div", { slot: "content" }, h("calcite-label", { class: "font-italic" }, this._translations.infoMessage), this._getFieldInputs()), h("calcite-button", { appearance: "outline", onClick: () => this._cancel(), slot: "secondary", width: "full" }, this._translations.cancel), h("calcite-button", { appearance: "solid", onClick: () => this._save(), slot: "primary", width: "full" }, this._translations.save)))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  _getFieldInputs() {
    // TODO don't follow what these are so just hard-coding for now
    const labels = [
      this._translations.label,
      this._translations.label,
      this._translations.label,
      this._translations.label,
      this._translations.label
    ];
    return labels.map(label => {
      return (h("div", { class: "padding-bottom-1" }, h("calcite-label", { class: "font-bold" }, label, h("calcite-input", { placeholder: this._translations.textField, type: "text" }))));
    });
  }
  _cancel() {
    this.open = false;
  }
  _save() {
    this.open = false;
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
  static get style() { return editRecordModalCss; }
}, [1, "edit-record-modal", {
    "open": [1028],
    "_translations": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["edit-record-modal", "calcite-button", "calcite-icon", "calcite-input", "calcite-label", "calcite-loader", "calcite-modal", "calcite-progress", "calcite-scrim"];
  components.forEach(tagName => { switch (tagName) {
    case "edit-record-modal":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, EditRecordModal);
      }
      break;
    case "calcite-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "calcite-input":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "calcite-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "calcite-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "calcite-progress":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "calcite-scrim":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { EditRecordModal as E, defineCustomElement as d };
