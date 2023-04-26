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
import { loadModules } from "../../utils/loadModules";
import state from "../../utils/publicNotificationStore";
import { getLocaleComponentStrings } from "../../utils/locale";
export class MapDrawTools {
  constructor() {
    this.active = false;
    this.graphics = undefined;
    this.mapView = undefined;
    this.pointSymbol = undefined;
    this.polylineSymbol = undefined;
    this.polygonSymbol = undefined;
    this._translations = undefined;
    this._selectionMode = undefined;
  }
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
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { class: "border" }, h("div", { ref: (el) => { this._sketchElement = el; } }))));
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
      state.managedLayers.push(title);
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
    this._sketchWidget = new this.Sketch({
      layer: this._sketchGraphicsLayer,
      view: this.mapView,
      container: this._sketchElement,
      defaultUpdateOptions: {
        tool: "reshape",
        toggleToolOnClick: false
      },
      creationMode: "single",
      defaultCreateOptions: {
        mode: "hybrid"
      },
      visibleElements: {
        selectionTools: {
          "lasso-selection": false,
          "rectangle-selection": false
        }, createTools: {
          circle: false
        },
        undoRedoMenu: true
      }
    });
    this;
    this._sketchViewModel = new this.SketchViewModel({
      view: this.mapView,
      layer: this._sketchGraphicsLayer
    });
    this._sketchWidget.viewModel.polylineSymbol = this.polylineSymbol;
    this._sketchWidget.viewModel.pointSymbol = this.pointSymbol;
    this._sketchWidget.viewModel.polygonSymbol = this.polygonSymbol;
    this._sketchWidget.on("create", (evt) => {
      if (evt.state === "complete") {
        this.graphics = [evt.graphic];
        this.sketchGraphicsChange.emit({
          graphics: this.graphics,
          useOIDs: false
        });
      }
    });
    this._sketchWidget.on("update", (evt) => {
      var _a;
      const eventType = (_a = evt === null || evt === void 0 ? void 0 : evt.toolEventInfo) === null || _a === void 0 ? void 0 : _a.type;
      if (eventType === "reshape-stop" || eventType === "move-stop") {
        this.graphics = evt.graphics;
        this.sketchGraphicsChange.emit({
          graphics: this.graphics,
          useOIDs: false
        });
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
    var _a;
    this._sketchWidget.viewModel.cancel();
    this.graphics = [];
    (_a = this._sketchGraphicsLayer) === null || _a === void 0 ? void 0 : _a.removeAll();
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
      "graphics": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "__esri.Graphic[]",
          "resolved": "Graphic[]",
          "references": {
            "___esri": {
              "location": "global"
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
              "location": "global"
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
              "location": "global"
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
              "location": "global"
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
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "esri/symbols/SimpleFillSymbol: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html"
        }
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
              "path": "../../utils/interfaces"
            }
          }
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
              "location": "global"
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
              "location": "global"
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
