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

import '@esri/calcite-components';
import SpatialRef_T9n from '../../assets/t9n/spatial-ref/resources.json';
import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch, VNode } from '@stencil/core';
import { getLocaleComponentStrings } from '../../utils/locale';
import { ISpatialRefRepresentation, IWkidDescription } from '../../utils/interfaces';
import { IValueChange } from "../../utils/interfaces";
import { nodeListToArray } from '../../utils/common';
import { wkids } from './spatialreferences';

@Component({
  tag: 'spatial-ref',
  styleUrl: 'spatial-ref.scss',
  shadow: false
})
export class SpatialRef {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLSpatialRefElement;

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
  * When true, all are disabled to prevent interaction.
  */
  @Prop({ mutable: true, reflect: true }) disabled = false;

  /**
   * Contains the public value for this component, which is a wkid or a wkt.
   */
  @Prop({ mutable: true, reflect: true }) value: string = this.defaultWkid.toString();

  @Watch("value")
  valueChanged(newValue: string): void {
    this._spatialRef = this._createSpatialRefDisplay(newValue);
    const searchBox = document.getElementById("calcite-sr-search") as HTMLCalciteInputElement;
    if (searchBox) {
      searchBox.value = this._srSearchText = "";
    }
    this._clearSelection();

    if (this._cachedValue !== this.value) {
      this.spatialReferenceChange.emit({
        oldValue: this._cachedValue,
        newValue: this.value
      });
      this._cachedValue = this.value;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  constructor() {
    this._spatialRef = this._createSpatialRefDisplay(this.value);
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
        <div>
          <calcite-input
            disabled={this.disabled}
            id="calcite-sr-search"
            onKeyUp={(evt) => this._searchInputKeyDown(evt)}
            placeholder={this._translations.spatialReferencePlaceholder}
          />
          <calcite-tree id="calcite-sr-tree" slot="children">
            {this._getTreeContent()}
          </calcite-tree>
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
   * Holds a pre-change value of the wkid so that an event can be posted with the cached and new values.
   */
  @State() protected _cachedValue = this.defaultWkid.toString();

  /**
   * Internal representation of component's value for display purposes.
   */
  @State() protected _spatialRef: ISpatialRefRepresentation;

  /**
   * Current text that is being used to filter the list of spatial references.
   */
  @State() protected _srSearchText: string;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof SpatialRef_T9n;

  protected _lastHighlightedSref: number;

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

  @Event() spatialReferenceChange: EventEmitter<IValueChange>;

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
  async createSpatialRefDisplay(value: string): Promise<ISpatialRefRepresentation> {
    return this._createSpatialRefDisplay(value);
  }

  /**
   * Returns the current spatial reference description.
   * (Exposes protected variable `spatialRef` for testing.)
   */
  @Method()
  async getSpatialRef(): Promise<ISpatialRefRepresentation> {
    return this._spatialRef;
  }

  /**
   * Converts a WKID into a spatial reference description.
   * (Exposes protected method `_wkidToDisplay` for testing.)
   *
   * @param wkid WKID to look up
   * @returns Description, or "WKID &lt;wkid&gt;" if a description doesn't exist for the WKID
   */
  @Method()
  async wkidToDisplay(wkid: number): Promise<string> {
    return this._wkidToDisplay(wkid);
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
   * Sets the search text State and cause render; if Enter key, selects the first child.
   *
   * @param event The keyboard event
   */
  protected _searchInputKeyDown(
    event: KeyboardEvent
  ): void {
    if (event.key === "Enter") {
      this._selectFirstChild();
    } else {
      const searchBox = document.getElementById("calcite-sr-search") as HTMLCalciteInputElement;
      if (searchBox) {
        this._srSearchText = searchBox.value;
      }
    }
  }

  /**
   * Tracks the movement through the list of projections, and selects the one for which Enter is used twice.
   *
   * @param event The keyboard event
   */
  protected _projListInputKeyDown(
    event: KeyboardEvent
  ): void {
    const highlightedSref = (event.target as any).id;
    if (event.key === "Enter" && this._lastHighlightedSref === highlightedSref) {
      // "Enter" twice on the same projection selects it
      this._clearSelection();
      this._setSpatialRef(this._lastHighlightedSref.toString());
    } else {
      // Save the projection in case it's selected a second time
      this._lastHighlightedSref = highlightedSref;
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
  ): void {
    const wkidContainer = document.getElementById("solution-wkid-container");
    if (wkidContainer && wkidContainer.firstChild) {
      const firstChild = wkidContainer.firstChild as HTMLCalciteTreeItemElement;
      firstChild.selected = true;
      this._setSpatialRef(firstChild.id);
    }
  }

  /**
   * Get the tree items for the current spatial reference search
   *
   */
  public _getTreeContent(): VNode {
    const id = "solution-wkid-container";
    const containerClass = "spatial-ref-container";
    if (this._srSearchText && this._srSearchText.length > 1) {
      const regEx = new RegExp(`${this._srSearchText}`, 'gi');
      const matches = Object.keys(wkids).filter(wkid => {
        return regEx.test(wkid.toString()) || regEx.test(wkids[wkid].label);
      });
      return matches.length > 0 ? (
        <div
          class={containerClass}
          id={id}
          onKeyDown={(evt) => this._projListInputKeyDown(evt)}
        >
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
    const label = wkids[wkid]?.label;
    return label ?
      (
        <calcite-tree-item
          aria-selected={selected}
          id={wkid}
          onClick={() => this._setSpatialRef(wkid)}
          selected={selected}
        >
          <div>{`${label} (${wkid})`}</div>
        </calcite-tree-item>
      ) : (
        <calcite-tree-item
          aria-selected={selected}
          id={wkid}
          onClick={() => this._setSpatialRef(wkid)}
          selected={selected}
        >
          <div>{`${wkid}`}</div>
        </calcite-tree-item>
      );
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof SpatialRef_T9n;
  }
}
