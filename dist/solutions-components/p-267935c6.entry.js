/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, F as Fragment, g as getElement, f as forceUpdate, H as Host } from './p-6eb37ed2.js';
import { g as getRoundRobinIndex } from './p-e98c4f93.js';
import { t as toAriaBoolean, e as focusElement, H as isKeyboardTriggeredClick, f as focusFirstTabbable, r as queryElementRoots, A as slotChangeHasContent } from './p-68ec5c15.js';
import { g as guid } from './p-ff8343ec.js';
import { i as isActivationKey } from './p-fe6f7734.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './p-18f18ab3.js';
import { a as activeAttr, C as CSS$2, I as ICONS, S as SLOTS } from './p-c5e13ebc.js';
import { f as filterValidFlipPlacements, c as connectFloatingUI, b as defaultOffsetDistance, a as disconnectFloatingUI, r as reposition, F as FloatingCSS } from './p-a5609b81.js';
import { d as deactivateFocusTrap, a as activateFocusTrap, c as connectFocusTrap, u as updateFocusTrapElements } from './p-ead8696c.js';
import { o as onToggleOpenCloseComponent } from './p-580a4537.js';
import { H as Heading } from './p-14fbc662.js';
import { c as connectLocalized, d as disconnectLocalized } from './p-939bc1b4.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './p-1a9a47a0.js';
import { c as createObserver } from './p-c638d28e.js';
import { F as FloatingArrow } from './p-1892c357.js';
import { g as getIconScale } from './p-d559f79c.js';
import './p-b39c5275.js';
import './p-acaae81d.js';
import './p-c8d3207e.js';
import './p-aeb86188.js';

const actionMenuCss = ":host{box-sizing:border-box;display:flex;flex-direction:column;font-size:var(--calcite-font-size-1)}::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm)}.default-trigger{position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}slot[name=trigger]::slotted(calcite-action),calcite-action::slotted([slot=trigger]){position:relative;block-size:100%;flex:0 1 auto;align-self:stretch}.menu{display:flex;max-block-size:45vh;flex-direction:column;flex-wrap:nowrap;overflow-y:auto;overflow-x:hidden;outline:2px solid transparent;outline-offset:2px;gap:var(--calcite-action-menu-items-space, 0)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteActionMenuStyle0 = actionMenuCss;

