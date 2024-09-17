/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-b793d9aa.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-60e775f3.js';
import { g as getSlotted, s as slotChangeHasAssignedElement, f as focusFirstTabbable, v as ensureId } from './dom-b5c50286.js';
import { d as deactivateFocusTrap, a as activateFocusTrap, c as connectFocusTrap, u as updateFocusTrapElements } from './focusTrapComponent-6ec0f681.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable-73f289b6.js';
import { c as createObserver } from './observers-e2484555.js';
import { o as onToggleOpenCloseComponent } from './openCloseComponent-7b8f2e24.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale-21e40b0c.js';
import { s as setUpMessages, c as connectMessages, d as disconnectMessages, u as updateMessages } from './t9n-2fb3af62.js';
import { g as getIconScale, c as componentOnReady } from './component-c2c32481.js';
import { l as logger } from './logger-0d6e5bfe.js';
import './guid-4c746a7f.js';
import './resources-defbb49f.js';
import './config-2fa7bb77.js';
import './browser-552eb2d0.js';
import './key-58898f0a.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    modal: "modal",
    title: "title",
    header: "header",
    footer: "footer",
    scrim: "scrim",
    back: "back",
    close: "close",
    secondary: "secondary",
    primary: "primary",
    container: "container",
    containerOpen: "container--open",
    containerEmbedded: "container--embedded",
    content: "content",
    contentNoFooter: "content--no-footer",
    contentBottom: "content-bottom",
    contentTop: "content-top",
    // these classes help apply the animation in phases to only set transform on open/close
    // this helps avoid a positioning issue for any floating-ui-owning children
    openingIdle: "modal--opening-idle",
    openingActive: "modal--opening-active",
    closingIdle: "modal--closing-idle",
    closingActive: "modal--closing-active",
};
const ICONS = {
    close: "x",
};
const SLOTS = {
    content: "content",
    contentBottom: "content-bottom",
    contentTop: "content-top",
    header: "header",
    back: "back",
    secondary: "secondary",
    primary: "primary",
};

