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
import { ERefineMode, ESelectionMode, ESelectionType } from "../../utils/interfaces";
import { loadModules } from "../../utils/loadModules";
import { getMapLayerView, highlightFeatures } from "../../utils/mapViewUtils";
import { queryFeaturesByGeometry } from "../../utils/queryUtils";
import state from "../../utils/publicNotificationStore";
import { getLocaleComponentStrings } from "../../utils/locale";
export class RefineSelectionTools {
  constructor() {
    /**
     * {<layer id>: Graphic[]}: Collection of graphics returned from queries to the layer
     */
    this._featuresCollection = {};
    this.active = false;
    this.border = false;
    this.enabledLayerIds = [];
    this.graphics = undefined;
    this.ids = [];
    this.layerView = undefined;
    this.layerViews = [];
    this.mapView = undefined;
    this.mode = undefined;
    this.refineMode = undefined;
    this.refineSelectionSet = undefined;
    this.useLayerPicker = true;
    this._selectEnabled = false;
    this._selectionMode = undefined;
    this._translations = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the ids prop is changed.
   * Highlight the features based on the provided ids
   */
  idsWatchHandler(v, oldV) {
    if (v && JSON.stringify(v) !== JSON.stringify(oldV)) {
      void this._highlightFeatures(v);
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------
  /**
   * Reset the ids collection
   *
   * @returns Promise when complete
   */
  async reset() {
    this.ids = [];
  }
  /**
   * Clear current highlight handle
   *
   * @returns Promise when complete
   */
  async clearHighlight() {
    this._clearHighlight();
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad() {
    await this._getTranslations();
    await this._initModules();
  }
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  componentDidLoad() {
    this._init();
  }
  /**
   * StencilJS: Called every time the component is disconnected from the DOM, ie,
   * it can be dispatched more than once, DO not confuse with a "onDestroy" kind of event.
   */
  disconnectedCallback() {
    this.active = false;
  }
  /**
   * Called every time the component is connected to the DOM.
   * When the component is first connected, this method is called before componentWillLoad.
   */
  connectedCallback() {
    this.active = true;
    if (this.ids.length > 0) {
      this._selectEnabled = true;
      void this._highlightFeatures(this.ids);
    }
  }
  /**
   * Renders the component.
   */
  render() {
    var _a, _b;
    const showLayerPickerClass = this.useLayerPicker ? "div-visible" : "div-not-visible";
    const drawClass = this.border ? " border" : "";
    const showUndoRedo = this.refineMode === ERefineMode.ALL ? "div-visible" : "div-not-visible";
    return (h(Host, null, h("div", null, h("map-layer-picker", { class: showLayerPickerClass, enabledLayerIds: this.enabledLayerIds, mapView: this.mapView, onLayerSelectionChange: (evt) => { void this._layerSelectionChange(evt); }, selectedLayerIds: this.layerViews.map(l => l.layer.id), selectionMode: "single" }), h("div", { class: "margin-top-1" + drawClass }, h("div", { class: "esri-sketch esri-widget" }, h("div", { class: "esri-sketch__panel" }, h("div", { class: "esri-sketch__tool-section esri-sketch__section" }, h("calcite-action", { disabled: !this._selectEnabled, icon: "pin", onClick: () => this._setSelectionMode(ESelectionType.POINT), scale: "s", text: this._translations.select }), h("calcite-action", { disabled: !this._selectEnabled, icon: "line", onClick: () => this._setSelectionMode(ESelectionType.LINE), scale: "s", text: this._translations.selectLine }), h("calcite-action", { disabled: !this._selectEnabled, icon: "polygon", onClick: () => this._setSelectionMode(ESelectionType.POLY), scale: "s", text: this._translations.selectPolygon }), h("calcite-action", { disabled: !this._selectEnabled, icon: "rectangle", onClick: () => this._setSelectionMode(ESelectionType.RECT), scale: "s", text: this._translations.selectRectangle })), h("div", { class: showUndoRedo + " esri-sketch__tool-section esri-sketch__section" }, h("calcite-action", { disabled: ((_a = this.refineSelectionSet) === null || _a === void 0 ? void 0 : _a.undoStack) ? this.refineSelectionSet.undoStack.length === 0 : true, icon: "undo", onClick: () => this._undo(), scale: "s", text: this._translations.undo }), h("calcite-action", { disabled: ((_b = this.refineSelectionSet) === null || _b === void 0 ? void 0 : _b.redoStack) ? this.refineSelectionSet.redoStack.length === 0 : true, icon: "redo", onClick: () => this._redo(), scale: "s", text: this._translations.redo }))))))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Initialize the graphics layer and skecth view model
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  _init() {
    this._initGraphicsLayer();
    this._initSketchViewModel();
  }
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _initModules() {
    const [GraphicsLayer, SketchViewModel] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/widgets/Sketch/SketchViewModel"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.SketchViewModel = SketchViewModel;
  }
  /**
   * Initialize the skecth view model
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  _initSketchViewModel() {
    this._sketchViewModel = new this.SketchViewModel({
      layer: this._sketchGraphicsLayer,
      defaultUpdateOptions: {
        tool: "reshape",
        toggleToolOnClick: false
      },
      view: this.mapView
    });
    this._sketchViewModel.on("create", (event) => {
      if (event.state === "complete" && this.active) {
        this._featuresCollection = {};
        this._sketchGeometry = event.graphic.geometry;
        void this._selectFeatures(this._sketchGeometry);
      }
    });
  }
  /**
   * Clear any skecth graphics
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  _clear() {
    this._sketchGeometry = null;
    this._sketchViewModel.cancel();
    this._sketchGraphicsLayer.removeAll();
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
      this._sketchGraphicsLayer = new this.GraphicsLayer({ title });
      state.managedLayers.push(title);
      this.mapView.map.layers.add(this._sketchGraphicsLayer);
    }
    if (this.graphics && this.graphics.length > 0) {
      this._sketchGraphicsLayer.addMany(this.graphics);
    }
  }
  /**
   * Clear selection based on map click
   *
   * @protected
   */
  _initHitTest() {
    if (this._hitTestHandle) {
      this._hitTestHandle.remove();
    }
    this._hitTestHandle = this.mapView.on("click", (event) => {
      event.stopPropagation();
      const opts = {
        include: this.layerViews.map(lv => lv.layer)
      };
      void this.mapView.hitTest(event, opts).then((response) => {
        let graphics = [];
        if (response.results.length > 0) {
          graphics = response.results.reduce((prev, cur) => {
            const g = cur === null || cur === void 0 ? void 0 : cur.graphic;
            if (g) {
              prev.push(g);
            }
            return prev;
          }, []);
        }
        this.refineSelectionGraphicsChange.emit({ graphics, useOIDs: false });
        this._clear();
      });
    });
  }
  /**
   * Gets the layer views from the map when the layer selection changes
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _layerSelectionChange(evt) {
    if (Array.isArray(evt.detail) && evt.detail.length > 0) {
      this._selectEnabled = true;
      const layerPromises = evt.detail.map(id => {
        return getMapLayerView(this.mapView, id);
      });
      return Promise.all(layerPromises).then((layerViews) => {
        this.layerViews = layerViews;
      });
    }
    else {
      this._selectEnabled = false;
    }
  }
  /**
   * Store the current selection mode
   *
   * @protected
   */
  _setSelectionMode(mode) {
    this._selectionMode = mode;
    if (this._hitTestHandle) {
      this._hitTestHandle.remove();
    }
    switch (this._selectionMode) {
      case ESelectionType.POINT:
        this._sketchViewModel.create("point");
        //this._initHitTest();
        break;
      case ESelectionType.LINE:
        this._sketchViewModel.create("polyline");
        break;
      case ESelectionType.POLY:
        this._sketchViewModel.create("polygon");
        break;
      case ESelectionType.RECT:
        this._sketchViewModel.create("rectangle");
        break;
    }
  }
  /**
   * Select features based on the input geometry
   *
   * @param geom the geometry used for selection
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _selectFeatures(geom) {
    this.selectionLoadingChange.emit(true);
    const queryFeaturePromises = this.layerViews.map(layerView => {
      this._featuresCollection[layerView.layer.id] = [];
      return queryFeaturesByGeometry(0, layerView.layer, geom, this._featuresCollection);
    });
    return Promise.all(queryFeaturePromises).then(async (response) => {
      this.selectionLoadingChange.emit(false);
      let graphics = [];
      response.forEach(r => {
        Object.keys(r).forEach(k => {
          graphics = graphics.concat(r[k]);
        });
      });
      if (this.refineMode === ERefineMode.SUBSET) {
        this.refineSelectionGraphicsChange.emit({
          graphics,
          useOIDs: this.layerViews[0].layer.title === this.layerView.layer.title
        });
      }
      else {
        const oids = Array.isArray(graphics) ? graphics.map(g => { var _a; return g.attributes[(_a = g === null || g === void 0 ? void 0 : g.layer) === null || _a === void 0 ? void 0 : _a.objectIdField]; }) : [];
        await this._updateIds(oids, this.mode, this.refineSelectionSet.undoStack, this.mode);
      }
      this._clear();
    });
  }
  /**
   * Highlight any selected features in the map
   *
   * @returns Promise resolving when function is done
   * @protected
   */
  async _highlightFeatures(ids, updateExtent = false) {
    this._clearHighlight();
    if (ids.length > 0) {
      state.highlightHandle = await highlightFeatures(ids, this.layerViews[0], this.mapView, updateExtent);
    }
  }
  /**
   * Clear any highlighted features in the map
   *
   * @protected
   */
  _clearHighlight() {
    var _a;
    (_a = state.highlightHandle) === null || _a === void 0 ? void 0 : _a.remove();
  }
  /**
   * Update the ids for any ADD or REMOVE operation and highlight the features.
   *
   * @param oids the ids to add or remove
   * @param mode ADD or REMOVE this will control if the ids are added or removed
   * @param operationStack the undo or redo stack to push the operation to
   * @param operationMode ADD or REMOVE the mode of the individual refine operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _updateIds(oids, mode, operationStack, operationMode) {
    const idUpdates = { addIds: [], removeIds: [] };
    if (mode === ESelectionMode.ADD) {
      idUpdates.addIds = oids.filter(id => this.ids.indexOf(id) < 0);
      this.ids = [...this.ids, ...idUpdates.addIds];
      if (idUpdates.addIds.length > 0) {
        operationStack.push({ mode: operationMode, ids: idUpdates.addIds });
      }
    }
    else {
      idUpdates.removeIds = oids.filter(id => this.ids.indexOf(id) > -1);
      this.ids = this.ids.filter(id => idUpdates.removeIds.indexOf(id) < 0);
      if (idUpdates.removeIds.length > 0) {
        operationStack.push({ mode: operationMode, ids: idUpdates.removeIds });
      }
    }
    await this._highlightFeatures(this.ids).then(() => {
      this.refineSelectionIdsChange.emit(idUpdates);
    });
  }
  /**
   * Undo the most current ADD or REMOVE operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  _undo() {
    const undoOp = this.refineSelectionSet.undoStack.pop();
    void this._updateIds(undoOp.ids, undoOp.mode === ESelectionMode.ADD ? ESelectionMode.REMOVE : ESelectionMode.ADD, this.refineSelectionSet.redoStack, undoOp.mode);
  }
  /**
   * Redo the most current ADD or REMOVE operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  _redo() {
    const redoOp = this.refineSelectionSet.redoStack.pop();
    void this._updateIds(redoOp.ids, redoOp.mode, this.refineSelectionSet.undoStack, redoOp.mode);
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
  static get is() { return "refine-selection-tools"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["refine-selection-tools.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["refine-selection-tools.css"]
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
      "enabledLayerIds": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "string[]: Optional list of enabled layer ids\r\n If empty all layers will be available"
        },
        "defaultValue": "[]"
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
      "ids": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "number[]",
          "resolved": "number[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "number: The oids of the selected features"
        },
        "defaultValue": "[]"
      },
      "layerView": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.FeatureLayerView",
          "resolved": "FeatureLayerView",
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
          "text": "esri/views/layers/LayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-LayerView.html"
        }
      },
      "layerViews": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "__esri.FeatureLayerView[]",
          "resolved": "FeatureLayerView[]",
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
          "text": "esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html"
        },
        "defaultValue": "[]"
      },
      "mapView": {
        "type": "unknown",
        "mutable": false,
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
      "mode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ESelectionMode",
          "resolved": "ESelectionMode.ADD | ESelectionMode.REMOVE",
          "references": {
            "ESelectionMode": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "utils/interfaces/ESelectionMode: ADD, REMOVE"
        },
        "attribute": "mode",
        "reflect": false
      },
      "refineMode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ERefineMode",
          "resolved": "ERefineMode.ALL | ERefineMode.SUBSET",
          "references": {
            "ERefineMode": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "utils/interfaces/ERefineMode: ALL, SUBSET"
        },
        "attribute": "refine-mode",
        "reflect": false
      },
      "refineSelectionSet": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "ISelectionSet",
          "resolved": "ISelectionSet",
          "references": {
            "ISelectionSet": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "utils/interfaces/ISelectionSet: Refine selection set"
        }
      },
      "useLayerPicker": {
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
          "text": "boolean: Used to control the visibility of the layer picker"
        },
        "attribute": "use-layer-picker",
        "reflect": false,
        "defaultValue": "true"
      }
    };
  }
  static get states() {
    return {
      "_selectEnabled": {},
      "_selectionMode": {},
      "_translations": {}
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
        "method": "refineSelectionGraphicsChange",
        "name": "refineSelectionGraphicsChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted on demand when selection graphics change."
        },
        "complexType": {
          "original": "IRefineSelectionEvent",
          "resolved": "IRefineSelectionEvent",
          "references": {
            "IRefineSelectionEvent": {
              "location": "import",
              "path": "../../utils/interfaces"
            }
          }
        }
      }, {
        "method": "refineSelectionIdsChange",
        "name": "refineSelectionIdsChange",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted on demand when selection ids change"
        },
        "complexType": {
          "original": "{ addIds: any[]; removeIds: any[]; }",
          "resolved": "{ addIds: any[]; removeIds: any[]; }",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "reset": {
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
          "text": "Reset the ids collection",
          "tags": [{
              "name": "returns",
              "text": "Promise when complete"
            }]
        }
      },
      "clearHighlight": {
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
          "text": "Clear current highlight handle",
          "tags": [{
              "name": "returns",
              "text": "Promise when complete"
            }]
        }
      }
    };
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "ids",
        "methodName": "idsWatchHandler"
      }];
  }
}