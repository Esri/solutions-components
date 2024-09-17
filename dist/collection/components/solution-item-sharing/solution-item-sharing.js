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
import state from "../../utils/solution-store";
import { getLocaleComponentStrings } from "../../utils/locale";
export class SolutionItemSharing {
    constructor() {
        this.groupId = "";
        this._translations = undefined;
        this.sharing = [];
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
    itemIdWatchHandler() {
        const itemEdit = state.getItemInfo(this.groupId);
        this.sharing = itemEdit.groupDetails;
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
        return (h(Host, { key: '8e4b35f389636c179685f0447e536d0eeabdd7ec' }, h("div", { key: 'a87684b15a96e580f9a203bba479f4d3d2c8db45', class: "container-border" }, h("calcite-label", { key: 'b1b62e4887674de5b572c457a1adf2c2a1f977eb' }, this._translations.groupInfo), this._renderItems(this.sharing))));
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
    async getShareInfo() {
        return this.sharing;
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Render share options based on the list of share details
     *
     * @param objs list of IItemShare objects that are used to expose and store share info for the solutions items
     */
    _renderItems(objs) {
        return objs && objs.length > 0
            ? objs.map(item => {
                return (h("calcite-label", { layout: "inline" }, h("calcite-switch", { checked: item.shareItem, id: item.id, name: "setting", onCalciteSwitchChange: (event) => this._updateItem(event), scale: "m", value: "enabled" }), h("solution-item-icon", { type: item.type, typeKeywords: item.typeKeywords }), h("span", { class: "icon-text", title: item.title }, item.title)));
            })
            : null;
    }
    /**
     * Update the items share prop based on the switch state
     *
     * @param event onCalciteSwitchChange event
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _updateItem(event) {
        const id = event.target.id;
        this.sharing = this.sharing.map((itemShare) => {
            if (itemShare.id === id) {
                // update the item
                itemShare.shareItem = event.target.checked;
                // update the item in the store
                const itemEdit = state.getItemInfo(id);
                if (itemShare.shareItem) {
                    // Add the group to the item if it's not already there
                    if (!itemEdit.groups) {
                        itemEdit.groups = [this.groupId];
                    }
                    else if (itemEdit.groups.indexOf(this.groupId) < 0) {
                        itemEdit.groups.push(this.groupId);
                    }
                }
                else {
                    // Remove the group from the item if it's there
                    if (itemEdit.groups) {
                        const i = itemEdit.groups.indexOf(this.groupId);
                        if (i > -1) {
                            itemEdit.groups.splice(i, 1);
                        }
                    }
                }
                state.setItemInfo(itemEdit);
            }
            return itemShare;
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
    static get is() { return "solution-item-sharing"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["solution-item-sharing.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["solution-item-sharing.css"]
        };
    }
    static get properties() {
        return {
            "groupId": {
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
                    "text": "A template's groupId."
                },
                "attribute": "group-id",
                "reflect": true,
                "defaultValue": "\"\""
            }
        };
    }
    static get states() {
        return {
            "_translations": {},
            "sharing": {}
        };
    }
    static get methods() {
        return {
            "getShareInfo": {
                "complexType": {
                    "signature": "() => Promise<any>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<any>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "groupId",
                "methodName": "itemIdWatchHandler"
            }];
    }
}
