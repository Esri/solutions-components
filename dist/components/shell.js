/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Fragment } from '@stencil/core/internal/client';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot.js';
import { j as slotChangeHasAssignedElement, h as slotChangeGetAssignedElements } from './dom.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    main: "main",
    content: "content",
    contentBehind: "content--behind",
    contentBottom: "content-bottom",
    contentNonInteractive: "content--non-interactive",
    footer: "footer",
    positionedSlotWrapper: "positioned-slot-wrapper",
    container: "container",
    contentBehindCenterContent: "center-content",
};
const SLOTS = {
    centerRow: "center-row",
    panelStart: "panel-start",
    panelEnd: "panel-end",
    panelTop: "panel-top",
    panelBottom: "panel-bottom",
    header: "header",
    footer: "footer",
    alerts: "alerts",
    sheets: "sheets",
    modals: "modals",
    dialogs: "dialogs",
};

const shellCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{position:absolute;inset:0px;display:flex;block-size:100%;inline-size:100%;flex-direction:column;overflow:hidden;--calcite-shell-tip-spacing:26vw}.main{position:relative;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;flex-direction:row;justify-content:space-between;overflow:hidden}.content{display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap;overflow:auto;justify-content:space-between}.content ::slotted(:not(calcite-tip-manager)){position:relative;z-index:var(--calcite-z-index)}.content ::slotted(calcite-shell-center-row),.content ::slotted(calcite-panel),.content ::slotted(calcite-flow){flex:1 1 auto;align-self:stretch;max-block-size:unset}.content--behind{position:absolute;inset:0px;border-width:0px;z-index:calc(var(--calcite-z-index) - 1);display:initial}.content--non-interactive{pointer-events:none;display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap}::slotted(calcite-shell-center-row){inline-size:unset}::slotted(.header .heading){font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-normal)}slot[name=panel-start]::slotted(calcite-shell-panel),slot[name=panel-end]::slotted(calcite-shell-panel){position:relative;z-index:var(--calcite-z-index-header)}slot[name=panel-end]::slotted(calcite-shell-panel){margin-inline-start:auto}::slotted(calcite-panel),::slotted(calcite-flow){border-width:1px;border-inline-start-width:0px;border-inline-end-width:0px;border-style:solid;border-color:var(--calcite-color-border-3)}slot[name=center-row]::slotted(calcite-shell-center-row:not([detached])),slot[name=panel-top]::slotted(calcite-shell-center-row:not([detached])),slot[name=panel-bottom]::slotted(calcite-shell-center-row:not([detached])){border-inline-start-width:1px;border-inline-end-width:1px;border-color:var(--calcite-color-border-3)}.center-content{display:flex;flex-direction:column;justify-content:space-between;block-size:100%;inline-size:100%;min-inline-size:0}.content-bottom{justify-content:flex-end}::slotted(calcite-shell-center-row){flex:none;align-self:stretch}::slotted(calcite-tip-manager){position:absolute;z-index:var(--calcite-z-index-toast);box-sizing:border-box}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}::slotted(calcite-tip-manager){animation:in-up var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:0.25rem;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);inset-block-end:0.5rem;inset-inline:var(--calcite-shell-tip-spacing)}slot[name=center-row]::slotted(calcite-shell-center-row),slot[name=panel-bottom]::slotted(calcite-shell-center-row){margin-block-start:auto}slot[name=panel-top]::slotted(calcite-shell-center-row){margin-block-end:auto}.position-wrapper{position:absolute;pointer-events:none;inset:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteShellStyle0 = shellCss;

const Shell = /*@__PURE__*/ proxyCustomElement(class Shell extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleHeaderSlotChange = (event) => {
            this.hasHeader = !!slotChangeHasAssignedElement(event);
        };
        this.handleFooterSlotChange = (event) => {
            this.hasFooter = !!slotChangeHasAssignedElement(event);
        };
        this.handleAlertsSlotChange = (event) => {
            this.hasAlerts = !!slotChangeHasAssignedElement(event);
            slotChangeGetAssignedElements(event)?.map((el) => {
                if (el.tagName === "CALCITE-ALERT") {
                    el.embedded = true;
                }
            });
        };
        this.handleSheetsSlotChange = (event) => {
            this.hasSheets = !!slotChangeHasAssignedElement(event);
            slotChangeGetAssignedElements(event)?.map((el) => {
                if (el.tagName === "CALCITE-SHEET") {
                    el.embedded = true;
                }
            });
        };
        this.handleModalsSlotChange = (event) => {
            this.hasModals = !!slotChangeHasAssignedElement(event);
            slotChangeGetAssignedElements(event)?.map((el) => {
                if (el.tagName === "CALCITE-MODAL") {
                    el.embedded = true;
                }
            });
        };
        this.handlePanelTopChange = (event) => {
            this.hasPanelTop = slotChangeHasAssignedElement(event);
        };
        this.handlePanelBottomChange = (event) => {
            this.hasPanelBottom = slotChangeHasAssignedElement(event);
        };
        this.handleDialogsSlotChange = (event) => {
            this.hasDialogs = !!slotChangeHasAssignedElement(event);
            slotChangeGetAssignedElements(event)?.map((el) => {
                if (el.tagName === "CALCITE-DIALOG") {
                    el.embedded = true;
                }
            });
        };
        this.contentBehind = false;
        this.hasHeader = false;
        this.hasFooter = false;
        this.hasAlerts = false;
        this.hasModals = false;
        this.hasDialogs = false;
        this.hasSheets = false;
        this.hasPanelTop = false;
        this.hasPanelBottom = false;
        this.hasOnlyPanelBottom = false;
        this.panelIsResizing = false;
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    handleCalciteInternalShellPanelResizeStart(event) {
        this.panelIsResizing = true;
        event.stopPropagation();
    }
    handleCalciteInternalShellPanelResizeEnd(event) {
        this.panelIsResizing = false;
        event.stopPropagation();
    }
    updateHasOnlyPanelBottom() {
        this.hasOnlyPanelBottom = !this.hasPanelTop && this.hasPanelBottom;
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectConditionalSlotComponent(this);
    }
    disconnectedCallback() {
        disconnectConditionalSlotComponent(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderHeader() {
        return (h("div", { hidden: !this.hasHeader }, h("slot", { key: "header", name: SLOTS.header, onSlotchange: this.handleHeaderSlotChange })));
    }
    renderFooter() {
        return (h("div", { class: CSS.footer, hidden: !this.hasFooter, key: "footer" }, h("slot", { name: SLOTS.footer, onSlotchange: this.handleFooterSlotChange })));
    }
    renderAlerts() {
        return (h("div", { hidden: !this.hasAlerts }, h("slot", { key: "alerts", name: SLOTS.alerts, onSlotchange: this.handleAlertsSlotChange })));
    }
    renderSheets() {
        return (h("div", { hidden: !this.hasSheets }, h("slot", { key: "sheets", name: SLOTS.sheets, onSlotchange: this.handleSheetsSlotChange })));
    }
    renderModals() {
        return (h("div", { hidden: !this.hasModals }, h("slot", { key: "modals", name: SLOTS.modals, onSlotchange: this.handleModalsSlotChange })));
    }
    renderDialogs() {
        return (h("div", { hidden: !this.hasDialogs }, h("slot", { key: "dialogs", name: SLOTS.dialogs, onSlotchange: this.handleDialogsSlotChange })));
    }
    renderContent() {
        const { panelIsResizing } = this;
        const defaultSlotNode = h("slot", { key: "default-slot" });
        const defaultSlotContainerNode = panelIsResizing ? (h("div", { class: CSS.contentNonInteractive }, defaultSlotNode)) : (defaultSlotNode);
        const deprecatedCenterRowSlotNode = (h("slot", { key: "center-row-slot", name: SLOTS.centerRow }));
        const panelBottomSlotNode = (h("slot", { key: "panel-bottom-slot", name: SLOTS.panelBottom, onSlotchange: this.handlePanelBottomChange }));
        const panelTopSlotNode = (h("slot", { key: "panel-top-slot", name: SLOTS.panelTop, onSlotchange: this.handlePanelTopChange }));
        const contentContainerKey = "content-container";
        const content = this.contentBehind
            ? [
                h("div", { class: {
                        [CSS.content]: true,
                        [CSS.contentBehind]: true,
                    }, key: contentContainerKey }, defaultSlotContainerNode),
                h("div", { class: {
                        [CSS.contentBehindCenterContent]: true,
                        [CSS.contentBottom]: this.hasOnlyPanelBottom,
                    } }, panelTopSlotNode, panelBottomSlotNode, deprecatedCenterRowSlotNode),
            ]
            : [
                h("div", { class: { [CSS.content]: true, [CSS.contentBottom]: this.hasOnlyPanelBottom }, key: contentContainerKey }, panelTopSlotNode, defaultSlotContainerNode, panelBottomSlotNode, deprecatedCenterRowSlotNode),
            ];
        return content;
    }
    renderMain() {
        return (h("div", { class: CSS.main }, h("slot", { name: SLOTS.panelStart }), this.renderContent(), h("slot", { name: SLOTS.panelEnd })));
    }
    renderPositionedSlots() {
        return (h("div", { class: CSS.positionedSlotWrapper }, this.renderAlerts(), this.renderModals(), this.renderDialogs(), this.renderSheets()));
    }
    render() {
        return (h(Fragment, { key: 'd5aba67d8b89161985cdf81c74b8532a522b3fda' }, this.renderHeader(), this.renderMain(), this.renderFooter(), this.renderPositionedSlots()));
    }
    get el() { return this; }
    static get watchers() { return {
        "hasPanelTop": ["updateHasOnlyPanelBottom"],
        "hasPanelBottom": ["updateHasOnlyPanelBottom"]
    }; }
    static get style() { return CalciteShellStyle0; }
}, [1, "calcite-shell", {
        "contentBehind": [516, "content-behind"],
        "hasHeader": [32],
        "hasFooter": [32],
        "hasAlerts": [32],
        "hasModals": [32],
        "hasDialogs": [32],
        "hasSheets": [32],
        "hasPanelTop": [32],
        "hasPanelBottom": [32],
        "hasOnlyPanelBottom": [32],
        "panelIsResizing": [32]
    }, [[0, "calciteInternalShellPanelResizeStart", "handleCalciteInternalShellPanelResizeStart"], [0, "calciteInternalShellPanelResizeEnd", "handleCalciteInternalShellPanelResizeEnd"]], {
        "hasPanelTop": ["updateHasOnlyPanelBottom"],
        "hasPanelBottom": ["updateHasOnlyPanelBottom"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-shell"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-shell":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Shell);
            }
            break;
    } });
}
defineCustomElement();

export { Shell as S, defineCustomElement as d };
