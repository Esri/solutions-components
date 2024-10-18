/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const interactive = require('./interactive-a128ac30.js');
const observers = require('./observers-18d87cb5.js');
const sortableComponent = require('./sortableComponent-5dfc7ff8.js');
const dom = require('./dom-795d4a33.js');
require('./browser-333a21c5.js');
require('./guid-e84a8375.js');
require('./resources-18f799c7.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    sortItem: "sort-item",
    container: "container",
    containerHorizontal: "container--horizontal",
    containerVertical: "container--vertical",
};

const sortableListCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{display:flex;flex:1 1 auto}.container--vertical{flex-direction:column}.container--horizontal{flex-direction:row}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteSortableListStyle0 = sortableListCss;

const SortableList = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteListOrderChange = index.createEvent(this, "calciteListOrderChange", 6);
        this.items = [];
        this.mutationObserver = observers.createObserver("mutation", () => {
            this.setUpSorting();
        });
        this.dragEnabled = true;
        this.canPull = undefined;
        this.canPut = undefined;
        this.dragSelector = undefined;
        this.group = undefined;
        this.handleSelector = "calcite-handle";
        this.layout = "vertical";
        this.disabled = false;
        this.loading = false;
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        this.setUpSorting();
        this.beginObserving();
    }
    disconnectedCallback() {
        sortableComponent.disconnectSortableComponent(this);
        this.endObserving();
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    calciteHandleNudgeNextHandler(event) {
        this.handleNudgeEvent(event);
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    onGlobalDragStart() {
        this.endObserving();
    }
    onGlobalDragEnd() {
        this.beginObserving();
    }
    onDragEnd() { }
    onDragStart() { }
    onDragSort() {
        this.items = Array.from(this.el.children);
        this.calciteListOrderChange.emit();
    }
    handleNudgeEvent(event) {
        const { direction } = event.detail;
        const handle = event
            .composedPath()
            .find((el) => el.matches(this.handleSelector));
        const sortItem = this.items.find((item) => {
            return item.contains(handle) || event.composedPath().includes(item);
        });
        const lastIndex = this.items.length - 1;
        const startingIndex = this.items.indexOf(sortItem);
        let appendInstead = false;
        let buddyIndex;
        if (direction === "up") {
            if (startingIndex === 0) {
                appendInstead = true;
            }
            else {
                buddyIndex = startingIndex - 1;
            }
        }
        else {
            if (startingIndex === lastIndex) {
                buddyIndex = 0;
            }
            else if (startingIndex === lastIndex - 1) {
                appendInstead = true;
            }
            else {
                buddyIndex = startingIndex + 2;
            }
        }
        this.endObserving();
        if (appendInstead) {
            sortItem.parentElement.appendChild(sortItem);
        }
        else {
            sortItem.parentElement.insertBefore(sortItem, this.items[buddyIndex]);
        }
        this.items = Array.from(this.el.children);
        this.beginObserving();
        requestAnimationFrame(() => dom.focusElement(handle));
        if ("selected" in handle) {
            handle.selected = true;
        }
    }
    setUpSorting() {
        this.items = Array.from(this.el.children);
        sortableComponent.connectSortableComponent(this);
    }
    beginObserving() {
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    }
    endObserving() {
        this.mutationObserver?.disconnect();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { disabled, layout } = this;
        const horizontal = layout === "horizontal" || false;
        return (index.h(interactive.InteractiveContainer, { key: 'ac305a674d12738f9f68dbc8bad42569098a0cb3', disabled: disabled }, index.h("div", { key: 'dca1ee832c59b93f546404512d703f843da58ccb', class: {
                [CSS.container]: true,
                [CSS.containerVertical]: !horizontal,
                [CSS.containerHorizontal]: horizontal,
            } }, index.h("slot", { key: '92f9e08889d4cf08891571aa5ab233392a9f0fd9' }))));
    }
    get el() { return index.getElement(this); }
};
SortableList.style = CalciteSortableListStyle0;

exports.calcite_sortable_list = SortableList;
