/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, forceUpdate, h, Host } from '@stencil/core/internal/client';
import { f as filterValidFlipPlacements, c as connectFloatingUI, d as defaultOffsetDistance, a as disconnectFloatingUI, r as reposition, F as FloatingCSS } from './floating-ui.js';
import { d as deactivateFocusTrap, a as activateFocusTrap, c as connectFocusTrap, u as updateFocusTrapElements } from './focusTrapComponent.js';
import { l as isKeyboardTriggeredClick, t as toAriaBoolean, k as focusFirstTabbable, q as queryElementRoots } from './dom.js';
import { g as guid } from './guid.js';
import { o as onToggleOpenCloseComponent } from './openCloseComponent.js';
import { H as Heading } from './Heading.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { c as createObserver } from './observers.js';
import { F as FloatingArrow } from './FloatingArrow.js';
import { g as getIconScale } from './component.js';
import { i as isActivationKey } from './key.js';
import { d as defineCustomElement$3 } from './action.js';
import { d as defineCustomElement$2 } from './icon.js';
import { d as defineCustomElement$1 } from './loader.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
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
 * v2.13.0
 */
const CSS = {
    container: "container",
    imageContainer: "image-container",
    closeButtonContainer: "close-button-container",
    closeButton: "close-button",
    content: "content",
    hasHeader: "has-header",
    header: "header",
    headerContainer: "headerContainer",
    headerContent: "header-content",
    heading: "heading",
};
const defaultPopoverPlacement = "auto";
const ARIA_CONTROLS = "aria-controls";
const ARIA_EXPANDED = "aria-expanded";

const popoverCss = ":host{--calcite-floating-ui-z-index:var(--calcite-popover-z-index, var(--calcite-z-index-popup));display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index)}.calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:inset, left, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}:host([data-placement^=bottom]) .calcite-floating-ui-anim{inset-block-start:-5px}:host([data-placement^=top]) .calcite-floating-ui-anim{inset-block-start:5px}:host([data-placement^=left]) .calcite-floating-ui-anim{left:5px}:host([data-placement^=right]) .calcite-floating-ui-anim{left:-5px}:host([data-placement]) .calcite-floating-ui-anim--active{opacity:1;inset-block:0;left:0}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}.calcite-floating-ui-arrow{pointer-events:none;position:absolute;z-index:calc(var(--calcite-z-index) * -1);fill:var(--calcite-color-foreground-1)}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-color-border-3)}:host([scale=s]) .heading{padding-inline:0.75rem;padding-block:0.5rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) .heading{padding-inline:1rem;padding-block:0.75rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) .heading{padding-inline:1.25rem;padding-block:1rem;font-size:var(--calcite-font-size-1);line-height:1.375}:host{pointer-events:none}:host([open]){pointer-events:initial}.calcite-floating-ui-anim{border-width:1px;border-style:solid;background-color:var(--calcite-popover-background-color, var(--calcite-color-foreground-1));border-color:var(--calcite-popover-border-color, var(--calcite-color-border-3));border-radius:var(--calcite-popover-corner-radius, var(--calcite-corner-radius-round))}.calcite-floating-ui-arrow{fill:var(--calcite-popover-background-color, var(--calcite-color-foreground-1))}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-popover-border-color, var(--calcite-color-border-3))}.header{display:flex;flex:1 1 auto;align-items:stretch;justify-content:flex-start;border-width:0px;border-block-end-width:1px;border-style:solid;border-block-end-color:var(--calcite-popover-border-color, var(--calcite-color-border-3))}.heading{margin:0px;display:block;flex:1 1 auto;align-self:center;white-space:normal;font-weight:var(--calcite-font-weight-medium);word-wrap:break-word;word-break:break-word;color:var(--calcite-popover-text-color, var(--calcite-color-text-1))}.headerContainer{position:relative;display:flex;block-size:100%;flex-direction:row;flex-wrap:nowrap;border-radius:0.25rem;color:var(--calcite-popover-text-color, var(--calcite-color-text-1))}.headerContainer.has-header{flex-direction:column}.content{display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap;align-self:center;word-wrap:break-word;word-break:break-word}.close-button-container{display:flex;overflow:hidden;flex:0 0 auto;border-start-end-radius:var(--calcite-popover-corner-radius, var(--calcite-corner-radius-round));border-end-end-radius:var(--calcite-popover-corner-radius, var(--calcite-corner-radius-round));--calcite-action-corner-radius-start-end:var(--calcite-popover-corner-radius, var(--calcite-corner-radius-sharp));--calcite-action-corner-radius-end-end:var(--calcite-popover-corner-radius, var(--calcite-corner-radius-sharp))}::slotted(calcite-panel),::slotted(calcite-flow){block-size:100%}:host([hidden]){display:none}[hidden]{display:none}";
const CalcitePopoverStyle0 = popoverCss;

