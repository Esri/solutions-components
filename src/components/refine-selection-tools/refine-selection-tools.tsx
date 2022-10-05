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

import { Component, Element, Event, EventEmitter, Host, h, Method, Prop, State, VNode, Watch } from '@stencil/core';
import { ERefineMode, ESelectionMode, ESelectionType } from '../../utils/interfaces';
import { getMapLayerView, highlightFeatures } from '../../utils/mapViewUtils';
import state from "../../utils/publicNotificationStore";
import { loadModules } from "../../utils/loadModules";
import RefineSelectionTools_T9n from '../../assets/t9n/refine-selection-tools/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'refine-selection-tools',
  styleUrl: 'refine-selection-tools.css',
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
   * utils/interfaces/ESelectionMode: ADD, REMOVE
   */
  @Prop() mode: ESelectionMode;

  /**
   * utils/interfaces/ERefineMode: ALL, SUBSET
   */
  @Prop() refineMode: ERefineMode;

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * esri/views/layers/LayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-LayerView.html
   */
  @Prop() layerView: __esri.FeatureLayerView;

  /**
   * number: The oids of the selected features
   */
  @Prop() ids: number[] = [];

  /**
   * boolean: Used to control the visibility of the layer picker
   */
  @Prop() useLayerPicker = true;

  /**
   * esri/Graphic: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
   */
  @Prop({ mutable: true }) graphics: __esri.Graphic[];

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  @Prop() layerViews: __esri.FeatureLayerView[] = [];

  /**
   * boolean: Optionally draw a border around the draw tools
   */
  @Prop() border = false;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: Is selected enabled
   */
  @State() selectEnabled = false;

  /**
   * utils/interfaces/ESelectionType: POINT, LINE, POLY, RECT
   */
  @State() selectionMode: ESelectionType;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof RefineSelectionTools_T9n;

  protected _excludeEffect = "blur(5px) grayscale(90%) opacity(40%)";

  protected _sketchGraphicsLayer: __esri.GraphicsLayer;

  protected GraphicsLayer: typeof __esri.GraphicsLayer;

  protected SketchViewModel: typeof __esri.SketchViewModel;

  protected _sketchViewModel: __esri.SketchViewModel;

  protected _sketchGeometry: __esri.Geometry;

  protected _hitTestHandle: __esri.Handle;

  protected aaa: any = {};

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  @Watch('ids')
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

  @Method()
  async reset(): Promise<void> {
    this.ids = [];
  }

  @Method()
  async clearHighlight(): Promise<void> {
    this._clearHighlight();
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  @Event() refineSelectionGraphicsChange: EventEmitter<any[]>;

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

  disconnectedCallback(): void {
    this.active = false;
  }

  connectedCallback(): void {
    this.active = true;
    if (this.ids.length > 0) {
      this.selectEnabled = true;
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
            <div class={"esri-sketch esri-widget"}>
              <div class={"esri-sketch__panel"}>
                <div class={"esri-sketch__tool-section esri-sketch__section"}>
                  <calcite-action
                    disabled={!this.selectEnabled}
                    icon="select"
                    onClick={() => this._setSelectionMode(ESelectionType.POINT)}
                    scale="s"
                    text={this._translations.select}
                  />
                </div>
                <div class={"esri-sketch__tool-section esri-sketch__section"}>
                  <calcite-action
                    disabled={!this.selectEnabled}
                    icon="line"
                    onClick={() => this._setSelectionMode(ESelectionType.LINE)}
                    scale="s"
                    text={this._translations.selectLine}
                  />
                  <calcite-action
                    disabled={!this.selectEnabled}
                    icon="polygon"
                    onClick={() => this._setSelectionMode(ESelectionType.POLY)}
                    scale="s"
                    text={this._translations.selectPolygon}
                  />
                  <calcite-action
                    disabled={!this.selectEnabled}
                    icon="rectangle"
                    onClick={() => this._setSelectionMode(ESelectionType.RECT)}
                    scale="s"
                    text={this._translations.selectRectangle}
                  />
                </div>
                <div class={"esri-sketch__tool-section esri-sketch__section"}>
                  <calcite-action
                    disabled={!this.selectEnabled}
                    icon="undo"
                    onClick={() => this._undo()}
                    scale="s"
                    text={this._translations.undo}
                  />
                  <calcite-action
                    disabled={!this.selectEnabled}
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
        this.aaa = {};
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
      this.selectEnabled = true;
      const layerPromises = evt.detail.map(title => {
        return getMapLayerView(this.mapView, title)
      });

     return Promise.all(layerPromises).then((layerViews) => {
        this.layerViews = layerViews;
      });
    } else {
      this.selectEnabled = false;
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
    this.selectionMode = mode;

    if (this._hitTestHandle) {
      this._hitTestHandle.remove();
    }

    switch (this.selectionMode) {
      case ESelectionType.POINT:
        //this._sketchViewModel.create("point");
        this._initHitTest();
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
    const queryFeaturePromises = this.layerViews.map(l => {
      this.aaa[l.layer.title] = [];
      return this._queryPage(0, l, geom)
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
        } else {
          idUpdates.removeIds = oids.filter(id => this.ids.indexOf(id) > -1);
          this.ids = this.ids.filter(id => idUpdates.removeIds.indexOf(id) < 0);
        }
        void this._highlightFeatures(this.ids).then(() => {
          this.refineSelectionIdsChange.emit(idUpdates);
        });
      }
      this._clear();
    });
  }

  /**
   * Handle queries that need to be paged
   *
   * @param page page query number
   * @param layerView the layer view to query
   * @param geom the geom used for selection
   *
   * @returns Promise resolving when function is done
   * @protected
   */
  protected async _queryPage(
    page: number,
    layerView: __esri.FeatureLayerView,
    geom: __esri.Geometry
  ): Promise<any> {
    const num = layerView.layer.capabilities.query.maxRecordCount;
    const query = {
      start: page,
      num,
      outFields: ["*"],
      returnGeometry: true,
      geometry: geom
    };

    const r = await layerView.queryFeatures(query);
    this.aaa[layerView.layer.title] = this.aaa[layerView.layer.title].concat(r.features);

    if (r.exceededTransferLimit) {
      return this._queryPage(page += num, layerView, geom)
    }
    return Promise.resolve(this.aaa);
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
      state.highlightHandle = await highlightFeatures(this.mapView, this.layerViews[0], ids, updateExtent);
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

  _undo(): void {
    console.log("UNDO")
  }

  _redo(): void {
    console.log("REDO")
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
