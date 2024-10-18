/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Fragment } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { a as getAllLayers, g as getLayerOrTable } from './mapViewUtils.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './loader.js';
import { d as defineCustomElement$1 } from './notice.js';

const createFeatureCss = ":host{display:block}.esri-editor__panel-toolbar{display:none !important}.esri-editor__panel-content{padding-block:0px !important}.esri-editor .esri-item-list__group__header{display:none !important}.esri-editor__panel-content__section .esri-widget__heading{display:none !important}.esri-editor .esri-item-list__filter-container--sticky{padding-block:0px !important;padding-inline:10px !important}.search-widget{width:92% !important;margin:5px 14px 20px 14px}.display-none{display:none !important}.hide-map{height:1%;visibility:hidden}.show-map{padding:10px !important;position:absolute !important;bottom:0;height:auto !important;width:calc(100% - 22px)}.notice-msg{padding:10px;width:calc(100% - 20px)}.esri-editor__panel-content{padding-block:10px !important}@media only screen and (max-width: 600px){.esri-editor__panel-content{padding-block:0 !important;min-height:0 !important}}";
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
        this.enableSearch = false;
        this.showGuidingMsg = true;
        this.showGuidingMsgWhileDrawing = true;
        this._editorLoading = false;
        this._currentPage = "templatePicker";
        this._translations = undefined;
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
    /**
     * __esri.FeatureLayer: selected feature layer;
     */
    _selectedLayer;
    /**
     * HTMLDivElement: refrence for search div element
     */
    _searchDiv;
    /**
     * HTMLCalciteNoticeElement: calcite notice refrence element
     */
    _calciteNotice;
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
            if (this._selectedLayer?.isTable) {
                const template = this._selectedLayer.templates[0];
                const creationInfo = {
                    layer: this._selectedLayer,
                    template
                };
                await this._editor.startCreateFeaturesWorkflowAtFeatureCreation(creationInfo);
                await this.hideEditorsElements();
            }
            else {
                await this.startCreate();
            }
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
        await this._getTranslations();
        await this.initModules();
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this.init();
    }
    /**
     * Called after each render
     * Used to adjust the map top in case of mobile
     */
    componentDidRender() {
        // update the map top according to space occupied by notice msg and search
        if (this.isMobile) {
            // get the height of notice, search and add 80px(editor msg) height to adjust the map top
            const top = this._calciteNotice.offsetHeight + this._searchDiv.offsetHeight + 80;
            this._mapViewContainer.style.top = `${top}px`;
        }
    }
    /**
     * StencilJS: Called every time the component is disconnected from the DOM,
     */
    disconnectedCallback() {
        if (this._editor) {
            this._editor.destroy();
        }
    }
    /**
     * Renders the component.
     */
    render() {
        const showSearchWidget = this._currentPage === 'drawing' ? "" : "display-none";
        const loaderClass = this._editorLoading ? "" : "display-none";
        const featureFormClass = this._editorLoading ? "display-none" : "";
        const mobileMapClass = this.isMobile ? "show-map" : "display-none";
        // hide guiding msg for drawing page when showGuidingMsgWhileDrawing is false
        const showGuidingMsg = this.showGuidingMsg && (this.showGuidingMsgWhileDrawing || this._currentPage !== "drawing");
        let guidingMsg = this._translations.chooseCategoryMsg;
        if (this._currentPage === 'drawing') {
            guidingMsg = this._translations.provideLocationMsg;
        }
        else if (this._currentPage === 'featureForm') {
            guidingMsg = this._translations.provideDetailsMsg;
        }
        return (h(Fragment, { key: '89634bf5707ea8390416d3087bfbe4e747bafcd7' }, showGuidingMsg && h("calcite-notice", { key: '4269224c2904f29060081f6cb8f383f1cf8d741d', class: "notice-msg", icon: "lightbulb", kind: "success", open: true, ref: el => this._calciteNotice = el }, h("div", { key: 'ecc3cca85c81d1cb7ab7cdc89b99e31afcb55f76', slot: "message" }, guidingMsg)), h("calcite-loader", { key: '34e492c0c469b39d4cfbcda17c4ba196ccb39eb8', class: loaderClass, label: "", scale: "s" }), h("div", { key: 'b2073ef4b6124b54038de34798cdf83337626023', class: featureFormClass, id: "feature-form" }), this.enableSearch &&
            h("div", { key: 'cd13e98b6a40d5d89d271b5785f797e9bfc19900', class: `search-widget ${showSearchWidget} ${featureFormClass}`, id: "search-widget-ref", ref: el => this._searchDiv = el }), h("div", { key: '2575b2d20f7713b05a2024e77452af93eb64e147', class: `${mobileMapClass}`, ref: (el) => { this._mapViewContainer = el; } })));
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
            container: this._mapViewContainer,
            zoom: this.mapView.zoom
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
        if (this.enableSearch) {
            await this.createSearchWidget();
        }
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
        this._selectedLayer = await getLayerOrTable(this.mapView, this.selectedLayerId);
        // if layer is selected then only use the layerInfos while initializing the editor widget
        if (!this._selectedLayer?.isTable) {
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            allMapLayers.forEach(async (eachLayer) => {
                layerInfos.push({
                    layer: eachLayer,
                    enabled: eachLayer?.type === "feature" && eachLayer?.id === this.selectedLayerId,
                    addEnabled: true, // default is true, set to false to disable the ability to add a new feature
                    updateEnabled: false, // if true, enable ability to edit an existing feature
                    deleteEnabled: false // default is true, set to false to disable the ability to delete features
                });
            });
        }
        this._editor = new this.Editor({
            view: this._updatedMapView,
            layerInfos: layerInfos,
            visibleElements: {
                snappingControls: false,
                createFeaturesSection: true,
                editFeaturesSection: false
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
            console.log(`CF state: ${state}`);
            if (state === 'ready' && this._editor.viewModel?.activeWorkflow?.type !== "create-features") {
                this.progressStatus.emit(0.5);
                this._editorLoading = true;
            }
        });
        this._editor.viewModel.addHandles(handle);
        //Add handle to watch featureFormViewModel ready state
        const formHandle = this.reactiveUtils.watch(() => this._editor.viewModel.featureFormViewModel?.state, (state) => {
            console.log(`CF fvm state: ${state}`);
            if (state === 'ready') {
                this._mapViewContainer?.classList?.replace("show-map", "hide-map");
                this._editor.viewModel.featureFormViewModel.on('submit', this.submitted.bind(this));
                setTimeout(() => {
                    void this._setFloorLevel(this.floorLevel);
                }, 50);
                this._currentPage = 'featureForm';
                this.progressStatus.emit(1);
                this.drawComplete.emit();
            }
        });
        this._editor.viewModel.addHandles(formHandle);
        //Add handle to watch editor viewmodel state and then show the search widget
        const createFeatureHandle = this.reactiveUtils.watch(() => this._editor.viewModel.state, (state) => {
            if (state === 'creating-features') {
                if (this._editor.viewModel.featureFormViewModel.state === 'disabled') {
                    this._mapViewContainer?.classList?.replace("hide-map", "show-map");
                    if (this._selectedLayer && !this._selectedLayer.isTable) {
                        this._currentPage = 'drawing';
                    }
                }
            }
        });
        this._editor.viewModel.addHandles(createFeatureHandle);
    }
    /**
     * Start creating the feature
     * @protected
     */
    async startCreate() {
        // hides the header elements on template picker page
        await this.hideEditorsElements();
        return new Promise((resolve, reject) => {
            if (this._editor.viewModel.featureTemplatesViewModel.items?.length) {
                const items = this._editor.viewModel.featureTemplatesViewModel.items[0].get("items");
                //once the feature template is selected handle the event for formSubmit and sketch complete
                //also, hide the headers and footer in the editor as we will be showing our own submit and cancel button
                this._editor.viewModel.featureTemplatesViewModel.on('select', () => {
                    this.progressStatus.emit(0.75);
                    setTimeout(() => {
                        //hides the header and footer elements in editor widget
                        this.hideEditorsElements().then(() => {
                            resolve({});
                        }, e => reject(e));
                    }, 700);
                });
                //if only one feature template then directly start geometry creation for that
                if (items.length === 1) {
                    this._editor.viewModel.featureTemplatesViewModel.select(items[0]);
                }
                const resolvePromise = items.length > 1;
                this.hideEditorsElements().then(() => {
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
        let pointGeometry = null;
        // on search get the geometry of the searched location and pass it in sketchViewModel and go to featureForm page
        this._search.on('search-complete', (e) => {
            void this._updatedMapView.goTo(e.results[0].results[0].extent);
            if (this._selectedLayer.geometryType === 'point') {
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
        const layer = this._selectedLayer;
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
    /**
     * Fetches the component's translations
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
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
        "enableSearch": [4, "enable-search"],
        "showGuidingMsg": [4, "show-guiding-msg"],
        "showGuidingMsgWhileDrawing": [4, "show-guiding-msg-while-drawing"],
        "_editorLoading": [32],
        "_currentPage": [32],
        "_translations": [32],
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
    const components = ["create-feature", "calcite-icon", "calcite-loader", "calcite-notice"];
    components.forEach(tagName => { switch (tagName) {
        case "create-feature":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CreateFeature);
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { CreateFeature as C, defineCustomElement as d };
