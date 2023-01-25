/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement, c as createEvent } from './index-09deaa39.js';
import { s as setRequestedIcon, g as getElementProp, a as getSlotted } from './dom-3bdc69ee.js';
import { S as StatusIcons } from './interfaces-4ae145eb.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-e96b0a4f.js';
import { l as loadModules } from './loadModules-06bbc523.js';
import { a as goToSelection, h as highlightFeatures, e as queryObjectIds, f as getQueryGeoms, q as queryFeaturesByID } from './mapViewUtils-ad2b505b.js';
import { E as EWorkflowType, f as ESelectionMode, g as ERefineMode, c as ESketchType } from './interfaces-3b23a5f9.js';
import { s as state } from './publicNotificationStore-3e762eea.js';
import { g as getLocaleComponentStrings } from './locale-a5a0b545.js';
import { p as pdfUtils } from './labelFormats-0a0f314c.js';
import { e as exportCSV } from './csvUtils-e4f5f335.js';
import { a as getSelectionIds, g as getTotal } from './publicNotificationUtils-5cb5a607.js';
import './resources-436ae282.js';
import './guid-15fce7c0.js';
import './observers-31601001.js';
import './index-e496ff06.js';
import './_commonjsHelpers-8fd39c50.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
var StatusIconDefaults;
(function (StatusIconDefaults) {
  StatusIconDefaults["valid"] = "check-circle";
  StatusIconDefaults["invalid"] = "exclamation-mark-triangle";
  StatusIconDefaults["idle"] = "information";
})(StatusIconDefaults || (StatusIconDefaults = {}));

const inputMessageCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([active][scale=m]),:host([active][scale=l]){--calcite-input-message-spacing-value:0.25rem}:host{visibility:hidden;box-sizing:border-box;display:flex;block-size:0px;inline-size:100%;align-items:center;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1);opacity:0;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}:host([active]){visibility:visible;block-size:auto;opacity:1;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}:host([active][scale=m]),:host([active][scale=l]){-webkit-margin-before:var(--calcite-input-message-spacing-value);margin-block-start:var(--calcite-input-message-spacing-value)}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}.calcite-input-message-icon{pointer-events:none;display:inline-flex;flex-shrink:0;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;-webkit-margin-end:0.5rem;margin-inline-end:0.5rem}:host([status=invalid]) .calcite-input-message-icon{color:var(--calcite-ui-danger)}:host([status=warning]) .calcite-input-message-icon{color:var(--calcite-ui-warning)}:host([status=valid]) .calcite-input-message-icon{color:var(--calcite-ui-success)}:host([status=idle]) .calcite-input-message-icon{color:var(--calcite-ui-brand)}:host([status][active]){color:var(--calcite-ui-text-1)}:host([status][scale=s]){font-size:var(--calcite-font-size--3);line-height:0.75rem}:host([status][scale=m]){-webkit-margin-before:0.25rem;margin-block-start:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([status][scale=l]){-webkit-margin-before:0.25rem;margin-block-start:0.25rem;font-size:var(--calcite-font-size--1);line-height:1rem}";

const InputMessage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** When `true`, the component is active. */
    this.active = false;
    /** Specifies the size of the component. */
    this.scale = "m";
    /** Specifies the status of the input field, which determines message and icons. */
    this.status = "idle";
  }
  handleIconEl() {
    this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.status = getElementProp(this.el, "status", this.status);
    this.scale = getElementProp(this.el, "scale", this.scale);
    this.requestedIcon = setRequestedIcon(StatusIconDefaults, this.icon, this.status);
  }
  render() {
    const hidden = !this.active;
    return (h(Host, { "calcite-hydrated-hidden": hidden }, this.renderIcon(this.requestedIcon), h("slot", null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  renderIcon(iconName) {
    if (iconName) {
      return h("calcite-icon", { class: "calcite-input-message-icon", icon: iconName, scale: "s" });
    }
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "status": ["handleIconEl"],
    "icon": ["handleIconEl"]
  }; }
};
InputMessage.style = inputMessageCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const TEXT = {
  close: "Close"
};
const SLOTS = {
  title: "title",
  message: "message",
  link: "link",
  actionsEnd: "actions-end"
};
const CSS = {
  actionsEnd: "actions-end",
  close: "notice-close",
  container: "container",
  content: "notice-content",
  icon: "notice-icon"
};

const noticeCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([scale=s]){--calcite-notice-spacing-token-small:0.5rem;--calcite-notice-spacing-token-large:0.75rem}:host([scale=s]) .container slot[name=title]::slotted(*),:host([scale=s]) .container *::slotted([slot=title]){margin-block:0.125rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=s]) .container slot[name=message]::slotted(*),:host([scale=s]) .container *::slotted([slot=message]){margin-block:0.125rem;font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) ::slotted(calcite-link){margin-block:0.125rem;font-size:var(--calcite-font-size--2);line-height:1.375}:host([scale=s]) .notice-close{padding:0.5rem}:host([scale=m]){--calcite-notice-spacing-token-small:0.75rem;--calcite-notice-spacing-token-large:1rem}:host([scale=m]) .container slot[name=title]::slotted(*),:host([scale=m]) .container *::slotted([slot=title]){margin-block:0.125rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=m]) .container slot[name=message]::slotted(*),:host([scale=m]) .container *::slotted([slot=message]){margin-block:0.125rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=m]) ::slotted(calcite-link){margin-block:0.125rem;font-size:var(--calcite-font-size--1);line-height:1.375}:host([scale=l]){--calcite-notice-spacing-token-small:1rem;--calcite-notice-spacing-token-large:1.25rem}:host([scale=l]) .container slot[name=title]::slotted(*),:host([scale=l]) .container *::slotted([slot=title]){margin-block:0.125rem;font-size:var(--calcite-font-size-1);line-height:1.375}:host([scale=l]) .container slot[name=message]::slotted(*),:host([scale=l]) .container *::slotted([slot=message]){margin-block:0.125rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([scale=l]) ::slotted(calcite-link){margin-block:0.125rem;font-size:var(--calcite-font-size-0);line-height:1.375}:host([width=auto]){--calcite-notice-width:auto}:host([width=half]){--calcite-notice-width:50%}:host([width=full]){--calcite-notice-width:100%}:host{margin-inline:auto;display:none;max-inline-size:100%;align-items:center;inline-size:var(--calcite-notice-width)}.container{pointer-events:none;margin-block:0px;box-sizing:border-box;display:none;inline-size:100%;background-color:var(--calcite-ui-foreground-1);opacity:0;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;max-block-size:0;text-align:start;-webkit-border-start:0px solid;border-inline-start:0px solid;box-shadow:0 0 0 0 transparent}.notice-close{outline-color:transparent}.notice-close:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}:host{display:flex}:host([open]) .container{pointer-events:auto;display:flex;max-block-size:100%;align-items:center;border-width:2px;opacity:1;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.container slot[name=title]::slotted(*),.container *::slotted([slot=title]){margin:0px;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1)}.container slot[name=message]::slotted(*),.container *::slotted([slot=message]){margin:0px;display:inline;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-2);-webkit-margin-end:var(--calcite-notice-spacing-token-small);margin-inline-end:var(--calcite-notice-spacing-token-small)}.notice-content{box-sizing:border-box;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto;display:flex;min-inline-size:0px;flex-direction:column;overflow-wrap:break-word;flex:1 1 0;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:0 var(--calcite-notice-spacing-token-small)}.notice-content:first-of-type:not(:only-child){-webkit-padding-start:var(--calcite-notice-spacing-token-large);padding-inline-start:var(--calcite-notice-spacing-token-large)}.notice-content:only-of-type{padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large)}.notice-icon{display:flex;align-items:center;box-sizing:border-box;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto}.notice-close{display:flex;cursor:pointer;align-items:center;align-self:stretch;border-style:none;background-color:transparent;color:var(--calcite-ui-text-3);outline:2px solid transparent;outline-offset:2px;box-sizing:border-box;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;padding-block:var(--calcite-notice-spacing-token-small);padding-inline:var(--calcite-notice-spacing-token-large);flex:0 0 auto;-webkit-appearance:none}.notice-close:hover,.notice-close:focus{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-text-1)}.notice-close:active{background-color:var(--calcite-ui-foreground-3)}.actions-end{display:flex;align-self:stretch}:host([color=blue]) .container{border-color:var(--calcite-ui-brand)}:host([color=blue]) .container .notice-icon{color:var(--calcite-ui-brand)}:host([color=red]) .container{border-color:var(--calcite-ui-danger)}:host([color=red]) .container .notice-icon{color:var(--calcite-ui-danger)}:host([color=yellow]) .container{border-color:var(--calcite-ui-warning)}:host([color=yellow]) .container .notice-icon{color:var(--calcite-ui-warning)}:host([color=green]) .container{border-color:var(--calcite-ui-success)}:host([color=green]) .container .notice-icon{color:var(--calcite-ui-success)}";

