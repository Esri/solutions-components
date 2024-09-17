/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { j as slotChangeHasAssignedElement, h as slotChangeGetAssignedElements, k as focusFirstTabbable, t as toAriaBoolean } from './dom.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './interactive.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { c as createObserver } from './observers.js';
import { d as defineCustomElement$5, S as SLOTS$1 } from './action-menu.js';
import { H as Heading } from './Heading.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './t9n.js';
import { d as defineCustomElement$6 } from './action.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './loader.js';
import { d as defineCustomElement$2 } from './popover.js';
import { d as defineCustomElement$1 } from './scrim.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    actionBarContainer: "action-bar-container",
    backButton: "back-button",
    container: "container",
    contentBottom: "content-bottom",
    contentTop: "content-top",
    header: "header",
    headerContainer: "header-container",
    headerContainerBorderEnd: "header-container--border-end",
    heading: "heading",
    summary: "summary",
    description: "description",
    headerContent: "header-content",
    headerActions: "header-actions",
    headerActionsEnd: "header-actions--end",
    headerActionsStart: "header-actions--start",
    contentWrapper: "content-wrapper",
    fabContainer: "fab-container",
    footer: "footer",
    footerContent: "footer-content",
    footerActions: "footer-actions",
    footerStart: "footer-start",
    footerEnd: "footer-end",
};
const IDS = {
    close: "close",
    collapse: "collapse",
};
const ICONS = {
    close: "x",
    menu: "ellipsis",
    backLeft: "chevron-left",
    backRight: "chevron-right",
    expand: "chevron-down",
    collapse: "chevron-up",
};
const SLOTS = {
    actionBar: "action-bar",
    alerts: "alerts",
    contentBottom: "content-bottom",
    contentTop: "content-top",
    headerActionsStart: "header-actions-start",
    headerActionsEnd: "header-actions-end",
    headerMenuActions: "header-menu-actions",
    headerContent: "header-content",
    fab: "fab",
    footer: "footer",
    footerEnd: "footer-end",
    footerStart: "footer-start",
    footerActions: "footer-actions",
};

const panelCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;overflow:hidden;--calcite-min-header-height:calc(var(--calcite-icon-size) * 3)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}:host([scale=s]){--calcite-internal-panel-default-padding:var(--calcite-spacing-sm);--calcite-internal-panel-header-vertical-padding:10px}:host([scale=s]) .header-content .heading{font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=s]) .header-content .description{font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]){--calcite-internal-panel-default-padding:var(--calcite-spacing-md);--calcite-internal-panel-header-vertical-padding:var(--calcite-spacing-lg)}:host([scale=m]) .header-content .heading{font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=m]) .header-content .description{font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]){--calcite-internal-panel-default-padding:var(--calcite-spacing-xl);--calcite-internal-panel-header-vertical-padding:var(--calcite-spacing-xxl)}:host([scale=l]) .header-content .heading{font-size:var(--calcite-font-size-1);line-height:1.5rem}:host([scale=l]) .header-content .description{font-size:var(--calcite-font-size-0);line-height:1.25rem}.content-top,.content-bottom{display:flex;align-items:flex-start;align-self:stretch;border-block-start:1px solid var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1)}.container{position:relative;margin:0px;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;background-color:var(--calcite-color-background);padding:0px;outline-color:transparent;transition:max-block-size var(--calcite-animation-timing), inline-size var(--calcite-animation-timing)}.container:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.container[hidden]{display:none}.header{z-index:var(--calcite-z-index-header);display:flex;flex-direction:column;background-color:var(--calcite-color-foreground-1);border-block-end:var(--calcite-panel-header-border-block-end, 1px solid var(--calcite-color-border-3))}.header-container{display:flex;inline-size:100%;flex-direction:row;align-items:stretch;justify-content:flex-start;flex:0 0 auto}.header-container--border-end{border-block-end:1px solid var(--calcite-color-border-3)}.action-bar-container{inline-size:100%}.action-bar-container ::slotted(calcite-action-bar){inline-size:100%}.header-content{display:flex;flex-direction:column;overflow:hidden;padding-inline:0.75rem;padding-block:0.875rem;margin-inline-end:auto}.header-content .heading,.header-content .description{display:block;overflow-wrap:break-word;padding:0px}.header-content .heading{margin-inline:0px;margin-block:0px 0.25rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.header-content .heading:only-child{margin-block-end:0px}.header-content .description{color:var(--calcite-color-text-2)}.back-button{border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);border-inline-end-width:1px}.header-actions{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:stretch}.header-actions--end{margin-inline-start:auto}.content-wrapper{position:relative;display:flex;block-size:100%;flex:1 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch;overflow:auto;background-color:var(--calcite-color-background);outline-color:transparent;padding:var(--calcite-panel-content-space, 0)}.content-wrapper:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.content-top,.content-bottom{padding:var(--calcite-internal-panel-default-padding)}.header-content{padding-block:var(--calcite-internal-panel-header-vertical-padding);padding-inline:var(--calcite-internal-panel-default-padding)}.footer{margin-block-start:auto;display:flex;flex-direction:row;align-content:space-between;align-items:center;justify-content:center;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--2);line-height:1.375;border-block-start:1px solid var(--calcite-color-border-3);padding:var(--calcite-panel-footer-padding, var(--calcite-internal-panel-default-padding))}.footer-content{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:center}.footer-actions{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:space-evenly;gap:var(--calcite-internal-panel-default-padding)}.footer-start{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:flex-start;margin-inline-end:auto;gap:var(--calcite-internal-panel-default-padding)}.footer-end{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:flex-end;margin-inline-start:auto;gap:var(--calcite-internal-panel-default-padding)}.fab-container{position:sticky;inset-block-end:0px;z-index:var(--calcite-z-index-sticky);margin-block:0px;margin-inline:auto;display:block;padding:0.5rem;inset-inline:0;inline-size:-moz-fit-content;inline-size:fit-content}:host([hidden]){display:none}[hidden]{display:none}";
const CalcitePanelStyle0 = panelCss;

