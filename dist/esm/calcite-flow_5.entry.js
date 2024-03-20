/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, g as getElement, c as createEvent, H as Host, F as Fragment } from './index-164d485a.js';
import { c as createObserver } from './observers-d04d1da9.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable-37e7fbd6.js';
import { a as getElementDir } from './dom-38c6f027.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './interactive-39bf5602.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale-904407bf.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './t9n-436fb2b1.js';
import { S as SLOTS$1 } from './resources-00983bd3.js';
import { l as loadModules, g as getLocaleComponentStrings, f as formatNumber } from './locale-bcbea4ef.js';
import { a as getAllLayers, g as getLayerOrTable, b as getFeatureLayerView, h as highlightFeatures, d as getMapLayerHash } from './mapViewUtils-20504620.js';
import { P as PopupUtils } from './popupUtils-af124b47.js';
import './guid-b75a5f7b.js';
import './resources-8834f920.js';
import './browser-d60104bd.js';
import './key-c83d835f.js';
import './esri-loader-1b324844.js';
import './_commonjsHelpers-0f74c230.js';
import './interfaces-586e863c.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS$1 = {
    frame: "frame",
    frameAdvancing: "frame--advancing",
    frameRetreating: "frame--retreating",
};

const flowCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto;align-items:stretch;overflow:hidden;background-color:transparent}:host .frame{position:relative;margin:0px;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;padding:0px}:host ::slotted(calcite-flow-item),:host ::slotted(calcite-panel){block-size:100%}:host ::slotted(.calcite-match-height:last-child){display:flex;flex:1 1 auto;overflow:hidden}:host .frame--advancing{animation:calcite-frame-advance var(--calcite-animation-timing)}:host .frame--retreating{animation:calcite-frame-retreat var(--calcite-animation-timing)}@keyframes calcite-frame-advance{0%{--tw-bg-opacity:0.5;transform:translate3d(50px, 0, 0)}100%{--tw-bg-opacity:1;transform:translate3d(0, 0, 0)}}@keyframes calcite-frame-retreat{0%{--tw-bg-opacity:0.5;transform:translate3d(-50px, 0, 0)}100%{--tw-bg-opacity:1;transform:translate3d(0, 0, 0)}}:host([hidden]){display:none}[hidden]{display:none}";

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
        return activeItem === null || activeItem === void 0 ? void 0 : activeItem.setFocus();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        var _a;
        (_a = this.itemMutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
        this.updateFlowProps();
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        var _a;
        (_a = this.itemMutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
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
            [CSS$1.frame]: true,
            [CSS$1.frameAdvancing]: flowDirection === "advancing",
            [CSS$1.frameRetreating]: flowDirection === "retreating",
        };
        return (h("div", { class: frameDirectionClasses }, h("slot", null)));
    }
    get el() { return getElement(this); }
};
Flow.style = flowCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    backButton: "back-button",
};
const ICONS = {
    backLeft: "chevron-left",
    backRight: "chevron-right",
};
const SLOTS = {
    actionBar: "action-bar",
    headerActionsStart: "header-actions-start",
    headerActionsEnd: "header-actions-end",
    headerMenuActions: "header-menu-actions",
    headerContent: "header-content",
    fab: "fab",
    footer: "footer",
    footerActions: "footer-actions",
};

const flowItemCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.back-button{border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);border-inline-end-width:1px}calcite-panel{--calcite-panel-footer-padding:var(--calcite-flow-item-footer-padding);--calcite-panel-header-border-block-end:var(--calcite-flow-item-header-border-block-end)}:host([hidden]){display:none}[hidden]{display:none}";

const FlowItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteFlowItemBack = createEvent(this, "calciteFlowItemBack", 7);
        this.calciteFlowItemScroll = createEvent(this, "calciteFlowItemScroll", 6);
        this.calciteFlowItemClose = createEvent(this, "calciteFlowItemClose", 6);
        this.calciteFlowItemToggle = createEvent(this, "calciteFlowItemToggle", 6);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handlePanelScroll = (event) => {
            event.stopPropagation();
            this.calciteFlowItemScroll.emit();
        };
        this.handlePanelClose = (event) => {
            event.stopPropagation();
            this.calciteFlowItemClose.emit();
        };
        this.handlePanelToggle = (event) => {
            event.stopPropagation();
            this.collapsed = event.target.collapsed;
            this.calciteFlowItemToggle.emit();
        };
        this.backButtonClick = () => {
            this.calciteFlowItemBack.emit();
        };
        this.setBackRef = (node) => {
            this.backButtonEl = node;
        };
        this.setContainerRef = (node) => {
            this.containerEl = node;
        };
        this.closable = false;
        this.closed = false;
        this.collapsed = false;
        this.collapseDirection = "down";
        this.collapsible = false;
        this.beforeBack = undefined;
        this.description = undefined;
        this.disabled = false;
        this.heading = undefined;
        this.headingLevel = undefined;
        this.loading = false;
        this.menuOpen = false;
        this.messageOverrides = undefined;
        this.messages = undefined;
        this.overlayPositioning = "absolute";
        this.showBackButton = false;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectInteractive(this);
        connectLocalized(this);
        connectMessages(this);
    }
    async componentWillLoad() {
        await setUpMessages(this);
        setUpLoadableComponent(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Sets focus on the component.
     *
     * @returns promise.
     */
    async setFocus() {
        await componentFocusable(this);
        const { backButtonEl, containerEl } = this;
        if (backButtonEl) {
            return backButtonEl.setFocus();
        }
        else if (containerEl) {
            return containerEl.setFocus();
        }
    }
    /**
     * Scrolls the component's content to a specified set of coordinates.
     *
     * @example
     * myCalciteFlowItem.scrollContentTo({
     *   left: 0, // Specifies the number of pixels along the X axis to scroll the window or element.
     *   top: 0, // Specifies the number of pixels along the Y axis to scroll the window or element
     *   behavior: "auto" // Specifies whether the scrolling should animate smoothly (smooth), or happen instantly in a single jump (auto, the default value).
     * });
     * @param options - allows specific coordinates to be defined.
     * @returns - promise that resolves once the content is scrolled to.
     */
    async scrollContentTo(options) {
        var _a;
        await ((_a = this.containerEl) === null || _a === void 0 ? void 0 : _a.scrollContentTo(options));
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderBackButton() {
        const { el } = this;
        const rtl = getElementDir(el) === "rtl";
        const { showBackButton, backButtonClick, messages } = this;
        const label = messages.back;
        const icon = rtl ? ICONS.backRight : ICONS.backLeft;
        return showBackButton ? (h("calcite-action", { "aria-label": label, class: CSS.backButton, icon: icon, key: "flow-back-button", onClick: backButtonClick, scale: "s", slot: "header-actions-start", text: label, title: label,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setBackRef })) : null;
    }
    render() {
        const { collapsed, collapseDirection, collapsible, closable, closed, description, disabled, heading, headingLevel, loading, menuOpen, messages, overlayPositioning, } = this;
        return (h(Host, null, h(InteractiveContainer, { disabled: disabled }, h("calcite-panel", { closable: closable, closed: closed, collapseDirection: collapseDirection, collapsed: collapsed, collapsible: collapsible, description: description, disabled: disabled, heading: heading, headingLevel: headingLevel, loading: loading, menuOpen: menuOpen, messageOverrides: messages, onCalcitePanelClose: this.handlePanelClose, onCalcitePanelScroll: this.handlePanelScroll, onCalcitePanelToggle: this.handlePanelToggle, overlayPositioning: overlayPositioning,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setContainerRef }, this.renderBackButton(), h("slot", { name: SLOTS.actionBar, slot: SLOTS$1.actionBar }), h("slot", { name: SLOTS.headerActionsStart, slot: SLOTS$1.headerActionsStart }), h("slot", { name: SLOTS.headerActionsEnd, slot: SLOTS$1.headerActionsEnd }), h("slot", { name: SLOTS.headerContent, slot: SLOTS$1.headerContent }), h("slot", { name: SLOTS.headerMenuActions, slot: SLOTS$1.headerMenuActions }), h("slot", { name: SLOTS.fab, slot: SLOTS$1.fab }), h("slot", { name: SLOTS.footerActions, slot: SLOTS$1.footerActions }), h("slot", { name: SLOTS.footer, slot: SLOTS$1.footer }), h("slot", null)))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
FlowItem.style = flowItemCss;

const createFeatureCss = ":host{display:block}.esri-editor__panel-toolbar{display:none !important}.esri-editor__update-actions{display:none !important}.esri-editor__panel-content{padding-block:0px !important}.esri-editor .esri-item-list__group__header{display:none !important}.esri-editor__panel-content__section .esri-widget__heading{display:none !important}.esri-editor .esri-item-list__filter-container--sticky{padding-block:0px !important;padding-inline:10px !important}";

const CreateFeature = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "mapView": ["mapViewWatchHandler"]
    }; }
};
CreateFeature.style = createFeatureCss;

const featureListCss = ":host{display:block}.width-full{width:100%}.pagination{display:flex;justify-content:center}.error-msg{padding:10px;width:calc(100% - 20px)}.popup-title{font-weight:500;padding:10px 12px}";

const FeatureList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.featureSelect = createEvent(this, "featureSelect", 7);
        this.selectedLayerId = undefined;
        this.mapView = undefined;
        this.noFeaturesFoundMsg = undefined;
        this.pageSize = 100;
        this.highlightOnMap = false;
        this._featureItems = [];
        this._featuresCount = 0;
        this._isLoading = false;
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Watch for selectedLayerId change and update layer instance and features list for new layerId
     */
    async selectedLayerWatchHandler() {
        this._selectedLayer = await getLayerOrTable(this.mapView, this.selectedLayerId);
        await this.initializeFeatureItems();
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
        await this._getTranslations();
        this._isLoading = true;
        this._popupUtils = new PopupUtils();
        if (this.mapView && this.selectedLayerId) {
            this._selectedLayer = await getLayerOrTable(this.mapView, this.selectedLayerId);
        }
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this.initializeFeatureItems();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h("calcite-panel", { "full-height": true, "full-width": true }, this._isLoading && h("calcite-loader", { label: "", scale: "m" }), this._featureItems.length === 0 && !this._isLoading &&
            h("calcite-notice", { class: "error-msg", icon: "feature-details", kind: "info", open: true }, h("div", { slot: "message" }, this.noFeaturesFoundMsg ? this.noFeaturesFoundMsg : this._translations.featureErrorMsg)), h("calcite-list", { "selection-appearance": "border", "selection-mode": "none" }, !this._isLoading && this._featureItems.length > 0 && this._featureItems), this._featuresCount > this.pageSize &&
            h("div", { class: "width-full", slot: "footer" }, h("calcite-pagination", { class: "pagination", "full-width": true, onCalcitePaginationChange: this.pageChanged.bind(this), "page-size": this.pageSize, "start-item": "1", "total-items": this._featuresCount }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Initialize the features list using the selected layer
     * @protected
     */
    async initializeFeatureItems() {
        if (this._selectedLayer) {
            this._isLoading = true;
            this._featureItems = await this.queryPage(0);
            this._featuresCount = await this._selectedLayer.queryFeatureCount();
            this._isLoading = false;
        }
    }
    /**
     * On page change get the next updated feature list
     * @param event page change event
     * @protected
     */
    async pageChanged(event) {
        this._isLoading = true;
        if (this._highlightHandle) {
            this._highlightHandle.remove();
            this._highlightHandle = null;
        }
        const page = event.target.startItem - 1;
        this._featureItems = await this.queryPage(page);
        this._isLoading = false;
    }
    /**
     * On feature click in feature list highlight the feature on the map
     * @param event feature clicked event
     * @param selectedFeature selected feature graphic
     * @protected
     */
    async featureClicked(event, selectedFeature) {
        //clear previous highlight and remove the highlightHandle
        if (this.highlightOnMap && this._highlightHandle) {
            this._highlightHandle.remove();
            this._highlightHandle = null;
        }
        //highlight on map only if it is selected item
        if (this.highlightOnMap) {
            const selectedFeatureObjectId = Number(event.target.value);
            const selectedLayerView = await getFeatureLayerView(this.mapView, this.selectedLayerId);
            this._highlightHandle = await highlightFeatures([selectedFeatureObjectId], selectedLayerView, this.mapView, true);
        }
        this.featureSelect.emit(selectedFeature);
    }
    /**
     * Query the selected feature layer, in descending order of object id's
     * @param page 0th page number in the pagination item
     * @returns List of features items to be rendered
     * @protected
     */
    async queryPage(page) {
        const featureLayer = this._selectedLayer;
        const objectIdField = featureLayer.objectIdField;
        const query = {
            start: page,
            num: this.pageSize,
            outFields: ["*"],
            returnGeometry: true,
            where: featureLayer.definitionExpression,
            outSpatialReference: this.mapView.spatialReference.toJSON()
        };
        //sort only when objectId field is found
        if (objectIdField) {
            query.orderByFields = [objectIdField.toString() + " DESC"];
        }
        const featureSet = await featureLayer.queryFeatures(query);
        return await this.createFeatureItem(featureSet);
    }
    /**
     * Creates list of items using the popup titles
     * @param featureSet Queried FeatureSet
     * @returns List of features items to be rendered
     * @protected
     */
    async createFeatureItem(featureSet) {
        const currentFeatures = featureSet === null || featureSet === void 0 ? void 0 : featureSet.features;
        const items = currentFeatures.map(async (feature) => {
            const popupTitle = await this._popupUtils.getPopupTitle(feature, this.mapView.map);
            return this.getFeatureItem(feature, popupTitle);
        });
        return Promise.all(items);
    }
    /**
     * Get each feature item
     * @param selectedFeature Each individual feature instance to be listed
     * @param popupTitle feature popup title
     * @returns individual feature item to be rendered
     * @protected
     */
    getFeatureItem(selectedFeature, popupTitle) {
        //get the object id value of the feature
        const oId = selectedFeature.attributes[this._selectedLayer.objectIdField].toString();
        //use object id if popupTitle is null or undefined
        popupTitle = popupTitle !== null && popupTitle !== void 0 ? popupTitle : oId;
        return (h("calcite-list-item", { onCalciteListItemSelect: (e) => { void this.featureClicked(e, selectedFeature); }, value: oId }, h("div", { class: "popup-title", slot: "content-start" }, popupTitle), h("calcite-icon", { icon: "chevron-right", scale: "s", slot: "content-end" })));
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "selectedLayerId": ["selectedLayerWatchHandler"]
    }; }
};
FeatureList.style = featureListCss;

const layerListCss = ":host{display:block}.error-msg{padding:10px}.layer-name{font-weight:500;padding:10px 12px}.feature-count{padding-right:12px}";

const LayerList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.layerSelect = createEvent(this, "layerSelect", 7);
        this.layersListLoaded = createEvent(this, "layersListLoaded", 7);
        //HARDCODED IN EN
        this._noLayerToDisplayErrorMsg = "Web map does not contain any editable layers.";
        this.mapView = undefined;
        this.layers = undefined;
        this.noLayerErrorMsg = undefined;
        this.showFeatureCount = true;
        this.showNextIcon = false;
        this._noLayersToDisplay = false;
        this._mapLayerIds = [];
        this._isLoading = false;
        this._translations = undefined;
    }
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
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
        this._isLoading = true;
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        await this.setLayers();
        this._isLoading = false;
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Fragment, null, this._isLoading && h("calcite-loader", { label: "", scale: "m" }), !this._isLoading && this.mapView && this._noLayersToDisplay &&
            h("calcite-notice", { class: "error-msg", icon: "layers-reference", kind: "danger", open: true }, h("div", { slot: "title" }, this._translations.error), h("div", { slot: "message" }, this.noLayerErrorMsg ? this.noLayerErrorMsg : this._noLayerToDisplayErrorMsg)), !this._isLoading && this.mapView &&
            h("calcite-list", { "selection-appearance": "border", "selection-mode": this.showNextIcon ? "none" : "single-persist" }, this.renderLayerList())));
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
            await this.initLayerHash();
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
        allMapLayers.forEach(async (eachLayer) => {
            var _a, _b;
            //TODO: checking editable condition could be configurable
            if ((eachLayer === null || eachLayer === void 0 ? void 0 : eachLayer.type) === "feature" && (eachLayer === null || eachLayer === void 0 ? void 0 : eachLayer.editingEnabled) && ((_b = (_a = eachLayer === null || eachLayer === void 0 ? void 0 : eachLayer.capabilities) === null || _a === void 0 ? void 0 : _a.operations) === null || _b === void 0 ? void 0 : _b.supportsAdd)) {
                this._layerItemsHash[eachLayer.id].supportsAdd = true;
                if (this.showFeatureCount) {
                    const q = eachLayer.createQuery();
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
        });
        await Promise.all(def).then(() => {
            const editableLayerIds = this.getEditableIds(this._layerItemsHash);
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
     * Returns the ids of all OR configured layers that support edits with the update capability
     * @param hash each layer item details
     * @returns array of layer ids
     */
    getEditableIds(hash) {
        var _a;
        const configuredLayers = ((_a = this.layers) === null || _a === void 0 ? void 0 : _a.length) > 0 ? this.layers : [];
        return Object.keys(hash).reduce((prev, cur) => {
            let showLayer = hash[cur].supportsAdd;
            if ((configuredLayers === null || configuredLayers === void 0 ? void 0 : configuredLayers.length) > 0) {
                showLayer = configuredLayers.indexOf(cur) > -1 ? hash[cur].supportsAdd : false;
            }
            if (showLayer) {
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
        return (h("calcite-list-item", { onCalciteListItemSelect: () => { this.onLayerItemSelected(layerId); } }, h("div", { class: "layer-name", slot: "content-start" }, layerName), this.showFeatureCount && featureCount !== undefined && featureCount !== "" && h("div", { class: !this.showNextIcon ? "feature-count" : "", slot: "content-end" }, "(" + featureCount + ")"), this.showNextIcon && h("calcite-icon", { icon: "chevron-right", scale: "s", slot: "content-end" })));
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
    get el() { return getElement(this); }
};
LayerList.style = layerListCss;

export { Flow as calcite_flow, FlowItem as calcite_flow_item, CreateFeature as create_feature, FeatureList as feature_list, LayerList as layer_list };
