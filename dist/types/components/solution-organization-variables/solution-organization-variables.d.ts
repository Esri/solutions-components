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
import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { IOrganizationVariableItem } from '../../utils/interfaces';
import SolutionOrganizationVariables_T9n from '../../assets/t9n/solution-organization-variables/resources.json';
export declare class SolutionOrganizationVariables {
    el: HTMLSolutionOrganizationVariablesElement;
    /**
     * Contains the public value for this component.
     */
    value: string;
    valueWatchHandler(): void;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): VNode;
    protected _organizationVariables: IOrganizationVariableItem[];
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    protected _translations: typeof SolutionOrganizationVariables_T9n;
    organizationVariableSelected: EventEmitter<{
        itemId: string;
        value: string;
    }>;
    /**
     * Renders the organization based variable items the user can insert at runtime
     *
     * @param objs a list of organization variables to render
     */
    _renderHierarchy(objs: IOrganizationVariableItem[]): VNode[];
    /**
     * Publishes the `organizationVariableSelected` event containing `itemId`, the id of the selected variable and the value of the variable.
     *
     * @param itemId Item id as reported by click event
     * @param value Variable id as reported by click event
     */
    protected _treeItemSelected(itemId: string, value: string): void;
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
