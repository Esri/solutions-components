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

import { Component, Element, Event, EventEmitter, Host, h, Prop, State, VNode, Watch } from "@stencil/core";
import { getMapLayerHash, getMapLayerIds } from "../../utils/mapViewUtils";
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
   * string[]: Optional list of enabled layer ids
   *  If empty all layers will be available
   */
  @Prop() enabledLayerIds: string[] = [];

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  @Prop() placeholderIcon = "";

  /**
   * string[]: list of layer ids that have been selected by the end user
   */
  @Prop({ mutable: true }) selectedLayerIds: string[] = [];

  /**
   * SelectionMode: "single" | "multi"
   *
   * Should the component support selection against a single layer or multiple layers.
   */
  @Prop({ mutable: true, reflect: true }) selectionMode: SelectionMode = "single";

  @Prop() scale: "s" | "m" | "l" = "m";

  @Prop() type: "select" | "combobox" = "select";

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * string[]: list of layer ids from the map
   */
  @State() layerIds: string[] = [];

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
        this.layerSelectionChange.emit([this.layerIds[0]]);
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
    if (this.selectionMode === "single" && (this.layerIds.length > 0 || this.selectedLayerIds.length === 1)) {
      this.layerSelectionChange.emit(
        this.selectedLayerIds.length === 1 ? [this.selectedLayerIds[0]] : [this.layerIds[0]]
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
            {this.selectionMode === "multi" || this.type === "combobox" ? this._getCombobox() : this._getSelect()}
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
   * @returns Calcite Select component with the ids of the layers from the map
   */
  _getSelect(): VNode {
    return (
      <calcite-select
        label=""
        onCalciteSelectChange={(evt) => this._layerSelectionChange(evt)}
        ref={(el) => { this._layerElement = el }}
        scale={this.scale}
      >
        {this._addSelectMapLayersOptions()}
      </calcite-select>
    );
  }

  /**
   * Create a list of layer ids from the map
   *
   * Used for selecting multiple layers
   *
   * @returns Calcite ComboBox component with the ids of the layers from the map
   */
  _getCombobox(): VNode {
    return (
      <calcite-combobox
        label=""
        onCalciteComboboxChange={(evt) => this._layerSelectionChange(evt)}
        placeholder-icon={this.placeholderIcon}
        scale={this.scale}
        selection-mode={this.selectionMode}
      >
        {this._addComboboxMapLayersOptions()}
      </calcite-combobox>
    );
  }

  /**
   * Hydrate a select or combobox component with the ids of the layers in the map
   *
   * @returns Array of ComboBox items or Select options for the ids of the layers
   */
  _addSelectMapLayersOptions(): VNode[] {
    return this.layerIds.reduce((prev, cur) => {
      if (state.managedLayers.indexOf(state.layerNameHash[cur]) < 0 && (this.enabledLayerIds.length > 0 ? this.enabledLayerIds.indexOf(cur) > -1 : true)) {
        prev.push(
          this.selectedLayerIds.indexOf(cur) > -1 ?
            (<calcite-option label={state.layerNameHash[cur]} selected={true} value={cur} />) :
            (<calcite-option label={state.layerNameHash[cur]} value={cur} />)
        );
      }
      return prev;
    }, []);
  }

  _addComboboxMapLayersOptions(): VNode[] {
    return this.layerIds.reduce((prev, cur) => {
      if (state.managedLayers.indexOf(state.layerNameHash[cur]) < 0 && (this.enabledLayerIds.length > 0 ? this.enabledLayerIds.indexOf(cur) > -1 : true)) {
        prev.push(
          this.selectedLayerIds.indexOf(cur) > -1 ?
            (<calcite-combobox-item selected textLabel={state.layerNameHash[cur]} value={cur} />) :
            (<calcite-combobox-item textLabel={state.layerNameHash[cur]} value={cur} />)
        );
      }
      return prev;
    }, []);
  }

  /**
   * Fetch the ids of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  async _setLayers(): Promise<void> {
    if (this.mapView) {
      const mapLayerIds = await getMapLayerIds(this.mapView);
      this.layerIds = mapLayerIds.filter(n => this.enabledLayerIds?.length > 0 ? this.enabledLayerIds.indexOf(n) > -1 : true);
      await this._initLayerHashState();
    }
  }

  /**
   * Create a layer id:title hash for layer name display
   *
   * @returns Promise when the operation has completed
   */
  protected async _initLayerHashState(): Promise<void> {
    if (this.mapView) {
      state.layerNameHash = await getMapLayerHash(this.mapView);
    }
  }

  /**
   * Fetch the ids of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  _layerSelectionChange(evt: CustomEvent): void {
    this.selectedLayerIds = this.selectionMode === "single" ?
      [this._layerElement.value] : evt.detail?.selectedItems.map(
        (item: HTMLCalciteComboboxItemElement) => {
          return item.value;
        }
      ) || [];
    this.layerSelectionChange.emit(this.selectedLayerIds);
  }
}
