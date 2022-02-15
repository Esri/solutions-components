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

import { Component, Element, h, Host, Method, Prop, VNode } from '@stencil/core';
import state from '../../utils/editStore';
import { IItemShare } from '../../utils/interfaces';

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
          {this._renderItems(this.value)}
        </div>
      </Host>
    );
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

  @Method()
  async getShareInfo(): Promise<any> {
    return Promise.resolve(this.value);
  }


  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  /**
   * Render share options based on the list of share details
   *
   * @param objs list of IItemShare objects that are used to expose and store share info for the solutions items
   */
  _renderItems(
    objs: IItemShare[]
  ): VNode[] {
    return objs && objs.length > 0 ? objs.map(item => {
      return (
        <calcite-label layout="inline">
          <calcite-switch
            id={item.id}
            name="setting"
            onCalciteSwitchChange={(event) => this._updateItem(event)}
            scale="m"
            switched={item.shareItem}
            value="enabled"
          />
          <solution-item-icon type={item.type} typeKeywords={item.typeKeywords} />
          <span class="icon-text" title={item.title}>{item.title}</span>
        </calcite-label>
      );
    }) : null;
  }

  /**
   * Update the items share prop based on the switch state
   *
   * @param event onCalciteSwitchChange event
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _updateItem(event): void {
    const id: string = event.target.id;
    this.value = this.value.map(item => {
      if (item.id === id) {
        // update the item
        item.shareItem = event.detail.switched;
        // update the store
        if (state?.models[id]) {
          state.models[id].shareInfo =
            (item.isShared && !item.shareItem) ? { groupId: this.groupId, shared: false } :
              (!item.isShared && item.shareItem) ? { groupId: this.groupId, shared: true } : undefined;
        }
      }
      return item;
    });
  }
}
