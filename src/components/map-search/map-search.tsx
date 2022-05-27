import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
//import MapView from '@arcgis/core/Map';
import Search from "@arcgis/core/widgets/Search";

@Component({
  tag: 'map-search',
  styleUrl: 'map-search.css',
  shadow: true,
})
export class MapSearch {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLPublicNotificationElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Credentials for requests
   */
  //@Prop({ mutable: true }) authentication: UserSession;

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.SceneView;

  @Watch('mapView')
  mapViewWatchHandler(v: any, oldV: any): void {
    if (v && v !== oldV) {
      const searchWidget = new Search({
        view: this.mapView
      });

      // Add the search widget to the top right corner of the view
      this.mapView.ui.add(searchWidget, {
        position: "top-right"
      });
    }
  }

  /**
   * esri/portal/Portal: https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html
   */
  @Prop() portal: __esri.Portal;

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  render() {
    return (
      <Host>
        <slot/>
      </Host>
    );
  }

}
