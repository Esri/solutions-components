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
import { VNode } from "../../stencil-public-runtime";
import { IInventoryItem, ISolutionSpatialReferenceInfo } from "../../utils/interfaces";
import { UserSession } from "@esri/solution-common";
import "@esri/calcite-components";
import SolutionConfiguration_T9n from "../../assets/t9n/solution-configuration/resources.json";
export declare class SolutionConfiguration {
    el: HTMLSolutionConfigurationElement;
    /**
     * Credentials for requests, which can be a serialized UserSession
     */
    authentication: UserSession;
    serializedAuthentication: string;
    serializedAuthenticationWatchHandler(): Promise<void>;
    /**
     * Contains the current solution item id
     */
    solutionItemId: string;
    valueWatchHandler(): Promise<void>;
    /**
    * Used to show/hide loading indicator
    */
    showLoading: boolean;
    constructor();
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    componentWillLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): VNode;
    /**
     * Contains the current item we are working with
     */
    protected _currentEditItemId: string;
    protected _organizationVariables: string;
    protected _solutionContentsComponent: HTMLSolutionContentsElement;
    protected _solutionIsLoaded: boolean;
    protected _solutionVariables: string;
    /**
     * Contains the hierarchy of template items for the current solution.
     */
    protected _templateHierarchy: IInventoryItem[];
    /**
     * Contains the _translations for this component.
     * All UI strings should be defined here.
     */
    protected _translations: typeof SolutionConfiguration_T9n;
    /**
     * Used to show/hide the content tree
     */
    protected _treeOpen: boolean;
    protected _solutionStoreHasChanges: boolean;
    protected _solutionEditorHasChanges: boolean;
    protected _solutionEditorHasErrors: boolean;
    protected _canSave: boolean;
    _solutionItemSelected(event: CustomEvent): void;
    getSpatialReferenceInfo(): Promise<ISolutionSpatialReferenceInfo>;
    saveSolution(): Promise<void>;
    unloadSolution(): Promise<void>;
    /**
     * Update the store with the initial values
     *
     * @param templates the solution items templates
     * @param isReset (defaults to false) indicates if we are resetting the controls after save
     */
    /**
     * Set Props with the initial values
     *
     * @protected
     */
    protected _initProps(): void;
    /**
     * Loads a solution.
     *
     * @param solutionItemId AGO id of solution to load
     *
     * @returns Resolved promise when task is done
     *
     * @protected
     */
    protected _loadSolution(solutionItemId: string): Promise<void>;
    /**
     * Resets internal variables.
     *
     * @protected
     */
    protected _reset(): void;
    /**
     * Toggle _treeOpen prop to show/hide content tree.
     *
     * @protected
     */
    protected _toggleTree(): void;
    /**
     * Dispatches an event indicating if the configuration is saveable or not. It's not saveable if there are no
     * changes or if there's an error in the JSON editor.
     *
     * @param solutionStoreHasChanges Are there changes in the configuration editor's internal store?
     * @param solutionEditorHasChanges Are there changes in the configuration editor's JSON editor?
     * @param solutionEditorHasErrors Are there errors in the configuration editor's JSON editor?
     *
     * @protected
     */
    protected _updateSaveability(solutionStoreHasChanges: boolean, solutionEditorHasChanges: boolean, solutionEditorHasErrors: boolean): void;
    /**
     * Save all edits from the current configuration
     *
     * @returns a response that will indicate success or failure and any associated messages
     */
    /**
     * Update the solutions templates based on the stored changes
     *
     * @returns an object that contains the updated templates as well as any errors that were found
     */
    /**
     * Review all models and store itemIds that should be added or removed from group dependencies
     *
     * @param models the corresponding models for the current templates
     *
     * @returns group info (an object with keys of groupIds and
     * arrays of itemIds that should be added or removed from group dependencies)
     */
    /**
     * Updates group dependency arrays by adding or removing itemIds
     *
     * @param templates the current templates to update
     * @param models the corresponding models for the current templates
     *
     * @returns updated templates array
     */
    /**
     * Add group IDs to items that should be shared
     * This function will update the provided template when shareInfo is available
     *
     * @param template the current template to update
     * @param shareInfo the corresponding shareInfo from the model for the current template
     *
     */
    /**
     * Set a templates data property with changes from the models
     *
     * @param template the current template to update
     * @param model the corresponding model for the current template (stores any user changes)
     *
     * @returns a boolean that indicates if any errors were detected
     */
    /**
     * Set a templates properties property with changes from the models
     *
     * @param template the current template to update
     * @param model the corresponding model for the current template (stores any user changes)
     *
     * @returns a boolean that indicates if any errors were detected
     */
    /**
     * Generic function used to set properties or data property on a given template
     *
     * @param template the current template to update
     * @param originValue the original value from the solution template
     * @param modelValue the current value from the model (will contain any edits that have been made)
     * @param path the path to the property we should update if any changes are found
     *
     * @returns a boolean that indicates if any errors were detected
     */
    /**
     * Set a templates item property with changes from the models
     *
     * @param template the current template to update
     * @param model the corresponding model for the current template (stores any user changes)
     *
     * This function will update the template argument when edits are found
     */
    /**
     * Set spatial reference info in the solutions data
     *
     * @param templates a list of item templates from the solution
     *
     * @returns a cloned copy of the solutions data that has been updated with spatial reference info
     *
     */
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
