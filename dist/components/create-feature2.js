/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { a as getAllLayers } from './mapViewUtils.js';

const createFeatureCss = ":host{display:block}.esri-editor__panel-toolbar{display:none !important}.esri-editor__update-actions{display:none !important}.esri-editor__panel-content{padding-block:0px !important}.esri-editor .esri-item-list__group__header{display:none !important}.esri-editor__panel-content__section .esri-widget__heading{display:none !important}.esri-editor .esri-item-list__filter-container--sticky{padding-block:0px !important;padding-inline:10px !important}";

const CreateFeature = /*@__PURE__*/ proxyCustomElement(class CreateFeature extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.success = createEvent(this, "success", 7);
        this.fail = createEvent(this, "fail", 7);
        this.drawComplete = createEvent(this, "drawComplete", 7);
        this.editingAttachment = createEvent(this, "editingAttachment", 7);
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
    get el() { return this; }
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"]
    }; }
    static get style() { return createFeatureCss; }
}, [0, "create-feature", {
        "mapView": [16],
        "selectedLayerId": [1, "selected-layer-id"],
        "customizeSubmit": [4, "customize-submit"],
        "close": [64],
        "submit": [64]
    }, undefined, {
        "mapView": ["mapViewWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["create-feature"];
    components.forEach(tagName => { switch (tagName) {
        case "create-feature":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CreateFeature);
            }
            break;
    } });
}
defineCustomElement();

export { CreateFeature as C, defineCustomElement as d };
