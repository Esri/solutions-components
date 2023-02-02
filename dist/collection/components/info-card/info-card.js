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
export class InfoCard {
  constructor() {
    this.cardTitle = "";
    this.values = {};
  }
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
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", null, h("div", { class: "bottom-border" }, h("calcite-label", null, this.cardTitle)), h("div", { class: "padding-top-1-2" }, h("table", null, h("tbody", null, this._getRows()))))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Render the user defined values as table rows
   *
   * @returns array of row nodes
   * @protected
   */
  _getRows() {
    return Object.keys(this.values).map(k => {
      return (h("tr", null, h("td", null, h("calcite-label", null, h("span", { class: "font-color-3" }, k))), h("td", null, h("calcite-label", null, h("span", null, this.values[k])))));
    });
  }
  static get is() { return "info-card"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["info-card.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["info-card.css"]
    };
  }
  static get properties() {
    return {
      "cardTitle": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "string: the components title"
        },
        "attribute": "card-title",
        "reflect": false,
        "defaultValue": "\"\""
      },
      "values": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "IInfoCardValues",
          "resolved": "IInfoCardValues",
          "references": {
            "IInfoCardValues": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "IInfoCardValues: key value pairs to show in the components table"
        },
        "defaultValue": "{}"
      }
    };
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=info-card.js.map
