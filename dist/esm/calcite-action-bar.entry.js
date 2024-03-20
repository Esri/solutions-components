/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-164d485a.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-12c4fcfb.js';
import { s as slotChangeGetAssignedElements, u as slotChangeHasAssignedElement, f as focusFirstTabbable } from './dom-38c6f027.js';
import { a as setComponentLoaded, s as setUpLoadableComponent, c as componentFocusable } from './loadable-37e7fbd6.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale-904407bf.js';
import { c as createObserver } from './observers-d04d1da9.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n-436fb2b1.js';
import { t as toggleChildActionText, o as overflowActionsDebounceInMs, q as queryActions, g as geActionDimensions, a as overflowActions, E as ExpandToggle, b as getOverflowCount } from './ExpandToggle-b6eb575e.js';
import { d as debounce } from './debounce-229b1a22.js';
import './guid-b75a5f7b.js';
import './resources-8834f920.js';
import './key-c83d835f.js';
import './resources-b0e2b809.js';
import './resources-20074cb1.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    actionGroupEnd: "action-group--end",
};
const SLOTS = {
    actionsEnd: "actions-end",
    bottomActions: "bottom-actions",
    expandTooltip: "expand-tooltip",
};

const actionBarCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{pointer-events:auto;display:inline-flex;align-self:stretch;--calcite-action-bar-expanded-max-width:auto}:host([layout=vertical]){flex-direction:column}:host([layout=vertical]) .action-group--end{margin-block-start:auto}:host([layout=horizontal]){flex-direction:row}:host([layout=horizontal]) .action-group--end{margin-inline-start:auto}:host([layout=vertical][overflow-actions-disabled]){overflow-y:auto}:host([layout=horizontal][overflow-actions-disabled]){overflow-x:auto}:host([layout=vertical][expanded]){max-inline-size:var(--calcite-action-bar-expanded-max-width)}::slotted(calcite-action-group){border-block-end:1px solid var(--calcite-color-border-3)}:host([layout=horizontal]) ::slotted(calcite-action-group){border-block-end:0;border-inline-end:1px solid var(--calcite-color-border-3)}:host([layout=horizontal][expand-disabled]) ::slotted(calcite-action-group:last-of-type){border-inline-end:0}::slotted(calcite-action-group:last-child){border-block-end:0;border-inline-end:0}.action-group--end{justify-content:flex-end}:host([hidden]){display:none}[hidden]{display:none}";

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
        }, overflowActionsDebounceInMs);
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
            const tooltips = slotChangeGetAssignedElements(event).filter((el) => el === null || el === void 0 ? void 0 : el.matches("calcite-tooltip"));
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
        var _a, _b;
        if (overflowActionsDisabled) {
            (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
            return;
        }
        (_b = this.resizeObserver) === null || _b === void 0 ? void 0 : _b.observe(this.el);
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
        var _a, _b;
        const { el, expanded } = this;
        connectLocalized(this);
        connectMessages(this);
        toggleChildActionText({ el, expanded });
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(el, { childList: true, subtree: true });
        if (!this.overflowActionsDisabled) {
            (_b = this.resizeObserver) === null || _b === void 0 ? void 0 : _b.observe(el);
        }
        this.overflowActions();
        connectConditionalSlotComponent(this);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
    }
    disconnectedCallback() {
        var _a, _b;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        (_b = this.resizeObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
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
        const expandToggleNode = !expandDisabled ? (h(ExpandToggle, { collapseText: messages.collapse, el: el, expandText: messages.expand, expanded: expanded, position: position, scale: scale, toggle: toggleExpand, tooltip: this.expandTooltip,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setExpandToggleRef })) : null;
        return (h("calcite-action-group", { class: CSS.actionGroupEnd, hidden: this.expandDisabled && !(this.hasActionsEnd || this.hasBottomActions), label: actionsEndGroupLabel, layout: layout, overlayPositioning: overlayPositioning, scale: scale }, h("slot", { name: SLOTS.actionsEnd, onSlotchange: this.handleActionsEndSlotChange }), h("slot", { name: SLOTS.bottomActions, onSlotchange: this.handleBottomActionsSlotChange }), h("slot", { name: SLOTS.expandTooltip, onSlotchange: this.handleTooltipSlotChange }), expandToggleNode));
    }
    render() {
        return (h(Host, { onCalciteActionMenuOpen: this.actionMenuOpenHandler }, h("slot", { onSlotchange: this.handleDefaultSlotChange }), this.renderBottomActionGroup()));
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
ActionBar.style = actionBarCss;

export { ActionBar as calcite_action_bar };