const Notice = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteNoticeClose = createEvent(this, "calciteNoticeClose", 6);
    this.calciteNoticeOpen = createEvent(this, "calciteNoticeOpen", 6);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //---------------------------------------------------------------------------
    /**
     * When `true`, the component is active.
     *
     * @deprecated Use `open` instead.
     */
    this.active = false;
    /** When `true`, the component is visible. */
    this.open = false;
    /** The color for the component's top border and icon. */
    this.color = "blue";
    /**
     * When `true`, a close button is added to the component.
     *
     * @deprecated use `closable` instead.
     */
    this.dismissible = false;
    /** When `true`, a close button is added to the component. */
    this.closable = false;
    /**
     * Accessible name for the close button.
     *
     * @default "Close"
     */
    this.intlClose = TEXT.close;
    /** Specifies the size of the component. */
    this.scale = "m";
    /** Specifies the width of the component. */
    this.width = "auto";
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.close = () => {
      this.open = false;
      this.calciteNoticeClose.emit();
    };
  }
  activeHandler(value) {
    this.open = value;
  }
  openHandler(value) {
    this.active = value;
  }
  handleDismissible(value) {
    this.closable = value;
  }
  handleClosable(value) {
    this.dismissible = value;
  }
  updateRequestedIcon() {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    connectConditionalSlotComponent(this);
    const isOpen = this.active || this.open;
    if (isOpen) {
      this.activeHandler(isOpen);
      this.openHandler(isOpen);
    }
    if (this.dismissible) {
      this.handleDismissible(this.dismissible);
    }
    if (this.closable) {
      this.handleClosable(this.closable);
    }
  }
  disconnectedCallback() {
    disconnectConditionalSlotComponent(this);
  }
  componentWillLoad() {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }
  render() {
    const { el } = this;
    const closeButton = (h("button", { "aria-label": this.intlClose, class: CSS.close, onClick: this.close, ref: (el) => (this.closeButton = el) }, h("calcite-icon", { icon: "x", scale: this.scale === "l" ? "m" : "s" })));
    const hasActionEnd = getSlotted(el, SLOTS.actionsEnd);
    return (h("div", { class: CSS.container }, this.requestedIcon ? (h("div", { class: CSS.icon }, h("calcite-icon", { icon: this.requestedIcon, scale: this.scale === "l" ? "m" : "s" }))) : null, h("div", { class: CSS.content }, h("slot", { name: SLOTS.title }), h("slot", { name: SLOTS.message }), h("slot", { name: SLOTS.link })), hasActionEnd ? (h("div", { class: CSS.actionsEnd }, h("slot", { name: SLOTS.actionsEnd }))) : null, this.closable ? closeButton : null));
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    const noticeLinkEl = this.el.querySelector("calcite-link");
    if (!this.closeButton && !noticeLinkEl) {
      return;
    }
    if (noticeLinkEl) {
      noticeLinkEl.setFocus();
    }
    else if (this.closeButton) {
      this.closeButton.focus();
    }
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "active": ["activeHandler"],
    "open": ["openHandler"],
    "dismissible": ["handleDismissible"],
    "closable": ["handleClosable"],
    "icon": ["updateRequestedIcon"],
    "color": ["updateRequestedIcon"]
  }; }
};
Notice.style = noticeCss;

const mapSelectToolsCss = ":host{display:block}.div-visible{display:inherit}.div-visible-search{display:flex;height:44px;align-items:center;padding-bottom:0}.div-not-visible{display:none}.padding-bottom-1{padding-bottom:1rem}.search-widget{width:100% !important;border:1px solid var(--calcite-ui-border-input)}.w-100{width:100%}.w-50{width:50%}.search-distance-container{padding-top:\"1rem\" !important}.end-border{-webkit-border-end:1px solid var(--calcite-ui-border-2);border-inline-end:1px solid var(--calcite-ui-border-2)}.search-distance{display:flex;padding-top:1rem}";

