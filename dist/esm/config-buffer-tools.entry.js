/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './index-c246d90e.js';
import { g as getLocaleComponentStrings } from './locale-b76dc371.js';
import './_commonjsHelpers-8fd39c50.js';

const configBufferToolsCss = ":host{display:block}.horizontal-display{display:flex}.label-spacing{--calcite-label-margin-bottom:0}.padding-inline-end-1{-webkit-padding-end:1rem;padding-inline-end:1rem}.padding-inline-start-1{-webkit-padding-start:1rem;padding-inline-start:1rem}.padding-block-end-1{-webkit-padding-after:1rem;padding-block-end:1rem}.width-half{width:50%}.width-full{width:100%}";

const ConfigBufferTools = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.distance = 100;
    this.unit = "Meters";
    this._showBufferChecked = true;
    this._translations = undefined;
  }
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
   * Returns a key/value pair that represents the checkbox value and checked state
   *
   * @returns Promise with the state of the checkboxes
   */
  async getConfigInfo() {
    return {
      "distance": this.distance,
      "unit": this.unit
    };
  }
  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------
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
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", null, h("calcite-label", { layout: "inline" }, h("calcite-checkbox", { checked: this._showBufferChecked, onCalciteCheckboxChange: () => this._setShowBufferChecked(), ref: (el) => { this._showBufferElement = el; } }), this._translations.showSearchDistance)), h("div", { class: "padding-inline-start-1" }, h("div", { class: "padding-block-end-1 width-full" }, h("calcite-label", { class: "label-spacing" }, this._translations.defaultBufferDistance, h("calcite-input", { disabled: !this._showBufferChecked, min: 0, "number-button-type": "vertical", onCalciteInputInput: (evt) => { this._distanceChanged(evt); }, type: "number", value: this.distance.toString() }))), h("div", { class: "width-full" }, h("calcite-label", { class: "label-spacing" }, this._translations.defaultUnit, h("calcite-select", { disabled: !this._showBufferChecked, label: this._translations.defaultUnit, onCalciteSelectChange: (evt) => { this._unitSelectionChange(evt); } }, this._renderUnitOptions()))))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Store the user defined distance
   *
   * @protected
   */
  _distanceChanged(evt) {
    this.distance = evt.detail.value;
  }
  /**
   * Store the user defined unit
   *
   * @protected
   */
  _unitSelectionChange(evt) {
    this.unit = evt.target.value;
  }
  /**
   * Render the various unit options
   *
   * @returns Promise when complete
   * @protected
   */
  _renderUnitOptions() {
    const nlsUnits = this._translations.units || {};
    const units = Object.keys(nlsUnits).map(k => nlsUnits[k]);
    return units.map(unit => {
      return (h("calcite-option", { label: unit, selected: unit === this.unit, value: unit }));
    });
  }
  /**
   * When not checked the buffer options will be disabled in the config and not visible in the UI at runtime
   *
   * @protected
   */
  _setShowBufferChecked() {
    this._showBufferChecked = this._showBufferElement.checked;
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
  get el() { return getElement(this); }
};
ConfigBufferTools.style = configBufferToolsCss;

export { ConfigBufferTools as config_buffer_tools };
