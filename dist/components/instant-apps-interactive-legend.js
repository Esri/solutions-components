/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, forceUpdate, h } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules2.js';
import { g as getMessages } from './locale3.js';
import { g as getTheme } from './helpers.js';
import { d as defineCustomElement$e } from './action.js';
import { d as defineCustomElement$d } from './button.js';
import { d as defineCustomElement$c } from './icon.js';
import { d as defineCustomElement$b } from './loader.js';
import { d as defineCustomElement$a } from './tooltip.js';
import { d as defineCustomElement$9 } from './instant-apps-interactive-legend-classic2.js';
import { d as defineCustomElement$8 } from './instant-apps-interactive-legend-count2.js';
import { d as defineCustomElement$7 } from './instant-apps-interactive-legend-group-legend-element2.js';
import { d as defineCustomElement$6 } from './instant-apps-interactive-legend-layer-element2.js';
import { d as defineCustomElement$5 } from './instant-apps-interactive-legend-layer-element-caption2.js';
import { d as defineCustomElement$4 } from './instant-apps-interactive-legend-legend-element2.js';
import { d as defineCustomElement$3 } from './instant-apps-interactive-legend-legend-element-caption2.js';
import { d as defineCustomElement$2 } from './instant-apps-interactive-legend-relationship2.js';

const instantAppsInteractiveLegendCss = ".sc-instant-apps-interactive-legend-h{display:block;height:100%}.sc-instant-apps-interactive-legend-h .esri-legend.sc-instant-apps-interactive-legend{height:100%;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-1)}.sc-instant-apps-interactive-legend-h .esri-legend.esri-component.esri-widget.esri-widget--panel.sc-instant-apps-interactive-legend{margin:0}";
const InstantAppsInteractiveLegendStyle0 = instantAppsInteractiveLegendCss;

