/** @license
 * Copyright 2021 Esri
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

import { Component, Element, h, Host, Method, Prop, State, Watch, VNode } from '@stencil/core';
import '@esri/calcite-components';
import { IWkidDescription, wkids } from './spatialreferences';
import state from '../../utils/editStore';
import { getProp, nodeListToArray } from '../../utils/common';

export interface ISpatialRefRepresentation {
  display: string;
  usingWkid: boolean;
  wkid: number;
  wkt: string;
}

@Component({
  tag: 'solution-spatial-ref',
  styleUrl: 'solution-spatial-ref.css',
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
  @Prop({ mutable: true, reflect: true }) defaultWkid: number = 102100;

  /**
  * When true, all but the main switch are disabled to prevent interaction.
  */
  @Prop({ mutable: true, reflect: true }) locked: boolean = true;

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value: string = null;
  @Watch("value") valueChanged(newValue: string): void {
    this.spatialRef = this._createSpatialRefDisplay(newValue);
    this._updateStore();
  }

  /**
  * List of service names the spatial reference should apply to
  */
  @Prop({ mutable: true, reflect: true }) services: string[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor() {
    this.spatialRef = this._createSpatialRefDisplay(this.value);
    this.locked = true;
  }

  render(): VNode {
    return (
      <Host>
        <label class="switch-label">
          <calcite-switch 
            switched={!this.locked} 
            scale="m" 
            class="spatial-ref-switch" 
            onCalciteSwitchChange={(event) => this._updateLocked(event)}
          ></calcite-switch>
          {this.translations.specifyParam}
        </label>
        <div id="spatialRefDefn" class="spatial-ref-switch-title">
          <calcite-label>
            {this.translations.spatialReferenceInfo}
            <label class="spatial-ref-default">
              <calcite-input
                placeholder = {this.translations.spatialReferencePlaceholder}
                disabled={this.locked}
                onCalciteInputInput={(evt) => this._searchSpatialReferences(evt)}
                onKeyDown={(evt) => this._inputKeyDown(evt)}
              ></calcite-input>
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
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

  /**
   * Internal representation of component's value for display purposes.
   */
  @State() private spatialRef: ISpatialRefRepresentation;

  /**
   * Current text that is being used to filter the list of spatial references.
   */
  @State() private _srSearchText: string;

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

  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------

  /**
   * Returns the spatial reference description of the supplied value.
   * (Exposes private method `_createSpatialRefDisplay` for testing.)
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
   * (Exposes private variable `spatialRef` for testing.)
   */
  @Method()
  getSpatialRef(): Promise<ISpatialRefRepresentation> {
    return Promise.resolve(this.spatialRef);
  }

  /**
   * Converts a WKID into a spatial reference description.
   * (Exposes private method `_wkidToDisplay` for testing.)
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
  private _createSpatialRefDisplay(value: string): ISpatialRefRepresentation {
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
      if (isNaN(wkid)) {
        spatialRef = {
          display: value,
          usingWkid: false,
          wkid: 0,
          wkt: value
        }
      } else {
        spatialRef = {
          display: this._wkidToDisplay(wkid),
          usingWkid: true,
          wkid: wkid,
          wkt: ""
        }
      }
    }

    return spatialRef;
  }

  /**
   * Toggles the ability to set the default spatial reference.
   */
  private _updateLocked(event): void {
    this.locked = !event.detail.switched;
    this._updateStore();
  };

  /**
   * Stores the wkid as the components value.
   */
  private _setSpatialRef(wkid: string): void {
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
  private _wkidToDisplay(wkid: number): string {
    const description: IWkidDescription = wkids[wkid];
    if (description) {
      return description.label + " (" + wkid.toString() + ")";
    } else {
      return "WKID " + wkid.toString();
    }
  }

  /**
   * Create a switch control for each of the services
   *
   * @param services List of feature services
   * @returns a node to control each feature service
   */
  private _getFeatureServices(services: string[]): VNode {
    return services && services.length > 0 ? (
      <div>
        <label class="spatial-ref-item-title">{this.translations.featureServicesHeading}</label>
        {services.map(name => (
          <label class="switch-label">
            <calcite-switch
              disabled={this.locked}
              scale="m" 
              switched={state.spatialReferenceInfo["services"][name]}
              class="spatial-ref-item-switch"
              onCalciteSwitchChange={(event) => this._updateEnabledServices(event, name)}
            ></calcite-switch>{name}
          </label>
        ))}
      </div>
    ) : (null);
  }

  /**
   * Updates the enabled and spatialReference prop in spatialReferenceInfo.
   */
  private _updateStore(): void {
    state.spatialReferenceInfo["enabled"] = !this.locked;
    state.spatialReferenceInfo["spatialReference"] = this.spatialRef;
    this._updateEditModels();
  }

  /**
   * Updates the enabled/disabled state of the service in spatialReferenceInfo.
   */
  private _updateEnabledServices(event, name): void {
    state.spatialReferenceInfo["services"][name] = event.detail.switched;
    this._updateEditModels(name);
  }

  /**
   * When the spatial reference param is enabled/disabled..we need to handle all feature services that
   * are listed in state.services.
   * When an individual service is enabled/disabled we only need to handle it.
   *
   * @param services List of feature services
   */
  private _updateEditModels(name?: any): void {
    Object.keys(state.models || {}).forEach(k => {
      const m: any = state.models[k];
      const nameMatch: boolean = name && name === m.name;
      const serviceMatch: boolean = name === undefined && 
        Object.keys(state.spatialReferenceInfo["services"]).indexOf(m.name) > -1;
      if (nameMatch || serviceMatch) {
        const updateModel = m.propsModel.getValue();
        if (updateModel) {
          const active = getProp(state, `spatialReferenceInfo.services.${m?.name}`) || false;
          const enabled = getProp(state, 'spatialReferenceInfo.enabled') || false;

          m.propsModel.setValue(JSON.stringify(
            this._updateData(updateModel, enabled, active, m.spatialReference), null, '\t')
          );
          m.propsDiffOriginValue = JSON.stringify(
            this._updateData(m.propsDiffOriginValue, enabled, active, m.spatialReference)
          );
        }
      }
    });
  }

  /**
   * Updates the services spatial reference by setting the wkid param value and removing latestWkid when enabled and active
   * OR
   * Sets the spatial reference back to the original spatialReference when disabled
   *
   * @param updateModel The model to update
   * @param enabled Is the param enabled
   * @param active Is the service enabled
   * @param spatialReference The original source spatial reference
   */
  private _updateData(
    updateModel: any,
    enabled: boolean,
    active: boolean,
    spatialReference: any
  ): any {
    const data = typeof (updateModel) === "string" ? JSON.parse(updateModel) : updateModel;
    if (enabled && active) {
      const wkid = this.spatialRef.wkid;
      if (wkid) {
        data.service.spatialReference.wkid = `{{params.wkid||${wkid}}}`;
        if (data.service.spatialReference.latestWkid) {
          delete (data.service.spatialReference.latestWkid);
        }
      }
    } else if (data.service?.spatialReference) {
      data.service.spatialReference = spatialReference;
    } 
    return data;
  }

  /**
   * Select the first child on Enter key click
   * OR 
   * Clear any selection while user is entering values and use the default wkid
   *
   * @param event The keyboard event
   */
  private _inputKeyDown(
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
  private _clearSelection(): void {
    const selectedItems = nodeListToArray(
      this.el.querySelectorAll("calcite-tree-item[selected]")
    ) as HTMLCalciteTreeItemElement[];
    selectedItems.forEach((treeItem) => {
      treeItem.selected = false;
    });
  }

  /**
   * Select the first child from the tree.
   * 
   * @param autoFocus Boolean to indicate if focus should also be shifted to the first child.
   *
   */
  private _selectFirstChild(
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
  private _searchSpatialReferences(
    event: CustomEvent
  ): void {
    this._srSearchText = event.detail.value;
  }

  /**
   * Get the tree items for the current spatial reference search
   * 
   */
  private _getTreeContent(): VNode {
      const id: string = "solution-wkid-container";
      const containerClass: string = "spatial-ref-container";
      if (this._srSearchText && this._srSearchText !== "" && this._srSearchText.length > 1) {
        const regEx: RegExp = new RegExp(`${this._srSearchText}`, 'gi');
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
            {this._getTreeItem(this.defaultWkid.toString(), true)}
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
  private _getTreeItem(
    wkid: string,
    selected: boolean
  ): VNode {
    return (
      <calcite-tree-item
        onChange={() => this._setSpatialRef(wkid)}
        selected={selected}
        aria-selected={selected}
        id={wkid}
      >
        <div>{`${wkids[wkid].label} (${wkid})`}</div>
      </calcite-tree-item>
    )
  }
}
