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
import { EventEmitter } from '../../stencil-public-runtime';
import DeleteDialog_T9n from "../../assets/t9n/delete-button/resources.json";
import { EditType } from "../../utils/interfaces";
export declare class DeleteDialog {
    el: HTMLDeleteDialogElement;
    /**
     * number[]: The ids that would be deleted
     */
    ids: any[];
    /**
     * esri/views/layers/FeatureLayer: https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html
     */
    layer: __esri.FeatureLayer;
    /**
     * boolean: When true the delete dialog will be displayed
     */
    open: boolean;
    /**
     * boolean: When true a loading indicator will be shown in the delete button
     */
    _isDeleting: boolean;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof DeleteDialog_T9n;
    /**
     * Emitted on demand when features have been deleted
     */
    editsComplete: EventEmitter<EditType>;
    /**
     * Emitted on demand when features have been deleted
     */
    deleteDialogClose: EventEmitter<void>;
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
     * Delete the currently selected features
     */
    protected _deleteFeatures(): Promise<void>;
    /**
     * Set the alertOpen member to false when the alert is closed
     */
    protected _close(): void;
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
