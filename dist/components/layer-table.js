/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { g as goToSelection, a as getMapLayerView, d as defineCustomElement$2 } from './map-layer-picker2.js';
import { q as queryAllFeatures } from './queryUtils.js';
import { d as downloadCSV } from './downloadUtils.js';
import { d as defineCustomElement$l } from './button.js';
import { d as defineCustomElement$k } from './checkbox.js';
import { d as defineCustomElement$j } from './chip.js';
import { d as defineCustomElement$i } from './combobox.js';
import { d as defineCustomElement$h } from './combobox-item.js';
import { d as defineCustomElement$g } from './dropdown.js';
import { d as defineCustomElement$f } from './dropdown-group.js';
import { d as defineCustomElement$e } from './dropdown-item.js';
import { d as defineCustomElement$d } from './icon.js';
import { d as defineCustomElement$c } from './input.js';
import { d as defineCustomElement$b } from './label.js';
import { d as defineCustomElement$a } from './loader.js';
import { d as defineCustomElement$9 } from './modal.js';
import { d as defineCustomElement$8 } from './option.js';
import { d as defineCustomElement$7 } from './progress.js';
import { d as defineCustomElement$6 } from './scrim.js';
import { d as defineCustomElement$5 } from './select.js';
import { d as defineCustomElement$4 } from './split-button.js';
import { d as defineCustomElement$3 } from './edit-record-modal2.js';

const layerTableCss = ":host{display:block}.table{display:table;width:100%}.header{display:table-header-group;background-color:#757575;font-weight:500;font-size:var(--calcite-font-size-0);color:var(--calcite-ui-text-inverse);position:sticky;top:0;z-index:1}.table-header-cell{display:table-cell;text-align:justify;border-right:1px solid var(--calcite-ui-border-2);padding:0.5rem}.table-body{display:table-row-group}.row{display:table-row}.table-cell{display:table-cell;padding:0.5rem}.display-table-header{display:table-header-group}.display-flex{display:flex}.table-border{border:1px solid var(--calcite-ui-border-2)}.justify-center{justify-content:center}.table-container{width:100%}.overflow-auto{overflow:auto}.data-container{overflow:auto;height:calc(100% - 35px)}.row:nth-child(odd){background:var(--calcite-ui-foreground-3)}.padding-3-4{padding:0.75rem}.field-width{white-space:nowrap;min-width:300px;max-width:300px;overflow:hidden}";

