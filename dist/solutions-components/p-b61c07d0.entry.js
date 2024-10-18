/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, g as getElement } from './p-4e6eb06e.js';
import { e as slotChangeGetAssignedElements, g as getElementDir, t as toAriaBoolean } from './p-621ad249.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './p-ad9d1221.js';
import { C as CSS_UTILITY } from './p-91371f97.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './p-efaa77a0.js';
import { c as connectLocalized, d as disconnectLocalized } from './p-895e7b9c.js';
import './p-7d542581.js';
import './p-4f82eb55.js';
import './p-233f219c.js';
import './p-ff336351.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    container: "container",
    content: "content",
    dropdownVertical: "dropdown--vertical",
    dropdownMenuItems: "dropdown-menu-items",
    dropdownAction: "dropdown-action",
    layoutVertical: "layout--vertical",
    hoverHrefIcon: "hover-href-icon",
    icon: "icon",
    iconBreadcrumb: "icon--breadcrumb",
    iconDropdown: "icon--dropdown",
    iconEnd: "icon--end",
    iconStart: "icon--start",
    isParentVertical: "parent--vertical",
    itemContent: "item-content",
    open: "open",
    nested: "nested",
    textContainer: "text-container",
};

const menuItemCss = ":host{position:relative;box-sizing:border-box;display:flex;align-items:center;flex-shrink:0}:host .container,:host .item-content,:host .content{min-block-size:3rem}:host([layout=vertical]){inline-size:100%}:host(:not([layout=vertical])){block-size:100%}.container,.item-content{display:flex;block-size:100%;inline-size:100%;flex-direction:row;align-items:stretch}.content{position:relative;box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;cursor:pointer;align-items:center;justify-content:center;background-color:var(--calcite-color-foreground-1);padding-inline:1rem;font-size:var(--calcite-font-size-0);color:var(--calcite-color-text-2);outline:2px solid transparent;outline-offset:2px;text-decoration:none;border-block-end:0.125rem solid transparent;padding-block-start:0.125rem}.content:hover{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-2)}.content:focus{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-2);outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.content:active{background-color:var(--calcite-color-foreground-3);color:var(--calcite-color-text-1)}.content span{display:inline-flex}.content.layout--vertical{display:flex;inline-size:100%;justify-content:flex-start;padding-block:1rem;border-block-end:0;border-inline-end:0.25rem solid transparent}:host([active]) .content{color:var(--calcite-color-text-1);border-color:var(--calcite-color-brand)}:host([active]) .content .icon{--calcite-icon-color:var(--calcite-color-brand)}:host([layout=vertical]) .content{padding-inline:0.75rem}.icon--start{margin-inline-end:0.75rem}.icon--end{margin-inline-start:0.75rem}:host([layout=vertical]) .icon--end{margin-inline-start:auto;padding-inline-start:0.75rem}.icon--dropdown{position:relative;margin-inline-start:auto;margin-inline-end:0px;padding-inline-start:0.5rem;--calcite-icon-color:var(--calcite-color-text-3)}:host([layout=vertical]) .icon--end~.icon--dropdown{margin-inline-start:0.75rem}:host([layout=vertical]) .hover-href-icon{padding-inline-start:0.5rem}:host([layout=vertical]) .hover-href-icon~.icon--end{margin-inline-start:0.5rem}:host([layout=vertical]) .hover-href-icon~.icon--breadcrumb{margin-inline-start:0.75rem}.icon--breadcrumb{margin-inline-end:0px;padding-inline-start:0.5rem;--calcite-icon-color:var(--calcite-color-text-3)}:host([layout=vertical]) .icon--breadcrumb{margin-inline-start:auto}:host([layout=vertical]) .icon--breadcrumb~.icon--dropdown{margin-inline-start:0.5rem}:host([layout=vertical]) .icon--end~.icon--breadcrumb{margin-inline-start:0.5rem}:host([breadcrumb]) .content{padding-inline-end:0.75rem}calcite-action{position:relative;block-size:auto;border-inline-start:1px solid var(--calcite-color-foreground-1)}calcite-action::after{position:absolute;inset-inline-start:-1px;display:block;inline-size:1px;content:\"\";inset-block:0.75rem;background-color:var(--calcite-color-border-3)}calcite-action:hover::after{block-size:100%;inset-block:0}.content:focus~calcite-action,.content:hover~calcite-action{color:var(--calcite-color-text-1);border-inline-start:1px solid var(--calcite-color-border-3)}.container:hover .dropdown-action{background-color:var(--calcite-color-foreground-2)}.dropdown-menu-items{position:absolute;display:none;block-size:auto;min-inline-size:100%;flex-direction:column;overflow:visible;border:1px solid var(--calcite-color-border-3);background:var(--calcite-color-foreground-1);inset-block-start:100%;z-index:var(--calcite-z-index-dropdown)}.dropdown-menu-items.open{display:block}.dropdown-menu-items.nested{position:absolute;inset-block-start:-1px;transform:translateX(calc(100% - 2px))}.parent--vertical{flex-direction:column}.dropdown--vertical.dropdown-menu-items{position:relative;border-radius:0px;box-shadow:none;inset-block-start:0;transform:none}.dropdown--vertical.dropdown-menu-items:last-of-type{border-inline:0}:host([layout=vertical]:last-of-type) .dropdown-menu-items{border-block-end:0}:host([slot=submenu-item]) .parent--vertical{padding-inline-start:1.5rem}.dropdown-menu-items.nested.calcite--rtl{transform:translateX(calc(-100% + 2px))}.dropdown--vertical.dropdown-menu-items.nested.calcite--rtl{transform:none}.hover-href-icon{position:relative;inset-inline-end:0.25rem;margin-inline-start:auto;opacity:0;transition:all var(--calcite-internal-animation-timing-medium) ease-in-out}.content:focus .hover-href-icon,.content:hover .hover-href-icon{inset-inline-end:-0.25rem;opacity:1}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteMenuItemStyle0 = menuItemCss;

const CalciteMenuItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteInternalMenuItemKeyEvent = createEvent(this, "calciteInternalMenuItemKeyEvent", 7);
        this.calciteMenuItemSelect = createEvent(this, "calciteMenuItemSelect", 7);
        this.clickHandler = (event) => {
            if ((this.href && event.target === this.dropdownActionEl) || (!this.href && this.hasSubmenu)) {
                this.open = !this.open;
            }
            this.selectMenuItem(event);
        };
        this.handleMenuItemSlotChange = (event) => {
            this.submenuItems = slotChangeGetAssignedElements(event);
            this.submenuItems.forEach((item) => {
                if (!item.topLevelMenuLayout) {
                    item.topLevelMenuLayout = this.topLevelMenuLayout;
                }
            });
            this.hasSubmenu = this.submenuItems.length > 0;
        };
        this.keyDownHandler = async (event) => {
            const { hasSubmenu, href, layout, open, submenuItems } = this;
            const key = event.key;
            const targetIsDropdown = event.target === this.dropdownActionEl;
            if (event.defaultPrevented) {
                return;
            }
            if (key === " " || key === "Enter") {
                if (hasSubmenu && (!href || (href && targetIsDropdown))) {
                    this.open = !open;
                }
                if (!(href && targetIsDropdown) && key !== "Enter") {
                    this.selectMenuItem(event);
                }
                if (key === " " || (href && targetIsDropdown)) {
                    event.preventDefault();
                }
            }
            else if (key === "Escape") {
                if (open) {
                    this.open = false;
                    return;
                }
                this.calciteInternalMenuItemKeyEvent.emit({ event });
                event.preventDefault();
            }
            else if (key === "ArrowDown" || key === "ArrowUp") {
                event.preventDefault();
                if ((targetIsDropdown || !href) && hasSubmenu && !open && layout === "horizontal") {
                    this.open = true;
                    return;
                }
                this.calciteInternalMenuItemKeyEvent.emit({
                    event,
                    children: submenuItems,
                    isSubmenuOpen: open && hasSubmenu,
                });
            }
            else if (key === "ArrowLeft") {
                event.preventDefault();
                this.calciteInternalMenuItemKeyEvent.emit({
                    event,
                    children: submenuItems,
                    isSubmenuOpen: true,
                });
            }
            else if (key === "ArrowRight") {
                event.preventDefault();
                if ((targetIsDropdown || !href) && hasSubmenu && !open && layout === "vertical") {
                    this.open = true;
                    return;
                }
                this.calciteInternalMenuItemKeyEvent.emit({
                    event,
                    children: submenuItems,
                    isSubmenuOpen: open && hasSubmenu,
                });
            }
        };
        this.active = undefined;
        this.breadcrumb = undefined;
        this.href = undefined;
        this.iconEnd = undefined;
        this.iconFlipRtl = undefined;
        this.iconStart = undefined;
        this.isTopLevelItem = false;
        this.label = undefined;
        this.layout = undefined;
        this.messageOverrides = undefined;
        this.messages = undefined;
        this.open = false;
        this.rel = undefined;
        this.target = undefined;
        this.text = undefined;
        this.topLevelMenuLayout = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.hasSubmenu = false;
        this.submenuItems = undefined;
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
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        this.anchorEl.focus();
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleClickOut(event) {
        if (this.topLevelMenuLayout !== "vertical" &&
            this.hasSubmenu &&
            this.open &&
            !event.composedPath().includes(this.el)) {
            this.open = false;
        }
    }
    handleFocusOut(event) {
        if (this.topLevelMenuLayout !== "vertical" &&
            !this.el.contains(event.relatedTarget)) {
            this.open = false;
        }
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
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    blurHandler() {
        this.isFocused = false;
    }
    focusHandler(event) {
        const target = event.target;
        this.isFocused = true;
        if (target.open && !this.open) {
            target.open = false;
        }
    }
    selectMenuItem(event) {
        if (event.target !== this.dropdownActionEl) {
            this.calciteMenuItemSelect.emit();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    renderIconStart() {
        return (h("calcite-icon", { class: `${CSS.icon} ${CSS.iconStart}`, flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, key: CSS.iconStart, scale: "s" }));
    }
    renderIconEnd() {
        return (h("calcite-icon", { class: `${CSS.icon} ${CSS.iconEnd}`, flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, key: CSS.iconEnd, scale: "s" }));
    }
    renderBreadcrumbIcon(dir) {
        return (h("calcite-icon", { class: `${CSS.icon} ${CSS.iconBreadcrumb}`, icon: dir === "rtl" ? "chevron-left" : "chevron-right", key: CSS.iconBreadcrumb, scale: "s" }));
    }
    renderDropdownIcon(dir) {
        const dirChevron = dir === "rtl" ? "chevron-left" : "chevron-right";
        return (h("calcite-icon", { class: `${CSS.icon} ${CSS.iconDropdown}`, icon: this.topLevelMenuLayout === "vertical" || this.isTopLevelItem
                ? this.open
                    ? "chevron-up"
                    : "chevron-down"
                : dirChevron, key: CSS.iconDropdown, scale: "s" }));
    }
    renderDropdownAction(dir) {
        const dirChevron = dir === "rtl" ? "chevron-left" : "chevron-right";
        return (h("calcite-action", { class: CSS.dropdownAction, icon: this.topLevelMenuLayout === "vertical" || this.isTopLevelItem
                ? this.open
                    ? "chevron-up"
                    : "chevron-down"
                : dirChevron, key: CSS.dropdownAction, onClick: this.clickHandler, onKeyDown: this.keyDownHandler, ref: (el) => (this.dropdownActionEl = el), text: this.messages.open }));
    }
    renderSubmenuItems(dir) {
        return (h("calcite-menu", { class: {
                [CSS.dropdownMenuItems]: true,
                [CSS.open]: this.open,
                [CSS.nested]: !this.isTopLevelItem,
                [CSS_UTILITY.rtl]: dir === "rtl",
                [CSS.dropdownVertical]: this.topLevelMenuLayout === "vertical",
            }, label: this.messages.submenu, layout: "vertical", role: "menu" }, h("slot", { name: "submenu-item", onSlotchange: this.handleMenuItemSlotChange })));
    }
    renderHrefIcon(dir) {
        return (h("calcite-icon", { class: CSS.hoverHrefIcon, icon: dir === "rtl" ? "arrow-left" : "arrow-right", key: CSS.hoverHrefIcon, scale: "s" }));
    }
    renderItemContent(dir) {
        const hasHref = this.href && (this.topLevelMenuLayout === "vertical" || !this.isTopLevelItem);
        return (h(Fragment, null, this.iconStart && this.renderIconStart(), h("div", { class: CSS.textContainer }, h("span", null, this.text)), hasHref && this.renderHrefIcon(dir), this.iconEnd && this.renderIconEnd(), this.breadcrumb ? this.renderBreadcrumbIcon(dir) : null, !this.href && this.hasSubmenu ? this.renderDropdownIcon(dir) : null));
    }
    render() {
        const dir = getElementDir(this.el);
        return (h(Host, { key: 'e57c6579d3287593d663a8586cfd25c90246b1a4', onBlur: this.blurHandler, onFocus: this.focusHandler }, h("li", { key: '954549390e447ec43ccf681949095d1393d9068a', class: {
                [CSS.container]: true,
                [CSS.isParentVertical]: this.topLevelMenuLayout === "vertical",
            }, role: "none" }, h("div", { key: '6130156128f303bb225007e337fae78385614cf5', class: CSS.itemContent }, h("a", { key: '9103ba8f3683feb1eb2301f05412b434c39ec3d3', "aria-current": this.isFocused ? "page" : false, "aria-expanded": toAriaBoolean(this.open), "aria-haspopup": toAriaBoolean(this.hasSubmenu), "aria-label": this.label, class: { [CSS.layoutVertical]: this.layout === "vertical", [CSS.content]: true }, href: this.href, onClick: this.clickHandler, onKeyDown: this.keyDownHandler, ref: (el) => (this.anchorEl = el), rel: this.rel, role: "menuitem", tabIndex: this.isTopLevelItem ? 0 : -1, target: this.target }, this.renderItemContent(dir)), this.href && this.hasSubmenu ? this.renderDropdownAction(dir) : null), this.renderSubmenuItems(dir))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
CalciteMenuItem.style = CalciteMenuItemStyle0;

export { CalciteMenuItem as calcite_menu_item };
