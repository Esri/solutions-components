/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, g as getElement, c as createEvent, H as Host, F as Fragment } from './p-6eb37ed2.js';
import { c as createObserver } from './p-c638d28e.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './p-18f18ab3.js';
import { a as getElementDir } from './p-68ec5c15.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './p-415cf05e.js';
import { c as connectLocalized, d as disconnectLocalized } from './p-939bc1b4.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './p-1a9a47a0.js';
import { S as SLOTS$1 } from './p-56601650.js';
import { l as loadModules, f as formatNumber, g as getLocaleComponentStrings } from './p-2058b5d9.js';
import { a as getAllLayers, g as getLayerOrTable, b as getAllTables, d as getMapLayerHash, c as getFeatureLayerView } from './p-eb483242.js';
import './p-acaae81d.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';
import './p-fe6f7734.js';
import './p-0a24ad5f.js';
import './p-d4056c1c.js';
import './p-80cb7c73.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS$1 = {
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
            [CSS$1.frame]: true,
            [CSS$1.frameAdvancing]: flowDirection === "advancing",
            [CSS$1.frameRetreating]: flowDirection === "retreating",
        };
        return (h("div", { key: '93590e2eec869cef65a59c01aa2c6001b431da9a', class: frameDirectionClasses }, h("slot", { key: '5b97e4147abb053391f170f5e36bac4670934072' })));
    }
    get el() { return getElement(this); }
};
Flow.style = CalciteFlowStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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
    alerts: "alerts",
    contentTop: "content-top",
    contentBottom: "content-bottom",
    headerActionsStart: "header-actions-start",
    headerActionsEnd: "header-actions-end",
    headerMenuActions: "header-menu-actions",
    headerContent: "header-content",
    fab: "fab",
    footer: "footer",
    footerActions: "footer-actions",
    footerEnd: "footer-end",
    footerStart: "footer-start",
};

const flowItemCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;inline-size:100%;flex:1 1 auto;overflow:hidden}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.back-button{border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);border-inline-end-width:1px}calcite-panel{--calcite-panel-footer-padding:var(--calcite-flow-item-footer-padding);--calcite-panel-header-border-block-end:var(--calcite-flow-item-header-border-block-end)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteFlowItemStyle0 = flowItemCss;

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
        this.handleInternalPanelScroll = (event) => {
            if (event.target !== this.containerEl) {
                return;
            }
            event.stopPropagation();
            this.calciteFlowItemScroll.emit();
        };
        this.handleInternalPanelClose = (event) => {
            if (event.target !== this.containerEl) {
                return;
            }
            event.stopPropagation();
            this.closed = true;
            this.calciteFlowItemClose.emit();
        };
        this.handleInternalPanelToggle = (event) => {
            if (event.target !== this.containerEl) {
                return;
            }
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
        this.beforeClose = undefined;
        this.description = undefined;
        this.disabled = false;
        this.heading = undefined;
        this.headingLevel = undefined;
        this.loading = false;
        this.menuOpen = false;
        this.messageOverrides = undefined;
        this.messages = undefined;
        this.overlayPositioning = "absolute";
        this.scale = "m";
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
        await this.containerEl?.scrollContentTo(options);
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
        return showBackButton ? (h("calcite-action", { "aria-label": label, class: CSS.backButton, icon: icon, key: "flow-back-button", onClick: backButtonClick, ref: this.setBackRef, scale: "s", slot: "header-actions-start", text: label, title: label })) : null;
    }
    render() {
        const { collapsed, collapseDirection, collapsible, closable, closed, description, disabled, heading, headingLevel, loading, menuOpen, messages, overlayPositioning, beforeClose, } = this;
        return (h(Host, { key: '166a2f53829cecc09019a7fa3fe670b5e4e42146' }, h(InteractiveContainer, { key: '53f00fb0e5ec53b8a19efde1592e1bff176302d1', disabled: disabled }, h("calcite-panel", { key: 'a24ff76af240b1403ebfa5810bc8fe0443901040', beforeClose: beforeClose, closable: closable, closed: closed, collapseDirection: collapseDirection, collapsed: collapsed, collapsible: collapsible, description: description, disabled: disabled, heading: heading, headingLevel: headingLevel, loading: loading, menuOpen: menuOpen, messageOverrides: messages, onCalcitePanelClose: this.handleInternalPanelClose, onCalcitePanelScroll: this.handleInternalPanelScroll, onCalcitePanelToggle: this.handleInternalPanelToggle, overlayPositioning: overlayPositioning, ref: this.setContainerRef, scale: this.scale }, this.renderBackButton(), h("slot", { key: '9051287e5b89eaca28b440816cbcddc03cefed73', name: SLOTS.actionBar, slot: SLOTS$1.actionBar }), h("slot", { key: '566fb396078d3eac17fbff69e0cd43fb5b8ca13e', name: SLOTS.alerts, slot: SLOTS$1.alerts }), h("slot", { key: '88ced257238e369cd99250c9d5a93fa03746fbd5', name: SLOTS.headerActionsStart, slot: SLOTS$1.headerActionsStart }), h("slot", { key: 'beab9f93af9deed383adc8250ec943b883e058b8', name: SLOTS.headerActionsEnd, slot: SLOTS$1.headerActionsEnd }), h("slot", { key: '1f1c7579d1ac1085004b08d2f57ec8b9e0641e35', name: SLOTS.headerContent, slot: SLOTS$1.headerContent }), h("slot", { key: '3696e4a7e80db48581f438336007a1b63a201040', name: SLOTS.headerMenuActions, slot: SLOTS$1.headerMenuActions }), h("slot", { key: '370e0817cbc13d7cf4c8adaccff8fe9d7c91c859', name: SLOTS.fab, slot: SLOTS$1.fab }), h("slot", { key: 'd55cc859cb1c9c6cc80a63521aad955f6e23d31c', name: SLOTS.contentTop, slot: SLOTS$1.contentTop }), h("slot", { key: '7cea1750cd59d1fdda66516c9b4c78884127dde5', name: SLOTS.contentBottom, slot: SLOTS$1.contentBottom }), h("slot", { key: 'd07ed2f97623023312cdb0a5a01b909286f34373', name: SLOTS.footerStart, slot: SLOTS$1.footerStart }), h("slot", { key: 'fdc209c1e77fd62cadaaad0ee576e71a1f0419d8', name: SLOTS.footer, slot: SLOTS$1.footer }), h("slot", { key: '5348d32cc42b7fa3b07e4b5ef711863f6ce812bc', name: SLOTS.footerEnd, slot: SLOTS$1.footerEnd }), h("slot", { key: 'bad7644787a3ad19ef40931fb38cfe9c18962b27', name: SLOTS.footerActions, slot: SLOTS$1.footerActions }), h("slot", { key: '97675398537cc86f41a219126e17bcf24cf4682b' })))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
FlowItem.style = CalciteFlowItemStyle0;

const createFeatureCss = ":host{display:block}.esri-editor__panel-toolbar{display:none !important}.esri-editor__update-actions{display:none !important}.esri-editor__panel-content{padding-block:0px !important}.esri-editor .esri-item-list__group__header{display:none !important}.esri-editor__panel-content__section .esri-widget__heading{display:none !important}.esri-editor .esri-item-list__filter-container--sticky{padding-block:0px !important;padding-inline:10px !important}.search-widget{width:92% !important;margin:5px 0 20px 14px}.display-none{display:none !important}.hide-map{height:1%;visibility:hidden}.show-map{padding:10px !important;position:absolute;bottom:0;width:calc(100% - 22px);height:50%}";
const CreateFeatureStyle0 = createFeatureCss;

const CreateFeature = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        // const attachmentHandle = this.reactiveUtils.watch(
        //   () =>  this._editor.viewModel.state,
        //   (state) => {
        //     console.log('create-feature attachmentHandle')
        //     if (state === 'adding-attachment' || state === 'editing-attachment') {
        //       this._addingAttachment = true;
        //       this.editingAttachment.emit(true);
        //     } else {
        //       if (this._addingAttachment) {
        //         this.editingAttachment.emit(false);
        //         this._addingAttachment = false;
        //       }
        //     }
        //   });
        // this._editor.viewModel.addHandles(attachmentHandle);
        //Add handle to watch featureTemplatesViewModel ready state and then start the creation
        // THIS MAKES IT NOT WORK AT ALL
        const handle = this.reactiveUtils.watch(() => this._editor.viewModel.featureTemplatesViewModel.state, (state) => {
            console.log('create-feature featureTemplatesViewModel.state');
            if (state === 'ready') {
                this.progressStatus.emit(0.5);
                this._editorLoading = true;
            }
        });
        this._editor.viewModel.addHandles(handle);
        //Add handle to watch featureFormViewModel ready state
        // const formHandle = this.reactiveUtils.watch(
        //   () => this._editor.viewModel.featureFormViewModel?.state,
        //   (state) => {
        //     console.log('create-feature featureFormViewModel.state')
        //     if (state === 'ready') {
        //       this._mapViewContainer?.classList?.replace("show-map", "hide-map");
        //       void this._setFloorLevel(this.floorLevel);
        //       this._showSearchWidget = false;
        //       this.progressStatus.emit(1);
        //       this.drawComplete.emit();
        //     }
        //   });
        // this._editor.viewModel.addHandles(formHandle);
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
        //await this.timeout(700);
        //hides the header and footer on the featureForm
        // this.el.querySelector('.esri-editor')?.querySelectorAll('calcite-flow-item')?.forEach((flowItem) => {
        //   const article = flowItem.shadowRoot?.querySelector('calcite-panel')?.shadowRoot?.querySelector('article');
        //   //hide the header
        //   article?.querySelector('header')?.setAttribute('style', 'display: none');
        //   //hide the footer
        //   article?.querySelector('footer')?.setAttribute('style', 'display: none');
        // });
    }
    /**
     * On creation of feature emit the event that the feature is created
     * @param evt feature submit event
     * @protected
     */
    async submitted(evt) {
        console.log("===================submitted===========================");
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
};
CreateFeature.style = CreateFeatureStyle0;

const createRelatedFeatureCss = ":host{display:block}.esri-editor__panel-toolbar{display:none !important}.display-none{display:none !important}";
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
        this._editorLoading = false;
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
        return (h("calcite-loader", { key: 'f78b296f74ee01aadc0443abd0bb78b68a7d9f3e', class: loaderClass, label: "", scale: "s" }));
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
};
CreateRelatedFeature.style = CreateRelatedFeatureStyle0;

const featureDetailsCss = ":host{display:block}.buttons-container{align-items:center;display:flex;padding:4px;color:var(--calcite-color-text-1) !important;background-color:var(--calcite-color-foreground-1) !important;border-block-start:1px solid var(--calcite-color-border-3);border-block-end:1px solid var(--calcite-color-border-3)}.comment-btn{display:flex;gap:10px;font-size:var(--calcite-font-size--1);align-items:center;padding:7px 0.75rem}";
const FeatureDetailsStyle0 = featureDetailsCss;

const FeatureDetails = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.loadingStatus = createEvent(this, "loadingStatus", 7);
        this.commentSelect = createEvent(this, "commentSelect", 7);
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
        return (h("calcite-panel", { key: 'a2d31f643b1a361343eb502ede98a35ea954f244', "full-height": true }, h("info-card", { key: '4ba44decfa3f155034d3edfdf8ab3e7df5f1ea8a', allowEditing: false, graphics: this.graphics, highlightEnabled: false, isLoading: false, isMobile: false, mapView: this.mapView, onSelectionChanged: (e) => { this.featureSelectionChange.emit(e.detail); }, paginationEnabled: false, position: "relative", ref: el => this._infoCard = el }), (this._likeFieldAvailable || this._dislikeFieldAvailable || this._commentsAvailable) &&
            h("div", { key: '0f7af99fd964da408f3131385cfd617138f40151', class: "buttons-container" }, this._commentsAvailable &&
                h("div", { key: '6ce7b090a07db23c542fc7aaacf9cc8a39987483', class: "comment-btn" }, h("span", { key: 'fcce9266efa253c679dcb69f308c07950f5e2693' }, this._relatedFeaturesOIDs.length), h("calcite-icon", { key: '25355a5c195824e473a390f196d28c909c1348eb', icon: "speech-bubble", scale: 's' })), this._likeFieldAvailable &&
                h("calcite-button", { key: '6dca1c0f2ca14f662de98362cbe7ef0993fad6b8', appearance: "transparent", iconEnd: "thumbs-up", kind: this._isLikeBtnClicked ? "brand" : "neutral", loading: this._updating, onClick: this.onLikeButtonClick.bind(this), scale: 'm' }, this._likeCount ?? this._selectedGraphic.attributes[this._likeField] ?? 0), this._dislikeFieldAvailable &&
                h("calcite-button", { key: '9d1c0a5938806645a24a757f06e31b13587912dc', appearance: "transparent", iconEnd: "thumbs-down", kind: this._isDislikeBtnClicked ? "brand" : "neutral", loading: this._updating, onClick: this.onDislikeButtonClick.bind(this), scale: 'm' }, this._disLikeCount ?? this._selectedGraphic.attributes[this._dislikeField] ?? 0)), this.relatedTableId && this._commentsAvailable &&
            h("feature-list", { key: '73f81c666a054b2c9f02246fcc7ea4811494c106', class: "height-full", mapView: this.mapView, onFeatureSelect: (e) => { this.commentSelect.emit(e.detail); }, pageSize: 5, ref: el => this._commentsList = el, selectedLayerId: this.relatedTableId, showErrorWhenNoFeatures: false, showInitialLoading: false, showUserImageInList: this.showUserImageInCommentsList, textSize: "small", whereClause: commentsListWhereClause })));
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
        const layer = graphic.layer;
        const query = layer.createQuery();
        query.objectIds = [graphic.getObjectId()];
        const completeGraphic = await layer.queryFeatures(query);
        this._selectedGraphic = completeGraphic.features[0];
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
            const relatedTableIdFromRelnship = selectedLayer.relationships[0].relatedTableId;
            const allTables = await getAllTables(this.mapView);
            const allRelatedTables = allTables.filter((table) => selectedLayer.url === table.url && relatedTableIdFromRelnship === table.layerId);
            const relatedTable = allRelatedTables?.length > 0 ? allRelatedTables[0] : null;
            this.relatedTableId = relatedTable?.id ?? '';
            //**Get the related records for the current selected feature**
            if (this.relatedTableId) {
                //current selected feature's objectId
                const objectId = this._selectedGraphic.attributes[selectedLayer.objectIdField];
                //create relationship query to get all the related records with the current selected feature
                const relationshipQuery = new this.RelationshipQuery({
                    objectIds: [objectId],
                    outFields: ['*'],
                    relationshipId: selectedLayer.relationships[0].id
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
        return (h(Fragment, { key: '19f68b9a5d0b6c85832544e4281e1c4a1707ba86' }, this._isLoading && h("calcite-loader", { key: 'c908f311165f8f520f267a0dcde0bd954863ba6b', label: "", scale: "m" }), !this._isLoading && this.mapView && this._noLayersToDisplay &&
            h("calcite-notice", { key: '56dfb252f998333ed6a671cccddd5683f08ad63d', class: "error-msg", icon: "layers-reference", kind: "danger", open: true }, h("div", { key: 'a27ad45ac2b1984152af5a80da36583f7c375be6', slot: "title" }, this._translations.error), h("div", { key: 'a9466cb560b6ee2c72ebd18130ce21371f9e7cdf', slot: "message" }, this._translations.noLayerToDisplayErrorMsg)), !this._isLoading && this.mapView &&
            h("calcite-list", { key: '40e54ba92d2f48a97dd0987808f4b7fdefd266bb', "selection-appearance": "border", "selection-mode": "none" }, this.renderLayerList())));
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

export { Flow as calcite_flow, FlowItem as calcite_flow_item, CreateFeature as create_feature, CreateRelatedFeature as create_related_feature, FeatureDetails as feature_details, LayerList as layer_list };
