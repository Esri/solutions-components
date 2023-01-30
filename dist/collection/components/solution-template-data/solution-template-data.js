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
import state from "../../utils/solution-store";
import { getLocaleComponentStrings } from '../../utils/locale';
export class SolutionTemplateData {
  itemIdWatchHandler() {
    this._initializing = true;
    this.value = JSON.stringify(this.instanceid === "data"
      ? state.getItemInfo(this.itemId).data
      : state.getItemInfo(this.itemId).properties, null, 2);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  constructor() {
    this._initializing = false;
    this.instanceid = "";
    this.itemId = "";
    this.organizationVariables = "";
    this.solutionVariables = "";
    this.varsOpen = true;
    this._translations = undefined;
    this.value = "";
    window.addEventListener("solutionEditorContentChanged", (evt) => {
      if (this.itemId) {
        const { id, contents } = evt.detail;
        const [itemId, instanceId] = id.split("|");
        if (itemId == this.itemId && instanceId === this.instanceid) {
          if (!this._initializing && contents.length > 0) {
            const itemEdit = state.getItemInfo(itemId);
            if (instanceId === "data") {
              itemEdit.data = JSON.parse(contents);
            }
            else {
              itemEdit.properties = JSON.parse(contents);
            }
            state.setItemInfo(itemEdit);
          }
          this._initializing = false;
        }
      }
    });
  }
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
    return (h(Host, null, h("div", { class: "solution-data-container" }, h("calcite-shell", { class: "light var-container", dir: "ltr" }, h("calcite-panel", { class: "json-editor" }, h("div", { class: "solution-data-child-container calcite-match-height" }, h("json-editor", { class: "solution-data-editor-container", instanceid: this.itemId + "|" + this.instanceid, value: this.value }))), h("calcite-shell-panel", { "height-scale": "l", position: "end", slot: "contextual-panel", "width-scale": "xs" }, h("div", { class: this.varsOpen ? "solution-data-child-container" : "solution-data-child-container-collapsed" }, h("calcite-button", { appearance: "transparent", class: "collapse-btn", "icon-start": this.varsOpen ? "chevrons-right" : "chevrons-left", id: "collapse-vars", onClick: () => this._toggleVars(), scale: "s", title: this.varsOpen ? this._translations.collapse : this._translations.expand }), h("div", { class: this.varsOpen ? "org-vars" : "org-vars display-none", id: "orgVars" }, h("solution-organization-variables", { value: this.organizationVariables })), h("div", { class: this.varsOpen ? "sol-vars" : "sol-vars display-none", id: "solVars" }, h("solution-variables", { value: this.solutionVariables }))))))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------
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
   * Toggle varsOpen prop to show/hide variable containers
   */
  _toggleVars() {
    this.varsOpen = !this.varsOpen;
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
  static get is() { return "solution-template-data"; }
  static get originalStyleUrls() {
    return {
      "$": ["solution-template-data.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["solution-template-data.css"]
    };
  }
  static get properties() {
    return {
      "instanceid": {
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
          "text": "This needs to be unique for props vs data of an item"
        },
        "attribute": "instanceid",
        "reflect": true,
        "defaultValue": "\"\""
      },
      "itemId": {
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
          "text": "A template's itemId.\r\nThis is used to get the correct model from a store in the json-editor"
        },
        "attribute": "item-id",
        "reflect": true,
        "defaultValue": "\"\""
      },
      "organizationVariables": {
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
          "text": ""
        },
        "attribute": "organization-variables",
        "reflect": true,
        "defaultValue": "\"\""
      },
      "solutionVariables": {
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
          "text": "Contains the solution based variables"
        },
        "attribute": "solution-variables",
        "reflect": true,
        "defaultValue": "\"\""
      },
      "varsOpen": {
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
          "text": "Used to show/hide the variable containers"
        },
        "attribute": "vars-open",
        "reflect": true,
        "defaultValue": "true"
      }
    };
  }
  static get states() {
    return {
      "_translations": {},
      "value": {}
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "itemId",
        "methodName": "itemIdWatchHandler"
      }];
  }
}
//# sourceMappingURL=solution-template-data.js.map
