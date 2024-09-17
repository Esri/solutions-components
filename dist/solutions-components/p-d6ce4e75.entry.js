/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, g as getElement } from './p-6eb37ed2.js';
import { a as getElementDir, t as toAriaBoolean } from './p-68ec5c15.js';
import { c as connectLocalized, d as disconnectLocalized } from './p-939bc1b4.js';
import { c as createObserver } from './p-c638d28e.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './p-1a9a47a0.js';
import { H as Heading } from './p-14fbc662.js';
import { l as logger } from './p-b1bc21ac.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';
import './p-fe6f7734.js';
import './p-acaae81d.js';
import './p-aeb86188.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    header: "header",
    heading: "heading",
    close: "close",
    container: "container",
    tipContainer: "tip-container",
    tipContainerAdvancing: "tip-container--advancing",
    tipContainerRetreating: "tip-container--retreating",
    pagination: "pagination",
    pagePosition: "page-position",
    pageNext: "page-next",
    pagePrevious: "page-previous",
};
const ICONS = {
    chevronLeft: "chevron-left",
    chevronRight: "chevron-right",
    close: "x",
};

const tipManagerCss = ":host{box-sizing:border-box;display:block;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2);--calcite-tip-manager-height:19vh}:host *{box-sizing:border-box}:host([closed]){display:none}.header{margin:0px;display:flex;align-content:space-between;align-items:center;fill:var(--calcite-color-text-2);color:var(--calcite-color-text-2)}.heading{margin:0px;padding:0px;font-weight:var(--calcite-font-weight-medium)}.header .heading{flex:1 1 auto;padding:0.5rem}.header{border-width:0px;border-block-end-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);padding-block:0px;padding-inline-end:0px;padding-inline-start:1rem}.header .heading{padding:0px;font-size:var(--calcite-font-size-1);line-height:1.5rem;font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1)}.container{position:relative;overflow:hidden;outline-color:transparent;min-block-size:150px}.container:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.tip-container{margin-block-start:1px;display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:1rem;outline-color:transparent;animation-name:none;animation-duration:var(--calcite-animation-timing);block-size:var(--calcite-tip-manager-height)}.tip-container:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}::slotted(calcite-tip){margin:0px;border-style:none;max-inline-size:var(--calcite-tip-max-width)}.tip-container--advancing{animation-name:tip-advance}.tip-container--retreating{animation-name:tip-retreat}.pagination{display:flex;align-items:center;justify-content:center;padding-inline:0px;padding-block:0.75rem 0.5rem}.page-position{margin-block:0px;margin-inline:0.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}@keyframes tip-advance{0%{opacity:0;transform:translate3d(50px, 0, 0) scale(0.99)}100%{opacity:1;transform:translate3d(0, 0, 0) scale(1)}}@keyframes tip-retreat{0%{opacity:0;transform:translate3d(-50px, 0, 0) scale(0.99)}100%{opacity:1;transform:translate3d(0, 0, 0) scale(1)}}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTipManagerStyle0 = tipManagerCss;

