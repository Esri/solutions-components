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

import { Component, Element, Event, EventEmitter, Host, h, Prop, VNode, Listen, State, Watch } from '@stencil/core';
import { IInventoryItem, ISolutionItem } from '../../utils/interfaces';
import '@esri/calcite-components';
import SolutionContents_T9n from '../../assets/t9n/solution-contents/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'solution-contents',
  styleUrl: 'solution-contents.scss',
  shadow: false,
  assetsDirs: ['item-type-icons']
})
export class SolutionContents {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLSolutionContentsElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------
  
  /**
   * Contains the current item that is selected.
   */
   @Prop({ mutable: true, reflect: true }) selectedItem: ISolutionItem;

  /**
   * Contains the public value for this component.
   */
  @Prop() value: IInventoryItem[] = [];

  @Watch('value')
  valueWatchHandler(v: any, oldV: any): void {
    if (v && v !== oldV && Array.isArray(v) && v.length > 0) {
      this._treeItemSelected(v[0].solutionItem);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  async componentWillLoad() {
    await this._getTranslations();
  }

  render(): VNode {
    return (
      <Host>
        <calcite-tree>
          {this.renderHierarchy(this.value)}
        </calcite-tree>
      </Host>
    );
  }

  renderHierarchy(objs: IInventoryItem[]): HTMLCalciteTreeItemElement[] {
    return objs.map((obj) => {
      const selected: boolean = this.selectedItem?.itemId && this.selectedItem?.itemId === obj.solutionItem.itemId;
      return (obj.dependencies && obj.dependencies.length > 0) ?
        (
          <calcite-tree-item onClick={(evt) => this._treeItemSelected(obj.solutionItem, evt)} selected={selected}>
            <solution-item-icon type={obj.type} typeKeywords={obj.typeKeywords} />
            <span class="icon-text" title={obj.title}>{obj.title}</span>
            <calcite-tree slot="children" >
              {this.renderHierarchy(obj.dependencies)}
            </calcite-tree>
          </calcite-tree-item>
        )
        :
        (
          <calcite-tree-item onClick={(evt) => this._treeItemSelected(obj.solutionItem, evt)} selected={selected}>
            <solution-item-icon type={obj.type} typeKeywords={obj.typeKeywords} />
            <span class="icon-text" title={obj.title}>{obj.title}</span>
          </calcite-tree-item>
        );
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() translations: typeof SolutionContents_T9n;

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("solutionLoaded", { target: 'window' })
  _solutionLoaded(): void {
    this._treeItemSelected(this.value[0].solutionItem);
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() solutionItemSelected: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Publishes the `solutionItemSelected` event containing `solutionItem` of the selected item.
   * 
   * Also toggles the expanded state of the tree item.
   *
   * @param solutionItem the selected solution item to emit
   * @param evt MouseEvent or undefined
   */
  private _treeItemSelected(
    solutionItem: ISolutionItem,
    evt: any = undefined
  ): void {
    const treeItem = evt?.target?.closest("calcite-tree-item");
    if (treeItem) {
      treeItem.expanded = !treeItem?.expanded;
    }
    this.selectedItem = solutionItem;
    this.solutionItemSelected.emit(solutionItem);
  }

  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this.translations = translations[0] as typeof SolutionContents_T9n;
  }
}
