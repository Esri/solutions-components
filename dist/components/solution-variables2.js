/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './tree.js';
import { d as defineCustomElement$2 } from './tree-item.js';
import { d as defineCustomElement$1 } from './solution-item-icon2.js';

const solutionVariablesCss = ":host{display:block}.container-border{overflow-y:hidden}.org-var-header{margin-top:1rem;margin-bottom:1rem;margin-left:0px;margin-right:0px}.icon-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}";
const SolutionVariablesStyle0 = solutionVariablesCss;

const SolutionVariables = /*@__PURE__*/ proxyCustomElement(class SolutionVariables extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.solutionVariableSelected = createEvent(this, "solutionVariableSelected", 7);
        this.value = "";
        this._solutionVariables = [];
        this._translations = undefined;
    }
    get el() { return this; }
    valueWatchHandler() {
        this._solutionVariables = JSON.parse(this.value);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    componentWillLoad() {
        return this._getTranslations();
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: 'a600c4dc88ee4ea3f9d7810695f71283f834933b' }, h("div", { key: 'c5c2abd0d19c778366c04dfd6b04f26bcb86b59b' }, h("h4", { key: '087db039abd818f71838c88ef09eafc46d18b5c8', class: "org-var-header" }, this._translations.solVariables)), h("div", { key: 'd524981a512342d18d616137c7951f7c0f3f870b', class: "container-border" }, h("calcite-tree", { key: '4630d4aa5a35d3e3a173e3aaae9b35b0dd636b4f', id: "variable-label" }, this._renderHierarchy(this._solutionVariables)))));
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
    solutionVariableSelected;
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
     * Render the solution item variables that the user can insert into temaplates at runtime.
     *
     * @param objs a list of variable items that have been gathered from the solutions templates
     */
    _renderHierarchy(objs) {
        const hierarchy = objs.map(obj => {
            return obj.dependencies && obj.dependencies.length > 0 ? (h("calcite-tree-item", { onClick: (evt) => this._toggleExpand(evt) }, h("solution-item-icon", { type: obj.type }), h("span", { class: "icon-text", title: obj.title }, obj.title), h("calcite-tree", { slot: "children" }, this._renderHierarchy(obj.dependencies)))) : (h("calcite-tree-item", { onClick: () => this._treeItemSelected(obj.id, obj.value) }, obj.title));
        });
        return hierarchy;
    }
    /**
     * Publishes the `solutionVariableSelected` event containing `itemId`, the id of the selected variable and the value of the variable.
     *
     * @param id Item id as reported by click event
     * @param value Variable id as reported by click event
     */
    _treeItemSelected(id, value) {
        this.solutionVariableSelected.emit({
            itemId: id,
            value
        });
    }
    /**
     * Toggle the tree item that was clicked
     *
     * @param evt the clicks mouse event
     */
    _toggleExpand(evt = undefined) {
        const treeItem = evt?.target?.closest("calcite-tree-item");
        if (treeItem) {
            treeItem.expanded = !treeItem.expanded;
        }
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
    static get style() { return SolutionVariablesStyle0; }
}, [1, "solution-variables", {
        "value": [1537],
        "_solutionVariables": [32],
        "_translations": [32]
    }, undefined, {
        "value": ["valueWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["solution-variables", "calcite-icon", "calcite-tree", "calcite-tree-item", "solution-item-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "solution-variables":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SolutionVariables);
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-tree":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-tree-item":
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

export { SolutionVariables as S, defineCustomElement as d };
