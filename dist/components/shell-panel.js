/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, forceUpdate } from '@stencil/core/internal/client';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot.js';
import { g as getElementDir, i as isPrimaryPointerButton, h as slotChangeGetAssignedElements, j as slotChangeHasAssignedElement } from './dom.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { c as clamp } from './math.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './t9n.js';
import { C as CSS_UTILITY } from './resources.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    container: "container",
    content: "content",
    contentHeader: "content__header",
    contentBody: "content__body",
    floatContent: "float--content",
    contentOverlay: "content--overlay",
    separator: "separator",
    float: "float",
    floatAll: "float-all",
};
const SLOTS = {
    actionBar: "action-bar",
    header: "header",
};

const shellPanelCss = ":host{pointer-events:none;position:relative;display:flex;flex:0 1 auto;align-items:stretch;z-index:var(--calcite-shell-panel-z-index, var(--calcite-z-index));--calcite-shell-panel-detached-max-height:unset;--calcite-shell-panel-max-height:unset;--calcite-internal-shell-panel-shadow-block-start:0 4px 8px -1px rgba(0, 0, 0, 0.08),\n    0 2px 4px -1px rgba(0, 0, 0, 0.04);--calcite-internal-shell-panel-shadow-block-end:0 -4px 8px -1px rgba(0, 0, 0, 0.08),\n    0 -2px 4px -1px rgba(0, 0, 0, 0.04);--calcite-internal-shell-panel-shadow-inline-start:4px 0 8px -1px rgba(0, 0, 0, 0.08),\n    2px 0 4px -1px rgba(0, 0, 0, 0.04);--calcite-internal-shell-panel-shadow-inline-end:-4px 0 8px -1px rgba(0, 0, 0, 0.08),\n    -2px 0 4px -1px rgba(0, 0, 0, 0.04)}.calcite--rtl.content--overlay{--calcite-internal-shell-panel-shadow-inline-start:-4px 0 8px -1px rgba(0, 0, 0, 0.08),\n    -2px 0 4px -1px rgba(0, 0, 0, 0.04);--calcite-internal-shell-panel-shadow-inline-end:4px 0 8px -1px rgba(0, 0, 0, 0.08),\n    2px 0 4px -1px rgba(0, 0, 0, 0.04)}:host([layout=vertical]){z-index:var(--calcite-shell-panel-z-index, calc(var(--calcite-z-index) + 1))}:host([layout=vertical][display-mode=overlay]){z-index:var(--calcite-shell-panel-z-index, calc(var(--calcite-z-index-header) + 1))}:host([layout=vertical][display-mode=float-all]) .content{flex:2}:host([layout=vertical][width-scale=s]:not([display-mode=float-all])) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 12vw);--calcite-internal-shell-panel-max-width:var(--calcite-shell-panel-max-width, 300px);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 150px)}:host([layout=vertical][width-scale=s][display-mode=float-all]) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 12vw);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 150px)}:host([layout=vertical][width-scale=m]:not([display-mode=float-all])) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 20vw);--calcite-internal-shell-panel-max-width:var(--calcite-shell-panel-max-width, 420px);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 240px)}:host([layout=vertical][width-scale=m][display-mode=float-all]) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 20vw);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 240px)}:host([layout=vertical][width-scale=l]:not([display-mode=float-all])) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 45vw);--calcite-internal-shell-panel-max-width:var(--calcite-shell-panel-max-width, 680px);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 340px)}:host([layout=vertical][width-scale=l][display-mode=float-all]) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 45vw);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 340px)}:host([layout=horizontal][height-scale=s]) .content{--calcite-internal-shell-panel-max-height:var(\n    --calcite-shell-panel-max-height,\n    var(--calcite-shell-panel-detached-max-height, 20vh)\n  )}:host([layout=horizontal]) .content{--calcite-internal-shell-panel-min-height:var(--calcite-shell-panel-min-height, 5vh);--calcite-internal-shell-panel-max-height:var(\n    --calcite-shell-panel-max-height,\n    var(--calcite-shell-panel-detached-max-height, 30vh)\n  )}:host([layout=horizontal][height-scale=l]) .content{--calcite-internal-shell-panel-max-height:var(\n    --calcite-shell-panel-max-height,\n    var(--calcite-shell-panel-detached-max-height, 40vh)\n  )}.container{pointer-events:none;box-sizing:border-box;display:flex;block-size:100%;flex:1 1 auto;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-color-text-2)}.container *{box-sizing:border-box}.container.float-all{margin-block:0.5rem;margin-inline:0.5rem}:host([layout=horizontal]) .container{block-size:auto;inline-size:100%;flex-direction:column}:host(:hover) .separator:not(:hover):not(:focus),:host(:focus-within) .separator:not(:hover):not(:focus){opacity:1;background-color:var(--calcite-color-border-3)}.separator{pointer-events:auto;position:absolute;display:flex;background-color:transparent;opacity:0;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;cursor:col-resize;outline:none}.separator:hover{opacity:1;background-color:var(--calcite-color-border-2)}.separator:focus{background-color:var(--calcite-color-brand);opacity:1}:host([layout=vertical]) .separator{inset-block:0px;block-size:100%;inline-size:0.125rem;cursor:col-resize}:host([layout=horizontal][position=start]) .separator{inset-block-end:0px}:host([layout=horizontal][position=end]) .separator{inset-block-start:0px}:host([layout=horizontal]) .separator{inset-inline-end:0px;block-size:0.125rem;inline-size:100%;cursor:row-resize}:host([layout=vertical][position=start]) .separator{inset-inline-end:-2px}:host([layout=horizontal][position=start]) .separator{inset-block-end:-2px}:host([layout=vertical][position=end]) .separator{inset-inline-start:-2px}:host([layout=horizontal][position=end]) .separator{inset-block-start:-2px}::slotted(calcite-panel),::slotted(calcite-flow){block-size:100%;inline-size:100%;flex:1 1 auto;max-block-size:unset;max-inline-size:unset}::slotted(.calcite-match-height){display:flex;flex:1 1 auto;overflow:hidden}.content{pointer-events:auto;display:flex;flex-direction:column;flex-wrap:nowrap;align-items:stretch;align-self:stretch;background-color:var(--calcite-color-background);padding:0px;transition:max-block-size var(--calcite-animation-timing), max-inline-size var(--calcite-animation-timing)}:host([layout=vertical]:not([display-mode=float-all])) .content{inline-size:var(--calcite-internal-shell-panel-width);max-inline-size:var(--calcite-internal-shell-panel-max-width);min-inline-size:var(--calcite-internal-shell-panel-min-width)}:host([layout=vertical][display-mode=float-all]) .content{inline-size:var(--calcite-internal-shell-panel-width);min-inline-size:var(--calcite-internal-shell-panel-min-width)}:host([layout=horizontal]) .content{block-size:var(--calcite-internal-shell-panel-height);max-block-size:var(--calcite-internal-shell-panel-max-height);min-block-size:var(--calcite-internal-shell-panel-min-height)}.content__header{display:flex;flex:0 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch}.content__body{display:flex;flex:1 1 auto;flex-direction:column;overflow:hidden}.content--overlay{position:absolute;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([layout=vertical]) .content--overlay{inset-block-start:0px;block-size:100%}:host([layout=horizontal]) .content--overlay{inset-inline-start:0px;inline-size:100%}:host([layout=vertical][position=start]) .content--overlay{inset-inline-start:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-inline-start)}:host([layout=vertical][position=end]) .content--overlay{inset-inline-end:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-inline-end)}:host([layout=horizontal][position=start]) .content--overlay{inset-block-start:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-block-start)}:host([layout=horizontal][position=end]) .content--overlay{inset-block-end:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-block-end)}.float--content{margin-inline:0.5rem;margin-block:0.5rem auto;block-size:auto;overflow:hidden;border-radius:0.25rem;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);max-block-size:var(--calcite-internal-shell-panel-max-height, calc(100% - 1rem))}.float--content ::slotted(calcite-panel),.float--content ::slotted(calcite-flow){max-block-size:unset}:host([layout=horizontal]) .float--content{margin-block:0.5rem}:host([position=start]) .float--content ::slotted(calcite-panel),:host([position=start]) .float--content ::slotted(calcite-flow),:host([position=end]) .float--content ::slotted(calcite-panel),:host([position=end]) .float--content ::slotted(calcite-flow){border-style:none}.content[hidden]{display:none}slot[name=action-bar]::slotted(calcite-action-bar),.content ::slotted(calcite-flow),.content ::slotted(calcite-panel:not([closed])){border-width:1px;border-style:solid;border-color:var(--calcite-color-border-3)}:host([position=start]:not([slot=panel-end]):not([display-mode=float-all])) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=start]:not([slot=panel-end]):not([display-mode=float-all])) .content ::slotted(calcite-flow),:host([position=start]:not([slot=panel-end]):not([display-mode=float-all])) .content ::slotted(calcite-panel),:host([position=end][slot=panel-start]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=end][slot=panel-start]) .content ::slotted(calcite-flow),:host([position=end][slot=panel-start]) .content ::slotted(calcite-panel){border-inline-start:none}:host([position=end]:not([slot=panel-start])) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=end]:not([slot=panel-start])) .content ::slotted(calcite-flow),:host([position=end]:not([slot=panel-start])) .content ::slotted(calcite-panel),:host([position=start][slot=panel-end]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=start][slot=panel-end]) .content ::slotted(calcite-flow),:host([position=start][slot=panel-end]) .content ::slotted(calcite-panel){border-inline-end:none}:host([layout=horizontal]:not([display-mode=float-all])) slot[name=action-bar]::slotted(calcite-action-bar){border-inline:0}:host([layout=horizontal][position=start]:not([display-mode=float-all])) .content ::slotted(calcite-flow),:host([layout=horizontal][position=start]:not([display-mode=float-all])) .content ::slotted(calcite-panel){border-inline:0;border-block-start:0}:host([layout=horizontal][position=end]) .content ::slotted(calcite-flow),:host([layout=horizontal][position=end]) .content ::slotted(calcite-panel){border-inline:0;border-block-end:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteShellPanelStyle0 = shellPanelCss;

