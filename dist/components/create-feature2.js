/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Fragment } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { a as getAllLayers, g as getLayerOrTable } from './mapViewUtils.js';
import { d as defineCustomElement$1 } from './loader.js';

const createFeatureCss = ":host{display:block}.esri-editor__panel-toolbar{display:none !important}.esri-editor__update-actions{display:none !important}.esri-editor__panel-content{padding-block:0px !important}.esri-editor .esri-item-list__group__header{display:none !important}.esri-editor__panel-content__section .esri-widget__heading{display:none !important}.esri-editor .esri-item-list__filter-container--sticky{padding-block:0px !important;padding-inline:10px !important}.search-widget{width:92% !important;margin:5px 0 20px 14px}.display-none{display:none !important}.hide-map{height:1%;visibility:hidden}.show-map{padding:10px !important;position:absolute;bottom:0;width:calc(100% - 22px);height:50%}";
const CreateFeatureStyle0 = createFeatureCss;

const CreateFeature = /*@__PURE__*/ proxyCustomElement(class CreateFeature extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.success = createEvent(this, "success", 7);
        this.fail = createEvent(this, "fail", 7);
        this.drawComplete = createEvent(this, "drawComplete", 7);
        this.editingAttachment = createEvent(this, "editingAttachment", 7);
        this.progressStatus = createEvent(this, "progressStatus", 7);
        this.modeChanged = createEvent(this, "modeChanged", 7);
        this.mapView = undefined;
        this.selectedLayerId = undefined;
        this.customizeSubmit = false;
        this.searchConfiguration = undefined;
        this.isMobile = undefined;
        this.floorLevel = undefined;
        this.formElements = undefined;
        this._editorLoading = false;
        this._showSearchWidget = undefined;
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
     * esri/form/ExpressionInfo: https://developers.arcgis.com/javascript/latest/api-reference/esri-form-ExpressionInfo.html
     * The ExpressionInfo constructor
     */
    ExpressionInfo;
    /**
     * esri/form/elements/FieldElement: https://developers.arcgis.com/javascript/latest/api-reference/esri-form-elements-FieldElement.html
     * The FieldElement constructor
     */
    FieldElement;
    /**
     * esri/form/FormTemplate: https://developers.arcgis.com/javascript/latest/api-reference/esri-form-FormTemplate.html
     */
    FormTemplate;
    /**
     * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html
     * The Editor instance
     */
    _editor;
    /**
     * https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     * The Feature layer instance
     */
    FeatureLayer;
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     * The MapView instance
     */
    MapView;
    /**
     * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
     * Updated map view instance
     */
    _updatedMapView;
    /**
     * esri/widgets/Search: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
     * The Search instance
     */
    Search;
    /**
     * "esri/widgets/Search": https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
     * The Search instance
     */
    _search;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    reactiveUtils;
    /**
     * boolean: Flag to maintain the add attachment
     */
    _addingAttachment;
    /**
     * HTMLDivElement: The node the editor will be added to
     */
    _container;
    /**
     * HTMLDivElement: The node for the map view
     */
    _mapViewContainer;
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
     * Called each time when isMobile prop is changed.
     */
    async isMobileHandler() {
        // emit an event when mode is changed to back to the feature selection panel (to avoid multiple maps conflict)
        this.modeChanged.emit();
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
            this._isSubmitBtnClicked = true;
            this._editor.viewModel.featureFormViewModel.submit();
        }
    }
    /**
     * refresh the feature form
     * @returns Promise that resolves when the operation is complete
     */
    async refresh(floorLevel) {
        if (this._editor) {
            void this._setFloorLevel(floorLevel);
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when the feature is created successfully
     */
    success;
    /**
     * Emitted on demand when the feature creation is failed
     */
    fail;
    /**
     * Emitted on demand when drawing is completed
     */
    drawComplete;
    /**
    * Emitted on demand when editing attachments
    */
    editingAttachment;
    /**
     * Emitted on demand when editor panel changes
     */
    progressStatus;
    /**
     * Emitted on switched form mobile to desktop or vice versa
     */
    modeChanged;
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
        const showSearchWidget = this._showSearchWidget ? '' : 'display-none';
        const loaderClass = this._editorLoading ? "" : "display-none";
        const featureFormClass = this._editorLoading ? "display-none" : "";
        const mobileMapClass = this.isMobile ? "show-map" : "display-none";
        return (h(Fragment, { key: 'aac8fd8fe4ba5d7fb67a2b74a86147e053c1b0b8' }, h("calcite-loader", { key: 'e440bd2e0f4cf5acf4fd6941ada508c8ac5a0380', class: loaderClass, label: "", scale: "s" }), h("div", { key: '055a4e4b30b1fe24e0735257fa54fa9845cbaf2f', class: featureFormClass, id: "feature-form" }), h("div", { key: '342847f06ba99ad3c9693026bc83a8ac18b6c05f', class: `search-widget ${showSearchWidget} ${featureFormClass}`, id: "search-widget-ref" }), h("div", { key: '0acb837b4604d8d590bbfbcd738a3e09a099c362', class: `${mobileMapClass}`, ref: (el) => { this._mapViewContainer = el; } })));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Init Editor widget and Search widget
     */
    async init() {
        if (this.mapView && this.selectedLayerId) {
            this._updatedMapView = this.mapView;
            // In mobile mode show the map in panel
            await (this.isMobile ? this.createMobileMapView() : this._loadWidgets());
        }
    }
    /**
     * Load esri javascript api modules
     * @returns Promise resolving when function is done
     * @protected
     */
    async initModules() {
        const [Editor, reactiveUtils, Search, ExpressionInfo, FieldElement, FormTemplate, MapView] = await loadModules([
            "esri/widgets/Editor",
            "esri/core/reactiveUtils",
            "esri/widgets/Search",
            "esri/form/ExpressionInfo",
            "esri/form/elements/FieldElement",
            "esri/form/FormTemplate",
            "esri/views/MapView"
        ]);
        this.Editor = Editor;
        this.reactiveUtils = reactiveUtils;
        this.Search = Search;
        this.ExpressionInfo = ExpressionInfo;
        this.FieldElement = FieldElement;
        this.FormTemplate = FormTemplate;
        this.MapView = MapView;
    }
    /**
     * updates the map view (in case of mobile)
     * @protected
     */
    async createMobileMapView() {
        this._mapViewContainer.classList.add('hide-map');
        await new this.MapView({
            map: this.mapView.map,
            container: this._mapViewContainer
        }).when((view) => {
            // update the mapView and load all widgets
            this._updatedMapView = view;
            void this._loadWidgets();
        }, (e) => {
            console.log(e);
        });
    }
    /**
     * Loads the Editor and Search widgets
     * @protected
     */
    async _loadWidgets() {
        await this.createEditorWidget();
        await this.createSearchWidget();
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
        this._container = document.createElement("div");
        this._container?.classList.add("display-none");
        const allMapLayers = await getAllLayers(this._updatedMapView);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        allMapLayers.forEach(async (eachLayer) => {
            layerInfos.push({
                layer: eachLayer,
                enabled: eachLayer?.type === "feature" && eachLayer?.id === this.selectedLayerId,
                addEnabled: true, // default is true, set to false to disable the ability to add a new feature
                updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
                deleteEnabled: false // default is true, set to false to disable the ability to delete features
            });
        });
        this._editor = new this.Editor({
            allowedWorkflows: "create-features",
            view: this._updatedMapView,
            layerInfos: layerInfos,
            visibleElements: {
                snappingControls: false
            },
            container: this._container
        });
        if (this._mapViewContainer) {
            this.el.insertBefore(this._container, this._mapViewContainer);
        }
        else {
            this.el.appendChild(this._container);
        }
        //Add handle to watch if attachments are added/edited
        const attachmentHandle = this.reactiveUtils.watch(() => this._editor.viewModel.state, (state) => {
            console.log('create-feature attachmentHandle');
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
            console.log('create-feature featureTemplatesViewModel.state');
            if (state === 'ready') {
                this.progressStatus.emit(0.5);
                this._editorLoading = true;
            }
        });
        this._editor.viewModel.addHandles(handle);
        //Add handle to watch featureFormViewModel ready state
        const formHandle = this.reactiveUtils.watch(() => this._editor.viewModel.featureFormViewModel?.state, (state) => {
            console.log('create-feature featureFormViewModel.state');
            if (state === 'ready') {
                this._mapViewContainer?.classList?.replace("show-map", "hide-map");
                void this._setFloorLevel(this.floorLevel);
                this._showSearchWidget = false;
                this.progressStatus.emit(1);
                this.drawComplete.emit();
            }
        });
        this._editor.viewModel.addHandles(formHandle);
        //Add handle to watch editor viewmodel state and then show the search widget
        const createFeatureHandle = this.reactiveUtils.watch(() => this._editor.viewModel.state, (state) => {
            console.log('create-feature viewModel.state');
            if (state === 'creating-features') {
                this._mapViewContainer?.classList?.replace("hide-map", "show-map");
                this._editorLoading = true;
                this._showSearchWidget = true;
            }
        });
        this._editor.viewModel.addHandles(createFeatureHandle);
    }
    /**
     * Start creating the feature
     * @protected
     */
    async startCreate() {
        console.log('create-feature startCreate');
        // hides the header elements on template picker page
        await this.hideEditorsElements();
        return new Promise((resolve, reject) => {
            if (this._editor.viewModel.featureTemplatesViewModel.items?.length) {
                const items = this._editor.viewModel.featureTemplatesViewModel.items[0].get("items");
                //once the feature template is selected handle the event for formSubmit and sketch complete
                //also, hide the headers and footer in the editor as we will be showing our own submit and cancel button
                this._editor.viewModel.featureTemplatesViewModel.on('select', () => {
                    console.log('create-feature select');
                    this.progressStatus.emit(0.75);
                    setTimeout(() => {
                        //on form submit
                        this._editor.viewModel.featureFormViewModel.on('submit', this.submitted.bind(this));
                        //hides the header and footer elements in editor widget
                        this.hideEditorsElements().then(() => {
                            resolve({});
                        }, e => reject(e));
                    }, 700);
                });
                //if only one feature template then directly start geometry creation for that
                //else allow feature template selection to user
                if (items.length === 1) {
                    this._editor.viewModel.featureTemplatesViewModel.select(items[0]);
                }
                const resolvePromise = items.length > 1;
                this.hideEditorsElements().then(() => {
                    console.log('create-feature hideEditorsElements');
                    if (resolvePromise) {
                        resolve({});
                    }
                }, e => resolvePromise && reject(e));
            }
        });
    }
    /**
     * Display search widget to search location
     * @protected
     */
    async createSearchWidget() {
        let searchOptions = {
            view: this._updatedMapView,
        };
        if (this.searchConfiguration) {
            const searchConfiguration = this._getSearchConfig(this.searchConfiguration, this._updatedMapView);
            searchOptions = {
                ...searchConfiguration
            };
        }
        this._search = new this.Search(searchOptions);
        this._search.container = 'search-widget-ref';
        this._search.popupEnabled = false;
        this._search.resultGraphicEnabled = false;
        const layer = await getLayerOrTable(this._updatedMapView, this.selectedLayerId);
        let pointGeometry = null;
        // on search get the geometry of the searched location and pass it in sketchViewModel and go to featureForm page
        this._search.on('search-complete', (e) => {
            void this._updatedMapView.goTo(e.results[0].results[0].extent);
            if (layer.geometryType === 'point') {
                pointGeometry = e.results[0].results[0]?.feature.geometry;
            }
        });
        //Add handle to watch if search viewModel state is ready
        const createFeatureHandle = this.reactiveUtils.watch(() => this._search.viewModel.state, (state) => {
            if (state === 'ready') {
                setTimeout(() => {
                    if (this._editor.viewModel.sketchViewModel.createGraphic && pointGeometry) {
                        this._editor.viewModel.sketchViewModel.createGraphic.set('geometry', pointGeometry);
                        this._editor.viewModel.sketchViewModel.complete();
                        void this.hideEditorsElements();
                    }
                }, 100);
            }
        });
        this._search.viewModel.addHandles(createFeatureHandle);
    }
    /**
     * Initialize the search widget based on user defined configuration
     *
     * @param searchConfiguration search configuration defined by the user
     * @param view the current map view
     *
     * @protected
     */
    _getSearchConfig(searchConfiguration, view) {
        const INCLUDE_DEFAULT_SOURCES = "includeDefaultSources";
        const sources = searchConfiguration.sources;
        if (sources?.length > 0) {
            searchConfiguration[INCLUDE_DEFAULT_SOURCES] = false;
            sources.forEach((source) => {
                const isLayerSource = source.hasOwnProperty("layer");
                if (isLayerSource) {
                    const layerSource = source;
                    const layerId = layerSource.layer?.id;
                    const layerFromMap = layerId ? view.map.findLayerById(layerId) : null;
                    const layerUrl = layerSource?.layer?.url;
                    if (layerFromMap) {
                        layerSource.layer = layerFromMap;
                    }
                    else if (layerUrl) {
                        layerSource.layer = new this.FeatureLayer(layerUrl);
                    }
                }
            });
            sources?.forEach((source) => {
                const isLocatorSource = source.hasOwnProperty("locator");
                if (isLocatorSource) {
                    const locatorSource = source;
                    if (locatorSource?.name === "ArcGIS World Geocoding Service") {
                        const outFields = locatorSource.outFields || ["Addr_type", "Match_addr", "StAddr", "City"];
                        locatorSource.outFields = outFields;
                        locatorSource.singleLineFieldName = "SingleLine";
                    }
                    locatorSource.url = locatorSource.url;
                    delete locatorSource.url;
                }
            });
        }
        else {
            searchConfiguration = {
                ...searchConfiguration,
                includeDefaultSources: true
            };
        }
        return searchConfiguration;
    }
    /**
     * Add the floor level value to form
     * @param level selected floor level
     *
     * @protected
     */
    async _setFloorLevel(level) {
        if (!level) {
            return;
        }
        const layer = await getLayerOrTable(this._updatedMapView, this.selectedLayerId);
        if (layer?.floorInfo?.floorField) {
            const layerField = layer.fields.find((field) => field.name === layer.floorInfo.floorField);
            // if layer field is present and form template is not present only then we can set value of floorfield into feature form otherwise create a mannual formtemplate to add the floorfeild element
            if (layerField && !layer?.formTemplate) {
                this._editor.viewModel.featureFormViewModel.setValue(layerField.name, level);
                layerField.editable = false;
            }
            else if (layer.formTemplate && this.formElements) {
                const floorInfoExpression = new this.ExpressionInfo({
                    expression: `"${level}"`,
                    name: "floor-info-test",
                    title: "Floor Info",
                    returnType: "string"
                });
                const levelIdFieldElement = new this.FieldElement({
                    label: layer.floorInfo.floorField,
                    editableExpression: 'false',
                    fieldName: layer.floorInfo.floorField,
                    input: {
                        type: "text-box",
                        maxLength: 50,
                        minLength: 0
                    },
                    valueExpression: floorInfoExpression.name
                });
                this._updatedMapView.map.editableLayers.forEach((layer) => {
                    const orgElements = this.formElements.orgElements;
                    const orgExpressionInfos = this.formElements.orgExpressionInfos;
                    const elements = [...orgElements];
                    elements.push(levelIdFieldElement);
                    // Creating formtemplate
                    const floorInfoTemplate = new this.FormTemplate({
                        title: layer.formTemplate.title,
                        description: layer.formTemplate.description,
                        elements,
                        expressionInfos: [floorInfoExpression].concat(orgExpressionInfos)
                    });
                    layer.formTemplate = floorInfoTemplate;
                });
            }
        }
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
        "isMobile": ["isMobileHandler"],
        "_editorLoading": ["_editorLoadingWatchHandler"]
    }; }
    static get style() { return CreateFeatureStyle0; }
}, [0, "create-feature", {
        "mapView": [16],
        "selectedLayerId": [1, "selected-layer-id"],
        "customizeSubmit": [4, "customize-submit"],
        "searchConfiguration": [16],
        "isMobile": [4, "is-mobile"],
        "floorLevel": [1, "floor-level"],
        "formElements": [8, "form-elements"],
        "_editorLoading": [32],
        "_showSearchWidget": [32],
        "close": [64],
        "submit": [64],
        "refresh": [64]
    }, undefined, {
        "mapView": ["mapViewWatchHandler"],
        "isMobile": ["isMobileHandler"],
        "_editorLoading": ["_editorLoadingWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["create-feature", "calcite-loader"];
    components.forEach(tagName => { switch (tagName) {
        case "create-feature":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CreateFeature);
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

export { CreateFeature as C, defineCustomElement as d };
