/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, F as Fragment, g as getElement } from './index-d298aca9.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-d3eebe7f.js';
import { a as getSlotted, t as toAriaBoolean } from './dom-0fc13266.js';
import { u as updateHostInteraction } from './interactive-b1987dfd.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentLoaded } from './loadable-e6dce690.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale-aabc8f45.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n-a539118a.js';
import { I as ICON_TYPES } from './resources-b9ac23e3.js';
import { I as ICONS, C as CSS, S as SLOTS } from './resources-34a756bf.js';
import './observers-81c91acd.js';
import './guid-2069664e.js';
import './resources-e83f65b3.js';
import './key-218d8d4d.js';

const pickListItemCss = "@charset \"UTF-8\";@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{margin:0px;-webkit-margin-after:1px;margin-block-end:1px;box-sizing:border-box;display:flex;align-items:stretch;background-color:var(--calcite-ui-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-ui-text-1);--tw-shadow:0 1px 0 var(--calcite-ui-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition:background-color var(--calcite-animation-timing);animation:calcite-fade-in var(--calcite-animation-timing)}:host *{box-sizing:border-box}.label{display:flex;flex:1 1 auto;cursor:pointer;align-items:center;background-color:transparent;outline-color:transparent}.label:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.label:hover{background-color:var(--calcite-ui-foreground-2)}:host([non-interactive]:hover){background-color:var(--calcite-ui-foreground-1)}:host([non-interactive]) .label,:host([non-interactive]) .icon{pointer-events:none}.icon{margin-block:0px;display:flex;cursor:pointer;align-items:center;padding:0.25rem;color:var(--calcite-ui-brand);flex:0 0 auto;line-height:0}.icon:hover{background-color:var(--calcite-ui-foreground-2)}.icon-dot{display:flex;inline-size:1.5rem;align-items:center;padding:0.5rem}.icon-dot:before{opacity:0;content:\"•\"}.icon calcite-icon{opacity:0}:host([selected]) .icon-dot:before,:host([selected]) .icon calcite-icon{transition:opacity var(--calcite-animation-timing);opacity:1}.text-container{pointer-events:none;display:flex;flex-direction:column;flex-wrap:nowrap;overflow:hidden;padding-block:0.5rem;padding-inline:0.75rem;font-size:var(--calcite-font-size--2);line-height:1.375;word-wrap:break-word;word-break:break-word}.title{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-1)}.description{-webkit-margin-before:0.125rem;margin-block-start:0.125rem;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-3)}.actions{margin:0px;display:flex;flex:0 1 auto;align-items:stretch;justify-content:flex-end}.actions--start~.label{-webkit-padding-start:0.25rem;padding-inline-start:0.25rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}";

const PickListItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteListItemChange = createEvent(this, "calciteListItemChange", 6);
    this.calciteListItemRemove = createEvent(this, "calciteListItemRemove", 7);
    this.calciteInternalListItemPropsChange = createEvent(this, "calciteInternalListItemPropsChange", 6);
    this.calciteInternalListItemValueChange = createEvent(this, "calciteInternalListItemValueChange", 6);
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.pickListClickHandler = (event) => {
      if (this.disabled || (this.deselectDisabled && this.selected) || this.nonInteractive) {
        return;
      }
      this.shiftPressed = event.shiftKey;
      this.selected = !this.selected;
    };
    this.pickListKeyDownHandler = (event) => {
      if (event.key === " ") {
        event.preventDefault();
        if ((this.deselectDisabled && this.selected) || this.nonInteractive) {
          return;
        }
        this.selected = !this.selected;
      }
    };
    this.removeClickHandler = () => {
      this.calciteListItemRemove.emit();
    };
    this.description = undefined;
    this.disabled = false;
    this.deselectDisabled = false;
    this.nonInteractive = false;
    this.icon = null;
    this.iconFlipRtl = false;
    this.label = undefined;
    this.messageOverrides = undefined;
    this.messages = undefined;
    this.metadata = undefined;
    this.removable = false;
    this.selected = false;
    this.value = undefined;
    this.defaultMessages = undefined;
    this.effectiveLocale = "";
  }
  descriptionWatchHandler() {
    this.calciteInternalListItemPropsChange.emit();
  }
  labelWatchHandler() {
    this.calciteInternalListItemPropsChange.emit();
  }
  onMessagesChange() {
    /* wired up by t9n util */
  }
  metadataWatchHandler() {
    this.calciteInternalListItemPropsChange.emit();
  }
  selectedWatchHandler() {
    this.calciteListItemChange.emit({
      item: this.el,
      value: this.value,
      selected: this.selected,
      shiftPressed: this.shiftPressed
    });
    this.shiftPressed = false;
  }
  valueWatchHandler(newValue, oldValue) {
    this.calciteInternalListItemValueChange.emit({ oldValue, newValue });
  }
  effectiveLocaleChange() {
    updateMessages(this, this.effectiveLocale);
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    connectLocalized(this);
    connectMessages(this);
    connectConditionalSlotComponent(this);
  }
  async componentWillLoad() {
    await setUpMessages(this);
    setUpLoadableComponent(this);
  }
  componentDidLoad() {
    setComponentLoaded(this);
  }
  disconnectedCallback() {
    disconnectLocalized(this);
    disconnectMessages(this);
    disconnectConditionalSlotComponent(this);
  }
  componentDidRender() {
    updateHostInteraction(this, this.el.closest("calcite-pick-list") ? "managed" : false);
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Toggles the selection state. By default this won't trigger an event.
   * The first argument allows the value to be coerced, rather than swapping values.
   *
   * @param coerce
   */
  async toggleSelected(coerce) {
    this.selected = typeof coerce === "boolean" ? coerce : !this.selected;
  }
  /** Sets focus on the component. */
  async setFocus() {
    var _a;
    await componentLoaded(this);
    (_a = this.focusEl) === null || _a === void 0 ? void 0 : _a.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderIcon() {
    const { icon, iconFlipRtl } = this;
    if (!icon) {
      return null;
    }
    return (h("span", { class: {
        [CSS.icon]: true,
        [CSS.iconDot]: icon === ICON_TYPES.circle
      }, onClick: this.pickListClickHandler }, icon === ICON_TYPES.square ? (h("calcite-icon", { flipRtl: iconFlipRtl, icon: ICONS.checked, scale: "s" })) : null));
  }
  renderRemoveAction() {
    return this.removable ? (h("calcite-action", { class: CSS.remove, icon: ICONS.remove, onClick: this.removeClickHandler, slot: SLOTS.actionsEnd, text: this.messages.remove })) : null;
  }
  renderActionsStart() {
    const { el } = this;
    const hasActionsStart = getSlotted(el, SLOTS.actionsStart);
    return hasActionsStart ? (h("div", { class: { [CSS.actions]: true, [CSS.actionsStart]: true } }, h("slot", { name: SLOTS.actionsStart }))) : null;
  }
  renderActionsEnd() {
    const { el, removable } = this;
    const hasActionsEnd = getSlotted(el, SLOTS.actionsEnd);
    return hasActionsEnd || removable ? (h("div", { class: { [CSS.actions]: true, [CSS.actionsEnd]: true } }, h("slot", { name: SLOTS.actionsEnd }), this.renderRemoveAction())) : null;
  }
  render() {
    const { description, label } = this;
    return (h(Fragment, null, this.renderIcon(), this.renderActionsStart(), h("label", { "aria-label": label, class: CSS.label, onClick: this.pickListClickHandler, onKeyDown: this.pickListKeyDownHandler, tabIndex: 0,
      // eslint-disable-next-line react/jsx-sort-props
      ref: (focusEl) => (this.focusEl = focusEl) }, h("div", { "aria-checked": toAriaBoolean(this.selected), class: CSS.textContainer, role: "menuitemcheckbox" }, h("span", { class: CSS.title }, label), description ? h("span", { class: CSS.description }, description) : null)), this.renderActionsEnd()));
  }
  static get assetsDirs() { return ["assets"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "description": ["descriptionWatchHandler"],
    "label": ["labelWatchHandler"],
    "defaultMessages": ["onMessagesChange"],
    "messageOverrides": ["onMessagesChange"],
    "metadata": ["metadataWatchHandler"],
    "selected": ["selectedWatchHandler"],
    "value": ["valueWatchHandler"],
    "effectiveLocale": ["effectiveLocaleChange"]
  }; }
};
PickListItem.style = pickListItemCss;

export { PickListItem as calcite_pick_list_item };
