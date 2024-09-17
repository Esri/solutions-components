/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules2.js';
import { g as getMessages } from './locale3.js';
import { d as defineCustomElement$5 } from './action.js';
import { d as defineCustomElement$4 } from './button.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './loader.js';
import { d as defineCustomElement$1 } from './popover.js';

const instantAppsSocialShareCss = ":host{display:block;--instant-apps-social-share-action-width:initial;--instant-apps-social-share-width--s:200px;--instant-apps-social-share-width--m:280px;--instant-apps-social-share-width--l:320px;--instant-apps-social-share-width-horizontal--s:300px;--instant-apps-social-share-width-horizontal--m:380px;--instant-apps-social-share-width-horizontal--l:420px;--instant-apps-social-share-background-color:var(--calcite-color-foreground-1);--instant-apps-social-share-popover-button-background-color:transparent;--instant-apps-social-share-popover-button-icon-color:var(--calcite-ui-icon-color);--instant-apps-social-share-embed-border:1px solid $border;--instant-apps-social-share-embed-text-area-text:#468540}:host .instant-apps-social-share__popover-button{background-color:var(--instant-apps-social-share-popover-button-background-color)}:host .instant-apps-social-share__popover-button calcite-icon{color:var(--instant-apps-social-share-popover-button-icon-color)}:host .instant-apps-social-share__dialog,:host .instant-apps-social-share__dialog-embed{background-color:var(--instant-apps-social-share-background-color);border:var(--instant-apps-social-share-embed-border)}:host .instant-apps-social-share__dialog{box-sizing:border-box;height:auto;padding:10px 0;border-radius:5px;color:var(--calcite-color-text-1)}:host .instant-apps-social-share__options{margin:0;padding:1% 0 0 0;list-style-type:none}:host .instant-apps-social-share__options li{box-sizing:border-box;display:flex;align-items:center;width:100%;padding:5%;transition:background-color 0.15s ease-out 0s}:host .instant-apps-social-share__options li .instant-apps-social-share__icon,:host .instant-apps-social-share__options li .instant-apps-social-share__option-text{display:inline-block}:host .instant-apps-social-share__options li .instant-apps-social-share__icon{display:flex;align-items:center}:host .instant-apps-social-share__options li .instant-apps-social-share__option-text{width:85%;margin-left:10px;word-break:break-word}:host .instant-apps-social-share__options li .instant-apps-social-share__option-text--rtl{margin-left:0;margin-right:10px}:host .instant-apps-social-share__options li:hover{cursor:pointer;background-color:var(--calcite-color-foreground-2)}:host .instant-apps-social-share__options__x-logo--light path{fill:#000000}:host .instant-apps-social-share__options__x-logo--dark path{fill:#ffffff}:host .instant-apps-social-share__tip{box-sizing:border-box;padding:0 5% 1% 5%}:host .instant-apps-social-share__tip-header{display:flex;align-items:center;color:#007ac2;margin:8px 0 5px 0}:host .instant-apps-social-share__tip-header calcite-icon{margin-right:5px}:host .instant-apps-social-share__tip-content{line-height:17px;margin:0;padding-top:2%}:host .instant-apps-social-share__success{display:flex;flex-direction:column;padding:15px}:host .instant-apps-social-share__success-header{display:flex;align-items:center;font-weight:bold;margin-bottom:10px}:host .instant-apps-social-share__success-icon{display:flex;align-items:center;margin-right:5px}:host .instant-apps-social-share__success-icon calcite-icon{color:var(--calcite-color-status-success)}:host .instant-apps-social-share__success-message{line-height:16px}:host .instant-apps-social-share__embed{box-sizing:border-box;width:100%;padding:5%;margin-bottom:10px;border-top:1px solid #d3d3d3}:host .instant-apps-social-share__embed-header{display:flex;align-items:center;margin-bottom:5px}:host .instant-apps-social-share__embed-header calcite-icon{margin-right:5px}:host .instant-apps-social-share__embed-code-text-area{border:1px solid #d3d3d3}:host .instant-apps-social-share__embed-code-text-area textarea{box-sizing:border-box;padding:4%;border:none;resize:none;background:transparent;width:100%;font-family:var(--calcite-sans-family);color:var(--calcite-color-text-1)}:host .instant-apps-social-share__embed-code-text-area button{display:flex;align-items:center;text-align:start;width:100%;border:none;border-top:1px solid #d3d3d3;background-color:transparent;line-height:16px;font-weight:400;padding:3%;color:var(--calcite-color-text-1)}:host .instant-apps-social-share__embed-code-text-area button calcite-icon{color:#007ac2;margin-right:3px}:host .instant-apps-social-share__embed-code-text-area button:hover{cursor:pointer;background-color:var(--calcite-color-foreground-2);transition:background-color 0.15s ease-out 0s}:host .instant-apps-social-share__embed-text-area-text{font-weight:600;color:var(--instant-apps-social-share-embed-text-area-text)}:host .instant-apps-social-share__embed .instant-apps-social-share__text-area--rtl{text-align:left;direction:ltr}:host .instant-apps-social-share__embed-dimensions{display:flex;justify-content:space-between;margin-top:10px}:host .instant-apps-social-share__embed-dimensions-input{width:47%;box-sizing:border-box}:host .instant-apps-social-share__embed-dimensions-input input{border:1px solid #d3d3d3;width:100%;height:25px;font-family:var(--calcite-sans-family)}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options{display:flex;justify-content:space-around;margin-bottom:8%}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options li{flex-direction:column;padding:0}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options li .instant-apps-social-share__option-text{word-break:break-word;margin-left:0;margin-top:10px;text-align:center}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options li:hover{background-color:unset}:host .instant-apps-social-share__icon-container{display:flex;align-items:center}:host calcite-action{width:var(--instant-apps-social-share-action-width)}:host([scale=s]) .instant-apps-social-share__dialog{width:var(--instant-apps-social-share-width--s)}:host([scale=s]) .instant-apps-social-share__icon{width:16px;height:16px}:host([scale=s]) .instant-apps-social-share__option-text{font-size:var(--calcite-font-size--1)}:host([scale=s]) .instant-apps-social-share__dialog.instant-apps-social-share__layout--horizontal{width:var(--instant-apps-social-share-width-horizontal--s)}:host([scale=s]) .instant-apps-social-share__tip-header,:host([scale=s]) .instant-apps-social-share__tip-content,:host([scale=s]) .instant-apps-social-share__embed-header,:host([scale=s]) .instant-apps-social-share__embed-dimensions-input{font-size:var(--calcite-font-size--2)}:host([scale=m]) .instant-apps-social-share__dialog{width:var(--instant-apps-social-share-width--m)}:host([scale=m]) .instant-apps-social-share__icon{width:24px;height:24px}:host([scale=m]) .instant-apps-social-share__option-text{font-size:var(--calcite-font-size-0)}:host([scale=m]) .instant-apps-social-share__dialog.instant-apps-social-share__layout--horizontal{width:var(--instant-apps-social-share-width-horizontal--m)}:host([scale=m]) .instant-apps-social-share__tip-header,:host([scale=m]) .instant-apps-social-share__tip-content,:host([scale=m]) .instant-apps-social-share__embed-header,:host([scale=m]) .instant-apps-social-share__embed-dimensions-input{font-size:var(--calcite-font-size--1)}:host([scale=l]) .instant-apps-social-share__dialog{width:var(--instant-apps-social-share-width--l)}:host([scale=l]) .instant-apps-social-share__icon{width:32px;height:32px}:host([scale=l]) .instant-apps-social-share__option-text{font-size:var(--calcite-font-size-1)}:host([scale=l]) .instant-apps-social-share__dialog.instant-apps-social-share__layout--horizontal{width:var(--instant-apps-social-share-width-horizontal--l)}:host([scale=l]) .instant-apps-social-share__tip-header,:host([scale=l]) .instant-apps-social-share__tip-content,:host([scale=l]) .instant-apps-social-share__embed-header,:host([scale=l]) .instant-apps-social-share__embed-dimensions-input{font-size:var(--calcite-font-size-0)}";
const InstantAppsSocialShareStyle0 = instantAppsSocialShareCss;

