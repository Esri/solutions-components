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
import "@esri/calcite-components";
import { h, Host } from "@stencil/core";
import { getLocaleComponentStrings } from "../../utils/locale";
import { nodeListToArray } from "../../utils/common";
import { wkids } from "./spatialreferences";
export class SpatialRef {
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
    valueChanged(newValue) {
        this._spatialRef = this._createSpatialRefDisplay(newValue);
        const searchBox = document.getElementById("calcite-sr-search");
        if (searchBox) {
            searchBox.value = this._srSearchText = "";
        }
        this._clearSelection();
        if (this._cachedValue !== this.value) {
            this.spatialReferenceChange.emit({
                oldValue: this._cachedValue,
                newValue: this.value
            });
            this._cachedValue = this.value;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    constructor() {
        this.defaultWkid = 102100;
        this.disabled = false;
        this.value = this.defaultWkid.toString();
        this._cachedValue = this.defaultWkid.toString();
        this._spatialRef = undefined;
        this._srSearchText = undefined;
        this._translations = undefined;
        this._spatialRef = this._createSpatialRefDisplay(this.value);
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
        return (h(Host, { key: '1da00c18c49d769c98e236f73e648dd880df6e2a' }, h("div", { key: '61da287f6865c90a1b4b523cb13d689247255573' }, h("calcite-input", { key: 'e129b4a009fa12f9aff37384debe673dbed31774', disabled: this.disabled, id: "calcite-sr-search", onKeyUp: (evt) => this._searchInputKeyDown(evt), placeholder: this._translations.spatialReferencePlaceholder }), h("calcite-tree", { key: '125c006a62fda7fd1204c81374c119b562424e26', id: "calcite-sr-tree", slot: "children" }, this._getTreeContent()))));
    }
    _lastHighlightedSref;
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
    spatialReferenceChange;
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    /**
     * Returns the spatial reference description of the supplied value.
     * (Exposes protected method `_createSpatialRefDisplay` for testing.)
     *
     * @param value WKID or WKT or null for default
     * @returns If component is using a WKID, description using WKID; otherwise, the WKT; defaults to 102100
     */
    async createSpatialRefDisplay(value) {
        return this._createSpatialRefDisplay(value);
    }
    /**
     * Returns the current spatial reference description.
     * (Exposes protected variable `spatialRef` for testing.)
     */
    async getSpatialRef() {
        return this._spatialRef;
    }
    /**
     * Converts a WKID into a spatial reference description.
     * (Exposes protected method `_wkidToDisplay` for testing.)
     *
     * @param wkid WKID to look up
     * @returns Description, or "WKID &lt;wkid&gt;" if a description doesn't exist for the WKID
     */
    async wkidToDisplay(wkid) {
        return this._wkidToDisplay(wkid);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Returns the spatial reference description of the supplied value.
     *
     * @param value WKID or WKT or null for default
     * @returns If component is using a WKID, description using WKID; otherwise, the WKT; defaults to 102100
     */
    _createSpatialRefDisplay(value) {
        let spatialRef;
        if (!value) {
            spatialRef = {
                display: this._wkidToDisplay(this.defaultWkid),
                usingWkid: true,
                wkid: this.defaultWkid,
                wkt: ""
            };
        }
        else {
            const wkid = Number.parseInt(value);
            spatialRef = isNaN(wkid) ? {
                display: value,
                usingWkid: false,
                wkid: 0,
                wkt: value
            } : {
                display: this._wkidToDisplay(wkid),
                usingWkid: true,
                wkid: wkid,
                wkt: ""
            };
        }
        return spatialRef;
    }
    /**
     * Stores the wkid as the components value.
     */
    _setSpatialRef(wkid) {
        if (this.value !== wkid) {
            this.value = wkid;
        }
    }
    /**
     * Converts a WKID into a spatial reference description.
     *
     * @param wkid WKID to look up
     * @returns Description, or "WKID &lt;wkid&gt;" if a description doesn't exist for the WKID
     */
    _wkidToDisplay(wkid) {
        const description = wkids[wkid];
        return description ? description.label + " (" + wkid.toString() + ")" : "WKID " + wkid.toString();
    }
    /**
     * Sets the search text State and cause render; if Enter key, selects the first child.
     *
     * @param event The keyboard event
     */
    _searchInputKeyDown(event) {
        if (event.key === "Enter") {
            this._selectFirstChild();
        }
        else {
            const searchBox = document.getElementById("calcite-sr-search");
            if (searchBox) {
                this._srSearchText = searchBox.value;
            }
        }
    }
    /**
     * Tracks the movement through the list of projections, and selects the one for which Enter is used twice.
     *
     * @param event The keyboard event
     */
    _projListInputKeyDown(event) {
        const highlightedSref = event.target.id;
        if (event.key === "Enter" && this._lastHighlightedSref === highlightedSref) {
            // "Enter" twice on the same projection selects it
            this._clearSelection();
            this._setSpatialRef(this._lastHighlightedSref.toString());
        }
        else {
            // Save the projection in case it's selected a second time
            this._lastHighlightedSref = highlightedSref;
        }
    }
    /**
     * Clear any selected items in the elements tree.
     *
     */
    _clearSelection() {
        const selectedItems = nodeListToArray(this.el.querySelectorAll("calcite-tree-item[selected]"));
        selectedItems.forEach((treeItem) => {
            treeItem.selected = false;
        });
    }
    /**
     * Select the first child from the tree.
     *
     * @param autoFocus Boolean to indicate if focus should also be shifted to the first child.
     *
     */
    _selectFirstChild() {
        const wkidContainer = document.getElementById("solution-wkid-container");
        if (wkidContainer && wkidContainer.firstChild) {
            const firstChild = wkidContainer.firstChild;
            firstChild.selected = true;
            this._setSpatialRef(firstChild.id);
        }
    }
    /**
     * Get the tree items for the current spatial reference search
     *
     */
    _getTreeContent() {
        const id = "solution-wkid-container";
        const containerClass = "spatial-ref-container";
        if (this._srSearchText && this._srSearchText.length > 1) {
            const regEx = new RegExp(`${this._srSearchText}`, 'gi');
            const matches = Object.keys(wkids).filter(wkid => {
                return regEx.test(wkid.toString()) || regEx.test(wkids[wkid].label);
            });
            return matches.length > 0 ? (h("div", { class: containerClass, id: id, onKeyDown: (evt) => this._projListInputKeyDown(evt) }, matches.map((wkid) => this._getTreeItem(wkid, false)))) : (null);
        }
        else {
            return (h("div", { class: containerClass, id: id }, this._getTreeItem(this.value.toString(), true)));
        }
    }
    /**
     * Get the individual spatial reference tree item
     *
     * @param wkid The wkid for the spatial reference that will be displayed.
     * @param selected Should the item be selected by default.
     *
     */
    _getTreeItem(wkid, selected) {
        const label = wkids[wkid]?.label;
        return label ?
            (h("calcite-tree-item", { "aria-selected": selected, id: wkid, onClick: () => this._setSpatialRef(wkid), selected: selected }, h("div", null, `${label} (${wkid})`))) : (h("calcite-tree-item", { "aria-selected": selected, id: wkid, onClick: () => this._setSpatialRef(wkid), selected: selected }, h("div", null, `${wkid}`)));
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
    static get is() { return "spatial-ref"; }
    static get originalStyleUrls() {
        return {
            "$": ["spatial-ref.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["spatial-ref.css"]
        };
    }
    static get properties() {
        return {
            "defaultWkid": {
                "type": "number",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The wkid that will be used as the default when no user selection has been made."
                },
                "attribute": "default-wkid",
                "reflect": true,
                "defaultValue": "102100"
            },
            "disabled": {
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
                    "text": "When true, all are disabled to prevent interaction."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
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
                    "text": "Contains the public value for this component, which is a wkid or a wkt."
                },
                "attribute": "value",
                "reflect": true,
                "defaultValue": "this.defaultWkid.toString()"
            }
        };
    }
    static get states() {
        return {
            "_cachedValue": {},
            "_spatialRef": {},
            "_srSearchText": {},
            "_translations": {}
        };
    }
    static get events() {
        return [{
                "method": "spatialReferenceChange",
                "name": "spatialReferenceChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "IValueChange",
                    "resolved": "IValueChange",
                    "references": {
                        "IValueChange": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IValueChange"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "createSpatialRefDisplay": {
                "complexType": {
                    "signature": "(value: string) => Promise<ISpatialRefRepresentation>",
                    "parameters": [{
                            "name": "value",
                            "type": "string",
                            "docs": "WKID or WKT or null for default"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "ISpatialRefRepresentation": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::ISpatialRefRepresentation"
                        }
                    },
                    "return": "Promise<ISpatialRefRepresentation>"
                },
                "docs": {
                    "text": "Returns the spatial reference description of the supplied value.\r\n(Exposes protected method `_createSpatialRefDisplay` for testing.)",
                    "tags": [{
                            "name": "param",
                            "text": "value WKID or WKT or null for default"
                        }, {
                            "name": "returns",
                            "text": "If component is using a WKID, description using WKID; otherwise, the WKT; defaults to 102100"
                        }]
                }
            },
            "getSpatialRef": {
                "complexType": {
                    "signature": "() => Promise<ISpatialRefRepresentation>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "ISpatialRefRepresentation": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::ISpatialRefRepresentation"
                        }
                    },
                    "return": "Promise<ISpatialRefRepresentation>"
                },
                "docs": {
                    "text": "Returns the current spatial reference description.\r\n(Exposes protected variable `spatialRef` for testing.)",
                    "tags": []
                }
            },
            "wkidToDisplay": {
                "complexType": {
                    "signature": "(wkid: number) => Promise<string>",
                    "parameters": [{
                            "name": "wkid",
                            "type": "number",
                            "docs": "WKID to look up"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<string>"
                },
                "docs": {
                    "text": "Converts a WKID into a spatial reference description.\r\n(Exposes protected method `_wkidToDisplay` for testing.)",
                    "tags": [{
                            "name": "param",
                            "text": "wkid WKID to look up"
                        }, {
                            "name": "returns",
                            "text": "Description, or \"WKID &lt;wkid&gt;\" if a description doesn't exist for the WKID"
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "valueChanged"
            }];
    }
}
