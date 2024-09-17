/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, g as getElement } from './p-6eb37ed2.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './p-06084e6c.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './p-18f18ab3.js';
import { c as connectLocalized, d as disconnectLocalized } from './p-939bc1b4.js';
import { u as updateMessages, c as connectMessages, d as disconnectMessages, s as setUpMessages } from './p-1a9a47a0.js';
import { S as SLOTS$1 } from './p-c5e13ebc.js';
import { s as slotChangeHasAssignedElement } from './p-68ec5c15.js';
import { S as SLOTS, I as ICONS, C as CSS } from './p-7699e80b.js';
import './p-c638d28e.js';
import './p-acaae81d.js';
import './p-fe6f7734.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';

const actionGroupCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:flex;flex-direction:column;padding:0px;background-color:transparent;border-color:var(--calcite-action-group-border-color, var(--calcite-color-border-3));border-style:solid;border-width:0}.container{display:flex;flex-grow:1;flex-direction:column}:host([columns=\"1\"]){--calcite-internal-action-group-columns:1}:host([columns=\"2\"]){--calcite-internal-action-group-columns:2}:host([columns=\"3\"]){--calcite-internal-action-group-columns:3}:host([columns=\"4\"]){--calcite-internal-action-group-columns:4}:host([columns=\"5\"]){--calcite-internal-action-group-columns:5}:host([columns=\"6\"]){--calcite-internal-action-group-columns:6}:host(:first-child){padding-block-start:0px}:host([layout=horizontal]),:host([layout=horizontal]) .container{flex-direction:row}:host([layout=grid]){display:grid}:host([layout=grid]) .container{display:grid;place-content:stretch;background-color:transparent;grid-template-columns:repeat(var(--calcite-action-group-columns, var(--calcite-internal-action-group-columns, 3)), auto);gap:var(--calcite-action-group-gap, 1px);padding:var(--calcite-action-group-gap, 1px)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteActionGroupStyle0 = actionGroupCss;

const ActionGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.setMenuOpen = (event) => {
            this.menuOpen = !!event.target.open;
        };
        this.handleMenuActionsSlotChange = (event) => {
            this.hasMenuActions = slotChangeHasAssignedElement(event);
        };
        this.expanded = false;
        this.label = undefined;
        this.layout = "vertical";
        this.columns = undefined;
        this.menuOpen = false;
        this.overlayPositioning = "absolute";
        this.scale = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.effectiveLocale = "";
        this.defaultMessages = undefined;
        this.hasMenuActions = false;
    }
    expandedHandler() {
        this.menuOpen = false;
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component's first focusable element. */
    async setFocus() {
        await componentFocusable(this);
        this.el.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        connectMessages(this);
        connectConditionalSlotComponent(this);
    }
    disconnectedCallback() {
        disconnectLocalized(this);
        disconnectMessages(this);
        disconnectConditionalSlotComponent(this);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Component Methods
    //
    // --------------------------------------------------------------------------
    renderMenu() {
        const { expanded, menuOpen, scale, layout, messages, overlayPositioning, hasMenuActions } = this;
        return (h("calcite-action-menu", { expanded: expanded, flipPlacements: ["left", "right"], hidden: !hasMenuActions, label: messages.more, onCalciteActionMenuOpen: this.setMenuOpen, open: menuOpen, overlayPositioning: overlayPositioning, placement: layout === "horizontal" ? "bottom-start" : "leading-start", scale: scale }, h("calcite-action", { icon: ICONS.menu, scale: scale, slot: SLOTS$1.trigger, text: messages.more, textEnabled: expanded }), h("slot", { name: SLOTS.menuActions, onSlotchange: this.handleMenuActionsSlotChange }), h("slot", { name: SLOTS.menuTooltip, slot: SLOTS$1.tooltip })));
    }
    render() {
        return (h("div", { key: '53e37d8cb8d51e6809c35b035483218ce2f43bff', "aria-label": this.label, class: CSS.container, role: "group" }, h("slot", { key: '967676dd0b0fec78f278da527f4695decf7fe47a' }), this.renderMenu()));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "expanded": ["expandedHandler"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
ActionGroup.style = CalciteActionGroupStyle0;

export { ActionGroup as calcite_action_group };