const base = 'instant-apps-social-share';
const CALCITE_MODE_DARK = '.calcite-mode-dark';
const CSS = {
    base,
    dialog: `${base}__dialog`,
    dialogEmbed: `${base}__dialog-embed`,
    dialogContent: `${base}__dialog-content`,
    options: `${base}__options`,
    tipContainer: `${base}__tip`,
    tipHeader: `${base}__tip-header`,
    tipContent: `${base}__tip-content`,
    icon: `${base}__icon`,
    iconContainer: `${base}__icon-container`,
    optionText: `${base}__option-text`,
    popoverButton: `${base}__popover-button`,
    layout: {
        vertical: `${base}__layout--vertical`,
        horizontal: `${base}__layout--horizontal`,
    },
    xLogo: {
        light: `${base}__x-logo--light`,
        dark: `${base}__x-logo--dark`,
    },
    success: {
        container: `${base}__success`,
        header: `${base}__success-header`,
        message: `${base}__success-message`,
        icon: `${base}__success-icon`,
    },
    embed: {
        container: `${base}__embed`,
        header: `${base}__embed-header`,
        embedCode: {
            container: `${base}__embed-code`,
            textArea: `${base}__embed-code-text-area`,
            copyButton: `${base}__embed-code-copy-button`,
        },
        textAreaText: `${base}__embed-text-area-text`,
        dimensions: {
            container: `${base}__embed-dimensions`,
            input: `${base}__embed-dimensions-input`,
        },
    },
    rtl: {
        optionText: `${base}__option-text--rtl`,
        textArea: `${base}__text-area--rtl`,
    },
};
const SOCIAL_URL_TEMPLATES = {
    facebook: 'https://www.facebook.com/sharer/sharer.php?u={url}',
    x: 'https://x.com/intent/post?url={url}',
    linkedIn: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
};
const SHORTEN_API = 'https://arcg.is/prod/shorten';
const MIN_WIDTH_HEIGHT_VALUE = '1';
const InstantAppsSocialShare = /*@__PURE__*/ proxyCustomElement(class InstantAppsSocialShare extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.mode = 'popover';
        this.shareUrl = window.location.href;
        this.autoUpdateShareUrl = true;
        this.shareText = '';
        this.embed = false;
        this.shareButtonColor = 'neutral';
        this.shareButtonType = 'button';
        this.shareButtonScale = undefined;
        this.iframeInnerText = '';
        this.popoverButtonIconScale = 'm';
        this.view = undefined;
        this.displayTipText = true;
        this.shortenShareUrl = true;
        this.socialMedia = true;
        this.shareIconsLayout = 'vertical';
        this.scale = 'm';
        this.successMessage = '';
        this.defaultUrlParams = null;
        this.inlineSuccessPopoverPlacement = 'trailing';
        this.popoverPositioning = 'absolute';
        this.removePopoverOffset = false;
        this.messages = undefined;
        this.opened = false;
        this.copied = false;
        this.inlineCopyLinkOpened = false;
        this.inlineCopyEmbedOpened = false;
        this.embedWidth = 400;
        this.embedHeight = 600;
    }
    componentDidLoad() {
        var _a, _b;
        getMessages(this);
        this.setupAutoCloseListeners();
        if (this.mode === 'popover') {
            if (this.opened)
                this.popoverRef.open = true;
            this.popoverRef.addEventListener('calcitePopoverOpen', () => {
                if (!this.shareListRef)
                    return;
                const firstNode = this.shareListRef.children[0];
                firstNode.focus();
            });
            this.popoverRef.addEventListener('keydown', this.handlePopoverRefKeyDown.bind(this));
        }
        if (this.embed) {
            (_a = this.embedWidthRef) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.updateDimensions.bind(this, 'width'));
            (_b = this.embedHeightRef) === null || _b === void 0 ? void 0 : _b.addEventListener('change', this.updateDimensions.bind(this, 'height'));
        }
    }
    disconnectedCallback() {
        var _a, _b, _c;
        document.documentElement.removeEventListener('click', this.autoCloseCallback.bind(this));
        if (this.mode === 'popover') {
            if (this.popoverRef != null) {
                this.popoverRef.removeEventListener('click', this.stopPropagationCallback.bind(this));
                this.popoverRef.removeEventListener('calcitePopoverClose', this.resetPopoverCopyState.bind(this));
                this.popoverRef.removeEventListener('keydown', this.handlePopoverRefKeyDown.bind(this));
            }
        }
        else {
            (_a = this.embedWidthRef) === null || _a === void 0 ? void 0 : _a.removeEventListener('change', this.updateDimensions.bind(this));
            (_b = this.embedHeightRef) === null || _b === void 0 ? void 0 : _b.removeEventListener('change', this.updateDimensions.bind(this));
            (_c = this.dialogContentRef) === null || _c === void 0 ? void 0 : _c.removeEventListener('click', this.stopPropagationCallback.bind(this));
        }
    }
    setupAutoCloseListeners() {
        var _a, _b, _c;
        document.documentElement.addEventListener('click', this.autoCloseCallback.bind(this));
        if (this.mode === 'popover') {
            (_a = this.popoverRef) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.stopPropagationCallback.bind(this));
            (_b = this.popoverRef) === null || _b === void 0 ? void 0 : _b.addEventListener('calcitePopoverClose', this.resetPopoverCopyState.bind(this));
        }
        else {
            (_c = this.dialogContentRef) === null || _c === void 0 ? void 0 : _c.addEventListener('click', this.stopPropagationCallback.bind(this));
        }
    }
    handlePopoverRefKeyDown(e) {
        var _a, _b;
        if (e.code === 'Tab') {
            if (!this.shareListRef)
                return;
            const node = e.target;
            const firstFocusableEl = this.shareListRef.children[0];
            const lastFocusableEl = this.shareListRef.children[((_a = this.shareListRef) === null || _a === void 0 ? void 0 : _a.children.length) - 1];
            if (e.shiftKey && node === firstFocusableEl) {
                e.preventDefault();
                lastFocusableEl.focus();
            }
            else if (!e.shiftKey && node === lastFocusableEl) {
                e.preventDefault();
                firstFocusableEl.focus();
            }
        }
        else if (e.code === 'Escape') {
            this.closePopover();
            (_b = this.popoverButtonRef) === null || _b === void 0 ? void 0 : _b.setFocus();
        }
    }
    autoCloseCallback() {
        if (this.mode === 'popover') {
            this.opened = false;
            this.popoverRef.open = this.opened;
        }
        else {
            if (this.copyLinkPopoverRef)
                this.copyLinkPopoverRef.open = false;
            this.inlineCopyLinkOpened = false;
            if (this.copyEmbedPopoverRef)
                this.copyEmbedPopoverRef.open = false;
            this.inlineCopyEmbedOpened = false;
        }
    }
    stopPropagationCallback(event) {
        event.stopPropagation();
    }
    resetPopoverCopyState() {
        var _a;
        (_a = this.popoverButtonRef) === null || _a === void 0 ? void 0 : _a.setFocus();
        setTimeout(() => {
            this.copied = false;
        }, 200);
    }
    updateDimensions(type) {
        var _a, _b;
        if (type === 'width') {
            const value = (_a = this.embedWidthRef) === null || _a === void 0 ? void 0 : _a.value;
            this.embedWidth = parseInt(value);
        }
        else {
            const value = (_b = this.embedHeightRef) === null || _b === void 0 ? void 0 : _b.value;
            this.embedHeight = parseInt(value);
        }
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        const content = this.copied && this.mode === 'popover' ? (this.renderSuccess()) : (h("div", { class: CSS.dialogContent }, this.renderOptions(), this.displayTipText ? this.renderTip() : null, this.embed ? this.renderEmbed() : null));
        const layoutClass = this.shareIconsLayout === 'vertical' ? ` ${CSS.layout.vertical}` : ` ${CSS.layout.horizontal}`;
        const mode = ` calcite-mode-${!!this.el.closest(CALCITE_MODE_DARK) ? 'dark' : 'light'}`;
        const dialogContent = (h("div", { key: '1d10b5a2fb75584357c9c0f4fbd75e4904ad20ef', ref: el => (this.dialogContentRef = el), class: `${CSS.dialog}${layoutClass}${mode}` }, content));
        const defaultOffset = 6;
        const offsetDistance = this.removePopoverOffset ? 0 : defaultOffset;
        return (h(Host, { key: '75f577c38604ff752062434134a04d6d85263c16' }, this.mode === 'popover'
            ? [
                h("calcite-popover", { ref: (el) => (this.popoverRef = el), label: (_b = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.share) === null || _b === void 0 ? void 0 : _b.label, referenceElement: "shareButton", placement: "bottom-start", scale: this.scale, "overlay-positioning": this.popoverPositioning, "offset-distance": offsetDistance, "pointer-disabled": this.removePopoverOffset }, dialogContent),
                this.renderButton(),
            ]
            : [
                dialogContent,
                h("calcite-popover", { ref: (el) => (this.copyLinkPopoverRef = el), label: (_d = (_c = this.messages) === null || _c === void 0 ? void 0 : _c.share) === null || _d === void 0 ? void 0 : _d.label, referenceElement: "copyToClipboard", placement: this.inlineSuccessPopoverPlacement, scale: this.scale }, this.renderSuccess()),
                h("calcite-popover", { ref: (el) => (this.copyEmbedPopoverRef = el), label: (_f = (_e = this.messages) === null || _e === void 0 ? void 0 : _e.share) === null || _f === void 0 ? void 0 : _f.label, referenceElement: "copyEmbedToClipboard", placement: this.inlineSuccessPopoverPlacement, scale: this.scale }, this.renderEmbedSuccess()),
            ]));
    }
    renderButton() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const scale = this.shareButtonScale != null ? this.shareButtonScale : this.scale;
        return this.shareButtonType === 'button' ? (h("calcite-button", { ref: el => (this.popoverButtonRef = el), onClick: this.togglePopover.bind(this), id: "shareButton", class: CSS.popoverButton, kind: this.shareButtonColor, appearance: "transparent", label: (_b = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.share) === null || _b === void 0 ? void 0 : _b.label, title: (_d = (_c = this.messages) === null || _c === void 0 ? void 0 : _c.share) === null || _d === void 0 ? void 0 : _d.label, scale: scale }, h("div", { class: CSS.iconContainer }, h("calcite-icon", { icon: "share", scale: this.popoverButtonIconScale })))) : (h("calcite-action", { ref: el => (this.popoverButtonRef = el), onClick: this.togglePopover.bind(this), id: "shareButton", class: CSS.popoverButton, appearance: "transparent", label: (_f = (_e = this.messages) === null || _e === void 0 ? void 0 : _e.share) === null || _f === void 0 ? void 0 : _f.label, title: (_h = (_g = this.messages) === null || _g === void 0 ? void 0 : _g.share) === null || _h === void 0 ? void 0 : _h.label, scale: scale, text: "", alignment: "center" }, h("div", { class: CSS.iconContainer }, h("calcite-icon", { icon: "share", scale: this.popoverButtonIconScale }))));
    }
    renderSuccess() {
        var _a;
        const success = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.success;
        return (h("div", { class: CSS.success.container }, h("span", { class: CSS.success.header }, h("span", { class: CSS.success.icon }, h("calcite-icon", { icon: "check-circle-f", scale: this.scale })), success === null || success === void 0 ? void 0 :
            success.label), h("span", { class: CSS.success.message }, this.successMessage || (success === null || success === void 0 ? void 0 : success.url))));
    }
    renderEmbedSuccess() {
        var _a;
        const success = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.success;
        return (h("div", { class: CSS.success.container }, h("span", { class: CSS.success.header }, h("span", { class: CSS.success.icon }, h("calcite-icon", { icon: "check-circle-f", scale: this.scale })), success === null || success === void 0 ? void 0 :
            success.label), h("span", { class: CSS.success.message }, success === null || success === void 0 ? void 0 : success.embed)));
    }
    renderOptions() {
        var _a, _b, _c, _d;
        const options = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.options;
        const optionText_RTL = document.dir === 'rtl' ? ` ${CSS.rtl.optionText}` : '';
        return (h("ul", { ref: el => (this.shareListRef = el), class: CSS.options, role: "menu" }, h("li", { id: "copyToClipboard", onClick: this.handleShareItem.bind(this, 'link'), onKeyDown: this.handleOptionKeyDown('link'), role: "menuitem", tabindex: "0" }, h("span", { class: CSS.icon }, h("calcite-icon", { icon: "link", scale: this.scale })), h("span", { class: `${CSS.optionText}${optionText_RTL}` }, (_b = options === null || options === void 0 ? void 0 : options.link) === null || _b === void 0 ? void 0 : _b.label)), this.socialMedia
            ? [
                h("li", { onClick: this.handleShareItem.bind(this, 'facebook'), onKeyDown: this.handleOptionKeyDown('facebook'), role: "menuitem", tabindex: "0" }, h("span", { class: CSS.icon }, this.renderFacebookIcon()), h("span", { class: `${CSS.optionText}${optionText_RTL}` }, (_c = options === null || options === void 0 ? void 0 : options.facebook) === null || _c === void 0 ? void 0 : _c.label)),
                h("li", { onClick: this.handleShareItem.bind(this, 'x'), onKeyDown: this.handleOptionKeyDown('x'), role: "menuitem", tabindex: "0" }, h("span", { class: CSS.icon }, this.renderXIcon()), h("span", { class: `${CSS.optionText}${optionText_RTL}` }, "X")),
                h("li", { onClick: this.handleShareItem.bind(this, 'linkedIn'), onKeyDown: this.handleOptionKeyDown('linkedIn'), role: "menuitem", tabindex: "0" }, h("span", { class: CSS.icon }, this.renderLinkedInIcon()), h("span", { class: `${CSS.optionText}${optionText_RTL}` }, (_d = options === null || options === void 0 ? void 0 : options.linkedIn) === null || _d === void 0 ? void 0 : _d.label)),
            ]
            : null));
    }
    handleOptionKeyDown(type) {
        return (e) => {
            const keyCode = e.code;
            const canActivate = keyCode === 'Space' || keyCode === 'Enter';
            if (!canActivate)
                return;
            this.handleShareItem(type);
        };
    }
    renderFacebookIcon() {
        return (h("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" }, h("g", null, h("path", { d: "M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z", style: { fill: '#1877f2', fillRule: 'nonzero' } }), h("path", { d: "M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z", style: { fill: '#fff', fillRule: 'nonzero' } }))));
    }
    renderXIcon() {
        const isCalciteModeDark = !!this.el.closest(CALCITE_MODE_DARK);
        return (h("svg", { class: isCalciteModeDark ? CSS.xLogo.dark : CSS.xLogo.light, viewBox: "0 0 1200 1227", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("rect", { height: "400", style: { fill: 'none' }, width: "400", x: "56", y: "56" }), h("path", { d: "M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z", fill: isCalciteModeDark ? 'white' : 'black' })));
    }
    renderLinkedInIcon() {
        return (h("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" }, h("g", { id: "g5891" }, h("path", { d: "M512,64c0,-35.323 -28.677,-64 -64,-64l-384,0c-35.323,0 -64,28.677 -64,64l0,384c0,35.323 28.677,64 64,64l384,0c35.323,0 64,-28.677 64,-64l0,-384Z", id: "background", style: { fill: '#2867b2' } }), h("g", { id: "shapes" }, h("rect", { height: "257.962", id: "rect11", style: { fill: '#fff' }, width: "85.76", x: "61.053", y: "178.667" }), h("path", { d: "M104.512,54.28c-29.341,0 -48.512,19.29 -48.512,44.573c0,24.752 18.588,44.574 47.377,44.574l0.554,0c29.903,0 48.516,-19.822 48.516,-44.574c-0.555,-25.283 -18.611,-44.573 -47.935,-44.573Z", id: "path13-0", style: { fill: '#fff', fillRule: 'nonzero' } }), h("path", { d: "M357.278,172.601c-45.49,0 -65.866,25.017 -77.276,42.589l0,-36.523l-85.738,0c1.137,24.197 0,257.961 0,257.961l85.737,0l0,-144.064c0,-7.711 0.554,-15.42 2.827,-20.931c6.188,-15.4 20.305,-31.352 43.993,-31.352c31.012,0 43.436,23.664 43.436,58.327l0,138.02l85.741,0l0,-147.93c0,-79.237 -42.305,-116.097 -98.72,-116.097Z", id: "path15", style: { fill: '#fff', fillRule: 'nonzero' } })))));
    }
    renderTip() {
        var _a;
        const info = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.info;
        return (h("div", { class: CSS.tipContainer }, h("span", { class: CSS.tipHeader }, h("calcite-icon", { icon: "lightbulb", scale: this.scale }), h("span", null, info === null || info === void 0 ? void 0 : info.label)), h("p", { class: CSS.tipContent }, info === null || info === void 0 ? void 0 : info.tooltip)));
    }
    renderEmbed() {
        var _a, _b, _c;
        const embedMessages = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.embed;
        const textarea_RTL = document.dir === 'rtl' ? ` ${CSS.rtl.textArea}` : '';
        return (h("div", { class: CSS.embed.container }, h("span", { class: CSS.embed.header }, h("calcite-icon", { icon: "code", scale: this.scale }), h("span", null, (_c = (_b = this.messages) === null || _b === void 0 ? void 0 : _b.embed) === null || _c === void 0 ? void 0 : _c.label)), h("div", { class: CSS.embed.embedCode.container }, h("div", { class: CSS.embed.embedCode.textArea }, h("textarea", { ref: el => (this.embedCodeRef = el), cols: 30, rows: 5, readonly: true, class: textarea_RTL, value: this.getEmbedCode() }), h("button", { id: "copyEmbedToClipboard", onClick: this.copyEmbedCode.bind(this), class: CSS.embed.embedCode.copyButton }, h("calcite-icon", { icon: "copy", scale: this.scale }), h("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.copy))), h("span", { class: CSS.embed.textAreaText }, h("slot", { name: "text-area-text" })), h("div", { class: CSS.embed.dimensions.container }, h("label", { class: CSS.embed.dimensions.input }, h("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.width), h("input", { ref: el => (this.embedWidthRef = el), type: "number", onKeyDown: e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault(), onChange: this.handleNumberInputOnChange('width'), value: this.embedWidth, min: "1" })), h("label", { class: CSS.embed.dimensions.input }, h("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.height), h("input", { ref: el => (this.embedHeightRef = el), type: "number", onKeyDown: e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault(), onChange: this.handleNumberInputOnChange('height'), value: this.embedHeight, min: "1" }))))));
    }
    handleNumberInputOnChange(type) {
        const ref = (type === 'width' ? this.embedWidthRef : this.embedHeightRef);
        const valType = type === 'width' ? 'embedWidth' : 'embedHeight';
        return () => {
            if (ref) {
                const value = parseFloat(ref.value);
                if (value <= 0) {
                    this[valType] = parseInt(MIN_WIDTH_HEIGHT_VALUE);
                    ref.value = MIN_WIDTH_HEIGHT_VALUE;
                }
            }
        };
    }
    togglePopover(event) {
        event.stopPropagation();
        this.opened = !this.opened;
        this.popoverRef.open = this.opened;
    }
    closePopover() {
        this.opened = false;
        this.popoverRef.open = this.opened;
    }
    async handleShareItem(type) {
        var _a, _b, _c, _d;
        this.shareUrl = await this.generateShareUrl();
        let shortenedUrl = null;
        // Detects Safari - If Safari, do not shorten URL due to Safari not allowing clipboard copy after network requests
        const isChrome = (_b = (_a = navigator === null || navigator === void 0 ? void 0 : navigator.userAgent) === null || _a === void 0 ? void 0 : _a.includes('Chrome')) !== null && _b !== void 0 ? _b : false;
        const isSafari = ((_d = (_c = navigator === null || navigator === void 0 ? void 0 : navigator.userAgent) === null || _c === void 0 ? void 0 : _c.includes('Safari')) !== null && _d !== void 0 ? _d : false) && !isChrome;
        if (!isSafari && this.shortenShareUrl) {
            shortenedUrl = await this.shortenUrl(this.shareUrl);
        }
        let urlToUse = shortenedUrl ? shortenedUrl : this.shareUrl;
        switch (type) {
            case 'link':
                navigator.clipboard.writeText(urlToUse);
                if (this.embed) {
                    this.copyEmbedPopoverRef.open = false;
                    this.inlineCopyEmbedOpened = false;
                }
                if (this.mode === 'inline') {
                    this.copyLinkPopoverRef.open = true;
                    setTimeout(() => (this.copyLinkPopoverRef.open = false), 3000);
                }
                this.inlineCopyLinkOpened = true;
                this.copied = true;
                if (this.mode === 'popover')
                    setTimeout(() => this.closePopover(), 2000);
                return;
            case 'facebook':
            case 'x':
            case 'linkedIn':
                let socialWin;
                if (isSafari) {
                    socialWin = window.open('', '_blank');
                    if (this.shortenShareUrl) {
                        urlToUse = (await this.shortenUrl(this.shareUrl)) || urlToUse;
                    }
                }
                const urlData = {
                    url: encodeURI(urlToUse),
                };
                const data = type === 'x' ? Object.assign(Object.assign({}, urlData), { text: this.shareText }) : urlData;
                const [intl] = await loadModules(['esri/intl']);
                const url = intl.substitute(SOCIAL_URL_TEMPLATES[type], data);
                if (this.mode === 'popover') {
                    this.closePopover();
                }
                // With Safari, need to open new tab using the triggering event, so add shortened URL after opening.
                // Safari truncates URL without this approach.
                if (isSafari && socialWin) {
                    socialWin.location = url;
                    socialWin.focus();
                }
                else {
                    window.open(encodeURI(url), '_blank');
                }
                return;
        }
    }
    async shortenUrl(url) {
        var _a, _b;
        const [esriRequest] = await loadModules(['esri/request']);
        const request = await esriRequest(SHORTEN_API, {
            query: {
                longUrl: url,
                f: 'json',
            },
        });
        const shortUrl = (_b = (_a = request === null || request === void 0 ? void 0 : request.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.url;
        if (shortUrl) {
            return shortUrl.replace('http://', 'https://');
        }
    }
    getEmbedCode() {
        return `<iframe src="${this.shareUrl}" width="${this.embedWidth}" height="${this.embedHeight}" frameborder="0" style="border:0" allowfullscreen>${this.iframeInnerText}</iframe>`;
    }
    copyEmbedCode() {
        navigator.clipboard.writeText(this.getEmbedCode());
        this.copyLinkPopoverRef.open = false;
        this.inlineCopyLinkOpened = false;
        this.copyEmbedPopoverRef.open = true;
        setTimeout(() => (this.copyEmbedPopoverRef.open = false), 3000);
        this.inlineCopyEmbedOpened = true;
    }
    // VIEW LOGIC
    async generateShareUrl() {
        var _a;
        if (this.autoUpdateShareUrl) {
            // Update shareUrl--it may have changes since the component was loaded
            this.shareUrl = window.location.href;
        }
        // If view is not ready
        if (!this.view || !((_a = this.view) === null || _a === void 0 ? void 0 : _a.ready)) {
            return this.shareUrl;
        }
        // Use x/y values and the spatial reference of the view to instantiate a geometry point
        const { x, y } = this.view.center;
        const { spatialReference } = this.view;
        const [Point, SpatialReference] = await loadModules(['esri/geometry/Point', 'esri/geometry/SpatialReference']);
        const updatedSpatialReference = new SpatialReference(Object.assign({}, spatialReference.toJSON()));
        const centerPoint = new Point({
            x,
            y,
            spatialReference: updatedSpatialReference,
        });
        // Use pointToConvert to project point. Once projected, pass point to generate the share URL parameters
        const point = await this.processPoint(centerPoint);
        const { isWGS84, isWebMercator } = point.spatialReference;
        const isNotProjected = isWGS84 || isWebMercator;
        return this.generateShareUrlParams(point, isNotProjected);
    }
    async processPoint(point) {
        const { isWGS84, isWebMercator } = point.spatialReference;
        // If spatial reference is WGS84 or Web Mercator, use longitude/latitude values to generate the share URL parameters
        if (isWGS84 || isWebMercator) {
            return point;
        }
        const [SpatialReference, projection] = await loadModules(['esri/geometry/SpatialReference', 'esri/geometry/projection']);
        const outputSpatialReference = new SpatialReference({ wkid: 4326 });
        try {
            await projection.load();
            const projectedPoint = projection.project(point, outputSpatialReference);
            return Promise.resolve(projectedPoint);
        }
        catch (err) {
            console.error('Failed to project point', err);
            return Promise.reject(null);
        }
    }
    generateShareUrlParams(point, isNotProjected) {
        var _a, _b, _c, _d, _e;
        const { longitude, latitude, x, y } = point;
        if (longitude === undefined || latitude === undefined) {
            return this.shareUrl;
        }
        const roundedLon = this.roundValue(isNotProjected ? longitude : x);
        const roundedLat = this.roundValue(isNotProjected ? latitude : y);
        const { zoom } = this.view;
        const roundedZoom = this.roundValue(zoom);
        const graphic = (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.popup) === null || _b === void 0 ? void 0 : _b.selectedFeature;
        const visible = (_d = (_c = this.view) === null || _c === void 0 ? void 0 : _c.popup) === null || _d === void 0 ? void 0 : _d.visible;
        let layerId;
        let oid;
        let hiddenLayers;
        if (graphic && visible && ((_e = graphic === null || graphic === void 0 ? void 0 : graphic.layer) === null || _e === void 0 ? void 0 : _e.type) === 'feature') {
            const featureLayer = graphic === null || graphic === void 0 ? void 0 : graphic.layer;
            layerId = featureLayer === null || featureLayer === void 0 ? void 0 : featureLayer.id;
            oid = graphic.attributes[featureLayer.objectIdField];
        }
        hiddenLayers = this.view.map.allLayers
            .filter(layer => !layer.visible)
            .toArray()
            .map(featureLayer => featureLayer.id)
            .toString()
            .replaceAll(',', ';');
        const { type } = this.view;
        const { defaultUrlParams } = this;
        const url = new URL(this.shareUrl);
        const { searchParams } = url;
        // Resets existing URL params
        if (searchParams.get('center'))
            searchParams.delete('center');
        if (searchParams.get('level'))
            searchParams.delete('level');
        if (searchParams.get('selectedFeature'))
            searchParams.delete('selectedFeature');
        if (searchParams.get('hiddenLayers'))
            searchParams.delete('hiddenLayers');
        if (searchParams.get('viewpoint'))
            searchParams.delete('viewpoint');
        // Checks if view.type is 3D, if so, set 3D url parameters
        if (type === '3d') {
            // viewpoint=cam:{camera.position.longitude},{camera.position.latitude},{camera.position.z};{camera.heading},{camera.tilt}
            const { camera } = this.view;
            const { heading, position, tilt } = camera;
            const { longitude, latitude, z } = position;
            const viewpoint_Values = {
                longitude: this.roundValue(longitude, 8),
                latitude: this.roundValue(latitude, 8),
                z: this.roundValue(z, 3),
                heading: this.roundValue(heading, 3),
                tilt: this.roundValue(tilt, 3),
            };
            const viewpointVal = `cam:${viewpoint_Values.longitude},${viewpoint_Values.latitude},${viewpoint_Values.z};${viewpoint_Values.heading},${viewpoint_Values.tilt}`;
            if ((defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.viewpoint) !== false)
                url.searchParams.set('viewpoint', viewpointVal);
            if (layerId && oid && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.selectedFeature) !== false)
                url.searchParams.set('selectedFeature', `${layerId};${oid}`);
            if (hiddenLayers && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.hiddenLayers) !== false)
                url.searchParams.set('hiddenLayers', hiddenLayers);
            url.search = decodeURIComponent(url.search);
            return url.href;
        }
        // Otherwise, just return original url for 2D
        if ((defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.center) !== false)
            url.searchParams.set('center', `${roundedLon};${roundedLat}`);
        if ((defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.level) !== false)
            url.searchParams.set('level', `${roundedZoom}`);
        if (layerId && oid && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.selectedFeature) !== false)
            url.searchParams.set('selectedFeature', `${layerId};${oid}`);
        if (hiddenLayers && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.hiddenLayers) !== false)
            url.searchParams.set('hiddenLayers', hiddenLayers);
        url.search = decodeURIComponent(url.search);
        return url.href;
    }
    roundValue(val, decimalPoints = 4) {
        return parseFloat(val.toFixed(decimalPoints));
    }
    get el() { return this; }
    static get style() { return InstantAppsSocialShareStyle0; }
}, [1, "instant-apps-social-share", {
        "mode": [513],
        "shareUrl": [1025, "share-url"],
        "autoUpdateShareUrl": [1028, "auto-update-share-url"],
        "shareText": [513, "share-text"],
        "embed": [516],
        "shareButtonColor": [513, "share-button-color"],
        "shareButtonType": [513, "share-button-type"],
        "shareButtonScale": [513, "share-button-scale"],
        "iframeInnerText": [513, "iframe-inner-text"],
        "popoverButtonIconScale": [513, "popover-button-icon-scale"],
        "view": [16],
        "displayTipText": [516, "display-tip-text"],
        "shortenShareUrl": [516, "shorten-share-url"],
        "socialMedia": [516, "social-media"],
        "shareIconsLayout": [513, "share-icons-layout"],
        "scale": [513],
        "successMessage": [513, "success-message"],
        "defaultUrlParams": [16],
        "inlineSuccessPopoverPlacement": [513, "inline-success-popover-placement"],
        "popoverPositioning": [513, "popover-positioning"],
        "removePopoverOffset": [516, "remove-popover-offset"],
        "messages": [32],
        "opened": [32],
        "copied": [32],
        "inlineCopyLinkOpened": [32],
        "inlineCopyEmbedOpened": [32],
        "embedWidth": [32],
        "embedHeight": [32]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-social-share", "calcite-action", "calcite-button", "calcite-icon", "calcite-loader", "calcite-popover"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-social-share":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsSocialShare);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-button":
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
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { InstantAppsSocialShare as I, defineCustomElement as d };
