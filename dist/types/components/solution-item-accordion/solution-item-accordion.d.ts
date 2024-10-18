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
import { VNode } from '../../stencil-public-runtime';
import SolutionItemAccordion_T9n from "../../assets/t9n/solution-item-accordion/resources.json";
import { ITemplateInfo } from "../../utils/interfaces";
export declare class SolutionItemAccordion {
    el: HTMLSolutionItemAccordionElement;
    /**
     * ITemplateInfo[]: Collection of template infos
     */
    templateInfos: ITemplateInfo[];
    /**
     * ITemplateInfo[]: Collection of sorted template infos
     */
    _sortedTemplateInfos: ITemplateInfo[];
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof SolutionItemAccordion_T9n;
    /**
     * string[]: The order we should sort templates based on
     */
    protected _sortOrder: string[];
    /**
     * string[]: Array of template types.
     * This array is used during render to ensure only one Accordion item is added for each type.
     */
    protected _types: string[];
    templateInfosWatchHandler(): Promise<void>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad(): Promise<void>;
    /**
     * StencilJS: Called before each render
     */
    componentWillRender(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): any;
    /**
     * Get the Accordion component
     *
     * @returns the Accordion component
     *
     * @protected
     */
    protected _getAccordion(): VNode;
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
    protected _getAccordionItem(templateInfo: ITemplateInfo): VNode;
    /**
     * Get the list of template infos for the current type
     *
     * @param templateInfos filtered list of templateInfos for the current type
     *
     * @returns the List component
     *
     * @protected
     */
    protected _getList(templateInfos: ITemplateInfo[]): VNode;
    /**
     * Get list item for the current type
     *
     * @param templateInfo the current templateInfo to handle
     *
     * @returns the List item component
     *
     * @protected
     */
    protected _getListItem(templateInfo: ITemplateInfo): VNode;
    /**
     * Sort the templates based on the title
     *
     * @returns the sorted templates
     *
     * @protected
     */
    protected _sortTemplatesByTitle(templateInfos: ITemplateInfo[]): ITemplateInfo[];
    /**
     * Sort the templates based on the defined order in _sortOrder
     *
     * @returns the sorted templates
     *
     * @protected
     */
    protected _sortTemplates(): ITemplateInfo[];
    /**
     * This function will update the type value to match how we would like it sorted.
     *
     * @param templateInfo
     *
     * @returns the sorted templates
     *
     * @protected
     */
    protected _getTypeForSort(templateInfo: ITemplateInfo): string;
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
    protected _getTypeForDisplay(type: string, typeKeywords: string[]): string;
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
