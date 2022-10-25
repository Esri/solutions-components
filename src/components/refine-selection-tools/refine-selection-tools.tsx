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

import { Component, Element, Event, EventEmitter, Host, h, Method, Prop, State, VNode, Watch } from "@stencil/core";
import { ERefineMode, ESelectionMode, ESelectionType } from "../../utils/interfaces";
import { getMapLayerView, highlightFeatures } from "../../utils/mapViewUtils";
import { queryFeaturesByGeometry } from "../../utils/queryUtils";
import state from "../../utils/publicNotificationStore";
import { loadModules } from "../../utils/loadModules";
import RefineSelectionTools_T9n from "../../assets/t9n/refine-selection-tools/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";

@Component({
  tag: "refine-selection-tools",
  styleUrl: "refine-selection-tools.css",
  shadow: true,
})
export class RefineSelectionTools {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLRefineSelectionToolsElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: sketch is used by multiple components...need a way to know who should respond...
   */
  @Prop() active = false;

  /**
   * boolean: Optionally draw a border around the draw tools
   */
  @Prop() border = false;

  /**
   * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  @Prop({ mutable: true }) graphics: __esri.Graphic[];

  /**
   * number: The oids of the selected features
   */
  @Prop() ids: number[] = [];

  /**
   * esri/views/layers/LayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-LayerView.html
   */
  @Prop() layerView: __esri.FeatureLayerView;

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  @Prop() layerViews: __esri.FeatureLayerView[] = [];

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * utils/interfaces/ESelectionMode: ADD, REMOVE
   */
  @Prop() mode: ESelectionMode;

  /**
   * utils/interfaces/ERefineMode: ALL, SUBSET
   */
  @Prop() refineMode: ERefineMode;

  /**
   * boolean: Used to control the visibility of the layer picker
   */
  @Prop() useLayerPicker = true;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: Is selected enabled
   */
  @State() _selectEnabled = false;

  /**
   * utils/interfaces/ESelectionType: POINT, LINE, POLY, RECT
   */
  @State() _selectionMode: ESelectionType;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof RefineSelectionTools_T9n;

  /**
   * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
   * The graphics layer constructor
   */
  protected GraphicsLayer: typeof __esri.GraphicsLayer;

  /**
   * esri/widgets/Sketch/SketchViewModel: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Sketch-SketchViewModel.html
   * The sketch view model constructor
   */
  protected SketchViewModel: typeof __esri.SketchViewModel;

  /**
   * {<layer title>: Graphic[]}: Collection of graphics returned from queries to the layer
   */
  protected _featuresCollection: {[key: string]: __esri.Graphic[]} = {};

  /**
   * esri/core/Handles: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Handles.html#Handle
   */
  protected _hitTestHandle: __esri.Handle;

  /**
   * esri/geometry/Geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Geometry.html
   */
  protected _sketchGeometry: __esri.Geometry;

  /**
   * esri/layers/GraphicsLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GraphicsLayer.html
   * The graphics layer used to show selections.
   */
  protected _sketchGraphicsLayer: __esri.GraphicsLayer;

  /**
   * esri/widgets/Sketch/SketchViewModel: The html element for selecting buffer unit
   * The sketch view model used to create graphics
   */
  protected _sketchViewModel: __esri.SketchViewModel;

  protected _undoStack = [];

