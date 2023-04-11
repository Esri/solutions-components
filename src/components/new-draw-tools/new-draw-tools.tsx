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
import { EDrawToolsMode, ESelectionType, EWorkflowType, ISketchGraphicsChange } from "../../utils/interfaces";
import { loadModules } from "../../utils/loadModules";
import { getMapLayerView } from "../../utils/mapViewUtils";
import { queryFeaturesByGeometry } from "../../utils/queryUtils";
import state from "../../utils/publicNotificationStore";
import NewDrawTools_T9n from "../../assets/t9n/new-draw-tools/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";

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

  protected Sketch: typeof import("esri/widgets/Sketch");

  protected _sketchGraphicsLayer: __esri.GraphicsLayer;

  protected _sketchViewModel: __esri.SketchViewModel;

  //REFINE/////////////////////////////////////////////////////
  protected _featuresCollection: { [key: string]: __esri.Graphic[] } = {};

  protected _sketchGeometry: __esri.Geometry;

  protected _sketchWidget: __esri.Sketch;
  //REFINE/////////////////////////////////////////////////////

  /**
   * The container element for the sketch widget
   */
  protected _sketchElement: HTMLElement;

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

  @Event() sketchGraphicsChange: EventEmitter<ISketchGraphicsChange>;

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
          <div class="border">
            <div ref={(el) => { this._sketchElement = el }} />
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
    const [GraphicsLayer, Sketch, SketchViewModel] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/widgets/Sketch",
      "esri/widgets/Sketch/SketchViewModel"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.Sketch = Sketch;
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
    if (this.mapView && this._sketchElement) {
      this._initGraphicsLayer();
      this._initSketch();
    }
  }

  protected _initSketch(): void {
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
    this

    this._sketchViewModel = new this.SketchViewModel({
      view: this.mapView,
      layer: this._sketchGraphicsLayer
    });

    this._sketchWidget.viewModel.polylineSymbol = this.polylineSymbol;
    this._sketchWidget.viewModel.pointSymbol = this.pointSymbol;
    this._sketchWidget.viewModel.polygonSymbol = this.polygonSymbol;

    this._sketchWidget.on("create", (evt) => {
      if (evt.state === "complete") {
        if (this.drawToolsMode === EDrawToolsMode.DRAW) {
          this.graphics = [evt.graphic];
          this.sketchGraphicsChange.emit({
            graphics: this.graphics,
            useOIDs: false,
            type: EWorkflowType.SKETCH
          });
        } else {
          if (this.active) {
            this._featuresCollection = {};
            this._sketchGeometry = evt.graphic.geometry;
            void this._selectFeatures(this._sketchGeometry);
          }
        }
      }
    });

    this._sketchWidget.on("update", (evt) => {
      const eventType = evt?.toolEventInfo?.type;
      if (eventType === "reshape-stop" || eventType === "move-stop") {
        this.graphics = this.drawToolsMode === EDrawToolsMode.REFINE ? this.graphics.map(g => {
          // can only modify one at a time so safe to only check the first
          const evtGraphic = evt.graphics[0];
          // TODO THIS would need to be captured from the layer
          return (g?.attributes?.OBJECTID === evtGraphic?.attributes?.OBJECTID) ?
            evtGraphic : g;
        }) : evt.graphics;
        this.sketchGraphicsChange.emit({
          graphics: this.graphics,
          useOIDs: false,
          type: EWorkflowType.SKETCH
        });
      }
    });

    this._sketchWidget.on("delete", () => {
      this.graphics = [];
      this.sketchGraphicsChange.emit({
        graphics: this.graphics,
        useOIDs: false,
        type: EWorkflowType.SKETCH
      });
    });

    this._sketchWidget.on("undo", (evt) => {
      this.graphics = evt.graphics;
      this.sketchGraphicsChange.emit({
        graphics: this.graphics,
        useOIDs: false,
        type: EWorkflowType.SKETCH
      });
    });

    this._sketchWidget.on("redo", (evt) => {
      this.graphics = evt.graphics;
      this.sketchGraphicsChange.emit({
        graphics: this.graphics,
        useOIDs: false,
        type: EWorkflowType.SKETCH
      });
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

      let hasOID = false;

      graphics.forEach((g: __esri.Graphic) => {
        const geom = g.geometry;
        g.symbol = geom.type === "point" ?
          this._sketchWidget.viewModel.pointSymbol : geom.type === "polyline" ?
            this._sketchWidget.viewModel.polylineSymbol : geom.type === "polygon" ?
              this._sketchWidget.viewModel.polygonSymbol : undefined;
        hasOID = g?.layer?.hasOwnProperty("objectIdField") || g.hasOwnProperty("getObjectId");
      });
      this.graphics = graphics;

      // OIDs are used when the addressee layer and the current "use layer features" layer are the same
      const useOIDs = (this.layerViews[0].layer.title === this.layerView.layer.title) && hasOID;
      this.sketchGraphicsChange.emit({
        graphics,
        useOIDs,
        type: EWorkflowType.SELECT
      });
    });
  }

  protected _clear(): void {
    this._sketchGeometry = null;
    this._sketchWidget.viewModel.cancel();
    this._sketchGraphicsLayer.removeAll();
  }

  protected _clearSketch(): void {
    this.graphics = [];
    this._sketchGraphicsLayer?.removeAll();
  }
}
