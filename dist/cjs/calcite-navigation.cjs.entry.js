/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const dom = require('./dom-c9c2c835.js');
const loadable = require('./loadable-5a794992.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');

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
        index.registerInstance(this, hostRef);
        this.calciteNavigationActionSelect = index.createEvent(this, "calciteNavigationActionSelect", 6);
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
                this.userSlotHasElements = dom.slotChangeHasAssignedElement(event);
            }
        };
        this.handleLogoSlotChange = (event) => {
            if (this.isPrimaryLevel()) {
                this.logoSlotHasElements = dom.slotChangeHasAssignedElement(event);
            }
        };
        this.handleContentStartSlotChange = (event) => {
            if (this.isPrimaryLevel()) {
                this.primaryContentStartSlotHasElements = dom.slotChangeHasAssignedElement(event);
            }
        };
        this.handleContentEndSlotChange = (event) => {
            if (this.isPrimaryLevel()) {
                this.primaryContentEndSlotHasElements = dom.slotChangeHasAssignedElement(event);
            }
        };
        this.handleContentCenterSlotChange = (event) => {
            if (this.isPrimaryLevel()) {
                this.primaryContentCenterSlotHasElements = dom.slotChangeHasAssignedElement(event);
            }
        };
        this.handleSecondarySlotChange = (event) => {
            this.secondarySlotHasElements = dom.slotChangeHasAssignedElement(event);
        };
        this.handleTertiarySlotChange = (event) => {
            this.tertiarySlotHasElements = dom.slotChangeHasAssignedElement(event);
        };
        this.handleMenuActionSlotChange = (event) => {
            if (this.isPrimaryLevel()) {
                this.navigationActionSlotHasElements = dom.slotChangeHasAssignedElement(event);
                if (this.navigationActionSlotHasElements) {
                    this.navigationAction = false;
                }
            }
        };
        this.handleProgressSlotChange = (event) => {
            if (this.isPrimaryLevel()) {
                this.progressSlotHasElement = dom.slotChangeHasAssignedElement(event);
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
        await loadable.componentFocusable(this);
        return (_a = this.navigationActionEl) === null || _a === void 0 ? void 0 : _a.setFocus();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
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
        return (index.h("slot", { name: SLOTS.navigationAction, onSlotchange: this.handleMenuActionSlotChange }, this.navigationAction && (index.h("calcite-action", { icon: ICONS.hamburger, onClick: this.actionClickHandler, text: this.label,
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
        return (index.h(index.Host, null, index.h("div", { class: {
                [CSS.container]: true,
                [CSS.secondary]: slotName === SLOTS.navSecondary,
                [CSS.tertiary]: slotName === SLOTS.navTertiary,
                [CSS.primary]: primaryLevelHasElements,
            } }, index.h("div", { class: { [CSS.hide]: !this.progressSlotHasElement, [SLOTS.progress]: true } }, index.h("slot", { name: SLOTS.progress, onSlotchange: this.handleProgressSlotChange })), index.h("div", { class: { [CSS.containerContent]: true, [CSS.hasProgress]: this.progressSlotHasElement } }, this.renderMenuAction(), index.h("div", { class: { [CSS.hide]: !this.logoSlotHasElements, [SLOTS.logo]: true } }, index.h("slot", { name: SLOTS.logo, onSlotchange: this.handleLogoSlotChange })), index.h("slot", { name: SLOTS.contentStart, onSlotchange: this.handleContentStartSlotChange }), index.h("slot", { name: SLOTS.contentCenter, onSlotchange: this.handleContentCenterSlotChange }), index.h("slot", { name: SLOTS.contentEnd, onSlotchange: this.handleContentEndSlotChange }), index.h("div", { class: { [CSS.hide]: !this.userSlotHasElements, [SLOTS.user]: true } }, index.h("slot", { name: SLOTS.user, onSlotchange: this.handleUserSlotChange })))), index.h(index.Fragment, null, index.h("slot", { name: SLOTS.navSecondary, onSlotchange: this.handleSecondarySlotChange }), index.h("slot", { name: SLOTS.navTertiary, onSlotchange: this.handleTertiarySlotChange }))));
    }
    get el() { return index.getElement(this); }
};
CalciteNavigation.style = navigationCss;

exports.calcite_navigation = CalciteNavigation;
