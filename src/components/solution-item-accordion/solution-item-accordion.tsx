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

import { Component, Element, Host, h, Prop, State, VNode, Watch } from '@stencil/core';
import SolutionItemAccordion_T9n from "../../assets/t9n/solution-item-accordion/resources.json"
import { getLocaleComponentStrings } from "../../utils/locale";
import { ITemplateInfo } from "../../utils/interfaces";

@Component({
  tag: 'solution-item-accordion',
  styleUrl: 'solution-item-accordion.css',
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
   * ITemplateInfo[]: Collection of sorted template infos
   */
  @State() _sortedTemplateInfos: ITemplateInfo[] = [];

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

  /**
   * string[]: The order we should sort templates based on
   */
  protected _sortOrder = [
    "Hub Site Application",
    "Hub Page",
    "Web Experience",
    "Instant App",
    "Web Mapping Application",
    "Dashboard",
    "StoryMap",
    "Form",
    "QuickCapture Project",
    "Workflow",
    "Big Data Analytic",
    "Real Time Analytic",
    "Feed",
    "Tool",
    "Notebook",
    "Data Pipeline",
    "Project Package",
    "Desktop Application Template",
    "TypeNotFound",
    "Web Map",
    "Web Scene",
    "Feature Layer (hosted, view)",
    "Feature Layer (hosted)",
    "Tile Layer",
    "CSV",
    "Microsoft Excel",
    "Microsoft Word",
    "Report Template",
    "Rule Package",
    "Group"
  ];

  /**
   * string[]: Array of template types.
   * This array is used during render to ensure only one Accordion item is added for each type.
   */
  protected _types: string[] = [];

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  @Watch("templateInfos")
  async templateInfosWatchHandler(): Promise<void> {
    this._types = [];
    this._sortedTemplateInfos = this._sortTemplates();
  }

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
   * StencilJS: Called before each render
   */
  async componentWillRender(): Promise<void> {
    if (this._sortedTemplateInfos.length === 0 && this.templateInfos?.length > 0) {
      this._sortedTemplateInfos = this._sortTemplates();
    }
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
        {
          this._sortedTemplateInfos.reduce((prev, cur) => {
            if (this._types.indexOf(cur.type) < 0) {
              this._types.push(cur.type);
              prev.push(this._getAccordionItem(cur));
            }
            return prev;
          }, [])
        }
      </calcite-accordion>
    );
  }

  /**
   * Get the Accordion Item component with the appropriate icon and template type
   * Only one accordion item per type.
   *
   * @returns the Accordion Item component
   *
   * @protected
   */
  protected _getAccordionItem(
    templateInfo: ITemplateInfo
  ): VNode {
    const templateInfos = this._sortedTemplateInfos.filter(t => t.type === templateInfo.type);
    return (
      <calcite-accordion-item description={`${templateInfo.type} (${templateInfos.length})`}>
        <solution-item-icon
          class="padding-start-1"
          slot="actions-start"
          type={templateInfo.type}
          typeKeywords={templateInfo.typeKeywords}
        />
        {this._getList(templateInfos)}
      </calcite-accordion-item>
    );
  }

  /**
   * Get the list of template infos for the current type
   *
   * @param templateInfos filtered list of templateInfos for the current type
   *
   * @returns the List component
   *
   * @protected
   */
  protected _getList(
    templateInfos: ITemplateInfo[]
  ): VNode {
    return (
      <calcite-list class="padding-start-1">
        {templateInfos.map(t => this._getListItem(t))}
      </calcite-list>
    );
  }

  /**
   * Get list item for the current type
   *
   * @param templateInfo the current templateInfo to handle
   *
   * @returns the List item component
   *
   * @protected
   */
  protected _getListItem(
    templateInfo: ITemplateInfo
  ): VNode {
    return (
      <calcite-list-item
        description={templateInfo.description}
        label={templateInfo.title}
        value={templateInfo.id}
      />
    );
  }

  /**
   * Sort the templates based on the defined order in _sortOrder
   *
   * @returns the sorted templates
   *
   * @protected
   */
  protected _sortTemplates(): ITemplateInfo[] {
    return this.templateInfos.sort((a, b) => {
      const aType = this._updateType(a);
      const bType = this._updateType(b);

      const indexA = this._sortOrder.indexOf(aType);
      const indexB = this._sortOrder.indexOf(bType);

      return indexA - indexB;
    });
  }

  /**
   * Some template types are displayed with a value that is different than the stored type value.
   * This function will catch and update the type value to match how we would like it sorted and displayed.
   *
   * @returns the sorted templates
   *
   * @protected
   */
  protected _updateType(
    templateInfo: ITemplateInfo
  ): string {
    let updatedType = templateInfo.type;
    if (templateInfo.type === "Feature Service") {
      updatedType = templateInfo.typeKeywords.indexOf("View Service") > -1 ?
        "Feature Layer (hosted, view)" : "Feature Layer (hosted)";
    }

    if (templateInfo.type === "Web Mapping Application") {
      updatedType = templateInfo.typeKeywords.indexOf("configurableApp") > -1 ?
        "Instant App" : updatedType;
    }

    templateInfo.type = templateInfo.type === "Geoprocessing Service" ? "Tool" :
      templateInfo.type === "Vector Tile Service" ? "Tile Layer" : updatedType;

    if (this._sortOrder.indexOf(updatedType) < 0) {
      // If we encounter an item type that is not in the list
      // put it between the "Desktop Application Template" and "Web Map" section
      // Do not set this as the templates type value as we want its actual type to be displayed
      // this is just used for sorting
      updatedType = "TypeNotFound";
    }

    return updatedType;
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