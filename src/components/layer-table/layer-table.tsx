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

import { Component, Element, Event, EventEmitter, Host, h, Listen, Prop, State, VNode, Watch } from "@stencil/core";
import LayerTable_T9n from "../../assets/t9n/layer-table/resources.json";
import { loadModules } from "../../utils/loadModules";
import { getLocaleComponentStrings } from "../../utils/locale";
import { getLayerOrTable, goToSelection } from "../../utils/mapViewUtils";
import { queryAllIds, queryFeaturesByGlobalID } from "../../utils/queryUtils";
import * as downloadUtils from "../../utils/downloadUtils";
import { IColumnsInfo, IExportInfos, ILayerInfo, IMapClick, IMapInfo, IToolInfo, IToolSizeInfo } from "../../utils/interfaces";

@Component({
  tag: "layer-table",
  styleUrl: "layer-table.css",
  shadow: false, // FeatureTable styles don't load in shadow dom
})
export class LayerTable {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCrowdsourceManagerElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * string: when provided this layer ID will be used when the app loads
   */
  @Prop() defaultLayerId: string;

  /**
   * string: Global ID of the feature to select
   */
  @Prop() defaultGlobalId: string[];

  /**
   * number: when provided this will be used to select a feature in the table by default
   */
  @Prop() defaultOid: number[];

  /**
   * boolean: when true the layer table will auto refresh the data
   */
  @Prop() enableAutoRefresh: boolean;

  /**
   * boolean: when true the layer table will support drag/drop of columns to adjust order
   */
  @Prop() enableColumnReorder = true;

  /**
   * boolean: when true the export to csv button will be available
   */
  @Prop() enableCSV: boolean;

  /**
   * boolean: when true edits can be applied directly within the table
   */
  @Prop() enableInlineEdit: boolean;

  /**
   * boolean: when true the share widget will be available
   */
  @Prop() enableShare: boolean;

  /**
   * boolean: when true the zoom button will be enabled
   */
  @Prop() enableZoom: boolean;

  /**
   * IMapInfo: key configuration details about the current map
   */
  @Prop() mapInfo: IMapInfo;

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * boolean: When true only editable layers that support the update capability will be available
   */
  @Prop() onlyShowUpdatableLayers: boolean;

  /**
   * boolean: when true the table will be sorted by objectid in descending order by default
   */
  @Prop() showNewestFirst: boolean;

  /**
   * boolean: When true the selected feature will zoomed to in the map and the row will be scrolled to within the table
   */
  @Prop() zoomAndScrollToSelected: boolean;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: When true the user will be asked to confirm the delete operation
   */
  @State() _confirmDelete = false;

  /**
   * IToolSizeInfo[]: The controls that currently fit based on toolbar size
   */
  @State() _controlsThatFit: IToolSizeInfo[];

  /**
   * boolean: When true a loading indicator will be shown in place of the layer table
   */
  @State() _fetchingData = false;

  /**
   * boolean: When true a loading indicator will be shown in the delete button
   */
  @State() _isDeleting = false;

  /**
   * esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
   */
  @State() _layer: __esri.FeatureLayer;

  /**
   * number[]: A list of indexes that are currently selected
   */
  @State() _selectedIndexes: number[] = [];

  /**
   * boolean: When true the show/hide fields list is forced open
   */
  @State() _showHideOpen = false;

  /**
   * boolean: When true only selected records will be shown in the table
   */
  @State() _showOnlySelected = false;

  /**
   * boolean: When true the user has defined a sort order that should override the default order
   */
  @State() _sortActive = false;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof LayerTable_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * esri/widgets/FeatureTable: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html
   */
  protected FeatureTable: typeof import("esri/widgets/FeatureTable");

  /**
   * number[]: A list of all IDs for the current layer
   */
  protected _allIds: number[] = [];

  /**
   * IColumnsInfo: Key/value pair with fieldname/(visible in table)
   */
  protected _columnsInfo: IColumnsInfo;

  /**
   * boolean: When false alerts will be shown to indicate that the layer must have editing enabled for edit actions
   */
  protected _editEnabled: boolean;

  /**
   * boolean: When true the default global id provided via url param has been honored and should now be ignored
   */
  protected _defaultGlobalIdHonored = false;

  /**
   * boolean: When true the default OID provided via url param has been honored and should now be ignored
   */
  protected _defaultOidHonored = false;

  /**
   * IToolSizeInfo[]: The default list of tool size info for tools that should display outside of the dropdown
   */
  protected _defaultVisibleToolSizeInfos: IToolSizeInfo[];

  /**
   * boolean: When false alerts will be shown to indicate that the layer must have delete and editing enabled
   */
  protected _deleteEnabled: boolean;

  /**
   * IHandle: The map click handle
   */
  protected _mapClickHandle: IHandle;

  /**
   * esri/core/reactiveUtils: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html
   */
  protected reactiveUtils: typeof import("esri/core/reactiveUtils");

  /**
   * ResizeObserver: The observer that watches for toolbar size changes
   */
  protected _resizeObserver: ResizeObserver;

  /**
   * HTMLCalciteCheckboxElement: Element to force selection of all records
   */
  protected _selectAllElement: HTMLCalciteCheckboxElement;

