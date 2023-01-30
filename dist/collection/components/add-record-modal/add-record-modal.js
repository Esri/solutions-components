/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/** @license
 * Copyright 2022 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Host, h } from '@stencil/core';
import { getLocaleComponentStrings } from "../../utils/locale";
// TODO implement save logic
export class AddRecordModal {
  constructor() {
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
  static get is() { return "add-record-modal"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["add-record-modal.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["add-record-modal.css"]
    };
  }
  static get properties() {
    return {
      "open": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "When true the component is displayed"
        },
        "attribute": "open",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "_translations": {}
    };
  }
  static get elementRef() { return "el"; }
}
