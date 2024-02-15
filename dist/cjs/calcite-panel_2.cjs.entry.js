/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const dom = require('./dom-c9c2c835.js');
const interactive = require('./interactive-3ab7044d.js');
const loadable = require('./loadable-5a794992.js');
const observers = require('./observers-db4527e4.js');
const resources$1 = require('./resources-555dae0e.js');
const Heading = require('./Heading-bd401e0a.js');
const resources = require('./resources-3e593312.js');
const locale = require('./locale-d237c9d5.js');
const t9n = require('./t9n-993a84de.js');
const conditionalSlot = require('./conditionalSlot-9d7b60d1.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./browser-d08a5f99.js');
require('./key-c5504030.js');

const panelCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;--calcite-min-header-height:calc(var(--calcite-icon-size) * 3)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}.container{margin:0px;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;background-color:var(--calcite-color-background);padding:0px;transition:max-block-size var(--calcite-animation-timing), inline-size var(--calcite-animation-timing)}.container[hidden]{display:none}.header{z-index:var(--calcite-z-index-header);display:flex;flex-direction:column;background-color:var(--calcite-color-foreground-1);border-block-end:var(--calcite-panel-header-border-block-end, 1px solid var(--calcite-color-border-3))}.header-container{display:flex;inline-size:100%;flex-direction:row;align-items:stretch;justify-content:flex-start;flex:0 0 auto}.header-container--border-end{border-block-end:1px solid var(--calcite-color-border-3)}.action-bar-container{inline-size:100%}.action-bar-container ::slotted(calcite-action-bar){inline-size:100%}.header-content{display:flex;flex-direction:column;overflow:hidden;padding-inline:0.75rem;padding-block:0.875rem;margin-inline-end:auto}.header-content .heading,.header-content .description{display:block;overflow-wrap:break-word;padding:0px}.header-content .heading{margin-inline:0px;margin-block:0px 0.25rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-medium)}.header-content .heading:only-child{margin-block-end:0px}.header-content .description{font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2)}.back-button{border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);border-inline-end-width:1px}.header-actions{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:stretch}.header-actions--end{margin-inline-start:auto}.content-wrapper{display:flex;block-size:100%;flex:1 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch;overflow:auto;background-color:var(--calcite-color-background)}.footer{display:flex;inline-size:100%;justify-content:space-evenly;background-color:var(--calcite-color-foreground-1);flex:0 0 auto;padding:var(--calcite-panel-footer-padding, 0.5rem);border-block-start:1px solid var(--calcite-color-border-3)}.fab-container{position:sticky;inset-block-end:0px;z-index:var(--calcite-z-index-sticky);margin-block:0px;margin-inline:auto;display:block;padding:0.5rem;inset-inline:0;inline-size:-moz-fit-content;inline-size:fit-content}:host([hidden]){display:none}[hidden]{display:none}";

