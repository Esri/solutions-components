/** @license
 * Copyright 2021 Esri
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

import { Component, Element, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'public-notification',
  styleUrl: 'public-notification.css',
  shadow: false,
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
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  @Prop() selectionLayers: __esri.Layer[];

  render() {
    return (
      <Host>
        <div>
          <map-select-tools mapView={this.mapView} searchLayers={this.selectionLayers}/>
          <map-layer-picker 
            mapView={this.mapView}
            onLayerSelectionChange={(r) => this._layerSelectionChange(r)}
            selectionMode={"single"}
          />
          <pdf-download />
          <config-public-notification class="config-btn" mapView={this.mapView}/>
        </div>
        <slot />
      </Host>
    );
  }

  _layerSelectionChange(evt: CustomEvent): void {
    // Loop through the names and get layers....or have the layer picker emit the layer
    console.log(evt.detail)
  }

}
