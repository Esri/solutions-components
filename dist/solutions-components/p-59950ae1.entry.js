/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, f as forceUpdate, h, H as Host, g as getElement } from './p-6eb37ed2.js';
import { h as slotChangeGetAssignedElements, d as focusElementInGroup, e as focusElement } from './p-68ec5c15.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './p-18f18ab3.js';
import { c as connectLocalized, d as disconnectLocalized } from './p-939bc1b4.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './p-1a9a47a0.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';
import './p-acaae81d.js';
import './p-fe6f7734.js';
import './p-c638d28e.js';

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
        return this.el.getAttribute("role") || "menubar";
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return (h(Host, { key: '6d6065316ef082e9be968dce0b495e42da835655' }, h("ul", { key: '6ec873b11665c3e3d5e2c019acd8ac60964119ec', "aria-label": this.label, role: this.getEffectiveRole() }, h("slot", { key: '9a5593e91faadc44b980f82d75c7cfa87cbb81ce', onSlotchange: this.handleMenuSlotChange }))));
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
