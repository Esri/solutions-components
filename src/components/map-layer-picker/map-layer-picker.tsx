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
  tag: 'map-layer-picker',
  styleUrl: 'map-layer-picker.css',
  shadow: true,
})
export class MapLayerPicker {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLMapLayerPickerElement;

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

  // onComponentDidLoad() {
  //   this.el.
  // }

  render() {
    return (
      <Host>
        <div class="padding-bottom-1">
          <calcite-label>Addressee Layer
            <calcite-combobox label="Addressee Layer">
              {this._addMapLayers()}
            </calcite-combobox>
          </calcite-label>
        </div>
      </Host>
    );
  }

  // shouldn't really do this on every render...
  _addMapLayers(): any {
    return this.mapView.layerViews.length > 0 ? this.mapView.layerViews.map(lv => {
      return (<calcite-combobox-item textLabel={lv.layer.title} value={lv.layer.id} />)
    }) : undefined;
  }
}
