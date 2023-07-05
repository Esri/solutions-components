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
   * "transparent" | "solid": controls the button appearance when using the "dropdown" type
   */
  @Prop() appearance: "transparent" | "solid" = "transparent";

  /**
   * string[]: Optional list of enabled layer ids
   *  If empty all layers will be available
   */
  @Prop() enabledLayerIds: string[] = [];

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * string: optional placeholder icon used with "combobox" type
   */
  @Prop() placeholderIcon = "";

  /**
   * string[]: list of layer ids that have been selected by the end user
   */
  @Prop({ mutable: true }) selectedLayerIds: string[] = [];

  /**
   * "s" | "m" | "l": scale to render the component
   */
  @Prop() scale: "s" | "m" | "l" = "m";

  /**
   * "select" | "combobox" | "dropdown": type of component to leverage
   */
  @Prop() type: "select" | "combobox" | "dropdown" = "select";

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * string[]: list of layer ids from the map
   */
  @State() layerIds: string[] = [];

  /**
   * string: lcurrent layer name to display when using "dropdown" type
   */
  @State() selectedLayerName = "";

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * HTMLCalciteSelectElement: The html element for selecting layers
   */
  protected _layerElement: HTMLCalciteSelectElement | HTMLCalciteComboboxElement;

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
  async mapViewWatchHandler(): Promise<void> {
    await this._setLayers();
    this._setSelectedLayer(this.layerIds[0]);
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
    if (this.layerIds.length > 0 || this.selectedLayerIds.length === 1) {
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
            {
              this.type === "combobox" ? this._getCombobox() :
                this.type === "select" ? this._getSelect() : this._getDropdown()
            }
          </div>
        </div>
      </Host>
    );
  }

  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad(): Promise<void> {
    if (this.layerIds.length > 0 || this.selectedLayerIds.length === 1) {
      const id = this.selectedLayerIds.length === 1 ? this.selectedLayerIds[0] : this.layerIds[0];
      if (this.type === "select") {
        this._layerElement.value = id;
      } else if (this.type === "dropdown") {
        this.selectedLayerName = state.layerNameHash[id];
      }
    }
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
        onCalciteSelectChange={() => this._layerSelectionChange()}
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
        clearDisabled={true}
        label=""
        onCalciteComboboxChange={() => this._layerSelectionChange()}
        placeholder-icon={this.placeholderIcon}
        ref={(el) => { this._layerElement = el }}
        scale={this.scale}
        selection-mode="single"
      >
        {this._addComboboxMapLayersOptions()}
      </calcite-combobox>
    );
  }

  /**
   * Hydrate a dropdown component with items to display the layer names
   *
   * @returns Array of Dropdown items with layer names
   */
  _getDropdown(): VNode {
    return (
      <calcite-dropdown class="layer-picker-dropdown">
        <calcite-action slot="trigger" text="">
          <calcite-button
            alignment="icon-end-space-between"
            appearance={this.appearance}
            class="max-width-350"
            iconEnd="chevron-down"
            iconStart="layers"
            kind="neutral"
            width="full"
          >
            <div>
              {this.selectedLayerName}
            </div>
          </calcite-button>
        </calcite-action>
        <calcite-dropdown-group selection-mode="single">
          {this._getDropdownItems()}
        </calcite-dropdown-group>
      </calcite-dropdown>
    );
  }

  /**
   * Hydrate a dropdown component with items to display the layer names
   *
   * @returns Array of Dropdown items with layer names
   */
  _getDropdownItems(): VNode[] {
    return this.layerIds.reduce((prev, cur) => {
      if (state.managedLayers.indexOf(state.layerNameHash[cur]) < 0 && (this.enabledLayerIds.length > 0 ? this.enabledLayerIds.indexOf(cur) > -1 : true)) {
        prev.push(
          (
            <calcite-dropdown-item
              onClick={() => void this._setSelectedLayer(cur)}
            >
              {state.layerNameHash[cur]}
            </calcite-dropdown-item>
          )
        );
      }
      return prev;
    }, []);
  }

  /**
   * Store the layer name based on the user selection
   */
  _setSelectedLayer(
    id: string
  ): void {
    this.selectedLayerName = state.layerNameHash[id];
    this.selectedLayerIds = [id];
    this.layerSelectionChange.emit(this.selectedLayerIds);
  }

  /**
   * Hydrate a select component with the ids of the layers in the map
   *
   * @returns Array of select options for the ids of the layers
   */
  _addSelectMapLayersOptions(): VNode[] {
    return this.layerIds.reduce((prev, cur) => {
      if (state.managedLayers.indexOf(state.layerNameHash[cur]) < 0 && (this.enabledLayerIds.length > 0 ? this.enabledLayerIds.indexOf(cur) > -1 : true)) {
        prev.push(
          (<calcite-option label={state.layerNameHash[cur]} value={cur} />)
        );
      }
      return prev;
    }, []);
  }

  /**
   * Hydrate a combobox component with the ids of the layers in the map
   *
   * @returns Array of ComboBox items for the ids of the layers
   */
  _addComboboxMapLayersOptions(): VNode[] {
    return this.layerIds.reduce((prev, cur) => {
      if (state.managedLayers.indexOf(state.layerNameHash[cur]) < 0 && (this.enabledLayerIds.length > 0 ? this.enabledLayerIds.indexOf(cur) > -1 : true)) {
        prev.push(
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
  _layerSelectionChange(): void {
    const ids = Array.isArray(this._layerElement.value) ? this._layerElement.value : [this._layerElement.value];
    if (JSON.stringify(ids) !== JSON.stringify([""])) {
      this.selectedLayerIds = ids;
      this.layerSelectionChange.emit(this.selectedLayerIds);
    }
  }
}
