import { Component, Event, EventEmitter, Host, h, Prop, Watch } from '@stencil/core';
import { ERefineMode, ESelectionMode } from '../../utils/interfaces';
import { getMapLayer } from '../../utils/mapViewUtils';
import state from "../../utils/publicNotificationStore";
import { loadModules } from "../../utils/loadModules";

@Component({
  tag: 'refine-selection-tools',
  styleUrl: 'refine-selection-tools.css',
  shadow: true,
})
export class RefineSelectionTools {

  // sketch is used by multiple components...need a way to know who should respond...
  @Prop() active = false;

  @Prop() mode: ERefineMode;

  @Prop() translations: any = {};

  @Prop() mapView: __esri.MapView;

  @Prop() searchLayers: __esri.Layer[];

  @Prop() selectEnbaled = false;

  @Prop() selectionMode: ESelectionMode;

  @Prop() geometries: __esri.Geometry[] = [];

  @Prop({ mutable: true }) graphics: __esri.Graphic[];

  @Event() refineSelectionChange: EventEmitter;

  protected _excludeEffect = "blur(5px) grayscale(90%) opacity(40%)";

  protected _sketchGraphicsLayer: __esri.GraphicsLayer;

  protected GraphicsLayer: typeof __esri.GraphicsLayer;

  protected SketchViewModel: typeof __esri.SketchViewModel;

  protected _sketchViewModel: __esri.SketchViewModel;

  protected _sketchGeometry: __esri.Geometry;

  @Prop() layers: __esri.Layer[] = [];

  @Watch('layers')
  async watchGeometriesHandler(
    newValue: __esri.Layer[],
    oldValue: __esri.Layer[]
  ) {
    if (newValue !== oldValue) {
      this._initLayerViews();
    }
  }

  protected _layerViews: __esri.FeatureLayerView[] = [];

  protected _hitTestHandle: __esri.Handle;

  protected aaa: any = {};

  async componentWillLoad() {
    await this._initModules();
  }

  async componentDidLoad() {
    this._init();
  }

  render() {
    return (
      <Host>
        <div>
          <map-layer-picker
            label={this.translations?.selectLayers}
            mapView={this.mapView}
            selectedLayers={this.layers.map(l => l.title)}
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
    await this._initLayerViews();
    this._initGraphicsLayer();
    this._initSketchViewModel();
  }

  async _initLayerViews() {
    const layerViewPromises = this.layers.reduce((prev, cur) => {
      if (cur.type === 'feature') {
        prev.push(this.mapView.whenLayerView(cur))
      }
      return prev;
    }, []);
    Promise.all(layerViewPromises).then(results => {
      this._layerViews = results;
    })
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
        include: this.layers
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
        return getMapLayer(this.mapView, title)
      });

      Promise.all(layerPromises).then((layers) => {
        this.layers = layers;
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
    const queryFeaturePromises = this._layerViews.map(l => {
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

  _undo() {
    console.log("UNDO")
  }

  _redo() {
    console.log("REDO")
  }
}
