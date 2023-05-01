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
import { getMapLayerView, highlightFeatures2 } from "../../utils/mapViewUtils";
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
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * utils/interfaces/ISelectionSet: An array of user defined selection sets
   */
  @Prop({ mutable: true }) selectionSets: ISelectionSet[] = [];

  // @Prop() GraphicsLayer: any;

  // @Prop() SketchViewModel: any;

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

  @State() _selectionMode: ESelectionMode = ESelectionMode.ADD;

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
   * HTMLRefineSelectionToolsElement: The html element for the refine selection tools
   */
  protected _drawTools: HTMLMapDrawToolsElement;

  protected _refineSets: ISelectionSet[] = [];

  //protected _selectionSetLayerViews: __esri.FeatureLayerView[] = [];

  protected _enabledLayerIds: string[] = [];

  protected _layerPicker: HTMLMapLayerPickerElement;

  /**
 * {<layer id>: Graphic[]}: Collection of graphics returned from queries to the layer
 */
  protected _featuresCollection: { [key: string]: __esri.Graphic[] } = {};

  protected _refineSelectionSet: ISelectionSet;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Called each time the addresseeLayer is changed.
   * Add a new clean refine set for the new addressee layer.
   */
  // @Watch("addresseeLayer")
  // addresseeLayerWatchHandler(): void {
  //   const selectionSets = this.selectionSets.filter(ss => ss.workflowType !== EWorkflowType.REFINE);
  //   this.selectionSets = this._initRefineSelectionSet(selectionSets);
  // }

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
   * Emitted on demand when selection graphics change.
   */
  //@Event() refineSelectionGraphicsChange: EventEmitter<IRefineSelectionEvent>;

  /**
   * Emitted on demand when selection ids change
   */
  //@Event() refineSelectionIdsChange: EventEmitter<{ addIds: any[]; removeIds: any[]; }>;

  /**
   * Emitted on demand when selection sets change.
   *
   */
  @Event() selectionSetsChanged: EventEmitter<ISelectionSet[]>;

  /**
   * Handles changes to refine selection ids.
   *
   */
  // @Listen("refineSelectionIdsChange", { target: "window" })
  // refineSelectionIdsChange(event: CustomEvent): void {
  //   const addIds = event.detail?.addIds || [];
  //   const removeIds = event.detail?.removeIds || [];

  //   this._updateSelectionSets(removeIds);
  //   this._updateRefineSelectionSet(addIds, removeIds);
  // }

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    console.log("RS componentWillLoad")
    await this._getTranslations();

    // get all layerviews from the selection sets
    //this._selectionSetLayerViews = this._getSelectionSetLayerViews();
    // default to the first layer as the refine layer
    // can be updated to another layer when selection sets are based on multiple layers
    // this._refineLayer = this._selectionSetLayerViews[0];

    // await this._setRefineSet(this._refineLayer.layer.id);
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    const layerPickerClass = this._enabledLayerIds.length > 1 ? "display-block" : "display-none";
    return (
      <Host>
        <div class={layerPickerClass + " padding-top-sides-1"}>
          <map-layer-picker
            enabledLayerIds={this._enabledLayerIds}
            mapView={this.mapView}
            onLayerSelectionChange={(evt) => { void this._layerSelectionChange(evt) }}
            //selectedLayerIds={this.layerViews.map(l => l.layer.id)}
            ref={(el) => { this._layerPicker = el }}
            selectionMode={"single"}
          />
        </div>
        <div class="padding-1">
          <div class="padding-bottom-1">
            <calcite-segmented-control
              class="w-100"
              onCalciteSegmentedControlChange={(evt) => this._modeChanged(evt)}
            >
              <calcite-segmented-control-item
                checked={this._addEnabled}
                class="w-50"
                onClick={() => this._setSelectionMode(ESelectionMode.ADD)}
                value={ESelectionMode.ADD}
              >
                {this._translations.add}
              </calcite-segmented-control-item>
              <calcite-segmented-control-item
                checked={!this._addEnabled}
                class="w-50"
                onClick={() => this._setSelectionMode(ESelectionMode.REMOVE)}
                value={ESelectionMode.REMOVE}
              >
                {this._translations.remove}
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
   * Store the Add/Remove mode
   *
   * @protected
   */
  protected _modeChanged(
    evt: CustomEvent
  ): void {
    this._selectionMode = evt.detail;
  }

  protected _layerSelectionChange(
    evt: CustomEvent
  ): void {
    const id = evt.detail[0];
    void this._setRefineSet(id);
  }

  protected _setSelectionMode(
    selectionMode: ESelectionMode
  ): void {
    this._selectionMode = selectionMode;
  }

  protected _sketchGraphicsChanged(
    evt: CustomEvent
  ): void {
    const geom = evt.detail?.graphics[0].geometry;
    void this._selectFeatures(geom);
  }

  protected _getSelectionSetLayerViews(): __esri.FeatureLayerView[] {
    this._enabledLayerIds = [];
    return this.selectionSets.reduce((prev, cur) => {
      const id = cur.layerView.layer.id;
      if (this._enabledLayerIds.indexOf(id) < 0) {
        this._enabledLayerIds.push(id);
        prev.push(cur.layerView)
      }
      return prev;
    }, []);
  }

  protected async _setRefineSet(
    id: string
  ): Promise<void> {
    if (!this.selectionSets.some((ss) => {
      if (ss.workflowType === EWorkflowType.REFINE && ss.layerView.layer.id === id) {
        this._refineSelectionSet = ss;
        return true;
      }
    })) {
      await this._initRefineSet(id);
    }
    this._refineLayer = this._refineSelectionSet.layerView;
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
      this._refineSelectionSet.redoStack
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
      redoOp.mode,
      this._refineSelectionSet.undoStack
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

    // TODO needs to account for multi refine sets
    const refineSets = this.selectionSets.filter(ss => ss.workflowType === EWorkflowType.REFINE)
    let numAdded = 0;
    refineSets.forEach(ss => {
      // TODO should this consider duplicates
      numAdded += ss.refineIds.addIds.length
    });

    let numRemoved = 0;
    refineSets.forEach(ss => {
      // TODO should this consider duplicates
      numRemoved = ss.refineIds.removeIds.length
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

  protected _getSelectionIds(
    selectionSets: ISelectionSet[]
  ): number[] {
    return Object.keys(selectionSets).reduce((prev, cur) => {
      return [
        ...prev,
        ...selectionSets[cur].selectedIds
      ]
    }, []);
  }

  protected _getTotal(
    selectionSets: ISelectionSet[]
  ): number {
    return [...new Set(this._getSelectionIds(selectionSets))].length;
  }

  /**
   * Fetch the refine selection set
   *
   * @returns the refine selection set
   * @protected
   */
  // protected _getRefineSelectionSet(
  //   selectionSets: ISelectionSet[]
  // ): ISelectionSet {
  //   let refineSelectionSet: ISelectionSet;
  //   selectionSets.some(ss => {
  //     if (ss.workflowType === EWorkflowType.REFINE) {
  //       refineSelectionSet = ss;
  //       return true;
  //     }
  //   });
  //   return refineSelectionSet;
  // }

  /**
   * Remove ids from existing selection sets.
   * Remove any selection sets than have no selected ids
   * This can update any selection set not just the refine set.
   * We do not do something similar for adds as we will only ever add from refine tools to the single REFINE selection set.
   *
   * @param removeIds the ids to remove
   *
   * @protected
   */
  // protected _updateSelectionSets(
  //   removeIds: number[]
  // ): void {
  //   if (removeIds.length > 0) {
  //     this.selectionSets = this.selectionSets.reduce((prev, cur) => {
  //       cur.selectedIds = cur.selectedIds.filter(id => removeIds.indexOf(id) < 0);
  //       if (cur.selectedIds.length > 0 || cur.workflowType === EWorkflowType.REFINE) {
  //         prev.push(cur);
  //       }
  //       return prev;
  //     }, []);
  //     this.selectionSetsChanged.emit(this.selectionSets);
  //   }
  // }

  /**
   * Update the refine selection set with any adds or removes
   *
   * @param addIds any ids to add
   * @param removeIds any ids to remove
   *
   * @returns Promise resolving when function is done
   * @protected
   */
  // protected _updateRefineSelectionSet(
  //   addIds: number[],
  //   removeIds: number[]
  // ): void {
  //   const selectionSet = this._getRefineSelectionSet(this.selectionSets);
  //   this._updateRefineIds(selectionSet, addIds, removeIds);
  //   this.selectionSetsChanged.emit(this.selectionSets);
  // }

  /**
   * Update the ids stored for the refine selection set
   *
   * @param selectionSet the refine selection set
   * @param addIds any ids to add
   * @param removeIds any ids to remove
   *
   * @returns updated selection sets
   * @protected
   */
  // protected _updateRefineIds(
  //   selectionSet: ISelectionSet,
  //   addIds: number[],
  //   removeIds: number[]
  // ): ISelectionSet[] {
  //   // remove ids if they exist in the current add or remove list
  //   selectionSet.refineIds.addIds = selectionSet.refineIds.addIds.filter(id => removeIds.indexOf(id) < 0)
  //   selectionSet.refineIds.removeIds = selectionSet.refineIds.removeIds.filter(id => addIds.indexOf(id) < 0)

  //   const _addIds = [...new Set(selectionSet.refineIds.addIds.concat(addIds))];
  //   const _removeIds = [...new Set(selectionSet.refineIds.removeIds.concat(removeIds))];
  //   selectionSet.refineIds = {
  //     addIds: _addIds.filter(id => _removeIds.indexOf(id) < 0),
  //     removeIds: _removeIds.filter(id => _addIds.indexOf(id) < 0)
  //   }
  //   selectionSet.selectedIds = selectionSet.refineIds.addIds.length > 0 ?
  //     [...new Set(selectionSet.selectedIds.concat(selectionSet.refineIds.addIds))] :
  //     selectionSet.selectedIds.filter(id => selectionSet.refineIds.removeIds.indexOf(id) < 0);

  //   return this.selectionSets.map(ss => {
  //     return ss.workflowType === EWorkflowType.REFINE ? selectionSet : ss;
  //   });
  // }

  /**
   * Add a new refine selection set
   *
   * @returns updated selection sets
   * @protected
   */
  // protected _initRefineSelectionSet(
  //   selectionSets: ISelectionSet[]
  // ): ISelectionSet[] {
  //   return [
  //     ...selectionSets,
  //     ({
  //       id: Date.now(),
  //       searchResult: undefined,
  //       buffer: undefined,
  //       distance: 0,
  //       download: true, // TODO think through this again...really only true if we have adds
  //       unit: "feet",
  //       label: "Refine",
  //       selectedIds: [],
  //       layerView: this.addresseeLayer,
  //       geometries: [],
  //       graphics: [],
  //       selectLayers: [],
  //       workflowType: EWorkflowType.REFINE,
  //       searchDistanceEnabled: false,
  //       useLayerFeaturesEnabled: false,
  //       refineIds: {
  //         addIds: [],
  //         removeIds: []
  //       },
  //       redoStack: [],
  //       undoStack: []
  //     })
  //   ];
  // }

  protected async _initRefineSet(
    id: string
  ): Promise<void> {
    this._refineSelectionSet = {
        id: Date.now(),
        searchResult: undefined,
        buffer: undefined,
        distance: 0,
        download: true, // TODO think through this again...really only true if we have adds
        unit: "feet",
        label: "Refine",
        selectedIds: [], // TODO if we only have one refine set....this should never be populated
        layerView: await getMapLayerView(this.mapView, id),
        geometries: [],
        graphics: [],
        selectLayers: [],
        workflowType: EWorkflowType.REFINE,
        searchDistanceEnabled: false,
        useLayerFeaturesEnabled: false,
        refineIds: {
          addIds: [],
          removeIds: []
        },
        redoStack: [],
        undoStack: []
      };
    this.selectionSets.push(this._refineSelectionSet);
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // from refine selection tools //////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Clear selection based on map click
     *
     * @protected
     */
    // protected _initHitTest(): void {
    //   if (this._hitTestHandle) {
    //     this._hitTestHandle.remove();
    //   }
    //   this._hitTestHandle = this.mapView.on("click", (event) => {
    //     event.stopPropagation();
    //     const opts = {
    //       include: this.layerViews.map(lv => lv.layer)
    //     };
    //     void this.mapView.hitTest(event, opts).then((response) => {
    //       let graphics = [];
    //       if (response.results.length > 0) {
    //         graphics = response.results.reduce((prev, cur) => {
    //           const g = (cur as any)?.graphic;
    //           if (g) {
    //             prev.push(g);
    //           }
    //           return prev;
    //         }, []);
    //       }
    //       this.refineSelectionGraphicsChange.emit({graphics, useOIDs: false});
    //       this._clear();
    //     });
    //   });

    // }

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

      console.log(response);

      this.selectionLoadingChange.emit(false);
      let graphics = [];
      // response.forEach(r => {
        Object.keys(response).forEach(k => {
          graphics = graphics.concat(response[k]);
        })
      // });

      // if (this.refineMode === ERefineMode.SUBSET) {
      //   this.refineSelectionGraphicsChange.emit({
      //     graphics,
      //     useOIDs: this.layerViews[0].layer.title === this.layerView.layer.title
      //   });
      // } else {
        const oids = Array.isArray(graphics) ? graphics.map(g => g.attributes[g?.layer?.objectIdField]) : [];
        await this._updateIds(oids, this._selectionMode, this._refineSelectionSet.undoStack);
      // }

      this._drawTools.clear();

      // this._clear();

    }

    /**
     * Highlight any selected features in the map
     *
     * @returns Promise resolving when function is done
     * @protected
     */
    protected async _highlightFeatures(): Promise<void> {
      this._clearHighlight();
      state.highlightHandles = await highlightFeatures2(this.selectionSets);
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
      oids: number[],
      mode: ESelectionMode,
      operationStack: IRefineOperation[]
    ): Promise<void> {
      console.log("_updateIds")
      const ids = this._refineSelectionSet.selectedIds;
      const idUpdates = this._refineSelectionSet.refineIds;

      if (mode === ESelectionMode.ADD) {
        idUpdates.addIds = oids.filter(id => ids.indexOf(id) < 0);
        this._refineSelectionSet.selectedIds = [...ids, ...idUpdates.addIds];
        if (idUpdates.addIds.length > 0) {
          operationStack.push({
            ids: idUpdates.addIds,
            mode,
            layerView: this._refineSelectionSet.layerView
         });
        }
        if (idUpdates.removeIds.length > 0) {
          idUpdates.removeIds = idUpdates.removeIds.filter(id => idUpdates.addIds.indexOf(id) < 0)
        }
      } else {
        idUpdates.removeIds = [...new Set([...idUpdates.removeIds, ...oids])];
        idUpdates.addIds = idUpdates.addIds.filter(id => idUpdates.removeIds.indexOf(id) < 0);
        if (idUpdates.removeIds.length > 0) {
          operationStack.push({
            ids: idUpdates.removeIds,
            mode,
            layerView: this._refineSelectionSet.layerView
          });
        }

        // handle within other selection sets
        this.selectionSets.forEach(ss => {
          if (ss.layerView.layer.id === this._refineSelectionSet.layerView.layer.id) {
            ss.selectedIds = ss.selectedIds.filter(id => idUpdates.removeIds.indexOf(id) < 0);
          }
        });
      }

      this._refineSelectionSet.refineIds = idUpdates;
      this.selectionSets = [...this.selectionSets];
      await this._highlightFeatures().then(() => {
        //this.refineSelectionIdsChange.emit(idUpdates);
        console.log("inside highlight features response")
      });
    }

}