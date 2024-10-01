/** @license
 * Copyright 2024 Esri
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

import { Component, Element, Host, h, Prop, State, VNode } from '@stencil/core';
import SolutionItemAccordion_T9n from "../../assets/t9n/solution-item-accordion/resources.json"
import { getLocaleComponentStrings } from "../../utils/locale";
import { ITemplateInfo } from "../../utils/interfaces";

@Component({
  tag: 'solution-item-accordion',
  styleUrl: 'solution-item-accordion.scss',
  shadow: true,
})
export class SolutionItemAccordion {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLSolutionItemAccordionElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * ITemplateInfo[]: Collection of template infos
   */
  @Prop() templateInfos: ITemplateInfo[] = [];

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof SolutionItemAccordion_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <Host>
        {this._getAccordion()}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Get the Accordion component
   *
   * @returns the Accordion component
   *
   * @protected
   */
  protected _getAccordion(): VNode {
    return (
      <calcite-accordion>
        {this.templateInfos.map(t => this._getAccordionItem(t))}
      </calcite-accordion>
    );
  }

  /**
   * Get the Accordion Item component with the appropriate icon and title
   *
   * @returns the Accordion Item component
   *
   * @protected
   */
  protected _getAccordionItem(
    templateInfo: ITemplateInfo
  ): VNode {
    return (
      <calcite-accordion-item description={`${templateInfo.title}-${templateInfo.type}`}>
        {/* <solution-item-icon type={templateInfo.type} typeKeywords={templateInfo.typeKeywords}/> */}
        {this._getDependencyList(templateInfo.dependencies)}
      </calcite-accordion-item>
    );
  }

  /**
   * Get list of the current tempates dependecies
   *
   * @param ids the list of dependecies
   *
   * @returns the List component
   *
   * @protected
   */
  protected _getDependencyList(
    ids: string[]
  ): VNode {
    return (
      <calcite-list>
        {ids.map(id => this._getDependencyListItem(id))}
      </calcite-list>
    );
  }

  /**
   * Get list item for the current dependency
   *
   * @param id the id of the dependency
   *
   * @returns the List item component
   *
   * @protected
   */
  protected _getDependencyListItem(
    id: string
  ): VNode {
    const templateInfo: ITemplateInfo = this._getTemplateInfo(id);
    return (
      <calcite-list-item label={`${templateInfo.title}-${templateInfo.type}`} value={templateInfo.id}>
        <div slot="content-start">
          <solution-item-icon type={templateInfo.type} typeKeywords={templateInfo.typeKeywords}/>
        </div>
      </calcite-list-item>
    );
  }

  /**
   * Get the template info for the current id
   *
   * @param id the id of the item to fetch the template info for
   *
   * @returns the template info for the given id
   *
   * @protected
   */
  protected _getTemplateInfo(
    id: string
  ): any {
    let templateInfo;
    this.templateInfos.some(t => {
      if (t.id === id) {
        templateInfo = t;
        return true;
      }
    });
    return templateInfo;
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof SolutionItemAccordion_T9n;
  }

}
