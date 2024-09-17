/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, g as getElement } from './p-6eb37ed2.js';
import { s as slotChangeHasAssignedElement } from './p-68ec5c15.js';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './p-18f18ab3.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';
import './p-acaae81d.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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
const CalciteNavigationStyle0 = navigationCss;

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
        await componentFocusable(this);
        return this.navigationActionEl?.setFocus();
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
        return (h("slot", { name: SLOTS.navigationAction, onSlotchange: this.handleMenuActionSlotChange }, this.navigationAction && (h("calcite-action", { icon: ICONS.hamburger, onClick: this.actionClickHandler, ref: (el) => (this.navigationActionEl = el), text: this.label }))));
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
        return (h(Host, { key: 'e7719159ddeee3397fd1e483c8417978b2b72c66' }, h("div", { key: '9d3096793d009c813f1bc42f8fecf46736747afc', class: {
                [CSS.container]: true,
                [CSS.secondary]: slotName === SLOTS.navSecondary,
                [CSS.tertiary]: slotName === SLOTS.navTertiary,
                [CSS.primary]: primaryLevelHasElements,
            } }, h("div", { key: '4e35300aeaea8f4ceb1b69d913157306d11a17ec', class: { [CSS.hide]: !this.progressSlotHasElement, [SLOTS.progress]: true } }, h("slot", { key: '50c46611fcab6af0fe8d458641123d40823334bd', name: SLOTS.progress, onSlotchange: this.handleProgressSlotChange })), h("div", { key: '3f0b76520d4de477629397f607c0520472dd9419', class: { [CSS.containerContent]: true, [CSS.hasProgress]: this.progressSlotHasElement } }, this.renderMenuAction(), h("div", { key: 'fb5d2f6a84e5e7a05ced40f955f36e215a923217', class: { [CSS.hide]: !this.logoSlotHasElements, [SLOTS.logo]: true } }, h("slot", { key: '53aa3fdadf8fedefa9a9aec810e28277629bfb01', name: SLOTS.logo, onSlotchange: this.handleLogoSlotChange })), h("slot", { key: '5e83ab5c75b1f1a76bbf0d12f3d3ae43625842f3', name: SLOTS.contentStart, onSlotchange: this.handleContentStartSlotChange }), h("slot", { key: '2b531019c48c10fc2d4dadfd34ae61f75233b80a', name: SLOTS.contentCenter, onSlotchange: this.handleContentCenterSlotChange }), h("slot", { key: 'feb1fae923a3540158fc889fdaf0c70a8db2f964', name: SLOTS.contentEnd, onSlotchange: this.handleContentEndSlotChange }), h("div", { key: '99544caa2724f8ec40d1bbd54b018c28893b822e', class: { [CSS.hide]: !this.userSlotHasElements, [SLOTS.user]: true } }, h("slot", { key: '2f0a3e1fc4ea5ba221699089b62986b96ed12f75', name: SLOTS.user, onSlotchange: this.handleUserSlotChange })))), h(Fragment, { key: '0f289531aa4d3805ac0774643f43988095db2a8d' }, h("slot", { key: '466d1b0aab0fd4ee4a4736746dd4eb441cfa6ebd', name: SLOTS.navSecondary, onSlotchange: this.handleSecondarySlotChange }), h("slot", { key: '3f2520c21f474cf0147865881724269970a9d8bd', name: SLOTS.navTertiary, onSlotchange: this.handleTertiarySlotChange }))));
    }
    get el() { return getElement(this); }
};
CalciteNavigation.style = CalciteNavigationStyle0;

export { CalciteNavigation as calcite_navigation };
