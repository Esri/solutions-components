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
import { h, Host } from "@stencil/core";
import "@esri/calcite-components";
import state from "../../utils/solution-store";
import { getLocaleComponentStrings } from "../../utils/locale";
export class SolutionItem {
    constructor() {
        this.authentication = undefined;
        this.itemId = "";
        this.solutionVariables = "";
        this.organizationVariables = "";
        this.itemType = undefined;
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
    itemIdWatchHandler() {
        const itemEdit = state.getItemInfo(this.itemId);
        this.itemType = itemEdit.type;
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
        return (h(Host, { key: 'acd5fdfcaef04991d44f87ea756a1951b3f0642d' }, h("div", { key: 'f5574d3bb9a015353abb66bb82e5266b5ac109ab', class: "configuration-container" }, h("div", { key: 'fa07547d46a264400a85998a16a6a10eeb76d39e', class: "configuration" }, this._showGroupTabs(this.itemType === "Group"), this._showItemTabs(this.itemType !== "Group")))));
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
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Render tabs based on group item types
     *
     * @param visible Should the current tab be visible
     */
    _showGroupTabs(visible) {
        return h("calcite-tabs", { class: "config-tabs", style: { display: visible ? "inherit" : "none" } }, h("calcite-tab-nav", { slot: "tab-nav" }, h("calcite-tab-title", null, this._translations.groupDetailsTab), h("calcite-tab-title", null, this._translations.sharingTab)), h("calcite-tab", { class: "config-tab", id: "group-tab", selected: true }, h("solution-item-details", { "item-id": this.itemId })), h("calcite-tab", { class: "config-tab", id: "share-tab" }, h("solution-item-sharing", { "group-id": this.itemId })));
    }
    /**
     * Render tabs based for an items details, data, and props section from a template
     *
     * @param visible Should the current tab be visible
     */
    _showItemTabs(visible) {
        return h("calcite-tabs", { class: "config-tabs", style: { display: visible ? "inherit" : "none" } }, h("calcite-tab-nav", { slot: "tab-nav" }, h("calcite-tab-title", null, this._translations.itemDetailsTab), h("calcite-tab-title", null, this._translations.dataTab), h("calcite-tab-title", null, this._translations.propertiesTab), h("calcite-tab-title", null, this._translations.resourcesTab)), h("calcite-tab", { class: "config-tab", selected: true }, h("solution-item-details", { "item-id": this.itemId })), h("calcite-tab", { class: "config-tab", id: "data-tab" }, h("solution-template-data", { instanceid: "data", "item-id": this.itemId, "organization-variables": this.organizationVariables, "solution-variables": this.solutionVariables })), h("calcite-tab", { class: "config-tab", id: "props-tab" }, h("solution-template-data", { instanceid: "properties", "item-id": this.itemId, "organization-variables": this.organizationVariables, "solution-variables": this.solutionVariables })), h("calcite-tab", { class: "config-tab", id: "resources-tab" }, h("solution-resource-item", { authentication: this.authentication, class: "solutions-resource-container", "item-id": this.itemId })));
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
    static get is() { return "solution-item"; }
    static get originalStyleUrls() {
        return {
            "$": ["solution-item.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["solution-item.css"]
        };
    }
    static get properties() {
        return {
            "authentication": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "UserSession",
                    "resolved": "UserSession",
                    "references": {
                        "UserSession": {
                            "location": "import",
                            "path": "@esri/solution-common",
                            "id": "node_modules::UserSession"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Credentials for requests"
                }
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
                    "text": "A template's itemId."
                },
                "attribute": "item-id",
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
                    "text": "Contains the organization based variables"
                },
                "attribute": "organization-variables",
                "reflect": true,
                "defaultValue": "\"\""
            }
        };
    }
    static get states() {
        return {
            "itemType": {},
            "_translations": {}
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
