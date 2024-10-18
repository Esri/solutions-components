/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules2.js';
import { g as getMessages } from './locale3.js';
import { d as defineCustomElement$8 } from './avatar.js';
import { d as defineCustomElement$7 } from './button.js';
import { d as defineCustomElement$6 } from './dropdown.js';
import { d as defineCustomElement$5 } from './dropdown-group.js';
import { d as defineCustomElement$4 } from './dropdown-item.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './loader.js';
import { d as defineCustomElement$1 } from './navigation-user.js';

const instantAppsSignInCss = ":host{display:block;box-shadow:none !important}:host .instant-apps-sign-in__container{height:inherit;display:flex;align-items:center}:host .instant-apps-sign-in__container calcite-dropdown,:host .instant-apps-sign-in__container calcite-navigation-user{height:100%}:host .instant-apps-sign-in__container calcite-navigation-user{--calcite-color-foreground-2:rgba(0, 0, 0, 0.04);--calcite-color-foreground-3:rgba(0, 0, 0, 0.04)}:host .instant-apps-sign-in__container .instant-apps-sign-in__sign-in-btn{margin:10px}:host .instant-apps-sign-in__container calcite-dropdown[scale=m] calcite-dropdown-group{min-width:140px}:host .instant-apps-sign-in__container calcite-dropdown[scale=s] calcite-dropdown-group{min-width:100px}:host .instant-apps-sign-in__container button{height:32px;width:32px;padding:0;box-sizing:border-box;display:flex;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;appearance:none;-moz-appearance:none;-webkit-appearance:none;text-decoration-line:none;transition:color var(--calcite-animation-timing) ease-in-out, background-color var(--calcite-animation-timing) ease-in-out, box-shadow var(--calcite-animation-timing) ease-in-out, outline-color var(--calcite-internal-animation-timing-fast) ease-in-out;border:none;border-radius:50%;background:#000}:host .instant-apps-sign-in__container button:hover calcite-avatar{opacity:0.7;transition:0.3s}:host .instant-apps-sign-in__landing-page{display:flex;flex-direction:column;justify-content:center;padding:40px;width:50%;min-height:30%;background:rgba(255, 255, 255, 0.8);color:#151515;text-align:center}:host .instant-apps-sign-in__landing-page h1{font-size:22px;margin:10px 0}:host .instant-apps-sign-in__landing-page h2{font-size:16px;margin:0 0 10px}:host .instant-apps-sign-in__landing-page p{font-size:16px;margin:0}:host .instant-apps-sign-in__entry-button{--calcite-color-brand:var(--instant-apps-landing-page-entry-button-color);--calcite-color-brand-hover:var(--instant-apps-landing-page-entry-button-color);--calcite-color-brand-press:var(--instant-apps-landing-page-entry-button-color)}@media screen and (max-width: 767px){:host{flex-direction:column;align-items:center}:host calcite-button{width:100%}:host .instant-apps-sign-in__entry-button-container{display:flex;flex-direction:column}}";
const InstantAppsSignInStyle0 = instantAppsSignInCss;

