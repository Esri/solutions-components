/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const conditionalSlot = require('./conditionalSlot-37ff4832.js');
const loadable = require('./loadable-1c888c87.js');
const locale = require('./locale-da840314.js');
const t9n = require('./t9n-ed5c03a7.js');
const resources$1 = require('./resources-b3dc59f7.js');
const dom = require('./dom-795d4a33.js');
const resources = require('./resources-9c07e2ea.js');
require('./observers-18d87cb5.js');
require('./browser-333a21c5.js');
require('./key-47c9469a.js');
require('./guid-e84a8375.js');
require('./resources-18f799c7.js');

const actionGroupCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:flex;flex-direction:column;padding:0px;background-color:transparent;border-color:var(--calcite-action-group-border-color, var(--calcite-color-border-3));border-style:solid;border-width:0}.container{display:flex;flex-grow:1;flex-direction:column}:host([columns=\"1\"]){--calcite-internal-action-group-columns:1}:host([columns=\"2\"]){--calcite-internal-action-group-columns:2}:host([columns=\"3\"]){--calcite-internal-action-group-columns:3}:host([columns=\"4\"]){--calcite-internal-action-group-columns:4}:host([columns=\"5\"]){--calcite-internal-action-group-columns:5}:host([columns=\"6\"]){--calcite-internal-action-group-columns:6}:host(:first-child){padding-block-start:0px}:host([layout=horizontal]),:host([layout=horizontal]) .container{flex-direction:row}:host([layout=grid]){display:grid}:host([layout=grid]) .container{display:grid;place-content:stretch;background-color:transparent;grid-template-columns:repeat(var(--calcite-action-group-columns, var(--calcite-internal-action-group-columns, 3)), auto);gap:var(--calcite-action-group-gap, 1px);padding:var(--calcite-action-group-gap, 1px)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteActionGroupStyle0 = actionGroupCss;

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
        this.menuFlipPlacements = undefined;
        this.menuPlacement = undefined;
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
        const { expanded, menuOpen, scale, layout, messages, overlayPositioning, hasMenuActions, menuFlipPlacements, menuPlacement, } = this;
        return (index.h("calcite-action-menu", { expanded: expanded, flipPlacements: menuFlipPlacements ?? (layout === "horizontal" ? ["top", "bottom"] : ["left", "right"]), hidden: !hasMenuActions, label: messages.more, onCalciteActionMenuOpen: this.setMenuOpen, open: menuOpen, overlayPositioning: overlayPositioning, placement: menuPlacement ?? (layout === "horizontal" ? "bottom-start" : "leading-start"), scale: scale }, index.h("calcite-action", { icon: resources.ICONS.menu, scale: scale, slot: resources$1.SLOTS.trigger, text: messages.more, textEnabled: expanded }), index.h("slot", { name: resources.SLOTS.menuActions, onSlotchange: this.handleMenuActionsSlotChange }), index.h("slot", { name: resources.SLOTS.menuTooltip, slot: resources$1.SLOTS.tooltip })));
    }
    render() {
        return (index.h("div", { key: '8143606c5745053f15140f34ff5ea375a683325f', "aria-label": this.label, class: resources.CSS.container, role: "group" }, index.h("slot", { key: 'e8c2821b9ce2e9d0293478989fc31d24f043f9c3' }), this.renderMenu()));
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
ActionGroup.style = CalciteActionGroupStyle0;

exports.calcite_action_group = ActionGroup;
