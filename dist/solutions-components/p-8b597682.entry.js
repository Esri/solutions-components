/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement, F as Fragment } from './p-6eb37ed2.js';
import { s as slotChangeHasAssignedElement, h as slotChangeGetAssignedElements, f as focusFirstTabbable, t as toAriaBoolean } from './p-68ec5c15.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './p-415cf05e.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './p-18f18ab3.js';
import { c as createObserver } from './p-c638d28e.js';
import { S as SLOTS$2 } from './p-c5e13ebc.js';
import { H as Heading } from './p-14fbc662.js';
import { c as connectLocalized, d as disconnectLocalized } from './p-939bc1b4.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './p-1a9a47a0.js';
import { S as SLOTS$1, C as CSS$1, I as IDS, a as ICONS } from './p-56601650.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './p-06084e6c.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';
import './p-acaae81d.js';
import './p-fe6f7734.js';

const panelCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;overflow:hidden;--calcite-min-header-height:calc(var(--calcite-icon-size) * 3)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}:host([scale=s]){--calcite-internal-panel-default-padding:var(--calcite-spacing-sm);--calcite-internal-panel-header-vertical-padding:10px}:host([scale=s]) .header-content .heading{font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=s]) .header-content .description{font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]){--calcite-internal-panel-default-padding:var(--calcite-spacing-md);--calcite-internal-panel-header-vertical-padding:var(--calcite-spacing-lg)}:host([scale=m]) .header-content .heading{font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=m]) .header-content .description{font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]){--calcite-internal-panel-default-padding:var(--calcite-spacing-xl);--calcite-internal-panel-header-vertical-padding:var(--calcite-spacing-xxl)}:host([scale=l]) .header-content .heading{font-size:var(--calcite-font-size-1);line-height:1.5rem}:host([scale=l]) .header-content .description{font-size:var(--calcite-font-size-0);line-height:1.25rem}.content-top,.content-bottom{display:flex;align-items:flex-start;align-self:stretch;border-block-start:1px solid var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1)}.container{position:relative;margin:0px;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;background-color:var(--calcite-color-background);padding:0px;outline-color:transparent;transition:max-block-size var(--calcite-animation-timing), inline-size var(--calcite-animation-timing)}.container:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.container[hidden]{display:none}.header{z-index:var(--calcite-z-index-header);display:flex;flex-direction:column;background-color:var(--calcite-color-foreground-1);border-block-end:var(--calcite-panel-header-border-block-end, 1px solid var(--calcite-color-border-3))}.header-container{display:flex;inline-size:100%;flex-direction:row;align-items:stretch;justify-content:flex-start;flex:0 0 auto}.header-container--border-end{border-block-end:1px solid var(--calcite-color-border-3)}.action-bar-container{inline-size:100%}.action-bar-container ::slotted(calcite-action-bar){inline-size:100%}.header-content{display:flex;flex-direction:column;overflow:hidden;padding-inline:0.75rem;padding-block:0.875rem;margin-inline-end:auto}.header-content .heading,.header-content .description{display:block;overflow-wrap:break-word;padding:0px}.header-content .heading{margin-inline:0px;margin-block:0px 0.25rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.header-content .heading:only-child{margin-block-end:0px}.header-content .description{color:var(--calcite-color-text-2)}.back-button{border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);border-inline-end-width:1px}.header-actions{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:stretch}.header-actions--end{margin-inline-start:auto}.content-wrapper{position:relative;display:flex;block-size:100%;flex:1 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch;overflow:auto;background-color:var(--calcite-color-background);outline-color:transparent;padding:var(--calcite-panel-content-space, 0)}.content-wrapper:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.content-top,.content-bottom{padding:var(--calcite-internal-panel-default-padding)}.header-content{padding-block:var(--calcite-internal-panel-header-vertical-padding);padding-inline:var(--calcite-internal-panel-default-padding)}.footer{margin-block-start:auto;display:flex;flex-direction:row;align-content:space-between;align-items:center;justify-content:center;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--2);line-height:1.375;border-block-start:1px solid var(--calcite-color-border-3);padding:var(--calcite-panel-footer-padding, var(--calcite-internal-panel-default-padding))}.footer-content{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:center}.footer-actions{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:space-evenly;gap:var(--calcite-internal-panel-default-padding)}.footer-start{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:flex-start;margin-inline-end:auto;gap:var(--calcite-internal-panel-default-padding)}.footer-end{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:flex-end;margin-inline-start:auto;gap:var(--calcite-internal-panel-default-padding)}.fab-container{position:sticky;inset-block-end:0px;z-index:var(--calcite-z-index-sticky);margin-block:0px;margin-inline:auto;display:block;padding:0.5rem;inset-inline:0;inline-size:-moz-fit-content;inline-size:fit-content}:host([hidden]){display:none}[hidden]{display:none}";
const CalcitePanelStyle0 = panelCss;

