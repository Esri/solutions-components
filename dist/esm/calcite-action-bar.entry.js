/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-b793d9aa.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-60e775f3.js';
import { h as slotChangeGetAssignedElements, s as slotChangeHasAssignedElement, f as focusFirstTabbable } from './dom-b5c50286.js';
import { a as setComponentLoaded, s as setUpLoadableComponent, c as componentFocusable } from './loadable-73f289b6.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale-21e40b0c.js';
import { c as createObserver } from './observers-e2484555.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n-2fb3af62.js';
import { t as toggleChildActionText, q as queryActions, g as geActionDimensions, o as overflowActions, E as ExpandToggle, a as getOverflowCount } from './ExpandToggle-bddb5e82.js';
import { D as DEBOUNCE } from './resources-defbb49f.js';
import { d as debounce } from './debounce-6e9ade8c.js';
import './guid-4c746a7f.js';
import './browser-552eb2d0.js';
import './key-58898f0a.js';
import './resources-8f90cf93.js';
import './resources-cfbcc1ed.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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
        registerInstance(this, hostRef);
        this.calciteActionBarToggle = createEvent(this, "calciteActionBarToggle", 6);
        this.mutationObserver = createObserver("mutation", () => {
            const { el, expanded } = this;
            toggleChildActionText({ el, expanded });
            this.overflowActions();
        });
        this.resizeObserver = createObserver("resize", (entries) => this.resizeHandlerEntries(entries));
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
        this.resize = debounce(({ width, height }) => {
            const { el, expanded, expandDisabled, layout, overflowActionsDisabled } = this;
            if (overflowActionsDisabled ||
                (layout === "vertical" && !height) ||
                (layout === "horizontal" && !width)) {
                return;
            }
            const actions = queryActions(el);
            const actionCount = expandDisabled ? actions.length : actions.length + 1;
            const actionGroups = Array.from(el.querySelectorAll("calcite-action-group"));
            this.setGroupLayout(actionGroups);
            const groupCount = this.hasActionsEnd || this.hasBottomActions || !expandDisabled
                ? actionGroups.length + 1
                : actionGroups.length;
            const { actionHeight, actionWidth } = geActionDimensions(actions);
            const overflowCount = getOverflowCount({
                layout,
                actionCount,
                actionHeight,
                actionWidth,
                height,
                width,
                groupCount,
            });
            overflowActions({
                actionGroups,
                expanded,
                overflowCount,
            });
        }, DEBOUNCE.resize);
        this.toggleExpand = () => {
            this.expanded = !this.expanded;
            this.calciteActionBarToggle.emit();
        };
        this.setExpandToggleRef = (el) => {
            this.expandToggleEl = el;
        };
        this.handleDefaultSlotChange = (event) => {
            const groups = slotChangeGetAssignedElements(event).filter((el) => el.matches("calcite-action-group"));
            this.setGroupLayout(groups);
        };
        this.handleActionsEndSlotChange = (event) => {
            this.hasActionsEnd = slotChangeHasAssignedElement(event);
        };
        this.handleBottomActionsSlotChange = (event) => {
            this.hasBottomActions = slotChangeHasAssignedElement(event);
        };
        this.handleTooltipSlotChange = (event) => {
            const tooltips = slotChangeGetAssignedElements(event).filter((el) => el?.matches("calcite-tooltip"));
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
        toggleChildActionText({ el, expanded });
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
        updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    componentDidLoad() {
        const { el, expanded } = this;
        setComponentLoaded(this);
        toggleChildActionText({ el, expanded });
        this.overflowActions();
    }
    connectedCallback() {
        const { el, expanded } = this;
        connectLocalized(this);
        connectMessages(this);
        toggleChildActionText({ el, expanded });
        this.mutationObserver?.observe(el, { childList: true, subtree: true });
        if (!this.overflowActionsDisabled) {
            this.resizeObserver?.observe(el);
        }
        this.overflowActions();
        connectConditionalSlotComponent(this);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
        this.resizeObserver?.disconnect();
        disconnectConditionalSlotComponent(this);
        disconnectLocalized(this);
        disconnectMessages(this);
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
        await componentFocusable(this);
        focusFirstTabbable(this.el);
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
        const expandToggleNode = !expandDisabled ? (h(ExpandToggle, { collapseLabel: messages.collapseLabel, collapseText: messages.collapse, el: el, expandLabel: messages.expandLabel, expandText: messages.expand, expanded: expanded, position: position, ref: this.setExpandToggleRef, scale: scale, toggle: toggleExpand, tooltip: this.expandTooltip })) : null;
        return (h("calcite-action-group", { class: CSS.actionGroupEnd, hidden: this.expandDisabled && !(this.hasActionsEnd || this.hasBottomActions), label: actionsEndGroupLabel, layout: layout, overlayPositioning: overlayPositioning, scale: scale }, h("slot", { name: SLOTS.actionsEnd, onSlotchange: this.handleActionsEndSlotChange }), h("slot", { name: SLOTS.bottomActions, onSlotchange: this.handleBottomActionsSlotChange }), h("slot", { name: SLOTS.expandTooltip, onSlotchange: this.handleTooltipSlotChange }), expandToggleNode));
    }
    render() {
        return (h(Host, { key: 'b0627d0daa2f500a979aaacc8981814284c437ad', onCalciteActionMenuOpen: this.actionMenuOpenHandler }, h("slot", { key: 'b1831e21404b85f1632d47f280d0357f5897ebc7', onSlotchange: this.handleDefaultSlotChange }), this.renderBottomActionGroup()));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
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

export { ActionBar as calcite_action_bar };
