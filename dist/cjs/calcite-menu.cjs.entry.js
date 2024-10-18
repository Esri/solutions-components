/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const dom = require('./dom-795d4a33.js');
const loadable = require('./loadable-1c888c87.js');
const locale = require('./locale-da840314.js');
const t9n = require('./t9n-ed5c03a7.js');
require('./guid-e84a8375.js');
require('./resources-18f799c7.js');
require('./browser-333a21c5.js');
require('./key-47c9469a.js');
require('./observers-18d87cb5.js');

const menuCss = ":host{display:flex}ul{margin:0px;display:inline-flex;block-size:100%;align-items:center;padding:0px}:host([layout=vertical]) ul{display:flex;inline-size:100%;flex-direction:column}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteMenuStyle0 = menuCss;

const CalciteMenu = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.menuItems = [];
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.handleMenuSlotChange = (event) => {
            this.menuItems = dom.slotChangeGetAssignedElements(event);
            this.setMenuItemLayout(this.menuItems, this.layout);
        };
        this.label = undefined;
        this.layout = "horizontal";
        this.messageOverrides = undefined;
        this.messages = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
    }
    //--------------------------------------------------------------------------
    //
    //  Global attributes
    //
    //--------------------------------------------------------------------------
    handleGlobalAttributesChanged() {
        index.forceUpdate(this);
        this.setMenuItemLayout(this.menuItems, this.layout);
    }
    handleLayoutChange(value) {
        this.setMenuItemLayout(this.menuItems, value);
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        locale.connectLocalized(this);
        t9n.connectMessages(this);
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        await t9n.setUpMessages(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    disconnectedCallback() {
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
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
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteInternalNavMenuItemKeyEvent(event) {
        const target = event.target;
        const submenuItems = event.detail.children;
        const key = event.detail.event.key;
        event.stopPropagation();
        if (key === "ArrowDown") {
            if (target.layout === "vertical") {
                dom.focusElementInGroup(this.menuItems, target, "next", false);
            }
            else {
                if (event.detail.isSubmenuOpen) {
                    submenuItems[0].setFocus();
                }
            }
        }
        else if (key === "ArrowUp") {
            if (this.layout === "vertical") {
                dom.focusElementInGroup(this.menuItems, target, "previous", false);
            }
            else {
                if (event.detail.isSubmenuOpen) {
                    submenuItems[submenuItems.length - 1].setFocus();
                }
            }
        }
        else if (key === "ArrowRight") {
            if (this.layout === "horizontal") {
                dom.focusElementInGroup(this.menuItems, target, "next", false);
            }
            else {
                if (event.detail.isSubmenuOpen) {
                    submenuItems[0].setFocus();
                }
            }
        }
        else if (key === "ArrowLeft") {
            if (this.layout === "horizontal") {
                dom.focusElementInGroup(this.menuItems, target, "previous", false);
            }
            else {
                if (event.detail.isSubmenuOpen) {
                    this.focusParentElement(event.target);
                }
            }
        }
        else if (key === "Escape") {
            this.focusParentElement(event.target);
        }
        event.preventDefault();
    }
    focusParentElement(el) {
        const parentEl = el.parentElement;
        if (parentEl) {
            dom.focusElement(parentEl);
            parentEl.open = false;
        }
    }
    setMenuItemLayout(items, layout) {
        items.forEach((item) => {
            item.layout = layout;
            if (this.getEffectiveRole() === "menubar") {
                item.isTopLevelItem = true;
                item.topLevelMenuLayout = this.layout;
            }
        });
    }
    getEffectiveRole() {
        return this.el.role || "menubar";
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return (index.h(index.Host, { key: '75308ac4419f7116f73975ad9ff88d25817d0522' }, index.h("ul", { key: 'ed22f7ab681c6e583b0b5aa720823898759687cb', "aria-label": this.label, role: this.getEffectiveRole() }, index.h("slot", { key: '4296d48a1a8921802458776d02e119feeaf12b3e', onSlotchange: this.handleMenuSlotChange }))));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "role": ["handleGlobalAttributesChanged"],
        "layout": ["handleLayoutChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
CalciteMenu.style = CalciteMenuStyle0;

exports.calcite_menu = CalciteMenu;
