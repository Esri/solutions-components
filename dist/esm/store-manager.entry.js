/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, g as getElement } from './index-09deaa39.js';

const StoreManager = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.stateLoaded = createEvent(this, "stateLoaded", 7);
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
  get el() { return getElement(this); }
};

export { StoreManager as store_manager };
