/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const conditionalSlot = require('./conditionalSlot-9d7b60d1.js');
const loadable = require('./loadable-5a794992.js');
const locale = require('./locale-d237c9d5.js');
const t9n = require('./t9n-993a84de.js');
const resources$1 = require('./resources-555dae0e.js');
const resources = require('./resources-7e540eac.js');
const dom = require('./dom-c9c2c835.js');
require('./observers-db4527e4.js');
require('./key-c5504030.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');

const actionGroupCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:flex;flex-direction:column;padding:0px;--calcite-action-group-columns:3;--calcite-action-group-gap:1px;--calcite-action-group-padding:1px}.container{display:flex;flex-grow:1;flex-direction:column}:host([columns=\"1\"]){--calcite-action-group-columns:1}:host([columns=\"2\"]){--calcite-action-group-columns:2}:host([columns=\"3\"]){--calcite-action-group-columns:3}:host([columns=\"4\"]){--calcite-action-group-columns:4}:host([columns=\"5\"]){--calcite-action-group-columns:5}:host([columns=\"6\"]){--calcite-action-group-columns:6}:host(:first-child){padding-block-start:0px}:host([layout=horizontal]),:host([layout=horizontal]) .container{flex-direction:row}:host([layout=grid]){display:grid}:host([layout=grid]) .container{display:grid;place-content:stretch;background-color:var(--calcite-color-background);gap:var(--calcite-action-group-gap);padding:var(--calcite-action-group-gap);grid-template-columns:repeat(var(--calcite-action-group-columns), auto)}:host([hidden]){display:none}[hidden]{display:none}";

const ActionGroup = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.setMenuOpen = (event) => {
            this.menuOpen = !!event.target.open;
        };
        this.handleMenuActionsSlotChange = (event) => {
            this.hasMenuActions = dom.slotChangeHasAssignedElement(event);
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
        t9n.updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component's first focusable element. */
    async setFocus() {
        await loadable.componentFocusable(this);
        this.el.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        conditionalSlot.connectConditionalSlotComponent(this);
    }
    disconnectedCallback() {
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        conditionalSlot.disconnectConditionalSlotComponent(this);
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        await t9n.setUpMessages(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Component Methods
    //
    // --------------------------------------------------------------------------
    renderMenu() {
        const { expanded, menuOpen, scale, layout, messages, overlayPositioning, hasMenuActions } = this;
        return (index.h("calcite-action-menu", { expanded: expanded, flipPlacements: ["left", "right"], hidden: !hasMenuActions, label: messages.more, onCalciteActionMenuOpen: this.setMenuOpen, open: menuOpen, overlayPositioning: overlayPositioning, placement: layout === "horizontal" ? "bottom-start" : "leading-start", scale: scale }, index.h("calcite-action", { icon: resources.ICONS.menu, scale: scale, slot: resources$1.SLOTS.trigger, text: messages.more, textEnabled: expanded }), index.h("slot", { name: resources.SLOTS.menuActions, onSlotchange: this.handleMenuActionsSlotChange }), index.h("slot", { name: resources.SLOTS.menuTooltip, slot: resources$1.SLOTS.tooltip })));
    }
    render() {
        return (index.h("div", { "aria-label": this.label, class: resources.CSS.container, role: "group" }, index.h("slot", null), this.renderMenu()));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "expanded": ["expandedHandler"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
ActionGroup.style = actionGroupCss;

exports.calcite_action_group = ActionGroup;
