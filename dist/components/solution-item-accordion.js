/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$f } from './accordion.js';
import { d as defineCustomElement$e } from './accordion-item.js';
import { d as defineCustomElement$d } from './action.js';
import { d as defineCustomElement$c } from './filter2.js';
import { d as defineCustomElement$b } from './handle.js';
import { d as defineCustomElement$a } from './icon.js';
import { d as defineCustomElement$9 } from './input.js';
import { d as defineCustomElement$8 } from './list.js';
import { d as defineCustomElement$7 } from './list-item.js';
import { d as defineCustomElement$6 } from './loader.js';
import { d as defineCustomElement$5 } from './progress.js';
import { d as defineCustomElement$4 } from './scrim.js';
import { d as defineCustomElement$3 } from './stack.js';
import { d as defineCustomElement$2 } from './solution-item-icon2.js';

const solutionItemAccordionCss = ":host{display:block}.padding-start-1{padding-inline-start:1rem}.font-size-override{--calcite-font-size--2:var(--calcite-font-size--1)}";
const SolutionItemAccordionStyle0 = solutionItemAccordionCss;

const SolutionItemAccordion$1 = /*@__PURE__*/ proxyCustomElement(class SolutionItemAccordion extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.templateInfos = [];
        this._sortedTemplateInfos = [];
        this._translations = undefined;
    }
    get el() { return this; }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * string[]: The order we should sort templates based on
     */
    _sortOrder = [
        "Hub Site Application",
        "Hub Page",
        "Web Experience",
        "Instant App",
        "Web Mapping Application",
        "Dashboard",
        "StoryMap",
        "Form",
        "QuickCapture Project",
        "Workflow",
        "Big Data Analytic",
        "Real Time Analytic",
        "Feed",
        "Tool",
        "Notebook",
        "Data Pipeline",
        "Project Package",
        "Desktop Application Template",
        "TypeNotFound",
        "Web Map",
        "Web Scene",
        "Feature Layer (hosted, view)",
        "Feature Layer (hosted)",
        "Tile Layer",
        "CSV",
        "Microsoft Excel",
        "Microsoft Word",
        "Report Template",
        "Rule Package",
        "Group"
    ];
    /**
     * string[]: Array of template types.
     * This array is used during render to ensure only one Accordion item is added for each type.
     */
    _types = [];
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    async templateInfosWatchHandler() {
        this._types = [];
        this._sortedTemplateInfos = this._sortTemplates();
    }
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     */
    async componentWillLoad() {
        await this._getTranslations();
    }
    /**
     * StencilJS: Called before each render
     */
    async componentWillRender() {
        if (this._sortedTemplateInfos.length === 0 && this.templateInfos?.length > 0) {
            this._sortedTemplateInfos = this._sortTemplates();
        }
    }
    /**
     * Renders the component.
     */
    render() {
        return (h(Host, { key: '9a940187b8b91f94346f51cd67cb3c9fd2d8f470' }, this._getAccordion()));
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Get the Accordion component
     *
     * @returns the Accordion component
     *
     * @protected
     */
    _getAccordion() {
        return (h("calcite-accordion", { selectionMode: "single" }, this._sortedTemplateInfos.reduce((prev, cur) => {
            const displayType = this._getTypeForDisplay(cur.type, cur.typeKeywords);
            if (this._types.indexOf(displayType) < 0) {
                this._types.push(displayType);
                prev.push(this._getAccordionItem(cur));
            }
            return prev;
        }, [])));
    }
    /**
     * Get the Accordion Item component with the appropriate icon and template type
     * Only one accordion item per type.
     *
     * @param templateInfo the current templateInfo to handle
     *
     * @returns the Accordion Item component
     *
     * @protected
     */
    _getAccordionItem(templateInfo) {
        const _type = this._getTypeForDisplay(templateInfo.type, templateInfo.typeKeywords);
        const templateInfos = this._sortedTemplateInfos.filter(t => {
            const tType = this._getTypeForDisplay(t.type, t.typeKeywords);
            return tType === _type;
        });
        return (h("calcite-accordion-item", { description: `${_type} (${templateInfos.length})` }, h("solution-item-icon", { class: "padding-start-1", slot: "actions-start", type: templateInfo.type, typeKeywords: templateInfo.typeKeywords }), this._getList(templateInfos)));
    }
    /**
     * Get the list of template infos for the current type
     *
     * @param templateInfos filtered list of templateInfos for the current type
     *
     * @returns the List component
     *
     * @protected
     */
    _getList(templateInfos) {
        const sortedTemplateInfos = this._sortTemplatesByTitle(templateInfos);
        return (h("calcite-list", null, sortedTemplateInfos.map(t => this._getListItem(t))));
    }
    /**
     * Get list item for the current type
     *
     * @param templateInfo the current templateInfo to handle
     *
     * @returns the List item component
     *
     * @protected
     */
    _getListItem(templateInfo) {
        return (h("calcite-list-item", { class: "font-size-override", description: templateInfo.snippet, label: templateInfo.title, value: templateInfo.id }));
    }
    /**
     * Sort the templates based on the title
     *
     * @returns the sorted templates
     *
     * @protected
     */
    _sortTemplatesByTitle(templateInfos) {
        return templateInfos.sort((a, b) => {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
    }
    /**
     * Sort the templates based on the defined order in _sortOrder
     *
     * @returns the sorted templates
     *
     * @protected
     */
    _sortTemplates() {
        return this.templateInfos.sort((a, b) => {
            const aType = this._getTypeForSort(a);
            const bType = this._getTypeForSort(b);
            const indexA = this._sortOrder.indexOf(aType);
            const indexB = this._sortOrder.indexOf(bType);
            return indexA - indexB;
        });
    }
    /**
     * This function will update the type value to match how we would like it sorted.
     *
     * @param templateInfo
     *
     * @returns the sorted templates
     *
     * @protected
     */
    _getTypeForSort(templateInfo) {
        let updatedType = this._getTypeForDisplay(templateInfo.type, templateInfo.typeKeywords);
        if (this._sortOrder.indexOf(updatedType) < 0) {
            // If we encounter an item type that is not in the list
            // put it between the "Desktop Application Template" and "Web Map" section
            updatedType = "TypeNotFound";
        }
        return updatedType;
    }
    /**
     * This function will update the type value to match how we would like it displayed.
     *
     * @param type the current item type
     * @param typeKeywords the type keywords for the current item
     *
     * @returns the updated type value
     *
     * @protected
     */
    _getTypeForDisplay(type, typeKeywords) {
        let _type = type;
        if (type === "Feature Service") {
            _type = typeKeywords.indexOf("View Service") > -1 ?
                "Feature Layer (hosted, view)" : "Feature Layer (hosted)";
        }
        if (type === "Web Mapping Application") {
            _type = typeKeywords.indexOf("configurableApp") > -1 ?
                "Instant App" : _type;
        }
        return _type;
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
    static get watchers() { return {
        "templateInfos": ["templateInfosWatchHandler"]
    }; }
    static get style() { return SolutionItemAccordionStyle0; }
}, [1, "solution-item-accordion", {
        "templateInfos": [16],
        "_sortedTemplateInfos": [32],
        "_translations": [32]
    }, undefined, {
        "templateInfos": ["templateInfosWatchHandler"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["solution-item-accordion", "calcite-accordion", "calcite-accordion-item", "calcite-action", "calcite-filter", "calcite-handle", "calcite-icon", "calcite-input", "calcite-list", "calcite-list-item", "calcite-loader", "calcite-progress", "calcite-scrim", "calcite-stack", "solution-item-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "solution-item-accordion":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SolutionItemAccordion$1);
            }
            break;
        case "calcite-accordion":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-accordion-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-filter":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-input":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-list-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-stack":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "solution-item-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const SolutionItemAccordion = SolutionItemAccordion$1;
const defineCustomElement = defineCustomElement$1;

export { SolutionItemAccordion, defineCustomElement };