  /**
   * HTMLCalciteDropdownElement: Dropdown the will support show/hide of table columns
   */
  protected _showHideDropdown: HTMLCalciteDropdownElement;

  /**
   * HTMLCalciteDropdownElement: Dropdown the will support overflow tools that won't fit in the current display
   */
  protected _moreDropdown: HTMLCalciteDropdownElement;

  /**
   * esri/widgets/FeatureTable: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-FeatureTable.html
   */
  protected _table: __esri.FeatureTable;

  /**
   * HTMLDivElement: Element to hold the FeatureTable
   */
  protected _tableNode: HTMLDivElement;

  /**
   * bool: When true the table is being sorted
   */
  protected _tableSorting = false;

  /**
   * any: Timeout used to limit redundancy for toolbar resizing
   */
  protected _timeout: any;

  /**
   * HTMLDivElement: The toolbars containing node
   */
  protected _toolbar: HTMLDivElement;

  /**
   * IToolSizeInfo[]: Id and Width for the current tools
   */
  protected _toolbarSizeInfos: IToolSizeInfo[];

  /**
   * IToolInfo[]: Key details used for creating the tools
   */
  protected _toolInfos: IToolInfo[];

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  /**
   * Reset the toolInfos when zoom tool is enabled/disabled
   */
  @Watch("enableZoom")
  enableZoomWatchHandler(): void {
    if (this._toolInfos?.length > 0) {
      this._initToolInfos();
    }
  }

  /**
   * Reset the toolInfos when export csv is enabled/disabled
   */
  @Watch("enableCSV")
  enableCSVWatchHandler(): void {
    if (this._toolInfos?.length > 0) {
      this._initToolInfos();
    }
  }

  /**
   * Update the table when enableInlineEdit is enabled/disabled
   */
  @Watch("enableInlineEdit")
  enableInlineEditWatchHandler(): void {
    if (this._table) {
      this._table.editingEnabled = this._editEnabled && this.enableInlineEdit;
    }
  }

  /**
   * watch for changes to the list of controls that will currently fit in the display
   */
  @Watch("_controlsThatFit")
  _controlsThatFitWatchHandler(): void {
    const ids = this._controlsThatFit ? this._controlsThatFit.reduce((prev, cur) => {
      prev.push(cur.id)
      return prev;
    }, []) : [];
    this._toolInfos = this._toolInfos.map(ti => {
      if (ti && this._controlsThatFit) {
        const id = this._getId(ti.icon);
        ti.isOverflow = ids.indexOf(id) < 0;
        return ti;
      }
    })
  }

  /**
   * watch for changes in map view and get the first layer
   */
  @Watch("mapView")
  async mapViewWatchHandler(): Promise<void> {
    if (this._mapClickHandle) {
      this._mapClickHandle.remove();
    }
    if (this.mapView) {
      this._mapClickHandle = this.reactiveUtils.on(
        () => this.mapView,
        "click",
        (event) => {
          void this._mapClicked(event);
        }
      );
    }
  }

  /**
   * watch for changes in layer view and verify if it has editing enabled
   */
  @Watch("_layer")
  async _layerWatchHandler(): Promise<void> {
    this._fetchingData = true;
    await this._resetTable();
    this._fetchingData = false;
  }

  /**
   * watch for selection changes
   */
  @Watch("_selectedIndexes")
  async _selectedIndexesWatchHandler(): Promise<void> {
    this._validateEnabledActions();
  }

