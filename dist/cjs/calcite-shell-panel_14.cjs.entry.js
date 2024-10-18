/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const conditionalSlot = require('./conditionalSlot-37ff4832.js');
const dom = require('./dom-795d4a33.js');
const locale = require('./locale-da840314.js');
const math = require('./math-089392ef.js');
const t9n = require('./t9n-ed5c03a7.js');
const resources = require('./resources-18f799c7.js');
const guid = require('./guid-e84a8375.js');
const core = require('./core-7f0bcc12.js');
const observers = require('./observers-18d87cb5.js');
const interactive = require('./interactive-a128ac30.js');
const component = require('./component-5d190962.js');
const browser = require('./browser-333a21c5.js');
const loadable = require('./loadable-1c888c87.js');
const sharedListRender = require('./shared-list-render-546c7296.js');
const sortableComponent = require('./sortableComponent-5dfc7ff8.js');
const logger = require('./logger-f177776b.js');
const resources$2 = require('./resources-7aaf489b.js');
const resources$1 = require('./resources-388efec5.js');
const locale$1 = require('./locale-339b55f0.js');
const solutionStore = require('./solution-store-4de89072.js');
const interfaces = require('./interfaces-09c4c40e.js');
const solutionResource = require('./solution-resource-40e70253.js');
require('./index-f052f656.js');
require('./key-47c9469a.js');
require('./array-286e5a3b.js');
require('./resources-f895ff54.js');
require('./debounce-7f1e04d6.js');
require('./config-e76d9931.js');
require('./esri-loader-08dc41bd.js');
require('./_commonjsHelpers-baf43783.js');
require('./index-2b13a4d5.js');
require('./restHelpersGet-5c2245a3.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
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

const shellPanelCss = ":host{pointer-events:none;position:relative;display:flex;flex:0 1 auto;align-items:stretch;z-index:var(--calcite-shell-panel-z-index, var(--calcite-z-index));--calcite-shell-panel-detached-max-height:unset;--calcite-shell-panel-max-height:unset;--calcite-internal-shell-panel-shadow-block-start:0 4px 8px -1px rgba(0, 0, 0, 0.08),\n    0 2px 4px -1px rgba(0, 0, 0, 0.04);--calcite-internal-shell-panel-shadow-block-end:0 -4px 8px -1px rgba(0, 0, 0, 0.08),\n    0 -2px 4px -1px rgba(0, 0, 0, 0.04);--calcite-internal-shell-panel-shadow-inline-start:4px 0 8px -1px rgba(0, 0, 0, 0.08),\n    2px 0 4px -1px rgba(0, 0, 0, 0.04);--calcite-internal-shell-panel-shadow-inline-end:-4px 0 8px -1px rgba(0, 0, 0, 0.08),\n    -2px 0 4px -1px rgba(0, 0, 0, 0.04)}.calcite--rtl.content--overlay{--calcite-internal-shell-panel-shadow-inline-start:-4px 0 8px -1px rgba(0, 0, 0, 0.08),\n    -2px 0 4px -1px rgba(0, 0, 0, 0.04);--calcite-internal-shell-panel-shadow-inline-end:4px 0 8px -1px rgba(0, 0, 0, 0.08),\n    2px 0 4px -1px rgba(0, 0, 0, 0.04)}:host([layout=vertical]){z-index:var(--calcite-shell-panel-z-index, calc(var(--calcite-z-index) + 1))}:host([layout=vertical][display-mode=overlay]){z-index:var(--calcite-shell-panel-z-index, calc(var(--calcite-z-index-header) + 1))}:host([layout=vertical][display-mode=float-all]) .content{flex:2}:host([layout=vertical][width-scale=s]:not([display-mode=float-all])) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 12vw);--calcite-internal-shell-panel-max-width:var(--calcite-shell-panel-max-width, 300px);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 150px)}:host([layout=vertical][width-scale=s][display-mode=float-all]) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 12vw);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 150px)}:host([layout=vertical][width-scale=m]:not([display-mode=float-all])) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 20vw);--calcite-internal-shell-panel-max-width:var(--calcite-shell-panel-max-width, 420px);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 240px)}:host([layout=vertical][width-scale=m][display-mode=float-all]) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 20vw);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 240px)}:host([layout=vertical][width-scale=l]:not([display-mode=float-all])) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 45vw);--calcite-internal-shell-panel-max-width:var(--calcite-shell-panel-max-width, 680px);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 340px)}:host([layout=vertical][width-scale=l][display-mode=float-all]) .content{--calcite-internal-shell-panel-width:var(--calcite-shell-panel-width, 45vw);--calcite-internal-shell-panel-min-width:var(--calcite-shell-panel-min-width, 340px)}:host([layout=horizontal][height-scale=s]) .content{--calcite-internal-shell-panel-max-height:var(\n    --calcite-shell-panel-max-height,\n    var(--calcite-shell-panel-detached-max-height, 20vh)\n  )}:host([layout=horizontal]) .content{--calcite-internal-shell-panel-min-height:var(--calcite-shell-panel-min-height, 5vh);--calcite-internal-shell-panel-max-height:var(\n    --calcite-shell-panel-max-height,\n    var(--calcite-shell-panel-detached-max-height, 30vh)\n  )}:host([layout=horizontal][height-scale=l]) .content{--calcite-internal-shell-panel-max-height:var(\n    --calcite-shell-panel-max-height,\n    var(--calcite-shell-panel-detached-max-height, 40vh)\n  )}.container{pointer-events:none;box-sizing:border-box;display:flex;block-size:100%;flex:1 1 auto;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-color-text-2)}.container *{box-sizing:border-box}.container.float-all{margin-block:0.5rem;margin-inline:0.5rem}:host([layout=horizontal]) .container{block-size:auto;inline-size:100%;flex-direction:column}:host(:hover) .separator:not(:hover):not(:focus),:host(:focus-within) .separator:not(:hover):not(:focus){opacity:1;background-color:var(--calcite-color-border-3)}.separator{pointer-events:auto;position:absolute;display:flex;background-color:transparent;opacity:0;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;cursor:col-resize;outline:none}.separator:hover{opacity:1;background-color:var(--calcite-color-border-2)}.separator:focus{background-color:var(--calcite-color-brand);opacity:1}:host([layout=vertical]) .separator{inset-block:0px;block-size:100%;inline-size:0.125rem;cursor:col-resize}:host([layout=horizontal][position=start]) .separator{inset-block-end:0px}:host([layout=horizontal][position=end]) .separator{inset-block-start:0px}:host([layout=horizontal]) .separator{inset-inline-end:0px;block-size:0.125rem;inline-size:100%;cursor:row-resize}:host([layout=vertical][position=start]) .separator{inset-inline-end:-2px}:host([layout=horizontal][position=start]) .separator{inset-block-end:-2px}:host([layout=vertical][position=end]) .separator{inset-inline-start:-2px}:host([layout=horizontal][position=end]) .separator{inset-block-start:-2px}::slotted(calcite-panel),::slotted(calcite-flow){block-size:100%;inline-size:100%;flex:1 1 auto;max-block-size:unset;max-inline-size:unset}::slotted(.calcite-match-height){display:flex;flex:1 1 auto;overflow:hidden}.content{pointer-events:auto;display:flex;flex-direction:column;flex-wrap:nowrap;align-items:stretch;align-self:stretch;background-color:var(--calcite-color-background);padding:0px;transition:max-block-size var(--calcite-animation-timing), max-inline-size var(--calcite-animation-timing)}:host([layout=vertical]:not([display-mode=float-all])) .content{inline-size:var(--calcite-internal-shell-panel-width);max-inline-size:var(--calcite-internal-shell-panel-max-width);min-inline-size:var(--calcite-internal-shell-panel-min-width)}:host([layout=vertical][display-mode=float-all]) .content{inline-size:var(--calcite-internal-shell-panel-width);min-inline-size:var(--calcite-internal-shell-panel-min-width)}:host([layout=horizontal]) .content{block-size:var(--calcite-internal-shell-panel-height);max-block-size:var(--calcite-internal-shell-panel-max-height);min-block-size:var(--calcite-internal-shell-panel-min-height)}.content__header{display:flex;flex:0 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch}.content__body{display:flex;flex:1 1 auto;flex-direction:column;overflow:hidden}.content--overlay{position:absolute;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([layout=vertical]) .content--overlay{inset-block-start:0px;block-size:100%}:host([layout=horizontal]) .content--overlay{inset-inline-start:0px;inline-size:100%}:host([layout=vertical][position=start]) .content--overlay{inset-inline-start:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-inline-start)}:host([layout=vertical][position=end]) .content--overlay{inset-inline-end:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-inline-end)}:host([layout=horizontal][position=start]) .content--overlay{inset-block-start:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-block-start)}:host([layout=horizontal][position=end]) .content--overlay{inset-block-end:100%;box-shadow:var(--calcite-internal-shell-panel-shadow-block-end)}.float--content{margin-inline:0.5rem;margin-block:0.5rem auto;block-size:auto;overflow:hidden;border-radius:0.25rem;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);max-block-size:var(--calcite-internal-shell-panel-max-height, calc(100% - 1rem))}.float--content ::slotted(calcite-panel),.float--content ::slotted(calcite-flow){max-block-size:unset}:host([layout=horizontal]) .float--content{margin-block:0.5rem}:host([position=start]) .float--content ::slotted(calcite-panel),:host([position=start]) .float--content ::slotted(calcite-flow),:host([position=end]) .float--content ::slotted(calcite-panel),:host([position=end]) .float--content ::slotted(calcite-flow){border-style:none}.content[hidden]{display:none}slot[name=action-bar]::slotted(calcite-action-bar),.content ::slotted(calcite-flow),.content ::slotted(calcite-panel:not([closed])){border-width:1px;border-style:solid;border-color:var(--calcite-color-border-3)}:host([position=start]:not([slot=panel-end]):not([display-mode=float-all])) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=start]:not([slot=panel-end]):not([display-mode=float-all])) .content ::slotted(calcite-flow),:host([position=start]:not([slot=panel-end]):not([display-mode=float-all])) .content ::slotted(calcite-panel),:host([position=end][slot=panel-start]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=end][slot=panel-start]) .content ::slotted(calcite-flow),:host([position=end][slot=panel-start]) .content ::slotted(calcite-panel){border-inline-start:none}:host([position=end]:not([slot=panel-start])) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=end]:not([slot=panel-start])) .content ::slotted(calcite-flow),:host([position=end]:not([slot=panel-start])) .content ::slotted(calcite-panel),:host([position=start][slot=panel-end]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=start][slot=panel-end]) .content ::slotted(calcite-flow),:host([position=start][slot=panel-end]) .content ::slotted(calcite-panel){border-inline-end:none}:host([layout=horizontal]:not([display-mode=float-all])) slot[name=action-bar]::slotted(calcite-action-bar){border-inline:0}:host([layout=horizontal][position=start]:not([display-mode=float-all])) .content ::slotted(calcite-flow),:host([layout=horizontal][position=start]:not([display-mode=float-all])) .content ::slotted(calcite-panel){border-inline:0;border-block-start:0}:host([layout=horizontal][position=end]) .content ::slotted(calcite-flow),:host([layout=horizontal][position=end]) .content ::slotted(calcite-panel){border-inline:0;border-block-end:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteShellPanelStyle0 = shellPanelCss;

const ShellPanel = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteInternalShellPanelResizeStart = index.createEvent(this, "calciteInternalShellPanelResizeStart", 6);
        this.calciteInternalShellPanelResizeEnd = index.createEvent(this, "calciteInternalShellPanelResizeEnd", 6);
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
            const dir = dom.getElementDir(el);
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
            const adjustmentDirection = layout === "vertical" && dom.getElementDir(el) === "rtl" ? -1 : 1;
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
            if (!dom.isPrimaryPointerButton(event)) {
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
            if (!dom.isPrimaryPointerButton(event)) {
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
            const actionBars = dom.slotChangeGetAssignedElements(event).filter((el) => el?.matches("calcite-action-bar"));
            this.actionBars = actionBars;
            this.setActionBarsLayout(actionBars);
        };
        this.handleHeaderSlotChange = (event) => {
            this.hasHeader = dom.slotChangeHasAssignedElement(event);
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
        conditionalSlot.connectConditionalSlotComponent(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
    }
    async componentWillLoad() {
        await t9n.setUpMessages(this);
    }
    disconnectedCallback() {
        conditionalSlot.disconnectConditionalSlotComponent(this);
        this.disconnectSeparator();
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
    }
    componentDidLoad() {
        this.updateAriaValues();
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHeader() {
        return (index.h("div", { class: CSS$4.contentHeader, hidden: !this.hasHeader, key: "header" }, index.h("slot", { name: SLOTS$2.header, onSlotchange: this.handleHeaderSlotChange })));
    }
    render() {
        const { collapsed, position, initialContentWidth, initialContentHeight, contentWidth, contentWidthMax, contentWidthMin, contentHeight, contentHeightMax, contentHeightMin, resizable, layout, displayMode, } = this;
        const dir = dom.getElementDir(this.el);
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
        const separatorNode = !collapsed && allowResizing ? (index.h("div", { "aria-label": this.messages.resize, "aria-orientation": layout === "horizontal" ? "vertical" : "horizontal", "aria-valuemax": layout == "horizontal" ? contentHeightMax : contentWidthMax, "aria-valuemin": layout == "horizontal" ? contentHeightMin : contentWidthMin, "aria-valuenow": layout == "horizontal"
                ? (contentHeight ?? initialContentHeight)
                : (contentWidth ?? initialContentWidth), class: CSS$4.separator, key: "separator", onKeyDown: this.separatorKeyDown, ref: this.connectSeparator, role: "separator", tabIndex: 0, "touch-action": "none" })) : null;
        const getAnimationDir = () => {
            if (layout === "horizontal") {
                return position === "start"
                    ? resources.CSS_UTILITY.calciteAnimateInDown
                    : resources.CSS_UTILITY.calciteAnimateInUp;
            }
            else {
                const isStart = (dir === "ltr" && position === "end") || (dir === "rtl" && position === "start");
                return isStart ? resources.CSS_UTILITY.calciteAnimateInLeft : resources.CSS_UTILITY.calciteAnimateInRight;
            }
        };
        const contentNode = (index.h("div", { class: {
                [resources.CSS_UTILITY.rtl]: dir === "rtl",
                [CSS$4.content]: true,
                [CSS$4.contentOverlay]: displayMode === "overlay",
                [CSS$4.floatContent]: displayMode === "float-content" || displayMode === "float",
                [resources.CSS_UTILITY.calciteAnimate]: displayMode === "overlay",
                [getAnimationDir()]: displayMode === "overlay",
            }, hidden: collapsed, key: "content", ref: this.storeContentEl, style: style }, this.renderHeader(), index.h("div", { class: CSS$4.contentBody }, index.h("slot", null)), separatorNode));
        const actionBarNode = (index.h("slot", { key: "action-bar", name: SLOTS$2.actionBar, onSlotchange: this.handleActionBarSlotChange }));
        const mainNodes = [actionBarNode, contentNode];
        if (position === "end") {
            mainNodes.reverse();
        }
        return (index.h("div", { class: { [CSS$4.container]: true, [CSS$4.floatAll]: displayMode === "float-all" } }, mainNodes));
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
                ? math.clamp(roundedWidth, contentWidthMin, contentWidthMax)
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
        index.forceUpdate(this);
    }
    setContentHeight(height) {
        const { contentHeightMax, contentHeightMin } = this;
        const roundedWidth = Math.round(height);
        this.contentHeight =
            typeof contentHeightMax === "number" && typeof contentHeightMin === "number"
                ? math.clamp(roundedWidth, contentHeightMin, contentHeightMax)
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
    get el() { return index.getElement(this); }
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
 * v2.13.0
 */
const CSS$3 = {
    container: "container",
    content: "content",
};

const tabCss = ":host([selected]) section,:host([selected]) .container{display:block}:host{display:none;block-size:100%;inline-size:100%}:host([selected]){display:block;block-size:100%;inline-size:100%;overflow:auto}.content{box-sizing:border-box;padding-block:var(--calcite-internal-tab-content-block-padding)}.scale-s{--calcite-internal-tab-content-block-padding:var(--calcite-tab-content-block-padding, 0.25rem);font-size:var(--calcite-font-size--2);line-height:1rem}.scale-m{--calcite-internal-tab-content-block-padding:var(--calcite-tab-content-block-padding, 0.5rem);font-size:var(--calcite-font-size--1);line-height:1rem}.scale-l{--calcite-internal-tab-content-block-padding:var(--calcite-tab-content-block-padding, 0.625rem);font-size:var(--calcite-font-size-0);line-height:1.25rem}section,.container{display:none;block-size:100%;inline-size:100%}.container{outline-color:transparent}.container:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTabStyle0 = tabCss;

const Tab = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.guid = `calcite-tab-title-${guid.guid()}`;
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
        return (index.h(index.Host, { key: '5b445405fc60d4af5d48e2b4b42880a47a85a1ed', "aria-labelledby": this.labeledBy, id: id }, index.h("div", { key: '724b67e8c277d00f6408aa55f781ad8e91a34a5e', class: { [CSS$3.container]: true, [`scale-${this.scale}`]: true }, role: "tabpanel", tabIndex: this.selected ? 0 : -1 }, index.h("section", { key: '9a395308243994365184c0f91d8a16de357c9146', class: CSS$3.content }, index.h("slot", { key: '0cddbc27b9d793c83fa580b9aa9c9f915675ec72' })))));
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
        return Array.prototype.indexOf.call(dom.nodeListToArray(this.el.parentElement.children).filter((el) => el.matches("calcite-tab")), this.el);
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
    get el() { return index.getElement(this); }
};
Tab.style = CalciteTabStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
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
        index.registerInstance(this, hostRef);
        this.calciteTabChange = index.createEvent(this, "calciteTabChange", 6);
        this.calciteInternalTabNavSlotChange = index.createEvent(this, "calciteInternalTabNavSlotChange", 7);
        this.calciteInternalTabChange = index.createEvent(this, "calciteInternalTabChange", 6);
        this.effectiveDir = "ltr";
        this.lastScrollWheelAxis = "x";
        this.resizeObserver = observers.createObserver("resize", () => {
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
            const slottedElements = dom.slotChangeGetAssignedElements(event, "calcite-tab-title");
            slottedElements.forEach((child) => {
                this.intersectionObserver?.observe(child);
            });
            this.calciteInternalTabNavSlotChange.emit(slottedElements);
        };
        this.storeTabTitleWrapperRef = (el) => {
            this.tabTitleContainerEl = el;
            this.intersectionObserver = observers.createObserver("intersection", () => this.updateScrollingState(), {
                root: el,
                threshold: [0, 0.5, 1],
            });
        };
        this.scrollToTabTitles = (direction) => {
            index.readTask(() => {
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
            const focused = dom.focusElementInGroup(this.enabledTabTitles, el, destination);
            this.scrollTabTitleIntoView(focused, "instant");
            event.stopPropagation();
        };
        this.onTabTitleScroll = () => {
            this.updateScrollingState();
        };
        this.renderScrollButton = (overflowDirection) => {
            const { bordered, messages, hasOverflowingStartTabTitle, hasOverflowingEndTabTitle, scale } = this;
            const isEnd = overflowDirection === "end";
            return (index.h("div", { class: {
                    [CSS$2.scrollButtonContainer]: true,
                    [CSS$2.scrollBackwardContainerButton]: !isEnd,
                    [CSS$2.scrollForwardContainerButton]: isEnd,
                }, hidden: (isEnd && !hasOverflowingEndTabTitle) || (!isEnd && !hasOverflowingStartTabTitle), key: overflowDirection }, index.h("calcite-button", { appearance: bordered ? "outline-fill" : "transparent", "aria-label": isEnd ? messages.nextTabTitles : messages.previousTabTitles, class: {
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
        locale.connectLocalized(this);
        t9n.connectMessages(this);
    }
    async componentWillLoad() {
        const storageKey = `calcite-tab-nav-${this.storageId}`;
        if (localStorage && this.storageId && localStorage.getItem(storageKey)) {
            const storedTab = JSON.parse(localStorage.getItem(storageKey));
            this.selectedTabId = storedTab;
        }
        await t9n.setUpMessages(this);
    }
    componentDidLoad() {
        this.scrollTabTitleIntoView(this.selectedTitle, "instant");
    }
    componentWillRender() {
        const { parentTabsEl } = this;
        this.layout = parentTabsEl?.layout;
        this.bordered = parentTabsEl?.bordered;
        this.effectiveDir = dom.getElementDir(this.el);
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
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    render() {
        return (index.h(index.Host, { key: '9d1138405f2423bddcd9d1bb49dc756e582f8375', role: "tablist" }, index.h("div", { key: 'f8759781080b2a093f062d0b6172de6d3ea9355d', class: {
                [CSS$2.container]: true,
                [CSS$2.containerHasStartTabTitleOverflow]: !!this.hasOverflowingStartTabTitle,
                [CSS$2.containerHasEndTabTitleOverflow]: !!this.hasOverflowingEndTabTitle,
                [`scale-${this.scale}`]: true,
                [`position-${this.position}`]: true,
                [resources.CSS_UTILITY.rtl]: this.effectiveDir === "rtl",
            } }, this.renderScrollButton("start"), index.h("div", { key: 'eda664514cb5c89136184c6e8f29e50ce7c9b56b', class: {
                [CSS$2.tabTitleSlotWrapper]: true,
            }, onScroll: this.onTabTitleScroll, onWheel: this.onTabTitleWheel, ref: this.storeTabTitleWrapperRef }, index.h("slot", { key: '0c5a40eac082662a2c2b032d977900b91f122214', onSlotchange: this.onSlotChange })), this.renderScrollButton("end"))));
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
        index.readTask(() => {
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
        t9n.updateMessages(this, this.effectiveLocale);
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
        return parseInt(scale === "s" ? core.calciteSize24 : scale === "m" ? core.calciteSize32 : core.calciteSize44);
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
        return dom.filterDirectChildren(this.el, "calcite-tab-title");
    }
    get enabledTabTitles() {
        return dom.filterDirectChildren(this.el, "calcite-tab-title:not([disabled])").filter((tabTitle) => !tabTitle.closed);
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
    get el() { return index.getElement(this); }
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
 * v2.13.0
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
        index.registerInstance(this, hostRef);
        this.calciteTabsActivate = index.createEvent(this, "calciteTabsActivate", 6);
        this.calciteInternalTabsActivate = index.createEvent(this, "calciteInternalTabsActivate", 6);
        this.calciteTabsClose = index.createEvent(this, "calciteTabsClose", 6);
        this.calciteInternalTabsClose = index.createEvent(this, "calciteInternalTabsClose", 6);
        this.calciteInternalTabsFocusNext = index.createEvent(this, "calciteInternalTabsFocusNext", 6);
        this.calciteInternalTabsFocusPrevious = index.createEvent(this, "calciteInternalTabsFocusPrevious", 6);
        this.calciteInternalTabsFocusFirst = index.createEvent(this, "calciteInternalTabsFocusFirst", 6);
        this.calciteInternalTabsFocusLast = index.createEvent(this, "calciteInternalTabsFocusLast", 6);
        this.calciteInternalTabTitleRegister = index.createEvent(this, "calciteInternalTabTitleRegister", 6);
        this.calciteInternalTabIconChanged = index.createEvent(this, "calciteInternalTabIconChanged", 6);
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.closeClickHandler = () => {
            this.closeTabTitleAndNotify();
        };
        /** watches for changing text content */
        this.mutationObserver = observers.createObserver("mutation", () => this.updateHasText());
        this.resizeObserver = observers.createObserver("resize", () => {
            this.calciteInternalTabIconChanged.emit();
        });
        this.guid = `calcite-tab-title-${guid.guid()}`;
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
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        this.setupTextContentObserver();
        this.parentTabsEl = this.el.closest("calcite-tabs");
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
        // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
        document.body?.dispatchEvent(new CustomEvent("calciteTabTitleUnregister", {
            detail: this.el,
        }));
        this.resizeObserver?.disconnect();
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
    }
    async componentWillLoad() {
        await t9n.setUpMessages(this);
        if (browser.isBrowser()) {
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
        const iconStartEl = (index.h("calcite-icon", { key: '367d0a3590f1b47a36fcef27a4c361b2b738769a', class: { [CSS$1.titleIcon]: true, [CSS$1.iconStart]: true }, flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: component.getIconScale(this.scale) }));
        const iconEndEl = (index.h("calcite-icon", { key: 'd41dab345260f907ad3b00538117c576856672fd', class: { [CSS$1.titleIcon]: true, [CSS$1.iconEnd]: true }, flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, scale: component.getIconScale(this.scale) }));
        return (index.h(index.Host, { key: 'f5f5339ebcead5f63154d4b8f562782d20e30b06', "aria-controls": this.controls, "aria-selected": dom.toAriaBoolean(this.selected), id: id, role: "tab", tabIndex: this.selected && !this.disabled ? 0 : -1 }, index.h(interactive.InteractiveContainer, { key: '0115c7e0367be91f3a9014243fb99cecd48d5f79', disabled: this.disabled }, index.h("div", { key: '7303b10302cfc93c03386036d98aa46a6b74afa7', class: {
                [CSS$1.container]: true,
                [CSS$1.containerBottom]: this.position === "bottom",
                [CSS$1.iconPresent]: !!this.iconStart || !!this.iconEnd,
                [CSS$1.scale(this.scale)]: true,
            }, hidden: closed, ref: (el) => this.resizeObserver?.observe(el) }, index.h("div", { key: 'af603e50b1a853f3e4ca35357ae7778ca9bdaafb', class: { [CSS$1.content]: true, [CSS$1.contentHasText]: this.hasText } }, this.iconStart ? iconStartEl : null, index.h("slot", { key: 'a650492336b0f78f11c0d534351b0ab570dd1db8' }), this.iconEnd ? iconEndEl : null), this.renderCloseButton(), index.h("div", { key: '8d8a0438c867cdf0c2642b9a9bc7ce697aabb871', class: CSS$1.selectedIndicator })))));
    }
    renderCloseButton() {
        const { closable, messages } = this;
        return closable ? (index.h("button", { "aria-label": messages.close, class: CSS$1.closeButton, disabled: false, key: CSS$1.closeButton, onClick: this.closeClickHandler, ref: (el) => (this.closeButtonEl = el), title: messages.close, type: "button" }, index.h("calcite-icon", { icon: ICONS$1.close, scale: component.getIconScale(this.scale) }))) : null;
    }
    async componentDidLoad() {
        this.calciteInternalTabTitleRegister.emit(await this.getTabIdentifier());
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
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
                if (dom.getElementDir(this.el) === "ltr") {
                    this.calciteInternalTabsFocusNext.emit();
                }
                else {
                    this.calciteInternalTabsFocusPrevious.emit();
                }
                break;
            case "ArrowLeft":
                event.preventDefault();
                if (dom.getElementDir(this.el) === "ltr") {
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
        return Array.prototype.indexOf.call(dom.nodeListToArray(this.el.parentElement.children).filter((el) => el.matches("calcite-tab-title")), this.el);
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
        t9n.updateMessages(this, this.effectiveLocale);
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
    get el() { return index.getElement(this); }
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
 * v2.13.0
 */
const SLOTS$1 = {
    titleGroup: "title-group",
};

const tabsCss = ":host{display:flex;flex-direction:column}:host([bordered]){box-shadow:inset 0 1px 0 var(--calcite-color-border-1);background-color:var(--calcite-color-foreground-1)}:host([bordered]) section{border-width:1px;border-style:solid;border-color:var(--calcite-color-border-1)}:host([bordered][position=bottom]){box-shadow:inset 0 1px 0 var(--calcite-color-border-1), inset 0 -1px 0 var(--calcite-color-border-1)}:host([bordered]:not([position=bottom])) ::slotted(calcite-tab-nav){margin-block-end:-1px}:host([bordered][scale=s]) section{padding:0.75rem}:host([bordered][scale=m]) section{padding:0.5rem}:host([bordered][scale=l]) section{padding:1rem}:host([position=bottom]){flex-direction:column-reverse}section{display:flex;flex-grow:1;overflow:hidden;border-block-start-width:1px;border-block-start-color:var(--calcite-color-border-1);border-block-start-style:solid}:host([position=bottom]) section{flex-direction:column-reverse;border-block-start-width:0px;border-block-end-width:1px;border-block-end-color:var(--calcite-color-border-1)}:host([position=bottom]:not([bordered])) section{border-block-end-style:solid}@media (forced-colors: active){:host([bordered]) section{border-block-start-width:0px;border-block-end-width:1px}:host([position=bottom][bordered]) section{border-block-start-width:1px;border-block-end-width:0px}}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTabsStyle0 = tabsCss;

const Tabs = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.defaultSlotChangeHandler = (event) => {
            this.tabs = dom.slotChangeGetAssignedElements(event, "calcite-tab");
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
        const tabs = dom.getSlotAssignedElements(this.slotEl, "calcite-tab");
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
        return (index.h(index.Fragment, { key: 'd06e888984e54b6b91b3345b42c217d322b46a64' }, index.h("slot", { key: 'd42da82a176cc1ad492cf1c548b96fc0ca53bc73', name: SLOTS$1.titleGroup }), index.h("section", { key: '21e944ce899b9bb2507fc9d9be81d8faa4a1a610' }, index.h("slot", { key: '25d4cd299d8529392f6b01deefd3356f8cd6050b', onSlotchange: this.defaultSlotChangeHandler, ref: this.setDefaultSlotRef }))));
    }
    get el() { return index.getElement(this); }
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
 * v2.13.0
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
 * v2.13.0
 */
function getScreenReaderText(item, status, valueList) {
    const { items, messages } = valueList;
    const total = items.length;
    const position = sharedListRender.getItemIndex(valueList, item) + 1;
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

logger.logger.deprecated("component", {
    name: "value-list",
    removalVersion: 3,
    suggested: "list",
});
const ValueList = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteListChange = index.createEvent(this, "calciteListChange", 6);
        this.calciteListOrderChange = index.createEvent(this, "calciteListOrderChange", 6);
        this.calciteListFilter = index.createEvent(this, "calciteListFilter", 6);
        this.lastSelectedItem = null;
        this.mutationObserver = observers.createObserver("mutation", sharedListRender.mutationObserverCallback.bind(this));
        this.handleSelector = `.${CSS.handle}`;
        this.dragSelector = "calcite-value-list-item";
        this.setFilterEl = (el) => {
            this.filterEl = el;
        };
        this.setFilteredItems = (filteredItems) => {
            this.filteredItems = filteredItems;
        };
        this.deselectRemovedItems = sharedListRender.deselectRemovedItems.bind(this);
        this.deselectSiblingItems = sharedListRender.deselectSiblingItems.bind(this);
        this.selectSiblings = sharedListRender.selectSiblings.bind(this);
        this.handleFilter = sharedListRender.handleFilter.bind(this);
        this.handleFilterEvent = sharedListRender.handleFilterEvent.bind(this);
        this.getItemData = sharedListRender.getItemData.bind(this);
        this.keyDownHandler = (event) => {
            if (event.defaultPrevented) {
                return;
            }
            const { handle, item } = getHandleAndItemElement(event);
            if (handle && !item.handleActivated && event.key === " ") {
                this.updateScreenReaderText(getScreenReaderText(item, "commit", this));
            }
            if (!handle || !item.handleActivated) {
                sharedListRender.keyDownHandler.call(this, event);
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
            const nextIndex = sharedListRender.moveItemIndex(this, item, event.key === "ArrowUp" ? "up" : "down");
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
            requestAnimationFrame(() => dom.focusElement(handle));
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
        sharedListRender.initialize.call(this);
        sharedListRender.initializeObserver.call(this);
        this.setUpSorting();
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        await t9n.setUpMessages(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
        sharedListRender.handleInitialFilter.call(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        sortableComponent.disconnectSortableComponent(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        sharedListRender.cleanUpObserver.call(this);
    }
    calciteListFocusOutHandler(event) {
        sharedListRender.calciteListFocusOutHandler.call(this, event);
    }
    calciteListItemRemoveHandler(event) {
        sharedListRender.removeItem.call(this, event);
    }
    calciteListItemChangeHandler(event) {
        sharedListRender.calciteListItemChangeHandler.call(this, event);
    }
    calciteInternalListItemPropsChangeHandler(event) {
        event.stopPropagation();
        this.setUpFilter();
    }
    calciteInternalListItemValueChangeHandler(event) {
        sharedListRender.calciteInternalListItemValueChangeHandler.call(this, event);
        event.stopPropagation();
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    onGlobalDragStart() {
        sharedListRender.cleanUpObserver.call(this);
    }
    onGlobalDragEnd() {
        sharedListRender.initializeObserver.call(this);
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
        sharedListRender.setUpItems.call(this, "calcite-value-list-item");
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
        sortableComponent.connectSortableComponent(this);
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
        await loadable.componentFocusable(this);
        return sharedListRender.setFocus.call(this, focusId);
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
        return (index.h(index.Host, { key: 'b9e38d57ffd1d2b686264d87f809e712c33c5cc5', "aria-busy": dom.toAriaBoolean(this.loading), onBlur: this.handleBlur, onFocusin: this.handleFocusIn, onKeyDown: this.keyDownHandler, role: "menu" }, index.h(sharedListRender.List, { key: '18d18babe0959692bebdb17ec427b53fc4697b08', props: this })));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
ValueList.style = CalciteValueListStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
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

logger.logger.deprecated("component", {
    name: "value-list-item",
    removalVersion: 3,
    suggested: "list-item",
});
const ValueListItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteListItemChange = index.createEvent(this, "calciteListItemChange", 6);
        this.calciteListItemRemove = index.createEvent(this, "calciteListItemRemove", 7);
        this.calciteValueListItemDragHandleBlur = index.createEvent(this, "calciteValueListItemDragHandleBlur", 6);
        this.pickListItem = null;
        this.guid = `calcite-value-list-item-${guid.guid()}`;
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
        conditionalSlot.connectConditionalSlotComponent(this);
    }
    disconnectedCallback() {
        conditionalSlot.disconnectConditionalSlotComponent(this);
    }
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
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
        await loadable.componentFocusable(this);
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
        const hasActionsEnd = dom.getSlotted(el, SLOTS.actionsEnd);
        return hasActionsEnd ? (index.h("slot", { name: SLOTS.actionsEnd, slot: resources$2.SLOTS.actionsEnd })) : null;
    }
    renderActionsStart() {
        const { el } = this;
        const hasActionsStart = dom.getSlotted(el, SLOTS.actionsStart);
        return hasActionsStart ? (index.h("slot", { name: SLOTS.actionsStart, slot: resources$2.SLOTS.actionsStart })) : null;
    }
    renderHandle() {
        const { icon, iconFlipRtl } = this;
        if (icon === resources$1.ICON_TYPES.grip) {
            return (index.h("span", { class: {
                    [resources$2.CSS.handle]: true,
                    [resources$2.CSS.handleActivated]: this.handleActivated,
                }, "data-js-handle": true, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown, ref: (el) => (this.handleEl = el), role: "button", tabindex: "0" }, index.h("calcite-icon", { flipRtl: iconFlipRtl, icon: ICONS.drag, scale: "s" })));
        }
    }
    render() {
        return (index.h(index.Host, { key: '2fc2a1a70b75c2a812f14391915c06c852db8906', id: this.el.id || this.guid }, index.h(interactive.InteractiveContainer, { key: '7bcc26a8f85923865a318dbdf31954a62035b853', disabled: this.disabled }, this.renderHandle(), index.h("calcite-pick-list-item", { key: 'abdbbafe6d426da62e39584e85111811beae719b', description: this.description, deselectDisabled: this.deselectDisabled, disabled: this.disabled, label: this.label, metadata: this.metadata, nonInteractive: this.nonInteractive, onCalciteListItemChange: this.handleSelectChange, ref: this.getPickListRef, removable: this.removable, selected: this.selected, value: this.value }, this.renderActionsStart(), this.renderActionsEnd()))));
    }
    get el() { return index.getElement(this); }
};
ValueListItem.style = CalciteValueListItemStyle0;

const jsonEditorCss = ":host{display:block}.editor-container{position:relative;height:100%}.editor-controls{height:2.75rem;padding-right:0.5rem;background-color:#F4F4F4}.editor-buttons{float:right}html[dir=rtl] .editor-buttons{float:left}.edit-error-flag{padding-top:0.5rem;color:red;visibility:hidden}.edit-button{padding-inline-start:0.5rem}.editor-text{width:100%;overflow-y:auto;background-color:#FFFFFF}.edit-width{width:100%}.edit-parent{box-sizing:border-box;width:100%;height:calc(100% - 46px)}.json-edit-container{height:100%;width:100%;border:1px #808080 solid}.padding-right{padding-inline-end:0.125rem}.btn{margin-bottom:1rem;display:flex;align-content:center;height:25px;width:120px}.select-ctrl{margin-bottom:1rem}.all-edits{margin-top:4rem}.floating-title{font-size:2rem;z-index:100;position:absolute;left:0.5rem;pointer-events:none}.floating-title-button{pointer-events:auto}.json-editor-position1{position:absolute;left:0px;top:0px;margin:0px;height:100%;width:100%;overflow:hidden;padding:0px;max-height:100% !important}.json-editor-position2a{position:absolute;left:0px;top:0px;margin:0px;height:100%;width:50%;overflow:hidden;padding:0px;max-height:100% !important}.json-editor-position2b{position:absolute;right:0px;top:0px;margin:0px;height:100%;width:50%;overflow:hidden;padding:0px;max-height:100% !important}";
const JsonEditorStyle0 = jsonEditorCss;

const JsonEditor = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.hasChanges = false;
        this.hasErrors = false;
        this.instanceid = "";
        this.value = "";
    }
    get el() { return index.getElement(this); }
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
        return (index.h(index.Host, { key: '0c7531c8c816eb9be80d357b19b568ccdb22c407' }, index.h("div", { key: '866f82b68c2a750edfc80d801e4ea95a3f655100', id: `${this.instanceid}-editor-container`, class: "editor-container padding-right" }, index.h("div", { key: '5b9f15641f6a26daeb3847d8ef75c76b8be44fc5', class: "editor-controls" }, index.h("div", { key: 'd1e91eaa242ccd23d5dc1386b6a58d2fafeb4083', class: "editor-buttons" }, index.h("calcite-icon", { key: 'd9364f7dfdbc22a414b4711c8a22e145b533998e', id: `${this.instanceid}-errorFlag`, icon: "exclamation-mark-triangle", title: this._translations.errorFlag, scale: "s", class: "edit-error-flag" }), index.h("calcite-button", { key: '29750fc7cedf1f9caf556df3ff84dc45d6b922b9', id: `${this.instanceid}-undo`, color: "blue", appearance: "solid", title: this._translations.undo, onClick: () => this._undo(), scale: "s", class: "edit-button" }, index.h("calcite-icon", { key: 'c95008b3fccb8bc33f01eb1bd204c84141850981', icon: "undo", scale: "s" })), index.h("calcite-button", { key: '49ac9ee70c58954f6dee34524f4c7ab6fa0d7a49', id: `${this.instanceid}-redo`, color: "blue", appearance: "solid", title: this._translations.redo, onClick: () => this._redo(), scale: "s", class: "edit-button" }, index.h("calcite-icon", { key: '2170c36d0fd236c989222991353324d50afa8ac0', icon: "redo", scale: "s" })), index.h("calcite-button", { key: 'c6e1a0f84fac6fb02d2590cc7b32aefffbc06d25', id: `${this.instanceid}-diff`, color: "blue", appearance: "solid", title: this._translations.diff, onClick: () => this._toggleEditor(), scale: "s", class: "edit-button" }, index.h("calcite-icon", { key: '88443cfd2a8888447acc75588ecff7938ade5273', icon: "compare", scale: "s" })), index.h("calcite-button", { key: '42dcd8f63600d4ddb77eaedd529321999cf537b3', id: `${this.instanceid}-search`, appearance: "outline", color: "blue", title: this._translations.search, onClick: () => this._search(), scale: "s", class: "edit-button" }, index.h("calcite-icon", { key: '31e8ced3f14f1475c62133fbd7730e34b2bc4028', icon: "search", scale: "s" })), index.h("calcite-button", { key: '769b268d7476f3fe1a8623e9432cfae56602db0c', id: `${this.instanceid}-reset`, color: "blue", appearance: "solid", disabled: true, title: this._translations.cancelEdits, onClick: () => this._reset(), scale: "s", class: "edit-button" }, index.h("calcite-icon", { key: '4a8ead1dbf8fefe8b4106a0f6f9c42fb5b875cd2', icon: "reset", scale: "s" })))), index.h("div", { key: '98f29030a0fa0ecbce0d165840a30edd655ba249', class: "edit-parent" }, index.h("div", { key: '1441e32a184bc24f2a0a25fcb855c41b40bd0cec', id: `${this.instanceid}-container`, class: "json-edit-container" }), index.h("div", { key: 'f0cf0a3bd11d3f8102c4cc8695ac1743bac36bbb', id: `${this.instanceid}-diff-container`, class: "json-edit-container display-none" })))));
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
        const translations = await locale$1.getLocaleComponentStrings(this.el);
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
        index.registerInstance(this, hostRef);
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
    get el() { return index.getElement(this); }
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
        this.itemEdit = solutionStore.state.getItemInfo(this.itemId);
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
        return (index.h(index.Host, { key: 'fd7cc19c2f682b43c71d43d1ec1313348345b415' }, index.h("div", { key: 'd38fbcb57a2cf536b99a50d73f7cb67791774419', class: "parent-container" }, index.h("div", { key: 'e6b97716b8ae90de71af758b07b055adc6d2a4d4', class: "inputBottomSeparation" }, index.h("calcite-input", { key: '6bb7bc4c0cb1eb082a3862582e2a1c72c8499d48', id: "item-title", value: this.itemDetails.title })), index.h("div", { key: 'daa80a28b1ee9a282048d57c3d1583fb0c1bd6c4', class: "inputBottomSeparation" }, index.h("input", { key: 'afc61173cfa6545e688775b0aa439b11cee064ca', accept: ".jpg,.gif,.png,image/jpg,image/gif,image/png", class: "display-none", onChange: (event) => (this._updateThumbnail(event)), ref: (el) => (this.browseForThumbnail = el), type: "file" }), index.h("button", { key: '8bdedcdf27d0ee7d0db030404940a4a6c7f6f586', class: "font-size--3 btn-link inline-block trailer-quarter", onClick: () => this._getThumbnail() }, index.h("svg", { key: 'e08bd937cdadd627a3a618a112cf1e617718deb4', class: "icon-inline icon-inline--on-left", height: "16", viewBox: "0 0 16 16", width: "16" }, index.h("path", { key: '6047587bce5ffa4b6530c545d36f78a7f9deeebc', d: "M14.792 2.666l-1.414-1.413a.965.965 0 0 0-1.385-.03l-1.444 1.444-8.763 8.72L.03 15.481a.371.371 0 0 0 .488.488l4.096-1.756 8.763-8.72-.001-.001.002.002 1.443-1.444a.965.965 0 0 0-.03-1.385zM1.569 14.431l.554-1.293.74.739zm2.338-.924l-1.414-1.414 7.963-7.92 1.414 1.415zm8.67-8.626l-1.413-1.414 1.29-1.29a.306.306 0 0 1 .433 0l.981.98a.306.306 0 0 1 0 .433z" })), this._translations.editThumbnail), index.h("div", { key: '44f12983273cfcda9720f34daf4bfa85952de2f1', class: "flex" }, index.h("div", { key: 'cb5d60f3164874dfc964b5727be89c7a37c31dec', class: "img-container", ref: (el) => (this.thumbnailContainer = el) }, index.h("img", { key: '0b1c39af99a3ecb3e558a77bd91ed0a751756e32', class: "scale-down", height: "133", id: "item-thumbnail", ref: (el) => (this.thumbnail = el), width: "200" })), index.h("div", { key: '751954b3200fe4133dca864212aba924bb547817', class: "snippet-count-container" }, index.h("calcite-input", { key: '071d1595f9b71b45ed12ee3cff8b5613e96acae7', id: "item-snippet", maxLength: 250, type: "textarea", value: this.itemDetails.snippet }), index.h("label", { key: '69238efe97f605880cde5f59dd967414c08b94a2', class: "font-size--3", id: "item-snippet-count", ref: (el) => (this.itemSnippetCount = el) })))), index.h("calcite-label", { key: 'd94607358c364fba61bc781b79f4919f50082db2' }, this._translations.description, index.h("label", { key: 'dbc9f48ee0ca4ad0150629635d027998b17101af', id: "item-description-label" }, index.h("calcite-input", { key: '152612af16b43f8ed4ad98405c885c11fec6cad7', id: "item-description", type: "textarea", value: this.itemDetails.description }))), index.h("calcite-label", { key: '0bec1e2c5464da93ebd49f0790cd573ef28e6e00' }, this._translations.tags, index.h("label", { key: '03957c08d3a9bc3a2707e65ae3a8d2870449b54f', id: "item-tags-label" }, index.h("calcite-input", { key: '690cb769d8bb784ef33d30f43d4abb3b8b836894', id: "item-tags", value: (this.itemDetails.tags && Array.isArray(this.itemDetails.tags) ? this.itemDetails.tags : [this.itemDetails.tags]).join(",") }))), this.itemType !== "Group" ? index.h("calcite-label", null, this._translations.credits, index.h("label", { id: "item-credits-label" }, index.h("calcite-input", { id: "item-credits", value: this.itemDetails.accessInformation }))) : null, this.itemType !== "Group" ? index.h("calcite-label", null, index.h("label", { id: "item-terms-label" }, this._translations.termsOfUse, index.h("calcite-input", { id: "item-terms", type: "textarea", value: this.itemDetails.licenseInfo }))) : null)));
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
        this.itemEdit = solutionStore.state.getItemInfo(this.itemId);
        this.itemEdit.item = this.itemDetails;
        solutionStore.state.setItemInfo(this.itemEdit);
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
                this.itemEdit = solutionStore.state.getItemInfo(this.itemId);
                this.itemEdit.thumbnail = files[0];
                solutionStore.state.replaceItemThumbnail(this.itemEdit);
            }
        }
    }
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    async _getTranslations() {
        const translations = await locale$1.getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
};
SolutionItemDetails.style = SolutionItemDetailsStyle0;

const solutionItemSharingCss = ":host{display:block}.container-border{padding:1rem}.icon-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";
const SolutionItemSharingStyle0 = solutionItemSharingCss;

const SolutionItemSharing = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.groupId = "";
        this._translations = undefined;
        this.sharing = [];
    }
    get el() { return index.getElement(this); }
    itemIdWatchHandler() {
        const itemEdit = solutionStore.state.getItemInfo(this.groupId);
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
        return (index.h(index.Host, { key: '3b94a68c01079f717b1ff38b82f946a32cfcb3a4' }, index.h("div", { key: 'e2fd74849f827a5e9756182ead2c23b3ef9584b9', class: "container-border" }, index.h("calcite-label", { key: '4ac7e9adf98368d5f8b985519a8fd9d1ab24d5d6' }, this._translations.groupInfo), this._renderItems(this.sharing))));
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
                return (index.h("calcite-label", { layout: "inline" }, index.h("calcite-switch", { checked: item.shareItem, id: item.id, name: "setting", onCalciteSwitchChange: (event) => this._updateItem(event), scale: "m", value: "enabled" }), index.h("solution-item-icon", { type: item.type, typeKeywords: item.typeKeywords }), index.h("span", { class: "icon-text", title: item.title }, item.title)));
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
                const itemEdit = solutionStore.state.getItemInfo(id);
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
                solutionStore.state.setItemInfo(itemEdit);
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
        const translations = await locale$1.getLocaleComponentStrings(this.el);
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
        index.registerInstance(this, hostRef);
        this.organizationVariableSelected = index.createEvent(this, "organizationVariableSelected", 7);
        this.value = "";
        this._organizationVariables = [];
        this._translations = undefined;
    }
    get el() { return index.getElement(this); }
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
        return (index.h(index.Host, { key: '0dd925da12c0eb9861637e78d74c75ad4a23c9f3' }, index.h("div", { key: '324cfdc588fce6ee5a69b7cd54956a0ab0ef0adf' }, index.h("h4", { key: '2fca69530272a3f0630b86d36bbc78ec651c45d1', class: "org-var-header" }, this._translations.orgVariables)), index.h("div", { key: '6f05088ebfaf50e4516c634f1a016275f4228c45', class: "container-border" }, index.h("calcite-tree", { key: '22585bb1a7cae978c3fbf7301d33b81b4fffb540', id: "variable-label" }, this._renderHierarchy(this._organizationVariables)))));
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
            return (index.h("calcite-tree-item", { onClick: () => this._treeItemSelected(obj.id, obj.value) }, obj.title));
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
        const translations = await locale$1.getLocaleComponentStrings(this.el);
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
        index.registerInstance(this, hostRef);
        this.authentication = undefined;
        this.itemId = "";
        this.resourceFilePaths = [];
        this.resources = [];
        this._translations = undefined;
    }
    get el() { return index.getElement(this); }
    itemIdWatchHandler() {
        const item = solutionStore.state.getItemInfo(this.itemId);
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
        return (index.h(index.Host, { key: '95659a6d3572354aef8a879694e41ab6821ca506' }, index.h("div", { key: 'fa34097cf27797000558b4ddb001ba7e89d8fe71', class: "resource-item" }, index.h("div", { key: 'a7797a17c4cef3e7189157b141fdbf5c3b34143c', class: "margin-bottom-1" }, index.h("calcite-button", { key: 'd6d70a4240348a12b2f4847abc3806ef46064871', appearance: "solid", class: "resource-button", color: "blue", onClick: () => this._addNewResource() }, this._translations.addResource), index.h("calcite-button", { key: 'c9a73c13a223b8120965bcf092ef63c6a9443f43', appearance: "solid", color: "blue", disabled: !hasValidResources, onClick: () => this._downloadAll() }, this._translations.downloadAll)), index.h("div", { key: '0eb74fd024fc421b94391984b842a4a7ffd491c5', class: "resources-container", style: { display: hasValidResources ? "inherit" : "none" } }, this._renderResourceList()))));
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
        return (index.h("calcite-value-list", { multiple: true }, this.resourceFilePaths.reduce((prev, cur) => {
            if (cur.type !== solutionResource.EFileType.Thumbnail) {
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
        const resettable = resource.updateType === interfaces.EUpdateType.Remove;
        const fullname = resource.folder ? resource.folder + "/" + resource.filename : resource.filename;
        return (index.h("calcite-value-list-item", { class: resettable ? "disabled" : "", label: fullname, nonInteractive: true, value: resource.url }, index.h("calcite-action-group", { "expand-disabled": "true", layout: "horizontal", slot: "actions-end" }, index.h("calcite-action", { disabled: resettable, icon: "download", label: this._translations.download, onClick: () => this._download(resource.url, resource.filename), scale: "m", text: this._translations.download, title: this._translations.download }), index.h("calcite-action", { disabled: resettable, icon: "upload-to", label: this._translations.update, onClick: () => this._upload(resource), scale: "m", text: this._translations.update, title: this._translations.update }), index.h("calcite-action", { disabled: resettable, icon: "trash", label: this._translations.delete, onClick: () => this._delete(resource), scale: "m", text: this._translations.delete, title: this._translations.delete }), resettable ? index.h("calcite-action", { icon: "reset", label: this._translations.reset, onClick: () => this._reset(resource.filename), scale: "m", text: this._translations.reset, title: this._translations.reset }) : index.h("div", { class: "display-none" }))));
    }
    /**
     * Adds the name to the deleted array so it will be skipped while rendering
     *  but still exist if the user chooses to reset
     *
     * @param resource the resource to be updated
     */
    _delete(resource) {
        resource.updateType = interfaces.EUpdateType.Remove;
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
                    p.updateType = interfaces.EUpdateType.None;
                }
                return p;
            }) :
            // Undo cancelling the adding of a resource
            this.resourceFilePaths = this.resourceFilePaths.map(p => {
                if (p.filename === name) {
                    p.updateType = interfaces.EUpdateType.Add;
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
            resourcePath.updateType = interfaces.EUpdateType.Update;
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
                        type: solutionResource.EFileType.Data,
                        folder: undefined,
                        filename,
                        blob: files[0],
                        updateType: interfaces.EUpdateType.Add
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
        const item = solutionStore.state.getItemInfo(this.itemId);
        item.resourceFilePaths = this.resourceFilePaths;
        solutionStore.state.setItemInfo(item);
    }
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    async _getTranslations() {
        const translations = await locale$1.getLocaleComponentStrings(this.el);
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
    get el() { return index.getElement(this); }
    itemIdWatchHandler() {
        this._initializing = true;
        this.value = JSON.stringify(this.instanceid === "data"
            ? solutionStore.state.getItemInfo(this.itemId).data
            : solutionStore.state.getItemInfo(this.itemId).properties, null, 2);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
                        const itemEdit = solutionStore.state.getItemInfo(itemId);
                        if (instanceId === "data") {
                            itemEdit.data = JSON.parse(contents);
                        }
                        else {
                            itemEdit.properties = JSON.parse(contents);
                        }
                        solutionStore.state.setItemInfo(itemEdit);
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
        return (index.h(index.Host, { key: '3e0a532158fffbba07faee43152573eb3577da84' }, index.h("div", { key: '5631eb64e45d31465361491e9585c8eddd04dce7', class: "solution-data-container" }, index.h("calcite-shell", { key: '9b065784804b86fa1c09c9d7e5f173a6ea793883', class: "light var-container", dir: "ltr" }, index.h("calcite-panel", { key: '254dcf1c48812c98a69bac8e7b6ca91a39eb9cff', class: "json-editor" }, index.h("div", { key: '86f686a03298bb06b8b855ae59a66e42cec25ad4', class: "solution-data-child-container calcite-match-height" }, index.h("json-editor", { key: '0549a48a16bb94ed7be3064f4b622b1a10563bfd', class: "solution-data-editor-container", instanceid: this.itemId + "|" + this.instanceid, value: this.value }))), index.h("calcite-shell-panel", { key: 'a3879f3d3b95d2878a5ec98265a6a120c78366f6', "height-scale": "l", position: "end", slot: "contextual-panel", "width-scale": "xs" }, index.h("div", { key: '4e8a2206eb7e57e8beb5e854f3cd66d7bae96101', class: this.varsOpen ? "solution-data-child-container" : "solution-data-child-container-collapsed" }, index.h("calcite-button", { key: '180bb9e0a1aff223625e3979930a9904dc778a1d', appearance: "transparent", class: "collapse-btn", "icon-start": this.varsOpen ? "chevrons-right" : "chevrons-left", id: "collapse-vars", onClick: () => this._toggleVars(), scale: "s", title: this.varsOpen ? this._translations.collapse : this._translations.expand }), index.h("div", { key: 'a1064c394bb1a9c95493a052057bdfb2ccc7b20a', class: this.varsOpen ? "org-vars" : "org-vars display-none", id: "orgVars" }, index.h("solution-organization-variables", { key: '19ef108d689b875a329a22f0729f34bd3c5edbd1', value: this.organizationVariables })), index.h("div", { key: '3671681ffde2ef2aae1a84c608fbe08c0f4e7bcc', class: this.varsOpen ? "sol-vars" : "sol-vars display-none", id: "solVars" }, index.h("solution-variables", { key: '7bdbb7baedf02ff299e620741995a393c4bf976d', value: this.solutionVariables }))))))));
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
        const translations = await locale$1.getLocaleComponentStrings(this.el);
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
        index.registerInstance(this, hostRef);
        this.solutionVariableSelected = index.createEvent(this, "solutionVariableSelected", 7);
        this.value = "";
        this._solutionVariables = [];
        this._translations = undefined;
    }
    get el() { return index.getElement(this); }
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
        return (index.h(index.Host, { key: 'a600c4dc88ee4ea3f9d7810695f71283f834933b' }, index.h("div", { key: 'c5c2abd0d19c778366c04dfd6b04f26bcb86b59b' }, index.h("h4", { key: '087db039abd818f71838c88ef09eafc46d18b5c8', class: "org-var-header" }, this._translations.solVariables)), index.h("div", { key: 'd524981a512342d18d616137c7951f7c0f3f870b', class: "container-border" }, index.h("calcite-tree", { key: '4630d4aa5a35d3e3a173e3aaae9b35b0dd636b4f', id: "variable-label" }, this._renderHierarchy(this._solutionVariables)))));
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
            return obj.dependencies && obj.dependencies.length > 0 ? (index.h("calcite-tree-item", { onClick: (evt) => this._toggleExpand(evt) }, index.h("solution-item-icon", { type: obj.type }), index.h("span", { class: "icon-text", title: obj.title }, obj.title), index.h("calcite-tree", { slot: "children" }, this._renderHierarchy(obj.dependencies)))) : (index.h("calcite-tree-item", { onClick: () => this._treeItemSelected(obj.id, obj.value) }, obj.title));
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
        const translations = await locale$1.getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
    static get watchers() { return {
        "value": ["valueWatchHandler"]
    }; }
};
SolutionVariables.style = SolutionVariablesStyle0;

exports.calcite_shell_panel = ShellPanel;
exports.calcite_tab = Tab;
exports.calcite_tab_nav = TabNav;
exports.calcite_tab_title = TabTitle;
exports.calcite_tabs = Tabs;
exports.calcite_value_list = ValueList;
exports.calcite_value_list_item = ValueListItem;
exports.json_editor = JsonEditor;
exports.solution_item_details = SolutionItemDetails;
exports.solution_item_sharing = SolutionItemSharing;
exports.solution_organization_variables = SolutionOrganizationVariables;
exports.solution_resource_item = SolutionResourceItem;
exports.solution_template_data = SolutionTemplateData;
exports.solution_variables = SolutionVariables;
