/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { q as queryElementRoots, i as isPrimaryPointerButton, D as getShadowRootNode, t as toAriaBoolean } from './dom.js';
import { c as connectFloatingUI, d as defaultOffsetDistance, a as disconnectFloatingUI, r as reposition, F as FloatingCSS } from './floating-ui.js';
import { g as guid } from './guid.js';
import { o as onToggleOpenCloseComponent } from './openCloseComponent.js';
import { F as FloatingArrow } from './FloatingArrow.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    container: "container",
};
const TOOLTIP_OPEN_DELAY_MS = 300;
const TOOLTIP_CLOSE_DELAY_MS = 500;
const ARIA_DESCRIBED_BY = "aria-describedby";

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
function getEffectiveReferenceElement(tooltip) {
    const { referenceElement } = tooltip;
    return ((typeof referenceElement === "string" ? queryElementRoots(tooltip, { id: referenceElement }) : referenceElement) ||
        null);
}

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
class TooltipManager {
    constructor() {
        // --------------------------------------------------------------------------
        //
        //  Private Properties
        //
        // --------------------------------------------------------------------------
        this.registeredElements = new WeakMap();
        this.registeredShadowRootCounts = new WeakMap();
        this.hoverOpenTimeout = null;
        this.hoverCloseTimeout = null;
        this.hoveredTooltip = null;
        this.clickedTooltip = null;
        this.activeTooltip = null;
        this.registeredElementCount = 0;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.queryTooltip = (composedPath) => {
            const { registeredElements } = this;
            const registeredElement = composedPath.find((pathEl) => registeredElements.has(pathEl));
            return registeredElements.get(registeredElement);
        };
        this.keyDownHandler = (event) => {
            if (event.key === "Escape" && !event.defaultPrevented) {
                const { activeTooltip } = this;
                if (activeTooltip?.open) {
                    this.clearHoverTimeout();
                    this.closeActiveTooltip();
                    const referenceElement = getEffectiveReferenceElement(activeTooltip);
                    if (referenceElement instanceof Element && referenceElement.contains(event.target)) {
                        event.preventDefault();
                    }
                }
            }
        };
        this.pointerMoveHandler = (event) => {
            const composedPath = event.composedPath();
            const { activeTooltip } = this;
            const hoveringActiveTooltip = activeTooltip?.open && composedPath.includes(activeTooltip);
            if (hoveringActiveTooltip) {
                this.clearHoverTimeout();
                return;
            }
            const tooltip = this.queryTooltip(composedPath);
            this.hoveredTooltip = tooltip;
            if (this.isClosableClickedTooltip(tooltip)) {
                return;
            }
            this.clickedTooltip = null;
            if (tooltip) {
                this.openHoveredTooltip(tooltip);
            }
            else if (activeTooltip) {
                this.closeHoveredTooltip();
            }
        };
        this.pointerDownHandler = (event) => {
            if (!isPrimaryPointerButton(event)) {
                return;
            }
            const clickedTooltip = this.queryTooltip(event.composedPath());
            this.clickedTooltip = clickedTooltip;
            if (clickedTooltip?.closeOnClick) {
                this.toggleTooltip(clickedTooltip, false);
                this.clearHoverTimeout();
            }
        };
        this.focusInHandler = (event) => {
            this.queryFocusedTooltip(event, true);
        };
        this.focusOutHandler = (event) => {
            this.queryFocusedTooltip(event, false);
        };
        this.openHoveredTooltip = (tooltip) => {
            this.hoverOpenTimeout = window.setTimeout(() => {
                if (this.hoverOpenTimeout === null) {
                    return;
                }
                this.clearHoverCloseTimeout();
                if (this.activeTooltip === this.hoveredTooltip) {
                    return;
                }
                this.closeActiveTooltip();
                if (tooltip !== this.hoveredTooltip) {
                    return;
                }
                this.toggleTooltip(tooltip, true);
            }, this.activeTooltip ? 0 : TOOLTIP_OPEN_DELAY_MS);
        };
        this.closeHoveredTooltip = () => {
            this.hoverCloseTimeout = window.setTimeout(() => {
                if (this.hoverCloseTimeout === null) {
                    return;
                }
                this.closeActiveTooltip();
            }, TOOLTIP_CLOSE_DELAY_MS);
        };
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    registerElement(referenceEl, tooltip) {
        this.registeredElementCount++;
        this.registeredElements.set(referenceEl, tooltip);
        const shadowRoot = this.getReferenceElShadowRootNode(referenceEl);
        if (shadowRoot) {
            this.registerShadowRoot(shadowRoot);
        }
        if (this.registeredElementCount === 1) {
            this.addListeners();
        }
    }
    unregisterElement(referenceEl) {
        const shadowRoot = this.getReferenceElShadowRootNode(referenceEl);
        if (shadowRoot) {
            this.unregisterShadowRoot(shadowRoot);
        }
        if (this.registeredElements.delete(referenceEl)) {
            this.registeredElementCount--;
        }
        if (this.registeredElementCount === 0) {
            this.removeListeners();
        }
    }
    addShadowListeners(shadowRoot) {
        shadowRoot.addEventListener("focusin", this.focusInHandler, { capture: true });
        shadowRoot.addEventListener("focusout", this.focusOutHandler, { capture: true });
    }
    removeShadowListeners(shadowRoot) {
        shadowRoot.removeEventListener("focusin", this.focusInHandler, { capture: true });
        shadowRoot.removeEventListener("focusout", this.focusOutHandler, { capture: true });
    }
    addListeners() {
        window.addEventListener("keydown", this.keyDownHandler, { capture: true });
        window.addEventListener("pointermove", this.pointerMoveHandler, { capture: true });
        window.addEventListener("pointerdown", this.pointerDownHandler, { capture: true });
        window.addEventListener("focusin", this.focusInHandler, { capture: true });
        window.addEventListener("focusout", this.focusOutHandler, { capture: true });
    }
    removeListeners() {
        window.removeEventListener("keydown", this.keyDownHandler, { capture: true });
        window.removeEventListener("pointermove", this.pointerMoveHandler, { capture: true });
        window.removeEventListener("pointerdown", this.pointerDownHandler, { capture: true });
        window.removeEventListener("focusin", this.focusInHandler, { capture: true });
        window.removeEventListener("focusout", this.focusOutHandler, { capture: true });
    }
    clearHoverOpenTimeout() {
        window.clearTimeout(this.hoverOpenTimeout);
        this.hoverOpenTimeout = null;
    }
    clearHoverCloseTimeout() {
        window.clearTimeout(this.hoverCloseTimeout);
        this.hoverCloseTimeout = null;
    }
    clearHoverTimeout() {
        this.clearHoverOpenTimeout();
        this.clearHoverCloseTimeout();
    }
    closeActiveTooltip() {
        const { activeTooltip } = this;
        if (activeTooltip?.open) {
            this.toggleTooltip(activeTooltip, false);
        }
    }
    toggleFocusedTooltip(tooltip, open) {
        this.closeActiveTooltip();
        if (open) {
            this.clearHoverTimeout();
        }
        this.toggleTooltip(tooltip, open);
    }
    toggleTooltip(tooltip, open) {
        tooltip.open = open;
        this.activeTooltip = open ? tooltip : null;
    }
    queryFocusedTooltip(event, open) {
        const tooltip = this.queryTooltip(event.composedPath());
        if (!tooltip || this.isClosableClickedTooltip(tooltip)) {
            return;
        }
        this.toggleFocusedTooltip(tooltip, open);
    }
    isClosableClickedTooltip(tooltip) {
        return tooltip?.closeOnClick && tooltip === this.clickedTooltip;
    }
    registerShadowRoot(shadowRoot) {
        const { registeredShadowRootCounts } = this;
        const newCount = (registeredShadowRootCounts.get(shadowRoot) ?? 0) + 1;
        if (newCount === 1) {
            this.addShadowListeners(shadowRoot);
        }
        registeredShadowRootCounts.set(shadowRoot, newCount);
    }
    unregisterShadowRoot(shadowRoot) {
        const { registeredShadowRootCounts } = this;
        const newCount = registeredShadowRootCounts.get(shadowRoot) - 1;
        if (newCount === 0) {
            this.removeShadowListeners(shadowRoot);
        }
        registeredShadowRootCounts.set(shadowRoot, newCount);
    }
    getReferenceElShadowRootNode(referenceEl) {
        return referenceEl instanceof Element ? getShadowRootNode(referenceEl) : null;
    }
}

const tooltipCss = ":host{--calcite-floating-ui-z-index:var(--calcite-tooltip-z-index, var(--calcite-z-index-tooltip));display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index)}.calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:var(--calcite-z-index);border-radius:0.25rem}:host([data-placement^=bottom]) .calcite-floating-ui-anim{transform:translateY(-5px)}:host([data-placement^=top]) .calcite-floating-ui-anim{transform:translateY(5px)}:host([data-placement^=left]) .calcite-floating-ui-anim{transform:translateX(5px)}:host([data-placement^=right]) .calcite-floating-ui-anim{transform:translateX(-5px)}:host([data-placement]) .calcite-floating-ui-anim--active{opacity:1;transform:translate(0)}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}.calcite-floating-ui-arrow{pointer-events:none;position:absolute;z-index:calc(var(--calcite-z-index) * -1);fill:var(--calcite-color-foreground-1)}.calcite-floating-ui-arrow__stroke{stroke:var(--calcite-color-border-3)}.container{position:relative;overflow:hidden;border-radius:0.25rem;padding-block:0.75rem;padding-inline:1rem;font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);max-inline-size:20rem;max-block-size:20rem;text-align:start}.calcite-floating-ui-anim{border-radius:0.25rem;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1)}.arrow::before{outline:1px solid var(--calcite-color-border-3)}:host([hidden]){display:none}[hidden]{display:none}";

const manager = new TooltipManager();
const Tooltip = /*@__PURE__*/ proxyCustomElement(class Tooltip extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteTooltipBeforeClose = createEvent(this, "calciteTooltipBeforeClose", 6);
        this.calciteTooltipClose = createEvent(this, "calciteTooltipClose", 6);
        this.calciteTooltipBeforeOpen = createEvent(this, "calciteTooltipBeforeOpen", 6);
        this.calciteTooltipOpen = createEvent(this, "calciteTooltipOpen", 6);
        this.guid = `calcite-tooltip-${guid()}`;
        this.hasLoaded = false;
        this.openTransitionProp = "opacity";
        this.setTransitionEl = (el) => {
            this.transitionEl = el;
        };
        this.setUpReferenceElement = (warn = true) => {
            this.removeReferences();
            this.effectiveReferenceElement = getEffectiveReferenceElement(this.el);
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
        this.addReferences = () => {
            const { effectiveReferenceElement } = this;
            if (!effectiveReferenceElement) {
                return;
            }
            const id = this.getId();
            if ("setAttribute" in effectiveReferenceElement) {
                effectiveReferenceElement.setAttribute(ARIA_DESCRIBED_BY, id);
            }
            manager.registerElement(effectiveReferenceElement, this.el);
        };
        this.removeReferences = () => {
            const { effectiveReferenceElement } = this;
            if (!effectiveReferenceElement) {
                return;
            }
            if ("removeAttribute" in effectiveReferenceElement) {
                effectiveReferenceElement.removeAttribute(ARIA_DESCRIBED_BY);
            }
            manager.unregisterElement(effectiveReferenceElement);
        };
        this.closeOnClick = false;
        this.label = undefined;
        this.offsetDistance = defaultOffsetDistance;
        this.offsetSkidding = 0;
        this.open = false;
        this.overlayPositioning = "absolute";
        this.placement = "auto";
        this.referenceElement = undefined;
        this.effectiveReferenceElement = undefined;
        this.floatingLayout = "vertical";
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
    }
    overlayPositioningHandler() {
        this.reposition(true);
    }
    placementHandler() {
        this.reposition(true);
    }
    referenceElementHandler() {
        this.setUpReferenceElement();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        this.setUpReferenceElement(this.hasLoaded);
        if (this.open) {
            onToggleOpenCloseComponent(this);
        }
        connectFloatingUI(this, this.effectiveReferenceElement, this.el);
    }
    async componentWillLoad() {
        if (this.open) {
            onToggleOpenCloseComponent(this);
        }
    }
    componentDidLoad() {
        if (this.referenceElement && !this.effectiveReferenceElement) {
            this.setUpReferenceElement();
        }
        this.reposition(true);
        this.hasLoaded = true;
    }
    disconnectedCallback() {
        this.removeReferences();
        disconnectFloatingUI(this, this.effectiveReferenceElement, this.el);
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
        const { el, effectiveReferenceElement, placement, overlayPositioning, offsetDistance, offsetSkidding, arrowEl, } = this;
        return reposition(this, {
            floatingEl: el,
            referenceEl: effectiveReferenceElement,
            overlayPositioning,
            placement,
            offsetDistance,
            offsetSkidding,
            arrowEl,
            type: "tooltip",
        }, delayed);
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    onBeforeOpen() {
        this.calciteTooltipBeforeOpen.emit();
    }
    onOpen() {
        this.calciteTooltipOpen.emit();
    }
    onBeforeClose() {
        this.calciteTooltipBeforeClose.emit();
    }
    onClose() {
        this.calciteTooltipClose.emit();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        const { effectiveReferenceElement, label, open, floatingLayout } = this;
        const displayed = effectiveReferenceElement && open;
        const hidden = !displayed;
        return (h(Host, { "aria-hidden": toAriaBoolean(hidden), "aria-label": label, "aria-live": "polite", "calcite-hydrated-hidden": hidden, id: this.getId(), role: "tooltip" }, h("div", { class: {
                [FloatingCSS.animation]: true,
                [FloatingCSS.animationActive]: displayed,
            },
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setTransitionEl }, h(FloatingArrow, { floatingLayout: floatingLayout,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (arrowEl) => (this.arrowEl = arrowEl) }), h("div", { class: CSS.container }, h("slot", null)))));
    }
    get el() { return this; }
    static get watchers() { return {
        "offsetDistance": ["offsetDistanceOffsetHandler"],
        "offsetSkidding": ["offsetSkiddingHandler"],
        "open": ["openHandler"],
        "overlayPositioning": ["overlayPositioningHandler"],
        "placement": ["placementHandler"],
        "referenceElement": ["referenceElementHandler"]
    }; }
    static get style() { return tooltipCss; }
}, [1, "calcite-tooltip", {
        "closeOnClick": [516, "close-on-click"],
        "label": [1],
        "offsetDistance": [514, "offset-distance"],
        "offsetSkidding": [514, "offset-skidding"],
        "open": [516],
        "overlayPositioning": [513, "overlay-positioning"],
        "placement": [513],
        "referenceElement": [1, "reference-element"],
        "effectiveReferenceElement": [32],
        "floatingLayout": [32],
        "reposition": [64]
    }, undefined, {
        "offsetDistance": ["offsetDistanceOffsetHandler"],
        "offsetSkidding": ["offsetSkiddingHandler"],
        "open": ["openHandler"],
        "overlayPositioning": ["overlayPositioningHandler"],
        "placement": ["placementHandler"],
        "referenceElement": ["referenceElementHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Tooltip);
            }
            break;
    } });
}
defineCustomElement();

export { Tooltip as T, defineCustomElement as d };
