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
import { getLocaleComponentStrings } from '../../utils/locale';
export class SolutionVariables {
  constructor() {
    this.value = "";
    this._solutionVariables = [];
    this._translations = undefined;
  }
  valueWatchHandler() {
    this._solutionVariables = JSON.parse(this.value);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad() {
    return this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", null, h("h4", { class: "org-var-header" }, this._translations.solVariables)), h("div", { class: "container-border" }, h("calcite-tree", { id: "variable-label" }, this._renderHierarchy(this._solutionVariables)))));
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
   * Render the solution item variables that the user can insert into temaplates at runtime.
   *
   * @param objs a list of variable items that have been gathered from the solutions templates
   */
  _renderHierarchy(objs) {
    const hierarchy = objs.map(obj => {
      return obj.dependencies && obj.dependencies.length > 0 ? (h("calcite-tree-item", { onClick: (evt) => this._toggleExpand(evt) }, h("solution-item-icon", { type: obj.type }), h("span", { class: "icon-text", title: obj.title }, obj.title), h("calcite-tree", { slot: "children" }, this._renderHierarchy(obj.dependencies)))) : (h("calcite-tree-item", { onClick: () => this._treeItemSelected(obj.id, obj.value) }, obj.title));
    });
    return hierarchy;
  }
  /**
   * Publishes the `solutionVariableSelected` event containing `itemId`, the id of the selected variable and the value of the variable.
   *
   * @param id Item id as reported by click event
   * @param value Variable id as reported by click event
   */
  _treeItemSelected(id, value) {
    this.solutionVariableSelected.emit({
      itemId: id,
      value
    });
  }
  /**
   * Toggle the tree item that was clicked
   *
   * @param evt the clicks mouse event
   */
  _toggleExpand(evt = undefined) {
    var _a;
    const treeItem = (_a = evt === null || evt === void 0 ? void 0 : evt.target) === null || _a === void 0 ? void 0 : _a.closest("calcite-tree-item");
    if (treeItem) {
      treeItem.expanded = !treeItem.expanded;
    }
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  static get is() { return "solution-variables"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["solution-variables.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["solution-variables.css"]
    };
  }
  static get properties() {
    return {
      "value": {
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
          "text": "Contains the public value for this component."
        },
        "attribute": "value",
        "reflect": true,
        "defaultValue": "\"\""
      }
    };
  }
  static get states() {
    return {
      "_solutionVariables": {},
      "_translations": {}
    };
  }
  static get events() {
    return [{
        "method": "solutionVariableSelected",
        "name": "solutionVariableSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ itemId: string, value: string }",
          "resolved": "{ itemId: string; value: string; }",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "valueWatchHandler"
      }];
  }
}
//# sourceMappingURL=solution-variables.js.map
