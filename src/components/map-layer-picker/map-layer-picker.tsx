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

import { Component, Element, Event, EventEmitter, Host, h, Prop } from '@stencil/core';
import { getMapLayerNames } from '../../utils/mapViewUtils';

@Component({
  tag: 'map-layer-picker',
  styleUrl: 'map-layer-picker.css',
  shadow: false,
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
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  @Prop({ mutable: true }) layerNames: string[] = [];

  @Event() layerSelectionChange: EventEmitter;

  async componentDidLoad() {
    await this._setLayers();
  }

  render() {
    return (
      <Host>
        <div class="padding-bottom-1">
          <calcite-label>Addressee Layer
            <calcite-combobox label="Addressee Layer"
              onCalciteComboboxChange={(evt) => this._layerSelectionChange(evt)}>
              {this._addMapLayers()}
            </calcite-combobox>
          </calcite-label>
        </div>
      </Host>
    );
  }

  _addMapLayers(): any {
    return this.layerNames.map(name => {
      return (<calcite-combobox-item textLabel={name} value={name} />)
    });
  }

  async _setLayers(): Promise<void> {
    if (this.mapView) {
      this.layerNames = await getMapLayerNames(this.mapView);
    }
  }

  _layerSelectionChange(evt: CustomEvent): void {
    const layerNames = evt.detail.selectedItems ? evt.detail.selectedItems.map(
      (item: HTMLCalciteComboboxItemElement) => {
        return item.value;
      }
    ) : [];
    this.layerSelectionChange.emit(layerNames)
  }
}
