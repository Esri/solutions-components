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
import MapLayerPicker_T9n from "../../assets/t9n/map-layer-picker/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
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
  @Prop() showTables: boolean;

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
   * boolean: when true the map contains valid layers and all expected tools will be enabled
   */
  @State() _hasValidLayers = true;

  /**
   * string[]: list of layer and table (if showTables is true) ids from the map
   */
  @State() ids: string[] = [];

  /**
   * string: current layer name to display when using "dropdown" type
   */
  @State() selectedName = "";

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof MapLayerPicker_T9n;

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
    if (this.ids.length > 0) {
      this._hasValidLayers = true;
      this._setSelectedLayer(this.ids[0]);
    } else {
      this._hasValidLayers = false;
      this.noLayersFound.emit();
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
   * Emitted on demand when no valid layers are found
   *
   */
  @Event() noLayersFound: EventEmitter<void>;

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
    await this._getTranslations();
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
    const id = "map-layer-picker";
    return (
      <Host>
        <div class="map-layer-picker-container">
          <div class="map-layer-picker">
            {
              !this._hasValidLayers ? this._getInvalidPlaceholder() : this.type === "combobox" ? this._getCombobox(id) :
                this.type === "select" ? this._getSelect(id) : this._getDropdown(id)
            }
            <calcite-tooltip
              label=""
              placement="bottom"
              reference-element={id}
            >
              <span>{this._translations.switchLayer}</span>
            </calcite-tooltip>
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
   * Create a notice to inform the user that no layers were found
   *
   * @returns Calcite Notice component with the message
   */
  protected _getInvalidPlaceholder(): VNode {
    return (
      <div>
        <calcite-notice
          class="height-100"
          icon="exclamation-mark-triangle"
          id="no-valid-layers"
          kind="danger"
          open
        >
          <div slot="message">{this._translations.noLayersFound}</div>
        </calcite-notice>
        <calcite-tooltip
          label={this._translations.enableEditUpdate}
          placement="bottom"
          reference-element="no-valid-layers"
        >
          <span>{this._translations.enableEditUpdate}</span>
        </calcite-tooltip>
      </div>
    );
  }

  /**
   * Create a list of layers from the map
   * Used for selecting a single layer.
   *
   * @param id the id for the select component used to support the tooltip
   *
   * @returns Calcite Select component with the ids of the layers from the map
   */
  _getSelect(
    id: string
  ): VNode {
    return (
      <calcite-select
        id={id}
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
   * Used for selecting multiple layers
   *
   * @param id the id for the combobox component used to support the tooltip
   *
   * @returns Calcite ComboBox component with the ids of the layers from the map
   */
  _getCombobox(
    id: string
  ): VNode {
    return (
      <calcite-combobox
        clearDisabled={true}
        id={id}
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
   * @param id the id for the dropdown component used to support the tooltip
   *
   * @returns Array of Dropdown items with layer names
   */
  _getDropdown(
    id: string
  ): VNode {
    return (
      <calcite-dropdown class="layer-picker-dropdown">
        <calcite-action id={id} slot="trigger" text="">
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
    const item = itemType === "layer" ? this._layerNameHash[id] : this._tableNameHash[id];
    const disabled = this.onlyShowUpdatableLayers ? !item.supportsUpdate : false;
    const name = item.name;
    return this.type === "combobox" ? (<calcite-combobox-item disabled={disabled} textLabel={name} value={id} />) :
      this.type === "select" ? (<calcite-option disabled={disabled} label={name} value={id} />) :
        (
          <calcite-dropdown-item
            disabled={disabled}
            onClick={disabled ? undefined : () => void this._setSelectedLayer(id)}
          >
            {name}
          </calcite-dropdown-item>
        );
  }

  /**
   * Store the layer name based on the user selection
   */
  _setSelectedLayer(
    id: string
  ): void {
    const item = Object.keys(this._layerNameHash).indexOf(id) > -1 ?
      this._layerNameHash[id] : Object.keys(this._tableNameHash).indexOf(id) > -1 ?
      this._tableNameHash[id] : undefined;
    this.selectedName = item?.name;
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
      const mapLayerIds = this.onlyShowUpdatableLayers ?
        this._getEditableIds(this._layerNameHash) : Object.keys(this._layerNameHash);
      const mapTableIds = this.showTables ? this.onlyShowUpdatableLayers ?
        this._getEditableIds(this._tableNameHash) : Object.keys(this._tableNameHash) : [];
      this.ids = [
        ...mapLayerIds.filter(n => this.enabledLayerIds?.length > 0 ? this.enabledLayerIds.indexOf(n) > -1 : true),
        ...mapTableIds.filter(n => this.enabledTableIds?.length > 0 ? this.enabledTableIds.indexOf(n) > -1 : true),
      ];
    }
  }

  /**
   * Fetch the ids of all layers that support edits with the update capability
   *
   * @returns array of layer ids
   */
  protected _getEditableIds(
    hash: IMapItemHash
  ): string[] {
    return Object.keys(hash).reduce((prev, cur) => {
      if (hash[cur].supportsUpdate) {
        prev.push(cur);
      }
      return prev;
    }, []);
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

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof MapLayerPicker_T9n;
  }
}
