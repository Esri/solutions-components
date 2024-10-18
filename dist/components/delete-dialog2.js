/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$5 } from './button.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './loader.js';
import { d as defineCustomElement$2 } from './modal.js';
import { d as defineCustomElement$1 } from './scrim.js';

const deleteDialogCss = ":host{display:block}.delete-modal{position:fixed}";
const DeleteDialogStyle0 = deleteDialogCss;

const DeleteDialog = /*@__PURE__*/ proxyCustomElement(class DeleteDialog extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.editsComplete = createEvent(this, "editsComplete", 7);
        this.deleteDialogClose = createEvent(this, "deleteDialogClose", 7);
        this.ids = [];
        this.layer = undefined;
        this.open = false;
        this._isDeleting = false;
        this._translations = undefined;
    }
    get el() { return this; }
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
    static get style() { return DeleteDialogStyle0; }
}, [1, "delete-dialog", {
        "ids": [16],
        "layer": [16],
        "open": [4],
        "_isDeleting": [32],
        "_translations": [32]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["delete-dialog", "calcite-button", "calcite-icon", "calcite-loader", "calcite-modal", "calcite-scrim"];
    components.forEach(tagName => { switch (tagName) {
        case "delete-dialog":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, DeleteDialog);
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
        case "calcite-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { DeleteDialog as D, defineCustomElement as d };
