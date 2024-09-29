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
   * string: The id for the current solution item
   */
  @Prop() solitionId: string;

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
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected _getAccordion(): VNode {
    return (
      <calcite-accordion>
        <calcite-accordion-item description="Yachts, boats, and dinghies" heading="Watercraft" icon-start="embark">
          <calcite-notice open>
            <div slot="message">Recommended for coastal use</div>
          </calcite-notice>
        </calcite-accordion-item>
        <calcite-accordion-item description="Cars, trucks, and buses" heading="Automobiles" icon-start="car">
          <calcite-notice open>
            <div slot="message">A good choice for inland adventure</div>
          </calcite-notice>
        </calcite-accordion-item>
        {this._getAccordionItem("A")}
      </calcite-accordion>
    );
  }

  /**
   *
   *
   * @returns
   *
   * @protected
   */
  protected _getAccordionItem(
    id: string
  ): VNode {
    console.log(id)
    const a = {
      "value": {
        "type": "Feature Service",
        "typeKeywords": [
          "ArcGIS Server",
          "Data",
          "Feature Access",
          "Feature Service",
          "Multi Services View",
          "Service",
          "Singlelayer",
          "Hosted Service",
          "View Service"
        ]
      }
    };
    return (
      <calcite-accordion-item description={(
        <solution-item-icon type={a.value.type} typeKeywords={a.value.typeKeywords}/>
      )}
        heading={(
          <solution-item-icon type={a.value.type} typeKeywords={a.value.typeKeywords}/>
        )}
        icon-start={"https://i.sstatic.net/Lx60z.png"}
      >
        {this._getDependencyList(id)}
      </calcite-accordion-item>
    );
  }

  protected _getDependencyList(
    id: string
  ): VNode {
    console.log(id)
    return (
      <calcite-list/>
    );
  }

  /**
   *
   *
   * @returns
   *
   * @protected
   */
  protected _getIcon(): void {
    console.log("A")
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
