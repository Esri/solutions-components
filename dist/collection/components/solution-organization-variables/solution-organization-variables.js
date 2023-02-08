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
export class SolutionOrganizationVariables {
  constructor() {
    this.value = "";
    this._organizationVariables = [];
    this._translations = undefined;
  }
  valueWatchHandler() {
    this._organizationVariables = JSON.parse(this.value);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad() {
    return this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", null, h("h4", { class: "org-var-header" }, this._translations.orgVariables)), h("div", { class: "container-border" }, h("calcite-tree", { id: "variable-label" }, this._renderHierarchy(this._organizationVariables)))));
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
   * Renders the organization based variable items the user can insert at runtime
   *
   * @param objs a list of organization variables to render
   */
  _renderHierarchy(objs) {
    const hierarchy = objs.map(obj => {
      return (h("calcite-tree-item", { onClick: () => this._treeItemSelected(obj.id, obj.value) }, obj.title));
    });
    return hierarchy;
  }
  /**
   * Publishes the `organizationVariableSelected` event containing `itemId`, the id of the selected variable and the value of the variable.
   *
   * @param itemId Item id as reported by click event
   * @param value Variable id as reported by click event
   */
  _treeItemSelected(itemId, value) {
    this.organizationVariableSelected.emit({
      itemId,
      value
    });
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
  static get is() { return "solution-organization-variables"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["solution-organization-variables.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["solution-organization-variables.css"]
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
      "_organizationVariables": {},
      "_translations": {}
    };
  }
  static get events() {
    return [{
        "method": "organizationVariableSelected",
        "name": "organizationVariableSelected",
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
//# sourceMappingURL=solution-organization-variables.js.map
