/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/** @license
 * Copyright 2024 Esri
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
import { getLocaleComponentStrings } from "../../utils/locale";
export class DeleteDialog {
    constructor() {
        this.ids = [];
        this.layer = undefined;
        this.open = false;
        this._isDeleting = false;
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
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
    /**
     * Emitted on demand when features have been deleted
     */
    editsComplete;
    /**
     * Emitted on demand when features have been deleted
     */
    deleteDialogClose;
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        const confirmMessage = this.ids.length === 1 ? this._translations?.confirmSingle :
            this._translations?.confirmMultiple;
        return (h(Host, { key: '64cd1440f80a9609f90056b919fa807e975eff70' }, h("calcite-modal", { key: '022302455960cbcf894dc2f0079d88be6fb59367', "aria-labelledby": "modal-title", class: "delete-modal", kind: "danger", onCalciteModalClose: () => this._close(), open: this.open, widthScale: "s" }, h("div", { key: '7484caedbdd759efbe972182ddd41a6ebaa2bd64', class: "display-flex align-center", id: "modal-title", slot: "header" }, this._translations?.deleteFeature), h("div", { key: 'e31136a6eed46dd0cbc4d919deb732a623097fbf', slot: "content" }, confirmMessage), h("calcite-button", { key: '7de42845a99777bcec59221fb6ab863e72ca2654', appearance: "outline", kind: "danger", onClick: () => this._close(), slot: "secondary", width: "full" }, this._translations?.cancel), h("calcite-button", { key: '67921ff64fc5c4439e66833fd8502f7e95671b5d', kind: "danger", loading: this._isDeleting, onClick: () => void this._deleteFeatures(), slot: "primary", width: "full" }, this._translations?.delete))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Delete the currently selected features
     */
    async _deleteFeatures() {
        this._isDeleting = true;
        const deleteFeatures = this.ids.map((objectId) => {
            return { objectId };
        });
        await this.layer.applyEdits({
            deleteFeatures
        });
        this._isDeleting = false;
        this._close();
        this.editsComplete.emit("delete");
    }
    /**
     * Set the alertOpen member to false when the alert is closed
     */
    _close() {
        this.open = false;
        this.deleteDialogClose.emit();
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get is() { return "delete-dialog"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["delete-dialog.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["delete-dialog.css"]
        };
    }
    static get properties() {
        return {
            "ids": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "any[]",
                    "resolved": "any[]",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "number[]: The ids that would be deleted"
                },
                "defaultValue": "[]"
            },
            "layer": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.FeatureLayer",
                    "resolved": "FeatureLayer",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html"
                }
            },
            "open": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: When true the delete dialog will be displayed"
                },
                "attribute": "open",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "_isDeleting": {},
            "_translations": {}
        };
    }
    static get events() {
        return [{
                "method": "editsComplete",
                "name": "editsComplete",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when features have been deleted"
                },
                "complexType": {
                    "original": "EditType",
                    "resolved": "\"add\" | \"delete\" | \"update\"",
                    "references": {
                        "EditType": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::EditType"
                        }
                    }
                }
            }, {
                "method": "deleteDialogClose",
                "name": "deleteDialogClose",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when features have been deleted"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
