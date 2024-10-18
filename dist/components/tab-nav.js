/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, readTask, h, Host } from '@stencil/core/internal/client';
import { c as calciteSize24, a as calciteSize32, b as calciteSize44 } from './core.js';
import { h as slotChangeGetAssignedElements, y as focusElementInGroup, g as getElementDir, B as filterDirectChildren } from './dom.js';
import { c as createObserver } from './observers.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './t9n.js';
import { C as CSS_UTILITY } from './resources.js';
import { d as defineCustomElement$3 } from './button.js';
import { d as defineCustomElement$2 } from './icon.js';
import { d as defineCustomElement$1 } from './loader.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const ICON = {
    chevronRight: "chevron-right",
    chevronLeft: "chevron-left",
};
const CSS = {
    container: "tab-nav",
    containerHasEndTabTitleOverflow: "tab-nav--end-overflow",
    containerHasStartTabTitleOverflow: "tab-nav--start-overflow",
    scrollButton: "scroll-button",
    scrollButtonContainer: "scroll-button-container",
    scrollBackwardContainerButton: "scroll-button-container--backward",
    scrollForwardContainerButton: "scroll-button-container--forward",
    tabTitleSlotWrapper: "tab-titles-slot-wrapper",
};

const tabNavCss = ":host{--calcite-internal-tab-nav-gradient-start-side:left;--calcite-internal-tab-nav-gradient-end-side:right;position:relative;display:flex}.scale-s{--calcite-internal-tab-nav-scroller-button-width:24px;min-block-size:1.5rem}.scale-m{--calcite-internal-tab-nav-scroller-button-width:32px;min-block-size:2rem}.scale-l{--calcite-internal-tab-nav-scroller-button-width:44px;min-block-size:2.75rem}.calcite--rtl{--calcite-internal-tab-nav-gradient-start-side:right;--calcite-internal-tab-nav-gradient-end-side:left}.tab-nav--start-overflow .tab-titles-slot-wrapper{-webkit-mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-end-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%);mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-end-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%)}.tab-nav--end-overflow .tab-titles-slot-wrapper{-webkit-mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-start-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%);mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-start-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%)}.tab-nav--start-overflow.tab-nav--end-overflow .tab-titles-slot-wrapper{-webkit-mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-end-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%, transparent 51%), linear-gradient(to var(--calcite-internal-tab-nav-gradient-start-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%, transparent 51%);mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-end-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%, transparent 51%), linear-gradient(to var(--calcite-internal-tab-nav-gradient-start-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%, transparent 51%)}.tab-nav::-webkit-scrollbar{display:none;-ms-overflow-style:none;scrollbar-width:none}:host([layout=center]) ::slotted(calcite-tab-title){display:flex;flex-grow:1;flex-shrink:0;min-inline-size:auto;white-space:nowrap}:host([layout=center]) ::slotted(calcite-tab-title[selected]){overflow:unset}:host(:not([bordered])) .scale-l{--calcite-internal-tab-nav-gap:var(--calcite-size-xxl)}:host(:not([bordered])) .scale-m{--calcite-internal-tab-nav-gap:var(--calcite-size-xl)}:host(:not([bordered])) .scale-s{--calcite-internal-tab-nav-gap:var(--calcite-size-lg)}:host(:not([bordered])) .tab-titles-slot-wrapper{gap:var(--calcite-internal-tab-nav-gap)}:host([layout=center]:not([bordered])) .tab-titles-slot-wrapper{padding-inline:var(--calcite-spacing-xxl)}.tab-nav,.tab-titles-slot-wrapper{display:flex;inline-size:100%;justify-content:flex-start;overflow:hidden;white-space:nowrap}.scroll-button-container{position:absolute;inset-block:0px}.scroll-button-container calcite-button{--calcite-offset-invert-focus:1;--calcite-color-text-1:var(--calcite-color-text-3);block-size:100%}.scroll-button-container calcite-button:hover{--calcite-color-text-1:unset;--calcite-color-foreground-1:var(--calcite-color-transparent-hover);--calcite-color-foreground-3:var(--calcite-color-transparent)}.scroll-button-container--forward{inset-inline-end:0;z-index:var(--calcite-z-index)}.scroll-button-container--backward{inset-inline-start:0;z-index:var(--calcite-z-index)}:host(:not([bordered])) .scroll-button-container--backward::before,:host(:not([bordered])) .scroll-button-container--forward::before{background-color:var(--calcite-color-border-3);content:\"\";inline-size:var(--calcite-border-width-sm);inset-block-start:var(--calcite-border-width-md);inset-block-end:var(--calcite-border-width-md);position:absolute}:host(:not([bordered])) .scroll-button-container--backward::before{inset-inline-end:0}:host(:not([bordered])) .scroll-button-container--forward::before{inset-inline-start:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTabNavStyle0 = tabNavCss;

