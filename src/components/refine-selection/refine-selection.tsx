import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop, State, VNode } from '@stencil/core';
import { ESelectionMode, EWorkflowType, ISelectionSet } from '../../utils/interfaces';
import * as utils from "../../utils/publicNotificationUtils";
import RefineSelection_T9n from '../../assets/t9n/refine-selection/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'refine-selection',
  styleUrl: 'refine-selection.css',
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
  @Prop() selectionSets: ISelectionSet[] = [];

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  protected _addEnabled = true;
  protected _refineTools: HTMLRefineSelectionToolsElement;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof RefineSelection_T9n;

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

  @Event() selectionSetsChanged: EventEmitter<ISelectionSet[]>;

  @Listen("refineSelectionIdsChange", { target: 'window' })
  refineSelectionIdsChange(event: CustomEvent): void {
    const addIds = event.detail?.addIds || [];
    const removeIds = event.detail?.removeIds || [];

    this._updateSelectionSetsForRemoveIds(removeIds);
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
  async componentWillLoad() {
    await this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render() {
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
        label={this._translations.featuresAdded?.replace('{{n}}', numAdded.toString())}
      >
        {this._getAction(numAdded > 0, "reset", "", (): void => this._revertSelection(refineSet, true), false, "actions-end")}
      </calcite-list-item>
    ),(
      <calcite-list-item
        label={this._translations.featuresRemoved?.replace('{{n}}', numRemoved.toString())}
      >
        {this._getAction(numRemoved > 0, "reset", "", (): void => this._revertSelection(refineSet, false), false, "actions-end")}
      </calcite-list-item>
    ), (
      <calcite-list-item
        label={this._translations.totalSelected?.replace('{{n}}', total.toString())}
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
   * Create a calcite action
   *
   * @param enabled controls the enabled state of the control
   * @param icon the image to display in the action
   * @param text and supporting text for the action
   * @param onClick the fucntion the actio will execute
   * @param indicator boolean to control if an indicator should be shown (default is false)
   * @param slot the supporting slot to use
   *
   * @returns the calcite action node
   * @protected
   */
  protected _getAction(
    enabled: boolean,
    icon: string,
    text: string,
    onClick: any,
    indicator: boolean = false,
    slot: string = ""
  ): VNode {
    return (
      <calcite-action
        disabled={!enabled}
        icon={icon}
        indicator={indicator}
        onClick={onClick}
        slot={slot}
        text={text} />
    );
  }

  /**
   * Revert an Add or Remove selection
   *
   * @param refineSet the refine set
   * @param isAdd boolean to indicate if we are reverting Add or Remove
   *
   * @returns Promise resolving when function is done
   * @protected
   */
  protected _revertSelection(
    refineSet: ISelectionSet,
    isAdd: boolean
  ): void {
    if (isAdd) {
      refineSet.refineIds.removeIds = refineSet.refineIds.addIds;
      refineSet.selectedIds = refineSet.selectedIds.filter(id => {
        return refineSet.refineIds.addIds.indexOf(id) < 0;
      });
      refineSet.refineIds.addIds = [];
    } else {
      refineSet.refineIds.addIds = refineSet.refineIds.removeIds;
      refineSet.selectedIds = [...new Set([
        ...refineSet.selectedIds,
        ...refineSet.refineIds.addIds
      ])]
      refineSet.refineIds.removeIds = [];
    }
    this._refineTools.reset().then(() => {
      this.selectionSets = this.selectionSets.map(ss => {
        if (ss.workflowType === EWorkflowType.REFINE) {
          ss = refineSet;
        }
        return ss;
      });
      this.selectionSetsChanged.emit(this.selectionSets);
    });
  }

  /**
   * Highlight any selected features in the map
   *
   * @param removeIds the ids to remove
   *
   * @protected
   */
  protected _updateSelectionSetsForRemoveIds(
    removeIds: number[]
  ): void {
    if (removeIds.length > 0) {
      // update the selection sets selectedIds and remove any selection sets that have no selected features
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
    if (selectionSet) {
      const _addIds = [...new Set(selectionSet.refineIds.addIds.concat(addIds))];
      const _removeIds = [...new Set(selectionSet.refineIds.removeIds.concat(removeIds))];
      selectionSet.refineIds = {
        addIds: _addIds.filter(id => _removeIds.indexOf(id) < 0),
        removeIds: _removeIds.filter(id => _addIds.indexOf(id) < 0)
      }
      selectionSet.selectedIds = selectionSet.refineIds.addIds.length > 0 ?
        [...new Set(selectionSet.selectedIds.concat(selectionSet.refineIds.addIds))] :
        selectionSet.selectedIds.filter(id => selectionSet.refineIds.removeIds.indexOf(id) < 0);

      this.selectionSets = this.selectionSets.map(ss => {
        if (ss.workflowType === EWorkflowType.REFINE) {
          return selectionSet;
        } else {
          return ss;
        }
      });
    } else {
      this.selectionSets = [
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
    this.selectionSetsChanged.emit(this.selectionSets);
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
   protected async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof RefineSelection_T9n;
  }

}
