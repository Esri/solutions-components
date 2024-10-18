/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './p-4e6eb06e.js';
import { g as getMessages } from './p-5ff711ee.js';
import './p-4cd4cb85.js';
import './p-0a24ad5f.js';
import './p-d4056c1c.js';
import './p-ac122d9e.js';

class AppGuideViewModel {
    constructor() {
        this.pages = [];
    }
    addPage(page) {
        this.pages = [...this.pages, page];
    }
    removePage(page) {
        this.pages = this.pages.filter(p => p !== page);
    }
}

const instantAppsAppGuideCss = ":host{--instant-apps-app-guide-width:300px;--instant-apps-app-guide-height:400px;--instant-apps-app-guide-list-item-bubble-size:22px;width:var(--instant-apps-app-guide-width);height:var(--instant-apps-app-guide-height);display:block}:host calcite-panel{max-width:var(--instant-apps-app-guide-width);max-height:var(--instant-apps-app-guide-height);display:flex}:host calcite-carousel{flex:1;overflow:scroll;height:-moz-fit-content;height:fit-content;background-color:var(--calcite-color-foreground-1)}:host [slot=header-content]{display:flex;gap:var(--calcite-spacing-sm);padding-inline-start:0.25rem}:host .content-heading{font-weight:var(--calcite-font-weight-bold);display:flex;gap:var(--calcite-spacing-sm);line-height:var(--calcite-font-line-height-fixed-lg)}:host calcite-carousel-item{flex-grow:1;display:flex;flex-direction:column}:host .instant-apps-app-guide__content-wrapper{padding-block-start:0.5rem;padding-inline:0.5rem;flex-shrink:1;flex-grow:0}:host calcite-icon{--calcite-ui-icon-color:var(--calcite-color-brand)}:host .instant-apps-app-guide__content-list{counter-set:item-counter;margin-inline:0;padding-inline-start:var(--calcite-spacing-xxxl);padding-inline-end:var(--calcite-spacing-lg);position:relative}:host .instant-apps-app-guide__content-list .instant-apps-app-guide__content-list--item{counter-increment:item-counter;margin-block-start:var(--calcite-spacing-lg);display:flex;align-items:flex-start}:host .instant-apps-app-guide__content-list .instant-apps-app-guide__content-list--item::before{content:counter(item-counter);background-color:var(--calcite-color-text-2);color:var(--calcite-color-text-inverse);line-height:var(--calcite-font-line-height-fixed-xl);width:var(--instant-apps-app-guide-list-item-bubble-size);left:0;border-radius:var(--calcite-corner-radius-pill);display:flex;justify-content:center;font-size:var(--calcite-font-size-sm);position:absolute;max-height:var(--instant-apps-app-guide-list-item-bubble-size)}:host .instant-apps-app-guide__content-list .instant-apps-app-guide__content-list--item::marker{color:var(--calcite-color-transparent)}";
const InstantAppsAppGuideStyle0 = instantAppsAppGuideCss;

const CSS = {
    contentList: 'instant-apps-app-guide__content-list',
    contentListItem: 'instant-apps-app-guide__content-list--item',
    contentWrapper: 'instant-apps-app-guide__content-wrapper'
};
const InstantAppsAppGuide = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this._viewModel = new AppGuideViewModel();
        this.header = true;
        this.data = undefined;
        this.messages = undefined;
        this.headerText = undefined;
    }
    watchPropHandler(newValue) {
        this._viewModel.pages = newValue;
        this._updateHeaderText();
    }
    connectedCallback() {
        var _a, _b, _c, _d;
        this._viewModel.pages = (this === null || this === void 0 ? void 0 : this.data) || [];
        this.headerText = (_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.data) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : (_d = this === null || this === void 0 ? void 0 : this.messages) === null || _d === void 0 ? void 0 : _d.headerText;
    }
    componentDidLoad() {
        getMessages(this);
    }
    render() {
        return (h(Host, { key: '3c6bf465e2543e62f8e991a22a4f8b8420556285' }, h("calcite-panel", { key: '15a145d4f930de4325716dcd8b73fdcbbe5fa31e', scale: "s" }, this._renderAppGuideHeader(), h("calcite-carousel", { key: '8f962b828f76b8a68f19b71fb79d3f4c93420e38', onCalciteCarouselChange: () => this._updateHeaderText(), ref: el => this._carouselRef = el, "arrow-type": this._getArrowType() }, this._renderAppGuidePages(this._viewModel.pages)))));
    }
    _updateHeaderText() {
        var _a;
        const { _viewModel, _carouselRef, messages } = this;
        const nodeArray = Array.from(_carouselRef.childNodes);
        const selectedNodeIndex = nodeArray.indexOf(_carouselRef.selectedItem);
        // DOM nodes get updated after the viewModel is updated, so the selectedNodeIndex
        // may be out of bounds of the pages collection in the viewModel when pages are removed.
        // When this happens, we default to the title of the first page.
        const pages = _viewModel === null || _viewModel === void 0 ? void 0 : _viewModel.pages;
        const selectedPage = (_a = pages === null || pages === void 0 ? void 0 : pages[selectedNodeIndex]) !== null && _a !== void 0 ? _a : pages[0];
        this.headerText = (selectedPage === null || selectedPage === void 0 ? void 0 : selectedPage.title) || (messages === null || messages === void 0 ? void 0 : messages.headerText);
    }
    _getArrowType() {
        return this._viewModel.pages.length > 2 ? 'inline' : 'none';
    }
    _renderAppGuideHeader() {
        const { messages, header, headerText } = this;
        const displayHeader = !!header && (messages === null || messages === void 0 ? void 0 : messages.headerText);
        const _headerText = headerText || (messages === null || messages === void 0 ? void 0 : messages.headerText);
        return displayHeader ?
            (h("span", { slot: "header-content" }, _headerText, " ", h("calcite-icon", { icon: "lightbulb", scale: "s" }))) :
            null;
    }
    _renderAppGuidePages(pages) {
        return pages.map((pageData, index) => {
            const { content, type } = pageData;
            return (h("calcite-carousel-item", { key: `page_${index}` }, h("div", { class: CSS.contentWrapper }, this._renderContentItems(content, type))));
        });
    }
    _renderContentItems(content, type) {
        switch (type) {
            case 'list':
                return (h("ol", { class: CSS.contentList }, content.map((contentItem, index) => (h("li", { key: `content-list-item-${index}`, class: CSS.contentListItem }, contentItem)))));
            case 'paragraphs':
            default:
                return content.map((contentItem, index) => (h("p", { key: `content-paragraph-${index}` }, contentItem)));
        }
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "data": ["watchPropHandler"]
    }; }
};
InstantAppsAppGuide.style = InstantAppsAppGuideStyle0;

export { InstantAppsAppGuide as instant_apps_app_guide };