const SUPPORTED_MENU_NAV_KEYS = ["ArrowUp", "ArrowDown", "End", "Home"];
const ActionMenu = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteActionMenuOpen = createEvent(this, "calciteActionMenuOpen", 6);
        this.actionElements = [];
        this.guid = `calcite-action-menu-${guid()}`;
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
            menuButtonEl.setAttribute("aria-expanded", toAriaBoolean(open));
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
            action.toggleAttribute(activeAttr, index === activeMenuItemIndex);
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
            const { key } = event;
            const { actionElements, activeMenuItemIndex, open } = this;
            if (!actionElements.length) {
                return;
            }
            if (isActivationKey(key)) {
                event.preventDefault();
                if (!open) {
                    this.toggleOpen();
                    return;
                }
                const action = actionElements[activeMenuItemIndex];
                action ? action.click() : this.toggleOpen(false);
            }
            if (key === "Tab") {
                this.open = false;
                return;
            }
            if (key === "Escape") {
                this.toggleOpen(false);
                event.preventDefault();
                return;
            }
            this.handleActionNavigation(event, key, actionElements);
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
                this.activeMenuItemIndex = getRoundRobinIndex(Math.max(currentIndex - 1, -1), actions.length);
            }
            if (key === "ArrowDown") {
                this.activeMenuItemIndex = getRoundRobinIndex(currentIndex + 1, actions.length);
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
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
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
        await componentFocusable(this);
        return focusElement(this.menuButtonEl);
    }
    renderMenuButton() {
        const { appearance, label, scale, expanded } = this;
        const menuButtonSlot = (h("slot", { name: SLOTS.trigger, onSlotchange: this.setMenuButtonEl }, h("calcite-action", { appearance: appearance, class: CSS$2.defaultTrigger, icon: ICONS.menu, ref: this.setDefaultMenuButtonEl, scale: scale, text: label, textEnabled: expanded })));
        return menuButtonSlot;
    }
    renderMenuItems() {
        const { actionElements, activeMenuItemIndex, open, menuId, menuButtonEl, label, placement, overlayPositioning, flipPlacements, } = this;
        const activeAction = actionElements[activeMenuItemIndex];
        const activeDescendantId = activeAction?.id || null;
        return (h("calcite-popover", { autoClose: true, flipPlacements: flipPlacements, focusTrapDisabled: true, label: label, offsetDistance: 0, onCalcitePopoverClose: this.handlePopoverClose, onCalcitePopoverOpen: this.handlePopoverOpen, open: open, overlayPositioning: overlayPositioning, placement: placement, pointerDisabled: true, referenceElement: menuButtonEl }, h("div", { "aria-activedescendant": activeDescendantId, "aria-labelledby": menuButtonEl?.id, class: CSS$2.menu, id: menuId, onClick: this.handleCalciteActionClick, role: "menu", tabIndex: -1 }, h("slot", { onSlotchange: this.handleDefaultSlotChange }))));
    }
    render() {
        return (h(Fragment, { key: '9feaace5a0750686cc4ad4e7ac83859cc26a7a20' }, this.renderMenuButton(), this.renderMenuItems(), h("slot", { key: 'ba73adb74c8c729467f300fd4ff33c7af23f2ad7', name: SLOTS.tooltip, onSlotchange: this.updateTooltip })));
    }
    isValidKey(key, supportedKeys) {
        return !!supportedKeys.find((k) => k === key);
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "expanded": ["expandedHandler"],
        "open": ["openHandler"],
        "activeMenuItemIndex": ["activeMenuItemIndexHandler"]
    }; }
};
ActionMenu.style = CalciteActionMenuStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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
        this.keyDownHandler = (event) => {
            if (event.defaultPrevented) {
                return;
            }
            if (event.key === "Escape") {
                this.closeAllPopovers();
            }
            else if (isActivationKey(event.key)) {
                this.togglePopovers(event);
            }
        };
        this.clickHandler = (event) => {
            if (isKeyboardTriggeredClick(event)) {
                return;
            }
            this.togglePopovers(event);
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
        window.addEventListener("click", this.clickHandler);
        window.addEventListener("keydown", this.keyDownHandler);
    }
    removeListeners() {
        window.removeEventListener("click", this.clickHandler);
        window.removeEventListener("keydown", this.keyDownHandler);
    }
}

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS$1 = {
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

const popoverCss = ":host{--calcite-floating-ui-z-index:var(--calcite-popover-z-index, var(--calcite-z-index-popup));display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index)}.calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset, left, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}:host([data-placement^=bottom]) .calcite-floating-ui-anim{inset-block-start:-5px}:host([data-placement^=top]) .calcite-floating-ui-anim{inset-block-start:5px}:host([data-placement^=left]) .calcite-floating-ui-anim{left:5px}:host([data-placement^=right]) .calcite-floating-ui-anim{left:-5px}:host([data-placement]) .calcite-floating-ui-anim--active{opacity:1;inset-block:0;left:0}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}.calcite-floating-ui-arrow{pointer-events:none;position:absolute;z-index:calc(var(--calcite-z-index) * -1);fill:var(--calcite-color-foreground-1)}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-color-border-3)}:host([scale=s]) .heading{padding-inline:0.75rem;padding-block:0.5rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) .heading{padding-inline:1rem;padding-block:0.75rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) .heading{padding-inline:1.25rem;padding-block:1rem;font-size:var(--calcite-font-size-1);line-height:1.375}:host{pointer-events:none}:host([open]){pointer-events:initial}.calcite-floating-ui-anim{border-radius:0.25rem;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1)}.arrow::before{outline:1px solid var(--calcite-color-border-3)}.header{display:flex;flex:1 1 auto;align-items:stretch;justify-content:flex-start;border-width:0px;border-block-end-width:1px;border-style:solid;border-block-end-color:var(--calcite-color-border-3)}.heading{margin:0px;display:block;flex:1 1 auto;align-self:center;white-space:normal;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);word-wrap:break-word;word-break:break-word}.container{position:relative;display:flex;block-size:100%;flex-direction:row;flex-wrap:nowrap;border-radius:0.25rem;color:var(--calcite-color-text-1)}.container.has-header{flex-direction:column}.content{display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap;align-self:center;word-wrap:break-word;word-break:break-word}.close-button-container{display:flex;overflow:hidden;flex:0 0 auto;border-start-end-radius:0.25rem;border-end-end-radius:0.25rem}.has-header .close-button-container{border-end-end-radius:none}::slotted(calcite-panel),::slotted(calcite-flow){block-size:100%}:host([hidden]){display:none}[hidden]{display:none}";
const CalcitePopoverStyle0 = popoverCss;

const manager = new PopoverManager();
const Popover = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calcitePopoverBeforeClose = createEvent(this, "calcitePopoverBeforeClose", 6);
        this.calcitePopoverClose = createEvent(this, "calcitePopoverClose", 6);
        this.calcitePopoverBeforeOpen = createEvent(this, "calcitePopoverBeforeOpen", 6);
        this.calcitePopoverOpen = createEvent(this, "calcitePopoverOpen", 6);
        this.mutationObserver = createObserver("mutation", () => this.updateFocusTrapElements());
        this.guid = `calcite-popover-${guid()}`;
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
                ? filterValidFlipPlacements(flipPlacements, el)
                : null;
        };
        this.setUpReferenceElement = (warn = true) => {
            this.removeReferences();
            this.effectiveReferenceElement = this.getReferenceElement();
            connectFloatingUI(this, this.effectiveReferenceElement, this.el);
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
                effectiveReferenceElement.setAttribute(ARIA_EXPANDED, toAriaBoolean(open));
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
        this.offsetDistance = defaultOffsetDistance;
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
        focusTrapDisabled ? deactivateFocusTrap(this) : activateFocusTrap(this);
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
        onToggleOpenCloseComponent(this);
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
        updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        this.setFilteredPlacements();
        connectLocalized(this);
        connectMessages(this);
        connectFocusTrap(this);
        // we set up the ref element in the next frame to ensure PopoverManager
        // event handlers are invoked after connect (mainly for `components` output target)
        requestAnimationFrame(() => this.setUpReferenceElement(this.hasLoaded));
    }
    async componentWillLoad() {
        await setUpMessages(this);
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
        if (this.referenceElement && !this.effectiveReferenceElement) {
            this.setUpReferenceElement();
        }
        if (this.open) {
            onToggleOpenCloseComponent(this);
        }
        this.hasLoaded = true;
    }
    disconnectedCallback() {
        this.removeReferences();
        disconnectLocalized(this);
        disconnectMessages(this);
        disconnectFloatingUI(this, this.effectiveReferenceElement, this.el);
        deactivateFocusTrap(this);
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
        return reposition(this, {
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
        await componentFocusable(this);
        forceUpdate(this.el);
        focusFirstTabbable(this.el);
    }
    /**
     * Updates the element(s) that are used within the focus-trap of the component.
     */
    async updateFocusTrapElements() {
        updateFocusTrapElements(this);
    }
    getReferenceElement() {
        const { referenceElement, el } = this;
        return ((typeof referenceElement === "string"
            ? queryElementRoots(el, { id: referenceElement })
            : referenceElement) || null);
    }
    onBeforeOpen() {
        this.calcitePopoverBeforeOpen.emit();
    }
    onOpen() {
        this.calcitePopoverOpen.emit();
        activateFocusTrap(this);
    }
    onBeforeClose() {
        this.calcitePopoverBeforeClose.emit();
    }
    onClose() {
        this.calcitePopoverClose.emit();
        deactivateFocusTrap(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderCloseButton() {
        const { messages, closable } = this;
        return closable ? (h("div", { class: CSS$1.closeButtonContainer, key: CSS$1.closeButtonContainer }, h("calcite-action", { appearance: "transparent", class: CSS$1.closeButton, onClick: this.hide, ref: (closeButtonEl) => (this.closeButtonEl = closeButtonEl), scale: this.scale, text: messages.close }, h("calcite-icon", { icon: "x", scale: getIconScale(this.scale) })))) : null;
    }
    renderHeader() {
        const { heading, headingLevel } = this;
        const headingNode = heading ? (h(Heading, { class: CSS$1.heading, level: headingLevel }, heading)) : null;
        return headingNode ? (h("div", { class: CSS$1.header, key: CSS$1.header }, headingNode, this.renderCloseButton())) : null;
    }
    render() {
        const { effectiveReferenceElement, heading, label, open, pointerDisabled, floatingLayout } = this;
        const displayed = effectiveReferenceElement && open;
        const hidden = !displayed;
        const arrowNode = !pointerDisabled ? (h(FloatingArrow, { floatingLayout: floatingLayout, key: "floating-arrow", ref: this.storeArrowEl })) : null;
        return (h(Host, { key: '6308b6043eae5d988238c1f4ab3427b903aba9b2', "aria-hidden": toAriaBoolean(hidden), "aria-label": label, "aria-live": "polite", "calcite-hydrated-hidden": hidden, id: this.getId(), role: "dialog" }, h("div", { key: '241c19ccc94188c7819080dad91534e0f329d470', class: {
                [FloatingCSS.animation]: true,
                [FloatingCSS.animationActive]: displayed,
            }, ref: this.setTransitionEl }, arrowNode, h("div", { key: '0ca3856260eea02f75aceaa490519b596b8f1c29', class: {
                [CSS$1.hasHeader]: !!heading,
                [CSS$1.container]: true,
            } }, this.renderHeader(), h("div", { key: 'cc3e385ce8ffda4d8dc8fa12866b80c28f621594', class: CSS$1.content }, h("slot", { key: 'b99e560f5ad3a74ae4f3421e1f3d6035de67fad0' })), !heading ? this.renderCloseButton() : null))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
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
Popover.style = CalcitePopoverStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    scrim: "scrim",
    content: "content",
};
const BREAKPOINTS = {
    s: 72, // Less than 72px.
    // medium is assumed default.
    l: 480, // Greater than or equal to 480px.
};

const scrimCss = ":host{--calcite-scrim-background:var(--calcite-color-transparent-scrim);position:absolute;inset:0px;z-index:var(--calcite-z-index-overlay);display:flex;block-size:100%;inline-size:100%;flex-direction:column;align-items:stretch}@keyframes calcite-scrim-fade-in{0%{--tw-bg-opacity:0}100%{--tw-text-opacity:1}}.scrim{position:absolute;inset:0px;display:flex;flex-direction:column;align-content:center;align-items:center;justify-content:center;overflow:hidden;animation:calcite-scrim-fade-in var(--calcite-internal-animation-timing-medium) ease-in-out;background-color:var(--calcite-scrim-background, var(--calcite-color-transparent-scrim))}.content{padding:1rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteScrimStyle0 = scrimCss;

const Scrim = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.resizeObserver = createObserver("resize", () => this.handleResize());
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleDefaultSlotChange = (event) => {
            this.hasContent = slotChangeHasContent(event);
        };
        this.storeLoaderEl = (el) => {
            this.loaderEl = el;
            this.handleResize();
        };
        this.loading = false;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.loaderScale = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.hasContent = false;
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        connectMessages(this);
        this.resizeObserver?.observe(this.el);
    }
    async componentWillLoad() {
        await setUpMessages(this);
    }
    disconnectedCallback() {
        disconnectLocalized(this);
        disconnectMessages(this);
        this.resizeObserver?.disconnect();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Method
    //
    // --------------------------------------------------------------------------
    render() {
        const { hasContent, loading, messages } = this;
        return (h("div", { key: 'e31839948c0689b6daeac22f3b2471fb049c834b', class: CSS.scrim }, loading ? (h("calcite-loader", { label: messages.loading, ref: this.storeLoaderEl, scale: this.loaderScale })) : null, h("div", { key: '500b2dcbdcb6c3287ea613fd0f1357de7f3ff347', class: CSS.content, hidden: !hasContent }, h("slot", { key: 'eea29ac4a454cf3cd51933a73911b70114ab6f77', onSlotchange: this.handleDefaultSlotChange }))));
    }
    getScale(size) {
        if (size < BREAKPOINTS.s) {
            return "s";
        }
        else if (size >= BREAKPOINTS.l) {
            return "l";
        }
        else {
            return "m";
        }
    }
    handleResize() {
        const { loaderEl, el } = this;
        if (!loaderEl) {
            return;
        }
        this.loaderScale = this.getScale(Math.min(el.clientHeight, el.clientWidth) ?? 0);
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Scrim.style = CalciteScrimStyle0;

export { ActionMenu as calcite_action_menu, Popover as calcite_popover, Scrim as calcite_scrim };
