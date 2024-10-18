/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { c as createObserver } from './observers.js';
import { d as disconnectSortableComponent, c as connectSortableComponent } from './sortableComponent.js';
import { f as focusElement } from './dom.js';

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

const SortableList = /*@__PURE__*/ proxyCustomElement(class SortableList extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteListOrderChange = createEvent(this, "calciteListOrderChange", 6);
        this.items = [];
        this.mutationObserver = createObserver("mutation", () => {
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
        disconnectSortableComponent(this);
        this.endObserving();
    }
    componentDidRender() {
        updateHostInteraction(this);
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
        requestAnimationFrame(() => focusElement(handle));
        if ("selected" in handle) {
            handle.selected = true;
        }
    }
    setUpSorting() {
        this.items = Array.from(this.el.children);
        connectSortableComponent(this);
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
        return (h(InteractiveContainer, { key: 'ac305a674d12738f9f68dbc8bad42569098a0cb3', disabled: disabled }, h("div", { key: 'dca1ee832c59b93f546404512d703f843da58ccb', class: {
                [CSS.container]: true,
                [CSS.containerVertical]: !horizontal,
                [CSS.containerHorizontal]: horizontal,
            } }, h("slot", { key: '92f9e08889d4cf08891571aa5ab233392a9f0fd9' }))));
    }
    get el() { return this; }
    static get style() { return CalciteSortableListStyle0; }
}, [1, "calcite-sortable-list", {
        "canPull": [16],
        "canPut": [16],
        "dragSelector": [513, "drag-selector"],
        "group": [513],
        "handleSelector": [513, "handle-selector"],
        "layout": [513],
        "disabled": [516],
        "loading": [516]
    }, [[0, "calciteHandleNudge", "calciteHandleNudgeNextHandler"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-sortable-list"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-sortable-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SortableList);
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteSortableList = SortableList;
const defineCustomElement = defineCustomElement$1;

export { CalciteSortableList, defineCustomElement };
