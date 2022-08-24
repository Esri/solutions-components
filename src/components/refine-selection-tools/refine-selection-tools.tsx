import { Component, Element, Event, EventEmitter, Host, h, Method, Prop, Watch } from '@stencil/core';
import { ERefineMode, ESelectionMode, ESelectionType } from '../../utils/interfaces';
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
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @Prop() translations: any = {};

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * boolean: Is selected enabled
   */
  @Prop() selectEnbaled = false;

  /**
   * utils/interfaces/ESelectionType: POINT, LINE, POLY, RECT
   */
  @Prop() selectionMode: ESelectionType;

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

  //--------------------------------------------------------------------------
  //
  //  Properties (private)
  //
  //--------------------------------------------------------------------------

  protected _excludeEffect = "blur(5px) grayscale(90%) opacity(40%)";

  protected _sketchGraphicsLayer: __esri.GraphicsLayer;

  protected GraphicsLayer: typeof __esri.GraphicsLayer;

  protected SketchViewModel: typeof __esri.SketchViewModel;

  protected _sketchViewModel: __esri.SketchViewModel;

  protected _sketchGeometry: __esri.Geometry;

  protected _hitTestHandle: __esri.Handle;

  protected _highlightHandle: __esri.Handle;

  protected aaa: any = {};

  protected _addIds: number[] = [];

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  @Watch('ids')
  idsWatchHandler(v: any, oldV: any): void {
    if (v && v !== oldV) {
      this._highlightFeatures(v);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  @Method()
  reset() {
    this._addIds = [];
    this.ids = [];
    return Promise.resolve();
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  @Event() refineSelectionGraphicsChange: EventEmitter;

  @Event() refineSelectionIdsChange: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  async componentWillLoad() {
    await this._initModules();
  }

  async componentDidLoad() {
    this._init();
  }

  disconnectedCallback() {
    this.active = false;
    this._clearHighlight();
  }

  connectedCallback() {
    this.active = true;
    if (this.ids.length > 0) {
      this.selectEnbaled = true;
      this._highlightFeatures(this.ids);
    }
  }

  render() {
    const showLayerPickerClass = this.useLayerPicker ? "div-visible" : "div-not-visible";
    return (
      <Host>
        <div>
          <map-layer-picker
            class={showLayerPickerClass}
            label={this.translations?.selectLayers}
            mapView={this.mapView}
            selectedLayers={this.layerViews.map(l => l.layer.title)}
            selectionMode={"single"}
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
                    onClick={() => this._setSelectionMode(ESelectionType.POINT)}
                    scale="s"
                    text={this.translations?.select}
                  />
                </div>
                <div class={"esri-sketch__tool-section esri-sketch__section"}>
                  <calcite-action
                    disabled={!this.selectEnbaled}
                    icon="line"
                    onClick={() => this._setSelectionMode(ESelectionType.LINE)}
                    scale="s"
                    text={this.translations?.selectLine}
                  />
                  <calcite-action
                    disabled={!this.selectEnbaled}
                    icon="polygon"
                    onClick={() => this._setSelectionMode(ESelectionType.POLY)}
                    scale="s"
                    text={this.translations?.selectPolygon}
                  />
                  <calcite-action 
                    disabled={!this.selectEnbaled}
                    icon="rectangle"
                    onClick={() => this._setSelectionMode(ESelectionType.RECT)}
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

  //--------------------------------------------------------------------------
  //
  //  Functions (private)
  //
  //--------------------------------------------------------------------------

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
        this.refineSelectionGraphicsChange.emit(graphics);
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
    mode: ESelectionType
  ) {
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

  _selectFeatures(
    geom: __esri.Geometry
  ) {
    const queryFeaturePromises = this.layerViews.map(l => {
      this.aaa[l.layer.title] = [];
      return this._queryPage(0, l, geom)
    });

    Promise.all(queryFeaturePromises).then(response => {
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
        let idUpdates = { addIds: [], removeIds: [] };
        if (this.mode === ESelectionMode.ADD) {
          this._addIds = this._addIds.concat(oids);
          idUpdates.addIds = this._addIds;
          this.ids = [...new Set([...this.ids, ...idUpdates.addIds])];
        } else {
          this.ids.forEach(id => {
            if (oids.indexOf(id) < 0) {
              console.log('has it...still thinkng ')
            } else {
              idUpdates.removeIds.push(id)
            }
          });
          this.ids = this.ids.filter(id => {
            return idUpdates.removeIds.indexOf(id) < 0;
          });
        }
        this._highlightFeatures(this.ids);
        this.refineSelectionIdsChange.emit(idUpdates);
      }
      this._clear();
    });

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
    ids: number[],
    updateExtent: boolean = false
  ) {
    this._clearHighlight();

    if (ids.length > 0) {
      this._highlightHandle = this.layerViews[0].highlight(ids);

      if (updateExtent) {
        const query = this.layerViews[0].createQuery();
        query.objectIds = this.ids;
        this.layerViews[0].queryExtent(query).then((result) => {
          this.mapView.goTo(result.extent);
        });
      }
    }
  }

  _clearHighlight() {
    if (this._highlightHandle) {
      this._highlightHandle.remove();
    }
  }

  _undo() {
    console.log("UNDO")
  }

  _redo() {
    console.log("REDO")
  }
}
