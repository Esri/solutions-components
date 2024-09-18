/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { s as state } from './solution-store.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$g } from './action.js';
import { d as defineCustomElement$f } from './action-menu.js';
import { d as defineCustomElement$e } from './button.js';
import { d as defineCustomElement$d } from './icon.js';
import { d as defineCustomElement$c } from './loader.js';
import { d as defineCustomElement$b } from './panel.js';
import { d as defineCustomElement$a } from './popover.js';
import { d as defineCustomElement$9 } from './scrim.js';
import { d as defineCustomElement$8 } from './shell.js';
import { d as defineCustomElement$7 } from './shell-panel.js';
import { d as defineCustomElement$6 } from './tree.js';
import { d as defineCustomElement$5 } from './tree-item.js';
import { d as defineCustomElement$4 } from './json-editor2.js';
import { d as defineCustomElement$3 } from './solution-item-icon2.js';
import { d as defineCustomElement$2 } from './solution-organization-variables2.js';
import { d as defineCustomElement$1 } from './solution-variables2.js';

const solutionTemplateDataCss = ":host{display:flexbox}.solution-data-container{position:absolute;height:-moz-available;height:calc(100% - 48px);height:-webkit-fill-available;height:stretch;width:-moz-available;width:100%;width:-webkit-fill-available;width:stretch}.solution-data-child-container{display:flex;height:100%;width:100%;flex-direction:column;overflow-y:auto}.solution-data-editor-container{height:100%}.solution-data-child-container-collapsed{display:flex;height:100%;flex-direction:column;overflow:auto;width:50px}.inputBottomSeparation{margin-left:0px;margin-right:0px;margin-top:0px;margin-bottom:1.5rem}.json-editor{margin:1rem;width:auto;width:-webkit-fill-available -moz-available}.collapse-btn{padding-left:1rem;padding-right:1rem;padding-top:1rem;padding-bottom:0px}.org-vars{padding-left:1rem;padding-right:1rem;padding-top:1rem;padding-bottom:0px}.sol-vars{padding-top:0px;padding-bottom:0px;padding-left:1rem;padding-right:1rem;min-height:45%}.padding-1{padding:1rem}.light{background-color:#F4F4F4}";
const SolutionTemplateDataStyle0 = solutionTemplateDataCss;

const SolutionTemplateData = /*@__PURE__*/ proxyCustomElement(class SolutionTemplateData extends HTMLElement {
    get el() { return this; }
    itemIdWatchHandler() {
        this._initializing = true;
        this.value = JSON.stringify(this.instanceid === "data"
            ? state.getItemInfo(this.itemId).data
            : state.getItemInfo(this.itemId).properties, null, 2);
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    constructor() {
        super();
        this.__registerHost();
        this.instanceid = "";
        this.itemId = "";
        this.organizationVariables = "";
        this.solutionVariables = "";
        this.varsOpen = true;
        this._translations = undefined;
        this.value = "";
        window.addEventListener("solutionEditorContentChanged", (evt) => {
            if (this.itemId) {
                const { id, contents } = evt.detail;
                const [itemId, instanceId] = id.split("|");
                if (itemId == this.itemId && instanceId === this.instanceid) {
                    if (!this._initializing && contents.length > 0) {
                        const itemEdit = state.getItemInfo(itemId);
                        if (instanceId === "data") {
                            itemEdit.data = JSON.parse(contents);
                        }
                        else {
                            itemEdit.properties = JSON.parse(contents);
                        }
                        state.setItemInfo(itemEdit);
                    }
                    this._initializing = false;
                }
            }
        });
    }
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
        return (h(Host, { key: '719601ce314da8b957f2eebb7c4a05489ae14d0e' }, h("div", { key: 'e712c532d0568494ae3dce6d08bfbb11d260fabb', class: "solution-data-container" }, h("calcite-shell", { key: '782031ce7fdf79fb51197988145524a5846e8388', class: "light var-container", dir: "ltr" }, h("calcite-panel", { key: '945a9f91f45e70279eea5f765fe76f2e835a4520', class: "json-editor" }, h("div", { key: '306980a78f84ba3ff3694314d5da9e1ced288f10', class: "solution-data-child-container calcite-match-height" }, h("json-editor", { key: 'df02c424a6abe7ca96e85063e947a072a8a147f3', class: "solution-data-editor-container", instanceid: this.itemId + "|" + this.instanceid, value: this.value }))), h("calcite-shell-panel", { key: '1dc03b9cdedecafa5393a9ae39767311618c697b', "height-scale": "l", position: "end", slot: "contextual-panel", "width-scale": "xs" }, h("div", { key: 'c860608f30e60529d990f10077aef88af7f97d18', class: this.varsOpen ? "solution-data-child-container" : "solution-data-child-container-collapsed" }, h("calcite-button", { key: '6a73213cbd8f5741434fa3ac6bf40c6912432a15', appearance: "transparent", class: "collapse-btn", "icon-start": this.varsOpen ? "chevrons-right" : "chevrons-left", id: "collapse-vars", onClick: () => this._toggleVars(), scale: "s", title: this.varsOpen ? this._translations.collapse : this._translations.expand }), h("div", { key: '9c343fe75a40e017ea8f63a3e0a2417ef444a319', class: this.varsOpen ? "org-vars" : "org-vars display-none", id: "orgVars" }, h("solution-organization-variables", { key: '5138e9cba2e3ad4ea9df59c0e2e74fbba2dc01be', value: this.organizationVariables })), h("div", { key: '402a0a71056acc4214f2376c5f64e7971322bf55', class: this.varsOpen ? "sol-vars" : "sol-vars display-none", id: "solVars" }, h("solution-variables", { key: '68753d13ad8ca0087359e371a11a0755ea43ebac', value: this.solutionVariables }))))))));
    }
    _initializing = false;
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
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Toggle varsOpen prop to show/hide variable containers
     */
    _toggleVars() {
        this.varsOpen = !this.varsOpen;
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
        "itemId": ["itemIdWatchHandler"]
    }; }
    static get style() { return SolutionTemplateDataStyle0; }
}, [0, "solution-template-data", {
        "instanceid": [1537],
        "itemId": [1537, "item-id"],
        "organizationVariables": [1537, "organization-variables"],
        "solutionVariables": [1537, "solution-variables"],
        "varsOpen": [1540, "vars-open"],
        "_translations": [32],
        "value": [32]
    }, undefined, {
        "itemId": ["itemIdWatchHandler"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["solution-template-data", "calcite-action", "calcite-action-menu", "calcite-button", "calcite-icon", "calcite-loader", "calcite-panel", "calcite-popover", "calcite-scrim", "calcite-shell", "calcite-shell-panel", "calcite-tree", "calcite-tree-item", "json-editor", "solution-item-icon", "solution-organization-variables", "solution-variables"];
    components.forEach(tagName => { switch (tagName) {
        case "solution-template-data":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, SolutionTemplateData);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-panel":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-shell":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-shell-panel":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-tree":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-tree-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "json-editor":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "solution-item-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "solution-organization-variables":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "solution-variables":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { SolutionTemplateData as S, defineCustomElement as d };