const manager = new PopoverManager();
const Popover = /*@__PURE__*/ proxyCustomElement(class Popover extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
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
        this.mutationObserver?.disconnect();
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
        return closable ? (h("div", { class: CSS.closeButtonContainer, key: CSS.closeButtonContainer }, h("calcite-action", { appearance: "transparent", class: CSS.closeButton, onClick: this.hide, ref: (closeButtonEl) => (this.closeButtonEl = closeButtonEl), scale: this.scale, text: messages.close }, h("calcite-icon", { icon: "x", scale: getIconScale(this.scale) })))) : null;
    }
    renderHeader() {
        const { heading, headingLevel } = this;
        const headingNode = heading ? (h(Heading, { class: CSS.heading, level: headingLevel }, heading)) : null;
        return headingNode ? (h("div", { class: CSS.header, key: CSS.header }, headingNode, this.renderCloseButton())) : null;
    }
    render() {
        const { effectiveReferenceElement, heading, label, open, pointerDisabled, floatingLayout } = this;
        const displayed = effectiveReferenceElement && open;
        const hidden = !displayed;
        const arrowNode = !pointerDisabled ? (h(FloatingArrow, { floatingLayout: floatingLayout, key: "floating-arrow", ref: this.storeArrowEl })) : null;
        return (h(Host, { key: 'a563d48090d6e6c0c138023e169667834f657c4c', "aria-hidden": toAriaBoolean(hidden), "aria-label": label, "aria-live": "polite", "calcite-hydrated-hidden": hidden, id: this.getId(), role: "dialog" }, h("div", { key: '73053dbdce2cfc68fcd42667089d611e81010955', class: {
                [CSS.container]: true,
                [FloatingCSS.animation]: true,
                [FloatingCSS.animationActive]: displayed,
            }, ref: this.setTransitionEl }, arrowNode, h("div", { key: '1fbcd45ee42b10a67881ced74db2db051231c94d', class: {
                [CSS.hasHeader]: !!heading,
                [CSS.headerContainer]: true,
            } }, this.renderHeader(), h("div", { key: '522abe801b98787863aac14d990b948d2d286156', class: CSS.content }, h("slot", { key: '022a8f690288acdbac4ec1b3eccf807ffe382d5d' })), !heading ? this.renderCloseButton() : null))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
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
    static get style() { return CalcitePopoverStyle0; }
}, [1, "calcite-popover", {
        "autoClose": [516, "auto-close"],
        "closable": [516],
        "flipDisabled": [516, "flip-disabled"],
        "focusTrapDisabled": [516, "focus-trap-disabled"],
        "pointerDisabled": [516, "pointer-disabled"],
        "flipPlacements": [16],
        "heading": [1],
        "headingLevel": [514, "heading-level"],
        "label": [1],
        "messageOverrides": [1040],
        "messages": [1040],
        "offsetDistance": [514, "offset-distance"],
        "offsetSkidding": [514, "offset-skidding"],
        "open": [1540],
        "overlayPositioning": [513, "overlay-positioning"],
        "placement": [513],
        "referenceElement": [1, "reference-element"],
        "scale": [513],
        "triggerDisabled": [516, "trigger-disabled"],
        "effectiveLocale": [32],
        "floatingLayout": [32],
        "effectiveReferenceElement": [32],
        "defaultMessages": [32],
        "reposition": [64],
        "setFocus": [64],
        "updateFocusTrapElements": [64]
    }, undefined, {
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
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-popover", "calcite-action", "calcite-icon", "calcite-loader"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Popover);
            }
            break;
        case "calcite-action":
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

export { Popover as P, defineCustomElement as d };
