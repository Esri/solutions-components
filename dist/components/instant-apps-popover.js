/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { g as getMessages } from './locale3.js';
import { d as defineCustomElement$6 } from './action.js';
import { d as defineCustomElement$5 } from './button.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './loader.js';
import { d as defineCustomElement$2 } from './popover.js';

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
const InstantAppsPopover$1 = /*@__PURE__*/ proxyCustomElement(class InstantAppsPopover extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
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
        getMessages(this, this.messageOverrides);
    }
    componentDidUpdate() {
        this.popoverEl.referenceElement = this.referenceElement;
    }
    render() {
        var _a, _b, _c, _d, _e;
        return (h("calcite-popover", { key: '0a947f50aa4cdd6bc976114ae22306fb0209c2b4', ref: (el) => (this.popoverEl = el), heading: this.popoverTitle, "auto-close": true, placement: this.placement, messageOverrides: { close: (_a = this.messages) === null || _a === void 0 ? void 0 : _a.close }, "trigger-disabled": true, "ref-id": this.refId, closable: true, referenceElement: this.referenceElement, label: this.popoverTitle }, h("div", { key: '7cab29cdb387d8134443710ef99a25bcf82c763c', class: `${CSS.content}${this.disableAction ? ` ${CSS.actionDisabled}` : ''}` }, !this.disableAction ? (h("calcite-action", { key: "popover-action", class: CSS.action, onClick: this.popoverAction, icon: document.dir === 'rtl' ? 'chevron-right' : 'chevron-left', compact: true, "text-enabled": true, text: (((_b = this.messageOverrides) === null || _b === void 0 ? void 0 : _b.popoverAction) ? this.messageOverrides.popoverAction : this.messages.back) })) : null, h("section", { key: '88a40da705c769e1683d3fbcb399b5eeee60ddab' }, h("span", { key: 'c69d391e94a9be35f88af0a9ea7cd75bb3a4fe97', id: "subtitle" }, this.subtitle), h("p", { key: 'f14f885d04d2788c6b7f129e5b1294b0136162a0' }, this.content), this.imgSrc ? h("img", { key: `iac-popover-img-${this.refId}`, class: CSS.img, src: this.imgSrc, alt: this.imgAlt ? this.imgAlt : '' }) : null), this.pagination ? (h("div", { key: `iac-popover-footer-${this.index}`, class: CSS.footer }, h("span", null, this.index + 1, " ", (_c = this.messages) === null || _c === void 0 ? void 0 :
            _c.of, " ", (_e = (_d = this.parent) === null || _d === void 0 ? void 0 : _d.instantAppsPopovers) === null || _e === void 0 ? void 0 :
            _e.size), this.renderPagination())) : null)));
    }
    renderPagination() {
        var _a, _b;
        const { index, messages, parent } = this;
        const size = (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.instantAppsPopovers) === null || _b === void 0 ? void 0 : _b.size;
        const isFirst = index === 0;
        const isLast = index === size - 1;
        return (h("div", { key: "pagination-button-container", class: CSS.buttonContainer }, !isFirst ? (h("calcite-button", { key: "prev", onClick: () => parent === null || parent === void 0 ? void 0 : parent.previous(), appearance: "outline", kind: "neutral" }, messages === null || messages === void 0 ? void 0 : messages.back)) : null, h("calcite-button", { key: "next", onClick: () => {
                if (isLast) {
                    parent === null || parent === void 0 ? void 0 : parent.done();
                }
                else {
                    parent === null || parent === void 0 ? void 0 : parent.next();
                }
            } }, isLast ? messages === null || messages === void 0 ? void 0 : messages.done : messages === null || messages === void 0 ? void 0 : messages.next)));
    }
    get el() { return this; }
    static get style() { return InstantAppsPopoverStyle0; }
}, [0, "instant-apps-popover", {
        "popoverTitle": [513, "popover-title"],
        "subtitle": [513],
        "content": [513],
        "imgSrc": [513, "img-src"],
        "imgAlt": [513, "img-alt"],
        "mediaSrc": [513, "media-src"],
        "index": [514],
        "referenceElement": [513, "reference-element"],
        "parent": [16],
        "placement": [1],
        "refId": [1, "ref-id"],
        "pagination": [516],
        "disableAction": [516, "disable-action"],
        "popoverAction": [16],
        "messageOverrides": [16],
        "messages": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-popover", "calcite-action", "calcite-button", "calcite-icon", "calcite-loader", "calcite-popover"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-popover":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsPopover$1);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const InstantAppsPopover = InstantAppsPopover$1;
const defineCustomElement = defineCustomElement$1;

export { InstantAppsPopover, defineCustomElement };
