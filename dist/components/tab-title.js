/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { t as toAriaBoolean, g as getElementDir, A as nodeListToArray } from './dom.js';
import { g as guid } from './guid.js';
import { c as connectInteractive, d as disconnectInteractive, I as InteractiveContainer, u as updateHostInteraction } from './interactive.js';
import { c as createObserver } from './observers.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { c as connectMessages, d as disconnectMessages, s as setUpMessages, u as updateMessages } from './t9n.js';
import { g as getIconScale } from './component.js';
import { i as isBrowser } from './browser.js';
import { d as defineCustomElement$1 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    closeButton: "close-button",
    container: "container",
    containerBottom: "container--bottom",
    content: "content",
    contentHasText: "content--has-text",
    iconEnd: "icon-end",
    iconPresent: "icon-present",
    iconStart: "icon-start",
    titleIcon: "calcite-tab-title--icon",
    scale: (scale) => `scale-${scale}`,
    selectedIndicator: "selected-indicator",
};
const ICONS = {
    close: "x",
};

const tabTitleCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block;outline:2px solid transparent;outline-offset:2px;margin-inline-start:0px}:host([layout=inline]){flex:0 1 auto}:host([layout=center]){flex:1 1 auto}.content{position:relative;margin-block-end:0.125rem;box-sizing:border-box;display:flex;block-size:100%;align-items:center;justify-content:center}.scale-s .content{padding-block:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem}.scale-s .close-button{inline-size:1.25rem}.scale-m .content{padding-block:0.5rem;font-size:var(--calcite-font-size--1);line-height:1rem}.scale-m .close-button{inline-size:1.75rem}.scale-l .content{padding-block:0.625rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}.scale-l .close-button{inline-size:2rem}:host([closable]) .content{border-block-end-color:transparent}:host([layout=inline]) .content,:host([layout=center]) .content{padding-inline:0.25rem}:host([layout=center]) .scale-s,:host([layout=center]) .scale-m,:host([layout=center]) .scale-l{margin-block:0px;justify-content:center;text-align:center}:host([layout=center]) .scale-s .content,:host([layout=center]) .scale-m .content,:host([layout=center]) .scale-l .content{flex:1 1 auto;flex-grow:1}.container{position:relative;box-sizing:border-box;display:flex;block-size:100%;inline-size:100%;cursor:pointer;align-content:center;justify-content:space-between;padding-inline:0px;font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-3);outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.selected-indicator{position:absolute;display:block;block-size:0.125rem;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;inset-block-end:0;inset-inline-start:0;inset-inline-end:0;inline-size:100%}.container--bottom .selected-indicator{inset-block-end:unset;inset-block-start:0}:host([bordered]) .selected-indicator{inset-block-start:0;inset-block-end:unset;inset-inline-start:-1px;inset-inline-end:0;inline-size:calc(100% + var(--calcite-spacing-base))}:host([bordered]) .container:not(.container--bottom){border-block-end:1px solid transparent}:host([bordered]:not([selected]):hover) .container:not(.container--bottom){border-block-end:1px solid var(--calcite-color-border-1)}:host([bordered]:not([selected]):hover:not(:focus)) .selected-indicator{background-color:var(--calcite-color-foreground-2)}:host([bordered]:not([selected]):hover:not(:focus)) .container:not(.container--bottom) .selected-indicator{box-shadow:inset 0 1px var(--calcite-color-border-1)}:host([bordered]:not([selected]):hover:not(:focus)) .container.container--bottom .selected-indicator{box-shadow:inset 0 -1px var(--calcite-color-border-1)}:host([bordered][selected]) .container::after{position:absolute;display:block;block-size:0.125rem;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;inset-block-end:-1px;inset-inline-start:0;inset-inline-end:0;inline-size:100%;background:var(--calcite-color-foreground-1);content:\"\"}:host([bordered][selected]) .container.container--bottom::after{inset-block-start:-1px}:host([bordered][selected]:hover) .container::after{background:var(--calcite-color-foreground-2)}:host([bordered][selected]:focus) .container::after{background:transparent}:host([bordered]) .container--bottom .selected-indicator{inset-block-start:unset;inset-block-end:0}:host([selected]) .selected-indicator,:host([selected]:hover) .selected-indicator{background-color:var(--calcite-color-brand)}:host(:hover) .selected-indicator{background-color:var(--calcite-color-border-3)}:host(:focus) .selected-indicator,:host(:active) .selected-indicator{background-color:var(--calcite-color-brand)}@media (forced-colors: active){.selected-indicator{background-color:highlight}}:host([closed]){display:none}:host([selected]) .container{border-color:transparent;color:var(--calcite-color-text-1)}:host(:focus) .container{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host(:focus) .container:focus-within{outline-color:transparent}:host(:active) a,:host(:focus) a,:host(:hover) a{border-color:var(--calcite-color-border-2);color:var(--calcite-color-text-1);text-decoration-line:none}:host([disabled]) .container{pointer-events:none;opacity:0.5}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}.calcite-tab-title--icon{position:relative;margin:0px;display:inline-flex;align-self:center}.calcite-tab-title--icon svg{transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.content--has-text{padding:0.25rem}.content--has-text .calcite-tab-title--icon.icon-start{margin-inline-end:var(--calcite-spacing-sm)}.content--has-text .calcite-tab-title--icon.icon-end{margin-inline-start:var(--calcite-spacing-sm)}.close-button{display:flex;block-size:100%;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;align-content:center;align-items:center;justify-content:center;align-self:center;border-style:none;background-color:transparent;color:var(--calcite-color-text-3);outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;margin-inline-start:var(--calcite-spacing-sm);margin-inline-end:var(--calcite-spacing-px);block-size:calc(100% - var(--calcite-spacing-xxs))}.close-button:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand))}.close-button:focus,.close-button:hover{color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-3)}.close-button:active{color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-3)}.close-button calcite-icon{color:inherit}:host([icon-start][icon-end]) .calcite-tab-title--icon:first-child{margin-inline-end:var(--calcite-spacing-sm)}:host([bordered]) .container:not(.container--bottom) .close-button{block-size:calc(100% - var(--calcite-spacing-px));margin-block-start:-1px}:host([bordered]) .container .close-button calcite-icon{margin-block-start:var(--calcite-spacing-px)}:host([bordered]) .container .close-button:focus,:host([bordered]) .container .close-button:hover,:host([bordered]) .container .close-button:active{box-shadow:0 2px 0 0 var(--calcite-color-foreground-3)}:host([bordered]) .container.container--bottom .close-button{box-shadow:0 -2px 0 0 transparent}:host([bordered]) .container.container--bottom .close-button calcite-icon{margin-block-end:var(--calcite-spacing-px)}:host([bordered]) .container.container--bottom .close-button:focus,:host([bordered]) .container.container--bottom .close-button:hover,:host([bordered]) .container.container--bottom .close-button:active{box-shadow:0 -2px 0 0 var(--calcite-color-foreground-3)}:host([bordered][selected]){box-shadow:inset 0 -1px var(--calcite-color-foreground-1)}:host([bordered]:not([selected])) .container .close-button{box-shadow:0 2px 0 0 transparent}:host([bordered]:hover) .container{background-color:var(--calcite-color-foreground-2)}:host([bordered]) .container{border-inline:var(--calcite-spacing-px) solid transparent}:host([selected][bordered]) .container{border-inline-color:var(--calcite-color-border-1)}:host([layout=inline][bordered]) .scale-m .content,:host([layout=center][bordered]) .scale-m .content{padding-inline:0.75rem}:host([layout=inline][bordered]) .scale-s .content,:host([layout=center][bordered]) .scale-s .content{padding-inline:0.5rem}:host([layout=inline][bordered]) .scale-l .content,:host([layout=center][bordered]) .scale-l .content{padding-inline:1rem}:host([layout=inline][closable]) .scale-s .content,:host([layout=inline][closable]) .scale-m .content,:host([layout=inline][closable]) .scale-l .content{padding-inline-end:0}@media (forced-colors: active){:host{outline-width:0;outline-offset:0}:host(:focus) .container{outline-color:highlight}:host([bordered]) .container{border-block-end-style:solid}:host([bordered]) .container--bottom{border-block-start-style:solid}:host([bordered][selected]) .container{border-block-end-style:none}:host([bordered][selected]) .container--bottom{border-block-start-style:none}.close-button{z-index:var(--calcite-z-index)}}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTabTitleStyle0 = tabTitleCss;

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
        this.mutationObserver?.disconnect();
        // Dispatching to body in order to be listened by other elements that are still connected to the DOM.
        document.body?.dispatchEvent(new CustomEvent("calciteTabTitleUnregister", {
            detail: this.el,
        }));
        this.resizeObserver?.disconnect();
        disconnectInteractive(this);
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    async componentWillLoad() {
        await setUpMessages(this);
        if (isBrowser()) {
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
        const iconStartEl = (h("calcite-icon", { key: '20ea18dabdb4cabe8a032d0799f3c757bc90c91d', class: { [CSS.titleIcon]: true, [CSS.iconStart]: true }, flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: getIconScale(this.scale) }));
        const iconEndEl = (h("calcite-icon", { key: 'ebd3913a334a959e8962addd45e5077ee82f2ca8', class: { [CSS.titleIcon]: true, [CSS.iconEnd]: true }, flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, scale: getIconScale(this.scale) }));
        return (h(Host, { key: '58a72fa4a6e961c3414dfe224a4e235892784707', "aria-controls": this.controls, "aria-selected": toAriaBoolean(this.selected), id: id, role: "tab", tabIndex: this.selected && !this.disabled ? 0 : -1 }, h(InteractiveContainer, { key: 'fe7662ade3001579b664772b4672d6bebd06a82b', disabled: this.disabled }, h("div", { key: 'ea226b71436922de6bae2e8e542ae0adf08add1b', class: {
                [CSS.container]: true,
                [CSS.containerBottom]: this.position === "bottom",
                [CSS.iconPresent]: !!this.iconStart || !!this.iconEnd,
                [CSS.scale(this.scale)]: true,
            }, hidden: closed, ref: (el) => this.resizeObserver?.observe(el) }, h("div", { key: '737609daa04d9dc18b46872c49b82cf211ba9b5a', class: { [CSS.content]: true, [CSS.contentHasText]: this.hasText } }, this.iconStart ? iconStartEl : null, h("slot", { key: 'fb500a910e5c6bfcd8571e2d109331dd88f2544d' }), this.iconEnd ? iconEndEl : null), this.renderCloseButton(), h("div", { key: '3fd13c6f459e05cea88c40809b7220369866a2b9', class: CSS.selectedIndicator })))));
    }
    renderCloseButton() {
        const { closable, messages } = this;
        return closable ? (h("button", { "aria-label": messages.close, class: CSS.closeButton, disabled: false, key: CSS.closeButton, onClick: this.closeClickHandler, ref: (el) => (this.closeButtonEl = el), title: messages.close, type: "button" }, h("calcite-icon", { icon: ICONS.close, scale: getIconScale(this.scale) }))) : null;
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
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
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
    static get style() { return CalciteTabTitleStyle0; }
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
