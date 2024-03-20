/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, g as getElement } from './index-164d485a.js';
import { u as slotChangeHasAssignedElement } from './dom-38c6f027.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable-37e7fbd6.js';
import './guid-b75a5f7b.js';
import './resources-8834f920.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    container: "container",
    containerContent: "container-content",
    hasProgress: "progress-bar",
    hide: "hide",
    primary: "primary",
    secondary: "secondary",
    tertiary: "tertiary",
};
const SLOTS = {
    logo: "logo",
    user: "user",
    progress: "progress",
    navigationAction: "navigation-action",
    contentStart: "content-start",
    contentEnd: "content-end",
    contentCenter: "content-center",
    navSecondary: "navigation-secondary",
    navTertiary: "navigation-tertiary",
};
const ICONS = {
    hamburger: "hamburger",
};

const navigationCss = ":host([hidden]){display:none}[hidden]{display:none}.container{display:flex;inline-size:100%;flex-direction:column;margin-block:0;margin-inline:auto;background-color:var(--calcite-navigation-background, var(--calcite-color-foreground-1))}.container.primary,.container.secondary,.container.tertiary{border-block-end:1px solid;border-block-end-color:var(--calcite-navigation-border-color, var(--calcite-color-border-3))}.user,.logo{display:flex}.hide{display:none}.primary{block-size:4rem}.secondary{block-size:3rem}.tertiary{block-size:3rem}.container-content{margin-inline:auto;display:flex;block-size:100%;inline-size:100%;margin-block:0;inline-size:var(--calcite-navigation-width, 100%);max-inline-size:100%}.container-content.progress-bar{margin-block-start:0.125rem}slot[name]{display:flex;flex-direction:row}slot[name=navigation-secondary]::slotted(calcite-navigation),slot[name=navigation-tertiary]::slotted(calcite-navigation){inline-size:100%}slot[name=content-start]::slotted(*),slot[name=content-center]::slotted(*),slot[name=content-end]::slotted(*){display:flex;flex-direction:row;align-items:center}slot[name=progress],slot[name=progress] calcite-progress{inset-block-start:0;inset-inline:0}slot[name=content-end]{margin-inline-start:auto}slot[name=content-start]{margin-inline-end:auto}slot[name=content-end],slot[name=logo]~slot[name=user],slot[name=user]:only-child{margin-inline-start:auto}slot[name=content-center]{margin-inline-start:auto;margin-inline-end:auto}slot[name=content-start]~slot[name=content-center]{margin-inline-start:0px}slot[name=content-start]~slot[name=content-end],slot[name=content-center]~slot[name=content-end],slot[name=content-center]~slot[name=user],slot[name=content-end]~slot[name=user]{margin:0px}";

