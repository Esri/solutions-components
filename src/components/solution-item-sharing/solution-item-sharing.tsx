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

import { Component, Element, h, Host, Method, Prop, State, VNode, Watch } from '@stencil/core';
import state from "../../utils/solution-store";
import { IItemShare, IItemTemplateEdit } from '../../utils/interfaces';
import SolutionItemSharing_T9n from '../../assets/t9n/solution-item-sharing/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'solution-item-sharing',
  styleUrl: 'solution-item-sharing.scss',
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
   * A template's groupId.
   */
  @Prop({ mutable: true, reflect: true }) groupId = "";

  @Watch("groupId") itemIdWatchHandler(): void {
    const itemEdit = state.getItemInfo(this.groupId);
    this.sharing = itemEdit.groupDetails;
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    return this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render(): VNode {
    return (
      <Host>
        <div class="container-border">
          <calcite-label>{this._translations.groupInfo}</calcite-label>
          {this._renderItems(this.sharing)}
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
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() protected _translations: typeof SolutionItemSharing_T9n;

  /**
   * Contains the public sharing for this component.
   */
  @State() sharing: IItemShare[] = [];

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
    return this.sharing;
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
    return objs && objs.length > 0
      ? objs.map(item => {
        return (
          <calcite-label layout="inline">
            <calcite-switch
              checked={item.shareItem}
              id={item.id}
              name="setting"
              onCalciteSwitchChange={(event) => this._updateItem(event)}
              scale="m"
              value="enabled"
            />
            <solution-item-icon type={item.type} typeKeywords={item.typeKeywords} />
            <span class="icon-text" title={item.title}>{item.title}</span>
          </calcite-label>
        );
      })
      : null;
  }

  /**
   * Update the items share prop based on the switch state
   *
   * @param event onCalciteSwitchChange event
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _updateItem(event): void {
    const id: string = event.target.id;
    this.sharing = this.sharing.map((itemShare: IItemShare) => {
      if (itemShare.id === id) {
        // update the item
        itemShare.shareItem = event.target.checked;

        // update the item in the store
        const itemEdit: IItemTemplateEdit = state.getItemInfo(id);

        if (itemShare.shareItem) {
          // Add the group to the item if it's not already there
          if (!itemEdit.groups) {
            itemEdit.groups = [this.groupId];
          } else if (itemEdit.groups.indexOf(this.groupId) < 0) {
            itemEdit.groups.push(this.groupId);
          }
        } else {
          // Remove the group from the item if it's there
          if (itemEdit.groups) {
            const i = itemEdit.groups.indexOf(this.groupId);
            if (i > -1) {
              itemEdit.groups.splice(i, 1);
            }
          }
        }

        state.setItemInfo(itemEdit);
      }
      return itemShare;
    });
  }

  /**
   * Fetches the component's translations
   *
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0] as typeof SolutionItemSharing_T9n;
  }
}
