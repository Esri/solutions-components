/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const loadable = require('./loadable-1c888c87.js');
const locale = require('./locale-da840314.js');
const t9n = require('./t9n-ed5c03a7.js');
const observers = require('./observers-18d87cb5.js');
const responsive = require('./responsive-a61585b1.js');
const component = require('./component-5d190962.js');
require('./browser-333a21c5.js');
require('./dom-795d4a33.js');
require('./guid-e84a8375.js');
require('./resources-18f799c7.js');
require('./key-47c9469a.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    list: "list",
    listItem: "list-item",
    page: "page",
    selected: "selected",
    chevron: "chevron",
    disabled: "disabled",
    ellipsis: "ellipsis",
};
const ICONS = {
    next: "chevron-right",
    previous: "chevron-left",
    first: "chevron-start",
    last: "chevron-end",
};

const paginationCss = ":host{display:flex;writing-mode:horizontal-tb}.list{margin:0px;display:flex;list-style-type:none;padding:0px}.list-item{margin:0px;display:flex;padding:0px}:host([scale=s]) .chevron,:host([scale=s]) .page,:host([scale=s]) .ellipsis{block-size:1.5rem;padding-inline:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem;min-inline-size:1.5rem}:host([scale=m]) .chevron,:host([scale=m]) .page,:host([scale=m]) .ellipsis{block-size:2rem;padding-inline:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem;min-inline-size:2rem}:host([scale=l]) .chevron,:host([scale=l]) .page,:host([scale=l]) .ellipsis{block-size:2.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;min-inline-size:2.75rem}:host([scale=l]) .chevron{padding-inline:0.625rem}:host([scale=l]) .page,:host([scale=l]) .ellipsis{padding-inline:0.75rem}:host button{outline-color:transparent}:host button:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.chevron,.page,.ellipsis{margin:0px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;border-style:none;--tw-border-opacity:0;background-color:transparent;padding:0px;vertical-align:baseline;font-family:inherit;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-color-text-3)}.chevron,.page{cursor:pointer;border-block:2px solid transparent}.chevron:hover,.page:hover{color:var(--calcite-color-text-1);transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.page:hover{border-block-end-color:var(--calcite-color-border-2)}.page.selected{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);border-block-end-color:var(--calcite-color-brand)}.chevron:hover{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-brand)}.chevron:active{background-color:var(--calcite-color-foreground-3)}.chevron.disabled{pointer-events:none;background-color:transparent}.chevron.disabled>calcite-icon{opacity:var(--calcite-opacity-disabled)}:host([hidden]){display:none}[hidden]{display:none}";
const CalcitePaginationStyle0 = paginationCss;

