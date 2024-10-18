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
const loadable = require('./loadable-1c888c87.js');
const locale = require('./locale-da840314.js');
const observers = require('./observers-18d87cb5.js');
const t9n = require('./t9n-ed5c03a7.js');
const ExpandToggle = require('./ExpandToggle-2cdd9a8e.js');
const resources = require('./resources-18f799c7.js');
const debounce = require('./debounce-7f1e04d6.js');
require('./guid-e84a8375.js');
require('./browser-333a21c5.js');
require('./key-47c9469a.js');
require('./resources-9c07e2ea.js');
require('./resources-b3dc59f7.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    actionGroupEnd: "action-group--end",
};
const SLOTS = {
    actionsEnd: "actions-end",
    bottomActions: "bottom-actions",
    expandTooltip: "expand-tooltip",
};

const actionBarCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{pointer-events:auto;display:inline-flex;align-self:stretch;gap:var(--calcite-action-bar-items-space, 0)}:host([layout=vertical]){flex-direction:column}:host([layout=vertical]):host([overflow-actions-disabled]){overflow-y:auto}:host([layout=vertical]):host([expanded]){max-inline-size:var(--calcite-action-bar-expanded-max-width, auto)}:host([layout=vertical]) .action-group--end{margin-block-start:auto}:host([layout=vertical]) ::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:var(--calcite-border-width-sm)}:host([layout=horizontal]){flex-direction:row}:host([layout=horizontal]):host([overflow-actions-disabled]){overflow-x:auto}:host([layout=horizontal]) .action-group--end{margin-inline-start:auto}:host([layout=horizontal]) ::slotted(calcite-action-group:not(:last-of-type)){border-inline-end-width:var(--calcite-border-width-sm)}.action-group--end{justify-content:flex-end}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteActionBarStyle0 = actionBarCss;

