/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { Host, h } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";
import { getAllLayers } from "../../utils/mapViewUtils";
export class CreateFeature {
    constructor() {
        this.mapView = undefined;
        this.selectedLayerId = undefined;
        this._editorLoading = false;
    }
    el;
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
    static get is() { return "create-feature"; }
    static get originalStyleUrls() {
        return {
            "$": ["create-feature.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["create-feature.css"]
        };
    }
    static get properties() {
        return {
            "mapView": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.MapView",
                    "resolved": "MapView",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                }
            },
            "selectedLayerId": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "selected-layer-id",
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "_editorLoading": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "_editorLoading",
                "methodName": "_editorLoadingWatchHandler"
            }];
    }
}
