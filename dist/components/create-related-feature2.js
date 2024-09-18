/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { d as defineCustomElement$1 } from './loader.js';

const createRelatedFeatureCss = ":host{display:block}.esri-editor__panel-toolbar{display:none !important}.display-none{display:none !important}";
const CreateRelatedFeatureStyle0 = createRelatedFeatureCss;

const CreateRelatedFeature = /*@__PURE__*/ proxyCustomElement(class CreateRelatedFeature extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.success = createEvent(this, "success", 7);
        this.fail = createEvent(this, "fail", 7);
        this.isActionPending = createEvent(this, "isActionPending", 7);
        this.formReady = createEvent(this, "formReady", 7);
        this.mapView = undefined;
        this.table = undefined;
        this.selectedFeature = undefined;
        this.customizeSubmit = false;
        this._editorLoading = false;
    }
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html
     * The Editor constructor
     */
    Editor;
    /**
   * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html
   * The Editor instance
   */
    _editor;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    reactiveUtils;
    /**
     * HTMLDivElement: The node the editor will be added to
     */
    _container;
    /**
     * boolean: Flag to maintain the add attachment
     */
    _addingAttachment;
    /**
     * boolean: Flag to maintain form submission using submit button
     */
    _isSubmitBtnClicked = false;
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
    /**
     * When _editorLoading is true the container node will be hidden while starting the create workflow
     */
    async _editorLoadingWatchHandler(v) {
        if (v) {
            this._container?.classList.add("display-none");
            await this.startCreate();
            this._container?.classList.remove("display-none");
            this._editorLoading = false;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Destroy the Editor widget instance
     */
    async close() {
        if (this._editor) {
            this._editor.destroy();
        }
    }
    /**
     * Submit the comment
     */
    async submit() {
        if (this._editor) {
            this._isSubmitBtnClicked = true;
            this._editor.viewModel.featureFormViewModel.submit();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when the comment is submitted successfully
     */
    success;
    /**
     * Emitted on demand when the comment submission is failed
     */
    fail;
    /**
     * Emitted on demand when any action is pending or completed
     */
    isActionPending;
    /**
     * Emitted on demand when form is ready
     */
    formReady;
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
     * Init Editor widget and starts the create workflow
     */
    async init() {
        if (this.mapView) {
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
    render() {
        const loaderClass = this._editorLoading ? "" : "display-none";
        return (h("calcite-loader", { key: '58e20b0723d76b27652f655c598628b43dde70e3', class: loaderClass, label: "", scale: "s" }));
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this.init();
    }
    /**
     * Display editor widget to create the new feature
     * @protected
     */
    async createEditorWidget() {
        if (this._editor) {
            this._editor.destroy();
        }
        this._container = document.createElement("div");
        this._container?.classList.add("display-none");
        this._editor = new this.Editor({
            view: this.mapView,
            visibleElements: {
                snappingControls: false
            },
            container: this._container
        });
        this.el.appendChild(this._container);
        //Add handle to watch featureTemplatesViewModel ready state and then start the creation
        const handle = this.reactiveUtils.watch(() => this._editor.viewModel.featureTemplatesViewModel.state, (state) => {
            console.log('create-related-feature featureTemplatesViewModel.state');
            if (state === 'ready') {
                this._editorLoading = true;
            }
        });
        this._editor.viewModel.addHandles(handle);
        // Add handle to watch if attachments are added/edited
        const attachmentHandle = this.reactiveUtils.watch(() => this._editor.viewModel.state, (state) => {
            console.log('create-related-feature viewModel.state');
            if (state === 'adding-attachment' || state === 'editing-attachment') {
                this._addingAttachment = true;
                this.isActionPending.emit(true);
            }
            else {
                if (this._addingAttachment) {
                    this.isActionPending.emit(false);
                    this._addingAttachment = false;
                }
            }
        });
        this._editor.viewModel.addHandles(attachmentHandle);
        //Add handle to watch featureFormViewModel ready state
        const formHandle = this.reactiveUtils.watch(() => this._editor.viewModel.featureFormViewModel?.state, (state) => {
            console.log('create-related-feature featureFormViewModel?.state');
            if (state === 'ready') {
                this.formReady.emit();
            }
        });
        this._editor.viewModel.addHandles(formHandle);
    }
    /**
     * Start creating the feature feature form
     * @protected
     */
    async startCreate() {
        console.log('create-related-feature startCreate');
        const parentLayer = this.selectedFeature.layer;
        const childTable = this.table;
        const parentRelationship = parentLayer.relationships[0];
        const childRelationship = childTable.relationships.find((rel) => parentLayer.layerId === rel.relatedTableId);
        const queryResult = await parentLayer.queryFeatures({
            objectIds: [this.selectedFeature.getObjectId()],
            outFields: [parentLayer.objectIdField, parentRelationship.keyField],
        });
        const parentFeature = queryResult.features[0];
        const template = childTable.templates[0];
        const attributeOverrides = this.makeAttributesForRelatedFeature(parentFeature, parentRelationship, childRelationship);
        const creationInfo = {
            attributeOverrides,
            layer: childTable,
            template,
        };
        await this._editor.startCreateFeaturesWorkflowAtFeatureCreation(creationInfo);
        //hides the header and footer elements in editor widget
        await this.hideEditorsElements();
        this._editor.viewModel.featureFormViewModel.on('submit', this.submitted.bind(this));
    }
    /**
     * Hides the elements of editor widget
     * @protected
     */
    async hideEditorsElements() {
        if (!this.customizeSubmit) {
            return;
        }
        await this.timeout(700);
        //hides the header and footer on the featureForm
        this.el.querySelector('.esri-editor')?.querySelectorAll('calcite-flow-item')?.forEach((flowItem) => {
            const article = flowItem.shadowRoot?.querySelector('calcite-panel')?.shadowRoot?.querySelector('article');
            //hide the header
            article?.querySelector('header')?.setAttribute('style', 'display: none');
            //hide the footer
            article?.querySelector('footer')?.setAttribute('style', 'display: none');
        });
    }
    /**
     * Makes attributes for related feature
     * @param parentFeature Parent feature
     * @param parentRelationship Parent relationship
     * @param childRelationship Child relationship
     * @returns Attributes for related feature
     * @protected
     */
    makeAttributesForRelatedFeature(parentFeature, parentRelationship, childRelationship) {
        const parentKeyField = parentRelationship.keyField;
        let parentKeyValue;
        if (parentFeature.attributes.hasOwnProperty(parentKeyField)) {
            parentKeyValue = parentFeature.getAttribute(parentKeyField);
        }
        else if (parentFeature.attributes.hasOwnProperty(parentKeyField.toLowerCase())) {
            parentKeyValue = parentFeature.getAttribute(parentKeyField.toLowerCase());
        }
        else if (parentFeature.attributes.hasOwnProperty(parentKeyField.toUpperCase())) {
            parentKeyValue = parentFeature.getAttribute(parentKeyField.toUpperCase());
        }
        let childKeyField = childRelationship.keyField;
        // get the field from table which name is same as childKeyField and use that field name as childKeyField
        const field = this.table.fields.find((field) => field.name.toLocaleLowerCase() === childKeyField.toLocaleLowerCase());
        childKeyField = field.name;
        const childAttributes = {
            [childKeyField]: parentKeyValue,
        };
        return childAttributes;
    }
    /**
     * On creation of feature emit the event that the feature is created
     * @param evt feature submit event
     * @protected
     */
    async submitted(evt) {
        //return if any attribute is invalid , focus will be shifted to the invalid attribute in feature form
        if (evt.invalid.length) {
            this._isSubmitBtnClicked = false;
            return;
        }
        //Submit only when valid attributes
        //emit success or fail based on the result
        if (evt.valid.length && this._isSubmitBtnClicked) {
            this._isSubmitBtnClicked = false;
            try {
                await this._editor.activeWorkflow.commit();
                //throw errors if any failures
                if (this._editor.viewModel.failures?.length) {
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
    /**
     * call setTimeout in Promise wrapper
     * @param delay The time, in milliseconds that the timer should wait before the promise is resolved
     * @protected
     */
    timeout(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"],
        "_editorLoading": ["_editorLoadingWatchHandler"]
    }; }
    static get style() { return CreateRelatedFeatureStyle0; }
}, [0, "create-related-feature", {
        "mapView": [16],
        "table": [16],
        "selectedFeature": [16],
        "customizeSubmit": [4, "customize-submit"],
        "_editorLoading": [32],
        "close": [64],
        "submit": [64]
    }, undefined, {
        "mapView": ["mapViewWatchHandler"],
        "_editorLoading": ["_editorLoadingWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["create-related-feature", "calcite-loader"];
    components.forEach(tagName => { switch (tagName) {
        case "create-related-feature":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CreateRelatedFeature);
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { CreateRelatedFeature as C, defineCustomElement as d };
