/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './tree.js';
import { d as defineCustomElement$1 } from './tree-item.js';

const solutionOrganizationVariablesCss = ":host{display:block}.container-border{overflow-y:auto}.org-var-header{margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:1rem}";
const SolutionOrganizationVariablesStyle0 = solutionOrganizationVariablesCss;

const SolutionOrganizationVariables = /*@__PURE__*/ proxyCustomElement(class SolutionOrganizationVariables extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.organizationVariableSelected = createEvent(this, "organizationVariableSelected", 7);
        this.value = "";
        this._organizationVariables = [];
        this._translations = undefined;
    }
    get el() { return this; }
    valueWatchHandler() {
        this._organizationVariables = JSON.parse(this.value);
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
        return (h(Host, { key: '0dd925da12c0eb9861637e78d74c75ad4a23c9f3' }, h("div", { key: '324cfdc588fce6ee5a69b7cd54956a0ab0ef0adf' }, h("h4", { key: '2fca69530272a3f0630b86d36bbc78ec651c45d1', class: "org-var-header" }, this._translations.orgVariables)), h("div", { key: '6f05088ebfaf50e4516c634f1a016275f4228c45', class: "container-border" }, h("calcite-tree", { key: '22585bb1a7cae978c3fbf7301d33b81b4fffb540', id: "variable-label" }, this._renderHierarchy(this._organizationVariables)))));
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
    organizationVariableSelected;
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Renders the organization based variable items the user can insert at runtime
     *
     * @param objs a list of organization variables to render
     */
    _renderHierarchy(objs) {
        const hierarchy = objs.map(obj => {
            return (h("calcite-tree-item", { onClick: () => this._treeItemSelected(obj.id, obj.value) }, obj.title));
        });
        return hierarchy;
    }
    /**
     * Publishes the `organizationVariableSelected` event containing `itemId`, the id of the selected variable and the value of the variable.
     *
     * @param itemId Item id as reported by click event
     * @param value Variable id as reported by click event
     */
    _treeItemSelected(itemId, value) {
        this.organizationVariableSelected.emit({
            itemId,
            value
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
        "value": ["valueWatchHandler"]
    }; }
    static get style() { return SolutionOrganizationVariablesStyle0; }
}, [1, "solution-organization-variables", {
        "value": [1537],
        "_organizationVariables": [32],
        "_translations": [32]
    }, undefined, {
        "value": ["valueWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["solution-organization-variables", "calcite-icon", "calcite-tree", "calcite-tree-item"];
    components.forEach(tagName => { switch (tagName) {
        case "solution-organization-variables":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SolutionOrganizationVariables);
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-tree":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-tree-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { SolutionOrganizationVariables as S, defineCustomElement as d };
