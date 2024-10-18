/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, g as getElement, c as createEvent, F as Fragment } from './index-904bc599.js';
import { c as createObserver } from './observers-c83631e8.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable-7cb2fc6f.js';
import { l as loadModules, g as getLocaleComponentStrings, f as formatNumber } from './locale-0d06fca0.js';
import { b as getAllTables, d as getMapLayerHash, a as getAllLayers, c as getFeatureLayerView } from './mapViewUtils-f54edae3.js';
import './browser-b67d8df6.js';
import './esri-loader-c6842c6b.js';
import './_commonjsHelpers-089957fe.js';
import './interfaces-659e3836.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    frame: "frame",
    frameAdvancing: "frame--advancing",
    frameRetreating: "frame--retreating",
};

const flowCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto;align-items:stretch;overflow:hidden;background-color:transparent}:host .frame{position:relative;margin:0px;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;padding:0px}:host ::slotted(calcite-flow-item),:host ::slotted(calcite-panel){block-size:100%}:host ::slotted(.calcite-match-height:last-child){display:flex;flex:1 1 auto;overflow:hidden}:host .frame--advancing{animation:calcite-frame-advance var(--calcite-animation-timing)}:host .frame--retreating{animation:calcite-frame-retreat var(--calcite-animation-timing)}@keyframes calcite-frame-advance{0%{--tw-bg-opacity:0.5;transform:translate3d(50px, 0, 0)}100%{--tw-bg-opacity:1;transform:translate3d(0, 0, 0)}}@keyframes calcite-frame-retreat{0%{--tw-bg-opacity:0.5;transform:translate3d(-50px, 0, 0)}100%{--tw-bg-opacity:1;transform:translate3d(0, 0, 0)}}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteFlowStyle0 = flowCss;

const Flow = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.itemMutationObserver = createObserver("mutation", () => this.updateFlowProps());
        this.getFlowDirection = (oldFlowItemCount, newFlowItemCount) => {
            const allowRetreatingDirection = oldFlowItemCount > 1;
            const allowAdvancingDirection = oldFlowItemCount && newFlowItemCount > 1;
            if (!allowAdvancingDirection && !allowRetreatingDirection) {
                return null;
            }
            return newFlowItemCount < oldFlowItemCount ? "retreating" : "advancing";
        };
        this.updateFlowProps = () => {
            const { customItemSelectors, el, items } = this;
            const newItems = Array.from(el.querySelectorAll(`calcite-flow-item${customItemSelectors ? `,${customItemSelectors}` : ""}`)).filter((flowItem) => flowItem.closest("calcite-flow") === el);
            const oldItemCount = items.length;
            const newItemCount = newItems.length;
            const activeItem = newItems[newItemCount - 1];
            const previousItem = newItems[newItemCount - 2];
            if (newItemCount && activeItem) {
                newItems.forEach((itemNode) => {
                    itemNode.showBackButton = itemNode === activeItem && newItemCount > 1;
                    itemNode.hidden = itemNode !== activeItem;
                });
            }
            if (previousItem) {
                previousItem.menuOpen = false;
            }
            this.items = newItems;
            if (oldItemCount !== newItemCount) {
                const flowDirection = this.getFlowDirection(oldItemCount, newItemCount);
                this.itemCount = newItemCount;
                this.flowDirection = flowDirection;
            }
        };
        this.customItemSelectors = undefined;
        this.flowDirection = null;
        this.itemCount = 0;
        this.items = [];
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Removes the currently active `calcite-flow-item`.
     */
    async back() {
        const { items } = this;
        const lastItem = items[items.length - 1];
        if (!lastItem) {
            return;
        }
        const beforeBack = lastItem.beforeBack
            ? lastItem.beforeBack
            : () => Promise.resolve();
        try {
            await beforeBack.call(lastItem);
        }
        catch (_error) {
            // back prevented
            return;
        }
        lastItem.remove();
        return lastItem;
    }
    /**
     * Sets focus on the component.
     */
    async setFocus() {
        await componentFocusable(this);
        const { items } = this;
        const activeItem = items[items.length - 1];
        return activeItem?.setFocus();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        this.itemMutationObserver?.observe(this.el, { childList: true, subtree: true });
        this.updateFlowProps();
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        this.itemMutationObserver?.disconnect();
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    async handleItemBackClick(event) {
        if (event.defaultPrevented) {
            return;
        }
        await this.back();
        return this.setFocus();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { flowDirection } = this;
        const frameDirectionClasses = {
            [CSS.frame]: true,
            [CSS.frameAdvancing]: flowDirection === "advancing",
            [CSS.frameRetreating]: flowDirection === "retreating",
        };
        return (h("div", { key: '01fbee965d48cb54fa5bd1b53a3435538df84332', class: frameDirectionClasses }, h("slot", { key: '495880eceeb04387dd1352aa00337f037ab0636c' })));
    }
    get el() { return getElement(this); }
};
Flow.style = CalciteFlowStyle0;

