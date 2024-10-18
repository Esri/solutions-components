/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './p-4e6eb06e.js';
import { g as getElementDir } from './p-ac122d9e.js';
import { S as Sanitizer } from './p-7530a02f.js';
import { w as widthBreakpoints } from './p-04674a1e.js';
import { g as getFontFamily } from './p-a42ff7fe.js';
import './p-0a24ad5f.js';
import './p-d4056c1c.js';

const instantAppsHeaderCss = ":host{--instant-apps-header-height:auto;--instant-apps-header-min-height:50px;--instant-apps-header-title-text-link-decoration:underline;--instant-apps-header-height--logo-scale--s:55px;--instant-apps-header-logo-width--logo-scale--s:35px;--instant-apps-header-logo-height--logo-scale--s:35px;--instant-apps-header-height--logo-scale--m:70px;--instant-apps-header-logo-width--logo-scale--m:50px;--instant-apps-header-logo-height--logo-scale--m:50px;--instant-apps-header-height--logo-scale--l:80px;--instant-apps-header-logo-width--logo-scale--l:60px;--instant-apps-header-logo-height--logo-scale--l:60px;--instant-apps-header-actions-end-height:auto;width:100%}:host .image.image_resized img{width:100%}:host .instant-apps-header--standard{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;width:100%;height:var(--instant-apps-header-height);background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-1);font-family:var(--calcite-sans-family);min-height:var(--instant-apps-header-min-height)}:host .instant-apps-header--standard .instant-apps-header__header-container{display:flex;align-items:center;width:100%;height:inherit}:host .instant-apps-header--standard .instant-apps-header__header-container slot{display:flex;height:inherit}:host .instant-apps-header--standard .instant-apps-header__header-container ::slotted(*){display:flex;min-height:var(--instant-apps-header-min-height);height:var(--instant-apps-header-height)}:host .instant-apps-header--standard .instant-apps-header__header-container ::slotted(*) calcite-button{height:100%}:host .instant-apps-header--standard .instant-apps-header__header-content{box-sizing:border-box;display:flex;align-items:center;width:100%;min-width:0;height:inherit;padding:5px 10px}:host .instant-apps-header--standard .instant-apps-header__header-content a{display:flex;align-items:center;-webkit-text-decoration:var(--instant-apps-header-title-text-link-decoration);text-decoration:var(--instant-apps-header-title-text-link-decoration)}:host .instant-apps-header--standard .instant-apps-header__header-content a img{padding-right:0}:host .instant-apps-header--standard .instant-apps-header__header-content img{margin:10px}:host .instant-apps-header--standard .instant-apps-header__header-content h1{margin:0;font-size:1.25rem;color:var(--calcite-color-text-1);font-weight:430;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host .instant-apps-header--standard .instant-apps-header__header-content #infoButton{margin-inline-start:10px}:host .instant-apps-header--standard .instant-apps-header__header-content--center{justify-content:center}:host .instant-apps-header--standard .instant-apps-header__header-content--right{justify-content:end}:host .instant-apps-header__logo-height--s{height:var(--instant-apps-header-height--logo-scale--s)}:host .instant-apps-header__logo-height--s .instant-apps-header__header-content h1{font-size:1.125rem}:host .instant-apps-header__logo-scale--s{width:var(--instant-apps-header-logo-width--logo-scale--s);height:var(--instant-apps-header-logo-height--logo-scale--s)}:host .instant-apps-header__logo-height--m{height:var(--instant-apps-header-height--logo-scale--m)}:host .instant-apps-header__logo-scale--m{width:var(--instant-apps-header-logo-width--logo-scale--m);height:var(--instant-apps-header-logo-height--logo-scale--m)}:host .instant-apps-header__logo-height--l{height:var(--instant-apps-header-height--logo-scale--l)}:host .instant-apps-header__logo-height--l .instant-apps-header__header-content h1{font-size:1.375rem}:host .instant-apps-header__logo-scale--l{width:var(--instant-apps-header-logo-width--logo-scale--l);height:var(--instant-apps-header-logo-height--logo-scale--l)}:host .instant-apps-header__actions-end-container{height:var(--instant-apps-header-actions-end-height);display:flex}:host .instant-apps-header__sign-in-container{height:inherit;display:flex;align-items:center}:host .instant-apps-header__sign-in-container calcite-dropdown,:host .instant-apps-header__sign-in-container calcite-navigation-user{height:100%}:host .instant-apps-header__sign-in-container calcite-button{margin:0 10px}:host .instant-apps-header__sign-in-container calcite-dropdown-group{min-width:140px}";
const InstantAppsHeaderStyle0 = instantAppsHeaderCss;

