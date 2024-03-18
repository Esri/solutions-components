/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { Host, h } from "@stencil/core";
import { Telemetry } from "@esri/telemetry";
import { GoogleAnalytics } from "@esri/telemetry-google-analytics";
export class CookieTest {
    constructor() {
        this._consentGranted = false;
        this.firstUseVar = "solutions-first-use";
        this.measurementIds = ["G-ZSDDNE856F"];
        this.portal = undefined;
        this._loaded = false;
    }
    render() {
        console.log("cookie-test-render");
        return (h(Host, null, h("calcite-panel", { class: "consent-panel", id: "cookie-policy" }, h("div", { class: "cookie-consent-popup-container" }, h("div", { id: "cookie-policy-description-top", tabindex: "-1" }, h("p", null, "Dear visitor,"), h("p", null, "We use analytics cookies to offer you a better browsing experience. You have the choice to refuse or accept them.")), h("div", { class: "button-container" }, h("calcite-button", { appearance: "solid", class: "padding-end-1", kind: "neutral", onClick: () => this._refuse() }, "I refuse analytics cookies"), h("calcite-button", { appearance: "solid", kind: "neutral", onClick: () => this._accept() }, "I accept analytics cookies")), h("div", null, h("p", null, "For any information on the other cookies and server logs we use, we invite you to read our\u00A0", h("calcite-link", { href: "https://www.europarl.europa.eu/privacy-policy/en/data-protection", rel: "noopener noreferrer", target: "_blank" }, "data protection policy"), " , our\u00A0", h("calcite-link", { href: "https://www.europarl.europa.eu/privacy-policy/en/cookies-policy", rel: "noopener noreferrer", target: "_blank" }, "cookies policy"), "and our\u00A0", h("calcite-link", { href: "https://www.europarl.europa.eu/privacy-policy/en/cookies-inventory", rel: "noopener noreferrer", target: "_blank" }, "cookies inventory.")))))));
    }
    async _init() {
        var _a;
        // should have some messaging around the expectations like no portal set
        if (!this._loaded && ((_a = this.measurementIds) === null || _a === void 0 ? void 0 : _a.length) > 0 && this.portal) {
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
            this.consentGranted.emit({
                granted: this._consentGranted,
                instance: this._telemetryInstance
            });
        }
    }
    _accept() {
        this._consentGranted = true;
        void this._init();
    }
    _refuse() {
        this._consentGranted = false;
        this.consentGranted.emit({
            granted: this._consentGranted
        });
    }
    static get is() { return "cookie-test"; }
    static get originalStyleUrls() {
        return {
            "$": ["cookie-test.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["cookie-test.css"]
        };
    }
    static get properties() {
        return {
            "firstUseVar": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "first-use-var",
                "reflect": false,
                "defaultValue": "\"solutions-first-use\""
            },
            "measurementIds": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "string[]",
                    "resolved": "string[]",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "defaultValue": "[\"G-ZSDDNE856F\"]"
            },
            "portal": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "__esri.Portal",
                    "resolved": "Portal",
                    "references": {
                        "___esri": {
                            "location": "global",
                            "id": "global::___esri"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                }
            }
        };
    }
    static get states() {
        return {
            "_loaded": {}
        };
    }
    static get events() {
        return [{
                "method": "consentGranted",
                "name": "consentGranted",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "IConsentResponse",
                    "resolved": "IConsentResponse",
                    "references": {
                        "IConsentResponse": {
                            "location": "local",
                            "path": "C:/Users/john4818/Documents/GitHub/solutions-components/src/components/cookie-test/cookie-test.tsx",
                            "id": "src/components/cookie-test/cookie-test.tsx::IConsentResponse"
                        }
                    }
                }
            }];
    }
}
