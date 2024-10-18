import state from "../../utils/solution-store";
import { getFeatureServices, /*getModels,*/ getSpatialReferenceInfo } from "../../utils/templates";
export class StoreManager {
    constructor() {
        this.value = "";
        this.templates = [];
        this.authentication = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Host element access
    //
    //--------------------------------------------------------------------------
    el;
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // Handle an initial value
        this._handleValueChange(this.value);
        // Set up an oberver to watch for changes to the value attribute
        this._initValueObserver();
    }
    /**
     * Renders the component.
     */
    render() {
        return (null);
    }
    //--------------------------------------------------------------------------
    //
    //  Events
    //
    //--------------------------------------------------------------------------
    stateLoaded;
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    /**
     * Returns the store info for the supplied property name.
     *
     * @param propName Name of the property to return
     */
    async getStoreInfo(propName) {
        return Promise.resolve(state.getStoreInfo(propName));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    _valueObserver;
    /**
     * Loads a store when supplied with a non-empty value.
     *
     * @param newValue New store value to load
     */
    _handleValueChange(newValue) {
        if (newValue !== "") {
            const solutionData = JSON.parse(newValue);
            state.setStoreInfo("solutionData", solutionData);
            const services = getFeatureServices(solutionData.templates);
            state.setStoreInfo("featureServices", services);
            state.setStoreInfo("spatialReferenceInfo", getSpatialReferenceInfo(services, solutionData));
            this.templates = solutionData.templates;
            this.stateLoaded.emit(state);
        }
    }
    /**
     * Initialize the observer that will monitor and respond to changes in the value.
     * When we get a new value we are dealing with a new solution and need to fetch the item's data and load the state.
     */
    _initValueObserver() {
        this._valueObserver = new MutationObserver(ml => {
            ml.some(mutation => {
                const newValue = mutation.target[mutation.attributeName];
                if (mutation.type === 'attributes' && mutation.attributeName === "value" && newValue !== mutation.oldValue) {
                    this._handleValueChange(newValue);
                    return true;
                }
            });
        });
        this._valueObserver.observe(this.el, { attributes: true, attributeOldValue: true });
    }
    static get is() { return "store-manager"; }
    static get properties() {
        return {
            "value": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Contains source json as a string"
                },
                "attribute": "value",
                "reflect": true,
                "defaultValue": "\"\""
            },
            "templates": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "any[]",
                    "resolved": "any[]",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Templates for the current solution"
                },
                "defaultValue": "[]"
            },
            "authentication": {
                "type": "unknown",
                "mutable": true,
                "complexType": {
                    "original": "UserSession",
                    "resolved": "UserSession",
                    "references": {
                        "UserSession": {
                            "location": "import",
                            "path": "@esri/solution-common",
                            "id": "node_modules::UserSession"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Credentials for requests"
                }
            }
        };
    }
    static get events() {
        return [{
                "method": "stateLoaded",
                "name": "stateLoaded",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "getStoreInfo": {
                "complexType": {
                    "signature": "(propName: string) => Promise<any>",
                    "parameters": [{
                            "name": "propName",
                            "type": "string",
                            "docs": "Name of the property to return"
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<any>"
                },
                "docs": {
                    "text": "Returns the store info for the supplied property name.",
                    "tags": [{
                            "name": "param",
                            "text": "propName Name of the property to return"
                        }]
                }
            }
        };
    }
    static get elementRef() { return "el"; }
}