const modalCss = ":host{--calcite-modal-scrim-background:rgba(0, 0, 0, 0.85);position:absolute;inset:0px;z-index:var(--calcite-z-index-overlay);display:flex;opacity:0;visibility:hidden !important;transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow), opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88);--calcite-modal-scrim-background-internal:rgba(0, 0, 0, 0.85)}.content-top[hidden],.content-bottom[hidden]{display:none}.container{position:fixed;inset:0px;z-index:var(--calcite-z-index-overlay);display:flex;align-items:center;justify-content:center;overflow-y:hidden;color:var(--calcite-color-text-2);opacity:0;visibility:hidden !important;transition:visibility 0ms linear var(--calcite-internal-animation-timing-slow), opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88)}:host([scale=s]){--calcite-modal-padding-internal:0.75rem;--calcite-modal-padding-large-internal:1rem;--calcite-modal-title-text-internal:var(--calcite-font-size-1);--calcite-modal-content-text-internal:var(--calcite-font-size--1)}:host([scale=m]){--calcite-modal-padding-internal:1rem;--calcite-modal-padding-large-internal:1.25rem;--calcite-modal-title-text-internal:var(--calcite-font-size-2);--calcite-modal-content-text-internal:var(--calcite-font-size-0)}:host([scale=l]){--calcite-modal-padding-internal:1.25rem;--calcite-modal-padding-large-internal:1.5rem;--calcite-modal-title-text-internal:var(--calcite-font-size-3);--calcite-modal-content-text-internal:var(--calcite-font-size-1)}.scrim{--calcite-scrim-background:var(--calcite-modal-scrim-background, var(--calcite-color-transparent-scrim));position:fixed;inset:0px;display:flex;overflow-y:hidden}.modal{pointer-events:none;z-index:var(--calcite-z-index-modal);float:none;margin:1.5rem;box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;overflow:hidden;border-radius:0.25rem;background-color:var(--calcite-color-foreground-1);opacity:0;--tw-shadow:0 2px 12px -4px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.16);--tw-shadow-colored:0 2px 12px -4px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);-webkit-overflow-scrolling:touch;visibility:hidden;transition:transform var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear var(--calcite-internal-animation-timing-slow), opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88);--calcite-modal-hidden-position:translate3d(0, 20px, 0);--calcite-modal-shown-position:translate3d(0, 0, 0)}.modal--opening-idle{transform:var(--calcite-modal-hidden-position)}.modal--opening-active{transform:var(--calcite-modal-shown-position)}.modal--closing-idle{transform:var(--calcite-modal-shown-position)}.modal--closing-active{transform:var(--calcite-modal-hidden-position)}:host([opened]){opacity:1;visibility:visible !important;transition-delay:0ms}.container--open{opacity:1;visibility:visible !important;transition-delay:0ms}.container--open .modal{pointer-events:auto;visibility:visible;opacity:1;transition:transform var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), visibility 0ms linear, opacity var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), max-inline-size var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88), max-block-size var(--calcite-internal-animation-timing-slow) cubic-bezier(0.215, 0.44, 0.42, 0.88);transition-delay:0ms}.header{z-index:var(--calcite-z-index-header);display:flex;min-inline-size:0px;max-inline-size:100%;border-start-start-radius:0.25rem;border-start-end-radius:0.25rem;border-width:0px;border-block-end-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1);flex:0 0 auto}.close{order:2;margin:0px;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-style:none;background-color:transparent;color:var(--calcite-color-text-3);outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;padding-block:var(--calcite-modal-padding-internal);padding-inline:var(--calcite-modal-padding-internal);flex:0 0 auto}.close calcite-icon{pointer-events:none;vertical-align:-2px}.close:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.close:hover,.close:focus,.close:active{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1)}.title{order:1;display:flex;min-inline-size:0px;align-items:center;flex:1 1 auto;padding-block:var(--calcite-modal-padding-internal);padding-inline:var(--calcite-modal-padding-large-internal)}slot[name=header]::slotted(*),*::slotted([slot=header]){margin:0px;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-1);font-size:var(--calcite-modal-title-text-internal)}.content{position:relative;box-sizing:border-box;display:block;block-size:100%;overflow:auto;padding:0px;background-color:var(--calcite-modal-content-background, var(--calcite-color-foreground-1));max-block-size:100%;padding:var(--calcite-modal-content-padding, var(--calcite-modal-padding-internal))}.content-top,.content-bottom{z-index:var(--calcite-z-index-header);display:flex;border-width:0px;border-style:solid;border-color:var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1);flex:0 0 auto;padding:var(--calcite-modal-padding-internal)}.content-top{min-inline-size:0px;max-inline-size:100%;border-block-end-width:1px}.content-bottom{margin-block-start:auto;box-sizing:border-box;inline-size:100%;justify-content:space-between;border-block-start-width:1px}.content-top:not(.header~.content-top){border-start-start-radius:0.25rem;border-start-end-radius:0.25rem}.content-bottom:not(.content-bottom~.footer),.content--no-footer{border-end-end-radius:0.25rem;border-end-start-radius:0.25rem}slot[name=content]::slotted(*),*::slotted([slot=content]){font-size:var(--calcite-modal-context-text-internal)}.footer{z-index:var(--calcite-z-index-header);margin-block-start:auto;box-sizing:border-box;display:flex;inline-size:100%;justify-content:space-between;border-end-end-radius:0.25rem;border-end-start-radius:0.25rem;border-width:0px;border-block-start-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);background-color:var(--calcite-color-foreground-1);flex:0 0 auto;padding-block:var(--calcite-modal-padding-internal);padding-inline:var(--calcite-modal-padding-large-internal)}.footer--hide-back .back,.footer--hide-secondary .secondary{display:none}.back{display:block;margin-inline-end:auto}.secondary{margin-inline:0.25rem;display:block}slot[name=primary]{display:block}:host([width=small]) .modal{inline-size:auto}:host([width-scale=s]) .modal{max-block-size:100%;max-inline-size:100%;inline-size:var(--calcite-modal-width, 32rem);block-size:var(--calcite-modal-height, auto)}@media screen and (max-width: 35rem){:host([width-scale=s]) .modal{margin:0px;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%}:host([width-scale=s]) .content{flex:1 1 auto;max-block-size:unset}:host([width-scale=s][docked]) .container{align-items:flex-end}}:host([width-scale=m]) .modal{max-block-size:100%;max-inline-size:100%;inline-size:var(--calcite-modal-width, 48rem);block-size:var(--calcite-modal-height, auto)}@media screen and (max-width: 51rem){:host([width-scale=m]) .modal{margin:0px;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%}:host([width-scale=m]) .content{flex:1 1 auto;max-block-size:unset}:host([width-scale=m][docked]) .container{align-items:flex-end}}:host([width-scale=l]) .modal{max-block-size:100%;max-inline-size:100%;inline-size:var(--calcite-modal-width, 94rem);block-size:var(--calcite-modal-height, auto)}@media screen and (max-width: 97rem){:host([width-scale=l]) .modal{margin:0px;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%}:host([width-scale=l]) .content{flex:1 1 auto;max-block-size:unset}:host([width-scale=l][docked]) .container{align-items:flex-end}}:host([fullscreen]) .modal{margin:0px;block-size:100%;max-block-size:100%;inline-size:100%;max-inline-size:100%;border-radius:0px;--calcite-modal-hidden-position:translate3D(0, 20px, 0) scale(0.95);--calcite-modal-shown-position:translate3D(0, 0, 0) scale(1)}:host([fullscreen]) .content{max-block-size:100%;flex:1 1 auto}:host([opened][fullscreen]) .header,:host([opened][fullscreen]) .footer,:host([opened][fullscreen]) .content-top,:host([opened][fullscreen]) .content-bottom{border-radius:0}:host([docked]) .modal{block-size:var(--calcite-modal-height, auto)}:host([docked]) .content{block-size:auto;flex:1 1 auto}:host([kind=brand]) .modal{border-color:var(--calcite-color-brand)}:host([kind=danger]) .modal{border-color:var(--calcite-color-status-danger)}:host([kind=info]) .modal{border-color:var(--calcite-color-status-info)}:host([kind=success]) .modal{border-color:var(--calcite-color-status-success)}:host([kind=warning]) .modal{border-color:var(--calcite-color-status-warning)}:host([kind=brand]) .modal,:host([kind=danger]) .modal,:host([kind=info]) .modal,:host([kind=success]) .modal,:host([kind=warning]) .modal{border-width:0px;border-block-start-width:4px;border-style:solid}:host([kind=brand]) .header,:host([kind=brand]) .content-top,:host([kind=danger]) .header,:host([kind=danger]) .content-top,:host([kind=info]) .header,:host([kind=info]) .content-top,:host([kind=success]) .header,:host([kind=success]) .content-top,:host([kind=warning]) .header,:host([kind=warning]) .content-top{border-radius:0.25rem;border-end-end-radius:0px;border-end-start-radius:0px}@media screen and (max-width: 860px){* slot[name=header]::slotted(content-top),* content-top::slotted([slot=header]){font-size:var(--calcite-font-size-1)}.footer,.content-bottom{position:sticky;inset-block-end:0px}}@media screen and (max-width: 480px){.footer,.content-bottom{flex-direction:column}.back,.secondary{margin:0px;margin-block-end:0.25rem}}.container--embedded{position:absolute;pointer-events:auto}.container--embedded calcite-scrim{position:absolute}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteModalStyle0 = modalCss;

