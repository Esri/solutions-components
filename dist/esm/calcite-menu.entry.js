/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, f as forceUpdate, h, H as Host, g as getElement } from './index-904bc599.js';
import { e as slotChangeGetAssignedElements, b as focusElementInGroup, d as focusElement } from './dom-75c641a7.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable-7cb2fc6f.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale-24516fec.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n-9a5d28cf.js';
import './guid-b0fb1de3.js';
import './resources-8e2ed936.js';
import './browser-b67d8df6.js';
import './key-e6b442de.js';
import './observers-c83631e8.js';

const menuCss = ":host{display:flex}ul{margin:0px;display:inline-flex;block-size:100%;align-items:center;padding:0px}:host([layout=vertical]) ul{display:flex;inline-size:100%;flex-direction:column}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteMenuStyle0 = menuCss;

const CalciteMenu = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.menuItems = [];
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.handleMenuSlotChange = (event) => {
            this.menuItems = slotChangeGetAssignedElements(event);
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
        forceUpdate(this);
        this.setMenuItemLayout(this.menuItems, this.layout);
    }
    handleLayoutChange(value) {
        this.setMenuItemLayout(this.menuItems, value);
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        connectMessages(this);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        await setUpMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        disconnectLocalized(this);
        disconnectMessages(this);
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
                focusElementInGroup(this.menuItems, target, "next", false);
            }
            else {
                if (event.detail.isSubmenuOpen) {
                    submenuItems[0].setFocus();
                }
            }
        }
        else if (key === "ArrowUp") {
            if (this.layout === "vertical") {
                focusElementInGroup(this.menuItems, target, "previous", false);
            }
            else {
                if (event.detail.isSubmenuOpen) {
                    submenuItems[submenuItems.length - 1].setFocus();
                }
            }
        }
        else if (key === "ArrowRight") {
            if (this.layout === "horizontal") {
                focusElementInGroup(this.menuItems, target, "next", false);
            }
            else {
                if (event.detail.isSubmenuOpen) {
                    submenuItems[0].setFocus();
                }
            }
        }
        else if (key === "ArrowLeft") {
            if (this.layout === "horizontal") {
                focusElementInGroup(this.menuItems, target, "previous", false);
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
            focusElement(parentEl);
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
        return (h(Host, { key: '75308ac4419f7116f73975ad9ff88d25817d0522' }, h("ul", { key: 'ed22f7ab681c6e583b0b5aa720823898759687cb', "aria-label": this.label, role: this.getEffectiveRole() }, h("slot", { key: '4296d48a1a8921802458776d02e119feeaf12b3e', onSlotchange: this.handleMenuSlotChange }))));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "role": ["handleGlobalAttributesChanged"],
        "layout": ["handleLayoutChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
CalciteMenu.style = CalciteMenuStyle0;

export { CalciteMenu as calcite_menu };
