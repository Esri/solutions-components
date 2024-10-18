/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const index$1 = require('./index-f052f656.js');
const locale = require('./locale-4a18a858.js');
require('./loadModules-8567855e.js');
require('./esri-loader-08dc41bd.js');
require('./_commonjsHelpers-baf43783.js');
require('./languageUtil-a3e1eafd.js');

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
const InstantAppsSplash = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.splashClose = index.createEvent(this, "splashClose", 7);
        this._sanitizer = createSanitizerInstance(index$1.Sanitizer);
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
        locale.getMessages(this);
    }
    render() {
        return (index.h("calcite-modal", { key: 'd7ae1e9533ce3ac221547530c509e1682e253ab2', onCalciteModalClose: this.close.bind(this), open: this.open, closeButtonDisabled: this.closeButtonDisabled, outsideCloseDisabled: this.outsideCloseDisabled }, this.renderHeader(), this.renderContent(), this.localStorageKey ? this.renderDontShowThisAgainCheckbox() : null, this.renderPrimaryButton(), this.secondaryButton ? this.renderSecondaryButton() : null));
    }
    renderHeader() {
        const { titleText } = this;
        return index.h("header", { slot: "header" }, titleText);
    }
    renderContent() {
        const { content } = this;
        return (index.h("div", { slot: "content", innerHTML: content }, index.h("slot", { name: "custom-action" })));
    }
    renderDontShowThisAgainCheckbox() {
        const { localStorageKey, messages } = this;
        const checked = getLocalStorageItem(localStorageKey) ? true : null;
        return (index.h("div", { class: CSS.back, slot: "back" }, index.h("calcite-label", { layout: "inline" }, index.h("calcite-checkbox", { onCalciteCheckboxChange: this.handleDontShowThisAgain.bind(this), checked: checked !== null && checked !== void 0 ? checked : undefined }), messages === null || messages === void 0 ? void 0 :
            messages.dontShowThisAgain)));
    }
    renderPrimaryButton() {
        const { primaryButtonText } = this;
        return (index.h("calcite-button", { onClick: this.close.bind(this), slot: "primary" }, primaryButtonText ? primaryButtonText : 'Enter'));
    }
    renderSecondaryButton() {
        var _a;
        return (index.h("calcite-button", { onClick: (_a = this.secondaryButtonCallback) === null || _a === void 0 ? void 0 : _a.bind(this), slot: "secondary", "icon-start": this.secondaryButtonIcon, appearance: "outline" }, this.secondaryButtonText));
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
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "content": ["sanitizeContent"]
    }; }
};
InstantAppsSplash.style = InstantAppsSplashStyle0;

exports.instant_apps_splash = InstantAppsSplash;
