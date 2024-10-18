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
export declare class SolutionItemIcon {
    el: HTMLSolutionItemIconElement;
    /**
     * Indicate if this is portal
     */
    isPortal: boolean;
    /**
     * The type for the item
     */
    type: string;
    /**
     * The typeKeywords for the item
     */
    typeKeywords: string[];
    /**
     * Renders the component.
     */
    render(): VNode;
    /**
     * This function was copied and slightly modified from the arcgis-portal-app.
     *
     * This will construct the path to the icon based on type and typeKeyword info.
     *
     * @param type The item type
     * @param typeKeywords The item typeKeywords
     *
     * @returns string the asset path for the given item type and typekeywords
     */
    protected _getIconUrl(type: string, typeKeywords: string[]): string;
    /**
     * This function was copied and slightly modified from the arcgis-app-components.
     *
     * This will fetch the name of the icon based on type and typeKeyword info.
     *
     * @param type The item type
     * @param typeKeywords The item typeKeywords
     *
     * @returns string the name of the icon for the given type and typekeywords
     */
    protected _getItemIcon(type: string, typeKeywords: string[]): any;
}
