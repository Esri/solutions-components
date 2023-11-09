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

import { Component, Element, Event, EventEmitter, Host, h, Prop, State, VNode } from "@stencil/core";
import { EDrawMode, ESelectionMode, EWorkflowType, IRefineOperation, ISelectionSet } from "../../utils/interfaces";
import { getIdSets, getFeatureLayerView, highlightAllFeatures } from "../../utils/mapViewUtils";
import { queryFeaturesByGeometry } from "../../utils/queryUtils";
import RefineSelection_T9n from "../../assets/t9n/refine-selection/resources.json";
import state from "../../utils/publicNotificationStore";
import { getLocaleComponentStrings } from "../../utils/locale";

@Component({
  tag: "refine-selection",
  styleUrl: "refine-selection.css",
  shadow: false,
})
export class RefineSelection {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLRefineSelectionElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/views/layers/FeatureLayerView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-FeatureLayerView.html
   */
  @Prop() addresseeLayer: __esri.FeatureLayerView;

  /**
   * string[]: Optional list of enabled layer ids
   *  If empty all layers will be available
   */
  @Prop() enabledLayerIds: string[] = [];

  /**
   * esri/views/MapView: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * utils/interfaces/ISelectionSet: An array of user defined selection sets
   */
  @Prop({ mutable: true }) selectionSets: ISelectionSet[] = [];

  /**
   * esri/symbols/SimpleLineSymbol | JSON representation : https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleLineSymbol.html
   *
   */
  @Prop() sketchLineSymbol: __esri.SimpleLineSymbol;

  /**
   * esri/symbols/SimpleMarkerSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleMarkerSymbol.html
   *
   */
  @Prop() sketchPointSymbol: __esri.SimpleMarkerSymbol;

  /**
   * esri/symbols/SimpleFillSymbol | JSON representation: https://developers.arcgis.com/javascript/latest/api-reference/esri-symbols-SimpleFillSymbol.html
   *
   */
  @Prop() sketchPolygonSymbol: __esri.SimpleFillSymbol;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof RefineSelection_T9n;

  /**
   * The current selection mode ADD or REMOVE
   */
  @State() _selectionMode: ESelectionMode = ESelectionMode.ADD;

  /**
   * The current layer to refine
   */
  @State() _refineLayer: __esri.FeatureLayerView;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: Indicates if any new graphics should be added or removed
   */
  protected _addEnabled = true;

  /**
   * HTMLMapDrawToolsElement: The tools used to create graphics
   */
  protected _drawTools: HTMLMapDrawToolsElement;

  /**
   * ISelectionSet[]: The current list of selection sets
   */
  protected _refineSets: ISelectionSet[] = [];

  /**
   * string[]: The list of all layers that have current selections
   */
  protected _enabledLayerIds: string[] = [];

  /**
   * HTMLMapLayerPickerElement: The layer picker used to define what layer you are refining
   */
  protected _layerPicker: HTMLMapLayerPickerElement;

  /**
   * {<layer id>: Graphic[]}: Collection of graphics returned from queries to the layer
   */
  protected _featuresCollection: { [key: string]: __esri.Graphic[] } = {};

  /**
   * ISelectionSet: The current selection set to refine
   */
  protected _refineSelectionSet: ISelectionSet;

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

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted on demand when selection starts or ends.
   */
  @Event() selectionLoadingChange: EventEmitter<boolean>;

