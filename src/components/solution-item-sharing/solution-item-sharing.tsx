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

import { Component, Host, h, Prop, VNode } from '@stencil/core';

export interface IItemShare {
  id: string;
  title: string;
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
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {
  };

  /**
   * Contains the public value for this component.
   */
  @Prop({ mutable: true, reflect: true }) value: IItemShare[] = [];

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
            scale="s"
            onCalciteSwitchChange={(event) => this._updateItem(event)}
          ></calcite-switch>
          <solution-item-icon type={item.type} typeKeywords={item.typeKeywords}></solution-item-icon>
          {item.title}
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
        item.shareItem = event.target.switched;
      }
      return item;
    });  
  }
}
