/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const dom = require('./dom-6a9b6275.js');
const focusTrapComponent = require('./focusTrapComponent-a4531bc7.js');
const loadable = require('./loadable-2e2626dc.js');
const observers = require('./observers-8fed90f3.js');
const openCloseComponent = require('./openCloseComponent-14628d11.js');
const resources = require('./resources-dfe71ff2.js');
require('./guid-02e5380f.js');
require('./config-afe9063b.js');
require('./browser-69696af0.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    scrim: "scrim",
    container: "container",
    containerOpen: "container--open",
    content: "content",
    containerEmbedded: "container--embedded",
};

const sheetCss = ":host{position:absolute;inset:0px;z-index:var(--calcite-z-index-overlay);display:flex;visibility:hidden !important;--calcite-sheet-scrim-background-internal:rgba(0, 0, 0, 0.85);--calcite-scrim-shadow-block-start-internal:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--calcite-scrim-shadow-block-end-internal:0 -4px 8px -1px rgba(0, 0, 0, 0.08), 0 -2px 4px -1px rgba(0, 0, 0, 0.04);--calcite-scrim-shadow-inline-start-internal:4px 0 8px -1px rgba(0, 0, 0, 0.08), 2px 0 4px -1px rgba(0, 0, 0, 0.04);--calcite-scrim-shadow-inline-end-internal:-4px 0 8px -1px rgba(0, 0, 0, 0.08), -2px 0 4px -1px rgba(0, 0, 0, 0.04)}.calcite--rtl{--calcite-scrim-shadow-inline-start-internal:-4px 0 8px -1px rgba(0, 0, 0, 0.08), -2px 0 4px -1px rgba(0, 0, 0, 0.04);--calcite-scrim-shadow-inline-end-internal:4px 0 8px -1px rgba(0, 0, 0, 0.08), 2px 0 4px -1px rgba(0, 0, 0, 0.04)}.container{visibility:hidden;position:fixed;z-index:var(--calcite-z-index-overlay);display:flex;overflow-y:hidden;color:var(--calcite-color-text-2);opacity:0;transition:visibility 0ms linear var(--calcite-internal-animation-timing-medium), opacity var(--calcite-internal-animation-timing-medium) cubic-bezier(0.215, 0.44, 0.42, 0.88)}:host([position=inline-start]) .container{justify-content:flex-start;inset-block:0;inset-inline:0 auto;--calcite-sheet-hidden-position-internal:translate3d(-1rem, 0, 0)}:host([position=inline-end]) .container{justify-content:flex-end;inset-block:0;inset-inline:auto 0;--calcite-sheet-hidden-position-internal:translate3d(1rem, 0, 0)}:host([position=block-start]) .container{align-items:flex-start;inset-block:0 auto;inset-inline:0;--calcite-sheet-hidden-position-internal:translate3d(0, -1rem, 0)}:host([position=block-end]) .container{align-items:flex-end;inset-block:auto 0;inset-inline:0;--calcite-sheet-hidden-position-internal:translate3d(0, 1rem, 0)}:host([display-mode=float]) .content{--tw-shadow:0 2px 12px -4px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.16);--tw-shadow-colored:0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([display-mode=overlay][position=inline-start]) .container{box-shadow:var(--calcite-scrim-shadow-inline-start-internal)}:host([display-mode=overlay][position=inline-end]) .container{box-shadow:var(--calcite-scrim-shadow-inline-end-internal)}:host([display-mode=overlay][position=block-start]) .container{box-shadow:var(--calcite-scrim-shadow-block-start-internal)}:host([display-mode=overlay][position=block-end]) .container{box-shadow:var(--calcite-scrim-shadow-block-end-internal)}:host([position^=inline]) .container,:host([position^=inline]) .content{inline-size:var(--calcite-sheet-width-internal);max-inline-size:var(--calcite-sheet-max-width-internal);min-inline-size:var(--calcite-sheet-min-width-internal)}:host([position^=block]) .container,:host([position^=block]) .content{block-size:var(--calcite-sheet-height-internal);max-block-size:var(--calcite-sheet-max-height-internal);min-block-size:var(--calcite-sheet-min-height-internal)}:host([display-mode=float][position^=inline]) .container{block-size:calc(100% - 1.5rem);max-block-size:calc(100% - 1.5rem);min-block-size:calc(100% - 1.5rem)}:host([display-mode=float][position^=block]) .container{inline-size:calc(100% - 1.5rem);max-inline-size:calc(100% - 1.5rem);min-inline-size:calc(100% - 1.5rem)}:host([position^=inline][width-scale=s]){--calcite-sheet-width-internal:var(--calcite-sheet-width, 15vw);--calcite-sheet-max-width-internal:var(--calcite-sheet-max-width, 360px);--calcite-sheet-min-width-internal:var(--calcite-sheet-min-width, 260px)}:host([position^=inline][width-scale=m]){--calcite-sheet-width-internal:var(--calcite-sheet-width, 25vw);--calcite-sheet-max-width-internal:var(--calcite-sheet-max-width, 420px);--calcite-sheet-min-width-internal:var(--calcite-sheet-min-width, 300px)}:host([position^=inline][width-scale=l]){--calcite-sheet-width-internal:var(--calcite-sheet-width, 45vw);--calcite-sheet-max-width-internal:var(--calcite-sheet-max-width, 680px);--calcite-sheet-min-width-internal:var(--calcite-sheet-min-width, 340px)}:host([position^=block][height-scale=s]){--calcite-sheet-min-height-internal:var(--calcite-sheet-min-height, 160px);--calcite-sheet-height-internal:var(--calcite-sheet-height, 30vh);--calcite-sheet-max-height-internal:var(--calcite-sheet-max-height, 30vh)}:host([position^=block][height-scale=m]){--calcite-sheet-min-height-internal:var(--calcite-sheet-min-height, 200px);--calcite-sheet-height-internal:var(--calcite-sheet-height, 45vh);--calcite-sheet-max-height-internal:var(--calcite-sheet-max-height, 50vh)}:host([position^=block][height-scale=l]){--calcite-sheet-min-height-internal:var(--calcite-sheet-min-height, 240px);--calcite-sheet-height-internal:var(--calcite-sheet-height, 60vh);--calcite-sheet-max-height-internal:var(--calcite-sheet-max-height, 70vh)}.scrim{--calcite-scrim-background:var(--calcite-sheet-scrim-background, var(--calcite-sheet-scrim-background-internal));position:fixed;inset:0px;display:flex;overflow-y:hidden}:host([opened]){visibility:visible !important}.content{position:relative;z-index:var(--calcite-z-index-modal);box-sizing:border-box;display:block;max-inline-size:100%;overflow-y:hidden;padding:0px;background-color:var(--calcite-color-foreground-1);max-block-size:100%;visibility:hidden;transition:transform var(--calcite-internal-animation-timing-medium) cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear var(--calcite-internal-animation-timing-medium), opacity var(--calcite-internal-animation-timing-medium) cubic-bezier(0.215, 0.44, 0.42, 0.88);transform:var(--calcite-sheet-hidden-position-internal)}.container--open .content{transform:translate3d(0, 0, 0)}:host([display-mode=float]) .content,:host([display-mode=float]) .container{border-radius:0.25rem}:host([display-mode=float]) .container{padding:0.75rem}.container--open{visibility:visible;opacity:1;transition-delay:0ms}.container--open .content{pointer-events:auto;visibility:visible;opacity:1;transition:transform var(--calcite-internal-animation-timing-medium) cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear, opacity var(--calcite-internal-animation-timing-medium) cubic-bezier(0.215, 0.44, 0.42, 0.88), max-inline-size var(--calcite-internal-animation-timing-medium) cubic-bezier(0.215, 0.44, 0.42, 0.88), max-block-size var(--calcite-internal-animation-timing-medium) cubic-bezier(0.215, 0.44, 0.42, 0.88);transition-delay:0ms}:host([position=inline-start]) .content,:host([position=inline-end]) .content{block-size:100%}:host([position=block-start]) .content,:host([position=block-end]) .content{inline-size:100%}:host([position]) .container--embedded{pointer-events:auto;position:absolute;inline-size:100%;max-inline-size:100%;min-inline-size:100%;block-size:100%;max-block-size:100%;min-block-size:100%}:host([position]) .container--embedded calcite-scrim{position:absolute}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteSheetStyle0 = sheetCss;