const Panel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        const headingNode = heading ? (h(Heading, { class: CSS$1.heading, level: headingLevel }, heading)) : null;
        const descriptionNode = description ? h("span", { class: CSS$1.description }, description) : null;
        return !hasHeaderContent && (headingNode || descriptionNode) ? (h("div", { class: CSS$1.headerContent, key: "header-content" }, headingNode, descriptionNode)) : null;
    }
    renderActionBar() {
        return (h("div", { class: CSS$1.actionBarContainer, hidden: !this.hasActionBar }, h("slot", { name: SLOTS$1.actionBar, onSlotchange: this.handleActionBarSlotChange })));
    }
    renderHeaderSlottedContent() {
        return (h("div", { class: CSS$1.headerContent, hidden: !this.hasHeaderContent, key: "slotted-header-content" }, h("slot", { name: SLOTS$1.headerContent, onSlotchange: this.handleHeaderContentSlotChange })));
    }
    renderHeaderStartActions() {
        const { hasStartActions } = this;
        return (h("div", { class: { [CSS$1.headerActionsStart]: true, [CSS$1.headerActions]: true }, hidden: !hasStartActions, key: "header-actions-start" }, h("slot", { name: SLOTS$1.headerActionsStart, onSlotchange: this.handleHeaderActionsStartSlotChange })));
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
        const slotNode = (h("slot", { name: SLOTS$1.headerActionsEnd, onSlotchange: this.handleHeaderActionsEndSlotChange }));
        const showContainer = hasEndActions || collapseNode || closeNode || hasMenuItems;
        return (h("div", { class: { [CSS$1.headerActionsEnd]: true, [CSS$1.headerActions]: true }, hidden: !showContainer, key: "header-actions-end" }, slotNode, this.renderMenu(), collapseNode, closeNode));
    }
    renderMenu() {
        const { hasMenuItems, messages, menuOpen } = this;
        return (h("calcite-action-menu", { flipPlacements: ["top", "bottom"], hidden: !hasMenuItems, key: "menu", label: messages.options, open: menuOpen, overlayPositioning: this.overlayPositioning, placement: "bottom-end" }, h("calcite-action", { icon: ICONS.menu, scale: this.scale, slot: SLOTS$2.trigger, text: messages.options }), h("slot", { name: SLOTS$1.headerMenuActions, onSlotchange: this.handleHeaderMenuActionsSlotChange })));
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
        return (h("header", { class: CSS$1.header, hidden: !(showHeaderContent || hasActionBar) }, h("div", { class: { [CSS$1.headerContainer]: true, [CSS$1.headerContainerBorderEnd]: hasActionBar }, hidden: !showHeaderContent }, this.renderHeaderStartActions(), this.renderHeaderSlottedContent(), headerContentNode, this.renderHeaderActionsEnd()), this.renderActionBar(), this.renderContentTop()));
    }
    renderFooterNode() {
        const { hasFooterEndContent, hasFooterStartContent, hasFooterContent, hasFooterActions } = this;
        const showFooter = hasFooterStartContent || hasFooterEndContent || hasFooterContent || hasFooterActions;
        return (h("footer", { class: CSS$1.footer, hidden: !showFooter }, h("div", { class: CSS$1.footerContent, hidden: !hasFooterContent }, h("slot", { name: SLOTS$1.footer, onSlotchange: this.handleFooterSlotChange })), h("div", { class: CSS$1.footerStart, hidden: hasFooterContent || !hasFooterStartContent }, h("slot", { name: SLOTS$1.footerStart, onSlotchange: this.handleFooterStartSlotChange })), h("div", { class: CSS$1.footerEnd, hidden: hasFooterContent || !hasFooterEndContent }, h("slot", { name: SLOTS$1.footerEnd, onSlotchange: this.handleFooterEndSlotChange })), h("div", { class: CSS$1.footerActions, hidden: hasFooterContent || !hasFooterActions }, h("slot", { key: "footer-actions-slot", name: SLOTS$1.footerActions, onSlotchange: this.handleFooterActionsSlotChange }))));
    }
    renderContent() {
        return (h("div", { class: CSS$1.contentWrapper, hidden: this.collapsible && this.collapsed, onScroll: this.panelScrollHandler, ref: this.setPanelScrollEl }, h("slot", null), this.renderFab()));
    }
    renderContentBottom() {
        return (h("div", { class: CSS$1.contentBottom, hidden: !this.hasContentBottom }, h("slot", { name: SLOTS$1.contentBottom, onSlotchange: this.contentBottomSlotChangeHandler })));
    }
    renderContentTop() {
        return (h("div", { class: CSS$1.contentTop, hidden: !this.hasContentTop }, h("slot", { name: SLOTS$1.contentTop, onSlotchange: this.contentTopSlotChangeHandler })));
    }
    renderFab() {
        return (h("div", { class: CSS$1.fabContainer, hidden: !this.hasFab }, h("slot", { name: SLOTS$1.fab, onSlotchange: this.handleFabSlotChange })));
    }
    render() {
        const { disabled, loading, panelKeyDownHandler, isClosed, closable } = this;
        const panelNode = (h("article", { key: '50e8c0bd158837c6c6666ceae7c269a16362ff76', "aria-busy": toAriaBoolean(loading), class: CSS$1.container, hidden: isClosed, ref: this.setContainerRef, tabIndex: closable ? 0 : -1 }, this.renderHeaderNode(), this.renderContent(), this.renderContentBottom(), this.renderFooterNode(), h("slot", { key: "alerts", name: SLOTS$1.alerts, onSlotchange: this.handleAlertsSlotChange })));
        return (h(Host, { key: '171f25f4342aff6c7256cda01025f5191ad4c2c2', onKeyDown: panelKeyDownHandler }, h(InteractiveContainer, { key: 'c26e8bc2d79ea63b7110f879d058024e6198e98e', disabled: disabled }, loading ? h("calcite-scrim", { loading: loading }) : null, panelNode)));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "closed": ["toggleDialog"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Panel.style = CalcitePanelStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    main: "main",
    content: "content",
    contentBehind: "content--behind",
    contentBottom: "content-bottom",
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
    dialogs: "dialogs",
};

const shellCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{position:absolute;inset:0px;display:flex;block-size:100%;inline-size:100%;flex-direction:column;overflow:hidden;--calcite-shell-tip-spacing:26vw}.main{position:relative;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;flex-direction:row;justify-content:space-between;overflow:hidden}.content{display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap;overflow:auto;justify-content:space-between}.content ::slotted(:not(calcite-tip-manager)){position:relative;z-index:var(--calcite-z-index)}.content ::slotted(calcite-shell-center-row),.content ::slotted(calcite-panel),.content ::slotted(calcite-flow){flex:1 1 auto;align-self:stretch;max-block-size:unset}.content--behind{position:absolute;inset:0px;border-width:0px;z-index:calc(var(--calcite-z-index) - 1);display:initial}.content--non-interactive{pointer-events:none;display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap}::slotted(calcite-shell-center-row){inline-size:unset}::slotted(.header .heading){font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-normal)}slot[name=panel-start]::slotted(calcite-shell-panel),slot[name=panel-end]::slotted(calcite-shell-panel){position:relative;z-index:var(--calcite-z-index-header)}slot[name=panel-end]::slotted(calcite-shell-panel){margin-inline-start:auto}::slotted(calcite-panel),::slotted(calcite-flow){border-width:1px;border-inline-start-width:0px;border-inline-end-width:0px;border-style:solid;border-color:var(--calcite-color-border-3)}slot[name=center-row]::slotted(calcite-shell-center-row:not([detached])),slot[name=panel-top]::slotted(calcite-shell-center-row:not([detached])),slot[name=panel-bottom]::slotted(calcite-shell-center-row:not([detached])){border-inline-start-width:1px;border-inline-end-width:1px;border-color:var(--calcite-color-border-3)}.center-content{display:flex;flex-direction:column;justify-content:space-between;block-size:100%;inline-size:100%;min-inline-size:0}.content-bottom{justify-content:flex-end}::slotted(calcite-shell-center-row){flex:none;align-self:stretch}::slotted(calcite-tip-manager){position:absolute;z-index:var(--calcite-z-index-toast);box-sizing:border-box}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}::slotted(calcite-tip-manager){animation:in-up var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:0.25rem;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);inset-block-end:0.5rem;inset-inline:var(--calcite-shell-tip-spacing)}slot[name=center-row]::slotted(calcite-shell-center-row),slot[name=panel-bottom]::slotted(calcite-shell-center-row){margin-block-start:auto}slot[name=panel-top]::slotted(calcite-shell-center-row){margin-block-end:auto}.position-wrapper{position:absolute;pointer-events:none;inset:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteShellStyle0 = shellCss;

const Shell = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleHeaderSlotChange = (event) => {
            this.hasHeader = !!slotChangeHasAssignedElement(event);
        };
        this.handleFooterSlotChange = (event) => {
            this.hasFooter = !!slotChangeHasAssignedElement(event);
        };
        this.handleAlertsSlotChange = (event) => {
            this.hasAlerts = !!slotChangeHasAssignedElement(event);
            slotChangeGetAssignedElements(event)?.map((el) => {
                if (el.tagName === "CALCITE-ALERT") {
                    el.embedded = true;
                }
            });
        };
        this.handleSheetsSlotChange = (event) => {
            this.hasSheets = !!slotChangeHasAssignedElement(event);
            slotChangeGetAssignedElements(event)?.map((el) => {
                if (el.tagName === "CALCITE-SHEET") {
                    el.embedded = true;
                }
            });
        };
        this.handleModalsSlotChange = (event) => {
            this.hasModals = !!slotChangeHasAssignedElement(event);
            slotChangeGetAssignedElements(event)?.map((el) => {
                if (el.tagName === "CALCITE-MODAL") {
                    el.embedded = true;
                }
            });
        };
        this.handlePanelTopChange = (event) => {
            this.hasPanelTop = slotChangeHasAssignedElement(event);
        };
        this.handlePanelBottomChange = (event) => {
            this.hasPanelBottom = slotChangeHasAssignedElement(event);
        };
        this.handleDialogsSlotChange = (event) => {
            this.hasDialogs = !!slotChangeHasAssignedElement(event);
            slotChangeGetAssignedElements(event)?.map((el) => {
                if (el.tagName === "CALCITE-DIALOG") {
                    el.embedded = true;
                }
            });
        };
        this.contentBehind = false;
        this.hasHeader = false;
        this.hasFooter = false;
        this.hasAlerts = false;
        this.hasModals = false;
        this.hasDialogs = false;
        this.hasSheets = false;
        this.hasPanelTop = false;
        this.hasPanelBottom = false;
        this.hasOnlyPanelBottom = false;
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
    updateHasOnlyPanelBottom() {
        this.hasOnlyPanelBottom = !this.hasPanelTop && this.hasPanelBottom;
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectConditionalSlotComponent(this);
    }
    disconnectedCallback() {
        disconnectConditionalSlotComponent(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHeader() {
        return (h("div", { hidden: !this.hasHeader }, h("slot", { key: "header", name: SLOTS.header, onSlotchange: this.handleHeaderSlotChange })));
    }
    renderFooter() {
        return (h("div", { class: CSS.footer, hidden: !this.hasFooter, key: "footer" }, h("slot", { name: SLOTS.footer, onSlotchange: this.handleFooterSlotChange })));
    }
    renderAlerts() {
        return (h("div", { hidden: !this.hasAlerts }, h("slot", { key: "alerts", name: SLOTS.alerts, onSlotchange: this.handleAlertsSlotChange })));
    }
    renderSheets() {
        return (h("div", { hidden: !this.hasSheets }, h("slot", { key: "sheets", name: SLOTS.sheets, onSlotchange: this.handleSheetsSlotChange })));
    }
    renderModals() {
        return (h("div", { hidden: !this.hasModals }, h("slot", { key: "modals", name: SLOTS.modals, onSlotchange: this.handleModalsSlotChange })));
    }
    renderDialogs() {
        return (h("div", { hidden: !this.hasDialogs }, h("slot", { key: "dialogs", name: SLOTS.dialogs, onSlotchange: this.handleDialogsSlotChange })));
    }
    renderContent() {
        const { panelIsResizing } = this;
        const defaultSlotNode = h("slot", { key: "default-slot" });
        const defaultSlotContainerNode = panelIsResizing ? (h("div", { class: CSS.contentNonInteractive }, defaultSlotNode)) : (defaultSlotNode);
        const deprecatedCenterRowSlotNode = (h("slot", { key: "center-row-slot", name: SLOTS.centerRow }));
        const panelBottomSlotNode = (h("slot", { key: "panel-bottom-slot", name: SLOTS.panelBottom, onSlotchange: this.handlePanelBottomChange }));
        const panelTopSlotNode = (h("slot", { key: "panel-top-slot", name: SLOTS.panelTop, onSlotchange: this.handlePanelTopChange }));
        const contentContainerKey = "content-container";
        const content = this.contentBehind
            ? [
                h("div", { class: {
                        [CSS.content]: true,
                        [CSS.contentBehind]: true,
                    }, key: contentContainerKey }, defaultSlotContainerNode),
                h("div", { class: {
                        [CSS.contentBehindCenterContent]: true,
                        [CSS.contentBottom]: this.hasOnlyPanelBottom,
                    } }, panelTopSlotNode, panelBottomSlotNode, deprecatedCenterRowSlotNode),
            ]
            : [
                h("div", { class: { [CSS.content]: true, [CSS.contentBottom]: this.hasOnlyPanelBottom }, key: contentContainerKey }, panelTopSlotNode, defaultSlotContainerNode, panelBottomSlotNode, deprecatedCenterRowSlotNode),
            ];
        return content;
    }
    renderMain() {
        return (h("div", { class: CSS.main }, h("slot", { name: SLOTS.panelStart }), this.renderContent(), h("slot", { name: SLOTS.panelEnd })));
    }
    renderPositionedSlots() {
        return (h("div", { class: CSS.positionedSlotWrapper }, this.renderAlerts(), this.renderModals(), this.renderDialogs(), this.renderSheets()));
    }
    render() {
        return (h(Fragment, { key: 'd5aba67d8b89161985cdf81c74b8532a522b3fda' }, this.renderHeader(), this.renderMain(), this.renderFooter(), this.renderPositionedSlots()));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "hasPanelTop": ["updateHasOnlyPanelBottom"],
        "hasPanelBottom": ["updateHasOnlyPanelBottom"]
    }; }
};
Shell.style = CalciteShellStyle0;

export { Panel as calcite_panel, Shell as calcite_shell };
