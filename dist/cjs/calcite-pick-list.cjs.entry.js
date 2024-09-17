/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const interactive = require('./interactive-89f913ba.js');
const loadable = require('./loadable-2e2626dc.js');
const observers = require('./observers-8fed90f3.js');
const logger = require('./logger-1c9bfcfd.js');
const resources = require('./resources-3eec4ddc.js');
const sharedListRender = require('./shared-list-render-54fa8d30.js');
require('./browser-69696af0.js');
require('./config-afe9063b.js');
require('./array-59824898.js');
require('./dom-6a9b6275.js');
require('./guid-02e5380f.js');
require('./resources-dfe71ff2.js');
require('./resources-fac4579f.js');
require('./debounce-7f1e04d6.js');

const pickListCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;box-sizing:border-box;display:flex;flex-shrink:0;flex-grow:1;flex-direction:column;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}:host *{box-sizing:border-box}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([filter-enabled]) header{margin-block-end:0.25rem;display:flex;align-items:stretch;justify-content:flex-end;background-color:var(--calcite-color-foreground-1);--tw-shadow:0 1px 0 var(--calcite-color-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([filter-enabled]) header.sticky-pos{position:sticky;inset-block-start:0px;z-index:var(--calcite-z-index)}calcite-filter{margin-block-end:0px}:host([loading][disabled]){min-block-size:2rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalcitePickListStyle0 = pickListCss;

logger.logger.deprecated("component", {
    name: "pick-list",
    removalVersion: 3,
    suggested: "list",
});
const PickList = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteListChange = index.createEvent(this, "calciteListChange", 6);
        this.calciteListFilter = index.createEvent(this, "calciteListFilter", 6);
        this.lastSelectedItem = null;
        this.mutationObserver = observers.createObserver("mutation", sharedListRender.mutationObserverCallback.bind(this));
        this.setFilterEl = (el) => {
            this.filterEl = el;
        };
        this.setFilteredItems = (filteredItems) => {
            this.filteredItems = filteredItems;
        };
        this.deselectRemovedItems = sharedListRender.deselectRemovedItems.bind(this);
        this.deselectSiblingItems = sharedListRender.deselectSiblingItems.bind(this);
        this.selectSiblings = sharedListRender.selectSiblings.bind(this);
        this.handleFilter = sharedListRender.handleFilter.bind(this);
        this.handleFilterEvent = sharedListRender.handleFilterEvent.bind(this);
        this.getItemData = sharedListRender.getItemData.bind(this);
        this.keyDownHandler = sharedListRender.keyDownHandler.bind(this);
        this.disabled = false;
        this.filteredItems = [];
        this.filteredData = [];
        this.filterEnabled = false;
        this.filterPlaceholder = undefined;
        this.filterText = undefined;
        this.headingLevel = undefined;
        this.loading = false;
        this.multiple = false;
        this.selectionFollowsFocus = false;
        this.selectedValues = new Map();
        this.dataForFilter = [];
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        sharedListRender.initialize.call(this);
        sharedListRender.initializeObserver.call(this);
        interactive.connectInteractive(this);
    }
    disconnectedCallback() {
        sharedListRender.cleanUpObserver.call(this);
        interactive.disconnectInteractive(this);
    }
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
        sharedListRender.handleInitialFilter.call(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    calciteListItemRemoveHandler(event) {
        sharedListRender.removeItem.call(this, event);
    }
    calciteListItemChangeHandler(event) {
        sharedListRender.calciteListItemChangeHandler.call(this, event);
    }
    calciteInternalListItemPropsChangeHandler(event) {
        event.stopPropagation();
        this.setUpFilter();
    }
    calciteInternalListItemValueChangeHandler(event) {
        sharedListRender.calciteInternalListItemValueChangeHandler.call(this, event);
        event.stopPropagation();
    }
    calciteListFocusOutHandler(event) {
        sharedListRender.calciteListFocusOutHandler.call(this, event);
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    setUpItems() {
        sharedListRender.setUpItems.call(this, "calcite-pick-list-item");
    }
    setUpFilter() {
        if (this.filterEnabled) {
            this.dataForFilter = this.getItemData();
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Returns the component's selected `calcite-pick-list-item`s. */
    async getSelectedItems() {
        return this.selectedValues;
    }
    /**
     * Sets focus on the component's first focusable element.
     *
     * @param focusId
     */
    async setFocus(focusId) {
        await loadable.componentFocusable(this);
        return sharedListRender.setFocus.call(this, focusId);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    getIconType() {
        return this.multiple ? resources.ICON_TYPES.square : resources.ICON_TYPES.circle;
    }
    render() {
        return index.h(sharedListRender.List, { key: '870f354277bb55abb2c867ae250d85a8569505ec', onKeyDown: this.keyDownHandler, props: this });
    }
    get el() { return index.getElement(this); }
};
PickList.style = CalcitePickListStyle0;

exports.calcite_pick_list = PickList;
