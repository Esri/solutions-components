/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getMessages } from './locale3.js';
import { d as defineCustomElement$c } from './action.js';
import { d as defineCustomElement$b } from './action-group.js';
import { d as defineCustomElement$a } from './action-menu.js';
import { d as defineCustomElement$9 } from './action-pad.js';
import { d as defineCustomElement$8 } from './icon.js';
import { d as defineCustomElement$7 } from './loader.js';
import { d as defineCustomElement$6 } from './panel.js';
import { d as defineCustomElement$5 } from './popover.js';
import { d as defineCustomElement$4 } from './scrim.js';
import { d as defineCustomElement$3 } from './tooltip.js';
import { d as defineCustomElement$2 } from './instant-apps-measurement-tool2.js';

const instantAppsMeasurementCss = ".sc-instant-apps-measurement-h .sc-instant-apps-measurement.sc-instant-apps-measurement{background:var(--calcite-color-foreground-1)}.sc-instant-apps-measurement-h .active-tool.sc-instant-apps-measurement{--calcite-color-foreground-1:#c7eaff}";
const InstantAppsMeasurementStyle0 = instantAppsMeasurementCss;

const CSS = {
    content: 'instant-apps-measurement__content',
};
const InstantAppsMeasurement$1 = /*@__PURE__*/ proxyCustomElement(class InstantAppsMeasurement extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.measureActive = createEvent(this, "measureActive", 7);
        this.messages = undefined;
        this.view = undefined;
        this.areaUnit = undefined;
        this.linearUnit = undefined;
        this.coordinateFormat = undefined;
        this.activeToolType = undefined;
        this.closable = false;
    }
    async componentWillLoad() {
        getMessages(this);
    }
    componentDidLoad() { }
    render() {
        var _a;
        return (h(Host, { key: '843dd716e3f9b125044afd9a2919a60b937ae8b0' }, h("calcite-panel", { key: '45dd9e43decdcdc0526139938751d727bd73b3e0', heading: (_a = this === null || this === void 0 ? void 0 : this.messages) === null || _a === void 0 ? void 0 : _a.label, closable: this.closable }, h("div", { key: 'beb440bfbb87cd00189630e442aabe97a1e83d9e' }, this.renderActionPad()), this.renderMeasureToolPanel())));
    }
    renderMeasureToolPanel() {
        const { view, coordinateFormat, areaUnit, linearUnit, activeToolType } = this;
        return (h("calcite-panel", { class: CSS.content }, h("instant-apps-measurement-tool", { ref: el => {
                this.measureTool = el;
            }, view: view, measureConfiguration: { coordinateFormat, areaUnit, linearUnit, activeToolType } })));
    }
    renderActionPad() {
        const { messages, activeToolType } = this;
        return (h("calcite-action-pad", { "expand-disabled": true, layout: "horizontal", position: "end" }, h("calcite-action", { class: activeToolType === 'distance' ? 'active-tool' : '', text: messages === null || messages === void 0 ? void 0 : messages.line, icon: "measure", scale: "m", "data-value": "distance", onClick: this._handleToolClick.bind(this) }, h("calcite-tooltip", { "close-on-click": true, placement: "bottom", slot: "tooltip" }, messages === null || messages === void 0 ? void 0 : messages.line)), h("calcite-action", { class: activeToolType === 'area' ? 'active-tool' : '', text: messages === null || messages === void 0 ? void 0 : messages.area, scale: "m", icon: "measure-area", "data-value": "area", onClick: this._handleToolClick.bind(this) }, h("calcite-tooltip", { "close-on-click": true, placement: "bottom", slot: "tooltip" }, messages === null || messages === void 0 ? void 0 : messages.area)), h("calcite-action", { class: activeToolType === 'point' ? 'active-tool' : '', text: messages === null || messages === void 0 ? void 0 : messages.point, scale: "m", icon: "pin-plus", "data-value": "point", onClick: this._handleToolClick.bind(this) }, h("calcite-tooltip", { "close-on-click": true, placement: "bottom", slot: "tooltip" }, messages === null || messages === void 0 ? void 0 : messages.point)), h("calcite-action", { text: messages === null || messages === void 0 ? void 0 : messages.clear, scale: "m", icon: "trash", "data-value": "clear", onClick: this._handleToolClick.bind(this) }, h("calcite-tooltip", { "close-on-click": true, placement: "bottom", slot: "tooltip" }, messages === null || messages === void 0 ? void 0 : messages.clear))));
    }
    _handleToolClick(e) {
        var _a, _b, _c, _d;
        if (!(this === null || this === void 0 ? void 0 : this.measureTool))
            return;
        const tool = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.dataset['value'];
        this.measureTool.activeTool = tool;
        // clean up active styles
        const elements = document.getElementsByClassName('active-tool');
        for (let i = 0; i < (elements === null || elements === void 0 ? void 0 : elements.length); i++) {
            (_c = (_b = elements[i]) === null || _b === void 0 ? void 0 : _b.classList) === null || _c === void 0 ? void 0 : _c.remove('active-tool');
        }
        (_d = e === null || e === void 0 ? void 0 : e.target) === null || _d === void 0 ? void 0 : _d.classList.add('active-tool');
        this.measureActive.emit(tool === undefined || tool === 'clear' ? false : true);
    }
    get el() { return this; }
    static get style() { return InstantAppsMeasurementStyle0; }
}, [2, "instant-apps-measurement", {
        "view": [16],
        "areaUnit": [1, "area-unit"],
        "linearUnit": [1, "linear-unit"],
        "coordinateFormat": [1, "coordinate-format"],
        "activeToolType": [1, "active-tool-type"],
        "closable": [4],
        "messages": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-measurement", "calcite-action", "calcite-action-group", "calcite-action-menu", "calcite-action-pad", "calcite-icon", "calcite-loader", "calcite-panel", "calcite-popover", "calcite-scrim", "calcite-tooltip", "instant-apps-measurement-tool"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-measurement":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsMeasurement$1);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-action-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-action-pad":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-panel":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "instant-apps-measurement-tool":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const InstantAppsMeasurement = InstantAppsMeasurement$1;
const defineCustomElement = defineCustomElement$1;

export { InstantAppsMeasurement, defineCustomElement };
