/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, g as getElement } from './p-c023e6a1.js';
import { g as guid } from './p-a80b3880.js';
import { u as updateHostInteraction } from './p-7daea1df.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  checked: "checked",
  description: "description",
  descriptionOnly: "description-only",
  disabled: "disabled",
  heading: "heading",
  headingOnly: "heading-only",
  icon: "icon",
  iconOnly: "icon-only",
  inputAlignmentEnd: "input-alignment-end",
  inputAlignmentStart: "input-alignment-start",
  inputEnabled: "input-enabled",
  largeVisual: "large-visual",
  widthAuto: "width-auto",
  widthFull: "width-full"
};

const tileSelectCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:block}:host .container{background-color:var(--calcite-ui-foreground-1);box-shadow:0 0 0 1px var(--calcite-ui-border-2);box-sizing:border-box;cursor:pointer;display:inline-block;block-size:100%;max-inline-size:300px;padding:0.75rem;position:relative;vertical-align:top;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}:host .container.checked{z-index:1;box-shadow:0 0 0 1px var(--calcite-ui-brand)}:host .container.heading-only{align-items:center}:host .container:not(.input-enabled) ::slotted(calcite-checkbox),:host .container:not(.input-enabled) ::slotted(calcite-radio-button){position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host .container.focused{outline-color:transparent}:host .container.focused:not(.disabled):not(.input-enabled){outline:2px solid var(--calcite-ui-brand);outline-offset:-4px;box-shadow:0 0 0 1px var(--calcite-ui-brand), inset 0 0 0 2px var(--calcite-ui-foreground-1)}:host .container.input-enabled.input-alignment-start.width-auto.heading-only,:host .container.input-enabled.input-alignment-start.width-auto.icon-only,:host .container.input-enabled.input-alignment-start.width-auto.description-only,:host .container.input-enabled.input-alignment-start.width-auto.heading.description,:host .container.input-enabled.input-alignment-start.width-auto.icon.description,:host .container.input-enabled.input-alignment-start.width-auto.heading.icon.description{display:inline-grid;grid-template-columns:max-content 1fr}:host .container.input-enabled.input-alignment-start.heading-only,:host .container.input-enabled.input-alignment-start.icon-only,:host .container.input-enabled.input-alignment-start.description-only,:host .container.input-enabled.input-alignment-start.heading.description,:host .container.input-enabled.input-alignment-start.icon.description,:host .container.input-enabled.input-alignment-start.heading.icon.description{gap:0.75rem}:host .container.input-enabled.input-alignment-start calcite-tile{order:1}:host .container.input-enabled.input-alignment-start.large-visual ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-start.large-visual ::slotted(calcite-radio-button){position:absolute;inset-block-start:0.75rem;inset-inline-start:0.75rem}:host .container.input-enabled.input-alignment-end.width-auto.heading-only,:host .container.input-enabled.input-alignment-end.width-auto.icon-only{display:inline-grid;grid-gap:0.75rem;grid-template-columns:max-content 1fr}:host .container.input-enabled.input-alignment-end.heading-only,:host .container.input-enabled.input-alignment-end.icon-only{gap:0.75rem}:host .container.input-enabled.input-alignment-end.description-only ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-end.description-only ::slotted(calcite-radio-button),:host .container.input-enabled.input-alignment-end.heading.description ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-end.heading.description ::slotted(calcite-radio-button),:host .container.input-enabled.input-alignment-end.icon.description ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-end.icon.description ::slotted(calcite-radio-button),:host .container.input-enabled.input-alignment-end.heading.icon.description ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-end.heading.icon.description ::slotted(calcite-radio-button){position:absolute;inset-block-start:0.75rem;inset-inline-end:0.75rem}:host .container.input-enabled.input-alignment-end.large-visual ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-end.large-visual ::slotted(calcite-radio-button){position:absolute;inset-block-start:0.75rem;inset-inline-end:0.75rem}:host .container.width-full{display:flex;max-inline-size:none}:host .container.width-full calcite-tile{flex:1 1 auto}:host(:hover) .container:not(.input-enabled){box-shadow:0 0 0 1px var(--calcite-ui-brand)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}";

const TileSelect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteTileSelectChange = createEvent(this, "calciteTileSelectChange", 6);
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------
    /** When `true`, the component is checked. */
    this.checked = false;
    /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
    this.disabled = false;
    /** When `true`, the component is not displayed and is not focusable or checkable. */
    this.hidden = false;
    /** When `true`, displays an interactive input based on the `type` property. */
    this.inputEnabled = false;
    /** When `inputEnabled` is `true`, specifies the placement of the interactive input on the component. */
    this.inputAlignment = "start";
    /**
     * The selection mode of the component.
     *
     * Use radio for single selection, and checkbox for multiple selections.
     */
    this.type = "radio";
    /** Specifies the width of the component. */
    this.width = "auto";
    this.guid = `calcite-tile-select-${guid()}`;
    //--------------------------------------------------------------------------
    //
    //  State
    //
    //--------------------------------------------------------------------------
    /** The focused state of the tile-select. */
    this.focused = false;
  }
  checkedChanged(newChecked) {
    this.input.checked = newChecked;
  }
  nameChanged(newName) {
    this.input.name = newName;
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    var _a;
    (_a = this.input) === null || _a === void 0 ? void 0 : _a.setFocus();
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  checkboxChangeHandler(event) {
    const checkbox = event.target;
    if (checkbox === this.input) {
      this.checked = checkbox.checked;
    }
    event.stopPropagation();
    this.calciteTileSelectChange.emit();
  }
  checkboxFocusBlurHandler(event) {
    const checkbox = event.target;
    if (checkbox === this.input) {
      this.focused = event.detail;
    }
    event.stopPropagation();
  }
  radioButtonChangeHandler(event) {
    const radioButton = event.target;
    if (radioButton === this.input) {
      this.checked = radioButton.checked;
    }
    event.stopPropagation();
    this.calciteTileSelectChange.emit();
  }
  radioButtonCheckedChangeHandler(event) {
    const radioButton = event.target;
    if (radioButton === this.input) {
      this.checked = radioButton.checked;
    }
    event.stopPropagation();
  }
  radioButtonFocusBlurHandler(event) {
    const radioButton = event.target;
    if (radioButton === this.input) {
      this.focused = radioButton.focused;
    }
    event.stopPropagation();
  }
  click(event) {
    const target = event.target;
    const targets = ["calcite-tile", "calcite-tile-select"];
    if (targets.includes(target.localName)) {
      this.input.click();
    }
  }
  mouseenter() {
    if (this.input.localName === "calcite-radio-button") {
      this.input.hovered = true;
    }
    if (this.input.localName === "calcite-checkbox") {
      this.input.hovered = true;
    }
  }
  mouseleave() {
    if (this.input.localName === "calcite-radio-button") {
      this.input.hovered = false;
    }
    if (this.input.localName === "calcite-checkbox") {
      this.input.hovered = false;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.renderInput();
  }
  disconnectedCallback() {
    this.input.parentNode.removeChild(this.input);
  }
  componentDidRender() {
    updateHostInteraction(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderInput() {
    this.input = document.createElement(this.type === "radio" ? "calcite-radio-button" : "calcite-checkbox");
    this.input.checked = this.checked;
    this.input.disabled = this.disabled;
    this.input.hidden = this.hidden;
    this.input.id = this.guid;
    this.input.label = this.heading || this.name || "";
    if (this.name) {
      this.input.name = this.name;
    }
    if (this.value) {
      this.input.value = this.value != null ? this.value.toString() : "";
    }
    this.el.insertAdjacentElement("beforeend", this.input);
  }
  render() {
    const { checked, description, disabled, focused, heading, icon, inputAlignment, inputEnabled, width } = this;
    return (h("div", { class: {
        checked,
        container: true,
        [CSS.description]: Boolean(description),
        [CSS.descriptionOnly]: Boolean(!heading && !icon && description),
        disabled,
        focused,
        [CSS.heading]: Boolean(heading),
        [CSS.headingOnly]: heading && !icon && !description,
        [CSS.icon]: Boolean(icon),
        [CSS.iconOnly]: !heading && icon && !description,
        [CSS.inputAlignmentEnd]: inputAlignment === "end",
        [CSS.inputAlignmentStart]: inputAlignment === "start",
        [CSS.inputEnabled]: inputEnabled,
        [CSS.largeVisual]: heading && icon && !description,
        [CSS.widthAuto]: width === "auto",
        [CSS.widthFull]: width === "full"
      } }, h("calcite-tile", { active: checked, description: description, embed: true, heading: heading, icon: icon }), h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "checked": ["checkedChanged"],
    "name": ["nameChanged"]
  }; }
};
TileSelect.style = tileSelectCss;

export { TileSelect as calcite_tile_select };

//# sourceMappingURL=p-60e0e6a0.entry.js.map