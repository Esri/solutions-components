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
    "Table (hosted, view)",
    "Table (hosted)",
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
      <calcite-accordion selectionMode="single">
        {
          this._sortedTemplateInfos.reduce((prev, cur) => {
            const displayType = this._getTypeForDisplay(cur.type, cur.typeKeywords)
            if (this._types.indexOf(displayType) < 0) {
              this._types.push(displayType);
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
   * @param templateInfo the current templateInfo to handle
   *
   * @returns the Accordion Item component
   *
   * @protected
   */
  protected _getAccordionItem(
    templateInfo: ITemplateInfo
  ): VNode {
    const _type = this._getTypeForDisplay(templateInfo.type, templateInfo.typeKeywords);
    const templateInfos = this._sortedTemplateInfos.filter(t => {
      const tType = this._getTypeForDisplay(t.type, t.typeKeywords);
      return tType === _type
    });
    return (
      <calcite-accordion-item description={`${_type} (${templateInfos.length})`}>
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
    const sortedTemplateInfos = this._sortTemplatesByTitle(templateInfos);
    return (
      <calcite-list>
        {sortedTemplateInfos.map(t => this._getListItem(t))}
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
        class="font-size-override"
        description={templateInfo.snippet}
        label={templateInfo.title}
        value={templateInfo.id}
      />
    );
  }

  /**
   * Sort the templates based on the title
   *
   * @returns the sorted templates
   *
   * @protected
   */
  protected _sortTemplatesByTitle(
    templateInfos: ITemplateInfo[]
  ): ITemplateInfo[] {
    return templateInfos.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
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
      const aType = this._getTypeForSort(a);
      const bType = this._getTypeForSort(b);

      const indexA = this._sortOrder.indexOf(aType);
      const indexB = this._sortOrder.indexOf(bType);

      return indexA - indexB;
    });
  }

  /**
   * This function will update the type value to match how we would like it sorted.
   *
   * @param templateInfo
   *
   * @returns the sorted templates
   *
   * @protected
   */
  protected _getTypeForSort(
    templateInfo: ITemplateInfo
  ): string {
    let updatedType = this._getTypeForDisplay(templateInfo.type, templateInfo.typeKeywords);

    if (this._sortOrder.indexOf(updatedType) < 0) {
      // If we encounter an item type that is not in the list
      // put it between the "Desktop Application Template" and "Web Map" section
      updatedType = "TypeNotFound";
    }

    return updatedType;
  }

  /**
   * This function will update the type value to match how we would like it displayed.
   *
   * @param type the current item type
   * @param typeKeywords the type keywords for the current item
   *
   * @returns the updated type value
   *
   * @protected
   */
  protected _getTypeForDisplay(
    type: string,
    typeKeywords: string[]
  ): string {
    let _type = type;
    if (type === "Feature Service") {
      const isView = typeKeywords.indexOf("View Service") > -1;
      const isTable = typeKeywords.indexOf("Table") > -1
      _type = isView && isTable ? "Table (hosted, view)" : isTable ? "Table (hosted)" :
        isView ? "Feature Layer (hosted, view)" : "Feature Layer (hosted)";
    }

    if (type === "Web Mapping Application") {
      _type = typeKeywords.indexOf("configurableApp") > -1 ?
        "Instant App" : _type;
    }

    return _type;
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
