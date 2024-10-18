/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const array = require('./array-286e5a3b.js');
const dom = require('./dom-795d4a33.js');
const guid = require('./guid-e84a8375.js');
const key = require('./key-47c9469a.js');
const loadable = require('./loadable-1c888c87.js');
const resources = require('./resources-b3dc59f7.js');
const interactive = require('./interactive-a128ac30.js');
const observers = require('./observers-18d87cb5.js');
const Heading = require('./Heading-a3e36113.js');
const locale = require('./locale-da840314.js');
const t9n = require('./t9n-ed5c03a7.js');
const floatingUi = require('./floating-ui-0f85d59c.js');
const resources$1 = require('./resources-535f936c.js');
require('./resources-18f799c7.js');
require('./browser-333a21c5.js');
require('./debounce-7f1e04d6.js');

const actionMenuCss = ":host{box-sizing:border-box;display:flex;flex-direction:column;font-size:var(--calcite-font-size-1)}::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm)}.default-trigger{position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}slot[name=trigger]::slotted(calcite-action),calcite-action::slotted([slot=trigger]){position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}.menu{display:flex;max-block-size:45vh;flex-direction:column;flex-wrap:nowrap;overflow-y:auto;overflow-x:hidden;outline:2px solid transparent;outline-offset:2px;gap:var(--calcite-action-menu-items-space, 0)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteActionMenuStyle0 = actionMenuCss;