const createRelatedFeatureCss = ":host{display:block}.esri-editor__panel-toolbar{display:none !important}.display-none{display:none !important}.esri-editor__panel-content{padding-block:10px !important}.notice-msg{padding:10px;width:calc(100% - 20px)}";
const CreateRelatedFeatureStyle0 = createRelatedFeatureCss;

const CreateRelatedFeature = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.success = createEvent(this, "success", 7);
        this.fail = createEvent(this, "fail", 7);
        this.isActionPending = createEvent(this, "isActionPending", 7);
        this.formReady = createEvent(this, "formReady", 7);
        this.mapView = undefined;
        this.table = undefined;
        this.selectedFeature = undefined;
        this.customizeSubmit = false;
        this.showGuidingMsg = true;
        this._editorLoading = false;
        this._translations = undefined;
    }
    get el() { return getElement(this); }
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
        await this._getTranslations();
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
        return (h(Fragment, { key: '641b4f6f51bce04b6263a1d7dc72a31839df970d' }, this.showGuidingMsg && h("calcite-notice", { key: '1a6e577bcc0632a7bc69dd411a692062a7ad176e', class: "notice-msg", icon: "lightbulb", kind: "success", open: true }, h("div", { key: '55c5836314fcca69a259be3a36e34c527edcabf3', slot: "message" }, this._translations.provideDetailsMsg)), h("calcite-loader", { key: '18c5603a4a75c67a160a71caa15e94790f66d60b', class: loaderClass, label: "", scale: "s" })));
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this.init();
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
            console.log(`CRF state: ${state}`);
            if (state === 'ready') {
                this._editorLoading = true;
            }
        });
        this._editor.viewModel.addHandles(handle);
        // Add handle to watch if attachments are added/edited
        const attachmentHandle = this.reactiveUtils.watch(() => this._editor.viewModel.state, (state) => {
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
            console.log(`CRF fvm state: ${state}`);
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
        console.log(`CRF hideEditorsElements`);
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
        "_editorLoading": ["_editorLoadingWatchHandler"]
    }; }
};
CreateRelatedFeature.style = CreateRelatedFeatureStyle0;

const featureDetailsCss = ":host{display:block}.buttons-container{align-items:center;display:flex;padding:4px;color:var(--calcite-color-text-1) !important;background-color:var(--calcite-color-foreground-1) !important;border-block-start:1px solid var(--calcite-color-border-3);border-block-end:1px solid var(--calcite-color-border-3)}";
const FeatureDetailsStyle0 = featureDetailsCss;

