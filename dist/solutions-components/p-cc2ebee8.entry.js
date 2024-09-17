/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, g as getElement } from './p-6eb37ed2.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './p-06084e6c.js';
import { g as getSlotted, t as toAriaBoolean } from './p-68ec5c15.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './p-415cf05e.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './p-18f18ab3.js';
import { c as connectLocalized, d as disconnectLocalized } from './p-939bc1b4.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './p-1a9a47a0.js';
import { I as ICON_TYPES } from './p-01df774b.js';
import { l as logger } from './p-b1bc21ac.js';
import { I as ICONS, C as CSS, S as SLOTS } from './p-afcd5996.js';
import './p-c638d28e.js';
import './p-acaae81d.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';
import './p-fe6f7734.js';
import './p-aeb86188.js';

const pickListItemCss = "@charset \"UTF-8\";:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{margin:0px;margin-block-end:1px;box-sizing:border-box;display:flex;align-items:stretch;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-1);--tw-shadow:0 1px 0 var(--calcite-color-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition:background-color var(--calcite-animation-timing);animation:calcite-fade-in var(--calcite-animation-timing)}:host *{box-sizing:border-box}.label{display:flex;flex:1 1 auto;cursor:pointer;align-items:center;background-color:transparent;outline-color:transparent}.label:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.label:hover{background-color:var(--calcite-color-foreground-2)}:host([non-interactive]:hover){background-color:var(--calcite-color-foreground-1)}:host([non-interactive]) .label,:host([non-interactive]) .icon{pointer-events:none}.icon{margin-block:0px;display:flex;cursor:pointer;align-items:center;padding:0.25rem;color:var(--calcite-color-brand);flex:0 0 auto;line-height:0}.icon:hover{background-color:var(--calcite-color-foreground-2)}.icon-dot{display:flex;inline-size:1.5rem;align-items:center;padding:0.5rem}.icon-dot::before{opacity:0;content:\"•\"}.icon calcite-icon{opacity:0}:host([selected]) .icon-dot::before,:host([selected]) .icon calcite-icon{transition:opacity var(--calcite-animation-timing);opacity:1}.text-container{pointer-events:none;display:flex;flex-direction:column;flex-wrap:nowrap;overflow:hidden;padding-block:0.5rem;padding-inline:0.75rem;font-size:var(--calcite-font-size--2);line-height:1.375;word-wrap:break-word;word-break:break-word}.title{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-1)}.description{margin-block-start:0.125rem;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-3)}.actions{margin:0px;display:flex;flex:0 1 auto;align-items:stretch;justify-content:flex-end}.actions--start~.label{padding-inline-start:0.25rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalcitePickListItemStyle0 = pickListItemCss;

logger.deprecated("component", {
    name: "pick-list-item",
    removalVersion: 3,
    suggested: "list-item",
});
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
            shiftPressed: this.shiftPressed,
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
        connectInteractive(this);
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
        disconnectInteractive(this);
        disconnectLocalized(this);
        disconnectMessages(this);
        disconnectConditionalSlotComponent(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
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
        await componentFocusable(this);
        this.focusEl?.focus();
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
                [CSS.iconDot]: icon === ICON_TYPES.circle,
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
        return (h(InteractiveContainer, { key: '11397cbf6035e4f15e4d180bbd97296af3e1cd29', disabled: this.disabled }, this.renderIcon(), this.renderActionsStart(), h("label", { key: '0c61b5554c54e84fe097c7a52e64206032443d74', "aria-label": label, class: CSS.label, onClick: this.pickListClickHandler, onKeyDown: this.pickListKeyDownHandler, ref: (focusEl) => (this.focusEl = focusEl), tabIndex: 0 }, h("div", { key: '8846e2bc50f2e12a57d7cfe885b3798c0d79c03c', "aria-checked": toAriaBoolean(this.selected), class: CSS.textContainer, role: "menuitemcheckbox" }, h("span", { key: '79112c39b73b2453cec22e234cea66e4f8bb832d', class: CSS.title }, label), description ? h("span", { class: CSS.description }, description) : null)), this.renderActionsEnd()));
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
PickListItem.style = CalcitePickListItemStyle0;

export { PickListItem as calcite_pick_list_item };
