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
import DeleteButton_T9n from "../../assets/t9n/delete-button/resources.json";
import { ButtonType, EditType } from "../../utils/interfaces";
export declare class DeleteButton {
    el: HTMLBufferToolsElement;
    /**
     * ButtonType (button | action): Support usage as action or button
     */
    buttonType: ButtonType;
    /**
     * boolean: This overrides internal enable/disable logic that is based on checks if the layer supports delete
     */
    disabled: boolean;
    /**
     * string: The icon to display in the component
     */
    icon: string;
    /**
     * number[]: The ids that would be deleted
     */
    ids: any[];
    /**
     * esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     */
    layer: __esri.FeatureLayer;
    /**
     * boolean: When true the user will be asked to confirm the delete operation
     */
    _confirmDelete: boolean;
    /**
     * boolean: When true the user can delete the current features
     */
    _deleteEndabled: boolean;
    /**
     * boolean: When true a loading indicator will be shown in the delete button
     */
    _isDeleting: boolean;
    /**
     * boolean: When true the layer supports delete and a button will be returned
     */
    _supportsDelete: boolean;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof DeleteButton_T9n;
    /**
     * watch for changes in layer view and verify if it has editing enabled
     */
    idsWatchHandler(): Promise<void>;
    /**
     * watch for changes in layer view and verify if it has editing enabled
     */
    layerWatchHandler(): Promise<void>;
    /**
     * Emitted on demand when features have been deleted
     */
    editsComplete: EventEmitter<EditType>;
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    componentWillLoad(): Promise<void>;
    /**
     * Renders the component.
     */
    render(): any;
    /**
     * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
     */
    componentDidLoad(): Promise<void>;
    /**
     * Verify if the layer supports delete and that we have 1 or more ids
     */
    protected _setDeleteEnabled(): void;
    /**
     * Delete all selected records or shows an alert if the layer does not have editing enabled
     *
     * @returns a promise that will resolve when the operation is complete
     */
    protected _delete(): void;
    /**
     * Show delete confirmation message
     *
     * @returns node to confirm or deny the delete operation
     */
    protected _deleteMessage(): VNode;
    /**
     * Delete the currently selected features
     */
    protected _deleteFeatures(): Promise<void>;
    /**
     * Set the alertOpen member to false when the alert is closed
     */
    protected _deleteClosed(): void;
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
