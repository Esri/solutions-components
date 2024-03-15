/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const conditionalSlot = require('./conditionalSlot-9d7b60d1.js');
const dom = require('./dom-c9c2c835.js');
const interactive = require('./interactive-3ab7044d.js');
const loadable = require('./loadable-5a794992.js');
const locale = require('./locale-d237c9d5.js');
const t9n = require('./t9n-993a84de.js');
const resources = require('./resources-baef554d.js');
const resources$1 = require('./resources-1d88e9d6.js');
require('./observers-db4527e4.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./browser-d08a5f99.js');
require('./key-c5504030.js');

const pickListItemCss = "@charset \"UTF-8\";:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{margin:0px;margin-block-end:1px;box-sizing:border-box;display:flex;align-items:stretch;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-1);--tw-shadow:0 1px 0 var(--calcite-color-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition:background-color var(--calcite-animation-timing);animation:calcite-fade-in var(--calcite-animation-timing)}:host *{box-sizing:border-box}.label{display:flex;flex:1 1 auto;cursor:pointer;align-items:center;background-color:transparent;outline-color:transparent}.label:focus{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.label:hover{background-color:var(--calcite-color-foreground-2)}:host([non-interactive]:hover){background-color:var(--calcite-color-foreground-1)}:host([non-interactive]) .label,:host([non-interactive]) .icon{pointer-events:none}.icon{margin-block:0px;display:flex;cursor:pointer;align-items:center;padding:0.25rem;color:var(--calcite-color-brand);flex:0 0 auto;line-height:0}.icon:hover{background-color:var(--calcite-color-foreground-2)}.icon-dot{display:flex;inline-size:1.5rem;align-items:center;padding:0.5rem}.icon-dot:before{opacity:0;content:\"•\"}.icon calcite-icon{opacity:0}:host([selected]) .icon-dot:before,:host([selected]) .icon calcite-icon{transition:opacity var(--calcite-animation-timing);opacity:1}.text-container{pointer-events:none;display:flex;flex-direction:column;flex-wrap:nowrap;overflow:hidden;padding-block:0.5rem;padding-inline:0.75rem;font-size:var(--calcite-font-size--2);line-height:1.375;word-wrap:break-word;word-break:break-word}.title{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-1)}.description{margin-block-start:0.125rem;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-3)}.actions{margin:0px;display:flex;flex:0 1 auto;align-items:stretch;justify-content:flex-end}.actions--start~.label{padding-inline-start:0.25rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";

const PickListItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteListItemChange = index.createEvent(this, "calciteListItemChange", 6);
        this.calciteListItemRemove = index.createEvent(this, "calciteListItemRemove", 7);
        this.calciteInternalListItemPropsChange = index.createEvent(this, "calciteInternalListItemPropsChange", 6);
        this.calciteInternalListItemValueChange = index.createEvent(this, "calciteInternalListItemValueChange", 6);
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
            shiftPressed: this.shiftPressed,
        });
        this.shiftPressed = false;
    }
    valueWatchHandler(newValue, oldValue) {
        this.calciteInternalListItemValueChange.emit({ oldValue, newValue });
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        interactive.connectInteractive(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        conditionalSlot.connectConditionalSlotComponent(this);
    }
    async componentWillLoad() {
        await t9n.setUpMessages(this);
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        conditionalSlot.disconnectConditionalSlotComponent(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
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
        await loadable.componentFocusable(this);
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
        return (index.h("span", { class: {
                [resources$1.CSS.icon]: true,
                [resources$1.CSS.iconDot]: icon === resources.ICON_TYPES.circle,
            }, onClick: this.pickListClickHandler }, icon === resources.ICON_TYPES.square ? (index.h("calcite-icon", { flipRtl: iconFlipRtl, icon: resources$1.ICONS.checked, scale: "s" })) : null));
    }
    renderRemoveAction() {
        return this.removable ? (index.h("calcite-action", { class: resources$1.CSS.remove, icon: resources$1.ICONS.remove, onClick: this.removeClickHandler, slot: resources$1.SLOTS.actionsEnd, text: this.messages.remove })) : null;
    }
    renderActionsStart() {
        const { el } = this;
        const hasActionsStart = dom.getSlotted(el, resources$1.SLOTS.actionsStart);
        return hasActionsStart ? (index.h("div", { class: { [resources$1.CSS.actions]: true, [resources$1.CSS.actionsStart]: true } }, index.h("slot", { name: resources$1.SLOTS.actionsStart }))) : null;
    }
    renderActionsEnd() {
        const { el, removable } = this;
        const hasActionsEnd = dom.getSlotted(el, resources$1.SLOTS.actionsEnd);
        return hasActionsEnd || removable ? (index.h("div", { class: { [resources$1.CSS.actions]: true, [resources$1.CSS.actionsEnd]: true } }, index.h("slot", { name: resources$1.SLOTS.actionsEnd }), this.renderRemoveAction())) : null;
    }
    render() {
        const { description, label } = this;
        return (index.h(interactive.InteractiveContainer, { disabled: this.disabled }, this.renderIcon(), this.renderActionsStart(), index.h("label", { "aria-label": label, class: resources$1.CSS.label, onClick: this.pickListClickHandler, onKeyDown: this.pickListKeyDownHandler, tabIndex: 0,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (focusEl) => (this.focusEl = focusEl) }, index.h("div", { "aria-checked": dom.toAriaBoolean(this.selected), class: resources$1.CSS.textContainer, role: "menuitemcheckbox" }, index.h("span", { class: resources$1.CSS.title }, label), description ? index.h("span", { class: resources$1.CSS.description }, description) : null)), this.renderActionsEnd()));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
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

exports.calcite_pick_list_item = PickListItem;