  /**
   * Emitted on demand when selection sets change.
   *
   */
  @Event() selectionSetsChanged: EventEmitter<ISelectionSet[]>;

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
    this._enabledLayerIds = this._getEnabledLayerIds();
    await this._setRefineSet(this._enabledLayerIds[0]);
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    const layerPickerClass = this._enabledLayerIds.length > 1 ? "display-block" : "display-none";
    return (
      <Host>
        <div class={layerPickerClass + " padding-top-sides-1"}>
          <div class="display-flex">
            <calcite-label class="font-bold width-full label-margin-0">
              <div class="display-flex">
                {this._translations.inputLayer}
                <calcite-icon
                  class="padding-start-1-2 icon"
                  icon="question"
                  id="refine-input-layer"
                  scale="s"
                />
              </div>
              <map-layer-picker
                enabledLayerIds={this._enabledLayerIds}
                mapView={this.mapView}
                onLayerSelectionChange={(evt) => { void this._layerSelectionChange(evt) }}
                ref={(el) => { this._layerPicker = el }}
                selectedIds={[this._refineLayer.layer.id]}
                showTables={false}
              />
            </calcite-label>
            <calcite-popover
              closable={true}
              label=""
              referenceElement="refine-input-layer"
            >
              <span class="tooltip-message">{this._translations.inputLayerTip}</span>
            </calcite-popover>
          </div>
        </div>
        <div class="padding-1">
          <div class="padding-bottom-1">
            <calcite-segmented-control
              class="w-100"
            >
              <calcite-segmented-control-item
                checked={this._addEnabled}
                class="w-50 word-wrap-anywhere"
                onClick={() => this._setSelectionMode(ESelectionMode.ADD)}
                value={ESelectionMode.ADD}
              >
                <span class="font-weight-500">
                  {this._translations.add}
                </span>
              </calcite-segmented-control-item>
              <calcite-segmented-control-item
                checked={!this._addEnabled}
                class="w-50 word-wrap-anywhere"
                onClick={() => this._setSelectionMode(ESelectionMode.REMOVE)}
                value={ESelectionMode.REMOVE}
              >
                <span class="font-weight-500">
                  {this._translations.remove}
                </span>
              </calcite-segmented-control-item>
            </calcite-segmented-control>
          </div>
          <div>
            <map-draw-tools
              active={true}
              drawMode={EDrawMode.REFINE}
              mapView={this.mapView}
              onDrawRedo={() => this._redo()}
              onDrawUndo={() => this._undo()}
              onSketchGraphicsChange={(evt) => this._sketchGraphicsChanged(evt)}
              pointSymbol={this.sketchPointSymbol}
              polygonSymbol={this.sketchPolygonSymbol}
              polylineSymbol={this.sketchLineSymbol}
              redoEnabled={this._refineSelectionSet?.redoStack.length > 0}
              ref={(el) => { this._drawTools = el }}
              undoEnabled={this._refineSelectionSet?.undoStack.length > 0}
            />
          </div>
          <br />
          {
            (
              <calcite-list class="list-border">
                {this._getRefineSelectionSetList()}
              </calcite-list>
            )
          }
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
   * Set the user selected layer as the current refine layer
   *
   * @param evt contains the selected layer id
   *
   * @protected
   */
  protected _layerSelectionChange(
    evt: CustomEvent
  ): void {
    const id = evt.detail[0];
    void this._setRefineSet(id);
  }

  /**
   * Store the current selection mode
   *
   * @param selectionMode the current selection mode ADD || REMOVE
   *
   * @protected
   */
  protected _setSelectionMode(
    selectionMode: ESelectionMode
  ): void {
    this._selectionMode = selectionMode;
  }

  /**
   * Select features based on the user drawn geometry
   *
   * @param evt ISketchGraphicsChange stores the new graphics and a boolean useOIDs
   * useOIDs is leveraged in some situations to use the feature OIDs rather than the graphic geometry
   *
   * @protected
   */
  protected _sketchGraphicsChanged(
    evt: CustomEvent
  ): void {
    const geom = evt.detail?.graphics[0].geometry;
    void this._selectFeatures(geom);
  }

  /**
   * Get the layer ids for all layers in the selection sets
   *
   * @protected
   */
  protected _getEnabledLayerIds(): string[] {
    return this.selectionSets.reduce((prev, cur) => {
      const id = cur?.layerView?.layer.id;
      if (id && prev.indexOf(id) < 0) {
        prev.push(id);
      } else if (cur.workflowType === EWorkflowType.REFINE) {
        Object.keys(cur.refineInfos).forEach(k => {
          if (prev.indexOf(k) < 0) {
            prev.push(k);
          }
        });
      }
      return prev;
    }, []);
  }

  /**
   * Set the refine layer...any adds or removes will be done against this layer
   *
   * @param id the id of the layer that should be used as the current refine layer
   *
   * @protected
   */
  protected async _setRefineSet(
    id: string
  ): Promise<void> {
    if (!this.selectionSets.some((ss) => {
      if (ss.workflowType === EWorkflowType.REFINE) {
        this._refineSelectionSet = ss;
        return Object.keys(ss.refineInfos).indexOf(id) > -1;
      }
    })) {
      await this._initRefineSet(id, this._refineSelectionSet);
    }
    this._refineLayer = this._refineSelectionSet.refineInfos[id].layerView;
  }

  /**
   * Initialize the refine selection set
   *
   * @param id the layer id to use for the refine selection set
   * @param selectionSet the current refine selection set
   *
   * @protected
   */
  protected async _initRefineSet(
    id: string,
    selectionSet: ISelectionSet
  ): Promise<void> {
    const refineInfo = {};
    refineInfo[id] = {
      addIds: [],
      removeIds: [],
      layerView: await getFeatureLayerView(this.mapView, id)
    };

    if (selectionSet) {
      selectionSet.refineInfos = { ...selectionSet.refineInfos, ...refineInfo };
    } else {
      this._refineSelectionSet = {
        id: Date.now(),
        searchResult: undefined,
        buffer: undefined,
        distance: 0,
        download: true,
        unit: "feet",
        label: "Refine",
        selectedIds: [],
        layerView: undefined,
        geometries: [],
        graphics: [],
        selectLayers: [],
        workflowType: EWorkflowType.REFINE,
        searchDistanceEnabled: false,
        useLayerFeaturesEnabled: false,
        refineInfos: refineInfo,
        redoStack: [],
        undoStack: [],
        sketchGraphic: undefined
      };
      this.selectionSets.push(this._refineSelectionSet);
    }
  }

  /**
   * Undo the most current ADD or REMOVE operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _undo(): void {
    const undoOp = this._refineSelectionSet.undoStack.pop();
    void this._updateIds(
      undoOp.ids,
      undoOp.mode === ESelectionMode.ADD ? ESelectionMode.REMOVE : ESelectionMode.ADD,
      this._refineSelectionSet.redoStack,
      undoOp.layerView
    );
  }

  /**
   * Redo the most current ADD or REMOVE operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _redo(): void {
    const redoOp = this._refineSelectionSet.redoStack.pop();
    void this._updateIds(
      redoOp.ids,
      redoOp.mode === ESelectionMode.ADD ? ESelectionMode.REMOVE : ESelectionMode.ADD,
      this._refineSelectionSet.undoStack,
      redoOp.layerView
    );
  }

  /**
   * Create a list to show the number added/removed/total unique selected
   *
   * @returns the list node
   * @protected
   */
  protected _getRefineSelectionSetList(): VNode[] {
    const total = this._getTotal(this.selectionSets);

    let refineSet;
    this.selectionSets.some(ss => {
      if (ss.workflowType === EWorkflowType.REFINE) {
        refineSet = ss;
        return true;
      }
    });

    let numAdded = 0;
    let numRemoved = 0;
    Object.keys(refineSet.refineInfos).forEach(k => {
      numAdded += refineSet.refineInfos[k].addIds.length;
      numRemoved += refineSet.refineInfos[k].removeIds.length;
    });

    return [(
      <calcite-list-item
        label={this._translations.featuresAdded.replace("{{n}}", numAdded.toString())}
        non-interactive
      />
    ), (
      <calcite-list-item
        label={this._translations.featuresRemoved.replace("{{n}}", numRemoved.toString())}
        non-interactive
      />
    ), (
      <calcite-list-item
        label={this._translations.totalSelected.replace("{{n}}", total.toString())}
        non-interactive
      />
    )];
  }

  /**
   * Get the total number od ids across all selection sets
   *
   * @returns the total number of ids
   * @protected
   */
  protected _getTotal(
    selectionSets: ISelectionSet[]
  ): number {
    const idSets = getIdSets(selectionSets);
    return Object.keys(idSets).reduce((prev, cur) => {
      const idSet = idSets[cur];
      prev += idSet.ids.length;
      return prev;
    }, 0);
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof RefineSelection_T9n;
  }

  /**
   * Select features based on the input geometry
   *
   * @param geom the geometry used for selection
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected async _selectFeatures(
    geom: __esri.Geometry
  ): Promise<void> {
    this.selectionLoadingChange.emit(true);

    this._featuresCollection[this._refineLayer?.layer.id] = [];
    const response = await queryFeaturesByGeometry(0, this._refineLayer?.layer, geom, this._featuresCollection);

    this.selectionLoadingChange.emit(false);
    let graphics = [];

    Object.keys(response).forEach(k => {
      if (k === this._refineLayer?.layer.id) {
        graphics = graphics.concat(response[k]);
      }
    });

    const oids = Array.isArray(graphics) ? graphics.map(g => g.attributes[g?.layer?.objectIdField]) : [];
    await this._updateIds(oids, this._selectionMode, this._refineSelectionSet.undoStack, this._refineLayer);

    this._drawTools.clear();
  }

  /**
   * Highlight any selected features in the map
   *
   * @returns Promise resolving when function is done
   * @protected
   */
  protected async _highlightFeatures(): Promise<void> {
    this._clearHighlight();
    state.highlightHandles = await highlightAllFeatures(this.selectionSets);
  }

  /**
   * Clear any highlighted features in the map
   *
   * @protected
   */
  protected _clearHighlight(): void {
    state.removeHandles();
  }

  /**
   * Update the ids for any ADD or REMOVE operation and highlight the features.
   *
   * @param oids the ids to add or remove
   * @param mode ADD or REMOVE this will control if the ids are added or removed
   * @param operationStack the undo or redo stack to push the operation to
   * @param operationMode ADD or REMOVE the mode of the individual refine operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected async _updateIds(
    ids: number[],
    mode: ESelectionMode,
    operationStack: IRefineOperation[],
    layerView: __esri.FeatureLayerView
  ): Promise<void> {
    let selectionSetsChanged = false;
    const refineInfos = this._refineSelectionSet.refineInfos;
    const layerId = layerView.layer.id;
    const newRefineInfo = {};
    newRefineInfo[layerId] = {
      addIds: [],
      removeIds: [],
      layerView
    };
    const idUpdates = Object.keys(refineInfos).indexOf(layerId) > -1 ?
      refineInfos[layerId] : newRefineInfo[layerId];

    if (mode === ESelectionMode.ADD) {
      idUpdates.addIds = [...new Set([...ids, ...idUpdates.addIds])]
      if (idUpdates.addIds.length > 0) {
        operationStack.push({
          ids,
          mode,
          layerView
        });
      }
      if (idUpdates.removeIds.length > 0) {
        idUpdates.removeIds = idUpdates.removeIds.filter(id => ids.indexOf(id) < 0)
      }
    } else {
      // ids are a result of the drawn geom...so it's possible they could contain ids that do
      // not exist in other selection sets
      const validIds = this.selectionSets.reduce((prev, cur) => {
        ids.forEach(id => {
          if (cur.workflowType !== EWorkflowType.REFINE) {
            if (cur.selectedIds.indexOf(id) > -1) {
              prev.push(id);
            }
          } else {
            Object.keys(cur.refineInfos).some(k => {
              const refineInfo = cur.refineInfos[k];
              if (refineInfo.layerView.layer.id === layerView.layer.id && refineInfo.addIds.indexOf(id) > -1) {
                prev.push(id);
                return true;
              }
            })
          }
        })
        return prev;
      }, []);

      idUpdates.removeIds = [...new Set([...validIds, ...idUpdates.removeIds])];
      idUpdates.addIds = idUpdates.addIds.filter(id => validIds.indexOf(id) < 0);
      if (idUpdates.removeIds.length > 0) {
        operationStack.push({
          ids: validIds,
          mode,
          layerView
        });
      }

      this.selectionSets = this.selectionSets.reduce((prev, cur) => {
        if (cur.workflowType !== EWorkflowType.REFINE &&
          cur.layerView.layer.id === layerView.layer.id) {
          cur.selectedIds = cur.selectedIds.filter(id => idUpdates.removeIds.indexOf(id) < 0);
          if (cur.selectedIds.length > 0) {
            prev.push(cur);
          } else {
            selectionSetsChanged = true;
          }
        } else {
          prev.push(cur);
        }
        return prev;
      }, []);
    }

    this._refineSelectionSet.refineInfos[layerId] = idUpdates;
    this.selectionSets = [...this.selectionSets];

    if (selectionSetsChanged) {
      this.selectionSetsChanged.emit(this.selectionSets);
    }

    await this._highlightFeatures();
  }
}
