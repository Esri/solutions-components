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
import { ESelectionType, IRefineSelectionEvent } from "../../utils/interfaces";
import { loadModules } from "../../utils/loadModules";
import { getMapLayerView } from "../../utils/mapViewUtils";
import { queryFeaturesByGeometry } from "../../utils/queryUtils";
import state from "../../utils/publicNotificationStore";
import NewDrawTools_T9n from "../../assets/t9n/new-draw-tools/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";

// NEW
import { EDrawToolsMode } from "../../utils/interfaces";

@Component({
  tag: 'new-draw-tools',
  styleUrl: 'new-draw-tools.css',
  shadow: false,
})
export class NewDrawTools {

  // TODO...currently when you re-open a list it will rerun the selection.
  // The reason I did this was if you removed a feature with refine...this would allow for a possible re-set.
  // Now that you cannot refine seems like we should always just hightlight the ids as it will be faster.

  // TODO now that I think about it more...I don't know that we have any reason to use the viewModel
  // I was thinking at the start it would let us have a better undo-redo workflow...actually...it still may
  // chat with the team on the preference...it needs to either undo-redo operations to a single graphic...
  // or we could retain that as well as individual grapgics that have been added/removed for a single list...
  // so keep using viewModel for now

  // Could drop the layer select from the view model approach...still retain refine-select-tools and just have it do layer select and host the common draw

  @Element() el: HTMLNewDrawToolsElement;

  //NEW///////////////////////////////////////////////////////////
  @Prop() drawToolsMode: EDrawToolsMode;
  //NEW///////////////////////////////////////////////////////////

  @Prop() active = false;

  @Prop({ mutable: true }) graphics: __esri.Graphic[];

  @Prop({ mutable: true }) mapView: __esri.MapView;

  //REFINE/////////////////////////////////////////////////////
  @Prop() enabledLayerIds: string[] = [];

  @Prop() layerView: __esri.FeatureLayerView;

  @Prop() layerViews: __esri.FeatureLayerView[] = [];

  @Prop() useLayerPicker = true;
  //REFINE/////////////////////////////////////////////////////

  //DRAW/////////////////////////////////////////////////////
  // These will be useful if we support user config of the symbols to use...
  @Prop({ mutable: true }) pointSymbol: __esri.SimpleMarkerSymbol;

  @Prop({ mutable: true }) polylineSymbol: __esri.SimpleLineSymbol;

  @Prop({ mutable: true }) polygonSymbol: __esri.SimpleFillSymbol;
  //DRAW/////////////////////////////////////////////////////

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  @State() _translations: typeof NewDrawTools_T9n;

  //REFINE/////////////////////////////////////////////////////
  @State() _selectEnabled = false;

  @State() _selectionMode: ESelectionType;
  //REFINE/////////////////////////////////////////////////////

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  protected GraphicsLayer: typeof import("esri/layers/GraphicsLayer");

  protected SketchViewModel: typeof import("esri/widgets/Sketch/SketchViewModel");

  protected _sketchGraphicsLayer: __esri.GraphicsLayer;

  //REFINE/////////////////////////////////////////////////////
  protected _featuresCollection: { [key: string]: __esri.Graphic[] } = {};

  protected _sketchGeometry: __esri.Geometry;

  protected _sketchViewModel: __esri.SketchViewModel;
  //REFINE/////////////////////////////////////////////////////

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  @Watch("graphics")
  graphicsWatchHandler(v: any, oldV: any): void {
    if (v && v.length > 0 && JSON.stringify(v) !== JSON.stringify(oldV) && this._sketchGraphicsLayer) {
      this._sketchGraphicsLayer.removeAll();
      this._sketchGraphicsLayer.addMany(v);
    }
  }