const CalciteNavigation = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteNavigationActionSelect = createEvent(this, "calciteNavigationActionSelect", 6);
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.actionClickHandler = () => {
            this.calciteNavigationActionSelect.emit();
        };
        this.handleUserSlotChange = (event) => {
            if (this.isPrimaryLevel()) {
                this.userSlotHasElements = slotChangeHasAssignedElement(event);
            }
        };
        this.handleLogoSlotChange = (event) => {
            if (this.isPrimaryLevel()) {
                this.logoSlotHasElements = slotChangeHasAssignedElement(event);
            }
        };
        this.handleContentStartSlotChange = (event) => {
            if (this.isPrimaryLevel()) {
                this.primaryContentStartSlotHasElements = slotChangeHasAssignedElement(event);
            }
        };
        this.handleContentEndSlotChange = (event) => {
            if (this.isPrimaryLevel()) {
                this.primaryContentEndSlotHasElements = slotChangeHasAssignedElement(event);
            }
        };
        this.handleContentCenterSlotChange = (event) => {
            if (this.isPrimaryLevel()) {
                this.primaryContentCenterSlotHasElements = slotChangeHasAssignedElement(event);
            }
        };
        this.handleSecondarySlotChange = (event) => {
            this.secondarySlotHasElements = slotChangeHasAssignedElement(event);
        };
        this.handleTertiarySlotChange = (event) => {
            this.tertiarySlotHasElements = slotChangeHasAssignedElement(event);
        };
        this.handleMenuActionSlotChange = (event) => {
            if (this.isPrimaryLevel()) {
                this.navigationActionSlotHasElements = slotChangeHasAssignedElement(event);
                if (this.navigationActionSlotHasElements) {
                    this.navigationAction = false;
                }
            }
        };
        this.handleProgressSlotChange = (event) => {
            if (this.isPrimaryLevel()) {
                this.progressSlotHasElement = slotChangeHasAssignedElement(event);
            }
        };
        this.label = undefined;
        this.navigationAction = false;
        this.logoSlotHasElements = undefined;
        this.navigationActionSlotHasElements = undefined;
        this.primaryContentCenterSlotHasElements = undefined;
        this.primaryContentEndSlotHasElements = undefined;
        this.primaryContentStartSlotHasElements = undefined;
        this.progressSlotHasElement = undefined;
        this.secondarySlotHasElements = undefined;
        this.tertiarySlotHasElements = undefined;
        this.userSlotHasElements = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** When `navigationAction` is `true`, sets focus on the component's action element. */
    async setFocus() {
        var _a;
        await componentFocusable(this);
        return (_a = this.navigationActionEl) === null || _a === void 0 ? void 0 : _a.setFocus();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    isPrimaryLevel() {
        return this.el.slot !== SLOTS.navSecondary && this.el.slot !== SLOTS.navTertiary;
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    renderMenuAction() {
        return (h("slot", { name: SLOTS.navigationAction, onSlotchange: this.handleMenuActionSlotChange }, this.navigationAction && (h("calcite-action", { icon: ICONS.hamburger, onClick: this.actionClickHandler, text: this.label,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.navigationActionEl = el) }))));
    }
    render() {
        const primaryLevelHasElements = this.logoSlotHasElements ||
            this.userSlotHasElements ||
            this.navigationActionSlotHasElements ||
            this.primaryContentCenterSlotHasElements ||
            this.primaryContentEndSlotHasElements ||
            this.primaryContentStartSlotHasElements ||
            this.navigationAction;
        const slotName = this.el.slot;
        return (h(Host, null, h("div", { class: {
                [CSS.container]: true,
                [CSS.secondary]: slotName === SLOTS.navSecondary,
                [CSS.tertiary]: slotName === SLOTS.navTertiary,
                [CSS.primary]: primaryLevelHasElements,
            } }, h("div", { class: { [CSS.hide]: !this.progressSlotHasElement, [SLOTS.progress]: true } }, h("slot", { name: SLOTS.progress, onSlotchange: this.handleProgressSlotChange })), h("div", { class: { [CSS.containerContent]: true, [CSS.hasProgress]: this.progressSlotHasElement } }, this.renderMenuAction(), h("div", { class: { [CSS.hide]: !this.logoSlotHasElements, [SLOTS.logo]: true } }, h("slot", { name: SLOTS.logo, onSlotchange: this.handleLogoSlotChange })), h("slot", { name: SLOTS.contentStart, onSlotchange: this.handleContentStartSlotChange }), h("slot", { name: SLOTS.contentCenter, onSlotchange: this.handleContentCenterSlotChange }), h("slot", { name: SLOTS.contentEnd, onSlotchange: this.handleContentEndSlotChange }), h("div", { class: { [CSS.hide]: !this.userSlotHasElements, [SLOTS.user]: true } }, h("slot", { name: SLOTS.user, onSlotchange: this.handleUserSlotChange })))), h(Fragment, null, h("slot", { name: SLOTS.navSecondary, onSlotchange: this.handleSecondarySlotChange }), h("slot", { name: SLOTS.navTertiary, onSlotchange: this.handleTertiarySlotChange }))));
    }
    get el() { return getElement(this); }
};
CalciteNavigation.style = navigationCss;

export { CalciteNavigation as calcite_navigation };
