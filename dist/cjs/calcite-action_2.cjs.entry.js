/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const dom = require('./dom-795d4a33.js');
const guid = require('./guid-e84a8375.js');
const interactive = require('./interactive-a128ac30.js');
const loadable = require('./loadable-1c888c87.js');
const locale = require('./locale-da840314.js');
const observers = require('./observers-18d87cb5.js');
const component = require('./component-5d190962.js');
const t9n = require('./t9n-ed5c03a7.js');
const browser = require('./browser-333a21c5.js');
const floatingUi = require('./floating-ui-0f85d59c.js');
const focusTrapComponent = require('./focusTrapComponent-b19fd5d5.js');
const openCloseComponent = require('./openCloseComponent-3c540d25.js');
const Heading = require('./Heading-a3e36113.js');
const FloatingArrow = require('./FloatingArrow-91a71a80.js');
const key = require('./key-47c9469a.js');
require('./resources-18f799c7.js');
require('./debounce-7f1e04d6.js');
require('./config-e76d9931.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS$1 = {
    button: "button",
    buttonTextVisible: "button--text-visible",
    buttonCompact: "button--compact",
    indicatorText: "indicator-text",
    iconContainer: "icon-container",
    slotContainer: "slot-container",
    slotContainerHidden: "slot-container--hidden",
    textContainer: "text-container",
    textContainerVisible: "text-container--visible",
    indicatorWithIcon: "indicator-with-icon",
    indicatorWithoutIcon: "indicator-without-icon",
};
const SLOTS = {
    tooltip: "tooltip",
};

const actionCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;background-color:transparent}:host,button{border-end-end-radius:var(--calcite-action-corner-radius-end-end, var(--calcite-action-corner-radius, var(--calcite-corner-radius)));border-end-start-radius:var(--calcite-action-corner-radius-end-start, var(--calcite-action-corner-radius, var(--calcite-corner-radius)));border-start-end-radius:var(--calcite-action-corner-radius-start-end, var(--calcite-action-corner-radius, var(--calcite-corner-radius)));border-start-start-radius:var(--calcite-action-corner-radius-start-start, var(--calcite-action-corner-radius, var(--calcite-corner-radius)))}.button{position:relative;margin:0px;display:flex;inline-size:auto;cursor:pointer;align-items:center;justify-content:flex-start;border-style:none;font-family:var(--calcite-font-family);font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-medium);outline-color:transparent;background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1));color:var(--calcite-action-text-color, var(--calcite-color-text-3));text-align:unset;flex:1 0 auto}.button:hover,.button:focus{background-color:var(--calcite-action-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-action-text-color-pressed, var(--calcite-color-text-1))}.button:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.button:active{background-color:var(--calcite-action-background-color-pressed, var(--calcite-color-foreground-3))}.icon-container{pointer-events:none;margin:0px;display:flex;align-items:center;justify-content:center;min-inline-size:1rem;min-block-size:1.5rem}.text-container{margin:0px;inline-size:0px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.5rem;opacity:0;transition-property:opacity;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-property:margin;transition-property:inline-size}.text-container--visible{inline-size:auto;flex:1 1 auto;opacity:1}:host([active]) .button,:host([active]) .button:hover,:host([active]) .button:focus{color:var(--calcite-action-text-color-pressed, var(--calcite-color-text-1));background-color:var(--calcite-action-background-color-pressed, var(--calcite-color-foreground-3))}:host([active]) .button:active{background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1))}:host([loading]) .button:hover,:host([loading]) .button:focus{background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1))}:host([loading]) .text-container{opacity:var(--calcite-opacity-disabled)}:host([loading]) calcite-loader[inline]{margin-inline-end:0px}:host([appearance=transparent]) .button{background-color:transparent;transition-property:box-shadow;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}:host([appearance=transparent]) .button:hover,:host([appearance=transparent]) .button:focus{background-color:var(--calcite-color-transparent-hover)}:host([appearance=transparent]) .button:active{background-color:var(--calcite-color-transparent-press)}:host([data-active]) .button{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([scale=s]) .button{padding-inline:0.5rem;padding-block:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-normal)}:host([scale=s]) .button--text-visible .icon-container{margin-inline-end:0.5rem}:host([scale=m]) .button{padding-inline:1rem;padding-block:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem;font-weight:var(--calcite-font-weight-normal)}:host([scale=m]) .button--text-visible .icon-container{margin-inline-end:0.75rem}:host([scale=l]) .button{padding:1.25rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-normal)}:host([scale=l]) .button--text-visible .icon-container{margin-inline-end:1rem}:host([alignment=center]) .button{justify-content:center}:host([alignment=end]) .button{justify-content:flex-end}:host([alignment=center]) .button .text-container--visible,:host([alignment=end]) .button .text-container--visible{flex:0 1 auto}:host([scale=s][compact]) .button,:host([scale=m][compact]) .button,:host([scale=l][compact]) .button{padding-inline:0px}.slot-container{display:flex}.slot-container--hidden{display:none}.button--text-visible{inline-size:100%}.indicator-with-icon{position:relative}.indicator-with-icon::after{content:\"\";position:absolute;block-size:0.5rem;inline-size:0.5rem;border-radius:9999px;inset-block-end:-0.275rem;inset-inline-end:-0.275rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand))}.indicator-without-icon{margin-inline:0.25rem;inline-size:1rem;position:relative}.indicator-without-icon::after{content:\"\";position:absolute;block-size:0.5rem;inline-size:0.5rem;border-radius:9999px;inset-block-end:-0.275rem;inset-inline-end:-0.275rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand))}.indicator-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) .button,:host([disabled]) .button:hover,:host([disabled]) .button:focus{cursor:default;background-color:var(--calcite-color-foreground-1);opacity:var(--calcite-opacity-disabled)}:host([disabled]):host([active]) .button,:host([disabled]):host([active]) .button:hover,:host([disabled]):host([active]) .button:focus{background-color:var(--calcite-color-foreground-3);opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}";
const CalciteActionStyle0 = actionCss;

const Action = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.mutationObserver = observers.createObserver("mutation", () => index.forceUpdate(this));
        this.guid = `calcite-action-${guid.guid()}`;
        this.indicatorId = `${this.guid}-indicator`;
        this.buttonId = `${this.guid}-button`;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleTooltipSlotChange = (event) => {
            const tooltips = event.target
                .assignedElements({
                flatten: true,
            })
                .filter((el) => el?.matches("calcite-tooltip"));
            const tooltip = tooltips[0];
            if (tooltip) {
                tooltip.referenceElement = this.buttonEl;
            }
        };
        this.active = false;
        this.alignment = undefined;
        this.appearance = "solid";
        this.compact = false;
        this.disabled = false;
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.indicator = false;
        this.label = undefined;
        this.loading = false;
        this.scale = "m";
        this.text = undefined;
        this.textEnabled = false;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.effectiveLocale = "";
        this.defaultMessages = undefined;
    }
    onMessagesChange() {
        /* wired up by t9n util */
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
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        if (browser.isBrowser()) {
            await t9n.setUpMessages(this);
        }
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    disconnectedCallback() {
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        this.mutationObserver?.disconnect();
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        this.buttonEl?.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderTextContainer() {
        const { text, textEnabled } = this;
        const textContainerClasses = {
            [CSS$1.textContainer]: true,
            [CSS$1.textContainerVisible]: textEnabled,
        };
        return text ? (index.h("div", { class: textContainerClasses, key: "text-container" }, text)) : null;
    }
    renderIndicatorText() {
        const { indicator, messages, indicatorId, buttonId } = this;
        return (index.h("div", { "aria-labelledby": buttonId, "aria-live": "polite", class: CSS$1.indicatorText, id: indicatorId, role: "region" }, indicator ? messages.indicator : null));
    }
    renderIconContainer() {
        const { loading, icon, scale, el, iconFlipRtl, indicator } = this;
        const loaderScale = scale === "l" ? "l" : "m";
        const calciteLoaderNode = loading ? (index.h("calcite-loader", { inline: true, label: this.messages.loading, scale: loaderScale })) : null;
        const calciteIconNode = icon ? (index.h("calcite-icon", { class: { [CSS$1.indicatorWithIcon]: indicator }, flipRtl: iconFlipRtl, icon: icon, scale: component.getIconScale(this.scale) })) : null;
        const iconNode = calciteLoaderNode || calciteIconNode;
        const hasIconToDisplay = iconNode || el.children?.length;
        const slotContainerNode = (index.h("div", { class: {
                [CSS$1.slotContainer]: true,
                [CSS$1.slotContainerHidden]: loading,
            } }, index.h("slot", null)));
        return hasIconToDisplay ? (index.h("div", { "aria-hidden": "true", class: CSS$1.iconContainer, key: "icon-container" }, iconNode, slotContainerNode)) : null;
    }
    render() {
        const { active, compact, disabled, icon, loading, textEnabled, label, text, indicator, indicatorId, buttonId, messages, } = this;
        const labelFallback = label || text;
        const ariaLabel = labelFallback
            ? `${labelFallback}${indicator ? ` (${messages.indicator})` : ""}`
            : "";
        const buttonClasses = {
            [CSS$1.button]: true,
            [CSS$1.buttonTextVisible]: textEnabled,
            [CSS$1.buttonCompact]: compact,
        };
        return (index.h(index.Host, { key: '3b459307dcb6f8d373e70cd5c7a45d122565a70e' }, index.h(interactive.InteractiveContainer, { key: '3a81f1fb62a66f1dbd608f095ed90f2d47a9daf6', disabled: disabled }, index.h("button", { key: 'bb5249babc116d462becd6b9a056ca0d368c6e09', "aria-busy": dom.toAriaBoolean(loading), "aria-controls": indicator ? indicatorId : null, "aria-label": ariaLabel, "aria-pressed": dom.toAriaBoolean(active), class: buttonClasses, disabled: disabled, id: buttonId, ref: (buttonEl) => (this.buttonEl = buttonEl) }, this.renderIconContainer(), this.renderTextContainer(), !icon && indicator && index.h("div", { class: CSS$1.indicatorWithoutIcon, key: "indicator-no-icon" })), index.h("slot", { key: '983989711d64076eca866c1928f9c777331fcba4', name: SLOTS.tooltip, onSlotchange: this.handleTooltipSlotChange }), this.renderIndicatorText())));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Action.style = CalciteActionStyle0;

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
            else if (key.isActivationKey(event.key)) {
                this.togglePopovers(event);
            }
        };
        this.clickHandler = (event) => {
            if (dom.isKeyboardTriggeredClick(event)) {
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
                ? floatingUi.filterValidFlipPlacements(flipPlacements, el)
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
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
        this.setFilteredPlacements();
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        focusTrapComponent.connectFocusTrap(this);
        // we set up the ref element in the next frame to ensure PopoverManager
        // event handlers are invoked after connect (mainly for `components` output target)
        requestAnimationFrame(() => this.setUpReferenceElement(this.hasLoaded));
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
        if (this.open) {
            openCloseComponent.onToggleOpenCloseComponent(this);
        }
        this.hasLoaded = true;
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
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
        return closable ? (index.h("div", { class: CSS.closeButtonContainer, key: CSS.closeButtonContainer }, index.h("calcite-action", { appearance: "transparent", class: CSS.closeButton, onClick: this.hide, ref: (closeButtonEl) => (this.closeButtonEl = closeButtonEl), scale: this.scale, text: messages.close }, index.h("calcite-icon", { icon: "x", scale: component.getIconScale(this.scale) })))) : null;
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
        const arrowNode = !pointerDisabled ? (index.h(FloatingArrow.FloatingArrow, { floatingLayout: floatingLayout, key: "floating-arrow", ref: this.storeArrowEl })) : null;
        return (index.h(index.Host, { key: 'a563d48090d6e6c0c138023e169667834f657c4c', "aria-hidden": dom.toAriaBoolean(hidden), "aria-label": label, "aria-live": "polite", "calcite-hydrated-hidden": hidden, id: this.getId(), role: "dialog" }, index.h("div", { key: '73053dbdce2cfc68fcd42667089d611e81010955', class: {
                [CSS.container]: true,
                [floatingUi.FloatingCSS.animation]: true,
                [floatingUi.FloatingCSS.animationActive]: displayed,
            }, ref: this.setTransitionEl }, arrowNode, index.h("div", { key: '1fbcd45ee42b10a67881ced74db2db051231c94d', class: {
                [CSS.hasHeader]: !!heading,
                [CSS.headerContainer]: true,
            } }, this.renderHeader(), index.h("div", { key: '522abe801b98787863aac14d990b948d2d286156', class: CSS.content }, index.h("slot", { key: '022a8f690288acdbac4ec1b3eccf807ffe382d5d' })), !heading ? this.renderCloseButton() : null))));
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
Popover.style = CalcitePopoverStyle0;

exports.calcite_action = Action;
exports.calcite_popover = Popover;
