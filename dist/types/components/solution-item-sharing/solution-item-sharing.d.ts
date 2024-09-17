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
import { IItemShare } from '../../utils/interfaces';
import SolutionItemSharing_T9n from '../../assets/t9n/solution-item-sharing/resources.json';
export declare class SolutionItemSharing {
    el: HTMLSolutionItemSharingElement;
    /**
     * A template's groupId.
     */
    groupId: string;
    itemIdWatchHandler(): void;
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
    protected _translations: typeof SolutionItemSharing_T9n;
    /**
     * Contains the public sharing for this component.
     */
    sharing: IItemShare[];
    getShareInfo(): Promise<any>;
    /**
     * Render share options based on the list of share details
     *
     * @param objs list of IItemShare objects that are used to expose and store share info for the solutions items
     */
    _renderItems(objs: IItemShare[]): VNode[];
    /**
     * Update the items share prop based on the switch state
     *
     * @param event onCalciteSwitchChange event
     */
    _updateItem(event: any): void;
    /**
     * Fetches the component's translations
     *
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