logger.deprecated("component", {
    name: "tip-manager",
    removalVersion: 4,
    suggested: "carousel",
});
const TipManager = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteTipManagerClose = createEvent(this, "calciteTipManagerClose", 6);
        this.mutationObserver = createObserver("mutation", () => this.setUpTips());
        this.hideTipManager = () => {
            this.closed = true;
            this.calciteTipManagerClose.emit();
        };
        this.previousClicked = () => {
            this.previousTip();
        };
        this.nextClicked = () => {
            this.nextTip();
        };
        this.tipManagerKeyDownHandler = (event) => {
            if (event.target !== this.container) {
                return;
            }
            switch (event.key) {
                case "ArrowRight":
                    event.preventDefault();
                    this.nextTip();
                    break;
                case "ArrowLeft":
                    event.preventDefault();
                    this.previousTip();
                    break;
                case "Home":
                    event.preventDefault();
                    this.selectedIndex = 0;
                    break;
                case "End":
                    event.preventDefault();
                    this.selectedIndex = this.total - 1;
                    break;
            }
        };
        this.storeContainerRef = (el) => {
            this.container = el;
        };
        this.closed = false;
        this.headingLevel = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.selectedIndex = undefined;
        this.tips = undefined;
        this.total = undefined;
        this.direction = undefined;
        this.groupTitle = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
    }
    closedChangeHandler() {
        this.direction = null;
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    selectedChangeHandler() {
        this.showSelectedTip();
        this.updateGroupTitle();
    }
    async effectiveLocaleChange() {
        await updateMessages(this, this.effectiveLocale);
        this.updateGroupTitle();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        connectMessages(this);
        this.setUpTips();
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    }
    async componentWillLoad() {
        await setUpMessages(this);
        this.updateGroupTitle();
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Selects the next `calcite-tip` to display. */
    async nextTip() {
        this.direction = "advancing";
        const nextIndex = this.selectedIndex + 1;
        this.selectedIndex = (nextIndex + this.total) % this.total;
    }
    /** Selects the previous `calcite-tip` to display. */
    async previousTip() {
        this.direction = "retreating";
        const previousIndex = this.selectedIndex - 1;
        this.selectedIndex = (previousIndex + this.total) % this.total;
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    setUpTips() {
        const tips = Array.from(this.el.querySelectorAll("calcite-tip"));
        this.total = tips.length;
        if (this.total === 0) {
            return;
        }
        const selectedTip = this.el.querySelector("calcite-tip[selected]");
        this.tips = tips;
        this.selectedIndex = selectedTip ? tips.indexOf(selectedTip) : 0;
        tips.forEach((tip) => {
            tip.closeDisabled = true;
        });
        this.showSelectedTip();
    }
    showSelectedTip() {
        this.tips.forEach((tip, index) => {
            const isSelected = this.selectedIndex === index;
            tip.selected = isSelected;
            tip.hidden = !isSelected;
        });
    }
    updateGroupTitle() {
        if (this.tips) {
            const selectedTip = this.tips[this.selectedIndex];
            const tipParent = selectedTip.closest("calcite-tip-group");
            this.groupTitle = tipParent?.groupTitle || this.messages?.defaultGroupTitle;
        }
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderPagination() {
        const dir = getElementDir(this.el);
        const { selectedIndex, tips, total, messages } = this;
        const nextLabel = messages.next;
        const previousLabel = messages.previous;
        const paginationLabel = messages.defaultPaginationLabel;
        return tips.length > 1 ? (h("footer", { class: CSS.pagination }, h("calcite-action", { class: CSS.pagePrevious, icon: dir === "ltr" ? ICONS.chevronLeft : ICONS.chevronRight, onClick: this.previousClicked, scale: "m", text: previousLabel }), h("span", { class: CSS.pagePosition }, `${paginationLabel} ${selectedIndex + 1}/${total}`), h("calcite-action", { class: CSS.pageNext, icon: dir === "ltr" ? ICONS.chevronRight : ICONS.chevronLeft, onClick: this.nextClicked, scale: "m", text: nextLabel }))) : null;
    }
    render() {
        const { closed, direction, headingLevel, groupTitle, selectedIndex, messages, total } = this;
        const closeLabel = messages.close;
        if (total === 0) {
            return null;
        }
        return (h("section", { "aria-hidden": toAriaBoolean(closed), class: CSS.container, hidden: closed, onKeyDown: this.tipManagerKeyDownHandler, ref: this.storeContainerRef, tabIndex: 0 }, h("header", { class: CSS.header }, h(Heading, { class: CSS.heading, level: headingLevel }, groupTitle), h("calcite-action", { class: CSS.close, onClick: this.hideTipManager, scale: "m", text: closeLabel }, h("calcite-icon", { icon: ICONS.close, scale: "m" }))), h("div", { class: {
                [CSS.tipContainer]: true,
                [CSS.tipContainerAdvancing]: !closed && direction === "advancing",
                [CSS.tipContainerRetreating]: !closed && direction === "retreating",
            }, key: selectedIndex, tabIndex: 0 }, h("slot", null)), this.renderPagination()));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "closed": ["closedChangeHandler"],
        "messageOverrides": ["onMessagesChange"],
        "selectedIndex": ["selectedChangeHandler"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
TipManager.style = CalciteTipManagerStyle0;

export { TipManager as calcite_tip_manager };
