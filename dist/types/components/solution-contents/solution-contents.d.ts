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
import { IInventoryItem } from '../../utils/interfaces';
import '@esri/calcite-components';
export declare class SolutionContents {
    el: HTMLSolutionContentsElement;
    /**
     * Contains the current item that is selected.
     */
    selectedItemId: string;
    /**
     * Contains the public value for this component.
     */
    templateHierarchy: IInventoryItem[];
    valueWatchHandler(v: any, oldV: any): void;
    componentWillLoad(): void;
    /**
     * Renders the component.
     */
    render(): VNode;
    renderHierarchy(objs: IInventoryItem[]): HTMLCalciteTreeItemElement[];
    solutionItemSelected: EventEmitter<string>;
    /**
     * Publishes the `solutionItemSelected` event containing `solutionItem` of the selected item.
     *
     * Also toggles the expanded state of the tree item.
     *
     * @param solutionItem the selected solution item to emit
     * @param evt MouseEvent or undefined
     */
    protected _treeItemSelected(itemId: string, evt?: any): void;
}
