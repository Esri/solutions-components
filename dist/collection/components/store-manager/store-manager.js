export class StoreManager {
  constructor() {
    this.value = "";
    this.templates = [];
    this.authentication = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this._initValueObserver();
  }
  /**
   * Renders the component.
   */
  render() {
    return (null);
  }
  /**
   * Initialize the observer that will monitor and respond to changes in the value.
   * When we get a new value we are dealinmg with a new solution and need to fetch the items data and load the state.
   */
  _initValueObserver() {
    //const self = this;
    this._valueObserver = new MutationObserver(ml => {
      ml.some(mutation => {
        const newValue = mutation.target[mutation.attributeName];
        if (mutation.type === 'attributes' && mutation.attributeName === "value" &&
          newValue !== mutation.oldValue && newValue !== "") {
          /*
          const v = JSON.parse(newValue);
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          getItemDataAsJson(v, self.authentication).then(data => {
            state.models = getModels(Array.isArray(v) ? v : [v], self.authentication, v);
            state.featureServices = getFeatureServices(Array.isArray(v) ? v : [v])
            state.get("spatialReferenceInfo") = getSpatialReferenceInfo(state.featureServices, data);
            self.templates = v;
            self.stateLoaded.emit(state);
          });
          */
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
              "path": "@esri/solution-common"
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
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=store-manager.js.map