const ShellPanel = /*@__PURE__*/ proxyCustomElement(class ShellPanel extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInternalShellPanelResizeStart = createEvent(this, "calciteInternalShellPanelResizeStart", 6);
        this.calciteInternalShellPanelResizeEnd = createEvent(this, "calciteInternalShellPanelResizeEnd", 6);
        this.initialContentWidth = null;
        this.initialContentHeight = null;
        this.initialClientX = null;
        this.initialClientY = null;
        this.contentWidthMax = null;
        this.contentWidthMin = null;
        this.contentHeightMax = null;
        this.contentHeightMin = null;
        this.step = 1;
        this.stepMultiplier = 10;
        this.actionBars = [];
        this.storeContentEl = (contentEl) => {
            this.contentEl = contentEl;
        };
        this.getKeyAdjustedSize = (event) => {
            const { key } = event;
            const { el, step, stepMultiplier, layout, contentWidthMin, contentWidthMax, initialContentWidth, initialContentHeight, contentHeightMin, contentHeightMax, position, } = this;
            const multipliedStep = step * stepMultiplier;
            const MOVEMENT_KEYS = [
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
                "Home",
                "End",
                "PageUp",
                "PageDown",
            ];
            if (MOVEMENT_KEYS.indexOf(key) > -1) {
                event.preventDefault();
            }
            const dir = getElementDir(el);
            const horizontalKeys = ["ArrowLeft", "ArrowRight"];
            const verticalKeys = ["ArrowDown", "ArrowUp"];
            const directionFactor = dir === "rtl" && horizontalKeys.includes(key) ? -1 : 1;
            const increaseKeys = layout === "horizontal"
                ? position === "end"
                    ? key === verticalKeys[1] || key === horizontalKeys[0]
                    : key === verticalKeys[0] || key === horizontalKeys[1]
                : key === verticalKeys[1] ||
                    (position === "end" ? key === horizontalKeys[0] : key === horizontalKeys[1]);
            if (increaseKeys) {
                const stepValue = event.shiftKey ? multipliedStep : step;
                return layout === "horizontal"
                    ? initialContentHeight + directionFactor * stepValue
                    : initialContentWidth + directionFactor * stepValue;
            }
            const decreaseKeys = layout === "horizontal"
                ? position === "end"
                    ? key === verticalKeys[0] || key === horizontalKeys[0]
                    : key === verticalKeys[1] || key === horizontalKeys[1]
                : key === verticalKeys[0] ||
                    (position === "end" ? key === horizontalKeys[1] : key === horizontalKeys[0]);
            if (decreaseKeys) {
                const stepValue = event.shiftKey ? multipliedStep : step;
                return layout === "horizontal"
                    ? initialContentHeight - directionFactor * stepValue
                    : initialContentWidth - directionFactor * stepValue;
            }
            if (key === "Home" && layout === "horizontal" && typeof contentHeightMin === "number") {
                return contentHeightMin;
            }
            if (key === "Home" && layout === "vertical" && typeof contentWidthMin === "number") {
                return contentWidthMin;
            }
            if (key === "End" && layout === "horizontal" && typeof contentHeightMax === "number") {
                return contentHeightMax;
            }
            if (key === "End" && layout === "vertical" && typeof contentWidthMax === "number") {
                return contentWidthMax;
            }
            if (key === "PageDown") {
                return layout === "horizontal"
                    ? initialContentHeight - multipliedStep
                    : initialContentWidth - multipliedStep;
            }
            if (key === "PageUp") {
                return layout === "horizontal"
                    ? initialContentHeight + multipliedStep
                    : initialContentWidth + multipliedStep;
            }
            return null;
        };
        this.initialKeydownWidth = (event) => {
            this.setInitialContentWidth();
            const width = this.getKeyAdjustedSize(event);
            if (typeof width === "number") {
                this.setContentWidth(width);
            }
        };
        this.initialKeydownHeight = (event) => {
            this.setInitialContentHeight();
            const height = this.getKeyAdjustedSize(event);
            if (typeof height === "number") {
                this.setContentHeight(height);
            }
        };
        this.separatorKeyDown = (event) => {
            this.layout === "horizontal"
                ? this.initialKeydownHeight(event)
                : this.initialKeydownWidth(event);
        };
        this.separatorPointerMove = (event) => {
            event.preventDefault();
            const { el, layout, initialContentWidth, initialContentHeight, position, initialClientX, initialClientY, } = this;
            const offset = layout === "horizontal" ? event.clientY - initialClientY : event.clientX - initialClientX;
            const adjustmentDirection = layout === "vertical" && getElementDir(el) === "rtl" ? -1 : 1;
            const adjustedOffset = layout === "horizontal"
                ? position === "end"
                    ? -adjustmentDirection * offset
                    : adjustmentDirection * offset
                : position === "end"
                    ? -adjustmentDirection * offset
                    : adjustmentDirection * offset;
            layout === "horizontal"
                ? this.setContentHeight(initialContentHeight + adjustedOffset)
                : this.setContentWidth(initialContentWidth + adjustedOffset);
        };
        this.separatorPointerUp = (event) => {
            if (!isPrimaryPointerButton(event)) {
                return;
            }
            this.calciteInternalShellPanelResizeEnd.emit();
            event.preventDefault();
            window.removeEventListener("pointerup", this.separatorPointerUp);
            window.removeEventListener("pointermove", this.separatorPointerMove);
        };
        this.setInitialContentHeight = () => {
            this.initialContentHeight = this.contentEl?.getBoundingClientRect().height;
        };
        this.setInitialContentWidth = () => {
            this.initialContentWidth = this.contentEl?.getBoundingClientRect().width;
        };
        this.separatorPointerDown = (event) => {
            if (!isPrimaryPointerButton(event)) {
                return;
            }
            this.calciteInternalShellPanelResizeStart.emit();
            event.preventDefault();
            const { separatorEl } = this;
            separatorEl && document.activeElement !== separatorEl && separatorEl.focus();
            if (this.layout === "horizontal") {
                this.setInitialContentHeight();
                this.initialClientY = event.clientY;
            }
            else {
                this.setInitialContentWidth();
                this.initialClientX = event.clientX;
            }
            window.addEventListener("pointerup", this.separatorPointerUp);
            window.addEventListener("pointermove", this.separatorPointerMove);
        };
        this.connectSeparator = (separatorEl) => {
            this.disconnectSeparator();
            this.separatorEl = separatorEl;
            separatorEl?.addEventListener("pointerdown", this.separatorPointerDown);
        };
        this.disconnectSeparator = () => {
            this.separatorEl?.removeEventListener("pointerdown", this.separatorPointerDown);
        };
        this.setActionBarsLayout = (actionBars) => {
            actionBars.forEach((actionBar) => (actionBar.layout = this.layout));
        };
        this.handleActionBarSlotChange = (event) => {
            const actionBars = slotChangeGetAssignedElements(event).filter((el) => el?.matches("calcite-action-bar"));
            this.actionBars = actionBars;
            this.setActionBarsLayout(actionBars);
        };
        this.handleHeaderSlotChange = (event) => {
            this.hasHeader = slotChangeHasAssignedElement(event);
        };
        this.collapsed = false;
        this.detached = false;
        this.displayMode = "dock";
        this.detachedHeightScale = undefined;
        this.heightScale = undefined;
        this.widthScale = "m";
        this.layout = "vertical";
        this.position = "start";
        this.resizable = false;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.contentWidth = null;
        this.contentHeight = null;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.hasHeader = false;
    }
    handleDetached(value) {
        if (value) {
            this.displayMode = "float-content";
        }
        else if (this.displayMode === "float-content" || this.displayMode === "float") {
            this.displayMode = "dock";
        }
    }
    handleDisplayMode(value) {
        this.detached = value === "float-content" || value === "float";
    }
    handleDetachedHeightScale(value) {
        this.heightScale = value;
    }
    handleHeightScale(value) {
        this.detachedHeightScale = value;
    }
    layoutHandler() {
        this.setActionBarsLayout(this.actionBars);
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
        connectConditionalSlotComponent(this);
        connectLocalized(this);
        connectMessages(this);
    }
    async componentWillLoad() {
        await setUpMessages(this);
    }
    disconnectedCallback() {
        disconnectConditionalSlotComponent(this);
        this.disconnectSeparator();
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    componentDidLoad() {
        this.updateAriaValues();
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHeader() {
        return (h("div", { class: CSS.contentHeader, hidden: !this.hasHeader, key: "header" }, h("slot", { name: SLOTS.header, onSlotchange: this.handleHeaderSlotChange })));
    }
    render() {
        const { collapsed, position, initialContentWidth, initialContentHeight, contentWidth, contentWidthMax, contentWidthMin, contentHeight, contentHeightMax, contentHeightMin, resizable, layout, displayMode, } = this;
        const dir = getElementDir(this.el);
        const allowResizing = displayMode !== "float-content" && displayMode !== "float" && resizable;
        const style = allowResizing
            ? layout === "horizontal"
                ? contentHeight
                    ? { height: `${contentHeight}px` }
                    : null
                : contentWidth
                    ? { width: `${contentWidth}px` }
                    : null
            : null;
        const separatorNode = !collapsed && allowResizing ? (h("div", { "aria-label": this.messages.resize, "aria-orientation": layout === "horizontal" ? "vertical" : "horizontal", "aria-valuemax": layout == "horizontal" ? contentHeightMax : contentWidthMax, "aria-valuemin": layout == "horizontal" ? contentHeightMin : contentWidthMin, "aria-valuenow": layout == "horizontal"
                ? (contentHeight ?? initialContentHeight)
                : (contentWidth ?? initialContentWidth), class: CSS.separator, key: "separator", onKeyDown: this.separatorKeyDown, ref: this.connectSeparator, role: "separator", tabIndex: 0, "touch-action": "none" })) : null;
        const getAnimationDir = () => {
            if (layout === "horizontal") {
                return position === "start"
                    ? CSS_UTILITY.calciteAnimateInDown
                    : CSS_UTILITY.calciteAnimateInUp;
            }
            else {
                const isStart = (dir === "ltr" && position === "end") || (dir === "rtl" && position === "start");
                return isStart ? CSS_UTILITY.calciteAnimateInLeft : CSS_UTILITY.calciteAnimateInRight;
            }
        };
        const contentNode = (h("div", { class: {
                [CSS_UTILITY.rtl]: dir === "rtl",
                [CSS.content]: true,
                [CSS.contentOverlay]: displayMode === "overlay",
                [CSS.floatContent]: displayMode === "float-content" || displayMode === "float",
                [CSS_UTILITY.calciteAnimate]: displayMode === "overlay",
                [getAnimationDir()]: displayMode === "overlay",
            }, hidden: collapsed, key: "content", ref: this.storeContentEl, style: style }, this.renderHeader(), h("div", { class: CSS.contentBody }, h("slot", null)), separatorNode));
        const actionBarNode = (h("slot", { key: "action-bar", name: SLOTS.actionBar, onSlotchange: this.handleActionBarSlotChange }));
        const mainNodes = [actionBarNode, contentNode];
        if (position === "end") {
            mainNodes.reverse();
        }
        return (h("div", { class: { [CSS.container]: true, [CSS.floatAll]: displayMode === "float-all" } }, mainNodes));
    }
    // --------------------------------------------------------------------------
    //
    //  private Methods
    //
    // --------------------------------------------------------------------------
    setContentWidth(width) {
        const { contentWidthMax, contentWidthMin } = this;
        const roundedWidth = Math.round(width);
        this.contentWidth =
            typeof contentWidthMax === "number" && typeof contentWidthMin === "number"
                ? clamp(roundedWidth, contentWidthMin, contentWidthMax)
                : roundedWidth;
    }
    updateAriaValues() {
        const { contentEl } = this;
        const computedStyle = contentEl && getComputedStyle(contentEl);
        if (!computedStyle) {
            return;
        }
        this.layout === "horizontal"
            ? this.updateHeights(computedStyle)
            : this.updateWidths(computedStyle);
        forceUpdate(this);
    }
    setContentHeight(height) {
        const { contentHeightMax, contentHeightMin } = this;
        const roundedWidth = Math.round(height);
        this.contentHeight =
            typeof contentHeightMax === "number" && typeof contentHeightMin === "number"
                ? clamp(roundedWidth, contentHeightMin, contentHeightMax)
                : roundedWidth;
    }
    updateWidths(computedStyle) {
        const max = parseInt(computedStyle.getPropertyValue("max-width"), 10);
        const min = parseInt(computedStyle.getPropertyValue("min-width"), 10);
        const valueNow = parseInt(computedStyle.getPropertyValue("width"), 10);
        if (typeof valueNow === "number" && !isNaN(valueNow)) {
            this.initialContentWidth = valueNow;
        }
        if (typeof max === "number" && !isNaN(max)) {
            this.contentWidthMax = max;
        }
        if (typeof min === "number" && !isNaN(min)) {
            this.contentWidthMin = min;
        }
    }
    updateHeights(computedStyle) {
        const max = parseInt(computedStyle.getPropertyValue("max-height"), 10);
        const min = parseInt(computedStyle.getPropertyValue("min-height"), 10);
        const valueNow = parseInt(computedStyle.getPropertyValue("height"), 10);
        if (typeof valueNow === "number" && !isNaN(valueNow)) {
            this.initialContentHeight = valueNow;
        }
        if (typeof max === "number" && !isNaN(max)) {
            this.contentHeightMax = max;
        }
        if (typeof min === "number" && !isNaN(min)) {
            this.contentHeightMin = min;
        }
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "detached": ["handleDetached"],
        "displayMode": ["handleDisplayMode"],
        "detachedHeightScale": ["handleDetachedHeightScale"],
        "heightScale": ["handleHeightScale"],
        "layout": ["layoutHandler"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return CalciteShellPanelStyle0; }
}, [1, "calcite-shell-panel", {
        "collapsed": [516],
        "detached": [516],
        "displayMode": [513, "display-mode"],
        "detachedHeightScale": [513, "detached-height-scale"],
        "heightScale": [513, "height-scale"],
        "widthScale": [513, "width-scale"],
        "layout": [513],
        "position": [513],
        "resizable": [516],
        "messages": [1040],
        "messageOverrides": [1040],
        "contentWidth": [32],
        "contentHeight": [32],
        "defaultMessages": [32],
        "effectiveLocale": [32],
        "hasHeader": [32]
    }, undefined, {
        "detached": ["handleDetached"],
        "displayMode": ["handleDisplayMode"],
        "detachedHeightScale": ["handleDetachedHeightScale"],
        "heightScale": ["handleHeightScale"],
        "layout": ["layoutHandler"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-shell-panel"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-shell-panel":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, ShellPanel);
            }
            break;
    } });
}
defineCustomElement();

export { ShellPanel as S, defineCustomElement as d };
