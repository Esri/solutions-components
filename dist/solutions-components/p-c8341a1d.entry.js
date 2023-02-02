/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, F as Fragment, g as getElement } from './p-c2f00d41.js';
import { f as focusElement } from './p-83166522.js';
import { u as updateHostInteraction } from './p-7daea1df.js';
import { f as filter } from './p-d48a24e6.js';
import { d as debounce } from './p-4e32bf8c.js';
import './p-729708a3.js';
import './p-a80b3880.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  container: "container",
  searchIcon: "search-icon"
};
const TEXT = {
  filterLabel: "Filter",
  clear: "Clear filter"
};
const ICONS = {
  search: "search",
  close: "x"
};
const DEBOUNCE_TIMEOUT = 250;

const filterCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:flex;inline-size:100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.container{display:flex;inline-size:100%;padding:0.5rem}label{position:relative;margin-inline:0.25rem;margin-block:0px;display:flex;inline-size:100%;align-items:center;overflow:hidden}input[type=text]{-webkit-margin-after:0.25rem;margin-block-end:0.25rem;inline-size:100%;border-style:none;background-color:transparent;padding-block:0.25rem;font-family:inherit;font-size:var(--calcite-font-size--2);line-height:1rem;color:var(--calcite-ui-text-1);-webkit-padding-end:0.25rem;padding-inline-end:0.25rem;-webkit-padding-start:1.5rem;padding-inline-start:1.5rem;transition:padding var(--calcite-animation-timing), box-shadow var(--calcite-animation-timing)}input[type=text]::-ms-clear{display:none}calcite-input{inline-size:100%}.search-icon{position:absolute;display:flex;color:var(--calcite-ui-text-2);inset-inline-start:0;transition:inset-inline-start var(--calcite-animation-timing), inset-inline-end var(--calcite-animation-timing), opacity var(--calcite-animation-timing)}input[type=text]:focus{border-color:var(--calcite-ui-brand);outline:2px solid transparent;outline-offset:2px;padding-inline:0.25rem}input[type=text]:focus~.search-icon{inset-inline-start:calc(1rem * -1);opacity:0}.clear-button{display:flex;cursor:pointer;align-items:center;border-width:0px;background-color:transparent;color:var(--calcite-ui-text-2)}.clear-button:hover,.clear-button:focus{color:var(--calcite-ui-text-1)}";

const Filter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteFilterChange = createEvent(this, "calciteFilterChange", 6);
    // --------------------------------------------------------------------------
    //
    //  Properties
    //
    // --------------------------------------------------------------------------
    /**
     * The items to filter through. The filter uses this as the starting point, and returns items
     * that contain the string entered in the input, using a partial match and recursive search.
     *
     * This property is required.
     */
    this.items = [];
    /**
     * When true, disabled prevents interaction. This state shows items with lower opacity/grayed.
     */
    this.disabled = false;
    /**
     * The resulting items after filtering.
     *
     * @readonly
     */
    this.filteredItems = [];
    /** specify the scale of filter, defaults to m */
    this.scale = "m";
    /**
     * Filter value.
     */
    this.value = "";
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.filter = debounce((value, emit = false) => this.updateFiltered(filter(this.items, value), emit), DEBOUNCE_TIMEOUT);
    this.inputHandler = (event) => {
      const target = event.target;
      this.value = target.value;
      this.filter(target.value, true);
    };
    this.keyDownHandler = (event) => {
      if (event.key === "Escape") {
        this.clear();
        event.preventDefault();
      }
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };
    this.clear = () => {
      this.value = "";
      this.filter("", true);
      this.setFocus();
    };
  }
  watchItemsHandler() {
    this.filter(this.value);
  }
  valueHandler(value) {
    this.filter(value);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentDidRender() {
    updateHostInteraction(this);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  componentWillLoad() {
    this.filter(this.value);
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    focusElement(this.textInput);
  }
  updateFiltered(filtered, emit = false) {
    this.filteredItems.length = 0;
    this.filteredItems = this.filteredItems.concat(filtered);
    if (emit) {
      this.calciteFilterChange.emit();
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { disabled, scale } = this;
    return (h(Fragment, null, h("div", { class: CSS.container }, h("label", null, h("calcite-input", { "aria-label": this.intlLabel || TEXT.filterLabel, clearable: true, disabled: disabled, icon: ICONS.search, intlClear: this.intlClear || TEXT.clear, onCalciteInputInput: this.inputHandler, onKeyDown: this.keyDownHandler, placeholder: this.placeholder, ref: (el) => {
        this.textInput = el;
      }, scale: scale, type: "text", value: this.value })))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "items": ["watchItemsHandler"],
    "value": ["valueHandler"]
  }; }
};
Filter.style = filterCss;

export { Filter as calcite_filter };

//# sourceMappingURL=p-c8341a1d.entry.js.map