const CSS = {
    esri: {
        base: 'esri-legend',
        widget: 'esri-widget',
        widgetPanel: 'esri-widget--panel',
        component: 'esri-component',
        iconLayerList: 'esri-icon-layer-list',
    },
};
const InstantAppsInteractiveLegend$1 = /*@__PURE__*/ proxyCustomElement(class InstantAppsInteractiveLegend extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.handles = undefined;
        this.reactiveUtils = undefined;
        this.legendvm = undefined;
        this.widget = undefined;
        this.view = undefined;
        this.zoomTo = false;
        this.featureCount = false;
        this.filterMode = {
            type: 'filter',
        };
        this.messages = undefined;
    }
    async componentWillLoad() {
        const observer = new MutationObserver(() => {
            forceUpdate(this.el);
        });
        observer.observe(this.el, {
            attributes: true,
        });
        await this.initializeModules();
    }
    async componentDidLoad() {
        getMessages(this);
    }
    async initializeModules() {
        const [Handles, reactiveUtils, Widget, Legend] = await loadModules(['esri/core/Handles', 'esri/core/reactiveUtils', 'esri/widgets/Widget', 'esri/widgets/Legend']);
        this.handles = new Handles();
        this.reactiveUtils = reactiveUtils;
        this.widget = new Widget();
        const legend = new Legend();
        await reactiveUtils.whenOnce(() => legend === null || legend === void 0 ? void 0 : legend.messages);
        this.messages = Object.assign(Object.assign({}, this.messages), legend.messages);
        return Promise.resolve();
    }
    async init() {
        if (!this.reactiveUtils || !this.view || !this.handles)
            return;
        try {
            const { on } = this.reactiveUtils;
            const [LegendViewModel] = await loadModules(['esri/widgets/Legend/LegendViewModel']);
            const legendVM = new LegendViewModel({ view: this.view });
            this.legendvm = legendVM;
            this.handles.add([
                on(() => { var _a; return (_a = this.legendvm) === null || _a === void 0 ? void 0 : _a.activeLayerInfos; }, 'change', () => { var _a; return this._refreshActiveLayerInfos((_a = this === null || this === void 0 ? void 0 : this.legendvm) === null || _a === void 0 ? void 0 : _a.activeLayerInfos, this.reactiveUtils); }),
            ]);
        }
        catch (err) {
            console.error('Failed at "init": ', err);
        }
    }
    render() {
        var _a;
        const { base, component, widget, widgetPanel } = CSS.esri;
        return (h("div", { key: "interactive-legend", class: (_a = this.widget) === null || _a === void 0 ? void 0 : _a.classes(base, component, widget, widgetPanel) }, h("instant-apps-interactive-legend-classic", { key: "interactive-legend-classic", ref: (el) => (this.ref = el), class: getTheme(this.el), legendvm: this.legendvm, "zoom-to": this.zoomTo, filterMode: this.filterMode, "feature-count": this.featureCount, messages: this.messages })));
    }
    _refreshActiveLayerInfos(activeLayerInfos, reactiveUtils) {
        if (!activeLayerInfos)
            return;
        this.handles.removeAll();
        activeLayerInfos.forEach(activeLayerInfo => this._renderOnActiveLayerInfoChange(activeLayerInfo, reactiveUtils));
    }
    _renderOnActiveLayerInfoChange(activeLayerInfo, reactiveUtils) {
        var _a;
        const { on } = this.reactiveUtils;
        const childrenChangeHandle = on(() => activeLayerInfo.children, 'change', () => activeLayerInfo.children.forEach(childActiveLayerInfo => this._renderOnActiveLayerInfoChange(childActiveLayerInfo, reactiveUtils)));
        this.handles.add(childrenChangeHandle, `children_${(_a = activeLayerInfo === null || activeLayerInfo === void 0 ? void 0 : activeLayerInfo.layer) === null || _a === void 0 ? void 0 : _a.uid}`);
        activeLayerInfo.children.forEach(childActiveLayerInfo => {
            var _a, _b;
            this._renderOnActiveLayerInfoChange(childActiveLayerInfo, reactiveUtils);
            if (((_a = childActiveLayerInfo === null || childActiveLayerInfo === void 0 ? void 0 : childActiveLayerInfo.children) === null || _a === void 0 ? void 0 : _a.length) > 0)
                (_b = childActiveLayerInfo === null || childActiveLayerInfo === void 0 ? void 0 : childActiveLayerInfo.children) === null || _b === void 0 ? void 0 : _b.forEach(innerChild => this._renderOnActiveLayerInfoChange(innerChild, reactiveUtils));
        });
    }
    get el() { return this; }
    static get watchers() { return {
        "handles": ["init"],
        "reactiveUtils": ["init"],
        "view": ["init"]
    }; }
    static get style() { return InstantAppsInteractiveLegendStyle0; }
}, [2, "instant-apps-interactive-legend", {
        "view": [16],
        "zoomTo": [4, "zoom-to"],
        "featureCount": [4, "feature-count"],
        "filterMode": [16],
        "handles": [32],
        "reactiveUtils": [32],
        "legendvm": [32],
        "widget": [32],
        "messages": [32]
    }, undefined, {
        "handles": ["init"],
        "reactiveUtils": ["init"],
        "view": ["init"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-interactive-legend", "calcite-action", "calcite-button", "calcite-icon", "calcite-loader", "calcite-tooltip", "instant-apps-interactive-legend-classic", "instant-apps-interactive-legend-count", "instant-apps-interactive-legend-group-legend-element", "instant-apps-interactive-legend-layer-element", "instant-apps-interactive-legend-layer-element-caption", "instant-apps-interactive-legend-legend-element", "instant-apps-interactive-legend-legend-element-caption", "instant-apps-interactive-legend-relationship"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-interactive-legend":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsInteractiveLegend$1);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "instant-apps-interactive-legend-classic":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "instant-apps-interactive-legend-count":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "instant-apps-interactive-legend-group-legend-element":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "instant-apps-interactive-legend-layer-element":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "instant-apps-interactive-legend-layer-element-caption":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "instant-apps-interactive-legend-legend-element":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "instant-apps-interactive-legend-legend-element-caption":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "instant-apps-interactive-legend-relationship":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const InstantAppsInteractiveLegend = InstantAppsInteractiveLegend$1;
const defineCustomElement = defineCustomElement$1;

export { InstantAppsInteractiveLegend, defineCustomElement };
