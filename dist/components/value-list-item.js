/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot.js';
import { a as getSlotted } from './dom.js';
import { g as guid } from './guid.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable.js';
import { d as defineCustomElement$1, S as SLOTS$1, C as CSS } from './pick-list-item.js';
import { I as ICON_TYPES } from './resources5.js';
import { l as logger } from './logger.js';
import { d as defineCustomElement$4 } from './action.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './loader.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const ICONS = {
    drag: "drag",
};
const SLOTS = {
    actionsEnd: "actions-end",
    actionsStart: "actions-start",
};

const valueListItemCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{margin-block-end:1px;box-sizing:border-box;display:flex;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);color:var(--calcite-color-text-2);--tw-shadow:0 1px 0 var(--calcite-color-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transition:background-color var(--calcite-animation-timing), box-shadow var(--calcite-animation-timing)}:host *{box-sizing:border-box}calcite-pick-list-item{position:relative;margin:0px;flex-grow:1;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([active]),:host([selected]){--tw-shadow:0 0 0 1px var(--calcite-color-brand);--tw-shadow-colored:0 0 0 1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.handle{display:flex;cursor:move;align-items:center;justify-content:center;border-style:none;background-color:transparent;padding-block:0px;padding-inline:0.25rem;color:var(--calcite-color-border-input);outline-color:transparent}.handle:hover{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1)}.handle:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.handle--activated{background-color:var(--calcite-color-foreground-3);color:var(--calcite-color-text-1)}.handle calcite-icon{color:inherit}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteValueListItemStyle0 = valueListItemCss;

logger.deprecated("component", {
    name: "value-list-item",
    removalVersion: 3,
    suggested: "list-item",
});
const ValueListItem = /*@__PURE__*/ proxyCustomElement(class ValueListItem extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteListItemChange = createEvent(this, "calciteListItemChange", 6);
        this.calciteListItemRemove = createEvent(this, "calciteListItemRemove", 7);
        this.calciteValueListItemDragHandleBlur = createEvent(this, "calciteValueListItemDragHandleBlur", 6);
        this.pickListItem = null;
        this.guid = `calcite-value-list-item-${guid()}`;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.getPickListRef = (el) => (this.pickListItem = el);
        this.handleKeyDown = (event) => {
            if (event.key === " ") {
                this.handleActivated = !this.handleActivated;
            }
        };
        this.handleBlur = () => {
            this.handleActivated = false;
            this.calciteValueListItemDragHandleBlur.emit({ item: this.el, handle: this.handleEl });
        };
        this.handleSelectChange = (event) => {
            this.selected = event.detail.selected;
        };
        this.description = undefined;
        this.disabled = false;
        this.deselectDisabled = false;
        this.nonInteractive = false;
        this.handleActivated = false;
        this.icon = null;
        this.iconFlipRtl = false;
        this.label = undefined;
        this.metadata = undefined;
        this.removable = false;
        this.selected = false;
        this.value = undefined;
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectConditionalSlotComponent(this);
    }
    disconnectedCallback() {
        disconnectConditionalSlotComponent(this);
    }
    componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
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
     * Toggle the selection state. By default this won't trigger an event.
     * The first argument allows the value to be coerced, rather than swapping values.
     *
     * @param coerce
     */
    async toggleSelected(coerce) {
        this.pickListItem.toggleSelected(coerce);
    }
    /** Set focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        return this.pickListItem?.setFocus();
    }
    calciteListItemChangeHandler(event) {
        // adjust item payload from wrapped item before bubbling
        event.detail.item = this.el;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderActionsEnd() {
        const { el } = this;
        const hasActionsEnd = getSlotted(el, SLOTS.actionsEnd);
        return hasActionsEnd ? (h("slot", { name: SLOTS.actionsEnd, slot: SLOTS$1.actionsEnd })) : null;
    }
    renderActionsStart() {
        const { el } = this;
        const hasActionsStart = getSlotted(el, SLOTS.actionsStart);
        return hasActionsStart ? (h("slot", { name: SLOTS.actionsStart, slot: SLOTS$1.actionsStart })) : null;
    }
    renderHandle() {
        const { icon, iconFlipRtl } = this;
        if (icon === ICON_TYPES.grip) {
            return (h("span", { class: {
                    [CSS.handle]: true,
                    [CSS.handleActivated]: this.handleActivated,
                }, "data-js-handle": true, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown, ref: (el) => (this.handleEl = el), role: "button", tabindex: "0" }, h("calcite-icon", { flipRtl: iconFlipRtl, icon: ICONS.drag, scale: "s" })));
        }
    }
    render() {
        return (h(Host, { key: '2fc2a1a70b75c2a812f14391915c06c852db8906', id: this.el.id || this.guid }, h(InteractiveContainer, { key: '7bcc26a8f85923865a318dbdf31954a62035b853', disabled: this.disabled }, this.renderHandle(), h("calcite-pick-list-item", { key: 'abdbbafe6d426da62e39584e85111811beae719b', description: this.description, deselectDisabled: this.deselectDisabled, disabled: this.disabled, label: this.label, metadata: this.metadata, nonInteractive: this.nonInteractive, onCalciteListItemChange: this.handleSelectChange, ref: this.getPickListRef, removable: this.removable, selected: this.selected, value: this.value }, this.renderActionsStart(), this.renderActionsEnd()))));
    }
    get el() { return this; }
    static get style() { return CalciteValueListItemStyle0; }
}, [1, "calcite-value-list-item", {
        "description": [513],
        "disabled": [516],
        "deselectDisabled": [4, "deselect-disabled"],
        "nonInteractive": [516, "non-interactive"],
        "handleActivated": [1028, "handle-activated"],
        "icon": [513],
        "iconFlipRtl": [516, "icon-flip-rtl"],
        "label": [513],
        "metadata": [16],
        "removable": [516],
        "selected": [1540],
        "value": [8],
        "toggleSelected": [64],
        "setFocus": [64]
    }, [[0, "calciteListItemChange", "calciteListItemChangeHandler"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-value-list-item", "calcite-action", "calcite-icon", "calcite-loader", "calcite-pick-list-item"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-value-list-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, ValueListItem);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-pick-list-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { ValueListItem as V, defineCustomElement as d };