  /**
   * When sortActive is false the user has not defined a sort and we should use the default sort
   */
  @Watch("_sortActive")
  async _sortActiveWatchHandler(): Promise<void> {
    if (!this._sortActive) {
      await this._sortTable();
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
   */
  @Event() featureSelectionChange: EventEmitter<number[]>;

  /**
   * Emitted on demand when the filters button is clicked
   */
  @Event({
    eventName: 'openFilterOptions',
    composed: true,
    bubbles: true
  }) openFilterOptions: EventEmitter<void>;

  /**
   * Emitted on demand when the share button is clicked
   */
  @Event() openShare: EventEmitter<__esri.MapView>;

  /**
   * Scroll and zoom to the selected feature from the Features widget.
   *
   * @param evt CustomEvent the graphic for the current selection
   */
  @Listen("selectionChanged", { target: "window" })
  async selectionChanged(
    evt: CustomEvent
  ): Promise<void> {
    if (this.zoomAndScrollToSelected) {
      const g: __esri.Graphic = evt.detail;
      const oid = g.getObjectId();
      const i: number = this._table.viewModel.getObjectIdIndex(oid);

      this._table.scrollToIndex(i);
      const layer = g.layer;
      const layerViews = this.mapView.allLayerViews.toArray();
      let layerView: __esri.FeatureLayerView;
      layerViews.some(lv => {
        if (lv.layer.title === layer.title && lv.layer.type === 'feature') {
          layerView = lv as __esri.FeatureLayerView;
          return true;
        }
      });

      if (layerView) {
        await goToSelection([oid], layerView, this.mapView, true);
      }
    }
  }

  /**
   * Refresh the table when edits are completed
   *
   */
  @Listen("editsComplete", { target: "window" })
  async editsComplete(): Promise<void> {
    await this._refresh();
  }

  /**
   * Refresh the table when edits are completed
   *
   */
  @Listen("noLayersFound", { target: "window" })
  noLayersFound(): void {
    this._layer = undefined;
    this._allIds = [];
    this._clearSelection();
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    await this._initModules();
    this._initToolInfos();
    this._resizeObserver = new ResizeObserver(() => this._onResize());
  }

  /**
   * Renders the component.
   */
  render() {
    const tableNodeClass = this._fetchingData ? "display-none" : "";
    const loadingClass = this._fetchingData ? "" : "display-none";
    const total = this._allIds.length.toString();
    const selected = this._selectedIndexes.length.toString();
    return (
      <Host>
        <calcite-shell>
          {this._getTableControlRow("header")}
          <div class="height-full-adjusted width-full">
            <calcite-panel class="height-full width-full">
              <calcite-loader
                class={loadingClass}
                label={this._translations.fetchingData}
                scale="l"
              />
              <div
                class={tableNodeClass}
                ref={this.onTableNodeCreate}
              />
            </calcite-panel>
            <div class="bottom-left text-color height-19">
              {
                this._translations.recordsSelected
                  .replace("{{total}}", total)
                  .replace("{{selected}}", selected)
              }
            </div>
          </div>
        </calcite-shell>
        {this._deleteMessage()}
      </Host>
    );
  }

  /**
   * Called once after the component is loaded
   */
  async componentDidLoad(): Promise<void> {
    this._resizeObserver.observe(this._toolbar);
    document.onclick = (e) => this._handleDocumentClick(e);
  }

  /**
   * Called after the component is rendered
   */
  componentDidRender(): void {
    this._updateToolbar();
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected async _initModules(): Promise<void> {
    const [FeatureTable, reactiveUtils] = await loadModules([
      "esri/widgets/FeatureTable",
      "esri/core/reactiveUtils"
    ]);
    this.FeatureTable = FeatureTable;
    this.reactiveUtils = reactiveUtils;
  }

  /**
   * Update the toolbar when its size changes
   *
   * @returns void
   */
  protected _onResize(): void {
    this._updateToolbar()
  }

  /**
   * Gets a row of controls that can be used for various interactions with the table
   *
   * @param slot string optional slot to display the control within
   *
   * @returns The dom node that contains the controls
   */
  protected _getTableControlRow(
    slot?: string
  ): VNode {
    const id = "more-table-options";
    return (
      <div
        class="display-flex border-bottom height-51"
        ref={(el) => this._toolbar = el}
        slot={slot}
      >
        {this._getActionBar()}
        {this._getDropdown(id)}
        {this.enableShare ? this._getShare("share") : undefined}
      </div>
    );
  }

  /**
   * Gets a row of controls that can be used for various interactions with the table
   *
   * @param slot string optional slot to display the control within
   *
   * @returns The dom node that contains the controls
   */
  protected _getActionBar(): VNode {
    return (
      <calcite-action-bar
        expandDisabled={true}
        expanded={true}
        id={this._getId("bar")}
        layout="horizontal"
      >
        <div class="border-end" id="solutions-map-layer-picker-container">
          <map-layer-picker
            appearance="transparent"
            defaultLayerId={this.defaultLayerId}
            mapView={this.mapView}
            onLayerSelectionChange={(evt) => this._layerSelectionChanged(evt)}
            onlyShowUpdatableLayers={this.onlyShowUpdatableLayers}
            placeholderIcon="layers"
            scale="l"
            showTables={true}
            type="dropdown"
          />
        </div>
        {this._getActions()}
      </calcite-action-bar>
    );
  }

  /**
   * Get the actions that are used for various interactions with the table
   *
   * @returns VNode[] the action nodes
   */
  protected _getActions(): VNode[] {
    const actions = this._getActionItems();
    return actions.reduce((prev, cur) => {
      if (cur && !cur.isOverflow) {
        prev.push(
          cur.isDanger ?
            this._getDangerAction(cur.icon, cur.label, cur.func, cur.disabled) :
            cur.isSublist ? (
              <calcite-dropdown
                closeOnSelectDisabled={true}
                id={this._getId(cur.icon)}
                onCalciteDropdownBeforeClose={() => this._forceShowHide()}
                ref={(el) => this._showHideDropdown = el}
              >
                {this._getAction(this._showHideOpen ? "chevron-down" : cur.icon, cur.label, cur.func, cur.disabled, "trigger")}
                {this._showHideOpen ? this._getFieldlist() : undefined}
              </calcite-dropdown>
            ) :
            this._getAction(cur.icon, cur.label, cur.func, cur.disabled)
        )
      }
      return prev;
    }, []);
  }

  /**
   * Get the list of fields as dropdown items and store the current selected state so
   * we can show/hide the appropriate fields
   *
   * @returns Node with the fields as dropdown items
   */
  _getFieldlist(): VNode {
    return this._columnsInfo ? (
      <calcite-dropdown-group
        selection-mode="multiple"
      >
        {
          Object.keys(this._columnsInfo).map(k => {
            const selected = this._columnsInfo[k];
            return (
              <calcite-dropdown-item
                id={k}
                onClick={(e) => {
                  const target = e.target;
                  this._columnsInfo[target.id] = target.selected;
                  if (!target.selected) {
                    this._table.hideColumn(target.id);
                  } else {
                    this._table.showColumn(target.id);
                  }
                }}
                selected={selected}
              >
                {k}
              </calcite-dropdown-item>
            )
          })
        }
      </calcite-dropdown-group>
    ) : undefined;
  }

  /**
   * Update actions enabled prop based on number of selected indexes
   *
   * @returns void
   */
  _validateEnabledActions(): void {
    const featuresSelected = this._featuresSelected();
    const selectionDependant = [
      "zoom-to-object",
      "trash",
      "erase",
      "selected-items-filter"
    ];
    this._toolInfos.forEach(ti => {
      if (ti && selectionDependant.indexOf(ti.icon) > -1) {
        ti.disabled = !featuresSelected;
      }
    });
  }

  /**
   * Get the full list of toolInfos.
   * Order is important. They should be listed in the order they should display in the UI from
   * Left to Right for the action bar and Top to Bottom for the dropdown.
   *
   * @returns void
   */
  protected _initToolInfos(): void {
    const featuresSelected = this._featuresSelected();
    const featuresEmpty = this._featuresEmpty();
    this._toolInfos = [this.enableZoom ? {
      icon: "zoom-to-object",
      label: this._translations.zoom,
      func: () => this._zoom(),
      disabled: !featuresSelected,
      isOverflow: false
    } : undefined,
    this.mapInfo?.filters ? {
      icon: "filter",
      label: this._translations.filters,
      func: () => this._filter(),
      disabled: false,
      isOverflow: false
    } : undefined,
    this._deleteEnabled ? {
      icon: "trash",
      label: this._translations.delete,
      func: () => this._delete(),
      disabled: !featuresSelected,
      isDanger: true,
      isOverflow: false
    } : undefined, {
      icon: "erase",
      label: this._translations.clearSelection,
      func: () => this._clearSelection(),
      disabled: !featuresSelected,
      isOverflow: false
    }, {
      icon: "selected-items-filter",
      label: this._showOnlySelected ? this._translations.showAll : this._translations.showSelected,
      func: () => this._toggleShowSelected(),
      disabled: !featuresSelected,
      isOverflow: false
    }, {
      icon: "list-check-all",
      func: () => this._selectAll(),
      label: this._translations.selectAll,
      disabled: featuresEmpty,
      isOverflow: false
    }, {
      icon: "compare",
      func: () => this._switchSelected(),
      label: this._translations.switchSelected,
      disabled: featuresEmpty,
      isOverflow: false
    }, {
      icon: "refresh",
      func: () => this._refresh(),
      label: this._translations.refresh,
      disabled: false,
      isOverflow: false
    },
    this.enableCSV ? {
      icon: "export",
      func: () => void this._exportToCSV(),
      label: this._translations.exportCSV,
      disabled: featuresEmpty,
      isOverflow: false
    } : undefined, {
      icon: this._showHideOpen ? "chevron-down" : "chevron-right",
      func: () => this._toggleShowHide(),
      label: this._translations.showHideColumns,
      disabled: false,
      isOverflow: false,
      isSublist: true
    }];

    this._defaultVisibleToolSizeInfos = undefined;
  }

  /**
   * Returns true when one ore more features are selected
   *
   * @returns boolean
   */
  protected _featuresSelected(): boolean {
    return this._selectedIndexes.length > 0;
  }

  /**
   * Return true when we have no features
   *
   * @returns boolean
   */
  protected _featuresEmpty(): boolean {
    return this._allIds.length === 0;
  }

  /**
   * Add/Remove tools from the action bar and dropdown based on available size
   *
   * @returns void
   */
  protected _updateToolbar(): void {
    if (this._timeout) {
      clearTimeout(this._timeout)
    }

    this._timeout = setTimeout(() => {
      clearTimeout(this._timeout)

      this._setToolbarSizeInfos();

      const toolbarWidth = this._toolbar.offsetWidth;
      let controlsWidth = this._toolbarSizeInfos.reduce((prev, cur) => {
        prev += cur.width;
        return prev;
      }, 0);

      const skipControls = ["solutions-more", "solutions-map-layer-picker-container", "solutions-action-share"];
      if (controlsWidth > toolbarWidth) {
        if (this._toolbarSizeInfos.length > 0) {
          const controlsThatFit = [...this._toolbarSizeInfos].reverse().reduce((prev, cur) => {
            if (skipControls.indexOf(cur.id) < 0) {
              if (controlsWidth > toolbarWidth) {
                controlsWidth -= cur.width;
              } else {
                prev.push(cur);
              }
            }
            return prev;
          }, []).reverse();

          this._setControlsThatFit(controlsThatFit, skipControls);
        }
      } else {
        if (this._defaultVisibleToolSizeInfos) {
          const currentTools = this._toolbarSizeInfos.reduce((prev, cur) => {
            prev.push(cur.id);
            return prev;
          }, []);

          let forceFinish = false;
          const controlsThatFit = [...this._defaultVisibleToolSizeInfos].reduce((prev, cur) => {
            if (!forceFinish && skipControls.indexOf(cur.id) < 0 &&
              (currentTools.indexOf(cur.id) > -1 || (controlsWidth + cur.width) <= toolbarWidth)
            ) {
              if (currentTools.indexOf(cur.id) < 0) {
                controlsWidth += cur.width;
              }
              prev.push(cur);
            } else if (skipControls.indexOf(cur.id) < 0 && (controlsWidth + cur.width) > toolbarWidth) {
              // exit the first time we evalute this as true...otherwise it will add the next control that will fit
              // and not preserve the overall order of controls
              forceFinish = true;
            }
            return prev;
          }, []);

          this._setControlsThatFit(controlsThatFit, skipControls);
        }
      }
    }, 5);
  }

  /**
   * Validate if controls that fit the current display has changed or
   * is different from what is currently displayed
   *
   * @returns void
   */
  _setControlsThatFit(
    controlsThatFit: IToolSizeInfo[],
    skipControls: string[]
  ): void {
    let update = JSON.stringify(controlsThatFit) !== JSON.stringify(this._controlsThatFit);
    const actionbar = document.getElementById("solutions-action-bar");
    actionbar.childNodes.forEach((n: any) => {
      if (skipControls.indexOf(n.id) < 0 && !update) {
        update = this._controlsThatFit.map(c => c.id).indexOf(n.id) < 0;
      }
    });
    if (update) {
      this._controlsThatFit = [...controlsThatFit];
    }
  }

  /**
   * Get the id and size for the toolbars current items
   *
   * @returns void
   */
  protected _setToolbarSizeInfos(): void {
    let hasWidth = false;
    this._toolbarSizeInfos = [];
    this._toolbar.childNodes.forEach((c: any, i) => {
      // handle the action bar
      if (i === 0) {
        c.childNodes.forEach((actionbarChild: any) => {
          this._toolbarSizeInfos.push({
            id: actionbarChild.id,
            width: actionbarChild.offsetWidth
          });
          if (!hasWidth) {
            hasWidth = actionbarChild.offsetWidth > 0;
          }
        });
      } else if (!c.referenceElement) {
        // skip tooltips
        this._toolbarSizeInfos.push({
          id: c.id,
          width: c.offsetWidth
        });
        if (!hasWidth) {
          hasWidth = c.offsetWidth > 0;
        }
      }
    });
    if (hasWidth && !this._defaultVisibleToolSizeInfos) {
      this._defaultVisibleToolSizeInfos = [...this._toolbarSizeInfos];
    }
  }

  /**
   * Get a list of toolInfos that should display outside of the dropdown
   *
   * @returns IToolInfo[] the list of toolInfos that should not display in the overflow dropdown
   */
  protected _getActionItems(): IToolInfo[] {
    return this._toolInfos.filter(toolInfo => toolInfo && !toolInfo.isOverflow)
  }

  /**
   * Get a list of toolInfos that should display in the dropdown
   *
   * @param id string the id for the dropdown and its tooltip
   *
   * @returns VNode the dropdown node
   */
  protected _getDropdown(
    id: string
  ): VNode {
    const dropdownItems = this._getDropdownItems();
    return dropdownItems.length > 0 ? (
      <calcite-dropdown
        closeOnSelectDisabled={true}
        disabled={this._layer === undefined}
        id="solutions-more"
        onCalciteDropdownBeforeClose={() => this._forceShowHide()}
        ref={(el) => this._moreDropdown = el}
      >
      <calcite-action
        appearance="solid"
        id={id}
        label=""
        onClick={() => this._closeShowHide()}
        slot="trigger"
        text=""
      >
        <calcite-button
          appearance="transparent"
          iconEnd="chevron-down"
          kind="neutral"
        >
          {this._translations.more}
        </calcite-button>
      </calcite-action>
      <calcite-dropdown-group selection-mode="none">
        {
          dropdownItems.map(item => {
            return (
              <calcite-dropdown-group
                class={item.disabled ? "disabled" : ""}
                selectionMode={item.disabled ? "none" : "single"}
              >
                <calcite-dropdown-item
                  iconStart={item.isSublist && this._showHideOpen ? "chevron-down" : item.icon}
                  id="solutions-subset-list"
                  onClick={item.func}
                >
                  {item.label}
                </calcite-dropdown-item>
              </calcite-dropdown-group>
            )
          })
        }
      </calcite-dropdown-group>
      {this._showHideOpen ? this._getFieldlist() : undefined}
    </calcite-dropdown>
    ) : undefined;
  }

  /**
   * Get a list of toolInfos that should display in the dropdown
   *
   * @returns IToolInfo[] the list of toolInfos that should display in the dropdown
   */
  protected _getDropdownItems(): IToolInfo[] {
    return this._toolInfos.filter(toolInfo => toolInfo && toolInfo.isOverflow)
  }

  /**
   * Get an action and tooltip
   *
   * @param icon string the name of the icon to display, will also be used as the id
   * @param label string the text to display and label the action
   * @param func any the function to execute
   * @param disabled boolean when true the user will not be able to interact with the action
   *
   * @returns VNode The node representing the DOM element that will contain the action
   */
  protected _getAction(
    icon: string,
    label: string,
    func: any,
    disabled: boolean,
    slot?: string
  ): VNode {
    const _disabled = this._layer === undefined ? true : disabled;
    return (
      <div class={"display-flex"} id={this._getId(icon)} slot={slot}>
        <calcite-action
          appearance="solid"
          disabled={_disabled}
          icon={icon}
          id={icon}
          label={label}
          onClick={func}
          text={label}
          textEnabled={true}
        />
        {this._getToolTip("bottom", icon, label)}
      </div>
    )
  }

  /**
   * Get an action and tooltip for share
   *
   * @param icon string the name of the icon to display, will also be used in its id
   *
   * @returns VNode The node representing the DOM element that will contain the action
   */
  protected _getShare(
    icon: string
  ): VNode {
    return (
      <div class={"share-action height-51 border-bottom"} id={this._getId(icon)}>
        <calcite-action
          appearance="solid"
          class="height-50"
          icon={icon}
          id={icon}
          onClick={() => this.openShare.emit(this.mapView)}
          text=""
          textEnabled={false}
        />
        {this._getToolTip("bottom", icon, this._translations.share)}
      </div>
    )
  }

  /**
   * Get a tooltip
   *
   * @param label string accessible name for the component
   * @param placement string where the tooltip should display
   * @param referenceElement string the element the tooltip will be associated with
   * @param text string the text to display in the tooltip
   *
   * @returns VNode The tooltip node
   */
  protected _getToolTip(
    placement: string,
    referenceElement: string,
    text: string
  ): VNode {
    return (
      <calcite-tooltip
        placement={placement}
        reference-element={referenceElement}
      >
        <span>{text}</span>
      </calcite-tooltip>
    )
  }

  /**
   * Get an id with a prefix to the user supplied value
   *
   * @param id the unique value for the id
   *
   * @returns the new id with the prefix value
   */
  protected _getId(
    id: string
  ): string {
    return `solutions-action-${id}`;
  }

  /**
   * Get an action with danger color icon and text
   *
   * @param icon string the name of the icon to display, will also be used as the id
   * @param label string the text to display and label the action
   * @param func any the function to execute
   * @param disabled boolean when true the user will not be able to interact with the action
   *
   * @returns VNode The node representing the DOM element that will contain the action
   */
  private _getDangerAction(
    icon: string,
    label: string,
    func: any,
    disabled: boolean
  ): VNode {
    const _disabled = this._layer === undefined ? true : disabled;
    return (
      <div class="display-flex" id={this._getId(icon)}>
        <calcite-action
          appearance="solid"
          disabled={_disabled}
          id={icon}
          onClick={func}
          text=""
        >
          <calcite-button
            appearance="transparent"
            iconStart={icon}
            kind="danger"
          >
            {label}
          </calcite-button>
        </calcite-action>
        {this._getToolTip("bottom", icon, label)}
      </div>
    )
  }

  /**
   * Store a reference to the table node after it's first created
   * and initializes the FeatureTable
   *
   * @param node HTMLDivElement The node representing the DOM element that will contain the widget.
   *
   * @returns void
   */
  private onTableNodeCreate = (
    node: HTMLDivElement
  ) => {
    this._tableNode = node;
  }

  /**
   * Initialize the FeatureTable
   *
   * @param node HTMLDivElement The node representing the DOM element that will contain the widget.
   *
   * @returns void
   */
  protected async _getTable(
    node: HTMLDivElement,
    columnTemplates?: __esri.FieldColumnTemplate[]
  ): Promise<void> {
    if (this._layer) {
      await this._layer.when(() => {
        this._table = new this.FeatureTable({
          autoRefreshEnabled: this.enableAutoRefresh,
          layer: this._layer,
          view: this.mapView,
          columnReorderingEnabled: this.enableColumnReorder,
          editingEnabled: this._editEnabled && this.enableInlineEdit,
          highlightEnabled: true,
          multiSortEnabled: false,
          visibleElements: {
            header: false,
            menu: false
          },
          tableTemplate: {
            columnTemplates
          },
          container: node
        } as __esri.FeatureTableProperties);
      });

      this._initColumnsInfo();

      this._checkEditEnabled();

      await this._table.when(() => {
        this._table.highlightIds.on("change", () => {
          // https://github.com/Esri/solutions-components/issues/365
          this._selectedIndexes = this._table.highlightIds.toArray().reverse();
          if (this._showOnlySelected) {
            if (this._featuresSelected()) {
              this._table.filterBySelection();
            } else {
              this._toggleShowSelected();
            }
          }
          this.featureSelectionChange.emit(this._selectedIndexes);
        });

        this.reactiveUtils.watch(
          () => this._table.activeSortOrders,
          (sortOrders) => {
            this._sortActive = this._layer ? (sortOrders.length > 0 && sortOrders[0]?.direction === "asc" || sortOrders[0]?.direction === "desc") ||
              sortOrders[0]?.direction === null && sortOrders[0]?.fieldName === this._layer.objectIdField : false;
          });
      });
    }
  }

  /**
   * Reset basic table props
   *
   * @returns void
   */
  protected async _resetTable(): Promise<void> {
    this._clearSelection();
    this._allIds = [];
    this.featureSelectionChange.emit(this._selectedIndexes);

    const columnTemplates = this._getColumnTemplates(this._layer.id, this._layer?.popupTemplate?.fieldInfos);
    this._allIds = await queryAllIds(this._layer);

    if (!this._table) {
      await this._getTable(this._tableNode, columnTemplates);
    } else if (columnTemplates) {
      this._table.tableTemplate.columnTemplates = columnTemplates;
    }

    this._table.layer = this._layer;
    this._table.view = this.mapView;
    this._checkEditEnabled();
    this._table.editingEnabled = this._editEnabled && this.enableInlineEdit;
    this._initToolInfos();

    await this._table.when(async () => {
      this._table.highlightIds.removeAll();
      this._table.clearSelectionFilter();
      this._initColumnsInfo();

      if (!this._defaultOidHonored && this.defaultOid?.length > 0 && this.defaultOid[0] > -1) {
        this._selectDefaultFeature(this.defaultOid);
        this._defaultOidHonored = true
      }

      if (!this._defaultGlobalIdHonored && this.defaultGlobalId?.length > 0) {
        const features = await queryFeaturesByGlobalID(this.defaultGlobalId, this._layer);
        const oids = features?.length > 0 ? features.map(f => f.getObjectId()) : undefined;
        if (oids) {
          this._selectDefaultFeature(oids);
        }
        this._defaultGlobalIdHonored = true;
      }
    });

    this._showOnlySelected = false;
    this._sortActive = false;
    await this._sortTable();
  }

  /**
   * Store the column names and current hidden status to support show/hide of columns
   *
   * @returns void
   */
  protected _initColumnsInfo(): void {
    this._columnsInfo = this._table.columns.reduce((prev, cur: any) => {
      prev[cur.name] = !cur.hidden;
      return prev;
    }, {});
  }

  /**
   * Select the feature that was specified via url params
   *
   * @returns void
   */
  protected _selectDefaultFeature(
    oids: number[]
  ): void {
    if (oids.length > 0) {
      this._table.highlightIds.addMany(oids);
      void this._table.when(() => {
        const i = this._table.viewModel.getObjectIdIndex(oids[0]);
        this._table.viewModel.scrollToIndex(i);
      });
    }
  }

  /**
   * Verify edit capabilities of the layer
   *
   * @returns void
   */
  protected _checkEditEnabled(): void {
    this._editEnabled = this._layer.editingEnabled && this._layer.capabilities.operations.supportsUpdate;
    this._deleteEnabled = this._layer.editingEnabled && this._layer.capabilities.operations.supportsDelete;
  }

  /**
   * Sort the objectid field in descending order
   *
   * @returns void
   */
  protected async _sortTable(): Promise<void> {
    if (this._table && this._layer && !this._sortActive) {
      if (!this._tableSorting && this.showNewestFirst) {
        this._tableSorting = true;
        await this._table.when();
        await this._layer.when(() => {
          this._table.sortColumn(this._layer.objectIdField, "desc");
          this._tableSorting = false;
        });
      }
    }
  }

  /**
   * Open show/hide dropdown
   */
  protected _forceShowHide(): void {
    if(this._showHideDropdown) {
      this._showHideDropdown.open = this._showHideOpen;
    }
    if(this._moreDropdown) {
      this._moreDropdown.open = this._showHideOpen;
    }
  }

  /**
   * Toggle show/hide dropdown
   */
  protected _toggleShowHide(): void {
    this._showHideOpen = !this._showHideOpen;
  }

  /**
   * Open show/hide dropdown
   */
  protected _closeShowHide(): void {
    this._showHideOpen = false;
  }

  /**
   * Close show/hide dropdown when the user clicks outside of it
   */
  protected _handleDocumentClick(
    e: MouseEvent
  ): void {
    const id = (e.target as any)?.id;
    if (this._showHideOpen && Object.keys(this._columnsInfo).indexOf(id) < 0 && id !== "solutions-subset-list" && id !== "chevron-right"){
      this._closeShowHide();
      if (this._moreDropdown) {
        this._moreDropdown.open = false;
      }
      if (this._showHideDropdown) {
        this._showHideDropdown.open = false;
      }
    }
  }

  /**
   * Show delete confirmation message
   *
   * @returns node to confirm or deny the delete operation
   */
  protected _deleteMessage(): VNode {
    return (
      <calcite-modal
        aria-labelledby="modal-title"
        kind="danger"
        onCalciteModalClose={() => this._deleteClosed()}
        open={this._confirmDelete}
      >
        <div
          class="display-flex align-center"
          id="modal-title"
          slot="header"
        >
          {this._translations.deleteFeature}
        </div>
        <div slot="content">
          {this._translations.confirm}
        </div>
        <calcite-button
          appearance="outline"
          kind="danger"
          onClick={() => this._deleteClosed()}
          slot="secondary"
          width="full"
        >
          {this._translations.cancel}
        </calcite-button>
        <calcite-button
          kind="danger"
          loading={this._isDeleting}
          onClick={() => void this._deleteFeatures()}
          slot="primary" width="full">
          {this._translations.delete}
        </calcite-button>
      </calcite-modal>
    );
  }

  /**
   * Delete the currently selected features
   *
   * @returns void
   */
  protected async _deleteFeatures(): Promise<void> {
    this._isDeleting = true;
    const deleteFeatures = this._table.highlightIds.toArray().map((objectId) => {
      return {objectId};
    })
    await this._layer.applyEdits({
      deleteFeatures
    });
    await this._table.refresh();
    this._allIds = await queryAllIds(this._layer);
    this._isDeleting = false;
    this._deleteClosed();
  }

  /**
   * Handle map click events to keep table and map click selection in sync
   *
   * @param evt IMapClick map click event details
   *
   * @returns void
   */
  protected async _mapClicked(
    evt: IMapClick
  ): Promise<void> {
    const opts = {
      include: this._layer
    };
    const hitTestResult = await this.mapView.hitTest(evt.screenPoint, opts);
    if (hitTestResult.results.length > 0) {
      hitTestResult.results.forEach((result: any) => {
        this._clearSelection();
        const id = (result.graphic as __esri.Graphic).getObjectId();
        const index = this._table.highlightIds.indexOf(id);
        if (index > -1) {
          this._table.highlightIds.removeAt(index);
        } else {
          this._table.highlightIds.add(id);
        }
      });
      if (this._showOnlySelected) {
        this._table.filterBySelection();
      }
    }
  }

  /**
   * Set the alertOpen member to false when the alert is closed
   *
   * @returns void
   */
  protected _deleteClosed(): void {
    this._confirmDelete = false;
  }

  /**
   * Select or deselect all rows
   *
   * @returns void
   */
  protected _selectAll(): void {
    const ids = this._allIds;
    this._table.highlightIds.removeAll();
    this._table.highlightIds.addMany(ids);
    this._selectedIndexes = ids;
  }

  /**
   * Toggle the show only selected flag
   *  When showOnly is true only the selected features will be shown in the table
   *
   * @returns void
   */
  protected _toggleShowSelected(): void {
    this._showOnlySelected = !this._showOnlySelected;
    if (this._showOnlySelected) {
      this._table.filterBySelection();
    } else {
      this._table.clearSelectionFilter();
    }
  }

  /**
   * Clears the selected indexes
   *
   * @returns void
   */
  protected _clearSelection(): void {
    this._selectedIndexes = [];
    this._table?.highlightIds.removeAll();
  }

  /**
   * Show the filter options
   *
   * @returns void
   */
  protected _filter(): void {
    this.openFilterOptions.emit();
  }

  /**
   * Select all rows that are not currently selectd
   *
   * @returns void
   */
  protected _switchSelected(): void {
    const currentIndexes = [...this._selectedIndexes];
    this._table.highlightIds.removeAll();
    const ids = this._allIds.reduce((prev, _cur) => {
      if (currentIndexes.indexOf(_cur) < 0) {
        prev.push(_cur);
      }
      return prev;
    }, []).sort((a,b) => a - b);
    this._table.highlightIds.addMany(ids);
    this._selectedIndexes = ids;
  }

  /**
   * Export all selected rows as CSV
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected async _exportToCSV(): Promise<void> {
    const exportInfos: IExportInfos = {};
    const ids = this._table.highlightIds.toArray();
    exportInfos[this._layer.id] = {
      selectionSetNames: [this._layer.title],
      ids,
      layer: this._layer
    }
    void downloadUtils.downloadCSV(
      null,//???
      exportInfos,
      false, // formatUsingLayerPopup
      false, // removeDuplicates
      true, // addColumnTitle
    );
  }

  /**
   * Refreshes the table and maintains the curent scroll position
   *
   * @returns void
   */
  protected async _refresh(): Promise<void> {
    await this._table.refresh();
    this.featureSelectionChange.emit(this._selectedIndexes);
  }

  /**
   * Zoom to all selected features
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected _zoom(): void {
    this._table.zoomToSelection();
  }

  /**
   * Delete all selected records or shows an alert if the layer does not have editing enabled
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected _delete(): void {
    this._confirmDelete = true;
  }

  /**
   * Handles layer selection change to show new table
   *
   * @param evt CustomEvent the id for the current layer
   *
   * @returns a promise that will resolve when the operation is complete
   */
  protected async _layerSelectionChanged(
    evt: CustomEvent
  ): Promise<void> {
    const id: string = evt.detail[0];
    if (id !== this._layer?.id || this._featuresEmpty()) {
      this._fetchingData = true;
      const layer = await getLayerOrTable(this.mapView, id);
      await layer.when(() => {
        this._layer = layer;
      });
    }
    this._fetchingData = false;
  }

  /**
   * Get any columnt templates for the current map
   *
   * @param id item ID of the current map
   *
   * @returns a list of column templates if they exist
   */
  protected _getColumnTemplates(
    id: string,
    fieldInfos: __esri.FieldInfo[]
  ): __esri.FieldColumnTemplate[] {
    let layerInfo: ILayerInfo;
    this.mapInfo.layerInfos?.some(li => {
      if (li.id === id) {
        layerInfo = li;
        return true;
      }
    });

    let columnTemplates = layerInfo?.columnTemplates;
    if (fieldInfos) {
      columnTemplates = columnTemplates ? columnTemplates.map(columnTemplate => {
        fieldInfos.some(fieldInfo => {
          if (fieldInfo.fieldName === columnTemplate.fieldName) {
            columnTemplate.label = fieldInfo.label;
            return true;
          }
        });
        return columnTemplate;
      }) : fieldInfos.map(fieldInfo => {
        return {
          type: "field",
          fieldName: fieldInfo.fieldName,
          label: fieldInfo.label
        } as __esri.FieldColumnTemplate;
      })
    }
    return columnTemplates;
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof LayerTable_T9n;
  }

}
