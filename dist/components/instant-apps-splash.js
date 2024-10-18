/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { S as Sanitizer } from './index2.js';
import { g as getMessages } from './locale3.js';
import { d as defineCustomElement$8 } from './button.js';
import { d as defineCustomElement$7 } from './checkbox.js';
import { d as defineCustomElement$6 } from './icon.js';
import { d as defineCustomElement$5 } from './label2.js';
import { d as defineCustomElement$4 } from './loader.js';
import { d as defineCustomElement$3 } from './modal.js';
import { d as defineCustomElement$2 } from './scrim.js';

/**
 * Creates new instance of @esri/arcgis-html-sanitizer
 * with appropriate whitelist values
 */
function createSanitizerInstance(sanitizerConstructor) {
    if (sanitizerConstructor == null || typeof sanitizerConstructor !== "function") {
        return null;
    }
    return new sanitizerConstructor({
        whiteList: {
            h1: ["style"],
            h2: ["style"],
            h3: ["style"],
            h4: ["style"],
            h5: ["style"],
            h6: ["style"],
            img: ["style", "src", "width", "height"],
            pre: ["style"],
            p: ["id", "class", "style"],
            div: ["id", "class", "style", "role"],
            span: ["id", "class", "style", "role"],
            figure: ["class", "style"]
        }
    }, true);
}

function setLocalStorageItem(key) {
    window === null || window === void 0 ? void 0 : window.localStorage.setItem(key, 'false');
}
function getLocalStorageItem(key) {
    var _a;
    const item = (_a = window === null || window === void 0 ? void 0 : window.localStorage) === null || _a === void 0 ? void 0 : _a.getItem(key);
    return item ? true : false;
}
function removeItemFromLocalStorage(key) {
    var _a;
    (_a = window === null || window === void 0 ? void 0 : window.localStorage) === null || _a === void 0 ? void 0 : _a.removeItem(key);
}

const instantAppsSplashCss = ":host{display:block}:host .image.image_resized img{width:100%}:host .instant-apps-splash__back-content{display:flex;align-items:center}:host .instant-apps-splash__back-content calcite-label{--calcite-label-margin-bottom:0}";
const InstantAppsSplashStyle0 = instantAppsSplashCss;

const CSS = {
    back: 'instant-apps-splash__back-content',
};
const InstantAppsSplash$1 = /*@__PURE__*/ proxyCustomElement(class InstantAppsSplash extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.splashClose = createEvent(this, "splashClose", 7);
        this._sanitizer = createSanitizerInstance(Sanitizer);
        this.localStorageKey = undefined;
        this.titleText = '';
        this.content = '';
        this.primaryButtonText = '';
        this.open = true;
        this.closeButtonDisabled = false;
        this.outsideCloseDisabled = false;
        this.secondaryButton = false;
        this.secondaryButtonText = undefined;
        this.secondaryButtonIcon = undefined;
        this.secondaryButtonCallback = undefined;
        this.messages = undefined;
    }
    sanitizeContent() {
        this.content = this._sanitizer.sanitize(this.content);
    }
    componentWillLoad() {
        let open;
        const { localStorageKey } = this;
        if (localStorageKey) {
            open = this.open && !getLocalStorageItem(this.localStorageKey);
        }
        else {
            open = this.open;
        }
        this.el.open = open;
        if (this.content && this._sanitizer)
            this.sanitizeContent();
    }
    componentDidLoad() {
        getMessages(this);
    }
    render() {
        return (h("calcite-modal", { key: 'd7ae1e9533ce3ac221547530c509e1682e253ab2', onCalciteModalClose: this.close.bind(this), open: this.open, closeButtonDisabled: this.closeButtonDisabled, outsideCloseDisabled: this.outsideCloseDisabled }, this.renderHeader(), this.renderContent(), this.localStorageKey ? this.renderDontShowThisAgainCheckbox() : null, this.renderPrimaryButton(), this.secondaryButton ? this.renderSecondaryButton() : null));
    }
    renderHeader() {
        const { titleText } = this;
        return h("header", { slot: "header" }, titleText);
    }
    renderContent() {
        const { content } = this;
        return (h("div", { slot: "content", innerHTML: content }, h("slot", { name: "custom-action" })));
    }
    renderDontShowThisAgainCheckbox() {
        const { localStorageKey, messages } = this;
        const checked = getLocalStorageItem(localStorageKey) ? true : null;
        return (h("div", { class: CSS.back, slot: "back" }, h("calcite-label", { layout: "inline" }, h("calcite-checkbox", { onCalciteCheckboxChange: this.handleDontShowThisAgain.bind(this), checked: checked !== null && checked !== void 0 ? checked : undefined }), messages === null || messages === void 0 ? void 0 :
            messages.dontShowThisAgain)));
    }
    renderPrimaryButton() {
        const { primaryButtonText } = this;
        return (h("calcite-button", { onClick: this.close.bind(this), slot: "primary" }, primaryButtonText ? primaryButtonText : 'Enter'));
    }
    renderSecondaryButton() {
        var _a;
        return (h("calcite-button", { onClick: (_a = this.secondaryButtonCallback) === null || _a === void 0 ? void 0 : _a.bind(this), slot: "secondary", "icon-start": this.secondaryButtonIcon, appearance: "outline" }, this.secondaryButtonText));
    }
    close() {
        this.open = false;
        this.splashClose.emit();
    }
    handleDontShowThisAgain(event) {
        const { localStorageKey } = this;
        if (!localStorageKey)
            return;
        const checkboxNode = event.target;
        const { checked } = checkboxNode;
        if (checked) {
            setLocalStorageItem(localStorageKey);
        }
        else {
            removeItemFromLocalStorage(localStorageKey);
        }
    }
    get el() { return this; }
    static get watchers() { return {
        "content": ["sanitizeContent"]
    }; }
    static get style() { return InstantAppsSplashStyle0; }
}, [1, "instant-apps-splash", {
        "localStorageKey": [1, "local-storage-key"],
        "titleText": [1, "title-text"],
        "content": [1],
        "primaryButtonText": [1, "primary-button-text"],
        "open": [1028],
        "closeButtonDisabled": [4, "close-button-disabled"],
        "outsideCloseDisabled": [4, "outside-close-disabled"],
        "secondaryButton": [4, "secondary-button"],
        "secondaryButtonText": [1, "secondary-button-text"],
        "secondaryButtonIcon": [1, "secondary-button-icon"],
        "secondaryButtonCallback": [16],
        "messages": [32]
    }, undefined, {
        "content": ["sanitizeContent"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-splash", "calcite-button", "calcite-checkbox", "calcite-icon", "calcite-label", "calcite-loader", "calcite-modal", "calcite-scrim"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-splash":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsSplash$1);
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-label":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const InstantAppsSplash = InstantAppsSplash$1;
const defineCustomElement = defineCustomElement$1;

export { InstantAppsSplash, defineCustomElement };
