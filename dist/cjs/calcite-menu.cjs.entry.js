/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const dom = require('./dom-6a9b6275.js');
const loadable = require('./loadable-2e2626dc.js');
const locale = require('./locale-42c21404.js');
const t9n = require('./t9n-42ba6ea3.js');
require('./guid-02e5380f.js');
require('./resources-dfe71ff2.js');
require('./browser-69696af0.js');
require('./key-d6da79d8.js');
require('./observers-8fed90f3.js');

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
        return this.el.getAttribute("role") || "menubar";
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return (index.h(index.Host, { key: '6d6065316ef082e9be968dce0b495e42da835655' }, index.h("ul", { key: '6ec873b11665c3e3d5e2c019acd8ac60964119ec', "aria-label": this.label, role: this.getEffectiveRole() }, index.h("slot", { key: '9a5593e91faadc44b980f82d75c7cfa87cbb81ce', onSlotchange: this.handleMenuSlotChange }))));
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
