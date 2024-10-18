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
import { Host, h } from "@stencil/core";
import state from "../../utils/solution-store";
import { getLocaleComponentStrings } from "../../utils/locale";
export class SolutionTemplateData {
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
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
        return (h(Host, { key: '3e0a532158fffbba07faee43152573eb3577da84' }, h("div", { key: '5631eb64e45d31465361491e9585c8eddd04dce7', class: "solution-data-container" }, h("calcite-shell", { key: '9b065784804b86fa1c09c9d7e5f173a6ea793883', class: "light var-container", dir: "ltr" }, h("calcite-panel", { key: '254dcf1c48812c98a69bac8e7b6ca91a39eb9cff', class: "json-editor" }, h("div", { key: '86f686a03298bb06b8b855ae59a66e42cec25ad4', class: "solution-data-child-container calcite-match-height" }, h("json-editor", { key: '0549a48a16bb94ed7be3064f4b622b1a10563bfd', class: "solution-data-editor-container", instanceid: this.itemId + "|" + this.instanceid, value: this.value }))), h("calcite-shell-panel", { key: 'a3879f3d3b95d2878a5ec98265a6a120c78366f6', "height-scale": "l", position: "end", slot: "contextual-panel", "width-scale": "xs" }, h("div", { key: '4e8a2206eb7e57e8beb5e854f3cd66d7bae96101', class: this.varsOpen ? "solution-data-child-container" : "solution-data-child-container-collapsed" }, h("calcite-button", { key: '180bb9e0a1aff223625e3979930a9904dc778a1d', appearance: "transparent", class: "collapse-btn", "icon-start": this.varsOpen ? "chevrons-right" : "chevrons-left", id: "collapse-vars", onClick: () => this._toggleVars(), scale: "s", title: this.varsOpen ? this._translations.collapse : this._translations.expand }), h("div", { key: 'a1064c394bb1a9c95493a052057bdfb2ccc7b20a', class: this.varsOpen ? "org-vars" : "org-vars display-none", id: "orgVars" }, h("solution-organization-variables", { key: '19ef108d689b875a329a22f0729f34bd3c5edbd1', value: this.organizationVariables })), h("div", { key: '3671681ffde2ef2aae1a84c608fbe08c0f4e7bcc', class: this.varsOpen ? "sol-vars" : "sol-vars display-none", id: "solVars" }, h("solution-variables", { key: '7bdbb7baedf02ff299e620741995a393c4bf976d', value: this.solutionVariables }))))))));
    }
    _initializing = false;
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
