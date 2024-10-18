/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as createObserver } from './observers.js';
import { C as CSS } from './resources3.js';

const dropdownGroupCss = ":host{position:relative;display:block}.container{text-align:start}.dropdown-title{margin-block-end:-1px;display:block;cursor:default;overflow-wrap:break-word;border-width:0px;border-block-end-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-2)}.dropdown-separator{display:block;block-size:1px;background-color:var(--calcite-color-border-3)}:host([scale=s]){font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .dropdown-title{padding:0.5rem}:host([scale=m]){font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .dropdown-title{padding:0.75rem}:host([scale=l]){font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .dropdown-title{padding:1rem}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteDropdownGroupStyle0 = dropdownGroupCss;

const DropdownGroup = /*@__PURE__*/ proxyCustomElement(class DropdownGroup extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteInternalDropdownItemChange = createEvent(this, "calciteInternalDropdownItemChange", 6);
        this.updateItems = () => {
            Array.from(this.el.querySelectorAll("calcite-dropdown-item")).forEach((item) => (item.selectionMode = this.selectionMode));
        };
        this.mutationObserver = createObserver("mutation", () => this.updateItems());
        this.groupTitle = undefined;
        this.scale = "m";
        this.selectionMode = "single";
    }
    handlePropsChange() {
        this.updateItems();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.updateItems();
        this.mutationObserver?.observe(this.el, { childList: true });
    }
    componentWillLoad() {
        this.groupPosition = this.getGroupPosition();
    }
    disconnectedCallback() {
        this.mutationObserver?.disconnect();
    }
    render() {
        const groupTitle = this.groupTitle ? (h("span", { "aria-hidden": "true", class: "dropdown-title" }, this.groupTitle)) : null;
        const dropdownSeparator = this.groupPosition > 0 ? h("div", { class: "dropdown-separator", role: "separator" }) : null;
        return (h(Host, { key: 'f41943751aefdb17d4f5d5bd8778c219cfd01a00', "aria-label": this.groupTitle, role: "group" }, h("div", { key: '87b78040b93c06081ca8282a785d466ed8fcf334', class: {
                [CSS.container]: true,
            } }, dropdownSeparator, groupTitle, h("slot", { key: 'f635a5bdbe439315eba6292a4858cbd8519d23d1' }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    updateActiveItemOnChange(event) {
        this.requestedDropdownGroup = event.detail.requestedDropdownGroup;
        this.requestedDropdownItem = event.detail.requestedDropdownItem;
        this.calciteInternalDropdownItemChange.emit({
            requestedDropdownGroup: this.requestedDropdownGroup,
            requestedDropdownItem: this.requestedDropdownItem,
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    getGroupPosition() {
        return Array.prototype.indexOf.call(this.el.parentElement.querySelectorAll("calcite-dropdown-group"), this.el);
    }
    static get delegatesFocus() { return true; }
    get el() { return this; }
    static get watchers() { return {
        "selectionMode": ["handlePropsChange"]
    }; }
    static get style() { return CalciteDropdownGroupStyle0; }
}, [17, "calcite-dropdown-group", {
        "groupTitle": [513, "group-title"],
        "scale": [513],
        "selectionMode": [513, "selection-mode"]
    }, [[0, "calciteInternalDropdownItemSelect", "updateActiveItemOnChange"]], {
        "selectionMode": ["handlePropsChange"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-dropdown-group"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-dropdown-group":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, DropdownGroup);
            }
            break;
    } });
}
defineCustomElement();

export { DropdownGroup as D, defineCustomElement as d };
