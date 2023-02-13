/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c6979cbb.js');
const locale = require('./locale-04da9a8c.js');
const mapViewUtils = require('./mapViewUtils-d250b1ed.js');
const downloadUtils = require('./downloadUtils-ae182e3a.js');
require('./_commonjsHelpers-384729db.js');
require('./interfaces-17c631bf.js');
require('./loadModules-0806a34f.js');

const layerTableCss = ":host{display:block}.table{display:table;width:100%}.header{display:table-header-group;background-color:#757575;font-weight:500;font-size:var(--calcite-font-size-0);color:var(--calcite-ui-text-inverse);position:sticky;top:0;z-index:1}.table-header-cell{display:table-cell;text-align:justify;border-right:1px solid var(--calcite-ui-border-2);padding:0.5rem}.table-body{display:table-row-group}.row{display:table-row}.table-cell{display:table-cell;padding:0.5rem}.display-table-header{display:table-header-group}.display-flex{display:flex}.table-border{border:1px solid var(--calcite-ui-border-2)}.justify-center{justify-content:center}.table-container{width:100%}.overflow-auto{overflow:auto}.data-container{overflow:auto;height:calc(100% - 35px)}.row:nth-child(odd){background:var(--calcite-ui-foreground-3)}.padding-3-4{padding:0.75rem}.field-width{white-space:nowrap;min-width:300px;max-width:300px;overflow:hidden}";

const LayerTable = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    return (index.h(index.Host, null, this._getTableControlRow(), index.h("div", { class: "data-container" }, index.h("div", { class: "table-container" }, index.h("div", { class: "table" }, this._getTableHeader(), this._getTableRows()))), index.h("edit-record-modal", { ref: (el) => this._editMultipleMpdal = el })));
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
    return (index.h("div", { class: "display-flex table-border" }, index.h("map-layer-picker", { mapView: this.mapView, onLayerSelectionChange: (evt) => this._layerSelectionChanged(evt) }), index.h("div", null, index.h("calcite-button", { appearance: 'transparent', color: 'neutral', disabled: !featuresSelected, iconStart: 'magnifying-glass', onClick: () => this._zoom() }, this._translations.zoom), index.h("calcite-button", { appearance: 'transparent', color: 'neutral', disabled: !multiFeaturesSelected, iconStart: 'pencil', onClick: () => this._editMultiple() }, this._translations.editMultiple), index.h("calcite-button", { appearance: 'transparent', color: 'neutral', disabled: !featuresSelected, iconStart: 'trash', onClick: () => this._delete() }, this._translations.delete), index.h("calcite-split-button", { appearance: "transparent", color: "neutral", "primary-text": this._translations.more }, index.h("calcite-dropdown-group", { "selection-mode": "none" }, index.h("calcite-dropdown-item", { iconStart: 'list-check-all', onClick: () => this._selectAll(true) }, this._translations.selectAll), index.h("calcite-dropdown-item", { iconStart: 'selected-items-filter', onClick: () => this._showSelected() }, this._translations.showSelected), index.h("calcite-dropdown-item", { iconStart: 'erase', onClick: () => this._clearSelection() }, this._translations.clearSelection), index.h("calcite-dropdown-item", { iconStart: 'refresh', onClick: () => this._switchSelected() }, this._translations.switchSelected), index.h("calcite-dropdown-item", { iconStart: 'export', onClick: () => this._exportToCSV() }, this._translations.exportCSV))))));
  }
  /**
   * Gets the table header with a select all control and column headers for each field
   *
   * @returns The dom node that contains the header
   */
  _getTableHeader() {
    return (index.h("div", { class: "header" }, index.h("div", { class: "table-header-cell padding-3-4" }, index.h("calcite-checkbox", { class: "display-flex justify-center", onClick: () => this._selectAll(this._selectAllElement.checked), ref: (el) => this._selectAllElement = el })), this._fieldNames.map(name => this._getTableHeaderCell(name))));
  }
  /**
   * Gets a header cell for the table header
   *
   * @param name the string to display in the cell
   *
   * @returns The dom node that contains the header cell
   */
  _getTableHeaderCell(name) {
    return (index.h("div", { class: "table-header-cell field-width" }, name));
  }
  /**
   * Gets the table rows for all features
   *
   * @returns The dom node that contains the body of the table
   */
  _getTableRows() {
    return (index.h("div", { class: "table-body" }, this._graphics.map((g, i) => this._getTableRow(g, i))));
  }
  /**
   * Gets the individual table row for a feature
   *
   * @param g the graphic the row is based on
   * @param index the index location of the row within the table
   *
   * @returns The dom node that contains the row
   */
  _getTableRow(g, index$1) {
    // TODO think through this more...should build the fieldType info once up front rather
    // than on every single value...
    const checked = this._selectedIndexes.indexOf(index$1) > -1;
    return (index.h("div", { class: "row" }, index.h("div", { class: "table-cell table-border padding-3-4" }, index.h("calcite-checkbox", { checked: checked, class: "display-flex justify-center", onClick: () => this._rowSelected(index$1), value: index$1 })), this._fieldNames.map(name => {
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
        domainInput = (index.h("calcite-select", { label: '' }, domain.codedValues.map(cv => {
          return (index.h("calcite-option", { label: cv.name, selected: v === cv.code.toString(), value: cv.code }));
        })));
      }
      else {
        // range domain
        const range = domain;
        domainInput = (index.h("calcite-input", { max: range.maxValue, min: range.minValue, type: "number", value: v }));
      }
    }
    return (index.h("div", { class: "table-cell table-border field-width" }, editable && domainInput ? domainInput : editable ? (index.h("calcite-input", { type: inputType, value: v })) : v));
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
    return downloadUtils.downloadCSV([], this._layerView.layer, this._getSelectedIds(), false, // formatUsingLayerPopup
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
    void mapViewUtils.goToSelection(ids, this._layerView, this.mapView, true);
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
    this._layerView = await mapViewUtils.getMapLayerView(this.mapView, layerName);
    // TODO rethink this...when we use later we need to be able to lookup with name
    this._fieldNames = this._layerView.layer.fields.map(f => f.alias || f.name);
    this._graphics = await mapViewUtils.queryAllFeatures(0, this._layerView.layer, []);
    this._selectedIndexes = [];
  }
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  async _getTranslations() {
    const messages = await locale.getLocaleComponentStrings(this.el);
    this._translations = messages[0];
  }
  get el() { return index.getElement(this); }
};
LayerTable.style = layerTableCss;

exports.layer_table = LayerTable;
