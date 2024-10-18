/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const locale = require('./locale-4a18a858.js');
require('./loadModules-8567855e.js');
require('./esri-loader-08dc41bd.js');
require('./_commonjsHelpers-baf43783.js');
require('./languageUtil-a3e1eafd.js');

const instantAppsPopoverCss = ":host{display:block}.instant-apps-popover__content{display:flex;flex-direction:column;padding:0 5% 5% 5%;max-width:35vw;font-family:var(--calcite-sans-family);font-size:0.875rem}.instant-apps-popover__content .instant-apps-popover__action{align-self:flex-start;--calcite-color-foreground-2:transparent}.instant-apps-popover__content span{display:inline-block;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1);margin:0 0 10px 0;font-family:var(--calcite-sans-family)}.instant-apps-popover__content p{line-height:19.12px;margin:0;margin-bottom:10px;font-family:var(--calcite-sans-family)}.instant-apps-popover__content .instant-apps-popover__footer{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.instant-apps-popover__content .instant-apps-popover__footer span{margin-bottom:0;font-weight:normal;font-size:0.875rem;font-family:var(--calcite-sans-family)}.instant-apps-popover__content .instant-apps-popover__footer calcite-button:first-child{--calcite-color-foreground-3:transparent}.instant-apps-popover__content .instant-apps-popover__footer calcite-button:last-child{margin-left:5px}.instant-apps-popover__content .instant-apps-popover__img{width:100%;margin-bottom:10px}.instant-apps-popover__content.instant-apps-popover--action-disabled{padding:5%}.instant-apps-popover__content.instant-apps-popover--action-disabled #subtitle{margin:0 0 10px 0}";
const InstantAppsPopoverStyle0 = instantAppsPopoverCss;

const CSS = {
    content: 'instant-apps-popover__content',
    buttonContainer: 'instant-apps-popover__button-container',
    action: 'instant-apps-popover__action',
    actionDisabled: 'instant-apps-popover--action-disabled',
    img: 'instant-apps-popover__img',
    footer: 'instant-apps-popover__footer',
};
const InstantAppsPopover = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.popoverTitle = undefined;
        this.subtitle = undefined;
        this.content = undefined;
        this.imgSrc = undefined;
        this.imgAlt = undefined;
        this.mediaSrc = undefined;
        this.index = undefined;
        this.referenceElement = undefined;
        this.parent = undefined;
        this.placement = 'trailing-start';
        this.refId = undefined;
        this.pagination = false;
        this.disableAction = false;
        this.popoverAction = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
    }
    async componentDidLoad() {
        locale.getMessages(this, this.messageOverrides);
    }
    componentDidUpdate() {
        this.popoverEl.referenceElement = this.referenceElement;
    }
    render() {
        var _a, _b, _c, _d, _e;
        return (index.h("calcite-popover", { key: '325d942b43189ebeb5c3be2a4bac2c66f283a5cc', ref: (el) => (this.popoverEl = el), heading: this.popoverTitle, "auto-close": true, placement: this.placement, messageOverrides: { close: (_a = this.messages) === null || _a === void 0 ? void 0 : _a.close }, "trigger-disabled": true, "ref-id": this.refId, closable: true, referenceElement: this.referenceElement, label: this.popoverTitle }, index.h("div", { key: '46d0e04ac90ecf4765d29c48968c53873d475776', class: `${CSS.content}${this.disableAction ? ` ${CSS.actionDisabled}` : ''}` }, !this.disableAction ? (index.h("calcite-action", { key: "popover-action", class: CSS.action, onClick: this.popoverAction, icon: document.dir === 'rtl' ? 'chevron-right' : 'chevron-left', compact: true, "text-enabled": true, text: (((_b = this.messageOverrides) === null || _b === void 0 ? void 0 : _b.popoverAction) ? this.messageOverrides.popoverAction : this.messages.back) })) : null, index.h("section", { key: 'f48382c9f915edc1d4fd90e107c9c86efc2b2114' }, index.h("span", { key: '5e14762c0520cab8d1207a7aae255f185dc0319c', id: "subtitle" }, this.subtitle), index.h("p", { key: '6fd83761aa4acbcdead3bef826dba252f1cdf71d' }, this.content), this.imgSrc ? index.h("img", { key: `iac-popover-img-${this.refId}`, class: CSS.img, src: this.imgSrc, alt: this.imgAlt ? this.imgAlt : '' }) : null), this.pagination ? (index.h("div", { key: `iac-popover-footer-${this.index}`, class: CSS.footer }, index.h("span", null, this.index + 1, " ", (_c = this.messages) === null || _c === void 0 ? void 0 :
            _c.of, " ", (_e = (_d = this.parent) === null || _d === void 0 ? void 0 : _d.instantAppsPopovers) === null || _e === void 0 ? void 0 :
            _e.size), this.renderPagination())) : null)));
    }
    renderPagination() {
        var _a, _b;
        const { index: index$1, messages, parent } = this;
        const size = (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.instantAppsPopovers) === null || _b === void 0 ? void 0 : _b.size;
        const isFirst = index$1 === 0;
        const isLast = index$1 === size - 1;
        return (index.h("div", { key: "pagination-button-container", class: CSS.buttonContainer }, !isFirst ? (index.h("calcite-button", { key: "prev", onClick: () => parent === null || parent === void 0 ? void 0 : parent.previous(), appearance: "outline", kind: "neutral" }, messages === null || messages === void 0 ? void 0 : messages.back)) : null, index.h("calcite-button", { key: "next", onClick: () => {
                if (isLast) {
                    parent === null || parent === void 0 ? void 0 : parent.done();
                }
                else {
                    parent === null || parent === void 0 ? void 0 : parent.next();
                }
            } }, isLast ? messages === null || messages === void 0 ? void 0 : messages.done : messages === null || messages === void 0 ? void 0 : messages.next)));
    }
    get el() { return index.getElement(this); }
};
InstantAppsPopover.style = InstantAppsPopoverStyle0;

exports.instant_apps_popover = InstantAppsPopover;