let totalOpenModals = 0;
let initialDocumentOverflowStyle = "";
/**
 * @deprecated Use the `calcite-dialog` component instead.
 * @slot header - A slot for adding header text.
 * @slot content - A slot for adding the component's content.
 * @slot content-top - A slot for adding content to the component's sticky header, where content remains at the top of the component when scrolling up and down.
 * @slot content-bottom - A slot for adding content to the component's sticky footer, where content remains at the bottom of the component when scrolling up and down.
 * @slot primary - A slot for adding a primary button.
 * @slot secondary - A slot for adding a secondary button.
 * @slot back - A slot for adding a back button.
 */
logger.deprecated("component", {
    name: "modal",
    removalVersion: 4,
    suggested: "dialog",
});
const Modal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteModalBeforeClose = createEvent(this, "calciteModalBeforeClose", 6);
        this.calciteModalClose = createEvent(this, "calciteModalClose", 6);
        this.calciteModalBeforeOpen = createEvent(this, "calciteModalBeforeOpen", 6);
        this.calciteModalOpen = createEvent(this, "calciteModalOpen", 6);
        //--------------------------------------------------------------------------
        //
        //  Private Properties/ State
        //
        //--------------------------------------------------------------------------
        this.ignoreOpenChange = false;
        this.mutationObserver = createObserver("mutation", () => this.handleMutationObserver());
        this.cssVarObserver = createObserver("mutation", () => {
            this.updateSizeCssVars();
        });
        this.openTransitionProp = "opacity";
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.setTransitionEl = (el) => {
            this.transitionEl = el;
        };
        this.openEnd = () => {
            this.setFocus();
            this.el.removeEventListener("calciteModalOpen", this.openEnd);
        };
        this.handleCloseClick = () => {
            this.open = false;
        };
        this.handleOutsideClose = () => {
            if (this.outsideCloseDisabled) {
                return;
            }
            this.open = false;
        };
        this.closeModal = async () => {
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
            totalOpenModals--;
            this.opened = false;
            this.removeOverflowHiddenClass();
        };
        this.handleMutationObserver = () => {
            this.updateFooterVisibility();
            this.updateFocusTrapElements();
        };
        this.updateFooterVisibility = () => {
            this.hasFooter = !!getSlotted(this.el, [SLOTS.back, SLOTS.primary, SLOTS.secondary]);
        };
        this.updateSizeCssVars = () => {
            this.cssWidth = getComputedStyle(this.el).getPropertyValue("--calcite-modal-width");
            this.cssHeight = getComputedStyle(this.el).getPropertyValue("--calcite-modal-height");
        };
        this.contentTopSlotChangeHandler = (event) => {
            this.hasContentTop = slotChangeHasAssignedElement(event);
        };
        this.contentBottomSlotChangeHandler = (event) => {
            this.hasContentBottom = slotChangeHasAssignedElement(event);
        };
        this.open = false;
        this.opened = false;
        this.beforeClose = undefined;
        this.closeButtonDisabled = false;
        this.focusTrapDisabled = false;
        this.outsideCloseDisabled = false;
        this.docked = undefined;
        this.embedded = false;
        this.escapeDisabled = false;
        this.scale = "m";
        this.widthScale = "m";
        this.fullscreen = undefined;
        this.kind = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.cssWidth = undefined;
        this.cssHeight = undefined;
        this.hasFooter = true;
        this.hasContentTop = false;
        this.hasContentBottom = false;
        this.effectiveLocale = undefined;
        this.defaultMessages = undefined;
    }
    handleFocusTrapDisabled(focusTrapDisabled) {
        if (!this.open) {
            return;
        }
        focusTrapDisabled ? deactivateFocusTrap(this) : activateFocusTrap(this);
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    async componentWillLoad() {
        await setUpMessages(this);
        setUpLoadableComponent(this);
        // when modal initially renders, if active was set we need to open as watcher doesn't fire
        if (this.open) {
            this.openModal();
        }
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    connectedCallback() {
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
        this.cssVarObserver?.observe(this.el, { attributeFilter: ["style"] });
        this.updateSizeCssVars();
        this.updateFooterVisibility();
        connectConditionalSlotComponent(this);
        connectLocalized(this);
        connectMessages(this);
        connectFocusTrap(this);
    }
    disconnectedCallback() {
        this.removeOverflowHiddenClass();
        this.mutationObserver?.disconnect();
        this.cssVarObserver?.disconnect();
        disconnectConditionalSlotComponent(this);
        deactivateFocusTrap(this);
        disconnectLocalized(this);
        disconnectMessages(this);
        this.embedded = false;
    }
    render() {
        return (h(Host, { key: '6b1abce9182df0c80157f4f798b358f06d31fdc1', "aria-describedby": this.contentId, "aria-labelledby": this.titleId, "aria-modal": "true", role: "dialog" }, h("div", { key: '59d9ef441e5e197d7db2111792e25e0289ace99c', class: {
                [CSS.container]: true,
                [CSS.containerOpen]: this.opened,
                [CSS.containerEmbedded]: this.embedded,
            } }, h("calcite-scrim", { key: '2cf489713f2081385f7fee5565e3233581035742', class: CSS.scrim, onClick: this.handleOutsideClose }), this.renderStyle(), h("div", { key: 'ca86b8febb8762415ca063efd03071dc3d44736b', class: {
                [CSS.modal]: true,
            }, ref: this.setTransitionEl }, h("div", { key: 'e3063610d77f9d9c40da02ec994a5bf23ae01643', class: CSS.header }, this.renderCloseButton(), h("header", { key: '0194a0c4cb6209898df8e80f3943321578d4b375', class: CSS.title }, h("slot", { key: 'e93887817a45273cc103b216bed848f339454e35', name: CSS.header }))), this.renderContentTop(), h("div", { key: 'afe9b18883ed572c37568cc2224747055f7ad0a5', class: {
                [CSS.content]: true,
                [CSS.contentNoFooter]: !this.hasFooter,
            }, ref: (el) => (this.modalContent = el) }, h("slot", { key: 'deb96aba4ac030e7fbbdad1115e1a801f1545917', name: SLOTS.content })), this.renderContentBottom(), this.renderFooter()))));
    }
    renderFooter() {
        return this.hasFooter ? (h("div", { class: CSS.footer, key: "footer" }, h("span", { class: CSS.back }, h("slot", { name: SLOTS.back })), h("span", { class: CSS.secondary }, h("slot", { name: SLOTS.secondary })), h("span", { class: CSS.primary }, h("slot", { name: SLOTS.primary })))) : null;
    }
    renderContentTop() {
        return (h("div", { class: CSS.contentTop, hidden: !this.hasContentTop }, h("slot", { name: SLOTS.contentTop, onSlotchange: this.contentTopSlotChangeHandler })));
    }
    renderContentBottom() {
        return (h("div", { class: CSS.contentBottom, hidden: !this.hasContentBottom }, h("slot", { name: SLOTS.contentBottom, onSlotchange: this.contentBottomSlotChangeHandler })));
    }
    renderCloseButton() {
        return !this.closeButtonDisabled ? (h("button", { "aria-label": this.messages.close, class: CSS.close, key: "button", onClick: this.handleCloseClick, ref: (el) => (this.closeButtonEl = el), title: this.messages.close }, h("calcite-icon", { icon: ICONS.close, scale: getIconScale(this.scale) }))) : null;
    }
    renderStyle() {
        if (!this.fullscreen && (this.cssWidth || this.cssHeight)) {
            return (h("style", null, `.${CSS.container} {
              ${this.docked && this.cssWidth ? `align-items: center !important;` : ""}
            }
            .${CSS.modal} {
              block-size: ${this.cssHeight ? this.cssHeight : "auto"} !important;
              ${this.cssWidth ? `inline-size: ${this.cssWidth} !important;` : ""}
              ${this.cssWidth ? `max-inline-size: ${this.cssWidth} !important;` : ""}
              ${this.docked ? `border-radius: var(--calcite-border-radius) !important;` : ""}
            }
            @media screen and (max-width: ${this.cssWidth}) {
              .${CSS.container} {
                ${this.docked ? `align-items: flex-end !important;` : ""}
              }
              .${CSS.modal} {
                max-block-size: 100% !important;
                inline-size: 100% !important;
                max-inline-size: 100% !important;
                min-inline-size: 100% !important;
                margin: 0 !important;
                ${!this.docked ? `block-size: 100% !important;` : ""}
                ${!this.docked ? `border-radius: 0 !important;` : ""}
                ${this.docked
                ? `border-radius: var(--calcite-border-radius) var(--calcite-border-radius) 0 0 !important;`
                : ""}
              }
            }
          `));
        }
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
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
     * Sets focus on the component's "close" button (the first focusable item).
     *
     */
    async setFocus() {
        await componentFocusable(this);
        focusFirstTabbable(this.el);
    }
    /**
     * Updates the element(s) that are used within the focus-trap of the component.
     */
    async updateFocusTrapElements() {
        updateFocusTrapElements(this);
    }
    /**
     * Sets the scroll top of the component's content.
     *
     * @param top
     * @param left
     */
    async scrollContent(top = 0, left = 0) {
        if (this.modalContent) {
            if (this.modalContent.scrollTo) {
                this.modalContent.scrollTo({ top, left, behavior: "smooth" });
            }
            else {
                this.modalContent.scrollTop = top;
                this.modalContent.scrollLeft = left;
            }
        }
    }
    onBeforeOpen() {
        this.transitionEl.classList.add(CSS.openingActive);
        this.calciteModalBeforeOpen.emit();
    }
    onOpen() {
        this.transitionEl.classList.remove(CSS.openingIdle, CSS.openingActive);
        this.calciteModalOpen.emit();
        activateFocusTrap(this);
    }
    onBeforeClose() {
        this.transitionEl.classList.add(CSS.closingActive);
        this.calciteModalBeforeClose.emit();
    }
    onClose() {
        this.transitionEl.classList.remove(CSS.closingIdle, CSS.closingActive);
        this.calciteModalClose.emit();
        deactivateFocusTrap(this);
    }
    toggleModal(value) {
        if (this.ignoreOpenChange) {
            return;
        }
        if (value) {
            this.openModal();
        }
        else {
            this.closeModal();
        }
    }
    handleOpenedChange(value) {
        const idleClass = value ? CSS.openingIdle : CSS.closingIdle;
        this.transitionEl.classList.add(idleClass);
        onToggleOpenCloseComponent(this);
    }
    async openModal() {
        await componentOnReady(this.el);
        this.el.addEventListener("calciteModalOpen", this.openEnd);
        this.opened = true;
        const titleEl = getSlotted(this.el, SLOTS.header);
        const contentEl = getSlotted(this.el, SLOTS.content);
        this.titleId = ensureId(titleEl);
        this.contentId = ensureId(contentEl);
        if (!this.embedded) {
            if (totalOpenModals === 0) {
                initialDocumentOverflowStyle = document.documentElement.style.overflow;
            }
            totalOpenModals++;
            // use an inline style instead of a utility class to avoid global class declarations.
            document.documentElement.style.setProperty("overflow", "hidden");
        }
    }
    removeOverflowHiddenClass() {
        document.documentElement.style.setProperty("overflow", initialDocumentOverflowStyle);
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "focusTrapDisabled": ["handleFocusTrapDisabled"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"],
        "open": ["toggleModal"],
        "opened": ["handleOpenedChange"]
    }; }
};
Modal.style = CalciteModalStyle0;

export { Modal as calcite_modal };
