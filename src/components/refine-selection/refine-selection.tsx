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

import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop, State, VNode } from "@stencil/core";
import { EDrawMode, ESelectionMode, EWorkflowType, ISelectionSet } from "../../utils/interfaces";
import RefineSelection_T9n from "../../assets/t9n/refine-selection/resources.json";
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

  @Prop() GraphicsLayer: any;

  @Prop() SketchViewModel: any;

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

  protected _refineSets

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
   * Emitted on demand when selection sets change.
   *
   */
  @Event() selectionSetsChanged: EventEmitter<ISelectionSet[]>;

  /**
   * Handles changes to refine selection ids.
   *
   */
  @Listen("refineSelectionIdsChange", { target: "window" })
  refineSelectionIdsChange(event: CustomEvent): void {
    const addIds = event.detail?.addIds || [];
    const removeIds = event.detail?.removeIds || [];

    this._updateSelectionSets(removeIds);
    this._updateRefineSelectionSet(addIds, removeIds);
  }

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



    const refineSet = this._getRefineSelectionSet(this.selectionSets);
    if (!refineSet) {
      this.selectionSets = this._initRefineSelectionSet(this.selectionSets);
    }
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    return (
      <Host>
        <div class="padding-1">
          <div class="padding-bottom-1">
            <calcite-segmented-control
              class="w-100"
              onCalciteSegmentedControlChange={(evt) => this._modeChanged(evt)}
            >
              <calcite-segmented-control-item
                checked={this._addEnabled}
                class="w-50"
                //onClick={() => this._setSelectionMode(ESelectionMode.ADD)}
                value={ESelectionMode.ADD}
              >
                {this._translations.add}
              </calcite-segmented-control-item>
              <calcite-segmented-control-item
                checked={!this._addEnabled}
                class="w-50"
                //onClick={() => this._setSelectionMode(ESelectionMode.REMOVE)}
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
              ref={(el) => { this._drawTools = el }}
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

  protected _sketchGraphicsChanged(
    evt: CustomEvent
  ): void {
    console.log("RS _sketchGraphicsChanged")
    // console.log("this.active")
    // console.log(this.active)
    console.log(evt)
  }

  /**
   * Undo the most current ADD or REMOVE operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _undo(): void {
    console.log("_undo")
    // const undoOp = this.refineSelectionSet.undoStack.pop();
    // void this._updateIds(
    //   undoOp.ids,
    //   undoOp.mode === ESelectionMode.ADD ? ESelectionMode.REMOVE : ESelectionMode.ADD,
    //   this.refineSelectionSet.redoStack,
    //   undoOp.mode
    // );
  }

  /**
   * Redo the most current ADD or REMOVE operation
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _redo(): void {
    console.log("_redo")
    // const redoOp = this.refineSelectionSet.redoStack.pop();
    // void this._updateIds(
    //   redoOp.ids,
    //   redoOp.mode,
    //   this.refineSelectionSet.undoStack,
    //   redoOp.mode
    // );
  }

  /**
   * Set the refine tools selection mode
   *
   * @protected
   */
  // protected _setSelectionMode(
  //   mode: ESelectionMode
  // ): void {
  //   this._Tools.mode = mode;
  // }

  /**
   * Create a list to show the number added/removed/total unique selected
   *
   * @returns the list node
   * @protected
   */
  protected _getRefineSelectionSetList(): VNode[] {
    const total = this._getTotal(this.selectionSets);
    const refineSet = this._getRefineSelectionSet(this.selectionSets);
    const numAdded = refineSet?.refineIds.addIds.length || 0;
    const numRemoved = refineSet?.refineIds.removeIds.length || 0;

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
        ...selectionSets[cur].download ? selectionSets[cur].selectedIds : []
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
  protected _getRefineSelectionSet(
    selectionSets: ISelectionSet[]
  ): ISelectionSet {
    let refineSelectionSet: ISelectionSet;
    selectionSets.some(ss => {
      if (ss.workflowType === EWorkflowType.REFINE) {
        refineSelectionSet = ss;
        return true;
      }
    });
    return refineSelectionSet;
  }

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
  protected _updateSelectionSets(
    removeIds: number[]
  ): void {
    if (removeIds.length > 0) {
      this.selectionSets = this.selectionSets.reduce((prev, cur) => {
        cur.selectedIds = cur.selectedIds.filter(id => removeIds.indexOf(id) < 0);
        if (cur.selectedIds.length > 0 || cur.workflowType === EWorkflowType.REFINE) {
          prev.push(cur);
        }
        return prev;
      }, []);
      this.selectionSetsChanged.emit(this.selectionSets);
    }
  }

  /**
   * Update the refine selection set with any adds or removes
   *
   * @param addIds any ids to add
   * @param removeIds any ids to remove
   *
   * @returns Promise resolving when function is done
   * @protected
   */
  protected _updateRefineSelectionSet(
    addIds: number[],
    removeIds: number[]
  ): void {
    const selectionSet = this._getRefineSelectionSet(this.selectionSets);
    this._updateRefineIds(selectionSet, addIds, removeIds);
    this.selectionSetsChanged.emit(this.selectionSets);
  }

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
  protected _updateRefineIds(
    selectionSet: ISelectionSet,
    addIds: number[],
    removeIds: number[]
  ): ISelectionSet[] {
    // remove ids if they exist in the current add or remove list
    selectionSet.refineIds.addIds = selectionSet.refineIds.addIds.filter(id => removeIds.indexOf(id) < 0)
    selectionSet.refineIds.removeIds = selectionSet.refineIds.removeIds.filter(id => addIds.indexOf(id) < 0)

    const _addIds = [...new Set(selectionSet.refineIds.addIds.concat(addIds))];
    const _removeIds = [...new Set(selectionSet.refineIds.removeIds.concat(removeIds))];
    selectionSet.refineIds = {
      addIds: _addIds.filter(id => _removeIds.indexOf(id) < 0),
      removeIds: _removeIds.filter(id => _addIds.indexOf(id) < 0)
    }
    selectionSet.selectedIds = selectionSet.refineIds.addIds.length > 0 ?
      [...new Set(selectionSet.selectedIds.concat(selectionSet.refineIds.addIds))] :
      selectionSet.selectedIds.filter(id => selectionSet.refineIds.removeIds.indexOf(id) < 0);

    return this.selectionSets.map(ss => {
      return ss.workflowType === EWorkflowType.REFINE ? selectionSet : ss;
    });
  }

  /**
   * Add a new refine selection set
   *
   * @returns updated selection sets
   * @protected
   */
  protected _initRefineSelectionSet(
    selectionSets: ISelectionSet[]
  ): ISelectionSet[] {
    return [
      ...selectionSets,
      ({
        id: Date.now(),
        searchResult: undefined,
        buffer: undefined,
        distance: 0,
        download: true, // TODO think through this again...really only true if we have adds
        unit: "feet",
        label: "Refine",
        selectedIds: [],
        layerView: this.addresseeLayer,
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
      })
    ];
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

  /** Provides access to protected methods for unit testing.
 *
 *  @param methodName Name of protected method to run
 *  @param arg1 First argument to forward to method, e.g., for "_modeChanged", `ESelectionMode`
 *  @returns
 */
  public _testAccess(
    methodName: string,
    arg1?: any
  ): any {
    switch (methodName) {
      case "_modeChanged":
        return this._modeChanged(arg1);
      // case "_setSelectionMode":
      //   return this._setSelectionMode(arg1);
      // case "_getRefineSelectionSetList":
      //   return this._getRefineSelectionSetList();
      // case "_getRefineSelectionSet":
      //   return this._getRefineSelectionSet(arg1);
      // case "_updateSelectionSets":
      //   return this._updateSelectionSets(arg1);
      // case "_updateRefineSelectionSet":
      //   return this._updateRefineSelectionSet(arg1, arg2);
      // case "_updateRefineIds":
      //   return this._updateRefineIds(arg1, arg2, arg3);
      // case "_addRefineSelectionSet":
      //   return this._addRefineSelectionSet(arg1, arg2);
    }
    return null;
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
     * Gets the layer views from the map when the layer selection changes
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    // protected async _layerSelectionChange(
    //   evt: CustomEvent
    // ): Promise<void> {
    //   if (Array.isArray(evt.detail) && evt.detail.length > 0) {
    //     this._selectEnabled = true;
    //     const layerPromises = evt.detail.map(id => {
    //       return getMapLayerView(this.mapView, id)
    //     });

    //     return Promise.all(layerPromises).then((layerViews) => {
    //       this.layerViews = layerViews;
    //     });
    //   } else {
    //     this._selectEnabled = false;
    //   }
    // }

    /**
     * Store the current selection mode
     *
     * @protected
     */
    // protected _setSelectionMode(
    //   mode: ESelectionType
    // ): void {
    //   this._selectionMode = mode;

    //   if (this._hitTestHandle) {
    //     this._hitTestHandle.remove();
    //   }

    //   switch (this._selectionMode) {
    //     case ESelectionType.POINT:
    //       this._sketchViewModel.create("point");
    //       //this._initHitTest();
    //       break;
    //     case ESelectionType.LINE:
    //       this._sketchViewModel.create("polyline");
    //       break;
    //     case ESelectionType.POLY:
    //       this._sketchViewModel.create("polygon");
    //       break;
    //     case ESelectionType.RECT:
    //       this._sketchViewModel.create("rectangle");
    //       break;
    //   }
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
    // protected async _selectFeatures(
    //   geom: __esri.Geometry
    // ): Promise<void> {
    //   this.selectionLoadingChange.emit(true);
    //   const queryFeaturePromises = this.layerViews.map(layerView => {
    //     this._featuresCollection[layerView.layer.id] = [];
    //     return queryFeaturesByGeometry(0, layerView.layer, geom, this._featuresCollection)
    //   });

    //   return Promise.all(queryFeaturePromises).then(async response => {
    //     this.selectionLoadingChange.emit(false);
    //     let graphics = [];
    //     response.forEach(r => {
    //       Object.keys(r).forEach(k => {
    //         graphics = graphics.concat(r[k]);
    //       })
    //     });

    //     if (this.refineMode === ERefineMode.SUBSET) {
    //       this.refineSelectionGraphicsChange.emit({
    //         graphics,
    //         useOIDs: this.layerViews[0].layer.title === this.layerView.layer.title
    //       });
    //     } else {
    //       const oids = Array.isArray(graphics) ? graphics.map(g => g.attributes[g?.layer?.objectIdField]) : [];
    //       await this._updateIds(oids, this.mode, this.refineSelectionSet.undoStack, this.mode);
    //     }
    //     this._clear();
    //   });
    // }

    /**
     * Highlight any selected features in the map
     *
     * @returns Promise resolving when function is done
     * @protected
     */
    // protected async _highlightFeatures(
    //   ids: number[],
    //   updateExtent = false
    // ): Promise<void> {
    //   this._clearHighlight();
    //   if (ids.length > 0) {
    //     state.highlightHandle = await highlightFeatures(ids, this.layerViews[0], this.mapView, updateExtent);
    //   }
    // }

    /**
     * Clear any highlighted features in the map
     *
     * @protected
     */
    // protected _clearHighlight(): void {
    //   state.highlightHandle?.remove();
    // }

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
    // protected async _updateIds(
    //   oids: number[],
    //   mode: ESelectionMode,
    //   operationStack: IRefineOperation[],
    //   operationMode: ESelectionMode
    // ): Promise<void> {
    //   const idUpdates = { addIds: [], removeIds: [] };
    //   if (mode === ESelectionMode.ADD) {
    //     idUpdates.addIds = oids.filter(id => this.ids.indexOf(id) < 0);
    //     this.ids = [...this.ids, ...idUpdates.addIds];
    //     if (idUpdates.addIds.length > 0) {
    //       operationStack.push({ mode: operationMode, ids: idUpdates.addIds });
    //     }
    //   } else {
    //     idUpdates.removeIds = oids.filter(id => this.ids.indexOf(id) > -1);
    //     this.ids = this.ids.filter(id => idUpdates.removeIds.indexOf(id) < 0);
    //     if (idUpdates.removeIds.length > 0) {
    //       operationStack.push({ mode: operationMode, ids: idUpdates.removeIds });
    //     }
    //   }
    //   await this._highlightFeatures(this.ids).then(() => {
    //     this.refineSelectionIdsChange.emit(idUpdates);
    //   });
    // }

}