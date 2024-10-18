/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules2.js';

const instantAppsControlPanelCss = ":host{display:block}";
const InstantAppsControlPanelStyle0 = instantAppsControlPanelCss;

const MODE = 'floating';
const GROUP = 'instant-apps-control-panel';
const BORDER = 'border-bottom: 1px solid var(--calcite-color-border-3)';
const SLOT_NAME = 'components';
const SLOT_SELECTOR = `[slot="${SLOT_NAME}"]`;
const InstantAppsControlPanel$1 = /*@__PURE__*/ proxyCustomElement(class InstantAppsControlPanel extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.components = [];
        this.view = undefined;
    }
    async componentWillLoad() {
        const [Expand] = await loadModules(['esri/widgets/Expand']);
        this.Expand = Expand;
        this._handleComponents();
    }
    componentWillUpdate() {
        this._handleComponents();
    }
    render() {
        return (h(Host, { key: '45edbd93de055768fb4b58e9d12a7570d24bdd22' }, h("slot", { key: '47d507e456dfc86a068948280b21386bc08e735c', name: SLOT_NAME })));
    }
    _handleComponents() {
        const componentsNode = this._getComponentsNode();
        if (componentsNode) {
            this._resetUI(componentsNode);
            this._attachComponents(componentsNode);
        }
    }
    _attachComponents(componentsNode) {
        this.components.forEach(this._attachmentComponent(componentsNode));
    }
    _attachmentComponent(componentsNode) {
        return (component, index) => {
            let content = component.content;
            // Check if component isExpand widget, if so, create expande widget
            if (component.isExpand) {
                content = this._getExpand(component);
                if (component.expandIcon)
                    content.expandIcon = component.expandIcon;
                if (component.collapseTooltip)
                    content.collapseTooltip = component.collapseTooltip;
                if (component.expandTooltip)
                    content.expandTooltip = component.expandTooltip;
            }
            // Check if dom node exists, if not create dom node
            if (!content.container)
                content.container = document.createElement('div');
            // Append dom node to slot element
            componentsNode === null || componentsNode === void 0 ? void 0 : componentsNode.appendChild(content.container);
            // Create border for all components but last
            const isNotLast = index !== this.components.length - 1;
            if (isNotLast)
                content.container.style = BORDER;
        };
    }
    _getExpand(component) {
        var _a;
        const { view } = this;
        const { content } = component;
        const expanded = (_a = component === null || component === void 0 ? void 0 : component.expanded) !== null && _a !== void 0 ? _a : false;
        return new this.Expand({ content, view, expanded, mode: MODE, group: GROUP });
    }
    _getComponentsNode() {
        const selector = SLOT_SELECTOR;
        return this.el.querySelector(selector);
    }
    _resetUI(componentsNode) {
        const hasChildren = componentsNode.children.length > 0;
        if (hasChildren) {
            const { firstChild } = componentsNode;
            while (firstChild) {
                componentsNode.removeChild(firstChild);
            }
        }
    }
    get el() { return this; }
    static get style() { return InstantAppsControlPanelStyle0; }
}, [1, "instant-apps-control-panel", {
        "components": [16],
        "view": [16]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-control-panel"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-control-panel":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsControlPanel$1);
            }
            break;
    } });
}
defineCustomElement$1();

const InstantAppsControlPanel = InstantAppsControlPanel$1;
const defineCustomElement = defineCustomElement$1;

export { InstantAppsControlPanel, defineCustomElement };
