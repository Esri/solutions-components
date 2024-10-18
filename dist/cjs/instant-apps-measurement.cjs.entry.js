/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const locale = require('./locale-4a18a858.js');
require('./loadModules-8567855e.js');
require('./esri-loader-08dc41bd.js');
require('./_commonjsHelpers-baf43783.js');
require('./languageUtil-a3e1eafd.js');

const instantAppsMeasurementCss = ".sc-instant-apps-measurement-h .sc-instant-apps-measurement.sc-instant-apps-measurement{background:var(--calcite-color-foreground-1)}.sc-instant-apps-measurement-h .active-tool.sc-instant-apps-measurement{--calcite-color-foreground-1:#c7eaff}";
const InstantAppsMeasurementStyle0 = instantAppsMeasurementCss;

const CSS = {
    content: 'instant-apps-measurement__content',
};
const InstantAppsMeasurement = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.measureActive = index.createEvent(this, "measureActive", 7);
        this.messages = undefined;
        this.view = undefined;
        this.areaUnit = undefined;
        this.linearUnit = undefined;
        this.coordinateFormat = undefined;
        this.activeToolType = undefined;
        this.closable = false;
    }
    async componentWillLoad() {
        locale.getMessages(this);
    }
    componentDidLoad() { }
    render() {
        var _a;
        return (index.h(index.Host, { key: '843dd716e3f9b125044afd9a2919a60b937ae8b0' }, index.h("calcite-panel", { key: '45dd9e43decdcdc0526139938751d727bd73b3e0', heading: (_a = this === null || this === void 0 ? void 0 : this.messages) === null || _a === void 0 ? void 0 : _a.label, closable: this.closable }, index.h("div", { key: 'beb440bfbb87cd00189630e442aabe97a1e83d9e' }, this.renderActionPad()), this.renderMeasureToolPanel())));
    }
    renderMeasureToolPanel() {
        const { view, coordinateFormat, areaUnit, linearUnit, activeToolType } = this;
        return (index.h("calcite-panel", { class: CSS.content }, index.h("instant-apps-measurement-tool", { ref: el => {
                this.measureTool = el;
            }, view: view, measureConfiguration: { coordinateFormat, areaUnit, linearUnit, activeToolType } })));
    }
    renderActionPad() {
        const { messages, activeToolType } = this;
        return (index.h("calcite-action-pad", { "expand-disabled": true, layout: "horizontal", position: "end" }, index.h("calcite-action", { class: activeToolType === 'distance' ? 'active-tool' : '', text: messages === null || messages === void 0 ? void 0 : messages.line, icon: "measure", scale: "m", "data-value": "distance", onClick: this._handleToolClick.bind(this) }, index.h("calcite-tooltip", { "close-on-click": true, placement: "bottom", slot: "tooltip" }, messages === null || messages === void 0 ? void 0 : messages.line)), index.h("calcite-action", { class: activeToolType === 'area' ? 'active-tool' : '', text: messages === null || messages === void 0 ? void 0 : messages.area, scale: "m", icon: "measure-area", "data-value": "area", onClick: this._handleToolClick.bind(this) }, index.h("calcite-tooltip", { "close-on-click": true, placement: "bottom", slot: "tooltip" }, messages === null || messages === void 0 ? void 0 : messages.area)), index.h("calcite-action", { class: activeToolType === 'point' ? 'active-tool' : '', text: messages === null || messages === void 0 ? void 0 : messages.point, scale: "m", icon: "pin-plus", "data-value": "point", onClick: this._handleToolClick.bind(this) }, index.h("calcite-tooltip", { "close-on-click": true, placement: "bottom", slot: "tooltip" }, messages === null || messages === void 0 ? void 0 : messages.point)), index.h("calcite-action", { text: messages === null || messages === void 0 ? void 0 : messages.clear, scale: "m", icon: "trash", "data-value": "clear", onClick: this._handleToolClick.bind(this) }, index.h("calcite-tooltip", { "close-on-click": true, placement: "bottom", slot: "tooltip" }, messages === null || messages === void 0 ? void 0 : messages.clear))));
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
    get el() { return index.getElement(this); }
};
InstantAppsMeasurement.style = InstantAppsMeasurementStyle0;

exports.instant_apps_measurement = InstantAppsMeasurement;
