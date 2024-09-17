/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
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
import { Host, h } from "@stencil/core";
import { getLocaleComponentStrings } from "../../utils/locale";
import { Telemetry } from "@esri/telemetry";
import { GoogleAnalytics } from "@esri/telemetry-google-analytics";
export class ConsentManager {
    constructor() {
        this.firstUseVar = undefined;
        this.measurementIds = undefined;
        this.portal = undefined;
        this._shouldRender = undefined;
        this._translations = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * boolean: When true the user has granted consent and the telemetry instance will be avaliable
     */
    _consentGranted = false;
    /**
     * boolean: When true the telemetry instance has been loaded
     */
    _loaded = false;
    /**
     * Telemetry: The telemetry instance that can be used to log events by the consuming application
     * https://www.npmjs.com/package/@esri/telemetry
     */
    _telemetryInstance;
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
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    async getInstance() {
        if (localStorage.getItem(this.firstUseVar) === "true") {
            await this._init();
            return this._telemetryInstance;
        }
        else {
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
    consentGranted;
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
    async componentWillLoad() {
        await this._getTranslations();
        this._shouldRender = localStorage.getItem(this.firstUseVar) === null;
    }
    /**
     * Renders the component.
     */
    render() {
        return this._shouldRender ? (h(Host, null, h("calcite-panel", { class: "consent-panel calcite-mode-dark", id: "cookie-policy" }, h("div", { class: "cookie-consent-popup-container" }, h("div", { id: "cookie-policy-description-top", tabindex: "-1" }, h("p", null, this._translations.dearVisitor), h("p", null, this._translations.useAnalytics)), h("div", { class: "button-container" }, h("calcite-button", { appearance: "solid", class: "padding-end-1", kind: "brand", onClick: () => this._refuse() }, this._translations.refuseAnalytics), h("calcite-button", { appearance: "solid", kind: "brand", onClick: () => this._accept() }, this._translations.acceptAnalytics)), h("div", null, h("p", null, this._translations.moreInfo, "\u00A0", h("calcite-link", { class: "link-text", href: "https://www.arcgis.com/", rel: "noopener noreferrer", target: "_blank" }, this._translations.protectionPolicy), this._translations.our, "\u00A0", h("calcite-link", { class: "link-text", href: "https://www.arcgis.com/", rel: "noopener noreferrer", target: "_blank" }, this._translations.cookiePolicy, "\u00A0"), this._translations.andOur, "\u00A0", h("calcite-link", { class: "link-text", href: "https://www.arcgis.com/", rel: "noopener noreferrer", target: "_blank" }, this._translations.cookiesInventory))))))) : undefined;
    }
    /**
     * Called once after the component is loaded
     *
     * @returns Promise when complete
     */
    async componentDidLoad() {
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
    async _init() {
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
    _accept() {
        this._consentGranted = true;
        this._handleConsent();
    }
    /**
     * Store the users refusal of consent
     *
     * @protected
     */
    _refuse() {
        this._consentGranted = false;
        this._handleConsent();
    }
    /**
     * Store and emit the users choice for consent
     *
     * @protected
     */
    _handleConsent() {
        this._shouldRender = false;
        localStorage.setItem(this.firstUseVar, this._consentGranted.toString());
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
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get is() { return "consent-manager"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["consent-manager.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["consent-manager.css"]
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
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "string: The name to use for the variable stored in the browsers local storge that\r\nwill keep track of the users choice for consent"
                },
                "attribute": "first-use-var",
                "reflect": false
            },
            "measurementIds": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "string[]",
                    "resolved": "string[]",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "string[]: Any ids for the analytics configured to receive events from the telemety instance"
                }
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
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "esri/portal/Portal: https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-Portal.html\r\nRequired prop for this component to function"
                }
            }
        };
    }
    static get states() {
        return {
            "_shouldRender": {},
            "_translations": {}
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
                    "text": "Emitted on demand when the user accepts or denies consent"
                },
                "complexType": {
                    "original": "IConsentResponse",
                    "resolved": "IConsentResponse",
                    "references": {
                        "IConsentResponse": {
                            "location": "import",
                            "path": "../../utils/interfaces",
                            "id": "src/utils/interfaces.ts::IConsentResponse"
                        }
                    }
                }
            }];
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
                    "text": "Initialize and return the telemetry instance if consent has been granted",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
}