const Panel = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calcitePanelClose = index.createEvent(this, "calcitePanelClose", 6);
        this.calcitePanelToggle = index.createEvent(this, "calcitePanelToggle", 6);
        this.calcitePanelScroll = index.createEvent(this, "calcitePanelScroll", 6);
        this.resizeObserver = observers.createObserver("resize", () => this.resizeHandler());
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.resizeHandler = () => {
            const { panelScrollEl } = this;
            if (!panelScrollEl ||
                typeof panelScrollEl.scrollHeight !== "number" ||
                typeof panelScrollEl.offsetHeight !== "number") {
                return;
            }
            panelScrollEl.tabIndex = panelScrollEl.scrollHeight > panelScrollEl.offsetHeight ? 0 : -1;
        };
        this.setContainerRef = (node) => {
            this.containerEl = node;
        };
        this.panelKeyDownHandler = (event) => {
            if (this.closable && event.key === "Escape" && !event.defaultPrevented) {
                this.close();
                event.preventDefault();
            }
        };
        this.close = () => {
            this.closed = true;
            this.calcitePanelClose.emit();
        };
        this.collapse = () => {
            this.collapsed = !this.collapsed;
            this.calcitePanelToggle.emit();
        };
        this.panelScrollHandler = () => {
            this.calcitePanelScroll.emit();
        };
        this.handleHeaderActionsStartSlotChange = (event) => {
            this.hasStartActions = dom.slotChangeHasAssignedElement(event);
        };
        this.handleHeaderActionsEndSlotChange = (event) => {
            this.hasEndActions = dom.slotChangeHasAssignedElement(event);
        };
        this.handleHeaderMenuActionsSlotChange = (event) => {
            this.hasMenuItems = dom.slotChangeHasAssignedElement(event);
        };
        this.handleActionBarSlotChange = (event) => {
            const actionBars = dom.slotChangeGetAssignedElements(event).filter((el) => el === null || el === void 0 ? void 0 : el.matches("calcite-action-bar"));
            actionBars.forEach((actionBar) => (actionBar.layout = "horizontal"));
            this.hasActionBar = !!actionBars.length;
        };
        this.handleHeaderContentSlotChange = (event) => {
            this.hasHeaderContent = dom.slotChangeHasAssignedElement(event);
        };
        this.handleFooterSlotChange = (event) => {
            this.hasFooterContent = dom.slotChangeHasAssignedElement(event);
        };
        this.handleFooterActionsSlotChange = (event) => {
            this.hasFooterActions = dom.slotChangeHasAssignedElement(event);
        };
        this.handleFabSlotChange = (event) => {
            this.hasFab = dom.slotChangeHasAssignedElement(event);
        };
        this.setPanelScrollEl = (el) => {
            var _a, _b;
            this.panelScrollEl = el;
            (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
            if (el) {
                (_b = this.resizeObserver) === null || _b === void 0 ? void 0 : _b.observe(el);
                this.resizeHandler();
            }
        };
        this.closed = false;
        this.disabled = false;
        this.closable = false;
        this.collapsed = false;
        this.collapseDirection = "down";
        this.collapsible = false;
        this.headingLevel = undefined;
        this.loading = false;
        this.heading = undefined;
        this.description = undefined;
        this.menuOpen = false;
        this.messageOverrides = undefined;
        this.messages = undefined;
        this.overlayPositioning = "absolute";
        this.hasStartActions = false;
        this.hasEndActions = false;
        this.hasMenuItems = false;
        this.hasHeaderContent = false;
        this.hasActionBar = false;
        this.hasFooterContent = false;
        this.hasFooterActions = false;
        this.hasFab = false;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.showHeaderContent = false;
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
        interactive.connectInteractive(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        await t9n.setUpMessages(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        var _a;
        interactive.disconnectInteractive(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Sets focus on the component's first focusable element.
     */
    async setFocus() {
        await loadable.componentFocusable(this);
        dom.focusFirstTabbable(this.containerEl);
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
        (_a = this.panelScrollEl) === null || _a === void 0 ? void 0 : _a.scrollTo(options);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHeaderContent() {
        const { heading, headingLevel, description, hasHeaderContent } = this;
        const headingNode = heading ? (index.h(Heading.Heading, { class: resources.CSS.heading, level: headingLevel }, heading)) : null;
        const descriptionNode = description ? index.h("span", { class: resources.CSS.description }, description) : null;
        return !hasHeaderContent && (headingNode || descriptionNode) ? (index.h("div", { class: resources.CSS.headerContent, key: "header-content" }, headingNode, descriptionNode)) : null;
    }
    renderActionBar() {
        return (index.h("div", { class: resources.CSS.actionBarContainer, hidden: !this.hasActionBar }, index.h("slot", { name: resources.SLOTS.actionBar, onSlotchange: this.handleActionBarSlotChange })));
    }
    renderHeaderSlottedContent() {
        return (index.h("div", { class: resources.CSS.headerContent, hidden: !this.hasHeaderContent, key: "slotted-header-content" }, index.h("slot", { name: resources.SLOTS.headerContent, onSlotchange: this.handleHeaderContentSlotChange })));
    }
    renderHeaderStartActions() {
        const { hasStartActions } = this;
        return (index.h("div", { class: { [resources.CSS.headerActionsStart]: true, [resources.CSS.headerActions]: true }, hidden: !hasStartActions, key: "header-actions-start" }, index.h("slot", { name: resources.SLOTS.headerActionsStart, onSlotchange: this.handleHeaderActionsStartSlotChange })));
    }
    renderHeaderActionsEnd() {
        const { hasEndActions, messages, closable, collapsed, collapseDirection, collapsible, hasMenuItems, } = this;
        const { collapse, expand, close } = messages;
        const icons = [resources.ICONS.expand, resources.ICONS.collapse];
        if (collapseDirection === "up") {
            icons.reverse();
        }
        const collapseNode = collapsible ? (index.h("calcite-action", { "aria-expanded": dom.toAriaBoolean(!collapsed), "aria-label": collapse, "data-test": "collapse", icon: collapsed ? icons[0] : icons[1], onClick: this.collapse, text: collapse, title: collapsed ? expand : collapse })) : null;
        const closeNode = closable ? (index.h("calcite-action", { "aria-label": close, "data-test": "close", icon: resources.ICONS.close, onClick: this.close, text: close, title: close })) : null;
        const slotNode = (index.h("slot", { name: resources.SLOTS.headerActionsEnd, onSlotchange: this.handleHeaderActionsEndSlotChange }));
        const showContainer = hasEndActions || collapseNode || closeNode || hasMenuItems;
        return (index.h("div", { class: { [resources.CSS.headerActionsEnd]: true, [resources.CSS.headerActions]: true }, hidden: !showContainer, key: "header-actions-end" }, slotNode, this.renderMenu(), collapseNode, closeNode));
    }
    renderMenu() {
        const { hasMenuItems, messages, menuOpen } = this;
        return (index.h("calcite-action-menu", { flipPlacements: ["top", "bottom"], hidden: !hasMenuItems, key: "menu", label: messages.options, open: menuOpen, overlayPositioning: this.overlayPositioning, placement: "bottom-end" }, index.h("calcite-action", { icon: resources.ICONS.menu, slot: resources$1.SLOTS.trigger, text: messages.options }), index.h("slot", { name: resources.SLOTS.headerMenuActions, onSlotchange: this.handleHeaderMenuActionsSlotChange })));
    }
    renderHeaderNode() {
        const { hasHeaderContent, hasStartActions, hasEndActions, closable, collapsible, hasMenuItems, hasActionBar, } = this;
        const headerContentNode = this.renderHeaderContent();
        const showHeaderContent = hasHeaderContent ||
            !!headerContentNode ||
            hasStartActions ||
            hasEndActions ||
            collapsible ||
            closable ||
            hasMenuItems;
        this.showHeaderContent = showHeaderContent;
        return (index.h("header", { class: resources.CSS.header, hidden: !(showHeaderContent || hasActionBar) }, index.h("div", { class: { [resources.CSS.headerContainer]: true, [resources.CSS.headerContainerBorderEnd]: hasActionBar }, hidden: !showHeaderContent }, this.renderHeaderStartActions(), this.renderHeaderSlottedContent(), headerContentNode, this.renderHeaderActionsEnd()), this.renderActionBar()));
    }
    renderFooterNode() {
        const { hasFooterContent, hasFooterActions } = this;
        const showFooter = hasFooterContent || hasFooterActions;
        return (index.h("footer", { class: resources.CSS.footer, hidden: !showFooter }, index.h("slot", { key: "footer-slot", name: resources.SLOTS.footer, onSlotchange: this.handleFooterSlotChange }), index.h("slot", { key: "footer-actions-slot", name: resources.SLOTS.footerActions, onSlotchange: this.handleFooterActionsSlotChange })));
    }
    renderContent() {
        return (index.h("div", { class: resources.CSS.contentWrapper, hidden: this.collapsible && this.collapsed, onScroll: this.panelScrollHandler,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setPanelScrollEl }, index.h("slot", null), this.renderFab()));
    }
    renderFab() {
        return (index.h("div", { class: resources.CSS.fabContainer, hidden: !this.hasFab }, index.h("slot", { name: resources.SLOTS.fab, onSlotchange: this.handleFabSlotChange })));
    }
    render() {
        const { disabled, loading, panelKeyDownHandler, closed, closable } = this;
        const panelNode = (index.h("article", { "aria-busy": dom.toAriaBoolean(loading), class: resources.CSS.container, hidden: closed, onKeyDown: panelKeyDownHandler, tabIndex: closable ? 0 : -1,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setContainerRef }, this.renderHeaderNode(), this.renderContent(), this.renderFooterNode()));
        return (index.h(interactive.InteractiveContainer, { disabled: disabled }, loading ? index.h("calcite-scrim", { loading: loading }) : null, panelNode));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Panel.style = panelCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    main: "main",
    content: "content",
    contentBehind: "content--behind",
    contentNonInteractive: "content--non-interactive",
    footer: "footer",
    positionedSlotWrapper: "positioned-slot-wrapper",
    container: "container",
    contentBehindCenterContent: "center-content",
};
const SLOTS = {
    centerRow: "center-row",
    panelStart: "panel-start",
    panelEnd: "panel-end",
    panelTop: "panel-top",
    panelBottom: "panel-bottom",
    header: "header",
    footer: "footer",
    alerts: "alerts",
    sheets: "sheets",
    modals: "modals",
};

const shellCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{position:absolute;inset:0px;display:flex;block-size:100%;inline-size:100%;flex-direction:column;overflow:hidden;--calcite-shell-tip-spacing:26vw}.main{position:relative;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;flex-direction:row;justify-content:space-between;overflow:hidden}.content,.content--non-interactive{display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap}.content{overflow:auto}.content ::slotted(calcite-shell-center-row),.content ::slotted(calcite-panel),.content ::slotted(calcite-flow){flex:1 1 auto;align-self:stretch;max-block-size:unset}.content--behind{position:absolute;inset:0px;border-width:0px;z-index:calc(var(--calcite-z-index) - 1);display:initial}.content--non-interactive{pointer-events:none}::slotted(calcite-shell-center-row){inline-size:unset}::slotted(.header .heading){font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-normal)}slot[name=panel-end]::slotted(calcite-shell-panel){margin-inline-start:auto}::slotted(calcite-panel),::slotted(calcite-flow){border-width:1px;border-inline-start-width:0px;border-inline-end-width:0px;border-style:solid;border-color:var(--calcite-color-border-3)}slot[name=center-row]::slotted(calcite-shell-center-row:not([detached])),slot[name=panel-top]::slotted(calcite-shell-center-row:not([detached])),slot[name=panel-bottom]::slotted(calcite-shell-center-row:not([detached])){border-inline-start-width:1px;border-inline-end-width:1px;border-color:var(--calcite-color-border-3)}.center-content{display:flex;flex-direction:column;justify-content:space-between;block-size:100%;inline-size:100%;min-inline-size:0}::slotted(calcite-shell-center-row){flex:none;align-self:stretch}::slotted(calcite-tip-manager){position:absolute;z-index:var(--calcite-z-index-toast);box-sizing:border-box}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}::slotted(calcite-tip-manager){animation:in-up var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:0.25rem;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);inset-block-end:0.5rem;inset-inline:var(--calcite-shell-tip-spacing)}slot[name=center-row]::slotted(calcite-shell-center-row),slot[name=panel-bottom]::slotted(calcite-shell-center-row){margin-block-start:auto}slot[name=panel-top]::slotted(calcite-shell-center-row){margin-block-end:auto}.position-wrapper{position:absolute;pointer-events:none;inset:0}:host([hidden]){display:none}[hidden]{display:none}";

const Shell = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleHeaderSlotChange = (event) => {
            this.hasHeader = !!dom.slotChangeHasAssignedElement(event);
        };
        this.handleFooterSlotChange = (event) => {
            this.hasFooter = !!dom.slotChangeHasAssignedElement(event);
        };
        this.handleAlertsSlotChange = (event) => {
            var _a;
            this.hasAlerts = !!dom.slotChangeHasAssignedElement(event);
            (_a = dom.slotChangeGetAssignedElements(event)) === null || _a === void 0 ? void 0 : _a.map((el) => {
                if (el.nodeName === "CALCITE-ALERT") {
                    el.slottedInShell = true;
                }
            });
        };
        this.handleSheetsSlotChange = (event) => {
            var _a;
            this.hasSheets = !!dom.slotChangeHasAssignedElement(event);
            (_a = dom.slotChangeGetAssignedElements(event)) === null || _a === void 0 ? void 0 : _a.map((el) => {
                if (el.nodeName === "CALCITE-SHEET") {
                    el.slottedInShell = true;
                }
            });
        };
        this.handleModalsSlotChange = (event) => {
            var _a;
            this.hasModals = !!dom.slotChangeHasAssignedElement(event);
            (_a = dom.slotChangeGetAssignedElements(event)) === null || _a === void 0 ? void 0 : _a.map((el) => {
                if (el.nodeName === "CALCITE-MODAL") {
                    el.slottedInShell = true;
                }
            });
        };
        this.contentBehind = false;
        this.hasHeader = false;
        this.hasFooter = false;
        this.hasAlerts = false;
        this.hasModals = false;
        this.hasSheets = false;
        this.panelIsResizing = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleCalciteInternalShellPanelResizeStart(event) {
        this.panelIsResizing = true;
        event.stopPropagation();
    }
    handleCalciteInternalShellPanelResizeEnd(event) {
        this.panelIsResizing = false;
        event.stopPropagation();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        conditionalSlot.connectConditionalSlotComponent(this);
    }
    disconnectedCallback() {
        conditionalSlot.disconnectConditionalSlotComponent(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHeader() {
        return (index.h("div", { hidden: !this.hasHeader }, index.h("slot", { key: "header", name: SLOTS.header, onSlotchange: this.handleHeaderSlotChange })));
    }
    renderFooter() {
        return (index.h("div", { class: CSS.footer, hidden: !this.hasFooter, key: "footer" }, index.h("slot", { name: SLOTS.footer, onSlotchange: this.handleFooterSlotChange })));
    }
    renderAlerts() {
        return (index.h("div", { hidden: !this.hasAlerts }, index.h("slot", { key: "alerts", name: SLOTS.alerts, onSlotchange: this.handleAlertsSlotChange })));
    }
    renderSheets() {
        return (index.h("div", { hidden: !this.hasSheets }, index.h("slot", { key: "sheets", name: SLOTS.sheets, onSlotchange: this.handleSheetsSlotChange })));
    }
    renderModals() {
        return (index.h("div", { hidden: !this.hasModals }, index.h("slot", { key: "modals", name: SLOTS.modals, onSlotchange: this.handleModalsSlotChange })));
    }
    renderContent() {
        const { panelIsResizing } = this;
        const defaultSlotNode = index.h("slot", { key: "default-slot" });
        const defaultSlotContainerNode = panelIsResizing ? (index.h("div", { class: CSS.contentNonInteractive }, defaultSlotNode)) : (defaultSlotNode);
        const deprecatedCenterRowSlotNode = (index.h("slot", { key: "center-row-slot", name: SLOTS.centerRow }));
        const panelBottomSlotNode = index.h("slot", { key: "panel-bottom-slot", name: SLOTS.panelBottom });
        const panelTopSlotNode = index.h("slot", { key: "panel-top-slot", name: SLOTS.panelTop });
        const contentContainerKey = "content-container";
        const content = !!this.contentBehind
            ? [
                index.h("div", { class: {
                        [CSS.content]: true,
                        [CSS.contentBehind]: true,
                    }, key: contentContainerKey }, defaultSlotContainerNode),
                index.h("div", { class: CSS.contentBehindCenterContent }, panelTopSlotNode, panelBottomSlotNode, deprecatedCenterRowSlotNode),
            ]
            : [
                index.h("div", { class: CSS.content, key: contentContainerKey }, panelTopSlotNode, defaultSlotContainerNode, panelBottomSlotNode, deprecatedCenterRowSlotNode),
            ];
        return content;
    }
    renderMain() {
        return (index.h("div", { class: CSS.main }, index.h("slot", { name: SLOTS.panelStart }), this.renderContent(), index.h("slot", { name: SLOTS.panelEnd })));
    }
    renderPositionedSlots() {
        return (index.h("div", { class: CSS.positionedSlotWrapper }, this.renderAlerts(), this.renderModals(), this.renderSheets()));
    }
    render() {
        return (index.h(index.Fragment, null, this.renderHeader(), this.renderMain(), this.renderFooter(), this.renderPositionedSlots()));
    }
    get el() { return index.getElement(this); }
};
Shell.style = shellCss;

exports.calcite_panel = Panel;
exports.calcite_shell = Shell;
