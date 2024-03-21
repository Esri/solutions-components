/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const array = require('./array-6ea3edb8.js');
const dom = require('./dom-c9c2c835.js');
const guid = require('./guid-ae73cd27.js');
const key = require('./key-c5504030.js');
const loadable = require('./loadable-5a794992.js');
const resources = require('./resources-555dae0e.js');
const floatingUi = require('./floating-ui-984cc970.js');
const focusTrapComponent = require('./focusTrapComponent-faae7d7e.js');
const openCloseComponent = require('./openCloseComponent-19a769d0.js');
const Heading = require('./Heading-bd401e0a.js');
const locale = require('./locale-d237c9d5.js');
const t9n = require('./t9n-993a84de.js');
const observers = require('./observers-db4527e4.js');
const FloatingArrow = require('./FloatingArrow-a27ad9b2.js');
const component = require('./component-ac7c3bd8.js');
require('./resources-9447c777.js');
require('./debounce-30afab47.js');

const actionMenuCss = ":host{box-sizing:border-box;display:flex;flex-direction:column;font-size:var(--calcite-font-size-1);color:var(--calcite-color-text-2)}::slotted(calcite-action-group){border-block-end:1px solid var(--calcite-color-border-3)}::slotted(calcite-action-group:last-child){border-block-end:0}.default-trigger{position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}slot[name=trigger]::slotted(calcite-action),calcite-action::slotted([slot=trigger]){position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}.menu{max-block-size:45vh;flex-direction:column;flex-wrap:nowrap;overflow-y:auto;overflow-x:hidden;outline:2px solid transparent;outline-offset:2px}:host([hidden]){display:none}[hidden]{display:none}";

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
            menuButtonEl.addEventListener("pointerdown", this.menuButtonClick);
            menuButtonEl.addEventListener("keydown", this.menuButtonKeyDown);
        };
        this.disconnectMenuButtonEl = () => {
            const { menuButtonEl } = this;
            if (!menuButtonEl) {
                return;
            }
            menuButtonEl.removeEventListener("pointerdown", this.menuButtonClick);
            menuButtonEl.removeEventListener("keydown", this.menuButtonKeyDown);
        };
        this.setMenuButtonEl = (event) => {
            const actions = event.target
                .assignedElements({
                flatten: true,
            })
                .filter((el) => el === null || el === void 0 ? void 0 : el.matches("calcite-action"));
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
        this.menuButtonClick = (event) => {
            if (!dom.isPrimaryPointerButton(event)) {
                return;
            }
            this.toggleOpen();
        };
        this.updateTooltip = (event) => {
            const tooltips = event.target
                .assignedElements({
                flatten: true,
            })
                .filter((el) => el === null || el === void 0 ? void 0 : el.matches("calcite-tooltip"));
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
            actions === null || actions === void 0 ? void 0 : actions.forEach(this.updateAction);
        };
        this.handleDefaultSlotChange = (event) => {
            const actions = event.target
                .assignedElements({
                flatten: true,
            })
                .reduce((previousValue, currentValue) => {
                if (currentValue === null || currentValue === void 0 ? void 0 : currentValue.matches("calcite-action")) {
                    previousValue.push(currentValue);
                    return previousValue;
                }
                if (currentValue === null || currentValue === void 0 ? void 0 : currentValue.matches("calcite-action-group")) {
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
        const menuButtonSlot = (index.h("slot", { name: resources.SLOTS.trigger, onSlotchange: this.setMenuButtonEl }, index.h("calcite-action", { appearance: appearance, class: resources.CSS.defaultTrigger, icon: resources.ICONS.menu, scale: scale, text: label, textEnabled: expanded,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setDefaultMenuButtonEl })));
        return menuButtonSlot;
    }
    renderMenuItems() {
        const { actionElements, activeMenuItemIndex, open, menuId, menuButtonEl, label, placement, overlayPositioning, flipPlacements, } = this;
        const activeAction = actionElements[activeMenuItemIndex];
        const activeDescendantId = (activeAction === null || activeAction === void 0 ? void 0 : activeAction.id) || null;
        return (index.h("calcite-popover", { autoClose: true, flipPlacements: flipPlacements, focusTrapDisabled: true, label: label, offsetDistance: 0, onCalcitePopoverClose: this.handlePopoverClose, onCalcitePopoverOpen: this.handlePopoverOpen, open: open, overlayPositioning: overlayPositioning, placement: placement, pointerDisabled: true, referenceElement: menuButtonEl }, index.h("div", { "aria-activedescendant": activeDescendantId, "aria-labelledby": menuButtonEl === null || menuButtonEl === void 0 ? void 0 : menuButtonEl.id, class: resources.CSS.menu, id: menuId, onClick: this.handleCalciteActionClick, role: "menu", tabIndex: -1 }, index.h("slot", { onSlotchange: this.handleDefaultSlotChange }))));
    }
    render() {
        return (index.h(index.Fragment, null, this.renderMenuButton(), this.renderMenuItems(), index.h("slot", { name: resources.SLOTS.tooltip, onSlotchange: this.updateTooltip })));
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
ActionMenu.style = actionMenuCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    container: "container",
    imageContainer: "image-container",
    closeButtonContainer: "close-button-container",
    closeButton: "close-button",
    content: "content",
    hasHeader: "has-header",
    header: "header",
    headerContent: "header-content",
    heading: "heading",
};
const defaultPopoverPlacement = "auto";
const ARIA_CONTROLS = "aria-controls";
const ARIA_EXPANDED = "aria-expanded";

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
class PopoverManager {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Private Properties
        //
        // --------------------------------------------------------------------------
        this.registeredElements = new Map();
        this.registeredElementCount = 0;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.queryPopover = (composedPath) => {
            const { registeredElements } = this;
            const registeredElement = composedPath.find((pathEl) => registeredElements.has(pathEl));
            return registeredElements.get(registeredElement);
        };
        this.togglePopovers = (event) => {
            const composedPath = event.composedPath();
            const togglePopover = this.queryPopover(composedPath);
            if (togglePopover && !togglePopover.triggerDisabled) {
                togglePopover.open = !togglePopover.open;
            }
            Array.from(this.registeredElements.values())
                .filter((popover) => popover !== togglePopover && popover.autoClose && popover.open && !composedPath.includes(popover))
                .forEach((popover) => (popover.open = false));
        };
        this.keyHandler = (event) => {
            if (event.defaultPrevented) {
                return;
            }
            if (event.key === "Escape") {
                this.closeAllPopovers();
            }
            else if (key.isActivationKey(event.key)) {
                this.togglePopovers(event);
            }
        };
        this.clickHandler = (event) => {
            if (dom.isPrimaryPointerButton(event)) {
                this.togglePopovers(event);
            }
        };
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    registerElement(referenceEl, popover) {
        this.registeredElementCount++;
        this.registeredElements.set(referenceEl, popover);
        if (this.registeredElementCount === 1) {
            this.addListeners();
        }
    }
    unregisterElement(referenceEl) {
        if (this.registeredElements.delete(referenceEl)) {
            this.registeredElementCount--;
        }
        if (this.registeredElementCount === 0) {
            this.removeListeners();
        }
    }
    closeAllPopovers() {
        Array.from(this.registeredElements.values()).forEach((popover) => (popover.open = false));
    }
    addListeners() {
        window.addEventListener("pointerdown", this.clickHandler, { capture: true });
        window.addEventListener("keydown", this.keyHandler, { capture: true });
    }
    removeListeners() {
        window.removeEventListener("pointerdown", this.clickHandler, { capture: true });
        window.removeEventListener("keydown", this.keyHandler, { capture: true });
    }
}

const popoverCss = ":host{--calcite-floating-ui-z-index:var(--calcite-popover-z-index, var(--calcite-z-index-popup));display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index)}.calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}:host([data-placement^=bottom]) .calcite-floating-ui-anim{transform:translateY(-5px)}:host([data-placement^=top]) .calcite-floating-ui-anim{transform:translateY(5px)}:host([data-placement^=left]) .calcite-floating-ui-anim{transform:translateX(5px)}:host([data-placement^=right]) .calcite-floating-ui-anim{transform:translateX(-5px)}:host([data-placement]) .calcite-floating-ui-anim--active{opacity:1;transform:translate(0)}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}.calcite-floating-ui-arrow{pointer-events:none;position:absolute;z-index:calc(var(--calcite-z-index) * -1);fill:var(--calcite-color-foreground-1)}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-color-border-3)}:host([scale=s]) .heading{padding-inline:0.75rem;padding-block:0.5rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) .heading{padding-inline:1rem;padding-block:0.75rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) .heading{padding-inline:1.25rem;padding-block:1rem;font-size:var(--calcite-font-size-1);line-height:1.375}:host{pointer-events:none}:host([open]){pointer-events:initial}.calcite-floating-ui-anim{border-radius:0.25rem;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1)}.arrow::before{outline:1px solid var(--calcite-color-border-3)}.header{display:flex;flex:1 1 auto;align-items:stretch;justify-content:flex-start;border-width:0px;border-block-end-width:1px;border-style:solid;border-block-end-color:var(--calcite-color-border-3)}.heading{margin:0px;display:block;flex:1 1 auto;align-self:center;white-space:normal;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);word-wrap:break-word;word-break:break-word}.container{position:relative;display:flex;block-size:100%;flex-direction:row;flex-wrap:nowrap;border-radius:0.25rem;color:var(--calcite-color-text-1)}.container.has-header{flex-direction:column}.content{display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap;align-self:center;word-wrap:break-word;word-break:break-word}.close-button-container{display:flex;overflow:hidden;flex:0 0 auto;border-start-end-radius:0.25rem;border-end-end-radius:0.25rem}::slotted(calcite-panel),::slotted(calcite-flow){block-size:100%}:host([hidden]){display:none}[hidden]{display:none}";

const manager = new PopoverManager();
const Popover = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calcitePopoverBeforeClose = index.createEvent(this, "calcitePopoverBeforeClose", 6);
        this.calcitePopoverClose = index.createEvent(this, "calcitePopoverClose", 6);
        this.calcitePopoverBeforeOpen = index.createEvent(this, "calcitePopoverBeforeOpen", 6);
        this.calcitePopoverOpen = index.createEvent(this, "calcitePopoverOpen", 6);
        this.mutationObserver = observers.createObserver("mutation", () => this.updateFocusTrapElements());
        this.guid = `calcite-popover-${guid.guid()}`;
        this.openTransitionProp = "opacity";
        this.hasLoaded = false;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.setTransitionEl = (el) => {
            this.transitionEl = el;
        };
        this.setFilteredPlacements = () => {
            const { el, flipPlacements } = this;
            this.filteredFlipPlacements = flipPlacements
                ? floatingUi.filterComputedPlacements(flipPlacements, el)
                : null;
        };
        this.setUpReferenceElement = (warn = true) => {
            this.removeReferences();
            this.effectiveReferenceElement = this.getReferenceElement();
            floatingUi.connectFloatingUI(this, this.effectiveReferenceElement, this.el);
            const { el, referenceElement, effectiveReferenceElement } = this;
            if (warn && referenceElement && !effectiveReferenceElement) {
                console.warn(`${el.tagName}: reference-element id "${referenceElement}" was not found.`, {
                    el,
                });
            }
            this.addReferences();
        };
        this.getId = () => {
            return this.el.id || this.guid;
        };
        this.setExpandedAttr = () => {
            const { effectiveReferenceElement, open } = this;
            if (!effectiveReferenceElement) {
                return;
            }
            if ("setAttribute" in effectiveReferenceElement) {
                effectiveReferenceElement.setAttribute(ARIA_EXPANDED, dom.toAriaBoolean(open));
            }
        };
        this.addReferences = () => {
            const { effectiveReferenceElement } = this;
            if (!effectiveReferenceElement) {
                return;
            }
            const id = this.getId();
            if ("setAttribute" in effectiveReferenceElement) {
                effectiveReferenceElement.setAttribute(ARIA_CONTROLS, id);
            }
            manager.registerElement(effectiveReferenceElement, this.el);
            this.setExpandedAttr();
        };
        this.removeReferences = () => {
            const { effectiveReferenceElement } = this;
            if (!effectiveReferenceElement) {
                return;
            }
            if ("removeAttribute" in effectiveReferenceElement) {
                effectiveReferenceElement.removeAttribute(ARIA_CONTROLS);
                effectiveReferenceElement.removeAttribute(ARIA_EXPANDED);
            }
            manager.unregisterElement(effectiveReferenceElement);
        };
        this.hide = () => {
            this.open = false;
        };
        this.storeArrowEl = (el) => {
            this.arrowEl = el;
            this.reposition(true);
        };
        this.autoClose = false;
        this.closable = false;
        this.flipDisabled = false;
        this.focusTrapDisabled = false;
        this.pointerDisabled = false;
        this.flipPlacements = undefined;
        this.heading = undefined;
        this.headingLevel = undefined;
        this.label = undefined;
        this.messageOverrides = undefined;
        this.messages = undefined;
        this.offsetDistance = floatingUi.defaultOffsetDistance;
        this.offsetSkidding = 0;
        this.open = false;
        this.overlayPositioning = "absolute";
        this.placement = defaultPopoverPlacement;
        this.referenceElement = undefined;
        this.scale = "m";
        this.triggerDisabled = false;
        this.effectiveLocale = "";
        this.floatingLayout = "vertical";
        this.effectiveReferenceElement = undefined;
        this.defaultMessages = undefined;
    }
    handleFocusTrapDisabled(focusTrapDisabled) {
        if (!this.open) {
            return;
        }
        focusTrapDisabled ? focusTrapComponent.deactivateFocusTrap(this) : focusTrapComponent.activateFocusTrap(this);
    }
    flipPlacementsHandler() {
        this.setFilteredPlacements();
        this.reposition(true);
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    offsetDistanceOffsetHandler() {
        this.reposition(true);
    }
    offsetSkiddingHandler() {
        this.reposition(true);
    }
    openHandler() {
        openCloseComponent.onToggleOpenCloseComponent(this);
        this.reposition(true);
        this.setExpandedAttr();
    }
    overlayPositioningHandler() {
        this.reposition(true);
    }
    placementHandler() {
        this.reposition(true);
    }
    referenceElementHandler() {
        this.setUpReferenceElement();
        this.reposition(true);
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        this.setFilteredPlacements();
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        this.setUpReferenceElement(this.hasLoaded);
        focusTrapComponent.connectFocusTrap(this);
        if (this.open) {
            openCloseComponent.onToggleOpenCloseComponent(this);
        }
        floatingUi.connectFloatingUI(this, this.effectiveReferenceElement, this.el);
    }
    async componentWillLoad() {
        await t9n.setUpMessages(this);
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
        if (this.referenceElement && !this.effectiveReferenceElement) {
            this.setUpReferenceElement();
        }
        this.reposition();
        this.hasLoaded = true;
    }
    disconnectedCallback() {
        this.removeReferences();
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        floatingUi.disconnectFloatingUI(this, this.effectiveReferenceElement, this.el);
        focusTrapComponent.deactivateFocusTrap(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Updates the position of the component.
     *
     * @param delayed
     */
    async reposition(delayed = false) {
        const { el, effectiveReferenceElement, placement, overlayPositioning, flipDisabled, filteredFlipPlacements, offsetDistance, offsetSkidding, arrowEl, } = this;
        return floatingUi.reposition(this, {
            floatingEl: el,
            referenceEl: effectiveReferenceElement,
            overlayPositioning,
            placement,
            flipDisabled,
            flipPlacements: filteredFlipPlacements,
            offsetDistance,
            offsetSkidding,
            arrowEl,
            type: "popover",
        }, delayed);
    }
    /**
     * Sets focus on the component's first focusable element.
     */
    async setFocus() {
        await loadable.componentFocusable(this);
        index.forceUpdate(this.el);
        dom.focusFirstTabbable(this.el);
    }
    /**
     * Updates the element(s) that are used within the focus-trap of the component.
     */
    async updateFocusTrapElements() {
        focusTrapComponent.updateFocusTrapElements(this);
    }
    getReferenceElement() {
        const { referenceElement, el } = this;
        return ((typeof referenceElement === "string"
            ? dom.queryElementRoots(el, { id: referenceElement })
            : referenceElement) || null);
    }
    onBeforeOpen() {
        this.calcitePopoverBeforeOpen.emit();
    }
    onOpen() {
        this.calcitePopoverOpen.emit();
        focusTrapComponent.activateFocusTrap(this);
    }
    onBeforeClose() {
        this.calcitePopoverBeforeClose.emit();
    }
    onClose() {
        this.calcitePopoverClose.emit();
        focusTrapComponent.deactivateFocusTrap(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderCloseButton() {
        const { messages, closable } = this;
        return closable ? (index.h("div", { class: CSS.closeButtonContainer, key: CSS.closeButtonContainer }, index.h("calcite-action", { appearance: "transparent", class: CSS.closeButton, onClick: this.hide, scale: this.scale, text: messages.close,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (closeButtonEl) => (this.closeButtonEl = closeButtonEl) }, index.h("calcite-icon", { icon: "x", scale: component.getIconScale(this.scale) })))) : null;
    }
    renderHeader() {
        const { heading, headingLevel } = this;
        const headingNode = heading ? (index.h(Heading.Heading, { class: CSS.heading, level: headingLevel }, heading)) : null;
        return headingNode ? (index.h("div", { class: CSS.header, key: CSS.header }, headingNode, this.renderCloseButton())) : null;
    }
    render() {
        const { effectiveReferenceElement, heading, label, open, pointerDisabled, floatingLayout } = this;
        const displayed = effectiveReferenceElement && open;
        const hidden = !displayed;
        const arrowNode = !pointerDisabled ? (index.h(FloatingArrow.FloatingArrow, { floatingLayout: floatingLayout, key: "floating-arrow",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.storeArrowEl })) : null;
        return (index.h(index.Host, { "aria-hidden": dom.toAriaBoolean(hidden), "aria-label": label, "aria-live": "polite", "calcite-hydrated-hidden": hidden, id: this.getId(), role: "dialog" }, index.h("div", { class: {
                [floatingUi.FloatingCSS.animation]: true,
                [floatingUi.FloatingCSS.animationActive]: displayed,
            },
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setTransitionEl }, arrowNode, index.h("div", { class: {
                [CSS.hasHeader]: !!heading,
                [CSS.container]: true,
            } }, this.renderHeader(), index.h("div", { class: CSS.content }, index.h("slot", null)), !heading ? this.renderCloseButton() : null))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "focusTrapDisabled": ["handleFocusTrapDisabled"],
        "flipPlacements": ["flipPlacementsHandler"],
        "messageOverrides": ["onMessagesChange"],
        "offsetDistance": ["offsetDistanceOffsetHandler"],
        "offsetSkidding": ["offsetSkiddingHandler"],
        "open": ["openHandler"],
        "overlayPositioning": ["overlayPositioningHandler"],
        "placement": ["placementHandler"],
        "referenceElement": ["referenceElementHandler"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Popover.style = popoverCss;

exports.calcite_action_menu = ActionMenu;
exports.calcite_popover = Popover;