const CSS = {
    base: 'instant-apps-sign-in__container',
    SignInBtn: 'instant-apps-sign-in__sign-in-btn',
    buttonContainer: 'instant-apps-sign-in__entry-button-container',
    entryButton: 'instant-apps-sign-in__entry-button',
};
const InstantAppsSignIn = /*@__PURE__*/ proxyCustomElement(class InstantAppsSignIn extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.type = 'navigation';
        this.portal = undefined;
        this.oauthappid = undefined;
        this.openInPopup = undefined;
        this.landingPage = undefined;
        this.isSignedIn = undefined;
        this.user = undefined;
        this.titleText = undefined;
        this.subtitleText = undefined;
        this.descriptionText = undefined;
        this.closeLandingPage = undefined;
        this.signInDropdownItems = undefined;
        this.ready = false;
        this.messages = undefined;
    }
    async watchPortal() {
        await this.initSignIn();
    }
    async watchOauthappid() {
        await this.initSignIn();
    }
    async componentWillLoad() {
        getMessages(this);
        await this.initSignIn();
    }
    render() {
        const signIn = this.ready ? this.renderContent() : null;
        return h(Host, { key: 'af7ff807a996fd2dbbc647988fc24e5a122c4efe' }, signIn);
    }
    renderContent() {
        return this.type === 'landingPage' ? this.renderLandingPageSignIn() : this.renderSignInContainer();
    }
    renderSignInContainer() {
        return h("div", { class: CSS.base }, this.isSignedIn ? this.renderSignInDropdown() : this.renderSignInButton());
    }
    renderSignInDropdown() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const dropdownScale = this.type === 'navigation' ? 'm' : 's';
        return (h("calcite-dropdown", { placement: "bottom-end", scale: dropdownScale }, this.type === 'navigation' ? (h("calcite-navigation-user", { slot: "trigger", thumbnail: (_a = this.user) === null || _a === void 0 ? void 0 : _a.thumbnailUrl, "full-name": (_b = this.user) === null || _b === void 0 ? void 0 : _b.fullName, username: (_c = this.user) === null || _c === void 0 ? void 0 : _c.username, textDisabled: true })) : (h("button", { slot: "trigger" }, h("calcite-avatar", { thumbnail: (_d = this.user) === null || _d === void 0 ? void 0 : _d.thumbnailUrl, "full-name": (_e = this.user) === null || _e === void 0 ? void 0 : _e.fullName, username: (_f = this.user) === null || _f === void 0 ? void 0 : _f.username }))), h("slot", { name: "sign-in-dropdown-top" }), h("calcite-dropdown-group", { "selection-mode": "none" }, (_g = this.signInDropdownItems) === null || _g === void 0 ? void 0 :
            _g.map(item => h("calcite-dropdown-item", { onClick: item.onClick }, item.label)), h("calcite-dropdown-item", { onClick: this.signOut.bind(this) }, (_h = this.messages) === null || _h === void 0 ? void 0 : _h.signOut))));
    }
    renderSignInButton() {
        var _a;
        const appearance = this.type === 'navigation' ? 'transparent' : 'solid';
        const className = this.type === 'navigation' ? CSS.SignInBtn : '';
        return (h("calcite-button", { class: className, onClick: this.signIn.bind(this), scale: "s", "icon-start": "sign-in", appearance: appearance }, (_a = this.messages) === null || _a === void 0 ? void 0 : _a.signIn));
    }
    renderLandingPageSignIn() {
        var _a, _b;
        return (h("div", { class: CSS.buttonContainer }, h("calcite-button", { class: CSS.entryButton, scale: "l", appearance: "outline-fill", width: "half", onClick: this.landingPageSignIn.bind(this) }, (_a = this.messages) === null || _a === void 0 ? void 0 : _a.signIn), h("calcite-button", { class: CSS.entryButton, scale: "l", appearance: "outline-fill", width: "half", onClick: this.guestOnClick.bind(this) }, (_b = this.messages) === null || _b === void 0 ? void 0 : _b.continueAsGuest)));
    }
    async initSignIn() {
        if (this.portal == null || this.oauthappid == null)
            return;
        const [OAuthInfo, esriId, reactiveUtils] = await loadModules(['esri/identity/OAuthInfo', 'esri/identity/IdentityManager', 'esri/core/reactiveUtils']);
        this.idManager = esriId;
        this.info = new OAuthInfo({
            appId: this.oauthappid,
            portalUrl: this.portal.url,
            flowType: 'authorization-code',
            popup: this.openInPopup,
        });
        this.idManager.registerOAuthInfos([this.info]);
        this.isSignedIn = await this.checkSignInStatus();
        this.ready = true;
        await reactiveUtils.whenOnce(() => this.portal.user);
        this.user = this.portal.user;
        this.ready = true;
    }
    async signIn() {
        this.setSignInLocalStorage();
        await this.idManager.getCredential(`${this.info.portalUrl}/sharing`, {
            oAuthPopupConfirmation: false,
        });
        await this.checkSignInStatus();
    }
    signOut() {
        var _a;
        (_a = this.portal.credential) === null || _a === void 0 ? void 0 : _a.destroy();
        this.idManager.destroyCredentials();
        this.portal.authMode = 'anonymous';
        this.portal.credential = null;
        const rdUrl = window.location.href;
        this.setSignInLocalStorage();
        window.location.href = `${this.portal.restUrl}/oauth2/signout?client_id=${this.oauthappid}&redirect_uri=${rdUrl}`;
    }
    async landingPageSignIn() {
        await this.signIn();
        if (this.closeLandingPage != null) {
            this.closeLandingPage();
        }
    }
    guestOnClick() {
        if (this.isSignedIn) {
            this.signOut();
        }
        else if (this.closeLandingPage != null) {
            this.closeLandingPage();
        }
    }
    async checkSignInStatus() {
        try {
            const credential = await this.idManager.checkSignInStatus(`${this.info.portalUrl}/sharing`);
            this.portal.credential = credential;
            return true;
        }
        catch (_a) {
            this.portal.credential = null;
            return false;
        }
    }
    setSignInLocalStorage() {
        const date = new Date();
        localStorage.setItem('signing-in', date.getTime().toString());
        // remove from local storage if page doens't immediately redirect to sign in
        setTimeout(() => {
            localStorage.removeItem('signing-in');
        }, 2000);
    }
    get el() { return this; }
    static get watchers() { return {
        "portal": ["watchPortal"],
        "oauthappid": ["watchOauthappid"]
    }; }
    static get style() { return InstantAppsSignInStyle0; }
}, [1, "instant-apps-sign-in", {
        "type": [1],
        "portal": [16],
        "oauthappid": [1],
        "openInPopup": [4, "open-in-popup"],
        "landingPage": [4, "landing-page"],
        "titleText": [1, "title-text"],
        "subtitleText": [1, "subtitle-text"],
        "descriptionText": [1, "description-text"],
        "closeLandingPage": [16],
        "signInDropdownItems": [16],
        "isSignedIn": [32],
        "user": [32],
        "ready": [32],
        "messages": [32]
    }, undefined, {
        "portal": ["watchPortal"],
        "oauthappid": ["watchOauthappid"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-sign-in", "calcite-avatar", "calcite-button", "calcite-dropdown", "calcite-dropdown-group", "calcite-dropdown-item", "calcite-icon", "calcite-loader", "calcite-navigation-user"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-sign-in":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsSignIn);
            }
            break;
        case "calcite-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-dropdown":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-dropdown-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-dropdown-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-navigation-user":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { InstantAppsSignIn as I, defineCustomElement as d };
