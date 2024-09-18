/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, f as forceUpdate, g as getElement, H as Host, d as readTask, F as Fragment } from './p-6eb37ed2.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './p-06084e6c.js';
import { a as getElementDir, i as isPrimaryPointerButton, h as slotChangeGetAssignedElements, s as slotChangeHasAssignedElement, y as nodeListToArray, d as focusElementInGroup, B as filterDirectChildren, t as toAriaBoolean, C as getSlotAssignedElements, e as focusElement, g as getSlotted } from './p-68ec5c15.js';
import { c as connectLocalized, d as disconnectLocalized } from './p-939bc1b4.js';
import { c as clamp } from './p-9f0b8f8b.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './p-1a9a47a0.js';
import { C as CSS_UTILITY } from './p-b39c5275.js';
import { g as guid } from './p-ff8343ec.js';
import { c as calciteSize24, a as calciteSize32, b as calciteSize44 } from './p-e3196917.js';
import { c as createObserver } from './p-c638d28e.js';
import { c as connectInteractive, d as disconnectInteractive, I as InteractiveContainer, u as updateHostInteraction } from './p-415cf05e.js';
import { g as getIconScale } from './p-d559f79c.js';
import { i as isBrowser } from './p-acaae81d.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './p-18f18ab3.js';
import { q as getItemIndex, m as mutationObserverCallback, d as deselectRemovedItems, a as deselectSiblingItems, s as selectSiblings, h as handleFilter, b as handleFilterEvent, g as getItemData, k as keyDownHandler, t as moveItemIndex, i as initialize, c as initializeObserver, f as handleInitialFilter, e as cleanUpObserver, n as calciteListFocusOutHandler, r as removeItem, j as calciteListItemChangeHandler, l as calciteInternalListItemValueChangeHandler, o as setUpItems, p as setFocus, L as List } from './p-0005175a.js';
import { d as disconnectSortableComponent, c as connectSortableComponent } from './p-44240d03.js';
import { l as logger } from './p-b1bc21ac.js';
import { C as CSS$5, S as SLOTS$3 } from './p-afcd5996.js';
import { I as ICON_TYPES$1 } from './p-01df774b.js';
import { g as getLocaleComponentStrings } from './p-2058b5d9.js';
import { s as state } from './p-0558fbc7.js';
import { d as EUpdateType } from './p-80cb7c73.js';
import { E as EFileType } from './p-659678f1.js';
import './p-fe6f7734.js';
import './p-e98c4f93.js';
import './p-bcc79697.js';
import './p-c8d3207e.js';
import './p-aeb86188.js';
import './p-0a24ad5f.js';
import './p-d4056c1c.js';
import './p-720a12c0.js';
import './p-7c583516.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS$4 = {
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
const SLOTS$2 = {
    actionBar: "action-bar",
    header: "header",
};

const shellPanelCss = ":host{pointer-events:none;position:relative;display:flex;flex:0 1 auto;align-items:stretch;z-index:var(--calcite-shell-panel-z-index, var(--calcite-z-index));--calcite-shell-panel-detached-max-height:unset;--calcite-shell-panel-max-height:unset;--calcite-internal-shell-panel-shadow-block-start:0 4px 8px -1px rgba(0, 0, 0, 0.08),\n    0 2px 4px -1px rgba(0, 0, 0, 0.04);--calcite-internal-shell-panel-shadow-block-end:0 -4px 8px -1px rgba(0, 0, 0, 0.08),\n    0 -2px 4px -1px rgba(0, 0, 0, 0.04);--calcite-internal-shell-panel-shadow-inline-start:4px 0 8px -1px rgba(0, 0, 0, 0.08),\n    2px 0 4px -1px rgba(0, 0, 0, 0.04);--calcite-internal-shell-panel-shadow-inline-end:-4px 0 8px -1px rgba(0, 0, 0, 0.08),\n    -2px 0 4px -1px rgba(0, 0, 0, 0.04)}.calcite--rtl.content--overlay{--calcite-internal-shell-panel-shadow-inline-start:-4px 0 8px -1px rgba(0, 0, 0, 0.08),\n    -2px 0 4px -1px rgba(0, 0, 0, 0.04);--calcite-internal-shell-panel-shadow-inline-end:4px 0 8px -1px rgba(0, 0, 0, 0.08),\n    2px 0 4px -1px rgba(0, 0, 0, 0.04)}:host([layout=vertical]){z-index:var(--calcite-shell-panel-z-index, calc(var(--calcite-z-index) + 1))}:host([layout=vertical][display-mode=overlay]){z-index:var(--calcite-shell-panel-z-index, calc(var(--calcite-z-index-header) + 1))}:host([layout=vertical][display-mode=float-all]) .content{flex:2}:host([layout=vertical][width-scale=s]:not([display-mode=float-all])) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 12vw);--calcite-internal-shell-panel-max-width:var(--calcite-shell-panel-max-width, 300px);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 150px)}:host([layout=vertical][width-scale=s][display-mode=float-all]) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 12vw);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 150px)}:host([layout=vertical][width-scale=m]:not([display-mode=float-all])) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 20vw);--calcite-internal-shell-panel-max-width:var(--calcite-shell-panel-max-width, 420px);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 240px)}:host([layout=vertical][width-scale=m][display-mode=float-all]) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 20vw);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 240px)}:host([layout=vertical][width-scale=l]:not([display-mode=float-all])) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 45vw);--calcite-internal-shell-panel-max-width:var(--calcite-shell-panel-max-width, 680px);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 340px)}:host([layout=vertical][width-scale=l][display-mode=float-all]) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 45vw);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 340px)}:host([layout=horizontal][height-scale=s]) .content{--calcite-internal-shell-panel-max-height:var(\n    --calcite-shell-panel-max-height,\n    var(--calcite-shell-panel-detached-max-height, 20vh)\n  )}:host([layout=horizontal]) .content{--calcite-internal-shell-panel-min-height:var(--calcite-shell-panel-min-height, 5vh);--calcite-internal-shell-panel-max-height:var(\n    --calcite-shell-panel-max-height,\n    var(--calcite-shell-panel-detached-max-height, 30vh)\n  )}:host([layout=horizontal][height-scale=l]) .content{--calcite-internal-shell-panel-max-height:var(\n    --calcite-shell-panel-max-height,\n    var(--calcite-shell-panel-detached-max-height, 40vh)\n  )}.container{pointer-events:none;box-sizing:border-box;display:flex;flex:1 1 auto;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-color-text-2)}.container *{box-sizing:border-box}.container.float-all{margin-block:0.5rem;margin-inline:0.5rem}:host([layout=horizontal]) .container{flex-direction:column}:host(:hover) .separator:not(:hover):not(:focus),:host(:focus-within) .separator:not(:hover):not(:focus){opacity:1;background-color:var(--calcite-color-border-3)}.separator{pointer-events:auto;position:absolute;display:flex;background-color:transparent;opacity:0;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;cursor:col-resize;outline:none}.separator:hover{opacity:1;background-color:var(--calcite-color-border-2)}.separator:focus{background-color:var(--calcite-color-brand);opacity:1}:host([layout=vertical]) .separator{inset-block:0px;block-size:100%;inline-size:0.125rem;cursor:col-resize}:host([layout=horizontal][position=start]) .separator{inset-block-end:0px}:host([layout=horizontal][position=end]) .separator{inset-block-start:0px}:host([layout=horizontal]) .separator{inset-inline-end:0px;block-size:0.125rem;inline-size:100%;cursor:row-resize}:host([layout=vertical][position=start]) .separator{inset-inline-end:-2px}:host([layout=horizontal][position=start]) .separator{inset-block-end:-2px}:host([layout=vertical][position=end]) .separator{inset-inline-start:-2px}:host([layout=horizontal][position=end]) .separator{inset-block-start:-2px}::slotted(calcite-panel),::slotted(calcite-flow){block-size:100%;inline-size:100%;flex:1 1 auto;max-block-size:unset;max-inline-size:unset}::slotted(.calcite-match-height){display:flex;flex:1 1 auto;overflow:hidden}.content{pointer-events:auto;display:flex;flex-direction:column;flex-wrap:nowrap;align-items:stretch;align-self:stretch;background-color:var(--calcite-color-background);padding:0px;transition:max-block-size var(--calcite-animation-timing), max-inline-size var(--calcite-animation-timing)}:host([layout=vertical]:not([display-mode=float-all])) .content{inline-size:var(--calcite-internal-shell-panel-width);max-inline-size:var(--calcite-internal-shell-panel-max-width);min-inline-size:var(--calcite-internal-shell-panel-min-width)}:host([layout=vertical][display-mode=float-all]) .content{inline-size:var(--calcite-internal-shell-panel-width);min-inline-size:var(--calcite-internal-shell-panel-min-width)}:host([layout=horizontal]) .content{block-size:var(--calcite-internal-shell-panel-height);max-block-size:var(--calcite-internal-shell-panel-max-height);min-block-size:var(--calcite-internal-shell-panel-min-height)}.content__header{display:flex;flex:0 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch}.content__body{display:flex;flex:1 1 auto;flex-direction:column;overflow:hidden}.content--overlay{position:absolute;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([layout=vertical]) .content--overlay{inset-block-start:0px;block-size:100%}:host([layout=horizontal]) .content--overlay{inset-inline-start:0px;inline-size:100%}:host([layout=vertical][position=start]) .content--overlay{inset-inline-start:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-inline-start)}:host([layout=vertical][position=end]) .content--overlay{inset-inline-end:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-inline-end)}:host([layout=horizontal][position=start]) .content--overlay{inset-block-start:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-block-start)}:host([layout=horizontal][position=end]) .content--overlay{inset-block-end:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-block-end)}.float--content{margin-inline:0.5rem;margin-block:0.5rem auto;block-size:auto;overflow:hidden;border-radius:0.25rem;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);max-block-size:var(--calcite-internal-shell-panel-max-height, calc(100% - 1rem))}.float--content ::slotted(calcite-panel),.float--content ::slotted(calcite-flow){max-block-size:unset}:host([layout=horizontal]) .float--content{margin-block:0.5rem}:host([position=start]) .float--content ::slotted(calcite-panel),:host([position=start]) .float--content ::slotted(calcite-flow),:host([position=end]) .float--content ::slotted(calcite-panel),:host([position=end]) .float--content ::slotted(calcite-flow){border-style:none}.content[hidden]{display:none}slot[name=action-bar]::slotted(calcite-action-bar),.content ::slotted(calcite-flow),.content ::slotted(calcite-panel:not([closed])){border-width:1px;border-style:solid;border-color:var(--calcite-color-border-3)}:host([position=start]:not([slot=panel-end]):not([display-mode=float-all])) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=start]:not([slot=panel-end]):not([display-mode=float-all])) .content ::slotted(calcite-flow),:host([position=start]:not([slot=panel-end]):not([display-mode=float-all])) .content ::slotted(calcite-panel),:host([position=end][slot=panel-start]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=end][slot=panel-start]) .content ::slotted(calcite-flow),:host([position=end][slot=panel-start]) .content ::slotted(calcite-panel){border-inline-start:none}:host([position=end]:not([slot=panel-start])) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=end]:not([slot=panel-start])) .content ::slotted(calcite-flow),:host([position=end]:not([slot=panel-start])) .content ::slotted(calcite-panel),:host([position=start][slot=panel-end]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=start][slot=panel-end]) .content ::slotted(calcite-flow),:host([position=start][slot=panel-end]) .content ::slotted(calcite-panel){border-inline-end:none}:host([layout=horizontal]:not([display-mode=float-all])) slot[name=action-bar]::slotted(calcite-action-bar){border-inline:0}:host([layout=horizontal][position=start]:not([display-mode=float-all])) .content ::slotted(calcite-flow),:host([layout=horizontal][position=start]:not([display-mode=float-all])) .content ::slotted(calcite-panel){border-inline:0;border-block-start:0}:host([layout=horizontal][position=end]) .content ::slotted(calcite-flow),:host([layout=horizontal][position=end]) .content ::slotted(calcite-panel){border-inline:0;border-block-end:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteShellPanelStyle0 = shellPanelCss;

