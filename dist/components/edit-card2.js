/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { a as getAllLayers } from './mapViewUtils.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './loader.js';
import { d as defineCustomElement$1 } from './notice.js';

const editCardCss = ":host{display:block}.padding-bottom-1{padding-bottom:1rem}.font-bold{font-weight:var(--calcite-font-weight-bold)}.font-500{font-weight:var(--calcite-font-weight-medium)}.font-italic{font-style:italic}#feature-form{--calcite-color-background:none;padding-top:0px}.padding-sides-bottom-1{padding:0 1rem 1rem 1rem}.position-relative{position:relative}.esri-editor__prompt--danger{position:relative !important;width:100% !important;background-color:var(--calcite-color-foreground-1) !important}.esri-feature__content-node{background-color:var(--calcite-color-foreground-1) !important}.esri-editor__panel-toolbar{display:none !important}.position-absolute{position:absolute;top:0;right:0;bottom:0;left:0;overflow:auto}";
const EditCardStyle0 = editCardCss;

const EditCard = /*@__PURE__*/ proxyCustomElement(class EditCard extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.closeEdit = createEvent(this, "closeEdit", 7);
        this.editsComplete = createEvent(this, "editsComplete", 7);
        this.refreshGraphics = createEvent(this, "refreshGraphics", 7);
        this.enableEditGeometry = false;
        this.graphics = undefined;
        this.mapView = undefined;
        this.open = false;
        this.graphicIndex = 0;
        this._editorLoading = false;
        this._translations = undefined;
    }
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
      * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
      */
    _activeWorkflowHandle;
    /**
      * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
      */
    _addRelatedRecordHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _attachmentHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _editHandle;
    /**
     * esri/core/Accessor: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Accessor.html#WatchHandle
     */
    _layerEditHandle;
    /**
     * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html
     * The Editor constructor
     */
    Editor;
    /**
     * esri/widgets/Editor: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Editor.html
     * The Editor instance
     */
    _editor;
    /**
     * esri/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     */
    _layer;
    /**
     * HTMLDivElement: https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement
     */
    _editContainer;
    /**
     * any[]: Collection of edit controls created in "MULTI" edit mode
     * These can be calcite-input-text, calcite-input-number, calcite-input-date-picker, calcite-input-time-picker, or calcite-combobox
     */
    _editControlElements;
    /**
     * boolean: When true edit controls will be disabled
     */
    _editingDisabled;
    /**
     * boolean: When true the Editor widget should be closed
     * Without this logic we are taken to the Editors "Select" workflow step
     */
    _shouldClose = false;
    /**
     * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
     */
    reactiveUtils;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Watch for changes to the graphics and update the feature widget
     */
    async graphicsWatchHandler() {
        if (this.graphics.length === 0 && this.open) {
            await this._closeEdit(true);
        }
    }
    async openWatchHandler(v) {
        if (v && this.graphics?.length > 0 && this.graphicIndex > -1) {
            this._editorLoading = true;
            await this._initEditorWidget();
            if (this.graphicIndex > -1 && this.graphics.length > 0 && this.open && !this._shouldClose) {
                await this._startUpdate();
            }
            this._editorLoading = false;
        }
        if (!v) {
            await this._closeEdit(true);
        }
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
     * Emitted on demand when the Editor widget should be closed
     */
    closeEdit;
    /**
     * Emitted on demand when edits are completed on current edit layer
     */
    editsComplete;
    /**
     * Emitted on demand when the editor is closed to handle
     * things like attachment updates that don't fire the standard edit update event when complete
     */
    refreshGraphics;
    async featureSelectionChange() {
        if (this.open) {
            await this._closeEdit(false);
        }
    }
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
        await this._initModules();
        await this._getTranslations();
    }
    /**
     * Special handeling when used with layer-table.
     * This allows us to only fetch graphics when the modal is opened rather than with every render of the layer-table.
     *
     * @returns Promise when complete
     */
    async componentWillRender() {
        if (this.graphics?.length > 0 && this.graphics[0]?.layer) {
            this._layer = this.graphics[0].layer;
            if (this._layerEditHandle) {
                this._layerEditHandle.remove();
            }
            this._layerEditHandle = this._layer.on("edits", () => {
                console.log("IN _layerEditHandle");
                this.editsComplete.emit();
            });
        }
    }
    /**
     * Renders the component.
     */
    render() {
        // This is a temp workaround hopefully...this._editingDisabled should reflect the current state but does not
        // when you use MULTI edit mode...is fine in SINGLE
        const editDisabled = this.graphics?.length > 0 && this.graphics[0] ?
            !this.graphics[0].layer.editingEnabled : true;
        const tableNodeClass = this._editorLoading ? "display-none" : "position-absolute";
        const loadingClass = this._editorLoading ? "" : "display-none";
        return (h(Host, { key: 'b949a39b8da61165f3e553d74780fff45dcd1119' }, h("div", { key: '114907838c53f09b64006fbe8cbc0089b51a0ea4', class: "position-absolute" }, editDisabled ? (h("calcite-notice", { kind: "warning", open: true, slot: "content-top", width: "full" }, h("div", { slot: "message" }, this._translations.enableEditing))) : undefined, h("div", { key: '946de894a81c649282da42b4ea31d026eeda42e9', class: "position-absolute" }, h("div", { key: 'cc984a05b6ea3990b3cf42ec97dced227fa6525b', class: tableNodeClass, id: "feature-form", ref: (el) => this._editContainer = el }), h("calcite-loader", { key: 'd1839fb5e7c3dcbf06d49a4bde7e724693c5820c', class: loadingClass, label: "", scale: "s" })))));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     */
    async _initModules() {
        const [Editor, reactiveUtils] = await loadModules([
            "esri/widgets/Editor",
            "esri/core/reactiveUtils"
        ]);
        this.Editor = Editor;
        this.reactiveUtils = reactiveUtils;
    }
    /**
     * Init the Editor widget so we can display the popup content
     */
    async _initEditorWidget() {
        if (this.mapView && this.graphics && this.graphics.length > 0 && this.graphics[0]) {
            if (this._editor) {
                this._editor.destroy();
            }
            const container = document.createElement("div");
            const layers = await getAllLayers(this.mapView);
            const layerInfos = layers.map(layer => {
                return {
                    layer,
                    geometryUpdatesEnabled: this.enableEditGeometry
                };
            });
            this._editor = new this.Editor({
                allowedWorkflows: "update",
                view: this.mapView,
                layerInfos,
                visibleElements: {
                    snappingControls: false
                },
                container
            });
            if (this._attachmentHandle && this._activeWorkflowHandle) {
                this._attachmentHandle.remove();
                this._activeWorkflowHandle.remove();
            }
            this._attachmentHandle = this.reactiveUtils.when(() => this._editor.viewModel.state === "adding-attachment" ||
                this._editor.viewModel.state === "editing-attachment" ||
                this._editor.viewModel.state === "creating-features", () => {
                console.log("IN _attachmentHandle");
                this._shouldClose = false;
            });
            this._activeWorkflowHandle = this.reactiveUtils.watch(() => this._editor.viewModel.activeWorkflow?.activeWorkflow, (activeWorkflow) => {
                console.log("IN _activeWorkflowHandle");
                if (activeWorkflow?.type === "update-table-record" || activeWorkflow?.type === "create-features") {
                    this._shouldClose = false;
                }
                // Handle back click and when feature is de-selected from the table
                // this ensures that we are not shown the Editors "Select" workflow step
                if ((!activeWorkflow?.type && !activeWorkflow?.hasPendingEdits && !this._editor.activeWorkflow) || !this._editor?.activeWorkflow?.started) {
                    this.open = false;
                }
            });
            // had issues with destroy before adding like this
            this._editContainer.appendChild(container);
        }
    }
    /**
     * Close the edit widget
     */
    async _closeEdit(destroyOnClose) {
        console.log("_closeEdit");
        this._shouldClose = true;
        if (destroyOnClose && this._editor?.activeWorkflow) {
            console.log("_closeEdit destroyOnClose");
            if (this._editor.activeWorkflow?.activeWorkflow?.hasPendingEdits) {
                await this._editor.activeWorkflow.reset();
                await this._editor.cancelWorkflow();
            }
            this._editor.destroy();
        }
        else {
            if (this.graphicIndex > -1 && this.graphics?.length > 0) {
                this.refreshGraphics.emit(this.graphics);
            }
        }
        this._shouldClose = false;
        this.closeEdit.emit();
    }
    /**
     * Start the update workflow for the editor widget
     */
    async _startUpdate() {
        console.log("startUpdateWorkflowAtFeatureEdit");
        await this._editor.startUpdateWorkflowAtFeatureEdit(this.graphics[this.graphicIndex]);
        this._shouldClose = true;
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get watchers() { return {
        "graphics": ["graphicsWatchHandler"],
        "open": ["openWatchHandler"]
    }; }
    static get style() { return EditCardStyle0; }
}, [0, "edit-card", {
        "enableEditGeometry": [4, "enable-edit-geometry"],
        "graphics": [1040],
        "mapView": [16],
        "open": [1028],
        "graphicIndex": [2, "graphic-index"],
        "_editorLoading": [32],
        "_translations": [32]
    }, [[8, "featureSelectionChange", "featureSelectionChange"]], {
        "graphics": ["graphicsWatchHandler"],
        "open": ["openWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["edit-card", "calcite-icon", "calcite-loader", "calcite-notice"];
    components.forEach(tagName => { switch (tagName) {
        case "edit-card":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, EditCard);
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-notice":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { EditCard as E, defineCustomElement as d };
