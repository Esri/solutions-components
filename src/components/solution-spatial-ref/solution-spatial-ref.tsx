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

import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch, VNode } from '@stencil/core';
import '@esri/calcite-components';
import { wkids } from './spatialreferences';
import state from "../../utils/solution-store";
import { nodeListToArray } from '../../utils/common';
import { ISpatialRefRepresentation, IWkidDescription } from '../../utils/interfaces';
import SolutionSpatialRef_T9n from '../../assets/t9n/solution-spatial-ref/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'solution-spatial-ref',
  styleUrl: 'solution-spatial-ref.scss',
  shadow: false
})
export class SolutionSpatialRef {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLSolutionSpatialRefElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
  * The wkid that will be used as the default when no user selection has been made.
  */
  @Prop({ mutable: true, reflect: true }) defaultWkid = 102100;

  /**
  * When true, all but the main switch are disabled to prevent interaction.
  */
  @Prop({ mutable: true, reflect: true }) locked = true;

  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value: string = this.defaultWkid.toString();

  @Watch("value")
  valueChanged(newValue: string): void {
    this.spatialRef = this._createSpatialRefDisplay(newValue);
    this._updateStore();
    const searchBox = document.getElementById("calcite-sr-search") as HTMLCalciteInputElement;
    if (searchBox) {
      searchBox.value = this._srSearchText = "";
    }
    this._clearSelection();
  }

  /**
  * List of service names the spatial reference should apply to
  */
  @Prop({ mutable: true, reflect: true }) services: string[] = [];