const ShellPanel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h("div", { class: CSS$4.contentHeader, hidden: !this.hasHeader, key: "header" }, h("slot", { name: SLOTS$2.header, onSlotchange: this.handleHeaderSlotChange })));
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
                ? contentHeight ?? initialContentHeight
                : contentWidth ?? initialContentWidth, class: CSS$4.separator, key: "separator", onKeyDown: this.separatorKeyDown, ref: this.connectSeparator, role: "separator", tabIndex: 0, "touch-action": "none" })) : null;
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
                [CSS$4.content]: true,
                [CSS$4.contentOverlay]: displayMode === "overlay",
                [CSS$4.floatContent]: displayMode === "float-content" || displayMode === "float",
                [CSS_UTILITY.calciteAnimate]: displayMode === "overlay",
                [getAnimationDir()]: displayMode === "overlay",
            }, hidden: collapsed, key: "content", ref: this.storeContentEl, style: style }, this.renderHeader(), h("div", { class: CSS$4.contentBody }, h("slot", null)), separatorNode));
        const actionBarNode = (h("slot", { key: "action-bar", name: SLOTS$2.actionBar, onSlotchange: this.handleActionBarSlotChange }));
        const mainNodes = [actionBarNode, contentNode];
        if (position === "end") {
            mainNodes.reverse();
        }
        return (h("div", { class: { [CSS$4.container]: true, [CSS$4.floatAll]: displayMode === "float-all" } }, mainNodes));
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "detached": ["handleDetached"],
        "displayMode": ["handleDisplayMode"],
        "detachedHeightScale": ["handleDetachedHeightScale"],
        "heightScale": ["handleHeightScale"],
        "layout": ["layoutHandler"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
ShellPanel.style = CalciteShellPanelStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS$3 = {
    container: "container",
    content: "content",
};

const tabCss = ":host([selected]) section,:host([selected]) .container{display:block}:host{display:none;block-size:100%;inline-size:100%}:host([selected]){display:block;block-size:100%;inline-size:100%;overflow:auto}.content{box-sizing:border-box;padding-block:var(--calcite-internal-tab-content-block-padding)}.scale-s{--calcite-internal-tab-content-block-padding:var(--calcite-tab-content-block-padding, 0.25rem);font-size:var(--calcite-font-size--2);line-height:1rem}.scale-m{--calcite-internal-tab-content-block-padding:var(--calcite-tab-content-block-padding, 0.5rem);font-size:var(--calcite-font-size--1);line-height:1rem}.scale-l{--calcite-internal-tab-content-block-padding:var(--calcite-tab-content-block-padding, 0.625rem);font-size:var(--calcite-font-size-0);line-height:1.25rem}section,.container{display:none;block-size:100%;inline-size:100%}.container{outline-color:transparent}.container:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTabStyle0 = tabCss;

const Tab = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.guid = `calcite-tab-title-${guid()}`;
        this.tab = undefined;
        this.selected = false;
        this.scale = "m";
        this.labeledBy = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const id = this.el.id || this.guid;
        return (h(Host, { key: '781e0b82d69d7ea6b2bd6e15ed0d1c5248f24d05', "aria-labelledby": this.labeledBy, id: id }, h("div", { key: '58a6be23b29e8bee598ecf0cd97ef0578fd4e197', class: { [CSS$3.container]: true, [`scale-${this.scale}`]: true }, role: "tabpanel", tabIndex: this.selected ? 0 : -1 }, h("section", { key: 'fbff1dec6ca2494f2485528679c14b4b0741abd8', class: CSS$3.content }, h("slot", { key: 'fc52db6fd58bd87f137e887837df5c08772809a3' })))));
    }
    connectedCallback() {
        this.parentTabsEl = this.el.closest("calcite-tabs");
    }
    disconnectedCallback() {
        // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
        document.body?.dispatchEvent(new CustomEvent("calciteTabUnregister", {
            detail: this.el,
        }));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    internalTabChangeHandler(event) {
        const targetTabsEl = event
            .composedPath()
            .find((el) => el.tagName === "CALCITE-TABS");
        // to allow `<calcite-tabs>` to be nested we need to make sure this
        // `calciteTabChange` event was actually fired from a within the same
        // `<calcite-tabs>` that is the a parent of this tab.
        if (targetTabsEl !== this.parentTabsEl) {
            return;
        }
        if (this.tab) {
            this.selected = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then((index) => {
                this.selected = index === event.detail.tab;
            });
        }
        event.stopPropagation();
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Returns the index of the component item within the tab array.
     */
    async getTabIndex() {
        return Array.prototype.indexOf.call(nodeListToArray(this.el.parentElement.children).filter((el) => el.matches("calcite-tab")), this.el);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * @param tabIds
     * @param titleIds
     * @internal
     */
    async updateAriaInfo(tabIds = [], titleIds = []) {
        this.labeledBy = titleIds[tabIds.indexOf(this.el.id)] || null;
    }
    get el() { return getElement(this); }
};
Tab.style = CalciteTabStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const ICON = {
    chevronRight: "chevron-right",
    chevronLeft: "chevron-left",
};
const CSS$2 = {
    container: "tab-nav",
    containerHasEndTabTitleOverflow: "tab-nav--end-overflow",
    containerHasStartTabTitleOverflow: "tab-nav--start-overflow",
    scrollButton: "scroll-button",
    scrollButtonContainer: "scroll-button-container",
    scrollBackwardContainerButton: "scroll-button-container--backward",
    scrollForwardContainerButton: "scroll-button-container--forward",
    tabTitleSlotWrapper: "tab-titles-slot-wrapper",
};

const tabNavCss = ":host{--calcite-internal-tab-nav-gradient-start-side:left;--calcite-internal-tab-nav-gradient-end-side:right;position:relative;display:flex}.scale-s{--calcite-internal-tab-nav-scroller-button-width:24px;min-block-size:1.5rem}.scale-m{--calcite-internal-tab-nav-scroller-button-width:32px;min-block-size:2rem}.scale-l{--calcite-internal-tab-nav-scroller-button-width:44px;min-block-size:2.75rem}.calcite--rtl{--calcite-internal-tab-nav-gradient-start-side:right;--calcite-internal-tab-nav-gradient-end-side:left}.tab-nav--start-overflow .tab-titles-slot-wrapper{-webkit-mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-end-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%);mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-end-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%)}.tab-nav--end-overflow .tab-titles-slot-wrapper{-webkit-mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-start-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%);mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-start-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%)}.tab-nav--start-overflow.tab-nav--end-overflow .tab-titles-slot-wrapper{-webkit-mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-end-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%, transparent 51%), linear-gradient(to var(--calcite-internal-tab-nav-gradient-start-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%, transparent 51%);mask-image:linear-gradient(to var(--calcite-internal-tab-nav-gradient-end-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%, transparent 51%), linear-gradient(to var(--calcite-internal-tab-nav-gradient-start-side), transparent, transparent var(--calcite-internal-tab-nav-scroller-button-width), white var(--calcite-internal-tab-nav-scroller-button-width), white 51%, transparent 51%)}.tab-nav::-webkit-scrollbar{display:none;-ms-overflow-style:none;scrollbar-width:none}:host([layout=center]) ::slotted(calcite-tab-title){display:flex;flex-grow:1;flex-shrink:0;min-inline-size:auto;white-space:nowrap}:host([layout=center]) ::slotted(calcite-tab-title[selected]){overflow:unset}:host(:not([bordered])) .scale-l{--calcite-internal-tab-nav-gap:var(--calcite-size-xxl)}:host(:not([bordered])) .scale-m{--calcite-internal-tab-nav-gap:var(--calcite-size-xl)}:host(:not([bordered])) .scale-s{--calcite-internal-tab-nav-gap:var(--calcite-size-lg)}:host(:not([bordered])) .tab-titles-slot-wrapper{gap:var(--calcite-internal-tab-nav-gap)}:host([layout=center]:not([bordered])) .tab-titles-slot-wrapper{padding-inline:var(--calcite-spacing-xxl)}.tab-nav,.tab-titles-slot-wrapper{display:flex;inline-size:100%;justify-content:flex-start;overflow:hidden;white-space:nowrap}.scroll-button-container{position:absolute;inset-block:0px}.scroll-button-container calcite-button{--calcite-offset-invert-focus:1;--calcite-color-text-1:var(--calcite-color-text-3);block-size:100%}.scroll-button-container calcite-button:hover{--calcite-color-text-1:unset;--calcite-color-foreground-1:var(--calcite-color-transparent-hover);--calcite-color-foreground-3:var(--calcite-color-transparent)}.scroll-button-container--forward{inset-inline-end:0;z-index:var(--calcite-z-index)}.scroll-button-container--backward{inset-inline-start:0;z-index:var(--calcite-z-index)}:host(:not([bordered])) .scroll-button-container--backward::before,:host(:not([bordered])) .scroll-button-container--forward::before{background-color:var(--calcite-color-border-3);content:\"\";inline-size:var(--calcite-border-width-sm);inset-block-start:var(--calcite-border-width-md);inset-block-end:var(--calcite-border-width-md);position:absolute}:host(:not([bordered])) .scroll-button-container--backward::before{inset-inline-end:0}:host(:not([bordered])) .scroll-button-container--forward::before{inset-inline-start:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTabNavStyle0 = tabNavCss;

const TabNav = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteTabChange = createEvent(this, "calciteTabChange", 6);
        this.calciteInternalTabNavSlotChange = createEvent(this, "calciteInternalTabNavSlotChange", 7);
        this.calciteInternalTabChange = createEvent(this, "calciteInternalTabChange", 6);
        this.effectiveDir = "ltr";
        this.lastScrollWheelAxis = "x";
        this.resizeObserver = createObserver("resize", () => {
            this.updateScrollingState();
        });
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.onTabTitleWheel = (event) => {
            event.preventDefault();
            const { deltaX, deltaY } = event;
            const x = Math.abs(deltaX);
            const y = Math.abs(deltaY);
            let scrollBy;
            if (x === y) {
                scrollBy = this.lastScrollWheelAxis === "x" ? deltaX : deltaY;
            }
            else if (x > y) {
                scrollBy = deltaX;
                this.lastScrollWheelAxis = "x";
            }
            else {
                scrollBy = deltaY;
                this.lastScrollWheelAxis = "y";
            }
            const scrollByX = (this.effectiveDir === "rtl" ? -1 : 1) * scrollBy;
            event.currentTarget.scrollBy(scrollByX, 0);
        };
        this.onSlotChange = (event) => {
            this.intersectionObserver?.disconnect();
            const slottedElements = slotChangeGetAssignedElements(event, "calcite-tab-title");
            slottedElements.forEach((child) => {
                this.intersectionObserver?.observe(child);
            });
            this.calciteInternalTabNavSlotChange.emit(slottedElements);
        };
        this.storeTabTitleWrapperRef = (el) => {
            this.tabTitleContainerEl = el;
            this.intersectionObserver = createObserver("intersection", () => this.updateScrollingState(), {
                root: el,
                threshold: [0, 0.5, 1],
            });
        };
        this.scrollToTabTitles = (direction) => {
            readTask(() => {
                const tabTitleContainer = this.tabTitleContainerEl;
                const containerBounds = tabTitleContainer.getBoundingClientRect();
                const tabTitles = Array.from(this.el.querySelectorAll("calcite-tab-title"));
                const { effectiveDir } = this;
                if (direction === "forward") {
                    tabTitles.reverse();
                }
                let closestToEdge = null;
                tabTitles.forEach((tabTitle) => {
                    const tabTitleBounds = tabTitle.getBoundingClientRect();
                    const containerEndX = containerBounds.x + containerBounds.width;
                    const tabTitleEndX = tabTitleBounds.x + tabTitleBounds.width;
                    if ((direction === "forward" && effectiveDir === "ltr") ||
                        (direction === "backward" && effectiveDir === "rtl")) {
                        const afterContainerEnd = tabTitleBounds.x > containerEndX;
                        if (afterContainerEnd) {
                            closestToEdge = tabTitle;
                        }
                        else {
                            const crossingContainerEnd = tabTitleEndX > containerEndX && tabTitleBounds.x > containerBounds.x;
                            if (crossingContainerEnd) {
                                closestToEdge = tabTitle;
                            }
                        }
                    }
                    else {
                        const beforeContainerStart = tabTitleEndX < containerBounds.x;
                        if (beforeContainerStart) {
                            closestToEdge = tabTitle;
                        }
                        else {
                            const crossingContainerStart = tabTitleEndX < containerEndX && tabTitleBounds.x < containerBounds.x;
                            if (crossingContainerStart) {
                                closestToEdge = tabTitle;
                            }
                        }
                    }
                });
                if (closestToEdge) {
                    const { scrollerButtonWidth } = this;
                    const offsetAdjustment = (direction === "forward" && effectiveDir === "ltr") ||
                        (direction === "backward" && effectiveDir === "rtl")
                        ? -scrollerButtonWidth
                        : closestToEdge.offsetWidth - tabTitleContainer.clientWidth + scrollerButtonWidth;
                    const scrollTo = closestToEdge.offsetLeft + offsetAdjustment;
                    tabTitleContainer.scrollTo({
                        left: scrollTo,
                        behavior: "smooth",
                    });
                }
            });
        };
        this.scrollToNextTabTitles = () => this.scrollToTabTitles("forward");
        this.scrollToPreviousTabTitles = () => this.scrollToTabTitles("backward");
        this.handleTabFocus = (event, el, destination) => {
            const focused = focusElementInGroup(this.enabledTabTitles, el, destination);
            this.scrollTabTitleIntoView(focused, "instant");
            event.stopPropagation();
        };
        this.onTabTitleScroll = () => {
            this.updateScrollingState();
        };
        this.renderScrollButton = (overflowDirection) => {
            const { bordered, messages, hasOverflowingStartTabTitle, hasOverflowingEndTabTitle, scale } = this;
            const isEnd = overflowDirection === "end";
            return (h("div", { class: {
                    [CSS$2.scrollButtonContainer]: true,
                    [CSS$2.scrollBackwardContainerButton]: !isEnd,
                    [CSS$2.scrollForwardContainerButton]: isEnd,
                }, hidden: (isEnd && !hasOverflowingEndTabTitle) || (!isEnd && !hasOverflowingStartTabTitle), key: overflowDirection }, h("calcite-button", { appearance: bordered ? "outline-fill" : "transparent", "aria-label": isEnd ? messages.nextTabTitles : messages.previousTabTitles, class: {
                    [CSS$2.scrollButton]: true,
                }, iconFlipRtl: "both", iconStart: isEnd ? ICON.chevronRight : ICON.chevronLeft, kind: "neutral", onClick: isEnd ? this.scrollToNextTabTitles : this.scrollToPreviousTabTitles, scale: scale, tabIndex: -1 })));
        };
        this.storageId = undefined;
        this.syncId = undefined;
        this.selectedTitle = null;
        this.scale = "m";
        this.layout = "inline";
        this.position = "bottom";
        this.bordered = false;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.hasOverflowingStartTabTitle = false;
        this.hasOverflowingEndTabTitle = false;
        this.selectedTabId = undefined;
    }
    selectedTitleChanged() {
        this.calciteInternalTabChange.emit({
            tab: this.selectedTabId,
        });
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
        this.parentTabsEl = this.el.closest("calcite-tabs");
        this.resizeObserver?.observe(this.el);
        connectLocalized(this);
        connectMessages(this);
    }
    async componentWillLoad() {
        const storageKey = `calcite-tab-nav-${this.storageId}`;
        if (localStorage && this.storageId && localStorage.getItem(storageKey)) {
            const storedTab = JSON.parse(localStorage.getItem(storageKey));
            this.selectedTabId = storedTab;
        }
        await setUpMessages(this);
    }
    componentDidLoad() {
        this.scrollTabTitleIntoView(this.selectedTitle, "instant");
    }
    componentWillRender() {
        const { parentTabsEl } = this;
        this.layout = parentTabsEl?.layout;
        this.bordered = parentTabsEl?.bordered;
        this.effectiveDir = getElementDir(this.el);
    }
    componentDidRender() {
        // if every tab title is active select the first tab.
        if (this.tabTitles.length &&
            this.tabTitles.every((title) => !title.selected) &&
            !this.selectedTabId) {
            this.tabTitles[0].getTabIdentifier().then((tab) => {
                this.calciteInternalTabChange.emit({
                    tab,
                });
            });
        }
    }
    disconnectedCallback() {
        this.resizeObserver?.disconnect();
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        return (h(Host, { key: 'e2e130cc399d8bb88201f283de2eef17a46882fc', role: "tablist" }, h("div", { key: '2beae02bec71c759201063e4820ce19cacd1c432', class: {
                [CSS$2.container]: true,
                [CSS$2.containerHasStartTabTitleOverflow]: !!this.hasOverflowingStartTabTitle,
                [CSS$2.containerHasEndTabTitleOverflow]: !!this.hasOverflowingEndTabTitle,
                [`scale-${this.scale}`]: true,
                [`position-${this.position}`]: true,
                [CSS_UTILITY.rtl]: this.effectiveDir === "rtl",
            } }, this.renderScrollButton("start"), h("div", { key: '609a5b8efc1bd46810217ab17256aaad7432586b', class: {
                [CSS$2.tabTitleSlotWrapper]: true,
            }, onScroll: this.onTabTitleScroll, onWheel: this.onTabTitleWheel, ref: this.storeTabTitleWrapperRef }, h("slot", { key: '7436f2fcacf2b483a77c741a2449f783c9c4c148', onSlotchange: this.onSlotChange })), this.renderScrollButton("end"))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    focusPreviousTabHandler(event) {
        this.handleTabFocus(event, event.target, "previous");
    }
    focusNextTabHandler(event) {
        this.handleTabFocus(event, event.target, "next");
    }
    focusFirstTabHandler(event) {
        this.handleTabFocus(event, event.target, "first");
    }
    focusLastTabHandler(event) {
        this.handleTabFocus(event, event.target, "last");
    }
    internalActivateTabHandler(event) {
        const activatedTabTitle = event.target;
        this.selectedTabId = event.detail.tab
            ? event.detail.tab
            : this.getIndexOfTabTitle(activatedTabTitle);
        event.stopPropagation();
        this.selectedTitle = activatedTabTitle;
        this.scrollTabTitleIntoView(activatedTabTitle);
    }
    scrollTabTitleIntoView(activatedTabTitle, behavior = "smooth") {
        if (!activatedTabTitle) {
            return;
        }
        readTask(() => {
            const isLTR = this.effectiveDir === "ltr";
            const tabTitleContainer = this.tabTitleContainerEl;
            const containerBounds = tabTitleContainer.getBoundingClientRect();
            const tabTitleBounds = activatedTabTitle.getBoundingClientRect();
            const scrollPosition = tabTitleContainer.scrollLeft;
            const overflowingStartTabTitle = isLTR
                ? this.hasOverflowingStartTabTitle
                : this.hasOverflowingEndTabTitle;
            const overflowingEndTabTitle = isLTR
                ? this.hasOverflowingEndTabTitle
                : this.hasOverflowingStartTabTitle;
            if (tabTitleBounds.left <
                containerBounds.left + (overflowingStartTabTitle ? this.scrollerButtonWidth : 0)) {
                const left = scrollPosition + (tabTitleBounds.left - containerBounds.left) - this.scrollerButtonWidth;
                tabTitleContainer.scrollTo({ left, behavior });
            }
            else if (tabTitleBounds.right >
                containerBounds.right - (overflowingEndTabTitle ? this.scrollerButtonWidth : 0)) {
                const left = scrollPosition +
                    (tabTitleBounds.right - containerBounds.right) +
                    this.scrollerButtonWidth;
                tabTitleContainer.scrollTo({ left, behavior });
            }
        });
    }
    activateTabHandler(event) {
        this.calciteTabChange.emit();
        event.stopPropagation();
    }
    internalCloseTabHandler(event) {
        const closedTabTitleEl = event.target;
        this.handleTabTitleClose(closedTabTitleEl);
        event.stopPropagation();
    }
    /**
     * Check for active tabs on register and update selected
     *
     * @param event
     */
    async updateTabTitles(event) {
        if (event.target.selected) {
            this.selectedTabId = event.detail;
            this.selectedTitle = await this.getTabTitleById(this.selectedTabId);
        }
    }
    globalInternalTabChangeHandler(event) {
        if (this.syncId &&
            event.target !== this.el &&
            event.target.syncId === this.syncId &&
            this.selectedTabId !== event.detail.tab) {
            this.selectedTabId = event.detail.tab;
        }
        event.stopPropagation();
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    async selectedTabIdChanged() {
        if (localStorage &&
            this.storageId &&
            this.selectedTabId !== undefined &&
            this.selectedTabId !== null) {
            localStorage.setItem(`calcite-tab-nav-${this.storageId}`, JSON.stringify(this.selectedTabId));
        }
        this.calciteInternalTabChange.emit({
            tab: this.selectedTabId,
        });
    }
    get scrollerButtonWidth() {
        const { scale } = this;
        return parseInt(scale === "s" ? calciteSize24 : scale === "m" ? calciteSize32 : calciteSize44);
    }
    updateScrollingState() {
        const tabTitleContainer = this.tabTitleContainerEl;
        if (!tabTitleContainer) {
            return;
        }
        let isOverflowStart;
        let isOverflowEnd;
        const scrollPosition = tabTitleContainer.scrollLeft;
        const visibleWidth = tabTitleContainer.clientWidth;
        const totalContentWidth = tabTitleContainer.scrollWidth;
        if (this.effectiveDir === "ltr") {
            isOverflowStart = scrollPosition > 0;
            isOverflowEnd = scrollPosition + visibleWidth < totalContentWidth;
        }
        else {
            isOverflowStart = scrollPosition < 0;
            isOverflowEnd = scrollPosition !== -(totalContentWidth - visibleWidth);
        }
        this.hasOverflowingStartTabTitle = isOverflowStart;
        this.hasOverflowingEndTabTitle = isOverflowEnd;
    }
    getIndexOfTabTitle(el, tabTitles = this.tabTitles) {
        // In most cases, since these indexes correlate with tab contents, we want to consider all tab titles.
        // However, when doing relative index operations, it makes sense to pass in this.enabledTabTitles as the 2nd arg.
        return tabTitles.indexOf(el);
    }
    async getTabTitleById(id) {
        return Promise.all(this.tabTitles.map((el) => el.getTabIdentifier())).then((ids) => {
            return this.tabTitles[ids.indexOf(id)];
        });
    }
    get tabTitles() {
        return filterDirectChildren(this.el, "calcite-tab-title");
    }
    get enabledTabTitles() {
        return filterDirectChildren(this.el, "calcite-tab-title:not([disabled])").filter((tabTitle) => !tabTitle.closed);
    }
    handleTabTitleClose(closedTabTitleEl) {
        const { tabTitles } = this;
        const selectionModified = closedTabTitleEl.selected;
        const visibleTabTitlesIndices = tabTitles.reduce((tabTitleIndices, tabTitle, index) => !tabTitle.closed ? [...tabTitleIndices, index] : tabTitleIndices, []);
        const totalVisibleTabTitles = visibleTabTitlesIndices.length;
        if (totalVisibleTabTitles === 1 && tabTitles[visibleTabTitlesIndices[0]].closable) {
            tabTitles[visibleTabTitlesIndices[0]].closable = false;
            this.selectedTabId = visibleTabTitlesIndices[0];
            if (selectionModified) {
                tabTitles[visibleTabTitlesIndices[0]].activateTab();
            }
        }
        else if (totalVisibleTabTitles > 1) {
            const closedTabTitleIndex = tabTitles.findIndex((el) => el === closedTabTitleEl);
            const nextTabTitleIndex = visibleTabTitlesIndices.find((value) => value > closedTabTitleIndex);
            if (this.selectedTabId === closedTabTitleIndex) {
                this.selectedTabId = nextTabTitleIndex ? nextTabTitleIndex : totalVisibleTabTitles - 1;
                tabTitles[this.selectedTabId].activateTab();
            }
        }
        requestAnimationFrame(() => {
            tabTitles[this.selectedTabId].focus();
        });
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "selectedTitle": ["selectedTitleChanged"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"],
        "selectedTabId": ["selectedTabIdChanged"]
    }; }
};
TabNav.style = CalciteTabNavStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS$1 = {
    closeButton: "close-button",
    container: "container",
    containerBottom: "container--bottom",
    content: "content",
    contentHasText: "content--has-text",
    iconEnd: "icon-end",
    iconPresent: "icon-present",
    iconStart: "icon-start",
    titleIcon: "calcite-tab-title--icon",
    scale: (scale) => `scale-${scale}`,
    selectedIndicator: "selected-indicator",
};
const ICONS$1 = {
    close: "x",
};

const tabTitleCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;outline:2px solid transparent;outline-offset:2px;margin-inline-start:0px}:host([layout=inline]){flex:0 1 auto}:host([layout=center]){flex:1 1 auto}.content{position:relative;margin-block-end:0.125rem;box-sizing:border-box;display:flex;block-size:100%;align-items:center;justify-content:center}.scale-s .content{padding-block:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem}.scale-s .close-button{inline-size:1.25rem}.scale-m .content{padding-block:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem}.scale-m .close-button{inline-size:1.75rem}.scale-l .content{padding-block:0.625rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}.scale-l .close-button{inline-size:2rem}:host([closable]) .content{border-block-end-color:transparent}:host([layout=inline]) .content,:host([layout=center]) .content{padding-inline:0.25rem}:host([layout=center]) .scale-s,:host([layout=center]) .scale-m,:host([layout=center]) .scale-l{margin-block:0px;justify-content:center;text-align:center}:host([layout=center]) .scale-s .content,:host([layout=center]) .scale-m .content,:host([layout=center]) .scale-l .content{flex:1 1 auto;flex-grow:1}.container{position:relative;box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;cursor:pointer;align-content:center;justify-content:space-between;padding-inline:0px;font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-3);outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.selected-indicator{position:absolute;display:block;block-size:0.125rem;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;inset-block-end:0;inset-inline-start:0;inset-inline-end:0;inline-size:100%}.container--bottom .selected-indicator{inset-block-end:unset;inset-block-start:0}:host([bordered]) .selected-indicator{inset-block-start:0;inset-block-end:unset;inset-inline-start:-1px;inset-inline-end:0;inline-size:calc(100% + var(--calcite-spacing-base))}:host([bordered]) .container:not(.container--bottom){border-block-end:1px solid transparent}:host([bordered]:not([selected]):hover) .container:not(.container--bottom){border-block-end:1px solid var(--calcite-color-border-1)}:host([bordered]:not([selected]):hover:not(:focus)) .selected-indicator{background-color:var(--calcite-color-foreground-2)}:host([bordered]:not([selected]):hover:not(:focus)) .container:not(.container--bottom) .selected-indicator{box-shadow:inset 0 1px var(--calcite-color-border-1)}:host([bordered]:not([selected]):hover:not(:focus)) .container.container--bottom .selected-indicator{box-shadow:inset 0 -1px var(--calcite-color-border-1)}:host([bordered][selected]) .container::after{position:absolute;display:block;block-size:0.125rem;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;inset-block-end:-1px;inset-inline-start:0;inset-inline-end:0;inline-size:100%;background:var(--calcite-color-foreground-1);content:\"\"}:host([bordered][selected]) .container.container--bottom::after{inset-block-start:-1px}:host([bordered][selected]:hover) .container::after{background:var(--calcite-color-foreground-2)}:host([bordered][selected]:focus) .container::after{background:transparent}:host([bordered]) .container--bottom .selected-indicator{inset-block-start:unset;inset-block-end:0}:host([selected]) .selected-indicator,:host([selected]:hover) .selected-indicator{background-color:var(--calcite-color-brand)}:host(:hover) .selected-indicator{background-color:var(--calcite-color-border-3)}:host(:focus) .selected-indicator,:host(:active) .selected-indicator{background-color:var(--calcite-color-brand)}@media (forced-colors: active){.selected-indicator{background-color:highlight}}:host([closed]){display:none}:host([selected]) .container{border-color:transparent;color:var(--calcite-color-text-1)}:host(:focus) .container{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host(:focus) .container:focus-within{outline-color:transparent}:host(:active) a,:host(:focus) a,:host(:hover) a{border-color:var(--calcite-color-border-2);color:var(--calcite-color-text-1);text-decoration-line:none}:host([disabled]) .container{pointer-events:none;opacity:0.5}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.calcite-tab-title--icon{position:relative;margin:0px;display:inline-flex;align-self:center}.calcite-tab-title--icon svg{transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.content--has-text{padding:0.25rem}.content--has-text .calcite-tab-title--icon.icon-start{margin-inline-end:var(--calcite-spacing-sm)}.content--has-text .calcite-tab-title--icon.icon-end{margin-inline-start:var(--calcite-spacing-sm)}.close-button{display:flex;block-size:100%;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;align-content:center;align-items:center;justify-content:center;align-self:center;border-style:none;background-color:transparent;color:var(--calcite-color-text-3);outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;margin-inline-start:var(--calcite-spacing-sm);margin-inline-end:var(--calcite-spacing-px);block-size:calc(100% - var(--calcite-spacing-xxs))}.close-button:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand))}.close-button:focus,.close-button:hover{color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-3)}.close-button:active{color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-3)}.close-button calcite-icon{color:inherit}:host([icon-start][icon-end]) .calcite-tab-title--icon:first-child{margin-inline-end:var(--calcite-spacing-sm)}:host([bordered]) .container:not(.container--bottom) .close-button{block-size:calc(100% - var(--calcite-spacing-px));margin-block-start:-1px}:host([bordered]) .container .close-button calcite-icon{margin-block-start:var(--calcite-spacing-px)}:host([bordered]) .container .close-button:focus,:host([bordered]) .container .close-button:hover,:host([bordered]) .container .close-button:active{box-shadow:0 2px 0 0 var(--calcite-color-foreground-3)}:host([bordered]) .container.container--bottom .close-button{box-shadow:0 -2px 0 0 transparent}:host([bordered]) .container.container--bottom .close-button calcite-icon{margin-block-end:var(--calcite-spacing-px)}:host([bordered]) .container.container--bottom .close-button:focus,:host([bordered]) .container.container--bottom .close-button:hover,:host([bordered]) .container.container--bottom .close-button:active{box-shadow:0 -2px 0 0 var(--calcite-color-foreground-3)}:host([bordered][selected]){box-shadow:inset 0 -1px var(--calcite-color-foreground-1)}:host([bordered]:not([selected])) .container .close-button{box-shadow:0 2px 0 0 transparent}:host([bordered]:hover) .container{background-color:var(--calcite-color-foreground-2)}:host([bordered]) .container{border-inline:var(--calcite-spacing-px) solid transparent}:host([selected][bordered]) .container{border-inline-color:var(--calcite-color-border-1)}:host([layout=inline][bordered]) .scale-m .content,:host([layout=center][bordered]) .scale-m .content{padding-inline:0.75rem}:host([layout=inline][bordered]) .scale-s .content,:host([layout=center][bordered]) .scale-s .content{padding-inline:0.5rem}:host([layout=inline][bordered]) .scale-l .content,:host([layout=center][bordered]) .scale-l .content{padding-inline:1rem}:host([layout=inline][closable]) .scale-s .content,:host([layout=inline][closable]) .scale-m .content,:host([layout=inline][closable]) .scale-l .content{padding-inline-end:0}@media (forced-colors: active){:host{outline-width:0;outline-offset:0}:host(:focus) .container{outline-color:highlight}:host([bordered]) .container{border-block-end-style:solid}:host([bordered]) .container--bottom{border-block-start-style:solid}:host([bordered][selected]) .container{border-block-end-style:none}:host([bordered][selected]) .container--bottom{border-block-start-style:none}.close-button{z-index:var(--calcite-z-index)}}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTabTitleStyle0 = tabTitleCss;

const TabTitle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteTabsActivate = createEvent(this, "calciteTabsActivate", 6);
        this.calciteInternalTabsActivate = createEvent(this, "calciteInternalTabsActivate", 6);
        this.calciteTabsClose = createEvent(this, "calciteTabsClose", 6);
        this.calciteInternalTabsClose = createEvent(this, "calciteInternalTabsClose", 6);
        this.calciteInternalTabsFocusNext = createEvent(this, "calciteInternalTabsFocusNext", 6);
        this.calciteInternalTabsFocusPrevious = createEvent(this, "calciteInternalTabsFocusPrevious", 6);
        this.calciteInternalTabsFocusFirst = createEvent(this, "calciteInternalTabsFocusFirst", 6);
        this.calciteInternalTabsFocusLast = createEvent(this, "calciteInternalTabsFocusLast", 6);
        this.calciteInternalTabTitleRegister = createEvent(this, "calciteInternalTabTitleRegister", 6);
        this.calciteInternalTabIconChanged = createEvent(this, "calciteInternalTabIconChanged", 6);
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.closeClickHandler = () => {
            this.closeTabTitleAndNotify();
        };
        /** watches for changing text content */
        this.mutationObserver = createObserver("mutation", () => this.updateHasText());
        this.resizeObserver = createObserver("resize", () => {
            this.calciteInternalTabIconChanged.emit();
        });
        this.guid = `calcite-tab-title-${guid()}`;
        this.selected = false;
        this.closable = false;
        this.closed = false;
        this.disabled = false;
        this.iconEnd = undefined;
        this.iconFlipRtl = undefined;
        this.iconStart = undefined;
        this.layout = undefined;
        this.position = "top";
        this.scale = "m";
        this.bordered = false;
        this.tab = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.controls = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = undefined;
        this.hasText = false;
    }
    selectedHandler() {
        if (this.selected) {
            this.activateTab(false);
        }
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
        this.setupTextContentObserver();
        this.parentTabNavEl = this.el.closest("calcite-tab-nav");
        this.parentTabsEl = this.el.closest("calcite-tabs");
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
        // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
        document.body?.dispatchEvent(new CustomEvent("calciteTabTitleUnregister", {
            detail: this.el,
        }));
        this.resizeObserver?.disconnect();
        disconnectInteractive(this);
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    async componentWillLoad() {
        await setUpMessages(this);
        if (isBrowser()) {
            this.updateHasText();
        }
        if (this.tab && this.selected) {
            this.activateTab(false);
        }
    }
    componentWillRender() {
        if (this.parentTabsEl) {
            this.layout = this.parentTabsEl.layout;
            this.bordered = this.parentTabsEl.bordered;
        }
    }
    render() {
        const { el, closed } = this;
        const id = el.id || this.guid;
        const iconStartEl = (h("calcite-icon", { key: '20ea18dabdb4cabe8a032d0799f3c757bc90c91d', class: { [CSS$1.titleIcon]: true, [CSS$1.iconStart]: true }, flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: getIconScale(this.scale) }));
        const iconEndEl = (h("calcite-icon", { key: 'ebd3913a334a959e8962addd45e5077ee82f2ca8', class: { [CSS$1.titleIcon]: true, [CSS$1.iconEnd]: true }, flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, scale: getIconScale(this.scale) }));
        return (h(Host, { key: '58a72fa4a6e961c3414dfe224a4e235892784707', "aria-controls": this.controls, "aria-selected": toAriaBoolean(this.selected), id: id, role: "tab", tabIndex: this.selected && !this.disabled ? 0 : -1 }, h(InteractiveContainer, { key: 'fe7662ade3001579b664772b4672d6bebd06a82b', disabled: this.disabled }, h("div", { key: 'ea226b71436922de6bae2e8e542ae0adf08add1b', class: {
                [CSS$1.container]: true,
                [CSS$1.containerBottom]: this.position === "bottom",
                [CSS$1.iconPresent]: !!this.iconStart || !!this.iconEnd,
                [CSS$1.scale(this.scale)]: true,
            }, hidden: closed, ref: (el) => this.resizeObserver?.observe(el) }, h("div", { key: '737609daa04d9dc18b46872c49b82cf211ba9b5a', class: { [CSS$1.content]: true, [CSS$1.contentHasText]: this.hasText } }, this.iconStart ? iconStartEl : null, h("slot", { key: 'fb500a910e5c6bfcd8571e2d109331dd88f2544d' }), this.iconEnd ? iconEndEl : null), this.renderCloseButton(), h("div", { key: '3fd13c6f459e05cea88c40809b7220369866a2b9', class: CSS$1.selectedIndicator })))));
    }
    renderCloseButton() {
        const { closable, messages } = this;
        return closable ? (h("button", { "aria-label": messages.close, class: CSS$1.closeButton, disabled: false, key: CSS$1.closeButton, onClick: this.closeClickHandler, ref: (el) => (this.closeButtonEl = el), title: messages.close, type: "button" }, h("calcite-icon", { icon: ICONS$1.close, scale: getIconScale(this.scale) }))) : null;
    }
    async componentDidLoad() {
        this.calciteInternalTabTitleRegister.emit(await this.getTabIdentifier());
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    internalTabChangeHandler(event) {
        const targetTabsEl = event
            .composedPath()
            .find((el) => el.tagName === "CALCITE-TABS");
        if (targetTabsEl !== this.parentTabsEl) {
            return;
        }
        if (this.tab) {
            this.selected = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then((index) => {
                this.selected = index === event.detail.tab;
            });
        }
        event.stopPropagation();
    }
    onClick() {
        this.activateTab();
    }
    keyDownHandler(event) {
        switch (event.key) {
            case " ":
            case "Enter":
                if (!event.composedPath().includes(this.closeButtonEl)) {
                    this.activateTab();
                    event.preventDefault();
                }
                break;
            case "ArrowRight":
                event.preventDefault();
                if (getElementDir(this.el) === "ltr") {
                    this.calciteInternalTabsFocusNext.emit();
                }
                else {
                    this.calciteInternalTabsFocusPrevious.emit();
                }
                break;
            case "ArrowLeft":
                event.preventDefault();
                if (getElementDir(this.el) === "ltr") {
                    this.calciteInternalTabsFocusPrevious.emit();
                }
                else {
                    this.calciteInternalTabsFocusNext.emit();
                }
                break;
            case "Home":
                event.preventDefault();
                this.calciteInternalTabsFocusFirst.emit();
                break;
            case "End":
                event.preventDefault();
                this.calciteInternalTabsFocusLast.emit();
                break;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Returns the index of the title within the `calcite-tab-nav`.
     */
    async getTabIndex() {
        return Array.prototype.indexOf.call(nodeListToArray(this.el.parentElement.children).filter((el) => el.matches("calcite-tab-title")), this.el);
    }
    /**
     * @internal
     */
    async getTabIdentifier() {
        return this.tab ? this.tab : this.getTabIndex();
    }
    /**
     * @param tabIds
     * @param titleIds
     * @internal
     */
    async updateAriaInfo(tabIds = [], titleIds = []) {
        this.controls = tabIds[titleIds.indexOf(this.el.id)] || null;
    }
    /**
     * This activates a tab in order for it and its associated tab-title be selected.
     *
     * @param userTriggered - when `true`, user-interaction events will be emitted in addition to internal events
     * @internal
     */
    async activateTab(userTriggered = true) {
        if (this.disabled || this.closed) {
            return;
        }
        const payload = { tab: this.tab };
        this.calciteInternalTabsActivate.emit(payload);
        if (userTriggered) {
            // emit in the next frame to let internal events sync up
            requestAnimationFrame(() => this.calciteTabsActivate.emit());
        }
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    updateHasText() {
        this.hasText = this.el.textContent.trim().length > 0;
    }
    setupTextContentObserver() {
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    }
    closeTabTitleAndNotify() {
        this.closed = true;
        this.calciteInternalTabsClose.emit({ tab: this.tab });
        this.calciteTabsClose.emit();
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "selected": ["selectedHandler"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
TabTitle.style = CalciteTabTitleStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const SLOTS$1 = {
    titleGroup: "title-group",
};

const tabsCss = ":host{display:flex;flex-direction:column}:host([bordered]){box-shadow:inset 0 1px 0 var(--calcite-color-border-1);background-color:var(--calcite-color-foreground-1)}:host([bordered]) section{border-width:1px;border-style:solid;border-color:var(--calcite-color-border-1)}:host([bordered][position=bottom]){box-shadow:inset 0 1px 0 var(--calcite-color-border-1), inset 0 -1px 0 var(--calcite-color-border-1)}:host([bordered]:not([position=bottom])) ::slotted(calcite-tab-nav){margin-block-end:-1px}:host([bordered][scale=s]) section{padding:0.75rem}:host([bordered][scale=m]) section{padding:0.5rem}:host([bordered][scale=l]) section{padding:1rem}:host([position=bottom]){flex-direction:column-reverse}section{display:flex;flex-grow:1;overflow:hidden;border-block-start-width:1px;border-block-start-color:var(--calcite-color-border-1);border-block-start-style:solid}:host([position=bottom]) section{flex-direction:column-reverse;border-block-start-width:0px;border-block-end-width:1px;border-block-end-color:var(--calcite-color-border-1)}:host([position=bottom]:not([bordered])) section{border-block-end-style:solid}@media (forced-colors: active){:host([bordered]) section{border-block-start-width:0px;border-block-end-width:1px}:host([position=bottom][bordered]) section{border-block-start-width:1px;border-block-end-width:0px}}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTabsStyle0 = tabsCss;

const Tabs = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.defaultSlotChangeHandler = (event) => {
            this.tabs = slotChangeGetAssignedElements(event, "calcite-tab");
        };
        this.setDefaultSlotRef = (el) => (this.slotEl = el);
        this.layout = "inline";
        this.position = "top";
        this.scale = "m";
        this.bordered = false;
        this.titles = [];
        this.tabs = [];
    }
    handleInheritableProps() {
        this.updateItems();
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteInternalTabNavSlotChangeHandler(event) {
        event.stopPropagation();
        if (event.detail.length !== this.titles.length) {
            this.titles = event.detail;
        }
    }
    titlesWatcher() {
        this.updateAriaSettings();
        this.updateItems();
    }
    tabsWatcher() {
        this.updateAriaSettings();
        this.updateItems();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     *
     * Matches up elements from the internal `tabs` and `titles` to automatically
     * update the ARIA attributes and link `<calcite-tab>` and
     * `<calcite-tab-title>` components.
     */
    async updateAriaSettings() {
        let tabIds;
        let titleIds;
        const tabs = getSlotAssignedElements(this.slotEl, "calcite-tab");
        // determine if we are using `tab` based or `index` based tab identifiers.
        if (tabs.some((el) => el.tab) || this.titles.some((el) => el.tab)) {
            // if we are using `tab` based identifiers sort by `tab` to account for
            // possible out of order tabs and get the id of each tab
            tabIds = tabs.sort((a, b) => a.tab.localeCompare(b.tab)).map((el) => el.id);
            titleIds = this.titles.sort((a, b) => a.tab.localeCompare(b.tab)).map((el) => el.id);
        }
        else {
            // if we are using index based tabs then the `<calcite-tab>` and
            // `<calcite-tab-title>` might have been rendered out of order so the
            // order of `this.tabs` and `this.titles` might not reflect the DOM state,
            // and might not match each other so we need to get the index of all the
            // tabs and titles in the DOM order to match them up as a source of truth
            const tabDomIndexes = await Promise.all(tabs.map((el) => el.getTabIndex()));
            const titleDomIndexes = await Promise.all(this.titles.map((el) => el.getTabIndex()));
            // once we have the DOM order as a source of truth we can build the
            // matching tabIds and titleIds arrays
            tabIds = tabDomIndexes.reduce((ids, indexInDOM, registryIndex) => {
                ids[indexInDOM] = tabs[registryIndex].id;
                return ids;
            }, []);
            titleIds = titleDomIndexes.reduce((ids, indexInDOM, registryIndex) => {
                ids[indexInDOM] = this.titles[registryIndex].id;
                return ids;
            }, []);
        }
        // pass all our new aria information to each `<calcite-tab>` and
        // `<calcite-tab-title>` which will check if they can update their internal
        // `controlled` or `labeledBy` states and re-render if necessary
        tabs.forEach((el) => el.updateAriaInfo(tabIds, titleIds));
        this.titles.forEach((el) => el.updateAriaInfo(tabIds, titleIds));
    }
    updateItems() {
        const { position, scale } = this;
        const nav = this.el.querySelector("calcite-tab-nav");
        if (nav) {
            nav.position = position;
            nav.scale = scale;
        }
        Array.from(this.el.querySelectorAll("calcite-tab")).forEach((tab) => {
            if (tab.parentElement === this.el) {
                tab.scale = scale;
            }
        });
        Array.from(this.el.querySelectorAll("calcite-tab-nav > calcite-tab-title")).forEach((title) => {
            title.position = position;
            title.scale = scale;
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.updateItems();
    }
    async componentWillLoad() {
        this.updateItems();
    }
    disconnectedCallback() { }
    render() {
        return (h(Fragment, { key: '300872682f4f969586b06b6bbfa5cccb5a005e03' }, h("slot", { key: '9b8c09c2f93725349a98d13fb0167c88b82ef413', name: SLOTS$1.titleGroup }), h("section", { key: 'bf1b19251ca8ab3ba4c3c3fa15995889d71d9355' }, h("slot", { key: 'e1008e065225b4f0cb1b4fbe2ec91ab761db1144', onSlotchange: this.defaultSlotChangeHandler, ref: this.setDefaultSlotRef }))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "position": ["handleInheritableProps"],
        "scale": ["handleInheritableProps"],
        "titles": ["titlesWatcher"],
        "tabs": ["tabsWatcher"]
    }; }
};
Tabs.style = CalciteTabsStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    container: "container",
    handle: "handle",
};
const ICON_TYPES = {
    grip: "grip",
};

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
function getScreenReaderText(item, status, valueList) {
    const { items, messages } = valueList;
    const total = items.length;
    const position = getItemIndex(valueList, item) + 1;
    const template = status === "idle"
        ? messages.dragHandleIdle
        : status === "active"
            ? messages.dragHandleActive
            : status === "change"
                ? messages.dragHandleChange
                : messages.dragHandleCommit;
    return replacePlaceholders(template, item.label, position, total);
}
function getHandleAndItemElement(event) {
    const handle = event
        .composedPath()
        .find((item) => item.dataset?.jsHandle !== undefined);
    const item = event
        .composedPath()
        .find((item) => item.tagName?.toLowerCase() === "calcite-value-list-item");
    return { handle, item };
}
function replacePlaceholders(text, label, position, total) {
    const replacePosition = text.replace("{position}", position.toString());
    const replaceLabel = replacePosition.replace("{itemLabel}", label);
    return replaceLabel.replace("{total}", total.toString());
}

const valueListCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;box-sizing:border-box;display:flex;flex-shrink:0;flex-grow:0;flex-direction:column;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-color-text-2)}:host *{box-sizing:border-box}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}calcite-value-list-item:last-of-type{--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([filter-enabled]) header{margin-block-end:0.25rem;display:flex;align-items:center;justify-content:flex-end;background-color:var(--calcite-color-foreground-1);--tw-shadow:0 1px 0 var(--calcite-color-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([filter-enabled]) header.sticky-pos{position:sticky;inset-block-start:0px;z-index:var(--calcite-z-index-sticky)}calcite-filter{margin-block-end:1px}.assistive-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteValueListStyle0 = valueListCss;

logger.deprecated("component", {
    name: "value-list",
    removalVersion: 3,
    suggested: "list",
});
const ValueList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteListChange = createEvent(this, "calciteListChange", 6);
        this.calciteListOrderChange = createEvent(this, "calciteListOrderChange", 6);
        this.calciteListFilter = createEvent(this, "calciteListFilter", 6);
        this.lastSelectedItem = null;
        this.mutationObserver = createObserver("mutation", mutationObserverCallback.bind(this));
        this.handleSelector = `.${CSS.handle}`;
        this.dragSelector = "calcite-value-list-item";
        this.setFilterEl = (el) => {
            this.filterEl = el;
        };
        this.setFilteredItems = (filteredItems) => {
            this.filteredItems = filteredItems;
        };
        this.deselectRemovedItems = deselectRemovedItems.bind(this);
        this.deselectSiblingItems = deselectSiblingItems.bind(this);
        this.selectSiblings = selectSiblings.bind(this);
        this.handleFilter = handleFilter.bind(this);
        this.handleFilterEvent = handleFilterEvent.bind(this);
        this.getItemData = getItemData.bind(this);
        this.keyDownHandler = (event) => {
            if (event.defaultPrevented) {
                return;
            }
            const { handle, item } = getHandleAndItemElement(event);
            if (handle && !item.handleActivated && event.key === " ") {
                this.updateScreenReaderText(getScreenReaderText(item, "commit", this));
            }
            if (!handle || !item.handleActivated) {
                keyDownHandler.call(this, event);
                return;
            }
            event.preventDefault();
            const { items } = this;
            if (event.key === " ") {
                this.updateScreenReaderText(getScreenReaderText(item, "active", this));
            }
            if ((event.key !== "ArrowUp" && event.key !== "ArrowDown") || items.length <= 1) {
                return;
            }
            const { el } = this;
            const nextIndex = moveItemIndex(this, item, event.key === "ArrowUp" ? "up" : "down");
            if (nextIndex === items.length - 1) {
                el.appendChild(item);
            }
            else {
                const itemAtNextIndex = el.children[nextIndex];
                const insertionReferenceItem = itemAtNextIndex === item.nextElementSibling
                    ? itemAtNextIndex.nextElementSibling
                    : itemAtNextIndex;
                el.insertBefore(item, insertionReferenceItem);
            }
            this.items = this.getItems();
            this.calciteListOrderChange.emit(this.items.map(({ value }) => value));
            requestAnimationFrame(() => focusElement(handle));
            item.handleActivated = true;
            this.updateHandleAriaLabel(handle, getScreenReaderText(item, "change", this));
        };
        this.storeAssistiveEl = (el) => {
            this.assistiveTextEl = el;
        };
        this.handleFocusIn = (event) => {
            const { handle, item } = getHandleAndItemElement(event);
            if (!item?.handleActivated && item && handle) {
                this.updateHandleAriaLabel(handle, getScreenReaderText(item, "idle", this));
            }
        };
        this.disabled = false;
        this.canPull = undefined;
        this.canPut = undefined;
        this.dragEnabled = false;
        this.filteredItems = [];
        this.filteredData = [];
        this.filterEnabled = false;
        this.filterPlaceholder = undefined;
        this.filterText = undefined;
        this.group = undefined;
        this.loading = false;
        this.multiple = false;
        this.selectionFollowsFocus = false;
        this.messageOverrides = undefined;
        this.messages = undefined;
        this.dataForFilter = [];
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.selectedValues = new Map();
    }
    onMessagesChange() {
        /* wired up by t9n util */
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
        connectInteractive(this);
        connectLocalized(this);
        connectMessages(this);
        initialize.call(this);
        initializeObserver.call(this);
        this.setUpSorting();
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
        handleInitialFilter.call(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectSortableComponent(this);
        disconnectLocalized(this);
        disconnectMessages(this);
        cleanUpObserver.call(this);
    }
    calciteListFocusOutHandler(event) {
        calciteListFocusOutHandler.call(this, event);
    }
    calciteListItemRemoveHandler(event) {
        removeItem.call(this, event);
    }
    calciteListItemChangeHandler(event) {
        calciteListItemChangeHandler.call(this, event);
    }
    calciteInternalListItemPropsChangeHandler(event) {
        event.stopPropagation();
        this.setUpFilter();
    }
    calciteInternalListItemValueChangeHandler(event) {
        calciteInternalListItemValueChangeHandler.call(this, event);
        event.stopPropagation();
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    onGlobalDragStart() {
        cleanUpObserver.call(this);
    }
    onGlobalDragEnd() {
        initializeObserver.call(this);
    }
    onDragEnd() { }
    onDragStart() { }
    onDragSort() {
        this.items = Array.from(this.el.querySelectorAll("calcite-value-list-item"));
        const values = this.items.map((item) => item.value);
        this.calciteListOrderChange.emit(values);
    }
    getItems() {
        return Array.from(this.el.querySelectorAll("calcite-value-list-item"));
    }
    setUpItems() {
        setUpItems.call(this, "calcite-value-list-item");
        this.setUpSorting();
    }
    setUpFilter() {
        if (this.filterEnabled) {
            this.dataForFilter = this.getItemData();
        }
    }
    setUpSorting() {
        const { dragEnabled } = this;
        if (!dragEnabled) {
            return;
        }
        connectSortableComponent(this);
    }
    handleBlur() {
        if (this.dragEnabled) {
            this.updateScreenReaderText("");
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Returns the component's selected items. */
    async getSelectedItems() {
        return this.selectedValues;
    }
    /**
     * Sets focus on the component's first focusable element.
     *
     * @param focusId
     */
    async setFocus(focusId) {
        await componentFocusable(this);
        return setFocus.call(this, focusId);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    getIconType() {
        let type = null;
        if (this.dragEnabled) {
            type = ICON_TYPES.grip;
        }
        return type;
    }
    updateScreenReaderText(text) {
        this.assistiveTextEl.textContent = text;
    }
    updateHandleAriaLabel(handleElement, text) {
        handleElement.ariaLabel = text;
    }
    handleValueListItemBlur(event) {
        const { item, handle } = event.detail;
        if (!item?.handleActivated && item) {
            this.updateHandleAriaLabel(handle, getScreenReaderText(item, "idle", this));
        }
        event.stopPropagation();
    }
    render() {
        return (h(List, { key: '226659128d8b783ff03fabc4ad086291d3ec749c', onBlur: this.handleBlur, onFocusin: this.handleFocusIn, onKeyDown: this.keyDownHandler, props: this }));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
ValueList.style = CalciteValueListStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const ICONS = {
    drag: "drag",
};
const SLOTS = {
    actionsEnd: "actions-end",
    actionsStart: "actions-start",
};

const valueListItemCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{margin-block-end:1px;box-sizing:border-box;display:flex;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);color:var(--calcite-color-text-2);--tw-shadow:0 1px 0 var(--calcite-color-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition:background-color var(--calcite-animation-timing), box-shadow var(--calcite-animation-timing)}:host *{box-sizing:border-box}calcite-pick-list-item{position:relative;margin:0px;flex-grow:1;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([active]),:host([selected]){--tw-shadow:0 0 0 1px var(--calcite-color-brand);--tw-shadow-colored:0 0 0 1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.handle{display:flex;cursor:move;align-items:center;justify-content:center;border-style:none;background-color:transparent;padding-block:0px;padding-inline:0.25rem;color:var(--calcite-color-border-input);outline-color:transparent}.handle:hover{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1)}.handle:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.handle--activated{background-color:var(--calcite-color-foreground-3);color:var(--calcite-color-text-1)}.handle calcite-icon{color:inherit}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteValueListItemStyle0 = valueListItemCss;

logger.deprecated("component", {
    name: "value-list-item",
    removalVersion: 3,
    suggested: "list-item",
});
const ValueListItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteListItemChange = createEvent(this, "calciteListItemChange", 6);
        this.calciteListItemRemove = createEvent(this, "calciteListItemRemove", 7);
        this.calciteValueListItemDragHandleBlur = createEvent(this, "calciteValueListItemDragHandleBlur", 6);
        this.pickListItem = null;
        this.guid = `calcite-value-list-item-${guid()}`;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getPickListRef = (el) => (this.pickListItem = el);
        this.handleKeyDown = (event) => {
            if (event.key === " ") {
                this.handleActivated = !this.handleActivated;
            }
        };
        this.handleBlur = () => {
            this.handleActivated = false;
            this.calciteValueListItemDragHandleBlur.emit({ item: this.el, handle: this.handleEl });
        };
        this.handleSelectChange = (event) => {
            this.selected = event.detail.selected;
        };
        this.description = undefined;
        this.disabled = false;
        this.deselectDisabled = false;
        this.nonInteractive = false;
        this.handleActivated = false;
        this.icon = null;
        this.iconFlipRtl = false;
        this.label = undefined;
        this.metadata = undefined;
        this.removable = false;
        this.selected = false;
        this.value = undefined;
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectConditionalSlotComponent(this);
        connectInteractive(this);
    }
    disconnectedCallback() {
        disconnectConditionalSlotComponent(this);
        disconnectInteractive(this);
    }
    componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Toggle the selection state. By default this won't trigger an event.
     * The first argument allows the value to be coerced, rather than swapping values.
     *
     * @param coerce
     */
    async toggleSelected(coerce) {
        this.pickListItem.toggleSelected(coerce);
    }
    /** Set focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        return this.pickListItem?.setFocus();
    }
    calciteListItemChangeHandler(event) {
        // adjust item payload from wrapped item before bubbling
        event.detail.item = this.el;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderActionsEnd() {
        const { el } = this;
        const hasActionsEnd = getSlotted(el, SLOTS.actionsEnd);
        return hasActionsEnd ? (h("slot", { name: SLOTS.actionsEnd, slot: SLOTS$3.actionsEnd })) : null;
    }
    renderActionsStart() {
        const { el } = this;
        const hasActionsStart = getSlotted(el, SLOTS.actionsStart);
        return hasActionsStart ? (h("slot", { name: SLOTS.actionsStart, slot: SLOTS$3.actionsStart })) : null;
    }
    renderHandle() {
        const { icon, iconFlipRtl } = this;
        if (icon === ICON_TYPES$1.grip) {
            return (h("span", { class: {
                    [CSS$5.handle]: true,
                    [CSS$5.handleActivated]: this.handleActivated,
                }, "data-js-handle": true, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown, ref: (el) => (this.handleEl = el), role: "button", tabindex: "0" }, h("calcite-icon", { flipRtl: iconFlipRtl, icon: ICONS.drag, scale: "s" })));
        }
    }
    render() {
        return (h(Host, { key: '5800bb42bb126d69868f664845be9d912cc16a1e', id: this.el.id || this.guid }, h(InteractiveContainer, { key: '3fd26470647b3ec37edaf80d83d8b74b4a0dbcb0', disabled: this.disabled }, this.renderHandle(), h("calcite-pick-list-item", { key: '772821bab106c95accaa215e05164371760f2ac0', description: this.description, deselectDisabled: this.deselectDisabled, disabled: this.disabled, label: this.label, metadata: this.metadata, nonInteractive: this.nonInteractive, onCalciteListItemChange: this.handleSelectChange, ref: this.getPickListRef, removable: this.removable, selected: this.selected, value: this.value }, this.renderActionsStart(), this.renderActionsEnd()))));
    }
    get el() { return getElement(this); }
};
ValueListItem.style = CalciteValueListItemStyle0;

const jsonEditorCss = ":host{display:block}.editor-container{position:relative;height:100%}.editor-controls{height:2.75rem;padding-right:0.5rem;background-color:#F4F4F4}.editor-buttons{float:right}html[dir=rtl] .editor-buttons{float:left}.edit-error-flag{padding-top:0.5rem;color:red;visibility:hidden}.edit-button{padding-inline-start:0.5rem}.editor-text{width:100%;overflow-y:auto;background-color:#FFFFFF}.edit-width{width:100%}.edit-parent{box-sizing:border-box;width:100%;height:calc(100% - 46px)}.json-edit-container{height:100%;width:100%;border:1px #808080 solid}.padding-right{padding-inline-end:0.125rem}.btn{margin-bottom:1rem;display:flex;align-content:center;height:25px;width:120px}.select-ctrl{margin-bottom:1rem}.all-edits{margin-top:4rem}.floating-title{font-size:2rem;z-index:100;position:absolute;left:0.5rem;pointer-events:none}.floating-title-button{pointer-events:auto}.json-editor-position1{position:absolute;left:0px;top:0px;margin:0px;height:100%;width:100%;overflow:hidden;padding:0px;max-height:100% !important}.json-editor-position2a{position:absolute;left:0px;top:0px;margin:0px;height:100%;width:50%;overflow:hidden;padding:0px;max-height:100% !important}.json-editor-position2b{position:absolute;right:0px;top:0px;margin:0px;height:100%;width:50%;overflow:hidden;padding:0px;max-height:100% !important}";
const JsonEditorStyle0 = jsonEditorCss;

const JsonEditor = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.hasChanges = false;
        this.hasErrors = false;
        this.instanceid = "";
        this.value = "";
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    componentDidLoad() {
        const editorContainer = document.getElementById(`${this.instanceid}-container`);
        if (editorContainer) {
            this._editor = monaco.editor.create(editorContainer, {
                value: this.value,
                language: "json",
                theme: "vs",
                minimap: {
                    enabled: false
                },
                automaticLayout: true,
                scrollBeyondLastLine: false
            });
            this._currentModel = this._editor.getModel();
            this._contentChanged = this._currentModel.onDidChangeContent(this._onEditorChange.bind(this));
            // Intercept the monaco function call that shows error markers to see if our content has errors
            const setModelMarkers = monaco.editor.setModelMarkers;
            const self = this;
            monaco.editor.setModelMarkers = function (model, owner, markers) {
                // If this call was for our model, it acts like an onEditorChange event
                // but gives us access to the error state as well
                if (model.id === self._currentModel.id) {
                    // Set the error state & dispatch event if state has changed
                    self._flagEditorHasErrors(markers.length > 0);
                    // Set the changed state & dispatch event if state has changed, but only if there are no errors
                    if (!self.hasErrors) {
                        self._flagEditorHasChanges(self._currentModel?.canUndo());
                        if (self._currentModel?.canUndo()) {
                            self._flagEditorContentChanged();
                        }
                    }
                    // Show the error flag if there are errors
                    const errorFlag = document.getElementById(`${self.instanceid}-errorFlag`);
                    errorFlag.style.visibility = self.hasErrors ? "visible" : "hidden";
                }
                // Pass on the call to the next editor in a chain of intercepts or, finally, to monaco
                setModelMarkers.call(monaco.editor, model, owner, markers);
            };
            this._diffEditor = monaco.editor.createDiffEditor(document.getElementById(`${this.instanceid}-diff-container`), {
                automaticLayout: true
            });
            this._setDiffModel();
            this._loaded = true;
            this._toggleUndoRedo();
        }
    }
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        this._initValueObserver();
        await this._getTranslations();
        return;
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '2837e36dbd0f853f8e90423032c1a41ef9a308a7' }, h("div", { key: 'b52d703957beaf3f594caff502bfb8fe22fde00d', id: `${this.instanceid}-editor-container`, class: "editor-container padding-right" }, h("div", { key: '7f981a93a6099074759ade8dde0cb988318cf7b2', class: "editor-controls" }, h("div", { key: '843bcd23697cec929fa3d1baaacca4a177f69c7b', class: "editor-buttons" }, h("calcite-icon", { key: 'd51c74ed089a297c2bec0be2834c2aeda40356ac', id: `${this.instanceid}-errorFlag`, icon: "exclamation-mark-triangle", title: this._translations.errorFlag, scale: "s", class: "edit-error-flag" }), h("calcite-button", { key: 'ffbbaf222b6a28dc670d74330ec17a39d6925850', id: `${this.instanceid}-undo`, color: "blue", appearance: "solid", title: this._translations.undo, onClick: () => this._undo(), scale: "s", class: "edit-button" }, h("calcite-icon", { key: '50ce52a201dbe69d51f983b392a33a709aa84e69', icon: "undo", scale: "s" })), h("calcite-button", { key: '8ef640d273d9723dd5acc93158a60fad8d34e63f', id: `${this.instanceid}-redo`, color: "blue", appearance: "solid", title: this._translations.redo, onClick: () => this._redo(), scale: "s", class: "edit-button" }, h("calcite-icon", { key: '5e39cd7d607947431cc4bed50ba42433d26c062b', icon: "redo", scale: "s" })), h("calcite-button", { key: 'b90d5aded295212c82f68dcc1ec6232684504812', id: `${this.instanceid}-diff`, color: "blue", appearance: "solid", title: this._translations.diff, onClick: () => this._toggleEditor(), scale: "s", class: "edit-button" }, h("calcite-icon", { key: '4394c732ad16fd4fa8ab123c00e8933ff102d404', icon: "compare", scale: "s" })), h("calcite-button", { key: 'e95cb0c5f565240b131910aafefc3c5abb881737', id: `${this.instanceid}-search`, appearance: "outline", color: "blue", title: this._translations.search, onClick: () => this._search(), scale: "s", class: "edit-button" }, h("calcite-icon", { key: '70d3a36613e3b3777c2fe0a7ff55c18f4cf5b294', icon: "search", scale: "s" })), h("calcite-button", { key: 'a1247a17de35889ff1e79dc6b5c622ba7a872e41', id: `${this.instanceid}-reset`, color: "blue", appearance: "solid", disabled: true, title: this._translations.cancelEdits, onClick: () => this._reset(), scale: "s", class: "edit-button" }, h("calcite-icon", { key: '69fef27e172dad30365b01c755e0d13b894fc086', icon: "reset", scale: "s" })))), h("div", { key: '3cd8f5cef24598814e72499d71a1f0f77f4d989d', class: "edit-parent" }, h("div", { key: '465132b6c06c959fff63d14e593751973558622d', id: `${this.instanceid}-container`, class: "json-edit-container" }), h("div", { key: '42c5db0bf86cbe07feea1f4362752376db620498', id: `${this.instanceid}-diff-container`, class: "json-edit-container display-none" })))));
    }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    _cancelEditsBtnHandler;
    _contentChanged;
    _currentModel;
    _diffEditor;
    _editor;
    _loaded = false;
    _searchBtnHandler;
    _translations;
    _useDiffEditor = false;
    _valueObserver;
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    /**
     * Gets the contents of the editor.
     *
     * @returns Promise resolving with the current contents of the editor
     */
    async getEditorContents() {
        return new Promise((resolve, reject) => {
            try {
                const currentValue = this._currentModel.getValue();
                resolve(currentValue);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * Frees the editor events and memory; to be called when the web component is no longer needed.
     *
     * Because the component lifecycle doesn't include an "onDestroy" event
     * (@see https://stenciljs.com/docs/component-lifecycle#disconnectedcallback)
     * and TypeScript/JavaScript does automatic garbage collection without a callback
     * hook until ES2021
     * (@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry),
     * this cleanup call needs to be called manually.
     */
    async prepareForDeletion() {
        this._searchBtnHandler?.removeEventListener("click", this._search);
        this._cancelEditsBtnHandler?.removeEventListener("click", this._reset);
        this._valueObserver?.disconnect();
        this._contentChanged?.dispose();
        this._editor?.dispose();
    }
    /**
     * Replaces the current selection with the supplied text, inserting if nothing is selected.
     *
     * @param replacement Text to use for replacement or insertion
     * @returns Promise resolving when function is done
     */
    async replaceCurrentSelection(replacement) {
        const currentSelection = this._editor.getSelection();
        this._editor.executeEdits("", [
            { range: currentSelection, text: replacement }
        ]);
    }
    /**
     * Resets the contents of the editor with the current `value`.
     *
     * @returns Promise resolving when function is done
     */
    async reset() {
        return new Promise((resolve, reject) => {
            try {
                this._reset();
                resolve({ success: true });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Disables a button.
     *
     * @param buttonId Id of button to disable
     *
      * @protected
     */
    _disableButton(buttonId) {
        document.getElementById(buttonId)?.setAttribute("disabled", "");
    }
    /**
     * Enables a button.
     *
     * @param buttonId Id of button to enable
     *
     * @protected
     */
    _enableButton(buttonId) {
        document.getElementById(buttonId)?.removeAttribute("disabled");
    }
    /**
     * Dispatches an event that the editor's content has changed.
     *
     * @protected
     */
    _flagEditorContentChanged() {
        // Event for notifying that the editor contents have changed
        window.dispatchEvent(new CustomEvent("solutionEditorContentChanged", {
            detail: {
                id: this.instanceid,
                contents: this._currentModel.getValue()
            },
            bubbles: true,
            cancelable: false,
            composed: true
        }));
    }
    /**
     * Sets the editor's flag indicating if it has changes and dispatches an event when
     * the flag value changes.
     *
     * @param flagHasChanges Current state of change in the editor; if it doesn't match the value saved in this
     * object, an event is dispatched with the new value and the saved value is updated
     *
     * @protected
     */
    _flagEditorHasChanges(flagHasChanges) {
        // Event for notifying if the editor has updated the value of its hasChanges property
        if (this.hasChanges !== flagHasChanges) {
            window.dispatchEvent(new CustomEvent("solutionEditorHasChanges", {
                detail: flagHasChanges,
                bubbles: true,
                cancelable: false,
                composed: true
            }));
            this.hasChanges = flagHasChanges;
        }
    }
    /**
     * Sets the editor's flag indicating if it has errors and dispatches an event when
     * the flag value changes.
     *
     * @param flagHasErrors Current state of errors in the editor; if it doesn't match the value saved in this
     * object, an event is dispatched with the new value and the saved value is updated
     *
     * @protected
     */
    _flagEditorHasErrors(flagHasErrors) {
        // Event for notifying if the editor has updated the value of its hasErrors property
        if (this.hasErrors !== flagHasErrors) {
            window.dispatchEvent(new CustomEvent("solutionEditorHasErrors", {
                detail: flagHasErrors,
                bubbles: true,
                cancelable: false,
                composed: true
            }));
            this.hasErrors = flagHasErrors;
        }
    }
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    async _getTranslations() {
        const translations = await getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
    /**
     * Initializes the observer that will monitor and respond to changes of the value.
     *
     * @protected
     */
    _initValueObserver() {
        this._valueObserver = new MutationObserver(ml => {
            ml.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === "value") {
                    const newValue = mutation.target[mutation.attributeName];
                    if ((newValue !== mutation.oldValue && this._loaded)) {
                        this._currentModel.setValue(this.value);
                    }
                }
            });
        });
        this._valueObserver.observe(this.el, { attributes: true, attributeOldValue: true });
    }
    /**
     * Handles activites appropriate to changes in the editor.
     *
     * @protected
     */
    _onEditorChange() {
        // Note: we're not flagging that the editor has changes here because this event
        // arrives before the model markers event, which indicates errors. We don't want
        // to notify about changes if there are errors.
        this._toggleUndoRedo();
    }
    /**
     * Redoes the previous edit operation.
     *
     * @protected
     */
    _redo() {
        if (this._currentModel?.canRedo()) {
            this._currentModel.redo();
            this._toggleUndoRedo();
        }
    }
    /**
     * Resets the stored model to the original value.
     *
     * @protected
     */
    _reset() {
        // Restore the original value
        this._currentModel.setValue(this.value);
        // update the ui
        this._toggleUndoRedo();
    }
    /**
     * Handles click on "Search" button.
     *
     * @protected
     */
    _search() {
        this._editor.trigger('toggleFind', 'actions.find');
    }
    /**
     * Sets the models for the diff editor.
     *
     * @protected
     */
    _setDiffModel() {
        if (this._diffEditor) {
            this._diffEditor.setModel({
                original: monaco.editor.createModel(this.value, "json"),
                modified: this._editor.getModel()
            });
        }
    }
    /**
     * Shows/Hides the appropriate editor: regular or diff.
     *
     * @protected
     */
    _toggleEditor() {
        this._useDiffEditor = !this._useDiffEditor;
        let diffContainer = document.getElementById(`${this.instanceid}-diff-container`);
        let container = document.getElementById(`${this.instanceid}-container`);
        if (this._useDiffEditor) {
            this._setDiffModel();
            diffContainer.classList.remove("display-none");
            container.classList.add("display-none");
        }
        else {
            diffContainer.classList.add("display-none");
            container.classList.remove("display-none");
        }
    }
    /**
     * Toggles the undo and redo buttons.
     *
     * @protected
     */
    _toggleUndoRedo() {
        if (this._currentModel?.canUndo()) {
            this._enableButton(`${this.instanceid}-undo`);
        }
        else {
            this._disableButton(`${this.instanceid}-undo`);
        }
        if (this._currentModel?.canRedo()) {
            this._enableButton(`${this.instanceid}-redo`);
        }
        else {
            this._disableButton(`${this.instanceid}-redo`);
        }
        if (this._currentModel?.canUndo() || this._currentModel?.canRedo()) {
            this._enableButton(`${this.instanceid}-reset`);
        }
        else {
            this._disableButton(`${this.instanceid}-reset`);
        }
    }
    /**
     * Undoes the current edit operation.
     *
     * @protected
     */
    _undo() {
        if (this._currentModel?.canUndo()) {
            this._currentModel.undo();
            this._toggleUndoRedo();
        }
    }
    static get assetsDirs() { return ["assets"]; }
};
JsonEditor.style = JsonEditorStyle0;

const solutionItemDetailsCss = ".inputBottomSeparation{margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:1.5rem}.icon-inline--on-left,.icon-inline--on-right{display:inline;vertical-align:middle;margin-inline-end:0.375rem;fill:#0079c1}.scale-down{-o-object-fit:scale-down;object-fit:scale-down}.img-container{display:inline;margin-inline-end:1rem;max-width:363px}.summary-count-container{display:inline;flex-grow:1;margin-inline-start:0.75rem}.snippet-count-container{width:calc(100vw - 363px)}.parent-container{max-width:100%;padding:1rem}label{position:relative;margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:1.5rem;display:block;min-width:-moz-min-content;min-width:min-content}";
const SolutionItemDetailsStyle0 = solutionItemDetailsCss;

const SolutionItemDetails = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.itemId = "";
        this.itemDetails = {
            accessInformation: "",
            description: "",
            licenseInfo: "",
            snippet: "",
            tags: [],
            title: ""
        };
        this.itemEdit = undefined;
        this._translations = undefined;
        this.thumbnail = undefined;
        this.thumbnailContainer = undefined;
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    async componentWillLoad() {
        return this._getTranslations();
    }
    async componentWillRender() {
        this.itemEdit = state.getItemInfo(this.itemId);
        if (this.itemEdit) {
            this.itemDetails = this.itemEdit.item;
            this.itemType = this.itemDetails.type;
        }
        return Promise.resolve();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '8bbaae72e79226d287c33a6cc0945344707e0987' }, h("div", { key: '6836de1161eb31305af007f96265ef7501ff541c', class: "parent-container" }, h("div", { key: '355100a14f3ad3428c152eda17b9ecaf246d379f', class: "inputBottomSeparation" }, h("calcite-input", { key: 'b482414e952890e50191f4480a078a24db30b623', id: "item-title", value: this.itemDetails.title })), h("div", { key: '8fcd980eeab23e6d78a33bbb6750f5d70b2c1a13', class: "inputBottomSeparation" }, h("input", { key: '1702f46cf552f3f37f668382ad706748b1d8f7ad', accept: ".jpg,.gif,.png,image/jpg,image/gif,image/png", class: "display-none", onChange: (event) => (this._updateThumbnail(event)), ref: (el) => (this.browseForThumbnail = el), type: "file" }), h("button", { key: '6df15b3290788c84f58edda6d01ec22eb9e36a9a', class: "font-size--3 btn-link inline-block trailer-quarter", onClick: () => this._getThumbnail() }, h("svg", { key: '8169d5c98f632be94f7069eb204cc4b2c5159221', class: "icon-inline icon-inline--on-left", height: "16", viewBox: "0 0 16 16", width: "16" }, h("path", { key: '578094ee1e523cfaacecdab56793a219b260d1a7', d: "M14.792 2.666l-1.414-1.413a.965.965 0 0 0-1.385-.03l-1.444 1.444-8.763 8.72L.03 15.481a.371.371 0 0 0 .488.488l4.096-1.756 8.763-8.72-.001-.001.002.002 1.443-1.444a.965.965 0 0 0-.03-1.385zM1.569 14.431l.554-1.293.74.739zm2.338-.924l-1.414-1.414 7.963-7.92 1.414 1.415zm8.67-8.626l-1.413-1.414 1.29-1.29a.306.306 0 0 1 .433 0l.981.98a.306.306 0 0 1 0 .433z" })), this._translations.editThumbnail), h("div", { key: '8c4faf6d86712104387259c726c3fac6e6d6b10d', class: "flex" }, h("div", { key: '93d0f7b46c78ec30d46f7bc33b615836969d3f46', class: "img-container", ref: (el) => (this.thumbnailContainer = el) }, h("img", { key: 'd69a1331009d7d93acd3879ef80f5095ed6cdd0c', class: "scale-down", height: "133", id: "item-thumbnail", ref: (el) => (this.thumbnail = el), width: "200" })), h("div", { key: 'd191b1d72c04c81b8169253864af9b8ebb1c9602', class: "snippet-count-container" }, h("calcite-input", { key: 'f5515ddad63ea215d50f960277362c85836f7b8a', id: "item-snippet", maxLength: 250, type: "textarea", value: this.itemDetails.snippet }), h("label", { key: 'e02b85f8f62e7bd07d0648618887ca6e092446f2', class: "font-size--3", id: "item-snippet-count", ref: (el) => (this.itemSnippetCount = el) })))), h("calcite-label", { key: '04b42de584350140b65442cecd45930436bdef41' }, this._translations.description, h("label", { key: '2e46c44aaeb2480d72d38ee84316c3c2943fb366', id: "item-description-label" }, h("calcite-input", { key: 'b59b9c07bdd8712821cf552df4b2ffaeba24f749', id: "item-description", type: "textarea", value: this.itemDetails.description }))), h("calcite-label", { key: '24c52f549286a48bd156bcecafb4518fe09b33c0' }, this._translations.tags, h("label", { key: 'ed635dc95fb4d607a0d41debf5959debfbaa3139', id: "item-tags-label" }, h("calcite-input", { key: '6986aad2783942210f759f3573c52450c2d63c7c', id: "item-tags", value: (this.itemDetails.tags && Array.isArray(this.itemDetails.tags) ? this.itemDetails.tags : [this.itemDetails.tags]).join(",") }))), this.itemType !== "Group" ? h("calcite-label", null, this._translations.credits, h("label", { id: "item-credits-label" }, h("calcite-input", { id: "item-credits", value: this.itemDetails.accessInformation }))) : null, this.itemType !== "Group" ? h("calcite-label", null, h("label", { id: "item-terms-label" }, this._translations.termsOfUse, h("calcite-input", { id: "item-terms", type: "textarea", value: this.itemDetails.licenseInfo }))) : null)));
    }
    componentDidRender() {
        this._loadThumb();
    }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Handle to the element for browsing for a file.
     */
    browseForThumbnail;
    itemType;
    /**
     * Handle to the snippet character-count feedback.
     */
    itemSnippetCount;
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    /**
     * Updates the component's value with changes to the input fields.
     */
    inputReceivedHandler(event) {
        switch (event.target.id) {
            case "item-title":
                this.itemDetails.title = event.target.value;
                this._updateStore();
                break;
            case "item-snippet":
                if (event.target.value.length > 250) {
                    event.target.value = event.target.value.substring(0, 250);
                }
                this.itemDetails.snippet = event.target.value;
                this._updateLengthLabel(this.itemDetails.snippet);
                this._updateStore();
                break;
            case "item-description":
                this.itemDetails.description = event.target.value;
                this._updateStore();
                break;
            case "item-tags":
                this.itemDetails.tags = event.target.value;
                this._updateStore();
                break;
            case "item-credits":
                this.itemDetails.accessInformation = event.target.value;
                this._updateStore();
                break;
            case "item-terms":
                this.itemDetails.licenseInfo = event.target.value;
                this._updateStore();
                break;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Events
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Opens image file browse dialog.
     *
     */
    _getThumbnail() {
        this.browseForThumbnail.click();
    }
    /**
     * Load the templates thumbnail
     *
     */
    _loadThumb() {
        if (this.thumbnail && this.itemEdit?.thumbnail) {
            // Show the thumbnail
            this.thumbnail.src = URL.createObjectURL(this.itemEdit.thumbnail);
            this.thumbnailContainer.classList.remove("empty-box");
            this.thumbnail.classList.remove("display-none");
        }
        else {
            // Replace the thumbnail with an empty box
            this.thumbnailContainer.classList.add("empty-box");
            this.thumbnail.classList.add("display-none");
        }
    }
    /**
     * Updates the length label to reflect the current number of characters
     * relative to the max number of characters supported.
     *
     * @param phrase the current phrase from the control
     */
    _updateLengthLabel(phrase) {
        this.itemSnippetCount.innerText =
            this._translations.snippetCountPattern.replace("{{n}}", phrase.length.toString());
    }
    /**
     * Add or remove the value from the store
     */
    _updateStore() {
        this.itemEdit = state.getItemInfo(this.itemId);
        this.itemEdit.item = this.itemDetails;
        state.setItemInfo(this.itemEdit);
    }
    /**
     * Gets and displays image result from browse and updates the item in the store.
     *
     * @param event The input controls event that contains the new file
     * @param updateStore boolean that controls if the new value is written to the store
     *  should be false on the initial load but true the rest of the time
     */
    _updateThumbnail(event) {
        const files = event.target.files;
        if (files && files[0]) {
            if (this.thumbnail) {
                // Update UI
                this.thumbnail.src = URL.createObjectURL(files[0]);
                // Update info in store
                this.itemEdit = state.getItemInfo(this.itemId);
                this.itemEdit.thumbnail = files[0];
                state.replaceItemThumbnail(this.itemEdit);
            }
        }
    }
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    async _getTranslations() {
        const translations = await getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
};
SolutionItemDetails.style = SolutionItemDetailsStyle0;

const solutionItemSharingCss = ":host{display:block}.container-border{padding:1rem}.icon-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";
const SolutionItemSharingStyle0 = solutionItemSharingCss;

const SolutionItemSharing = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.groupId = "";
        this._translations = undefined;
        this.sharing = [];
    }
    get el() { return getElement(this); }
    itemIdWatchHandler() {
        const itemEdit = state.getItemInfo(this.groupId);
        this.sharing = itemEdit.groupDetails;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    async componentWillLoad() {
        return this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '211d5e7096e178ab077f63e7ee9289e1d286a4aa' }, h("div", { key: '191aad2e7c72134349364fbf1020aaf2b104be09', class: "container-border" }, h("calcite-label", { key: '590768adecc53b99c73293a118c8f7d7e63b4acb' }, this._translations.groupInfo), this._renderItems(this.sharing))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    async getShareInfo() {
        return this.sharing;
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Render share options based on the list of share details
     *
     * @param objs list of IItemShare objects that are used to expose and store share info for the solutions items
     */
    _renderItems(objs) {
        return objs && objs.length > 0
            ? objs.map(item => {
                return (h("calcite-label", { layout: "inline" }, h("calcite-switch", { checked: item.shareItem, id: item.id, name: "setting", onCalciteSwitchChange: (event) => this._updateItem(event), scale: "m", value: "enabled" }), h("solution-item-icon", { type: item.type, typeKeywords: item.typeKeywords }), h("span", { class: "icon-text", title: item.title }, item.title)));
            })
            : null;
    }
    /**
     * Update the items share prop based on the switch state
     *
     * @param event onCalciteSwitchChange event
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _updateItem(event) {
        const id = event.target.id;
        this.sharing = this.sharing.map((itemShare) => {
            if (itemShare.id === id) {
                // update the item
                itemShare.shareItem = event.target.checked;
                // update the item in the store
                const itemEdit = state.getItemInfo(id);
                if (itemShare.shareItem) {
                    // Add the group to the item if it's not already there
                    if (!itemEdit.groups) {
                        itemEdit.groups = [this.groupId];
                    }
                    else if (itemEdit.groups.indexOf(this.groupId) < 0) {
                        itemEdit.groups.push(this.groupId);
                    }
                }
                else {
                    // Remove the group from the item if it's there
                    if (itemEdit.groups) {
                        const i = itemEdit.groups.indexOf(this.groupId);
                        if (i > -1) {
                            itemEdit.groups.splice(i, 1);
                        }
                    }
                }
                state.setItemInfo(itemEdit);
            }
            return itemShare;
        });
    }
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    async _getTranslations() {
        const translations = await getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
    static get watchers() { return {
        "groupId": ["itemIdWatchHandler"]
    }; }
};
SolutionItemSharing.style = SolutionItemSharingStyle0;

const solutionOrganizationVariablesCss = ":host{display:block}.container-border{overflow-y:auto}.org-var-header{margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:1rem}";
const SolutionOrganizationVariablesStyle0 = solutionOrganizationVariablesCss;

const SolutionOrganizationVariables = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.organizationVariableSelected = createEvent(this, "organizationVariableSelected", 7);
        this.value = "";
        this._organizationVariables = [];
        this._translations = undefined;
    }
    get el() { return getElement(this); }
    valueWatchHandler() {
        this._organizationVariables = JSON.parse(this.value);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    async componentWillLoad() {
        return this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '587896d0bc46f7af3414d51eca75626deb25c128' }, h("div", { key: '8377fc249d3769106f11666649cf7e70e6388553' }, h("h4", { key: 'c21c1242a68809f10a3c3297957a3767ef57d69f', class: "org-var-header" }, this._translations.orgVariables)), h("div", { key: '1d53770ddf75cf7a2475c3584092599103c2148d', class: "container-border" }, h("calcite-tree", { key: '48857da7785529abd0a8574e8f08964199313c81', id: "variable-label" }, this._renderHierarchy(this._organizationVariables)))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events
    //
    //--------------------------------------------------------------------------
    organizationVariableSelected;
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Renders the organization based variable items the user can insert at runtime
     *
     * @param objs a list of organization variables to render
     */
    _renderHierarchy(objs) {
        const hierarchy = objs.map(obj => {
            return (h("calcite-tree-item", { onClick: () => this._treeItemSelected(obj.id, obj.value) }, obj.title));
        });
        return hierarchy;
    }
    /**
     * Publishes the `organizationVariableSelected` event containing `itemId`, the id of the selected variable and the value of the variable.
     *
     * @param itemId Item id as reported by click event
     * @param value Variable id as reported by click event
     */
    _treeItemSelected(itemId, value) {
        this.organizationVariableSelected.emit({
            itemId,
            value
        });
    }
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    async _getTranslations() {
        const translations = await getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
    static get watchers() { return {
        "value": ["valueWatchHandler"]
    }; }
};
SolutionOrganizationVariables.style = SolutionOrganizationVariablesStyle0;

const solutionResourceItemCss = ":host{display:block}.resource-item{padding:1rem}.resource-button{margin-inline-end:1rem}.resource-progress{padding-top:1rem}.resources-container{border:1px #808080 solid}.margin-bottom-1{margin-bottom:1rem}";
const SolutionResourceItemStyle0 = solutionResourceItemCss;

const SolutionResourceItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.authentication = undefined;
        this.itemId = "";
        this.resourceFilePaths = [];
        this.resources = [];
        this._translations = undefined;
    }
    get el() { return getElement(this); }
    itemIdWatchHandler() {
        const item = state.getItemInfo(this.itemId);
        this.resourceFilePaths = item.resourceFilePaths;
        this.resources = item.resources.map(
        // False linting error
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        (path) => path.substring(path.lastIndexOf("/") + 1));
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad() {
        return this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        const hasValidResources = this._hasValidResources();
        return (h(Host, { key: '31f5090ac98fc122b9ff55433fbfdf6cf9cf4021' }, h("div", { key: 'db3e91e5bf116cc61a2a1a48b2fa75301879cc6b', class: "resource-item" }, h("div", { key: '67e394b7011d37970932ca8660e2c85e0ef80a51', class: "margin-bottom-1" }, h("calcite-button", { key: '36ea4dc882a41043dbb3ebeb51be65cbb85d4cdd', appearance: "solid", class: "resource-button", color: "blue", onClick: () => this._addNewResource() }, this._translations.addResource), h("calcite-button", { key: '50b428bb2a75199bcfcb9d698c71faefabc3cbcc', appearance: "solid", color: "blue", disabled: !hasValidResources, onClick: () => this._downloadAll() }, this._translations.downloadAll)), h("div", { key: 'd12a8adbd0f9555536bca1e5c94585c3adf9279d', class: "resources-container", style: { display: hasValidResources ? "inherit" : "none" } }, this._renderResourceList()))));
    }
    _removedResources = {};
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Render resources while avoiding thumbnail resoures that are managed by solution-item
     *
     */
    _renderResourceList() {
        return (h("calcite-value-list", { multiple: true }, this.resourceFilePaths.reduce((prev, cur) => {
            if (cur.type !== EFileType.Thumbnail) {
                prev.push(this._renderResource(cur));
            }
            return prev;
        }, [])));
    }
    /**
     * Render the resource and supporting actions for download/update/delete/(reset..if deleted)
     *
     * @param resource the filename and url used to interact with the resource
     */
    _renderResource(resource) {
        const resettable = resource.updateType === EUpdateType.Remove;
        const fullname = resource.folder ? resource.folder + "/" + resource.filename : resource.filename;
        return (h("calcite-value-list-item", { class: resettable ? "disabled" : "", label: fullname, nonInteractive: true, value: resource.url }, h("calcite-action-group", { "expand-disabled": "true", layout: "horizontal", slot: "actions-end" }, h("calcite-action", { disabled: resettable, icon: "download", label: this._translations.download, onClick: () => this._download(resource.url, resource.filename), scale: "m", text: this._translations.download, title: this._translations.download }), h("calcite-action", { disabled: resettable, icon: "upload-to", label: this._translations.update, onClick: () => this._upload(resource), scale: "m", text: this._translations.update, title: this._translations.update }), h("calcite-action", { disabled: resettable, icon: "trash", label: this._translations.delete, onClick: () => this._delete(resource), scale: "m", text: this._translations.delete, title: this._translations.delete }), resettable ? h("calcite-action", { icon: "reset", label: this._translations.reset, onClick: () => this._reset(resource.filename), scale: "m", text: this._translations.reset, title: this._translations.reset }) : h("div", { class: "display-none" }))));
    }
    /**
     * Adds the name to the deleted array so it will be skipped while rendering
     *  but still exist if the user chooses to reset
     *
     * @param resource the resource to be updated
     */
    _delete(resource) {
        resource.updateType = EUpdateType.Remove;
        this.resourceFilePaths = [...this.resourceFilePaths]; // to trigger refresh
        this._updateStore();
    }
    /**
     * Remove the name from the deleted array so it will again be rendered
     *
     * @param name the name to be added to the deleted array
     */
    _reset(name) {
        // need to make sure I know if this reset is from the source or a new one
        // Because the item's `resources` array is not updated until (and if) the solution is saved,
        // we can use it for the reset info
        this.resources.some(resourceName => resourceName === name) ?
            // Undo removing an existing resource
            this.resourceFilePaths = this.resourceFilePaths.map(p => {
                if (p.filename === name) {
                    p.updateType = EUpdateType.None;
                }
                return p;
            }) :
            // Undo cancelling the adding of a resource
            this.resourceFilePaths = this.resourceFilePaths.map(p => {
                if (p.filename === name) {
                    p.updateType = EUpdateType.Add;
                }
                return p;
            });
        this._updateStore();
    }
    /**
     * Download all of the templates resources
     *
     */
    _downloadAll() {
        this.resourceFilePaths.forEach((resource) => {
            this._download(resource.url, resource.filename);
        });
    }
    /**
     * Download the current resource
     *
     * @param url the resource url
     * @param name the resource name
     */
    _download(url, name) {
        // files that have been added manually do not need to be requested from the item
        if (url.startsWith("blob")) {
            this.downloadFile(url, name);
        }
        else {
            const _url = `${url}?token=${this.authentication.token}`;
            void this.fetchAndDownload(_url, name);
        }
    }
    /**
     * Dynamically creates an anchor and downloads the file
     *
     * @param url the url of the resource
     * @param name the name of the resource
     */
    downloadFile(url, name) {
        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        link.target = "_blank";
        link.click();
    }
    /**
     * Check if the template resources have any non-thumbnail resources
     *
     * @returns true if we have data resources and false if only thumbnail
     */
    _hasValidResources() {
        return this.resourceFilePaths.some(r => r.url.indexOf("_info_thumbnail") < 0);
    }
    /**
     * Fetches and downloads the resource from the solution
     *
     * @param url the url of the resource
     * @param name the name of the resource
     */
    async fetchAndDownload(url, name) {
        const image = await fetch(url);
        const b = await image.blob();
        const bURL = URL.createObjectURL(b);
        this.downloadFile(bURL, name);
    }
    /**
     * Create an input element to support the uploading of the resource and upload the resource
     *
     * @param resource the resource to be updated
     */
    _upload(resource) {
        const _input = document.createElement("input");
        _input.classList.add("display-none");
        _input.onchange = this._updateResource.bind(this, resource);
        _input.type = "file";
        _input.click();
    }
    /**
     * Create an input element to support the uploading of a resource and add the new resource
     *
     */
    _addNewResource() {
        const _input = document.createElement("input");
        _input.classList.add("display-none");
        _input.onchange = this._add.bind(this);
        _input.type = "file";
        _input.click();
    }
    /**
     * Replace the resource file path when update action is used
     *
     * @param resourcePath the resource to be updated
     * @param event the input event that contains the file
     */
    _updateResource(resourcePath, event) {
        const files = event.target.files;
        if (files && files[0]) {
            resourcePath.blob = files[0];
            resourcePath.updateType = EUpdateType.Update;
            this._updateStore();
        }
    }
    /**
     * Add the new resource to the resource file paths
     *
     * @param event the inputs event that contains the new file
     */
    _add(event) {
        const files = event.target.files;
        if (files && files[0]) {
            const url = URL.createObjectURL(files[0]);
            const filename = files[0].name;
            // Add the item if it's not already in the resource file paths list
            if (!this.resourceFilePaths.some(r => r.filename === filename && r.url === url)) {
                this.resourceFilePaths = [
                    ...this.resourceFilePaths,
                    {
                        url,
                        type: EFileType.Data,
                        folder: undefined,
                        filename,
                        blob: files[0],
                        updateType: EUpdateType.Add
                    }
                ];
                this._updateStore();
            }
        }
    }
    /**
     * Add or remove the value from the store
     */
    _updateStore() {
        const item = state.getItemInfo(this.itemId);
        item.resourceFilePaths = this.resourceFilePaths;
        state.setItemInfo(item);
    }
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    async _getTranslations() {
        const translations = await getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
    static get watchers() { return {
        "itemId": ["itemIdWatchHandler"]
    }; }
};
SolutionResourceItem.style = SolutionResourceItemStyle0;

const solutionTemplateDataCss = ":host{display:flexbox}.solution-data-container{position:absolute;height:-moz-available;height:calc(100% - 48px);height:-webkit-fill-available;height:stretch;width:-moz-available;width:100%;width:-webkit-fill-available;width:stretch}.solution-data-child-container{display:flex;height:100%;width:100%;flex-direction:column;overflow-y:auto}.solution-data-editor-container{height:100%}.solution-data-child-container-collapsed{display:flex;height:100%;flex-direction:column;overflow:auto;width:50px}.inputBottomSeparation{margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:1.5rem}.json-editor{margin:1rem;width:auto;width:-webkit-fill-available -moz-available}.collapse-btn{padding-left:1rem;padding-right:1rem;padding-top:1rem;padding-bottom:0px}.org-vars{padding-left:1rem;padding-right:1rem;padding-top:1rem;padding-bottom:0px}.sol-vars{padding-top:0px;padding-bottom:0px;padding-left:1rem;padding-right:1rem;min-height:45%}.padding-1{padding:1rem}.light{background-color:#F4F4F4}";
const SolutionTemplateDataStyle0 = solutionTemplateDataCss;

const SolutionTemplateData = class {
    get el() { return getElement(this); }
    itemIdWatchHandler() {
        this._initializing = true;
        this.value = JSON.stringify(this.instanceid === "data"
            ? state.getItemInfo(this.itemId).data
            : state.getItemInfo(this.itemId).properties, null, 2);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.instanceid = "";
        this.itemId = "";
        this.organizationVariables = "";
        this.solutionVariables = "";
        this.varsOpen = true;
        this._translations = undefined;
        this.value = "";
        window.addEventListener("solutionEditorContentChanged", (evt) => {
            if (this.itemId) {
                const { id, contents } = evt.detail;
                const [itemId, instanceId] = id.split("|");
                if (itemId == this.itemId && instanceId === this.instanceid) {
                    if (!this._initializing && contents.length > 0) {
                        const itemEdit = state.getItemInfo(itemId);
                        if (instanceId === "data") {
                            itemEdit.data = JSON.parse(contents);
                        }
                        else {
                            itemEdit.properties = JSON.parse(contents);
                        }
                        state.setItemInfo(itemEdit);
                    }
                    this._initializing = false;
                }
            }
        });
    }
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad() {
        return this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '719601ce314da8b957f2eebb7c4a05489ae14d0e' }, h("div", { key: 'e712c532d0568494ae3dce6d08bfbb11d260fabb', class: "solution-data-container" }, h("calcite-shell", { key: '782031ce7fdf79fb51197988145524a5846e8388', class: "light var-container", dir: "ltr" }, h("calcite-panel", { key: '945a9f91f45e70279eea5f765fe76f2e835a4520', class: "json-editor" }, h("div", { key: '306980a78f84ba3ff3694314d5da9e1ced288f10', class: "solution-data-child-container calcite-match-height" }, h("json-editor", { key: 'df02c424a6abe7ca96e85063e947a072a8a147f3', class: "solution-data-editor-container", instanceid: this.itemId + "|" + this.instanceid, value: this.value }))), h("calcite-shell-panel", { key: '1dc03b9cdedecafa5393a9ae39767311618c697b', "height-scale": "l", position: "end", slot: "contextual-panel", "width-scale": "xs" }, h("div", { key: 'c860608f30e60529d990f10077aef88af7f97d18', class: this.varsOpen ? "solution-data-child-container" : "solution-data-child-container-collapsed" }, h("calcite-button", { key: '6a73213cbd8f5741434fa3ac6bf40c6912432a15', appearance: "transparent", class: "collapse-btn", "icon-start": this.varsOpen ? "chevrons-right" : "chevrons-left", id: "collapse-vars", onClick: () => this._toggleVars(), scale: "s", title: this.varsOpen ? this._translations.collapse : this._translations.expand }), h("div", { key: '9c343fe75a40e017ea8f63a3e0a2417ef444a319', class: this.varsOpen ? "org-vars" : "org-vars display-none", id: "orgVars" }, h("solution-organization-variables", { key: '5138e9cba2e3ad4ea9df59c0e2e74fbba2dc01be', value: this.organizationVariables })), h("div", { key: '402a0a71056acc4214f2376c5f64e7971322bf55', class: this.varsOpen ? "sol-vars" : "sol-vars display-none", id: "solVars" }, h("solution-variables", { key: '68753d13ad8ca0087359e371a11a0755ea43ebac', value: this.solutionVariables }))))))));
    }
    _initializing = false;
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Toggle varsOpen prop to show/hide variable containers
     */
    _toggleVars() {
        this.varsOpen = !this.varsOpen;
    }
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    async _getTranslations() {
        const translations = await getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
    static get watchers() { return {
        "itemId": ["itemIdWatchHandler"]
    }; }
};
SolutionTemplateData.style = SolutionTemplateDataStyle0;

const solutionVariablesCss = ":host{display:block}.container-border{overflow-y:hidden}.org-var-header{margin-top:1rem;margin-bottom:1rem;margin-left:0px;margin-right:0px}.icon-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";
const SolutionVariablesStyle0 = solutionVariablesCss;

const SolutionVariables = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.solutionVariableSelected = createEvent(this, "solutionVariableSelected", 7);
        this.value = "";
        this._solutionVariables = [];
        this._translations = undefined;
    }
    get el() { return getElement(this); }
    valueWatchHandler() {
        this._solutionVariables = JSON.parse(this.value);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad() {
        return this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '4e92cbf7b038e47064d115fa3acedc7c97740b74' }, h("div", { key: '0286eccf36b633f9136d41c91d294a08d9f422a9' }, h("h4", { key: 'c11b186149971f39226f5698cbd3655c410a2432', class: "org-var-header" }, this._translations.solVariables)), h("div", { key: '6396b897a2fca64b80c10e3fa4c199487173e6b0', class: "container-border" }, h("calcite-tree", { key: 'f041b9c84e8f73b6549c4668bef11c1c0633b38b', id: "variable-label" }, this._renderHierarchy(this._solutionVariables)))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events
    //
    //--------------------------------------------------------------------------
    solutionVariableSelected;
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Render the solution item variables that the user can insert into temaplates at runtime.
     *
     * @param objs a list of variable items that have been gathered from the solutions templates
     */
    _renderHierarchy(objs) {
        const hierarchy = objs.map(obj => {
            return obj.dependencies && obj.dependencies.length > 0 ? (h("calcite-tree-item", { onClick: (evt) => this._toggleExpand(evt) }, h("solution-item-icon", { type: obj.type }), h("span", { class: "icon-text", title: obj.title }, obj.title), h("calcite-tree", { slot: "children" }, this._renderHierarchy(obj.dependencies)))) : (h("calcite-tree-item", { onClick: () => this._treeItemSelected(obj.id, obj.value) }, obj.title));
        });
        return hierarchy;
    }
    /**
     * Publishes the `solutionVariableSelected` event containing `itemId`, the id of the selected variable and the value of the variable.
     *
     * @param id Item id as reported by click event
     * @param value Variable id as reported by click event
     */
    _treeItemSelected(id, value) {
        this.solutionVariableSelected.emit({
            itemId: id,
            value
        });
    }
    /**
     * Toggle the tree item that was clicked
     *
     * @param evt the clicks mouse event
     */
    _toggleExpand(evt = undefined) {
        const treeItem = evt?.target?.closest("calcite-tree-item");
        if (treeItem) {
            treeItem.expanded = !treeItem.expanded;
        }
    }
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    async _getTranslations() {
        const translations = await getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
    static get watchers() { return {
        "value": ["valueWatchHandler"]
    }; }
};
SolutionVariables.style = SolutionVariablesStyle0;

export { ShellPanel as calcite_shell_panel, Tab as calcite_tab, TabNav as calcite_tab_nav, TabTitle as calcite_tab_title, Tabs as calcite_tabs, ValueList as calcite_value_list, ValueListItem as calcite_value_list_item, JsonEditor as json_editor, SolutionItemDetails as solution_item_details, SolutionItemSharing as solution_item_sharing, SolutionOrganizationVariables as solution_organization_variables, SolutionResourceItem as solution_resource_item, SolutionTemplateData as solution_template_data, SolutionVariables as solution_variables };
