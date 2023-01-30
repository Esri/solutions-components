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
import '@esri/calcite-components';
export class SolutionContents {
  constructor() {
    this.selectedItemId = undefined;
    this.templateHierarchy = [];
  }
  valueWatchHandler(v, oldV) {
    if (v && v !== oldV && Array.isArray(v) && v.length > 0) {
      this._treeItemSelected(v[0].id);
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    this.valueWatchHandler(this.templateHierarchy, []);
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("calcite-tree", null, this.renderHierarchy(this.templateHierarchy))));
  }
  renderHierarchy(objs) {
    return objs.map((obj) => {
      const selected = this.selectedItemId && this.selectedItemId === obj.id;
      return (obj.dependencies && obj.dependencies.length > 0) ?
        (h("calcite-tree-item", { onClick: (evt) => this._treeItemSelected(obj.id, evt), selected: selected }, h("solution-item-icon", { type: obj.type, typeKeywords: obj.typeKeywords }), h("span", { class: "icon-text", title: obj.title }, obj.title), h("calcite-tree", { slot: "children" }, this.renderHierarchy(obj.dependencies))))
        :
          (h("calcite-tree-item", { onClick: (evt) => this._treeItemSelected(obj.id, evt), selected: selected }, h("solution-item-icon", { type: obj.type, typeKeywords: obj.typeKeywords }), h("span", { class: "icon-text", title: obj.title }, obj.title)));
    });
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  /**
   * Publishes the `solutionItemSelected` event containing `solutionItem` of the selected item.
   *
   * Also toggles the expanded state of the tree item.
   *
   * @param solutionItem the selected solution item to emit
   * @param evt MouseEvent or undefined
   */
  _treeItemSelected(itemId, evt = undefined) {
    var _a;
    const treeItem = (_a = evt === null || evt === void 0 ? void 0 : evt.target) === null || _a === void 0 ? void 0 : _a.closest("calcite-tree-item");
    if (treeItem) {
      treeItem.expanded = !(treeItem === null || treeItem === void 0 ? void 0 : treeItem.expanded);
    }
    this.selectedItemId = itemId;
    this.solutionItemSelected.emit(itemId);
  }
  static get is() { return "solution-contents"; }
  static get originalStyleUrls() {
    return {
      "$": ["solution-contents.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["solution-contents.css"]
    };
  }
  static get assetsDirs() { return ["item-type-icons"]; }
  static get properties() {
    return {
      "selectedItemId": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the current item that is selected."
        },
        "attribute": "selected-item-id",
        "reflect": true
      },
      "templateHierarchy": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "IInventoryItem[]",
          "resolved": "IInventoryItem[]",
          "references": {
            "IInventoryItem": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the public value for this component."
        },
        "defaultValue": "[]"
      }
    };
  }
  static get events() {
    return [{
        "method": "solutionItemSelected",
        "name": "solutionItemSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "templateHierarchy",
        "methodName": "valueWatchHandler"
      }];
  }
}
//# sourceMappingURL=solution-contents.js.map
