/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/** @license
 * Copyright 2022 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Host, h } from "@stencil/core";
import { EDrawMode } from "../../utils/interfaces";
import { loadModules } from "../../utils/loadModules";
import state from "../../utils/publicNotificationStore";
import { getLocaleComponentStrings } from "../../utils/locale";
export class MapDrawTools {
    constructor() {
        this.active = false;
        this.drawMode = EDrawMode.SKETCH;
        this.editGraphicsEnabled = true;
        this.graphics = undefined;
        this.mapView = undefined;
        this.pointSymbol = undefined;
        this.polylineSymbol = undefined;
        this.polygonSymbol = undefined;
        this.redoEnabled = false;
        this.undoEnabled = false;
        this._translations = undefined;
        this._selectionMode = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html?#constructors-summary
     */
    GraphicsLayer;
    /**
     * esri/widgets/Sketch/SketchViewModel: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html
     * The sketch view model constructor
     */
    SketchViewModel;
    /**
     * esri/widgets/Sketch: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html#constructors-summary
     */
    Sketch;
    /**
     * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
     * The graphics layer used to show selections.
     */
    _sketchGraphicsLayer;
    /**
     * esri/widgets/Sketch/SketchViewModel: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html
     */
    _sketchViewModel;
    /**
     * esri/widgets/Sketch: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html#constructors-summary
     */
    _sketchWidget;
    /**
     * The container element for the sketch widget
     */
    _sketchElement;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    /**
     * Called each time the graphics prop is changed.
     */
    graphicsWatchHandler(v, oldV) {
        if (v && v.length > 0 && JSON.stringify(v) !== JSON.stringify(oldV) && this._sketchGraphicsLayer) {
            this._updateGraphicsSymbols(v);
            this._sketchGraphicsLayer.removeAll();
            this._sketchGraphicsLayer.addMany(v);
        }
    }
    /**
     * Called each time the mapView prop is changed.
     */
    mapViewWatchHandler(v, oldV) {
        if (v && v !== oldV) {
            this._init();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Clears the user drawn graphics
     *
     * @returns Promise that resolves when the operation is complete
     */
    async clear() {
        this._clearSketch();
    }
    /**
     * Set the sketch widget to update mode with the current graphic
     *
     * @returns Promise that resolves when the operation is complete
     */
    async updateGraphics() {
        this._updateGraphics();
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when selection starts or ends.
     */
    selectionLoadingChange;
    /**
     * Emitted on demand when the sketch graphics change.
     */
    sketchGraphicsChange;
    /**
     * Emitted on demand when the undo action is clicked.
     */
    drawUndo;
    /**
     * Emitted on demand when the redo action is clicked.
     */
    drawRedo;
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
        await this._initModules();
    }
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     *
     * @returns Promise when complete
     */
    componentDidLoad() {
        this._init();
    }
    /**
     * StencilJS: Called every time the component is disconnected from the DOM
     */
    disconnectedCallback() {
        // cancel any existing create operations
        this._sketchWidget.cancel();
        // clear any current temp sketch
        this._clearSketch();
    }
    /**
     * Renders the component.
     */
    render() {
        const containerClass = this.drawMode === EDrawMode.SKETCH ?
            "border" : "border esri-widget esri-sketch__panel";
        const undoRedoClass = this.drawMode === EDrawMode.SKETCH ?
            "display-none" : "esri-widget esri-sketch__panel border-left esri-sketch__section";
        return (h(Host, { key: 'c7f1873f30064fb688eef5fc1ee14903782d23ec' }, h("div", { key: '56235f613c9a96894030cf64e3ad9bdba951e2a0', class: containerClass }, h("div", { key: 'dd8cf1aff624670920b65e7ec0cfeba409039f4b', ref: (el) => { this._sketchElement = el; } }), h("div", { key: 'e88eb83e81301befa1e26d5aab46c0f2dc1286d0', class: undoRedoClass }, h("calcite-action", { key: '7eaeca49d89dcda98965b45864c7b1a91f8e500e', disabled: !this.undoEnabled, icon: "undo", onClick: () => this._undo(), scale: "s", text: this._translations.undo }), h("calcite-action", { key: '8b6fa842d86a17345d5dc6aa11900f94896a60e3', disabled: !this.redoEnabled, icon: "redo", onClick: () => this._redo(), scale: "s", text: this._translations.redo })))));
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
     *
     * @protected
     */
    async _initModules() {
        const [GraphicsLayer, Sketch, SketchViewModel] = await loadModules([
            "esri/layers/GraphicsLayer",
            "esri/widgets/Sketch",
            "esri/widgets/Sketch/SketchViewModel"
        ]);
        this.GraphicsLayer = GraphicsLayer;
        this.Sketch = Sketch;
        this.SketchViewModel = SketchViewModel;
    }
    /**
     * Initialize the graphics layer and the tools that support creating new graphics
     *
     * @protected
     */
    _init() {
        if (this.mapView && this._sketchElement) {
            this._initGraphicsLayer();
            this._initSketch();
        }
    }
    /**
     * Initialize the graphics layer
     *
     * @returns Promise when the operation has completed
     * @protected
     */
    _initGraphicsLayer() {
        const title = this._translations.sketchLayer;
        const sketchIndex = this.mapView.map.layers.findIndex((l) => l.title === title);
        if (sketchIndex > -1) {
            this._sketchGraphicsLayer = this.mapView.map.layers.getItemAt(sketchIndex);
        }
        else {
            this._sketchGraphicsLayer = new this.GraphicsLayer({ title, listMode: "hide" });
            state.managedLayers[title] = "sketch";
            this.mapView.map.layers.add(this._sketchGraphicsLayer);
        }
        if (this.graphics && this.graphics.length > 0) {
            this._sketchGraphicsLayer.addMany(this.graphics);
        }
    }
    /**
     * Initialize the skecth widget
     *
     * @protected
     */
    _initSketch() {
        const sketchOptions = {
            layer: this._sketchGraphicsLayer,
            view: this.mapView,
            defaultCreateOptions: {
                mode: "hybrid"
            },
            defaultUpdateOptions: {
                preserveAspectRatio: false,
                enableScaling: false,
                enableRotation: false,
                tool: "reshape",
                toggleToolOnClick: false
            }
        };
        this._sketchWidget = new this.Sketch({
            ...sketchOptions,
            container: this._sketchElement,
            creationMode: "single",
            visibleElements: {
                duplicateButton: false,
                selectionTools: {
                    "lasso-selection": false,
                    "rectangle-selection": false
                }, createTools: {
                    circle: false
                },
                undoRedoMenu: false,
                settingsMenu: this.drawMode === EDrawMode.SKETCH
            }
        });
        this._sketchViewModel = new this.SketchViewModel({
            ...sketchOptions
        });
        this._sketchWidget.viewModel.polylineSymbol = this.polylineSymbol;
        this._sketchWidget.viewModel.pointSymbol = this.pointSymbol;
        this._sketchWidget.viewModel.polygonSymbol = this.polygonSymbol;
        let forceCreate = false;
        this._sketchWidget.on("create", (evt) => {
            if (evt.state === "complete") {
                this.graphics = [evt.graphic];
                this.sketchGraphicsChange.emit({
                    graphics: this.graphics,
                    useOIDs: false
                });
                if (this.drawMode === EDrawMode.REFINE) {
                    // calling create during complete will force the cancel event
                    // https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch.html#event-create
                    forceCreate = true;
                    this._sketchWidget.viewModel.create(evt.tool);
                }
            }
            if (evt.state === "cancel" && this.drawMode === EDrawMode.REFINE && forceCreate) {
                forceCreate = !forceCreate;
                this._sketchWidget.viewModel.create(evt.tool);
            }
        });
        this._sketchWidget.on("update", (evt) => {
            if (!this.editGraphicsEnabled) {
                this._sketchWidget.viewModel.cancel();
                this._sketchViewModel.cancel();
            }
            else {
                const eventType = evt?.toolEventInfo?.type;
                if (eventType === "reshape-stop" || eventType === "move-stop") {
                    this.graphics = evt.graphics;
                    this.sketchGraphicsChange.emit({
                        graphics: this.graphics,
                        useOIDs: false
                    });
                }
            }
        });
        this._sketchWidget.on("delete", () => {
            this.graphics = [];
            this.sketchGraphicsChange.emit({
                graphics: this.graphics,
                useOIDs: false
            });
        });
        this._sketchWidget.on("undo", (evt) => {
            this.graphics = evt.graphics;
            this.sketchGraphicsChange.emit({
                graphics: this.graphics,
                useOIDs: false
            });
        });
        this._sketchWidget.on("redo", (evt) => {
            this.graphics = evt.graphics;
            this.sketchGraphicsChange.emit({
                graphics: this.graphics,
                useOIDs: false
            });
        });
    }
    /**
     * Clear any stored graphics and remove all graphics from the graphics layer
     *
     * @protected
     */
    _clearSketch() {
        this._sketchWidget?.viewModel.cancel();
        this.graphics = [];
        this._sketchGraphicsLayer?.removeAll();
    }
    /**
     * Emit the undo event
     *
     * @protected
     */
    _undo() {
        this.drawUndo.emit();
    }
    /**
     * Emit the undo event
     *
     * @protected
     */
    _redo() {
        this.drawRedo.emit();
    }
    /**
     * Set the sketch widget to update mode with the current graphic
     *
     * reshape tool only supports a single graphic
     *
     * @protected
     */
    _updateGraphics() {
        setTimeout(() => {
            if (this.graphics.length === 1) {
                void this._sketchWidget.update(this.graphics, {
                    tool: "reshape",
                    enableRotation: false,
                    enableScaling: false,
                    preserveAspectRatio: false,
                    toggleToolOnClick: false
                });
            }
        }, 100);
    }
    /**
     * Any time graphics are added update the symbology so they will always be consistent
     * regardless of where they are from.
     * https://github.com/Esri/solutions-components/issues/246
     *
     * reshape tool only supports a single graphic
     *
     * @protected
     */
    _updateGraphicsSymbols(graphics) {
        // graphics will only be of one gemetry type
        const graphic = graphics[0];
        const type = graphic.geometry.type;
        const symbol = type === "point" ? this.pointSymbol :
            type === "polyline" ? this.polylineSymbol :
                type === "polygon" ? this.polygonSymbol : undefined;
        if (symbol) {
            graphics.forEach(g => g.symbol = symbol);
        }
    }
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    async _getTranslations() {
        const translations = await getLocaleComponentStrings(this.el);
        this._translations = translations[0];
    }
    static get is() { return "map-draw-tools"; }
    static get originalStyleUrls() {
        return {
            "$": ["map-draw-tools.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["map-draw-tools.css"]
        };
    }
    static get properties() {
        return {
            "active": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: sketch is used by multiple components...need a way to know who should respond..."
                },
                "attribute": "active",
                "reflect": false,
                "defaultValue": "false"
            },
            "drawMode": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "EDrawMode",
                    "resolved": "EDrawMode.REFINE | EDrawMode.SKETCH",
                    "references": {
                        "EDrawMode": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::EDrawMode"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "utils/interfaces: Controls how the draw tools are rendered\r\n\r\nSKETCH mode supports snapping\r\nREFINE mode supports undo/redo"
                },
                "attribute": "draw-mode",
                "reflect": false,
                "defaultValue": "EDrawMode.SKETCH"
            },
            "editGraphicsEnabled": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: when true you will be able to make additional modifications to the sketched geometry"
                },
                "attribute": "edit-graphics-enabled",
                "reflect": false,
                "defaultValue": "true"
            },
            "graphics": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "__esri.Graphic[]",
                    "resolved": "Graphic[]",
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
                    "text": "esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html"
                }
            },
            "mapView": {
                "type": "unknown",
                "mutable": true,
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
                    "text": "esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html"
                }
            },
            "pointSymbol": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "__esri.SimpleMarkerSymbol",
                    "resolved": "SimpleMarkerSymbol",
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
                    "text": "esri/symbols/SimpleMarkerSymbol: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html"
                }
            },
            "polylineSymbol": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "__esri.SimpleLineSymbol",
                    "resolved": "SimpleLineSymbol",
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
                    "text": "esri/symbols/SimpleLineSymbol: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html"
                }
            },
            "polygonSymbol": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "__esri.SimpleFillSymbol",
                    "resolved": "SimpleFillSymbol",
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
                    "text": "esri/symbols/SimpleFillSymbol: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html"
                }
            },
            "redoEnabled": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: when eanbled the user can redo the previous operation"
                },
                "attribute": "redo-enabled",
                "reflect": false,
                "defaultValue": "false"
            },
            "undoEnabled": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "boolean: when eanbled the user can undo the previous operation"
                },
                "attribute": "undo-enabled",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "_translations": {},
            "_selectionMode": {}
        };
    }
    static get events() {
        return [{
                "method": "selectionLoadingChange",
                "name": "selectionLoadingChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when selection starts or ends."
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }, {
                "method": "sketchGraphicsChange",
                "name": "sketchGraphicsChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when the sketch graphics change."
                },
                "complexType": {
                    "original": "ISketchGraphicsChange",
                    "resolved": "ISketchGraphicsChange",
                    "references": {
                        "ISketchGraphicsChange": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::ISketchGraphicsChange"
                        }
                    }
                }
            }, {
                "method": "drawUndo",
                "name": "drawUndo",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when the undo action is clicked."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "drawRedo",
                "name": "drawRedo",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted on demand when the redo action is clicked."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "clear": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Clears the user drawn graphics",
                    "tags": [{
                            "name": "returns",
                            "text": "Promise that resolves when the operation is complete"
                        }]
                }
            },
            "updateGraphics": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Set the sketch widget to update mode with the current graphic",
                    "tags": [{
                            "name": "returns",
                            "text": "Promise that resolves when the operation is complete"
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "graphics",
                "methodName": "graphicsWatchHandler"
            }, {
                "propName": "mapView",
                "methodName": "mapViewWatchHandler"
            }];
    }
}
