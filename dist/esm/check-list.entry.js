/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './index-09deaa39.js';

const checkListCss = ":host{display:block}";

const CheckList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    //--------------------------------------------------------------------------
    //
    //  State (internal)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * A list of all checkbox elements for this component
     *
     * @protected
     */
    this._elements = [];
    this.defaultChecked = true;
    this.values = undefined;
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
    return this._elements.reduce((prev, cur) => {
      prev[cur.value] = cur.checked;
      return prev;
    }, {});
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
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad() {
    if (this.defaultChecked) {
      this._elements.forEach(el => {
        el.checked = true;
      });
    }
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", null, this._renderCheckboxes(this.values))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Render a checkbox with a label for each of the types listed in the NLS
   *
   * @returns Array of label/checkbox input nodes
   * @protected
   */
  _renderCheckboxes(values) {
    return values.map(v => {
      return (h("calcite-label", { layout: "inline" }, h("calcite-checkbox", { ref: (el) => this._elements.push(el), value: v }), v));
    });
  }
  get el() { return getElement(this); }
};
CheckList.style = checkListCss;

export { CheckList as check_list };

//# sourceMappingURL=check-list.entry.js.map