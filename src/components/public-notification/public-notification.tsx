import { Component, Element, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'public-notification',
  styleUrl: 'public-notification.css',
  shadow: true,
})
export class PublicNotification {
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
  @Prop() mapView: __esri.MapView;

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
        <div>
          <map-search />
          <map-draw-tools />
          <map-search-distance />
          <map-layer-picker />
          <pdf-download />
        </div>
        <slot />
      </Host>
    );
  }

}
