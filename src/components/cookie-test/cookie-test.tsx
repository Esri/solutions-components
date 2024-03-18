import { Component, Host, h, Method, Prop, State } from '@stencil/core';
import { Telemetry } from "@esri/telemetry";
import { GoogleAnalytics } from '@esri/telemetry-google-analytics';

// TODO re-create with the name consent-manager

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

  @Method()
  async getInstance(): Promise<Telemetry | undefined> {
    await this._init();
    return this._loaded ? this._telemetryInstance : undefined;
  }

  render() {
    console.log("cookie-test-render")
    return (
      <Host>
        <calcite-panel
          class="consent-panel"
          id="cookie-policy"
        >
          <div class="cookie-consent-popup-container">
            <div
              class="consent-text"
              id="cookie-policy-description-top"
              tabindex="-1"
            >
              <p>Dear visitor,</p>
              <p>We use analytics cookies to offer you a better browsing experience. You have the choice to refuse or accept them.</p>
            </div>
            <div class="epjs_buttons">

              <calcite-button appearance="solid" class="epjs_agree" kind="neutral">
                I refuse analytics cookies
              </calcite-button>

              <calcite-button appearance="solid" class="epjs_agree" kind="neutral">
                I accept analytics cookies
              </calcite-button>
            </div>
            <div
              class="consent-text"
              id="cookie-policy-description-bottom"
            >
              <p>
                For any information on the other cookies and server logs we use, we invite you to read our
                <calcite-link
                  href="https://www.europarl.europa.eu/privacy-policy/en/data-protection"
                  rel="noopener noreferrer"
                  style={{
                    "text-decoration": "underline",
                    "color": "inherit"
                  }}
                  target="_blank"
                >
                    data protection policy
                </calcite-link> , our
                <calcite-link
                  class="cc-link-default"
                  href="https://www.europarl.europa.eu/privacy-policy/en/cookies-policy"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  cookies policy
                </calcite-link>
                  and our
                <calcite-link
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
    );
  }

  async _init(): Promise<void> {
    if (!this._loaded && this.measurementIds?.length > 0 && this.portal) {
      const googleAnalyticsTracker = new GoogleAnalytics({
        measurementIds: this.measurementIds
      });

      this._telemetryInstance = new Telemetry({
        plugins: [googleAnalyticsTracker],
        portal: this.portal,
        debug: true,
        test: true,
      });

      await this._telemetryInstance.init();

      this._loaded = true;
    }
  }
}
