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
import { IItemShare } from '../../utils/interfaces';
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
    return Promise.resolve(this.sharing);
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
      //onCalciteSwitchChange={(event) => this._updateItem(event)}
      return (
        <calcite-label layout="inline">
          <calcite-switch
            id={item.id}
            name="setting"
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
  /*
  _updateItem(event): void {
    const id: string = event.target.id;
    this.sharing = this.sharing.map(item => {
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
  */

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