  protected _redoStack = [];

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Called each time the ids prop is changed.
   * Highlight the features based on the provided ids
   */
  @Watch("ids")
  idsWatchHandler(v: any, oldV: any): void {
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
  @Method()
  async reset(): Promise<void> {
    this.ids = [];
  }

  /**
   * Clear current highlight handle
   *
   * @returns Promise when complete
   */
  @Method()
  async clearHighlight(): Promise<void> {
    this._clearHighlight();
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted on demand when selection graphics change.
   */
  @Event() refineSelectionGraphicsChange: EventEmitter<any[]>;

  /**
   * Emitted on demand when selection ids change
   */
  @Event() refineSelectionIdsChange: EventEmitter<{ addIds: any[]; removeIds: any[]; }>;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    await this._initModules();
  }

  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  componentDidLoad(): void {
    this._init();
  }

  /**
   * StencilJS: Called every time the component is disconnected from the DOM, ie,
   * it can be dispatched more than once, DO not confuse with a "onDestroy" kind of event.
   */
  disconnectedCallback(): void {
    this.active = false;
  }

  /**
   * Called every time the component is connected to the DOM.
   * When the component is first connected, this method is called before componentWillLoad.
   */
  connectedCallback(): void {
    this.active = true;
    if (this.ids.length > 0) {
      this._selectEnabled = true;
      void this._highlightFeatures(this.ids);
    }
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    const showLayerPickerClass = this.useLayerPicker ? "div-visible" : "div-not-visible";
    const drawClass = this.border ? " border" : "";
    return (
      <Host>
        <div>
          <div class={"main-label " + showLayerPickerClass}>
            <calcite-label>{this._translations.selectLayers}</calcite-label>
          </div>
          <map-layer-picker
            class={showLayerPickerClass}
            mapView={this.mapView}
            onLayerSelectionChange={(evt) => { void this._layerSelectionChange(evt) }}
            selectedLayers={this.layerViews.map(l => l.layer.title)}
            selectionMode={"single"}
          />
          <div class={"margin-top-1" + drawClass}>
            <div class="esri-sketch esri-widget">
              <div class="esri-sketch__panel">
                <div class="esri-sketch__tool-section esri-sketch__section">
                  <calcite-action
                    disabled={!this._selectEnabled}
                    icon="select"
                    onClick={() => this._setSelectionMode(ESelectionType.POINT)}
                    scale="s"
                    text={this._translations.select}
                  />
                </div>
                <div class="esri-sketch__tool-section esri-sketch__section">
                  <calcite-action
                    disabled={!this._selectEnabled}
                    icon="line"
                    onClick={() => this._setSelectionMode(ESelectionType.LINE)}
                    scale="s"
                    text={this._translations.selectLine}
                  />
                  <calcite-action
                    disabled={!this._selectEnabled}
                    icon="polygon"
                    onClick={() => this._setSelectionMode(ESelectionType.POLY)}
                    scale="s"
                    text={this._translations.selectPolygon}
                  />
                  <calcite-action
                    disabled={!this._selectEnabled}
                    icon="rectangle"
                    onClick={() => this._setSelectionMode(ESelectionType.RECT)}
                    scale="s"
                    text={this._translations.selectRectangle}
                  />
                </div>
                <div class="esri-sketch__tool-section esri-sketch__section">
                  <calcite-action
                    disabled={this._undoStack.length === 0}
                    icon="undo"
                    onClick={() => this._undo()}
                    scale="s"
                    text={this._translations.undo}
                  />
                  <calcite-action
                    disabled={this._redoStack.length === 0}
                    icon="redo"
                    onClick={() => this._redo()}
                    scale="s"
                    text={this._translations.redo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
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
   protected async _initModules(): Promise<void> {
    const [GraphicsLayer, SketchViewModel]: [
      __esri.GraphicsLayerConstructor,
      __esri.SketchViewModelConstructor
    ] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/widgets/Sketch/SketchViewModel"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.SketchViewModel = SketchViewModel;
  }

  /**
   * Initialize the graphics layer and skecth view model
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  protected _init(): void {
    this._initGraphicsLayer();
    this._initSketchViewModel();
  }

  /**
   * Initialize the skecth view model
   *
   * @returns Promise when the operation has completed
   * @protected
   */
  protected _initSketchViewModel(): void {
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
  protected _clear(): void {
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
  protected _initGraphicsLayer(): void {
    const title = this._translations.sketchLayer;
    const sketchIndex = this.mapView.map.layers.findIndex((l) => l.title === title);
    if (sketchIndex > -1) {
      this._sketchGraphicsLayer = this.mapView.map.layers.getItemAt(sketchIndex) as __esri.GraphicsLayer;
    } else {
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
  protected _initHitTest(): void {
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
            const g = (cur as any)?.graphic;
            if (g) {
              prev.push(g);
            }
            return prev;
          }, []);
        }
        this.refineSelectionGraphicsChange.emit(graphics);
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
  protected async _layerSelectionChange(
    evt: CustomEvent
  ): Promise<void> {
    if (Array.isArray(evt.detail) && evt.detail.length > 0) {
      this._selectEnabled = true;
      const layerPromises = evt.detail.map(title => {
        return getMapLayerView(this.mapView, title)
      });

     return Promise.all(layerPromises).then((layerViews) => {
        this.layerViews = layerViews;
      });
    } else {
      this._selectEnabled = false;
    }
  }

  /**
   * Store the current selection mode
   *
   * @protected
   */
  protected _setSelectionMode(
    mode: ESelectionType
  ): void {
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
  protected async _selectFeatures(
    geom: __esri.Geometry
  ): Promise<void> {
    const queryFeaturePromises = this.layerViews.map(layerView => {
      this._featuresCollection[layerView.layer.title] = [];
      return queryFeaturesByGeometry(0, layerView.layer, geom, this._featuresCollection)
    });

    return Promise.all(queryFeaturePromises).then(response => {
      let graphics = [];
      response.forEach(r => {
        Object.keys(r).forEach(k => {
          graphics = graphics.concat(r[k]);
        })
      });

      if (this.refineMode === ERefineMode.SUBSET) {
        this.refineSelectionGraphicsChange.emit(graphics);
      } else {
        const oids = Array.isArray(graphics) ? graphics.map(g => g.attributes[g?.layer?.objectIdField]) : [];
        const idUpdates = { addIds: [], removeIds: [] };
        if (this.mode === ESelectionMode.ADD) {
          idUpdates.addIds = oids.filter(id => this.ids.indexOf(id) < 0);
          this.ids = [...this.ids, ...idUpdates.addIds];
          this._undoStack.push({type: "add", ids: idUpdates.addIds});
        } else {
          idUpdates.removeIds = oids.filter(id => this.ids.indexOf(id) > -1);
          this.ids = this.ids.filter(id => idUpdates.removeIds.indexOf(id) < 0);
          this._undoStack.push({type: "remove", ids: idUpdates.removeIds});
        }
        void this._highlightFeatures(this.ids).then(() => {
          this.refineSelectionIdsChange.emit(idUpdates);
        });
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
  protected async _highlightFeatures(
    ids: number[],
    updateExtent = false
  ): Promise<void> {
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
  protected _clearHighlight(): void {
    state.highlightHandle?.remove();
  }

  async _undo(): Promise<void> {
    const toUndo = this._undoStack.pop();

    const idUpdates = { addIds: [], removeIds: [] };

    if (toUndo.type === "add") {
      this.ids = this.ids.filter(id => toUndo.ids.indexOf(id) < 0);
      idUpdates.removeIds = toUndo.ids;
    } else {
      this.ids = [...this.ids, ...toUndo.ids];
      idUpdates.addIds = toUndo.ids;
    }

    this._redoStack.push(toUndo);

    await this._highlightFeatures(this.ids).then(() => {
      this.refineSelectionIdsChange.emit(idUpdates);
    });
  }

  async _redo(): Promise<void> {
    const toRedo = this._redoStack.pop();
    const idUpdates = { addIds: [], removeIds: [] };

    if (toRedo.type === "add") {
      this.ids = [...this.ids, ...toRedo.ids];
      idUpdates.addIds = toRedo.ids;
    } else {
      this.ids = this.ids.filter(id => toRedo.ids.indexOf(id) < 0);
      idUpdates.removeIds = toRedo.ids;
    }

    this._undoStack.push(toRedo);

    await this._highlightFeatures(this.ids).then(() => {
      this.refineSelectionIdsChange.emit(idUpdates);
    });
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof RefineSelectionTools_T9n;
  }
}
