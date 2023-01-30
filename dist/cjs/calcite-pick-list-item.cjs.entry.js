/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ee607805.js');
const resources = require('./resources-1f785471.js');
const resources$1 = require('./resources-9c55e05c.js');
const dom = require('./dom-4a580af6.js');
const conditionalSlot = require('./conditionalSlot-d8471163.js');
const interactive = require('./interactive-0a68ab99.js');
require('./resources-b56bce71.js');
require('./guid-84ac4d91.js');
require('./observers-5311faf8.js');

const pickListItemCss = "@charset \"UTF-8\";@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{margin:0px;-webkit-margin-after:1px;margin-block-end:1px;box-sizing:border-box;display:flex;align-items:stretch;background-color:var(--calcite-ui-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-ui-text-1);--tw-shadow:0 1px 0 var(--calcite-ui-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition:background-color var(--calcite-animation-timing);animation:calcite-fade-in var(--calcite-animation-timing)}:host *{box-sizing:border-box}.label{display:flex;flex:1 1 auto;cursor:pointer;align-items:center;background-color:transparent;outline-color:transparent}.label:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.label:hover{background-color:var(--calcite-ui-foreground-2)}:host([non-interactive]:hover){background-color:var(--calcite-ui-foreground-1)}:host([non-interactive]) .label,:host([non-interactive]) .icon{pointer-events:none}.icon{margin-block:0px;display:flex;cursor:pointer;align-items:center;padding:0.25rem;color:var(--calcite-ui-brand);flex:0 0 auto;line-height:0}.icon:hover{background-color:var(--calcite-ui-foreground-2)}.icon-dot{display:flex;inline-size:1.5rem;align-items:center;padding:0.5rem}.icon-dot:before{opacity:0;content:\"•\"}.icon calcite-icon{opacity:0}:host([selected]) .icon-dot:before,:host([selected]) .icon calcite-icon{transition:opacity var(--calcite-animation-timing);opacity:1}.text-container{pointer-events:none;display:flex;flex-direction:column;flex-wrap:nowrap;overflow:hidden;padding-block:0.5rem;padding-inline:0.75rem;font-size:var(--calcite-font-size--2);line-height:1.375;word-wrap:break-word;word-break:break-word}.title{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-1)}.description{-webkit-margin-before:0.125rem;margin-block-start:0.125rem;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-ui-text-3)}.actions{margin:0px;display:flex;flex:0 1 auto;align-items:stretch;justify-content:flex-end}.actions--start~.label{-webkit-padding-start:0.25rem;padding-inline-start:0.25rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}";

const PickListItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calciteListItemChange = index.createEvent(this, "calciteListItemChange", 6);
    this.calciteListItemRemove = index.createEvent(this, "calciteListItemRemove", 7);
    this.calciteInternalListItemPropsChange = index.createEvent(this, "calciteInternalListItemPropsChange", 6);
    this.calciteInternalListItemValueChange = index.createEvent(this, "calciteInternalListItemValueChange", 6);
    /**
     * When `true`, interaction is prevented and the component is displayed with lower opacity.
     */
    this.disabled = false;
    /**
     * When `false`, the component cannot be deselected by user interaction.
     */
    this.disableDeselect = false;
    /**
     * @internal
     */
    this.nonInteractive = false;
    /**
     * Determines the icon SVG symbol that will be shown. Options are `"circle"`, `"square"`, `"grip"` or `null`.
     *
     * @see [ICON_TYPES](https://github.com/Esri/calcite-components/blob/master/src/components/pick-list/resources.ts#L5)
     */
    this.icon = null;
    /**
     * When `true`, displays a remove action that removes the item from the list.
     */
    this.removable = false;
    /**
     * When `true`, selects an item. Toggles when an item is checked/unchecked.
     */
    this.selected = false;
    /**
     * When `removable` is `true`, the accessible name for the component's remove button.
     *
     * @default "Remove"
     */
    this.intlRemove = resources.TEXT.remove;
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.pickListClickHandler = (event) => {
      if (this.disabled || (this.disableDeselect && this.selected) || this.nonInteractive) {
        return;
      }
      this.shiftPressed = event.shiftKey;
      this.selected = !this.selected;
    };
    this.pickListKeyDownHandler = (event) => {
      if (event.key === " ") {
        event.preventDefault();
        if ((this.disableDeselect && this.selected) || this.nonInteractive) {
          return;
        }
        this.selected = !this.selected;
      }
    };
    this.removeClickHandler = () => {
      this.calciteListItemRemove.emit();
    };
  }
  descriptionWatchHandler() {
    this.calciteInternalListItemPropsChange.emit();
  }
  labelWatchHandler() {
    this.calciteInternalListItemPropsChange.emit();
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
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    conditionalSlot.connectConditionalSlotComponent(this);
  }
  disconnectedCallback() {
    conditionalSlot.disconnectConditionalSlotComponent(this);
  }
  componentDidRender() {
    interactive.updateHostInteraction(this, this.el.closest("calcite-pick-list") ? "managed" : false);
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
    (_a = this.focusEl) === null || _a === void 0 ? void 0 : _a.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderIcon() {
    const { icon } = this;
    if (!icon) {
      return null;
    }
    return (index.h("span", { class: {
        [resources.CSS.icon]: true,
        [resources.CSS.iconDot]: icon === resources$1.ICON_TYPES.circle
      }, onClick: this.pickListClickHandler }, icon === resources$1.ICON_TYPES.square ? index.h("calcite-icon", { icon: resources.ICONS.checked, scale: "s" }) : null));
  }
  renderRemoveAction() {
    return this.removable ? (index.h("calcite-action", { class: resources.CSS.remove, icon: resources.ICONS.remove, onCalciteActionClick: this.removeClickHandler, slot: resources.SLOTS.actionsEnd, text: this.intlRemove })) : null;
  }
  renderActionsStart() {
    const { el } = this;
    const hasActionsStart = dom.getSlotted(el, resources.SLOTS.actionsStart);
    return hasActionsStart ? (index.h("div", { class: { [resources.CSS.actions]: true, [resources.CSS.actionsStart]: true } }, index.h("slot", { name: resources.SLOTS.actionsStart }))) : null;
  }
  renderActionsEnd() {
    const { el, removable } = this;
    const hasActionsEnd = dom.getSlotted(el, resources.SLOTS.actionsEnd);
    return hasActionsEnd || removable ? (index.h("div", { class: { [resources.CSS.actions]: true, [resources.CSS.actionsEnd]: true } }, index.h("slot", { name: resources.SLOTS.actionsEnd }), this.renderRemoveAction())) : null;
  }
  render() {
    const { description, label } = this;
    return (index.h(index.Fragment, null, this.renderIcon(), this.renderActionsStart(), index.h("label", { "aria-label": label, class: resources.CSS.label, onClick: this.pickListClickHandler, onKeyDown: this.pickListKeyDownHandler, ref: (focusEl) => (this.focusEl = focusEl), tabIndex: 0 }, index.h("div", { "aria-checked": dom.toAriaBoolean(this.selected), class: resources.CSS.textContainer, role: "menuitemcheckbox" }, index.h("span", { class: resources.CSS.title }, label), description ? index.h("span", { class: resources.CSS.description }, description) : null)), this.renderActionsEnd()));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "description": ["descriptionWatchHandler"],
    "label": ["labelWatchHandler"],
    "metadata": ["metadataWatchHandler"],
    "selected": ["selectedWatchHandler"],
    "value": ["valueWatchHandler"]
  }; }
};
PickListItem.style = pickListItemCss;

exports.calcite_pick_list_item = PickListItem;

//# sourceMappingURL=calcite-pick-list-item.cjs.entry.js.map