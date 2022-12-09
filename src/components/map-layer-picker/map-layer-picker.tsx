/** @license
 * Copyright 2022 Esri
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

import { Component, Element, Event, EventEmitter, Host, h, Prop, VNode, Watch } from "@stencil/core";
import { getMapLayerNames } from "../../utils/mapViewUtils";
import { SelectionMode } from "../../utils/interfaces";
import state from "../../utils/publicNotificationStore";

@Component({
  tag: "map-layer-picker",
  styleUrl: "map-layer-picker.css",
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
   * string[]: list of layer names from the map
   */
  @Prop({ mutable: true }) layerNames: string[] = [];

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * string[]: list of layers that have been selected by the end user
   */
  @Prop({ mutable: true }) selectedLayers: string[] = [];

  /**
   * SelectionMode: "single" | "multi"
   *
   * Should the component support selection against a single layer or multiple layers.
   */
  @Prop({ mutable: true, reflect: true }) selectionMode: SelectionMode = "single";

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * HTMLCalciteSelectElement: The html element for selecting layers
   */
  protected _layerElement: HTMLCalciteSelectElement;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Called each time the mapView prop is changed.
   *
   */
  @Watch("mapView")
  async watchStateHandler(newValue: boolean, oldValue: boolean): Promise<void> {
    if (newValue !== oldValue) {
      await this._setLayers();
      if (this.selectionMode === "single") {
        this.layerSelectionChange.emit([this.layerNames[0]]);
      }
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted on demand when a layer is selected
   *
   */
  @Event() layerSelectionChange: EventEmitter<string[]>;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    await this._setLayers();
    if (this.selectionMode === "single" && (this.layerNames.length > 0 || this.selectedLayers.length === 1)) {
      this.layerSelectionChange.emit(
        this.selectedLayers.length === 1 ? [this.selectedLayers[0]] : [this.layerNames[0]]
      );
    }
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    return (
      <Host>
        <div class="map-layer-picker-container">
          <div class="map-layer-picker">
            {this.selectionMode === "multi" ? this._getCombobox() : this._getSelect()}
          </div>
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Create a list of layers from the map
   *
   * Used for selecting a single layer.
   *
   * @returns Calcite Select component with the names of the layers from the map
   */
  _getSelect(): VNode {
    return (
      <calcite-select
        label=""
        onCalciteSelectChange={(evt) => this._layerSelectionChange(evt)}
        ref={(el) => { this._layerElement = el }}
      >
        {this._addMapLayersOptions()}
      </calcite-select>
    );
  }

  /**
   * Create a list of layers from the map
   *
   * Used for selecting multiple layers
   *
   * @returns Calcite ComboBox component with the names of the layers from the map
   */
  _getCombobox(): VNode {
    return (
      <calcite-combobox
        label=""
        onCalciteComboboxChange={(evt) => this._layerSelectionChange(evt)}
        selection-mode={this.selectionMode}
      >
        {this._addMapLayersOptions()}
      </calcite-combobox>
    );
  }

  /**
   * Hydrate a select or combobox component with the names of the layers in the map
   *
   * @returns Array of ComboBox items or Select options for the names of the layers
   */
  _addMapLayersOptions(): VNode[] {
    return this.layerNames.reduce((prev, cur) => {
      if (state.managedLayers.indexOf(cur) < 0) {
        prev.push(
          this.selectionMode === "multi" && this.selectedLayers.indexOf(cur) > -1 ?
            (<calcite-combobox-item selected textLabel={cur} value={cur} />) :
            this.selectionMode === "multi" ?
              (<calcite-combobox-item textLabel={cur} value={cur} />) :
              this.selectedLayers.indexOf(cur) > -1 ?
              (<calcite-option label={cur} selected={true} value={cur} />) :
              (<calcite-option label={cur} value={cur} />)
        );
      }
      return prev;
    }, []);
  }

  /**
   * Fetch the names of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  async _setLayers(): Promise<void> {
    if (this.mapView) {
      this.layerNames = await getMapLayerNames(this.mapView);
    }
  }

  /**
   * Fetch the names of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  _layerSelectionChange(evt: CustomEvent): void {
    this.selectedLayers = this.selectionMode === "single" ?
      [this._layerElement.value] : evt.detail?.selectedItems.map(
        (item: HTMLCalciteComboboxItemElement) => {
          return item.value;
        }
      ) || [];
    this.layerSelectionChange.emit(this.selectedLayers);
  }
}
