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
import * as pdfUtils from "../../assets/data/labelFormats.json";
export class ConfigPdfDownload {
  constructor() {
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
  static get is() { return "config-pdf-download"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["config-pdf-download.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["config-pdf-download.css"]
    };
  }
  static get properties() {
    return {
      "defaultChecked": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "boolean: All checkboxes checked state will be set with this value on first render.\r\nDefault is true"
        },
        "attribute": "default-checked",
        "reflect": true,
        "defaultValue": "true"
      }
    };
  }
  static get states() {
    return {
      "_formatOptions": {},
      "_translations": {}
    };
  }
  static get methods() {
    return {
      "getConfigInfo": {
        "complexType": {
          "signature": "() => Promise<{ [key: string]: boolean; }>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<{ [key: string]: boolean; }>"
        },
        "docs": {
          "text": "Returns a key/value pair that represents the checkbox value and checked state",
          "tags": [{
              "name": "returns",
              "text": "Promise with the state of the checkboxes"
            }]
        }
      }
    };
  }
  static get elementRef() { return "el"; }
}