const MapSelectTools = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.selectionSetChange = createEvent(this, "selectionSetChange", 7);
    this.sketchTypeChange = createEvent(this, "sketchTypeChange", 7);
    this.workflowTypeChange = createEvent(this, "workflowTypeChange", 7);
    /**
     * number[]: the oids of the selected features
     */
    this._selectedIds = [];
    /**
     * string: A label to help uniquely identify the selection set
     */
    this._selectionLabel = "";
    this.geometries = undefined;
    this.isUpdate = false;
    this.mapView = undefined;
    this.selectionSet = undefined;
    this.selectLayerView = undefined;
    this.showBufferTools = true;
    this._layerSelectChecked = undefined;
    this._searchTerm = undefined;
    this._translations = undefined;
    this._workflowType = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  /**
   * Called each time the geometries prop is changed.
   *
   * @returns Promise when complete
   */
  async watchGeometriesHandler(newValue, oldValue) {
    if (newValue !== oldValue) {
      if (newValue.length > 0) {
        return this._geomQuery(this.geometries);
      }
      else if (newValue.length === 0) {
        return this._clearResults(true, true);
      }
    }
  }
  /**
   * Called each time the workflowType prop is changed and emits the workflowTypeChange event.
   *
   * @returns Promise when complete
   */
  async workflowTypeHandler(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.mapView.popup.autoOpenEnabled = ["SELECT", "SKETCH", "REFINE"].indexOf(newValue) < 0;
      this.workflowTypeChange.emit(newValue);
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------
  /**
   * Clear any selection results
   *
   * @returns Promise when the results have been cleared
   */
  async clearSelection() {
    return this._clearResults();
  }
  /**
   * Get the new selection set
   *
   * @returns Promise with the new selection set
   */
  async getSelection() {
    return {
      id: this.isUpdate ? this.selectionSet.id : Date.now(),
      workflowType: this._workflowType,
      searchResult: this._searchResult,
      buffer: this._bufferGeometry,
      distance: this._bufferTools.distance,
      download: true,
      unit: this._bufferTools.unit,
      label: this._workflowType === EWorkflowType.SEARCH ?
        this._selectionLabel : `${this._selectionLabel} ${this._bufferTools.distance} ${this._bufferTools.unit}`,
      selectedIds: this._selectedIds,
      layerView: this.selectLayerView,
      geometries: this.geometries,
      refineSelectLayers: this._refineTools.layerViews
    };
  }
  /**
   * Listen to changes in the sketch graphics
   *
   */
  sketchGraphicsChange(event) {
    this._updateSelection(EWorkflowType.SKETCH, event.detail, this._translations.sketch);
  }
  /**
   * Listen to changes in the refine graphics
   *
   */
  refineSelectionGraphicsChange(event) {
    const graphics = event.detail;
    this._updateSelection(EWorkflowType.SELECT, graphics, this._translations.select);
    // Using OIDs to avoid issue with points
    const oids = Array.isArray(graphics) ? graphics.map(g => g.attributes[g.layer.objectIdField]) : [];
    return this._highlightFeatures(oids);
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad() {
    await this._getTranslations();
    await this._initModules();
  }
  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  async componentDidLoad() {
    return this._init();
  }
  /**
   * Renders the component.
   */
  render() {
    var _a, _b;
    const searchEnabled = this._workflowType === EWorkflowType.SEARCH;
    const showSearchClass = searchEnabled ? " div-visible-search" : " div-not-visible";
    const drawEnabled = this._workflowType === EWorkflowType.SKETCH || this._workflowType === EWorkflowType.SELECT;
    //const showDrawToolsClass = drawEnabled ? " div-visible" : " div-not-visible";
    // const selectEnabled = this._workflowType === EWorkflowType.SELECT;
    // const showSelectToolsClass = selectEnabled ? " div-visible" : " div-not-visible";
    const showBufferToolsClass = this.showBufferTools ? "search-distance" : "div-not-visible";
    const useSelectClass = this._layerSelectChecked && !searchEnabled ? " div-visible" : " div-not-visible";
    const useDrawClass = !this._layerSelectChecked && !searchEnabled ? " div-visible" : " div-not-visible";
    const showLayerChoiceClass = searchEnabled ? "div-not-visible" : "div-visible";
    return (h(Host, null, h("div", { class: "padding-bottom-1" }, h("calcite-radio-group", { class: "w-100", onCalciteRadioGroupChange: (evt) => this._workflowChange(evt) }, h("calcite-radio-group-item", { checked: searchEnabled, class: "w-50 end-border", value: EWorkflowType.SEARCH }, this._translations.search), h("calcite-radio-group-item", { checked: drawEnabled, class: "w-50", value: EWorkflowType.SKETCH }, this._translations.sketch))), h("div", { class: showSearchClass }, h("div", { class: "search-widget", ref: (el) => { this._searchElement = el; } })), h("div", { class: showLayerChoiceClass }, h("calcite-label", { layout: "inline" }, h("calcite-checkbox", { onCalciteCheckboxChange: () => this._layerSelectChanged(), ref: (el) => this._selectFromLayerElement = el }), "Use layer features")), h("div", { class: useDrawClass }, h("map-draw-tools", { active: true, border: true, mapView: this.mapView, ref: (el) => { this._drawTools = el; } })), h("div", { class: useSelectClass }, h("refine-selection-tools", { active: true, border: true, layerViews: this._refineSelectLayers, mapView: this.mapView, mode: ESelectionMode.ADD, ref: (el) => { this._refineTools = el; }, refineMode: ERefineMode.SUBSET })), h("calcite-label", { class: showBufferToolsClass }, this._translations.searchDistance, h("buffer-tools", { distance: (_a = this.selectionSet) === null || _a === void 0 ? void 0 : _a.distance, geometries: this.geometries, onBufferComplete: (evt) => this._bufferComplete(evt), ref: (el) => this._bufferTools = el, unit: (_b = this.selectionSet) === null || _b === void 0 ? void 0 : _b.unit })), h("slot", null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  async _initModules() {
    const [GraphicsLayer, Graphic, Search, geometryEngine] = await loadModules([
      "esri/layers/GraphicsLayer",
      "esri/Graphic",
      "esri/widgets/Search",
      "esri/geometry/geometryEngine"
    ]);
    this.GraphicsLayer = GraphicsLayer;
    this.Graphic = Graphic;
    this.Search = Search;
    this._geometryEngine = geometryEngine;
  }
  /**
   * Initialize the graphics layer, selection set, and search widget
   *
   * @returns Promise when the operation has completed
   */
  async _init() {
    this._initGraphicsLayer();
    this._initSelectionSet();
    this._initSearchWidget();
  }
  /**
   * Initialize the state of the component with any stored values in a selection set
   *
   * @protected
   */
  _initSelectionSet() {
    var _a, _b, _c, _d, _e, _f, _g;
    if (this.selectionSet) {
      this._searchTerm = (_b = (_a = this.selectionSet) === null || _a === void 0 ? void 0 : _a.searchResult) === null || _b === void 0 ? void 0 : _b.name;
      this._workflowType = (_c = this.selectionSet) === null || _c === void 0 ? void 0 : _c.workflowType;
      this._searchResult = (_d = this.selectionSet) === null || _d === void 0 ? void 0 : _d.searchResult;
      this._refineSelectLayers = (_e = this.selectionSet) === null || _e === void 0 ? void 0 : _e.refineSelectLayers;
      this.geometries = [
        ...(_f = this.selectionSet) === null || _f === void 0 ? void 0 : _f.geometries
      ];
      // reset selection label base
      this._selectionLabel = this._workflowType === EWorkflowType.SKETCH ?
        this._translations.sketch : this._workflowType === EWorkflowType.SELECT ?
        this._translations.select : (_g = this.selectionSet) === null || _g === void 0 ? void 0 : _g.label;
      void goToSelection(this.selectionSet.selectedIds, this.selectionSet.layerView, this.mapView, false);
    }
    else {
      this._workflowType = EWorkflowType.SEARCH;
    }
  }
  /**
   * Initialize the search widget
   *
   * @protected
   */
  _initSearchWidget() {
    if (this.mapView && this._searchElement) {
      const searchOptions = {
        view: this.mapView,
        container: this._searchElement,
        searchTerm: this._searchTerm
      };
      this._searchWidget = new this.Search(searchOptions);
      this._searchWidget.on("search-clear", () => {
        void this._clearResults(false);
      });
      this._searchWidget.on("select-result", (searchResults) => {
        var _a;
        void this._clearResults(false);
        if (searchResults.result) {
          this._searchResult = searchResults.result;
          this._updateSelection(EWorkflowType.SEARCH, [searchResults.result.feature], (_a = searchResults === null || searchResults === void 0 ? void 0 : searchResults.result) === null || _a === void 0 ? void 0 : _a.name);
        }
      });
    }
  }
  /**
   * Initialize the graphics layer used to store any buffer grapghics
   *
   * @protected
   */
  _initGraphicsLayer() {
    const title = this._translations.bufferLayer;
    const bufferIndex = this.mapView.map.layers.findIndex((l) => l.title === title);
    if (bufferIndex > -1) {
      this._bufferGraphicsLayer = this.mapView.map.layers.getItemAt(bufferIndex);
    }
    else {
      this._bufferGraphicsLayer = new this.GraphicsLayer({ title });
      state.managedLayers.push(title);
      const sketchIndex = this.mapView.map.layers.findIndex((l) => l.title === this._translations.sketchLayer);
      if (sketchIndex > -1) {
        this.mapView.map.layers.add(this._bufferGraphicsLayer, sketchIndex);
      }
      else {
        this.mapView.map.layers.add(this._bufferGraphicsLayer);
      }
    }
  }
  /**
   * Store the layer select checked change
   *
   * @protected
   */
  _layerSelectChanged() {
    this._layerSelectChecked = this._selectFromLayerElement.checked;
    this.sketchTypeChange.emit(this._layerSelectChecked ? ESketchType.LAYER : ESketchType.INTERACTIVE);
  }
  /**
   * Store workflow type change
   *
   * @protected
   */
  _workflowChange(evt) {
    this._workflowType = evt.detail;
  }
  /**
   * Highlight the features in the map
   *
   * @protected
   */
  async _highlightFeatures(ids) {
    var _a;
    (_a = state.highlightHandle) === null || _a === void 0 ? void 0 : _a.remove();
    if (ids.length > 0) {
      state.highlightHandle = await highlightFeatures(ids, this.selectLayerView, this.mapView);
    }
    this.selectionSetChange.emit(ids.length);
  }
  /**
   * Query the selectLayerView based on any user drawn geometries or buffers
   *
   * @param geometries Array of geometries used for the selection of ids from the select layer view
   *
   * @returns Promise when the selection is complete and the graphics have been highlighted
   */
  async _selectFeatures(geometries) {
    this._selectedIds = await queryObjectIds(geometries, this.selectLayerView.layer);
    // Add geometries used for selecting features as graphics
    this._drawTools.graphics = this.geometries.map(geom => {
      var _a, _b, _c;
      const props = {
        "geometry": geom,
        "symbol": geom.type === "point" ?
          (_a = this._drawTools) === null || _a === void 0 ? void 0 : _a.pointSymbol : geom.type === "polyline" ?
          (_b = this._drawTools) === null || _b === void 0 ? void 0 : _b.polylineSymbol : geom.type === "polygon" ?
          (_c = this._drawTools) === null || _c === void 0 ? void 0 : _c.polygonSymbol : undefined
      };
      return new this.Graphic(props);
    });
    void this._highlightFeatures(this._selectedIds);
  }
  /**
   * Query the selectLayerView based on any user drawn geometries or buffers
   *
   * @param evt CustomEvent that contains the result of the buffer
   *
   * @protected
   */
  async _bufferComplete(evt) {
    this._bufferGeometry = Array.isArray(evt.detail) ?
      evt.detail[0] : evt.detail;
    if (this._bufferGeometry) {
      // Create a symbol for rendering the graphic
      const symbol = {
        type: "simple-fill",
        color: [227, 139, 79, 0.8],
        outline: {
          color: [255, 255, 255],
          width: 1
        }
      };
      // Add the geometry and symbol to a new graphic
      const polygonGraphic = new this.Graphic({
        geometry: this._bufferGeometry,
        symbol
      });
      this._bufferGraphicsLayer.removeAll();
      this._bufferGraphicsLayer.add(polygonGraphic);
      void this._selectFeatures([this._bufferGeometry]);
      void this.mapView.goTo(polygonGraphic.geometry.extent);
    }
    else {
      if (this._bufferGraphicsLayer) {
        this._bufferGraphicsLayer.removeAll();
      }
      void this._geomQuery(this.geometries);
    }
  }
  /**
   * Fetch a single geometry for each potential geometry type
   *
   * @param geometries All current selection geometries
   *
   * @protected
   */
  _geomQuery(geometries) {
    const queryGeoms = getQueryGeoms(geometries, this._geometryEngine);
    return this._selectFeatures(queryGeoms);
  }
  /**
   * Clear all stored values and general state for the component
   *
   * @param clearSearchWidget Optional boolean for clearing the search widget (default is true)
   * @param clearLabel Optional boolean for clearing the search label (default is true)
   *
   * @protected
   */
  async _clearResults(clearSearchWidget = true, clearLabel = true) {
    var _a, _b;
    this._selectedIds = [];
    if (clearLabel) {
      this._selectionLabel = "";
    }
    if (this._bufferGraphicsLayer) {
      this._bufferGraphicsLayer.removeAll();
    }
    if (clearSearchWidget && this._searchWidget) {
      this._searchWidget.clear();
    }
    (_a = state.highlightHandle) === null || _a === void 0 ? void 0 : _a.remove();
    // for sketch
    // checking for clear as it would throw off tests
    if ((_b = this._drawTools) === null || _b === void 0 ? void 0 : _b.clear) {
      void this._drawTools.clear();
    }
    this.selectionSetChange.emit(this._selectedIds.length);
  }
  /**
   * Fetch a single geometry for the current geometry type
   *
   * @param type worflow type
   * @param graphics graphics to be used for selection
   * @param label selection label
   *
   * @protected
   */
  _updateSelection(type, graphics, label) {
    this.geometries = Array.isArray(graphics) ? graphics.map(g => g.geometry) : this.geometries;
    this._workflowType = type;
    this._selectionLabel = label;
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "geometries": ["watchGeometriesHandler"],
    "_workflowType": ["workflowTypeHandler"]
  }; }
};
MapSelectTools.style = mapSelectToolsCss;

/** @license
 * Copyright 2022 Esri
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
/**
 * Export a csv of the attributes from the features that match the provided ids
 *
 * @param contentArray Array of labels; each label is an array of label line strings
 * @param labelDescription Format to use for labels
 * @param removeDuplicates Remove duplicate labels before exporting
 *
 * @returns Promise when the function has completed
 */
async function exportPDF(contents, labelDescription, removeDuplicates = true) {
  console.log("exportPDF", JSON.stringify(contents), JSON.stringify(labelDescription, null, 2), removeDuplicates); //???
  /*
  const fieldNames = {};
  const entry = attributes[0];
  Object.keys(entry).forEach(k => {
    if (entry.hasOwnProperty(k)) {
      fieldNames[k] = k;
    }
  });

  _downloadCSVFile(fieldNames, attributes, `notify-${Date.now().toString()}`);
  */
}
/**
 * Download the CSV file
 *
 * @param fieldNames the names for each of the features fields
 * @param attributes the features attributes
 *
 * Based on:
 * https://medium.com/@danny.pule/export-json-to-csv-file-using-javascript-a0b7bc5b00d2
 *
 * @returns void
 */
/*
function _downloadCSVFile(
  fieldNames: {[key: string]: string},
  attributes: {[key: string]: string}[],
  fileTitle: string
): void {
  if (fieldNames) {
    attributes.unshift(fieldNames);
  }
  // format values to string so it doesn't get tripped up when a value has a comma
  // another option could be to export with a different delimiter
  const csv = attributes.reduce((prev, cur) => {
    return prev + Object.values(cur).map(v => `"${v}"`).join(",") + "\r\n";
  }, "");
  const link = document.createElement("a");
  if (link.download !== undefined) {
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    link.download = `${fileTitle}.csv` || "export.csv";
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
*/

const pdfDownloadCss = ":host{display:block}";

const PdfDownload = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.disabled = false;
    this.layerView = undefined;
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
   * Downloads pdf of mailing labels for the provided list of ids
   *
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   * @returns Promise resolving when function is done
   */
  async downloadPDF(ids, removeDuplicates) {
    // Get the attributes of the features to export
    const featureSet = await queryFeaturesByID(ids, this.layerView.layer);
    const attributes = featureSet.features.map(f => f.attributes);
    // Convert array of objects into an array of string arrays
    const contents = attributes.map(attr => Object.values(attr));
    const labelDescription = this._labelInfoElement.selectedOption.value;
    return exportPDF(contents, labelDescription, removeDuplicates);
  }
  /**
   * Downloads csv of mailing labels for the provided list of ids
   *
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   * @returns Promise resolving when function is done
   */
  async downloadCSV(ids, removeDuplicates) {
    // Get the attributes of the features to export
    const featureSet = await queryFeaturesByID(ids, this.layerView.layer);
    const attributes = featureSet.features.map(f => f.attributes);
    // Get the column headings from the first record
    const columnNames = new Set();
    const entry = attributes[0];
    Object.keys(entry).forEach(k => {
      if (entry.hasOwnProperty(k)) {
        columnNames[k] = k;
      }
    });
    return exportCSV(columnNames, attributes, removeDuplicates);
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
   */
  async componentWillLoad() {
    await this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("calcite-select", { disabled: this.disabled, label: "", ref: (el) => { this._labelInfoElement = el; } }, this._renderItems())));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Renders the pdf export size options
   *
   * @returns Node array of size options
   *
   * @protected
   */
  _renderItems() {
    const s = pdfUtils;
    const sortedPdfIndo = (s.default || s).sort((a, b) => {
      const _a = parseInt(a.descriptionPDF.labelsPerPageDisplay, 10);
      const _b = parseInt(b.descriptionPDF.labelsPerPageDisplay, 10);
      return _a < _b ? -1 : _a > _b ? 1 : 0;
    });
    return sortedPdfIndo.map((l) => {
      return (h("calcite-option", { value: l }, this._getLabelSizeText(l)));
    });
  }
  /**
   * Downloads pdf of mailing labels for the provided list of ids
   *
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   *
   * @returns Promise resolving when function is done
   * @protected
   */
  /*
  protected async _downloadPDF(
    ids: number[],
    removeDuplicates: boolean
  ): Promise<void> {
    const labelDescription = this._labelInfoElement.selectedOption.value;
    await exportPDF(this.layerView, ids, labelDescription, removeDuplicates);
  }
  */
  /**
   * Downloads csv of mailing labels for the provided list of ids
   *
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   * @returns Promise resolving when function is done
   *
   * @returns Promise that will resolve when the download is complete
   * @protected
   */
  /*
  protected async _downloadCSV(
    ids: number[],
    removeDuplicates: boolean
  ): Promise<void> {
    // TODO this will be leveraged when we do the real implementation of this
    console.log(removeDuplicates)
    await exportCSV(this.layerView, ids);
  }
  */
  /**
   * Gets the formatted pdf export size text
   *
   * @param labelInfo current user selected label info
   *
   * @returns the pdf label as a string
   * @protected
   */
  _getLabelSizeText(labelInfo) {
    const lNum = labelInfo.descriptionPDF.labelsPerPageDisplay;
    const lSize = `${labelInfo.descriptionPDF.labelWidthDisplay} x ${labelInfo.descriptionPDF.labelHeightDisplay}`;
    return this._translations.pdfLabel.replace("{{n}}", lNum).replace("{{labelSize}}", lSize);
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  get el() { return getElement(this); }
};
PdfDownload.style = pdfDownloadCss;

const refineSelectionCss = ":host{display:block}";

const RefineSelection = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.selectionSetsChanged = createEvent(this, "selectionSetsChanged", 7);
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * boolean: Indicates if any new graphics should be added or removed
     */
    this._addEnabled = true;
    this.addresseeLayer = undefined;
    this.mapView = undefined;
    this.selectionSets = [];
    this.GraphicsLayer = undefined;
    this.SketchViewModel = undefined;
    this._translations = undefined;
  }
  /**
   * Handles changes to refine selection ids.
   *
   */
  refineSelectionIdsChange(event) {
    var _a, _b;
    const addIds = ((_a = event.detail) === null || _a === void 0 ? void 0 : _a.addIds) || [];
    const removeIds = ((_b = event.detail) === null || _b === void 0 ? void 0 : _b.removeIds) || [];
    this._updateSelectionSets(removeIds);
    this._updateRefineSelectionSet(addIds, removeIds);
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad() {
    await this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h(Host, null, h("div", { class: "padding-1" }, h("div", null, h("calcite-radio-group", { class: "w-100", onCalciteRadioGroupChange: (evt) => this._modeChanged(evt) }, h("calcite-radio-group-item", { checked: this._addEnabled, class: "w-50", onClick: () => this._setSelectionMode(ESelectionMode.ADD), value: ESelectionMode.ADD }, this._translations.add), h("calcite-radio-group-item", { checked: !this._addEnabled, class: "w-50", onClick: () => this._setSelectionMode(ESelectionMode.REMOVE), value: ESelectionMode.REMOVE }, this._translations.remove)), h("refine-selection-tools", { border: true, ids: getSelectionIds(this.selectionSets), layerViews: [this.addresseeLayer], mapView: this.mapView, mode: this._addEnabled ? ESelectionMode.ADD : ESelectionMode.REMOVE, ref: (el) => { this._refineTools = el; }, useLayerPicker: false })), h("br", null), (h("calcite-list", { class: "list-border" }, this._getRefineSelectionSetList())))));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Store the Add/Remove mode
   *
   * @protected
   */
  _modeChanged(evt) {
    this._addEnabled = evt.detail === ESelectionMode.ADD;
  }
  /**
   * Set the refine tools selection mode
   *
   * @protected
   */
  _setSelectionMode(mode) {
    this._refineTools.mode = mode;
  }
  /**
   * Create a list to show the number added/removed/total unique selected
   *
   * @returns the list node
   * @protected
   */
  _getRefineSelectionSetList() {
    const total = getTotal(this.selectionSets);
    const refineSet = this._getRefineSelectionSet(this.selectionSets);
    const numAdded = (refineSet === null || refineSet === void 0 ? void 0 : refineSet.refineIds.addIds.length) || 0;
    const numRemoved = (refineSet === null || refineSet === void 0 ? void 0 : refineSet.refineIds.removeIds.length) || 0;
    return [(h("calcite-list-item", { label: this._translations.featuresAdded.replace("{{n}}", numAdded.toString()) })), (h("calcite-list-item", { label: this._translations.featuresRemoved.replace("{{n}}", numRemoved.toString()) })), (h("calcite-list-item", { label: this._translations.totalSelected.replace("{{n}}", total.toString()) }))];
  }
  /**
   * Fetch the refine selection set
   *
   * @returns the refine selection set
   * @protected
   */
  _getRefineSelectionSet(selectionSets) {
    let refineSelectionSet;
    selectionSets.some(ss => {
      if (ss.workflowType === EWorkflowType.REFINE) {
        refineSelectionSet = ss;
        return true;
      }
    });
    return refineSelectionSet;
  }
  /**
   * Remove ids from existing selection sets.
   * Remove any selection sets than have no selected ids
   * This can update any selection set not just the refine set.
   * We do not do something similar for adds as we will only ever add from refine tools to the single REFINE selection set.
   *
   * @param removeIds the ids to remove
   *
   * @protected
   */
  _updateSelectionSets(removeIds) {
    if (removeIds.length > 0) {
      this.selectionSets = this.selectionSets.reduce((prev, cur) => {
        cur.selectedIds = cur.selectedIds.filter(id => removeIds.indexOf(id) < 0);
        if (cur.selectedIds.length > 0) {
          prev.push(cur);
        }
        return prev;
      }, []);
      this.selectionSetsChanged.emit(this.selectionSets);
    }
  }
  /**
   * Update the refine selection set with any adds or removes
   *
   * @param addIds any ids to add
   * @param removeIds any ids to remove
   *
   * @returns Promise resolving when function is done
   * @protected
   */
  _updateRefineSelectionSet(addIds, removeIds) {
    const selectionSet = this._getRefineSelectionSet(this.selectionSets);
    this.selectionSets = selectionSet ?
      this._updateRefineIds(selectionSet, addIds, removeIds) :
      this._addRefineSelectionSet(addIds, removeIds);
    this.selectionSetsChanged.emit(this.selectionSets);
  }
  /**
   * Update the ids stored for the refine selection set
   *
   * @param selectionSet the refine selection set
   * @param addIds any ids to add
   * @param removeIds any ids to remove
   *
   * @returns updated selection sets
   * @protected
   */
  _updateRefineIds(selectionSet, addIds, removeIds) {
    // remove ids if they exist in the current add or remove list
    selectionSet.refineIds.addIds = selectionSet.refineIds.addIds.filter(id => removeIds.indexOf(id) < 0);
    selectionSet.refineIds.removeIds = selectionSet.refineIds.removeIds.filter(id => addIds.indexOf(id) < 0);
    const _addIds = [...new Set(selectionSet.refineIds.addIds.concat(addIds))];
    const _removeIds = [...new Set(selectionSet.refineIds.removeIds.concat(removeIds))];
    selectionSet.refineIds = {
      addIds: _addIds.filter(id => _removeIds.indexOf(id) < 0),
      removeIds: _removeIds.filter(id => _addIds.indexOf(id) < 0)
    };
    selectionSet.selectedIds = selectionSet.refineIds.addIds.length > 0 ?
      [...new Set(selectionSet.selectedIds.concat(selectionSet.refineIds.addIds))] :
      selectionSet.selectedIds.filter(id => selectionSet.refineIds.removeIds.indexOf(id) < 0);
    return this.selectionSets.map(ss => {
      return ss.workflowType === EWorkflowType.REFINE ? selectionSet : ss;
    });
  }
  /**
   * Add a new refine selection set
   *
   * @param addIds any ids to add
   * @param removeIds any ids to remove
   *
   * @returns updated selection sets
   * @protected
   */
  _addRefineSelectionSet(addIds, removeIds) {
    return [
      ...this.selectionSets,
      ({
        buffer: undefined,
        distance: 0,
        download: true,
        geometries: [],
        id: Date.now(),
        label: "Refine",
        layerView: this.addresseeLayer,
        refineSelectLayers: [],
        searchResult: undefined,
        selectedIds: addIds,
        unit: "feet",
        workflowType: EWorkflowType.REFINE,
        refineIds: {
          addIds: addIds,
          removeIds: removeIds
        }
      })
    ];
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  /** Provides access to protected methods for unit testing.
 *
 *  @param methodName Name of protected method to run
 *  @param arg1 First argument to forward to method, e.g., for "_modeChanged", `ESelectionMode`
 *  @returns
 */
  _testAccess(methodName, arg1) {
    switch (methodName) {
      case "_modeChanged":
        return this._modeChanged(arg1);
      case "_setSelectionMode":
        return this._setSelectionMode(arg1);
      // case "_getRefineSelectionSetList":
      //   return this._getRefineSelectionSetList();
      // case "_getRefineSelectionSet":
      //   return this._getRefineSelectionSet(arg1);
      // case "_updateSelectionSets":
      //   return this._updateSelectionSets(arg1);
      // case "_updateRefineSelectionSet":
      //   return this._updateRefineSelectionSet(arg1, arg2);
      // case "_updateRefineIds":
      //   return this._updateRefineIds(arg1, arg2, arg3);
      // case "_addRefineSelectionSet":
      //   return this._addRefineSelectionSet(arg1, arg2);
    }
    return null;
  }
  get el() { return getElement(this); }
};
RefineSelection.style = refineSelectionCss;

export { InputMessage as calcite_input_message, Notice as calcite_notice, MapSelectTools as map_select_tools, PdfDownload as pdf_download, RefineSelection as refine_selection };
