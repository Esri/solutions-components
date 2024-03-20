/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, Build, h, Host } from '@stencil/core/internal/client';
import { t as toAriaBoolean, g as getElementDir, x as nodeListToArray } from './dom.js';
import { g as guid } from './guid.js';
import { c as connectInteractive, d as disconnectInteractive, I as InteractiveContainer, u as updateHostInteraction } from './interactive.js';
import { c as createObserver } from './observers.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { c as connectMessages, d as disconnectMessages, s as setUpMessages, u as updateMessages } from './t9n.js';
import { g as getIconScale } from './component.js';
import { d as defineCustomElement$1 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    closeButton: "close-button",
    container: "container",
    content: "content",
    contentHasText: "content--has-text",
    iconEnd: "icon-end",
    iconPresent: "icon-present",
    iconStart: "icon-start",
    titleIcon: "calcite-tab-title--icon",
};
const ICONS = {
    close: "x",
};

const tabTitleCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;outline:2px solid transparent;outline-offset:2px;margin-inline-start:0px}:host([layout=inline]){flex:0 1 auto}:host([layout=center]){flex:1 1 auto}:host([layout=center]) .scale-s,:host([layout=center]) .scale-m,:host([layout=center]) .scale-l{margin-block:0px;text-align:center;flex-basis:12rem}:host([layout=center]) .scale-s .content,:host([layout=center]) .scale-m .content,:host([layout=center]) .scale-l .content{margin:auto}:host([layout=center][closable]) .content{padding-inline-start:32px}:host([layout=center][bordered][closable]) .scale-s .content{padding-inline-start:36px}:host([layout=center][bordered][closable]) .scale-m .content{padding-inline-start:40px}:host([layout=center][closable]) .scale-l .content{padding-inline-start:40px}:host([layout=center][closable][bordered]) .scale-s .content{padding-inline-start:52px}:host([position=bottom]) .container{border-block-end-width:0px;border-block-start-width:2px;border-block-start-color:transparent;border-block-start-style:solid}:host([closed]){display:none}.container{outline-color:transparent}:host(:focus) .container{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host(:focus) .container:focus-within{outline-color:transparent}:host(:active) a,:host(:focus) a,:host(:hover) a{border-color:var(--calcite-color-border-2);color:var(--calcite-color-text-1);-webkit-text-decoration-line:none;text-decoration-line:none}:host([selected]) .container{border-color:transparent;color:var(--calcite-color-text-1)}:host([disabled]) .container{pointer-events:none;opacity:0.5}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.scale-s .content{padding-block:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem}.scale-m .content{padding-block:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem}.scale-l .content{padding-block:0.625rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}.container{box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;cursor:pointer;align-content:center;justify-content:space-between;border-block-end-width:2px;padding-inline:0px;font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-3);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;border-block-end-color:transparent;border-block-end-style:solid}.content{display:flex;align-items:center;justify-content:center}.calcite-tab-title--icon{position:relative;margin:0px;display:inline-flex;align-self:center}.calcite-tab-title--icon svg{transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.content--has-text{padding:0.25rem}.content--has-text .calcite-tab-title--icon.icon-start{margin-inline-end:0.5rem}.content--has-text .calcite-tab-title--icon.icon-end{margin-inline-start:0.5rem}.close-button{display:flex;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;align-content:center;align-items:center;justify-content:center;align-self:center;border-style:none;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-3);outline-color:transparent;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;block-size:calc(100% - 2px);background-color:var(--calcite-button-transparent-1);margin-inline-start:auto}.close-button:focus{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          );outline-offset:-1px}.close-button:focus,.close-button:hover{color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-2)}.close-button:active{color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-3)}.close-button calcite-icon{color:inherit}:host([icon-start][icon-end]) .calcite-tab-title--icon:first-child{margin-inline-end:0.5rem}:host([bordered]){margin-inline-end:0}:host([bordered][selected]){box-shadow:inset 0px -2px var(--calcite-color-foreground-1)}:host([bordered][selected][position=bottom]){box-shadow:inset 0 2px 0 var(--calcite-color-foreground-1)}:host([bordered]:hover) .container,:host([bordered]:focus) .container,:host([bordered]:active) .container{position:relative}:host([bordered]:hover) .container{background-color:var(--calcite-color-transparent-hover)}:host([closable]) .container,:host([bordered]) .container{border-inline-start:1px solid transparent;border-inline-end:1px solid transparent}:host([closable]) .container .close-button,:host([bordered]) .container .close-button{margin-inline:0}:host([closable]) .content{box-sizing:border-box;block-size:100%;border-block-end-color:transparent}:host([closable][position=bottom]) .container,:host([bordered][position=bottom]) .container{border-block-start-style:unset}:host([selected][bordered]) .container{border-inline-start-color:var(--calcite-color-border-1);border-inline-end-color:var(--calcite-color-border-1)}:host([bordered]) .content{padding-inline:0.75rem}:host([bordered]) .scale-s .content{padding-inline:0.5rem}:host([bordered]) .scale-l .content{padding-inline:1rem}@media (forced-colors: active){:host{outline-width:0;outline-offset:0}:host(:focus) .container{outline-color:highlight}:host([bordered]) .container{border-block-end-style:solid}:host([bordered][position=bottom]) .container{border-block-start-style:solid}:host([bordered][selected]) .container{border-block-end-style:none}:host([bordered][position=bottom][selected]) .container{border-block-start-style:none}.close-button{z-index:var(--calcite-z-index)}}:host([hidden]){display:none}[hidden]{display:none}";