const LayerTable$1 = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    /**
     * esri/Graphic[]: https://developers.arcgis.com/javascript/latest/api-reference/esri-Graphic.html
     */
    this._graphics = [];
    /**
     * string[]: List of field names to display
     */
    this._fieldNames = [];
    this.mapView = undefined;
    this._translations = undefined;
    this._selectedIndexes = [];
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
    return (h(Host, null, this._getTableControlRow(), h("div", { class: "data-container" }, h("div", { class: "table-container" }, h("div", { class: "table" }, this._getTableHeader(), this._getTableRows()))), h("edit-record-modal", { ref: (el) => this._editMultipleMpdal = el })));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Gets a row of controls that can be used for various interactions with the table
   *
   * @returns The dom node that contains the controls
   */
  _getTableControlRow() {
    const featuresSelected = this._selectedIndexes.length > 0;
    const multiFeaturesSelected = this._selectedIndexes.length > 1;
    return (h("div", { class: "display-flex table-border" }, h("map-layer-picker", { mapView: this.mapView, onLayerSelectionChange: (evt) => this._layerSelectionChanged(evt) }), h("div", null, h("calcite-button", { appearance: 'transparent', color: 'neutral', disabled: !featuresSelected, iconStart: 'magnifying-glass', onClick: () => this._zoom() }, this._translations.zoom), h("calcite-button", { appearance: 'transparent', color: 'neutral', disabled: !multiFeaturesSelected, iconStart: 'pencil', onClick: () => this._editMultiple() }, this._translations.editMultiple), h("calcite-button", { appearance: 'transparent', color: 'neutral', disabled: !featuresSelected, iconStart: 'trash', onClick: () => this._delete() }, this._translations.delete), h("calcite-split-button", { appearance: "transparent", color: "neutral", "primary-text": this._translations.more }, h("calcite-dropdown-group", { "selection-mode": "none" }, h("calcite-dropdown-item", { iconStart: 'list-check-all', onClick: () => this._selectAll(true) }, this._translations.selectAll), h("calcite-dropdown-item", { iconStart: 'selected-items-filter', onClick: () => this._showSelected() }, this._translations.showSelected), h("calcite-dropdown-item", { iconStart: 'erase', onClick: () => this._clearSelection() }, this._translations.clearSelection), h("calcite-dropdown-item", { iconStart: 'refresh', onClick: () => this._switchSelected() }, this._translations.switchSelected), h("calcite-dropdown-item", { iconStart: 'export', onClick: () => this._exportToCSV() }, this._translations.exportCSV))))));
  }
  /**
   * Gets the table header with a select all control and column headers for each field
   *
   * @returns The dom node that contains the header
   */
  _getTableHeader() {
    return (h("div", { class: "header" }, h("div", { class: "table-header-cell padding-3-4" }, h("calcite-checkbox", { class: "display-flex justify-center", onClick: () => this._selectAll(this._selectAllElement.checked), ref: (el) => this._selectAllElement = el })), this._fieldNames.map(name => this._getTableHeaderCell(name))));
  }
  /**
   * Gets a header cell for the table header
   *
   * @param name the string to display in the cell
   *
   * @returns The dom node that contains the header cell
   */
  _getTableHeaderCell(name) {
    return (h("div", { class: "table-header-cell field-width" }, name));
  }
  /**
   * Gets the table rows for all features
   *
   * @returns The dom node that contains the body of the table
   */
  _getTableRows() {
    return (h("div", { class: "table-body" }, this._graphics.map((g, i) => this._getTableRow(g, i))));
  }
  /**
   * Gets the individual table row for a feature
   *
   * @param g the graphic the row is based on
   * @param index the index location of the row within the table
   *
   * @returns The dom node that contains the row
   */
  _getTableRow(g, index) {
    // TODO think through this more...should build the fieldType info once up front rather
    // than on every single value...
    const checked = this._selectedIndexes.indexOf(index) > -1;
    return (h("div", { class: "row" }, h("div", { class: "table-cell table-border padding-3-4" }, h("calcite-checkbox", { checked: checked, class: "display-flex justify-center", onClick: () => this._rowSelected(index), value: index })), this._fieldNames.map(name => {
      const field = this._layerView.layer.fieldsIndex.get(name);
      return this._getTableRowCell(g.attributes[name], field, checked);
    })));
  }
  /**
   * Gets the individual table cell for the provided field
   *
   * @param v the value to display
   * @param field the field the row is based on
   * @param rowSelected when true editable fields will render a control that will allow the value to be updated
   *
   * @returns The dom node that contains the table cell
   */
  _getTableRowCell(v, field, rowSelected) {
    const editable = field.editable && rowSelected;
    const inputType = this._getInputType(field.type);
    // TODO find some domain data to test with..this has not been tested
    let domainInput;
    const domain = field.domain;
    if (domain) {
      if (domain.type === "coded-value") {
        domainInput = (h("calcite-select", { label: '' }, domain.codedValues.map(cv => {
          return (h("calcite-option", { label: cv.name, selected: v === cv.code.toString(), value: cv.code }));
        })));
      }
      else {
        // range domain
        const range = domain;
        domainInput = (h("calcite-input", { max: range.maxValue, min: range.minValue, type: "number", value: v }));
      }
    }
    return (h("div", { class: "table-cell table-border field-width" }, editable && domainInput ? domainInput : editable ? (h("calcite-input", { type: inputType, value: v })) : v));
  }
  /**
   * Simple lookup that will get the appropriate edit control for the value type
   *
   * @param type the Esri field type
   *
   * @returns A string for the type of control to create based on the provided field type
   */
  _getInputType(type) {
    // JS API field types
    // "string" | "small-integer" | "integer" | "single" | "double" | "long" | "date" | "oid" | "geometry" | "blob" | "raster" | "guid" | "global-id" | "xml"
    // not sure about these: "geometry" | "blob" | "raster" |  | "xml"
    // Calcite input types
    // color date datetime-local email file image month number password search tel text(default) textarea time url week
    const inputTypes = {
      "string": 'text',
      "small-integer": "number",
      "integer": "number",
      "single": "number",
      "double": "number",
      "long": "number",
      "date": "datetime-local",
      "oid": "number",
      "guid": "text",
      "global-id": "text"
    };
    return Object.keys(inputTypes).indexOf(type) > -1 ? inputTypes[type] : "text";
  }
  /**
   * Select or deselect all rows
   *
   * @param checked When true all rows will be selected
   *
   * @returns void
   */
  _selectAll(checked) {
    this._selectedIndexes = checked ? this._graphics.map((_g, i) => i) : [];
  }
  // need to discuss with team
  _showSelected() {
    console.log("_showSelected");
  }
  /**
   * Clears the selected indexes
   *
   * @returns void
   */
  _clearSelection() {
    this._selectedIndexes = [];
  }
  /**
   * Select all rows that are not currently selectd
   *
   * @returns void
   */
  _switchSelected() {
    const currentIndexes = [...this._selectedIndexes];
    this._selectedIndexes = this._graphics.reduce((prev, _cur, i) => {
      if (currentIndexes.indexOf(i) < 0) {
        prev.push(i);
      }
      return prev;
    }, []);
  }
  /**
   * Export all selected rows as CSV
   *
   * @returns a promise that will resolve when the operation is complete
   */
  async _exportToCSV() {
    return downloadCSV([], this._layerView.layer, this._getSelectedIds(), false, // formatUsingLayerPopup
    false, // removeDuplicates
    true);
  }
  /**
   * Zoom to all selected features
   *
   * @returns a promise that will resolve when the operation is complete
   */
  _zoom() {
    const ids = this._getSelectedIds();
    void goToSelection(ids, this._layerView, this.mapView, true);
  }
  /**
   * Open the edit multiple modal
   *
   * @returns void
   */
  _editMultiple() {
    this._editMultipleMpdal.open = true;
  }
  /**
   * Delete all selected records
   *
   * @returns a promise that will resolve when the operation is complete
   */
  _delete() {
    console.log("delete");
  }
  /**
   * Get the graphics for all selected indexes
   *
   * @param indexes the indexes for the graphics to fetch
   *
   * @returns An array of selected graphics
   */
  _getGraphics(indexes) {
    return this._graphics.filter((_g, i) => indexes.indexOf(i) > -1);
  }
  /**
   * Gets the object ids for all selected rows
   *
   * @returns An array of object ids
   */
  _getSelectedIds() {
    const graphics = this._getGraphics(this._selectedIndexes);
    return graphics.map(g => g.getObjectId());
  }
  /**
   * Update the selected indexes based on the current row
   *
   * @param index the index of the selected row
   *
   * @returns void
   */
  _rowSelected(index) {
    const indexOfSelected = this._selectedIndexes.indexOf(index);
    if (indexOfSelected > -1) {
      this._selectedIndexes.splice(indexOfSelected, 1);
      this._selectedIndexes = [...this._selectedIndexes];
    }
    else {
      this._selectedIndexes = [...this._selectedIndexes, index];
    }
  }
  /**
   * Handles layer selection change to show new table
   *
   * @returns a promise that will resolve when the operation is complete
   */
  async _layerSelectionChanged(evt) {
    const layerName = evt.detail[0];
    this._layerView = await getMapLayerView(this.mapView, layerName);
    // TODO rethink this...when we use later we need to be able to lookup with name
    this._fieldNames = this._layerView.layer.fields.map(f => f.alias || f.name);
    this._graphics = await queryAllFeatures(0, this._layerView.layer, []);
    this._selectedIndexes = [];
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
  get el() { return this; }
  static get style() { return layerTableCss; }
}, [1, "layer-table", {
    "mapView": [16],
    "_translations": [32],
    "_selectedIndexes": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["layer-table", "calcite-button", "calcite-checkbox", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-dropdown", "calcite-dropdown-group", "calcite-dropdown-item", "calcite-icon", "calcite-input", "calcite-label", "calcite-loader", "calcite-modal", "calcite-option", "calcite-progress", "calcite-scrim", "calcite-select", "calcite-split-button", "edit-record-modal", "map-layer-picker"];
  components.forEach(tagName => { switch (tagName) {
    case "layer-table":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, LayerTable$1);
      }
      break;
    case "calcite-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "calcite-checkbox":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "calcite-chip":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "calcite-combobox":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "calcite-combobox-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "calcite-dropdown":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "calcite-dropdown-group":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "calcite-dropdown-item":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "calcite-input":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "calcite-label":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "calcite-loader":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "calcite-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "calcite-option":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "calcite-progress":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "calcite-scrim":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "calcite-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "calcite-split-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "edit-record-modal":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "map-layer-picker":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}
defineCustomElement$1();

const LayerTable = LayerTable$1;
const defineCustomElement = defineCustomElement$1;

export { LayerTable, defineCustomElement };