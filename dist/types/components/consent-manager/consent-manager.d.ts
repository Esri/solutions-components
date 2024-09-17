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
import ConsentManager_T9n from "../../assets/t9n/consent-manager/resources.json";
import { Telemetry } from "@esri/telemetry";
import { IConsentResponse } from "../../utils/interfaces";
export declare class ConsentManager {
    el: HTMLConsentManagerElement;
    /**
     * string: The name to use for the variable stored in the browsers local storge that
     * will keep track of the users choice for consent
     */
    firstUseVar: string;
    /**
     * string[]: Any ids for the analytics configured to receive events from the telemety instance
     */
    measurementIds: string[];
    /**
     * esri/portal/Portal: https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html
     * Required prop for this component to function
     */
    portal: __esri.Portal;
    /**
     * boolean: When true the user has not allowed or denied consent
     */
    _shouldRender: boolean;
    /**
     * Contains the translations for this component.
     * All UI strings should be defined here.
     */
    _translations: typeof ConsentManager_T9n;
    /**
     * boolean: When true the user has granted consent and the telemetry instance will be avaliable
     */
    protected _consentGranted: boolean;
    /**
     * boolean: When true the telemetry instance has been loaded
     */
    protected _loaded: boolean;
    /**
     * Telemetry: The telemetry instance that can be used to log events by the consuming application
     * https://www.npmjs.com/package/@esri/telemetry
     */
    protected _telemetryInstance: Telemetry;
    /**
     * Initialize and return the telemetry instance if consent has been granted
     */
    getInstance(): Promise<Telemetry | undefined>;
    /**
     * Emitted on demand when the user accepts or denies consent
     */
    consentGranted: EventEmitter<IConsentResponse>;
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
     * Called once after the component is loaded
     *
     * @returns Promise when complete
     */
    componentDidLoad(): Promise<void>;
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    _init(): Promise<void>;
    /**
     * Store the users granting of consent
     *
     * @protected
     */
    _accept(): void;
    /**
     * Store the users refusal of consent
     *
     * @protected
     */
    _refuse(): void;
    /**
     * Store and emit the users choice for consent
     *
     * @protected
     */
    protected _handleConsent(): void;
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    protected _getTranslations(): Promise<void>;
}
