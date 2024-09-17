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
export declare class PopupUtils {
    /**
     * esri/arcade: https://developers.arcgis.com/javascript/latest/api-reference/esri-arcade.html
     */
    arcade: typeof import("esri/arcade");
    /**
     * esri/intl: https://developers.arcgis.com/javascript/latest/api-reference/esri-intl.html
     */
    intl: typeof import("esri/intl");
    /**
     * Get the popup title that honors arcade expressions
     * @param graphic selected graphic
     * @param map __esri.Map
     * @returns Promise resolving with the popup title
     *
     * @protected
     */
    getPopupTitle(graphic: __esri.Graphic, map: __esri.Map): Promise<string>;
    /**
     * Remove any tags from the title
     *
     * @returns title string without tags
     *
     * @protected
     */
    protected _removeTags(str: string): string;
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    protected _initModules(): Promise<void>;
}
