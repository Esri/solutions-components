/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { s as state } from './solution-store.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$3 } from './label2.js';
import { d as defineCustomElement$2 } from './switch.js';
import { d as defineCustomElement$1 } from './solution-item-icon2.js';

const solutionItemSharingCss = ":host{display:block}.container-border{padding:1rem}.icon-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";
const SolutionItemSharingStyle0 = solutionItemSharingCss;

const SolutionItemSharing = /*@__PURE__*/ proxyCustomElement(class SolutionItemSharing extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.groupId = "";
        this._translations = undefined;
        this.sharing = [];
    }
    get el() { return this; }
    itemIdWatchHandler() {
        const itemEdit = state.getItemInfo(this.groupId);
        this.sharing = itemEdit.groupDetails;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    async componentWillLoad() {
        return this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '3b94a68c01079f717b1ff38b82f946a32cfcb3a4' }, h("div", { key: 'e2fd74849f827a5e9756182ead2c23b3ef9584b9', class: "container-border" }, h("calcite-label", { key: '4ac7e9adf98368d5f8b985519a8fd9d1ab24d5d6' }, this._translations.groupInfo), this._renderItems(this.sharing))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    async getShareInfo() {
        return this.sharing;
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Render share options based on the list of share details
     *
     * @param objs list of IItemShare objects that are used to expose and store share info for the solutions items
     */
    _renderItems(objs) {
        return objs && objs.length > 0
            ? objs.map(item => {
                return (h("calcite-label", { layout: "inline" }, h("calcite-switch", { checked: item.shareItem, id: item.id, name: "setting", onCalciteSwitchChange: (event) => this._updateItem(event), scale: "m", value: "enabled" }), h("solution-item-icon", { type: item.type, typeKeywords: item.typeKeywords }), h("span", { class: "icon-text", title: item.title }, item.title)));
            })
            : null;
    }
    /**
     * Update the items share prop based on the switch state
     *
     * @param event onCalciteSwitchChange event
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _updateItem(event) {
        const id = event.target.id;
        this.sharing = this.sharing.map((itemShare) => {
            if (itemShare.id === id) {
                // update the item
                itemShare.shareItem = event.target.checked;
                // update the item in the store
                const itemEdit = state.getItemInfo(id);
                if (itemShare.shareItem) {
                    // Add the group to the item if it's not already there
                    if (!itemEdit.groups) {
                        itemEdit.groups = [this.groupId];
                    }
                    else if (itemEdit.groups.indexOf(this.groupId) < 0) {
                        itemEdit.groups.push(this.groupId);
                    }
                }
                else {
                    // Remove the group from the item if it's there
                    if (itemEdit.groups) {
                        const i = itemEdit.groups.indexOf(this.groupId);
                        if (i > -1) {
                            itemEdit.groups.splice(i, 1);
                        }
                    }
                }
                state.setItemInfo(itemEdit);
            }
            return itemShare;
        });
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
    static get watchers() { return {
        "groupId": ["itemIdWatchHandler"]
    }; }
    static get style() { return SolutionItemSharingStyle0; }
}, [1, "solution-item-sharing", {
        "groupId": [1537, "group-id"],
        "_translations": [32],
        "sharing": [32],
        "getShareInfo": [64]
    }, undefined, {
        "groupId": ["itemIdWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["solution-item-sharing", "calcite-label", "calcite-switch", "solution-item-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "solution-item-sharing":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SolutionItemSharing);
            }
            break;
        case "calcite-label":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-switch":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "solution-item-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { SolutionItemSharing as S, defineCustomElement as d };