const TabNav = /*@__PURE__*/ proxyCustomElement(class TabNav extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteTabChange = createEvent(this, "calciteTabChange", 6);
        this.calciteInternalTabNavSlotChange = createEvent(this, "calciteInternalTabNavSlotChange", 7);
        this.calciteInternalTabChange = createEvent(this, "calciteInternalTabChange", 6);
        this.effectiveDir = "ltr";
        this.lastScrollWheelAxis = "x";
        this.resizeObserver = createObserver("resize", () => {
            this.updateScrollingState();
        });
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.onTabTitleWheel = (event) => {
            event.preventDefault();
            const { deltaX, deltaY } = event;
            const x = Math.abs(deltaX);
            const y = Math.abs(deltaY);
            let scrollBy;
            if (x === y) {
                scrollBy = this.lastScrollWheelAxis === "x" ? deltaX : deltaY;
            }
            else if (x > y) {
                scrollBy = deltaX;
                this.lastScrollWheelAxis = "x";
            }
            else {
                scrollBy = deltaY;
                this.lastScrollWheelAxis = "y";
            }
            const scrollByX = (this.effectiveDir === "rtl" ? -1 : 1) * scrollBy;
            event.currentTarget.scrollBy(scrollByX, 0);
        };
        this.onSlotChange = (event) => {
            this.intersectionObserver?.disconnect();
            const slottedElements = slotChangeGetAssignedElements(event, "calcite-tab-title");
            slottedElements.forEach((child) => {
                this.intersectionObserver?.observe(child);
            });
            this.calciteInternalTabNavSlotChange.emit(slottedElements);
        };
        this.storeTabTitleWrapperRef = (el) => {
            this.tabTitleContainerEl = el;
            this.intersectionObserver = createObserver("intersection", () => this.updateScrollingState(), {
                root: el,
                threshold: [0, 0.5, 1],
            });
        };
        this.scrollToTabTitles = (direction) => {
            readTask(() => {
                const tabTitleContainer = this.tabTitleContainerEl;
                const containerBounds = tabTitleContainer.getBoundingClientRect();
                const tabTitles = Array.from(this.el.querySelectorAll("calcite-tab-title"));
                const { effectiveDir } = this;
                if (direction === "forward") {
                    tabTitles.reverse();
                }
                let closestToEdge = null;
                tabTitles.forEach((tabTitle) => {
                    const tabTitleBounds = tabTitle.getBoundingClientRect();
                    const containerEndX = containerBounds.x + containerBounds.width;
                    const tabTitleEndX = tabTitleBounds.x + tabTitleBounds.width;
                    if ((direction === "forward" && effectiveDir === "ltr") ||
                        (direction === "backward" && effectiveDir === "rtl")) {
                        const afterContainerEnd = tabTitleBounds.x > containerEndX;
                        if (afterContainerEnd) {
                            closestToEdge = tabTitle;
                        }
                        else {
                            const crossingContainerEnd = tabTitleEndX > containerEndX && tabTitleBounds.x > containerBounds.x;
                            if (crossingContainerEnd) {
                                closestToEdge = tabTitle;
                            }
                        }
                    }
                    else {
                        const beforeContainerStart = tabTitleEndX < containerBounds.x;
                        if (beforeContainerStart) {
                            closestToEdge = tabTitle;
                        }
                        else {
                            const crossingContainerStart = tabTitleEndX < containerEndX && tabTitleBounds.x < containerBounds.x;
                            if (crossingContainerStart) {
                                closestToEdge = tabTitle;
                            }
                        }
                    }
                });
                if (closestToEdge) {
                    const { scrollerButtonWidth } = this;
                    const offsetAdjustment = (direction === "forward" && effectiveDir === "ltr") ||
                        (direction === "backward" && effectiveDir === "rtl")
                        ? -scrollerButtonWidth
                        : closestToEdge.offsetWidth - tabTitleContainer.clientWidth + scrollerButtonWidth;
                    const scrollTo = closestToEdge.offsetLeft + offsetAdjustment;
                    tabTitleContainer.scrollTo({
                        left: scrollTo,
                        behavior: "smooth",
                    });
                }
            });
        };
        this.scrollToNextTabTitles = () => this.scrollToTabTitles("forward");
        this.scrollToPreviousTabTitles = () => this.scrollToTabTitles("backward");
        this.handleTabFocus = (event, el, destination) => {
            const focused = focusElementInGroup(this.enabledTabTitles, el, destination);
            this.scrollTabTitleIntoView(focused, "instant");
            event.stopPropagation();
        };
        this.onTabTitleScroll = () => {
            this.updateScrollingState();
        };
        this.renderScrollButton = (overflowDirection) => {
            const { bordered, messages, hasOverflowingStartTabTitle, hasOverflowingEndTabTitle, scale } = this;
            const isEnd = overflowDirection === "end";
            return (h("div", { class: {
                    [CSS.scrollButtonContainer]: true,
                    [CSS.scrollBackwardContainerButton]: !isEnd,
                    [CSS.scrollForwardContainerButton]: isEnd,
                }, hidden: (isEnd && !hasOverflowingEndTabTitle) || (!isEnd && !hasOverflowingStartTabTitle), key: overflowDirection }, h("calcite-button", { appearance: bordered ? "outline-fill" : "transparent", "aria-label": isEnd ? messages.nextTabTitles : messages.previousTabTitles, class: {
                    [CSS.scrollButton]: true,
                }, iconFlipRtl: "both", iconStart: isEnd ? ICON.chevronRight : ICON.chevronLeft, kind: "neutral", onClick: isEnd ? this.scrollToNextTabTitles : this.scrollToPreviousTabTitles, scale: scale, tabIndex: -1 })));
        };
        this.storageId = undefined;
        this.syncId = undefined;
        this.selectedTitle = null;
        this.scale = "m";
        this.layout = "inline";
        this.position = "bottom";
        this.bordered = false;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.hasOverflowingStartTabTitle = false;
        this.hasOverflowingEndTabTitle = false;
        this.selectedTabId = undefined;
    }
    selectedTitleChanged() {
        this.calciteInternalTabChange.emit({
            tab: this.selectedTabId,
        });
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
        this.parentTabsEl = this.el.closest("calcite-tabs");
        this.resizeObserver?.observe(this.el);
        connectLocalized(this);
        connectMessages(this);
    }
    async componentWillLoad() {
        const storageKey = `calcite-tab-nav-${this.storageId}`;
        if (localStorage && this.storageId && localStorage.getItem(storageKey)) {
            const storedTab = JSON.parse(localStorage.getItem(storageKey));
            this.selectedTabId = storedTab;
        }
        await setUpMessages(this);
    }
    componentDidLoad() {
        this.scrollTabTitleIntoView(this.selectedTitle, "instant");
    }
    componentWillRender() {
        const { parentTabsEl } = this;
        this.layout = parentTabsEl?.layout;
        this.bordered = parentTabsEl?.bordered;
        this.effectiveDir = getElementDir(this.el);
    }
    componentDidRender() {
        // if every tab title is active select the first tab.
        if (this.tabTitles.length &&
            this.tabTitles.every((title) => !title.selected) &&
            !this.selectedTabId) {
            this.tabTitles[0].getTabIdentifier().then((tab) => {
                this.calciteInternalTabChange.emit({
                    tab,
                });
            });
        }
    }
    disconnectedCallback() {
        this.resizeObserver?.disconnect();
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        return (h(Host, { key: '9d1138405f2423bddcd9d1bb49dc756e582f8375', role: "tablist" }, h("div", { key: 'f8759781080b2a093f062d0b6172de6d3ea9355d', class: {
                [CSS.container]: true,
                [CSS.containerHasStartTabTitleOverflow]: !!this.hasOverflowingStartTabTitle,
                [CSS.containerHasEndTabTitleOverflow]: !!this.hasOverflowingEndTabTitle,
                [`scale-${this.scale}`]: true,
                [`position-${this.position}`]: true,
                [CSS_UTILITY.rtl]: this.effectiveDir === "rtl",
            } }, this.renderScrollButton("start"), h("div", { key: 'eda664514cb5c89136184c6e8f29e50ce7c9b56b', class: {
                [CSS.tabTitleSlotWrapper]: true,
            }, onScroll: this.onTabTitleScroll, onWheel: this.onTabTitleWheel, ref: this.storeTabTitleWrapperRef }, h("slot", { key: '0c5a40eac082662a2c2b032d977900b91f122214', onSlotchange: this.onSlotChange })), this.renderScrollButton("end"))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    focusPreviousTabHandler(event) {
        this.handleTabFocus(event, event.target, "previous");
    }
    focusNextTabHandler(event) {
        this.handleTabFocus(event, event.target, "next");
    }
    focusFirstTabHandler(event) {
        this.handleTabFocus(event, event.target, "first");
    }
    focusLastTabHandler(event) {
        this.handleTabFocus(event, event.target, "last");
    }
    internalActivateTabHandler(event) {
        const activatedTabTitle = event.target;
        this.selectedTabId = event.detail.tab
            ? event.detail.tab
            : this.getIndexOfTabTitle(activatedTabTitle);
        event.stopPropagation();
        this.selectedTitle = activatedTabTitle;
        this.scrollTabTitleIntoView(activatedTabTitle);
    }
    scrollTabTitleIntoView(activatedTabTitle, behavior = "smooth") {
        if (!activatedTabTitle) {
            return;
        }
        readTask(() => {
            const isLTR = this.effectiveDir === "ltr";
            const tabTitleContainer = this.tabTitleContainerEl;
            const containerBounds = tabTitleContainer.getBoundingClientRect();
            const tabTitleBounds = activatedTabTitle.getBoundingClientRect();
            const scrollPosition = tabTitleContainer.scrollLeft;
            const overflowingStartTabTitle = isLTR
                ? this.hasOverflowingStartTabTitle
                : this.hasOverflowingEndTabTitle;
            const overflowingEndTabTitle = isLTR
                ? this.hasOverflowingEndTabTitle
                : this.hasOverflowingStartTabTitle;
            if (tabTitleBounds.left <
                containerBounds.left + (overflowingStartTabTitle ? this.scrollerButtonWidth : 0)) {
                const left = scrollPosition + (tabTitleBounds.left - containerBounds.left) - this.scrollerButtonWidth;
                tabTitleContainer.scrollTo({ left, behavior });
            }
            else if (tabTitleBounds.right >
                containerBounds.right - (overflowingEndTabTitle ? this.scrollerButtonWidth : 0)) {
                const left = scrollPosition +
                    (tabTitleBounds.right - containerBounds.right) +
                    this.scrollerButtonWidth;
                tabTitleContainer.scrollTo({ left, behavior });
            }
        });
    }
    activateTabHandler(event) {
        this.calciteTabChange.emit();
        event.stopPropagation();
    }
    internalCloseTabHandler(event) {
        const closedTabTitleEl = event.target;
        this.handleTabTitleClose(closedTabTitleEl);
        event.stopPropagation();
    }
    /**
     * Check for active tabs on register and update selected
     *
     * @param event
     */
    async updateTabTitles(event) {
        if (event.target.selected) {
            this.selectedTabId = event.detail;
            this.selectedTitle = await this.getTabTitleById(this.selectedTabId);
        }
    }
    globalInternalTabChangeHandler(event) {
        if (this.syncId &&
            event.target !== this.el &&
            event.target.syncId === this.syncId &&
            this.selectedTabId !== event.detail.tab) {
            this.selectedTabId = event.detail.tab;
        }
        event.stopPropagation();
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    async selectedTabIdChanged() {
        if (localStorage &&
            this.storageId &&
            this.selectedTabId !== undefined &&
            this.selectedTabId !== null) {
            localStorage.setItem(`calcite-tab-nav-${this.storageId}`, JSON.stringify(this.selectedTabId));
        }
        this.calciteInternalTabChange.emit({
            tab: this.selectedTabId,
        });
    }
    get scrollerButtonWidth() {
        const { scale } = this;
        return parseInt(scale === "s" ? calciteSize24 : scale === "m" ? calciteSize32 : calciteSize44);
    }
    updateScrollingState() {
        const tabTitleContainer = this.tabTitleContainerEl;
        if (!tabTitleContainer) {
            return;
        }
        let isOverflowStart;
        let isOverflowEnd;
        const scrollPosition = tabTitleContainer.scrollLeft;
        const visibleWidth = tabTitleContainer.clientWidth;
        const totalContentWidth = tabTitleContainer.scrollWidth;
        if (this.effectiveDir === "ltr") {
            isOverflowStart = scrollPosition > 0;
            isOverflowEnd = scrollPosition + visibleWidth < totalContentWidth;
        }
        else {
            isOverflowStart = scrollPosition < 0;
            isOverflowEnd = scrollPosition !== -(totalContentWidth - visibleWidth);
        }
        this.hasOverflowingStartTabTitle = isOverflowStart;
        this.hasOverflowingEndTabTitle = isOverflowEnd;
    }
    getIndexOfTabTitle(el, tabTitles = this.tabTitles) {
        // In most cases, since these indexes correlate with tab contents, we want to consider all tab titles.
        // However, when doing relative index operations, it makes sense to pass in this.enabledTabTitles as the 2nd arg.
        return tabTitles.indexOf(el);
    }
    async getTabTitleById(id) {
        return Promise.all(this.tabTitles.map((el) => el.getTabIdentifier())).then((ids) => {
            return this.tabTitles[ids.indexOf(id)];
        });
    }
    get tabTitles() {
        return filterDirectChildren(this.el, "calcite-tab-title");
    }
    get enabledTabTitles() {
        return filterDirectChildren(this.el, "calcite-tab-title:not([disabled])").filter((tabTitle) => !tabTitle.closed);
    }
    handleTabTitleClose(closedTabTitleEl) {
        const { tabTitles } = this;
        const selectionModified = closedTabTitleEl.selected;
        const visibleTabTitlesIndices = tabTitles.reduce((tabTitleIndices, tabTitle, index) => !tabTitle.closed ? [...tabTitleIndices, index] : tabTitleIndices, []);
        const totalVisibleTabTitles = visibleTabTitlesIndices.length;
        if (totalVisibleTabTitles === 1 && tabTitles[visibleTabTitlesIndices[0]].closable) {
            tabTitles[visibleTabTitlesIndices[0]].closable = false;
            this.selectedTabId = visibleTabTitlesIndices[0];
            if (selectionModified) {
                tabTitles[visibleTabTitlesIndices[0]].activateTab();
            }
        }
        else if (totalVisibleTabTitles > 1) {
            const closedTabTitleIndex = tabTitles.findIndex((el) => el === closedTabTitleEl);
            const nextTabTitleIndex = visibleTabTitlesIndices.find((value) => value > closedTabTitleIndex);
            if (this.selectedTabId === closedTabTitleIndex) {
                this.selectedTabId = nextTabTitleIndex ? nextTabTitleIndex : totalVisibleTabTitles - 1;
                tabTitles[this.selectedTabId].activateTab();
            }
        }
        requestAnimationFrame(() => {
            tabTitles[this.selectedTabId].focus();
        });
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "selectedTitle": ["selectedTitleChanged"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"],
        "selectedTabId": ["selectedTabIdChanged"]
    }; }
    static get style() { return CalciteTabNavStyle0; }
}, [1, "calcite-tab-nav", {
        "storageId": [513, "storage-id"],
        "syncId": [513, "sync-id"],
        "selectedTitle": [1040],
        "scale": [1],
        "layout": [1537],
        "position": [1],
        "bordered": [1540],
        "messages": [1040],
        "messageOverrides": [1040],
        "defaultMessages": [32],
        "effectiveLocale": [32],
        "hasOverflowingStartTabTitle": [32],
        "hasOverflowingEndTabTitle": [32],
        "selectedTabId": [32]
    }, [[0, "calciteInternalTabsFocusPrevious", "focusPreviousTabHandler"], [0, "calciteInternalTabsFocusNext", "focusNextTabHandler"], [0, "calciteInternalTabsFocusFirst", "focusFirstTabHandler"], [0, "calciteInternalTabsFocusLast", "focusLastTabHandler"], [0, "calciteInternalTabsActivate", "internalActivateTabHandler"], [0, "calciteTabsActivate", "activateTabHandler"], [0, "calciteInternalTabsClose", "internalCloseTabHandler"], [0, "calciteInternalTabTitleRegister", "updateTabTitles"], [16, "calciteInternalTabChange", "globalInternalTabChangeHandler"]], {
        "selectedTitle": ["selectedTitleChanged"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"],
        "selectedTabId": ["selectedTabIdChanged"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-tab-nav", "calcite-button", "calcite-icon", "calcite-loader"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-tab-nav":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, TabNav);
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
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

export { TabNav as T, defineCustomElement as d };
