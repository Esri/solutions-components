import { Component, Element, Event, EventEmitter, Host, h, Prop } from '@stencil/core';
import { ERefineMode, ESelectionMode } from '../../utils/interfaces';
import { getMapLayerView } from '../../utils/mapViewUtils';
import state from "../../utils/publicNotificationStore";
import { loadModules } from "../../utils/loadModules";

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

  // sketch is used by multiple components...need a way to know who should respond...
  @Prop() active = false;

  @Prop() mode: ERefineMode;

  @Prop() translations: any = {};

  @Prop() mapView: __esri.MapView;

  @Prop() selectEnbaled = false;

  @Prop() selectionMode: ESelectionMode;

  // TODO this is not needed for building selection sets
  // Still considering if I should do this or emit a different event for Ids
  // I can't seem to get the ids watch to fire...so would need to emit on render and that seems bad
  @Prop() layerView: __esri.FeatureLayerView;

  @Prop() ids: number[] = [];

  @Prop() useLayerPicker = true;

  @Prop({ mutable: true }) graphics: __esri.Graphic[];

  @Event() refineSelectionChange: EventEmitter;

  protected _excludeEffect = "blur(5px) grayscale(90%) opacity(40%)";

  protected _sketchGraphicsLayer: __esri.GraphicsLayer;

  protected GraphicsLayer: typeof __esri.GraphicsLayer;

  protected SketchViewModel: typeof __esri.SketchViewModel;

  protected _sketchViewModel: __esri.SketchViewModel;

  protected _sketchGeometry: __esri.Geometry;

  @Prop() layerViews: __esri.FeatureLayerView[] = [];

  protected _hitTestHandle: __esri.Handle;

  protected aaa: any = {};

  async componentWillLoad() {
    await this._initModules();
  }

  async componentDidLoad() {
    this._init();
  }

  render() {
    if (this.ids.length > 0) {
      this.selectEnbaled = true;
      this._highlightFeatures(this.ids)
    }
    const showLayerPickerClass = this.useLayerPicker ? "div-visible" : "div-not-visible";
    return (
      <Host>
        <div>
          <map-layer-picker
            class={showLayerPickerClass}
            label={this.translations?.selectLayers}
            mapView={this.mapView}
            selectedLayers={this.layerViews.map(l => l.layer.title)}
            selectionMode={"multi"}
            translations={this.translations}
            onLayerSelectionChange={(evt) => { this._layerSelectionChange(evt) }}
          />
          <div>
            <div class={"esri-sketch esri-widget"}>
              <div class={"esri-sketch__panel"}>
                <div class={"esri-sketch__tool-section esri-sketch__section"}>
                  <calcite-action 
                    disabled={!this.selectEnbaled}
                    icon="select"
                    onClick={() => this._setSelectionMode(ESelectionMode.POINT)}
                    scale="s"
                    text={this.translations?.select}
                  />
                </div>
                <div class={"esri-sketch__tool-section esri-sketch__section"}>
                  <calcite-action
                    disabled={!this.selectEnbaled}
                    icon="line"
                    onClick={() => this._setSelectionMode(ESelectionMode.LINE)}
                    scale="s"
                    text={this.translations?.selectLine}
                  />
                  <calcite-action
                    disabled={!this.selectEnbaled}
                    icon="polygon"
                    onClick={() => this._setSelectionMode(ESelectionMode.POLY)}
                    scale="s"
                    text={this.translations?.selectPolygon}
                  />
                  <calcite-action 
                    disabled={!this.selectEnbaled}
                    icon="rectangle"
                    onClick={() => this._setSelectionMode(ESelectionMode.RECT)}
                    scale="s"
                    text={this.translations?.selectRectangle}
                  />
                </div>
                <div class={"esri-sketch__tool-section esri-sketch__section"}>
                  <calcite-action
                    disabled={!this.selectEnbaled}
                    icon="undo"
                    onClick={() => this._undo()}
                    scale="s"
                    text={this.translations?.undo}
                  />
                  <calcite-action
                    disabled={!this.selectEnbaled}
                    icon="redo"
                    onClick={() => this._redo()}
                    scale="s"
                    text={this.translations?.redo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }

  async _initModules(): Promise<void> {
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

  async _init() {
    this._initGraphicsLayer();
    this._initSketchViewModel();
  }

  _initSketchViewModel(): void {
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
        this.refineSelectionChange.emit([]);
        this._sketchGeometry = event.graphic.geometry;
        this._selectFeatures(this._sketchGeometry);
      }
    });
  }

  _clear() {
    this._sketchGeometry = null;
    this._sketchViewModel.cancel();
    this._sketchGraphicsLayer.removeAll();
  }

  _initGraphicsLayer(): void {
    const title = this.translations?.sketchLayer;
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

  _initHitTest() {
    if (this._hitTestHandle) {
      this._hitTestHandle.remove();
    }
    this._hitTestHandle = this.mapView.on("click", (event) => {
      event.stopPropagation();
      const opts = {
        include: this.layerViews.map(lv => lv.layer)
      };
      this.mapView.hitTest(event, opts).then((response) => {
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
        this.refineSelectionChange.emit(graphics);
        this._clear();
      });
    });

  }

  async _layerSelectionChange(evt: CustomEvent) {
    if (Array.isArray(evt.detail) && evt.detail.length > 0) {
      this.selectEnbaled = true;
      const layerPromises = evt.detail.map(title => {
        return getMapLayerView(this.mapView, title)
      });

      Promise.all(layerPromises).then((layerViews) => {
        this.layerViews = layerViews;
      });
    } else {
      this.selectEnbaled = false;
    }
  }

  _setSelectionMode(
    mode: ESelectionMode
  ) {
    this.selectionMode = mode;

    if (this._hitTestHandle) {
      this._hitTestHandle.remove();
    }

    switch (this.selectionMode) {
      case ESelectionMode.POINT:
        //this._sketchViewModel.create("point");
        this._initHitTest();
        break;
      case ESelectionMode.LINE:
        this._sketchViewModel.create("polyline");
        break;
      case ESelectionMode.POLY:
        this._sketchViewModel.create("polygon");
        break;
      case ESelectionMode.RECT:
        this._sketchViewModel.create("rectangle");
        break;
    }
  }

  _selectFeatures(
    geom: __esri.Geometry
  ) {
    const queryFeaturePromises = this.layerViews.map(l => {
      this.aaa[l.layer.title] = [];
      return this._queryPage(0, l, geom)
    })

    Promise.all(queryFeaturePromises).then(response => {
      let graphics = [];
      response.forEach(r => {
        Object.keys(r).forEach(k => {
          graphics = graphics.concat(r[k]);
        })
      })

      this.refineSelectionChange.emit(graphics);
      this._clear();
    })
  }

  async _queryPage(
    page: number,
    layerView: __esri.FeatureLayerView,
    geom: __esri.Geometry
  ) {
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
    return this.aaa;
  }

  _highlightFeatures(
    ids: number[]
  ) {
    this.layerView.highlight(ids);
  }

  _undo() {
    console.log("UNDO")
  }

  _redo() {
    console.log("REDO")
  }
}
