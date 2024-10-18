/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot.js';
import { a as getSlotted, t as toAriaBoolean } from './dom.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n.js';
import { I as ICON_TYPES } from './resources5.js';
import { l as logger } from './logger.js';
import { d as defineCustomElement$3 } from './action.js';
import { d as defineCustomElement$2 } from './icon.js';
import { d as defineCustomElement$1 } from './loader.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    actions: "actions",
    actionsEnd: "actions--end",
    actionsStart: "actions--start",
    description: "description",
    handle: "handle",
    handleActivated: "handle--activated",
    highlight: "highlight",
    icon: "icon",
    iconDot: "icon-dot",
    label: "label",
    remove: "remove",
    title: "title",
    textContainer: "text-container",
};
const ICONS = {
    checked: "check",
    remove: "x",
};
const SLOTS = {
    actionsEnd: "actions-end",
    actionsStart: "actions-start",
};

const pickListItemCss = "@charset \"UTF-8\";:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{margin:0px;margin-block-end:1px;box-sizing:border-box;display:flex;align-items:stretch;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-1);--tw-shadow:0 1px 0 var(--calcite-color-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition:background-color var(--calcite-animation-timing);animation:calcite-fade-in var(--calcite-animation-timing)}:host *{box-sizing:border-box}.label{display:flex;flex:1 1 auto;cursor:pointer;align-items:center;background-color:transparent;outline-color:transparent}.label:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.label:hover{background-color:var(--calcite-color-foreground-2)}:host([non-interactive]:hover){background-color:var(--calcite-color-foreground-1)}:host([non-interactive]) .label,:host([non-interactive]) .icon{pointer-events:none}.icon{margin-block:0px;display:flex;cursor:pointer;align-items:center;padding:0.25rem;color:var(--calcite-color-brand);flex:0 0 auto;line-height:0}.icon:hover{background-color:var(--calcite-color-foreground-2)}.icon-dot{display:flex;inline-size:1.5rem;align-items:center;padding:0.5rem}.icon-dot::before{opacity:0;content:\"•\"}.icon calcite-icon{opacity:0}:host([selected]) .icon-dot::before,:host([selected]) .icon calcite-icon{transition:opacity var(--calcite-animation-timing);opacity:1}.text-container{pointer-events:none;display:flex;flex-direction:column;flex-wrap:nowrap;overflow:hidden;padding-block:0.5rem;padding-inline:0.75rem;font-size:var(--calcite-font-size--2);line-height:1.375;word-wrap:break-word;word-break:break-word}.title{font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-1)}.description{margin-block-start:0.125rem;font-weight:var(--calcite-font-weight-normal);color:var(--calcite-color-text-3)}.actions{margin:0px;display:flex;flex:0 1 auto;align-items:stretch;justify-content:flex-end}.actions--start~.label{padding-inline-start:0.25rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalcitePickListItemStyle0 = pickListItemCss;

logger.deprecated("component", {
    name: "pick-list-item",
    removalVersion: 3,
    suggested: "list-item",
});
const PickListItem = /*@__PURE__*/ proxyCustomElement(class PickListItem extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
        return (h(InteractiveContainer, { key: '34b2a65973c42d095c5ea0ca712afedaa58c5b63', disabled: this.disabled }, this.renderIcon(), this.renderActionsStart(), h("label", { key: '25476cd75bc12bebcbb7d52dc7fb19c268cf48bf', "aria-label": label, class: CSS.label, onClick: this.pickListClickHandler, onKeyDown: this.pickListKeyDownHandler, ref: (focusEl) => (this.focusEl = focusEl), tabIndex: 0 }, h("div", { key: '2d619c384030ea848bea3f7d1b9d49afcad597ee', "aria-checked": toAriaBoolean(this.selected), class: CSS.textContainer, role: "menuitemcheckbox" }, h("span", { key: '667ae09cd87763d99a76bfaddc715192cd8f72c4', class: CSS.title }, label), description ? h("span", { class: CSS.description }, description) : null)), this.renderActionsEnd()));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
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
    static get style() { return CalcitePickListItemStyle0; }
}, [1, "calcite-pick-list-item", {
        "description": [513],
        "disabled": [516],
        "deselectDisabled": [516, "deselect-disabled"],
        "nonInteractive": [516, "non-interactive"],
        "icon": [513],
        "iconFlipRtl": [516, "icon-flip-rtl"],
        "label": [513],
        "messageOverrides": [1040],
        "messages": [1040],
        "metadata": [16],
        "removable": [516],
        "selected": [1540],
        "value": [8],
        "defaultMessages": [32],
        "effectiveLocale": [32],
        "toggleSelected": [64],
        "setFocus": [64]
    }, undefined, {
        "description": ["descriptionWatchHandler"],
        "label": ["labelWatchHandler"],
        "defaultMessages": ["onMessagesChange"],
        "messageOverrides": ["onMessagesChange"],
        "metadata": ["metadataWatchHandler"],
        "selected": ["selectedWatchHandler"],
        "value": ["valueWatchHandler"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-pick-list-item", "calcite-action", "calcite-icon", "calcite-loader"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-pick-list-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, PickListItem);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { CSS as C, PickListItem as P, SLOTS as S, defineCustomElement as d };
