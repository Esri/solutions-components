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

import { Component, Element, Event, EventEmitter, Host, h, Method, Prop, State } from '@stencil/core';
import ConsentManager_T9n from "../../assets/t9n/consent-manager/resources.json";
import { getLocaleComponentStrings } from "../../utils/locale";
import { Telemetry } from "@esri/telemetry";
import { GoogleAnalytics } from '@esri/telemetry-google-analytics';
import { IConsentResponse } from "../../utils/interfaces";

@Component({
  tag: 'consent-manager',
  styleUrl: 'consent-manager.css',
  shadow: true,
})
export class ConsentManager {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLConsentManagerElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * string: The name to use for the variable stored in the browsers local storge that
   * will keep track of the users choice for consent
   */
  @Prop() firstUseVar!: string;

  /**
   * string[]: Any ids for the analytics configured to receive events from the telemety instance
   */
  @Prop() measurementIds!: string[];

  /**
   * esri/portal/Portal: https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html
   * Required prop for this component to function
   */
  @Prop() portal!: __esri.Portal;

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: When true the user has not allowed or denied consent
   */
  @State() _shouldRender: boolean;

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() _translations: typeof ConsentManager_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * boolean: When true the user has granted consent and the telemetry instance will be avaliable
   */
  protected _consentGranted = false;

  /**
   * boolean: When true the telemetry instance has been loaded
   */
  protected _loaded = false;

  /**
   * Telemetry: The telemetry instance that can be used to log events by the consuming application
   * https://www.npmjs.com/package/@esri/telemetry
   */
  protected _telemetryInstance: Telemetry;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Initialize and return the telemetry instance if consent has been granted
   */
  @Method()
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  async getInstance(): Promise<Telemetry | undefined> {
    if (localStorage.getItem(this.firstUseVar) === "true") {
      await this._init();
      return this._telemetryInstance;
    } else {
      return undefined;
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Emitted on demand when the user accepts or denies consent
   */
  @Event() consentGranted: EventEmitter<IConsentResponse>;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  async componentWillLoad(): Promise<void> {
    await this._getTranslations();
    this._shouldRender = localStorage.getItem(this.firstUseVar) === null;
  }

  /**
   * Renders the component.
   */
  render() {
    return this._shouldRender ? (
      <Host>
        <calcite-panel
          class="consent-panel calcite-mode-dark"
          id="cookie-policy"
        >
          <div class="cookie-consent-popup-container">
            <div
              id="cookie-policy-description-top"
              tabindex="-1"
            >
              <p>{this._translations.dearVisitor}</p>
              <p>{this._translations.useAnalytics}</p>
            </div>
            <div class="button-container">
              <calcite-button
                appearance="solid"
                class="padding-end-1"
                kind="brand"
                onClick={() => this._refuse()}
              >
                {this._translations.refuseAnalytics}
              </calcite-button>

              <calcite-button
                appearance="solid"
                kind="brand"
                onClick={() => this._accept()}
              >
                {this._translations.acceptAnalytics}
              </calcite-button>
            </div>
            <div>
              <p>
                {this._translations.moreInfo}&nbsp;
                <calcite-link
                  class="link-text"
                  href="https://www.arcgis.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {this._translations.protectionPolicy}
                </calcite-link>{this._translations.our}&nbsp;
                <calcite-link
                  class="link-text"
                  href="https://www.arcgis.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {this._translations.cookiePolicy}&nbsp;
                </calcite-link>
                  {this._translations.andOur}&nbsp;
                <calcite-link
                  class="link-text"
                  href="https://www.arcgis.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {this._translations.cookiesInventory}
                </calcite-link>
              </p>
            </div>
          </div>
        </calcite-panel>
      </Host>
    ) : undefined;
  }

  /**
   * Called once after the component is loaded
   *
   * @returns Promise when complete
   */
  async componentDidLoad(): Promise<void> {
    this.consentGranted.emit({
      granted: localStorage.getItem(this.firstUseVar) === "true"
    });
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  async _init(): Promise<void> {
    if (!this._loaded && this.measurementIds?.length > 0 && this.portal) {
      const googleAnalyticsTracker = new GoogleAnalytics({
        measurementIds: this.measurementIds
      });

      this._telemetryInstance = new Telemetry({
        plugins: [googleAnalyticsTracker],
        portal: this.portal
      });

      await this._telemetryInstance.init();

      this._loaded = true;
    }
  }

  /**
   * Store the users granting of consent
   *
   * @protected
   */
  _accept(): void {
    this._consentGranted = true;
    this._handleConsent();
  }

  /**
   * Store the users refusal of consent
   *
   * @protected
   */
  _refuse(): void {
    this._consentGranted = false;
    this._handleConsent();
  }

  /**
   * Store and emit the users choice for consent
   *
   * @protected
   */
  protected _handleConsent(): void {
    this._shouldRender = false;
    localStorage.setItem(this.firstUseVar, this._consentGranted.toString())
    this.consentGranted.emit({
      granted: this._consentGranted
    });
  }

  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  protected async _getTranslations(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this._translations = messages[0] as typeof ConsentManager_T9n;
  }

}
