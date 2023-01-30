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
export class CheckList {
  constructor() {
    //--------------------------------------------------------------------------
    //
    //  State (internal)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * A list of all checkbox elements for this component
     *
     * @protected
     */
    this._elements = [];
    this.defaultChecked = true;
    this.values = undefined;
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
    return this._elements.reduce((prev, cur) => {
      prev[cur.value] = cur.checked;
      return prev;
    }, {});
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
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad() {
    if (this.defaultChecked) {
      this._elements.forEach(el => {
        el.checked = true;
      });
    }
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", null, this._renderCheckboxes(this.values))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Render a checkbox with a label for each of the types listed in the NLS
   *
   * @returns Array of label/checkbox input nodes
   * @protected
   */
  _renderCheckboxes(values) {
    return values.map(v => {
      return (h("calcite-label", { layout: "inline" }, h("calcite-checkbox", { ref: (el) => this._elements.push(el), value: v }), v));
    });
  }
  static get is() { return "check-list"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["check-list.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["check-list.css"]
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
      },
      "values": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "string []: The values to render beside the checkboxes"
        }
      }
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
