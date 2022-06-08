import { Component, State, Host, Prop, h, Element, Watch } from "@stencil/core";
import { loadModules } from "../../utils/loadModules";

@Component({
  tag: "demo-map",
  styleUrl: "demo-map.css",
  shadow: false 
})
export class DemoMap {

  @Element() hostElement: HTMLElement;

  @Prop({ mutable: true, reflect: true }) webmapid: string;

  @Watch('webmapid')
  webMapIdWatchHandler(v: any, oldV: any): void {
    if (v && v !== oldV) {
      this._init();
    }
  }

  @Prop({ mutable: true, reflect: true }) zoom = 4;

  @State() mapCenter: [number, number] = [-107, 38.9];

  protected Map: typeof __esri.Map;
  
  protected MapView: typeof __esri.MapView;

  protected WebMap: typeof __esri.WebMap;

  protected map: __esri.Map;

  protected mapView: __esri.MapView;

  private _mapDiv: HTMLDivElement;

  async componentWillLoad() {
    await this._initModules();
  }
  
  componentDidLoad() {
    this._init();
  }

  render() {
    return (
      <Host>
        <div class="map-display">
          <div ref={(el) => { this._mapDiv = el }} />
        </div>
      </Host>
    )
  }

  async _initModules(): Promise<void> {
    const [Map, MapView, WebMap]: [
      __esri.MapConstructor,
      __esri.MapViewConstructor,
      __esri.WebMapConstructor
    ] = await loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/WebMap"
    ]);
    this.Map = Map;
    this.MapView = MapView;
    this.WebMap = WebMap;
  }

  _init(): void {
    this._initMap();
    this.initMapView();
  }

  _initMap(): void {
    this.map = new this.Map({
      basemap: "topo-vector"
    });
  }

  initMapView(): void {
    const mapOptions: __esri.MapViewProperties = { 
      container: this._mapDiv 
    };

    // Check how the map is initally set
    // TODO add regex to validate its an itemid
    mapOptions.map = this.webmapid ? new this.WebMap({
      portalItem: {
        id: this.webmapid
      }
    }) : this.map;
    
    if (this.mapCenter && this.zoom) {
      mapOptions.center = this.mapCenter;
      mapOptions.zoom = this.zoom;
    }

    this.mapView = new this.MapView(mapOptions);
  }
}
