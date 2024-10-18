/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, F as Fragment, g as getElement, c as createEvent, H as Host } from './index-904bc599.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-8a0b08ef.js';
import { s as slotChangeHasAssignedElement, e as slotChangeGetAssignedElements } from './dom-75c641a7.js';
import { g as getLocaleComponentStrings } from './locale-0d06fca0.js';
import './observers-c83631e8.js';
import './browser-b67d8df6.js';
import './guid-b0fb1de3.js';
import './resources-8e2ed936.js';
import './esri-loader-c6842c6b.js';
import './_commonjsHelpers-089957fe.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
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

const shellCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{position:absolute;inset:0px;display:flex;block-size:100%;inline-size:100%;flex-direction:column;overflow:hidden;--calcite-shell-tip-spacing:26vw}.main{position:relative;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;flex-direction:row;justify-content:space-between;overflow:hidden}.content{display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap;overflow:auto;justify-content:space-between}.content ::slotted(calcite-shell-center-row),.content ::slotted(calcite-panel),.content ::slotted(calcite-flow){flex:1 1 auto;align-self:stretch;max-block-size:unset}.content--behind{position:absolute;inset:0px;border-width:0px;z-index:calc(var(--calcite-z-index) - 1);display:initial}.content--non-interactive{pointer-events:none;display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap}::slotted(calcite-shell-center-row){inline-size:unset}::slotted(.header .heading){font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-normal)}slot[name=panel-start]::slotted(calcite-shell-panel),slot[name=panel-end]::slotted(calcite-shell-panel){position:relative;z-index:calc(var(--calcite-z-index) + 1)}slot[name=panel-end]::slotted(calcite-shell-panel){margin-inline-start:auto}::slotted(calcite-panel),::slotted(calcite-flow){border-width:1px;border-inline-start-width:0px;border-inline-end-width:0px;border-style:solid;border-color:var(--calcite-color-border-3)}slot[name=center-row]::slotted(calcite-shell-center-row:not([detached])),slot[name=panel-top]::slotted(calcite-shell-center-row:not([detached])),slot[name=panel-bottom]::slotted(calcite-shell-center-row:not([detached])){border-inline-start-width:1px;border-inline-end-width:1px;border-color:var(--calcite-color-border-3)}.center-content{display:flex;flex-direction:column;justify-content:space-between;block-size:100%;inline-size:100%;min-inline-size:0}.content-bottom{justify-content:flex-end}::slotted(calcite-shell-center-row){flex:none;align-self:stretch}::slotted(calcite-tip-manager){position:absolute;z-index:var(--calcite-z-index-toast);box-sizing:border-box}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}::slotted(calcite-tip-manager){animation:in-up var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:0.25rem;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);inset-block-end:0.5rem;inset-inline:var(--calcite-shell-tip-spacing)}slot[name=center-row]::slotted(calcite-shell-center-row),slot[name=panel-bottom]::slotted(calcite-shell-center-row){margin-block-start:auto}slot[name=panel-top]::slotted(calcite-shell-center-row){margin-block-end:auto}.position-wrapper{position:absolute;pointer-events:none;inset:0}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteShellStyle0 = shellCss;

const Shell = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        return (h(Fragment, { key: '6864b8b95b6edd871ad622b0d49a3f4a42a0a8a8' }, this.renderHeader(), this.renderMain(), this.renderFooter(), this.renderPositionedSlots()));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "hasPanelTop": ["updateHasOnlyPanelBottom"],
        "hasPanelBottom": ["updateHasOnlyPanelBottom"]
    }; }
};
Shell.style = CalciteShellStyle0;

const deleteButtonCss = ":host{display:block}.delete-modal{position:fixed}";
const DeleteButtonStyle0 = deleteButtonCss;

const DeleteButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.editsComplete = createEvent(this, "editsComplete", 7);
        this.deleteDialog = undefined;
        this.buttonType = "button";
        this.disabled = false;
        this.icon = undefined;
        this.ids = [];
        this.layer = undefined;
        this._confirmDelete = false;
        this._deleteEndabled = false;
        this._supportsDelete = undefined;
        this._translations = undefined;
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * watch for changes in layer view and verify if it has editing enabled
     */
    async idsWatchHandler() {
        this._setDeleteEnabled();
    }
    /**
     * watch for changes in layer view and verify if it has editing enabled
     */
    async layerWatchHandler() {
        this._setDeleteEnabled();
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when features have been deleted
     */
    editsComplete;
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '4ced17b35479900aaa01ebbd298eeae57194e358' }, this.buttonType === "button" ? (h("calcite-button", { appearance: "outline", disabled: !this._deleteEndabled, id: "solutions-delete", kind: "danger", onClick: () => this._delete(), width: "full" }, this._translations.deleteCount.replace("{{n}}", this.ids.length.toString()))) : (h("calcite-action", { appearance: "solid", compact: true, disabled: !this._deleteEndabled, id: this.icon, onClick: () => this._delete(), scale: "s", text: this._translations.delete }, h("calcite-button", { appearance: "transparent", iconStart: this.icon, kind: "danger" }, this._translations.delete))), this._deleteMessage(), h("calcite-tooltip", { key: '04f82e726cf9142c403ee43cb8151027bb7b617f', placement: "bottom", "reference-element": this.buttonType === "button" ? "solutions-delete" : this.icon }, h("span", { key: 'f7852b2476dae4b18e82495c64a819b3db98696d' }, this._translations.delete))));
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    async componentDidLoad() {
        this._setDeleteEnabled();
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Verify if the layer supports delete and that we have 1 or more ids
     */
    _setDeleteEnabled() {
        this._supportsDelete = this.layer?.editingEnabled && this.layer?.capabilities?.operations?.supportsDelete;
        this._deleteEndabled = !this.disabled || this._supportsDelete && this.ids.length > 0;
    }
    /**
     * Delete all selected records or shows an alert if the layer does not have editing enabled
     *
     * @returns a promise that will resolve when the operation is complete
     */
    _delete() {
        this._confirmDelete = true;
    }
    /**
     * Show delete confirmation message
     *
     * @returns node to confirm or deny the delete operation
     */
    _deleteMessage() {
        return this.deleteDialog ? this.deleteDialog : (h("delete-dialog", { id: "solution-delete-dialog", ids: this.ids, layer: this.layer, onDeleteDialogClose: () => this._confirmDelete = false, open: this._confirmDelete }));
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get watchers() { return {
        "ids": ["idsWatchHandler"],
        "layer": ["layerWatchHandler"]
    }; }
};
DeleteButton.style = DeleteButtonStyle0;

const deleteDialogCss = ":host{display:block}.delete-modal{position:fixed}";
const DeleteDialogStyle0 = deleteDialogCss;

const DeleteDialog = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.editsComplete = createEvent(this, "editsComplete", 7);
        this.deleteDialogClose = createEvent(this, "deleteDialogClose", 7);
        this.ids = [];
        this.layer = undefined;
        this.open = false;
        this._isDeleting = false;
        this._translations = undefined;
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when features have been deleted
     */
    editsComplete;
    /**
     * Emitted on demand when features have been deleted
     */
    deleteDialogClose;
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        const confirmMessage = this.ids.length === 1 ? this._translations?.confirmSingle :
            this._translations?.confirmMultiple;
        return (h(Host, { key: '64cd1440f80a9609f90056b919fa807e975eff70' }, h("calcite-modal", { key: '022302455960cbcf894dc2f0079d88be6fb59367', "aria-labelledby": "modal-title", class: "delete-modal", kind: "danger", onCalciteModalClose: () => this._close(), open: this.open, widthScale: "s" }, h("div", { key: '7484caedbdd759efbe972182ddd41a6ebaa2bd64', class: "display-flex align-center", id: "modal-title", slot: "header" }, this._translations?.deleteFeature), h("div", { key: 'e31136a6eed46dd0cbc4d919deb732a623097fbf', slot: "content" }, confirmMessage), h("calcite-button", { key: '7de42845a99777bcec59221fb6ab863e72ca2654', appearance: "outline", kind: "danger", onClick: () => this._close(), slot: "secondary", width: "full" }, this._translations?.cancel), h("calcite-button", { key: '67921ff64fc5c4439e66833fd8502f7e95671b5d', kind: "danger", loading: this._isDeleting, onClick: () => void this._deleteFeatures(), slot: "primary", width: "full" }, this._translations?.delete))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Delete the currently selected features
     */
    async _deleteFeatures() {
        this._isDeleting = true;
        const deleteFeatures = this.ids.map((objectId) => {
            return { objectId };
        });
        await this.layer.applyEdits({
            deleteFeatures
        });
        this._isDeleting = false;
        this._close();
        this.editsComplete.emit("delete");
    }
    /**
     * Set the alertOpen member to false when the alert is closed
     */
    _close() {
        this.open = false;
        this.deleteDialogClose.emit();
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
};
DeleteDialog.style = DeleteDialogStyle0;

export { Shell as calcite_shell, DeleteButton as delete_button, DeleteDialog as delete_dialog };
