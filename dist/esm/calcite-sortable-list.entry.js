/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, g as getElement } from './index-164d485a.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './interactive-39bf5602.js';
import { c as createObserver } from './observers-d04d1da9.js';
import { d as dragActive, a as disconnectSortableComponent, c as connectSortableComponent } from './sortableComponent-d7cd11a3.js';
import { e as focusElement } from './dom-38c6f027.js';
import './browser-d60104bd.js';
import './guid-b75a5f7b.js';
import './resources-8834f920.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    sortItem: "sort-item",
    container: "container",
    containerHorizontal: "container--horizontal",
    containerVertical: "container--vertical",
};

const sortableListCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.container{display:flex;flex:1 1 auto}.container--vertical{flex-direction:column}.container--horizontal{flex-direction:row}:host([hidden]){display:none}[hidden]{display:none}";

const SortableList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        if (dragActive(this)) {
            return;
        }
        this.setUpSorting();
        this.beginObserving();
        connectInteractive(this);
    }
    disconnectedCallback() {
        if (dragActive(this)) {
            return;
        }
        disconnectInteractive(this);
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
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
    }
    endObserving() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { disabled, layout } = this;
        const horizontal = layout === "horizontal" || false;
        return (h(InteractiveContainer, { disabled: disabled }, h("div", { class: {
                [CSS.container]: true,
                [CSS.containerVertical]: !horizontal,
                [CSS.containerHorizontal]: horizontal,
            } }, h("slot", null))));
    }
    get el() { return getElement(this); }
};
SortableList.style = sortableListCss;

export { SortableList as calcite_sortable_list };
