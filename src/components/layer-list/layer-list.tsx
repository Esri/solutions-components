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

import { Component, Element, Prop, VNode, h, State, Fragment, Event, EventEmitter, Method } from "@stencil/core";
import { getAllLayers, getMapLayerHash } from "../../utils/mapViewUtils";
import LayerList_T9n from "../../assets/t9n/layer-list/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { formatNumber } from "../../utils/languageUtil"

interface ILayerItemsHash {
  [key: string]: ILayerDetailsHash;
}
interface ILayerDetailsHash {
  name: string;
  formattedFeatureCount: string;
  supportsUpdate: boolean;
  supportsAdd: boolean;
}

@Component({
  tag: "layer-list",
  styleUrl: "layer-list.css",
  shadow: false,
})

export class LayerList {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLLayerListElement;

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
   * string[]: If passed will show only these layers in the list if they are present in map and are editable
   */
  @Prop() layers: string[];

  /**
   * string: Error message to be displayed when no layers found
   */
  @Prop() noLayerErrorMsg?: string;

  /**
   * boolean: if true display's feature count for each layer
   */
  @Prop() showFeatureCount?: boolean = true;

  /**
   * boolean: If true display's arrow icon on each layer item
   */
  @Prop() showNextIcon?: boolean = false;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: When true will display message no layers found 
   */
  @State() _noLayersToDisplay = false;

  /**
   * string[]: list of layer ids from the map which will be listed
   */
  @State() _mapLayerIds: string[] = [];

  /**
   * boolean: When true display the loading indicator
   */
  @State() _isLoading = false;

  /**
   * Contains the translations for this component.
   */
  @State() _translations: typeof LayerList_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * ILayerItemHash: id/name lookup
   */
  protected _layerItemsHash: ILayerItemsHash;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Refresh the layer list which will fetch the latest layer count and update the list
   * @returns Promise that resolves when the operation is complete
   */
  @Method()
  async refresh(): Promise<void> {
    await this.setLayers();
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted on demand when feature layer clicked with details layerId and layerName
   */
  @Event() layerSelect: EventEmitter<{ layerId: string, layerName: string }>;

  /**
   * Emitted on demand when list of layers to be listed are created.
   * When empty array received in this event means no valid layers are found to be listed
   */
  @Event() layersListLoaded: EventEmitter<string[]>;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   * @returns Promise when complete
   */
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    this._isLoading = true;
  }

  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad() {
    await this.setLayers();
    this._isLoading = false;
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Fragment>
        {this._isLoading && <calcite-loader scale="m" />}
        {!this._isLoading && this.mapView && this._noLayersToDisplay &&
          <calcite-notice
            class="error-msg"
            icon="layers-reference"
            kind="danger"
            open>
            <div slot="title">{this._translations.error}</div>
            <div slot="message">{this.noLayerErrorMsg ? this.noLayerErrorMsg : this._translations.noLayerToDisplayErrorMsg}</div>
          </calcite-notice>}
        {!this._isLoading && this.mapView &&
          <calcite-list
            selection-appearance="border"
            selection-mode={this.showNextIcon ? "none" : "single-persist"}>
            {this.renderLayerList()}
          </calcite-list>}
      </Fragment>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Fetch the ids of the layers from the map
   * @returns Promise when the operation has completed
   * @protected
   */
  async setLayers(): Promise<void> {
    if (this.mapView) {
      await this.initLayerHash();
    }
  }

  /**
   * Create a layer hash for layer name display
   * @returns Promise when the operation has completed
   * @protected
   */
  protected async initLayerHash(): Promise<void> {
    const def = [];
    this._layerItemsHash = await getMapLayerHash(this.mapView, true) as ILayerItemsHash;
    const allMapLayers = await getAllLayers(this.mapView);
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    allMapLayers.forEach(async (eachLayer: __esri.FeatureLayer) => {
      //TODO: checking editable condition could be configurable
      if (eachLayer?.type === "feature" && eachLayer?.editingEnabled && eachLayer?.capabilities?.operations?.supportsAdd) {
        this._layerItemsHash[eachLayer.id].supportsAdd = true;
        if (this.showFeatureCount) {
          const q = eachLayer.createQuery();
          const result = eachLayer.queryFeatureCount(q);
          def.push(result);
          void result.then(async (resCount) => {
            const formattedCount = !isNaN(resCount) ? await formatNumber(resCount, {
              places: 0,
              api: 4,
              type: "decimal"
            }) : ""
            this._layerItemsHash[eachLayer.id].formattedFeatureCount = formattedCount;
          });
        }
      }
    });
    await Promise.all(def).then(() => {
      const editableLayerIds = this.getEditableIds(this._layerItemsHash);
      this._mapLayerIds = editableLayerIds.reverse();
      this.handleNoLayersToDisplay();
    }, () => {
      this._mapLayerIds = [];
      this.handleNoLayersToDisplay();
    });
  }

  /**
   * Set no layers to display state and emit event
   */
  protected handleNoLayersToDisplay(): void {
    this._noLayersToDisplay = !(this._mapLayerIds.length > 0);
    this.layersListLoaded.emit(this._mapLayerIds);
  }

  /**
   * Returns the ids of all OR configured layers that support edits with the update capability
   * @param hash each layer item details
   * @returns array of layer ids
   */
  protected getEditableIds(
    hash: ILayerItemsHash
  ): string[] {
    const configuredLayers = this.layers?.length > 0 ? this.layers : [];
    return Object.keys(hash).reduce((prev, cur) => {
      let showLayer = hash[cur].supportsAdd;
      if (configuredLayers?.length > 0) {
        showLayer = configuredLayers.indexOf(cur) > -1 ? hash[cur].supportsAdd : false;
      }
      if (showLayer) {
        prev.push(cur);
      }
      return prev;
    }, []);
  }

  /**
   * Render feature layer list
   * @returns layer list
   * @protected
   */
  protected renderLayerList(): Node[] {
    return this._mapLayerIds.length > 0 && this._mapLayerIds.reduce((prev, layerId) => {
      if (this._layerItemsHash[layerId]) {
        prev.push(this.getLayerListItem(layerId));
      }
      return prev;
    }, []);
  }

  /**
   * Get each item
   * @param layerId Layer id
   * @returns individual item
   * @protected
   */
  protected getLayerListItem(layerId: string): VNode {
    const layerName = this._layerItemsHash[layerId].name;
    const featureCount = this._layerItemsHash[layerId].formattedFeatureCount;
    return (
      <calcite-list-item onCalciteListItemSelect={() => { this.onLayerItemSelected(layerId) }}>
        {/* --TODO ellipsis--*/}
        <div class="layer-name" slot="content-start">{layerName}</div>
        {this.showFeatureCount && featureCount !== undefined && featureCount !== "" && <div class={!this.showNextIcon ? "feature-count" : ""} slot="content-end">{"(" + featureCount + ")"}</div>}
        {this.showNextIcon && <calcite-icon
          icon="chevron-right"
          scale="s"
          slot="content-end" />}
      </calcite-list-item>
    );
  }

  /**On click of layer list item emit the event along with the selected layerId and layerName
   * @param layerId Layer id
   * @protected
   */
  protected onLayerItemSelected(layerId: string): void {
    this.layerSelect.emit({layerId, layerName: this._layerItemsHash[layerId].name});
  }

  /**
   * Fetches the component's translations
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof LayerList_T9n;
  }
}
