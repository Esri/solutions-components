import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop, State, VNode } from "@stencil/core";
import { ESelectionMode, EWorkflowType, ISelectionSet } from "../../utils/interfaces";
import * as utils from "../../utils/publicNotificationUtils";
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
  @Element() el: HTMLRefineSelectionToolsElement;

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
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * utils/interfaces/ISelectionSet: An array of user defined selection sets
   */
  @Prop({mutable: true}) selectionSets: ISelectionSet[] = [];

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof RefineSelection_T9n;

  /**
   * boolean: Indicates if any new graphics should be added or removed
   */
  protected _addEnabled = true;

  /**
   * HTMLRefineSelectionToolsElement: The html element for the refine selection tools
   */
  protected _refineTools: HTMLRefineSelectionToolsElement;

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
    await this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    return (
      <Host>
        <div class="padding-1">
          <div>
            <calcite-radio-group
              class="w-100"
              onCalciteRadioGroupChange={(evt) => this._modeChanged(evt)}
            >
              <calcite-radio-group-item
                checked={this._addEnabled}
                class="w-50"
                onClick={() => this._setSelectionMode(ESelectionMode.ADD)}
                value={ESelectionMode.ADD}
              >
                {this._translations.add}
              </calcite-radio-group-item>
              <calcite-radio-group-item
                checked={!this._addEnabled}
                class="w-50"
                onClick={() => this._setSelectionMode(ESelectionMode.REMOVE)}
                value={ESelectionMode.REMOVE}
              >
                {this._translations.remove}
              </calcite-radio-group-item>
            </calcite-radio-group>
            <refine-selection-tools
              border={true}
              ids={utils.getSelectionIds(this.selectionSets)}
              layerViews={[this.addresseeLayer]}
              mapView={this.mapView}
              mode={this._addEnabled ? ESelectionMode.ADD : ESelectionMode.REMOVE}
              ref={(el) => { this._refineTools = el }}
              useLayerPicker={false}
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
    this._addEnabled = evt.detail === ESelectionMode.ADD;
  }

  /**
   * Set the refine tools selection mode
   *
   * @protected
   */
  protected _setSelectionMode(
    mode: ESelectionMode
  ): void {
    this._refineTools.mode = mode;
  }

  /**
   * Create a list to show the number added/removed/total unique selected
   *
   * @returns the list node
   * @protected
   */
  protected _getRefineSelectionSetList(): VNode[] {
    const total = utils.getTotal(this.selectionSets);
    const refineSet = this._getRefineSelectionSet(this.selectionSets);
    const numAdded = refineSet?.refineIds.addIds.length || 0;
    const numRemoved = refineSet?.refineIds.removeIds.length || 0;

    return [(
      <calcite-list-item
        label={this._translations.featuresAdded.replace("{{n}}", numAdded.toString())}
      />
    ),(
      <calcite-list-item
        label={this._translations.featuresRemoved.replace("{{n}}", numRemoved.toString())}
      />
    ), (
      <calcite-list-item
        label={this._translations.totalSelected.replace("{{n}}", total.toString())}
      />
    )];
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
        if (cur.selectedIds.length > 0) {
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
    this.selectionSets = selectionSet ?
      this._updateRefineIds(selectionSet, addIds, removeIds) :
      this._addRefineSelectionSet(addIds, removeIds);
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
   * @param addIds any ids to add
   * @param removeIds any ids to remove
   *
   * @returns updated selection sets
   * @protected
   */
  protected _addRefineSelectionSet(
    addIds: number[],
    removeIds: number[]
  ): ISelectionSet[] {
    return [
      ...this.selectionSets,
      ({
        buffer: undefined,
        distance: 0,
        download: true,
        geometries: [],
        id: Date.now(),
        label: "Refine",
        layerView: this.addresseeLayer,
        refineSelectLayers: [],
        searchResult: undefined,
        selectedIds: addIds,
        unit: "feet",
        workflowType: EWorkflowType.REFINE,
        refineIds: {
          addIds: addIds,
          removeIds: removeIds
        }
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
      case "_setSelectionMode":
        return this._setSelectionMode(arg1);
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
}