const Sheet = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteSheetBeforeClose = index.createEvent(this, "calciteSheetBeforeClose", 6);
        this.calciteSheetClose = index.createEvent(this, "calciteSheetClose", 6);
        this.calciteSheetBeforeOpen = index.createEvent(this, "calciteSheetBeforeOpen", 6);
        this.calciteSheetOpen = index.createEvent(this, "calciteSheetOpen", 6);
        //--------------------------------------------------------------------------
        //
        //  Private Properties/ State
        //
        //--------------------------------------------------------------------------
        this.openTransitionProp = "opacity";
        this.ignoreOpenChange = false;
        this.mutationObserver = observers.createObserver("mutation", () => this.handleMutationObserver());
        this.setContentId = (el) => {
            this.contentId = dom.ensureId(el);
        };
        this.setTransitionEl = (el) => {
            this.transitionEl = el;
        };
        this.openEnd = () => {
            this.setFocus();
            this.el.removeEventListener("calciteSheetOpen", this.openEnd);
        };
        this.handleOutsideClose = () => {
            if (this.outsideCloseDisabled) {
                return;
            }
            this.open = false;
        };
        this.closeSheet = async () => {
            if (this.beforeClose) {
                try {
                    await this.beforeClose(this.el);
                }
                catch (_error) {
                    // close prevented
                    requestAnimationFrame(() => {
                        this.ignoreOpenChange = true;
                        this.open = true;
                        this.ignoreOpenChange = false;
                    });
                    return;
                }
            }
            this.opened = false;
            this.removeOverflowHiddenClass();
        };
        this.beforeClose = undefined;
        this.displayMode = "overlay";
        this.embedded = false;
        this.escapeDisabled = false;
        this.heightScale = "m";
        this.focusTrapDisabled = false;
        this.label = undefined;
        this.open = false;
        this.opened = false;
        this.outsideCloseDisabled = false;
        this.position = "inline-start";
        this.widthScale = "m";
    }
    handleFocusTrapDisabled(focusTrapDisabled) {
        if (!this.open) {
            return;
        }
        focusTrapDisabled ? focusTrapComponent.deactivateFocusTrap(this) : focusTrapComponent.activateFocusTrap(this);
    }
    toggleSheet(value) {
        if (this.ignoreOpenChange) {
            return;
        }
        if (value) {
            this.openSheet();
        }
        else {
            this.closeSheet();
        }
    }
    handleOpenedChange() {
        openCloseComponent.onToggleOpenCloseComponent(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        // when sheet initially renders, if active was set we need to open as watcher doesn't fire
        if (this.open) {
            requestAnimationFrame(() => this.openSheet());
        }
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    connectedCallback() {
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
        focusTrapComponent.connectFocusTrap(this);
    }
    disconnectedCallback() {
        this.removeOverflowHiddenClass();
        this.mutationObserver?.disconnect();
        focusTrapComponent.deactivateFocusTrap(this);
        this.embedded = false;
    }
    render() {
        const dir = dom.getElementDir(this.el);
        return (index.h(index.Host, { key: '682efb5e9586947743259232dfed9a90ef44b4c2', "aria-describedby": this.contentId, "aria-label": this.label, "aria-modal": "true", role: "dialog" }, index.h("div", { key: 'ed1647113f217d7fe34ec91fdbc7fa60310c33a2', class: {
                [CSS.container]: true,
                [CSS.containerOpen]: this.opened,
                [CSS.containerEmbedded]: this.embedded,
                [resources.CSS_UTILITY.rtl]: dir === "rtl",
            }, ref: this.setTransitionEl }, index.h("calcite-scrim", { key: 'a5dd8c8d81bb5d5536a43113f09120dfb708cf14', class: CSS.scrim, onClick: this.handleOutsideClose }), index.h("div", { key: '350faeae89f75b8e52079cd68c28ee66c1162762', class: {
                [CSS.content]: true,
            }, ref: this.setContentId }, index.h("slot", { key: '8a0e9e782232088a62efa78881f6f165e2d01d4e' })))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleEscape(event) {
        if (this.open && !this.escapeDisabled && event.key === "Escape" && !event.defaultPrevented) {
            this.open = false;
            event.preventDefault();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Sets focus on the component's "close" button - the first focusable item.
     *
     */
    async setFocus() {
        await loadable.componentFocusable(this);
        dom.focusFirstTabbable(this.el);
    }
    /**
     * Updates the element(s) that are used within the focus-trap of the component.
     */
    async updateFocusTrapElements() {
        focusTrapComponent.updateFocusTrapElements(this);
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    onBeforeOpen() {
        this.calciteSheetBeforeOpen.emit();
    }
    onOpen() {
        this.calciteSheetOpen.emit();
        focusTrapComponent.activateFocusTrap(this);
    }
    onBeforeClose() {
        this.calciteSheetBeforeClose.emit();
    }
    onClose() {
        this.calciteSheetClose.emit();
        focusTrapComponent.deactivateFocusTrap(this);
    }
    openSheet() {
        this.el.addEventListener("calciteSheetOpen", this.openEnd);
        this.opened = true;
        if (!this.embedded) {
            this.initialOverflowCSS = document.documentElement.style.overflow;
            // use an inline style instead of a utility class to avoid global class declarations.
            document.documentElement.style.setProperty("overflow", "hidden");
        }
    }
    removeOverflowHiddenClass() {
        document.documentElement.style.setProperty("overflow", this.initialOverflowCSS);
    }
    handleMutationObserver() {
        this.updateFocusTrapElements();
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "focusTrapDisabled": ["handleFocusTrapDisabled"],
        "open": ["toggleSheet"],
        "opened": ["handleOpenedChange"]
    }; }
};
Sheet.style = CalciteSheetStyle0;

exports.calcite_sheet = Sheet;
