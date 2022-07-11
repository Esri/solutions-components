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

import { Component, Element, Event, EventEmitter, Host, h, Prop, VNode, Watch } from '@stencil/core';
import { getMapLayerNames } from '../../utils/mapViewUtils';
import { ESelectionMode } from '../../utils/interfaces';
import state from '../../utils/publicNotificationStore';

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

  @Watch('mapView')
  async watchStateHandler(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      await this._setLayers();
      if (this.selectionMode === ESelectionMode.SINGLE) {
        this.layerSelectionChange.emit([this.layerNames[0]]);
      }
    }
  }

  async componentWillLoad() {
    await this._setLayers();
    if (this.selectionMode === ESelectionMode.SINGLE && this.layerNames.length > 0) {
      this.layerSelectionChange.emit([this.layerNames[0]]);
    }
  }

  /**
   * Contains the translations for this component.
   */
  @Prop() translations: any = {};

  @Prop({ mutable: true }) layerNames: string[] = [];

  @Prop({ mutable: true, reflect: true }) label = "";

  @Prop({ mutable: true, reflect: true }) selectionMode: ESelectionMode = ESelectionMode.SINGLE;

  @Prop({ mutable: true }) selectedLayers: string[] = [];

  @Event() layerSelectionChange: EventEmitter;

  render() {
    return (
      <Host>
        <div class="background-w">
          <calcite-label>{this.label}
            {this.selectionMode === ESelectionMode.MULTI ? this._getCombobox() : this._getSelect()}
          </calcite-label>
        </div>
      </Host>
    );
  }

  protected _layerSelect: HTMLCalciteSelectElement;

  // Use Select when something should always be selected
  _getSelect(): VNode {
    return (
      <calcite-select
        label=''
        onCalciteSelectChange={(evt) => this._layerSelectionChange(evt)}
        ref={(el) => { this._layerSelect = el }}
      >
        {this._addMapLayersOptions()}
      </calcite-select>
    );
  }

  // Use combbox for multi selection
  _getCombobox(): VNode {
    return (
      <calcite-combobox
        label=''
        onCalciteComboboxChange={(evt) => this._layerSelectionChange(evt)}
        selection-mode={this.selectionMode}
      >
        {this._addMapLayersOptions()}
      </calcite-combobox>
    );
  }

  _addMapLayersOptions(): any {
    return this.layerNames.reduce((prev, cur) => {
      if (state.managedLayers.indexOf(cur) < 0) {
        prev.push(
          this.selectionMode === ESelectionMode.MULTI ?
            (<calcite-combobox-item textLabel={cur} value={cur} />) :
            (<calcite-option label={cur} value={cur} />)
        );
      }
      return prev;
    }, []);
  }

  async _setLayers(): Promise<void> {
    if (this.mapView) {
      this.layerNames = await getMapLayerNames(this.mapView);
    }
  }

  _layerSelectionChange(evt: CustomEvent): void {
    this.selectedLayers = this.selectionMode === ESelectionMode.SINGLE ?
      [this._layerSelect.value] : evt.detail?.selectedItems.map(
        (item: HTMLCalciteComboboxItemElement) => {
          return item.value;
        }
      ) || [];
    this.layerSelectionChange.emit(this.selectedLayers);
  }
}
