/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { w as focusElementInGroup, g as getElementDir, y as filterDirectChildren } from './dom.js';
import { c as createObserver } from './observers.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    container: "tab-nav",
};

const tabNavCss = ":host{position:relative;display:flex}.scale-s{min-block-size:1.5rem}.scale-m{min-block-size:2rem}.scale-l{min-block-size:2.75rem}:host([layout=center]:not([bordered])){padding-inline:1.25rem}:host([layout=center]:not([bordered])) .tab-nav ::slotted(calcite-tab-title:last-child){margin-inline-end:0px}:host(:not([bordered])) .scale-l ::slotted(calcite-tab-title){margin-inline-end:1.5rem}:host(:not([bordered])) .scale-m ::slotted(calcite-tab-title){margin-inline-end:1.25rem}:host(:not([bordered])) .scale-s ::slotted(calcite-tab-title){margin-inline-end:1rem}.tab-nav{display:flex;inline-size:100%;justify-content:flex-start;overflow:auto}.tab-nav-active-indicator-container{position:absolute;inset-inline:0px;inset-block-end:0px;block-size:0.125rem;inline-size:100%;overflow:hidden}.tab-nav-active-indicator{position:absolute;inset-block-end:0px;display:block;block-size:0.125rem;background-color:var(--calcite-color-brand);transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;transition-timing-function:cubic-bezier(0, 0, 0.2, 1)}:host([layout=center]) .tab-nav{justify-content:space-evenly}:host .position-bottom .tab-nav-active-indicator{inset-block-end:unset;inset-block-start:0px}:host .position-bottom .tab-nav-active-indicator-container{inset-block-end:unset;inset-block-start:0px}:host([bordered]) .tab-nav-active-indicator-container{inset-block-end:unset}:host([bordered]) .position-bottom .tab-nav-active-indicator-container{inset-block-end:0;inset-block-start:unset}@media (forced-colors: active){.tab-nav-active-indicator{background-color:highlight}}:host([hidden]){display:none}[hidden]{display:none}";

