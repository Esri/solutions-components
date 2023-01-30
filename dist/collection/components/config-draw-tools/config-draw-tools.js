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
export class ConfigDrawTools {
  constructor() {
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
    return (h(Host, null, h("div", null, h("div", { class: "padding-block-end-1" }, h("calcite-label", { class: "label-spacing" }, this._translations.drawTools)), h("div", { class: "padding-inline-start-1" }, h("check-list", { defaultChecked: this.defaultChecked, ref: (el) => { this._checkList = el; }, values: types })))));
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
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0];
  }
  static get is() { return "config-draw-tools"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["config-draw-tools.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["config-draw-tools.css"]
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
//# sourceMappingURL=config-draw-tools.js.map
