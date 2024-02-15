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
import { VNode } from '../../stencil-public-runtime';
import SolutionTemplateData_T9n from '../../assets/t9n/solution-template-data/resources.json';
export declare class SolutionTemplateData {
    el: HTMLSolutionTemplateDataElement;
    /**
     * Contains the public value for this component.
     *
     * When working with a resource item this should contain an IResourceItem
     *
     * When working with a json type item this should contain the data and vars
     */
    /**
     * This needs to be unique for props vs data of an item
     */
    instanceid: string;
    /**
     * A template's itemId.
     * This is used to get the correct model from a store in the json-editor
     */
    itemId: string;
    itemIdWatchHandler(): void;
    organizationVariables: string;
    /**
     * Contains the solution based variables
     */
    solutionVariables: string;
    /**
     * Used to show/hide the variable containers
     */
    varsOpen: boolean;
    constructor();
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): VNode;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    protected _translations: typeof SolutionTemplateData_T9n;
    protected value: string;
    protected _initializing: boolean;
    /**
     * Toggle varsOpen prop to show/hide variable containers
     */
    _toggleVars(): void;
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
