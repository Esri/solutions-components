/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$6 } from './action.js';
import { d as defineCustomElement$5 } from './button.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './loader.js';
import { d as defineCustomElement$2 } from './modal.js';
import { d as defineCustomElement$1 } from './scrim.js';

const deleteButtonCss = ":host{display:block}.delete-modal{position:fixed}";
const DeleteButtonStyle0 = deleteButtonCss;

const DeleteButton = /*@__PURE__*/ proxyCustomElement(class DeleteButton extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.editsComplete = createEvent(this, "editsComplete", 7);
        this.buttonType = "button";
        this.disabled = false;
        this.icon = undefined;
        this.ids = [];
        this.layer = undefined;
        this._confirmDelete = false;
        this._deleteEndabled = false;
        this._isDeleting = false;
        this._supportsDelete = undefined;
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
        return (h(Host, { key: '1ff43b4d224c4cf7bbfc0656e9605cd4ac4c971a' }, this.buttonType === "button" ? (h("calcite-button", { appearance: "outline", disabled: !this._deleteEndabled, id: "solutions-delete", kind: "danger", onClick: () => this._delete(), width: "full" }, this._translations.deleteCount.replace("{{n}}", this.ids.length.toString()))) : (h("calcite-action", { appearance: "solid", compact: true, disabled: !this._deleteEndabled, id: this.icon, onClick: () => this._delete(), scale: "s", text: this._translations.delete }, h("calcite-button", { appearance: "transparent", iconStart: this.icon, kind: "danger" }, this._translations.delete))), this._deleteMessage()));
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
        const confirmMessage = this.ids.length === 1 ? this._translations.confirmSingle :
            this._translations.confirmMultiple;
        return (h("calcite-modal", { "aria-labelledby": "modal-title", class: "delete-modal", kind: "danger", onCalciteModalClose: () => this._deleteClosed(), open: this._confirmDelete }, h("div", { class: "display-flex align-center", id: "modal-title", slot: "header" }, this._translations.deleteFeature), h("div", { slot: "content" }, confirmMessage), h("calcite-button", { appearance: "outline", kind: "danger", onClick: () => this._deleteClosed(), slot: "secondary", width: "full" }, this._translations.cancel), h("calcite-button", { kind: "danger", loading: this._isDeleting, onClick: () => void this._deleteFeatures(), slot: "primary", width: "full" }, this._translations.delete)));
    }
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
        this._deleteClosed();
        this.editsComplete.emit("delete");
    }
    /**
     * Set the alertOpen member to false when the alert is closed
     */
    _deleteClosed() {
        this._confirmDelete = false;
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
    static get style() { return DeleteButtonStyle0; }
}, [1, "delete-button", {
        "buttonType": [1, "button-type"],
        "disabled": [4],
        "icon": [1],
        "ids": [16],
        "layer": [16],
        "_confirmDelete": [32],
        "_deleteEndabled": [32],
        "_isDeleting": [32],
        "_supportsDelete": [32],
        "_translations": [32]
    }, undefined, {
        "ids": ["idsWatchHandler"],
        "layer": ["layerWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["delete-button", "calcite-action", "calcite-button", "calcite-icon", "calcite-loader", "calcite-modal", "calcite-scrim"];
    components.forEach(tagName => { switch (tagName) {
        case "delete-button":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, DeleteButton);
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

export { DeleteButton as D, defineCustomElement as d };