  /**
  * Indicates if the control has been enabled.
  * The first time Spatial Reference has been enabled it should enable all feature services.
  */
  @State() loaded = false;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor() {
    this.spatialRef = this._createSpatialRefDisplay(this.value);
    this.locked = true;
  }

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  componentWillLoad(): Promise<void> {
    return this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    return (
      <Host>
        <div class="spatial-ref-desc">
          <calcite-label>{this._translations.paramDescription}</calcite-label>
        </div>
        <label class="switch-label">
          <calcite-switch
            class="spatial-ref-switch"
            onCalciteSwitchChange={(event) => this._updateLocked(event)}
            scale="m"
            switched={!this.locked}
          />
          {this._translations.specifyParam}
        </label>
        <div class="spatial-ref-switch-title" id="spatialRefDefn">
          <calcite-label>
            {this._translations.spatialReferenceInfo}
            <label class="spatial-ref-default">
              <calcite-input
                disabled={this.locked}
                id="calcite-sr-search"
                onCalciteInputInput={(evt) => this._searchSpatialReferences(evt)}
                onKeyDown={(evt) => this._inputKeyDown(evt)}
                placeholder={this._translations.spatialReferencePlaceholder}
              />
            </label>
          </calcite-label>
          <div class={this.locked ? 'disabled-div' : ''}>
            <calcite-tree id="calcite-sr-tree" slot="children">
              {this._getTreeContent()}
            </calcite-tree>
          </div>
          {this._getFeatureServices(this.services)}
        </div>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Internal representation of component's value for display purposes.
   */
  @State() protected spatialRef: ISpatialRefRepresentation;

  /**
   * Current text that is being used to filter the list of spatial references.
   */
  @State() protected _srSearchText: string;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof SolutionSpatialRef_T9n;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() featureServiceSpatialReferenceChange: EventEmitter<{ name: string, enabled: boolean }>;

  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------

  /**
   * Returns the spatial reference description of the supplied value.
   * (Exposes protected method `_createSpatialRefDisplay` for testing.)
   *
   * @param value WKID or WKT or null for default
   * @returns If component is using a WKID, description using WKID; otherwise, the WKT; defaults to 102100
   */
  @Method()
  createSpatialRefDisplay(value: string): Promise<ISpatialRefRepresentation> {
    return Promise.resolve(this._createSpatialRefDisplay(value));
  }

  /**
   * Returns the current spatial reference description.
   * (Exposes protected variable `spatialRef` for testing.)
   */
  @Method()
  getSpatialRef(): Promise<ISpatialRefRepresentation> {
    return Promise.resolve(this.spatialRef);
  }

  /**
   * Converts a WKID into a spatial reference description.
   * (Exposes protected method `_wkidToDisplay` for testing.)
   *
   * @param wkid WKID to look up
   * @returns Description, or "WKID &lt;wkid&gt;" if a description doesn't exist for the WKID
   */
  @Method()
  wkidToDisplay(wkid: number): Promise<string> {
    return Promise.resolve(this._wkidToDisplay(wkid));
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Returns the spatial reference description of the supplied value.
   *
   * @param value WKID or WKT or null for default
   * @returns If component is using a WKID, description using WKID; otherwise, the WKT; defaults to 102100
   */
  protected _createSpatialRefDisplay(value: string): ISpatialRefRepresentation {
    let spatialRef: ISpatialRefRepresentation;

    if (!value) {
      spatialRef = {
        display: this._wkidToDisplay(this.defaultWkid),
        usingWkid: true,
        wkid: this.defaultWkid,
        wkt: ""
      }
    } else {
      const wkid = Number.parseInt(value);
      spatialRef = isNaN(wkid) ? {
        display: value,
        usingWkid: false,
        wkid: 0,
        wkt: value
      } : {
        display: this._wkidToDisplay(wkid),
        usingWkid: true,
        wkid: wkid,
        wkt: ""
      };
    }

    return spatialRef;
  }

  /**
   * Toggles the ability to set the default spatial reference.
   */
  protected _updateLocked(event: any): void {
    this.locked = !event.detail.switched;
    this._updateStore();
    if (!this.loaded) {
      // when this is switched on when loading we have reloaded a solution that
      // has a custom wkid param and we should honor the settings they already have in the templates
      if (event.detail.switched) {
        // By default enable all Feature Services on first load
        this._setFeatureServiceDefaults(this.services);
      }
      this.loaded = true;
    }
  };

  /**
   * Enable spatial reference variable for all feature services.
   *
   * @param services list of service names
   */
  protected _setFeatureServiceDefaults(
    services: string[]
  ): void {
    // switch all spatial-ref-item-switch
    const fsNodes = nodeListToArray(this.el.getElementsByClassName("spatial-ref-item-switch"));
    fsNodes.forEach((node: any) => node.checked = true);
    services.forEach(name => this._updateEnabledServices({ detail: { switched: true } }, name));
  }

  /**
   * Stores the wkid as the components value.
   */
  protected _setSpatialRef(wkid: string): void {
    if (this.value !== wkid) {
      this.value = wkid;
    }
  }

  /**
   * Converts a WKID into a spatial reference description.
   *
   * @param wkid WKID to look up
   * @returns Description, or "WKID &lt;wkid&gt;" if a description doesn't exist for the WKID
   */
  protected _wkidToDisplay(wkid: number): string {
    const description: IWkidDescription = wkids[wkid];
    return description ? description.label + " (" + wkid.toString() + ")" : "WKID " + wkid.toString();
  }

  /**
   * Create a switch control for each of the services
   *
   * @param services List of feature services
   * @returns a node to control each feature service
   */
  protected _getFeatureServices(services: string[]): VNode {
    // verify they are in state
    const _services = services.filter(s => {
      return Object.keys(state.getStoreInfo("spatialReferenceInfo")["services"]).some(stateService => stateService === s)
    });
    return _services && _services.length > 0 ? (
      <div>
        <label class="spatial-ref-item-title">{this._translations.featureServicesHeading}</label>
        {_services.map(name => (
          <label class="switch-label">
            <calcite-switch
              class="spatial-ref-item-switch"
              disabled={this.locked}
              onCalciteSwitchChange={(event) => this._updateEnabledServices(event, name)}
              scale="m"
              switched={state.getStoreInfo("spatialReferenceInfo")["services"][name]}
            />{name}
          </label>
        ))}
      </div>
    ) : (null);
  }

  /**
   * Updates the enabled and spatialReference prop in spatialReferenceInfo.
   */
  protected _updateStore(): void {
    state.getStoreInfo("spatialReferenceInfo")["enabled"] = !this.locked;
    state.getStoreInfo("spatialReferenceInfo")["spatialReference"] = this.spatialRef;
  }

  /**
   * Updates the enabled/disabled state of the service in spatialReferenceInfo.
   */
  protected _updateEnabledServices(event: any, name: string): void {
    state.getStoreInfo("spatialReferenceInfo")["services"][name] = event.detail.switched;
    this.featureServiceSpatialReferenceChange.emit({
      name,
      enabled: event.detail.switched
    });
  }

  /**
   * Select the first child on Enter key click
   * OR
   * Clear any selection while user is entering values and use the default wkid
   *
   * @param event The keyboard event
   */
  protected _inputKeyDown(
    event: KeyboardEvent
  ): void {
    if (event.key === "Enter") {
      this._selectFirstChild(true);
    } else {
      if (this._srSearchText?.length > 1) {
        this._clearSelection();
        this._setSpatialRef(this.defaultWkid.toString());
      }
    }
  }

  /**
   * Clear any selected items in the elements tree.
   *
   */
  protected _clearSelection(): void {
    const selectedItems = nodeListToArray(
      this.el.querySelectorAll("calcite-tree-item[selected]")
    );
    selectedItems.forEach((treeItem: HTMLCalciteTreeItemElement) => {
      treeItem.selected = false;
    });
  }

  /**
   * Select the first child from the tree.
   *
   * @param autoFocus Boolean to indicate if focus should also be shifted to the first child.
   *
   */
  protected _selectFirstChild(
    autoFocus: boolean
  ): void {
    const wkidContainer = document.getElementById("solution-wkid-container");
    if (wkidContainer && wkidContainer.firstChild) {
      const firstChild = wkidContainer.firstChild as HTMLCalciteTreeItemElement;
      firstChild.selected = true;
      this._setSpatialRef(firstChild.id);
      if (autoFocus) {
        firstChild.focus();
      }
    }
  }

  /**
   * Set the search text State and cause render.
   *
   * @param event the event to get the value from
   *
   */
  protected _searchSpatialReferences(
    event: CustomEvent
  ): void {
    this._srSearchText = event.detail.value;
  }

  /**
   * Get the tree items for the current spatial reference search
   *
   */
  protected _getTreeContent(): VNode {
    const id = "solution-wkid-container";
    const containerClass = "spatial-ref-container";
    if (this._srSearchText && this._srSearchText !== "" && this._srSearchText.length > 1) {
      const regEx = new RegExp(`${this._srSearchText}`, 'gi');
      const matches = Object.keys(wkids).filter(wkid => {
        return regEx.test(wkid.toString()) || regEx.test(wkids[wkid].label);
      });
      return matches.length > 0 ? (
        <div class={containerClass} id={id}>
          {matches.map((wkid) => this._getTreeItem(wkid, false))}
        </div>
      ) : (null);
    } else {
      return (
        <div class={containerClass} id={id}>
          {this._getTreeItem(this.value.toString(), true)}
        </div>
      );
    }
  }

  /**
   * Get the individual spatial reference tree item
   *
   * @param wkid The wkid for the spatial reference that will be displayed.
   * @param selected Should the item be selected by default.
   *
   */
  protected _getTreeItem(
    wkid: string,
    selected: boolean
  ): VNode {
    return (
      <calcite-tree-item
        aria-selected={selected}
        id={wkid}
        onClick={() => this._setSpatialRef(wkid)}
        selected={selected}
      >
        <div>{`${wkids[wkid].label} (${wkid})`}</div>
      </calcite-tree-item>
    )
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof SolutionSpatialRef_T9n;
  }
}
