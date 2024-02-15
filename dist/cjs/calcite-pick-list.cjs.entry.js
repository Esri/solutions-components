/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const interactive = require('./interactive-3ab7044d.js');
const loadable = require('./loadable-5a794992.js');
const observers = require('./observers-db4527e4.js');
const resources = require('./resources-baef554d.js');
const sharedListRender = require('./shared-list-render-410f421e.js');
require('./browser-d08a5f99.js');
require('./array-6ea3edb8.js');
require('./dom-c9c2c835.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./resources-c4fe74a9.js');
require('./debounce-30afab47.js');

const pickListCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;box-sizing:border-box;display:flex;flex-shrink:0;flex-grow:1;flex-direction:column;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}:host *{box-sizing:border-box}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([filter-enabled]) header{margin-block-end:0.25rem;display:flex;align-items:stretch;justify-content:flex-end;background-color:var(--calcite-color-foreground-1);--tw-shadow:0 1px 0 var(--calcite-color-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([filter-enabled]) header.sticky-pos{position:sticky;inset-block-start:0px;z-index:var(--calcite-z-index)}calcite-filter{margin-block-end:0px}:host([loading][disabled]){min-block-size:2rem}:host([hidden]){display:none}[hidden]{display:none}";

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
        return index.h(sharedListRender.List, { onKeyDown: this.keyDownHandler, props: this });
    }
    get el() { return index.getElement(this); }
};
PickList.style = pickListCss;

exports.calcite_pick_list = PickList;
