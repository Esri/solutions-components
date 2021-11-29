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

import { Component, Element, h, Host, Prop, VNode } from '@stencil/core';
import state from '../../utils/editStore';

export interface IItemShare {
  id: string;
  title: string;
  isShared: boolean;
  shareItem: boolean;
  type: string;
  typeKeywords: string[];
}

@Component({
  tag: 'solution-item-sharing',
  styleUrl: 'solution-item-sharing.css',
  shadow: true,
})
export class SolutionItemSharing {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLSolutionItemSharingElement;

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
  @Prop({ mutable: true, reflect: true }) value: IItemShare[] = [];

  /**
   * Contains the public id for the group these items will be shared or un-shared with.
   */
  @Prop({ mutable: true, reflect: true }) groupId: string;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <div class="container-border">
            {this.renderItems(this.value)}
        </div>
      </Host>
    );
  }

  renderItems(
    objs: IItemShare[]
  ): VNode[] {
    return objs.length > 0 ? objs.map(item => {
      return (
        <calcite-label layout="inline">
          <calcite-switch
            name="setting"
            value="enabled"
            switched={item.shareItem}
            id={item.id}
            scale="m"
            onCalciteSwitchChange={(event) => this._updateItem(event)}
          ></calcite-switch>
          <solution-item-icon type={item.type} typeKeywords={item.typeKeywords}></solution-item-icon>
          <span class="icon-text" title={item.title}>{item.title}</span>
        </calcite-label>
      );
    }) : null;
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
   * Update the items share prop based on the switch state
   *
   * @param event onCalciteSwitchChange event
   */
  _updateItem(event): void {
    const id: string = event.target.id;
    this.value = this.value.map(item => {
      if (item.id === id) {
        // update the item
        item.shareItem = event.target.switched;
        // update the store
        if (state?.models[id]) {
          let shareInfo = undefined;
          if (item.isShared && !event.target.switched) {
            shareInfo = { type: "unshare", groupId: this.groupId };
          } else if (!item.isShared && event.target.switched) {
            shareInfo = { type: "share", groupId: this.groupId };
          }
          state.models[id].shareInfo = shareInfo;
        }
      }
      return item;
    });
  }
}