  @Watch("mapView")
  mapViewWatchHandler(v: any, oldV: any): void {
    if (v && v !== oldV) {
      this._init();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  @Method()
  async clear(): Promise<void> {
    this._clearSketch();
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  @Event() selectionLoadingChange: EventEmitter<boolean>;

  @Event() layerSelectionGraphicsChange: EventEmitter<IRefineSelectionEvent>;

  @Event() sketchGraphicsChange: EventEmitter<__esri.Graphic[]>;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    await this._initModules();
  }

  componentDidLoad(): void {
    this._init();
  }

  render(): VNode {
    const showLayerPickerClass = this.useLayerPicker && this.drawToolsMode !== EDrawToolsMode.DRAW ? "div-visible" : "div-not-visible";

    const undoEnabled = this._sketchViewModel?.canUndo();
    const redoEnabled = this._sketchViewModel?.canRedo();

    return (
      <Host>
        <div>
          <map-layer-picker
            class={showLayerPickerClass}
            enabledLayerIds={this.enabledLayerIds}
            mapView={this.mapView}
            onLayerSelectionChange={(evt) => { void this._layerSelectionChange(evt) }}
            selectedLayerIds={this.layerViews.map(l => l.layer.id)}
            selectionMode={"single"}
          />
          <div class={"margin-top-1 border"}>
            <div class="esri-sketch esri-widget">
              <div class="esri-sketch__panel">
                <div class="esri-sketch__tool-section esri-sketch__section">
                  <calcite-action
                    icon="pin"
                    onClick={() => this._setSelectionMode(ESelectionType.POINT)}
                    scale="s"
                    text={this._translations.select}
                  />
                  <calcite-action
                    icon="line"
                    onClick={() => this._setSelectionMode(ESelectionType.LINE)}
                    scale="s"
                    text={this._translations.selectLine}
                  />
                  <calcite-action
                    icon="polygon"
                    onClick={() => this._setSelectionMode(ESelectionType.POLY)}
                    scale="s"
                    text={this._translations.selectPolygon}
                  />
                  <calcite-action
                    icon="rectangle"
                    onClick={() => this._setSelectionMode(ESelectionType.RECT)}
                    scale="s"
                    text={this._translations.selectRectangle}
                  />
                </div>
                <calcite-action
                  disabled={!undoEnabled}
                  icon="undo"
                  onClick={() => this._undo()}
                  scale="s"
                  text={this._translations.undo}
                />
                <calcite-action
                  disabled={!redoEnabled}
                  icon="redo"
                  onClick={() => this._redo()}
                  scale="s"
                  text={this._translations.redo}
                />
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

  protected async _initModules(): Promise<void> {
    const [GraphicsLayer, SketchViewModel] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/widgets/Sketch/SketchViewModel"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.SketchViewModel = SketchViewModel;
  }

  protected _initGraphicsLayer(): void {
    const title = this._translations.sketchLayer;
    const sketchIndex = this.mapView.map.layers.findIndex((l) => l.title === title);
    if (sketchIndex > -1) {
      this._sketchGraphicsLayer = this.mapView.map.layers.getItemAt(sketchIndex) as __esri.GraphicsLayer;
    } else {
      this._sketchGraphicsLayer = new this.GraphicsLayer({ title, listMode: "hide" });
      state.managedLayers.push(title);
      this.mapView.map.layers.add(this._sketchGraphicsLayer);
    }

    if (this.graphics && this.graphics.length > 0) {
      this._sketchGraphicsLayer.addMany(this.graphics);
    }
  }

  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof NewDrawTools_T9n;
  }

  protected _init(): void {
    this._initGraphicsLayer();
    this._initSketchViewModel();
  }

  protected _initSketchViewModel(): void {
    this._sketchViewModel = new this.SketchViewModel({
      layer: this._sketchGraphicsLayer,
      view: this.mapView,
      defaultUpdateOptions: {
        tool: "reshape",
        toggleToolOnClick: false
      },
      polylineSymbol: this.polylineSymbol,
      pointSymbol: this.pointSymbol,
      polygonSymbol: this.polygonSymbol
    });

    this._sketchViewModel.on("create", (evt) => {
      if (evt.state === "complete") {
        if (this.drawToolsMode === EDrawToolsMode.DRAW) {
          this.graphics = [evt.graphic];
          this.sketchGraphicsChange.emit(this.graphics);
        } else {
          if (this.active) {
            this._featuresCollection = {};
            this._sketchGeometry = evt.graphic.geometry;
            void this._selectFeatures(this._sketchGeometry);
          }
        }
      }
    });

    this._sketchViewModel.on("update", (evt) => {
      const eventType = evt?.toolEventInfo?.type;
      if (eventType === "reshape-stop" || eventType === "move-stop") {
        this.graphics = this.drawToolsMode === EDrawToolsMode.REFINE ? this.graphics.map(g => {
          // can only modify one at a time so safe to only check the first
          const evtGraphic = evt.graphics[0];
          // TODO THIS would need to be captured from the layer
          return (g?.attributes?.OBJECTID === evtGraphic?.attributes?.OBJECTID) ?
            evtGraphic : g;
        }) : evt.graphics;
        this.sketchGraphicsChange.emit(this.graphics);
      }
    });

    this._sketchViewModel.on("undo", (evt) => {
      this.graphics = evt.graphics;
      this.sketchGraphicsChange.emit(this.graphics);
    });

    this._sketchViewModel.on("redo", (evt) => {
      this.graphics = evt.graphics;
      this.sketchGraphicsChange.emit(this.graphics);
    });
  }

  protected async _layerSelectionChange(
    evt: CustomEvent
  ): Promise<void> {
    if (Array.isArray(evt.detail) && evt.detail.length > 0) {
      this._selectEnabled = true;
      const layerPromises = evt.detail.map(id => {
        return getMapLayerView(this.mapView, id)
      });

      return Promise.all(layerPromises).then((layerViews) => {
        this.layerViews = layerViews;
      });
    } else {
      this._selectEnabled = false;
    }
  }

  protected _setSelectionMode(
    mode: ESelectionType
  ): void {
    this._selectionMode = mode;
    switch (this._selectionMode) {
      case ESelectionType.POINT:
        this._sketchViewModel.create("point");
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

  protected async _selectFeatures(
    geom: __esri.Geometry
  ): Promise<void> {
    this.selectionLoadingChange.emit(true);
    const queryFeaturePromises = this.layerViews.map(layerView => {
      this._featuresCollection[layerView.layer.id] = [];
      return queryFeaturesByGeometry(0, layerView.layer, geom, this._featuresCollection)
    });

    return Promise.all(queryFeaturePromises).then(async response => {
      this.selectionLoadingChange.emit(false);
      let graphics = [];
      response.forEach(r => {
        Object.keys(r).forEach(k => {
          graphics = graphics.concat(r[k]);
        })
      });

      this.layerSelectionGraphicsChange.emit({
        graphics,
        useOIDs: this.layerViews[0].layer.title === this.layerView.layer.title
      });

      graphics.forEach((g: __esri.Graphic) => {
        const geom = g.geometry;
        g.symbol = geom.type === "point" ?
          this._sketchViewModel.pointSymbol : geom.type === "polyline" ?
            this._sketchViewModel.polylineSymbol : geom.type === "polygon" ?
              this._sketchViewModel.polygonSymbol : undefined;
      });
      this.graphics = graphics;
    });
  }

  protected _undo(): void {
    this._sketchViewModel.undo();
  }

  protected _redo(): void {
    this._sketchViewModel.redo();
  }

  protected _clear(): void {
    this._sketchGeometry = null;
    this._sketchViewModel.cancel();
    this._sketchGraphicsLayer.removeAll();
  }

  protected _clearSketch(): void {
    this.graphics = [];
    this._sketchGraphicsLayer?.removeAll();
  }
}