const Panel = /*@__PURE__*/ proxyCustomElement(class Panel extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calcitePanelClose = createEvent(this, "calcitePanelClose", 6);
        this.calcitePanelToggle = createEvent(this, "calcitePanelToggle", 6);
        this.calcitePanelScroll = createEvent(this, "calcitePanelScroll", 6);
        this.resizeObserver = createObserver("resize", () => this.resizeHandler());
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
                this.handleUserClose();
                event.preventDefault();
            }
        };
        this.handleUserClose = () => {
            this.closed = true;
            this.calcitePanelClose.emit();
        };
        this.open = () => {
            this.isClosed = false;
        };
        this.close = async () => {
            const beforeClose = this.beforeClose ?? (() => Promise.resolve());
            try {
                await beforeClose();
            }
            catch (_error) {
                // close prevented
                requestAnimationFrame(() => {
                    this.closed = false;
                });
                return;
            }
            this.isClosed = true;
        };
        this.collapse = () => {
            this.collapsed = !this.collapsed;
            this.calcitePanelToggle.emit();
        };
        this.panelScrollHandler = () => {
            this.calcitePanelScroll.emit();
        };
        this.handleHeaderActionsStartSlotChange = (event) => {
            this.hasStartActions = slotChangeHasAssignedElement(event);
        };
        this.handleHeaderActionsEndSlotChange = (event) => {
            this.hasEndActions = slotChangeHasAssignedElement(event);
        };
        this.handleHeaderMenuActionsSlotChange = (event) => {
            this.hasMenuItems = slotChangeHasAssignedElement(event);
        };
        this.handleActionBarSlotChange = (event) => {
            const actionBars = slotChangeGetAssignedElements(event).filter((el) => el?.matches("calcite-action-bar"));
            actionBars.forEach((actionBar) => (actionBar.layout = "horizontal"));
            this.hasActionBar = !!actionBars.length;
        };
        this.handleHeaderContentSlotChange = (event) => {
            this.hasHeaderContent = slotChangeHasAssignedElement(event);
        };
        this.handleFabSlotChange = (event) => {
            this.hasFab = slotChangeHasAssignedElement(event);
        };
        this.handleFooterActionsSlotChange = (event) => {
            this.hasFooterActions = slotChangeHasAssignedElement(event);
        };
        this.handleFooterEndSlotChange = (event) => {
            this.hasFooterEndContent = slotChangeHasAssignedElement(event);
        };
        this.handleFooterStartSlotChange = (event) => {
            this.hasFooterStartContent = slotChangeHasAssignedElement(event);
        };
        this.handleFooterSlotChange = (event) => {
            this.hasFooterContent = slotChangeHasAssignedElement(event);
        };
        this.contentBottomSlotChangeHandler = (event) => {
            this.hasContentBottom = slotChangeHasAssignedElement(event);
        };
        this.contentTopSlotChangeHandler = (event) => {
            this.hasContentTop = slotChangeHasAssignedElement(event);
        };
        this.setPanelScrollEl = (el) => {
            this.panelScrollEl = el;
            this.resizeObserver?.disconnect();
            if (el) {
                this.resizeObserver?.observe(el);
                this.resizeHandler();
            }
        };
        this.handleAlertsSlotChange = (event) => {
            slotChangeGetAssignedElements(event)?.map((el) => {
                if (el.nodeName === "CALCITE-ALERT") {
                    el.embedded = true;
                }
            });
        };
        this.beforeClose = undefined;
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
        this.scale = "m";
        this.isClosed = false;
        this.hasStartActions = false;
        this.hasEndActions = false;
        this.hasMenuItems = false;
        this.hasHeaderContent = false;
        this.hasActionBar = false;
        this.hasContentBottom = false;
        this.hasContentTop = false;
        this.hasFab = false;
        this.hasFooterActions = false;
        this.hasFooterContent = false;
        this.hasFooterEndContent = false;
        this.hasFooterStartContent = false;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.showHeaderContent = false;
    }
    toggleDialog(value) {
        value ? this.close() : this.open();
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
        setUpLoadableComponent(this);
        await setUpMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLocalized(this);
        disconnectMessages(this);
        this.resizeObserver?.disconnect();
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
     * Sets focus on the component's first focusable element.
     */
    async setFocus() {
        await componentFocusable(this);
        focusFirstTabbable(this.containerEl);
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
        this.panelScrollEl?.scrollTo(options);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHeaderContent() {
        const { heading, headingLevel, description, hasHeaderContent } = this;
        const headingNode = heading ? (h(Heading, { class: CSS.heading, level: headingLevel }, heading)) : null;
        const descriptionNode = description ? h("span", { class: CSS.description }, description) : null;
        return !hasHeaderContent && (headingNode || descriptionNode) ? (h("div", { class: CSS.headerContent, key: "header-content" }, headingNode, descriptionNode)) : null;
    }
    renderActionBar() {
        return (h("div", { class: CSS.actionBarContainer, hidden: !this.hasActionBar }, h("slot", { name: SLOTS.actionBar, onSlotchange: this.handleActionBarSlotChange })));
    }
    renderHeaderSlottedContent() {
        return (h("div", { class: CSS.headerContent, hidden: !this.hasHeaderContent, key: "slotted-header-content" }, h("slot", { name: SLOTS.headerContent, onSlotchange: this.handleHeaderContentSlotChange })));
    }
    renderHeaderStartActions() {
        const { hasStartActions } = this;
        return (h("div", { class: { [CSS.headerActionsStart]: true, [CSS.headerActions]: true }, hidden: !hasStartActions, key: "header-actions-start" }, h("slot", { name: SLOTS.headerActionsStart, onSlotchange: this.handleHeaderActionsStartSlotChange })));
    }
    renderHeaderActionsEnd() {
        const { hasEndActions, messages, closable, collapsed, collapseDirection, collapsible, hasMenuItems, } = this;
        const { collapse, expand, close } = messages;
        const icons = [ICONS.expand, ICONS.collapse];
        if (collapseDirection === "up") {
            icons.reverse();
        }
        const collapseNode = collapsible ? (h("calcite-action", { "aria-expanded": toAriaBoolean(!collapsed), "aria-label": collapse, icon: collapsed ? icons[0] : icons[1], id: IDS.collapse, onClick: this.collapse, scale: this.scale, text: collapse, title: collapsed ? expand : collapse })) : null;
        const closeNode = closable ? (h("calcite-action", { "aria-label": close, icon: ICONS.close, id: IDS.close, onClick: this.handleUserClose, scale: this.scale, text: close, title: close })) : null;
        const slotNode = (h("slot", { name: SLOTS.headerActionsEnd, onSlotchange: this.handleHeaderActionsEndSlotChange }));
        const showContainer = hasEndActions || collapseNode || closeNode || hasMenuItems;
        return (h("div", { class: { [CSS.headerActionsEnd]: true, [CSS.headerActions]: true }, hidden: !showContainer, key: "header-actions-end" }, slotNode, this.renderMenu(), collapseNode, closeNode));
    }
    renderMenu() {
        const { hasMenuItems, messages, menuOpen } = this;
        return (h("calcite-action-menu", { flipPlacements: ["top", "bottom"], hidden: !hasMenuItems, key: "menu", label: messages.options, open: menuOpen, overlayPositioning: this.overlayPositioning, placement: "bottom-end" }, h("calcite-action", { icon: ICONS.menu, scale: this.scale, slot: SLOTS$1.trigger, text: messages.options }), h("slot", { name: SLOTS.headerMenuActions, onSlotchange: this.handleHeaderMenuActionsSlotChange })));
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
        return (h("header", { class: CSS.header, hidden: !(showHeaderContent || hasActionBar) }, h("div", { class: { [CSS.headerContainer]: true, [CSS.headerContainerBorderEnd]: hasActionBar }, hidden: !showHeaderContent }, this.renderHeaderStartActions(), this.renderHeaderSlottedContent(), headerContentNode, this.renderHeaderActionsEnd()), this.renderActionBar(), this.renderContentTop()));
    }
    renderFooterNode() {
        const { hasFooterEndContent, hasFooterStartContent, hasFooterContent, hasFooterActions } = this;
        const showFooter = hasFooterStartContent || hasFooterEndContent || hasFooterContent || hasFooterActions;
        return (h("footer", { class: CSS.footer, hidden: !showFooter }, h("div", { class: CSS.footerContent, hidden: !hasFooterContent }, h("slot", { name: SLOTS.footer, onSlotchange: this.handleFooterSlotChange })), h("div", { class: CSS.footerStart, hidden: hasFooterContent || !hasFooterStartContent }, h("slot", { name: SLOTS.footerStart, onSlotchange: this.handleFooterStartSlotChange })), h("div", { class: CSS.footerEnd, hidden: hasFooterContent || !hasFooterEndContent }, h("slot", { name: SLOTS.footerEnd, onSlotchange: this.handleFooterEndSlotChange })), h("div", { class: CSS.footerActions, hidden: hasFooterContent || !hasFooterActions }, h("slot", { key: "footer-actions-slot", name: SLOTS.footerActions, onSlotchange: this.handleFooterActionsSlotChange }))));
    }
    renderContent() {
        return (h("div", { class: CSS.contentWrapper, hidden: this.collapsible && this.collapsed, onScroll: this.panelScrollHandler, ref: this.setPanelScrollEl }, h("slot", null), this.renderFab()));
    }
    renderContentBottom() {
        return (h("div", { class: CSS.contentBottom, hidden: !this.hasContentBottom }, h("slot", { name: SLOTS.contentBottom, onSlotchange: this.contentBottomSlotChangeHandler })));
    }
    renderContentTop() {
        return (h("div", { class: CSS.contentTop, hidden: !this.hasContentTop }, h("slot", { name: SLOTS.contentTop, onSlotchange: this.contentTopSlotChangeHandler })));
    }
    renderFab() {
        return (h("div", { class: CSS.fabContainer, hidden: !this.hasFab }, h("slot", { name: SLOTS.fab, onSlotchange: this.handleFabSlotChange })));
    }
    render() {
        const { disabled, loading, panelKeyDownHandler, isClosed, closable } = this;
        const panelNode = (h("article", { key: '50e8c0bd158837c6c6666ceae7c269a16362ff76', "aria-busy": toAriaBoolean(loading), class: CSS.container, hidden: isClosed, ref: this.setContainerRef, tabIndex: closable ? 0 : -1 }, this.renderHeaderNode(), this.renderContent(), this.renderContentBottom(), this.renderFooterNode(), h("slot", { key: "alerts", name: SLOTS.alerts, onSlotchange: this.handleAlertsSlotChange })));
        return (h(Host, { key: '171f25f4342aff6c7256cda01025f5191ad4c2c2', onKeyDown: panelKeyDownHandler }, h(InteractiveContainer, { key: 'c26e8bc2d79ea63b7110f879d058024e6198e98e', disabled: disabled }, loading ? h("calcite-scrim", { loading: loading }) : null, panelNode)));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "closed": ["toggleDialog"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return CalcitePanelStyle0; }
}, [1, "calcite-panel", {
        "beforeClose": [16],
        "closed": [1540],
        "disabled": [516],
        "closable": [516],
        "collapsed": [516],
        "collapseDirection": [1, "collapse-direction"],
        "collapsible": [516],
        "headingLevel": [514, "heading-level"],
        "loading": [516],
        "heading": [1],
        "description": [1],
        "menuOpen": [516, "menu-open"],
        "messageOverrides": [1040],
        "messages": [1040],
        "overlayPositioning": [513, "overlay-positioning"],
        "scale": [513],
        "isClosed": [32],
        "hasStartActions": [32],
        "hasEndActions": [32],
        "hasMenuItems": [32],
        "hasHeaderContent": [32],
        "hasActionBar": [32],
        "hasContentBottom": [32],
        "hasContentTop": [32],
        "hasFab": [32],
        "hasFooterActions": [32],
        "hasFooterContent": [32],
        "hasFooterEndContent": [32],
        "hasFooterStartContent": [32],
        "defaultMessages": [32],
        "effectiveLocale": [32],
        "showHeaderContent": [32],
        "setFocus": [64],
        "scrollContentTo": [64]
    }, undefined, {
        "closed": ["toggleDialog"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-panel", "calcite-action", "calcite-action-menu", "calcite-icon", "calcite-loader", "calcite-popover", "calcite-scrim"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-panel":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Panel);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { Panel as P, SLOTS as S, defineCustomElement as d };
