/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { Host, h } from "@stencil/core";
import { Telemetry } from "@esri/telemetry";
import { GoogleAnalytics } from "@esri/telemetry-google-analytics";
// TODO re-create with the name consent-manager
export class CookieTest {
    constructor() {
        this.firstUseVar = "solutions-first-use";
        this.measurementIds = ["G-ZSDDNE856F"];
        this.portal = undefined;
        this._loaded = false;
    }
    async getInstance() {
        await this._init();
        return this._loaded ? this._telemetryInstance : undefined;
    }
    render() {
        console.log("cookie-test-render");
        return (h(Host, null, h("calcite-panel", { class: "consent-panel", id: "cookie-policy" }, h("div", { class: "cookie-consent-popup-container" }, h("div", { class: "consent-text", id: "cookie-policy-description-top", tabindex: "-1" }, h("p", null, "Dear visitor,"), h("p", null, "We use analytics cookies to offer you a better browsing experience. You have the choice to refuse or accept them.")), h("div", { class: "epjs_buttons" }, h("calcite-button", { appearance: "solid", class: "epjs_agree", kind: "neutral" }, "I refuse analytics cookies"), h("calcite-button", { appearance: "solid", class: "epjs_agree", kind: "neutral" }, "I accept analytics cookies")), h("div", { class: "consent-text", id: "cookie-policy-description-bottom" }, h("p", null, "For any information on the other cookies and server logs we use, we invite you to read our", h("calcite-link", { href: "https://www.europarl.europa.eu/privacy-policy/en/data-protection", rel: "noopener noreferrer", style: {
                "text-decoration": "underline",
                "color": "inherit"
            }, target: "_blank" }, "data protection policy"), " , our", h("calcite-link", { class: "cc-link-default", href: "https://www.europarl.europa.eu/privacy-policy/en/cookies-policy", rel: "noopener noreferrer", target: "_blank" }, "cookies policy"), "and our", h("calcite-link", { href: "https://www.europarl.europa.eu/privacy-policy/en/cookies-inventory", rel: "noopener noreferrer", target: "_blank" }, "cookies inventory.")))))));
    }
    async _init() {
        var _a;
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
        }
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
    static get methods() {
        return {
            "getInstance": {
                "complexType": {
                    "signature": "() => Promise<Telemetry | undefined>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "Telemetry": {
                            "location": "global",
                            "id": "global::Telemetry"
                        }
                    },
                    "return": "Promise<any>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            }
        };
    }
}
