/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, f as forceUpdate, h, g as getElement } from './p-4e6eb06e.js';
import { l as loadModules } from './p-4cd4cb85.js';
import { g as getMessages } from './p-5ff711ee.js';
import { g as getTheme } from './p-402301cb.js';
import './p-0a24ad5f.js';
import './p-d4056c1c.js';
import './p-ac122d9e.js';
import './p-dc9d4be3.js';

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
const InstantAppsInteractiveLegend = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "handles": ["init"],
        "reactiveUtils": ["init"],
        "view": ["init"]
    }; }
};
InstantAppsInteractiveLegend.style = InstantAppsInteractiveLegendStyle0;

export { InstantAppsInteractiveLegend as instant_apps_interactive_legend };
