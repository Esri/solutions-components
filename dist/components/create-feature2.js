/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules.js';
import { a as getAllLayers } from './mapViewUtils.js';

const createFeatureCss = ":host{display:block}.esri-editor__panel-toolbar{display:none !important}.esri-editor__update-actions{display:none !important}.esri-editor__panel-content{padding-block:0px !important}.esri-editor .esri-item-list__group__header{display:none !important}.esri-editor__panel-content__section .esri-widget__heading{display:none !important}.esri-editor .esri-item-list__filter-container--sticky{padding-block:0px !important;padding-inline:10px !important}.search-widget{width:92% !important;margin:5px 0 20px 14px}.display-none{display:none !important}.hide-map{height:1%;visibility:hidden}.show-map{padding:10px !important;position:absolute;bottom:0;width:calc(100% - 22px);height:50%}";
const CreateFeatureStyle0 = createFeatureCss;

const CreateFeature = /*@__PURE__*/ proxyCustomElement(class CreateFeature extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.mapView = undefined;
        this.selectedLayerId = undefined;
        this._editorLoading = false;
    }
    get el() { return this; }
    Editor;
    _editor;
    FeatureLayer;
    MapView;
    reactiveUtils;
    _container;
    _mapViewContainer;
    async _editorLoadingWatchHandler(v) {
        console.log(`_editorLoadingWatchHandler: ${v}`);
        if (v) {
            void this.startCreate();
            this._editorLoading = false;
        }
    }
    async componentWillLoad() {
        await this.initModules();
    }
    async componentDidLoad() {
        if (this.mapView && this.selectedLayerId) {
            await this.createEditorWidget();
        }
    }
    render() {
        return (h(Host, { key: 'd201ad6280a9fb3a566d54685a3c59daa5f1aea1' }, h("div", { key: '3451399636e1d088091db6547d3cc96948cd0d34', id: "feature-form" })));
    }
    async initModules() {
        const [Editor, reactiveUtils, MapView] = await loadModules([
            "esri/widgets/Editor",
            "esri/core/reactiveUtils",
            "esri/views/MapView"
        ]);
        this.Editor = Editor;
        this.reactiveUtils = reactiveUtils;
        this.MapView = MapView;
    }
    async createEditorWidget() {
        if (this._editor) {
            this._editor.destroy();
        }
        const layerInfos = [];
        this._container = document.createElement("div");
        const allMapLayers = await getAllLayers(this.mapView);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        allMapLayers.forEach(async (eachLayer) => {
            layerInfos.push({
                layer: eachLayer,
                enabled: eachLayer?.type === "feature" && eachLayer?.id === this.selectedLayerId,
                addEnabled: true, // default is true, set to false to disable the ability to add a new feature
                updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
                deleteEnabled: false // default is true, set to false to disable the ability to delete features
            });
        });
        this._editor = new this.Editor({
            allowedWorkflows: "create-features",
            view: this.mapView,
            layerInfos: layerInfos,
            visibleElements: {
                snappingControls: false
            },
            container: this._container
        });
        this.el.appendChild(this._container);
        // THIS MAKES IT NOT WORK AT ALL
        const handle = this.reactiveUtils.watch(() => this._editor.viewModel.featureTemplatesViewModel.state, (state) => {
            console.log(`create-feature featureTemplatesViewModel.state: ${state}`);
            if (state === 'ready') {
                if (!this.started) {
                    this.started = true;
                    //void this.startCreate();
                }
                this._editorLoading = true;
            }
        });
        this._editor.viewModel.addHandles(handle);
    }
    started = false;
    async startCreate() {
        console.log('create-feature startCreate');
        return new Promise((resolve) => {
            if (this._editor.viewModel.featureTemplatesViewModel.items?.length) {
                //const items: __esri.TemplateItem[] = this._editor.viewModel.featureTemplatesViewModel.items[0]?.get("items");
                this._editor.viewModel.featureTemplatesViewModel.on('select', () => {
                    console.log('create-feature select');
                    setTimeout(() => {
                        this._editorLoading = false;
                        resolve({});
                    }, 700);
                });
                // if (items.length === 1) {
                //   this._editor.viewModel.featureTemplatesViewModel.select(items[0]);
                // }
            }
        });
    }
    static get watchers() { return {
        "_editorLoading": ["_editorLoadingWatchHandler"]
    }; }
    static get style() { return CreateFeatureStyle0; }
}, [0, "create-feature", {
        "mapView": [16],
        "selectedLayerId": [1, "selected-layer-id"],
        "_editorLoading": [32]
    }, undefined, {
        "_editorLoading": ["_editorLoadingWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["create-feature"];
    components.forEach(tagName => { switch (tagName) {
        case "create-feature":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CreateFeature);
            }
            break;
    } });
}
defineCustomElement();

export { CreateFeature as C, defineCustomElement as d };
