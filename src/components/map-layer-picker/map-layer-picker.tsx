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
import { getMapLayerHash, getMapTableHash } from "../../utils/mapViewUtils";
import state from "../../utils/publicNotificationStore";
import { IMapItemHash } from "../../utils/interfaces";

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
   * string[]: Optional list of enabled table ids
   *  If empty all tables will be available
   */
  @Prop() enabledTableIds: string[] = [];

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * boolean: When true only editable layers that support the update capability will be available
   */
  @Prop() onlyShowUpdatableLayers: boolean;

  /**
   * string: optional placeholder icon used with "combobox" type
   */
  @Prop() placeholderIcon = "";

  /**
   * string[]: list of layer ids that have been selected by the end user
   */
  @Prop({ mutable: true }) selectedIds: string[] = [];

  /**
   * "s" | "m" | "l": scale to render the component
   */
  @Prop() scale: "s" | "m" | "l" = "m";

  /**
   * boolean: when true standalone tables will also be available
   */
  @Prop() showTables = true;

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
   * string[]: list of layer and table (if showTables is true) ids from the map
   */
  @State() ids: string[] = [];

  /**
   * string: lcurrent layer name to display when using "dropdown" type
   */
  @State() selectedName = "";

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * HTMLCalciteSelectElement: The html element for selecting layers
   */
  protected _layerElement: HTMLCalciteSelectElement | HTMLCalciteComboboxElement;

  /**
   * IMapItemHash: id/name lookup
   */
  protected _layerNameHash: IMapItemHash;

  /**
   * IMapItemHash: id/name lookup
   */
  protected _tableNameHash: IMapItemHash;

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
    const hasLayers = Object.keys(this._layerNameHash).length > 0;
    const hasTables = Object.keys(this._tableNameHash).length > 0 && this.showTables;
    if (hasLayers || hasTables) {
      this._setSelectedLayer(this.ids[0], hasLayers ? "layer" : "table");
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
    if (this.ids.length > 0 || this.selectedIds.length === 1) {
      this.layerSelectionChange.emit(
        this.selectedIds.length === 1 ? [this.selectedIds[0]] : [this.ids[0]]
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
    if (this.ids.length > 0 || this.selectedIds.length === 1) {
      const id = this.selectedIds.length === 1 ? this.selectedIds[0] : this.ids[0];
      if (this.type === "select") {
        this._layerElement.value = id;
      } else if (this.type === "dropdown") {
        this.selectedName = Object.keys(this._layerNameHash).indexOf(id) > -1 ?
          this._layerNameHash[id].name : Object.keys(this._tableNameHash).indexOf(id) > -1 ?
            this._tableNameHash[id].name : "";
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
        {this._getMapLayerOptions()}
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
        {this._getMapLayerOptions()}
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
              {this.selectedName}
            </div>
          </calcite-button>
        </calcite-action>
        <calcite-dropdown-group selection-mode="single">
          {this._getMapLayerOptions()}
        </calcite-dropdown-group>
      </calcite-dropdown>
    );
  }

  /**
   * Get the appropriate type of dom nodes for each valid layer or table
   *
   * @returns Array of dom nodes with the names of the layers and optionally of the tables
   */
  _getMapLayerOptions(): VNode[] {
    return this.ids.reduce((prev, cur) => {
      if (this._validLayer(cur)) {
        prev.push(this._getItem(cur, "layer"));
      } else if (this._validTable(cur)) {
        prev.push(this._getItem(cur, "table"));
      }
      return prev;
    }, []);
  }

  /**
   * Get the appropriate type of dom node for the current layer or table id
   *
   * @returns A dom node with the name of the layer or table
   */
  _getItem(
    id: string,
    itemType: "layer" | "table"
  ): VNode {
    const name = itemType === "layer" ? this._layerNameHash[id].name : this._tableNameHash[id].name;
    return this.type === "combobox" ? (<calcite-combobox-item textLabel={name} value={id} />) :
      this.type === "select" ? (<calcite-option label={name} value={id} />) :
        (
          <calcite-dropdown-item
            onClick={() => void this._setSelectedLayer(id, itemType)}
          >
            {name}
          </calcite-dropdown-item>
        );
  }

  /**
   * Store the layer name based on the user selection
   */
  _setSelectedLayer(
    id: string,
    type: "layer" | "table"
  ): void {
    this.selectedName = type === "layer" ? this._layerNameHash[id].name : this._tableNameHash[id].name;
    this.selectedIds = [id];
    this.layerSelectionChange.emit(this.selectedIds);
  }

  /**
   * Fetch the ids of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  async _setLayers(): Promise<void> {
    if (this.mapView) {
      await this._initLayerTableHash();
      const mapLayerIds = Object.keys(this._layerNameHash);
      const mapTableIds = this.showTables ? Object.keys(this._tableNameHash) : [];
      this.ids = [
        ...mapLayerIds.filter(n => this.enabledLayerIds?.length > 0 ? this.enabledLayerIds.indexOf(n) > -1 : true),
        ...mapTableIds.filter(n => this.enabledTableIds?.length > 0 ? this.enabledTableIds.indexOf(n) > -1 : true),
      ];
    }
  }

  /**
   * Create a layer id:title hash for layer name display
   *
   * @returns Promise when the operation has completed
   */
  protected async _initLayerTableHash(): Promise<void> {
    this._layerNameHash = await getMapLayerHash(this.mapView, this.onlyShowUpdatableLayers);
    this._tableNameHash = this.showTables ? await getMapTableHash(
      this.mapView, this.onlyShowUpdatableLayers) : {};
  }

  /**
   * Evaluate if the id exists in the current hash and verify if it should be excluded
   *
   * @returns boolean when true the layer will be used in the current layer picker type
   */
  protected _validLayer(
    id: string
  ): boolean {
    const name = this._layerNameHash[id]?.name;
    return name && state.managedLayers.indexOf(name) < 0 && (this.enabledLayerIds.length > 0 ?
      this.enabledLayerIds.indexOf(id) > -1 : true);
  }

  /**
   * Evaluate if the id exists in the current hash and verify if it should be excluded
   *
   * @returns boolean when true the table will be used in the current layer picker type
   */
  protected _validTable(
    id: string
  ): boolean {
    const name = this._tableNameHash[id]?.name;
    const validName = name && this.showTables;
    return validName ? state.managedTables.indexOf(name) < 0 &&
      (this.enabledTableIds.length > 0 ? this.enabledTableIds.indexOf(id) > -1 : true) : validName;
  }

  /**
   * Fetch the ids of the layers from the map
   *
   * @returns Promise when the operation has completed
   */
  _layerSelectionChange(): void {
    const ids = Array.isArray(this._layerElement.value) ? this._layerElement.value : [this._layerElement.value];
    if (JSON.stringify(ids) !== JSON.stringify([""])) {
      this.selectedIds = ids;
      this.layerSelectionChange.emit(this.selectedIds);
    }
  }
}