const TabNav = /*@__PURE__*/ proxyCustomElement(class TabNav extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteTabChange = createEvent(this, "calciteTabChange", 6);
        this.calciteInternalTabChange = createEvent(this, "calciteInternalTabChange", 6);
        this.animationActiveDuration = 0.3;
        this.resizeObserver = createObserver("resize", () => {
            if (!this.activeIndicatorEl) {
                return;
            }
            // remove active indicator transition duration during resize to prevent wobble
            this.activeIndicatorEl.style.transitionDuration = "0s";
            this.updateActiveWidth();
            this.updateOffsetPosition();
        });
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.handleTabFocus = (event, el, destination) => {
            focusElementInGroup(this.enabledTabTitles, el, destination);
            event.stopPropagation();
        };
        this.handleContainerScroll = () => {
            // remove active indicator transition duration while container is scrolling to prevent wobble
            this.activeIndicatorEl.style.transitionDuration = "0s";
            this.updateOffsetPosition();
        };
        this.storageId = undefined;
        this.syncId = undefined;
        this.selectedTitle = null;
        this.scale = "m";
        this.layout = "inline";
        this.position = "bottom";
        this.bordered = false;
        this.indicatorOffset = undefined;
        this.indicatorWidth = undefined;
        this.selectedTabId = undefined;
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
        this.selectedTitle = await this.getTabTitleById(this.selectedTabId);
    }
    selectedTitleChanged() {
        this.updateOffsetPosition();
        this.updateActiveWidth();
        // reset the animation time on tab selection
        this.activeIndicatorEl.style.transitionDuration = `${this.animationActiveDuration}s`;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        var _a;
        this.parentTabsEl = this.el.closest("calcite-tabs");
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el);
    }
    componentWillLoad() {
        const storageKey = `calcite-tab-nav-${this.storageId}`;
        if (localStorage && this.storageId && localStorage.getItem(storageKey)) {
            const storedTab = JSON.parse(localStorage.getItem(storageKey));
            this.selectedTabId = storedTab;
        }
    }
    componentWillRender() {
        const { parentTabsEl } = this;
        this.layout = parentTabsEl === null || parentTabsEl === void 0 ? void 0 : parentTabsEl.layout;
        this.bordered = parentTabsEl === null || parentTabsEl === void 0 ? void 0 : parentTabsEl.bordered;
        // fix issue with active tab-title not lining up with blue indicator
        if (this.selectedTitle) {
            this.updateOffsetPosition();
        }
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
        var _a;
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    render() {
        const dir = getElementDir(this.el);
        const width = `${this.indicatorWidth}px`;
        const offset = `${this.indicatorOffset}px`;
        const indicatorStyle = dir !== "rtl" ? { width, left: offset } : { width, right: offset };
        return (h(Host, { role: "tablist" }, h("div", { class: {
                [CSS.container]: true,
                [`scale-${this.scale}`]: true,
                [`position-${this.position}`]: true,
            }, onScroll: this.handleContainerScroll,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.tabNavEl = el) }, h("slot", null), h("div", { class: "tab-nav-active-indicator-container",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.activeIndicatorContainerEl = el) }, h("div", { class: "tab-nav-active-indicator", style: indicatorStyle,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.activeIndicatorEl = el) })))));
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
        this.selectedTabId = event.detail.tab
            ? event.detail.tab
            : this.getIndexOfTabTitle(event.target);
        event.stopPropagation();
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
    updateTabTitles(event) {
        if (event.target.selected) {
            this.selectedTabId = event.detail;
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
    iconStartChangeHandler() {
        this.updateActiveWidth();
        this.updateOffsetPosition();
    }
    updateOffsetPosition() {
        var _a, _b, _c, _d, _e;
        const dir = getElementDir(this.el);
        const navWidth = (_a = this.activeIndicatorContainerEl) === null || _a === void 0 ? void 0 : _a.offsetWidth;
        const tabLeft = (_b = this.selectedTitle) === null || _b === void 0 ? void 0 : _b.offsetLeft;
        const tabWidth = (_c = this.selectedTitle) === null || _c === void 0 ? void 0 : _c.offsetWidth;
        const offsetRight = navWidth - (tabLeft + tabWidth);
        this.indicatorOffset =
            dir !== "rtl" ? tabLeft - ((_d = this.tabNavEl) === null || _d === void 0 ? void 0 : _d.scrollLeft) : offsetRight + ((_e = this.tabNavEl) === null || _e === void 0 ? void 0 : _e.scrollLeft);
    }
    updateActiveWidth() {
        var _a;
        this.indicatorWidth = (_a = this.selectedTitle) === null || _a === void 0 ? void 0 : _a.offsetWidth;
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
            this.updateOffsetPosition();
            this.updateActiveWidth();
            tabTitles[this.selectedTabId].focus();
        });
    }
    get el() { return this; }
    static get watchers() { return {
        "selectedTabId": ["selectedTabIdChanged"],
        "selectedTitle": ["selectedTitleChanged"]
    }; }
    static get style() { return tabNavCss; }
}, [1, "calcite-tab-nav", {
        "storageId": [513, "storage-id"],
        "syncId": [513, "sync-id"],
        "selectedTitle": [1040],
        "scale": [1],
        "layout": [1537],
        "position": [1],
        "bordered": [1540],
        "indicatorOffset": [1026, "indicator-offset"],
        "indicatorWidth": [1026, "indicator-width"],
        "selectedTabId": [32]
    }, [[0, "calciteInternalTabsFocusPrevious", "focusPreviousTabHandler"], [0, "calciteInternalTabsFocusNext", "focusNextTabHandler"], [0, "calciteInternalTabsFocusFirst", "focusFirstTabHandler"], [0, "calciteInternalTabsFocusLast", "focusLastTabHandler"], [0, "calciteInternalTabsActivate", "internalActivateTabHandler"], [0, "calciteTabsActivate", "activateTabHandler"], [0, "calciteInternalTabsClose", "internalCloseTabHandler"], [0, "calciteInternalTabTitleRegister", "updateTabTitles"], [16, "calciteInternalTabChange", "globalInternalTabChangeHandler"], [0, "calciteInternalTabIconChanged", "iconStartChangeHandler"]], {
        "selectedTabId": ["selectedTabIdChanged"],
        "selectedTitle": ["selectedTitleChanged"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-tab-nav"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-tab-nav":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, TabNav);
            }
            break;
    } });
}
defineCustomElement();

export { TabNav as T, defineCustomElement as d };
