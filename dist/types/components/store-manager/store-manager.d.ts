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
/**
 * The json-editor component leverages a stencil/store to manage data.
 * If a component uses the json-editor but does not have logic to hydrate the store this component can be used.
 * It will create and hydrate the store based on the value provided.
 *
 * The value must be a string so it can be observed by the MutationObserver implemented below.
 * The observer does not notify when passing complex attributes as you can with stencil.
 *
 *
*/
import { EventEmitter, VNode } from '../../stencil-public-runtime';
import { UserSession } from '@esri/solution-common';
export declare class StoreManager {
    el: HTMLStoreManagerElement;
    /**
     * Contains source json as a string
     *
     */
    value: string;
    /**
     * Templates for the current solution
     */
    templates: any[];
    /**
     * Credentials for requests
     */
    authentication: UserSession;
    connectedCallback(): void;
    /**
     * Renders the component.
     */
    render(): VNode;
    stateLoaded: EventEmitter<any>;
    /**
     * Returns the store info for the supplied property name.
     *
     * @param propName Name of the property to return
     */
    getStoreInfo(propName: string): Promise<any>;
    protected _valueObserver: any;
    /**
     * Loads a store when supplied with a non-empty value.
     *
     * @param newValue New store value to load
     */
    protected _handleValueChange(newValue: string): void;
    /**
     * Initialize the observer that will monitor and respond to changes in the value.
     * When we get a new value we are dealing with a new solution and need to fetch the item's data and load the state.
     */
    protected _initValueObserver(): void;
}
