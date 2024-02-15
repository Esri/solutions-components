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
import { getAllLayers } from "../../utils/mapViewUtils";
export class CreateFeature {
    constructor() {
        this.mapView = undefined;
        this.selectedLayerId = undefined;
        this.customizeSubmit = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
    * Called each time the mapView prop is changed.
    */
    async mapViewWatchHandler() {
        await this.mapView.when(async () => {
            await this.init();
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Destroy the Editor widget instance
     * @returns Promise that resolves when the operation is complete
     */
    async close() {
        if (this._editor) {
            this._editor.destroy();
        }
    }
    /**
     * Submit the created feature
     * @returns Promise that resolves when the operation is complete
     */
    async submit() {
        if (this._editor) {
            this._editor.viewModel.featureFormViewModel.submit();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this.initModules();
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this.init();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { id: "feature-form" }));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Init Editor widget and starts the create workflow
     */
    async init() {
        if (this.mapView && this.selectedLayerId) {
            await this.createEditorWidget();
        }
    }
    /**
     * Load esri javascript api modules
     * @returns Promise resolving when function is done
     * @protected
     */
    async initModules() {
        const [Editor, reactiveUtils] = await loadModules([
            "esri/widgets/Editor",
            "esri/core/reactiveUtils"
        ]);
        this.Editor = Editor;
        this.reactiveUtils = reactiveUtils;
    }
    /**
     * Display editor widget to create the new feature
     * @protected
     */
    async createEditorWidget() {
        if (this._editor) {
            this._editor.destroy();
        }
        const layerInfos = [];
        const container = document.createElement("div");
        const allMapLayers = await getAllLayers(this.mapView);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        allMapLayers.forEach(async (eachLayer) => {
            layerInfos.push({
                layer: eachLayer,
                enabled: (eachLayer === null || eachLayer === void 0 ? void 0 : eachLayer.type) === "feature" && (eachLayer === null || eachLayer === void 0 ? void 0 : eachLayer.id) === this.selectedLayerId,
                addEnabled: true,
                updateEnabled: false,
                deleteEnabled: false // default is true, set to false to disable the ability to delete features
            });
        });
        this._editor = new this.Editor({
            allowedWorkflows: "create-features",
            view: this.mapView,
            layerInfos: layerInfos,
            visibleElements: {
                snappingControls: false
            },
            container
        });
        this.el.appendChild(container);
        //Add handle to watch if attachments are added/edited
        const attachmentHandle = this.reactiveUtils.watch(() => this._editor.viewModel.state, (state) => {
            if (state === 'adding-attachment' || state === 'editing-attachment') {
                this._addingAttachment = true;
                this.editingAttachment.emit(true);
            }
            else {
                if (this._addingAttachment) {
                    this.editingAttachment.emit(false);
                    this._addingAttachment = false;
                }
            }
        });
        this._editor.viewModel.addHandles(attachmentHandle);
        //Add handle to watch featureTemplatesViewModel ready state and then start the creation
        const handle = this.reactiveUtils.watch(() => this._editor.viewModel.featureTemplatesViewModel.state, (state) => {
            if (state === 'ready') {
                void this.startCreate();
            }
        });
        this._editor.viewModel.addHandles(handle);
    }
    /**
     * Start creating the feature
     * @protected
     */
    async startCreate() {
        var _a;
        if ((_a = this._editor.viewModel.featureTemplatesViewModel.items) === null || _a === void 0 ? void 0 : _a.length) {
            const items = this._editor.viewModel.featureTemplatesViewModel.items[0].get("items");
            //once the feature template is selected handle the event for formSubmit and sketch complete
            //also, hide the headers and footer in the editor as we will be showing our own submit and cancel button
            this._editor.viewModel.featureTemplatesViewModel.on('select', () => {
                setTimeout(() => {
                    //on form submit 
                    this._editor.viewModel.featureFormViewModel.on('submit', this.submitted.bind(this));
                    //on sketch complete emit the event
                    this._editor.viewModel.sketchViewModel.on("create", (evt) => {
                        if (evt.state === "complete") {
                            this.drawComplete.emit();
                        }
                    });
                    this.hideEditorsElements();
                }, 700);
                this.hideEditorsElements();
            });
            //if only one feature template then directly start geometry creation for that
            //else allow feature template selection to user
            if (items.length === 1) {
                this._editor.viewModel.featureTemplatesViewModel.select(items[0]);
            }
            //hides the header and footer elements in editor widget
            this.hideEditorsElements();
        }
    }
    /**
     * Hides the elements of editor widget
     * @protected
     */
    hideEditorsElements() {
        if (!this.customizeSubmit) {
            return;
        }
        setTimeout(() => {
            var _a;
            //hides the header and footer on the featureForm
            (_a = this.el.querySelector('.esri-editor').querySelectorAll('calcite-flow-item')) === null || _a === void 0 ? void 0 : _a.forEach((flowItem) => {
                var _a, _b, _c, _d, _e;
                const article = (_c = (_b = (_a = flowItem.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('calcite-panel')) === null || _b === void 0 ? void 0 : _b.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('article');
                //hide the header
                (_d = article === null || article === void 0 ? void 0 : article.querySelector('header')) === null || _d === void 0 ? void 0 : _d.setAttribute('style', 'display: none');
                //hide the footer
                (_e = article === null || article === void 0 ? void 0 : article.querySelector('footer')) === null || _e === void 0 ? void 0 : _e.setAttribute('style', 'display: none');
            });
        }, 700);
    }
    /**
     * On creation of feature emit the event that the feature is created
     * @param evt feature submit event
     * @protected
     */
    async submitted(evt) {
        var _a;
        //return if any attribute is invalid , focus will be shifted to the invalid attribute in feature form
        if (evt.invalid.length) {
            return;
        }
        //Submit only when valid attributes
        //emit success or fail based on the result
        if (evt.valid.length) {
            try {
                await this._editor.activeWorkflow.commit();
                //throw errors if any failures
                if ((_a = this._editor.viewModel.failures) === null || _a === void 0 ? void 0 : _a.length) {
                    this._editor.viewModel.failures.some((failure) => {
                        if (failure.error) {
                            throw (failure.error);
                        }
                    });
                }
            }
            catch (e) {
                this.fail.emit(e);
                return;
            }
            this.success.emit();
        }
    }
    static get is() { return "create-feature"; }
    static get originalStyleUrls() {
        return {
            "$": ["create-feature.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["create-feature.css"]
        };
    }
    static get properties() {
        return {
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
            "selectedLayerId": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "string: Layer id of the feature layer in which the new feature is to be created"
                },
                "attribute": "selected-layer-id",
                "reflect": false
            },
            "customizeSubmit": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "boolean: Set this to true when have a custom submit button in the app.\r\nThis will hide the header and footer elements of the editor and user needs to execute the submit method manually."
                },
                "attribute": "customize-submit",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get events() {
        return [{
                "method": "success",
                "name": "success",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when the feature is created successfully"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "fail",
                "name": "fail",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when the feature creation is failed"
                },
                "complexType": {
                    "original": "Error",
                    "resolved": "Error",
                    "references": {
                        "Error": {
                            "location": "global",
                            "id": "global::Error"
                        }
                    }
                }
            }, {
                "method": "drawComplete",
                "name": "drawComplete",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when drawing is completed"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "editingAttachment",
                "name": "editingAttachment",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when editing attachments"
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "close": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Destroy the Editor widget instance",
                    "tags": [{
                            "name": "returns",
                            "text": "Promise that resolves when the operation is complete"
                        }]
                }
            },
            "submit": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Submit the created feature",
                    "tags": [{
                            "name": "returns",
                            "text": "Promise that resolves when the operation is complete"
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "mapView",
                "methodName": "mapViewWatchHandler"
            }];
    }
}
