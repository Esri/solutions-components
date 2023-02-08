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
    this.border = false;
    this.mapView = undefined;
    this.pointSymbol = undefined;
    this.polylineSymbol = undefined;
    this.polygonSymbol = undefined;
    this.graphics = [];
    this._translations = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the graphics prop is changed.
   *
   */
  graphicsWatchHandler(v, oldV) {
    if (v && v.length > 0 && JSON.stringify(v) !== JSON.stringify(oldV) && this._sketchGraphicsLayer) {
      this._sketchGraphicsLayer.removeAll();
      this._sketchGraphicsLayer.addMany(v);
    }
  }
  /**
   * Called each time the mapView prop is changed.
   *
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
    const drawClass = this.border ? "border" : "";
    return (h(Host, null, h("div", { class: drawClass }, h("div", { ref: (el) => { this._sketchElement = el; } }))));
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
    const [GraphicsLayer, Sketch] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/widgets/Sketch"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.Sketch = Sketch;
  }
  /**
   * Initialize the graphics layer and the tools that support creating new graphics
   *
   * @protected
   */
  _init() {
    if (this.mapView && this._sketchElement) {
      this._initGraphicsLayer();
      this._initDrawTools();
    }
  }
  /**
   * Create or find the graphics layer and add any existing graphics
   *
   * @protected
   */
  _initGraphicsLayer() {
    const title = this._translations.sketchLayer;
    const sketchIndex = this.mapView.map.layers.findIndex((l) => l.title === title);
    if (sketchIndex > -1) {
      this._sketchGraphicsLayer = this.mapView.map.layers.getItemAt(sketchIndex);
    }
    else {
      this._sketchGraphicsLayer = new this.GraphicsLayer({ title });
      state.managedLayers.push(title);
      this.mapView.map.layers.add(this._sketchGraphicsLayer);
    }
    if (this.graphics && this.graphics.length > 0) {
      this._sketchGraphicsLayer.addMany(this.graphics);
    }
  }
  /**
   * Initialize the skecth widget and store the associated symbols for each geometry type
   *
   * @protected
   */
  _initDrawTools() {
    this._sketchWidget = new this.Sketch({
      layer: this._sketchGraphicsLayer,
      view: this.mapView,
      container: this._sketchElement,
      creationMode: "single",
      defaultCreateOptions: {
        "mode": "hybrid"
      }
    });
    this.pointSymbol = this._sketchWidget.viewModel.pointSymbol;
    this.polylineSymbol = this._sketchWidget.viewModel.polylineSymbol;
    this.polygonSymbol = this._sketchWidget.viewModel.polygonSymbol;
    this._sketchWidget.visibleElements = {
      selectionTools: {
        "lasso-selection": false,
        "rectangle-selection": false
      }, createTools: {
        "circle": false
      },
      undoRedoMenu: false
    };
    this._sketchWidget.on("update", (evt) => {
      if (evt.state === "start") {
        this.graphics = evt.graphics;
        this.sketchGraphicsChange.emit(this.graphics);
      }
      if (evt.state === "active") {
        clearTimeout(this._selectionTimer);
        this._selectionTimer = setTimeout(() => {
          this.graphics = evt.graphics;
          this.sketchGraphicsChange.emit(this.graphics);
        }, 500);
      }
    });
    this._sketchWidget.on("delete", () => {
      this.graphics = [];
      this.sketchGraphicsChange.emit(this.graphics);
    });
    this._sketchWidget.on("undo", (evt) => {
      this.graphics = evt.graphics;
      this.sketchGraphicsChange.emit(this.graphics);
    });
    this._sketchWidget.on("redo", (evt) => {
      this.graphics = evt.graphics;
      this.sketchGraphicsChange.emit(this.graphics);
    });
    this._sketchWidget.on("create", (evt) => {
      if (evt.state === "complete") {
        this.graphics = [evt.graphic];
        this.sketchGraphicsChange.emit(this.graphics);
      }
    });
  }
  /**
   * Clear any stored graphics and remove all graphics from the graphics layer
   *
   * @protected
   */
  _clearSketch() {
    this.graphics = [];
    this._sketchGraphicsLayer.removeAll();
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
      "border": {
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
          "text": "boolean: Optionally draw a border around the draw tools"
        },
        "attribute": "border",
        "reflect": false,
        "defaultValue": "false"
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
        },
        "defaultValue": "[]"
      }
    };
  }
  static get states() {
    return {
      "_translations": {}
    };
  }
  static get events() {
    return [{
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
          "original": "__esri.Graphic[]",
          "resolved": "Graphic[]",
          "references": {
            "___esri": {
              "location": "global"
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
//# sourceMappingURL=map-draw-tools.js.map