const firstAndLastPageCount = 2;
const ellipsisCount = 2;
const maxItemBreakpoints = {
    large: 11,
    medium: 9,
    small: 7,
    xsmall: 5,
    xxsmall: 1,
};
const Pagination = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calcitePaginationChange = index.createEvent(this, "calcitePaginationChange", 6);
        this.resizeObserver = observers.createObserver("resize", (entries) => entries.forEach(this.resizeHandler));
        this.resizeHandler = ({ contentRect: { width } }) => this.setMaxItemsToBreakpoint(width);
        this.firstClicked = () => {
            this.startItem = 1;
            this.emitUpdate();
        };
        this.lastClicked = () => {
            this.startItem = this.lastStartItem;
            this.emitUpdate();
        };
        this.previousClicked = async () => {
            await this.previousPage();
            this.emitUpdate();
        };
        this.nextClicked = async () => {
            await this.nextPage();
            this.emitUpdate();
        };
        this.handlePageClick = (event) => {
            const target = event.target;
            this.startItem = parseInt(target.value, 10);
            this.emitUpdate();
        };
        this.groupSeparator = false;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.numberingSystem = undefined;
        this.pageSize = 20;
        this.scale = "m";
        this.startItem = 1;
        this.totalItems = 0;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.maxItems = maxItemBreakpoints.xxsmall;
        this.totalPages = undefined;
        this.lastStartItem = undefined;
        this.isXXSmall = undefined;
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    handleTotalPages() {
        if (this.pageSize < 1) {
            this.pageSize = 1;
        }
        this.totalPages = this.totalItems / this.pageSize;
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
        locale.numberStringFormatter.numberFormatOptions = {
            locale: this.effectiveLocale,
            numberingSystem: this.numberingSystem,
            useGrouping: this.groupSeparator,
        };
    }
    handleLastStartItemChange() {
        const { totalItems, pageSize, totalPages } = this;
        this.lastStartItem =
            (totalItems % pageSize === 0 ? totalItems - pageSize : Math.floor(totalPages) * pageSize) + 1;
    }
    handleIsXXSmall() {
        this.isXXSmall = this.maxItems === maxItemBreakpoints.xxsmall;
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        this.resizeObserver?.observe(this.el);
    }
    async componentWillLoad() {
        await t9n.setUpMessages(this);
        loadable.setUpLoadableComponent(this);
        this.handleTotalPages();
        this.handleLastStartItemChange();
        this.handleIsXXSmall();
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
        this.setMaxItemsToBreakpoint(this.el.clientWidth);
    }
    disconnectedCallback() {
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        this.resizeObserver?.disconnect();
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component's first focusable element. */
    async setFocus() {
        await loadable.componentFocusable(this);
        this.el.focus();
    }
    /** Go to the next page of results. */
    async nextPage() {
        this.startItem = Math.min(this.lastStartItem, this.startItem + this.pageSize);
    }
    /** Go to the previous page of results. */
    async previousPage() {
        this.startItem = Math.max(1, this.startItem - this.pageSize);
    }
    /**
     * Set a specified page as active.
     *
     * @param page
     */
    async goTo(page) {
        switch (page) {
            case "start":
                this.startItem = 1;
                break;
            case "end":
                this.startItem = this.lastStartItem;
                break;
            default: {
                if (page >= Math.ceil(this.totalPages)) {
                    this.startItem = this.lastStartItem;
                }
                else if (page <= 0) {
                    this.startItem = 1;
                }
                else {
                    this.startItem = (page - 1) * this.pageSize + 1;
                }
            }
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    setMaxItemsToBreakpoint(width) {
        if (!responsive.breakpoints || !width) {
            return;
        }
        if (width >= responsive.breakpoints.width.medium) {
            this.maxItems = maxItemBreakpoints.large;
            return;
        }
        if (width >= responsive.breakpoints.width.small) {
            this.maxItems = maxItemBreakpoints.medium;
            return;
        }
        if (width >= responsive.breakpoints.width.xsmall) {
            this.maxItems = maxItemBreakpoints.small;
            return;
        }
        if (width >= responsive.breakpoints.width.xxsmall) {
            this.maxItems = maxItemBreakpoints.xsmall;
            return;
        }
        this.maxItems = maxItemBreakpoints.xxsmall;
    }
    showStartEllipsis() {
        return (this.totalPages > this.maxItems &&
            Math.floor(this.startItem / this.pageSize) >
                this.maxItems - firstAndLastPageCount - ellipsisCount);
    }
    showEndEllipsis() {
        return (this.totalPages > this.maxItems &&
            (this.totalItems - this.startItem) / this.pageSize >
                this.maxItems - firstAndLastPageCount - (ellipsisCount - 1));
    }
    emitUpdate() {
        this.calcitePaginationChange.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    renderEllipsis(type) {
        return (index.h("span", { class: CSS.ellipsis, "data-test-ellipsis": type, key: type }, "\u2026"));
    }
    renderItems() {
        const { totalItems, pageSize, startItem, maxItems, totalPages, lastStartItem, isXXSmall } = this;
        const items = [];
        if (isXXSmall) {
            items.push(this.renderPage(startItem));
            return items;
        }
        const renderFirstPage = totalItems > pageSize;
        const renderStartEllipsis = this.showStartEllipsis();
        const renderEndEllipsis = this.showEndEllipsis();
        if (renderFirstPage) {
            items.push(this.renderPage(1));
        }
        if (renderStartEllipsis) {
            items.push(this.renderEllipsis("start"));
        }
        const remainingItems = maxItems -
            firstAndLastPageCount -
            (renderEndEllipsis ? 1 : 0) -
            (renderStartEllipsis ? 1 : 0);
        let end;
        let nextStart;
        // if we don't need ellipses render the whole set
        if (totalPages - 1 <= remainingItems) {
            nextStart = 1 + pageSize;
            end = lastStartItem - pageSize;
        }
        else {
            // if we're within max pages of page 1
            if (startItem / pageSize < remainingItems) {
                nextStart = 1 + pageSize;
                end = 1 + remainingItems * pageSize;
            }
            else {
                // if we're within max pages of last page
                if (startItem + remainingItems * pageSize >= totalItems) {
                    nextStart = lastStartItem - remainingItems * pageSize;
                    end = lastStartItem - pageSize;
                }
                else {
                    // if we're within the center pages
                    nextStart = startItem - pageSize * ((remainingItems - 1) / 2);
                    end = startItem + pageSize * ((remainingItems - 1) / 2);
                }
            }
        }
        for (let i = 0; i < remainingItems && nextStart <= end; i++) {
            items.push(this.renderPage(nextStart));
            nextStart = nextStart + pageSize;
        }
        if (renderEndEllipsis) {
            items.push(this.renderEllipsis("end"));
        }
        items.push(this.renderPage(lastStartItem));
        return items;
    }
    renderPage(start) {
        const { pageSize } = this;
        const page = Math.floor(start / pageSize) + (pageSize === 1 ? 0 : 1);
        locale.numberStringFormatter.numberFormatOptions = {
            locale: this.effectiveLocale,
            numberingSystem: this.numberingSystem,
            useGrouping: this.groupSeparator,
        };
        const displayedPage = locale.numberStringFormatter.localize(page.toString());
        const selected = start === this.startItem;
        return (index.h("li", { class: CSS.listItem }, index.h("button", { "aria-current": selected ? "page" : "false", class: {
                [CSS.page]: true,
                [CSS.selected]: selected,
            }, onClick: this.handlePageClick, value: start }, displayedPage)));
    }
    renderPreviousChevron() {
        const { pageSize, startItem, messages } = this;
        const disabled = pageSize === 1 ? startItem <= pageSize : startItem < pageSize;
        return (index.h("button", { "aria-label": messages.previous, class: {
                [CSS.chevron]: true,
                [CSS.disabled]: disabled,
            }, "data-test-chevron": "previous", disabled: disabled, key: "previous", onClick: this.previousClicked }, index.h("calcite-icon", { flipRtl: true, icon: ICONS.previous, scale: component.getIconScale(this.scale) })));
    }
    renderNextChevron() {
        const { totalItems, pageSize, startItem, messages } = this;
        const disabled = pageSize === 1 ? startItem + pageSize > totalItems : startItem + pageSize > totalItems;
        return (index.h("button", { "aria-label": messages.next, class: {
                [CSS.chevron]: true,
                [CSS.disabled]: disabled,
            }, "data-test-chevron": "next", disabled: disabled, key: "next-button", onClick: this.nextClicked }, index.h("calcite-icon", { flipRtl: true, icon: ICONS.next, scale: component.getIconScale(this.scale) })));
    }
    renderFirstChevron() {
        const { messages, startItem, isXXSmall } = this;
        const disabled = startItem === 1;
        return isXXSmall ? (index.h("button", { "aria-label": messages.first, class: {
                [CSS.chevron]: true,
                [CSS.disabled]: disabled,
            }, disabled: disabled, key: "first-button", onClick: this.firstClicked }, index.h("calcite-icon", { flipRtl: true, icon: ICONS.first, scale: component.getIconScale(this.scale) }))) : null;
    }
    renderLastChevron() {
        const { messages, startItem, isXXSmall, lastStartItem } = this;
        const disabled = startItem === lastStartItem;
        return isXXSmall ? (index.h("button", { "aria-label": messages.last, class: {
                [CSS.chevron]: true,
                [CSS.disabled]: disabled,
            }, disabled: disabled, key: "last-button", onClick: this.lastClicked }, index.h("calcite-icon", { flipRtl: true, icon: ICONS.last, scale: component.getIconScale(this.scale) }))) : null;
    }
    render() {
        return (index.h("ul", { key: 'bdbae7054c4304e91f36809a1131a72551a49679', class: CSS.list }, index.h("li", { key: '14844fcc6ece08896432cfa31c85f84a9de8d992', class: CSS.listItem }, this.renderFirstChevron()), index.h("li", { key: '3146daaad99dd8e05637788ea6bfe0cc89b32ac7', class: CSS.listItem }, this.renderPreviousChevron()), this.renderItems(), index.h("li", { key: '6adbec5c7e7e11aec1937a4d188066f1c999d20c', class: CSS.listItem }, this.renderNextChevron()), index.h("li", { key: '3574dbf73b6cbbc9048c18a93d2990a649040a41', class: CSS.listItem }, this.renderLastChevron())));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "totalItems": ["handleTotalPages", "handleLastStartItemChange"],
        "pageSize": ["handleTotalPages", "handleLastStartItemChange"],
        "effectiveLocale": ["effectiveLocaleChange"],
        "totalPages": ["handleLastStartItemChange"],
        "maxItems": ["handleIsXXSmall"]
    }; }
};
Pagination.style = CalcitePaginationStyle0;

exports.calcite_pagination = Pagination;