const FeatureDetails = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.loadingStatus = createEvent(this, "loadingStatus", 7);
        this.commentSelect = createEvent(this, "commentSelect", 7);
        this.addComment = createEvent(this, "addComment", 7);
        this.likeOrDislikeClicked = createEvent(this, "likeOrDislikeClicked", 7);
        this.featureSelectionChange = createEvent(this, "featureSelectionChange", 7);
        this.mapView = undefined;
        this.graphics = undefined;
        this.reportingOptions = undefined;
        this.layerItemsHash = undefined;
        this.showUserImageInCommentsList = false;
        this._likeFieldAvailable = false;
        this._likeCount = 0;
        this._disLikeCount = 0;
        this._dislikeFieldAvailable = false;
        this._commentsAvailable = false;
        this._isLikeBtnClicked = false;
        this._isDislikeBtnClicked = false;
        this._relatedFeaturesOIDs = undefined;
        this._updating = false;
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * HTMLCreateFeatureElement: info card component instance
     */
    _infoCard;
    /**
     * HTMLFeatureListElement: Feature list component's instance to show the comments
     */
    _commentsList;
    /**
     * __esri.Graphic: The current selected feature graphic
     */
    _selectedGraphic;
    /**
     * string: Available like field in the layer
     */
    _likeField;
    /**
     * string: Available dislike field in the layer
     */
    _dislikeField;
    /**
     * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    Graphic;
    /**
     * https://developers.arcgis.com/javascript/latest/api-reference/esri-rest-support-RelationshipQuery.html
     * used for module import
     */
    RelationshipQuery;
    /**
     * string[]: Valid field types for like and dislike
     */
    _validFieldTypes = ["small-integer", "integer", "big-integer", "single", "long"];
    /**
     *string: related table id of selected feature
     */
    relatedTableId;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the graphics prop is changed
     */
    async graphicsWatchHandler() {
        await this.getCompleteGraphic(this.graphics[0]);
        this.checkLikeDislikeFields();
        await this.processComments();
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Refresh the features comments which will fetch like, dislike and update the component
     * @returns Promise that resolves when the operation is complete
     */
    async refresh(graphic) {
        await this.getCompleteGraphic(graphic);
        await this.processComments();
        if (this.isLikeDislikeConfigured(graphic.layer)) {
            // in case of multiple features selected fetch complete feature and update like dislike for current feature
            if (graphic && this.graphics.length > 1) {
                this.checkLikeDislikeFields();
            }
        }
        else {
            this._likeFieldAvailable = false;
            this._dislikeFieldAvailable = false;
        }
    }
    /**
     * Go to the previous feature in the features widget
     */
    async back() {
        void this._infoCard.back();
    }
    /**
     * Go to the next feature in the features widget
     */
    async next() {
        void this._infoCard.next();
    }
    /**
     * Toggle the visibility of the features list view
     */
    async toggleListView() {
        void this._infoCard.toggleListView();
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when like or dislike button is clicked
     */
    loadingStatus;
    /**
     * Emitted on demand when comment is selected using the feature-list
     */
    commentSelect;
    /**
     * Emitted on demand when comment icon is clicked
     */
    addComment;
    /**
     * Emitted on demand when like or dislike button is clicked
     */
    likeOrDislikeClicked;
    /**
     * Emitted on demand when the selected index changes
     */
    featureSelectionChange;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._initModules();
        //Apply query to get complete graphic with complete attributes
        await this.getCompleteGraphic(this.graphics[0]);
        this.checkLikeDislikeFields();
        await this.processComments();
    }
    render() {
        //When related features found show comments list of only those features else comments list will be empty
        const commentsListWhereClause = this._relatedFeaturesOIDs?.length > 0 ? `objectId in(${this._relatedFeaturesOIDs})` : '1=0';
        return (h("calcite-panel", { key: 'e09b693348a5d446f6ea3c774af3c2fd14e66daf', "full-height": true }, h("info-card", { key: '4483a15e4e0bdd62c2c21bc4622d3bbddf3cd113', allowEditing: false, graphics: this.graphics, highlightEnabled: false, isLoading: false, isMobile: false, mapView: this.mapView, onSelectionChanged: (e) => { this.featureSelectionChange.emit(e.detail); }, paginationEnabled: false, position: "relative", ref: el => this._infoCard = el }), (this._likeFieldAvailable || this._dislikeFieldAvailable || this._commentsAvailable) &&
            h("div", { key: 'ac24bb5fd56a7561e78d90c3a1b10027cfab6b2b', class: "buttons-container" }, this._commentsAvailable &&
                h("calcite-button", { key: '676c5da52465f295212668f8db9b353e219070f2', appearance: "transparent", iconEnd: "speech-bubble", kind: "neutral", onClick: () => { this.addComment.emit(); }, scale: 'm' }, this._relatedFeaturesOIDs.length), this._likeFieldAvailable &&
                h("calcite-button", { key: 'b3fe54ea2fcf5361e6ec0a91bd52775d24408d77', appearance: "transparent", iconEnd: "thumbs-up", kind: this._isLikeBtnClicked ? "brand" : "neutral", loading: this._updating, onClick: this.onLikeButtonClick.bind(this), scale: 'm' }, this._likeCount ?? this._selectedGraphic.attributes[this._likeField] ?? 0), this._dislikeFieldAvailable &&
                h("calcite-button", { key: 'd83c9b9fdd287e07670ca9a5aeafd1a4cc38c0f8', appearance: "transparent", iconEnd: "thumbs-down", kind: this._isDislikeBtnClicked ? "brand" : "neutral", loading: this._updating, onClick: this.onDislikeButtonClick.bind(this), scale: 'm' }, this._disLikeCount ?? this._selectedGraphic.attributes[this._dislikeField] ?? 0)), this.relatedTableId && this._commentsAvailable &&
            h("feature-list", { key: '9d72181a778e08b632d802689a66fa21924cd5b3', class: "height-full", mapView: this.mapView, onFeatureSelect: (e) => { this.commentSelect.emit(e.detail); }, pageSize: 5, ref: el => this._commentsList = el, selectedLayerId: this.relatedTableId, showErrorWhenNoFeatures: false, showInitialLoading: false, showUserImageInList: this.showUserImageInCommentsList, textSize: "small", whereClause: commentsListWhereClause })));
    }
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _initModules() {
        const [RelationshipQuery, Graphic] = await loadModules([
            "esri/rest/support/RelationshipQuery",
            "esri/Graphic"
        ]);
        this.RelationshipQuery = RelationshipQuery;
        this.Graphic = Graphic;
    }
    /**
     * Get complete graphic with complete attributes
     * @param graphic selected feature graphic
     * @protected
     */
    async getCompleteGraphic(graphic) {
        if (graphic) {
            const layer = graphic.layer;
            const query = layer.createQuery();
            query.objectIds = [graphic.getObjectId()];
            const completeGraphic = await layer.queryFeatures(query);
            this._selectedGraphic = completeGraphic.features[0];
        }
    }
    /**
     * Process the comments functionality.
     * If comments are configured, fetches the related comments ans creates the input for comments list
     * @protected
     */
    async processComments() {
        const selectedLayer = this._selectedGraphic.layer;
        const commentsConfigured = this.reportingOptions && this.reportingOptions[selectedLayer.id] &&
            this.reportingOptions[selectedLayer.id].comment && selectedLayer.relationships?.length > 0;
        if (commentsConfigured) {
            //Get comments table id from map
            const allTables = await getAllTables(this.mapView);
            let relatedTable = null;
            let validRelationshipId = null;
            selectedLayer.relationships.some((relationship) => {
                const relatedTables = allTables.filter((table) => selectedLayer.url === table.url && table.layerId === relationship.relatedTableId);
                if (relatedTables && relatedTables.length > 0) {
                    relatedTable = relatedTables[0];
                    validRelationshipId = relationship.id;
                    return true;
                }
            });
            this.relatedTableId = relatedTable?.id ?? '';
            //**Get the related records for the current selected feature**
            if (this.relatedTableId) {
                //current selected feature's objectId
                const objectId = this._selectedGraphic.attributes[selectedLayer.objectIdField];
                //create relationship query to get all the related records with the current selected feature
                const relationshipQuery = new this.RelationshipQuery({
                    objectIds: [objectId],
                    outFields: ['*'],
                    relationshipId: validRelationshipId
                });
                const result = await selectedLayer.queryRelatedFeatures(relationshipQuery).catch((e) => {
                    console.error(e);
                });
                const relatedOIDs = [];
                if (result[objectId]) {
                    result[objectId].features.forEach((feature) => {
                        relatedOIDs.push(feature.attributes[relatedTable.objectIdField]);
                    });
                }
                // Store the objectid's of the related features, this will be used to show the comments and its count
                this._relatedFeaturesOIDs = relatedOIDs;
                //Set comments available or not
                this._commentsAvailable = true;
            }
            else {
                this._relatedFeaturesOIDs = [];
                this._commentsAvailable = false;
            }
        }
        else {
            this._relatedFeaturesOIDs = [];
            this._commentsAvailable = false;
            this.relatedTableId = '';
        }
    }
    /**
     * Checks if the layers is configured for like dislike or not
     * @param selectedLayer Feature layer
     * @returns boolean
     * @protected
     */
    isLikeDislikeConfigured(selectedLayer) {
        let likeFieldAvailable = false;
        let dislikeFieldAvailable = false;
        // check if reporting options are configured for the current selected feature's layer
        if (this.reportingOptions && this.reportingOptions[selectedLayer.id]) {
            //return false if both like and dislike are disabled for the layer
            if (!this.reportingOptions[selectedLayer.id].like && !this.reportingOptions[selectedLayer.id].dislike) {
                return false;
            }
            const likeField = this.reportingOptions[selectedLayer.id].likeField;
            const dislikeField = this.reportingOptions[selectedLayer.id].dislikeField;
            //if both fields are not configured return false
            if (!likeField && !dislikeField) {
                return false;
            }
            //Check if selected layer have the configured like and dislike field and it is of integer types
            selectedLayer.fields.forEach((eachField) => {
                if (this._validFieldTypes.indexOf(eachField.type) > -1 && this.layerItemsHash[selectedLayer.id].supportsUpdate) {
                    if (eachField.name === likeField && this.reportingOptions[selectedLayer.id].like) {
                        likeFieldAvailable = true;
                    }
                    else if (eachField.name === dislikeField && this.reportingOptions[selectedLayer.id].dislike) {
                        dislikeFieldAvailable = true;
                    }
                }
            });
        }
        return likeFieldAvailable || dislikeFieldAvailable;
    }
    /**
     * Check if configured like or dislike fields are available in the selected layer
     * @protected
     */
    checkLikeDislikeFields() {
        this._likeFieldAvailable = false;
        this._dislikeFieldAvailable = false;
        this._isLikeBtnClicked = false;
        this._isDislikeBtnClicked = false;
        this._likeCount = 0;
        this._disLikeCount = 0;
        const selectedLayer = this._selectedGraphic.layer;
        // check if reporting options are configured for the current selected feature's layer
        if (this.reportingOptions && this.reportingOptions[selectedLayer.id]) {
            this._likeField = this.reportingOptions[selectedLayer.id].likeField;
            this._dislikeField = this.reportingOptions[selectedLayer.id].dislikeField;
            //if both fields are not found return
            if (!this._likeField && !this._dislikeField) {
                return;
            }
            //Check if selected layer have the configured like and dislike fields
            //also, get the current value for like and dislike field from the attributes
            selectedLayer.fields.forEach((eachField) => {
                if (this._validFieldTypes.indexOf(eachField.type) > -1 && this.layerItemsHash[selectedLayer.id].supportsUpdate) {
                    if (eachField.name === this._likeField && this.reportingOptions[selectedLayer.id].like) {
                        this._likeFieldAvailable = true;
                        this._likeCount = this._selectedGraphic.attributes[eachField.name];
                    }
                    else if (eachField.name === this._dislikeField && this.reportingOptions[selectedLayer.id].dislike) {
                        this._dislikeFieldAvailable = true;
                        this._disLikeCount = this._selectedGraphic.attributes[eachField.name];
                    }
                }
            });
            this.getFromLocalStorage();
        }
    }
    /**
     * On like button click highlight the like button and update the feature
     * @protected
     */
    onLikeButtonClick() {
        if (this._isDislikeBtnClicked && this.reportingOptions[this._selectedGraphic.layer.id].dislike) {
            this.onDislikeButtonClick();
        }
        this._isLikeBtnClicked = !this._isLikeBtnClicked;
        if (this._isLikeBtnClicked) {
            this._likeCount++;
        }
        else {
            this._likeCount--;
        }
        void this.updateFeaturesLikeDislikeField(this._likeField, this._isLikeBtnClicked);
    }
    /**
     * On dislike button click highlight the dislike button and update the feature
     * @protected
     */
    onDislikeButtonClick() {
        if (this._isLikeBtnClicked && this.reportingOptions[this._selectedGraphic.layer.id].like) {
            this.onLikeButtonClick();
        }
        this._isDislikeBtnClicked = !this._isDislikeBtnClicked;
        if (this._isDislikeBtnClicked) {
            this._disLikeCount++;
        }
        else {
            this._disLikeCount--;
        }
        void this.updateFeaturesLikeDislikeField(this._dislikeField, this._isDislikeBtnClicked);
    }
    /**
     * Update the feature if user click on like or dislike button
     * @param fieldName field name of the feature for like or dislike attribute
     * @param buttonClicked is like or dislike button clicked
     * @protected
     */
    async updateFeaturesLikeDislikeField(fieldName, buttonClicked) {
        const attributesToUpdate = {};
        const selectedLayer = this._selectedGraphic.layer;
        this._updating = true;
        //Increment the value if button is clicked or else decrement it
        const selectFeatureAttr = this._selectedGraphic;
        selectFeatureAttr.attributes[fieldName] = Number(selectFeatureAttr.attributes[fieldName]) + (buttonClicked ? 1 : -1);
        //use the oid and like/dislike field value to update
        attributesToUpdate[selectedLayer.objectIdField] = selectFeatureAttr.attributes[selectedLayer.objectIdField];
        attributesToUpdate[fieldName] = selectFeatureAttr.attributes[fieldName];
        const newGraphicInstance = new this.Graphic();
        newGraphicInstance.attributes = attributesToUpdate;
        // Update the feature attribute in the feature layer
        const param = { updateFeatures: [newGraphicInstance] };
        await selectedLayer.applyEdits(param).then(() => {
            this._selectedGraphic = selectFeatureAttr;
            //store the like dislike value for the current selected graphic in local storage
            this.setInLocalStorage();
            this._updating = false;
            this.likeOrDislikeClicked.emit();
        }, (err) => {
            this._updating = false;
            console.log(err);
        });
    }
    /**
     * Gets the like/dislike information form local storage and updates the like and dislike button states
     * @protected
     */
    getFromLocalStorage() {
        const uniqueLayerId = this._selectedGraphic.layer.id;
        //get the data from local storage and check current feature is liked or disliked
        const localStorageUser = localStorage[uniqueLayerId];
        if (localStorageUser) {
            const parseArr = JSON.parse(localStorageUser);
            const res = parseArr.filter((arr) => arr.id === this._selectedGraphic.getObjectId());
            if (res.length > 0) {
                this._isLikeBtnClicked = res[0].like;
                this._isDislikeBtnClicked = res[0].dislike;
            }
        }
    }
    /**
     * Sets the like/dislike information for the current selected graphic in local storage
     * @protected
     */
    setInLocalStorage() {
        const uniqueLayerId = this._selectedGraphic.layer.id;
        const localStorageInfo = localStorage[uniqueLayerId];
        let information = [];
        //if information for the current layer found in local storage update it
        //else add new information for the current layer in the local storage
        if (localStorageInfo) {
            information = JSON.parse(localStorageInfo);
            const index = information.findIndex((arr) => arr.id === this._selectedGraphic.getObjectId());
            //if information for current objectid found delete it, so that we always have info for each oid in a layer only once
            if (index >= 0) {
                information.splice(index, 1);
            }
        }
        //add the information for current selected graphic
        information.push({
            id: this._selectedGraphic.getObjectId(),
            like: this._isLikeBtnClicked && this._likeCount !== 0,
            dislike: this._isDislikeBtnClicked && this._disLikeCount !== 0
        });
        localStorage.setItem(uniqueLayerId, JSON.stringify(information));
    }
    static get watchers() { return {
        "graphics": ["graphicsWatchHandler"]
    }; }
};
FeatureDetails.style = FeatureDetailsStyle0;

