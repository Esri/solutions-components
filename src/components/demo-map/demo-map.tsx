import { Component, State, Host, Prop, h, Element } from "@stencil/core";
import { loadModules } from "esri-loader";

@Component({
  tag: "demo-map",
  styleUrl: "demo-map.css",
  shadow: false 
})
export class DemoMap {

  @Element() hostElement: HTMLElement;

  @Prop({ mutable: true, reflect: true }) webmap: string;

  @Prop({ mutable: true, reflect: true }) zoom = 4;

  @State() mapCenter: [number, number] = [-107, 38.9];
  
  protected esriMapOptions = {
    url: `https://js.arcgis.com/4.23/`
  };

  protected esriMap: __esri.Map;

  protected esriMapView: __esri.MapView;

  private _mapDiv: HTMLDivElement;

  constructor() {
    void loadModules(
      ["esri/Map"],
      this.esriMapOptions
    ).then(
      ([EsriMap]: [
        __esri.MapConstructor
      ]) => {
        this.esriMap = new EsriMap({
          basemap: "topo-vector"
        });
      }
    );
  }

  componentDidLoad() {
    void this.createEsriMapView();
  }

  createEsriMapView(): Promise<any> {
    return loadModules(["esri/WebMap", "esri/views/MapView"], this.esriMapOptions).then(
      ([WebMap, MapView]: [__esri.WebMapConstructor, __esri.MapViewConstructor]) => {
        const mapOptions: __esri.MapViewProperties = { container: this._mapDiv }

        // Check how the map is initally set
        mapOptions.map = this.webmap ? new WebMap({
          portalItem: {
            id: this.webmap
          }
        }) : this.esriMap;
        
        if (this.mapCenter && this.zoom) {
          mapOptions.center = this.mapCenter;
          mapOptions.zoom = this.zoom;
        }
  
        this.esriMapView = new MapView( mapOptions );
      }
    );
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
}
