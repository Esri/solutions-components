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

import { Component, Element, Event, EventEmitter, Host, h, Prop, VNode, Watch } from '@stencil/core';
import { ISolutionItem } from '../solution-item/solution-item';
import '@esri/calcite-components';

export interface IInventoryItem {
  id: string;
  title: string;
  dependencies?: IInventoryItem[];
  type: string;
  typeKeywords: string[];
  solutionItem: ISolutionItem
}

@Component({
  tag: 'solution-contents',
  styleUrl: 'solution-contents.css',
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
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  /**
   * Contains the public value for this component.
   */
  @Prop() value: IInventoryItem[] = [];

  @Watch('value')
  valueWatchHandler(v: any, oldV: any) {
    if (v && v !== oldV && Array.isArray(v) && v.length > 0) {
      this._treeItemSelected(v[0].solutionItem);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

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
      return (obj.dependencies && obj.dependencies.length > 0) ?
        (
          <calcite-tree-item onClick={() => this._treeItemSelected(obj.solutionItem)}>
            <solution-item-icon type={obj.type} typeKeywords={obj.typeKeywords}></solution-item-icon>
            <span class="icon-text" title={obj.title}>{obj.title}</span>
            <calcite-tree slot="children" >
              {this.renderHierarchy(obj.dependencies)}
            </calcite-tree>
          </calcite-tree-item>
        )
      :
        (
          <calcite-tree-item onClick={() => this._treeItemSelected(obj.solutionItem)}>
            <solution-item-icon type={obj.type} typeKeywords={obj.typeKeywords}></solution-item-icon>
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
   * Publishes the `solutionItemSelected` event containing `itemId`, the id of the selected item.
   *
   * @param solutionItem the
   * @param type Item type to understand if it's an item or group
   */
  private _treeItemSelected(
    solutionItem: ISolutionItem
  ): void {
    this.solutionItemSelected.emit(solutionItem);
  }
}