const ActionBar = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteActionBarToggle = index.createEvent(this, "calciteActionBarToggle", 6);
        this.mutationObserver = observers.createObserver("mutation", () => {
            const { el, expanded } = this;
            ExpandToggle.toggleChildActionText({ el, expanded });
            this.overflowActions();
        });
        this.resizeObserver = observers.createObserver("resize", (entries) => this.resizeHandlerEntries(entries));
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.actionMenuOpenHandler = (event) => {
            if (event.target.menuOpen) {
                const composedPath = event.composedPath();
                Array.from(this.el.querySelectorAll("calcite-action-group")).forEach((group) => {
                    if (!composedPath.includes(group)) {
                        group.menuOpen = false;
                    }
                });
            }
        };
        this.resizeHandlerEntries = (entries) => {
            entries.forEach(this.resizeHandler);
        };
        this.resizeHandler = (entry) => {
            const { width, height } = entry.contentRect;
            this.resize({ width, height });
        };
        this.resize = debounce.debounce(({ width, height }) => {
            const { el, expanded, expandDisabled, layout, overflowActionsDisabled } = this;
            if (overflowActionsDisabled ||
                (layout === "vertical" && !height) ||
                (layout === "horizontal" && !width)) {
                return;
            }
            const actions = ExpandToggle.queryActions(el);
            const actionCount = expandDisabled ? actions.length : actions.length + 1;
            const actionGroups = Array.from(el.querySelectorAll("calcite-action-group"));
            this.setGroupLayout(actionGroups);
            const groupCount = this.hasActionsEnd || this.hasBottomActions || !expandDisabled
                ? actionGroups.length + 1
                : actionGroups.length;
            const { actionHeight, actionWidth } = ExpandToggle.geActionDimensions(actions);
            const overflowCount = ExpandToggle.getOverflowCount({
                layout,
                actionCount,
                actionHeight,
                actionWidth,
                height,
                width,
                groupCount,
            });
            ExpandToggle.overflowActions({
                actionGroups,
                expanded,
                overflowCount,
            });
        }, resources.DEBOUNCE.resize);
        this.toggleExpand = () => {
            this.expanded = !this.expanded;
            this.calciteActionBarToggle.emit();
        };
        this.handleDefaultSlotChange = (event) => {
            const groups = dom.slotChangeGetAssignedElements(event).filter((el) => el.matches("calcite-action-group"));
            this.setGroupLayout(groups);
        };
        this.handleActionsEndSlotChange = (event) => {
            this.hasActionsEnd = dom.slotChangeHasAssignedElement(event);
        };
        this.handleBottomActionsSlotChange = (event) => {
            this.hasBottomActions = dom.slotChangeHasAssignedElement(event);
        };
        this.handleTooltipSlotChange = (event) => {
            const tooltips = dom.slotChangeGetAssignedElements(event).filter((el) => el?.matches("calcite-tooltip"));
            this.expandTooltip = tooltips[0];
        };
        this.actionsEndGroupLabel = undefined;
        this.expandDisabled = false;
        this.expanded = false;
        this.layout = "vertical";
        this.overflowActionsDisabled = false;
        this.overlayPositioning = "absolute";
        this.position = undefined;
        this.scale = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.effectiveLocale = undefined;
        this.hasActionsEnd = false;
        this.hasBottomActions = false;
        this.expandTooltip = undefined;
        this.defaultMessages = undefined;
    }
    expandHandler() {
        this.overflowActions();
    }
    expandedHandler() {
        const { el, expanded } = this;
        ExpandToggle.toggleChildActionText({ el, expanded });
        this.overflowActions();
    }
    layoutHandler() {
        this.updateGroups();
    }
    overflowDisabledHandler(overflowActionsDisabled) {
        if (overflowActionsDisabled) {
            this.resizeObserver?.disconnect();
            return;
        }
        this.resizeObserver?.observe(this.el);
        this.overflowActions();
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
    componentDidLoad() {
        const { el, expanded } = this;
        loadable.setComponentLoaded(this);
        ExpandToggle.toggleChildActionText({ el, expanded });
        this.overflowActions();
    }
    connectedCallback() {
        const { el, expanded } = this;
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        ExpandToggle.toggleChildActionText({ el, expanded });
        this.mutationObserver?.observe(el, { childList: true, subtree: true });
        if (!this.overflowActionsDisabled) {
            this.resizeObserver?.observe(el);
        }
        this.overflowActions();
        conditionalSlot.connectConditionalSlotComponent(this);
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        await t9n.setUpMessages(this);
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
        this.resizeObserver?.disconnect();
        conditionalSlot.disconnectConditionalSlotComponent(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Overflows actions that won't fit into menus.
     *
     * @internal
     */
    async overflowActions() {
        this.resize({ width: this.el.clientWidth, height: this.el.clientHeight });
    }
    /**
     * Sets focus on the component's first focusable element.
     */
    async setFocus() {
        await loadable.componentFocusable(this);
        dom.focusFirstTabbable(this.el);
    }
    updateGroups() {
        this.setGroupLayout(Array.from(this.el.querySelectorAll("calcite-action-group")));
    }
    setGroupLayout(groups) {
        groups.forEach((group) => (group.layout = this.layout));
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderBottomActionGroup() {
        const { expanded, expandDisabled, el, position, toggleExpand, scale, layout, messages, actionsEndGroupLabel, overlayPositioning, } = this;
        const expandToggleNode = !expandDisabled ? (index.h(ExpandToggle.ExpandToggle, { collapseLabel: messages.collapseLabel, collapseText: messages.collapse, el: el, expandLabel: messages.expandLabel, expandText: messages.expand, expanded: expanded, position: position, scale: scale, toggle: toggleExpand, tooltip: this.expandTooltip })) : null;
        return (index.h("calcite-action-group", { class: CSS.actionGroupEnd, hidden: this.expandDisabled && !(this.hasActionsEnd || this.hasBottomActions), label: actionsEndGroupLabel, layout: layout, overlayPositioning: overlayPositioning, scale: scale }, index.h("slot", { name: SLOTS.actionsEnd, onSlotchange: this.handleActionsEndSlotChange }), index.h("slot", { name: SLOTS.bottomActions, onSlotchange: this.handleBottomActionsSlotChange }), index.h("slot", { name: SLOTS.expandTooltip, onSlotchange: this.handleTooltipSlotChange }), expandToggleNode));
    }
    render() {
        return (index.h(index.Host, { key: 'ff6e365531a0ed2032864bb0777910c3932e9c6b', onCalciteActionMenuOpen: this.actionMenuOpenHandler }, index.h("slot", { key: 'f12b2f455752a62ee32b65224bed385940135a49', onSlotchange: this.handleDefaultSlotChange }), this.renderBottomActionGroup()));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "expandDisabled": ["expandHandler"],
        "expanded": ["expandedHandler"],
        "layout": ["layoutHandler"],
        "overflowActionsDisabled": ["overflowDisabledHandler"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
ActionBar.style = CalciteActionBarStyle0;

exports.calcite_action_bar = ActionBar;
