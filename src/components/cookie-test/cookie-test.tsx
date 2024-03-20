import { Component, Event, EventEmitter, Host, h, Method, Prop, State } from '@stencil/core';
import { Telemetry } from "@esri/telemetry";
import { GoogleAnalytics } from '@esri/telemetry-google-analytics';

// TODO re-create with the name consent-manager

export interface IConsentResponse {
  granted: boolean;
  instance?: Telemetry;
  messages?: string[];
}

@Component({
  tag: 'cookie-test',
  styleUrl: 'cookie-test.css',
  shadow: false,
})
export class CookieTest {

  @Prop() firstUseVar = "solutions-first-use";

  @Prop() measurementIds = ["G-ZSDDNE856F"];

  @Prop() portal: __esri.Portal;

  _telemetryInstance: Telemetry;

  @State() _loaded = false;

  _consentGranted = false;

  _shouldRender: boolean;

  @Event() consentGranted: EventEmitter<IConsentResponse>;

  @Method()
  async getInstance(): Promise<Telemetry | undefined> {
    console.log("getInstance")

    if (localStorage.getItem(this.firstUseVar) === "true") {
      await this._init();
    }
    return this._telemetryInstance;
  }

  async componentWillLoad(): Promise<void> {
    console.log("componentWillLoad")
    this._shouldRender = localStorage.getItem(this.firstUseVar) === null;
    if (localStorage.getItem(this.firstUseVar) === "true") {
      await this._init();
    }
  }

  render() {
    console.log("cookie-test-render")
    return this._shouldRender && !this._loaded ? (
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
              <p>Dear visitor,</p>
              <p>We use analytics cookies to offer you a better browsing experience. You have the choice to refuse or accept them.</p>
            </div>
            <div class="button-container">
              <calcite-button
                appearance="solid"
                class="padding-end-1"
                kind="brand"
                onClick={() => this._refuse()}
              >
                I refuse analytics cookies
              </calcite-button>

              <calcite-button
                appearance="solid"
                kind="brand"
                onClick={() => this._accept()}
              >
                I accept analytics cookies
              </calcite-button>
            </div>
            <div>
              <p>
                For any information on the other cookies and server logs we use, we invite you to read our&nbsp;
                <calcite-link
                  class="link-text"
                  href="https://www.europarl.europa.eu/privacy-policy/en/data-protection"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                    data protection policy
                </calcite-link> , our&nbsp;
                <calcite-link
                  class="link-text"
                  href="https://www.europarl.europa.eu/privacy-policy/en/cookies-policy"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  cookies policy
                </calcite-link>
                  and our&nbsp;
                <calcite-link
                  class="link-text"
                  href="https://www.europarl.europa.eu/privacy-policy/en/cookies-inventory"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  cookies inventory.
                </calcite-link>
              </p>
            </div>
          </div>
        </calcite-panel>
      </Host>
    ) : undefined;
  }

  async _init(): Promise<void> {
    console.log("_init")

    // should have some messaging around the expectations like no portal set
    if (!this._loaded && this.measurementIds?.length > 0 && this.portal) {
      console.log("IN _init")

      const googleAnalyticsTracker = new GoogleAnalytics({
        measurementIds: this.measurementIds
      });

      this._telemetryInstance = new Telemetry({
        plugins: [googleAnalyticsTracker],
        portal: this.portal,
        debug: true,
        test: true,
        disabled: false
      });

      await this._telemetryInstance.init();

      this._loaded = true;

      this.consentGranted.emit({
        granted: this._consentGranted,
        instance: this._telemetryInstance
      });
    } else {
      console.log("NOT IN _init")
    }
  }

  _accept(): void {
    this._consentGranted = true;
    localStorage.setItem(this.firstUseVar, this._consentGranted.toString())
    void this._init();
  }

  _refuse(): void {
    this._consentGranted = false;
    localStorage.setItem(this.firstUseVar, this._consentGranted.toString())
    this.consentGranted.emit({
      granted: this._consentGranted
    });
  }
}