const layerListCss = ":host{display:block}.error-msg{padding:10px}.layer-name{font-weight:500;padding:10px 12px}.feature-count{padding-right:12px}";
const LayerListStyle0 = layerListCss;

const LayerList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.layerSelect = createEvent(this, "layerSelect", 7);
        this.layersListLoaded = createEvent(this, "layersListLoaded", 7);
        this.mapView = undefined;
        this.layers = undefined;
        this.showFeatureCount = true;
        this.showNextIcon = false;
        this.applyLayerViewFilter = false;
        this._noLayersToDisplay = false;
        this._mapLayerIds = [];
        this._isLoading = false;
        this._translations = undefined;
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * ILayerItemHash: id/name lookup
     */
    _layerItemsHash;
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
    /**
     * Refresh the layer list which will fetch the latest layer count and update the list
     * @returns Promise that resolves when the operation is complete
     */
    async refresh() {
        await this.setLayers();
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when feature layer clicked with details layerId and layerName
     */
    layerSelect;
    /**
     * Emitted on demand when list of layers to be listed are created.
     * When empty array received in this event means no valid layers are found to be listed
     */
    layersListLoaded;
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
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this.setLayers();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Fragment, { key: 'f8e0c21d4ff87d663a1e0f00f1d9ef1123091db9' }, this._isLoading && h("calcite-loader", { key: '42058be6b41126e58d33895bc237b174e55a16ed', label: "", scale: "m" }), !this._isLoading && this.mapView && this._noLayersToDisplay &&
            h("calcite-notice", { key: '89d9073a156f07379699cc5b67bf9ba54654cc68', class: "error-msg", icon: "layers-reference", kind: "danger", open: true }, h("div", { key: '730b8dcca79bd45a7a6eecb5030626d1dcd01238', slot: "title" }, this._translations.error), h("div", { key: '656e8276ffab75734909348f49f11492de1d5a8b', slot: "message" }, this._translations.noLayerToDisplayErrorMsg)), !this._isLoading && this.mapView &&
            h("calcite-list", { key: '1d2206d3163b6c5ed8511e32ab296f0025889824', "selection-appearance": "border", "selection-mode": "none" }, this.renderLayerList())));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Fetch the ids of the layers from the map
     * @returns Promise when the operation has completed
     * @protected
     */
    async setLayers() {
        if (this.mapView) {
            this._isLoading = true;
            await this.initLayerHash();
            this._isLoading = false;
        }
    }
    /**
     * Create a layer hash for layer name display
     * @returns Promise when the operation has completed
     * @protected
     */
    async initLayerHash() {
        const def = [];
        this._layerItemsHash = await getMapLayerHash(this.mapView, true);
        const allMapLayers = await getAllLayers(this.mapView);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        for (const eachLayer of allMapLayers) {
            if (eachLayer?.type === "feature") {
                if (this.showFeatureCount) {
                    const q = eachLayer.createQuery();
                    //if layer has definitionExpression append it to the where clause
                    if (eachLayer?.definitionExpression) {
                        q.where = q.where + ' AND ' + eachLayer.definitionExpression;
                    }
                    if (this.applyLayerViewFilter) {
                        const featureLayerView = await getFeatureLayerView(this.mapView, eachLayer.id);
                        if (featureLayerView?.filter?.where) {
                            q.where = q.where ? q.where + ' AND ' + featureLayerView.filter.where : featureLayerView.filter.where;
                        }
                    }
                    const result = eachLayer.queryFeatureCount(q);
                    def.push(result);
                    void result.then(async (resCount) => {
                        const formattedCount = !isNaN(resCount) ? await formatNumber(resCount, {
                            places: 0,
                            api: 4,
                            type: "decimal"
                        }) : "";
                        this._layerItemsHash[eachLayer.id].formattedFeatureCount = formattedCount;
                    });
                }
            }
        }
        await Promise.all(def).then(() => {
            const editableLayerIds = this.getLayersToBeShownInList(this._layerItemsHash);
            this._mapLayerIds = editableLayerIds.reverse();
            this.handleNoLayersToDisplay();
        }, () => {
            this._mapLayerIds = [];
            this.handleNoLayersToDisplay();
        });
    }
    /**
     * Set no layers to display state and emit event
     */
    handleNoLayersToDisplay() {
        this._noLayersToDisplay = !(this._mapLayerIds.length > 0);
        this.layersListLoaded.emit(this._mapLayerIds);
    }
    /**
     * Returns the ids of configured layers that needs to be shown in the list
     * @param hash each layer item details
     * @returns array of layer ids
     */
    getLayersToBeShownInList(hash) {
        const configuredLayers = this.layers?.length > 0 ? this.layers : [];
        return Object.keys(hash).reduce((prev, cur) => {
            if (configuredLayers.indexOf(cur) > -1) {
                prev.push(cur);
            }
            return prev;
        }, []);
    }
    /**
     * Render feature layer list
     * @returns layer list
     * @protected
     */
    renderLayerList() {
        return this._mapLayerIds.length > 0 && this._mapLayerIds.reduce((prev, layerId) => {
            if (this._layerItemsHash[layerId]) {
                prev.push(this.getLayerListItem(layerId));
            }
            return prev;
        }, []);
    }
    /**
     * Get each item
     * @param layerId Layer id
     * @returns individual item
     * @protected
     */
    getLayerListItem(layerId) {
        const layerName = this._layerItemsHash[layerId].name;
        const featureCount = this._layerItemsHash[layerId].formattedFeatureCount;
        return (h("calcite-list-item", { onCalciteListItemSelect: () => { this.onLayerItemSelected(layerId); } }, h("div", { class: "layer-name", slot: "content-start" }, layerName), this.showFeatureCount && featureCount !== undefined && featureCount !== "" && h("div", { class: !this.showNextIcon ? "feature-count" : "", slot: "content-end" }, "(" + featureCount + ")"), this.showNextIcon && h("calcite-icon", { flipRtl: true, icon: "chevron-right", scale: "s", slot: "content-end" })));
    }
    /**On click of layer list item emit the event along with the selected layerId and layerName
     * @param layerId Layer id
     * @protected
     */
    onLayerItemSelected(layerId) {
        this.layerSelect.emit({ layerId, layerName: this._layerItemsHash[layerId].name });
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
};
LayerList.style = LayerListStyle0;

export { Flow as calcite_flow, CreateRelatedFeature as create_related_feature, FeatureDetails as feature_details, LayerList as layer_list };
