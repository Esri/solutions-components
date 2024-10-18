/** @license
 * Copyright 2023 Esri
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
import { EventEmitter, VNode } from "../../stencil-public-runtime";
import LayoutManager_T9n from "../../assets/t9n/layout-manager/resources.json";
import { ELayoutMode } from "../../utils/interfaces";
export declare class LayoutManager {
    el: HTMLLayoutManagerElement;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof LayoutManager_T9n;
    /**
     * Controls the layout of the application
     */
    protected _layoutMode: ELayoutMode;
    /**
     * Emitted when the layout should change
     */
    layoutChanged: EventEmitter<ELayoutMode>;
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
     * Store and emit the current layout mode
     *
     * @param imgClass string the css class to use
     * @param layoutMode ELayoutMode the associated layout mode for the current action
     * @param tip string the value to display as the tooltip for the action
     *
     * @protected
     */
    protected _getAction(imgClass: string, layoutMode: ELayoutMode, tip: string): VNode;
    /**
     * Store and emit the current layout mode
     *
     * @param layoutMode ELayoutMode the current layout mode
     *
     * @protected
     */
    protected _setLayoutMode(layoutMode: ELayoutMode): void;
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