const SUPPORTED_MENU_NAV_KEYS = ["ArrowUp", "ArrowDown", "End", "Home"];
const ActionMenu = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteActionMenuOpen = index.createEvent(this, "calciteActionMenuOpen", 6);
        this.actionElements = [];
        this.guid = `calcite-action-menu-${guid.guid()}`;
        this.menuId = `${this.guid}-menu`;
        this.menuButtonId = `${this.guid}-menu-button`;
        // --------------------------------------------------------------------------
        //
        //  Component Methods
        //
        // --------------------------------------------------------------------------
        this.connectMenuButtonEl = () => {
            const { menuButtonId, menuId, open, label } = this;
            const menuButtonEl = this.slottedMenuButtonEl || this.defaultMenuButtonEl;
            if (this.menuButtonEl === menuButtonEl) {
                return;
            }
            this.disconnectMenuButtonEl();
            this.menuButtonEl = menuButtonEl;
            this.setTooltipReferenceElement();
            if (!menuButtonEl) {
                return;
            }
            menuButtonEl.active = open;
            menuButtonEl.setAttribute("aria-controls", menuId);
            menuButtonEl.setAttribute("aria-expanded", dom.toAriaBoolean(open));
            menuButtonEl.setAttribute("aria-haspopup", "true");
            if (!menuButtonEl.id) {
                menuButtonEl.id = menuButtonId;
            }
            if (!menuButtonEl.label) {
                menuButtonEl.label = label;
            }
            if (!menuButtonEl.text) {
                menuButtonEl.text = label;
            }
            menuButtonEl.addEventListener("click", this.menuButtonClick);
            menuButtonEl.addEventListener("keydown", this.menuButtonKeyDown);
        };
        this.disconnectMenuButtonEl = () => {
            const { menuButtonEl } = this;
            if (!menuButtonEl) {
                return;
            }
            menuButtonEl.removeEventListener("click", this.menuButtonClick);
            menuButtonEl.removeEventListener("keydown", this.menuButtonKeyDown);
        };
        this.setMenuButtonEl = (event) => {
            const actions = event.target
                .assignedElements({
                flatten: true,
            })
                .filter((el) => el?.matches("calcite-action"));
            this.slottedMenuButtonEl = actions[0];
            this.connectMenuButtonEl();
        };
        this.setDefaultMenuButtonEl = (el) => {
            this.defaultMenuButtonEl = el;
            this.connectMenuButtonEl();
        };
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleCalciteActionClick = () => {
            this.open = false;
            this.setFocus();
        };
        this.menuButtonClick = () => {
            this.toggleOpen();
        };
        this.updateTooltip = (event) => {
            const tooltips = event.target
                .assignedElements({
                flatten: true,
            })
                .filter((el) => el?.matches("calcite-tooltip"));
            this.tooltipEl = tooltips[0];
            this.setTooltipReferenceElement();
        };
        this.setTooltipReferenceElement = () => {
            const { tooltipEl, expanded, menuButtonEl, open } = this;
            if (tooltipEl) {
                tooltipEl.referenceElement = !expanded && !open ? menuButtonEl : null;
            }
        };
        this.updateAction = (action, index) => {
            const { guid, activeMenuItemIndex } = this;
            const id = `${guid}-action-${index}`;
            action.tabIndex = -1;
            action.setAttribute("role", "menuitem");
            if (!action.id) {
                action.id = id;
            }
            // data attribute is used to style the "activeMenuItemIndex" action using token focus styling.
            action.toggleAttribute(resources.activeAttr, index === activeMenuItemIndex);
        };
        this.updateActions = (actions) => {
            actions?.forEach(this.updateAction);
        };
        this.handleDefaultSlotChange = (event) => {
            const actions = event.target
                .assignedElements({
                flatten: true,
            })
                .reduce((previousValue, currentValue) => {
                if (currentValue?.matches("calcite-action")) {
                    previousValue.push(currentValue);
                    return previousValue;
                }
                if (currentValue?.matches("calcite-action-group")) {
                    return previousValue.concat(Array.from(currentValue.querySelectorAll("calcite-action")));
                }
                return previousValue;
            }, []);
            this.actionElements = actions.filter((action) => !action.disabled && !action.hidden);
        };
        this.menuButtonKeyDown = (event) => {
            const { key: key$1 } = event;
            const { actionElements, activeMenuItemIndex, open } = this;
            if (!actionElements.length) {
                return;
            }
            if (key.isActivationKey(key$1)) {
                event.preventDefault();
                if (!open) {
                    this.toggleOpen();
                    return;
                }
                const action = actionElements[activeMenuItemIndex];
                action ? action.click() : this.toggleOpen(false);
            }
            if (key$1 === "Tab") {
                this.open = false;
                return;
            }
            if (key$1 === "Escape") {
                this.toggleOpen(false);
                event.preventDefault();
                return;
            }
            this.handleActionNavigation(event, key$1, actionElements);
        };
        this.handleActionNavigation = (event, key, actions) => {
            if (!this.isValidKey(key, SUPPORTED_MENU_NAV_KEYS)) {
                return;
            }
            event.preventDefault();
            if (!this.open) {
                this.toggleOpen();
                if (key === "Home" || key === "ArrowDown") {
                    this.activeMenuItemIndex = 0;
                }
                if (key === "End" || key === "ArrowUp") {
                    this.activeMenuItemIndex = actions.length - 1;
                }
                return;
            }
            if (key === "Home") {
                this.activeMenuItemIndex = 0;
            }
            if (key === "End") {
                this.activeMenuItemIndex = actions.length - 1;
            }
            const currentIndex = this.activeMenuItemIndex;
            if (key === "ArrowUp") {
                this.activeMenuItemIndex = array.getRoundRobinIndex(Math.max(currentIndex - 1, -1), actions.length);
            }
            if (key === "ArrowDown") {
                this.activeMenuItemIndex = array.getRoundRobinIndex(currentIndex + 1, actions.length);
            }
        };
        this.toggleOpenEnd = () => {
            this.setFocus();
            this.el.removeEventListener("calcitePopoverOpen", this.toggleOpenEnd);
        };
        this.toggleOpen = (value = !this.open) => {
            this.el.addEventListener("calcitePopoverOpen", this.toggleOpenEnd);
            this.open = value;
        };
        this.handlePopoverOpen = () => {
            this.open = true;
        };
        this.handlePopoverClose = () => {
            this.open = false;
        };
        this.appearance = "solid";
        this.expanded = false;
        this.flipPlacements = undefined;
        this.label = undefined;
        this.open = false;
        this.overlayPositioning = "absolute";
        this.placement = "auto";
        this.scale = undefined;
        this.menuButtonEl = undefined;
        this.activeMenuItemIndex = -1;
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        this.connectMenuButtonEl();
    }
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    disconnectedCallback() {
        this.disconnectMenuButtonEl();
    }
    expandedHandler() {
        this.open = false;
        this.setTooltipReferenceElement();
    }
    openHandler(open) {
        this.activeMenuItemIndex = this.open ? 0 : -1;
        if (this.menuButtonEl) {
            this.menuButtonEl.active = open;
        }
        this.calciteActionMenuOpen.emit();
        this.setTooltipReferenceElement();
    }
    activeMenuItemIndexHandler() {
        this.updateActions(this.actionElements);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        return dom.focusElement(this.menuButtonEl);
    }
    renderMenuButton() {
        const { appearance, label, scale, expanded } = this;
        const menuButtonSlot = (index.h("slot", { name: resources.SLOTS.trigger, onSlotchange: this.setMenuButtonEl }, index.h("calcite-action", { appearance: appearance, class: resources.CSS.defaultTrigger, icon: resources.ICONS.menu, ref: this.setDefaultMenuButtonEl, scale: scale, text: label, textEnabled: expanded })));
        return menuButtonSlot;
    }
    renderMenuItems() {
        const { actionElements, activeMenuItemIndex, open, menuId, menuButtonEl, label, placement, overlayPositioning, flipPlacements, } = this;
        const activeAction = actionElements[activeMenuItemIndex];
        const activeDescendantId = activeAction?.id || null;
        return (index.h("calcite-popover", { autoClose: true, flipPlacements: flipPlacements, focusTrapDisabled: true, label: label, offsetDistance: 0, onCalcitePopoverClose: this.handlePopoverClose, onCalcitePopoverOpen: this.handlePopoverOpen, open: open, overlayPositioning: overlayPositioning, placement: placement, pointerDisabled: true, referenceElement: menuButtonEl }, index.h("div", { "aria-activedescendant": activeDescendantId, "aria-labelledby": menuButtonEl?.id, class: resources.CSS.menu, id: menuId, onClick: this.handleCalciteActionClick, role: "menu", tabIndex: -1 }, index.h("slot", { onSlotchange: this.handleDefaultSlotChange }))));
    }
    render() {
        return (index.h(index.Fragment, { key: 'd13aa4f3d43fb5651c0487ccfa456813f69955d2' }, this.renderMenuButton(), this.renderMenuItems(), index.h("slot", { key: 'b63d187516c766db6a1b1db3df34050fdec9e6ce', name: resources.SLOTS.tooltip, onSlotchange: this.updateTooltip })));
    }
    isValidKey(key, supportedKeys) {
        return !!supportedKeys.find((k) => k === key);
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "expanded": ["expandedHandler"],
        "open": ["openHandler"],
        "activeMenuItemIndex": ["activeMenuItemIndexHandler"]
    }; }
};
ActionMenu.style = CalciteActionMenuStyle0;

const panelCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;overflow:hidden;--calcite-min-header-height:calc(var(--calcite-icon-size) * 3)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}:host([scale=s]){--calcite-internal-panel-default-padding:var(--calcite-spacing-sm);--calcite-internal-panel-header-vertical-padding:10px}:host([scale=s]) .header-content .heading{font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=s]) .header-content .description{font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=m]){--calcite-internal-panel-default-padding:var(--calcite-spacing-md);--calcite-internal-panel-header-vertical-padding:var(--calcite-spacing-lg)}:host([scale=m]) .header-content .heading{font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=m]) .header-content .description{font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]){--calcite-internal-panel-default-padding:var(--calcite-spacing-xl);--calcite-internal-panel-header-vertical-padding:var(--calcite-spacing-xxl)}:host([scale=l]) .header-content .heading{font-size:var(--calcite-font-size-1);line-height:1.5rem}:host([scale=l]) .header-content .description{font-size:var(--calcite-font-size-0);line-height:1.25rem}.content-top,.content-bottom{display:flex;align-items:flex-start;align-self:stretch;border-block-start:1px solid var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1)}.container{position:relative;margin:0px;display:flex;inline-size:100%;flex:1 1 auto;flex-direction:column;align-items:stretch;background-color:var(--calcite-color-background);padding:0px;transition:max-block-size var(--calcite-animation-timing), inline-size var(--calcite-animation-timing)}.container[hidden]{display:none}.header{z-index:var(--calcite-z-index-header);display:flex;flex-direction:column;background-color:var(--calcite-color-foreground-1);border-block-end:var(--calcite-panel-header-border-block-end, 1px solid var(--calcite-color-border-3))}.header-container{display:flex;inline-size:100%;flex-direction:row;align-items:stretch;justify-content:flex-start;flex:0 0 auto}.header-container--border-end{border-block-end:1px solid var(--calcite-color-border-3)}.action-bar-container{inline-size:100%}.action-bar-container ::slotted(calcite-action-bar){inline-size:100%}.header-content{display:flex;flex-direction:column;overflow:hidden;padding-inline:0.75rem;padding-block:0.875rem;margin-inline-end:auto}.header-content .heading,.header-content .description{display:block;overflow-wrap:break-word;padding:0px}.header-content .heading{margin-inline:0px;margin-block:0px 0.25rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.header-content .heading:only-child{margin-block-end:0px}.header-content .description{color:var(--calcite-color-text-2)}.back-button{border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);border-inline-end-width:1px}.header-actions{display:flex;flex-direction:row;flex-wrap:nowrap;align-items:stretch}.header-actions--end{margin-inline-start:auto}.content-wrapper{position:relative;display:flex;block-size:100%;flex:1 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch;overflow:auto;outline-color:transparent;padding:var(--calcite-panel-content-space, 0);background:var(--calcite-panel-background-color, var(--calcite-color-background))}.content-wrapper:focus-visible{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.content-top,.content-bottom{padding:var(--calcite-internal-panel-default-padding)}.header-content{flex:1 1 auto;padding-block:var(--calcite-internal-panel-header-vertical-padding);padding-inline:var(--calcite-internal-panel-default-padding)}.footer{margin-block-start:auto;display:flex;flex-direction:row;align-content:space-between;align-items:center;justify-content:center;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--2);line-height:1.375;border-block-start:1px solid var(--calcite-color-border-3);padding:var(--calcite-panel-footer-padding, var(--calcite-internal-panel-default-padding))}.footer-content{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:center}.footer-actions{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:space-evenly;gap:var(--calcite-internal-panel-default-padding)}.footer-start{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:flex-start;margin-inline-end:auto;gap:var(--calcite-internal-panel-default-padding)}.footer-end{display:flex;flex:1 1 0%;flex-direction:row;align-items:center;justify-content:flex-end;margin-inline-start:auto;gap:var(--calcite-internal-panel-default-padding)}.fab-container{position:sticky;inset-block-end:0px;z-index:var(--calcite-z-index-sticky);margin-block:0px;margin-inline:auto;display:block;padding:0.5rem;inset-inline:0;inline-size:-moz-fit-content;inline-size:fit-content}:host([hidden]){display:none}[hidden]{display:none}";
const CalcitePanelStyle0 = panelCss;

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
            const hasScrollingContent = panelScrollEl.scrollHeight > panelScrollEl.offsetHeight;
            // intentionally using setAttribute to avoid reflecting -1 so default browser behavior will occur
            if (hasScrollingContent) {
                panelScrollEl.setAttribute("tabindex", "0");
            }
            else {
                panelScrollEl.removeAttribute("tabindex");
            }
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
            this.hasStartActions = dom.slotChangeHasAssignedElement(event);
        };
        this.handleHeaderActionsEndSlotChange = (event) => {
            this.hasEndActions = dom.slotChangeHasAssignedElement(event);
        };
        this.handleHeaderMenuActionsSlotChange = (event) => {
            this.hasMenuItems = dom.slotChangeHasAssignedElement(event);
        };
        this.handleActionBarSlotChange = (event) => {
            const actionBars = dom.slotChangeGetAssignedElements(event).filter((el) => el?.matches("calcite-action-bar"));
            actionBars.forEach((actionBar) => (actionBar.layout = "horizontal"));
            this.hasActionBar = !!actionBars.length;
        };
        this.handleHeaderContentSlotChange = (event) => {
            this.hasHeaderContent = dom.slotChangeHasAssignedElement(event);
        };
        this.handleFabSlotChange = (event) => {
            this.hasFab = dom.slotChangeHasAssignedElement(event);
        };
        this.handleFooterActionsSlotChange = (event) => {
            this.hasFooterActions = dom.slotChangeHasAssignedElement(event);
        };
        this.handleFooterEndSlotChange = (event) => {
            this.hasFooterEndContent = dom.slotChangeHasAssignedElement(event);
        };
        this.handleFooterStartSlotChange = (event) => {
            this.hasFooterStartContent = dom.slotChangeHasAssignedElement(event);
        };
        this.handleFooterSlotChange = (event) => {
            this.hasFooterContent = dom.slotChangeHasAssignedElement(event);
        };
        this.contentBottomSlotChangeHandler = (event) => {
            this.hasContentBottom = dom.slotChangeHasAssignedElement(event);
        };
        this.contentTopSlotChangeHandler = (event) => {
            this.hasContentTop = dom.slotChangeHasAssignedElement(event);
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
            dom.slotChangeGetAssignedElements(event)?.map((el) => {
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
        this.menuFlipPlacements = undefined;
        this.menuOpen = false;
        this.menuPlacement = floatingUi.defaultEndMenuPlacement;
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
        locale.connectLocalized(this);
        t9n.connectMessages(this);
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        this.isClosed = this.closed;
        await t9n.setUpMessages(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        this.resizeObserver?.disconnect();
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
        this.panelScrollEl?.scrollTo(options);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHeaderContent() {
        const { heading, headingLevel, description, hasHeaderContent } = this;
        const headingNode = heading ? (index.h(Heading.Heading, { class: resources$1.CSS.heading, level: headingLevel }, heading)) : null;
        const descriptionNode = description ? index.h("span", { class: resources$1.CSS.description }, description) : null;
        return !hasHeaderContent && (headingNode || descriptionNode) ? (index.h("div", { class: resources$1.CSS.headerContent, key: "header-content" }, headingNode, descriptionNode)) : null;
    }
    renderActionBar() {
        return (index.h("div", { class: resources$1.CSS.actionBarContainer, hidden: !this.hasActionBar }, index.h("slot", { name: resources$1.SLOTS.actionBar, onSlotchange: this.handleActionBarSlotChange })));
    }
    renderHeaderSlottedContent() {
        return (index.h("div", { class: resources$1.CSS.headerContent, hidden: !this.hasHeaderContent, key: "slotted-header-content" }, index.h("slot", { name: resources$1.SLOTS.headerContent, onSlotchange: this.handleHeaderContentSlotChange })));
    }
    renderHeaderStartActions() {
        const { hasStartActions } = this;
        return (index.h("div", { class: { [resources$1.CSS.headerActionsStart]: true, [resources$1.CSS.headerActions]: true }, hidden: !hasStartActions, key: "header-actions-start" }, index.h("slot", { name: resources$1.SLOTS.headerActionsStart, onSlotchange: this.handleHeaderActionsStartSlotChange })));
    }
    renderHeaderActionsEnd() {
        const { hasEndActions, messages, closable, collapsed, collapseDirection, collapsible, hasMenuItems, } = this;
        const { collapse, expand, close } = messages;
        const icons = [resources$1.ICONS.expand, resources$1.ICONS.collapse];
        if (collapseDirection === "up") {
            icons.reverse();
        }
        const collapseNode = collapsible ? (index.h("calcite-action", { "aria-expanded": dom.toAriaBoolean(!collapsed), "aria-label": collapse, icon: collapsed ? icons[0] : icons[1], id: resources$1.IDS.collapse, onClick: this.collapse, scale: this.scale, text: collapse, title: collapsed ? expand : collapse })) : null;
        const closeNode = closable ? (index.h("calcite-action", { "aria-label": close, icon: resources$1.ICONS.close, id: resources$1.IDS.close, onClick: this.handleUserClose, scale: this.scale, text: close, title: close })) : null;
        const slotNode = (index.h("slot", { name: resources$1.SLOTS.headerActionsEnd, onSlotchange: this.handleHeaderActionsEndSlotChange }));
        const showContainer = hasEndActions || collapseNode || closeNode || hasMenuItems;
        return (index.h("div", { class: { [resources$1.CSS.headerActionsEnd]: true, [resources$1.CSS.headerActions]: true }, hidden: !showContainer, key: "header-actions-end" }, slotNode, this.renderMenu(), collapseNode, closeNode));
    }
    renderMenu() {
        const { hasMenuItems, messages, menuOpen, menuFlipPlacements, menuPlacement } = this;
        return (index.h("calcite-action-menu", { flipPlacements: menuFlipPlacements ?? ["top", "bottom"], hidden: !hasMenuItems, key: "menu", label: messages.options, open: menuOpen, overlayPositioning: this.overlayPositioning, placement: menuPlacement }, index.h("calcite-action", { icon: resources$1.ICONS.menu, scale: this.scale, slot: resources.SLOTS.trigger, text: messages.options }), index.h("slot", { name: resources$1.SLOTS.headerMenuActions, onSlotchange: this.handleHeaderMenuActionsSlotChange })));
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
        return (index.h("header", { class: resources$1.CSS.header, hidden: !(showHeaderContent || hasActionBar) }, index.h("div", { class: { [resources$1.CSS.headerContainer]: true, [resources$1.CSS.headerContainerBorderEnd]: hasActionBar }, hidden: !showHeaderContent }, this.renderHeaderStartActions(), this.renderHeaderSlottedContent(), headerContentNode, this.renderHeaderActionsEnd()), this.renderActionBar(), this.renderContentTop()));
    }
    renderFooterNode() {
        const { hasFooterEndContent, hasFooterStartContent, hasFooterContent, hasFooterActions } = this;
        const showFooter = hasFooterStartContent || hasFooterEndContent || hasFooterContent || hasFooterActions;
        return (index.h("footer", { class: resources$1.CSS.footer, hidden: !showFooter }, index.h("div", { class: resources$1.CSS.footerContent, hidden: !hasFooterContent }, index.h("slot", { name: resources$1.SLOTS.footer, onSlotchange: this.handleFooterSlotChange })), index.h("div", { class: resources$1.CSS.footerStart, hidden: hasFooterContent || !hasFooterStartContent }, index.h("slot", { name: resources$1.SLOTS.footerStart, onSlotchange: this.handleFooterStartSlotChange })), index.h("div", { class: resources$1.CSS.footerEnd, hidden: hasFooterContent || !hasFooterEndContent }, index.h("slot", { name: resources$1.SLOTS.footerEnd, onSlotchange: this.handleFooterEndSlotChange })), index.h("div", { class: resources$1.CSS.footerActions, hidden: hasFooterContent || !hasFooterActions }, index.h("slot", { key: "footer-actions-slot", name: resources$1.SLOTS.footerActions, onSlotchange: this.handleFooterActionsSlotChange }))));
    }
    renderContent() {
        return (index.h("div", { class: resources$1.CSS.contentWrapper, hidden: this.collapsible && this.collapsed, onScroll: this.panelScrollHandler, ref: this.setPanelScrollEl }, index.h("slot", null), this.renderFab()));
    }
    renderContentBottom() {
        return (index.h("div", { class: resources$1.CSS.contentBottom, hidden: !this.hasContentBottom }, index.h("slot", { name: resources$1.SLOTS.contentBottom, onSlotchange: this.contentBottomSlotChangeHandler })));
    }
    renderContentTop() {
        return (index.h("div", { class: resources$1.CSS.contentTop, hidden: !this.hasContentTop }, index.h("slot", { name: resources$1.SLOTS.contentTop, onSlotchange: this.contentTopSlotChangeHandler })));
    }
    renderFab() {
        return (index.h("div", { class: resources$1.CSS.fabContainer, hidden: !this.hasFab }, index.h("slot", { name: resources$1.SLOTS.fab, onSlotchange: this.handleFabSlotChange })));
    }
    render() {
        const { disabled, loading, isClosed } = this;
        const panelNode = (index.h("article", { key: '0f439dffdca536eb6973ac386b0566091249aee3', "aria-busy": dom.toAriaBoolean(loading), class: resources$1.CSS.container, hidden: isClosed, ref: this.setContainerRef }, this.renderHeaderNode(), this.renderContent(), this.renderContentBottom(), this.renderFooterNode(), index.h("slot", { key: "alerts", name: resources$1.SLOTS.alerts, onSlotchange: this.handleAlertsSlotChange })));
        return (index.h(index.Host, { key: '6e5baec07ecb356871dea038ebc2d5ee2d8ed54f', onKeyDown: this.panelKeyDownHandler }, index.h(interactive.InteractiveContainer, { key: '924cda1799b359f1bb3fb119cebfff5a7349b72d', disabled: disabled }, loading ? index.h("calcite-scrim", { loading: loading }) : null, panelNode)));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "closed": ["toggleDialog"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Panel.style = CalcitePanelStyle0;

exports.calcite_action_menu = ActionMenu;
exports.calcite_panel = Panel;
