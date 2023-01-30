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
export class EditRecordModal {
  constructor() {
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
  static get is() { return "edit-record-modal"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["edit-record-modal.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["edit-record-modal.css"]
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
//# sourceMappingURL=edit-record-modal.js.map
