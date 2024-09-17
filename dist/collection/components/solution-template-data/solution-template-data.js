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
        return (h(Host, { key: '2e0fd019cf024cccd287674fc47c8c7149c5896e' }, h("div", { key: 'f36da861eb0915300e6cfa66507bfa819c5175ca', class: "solution-data-container" }, h("calcite-shell", { key: '05f2abaa3e654c5098f1b0fa39540b8e1ba69414', class: "light var-container", dir: "ltr" }, h("calcite-panel", { key: '465260b700ea88b98e50b37cc1adf1815736c590', class: "json-editor" }, h("div", { key: '77828dc31fb4b3b556538a14660506dc0ce91c18', class: "solution-data-child-container calcite-match-height" }, h("json-editor", { key: 'cf7be387699d46e0efce1cc9d2bafa1ecd1bd54b', class: "solution-data-editor-container", instanceid: this.itemId + "|" + this.instanceid, value: this.value }))), h("calcite-shell-panel", { key: 'a0f2aedafaf8eb4376c8f90a230b5992392ca4ce', "height-scale": "l", position: "end", slot: "contextual-panel", "width-scale": "xs" }, h("div", { key: 'c6275b75e9f275fad1c5cbd420847d1876c0084b', class: this.varsOpen ? "solution-data-child-container" : "solution-data-child-container-collapsed" }, h("calcite-button", { key: '96329209db26f9acbfc5d8717fb9e09fba44a555', appearance: "transparent", class: "collapse-btn", "icon-start": this.varsOpen ? "chevrons-right" : "chevrons-left", id: "collapse-vars", onClick: () => this._toggleVars(), scale: "s", title: this.varsOpen ? this._translations.collapse : this._translations.expand }), h("div", { key: 'ab6dfc9c86fb7b6fdf67668589990d12a517e0c6', class: this.varsOpen ? "org-vars" : "org-vars display-none", id: "orgVars" }, h("solution-organization-variables", { key: '26a8b4bcedbe525cde504431549fb911f9987865', value: this.organizationVariables })), h("div", { key: 'f0900c1e28036dbb0a5af6fd7db0e8625340c458', class: this.varsOpen ? "sol-vars" : "sol-vars display-none", id: "solVars" }, h("solution-variables", { key: '4ec9c214341c65e4b03a9d83e0731545c56ef3dd', value: this.solutionVariables }))))))));
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