const TabTitle = /*@__PURE__*/ proxyCustomElement(class TabTitle extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteTabsActivate = createEvent(this, "calciteTabsActivate", 6);
        this.calciteInternalTabsActivate = createEvent(this, "calciteInternalTabsActivate", 6);
        this.calciteTabsClose = createEvent(this, "calciteTabsClose", 6);
        this.calciteInternalTabsClose = createEvent(this, "calciteInternalTabsClose", 6);
        this.calciteInternalTabsFocusNext = createEvent(this, "calciteInternalTabsFocusNext", 6);
        this.calciteInternalTabsFocusPrevious = createEvent(this, "calciteInternalTabsFocusPrevious", 6);
        this.calciteInternalTabsFocusFirst = createEvent(this, "calciteInternalTabsFocusFirst", 6);
        this.calciteInternalTabsFocusLast = createEvent(this, "calciteInternalTabsFocusLast", 6);
        this.calciteInternalTabTitleRegister = createEvent(this, "calciteInternalTabTitleRegister", 6);
        this.calciteInternalTabIconChanged = createEvent(this, "calciteInternalTabIconChanged", 6);
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.closeClickHandler = () => {
            this.closeTabTitleAndNotify();
        };
        /** watches for changing text content */
        this.mutationObserver = createObserver("mutation", () => this.updateHasText());
        this.resizeObserver = createObserver("resize", () => {
            this.calciteInternalTabIconChanged.emit();
        });
        this.guid = `calcite-tab-title-${guid()}`;
        this.selected = false;
        this.closable = false;
        this.closed = false;
        this.disabled = false;
        this.iconEnd = undefined;
        this.iconFlipRtl = undefined;
        this.iconStart = undefined;
        this.layout = undefined;
        this.position = "top";
        this.scale = "m";
        this.bordered = false;
        this.tab = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.controls = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = undefined;
        this.hasText = false;
    }
    selectedHandler() {
        if (this.selected) {
            this.activateTab(false);
        }
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectInteractive(this);
        connectLocalized(this);
        connectMessages(this);
        this.setupTextContentObserver();
        this.parentTabNavEl = this.el.closest("calcite-tab-nav");
        this.parentTabsEl = this.el.closest("calcite-tabs");
    }
    disconnectedCallback() {
        var _a, _b, _c;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
        (_b = document.body) === null || _b === void 0 ? void 0 : _b.dispatchEvent(new CustomEvent("calciteTabTitleUnregister", {
            detail: this.el,
        }));
        (_c = this.resizeObserver) === null || _c === void 0 ? void 0 : _c.disconnect();
        disconnectInteractive(this);
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    async componentWillLoad() {
        await setUpMessages(this);
        if (Build.isBrowser) {
            this.updateHasText();
        }
        if (this.tab && this.selected) {
            this.activateTab(false);
        }
    }
    componentWillRender() {
        if (this.parentTabsEl) {
            this.layout = this.parentTabsEl.layout;
            this.bordered = this.parentTabsEl.bordered;
        }
    }
    render() {
        const { el, closed } = this;
        const id = el.id || this.guid;
        const iconStartEl = (h("calcite-icon", { class: { [CSS.titleIcon]: true, [CSS.iconStart]: true }, flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: getIconScale(this.scale) }));
        const iconEndEl = (h("calcite-icon", { class: { [CSS.titleIcon]: true, [CSS.iconEnd]: true }, flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, scale: getIconScale(this.scale) }));
        return (h(Host, { "aria-controls": this.controls, "aria-selected": toAriaBoolean(this.selected), id: id, role: "tab", tabIndex: this.selected && !this.disabled ? 0 : -1 }, h(InteractiveContainer, { disabled: this.disabled }, h("div", { class: {
                container: true,
                [CSS.iconPresent]: !!this.iconStart || !!this.iconEnd,
                [`scale-${this.scale}`]: true,
            }, hidden: closed,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => { var _a; return (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.observe(el); } }, h("div", { class: { [CSS.content]: true, [CSS.contentHasText]: this.hasText } }, this.iconStart ? iconStartEl : null, h("slot", null), this.iconEnd ? iconEndEl : null), this.renderCloseButton()))));
    }
    renderCloseButton() {
        const { closable, messages } = this;
        return closable ? (h("button", { "aria-label": messages.close, class: CSS.closeButton, disabled: false, key: CSS.closeButton, onClick: this.closeClickHandler, title: messages.close, type: "button",
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.closeButtonEl = el) }, h("calcite-icon", { icon: ICONS.close, scale: getIconScale(this.scale) }))) : null;
    }
    async componentDidLoad() {
        this.calciteInternalTabTitleRegister.emit(await this.getTabIdentifier());
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    internalTabChangeHandler(event) {
        const targetTabsEl = event
            .composedPath()
            .find((el) => el.tagName === "CALCITE-TABS");
        if (targetTabsEl !== this.parentTabsEl) {
            return;
        }
        if (this.tab) {
            this.selected = this.tab === event.detail.tab;
        }
        else {
            this.getTabIndex().then((index) => {
                this.selected = index === event.detail.tab;
            });
        }
        event.stopPropagation();
    }
    onClick() {
        this.activateTab();
    }
    keyDownHandler(event) {
        switch (event.key) {
            case " ":
            case "Enter":
                if (!event.composedPath().includes(this.closeButtonEl)) {
                    this.activateTab();
                    event.preventDefault();
                }
                break;
            case "ArrowRight":
                event.preventDefault();
                if (getElementDir(this.el) === "ltr") {
                    this.calciteInternalTabsFocusNext.emit();
                }
                else {
                    this.calciteInternalTabsFocusPrevious.emit();
                }
                break;
            case "ArrowLeft":
                event.preventDefault();
                if (getElementDir(this.el) === "ltr") {
                    this.calciteInternalTabsFocusPrevious.emit();
                }
                else {
                    this.calciteInternalTabsFocusNext.emit();
                }
                break;
            case "Home":
                event.preventDefault();
                this.calciteInternalTabsFocusFirst.emit();
                break;
            case "End":
                event.preventDefault();
                this.calciteInternalTabsFocusLast.emit();
                break;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Returns the index of the title within the `calcite-tab-nav`.
     */
    async getTabIndex() {
        return Array.prototype.indexOf.call(nodeListToArray(this.el.parentElement.children).filter((el) => el.matches("calcite-tab-title")), this.el);
    }
    /**
     * @internal
     */
    async getTabIdentifier() {
        return this.tab ? this.tab : this.getTabIndex();
    }
    /**
     * @param tabIds
     * @param titleIds
     * @internal
     */
    async updateAriaInfo(tabIds = [], titleIds = []) {
        this.controls = tabIds[titleIds.indexOf(this.el.id)] || null;
    }
    /**
     * This activates a tab in order for it and its associated tab-title be selected.
     *
     * @param userTriggered - when `true`, user-interaction events will be emitted in addition to internal events
     * @internal
     */
    async activateTab(userTriggered = true) {
        if (this.disabled || this.closed) {
            return;
        }
        const payload = { tab: this.tab };
        this.calciteInternalTabsActivate.emit(payload);
        if (userTriggered) {
            // emit in the next frame to let internal events sync up
            requestAnimationFrame(() => this.calciteTabsActivate.emit());
        }
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    updateHasText() {
        this.hasText = this.el.textContent.trim().length > 0;
    }
    setupTextContentObserver() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
    }
    closeTabTitleAndNotify() {
        this.closed = true;
        this.calciteInternalTabsClose.emit({ tab: this.tab });
        this.calciteTabsClose.emit();
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "selected": ["selectedHandler"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return tabTitleCss; }
}, [1, "calcite-tab-title", {
        "selected": [1540],
        "closable": [516],
        "closed": [1540],
        "disabled": [516],
        "iconEnd": [513, "icon-end"],
        "iconFlipRtl": [513, "icon-flip-rtl"],
        "iconStart": [513, "icon-start"],
        "layout": [1537],
        "position": [1],
        "scale": [1],
        "bordered": [1540],
        "tab": [513],
        "messages": [1040],
        "messageOverrides": [1040],
        "controls": [32],
        "defaultMessages": [32],
        "effectiveLocale": [32],
        "hasText": [32],
        "getTabIndex": [64],
        "getTabIdentifier": [64],
        "updateAriaInfo": [64],
        "activateTab": [64]
    }, [[16, "calciteInternalTabChange", "internalTabChangeHandler"], [0, "click", "onClick"], [0, "keydown", "keyDownHandler"]], {
        "selected": ["selectedHandler"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-tab-title", "calcite-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-tab-title":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, TabTitle);
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { TabTitle as T, defineCustomElement as d };
