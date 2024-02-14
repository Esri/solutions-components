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
import { loadModules } from "../../utils/loadModules";
import { getLocaleComponentStrings } from "../../utils/locale";
import { getAllLayers } from "../../utils/mapViewUtils";
export class EditCard {
    constructor() {
        /**
         * boolean: When true the Editor widget should be closed
         * Without this logic we are taken to the Editors "Select" workflow step
         */
        this._shouldClose = false;
        this.graphics = undefined;
        this.mapView = undefined;
        this.open = false;
        this.graphicIndex = 0;
        this._editorLoading = false;
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Watch for changes to the graphics and update the feature widget
     */
    async graphicsWatchHandler() {
        if (this.graphics.length === 0 && this.open) {
            await this._closeEdit(true);
        }
    }
    async openWatchHandler(v) {
        var _a;
        if (v && ((_a = this.graphics) === null || _a === void 0 ? void 0 : _a.length) > 0 && this.graphicIndex > -1) {
            this._editorLoading = true;
            await this._initEditorWidget();
            if (this.graphicIndex > -1 && this.graphics.length > 0 && this.open && !this._shouldClose) {
                await this._startUpdate();
            }
            this._editorLoading = false;
        }
        if (!v) {
            await this._closeEdit(true);
        }
    }
    async featureSelectionChange() {
        if (this.open) {
            await this._closeEdit(false);
        }
    }
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
        await this._initModules();
        await this._getTranslations();
    }
    /**
     * Special handeling when used with layer-table.
     * This allows us to only fetch graphics when the modal is opened rather than with every render of the layer-table.
     *
     * @returns Promise when complete
     */
    async componentWillRender() {
        var _a, _b;
        if (((_a = this.graphics) === null || _a === void 0 ? void 0 : _a.length) > 0 && ((_b = this.graphics[0]) === null || _b === void 0 ? void 0 : _b.layer)) {
            this._layer = this.graphics[0].layer;
            if (this._layerEditHandle) {
                this._layerEditHandle.remove();
            }
            this._layerEditHandle = this._layer.on("edits", () => {
                this.editsComplete.emit();
            });
        }
    }
    /**
     * Renders the component.
     */
    render() {
        var _a;
        // This is a temp workaround hopefully...this._editingDisabled should reflect the current state but does not
        // when you use MULTI edit mode...is fine in SINGLE
        const editDisabled = ((_a = this.graphics) === null || _a === void 0 ? void 0 : _a.length) > 0 && this.graphics[0] ?
            !this.graphics[0].layer.editingEnabled : true;
        const tableNodeClass = this._editorLoading ? "display-none" : "position-absolute";
        const loadingClass = this._editorLoading ? "" : "display-none";
        return (h(Host, null, h("div", { class: "position-absolute" }, editDisabled ? (h("calcite-notice", { kind: "warning", open: true, slot: "content-top", width: "full" }, h("div", { slot: "message" }, this._translations.enableEditing))) : undefined, h("div", { class: "position-absolute" }, h("div", { class: tableNodeClass, id: "feature-form", ref: (el) => this._editContainer = el }), h("calcite-loader", { class: loadingClass, label: "", scale: "s" })))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     */
    async _initModules() {
        const [Editor, reactiveUtils] = await loadModules([
            "esri/widgets/Editor",
            "esri/core/reactiveUtils"
        ]);
        this.Editor = Editor;
        this.reactiveUtils = reactiveUtils;
    }
    /**
     * Init the Editor widget so we can display the popup content
     */
    async _initEditorWidget() {
        if (this.mapView && this.graphics && this.graphics.length > 0 && this.graphics[0]) {
            if (this._editor) {
                this._editor.destroy();
            }
            const container = document.createElement("div");
            const layers = await getAllLayers(this.mapView);
            const layerInfos = layers.map(layer => {
                return {
                    layer,
                    geometryUpdatesEnabled: false
                };
            });
            this._editor = new this.Editor({
                allowedWorkflows: "update",
                view: this.mapView,
                layerInfos,
                visibleElements: {
                    snappingControls: false
                },
                container
            });
            if (this._attachmentHandle && this._activeWorkflowHandle) {
                this._attachmentHandle.remove();
                this._activeWorkflowHandle.remove();
            }
            this._attachmentHandle = this.reactiveUtils.when(() => this._editor.viewModel.state === "adding-attachment" ||
                this._editor.viewModel.state === "editing-attachment" ||
                this._editor.viewModel.state === "creating-features", () => {
                this._shouldClose = false;
            });
            this._activeWorkflowHandle = this.reactiveUtils.watch(() => { var _a; return (_a = this._editor.viewModel.activeWorkflow) === null || _a === void 0 ? void 0 : _a.activeWorkflow; }, (activeWorkflow) => {
                var _a, _b;
                if ((activeWorkflow === null || activeWorkflow === void 0 ? void 0 : activeWorkflow.type) === "update-table-record" || (activeWorkflow === null || activeWorkflow === void 0 ? void 0 : activeWorkflow.type) === "create-features") {
                    this._shouldClose = false;
                }
                // Handle back click and when feature is de-selected from the table
                // this ensures that we are not shown the Editors "Select" workflow step
                if ((!(activeWorkflow === null || activeWorkflow === void 0 ? void 0 : activeWorkflow.type) && !(activeWorkflow === null || activeWorkflow === void 0 ? void 0 : activeWorkflow.hasPendingEdits) && !this._editor.activeWorkflow) || !((_b = (_a = this._editor) === null || _a === void 0 ? void 0 : _a.activeWorkflow) === null || _b === void 0 ? void 0 : _b.started)) {
                    this.open = false;
                }
            });
            // had issues with destroy before adding like this
            this._editContainer.appendChild(container);
        }
    }
    /**
     * Close the edit widget
     */
    async _closeEdit(destroyOnClose) {
        var _a, _b, _c, _d;
        this._shouldClose = true;
        if (destroyOnClose && ((_a = this._editor) === null || _a === void 0 ? void 0 : _a.activeWorkflow)) {
            if ((_c = (_b = this._editor.activeWorkflow) === null || _b === void 0 ? void 0 : _b.activeWorkflow) === null || _c === void 0 ? void 0 : _c.hasPendingEdits) {
                await this._editor.activeWorkflow.reset();
                await this._editor.cancelWorkflow();
            }
            this._editor.destroy();
        }
        else {
            if (this.graphicIndex > -1 && ((_d = this.graphics) === null || _d === void 0 ? void 0 : _d.length) > 0) {
                this.refreshGraphics.emit(this.graphics);
            }
        }
        this._shouldClose = false;
        this.closeEdit.emit();
    }
    /**
     * Start the update workflow for the editor widget
     */
    async _startUpdate() {
        await this._editor.startUpdateWorkflowAtFeatureEdit(this.graphics[this.graphicIndex]);
        this._shouldClose = true;
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get is() { return "edit-card"; }
    static get originalStyleUrls() {
        return {
            "$": ["edit-card.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["edit-card.css"]
        };
    }
    static get properties() {
        return {
            "graphics": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "__esri.Graphic[]",
                    "resolved": "Graphic[]",
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
                    "text": "esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html"
                }
            },
            "mapView": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.MapView",
                    "resolved": "MapView",
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
                    "text": "esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html"
                }
            },
            "open": {
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
                    "text": "When true the component is displayed"
                },
                "attribute": "open",
                "reflect": false,
                "defaultValue": "false"
            },
            "graphicIndex": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The index of the current graphic"
                },
                "attribute": "graphic-index",
                "reflect": false,
                "defaultValue": "0"
            }
        };
    }
    static get states() {
        return {
            "_editorLoading": {},
            "_translations": {}
        };
    }
    static get events() {
        return [{
                "method": "closeEdit",
                "name": "closeEdit",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when the Editor widget should be closed"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "editsComplete",
                "name": "editsComplete",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when edits are completed on current edit layer"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "refreshGraphics",
                "name": "refreshGraphics",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when the editor is closed to handle\r\nthings like attachment updates that don't fire the standard edit update event when complete"
                },
                "complexType": {
                    "original": "__esri.Graphic[]",
                    "resolved": "Graphic[]",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "graphics",
                "methodName": "graphicsWatchHandler"
            }, {
                "propName": "open",
                "methodName": "openWatchHandler"
            }];
    }
    static get listeners() {
        return [{
                "name": "featureSelectionChange",
                "method": "featureSelectionChange",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
}