const CSS = {
    base: 'instant-apps-header--standard',
    headerContainer: 'instant-apps-header__header-container',
    headerContent: 'instant-apps-header__header-content',
    flipRtl: 'instant-apps-header--rtl',
    logoScale: 'instant-apps-header__logo-scale--',
    logoHeight: 'instant-apps-header__logo-height--',
    standardHeight: 'instant-apps-header__standard-height',
    actionsEndContainer: 'instant-apps-header__actions-end-container',
    alignment: {
        center: 'instant-apps-header__header-content--center',
        right: 'instant-apps-header__header-content--right',
    },
};
const InstantAppsHeader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.infoIsOpenChanged = createEvent(this, "infoIsOpenChanged", 6);
        this._sanitizer = new Sanitizer({
            whiteList: {
                h1: ['style'],
                h2: ['style'],
                h3: ['style'],
                h4: ['style'],
                h5: ['style'],
                h6: ['style'],
                img: ['style', 'src', 'width', 'height'],
                pre: ['style'],
                p: ['id', 'class', 'style'],
                div: ['id', 'class', 'style', 'role'],
                span: ['id', 'class', 'style', 'role'],
                figure: ['class', 'style'],
                header: ['id', 'class', 'style', 'role'],
            },
        }, true);
        this.dir = undefined;
        this.titleText = undefined;
        this.titleTextLink = undefined;
        this.backgroundColor = undefined;
        this.textColor = undefined;
        this.logoImage = undefined;
        this.logoScale = 'm';
        this.logoImageAltText = undefined;
        this.logoLink = undefined;
        this.infoButton = false;
        this.infoIsOpen = false;
        this.infoTitleText = undefined;
        this.customHeaderHtml = undefined;
        this.headerAlignment = 'left';
        this.customHeaderCss = undefined;
        this.fontFamily = 'var(--calcite-sans-family);';
        this.mobileWidthBreakpoint = widthBreakpoints.medium[1];
        this.initialScale = 'm';
    }
    sanitizeCustomHeaderHtml() {
        this.customHeaderHtml = this._sanitizer.sanitize(this.customHeaderHtml);
    }
    componentWillLoad() {
        this.dir = getElementDir(this.el);
        this.handleMobileBreakpoints();
        this.dir = getElementDir(this.el);
        this.customHeaderHtml = this._sanitizer.sanitize(this.customHeaderHtml);
    }
    render() {
        var _a, _b, _c, _d;
        const hasEmptyLogo = this.logoImage === 'undefined' || ((_b = (_a = this.logoImage) === null || _a === void 0 ? void 0 : _a.split('?')) === null || _b === void 0 ? void 0 : _b[0]) === 'undefined' || ((_d = (_c = this.logoImage) === null || _c === void 0 ? void 0 : _c.split('?')) === null || _d === void 0 ? void 0 : _d[0]) === '' || !this.logoImage;
        const logo = this.renderLogo(hasEmptyLogo);
        const title = this.renderTitle();
        const headerContentClass = this.headerAlignment === 'right' || this.headerAlignment === 'center' ? CSS.headerContent.concat(' ', CSS.alignment[this.headerAlignment]) : CSS.headerContent;
        const fontFamily = getFontFamily(this.fontFamily);
        return (h(Host, { key: 'f2d1760c4a1345ef24c913a24f95691d0de6867d' }, this.customHeaderHtml ? ([h("style", null, this.customHeaderCss), h("div", { id: "customHeader", innerHTML: this.customHeaderHtml })]) : (h("header", { class: `${CSS.base}${this.dir === 'rtl' ? ` ${CSS.flipRtl}` : ''}${this.logoImage && !hasEmptyLogo ? ` ${CSS.logoHeight}${this.logoScale}` : ` ${CSS.standardHeight}`}`, style: { backgroundColor: this.backgroundColor, fontFamily } }, h("div", { class: CSS.headerContainer }, h("span", { class: headerContentClass }, logo, title, this.infoButton ? (h("calcite-button", { style: { '--calcite-color-text-1': this.textColor }, id: "infoButton", alignment: "start", appearance: "transparent", kind: "neutral", "icon-start": "information-f", scale: "s", label: this.infoTitleText, title: this.infoTitleText, onClick: this.toggleInfo.bind(this) })) : null), h("div", { class: CSS.actionsEndContainer }, h("slot", { name: "actions-end" })))))));
    }
    renderLogo(hasEmptyLogo) {
        return hasEmptyLogo ? ('') : this.logoImage && this.logoLink ? (h("a", { href: `${this.logoLink}`, target: "_blank" }, h("img", { class: `${CSS.logoScale}${this.logoScale}`, src: `${this.logoImage}`, alt: `${this.logoImageAltText}` }))) : this.logoImage ? (h("img", { class: `${CSS.logoScale}${this.logoScale}`, src: `${this.logoImage}`, alt: this.logoImageAltText })) : ('');
    }
    renderTitle() {
        return this.titleText && this.titleTextLink ? (h("a", { style: { color: this.textColor }, href: `${this.titleTextLink}`, rel: "noopener noreferrer", target: "_blank" }, h("h1", { style: { color: this.textColor } }, this.titleText))) : (h("h1", { style: { color: this.textColor } }, this.titleText));
    }
    toggleInfo() {
        this.infoIsOpen = !this.infoIsOpen;
        this.infoIsOpenChanged.emit(this.infoIsOpen);
        return Promise.resolve();
    }
    mqlCallback() {
        return event => {
            const { matches } = event;
            if (matches) {
                this.logoScale = 's';
                return;
            }
            this.logoScale = this.initialScale;
        };
    }
    handleMobileBreakpoints() {
        this.initialScale = this.logoScale;
        const mediaQuery = `(max-width: ${this.mobileWidthBreakpoint}px)`;
        const mql = window.matchMedia(mediaQuery);
        if (mql.matches) {
            this.logoScale = 's';
        }
        mql.addEventListener('change', this.mqlCallback());
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "customHeaderHtml": ["sanitizeCustomHeaderHtml"]
    }; }
};
InstantAppsHeader.style = InstantAppsHeaderStyle0;

export { InstantAppsHeader as instant_apps_header };
