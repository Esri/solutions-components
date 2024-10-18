/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules2.js';
import { g as getMessages } from './locale3.js';
import { g as getMode } from './mode.js';
import { d as defineCustomElement$n } from './action.js';
import { d as defineCustomElement$m } from './action-menu.js';
import { d as defineCustomElement$l } from './block.js';
import { d as defineCustomElement$k } from './button.js';
import { d as defineCustomElement$j } from './checkbox.js';
import { d as defineCustomElement$i } from './chip.js';
import { d as defineCustomElement$h } from './combobox.js';
import { d as defineCustomElement$g } from './combobox-item.js';
import { d as defineCustomElement$f } from './date-picker.js';
import { d as defineCustomElement$e } from './date-picker-day.js';
import { d as defineCustomElement$d } from './date-picker-month.js';
import { d as defineCustomElement$c } from './date-picker-month-header.js';
import { d as defineCustomElement$b } from './graph.js';
import { d as defineCustomElement$a } from './handle.js';
import { d as defineCustomElement$9 } from './icon.js';
import { d as defineCustomElement$8 } from './input-date-picker.js';
import { d as defineCustomElement$7 } from './input-text.js';
import { d as defineCustomElement$6 } from './loader.js';
import { d as defineCustomElement$5 } from './panel.js';
import { d as defineCustomElement$4 } from './popover.js';
import { d as defineCustomElement$3 } from './progress.js';
import { d as defineCustomElement$2 } from './scrim.js';
import { d as defineCustomElement$1 } from './slider.js';

const baseClassLight = 'instant-apps-filter-list calcite-mode-light';
const baseClassDark = 'instant-apps-filter-list calcite-mode-dark';
const supportedTypes = ['feature', 'geojson', 'wfs', 'csv', 'scene', 'subtype-group', 'point-cloud', 'map-image', 'sublayer'];

function handleSingleQuote(value) {
    return value.replaceAll("'", "''");
}
function convertToDate(date, includeTime = false) {
    if (date) {
        const tmpDate = new Date(date);
        const formattedDate = `${tmpDate.getFullYear()}-${tmpDate.getMonth() + 1}-${tmpDate.getDate()}`;
        if (includeTime) {
            const time = `${tmpDate.getHours()}:${tmpDate.getMinutes()}:${tmpDate.getSeconds()}`;
            return `${formattedDate} ${time}`;
        }
        else {
            return formattedDate;
        }
    }
    return;
}
function resetDatePicker(datePicker) {
    var _a;
    if (datePicker != null) {
        datePicker.value = ['', ''];
        const inputs = (_a = datePicker.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('calcite-input');
        if (inputs != null) {
            for (const input of inputs) {
                input.value = '';
            }
        }
    }
}

const instantAppsFilterListCss = ":host{display:block}.instant-apps-filter-list *{box-sizing:border-box}.instant-apps-filter-list__container{height:100%}.instant-apps-filter-list__container calcite-block:last-of-type{margin-bottom:0}.instant-apps-filter-list__footer{padding:12px;display:flex}.instant-apps-filter-list__footer calcite-button:nth-child(2){margin-left:6px}.instant-apps-filter-list__item-container,.instant-apps-filter-list__item-container--user-input{display:flex;justify-content:space-between;align-items:center}.instant-apps-filter-list__item-container:not(:last-child),.instant-apps-filter-list__item-container--user-input:not(:last-child){padding-bottom:20px}.instant-apps-filter-list__item-container--user-input{margin:0;display:flex;flex-direction:column;align-items:flex-start}.instant-apps-filter-list__item-container--user-input>span{margin:0 0 6px;font-size:14px;font-weight:normal}.instant-apps-filter-list__item-container--user-input calcite-combobox{width:100%;font-size:16px;--calcite-combobox-input-height:24px}.instant-apps-filter-list__number-input-container{width:100%;display:flex;justify-content:center}.instant-apps-filter-list__number-input-container calcite-slider{width:90%}.instant-apps-filter-list__date-picker-input-container{display:flex;align-items:center;justify-content:unset;width:100%}.instant-apps-filter-list__date-picker-input-container calcite-action{height:64px;border-top:1px solid var(--calcite-color-border-input);border-right:1px solid var(--calcite-color-border-input);border-bottom:1px solid var(--calcite-color-border-input)}.instant-apps-filter-list__title{margin-right:20px}.instant-apps-filter-list__title>p{font-size:14px;font-weight:normal;margin:0}.instant-apps-filter-list__checkbox-container{display:flex}.instant-apps-filter-list__checkbox-container calcite-checkbox{height:18px}.instant-apps-filter-list__operator-description{margin:0;--calcite-font-size--1:12px}.instant-apps-filter-list__zoom-to{display:flex;justify-content:flex-end;margin:8px 0 20px}.instant-apps-filter-list__zoom-to calcite-action{width:-moz-min-content;width:min-content}.instant-apps-filter-list calcite-input-date-picker{--calcite-font-size--1:16px}@media (prefers-reduced-motion){.instant-apps-filter-list calcite-loader{--calcite-internal-duration-factor:2;--calcite-internal-animation-timing-slow:calc(300ms * 2)}}.instant-apps-filter-list.calcite-mode-dark .instant-apps-filter-list__header-container{background:#2b2b2b;color:#fff}.instant-apps-filter-list.calcite-mode-dark .instant-apps-filter-list__operator-description{background:#353535}";
const InstantAppsFilterListStyle0 = instantAppsFilterListCss;

const CSS = {
    base: 'instant-apps-filter-list',
    filterContainer: 'instant-apps-filter-list__container',
    footer: 'instant-apps-filter-list__footer',
    filterItemTitle: 'instant-apps-filter-list__title',
    filterItemContainer: 'instant-apps-filter-list__item-container',
    filterUIItemContainer: 'instant-apps-filter-list__item-container--user-input',
    checkboxContainer: 'instant-apps-filter-list__checkbox-container',
    numberInputContainer: 'instant-apps-filter-list__number-input-container',
    dateInputContainer: 'instant-apps-filter-list__date-picker-input-container',
    operatorDesc: 'instant-apps-filter-list__operator-description',
    zoomTo: 'instant-apps-filter-list__zoom-to',
};
const InstantAppsFilterList = /*@__PURE__*/ proxyCustomElement(class InstantAppsFilterList extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.filterListReset = createEvent(this, "filterListReset", 7);
        this.filterUpdate = createEvent(this, "filterUpdate", 7);
        this.layerExpressions = undefined;
        this.autoUpdateUrl = false;
        this.closeBtn = false;
        this.closeBtnOnClick = undefined;
        this.comboboxOverlayPositioning = 'absolute';
        this.closeBtnText = undefined;
        this.openFilters = false;
        this.extentSelector = false;
        this.extentSelectorConfig = undefined;
        this.urlParams = undefined;
        this.filterCount = 0;
        this.view = undefined;
        this.zoomBtn = true;
        this.resetBtn = true;
        this.resetFiltersOnDisconnect = true;
        this.loading = undefined;
        this.filterLayerExpressions = undefined;
        this.messages = undefined;
        this.baseClass = baseClassLight;
        this.disabled = true;
        this.hasLayerExpression = false;
        this.initDefExpressions = undefined;
        this.initMapImageExpressions = undefined;
        this.initPointCloudFilters = undefined;
    }
    watchViewHandler() {
        this.handleWhenView();
    }
    watchLayerExpressions() {
        if (!this.hasLayerExpression) {
            this.filterLayerExpressions = structuredClone(this.layerExpressions);
            this.handleLayerExpressionsUpdate();
            this.hasLayerExpression = true;
        }
    }
    getFilterInitState() {
        return Promise.resolve({
            initDefExpressions: this.initDefExpressions,
            initMapImageExpressions: this.initMapImageExpressions,
            initPointCloudFilters: this.initPointCloudFilters,
        });
    }
    forceReset() {
        this.filterLayerExpressions = structuredClone(this.layerExpressions);
        this.handleResetFilter();
        return this.initExpressions();
    }
    restoreFilters(filterParamString, filterInitState) {
        this.filterLayerExpressions = structuredClone(this.layerExpressions);
        this.initDefExpressions = filterInitState.initDefExpressions;
        this.initMapImageExpressions = filterInitState.initMapImageExpressions;
        this.initPointCloudFilters = filterInitState.initPointCloudFilters;
        const filters = filterParamString === null || filterParamString === void 0 ? void 0 : filterParamString.split(';').map(filter => JSON.parse(filter));
        if (filters) {
            this.filterCount = this.applyFilters(filters);
        }
        return this.initExpressions();
    }
    async componentWillLoad() {
        var _a;
        this.baseClass = getMode(this.el) === 'dark' ? baseClassDark : baseClassLight;
        await this.initializeModules();
        getMessages(this);
        this.hasLayerExpression = this.layerExpressions != null;
        this.filterLayerExpressions = this.layerExpressions != null ? structuredClone(this.layerExpressions) : [];
        this.disabled = ((_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.length) ? undefined : true;
        this.reactiveUtils.whenOnce(() => this.view).then(() => this.handleLayerExpressionsUpdate());
    }
    componentShouldUpdate(newValue, _oldValue, name) {
        if (name === 'view' && newValue != null) {
            this.handleWhenView();
        }
        else if (name === 'layerExpressions') {
            if (this.hasLayerExpression) {
                this.resetAllFilters();
            }
            this.filterLayerExpressions = structuredClone(this.layerExpressions);
            this.handleLayerExpressionsUpdate();
            this.hasLayerExpression = true;
        }
    }
    componentWillRender() {
        var _a;
        this.disabled = ((_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.length) > 0 ? undefined : true;
    }
    disconnectedCallback() {
        if (this.resetFiltersOnDisconnect) {
            this.filterLayerExpressions = structuredClone(this.layerExpressions);
            this.resetAllFilters();
        }
    }
    async initializeModules() {
        const [intl, geometryJsonUtils, reactiveUtils] = await loadModules(['esri/intl', 'esri/geometry/support/jsonUtils', 'esri/core/reactiveUtils']);
        this.geometryJsonUtils = geometryJsonUtils;
        this.reactiveUtils = reactiveUtils;
        this.locale = intl.getLocale();
        this.intl = intl;
    }
    render() {
        const filterConfig = this.loading ? this.renderLoading() : this.initFilterConfig();
        const footer = this.renderFooter(this.closeBtn, this.resetBtn);
        return (h(Host, { key: '80c4918bd3bdf65d541ed6cf4cf4843ab0f0df01' }, h("calcite-panel", { key: 'f1da101b071420df42da5eb8f5478d0719b40cec', class: this.baseClass, ref: el => (this.panelEl = el) }, h("slot", { key: '8ebdbf20767027459470fa85fe4238e69bc47ab8', slot: "header-content", name: "filter-header-content" }), h("slot", { key: '177f8db80aa842eeb200344cd7b398cd51ca23f3', slot: "header-actions-end", name: "filter-header-actions-end" }), h("div", { key: "filter-container", class: CSS.filterContainer }, filterConfig, footer))));
    }
    renderLoading() {
        return h("calcite-loader", { label: "Loading filters..." });
    }
    renderFilter(layerExpression) {
        const { id } = layerExpression;
        return layerExpression.expressions.map((expression, index) => {
            return expression.type == 'checkbox' || expression.type == null ? (h("div", { key: `${id}-${index}`, class: CSS.filterItemContainer }, h("div", { class: CSS.filterItemTitle }, h("p", null, expression.name)), h("div", { class: CSS.checkboxContainer }, h("calcite-checkbox", { id: expression.id.toString(), scale: "l", checked: expression === null || expression === void 0 ? void 0 : expression.active, onCalciteCheckboxChange: this.handleCheckboxChange.bind(this, layerExpression, expression) })))) : (this.initInput(layerExpression, expression));
        });
    }
    renderLayerBlock() {
        return this.filterLayerExpressions.map(layerExpression => {
            return this.renderFilterBlocks(layerExpression);
        });
    }
    renderFilterBlocks(layerExpression) {
        var _a;
        const filter = this.renderFilter(layerExpression);
        const { operator } = layerExpression;
        const operatorTranslation = (operator === null || operator === void 0 ? void 0 : operator.trim()) === 'OR' ? 'orOperator' : 'andOperator';
        const zoomTo = this.renderZoomTo(layerExpression);
        return (h("calcite-block", { key: layerExpression.id, heading: layerExpression.title, description: (_a = this.messages) === null || _a === void 0 ? void 0 : _a[operatorTranslation], open: this.openFilters ? true : undefined, collapsible: true }, zoomTo, filter));
    }
    renderCombobox(layerExpression, expression) {
        var _a;
        return (h("label", { key: "combo-select", class: CSS.filterUIItemContainer }, h("span", null, expression.name), h("calcite-combobox", { id: expression.id.toString(), onCalciteComboboxChange: this.handleComboSelect.bind(this, expression, layerExpression), label: expression.name, placeholder: expression.placeholder, selectionMode: "multiple", "max-items": "6", scale: "s", overlayPositioning: this.comboboxOverlayPositioning }, (_a = expression.fields) === null || _a === void 0 ? void 0 : _a.map((value, index) => this.renderComboboxItem(expression, value, index)))));
    }
    renderComboboxItem(expression, value, index) {
        var _a;
        const label = this.createLabel(expression, value);
        const selectedFields = expression === null || expression === void 0 ? void 0 : expression.selectedFields;
        const selected = (_a = selectedFields === null || selectedFields === void 0 ? void 0 : selectedFields.includes(value)) !== null && _a !== void 0 ? _a : false;
        return h("calcite-combobox-item", { key: `${label}-${index}`, value: value, textLabel: `${label}`, selected: selected });
    }
    initFilterConfig() {
        var _a, _b;
        if (((_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            if (this.filterLayerExpressions.length === 1) {
                const { operator } = this.filterLayerExpressions[0];
                const operatorTranslation = (operator === null || operator === void 0 ? void 0 : operator.trim()) === 'OR' ? 'orOperator' : 'andOperator';
                const zoomTo = this.renderZoomTo(this.filterLayerExpressions[0]);
                return (h("calcite-block", { class: CSS.operatorDesc, heading: (_b = this.messages) === null || _b === void 0 ? void 0 : _b[operatorTranslation], open: true }, zoomTo, this.renderFilter(this.filterLayerExpressions[0])));
            }
            else if (this.filterLayerExpressions.length > 1) {
                return this.renderLayerBlock();
            }
        }
        return;
    }
    renderNumberSlider(layerExpression, expression) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const min = expression === null || expression === void 0 ? void 0 : expression.min;
        const max = expression === null || expression === void 0 ? void 0 : expression.max;
        const step = (expression === null || expression === void 0 ? void 0 : expression.step) ? expression.step : 1;
        const check = min != null && max != null;
        const field = (_a = expression === null || expression === void 0 ? void 0 : expression.field) !== null && _a !== void 0 ? _a : '';
        const minValue = ((_b = expression === null || expression === void 0 ? void 0 : expression.range) === null || _b === void 0 ? void 0 : _b.min) != null ? expression.range.min : min;
        const maxValue = ((_c = expression === null || expression === void 0 ? void 0 : expression.range) === null || _c === void 0 ? void 0 : _c.max) != null ? expression.range.max : max;
        const value = [minValue, maxValue];
        return check ? (h("label", { key: expression === null || expression === void 0 ? void 0 : expression.id.toString(), class: CSS.filterUIItemContainer }, h("span", null, expression === null || expression === void 0 ? void 0 : expression.name), h("div", { class: CSS.numberInputContainer }, h("calcite-slider", { id: expression === null || expression === void 0 ? void 0 : expression.id.toString(), onCalciteSliderChange: this.handleSliderChange.bind(this, expression, layerExpression), min: min, max: max, minValue: min, maxValue: max, "min-label": (_e = (_d = this.messages) === null || _d === void 0 ? void 0 : _d.minSlider) === null || _e === void 0 ? void 0 : _e.replace('{field}', field), "max-label": (_g = (_f = this.messages) === null || _f === void 0 ? void 0 : _f.maxSlider) === null || _g === void 0 ? void 0 : _g.replace('{field}', field), step: step, labelHandles: true, snap: true, value: value, "group-separator": (_h = expression === null || expression === void 0 ? void 0 : expression.format) === null || _h === void 0 ? void 0 : _h.digitSeparator })))) : undefined;
    }
    renderDatePicker(layerExpression, expression) {
        var _a, _b, _c, _d;
        const { min, max } = expression;
        const value = [(_a = expression === null || expression === void 0 ? void 0 : expression.range) === null || _a === void 0 ? void 0 : _a.min, (_b = expression === null || expression === void 0 ? void 0 : expression.range) === null || _b === void 0 ? void 0 : _b.max];
        const check = min != null && max != null;
        return check ? (h("label", { class: CSS.filterUIItemContainer }, h("span", null, expression === null || expression === void 0 ? void 0 : expression.name), h("div", { class: CSS.dateInputContainer }, h("calcite-input-date-picker", { id: expression === null || expression === void 0 ? void 0 : expression.id.toString(), onCalciteInputDatePickerChange: this.handleDatePickerRangeChange.bind(this, expression, layerExpression), min: min, max: max, "overlay-positioning": "fixed", lang: (_c = this.locale) !== null && _c !== void 0 ? _c : 'en', layout: "vertical", value: value, range: true }), h("calcite-action", { onClick: this.handleResetDatePicker.bind(this, expression, layerExpression), icon: "reset", text: (_d = this.messages) === null || _d === void 0 ? void 0 : _d.resetDatePicker, scale: "s" })))) : null;
    }
    renderFooter(closeBtn, resetBtn) {
        var _a, _b, _c;
        const closeText = this.closeBtnText != null ? this.closeBtnText : (_a = this.messages) === null || _a === void 0 ? void 0 : _a.close;
        return (h("div", { class: CSS.footer, slot: "footer" }, resetBtn ? (h("calcite-button", { appearance: "outline", width: "half", disabled: this.disabled, onClick: this.handleResetFilter.bind(this) }, (_b = this.messages) === null || _b === void 0 ? void 0 : _b.resetFilter)) : undefined, closeBtn ? (h("calcite-button", { appearance: "solid", width: "half", kind: "brand", onClick: (_c = this.closeBtnOnClick) === null || _c === void 0 ? void 0 : _c.bind(this) }, closeText)) : undefined));
    }
    renderZoomTo(layerExpression) {
        var _a;
        const id = (layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.sublayerId) ? `zoom-to-${layerExpression.id}-${layerExpression.sublayerId}` : `zoom-to-${layerExpression.id}`;
        return this.zoomBtn ? (h("div", { class: CSS.zoomTo }, h("calcite-button", { id: id, appearance: "transparent", kind: "neutral", scale: "s", iconStart: "magnifying-glass-plus", onClick: this.handleZoomTo.bind(this, layerExpression) }, (_a = this.messages) === null || _a === void 0 ? void 0 : _a.zoomTo))) : undefined;
    }
    handleResetDatePicker(expression, layerExpression) {
        const datePicker = this.panelEl.querySelector(`[id='${expression.id}']`);
        resetDatePicker(datePicker);
        expression.active = false;
        expression.definitionExpression = undefined;
        expression.range = undefined;
        this.generateOutput(layerExpression);
    }
    initInput(layerExpression, expression) {
        const { type, numDisplayOption, displayOption } = expression;
        const isDropdown = numDisplayOption === 'drop-down' || displayOption === 'drop-down';
        if (type === 'string' || type === 'coded-value' || ((type === 'number' || type === 'range' || type === 'date') && isDropdown)) {
            return this.renderCombobox(layerExpression, expression);
        }
        else if (type === 'number' || type === 'range') {
            return this.renderNumberSlider(layerExpression, expression);
        }
        else if (type === 'date') {
            return this.renderDatePicker(layerExpression, expression);
        }
        return;
    }
    async initExpressions() {
        this.loading = true;
        if (this.filterLayerExpressions == null)
            return;
        const tmpLE = await this.processExpressions();
        this.loading = false;
        this.filterLayerExpressions = [...tmpLE];
    }
    async processExpressions() {
        var _a;
        if (!this.filterLayerExpressions)
            return [];
        for (const layerExpression of this.filterLayerExpressions) {
            for (const expression of layerExpression.expressions || []) {
                expression.active = (_a = expression.active) !== null && _a !== void 0 ? _a : expression.definitionExpression != null;
                await this.setInitExpression(layerExpression, expression);
            }
        }
        return this.filterLayerExpressions;
    }
    handleResetFilter() {
        var _a;
        (_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.forEach(layerExpression => {
            var _a;
            (_a = layerExpression.expressions) === null || _a === void 0 ? void 0 : _a.forEach(expression => {
                const { type, numDisplayOption, displayOption } = expression;
                let uiType = '';
                if (type === 'string' ||
                    type === 'coded-value' ||
                    (type === 'date' && (numDisplayOption === 'drop-down' || displayOption === 'drop-down')) ||
                    ((type === 'number' || type === 'range') && (numDisplayOption === 'drop-down' || displayOption === 'drop-down'))) {
                    uiType = 'combobox';
                }
                else if (type === 'date') {
                    uiType = 'datePicker';
                }
                else if (type === 'number' || type === 'range') {
                    uiType = 'numberRange';
                }
                if (uiType) {
                    this.resetExpressionUI(uiType, expression);
                }
                else {
                    this.resetCheckbox(expression);
                }
                expression.active = false;
            });
        });
        this.resetAllFilters();
        this.generateURLParams();
        this.filterListReset.emit();
    }
    resetExpressionUI(type, expression) {
        const { id } = expression;
        switch (type) {
            case 'combobox':
                expression.selectedFields = undefined;
                const combobox = this.panelEl.querySelector(`[id='${id}']`);
                if (combobox) {
                    Array.from(combobox.children).forEach(child => {
                        child.selected = false;
                    });
                }
                break;
            case 'datePicker':
                expression.range = undefined;
                const datePicker = this.panelEl.querySelector(`[id='${id}']`);
                resetDatePicker(datePicker);
                break;
            case 'numberRange':
                expression.range = undefined;
                const slider = this.panelEl.querySelector(`[id='${id}']`);
                if (slider) {
                    slider.minValue = expression.min;
                    slider.maxValue = expression.max;
                }
                break;
        }
    }
    resetCheckbox(expression) {
        const { id } = expression;
        const checkbox = this.panelEl.querySelector(`[id='${id}']`);
        if (checkbox != null) {
            checkbox.checked = false;
        }
    }
    resetAllFilters() {
        var _a, _b, _c, _d, _e;
        const allLayersAndTables = (_c = (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.map) === null || _b === void 0 ? void 0 : _b.allLayers) === null || _c === void 0 ? void 0 : _c.concat((_e = (_d = this.view) === null || _d === void 0 ? void 0 : _d.map) === null || _e === void 0 ? void 0 : _e.allTables);
        allLayersAndTables === null || allLayersAndTables === void 0 ? void 0 : allLayersAndTables.forEach(layer => {
            var _a, _b;
            if (!supportedTypes.includes(layer.type))
                return;
            const fl = layer;
            if (fl.type === 'point-cloud') {
                fl.filters = (_a = this.initPointCloudFilters) === null || _a === void 0 ? void 0 : _a[fl.id];
            }
            else if (fl.type === 'map-image') {
                fl.allSublayers.forEach(sublayer => {
                    var _a, _b;
                    sublayer.definitionExpression = (_b = (_a = this.initMapImageExpressions) === null || _a === void 0 ? void 0 : _a[fl.id]) === null || _b === void 0 ? void 0 : _b[sublayer.id];
                });
            }
            else {
                fl.definitionExpression = (_b = this.initDefExpressions) === null || _b === void 0 ? void 0 : _b[fl.id];
            }
        });
    }
    async updateStringExpression(layerExpression, expression) {
        const layer = this.findFilterLayer(layerExpression);
        await this.getFeatureAttributes(layer, expression);
        this.handleDateField(layer, expression);
        if (expression === null || expression === void 0 ? void 0 : expression.selectedFields) {
            expression.definitionExpression = this.createDefinitionExpression(expression);
            return true;
        }
        return false;
    }
    handleDateField(layer, expression) {
        if (expression.type === 'date') {
            const layerField = layer.fields.find(({ name }) => name === expression.field);
            if ((layerField === null || layerField === void 0 ? void 0 : layerField.type) === 'date-only') {
                expression.dateOnly = true;
            }
        }
    }
    createDefinitionExpression(expression) {
        var _a;
        if (!((_a = expression.selectedFields) === null || _a === void 0 ? void 0 : _a.length))
            return '';
        const selectedFields = expression.selectedFields.map((field) => (typeof field === 'number' ? field : `'${handleSingleQuote(field)}'`));
        return `${expression.field} IN (${selectedFields.join(',')})`;
    }
    async updateNumberExpression(layerExpression, expression) {
        var _a, _b;
        if ((!(expression === null || expression === void 0 ? void 0 : expression.min) && (expression === null || expression === void 0 ? void 0 : expression.min) !== 0) || (!(expression === null || expression === void 0 ? void 0 : expression.max) && (expression === null || expression === void 0 ? void 0 : expression.max) !== 0)) {
            const layer = this.findFilterLayer(layerExpression);
            const { field } = expression;
            if (field != null) {
                this.setExpressionFormat(layer, expression, field);
                if ((expression === null || expression === void 0 ? void 0 : expression.numDisplayOption) === 'drop-down' || (expression === null || expression === void 0 ? void 0 : expression.displayOption) === 'drop-down') {
                    await this.getFeatureAttributes(layer, expression);
                }
                else {
                    const graphic = await this.calculateMinMaxStatistics(layer, field);
                    const attributes = (_a = graphic === null || graphic === void 0 ? void 0 : graphic[0]) === null || _a === void 0 ? void 0 : _a.attributes;
                    if (((_b = expression.format) === null || _b === void 0 ? void 0 : _b.places) != null) {
                        expression.min = this.roundMinNumberDown(attributes[`min${field}`], expression.format.places);
                        expression.max = this.roundMaxNumberUp(attributes[`max${field}`], expression.format.places);
                    }
                    else {
                        expression.min = attributes[`min${field}`];
                        expression.max = attributes[`max${field}`];
                    }
                    if ((expression === null || expression === void 0 ? void 0 : expression.range) && Object.keys(expression.range).length) {
                        const { min, max } = expression.range;
                        expression.definitionExpression = `${expression.field} BETWEEN ${min} AND ${max}`;
                        return true;
                    }
                }
            }
        }
        return false;
    }
    async updateDateExpression(layerExpression, expression) {
        var _a;
        const { field, range } = expression;
        const layer = this.findFilterLayer(layerExpression);
        const graphic = await this.calculateMinMaxStatistics(layer, field);
        const attributes = (_a = graphic === null || graphic === void 0 ? void 0 : graphic[0]) === null || _a === void 0 ? void 0 : _a.attributes;
        expression.min = convertToDate(attributes[`min${field}`]);
        expression.max = convertToDate(attributes[`max${field}`]);
        if (range != null && ((range === null || range === void 0 ? void 0 : range.max) != null || (range === null || range === void 0 ? void 0 : range.min) != null)) {
            let { min, max } = range;
            min = min === null || min === void 0 ? void 0 : min.replace('+', ' ');
            max = max === null || max === void 0 ? void 0 : max.replace('+', ' ');
            if (min || max) {
                const chevron = max && !min ? '<' : !max && min ? '>' : null;
                if (chevron) {
                    expression.definitionExpression = `${field} ${chevron} '${min !== null && min !== void 0 ? min : max}'`;
                }
                else {
                    expression.definitionExpression = `${field} BETWEEN '${min}' AND '${max}'`;
                }
                return true;
            }
        }
        return false;
    }
    updateCodedValueExpression(expression, layerField) {
        var _a, _b;
        if (!(layerField === null || layerField === void 0 ? void 0 : layerField.domain) || ((_a = layerField === null || layerField === void 0 ? void 0 : layerField.domain) === null || _a === void 0 ? void 0 : _a.type) !== 'coded-value') {
            return false;
        }
        const domain = layerField.domain;
        const codedValuesMap = domain.codedValues.reduce((acc, { code, name }) => {
            acc[code] = name;
            return acc;
        }, {});
        expression.codedValues = codedValuesMap;
        expression.fields = Object.keys(codedValuesMap);
        if ((_b = expression.selectedFields) === null || _b === void 0 ? void 0 : _b.length) {
            const selectedFieldsExpression = expression.selectedFields.map((field) => (typeof field === 'number' ? field : `'${handleSingleQuote(field)}'`)).join(',');
            expression.definitionExpression = `${expression.field} IN (${selectedFieldsExpression})`;
            return true;
        }
        return false;
    }
    updateRangeExpression(expression, layerField) {
        var _a;
        if (!(layerField === null || layerField === void 0 ? void 0 : layerField.domain) || ((_a = layerField === null || layerField === void 0 ? void 0 : layerField.domain) === null || _a === void 0 ? void 0 : _a.type) !== 'range') {
            return false;
        }
        const { field, range } = expression;
        expression.min = layerField.domain.minValue;
        expression.max = layerField.domain.maxValue;
        if (range && Object.keys(range).length) {
            expression.definitionExpression = `${field} BETWEEN ${range.min} AND ${range.max}`;
            return true;
        }
        return false;
    }
    async getFeatureAttributes(layer, expression) {
        if (!this.isLayerSupported(layer)) {
            expression.fields = [];
            return;
        }
        const queryLayer = await this.getQueryLayer(layer);
        const { maxRecordCount, supportsMaxRecordCountFactor } = this.extractQueryCapabilities(layer);
        const featureCount = await queryLayer.queryFeatureCount();
        const query = this.createQuery(queryLayer, expression);
        await this.queryDistinctFeatures(queryLayer, query, expression);
        if (this.shouldPaginate(maxRecordCount, featureCount, supportsMaxRecordCountFactor)) {
            this.handlePagination(queryLayer, query, maxRecordCount, supportsMaxRecordCountFactor, featureCount, expression);
        }
    }
    isLayerSupported(layer) {
        return layer && supportedTypes.includes(layer.type);
    }
    extractQueryCapabilities(queryLayer) {
        var _a, _b, _c, _d, _e, _f;
        return {
            maxRecordCount: (_c = (_b = (_a = queryLayer.capabilities) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.maxRecordCount) !== null && _c !== void 0 ? _c : (_d = queryLayer.sourceJSON) === null || _d === void 0 ? void 0 : _d.maxRecordCount,
            supportsMaxRecordCountFactor: (_f = (_e = queryLayer.capabilities) === null || _e === void 0 ? void 0 : _e.query) === null || _f === void 0 ? void 0 : _f.supportsMaxRecordCountFactor,
        };
    }
    createQuery(queryLayer, expression) {
        const query = queryLayer.createQuery();
        this.applyCacheHint(queryLayer, query);
        const field = expression === null || expression === void 0 ? void 0 : expression.field;
        if (field) {
            const initDefExpr = this.getInitDefExprFromLayer(queryLayer);
            query.where = initDefExpr || '1=1';
            query.outFields = [field];
            query.orderByFields = [`${field} ASC`];
            query.returnDistinctValues = true;
            query.returnGeometry = false;
            query.maxRecordCountFactor = 5;
            this.applyQueryGeometryFromExtentSelector(query);
        }
        return query;
    }
    async queryDistinctFeatures(queryLayer, query, expression) {
        if (!query.outFields)
            return;
        const features = (await this.queryForFeatures(queryLayer, query, query.outFields[0]));
        if (features === null || features === void 0 ? void 0 : features.length) {
            expression.fields = [...new Set(features)];
            if (expression.type === 'string') {
                expression.fields = expression.fields.sort();
            }
            else if (expression.type === 'number') {
                expression.fields = expression.fields.sort((a, b) => a - b);
            }
        }
    }
    getQueryCount(maxRecordCount, supportsMaxRecordCountFactor) {
        return supportsMaxRecordCountFactor ? maxRecordCount * 5 : maxRecordCount;
    }
    shouldPaginate(maxRecordCount, featureCount, supportsMaxRecordCountFactor) {
        const queryCount = this.getQueryCount(maxRecordCount, supportsMaxRecordCountFactor);
        return maxRecordCount != null && featureCount > queryCount;
    }
    async handlePagination(queryLayer, query, maxRecordCount, supportsMaxRecordCountFactor, featureCount, expression) {
        const queryCount = this.getQueryCount(maxRecordCount, supportsMaxRecordCountFactor);
        const promises = [];
        for (let index = queryCount; index < featureCount; index += queryCount) {
            const paginatedQuery = query.clone();
            paginatedQuery.num = maxRecordCount;
            paginatedQuery.start = index;
            promises.push(this.queryForFeatures(queryLayer, paginatedQuery, query.outFields[0]));
        }
        Promise.all(promises).then(results => {
            results.forEach((features) => {
                if ((features === null || features === void 0 ? void 0 : features.length) && expression.fields) {
                    expression.fields.push(...features);
                }
            });
            expression.fields = [...new Set(expression.fields)].sort();
            this.filterLayerExpressions = [...this.filterLayerExpressions];
        });
    }
    async queryForFeatures(layer, query, field) {
        const results = await layer.queryFeatures(query);
        const features = results === null || results === void 0 ? void 0 : results.features.filter(feature => { var _a; return (_a = feature.attributes) === null || _a === void 0 ? void 0 : _a[field]; });
        return features === null || features === void 0 ? void 0 : features.map(feature => { var _a; return (_a = feature.attributes) === null || _a === void 0 ? void 0 : _a[field]; });
    }
    async calculateMinMaxStatistics(layer, field) {
        if (!layer || !supportedTypes.includes(layer.type) || !field) {
            return [];
        }
        const query = this.createStatisticsQuery(layer, field);
        const results = await layer.queryFeatures(query);
        return (results === null || results === void 0 ? void 0 : results.features) || [];
    }
    createStatisticsQuery(layer, field) {
        const query = layer.createQuery();
        query.where = this.getInitDefExprFromLayer(layer) || '1=1';
        this.applyCacheHint(layer, query);
        query.outStatistics = [
            {
                onStatisticField: field,
                outStatisticFieldName: `max${field}`,
                statisticType: 'max',
            },
            {
                onStatisticField: field,
                outStatisticFieldName: `min${field}`,
                statisticType: 'min',
            },
        ];
        this.applyQueryGeometryFromExtentSelector(query);
        return query;
    }
    getExtent(extentSelector, extentSelectorConfig) {
        if (extentSelector && extentSelectorConfig) {
            const { constraints } = extentSelectorConfig;
            let newConstraints = Object.assign({}, constraints);
            const geometry = newConstraints === null || newConstraints === void 0 ? void 0 : newConstraints.geometry;
            if (geometry) {
                const tmpExtent = 'extent' in geometry ? geometry : this.geometryJsonUtils.fromJSON(geometry);
                if ((tmpExtent === null || tmpExtent === void 0 ? void 0 : tmpExtent.type) === 'extent' || (tmpExtent === null || tmpExtent === void 0 ? void 0 : tmpExtent.type) === 'polygon') {
                    return tmpExtent;
                }
            }
        }
        return;
    }
    async setInitExpression(layerExpression, expression) {
        if (!expression.field || !expression.type) {
            await this.updateExpression(layerExpression, expression, undefined);
            return;
        }
        const filterLayer = this.findFilterLayer(layerExpression);
        if (!filterLayer) {
            return;
        }
        if (filterLayer.loadStatus === 'not-loaded' || filterLayer.loadStatus === 'failed') {
            await filterLayer.load();
        }
        await filterLayer.when(async () => {
            var _a, _b;
            const layerField = (_a = filterLayer.fields) === null || _a === void 0 ? void 0 : _a.find(({ name }) => name === expression.field);
            const domainType = (_b = layerField === null || layerField === void 0 ? void 0 : layerField.domain) === null || _b === void 0 ? void 0 : _b.type;
            expression.type = domainType === 'coded-value' || domainType === 'range' ? domainType : expression.type;
            await this.updateExpression(layerExpression, expression, layerField);
        });
    }
    async updateExpression(layerExpression, expression, layerField) {
        const update = await this.handleExpressionType(layerExpression, expression, layerField);
        if (update) {
            this.generateOutput(layerExpression);
        }
    }
    async handleExpressionType(layerExpression, expression, layerField) {
        var _a;
        switch (expression.type) {
            case 'string':
                return await this.updateStringExpression(layerExpression, expression);
            case 'number':
                return await this.updateNumberExpression(layerExpression, expression);
            case 'date':
                return this.updateDateExpressionBasedOnDisplayOption(layerExpression, expression);
            case 'coded-value':
                return this.updateCodedValueExpression(expression, layerField);
            case 'range':
                return this.updateRangeExpressionBasedOnDisplayOption(layerExpression, expression, layerField);
            case 'checkbox':
            case null:
                return (_a = expression.active) !== null && _a !== void 0 ? _a : false;
            default:
                return false;
        }
    }
    async updateDateExpressionBasedOnDisplayOption(layerExpression, expression) {
        if (expression.displayOption === 'drop-down') {
            return await this.updateStringExpression(layerExpression, expression);
        }
        else {
            return await this.updateDateExpression(layerExpression, expression);
        }
    }
    async updateRangeExpressionBasedOnDisplayOption(layerExpression, expression, layerField) {
        if (expression.displayOption === 'drop-down') {
            return await this.updateStringExpression(layerExpression, expression);
        }
        else {
            return this.updateRangeExpression(expression, layerField);
        }
    }
    updateRangeExpressions(expression, layerExpression, max, min) {
        const initExp = this.getInitDefExprFromLayerExpression(layerExpression);
        if ((min || min === 0) && (max || max === 0)) {
            if (min === (expression === null || expression === void 0 ? void 0 : expression.min) && max === (expression === null || expression === void 0 ? void 0 : expression.max)) {
                expression.definitionExpression = undefined;
                expression.active = false;
            }
            else {
                expression.definitionExpression = initExp ? `(${initExp}) AND ${expression === null || expression === void 0 ? void 0 : expression.field} BETWEEN ${min} AND ${max}` : `${expression === null || expression === void 0 ? void 0 : expression.field} BETWEEN ${min} AND ${max}`;
                expression.active = true;
            }
        }
        expression.range = { min, max };
    }
    handleCheckboxChange(layerExpression, expression, event) {
        const node = event.target;
        expression.active = node.checked;
        this.generateOutput(layerExpression);
    }
    handleSliderChange(expression, layerExpression, event) {
        const { maxValue, minValue } = event.target;
        this.updateRangeExpressions(expression, layerExpression, maxValue, minValue);
        this.generateOutput(layerExpression);
    }
    handleComboSelect(expression, layerExpression, event) {
        const combobox = event.target;
        const items = combobox.selectedItems;
        const { field, type } = expression;
        expression.selectedFields = items.map(({ value }) => value);
        if (items.length) {
            const values = items.map(({ value }) => (typeof value === 'number' ? value : `'${handleSingleQuote(value)}'`));
            expression.definitionExpression = type === 'date' ? values.map(value => this.buildDateExpression(value, field)).join(' OR ') : `${field} IN (${values.join(',')})`;
            expression.active = true;
        }
        else {
            expression.definitionExpression = undefined;
            expression.active = false;
        }
        this.generateOutput(layerExpression);
    }
    handleDatePickerRangeChange(expression, layerExpression, event) {
        const datePicker = event.target;
        const [startDate, endDate] = datePicker.valueAsDate;
        const start = startDate ? convertToDate(Math.floor(startDate.getTime()), true) : undefined;
        const end = endDate ? convertToDate(Math.floor(endDate.getTime()), true) : undefined;
        if (start || end) {
            expression.definitionExpression = this.constructDefinitionExpression(expression.field, start, end);
            expression.range = { min: start, max: end };
            expression.active = true;
            this.generateOutput(layerExpression);
        }
    }
    constructDefinitionExpression(field, start, end) {
        if (!start)
            return `${field} < '${end}'`;
        if (!end)
            return `${field} > '${start}'`;
        return `${field} BETWEEN '${start}' AND '${end}'`;
    }
    handleURLParams() {
        if (!('URLSearchParams' in window))
            return;
        const params = new URLSearchParams(document.location.search);
        const filterParamString = params.get('filter');
        if (!filterParamString) {
            this.filterCount = 0;
            return;
        }
        const filters = filterParamString.split(';').map(filter => JSON.parse(filter));
        this.filterCount = this.applyFilters(filters);
    }
    applyFilters(filters) {
        let filterCount = 0;
        filters.forEach(filter => {
            var _a, _b;
            const layerExpression = (_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.find(le => le.id === filter.layerId);
            if (!layerExpression)
                return;
            (_b = layerExpression.expressions) === null || _b === void 0 ? void 0 : _b.forEach(expression => {
                var _a, _b;
                if (((_a = expression.id) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = filter.expressionId) === null || _b === void 0 ? void 0 : _b.toString())) {
                    this.activateExpression(expression, filter);
                    filterCount++;
                }
            });
        });
        return filterCount;
    }
    activateExpression(expression, filter) {
        expression.active = true;
        if (filter.type === 'range') {
            expression.range = filter.range;
        }
        else if (filter.type === 'select') {
            expression.selectedFields = filter.selectedFields;
        }
    }
    createURLParamExpression(layerExpression, expression) {
        const { id, range, selectedFields, type } = expression;
        if (type === 'string' || type === 'coded-value' || (expression === null || expression === void 0 ? void 0 : expression.numDisplayOption) === 'drop-down' || (expression === null || expression === void 0 ? void 0 : expression.displayOption) === 'drop-down') {
            return {
                type: 'select',
                layerId: layerExpression.id,
                expressionId: id.toString(),
                selectedFields,
            };
        }
        else if (type === 'number' || type === 'range' || type === 'date') {
            return {
                type: 'range',
                layerId: layerExpression.id,
                expressionId: id.toString(),
                range,
            };
        }
        else {
            return {
                layerId: layerExpression.id,
                expressionId: id.toString(),
            };
        }
    }
    autoUpdateURLCheck(params) {
        if (this.autoUpdateUrl) {
            const url = params.toString() ? `${window.location.pathname}?${params}`.trim() : window.location.pathname;
            window.history.replaceState({}, '', url);
        }
    }
    generateURLParams() {
        var _a;
        if (!('URLSearchParams' in window))
            return;
        const params = new URLSearchParams(window.location.search);
        const expressions = ((_a = this.filterLayerExpressions) === null || _a === void 0 ? void 0 : _a.flatMap(layerExpr => { var _a; return ((_a = layerExpr === null || layerExpr === void 0 ? void 0 : layerExpr.expressions) === null || _a === void 0 ? void 0 : _a.filter(expression => expression.active).map(expression => JSON.stringify(this.createURLParamExpression(layerExpr, expression)))) || []; })) || [];
        this.filterCount = expressions.length;
        expressions.length > 0 ? params.set('filter', expressions.join(';')) : params.delete('filter');
        this.autoUpdateURLCheck(params);
        this.urlParams = params;
    }
    updateFilter(layerExpression, defExpressions, filters) {
        const { id } = layerExpression;
        const fl = (this.view.map.findLayerById(id) || this.view.map.findTableById(id));
        if (fl != null) {
            if (fl.type === 'point-cloud') {
                this.updateFilterLayerPCLFilter(fl, filters);
            }
            else if (fl.type === 'map-image') {
                const sublayer = fl.findSublayerById(layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.sublayerId);
                if (sublayer != null) {
                    this.updateFilterLayerDefExpression(sublayer, defExpressions, layerExpression);
                }
            }
            else {
                this.updateFilterLayerDefExpression(fl, defExpressions, layerExpression);
            }
        }
    }
    updateFilterLayerDefExpression(layer, defExpressions, layerExpression) {
        const { operator } = layerExpression;
        let initDefExpressions = this.getInitDefExprFromLayer(layer);
        const combinedExpressions = (defExpressions === null || defExpressions === void 0 ? void 0 : defExpressions.length) > 0 && initDefExpressions != null
            ? `(${defExpressions.join(operator)}) AND (${initDefExpressions})`
            : defExpressions.length > 0
                ? defExpressions.join(operator)
                : initDefExpressions;
        layer.definitionExpression = combinedExpressions;
    }
    updateFilterLayerPCLFilter(layer, filters) {
        layer.filters = filters;
    }
    async handleWhenView() {
        if (this.view == null)
            return;
        const map = this.view.map;
        await map.loadAll();
        this.handleLayerExpressionsUpdate();
    }
    async handleLayerExpressionsUpdate() {
        if (this.view == null)
            return;
        const map = this.view.map;
        this.initDefExpressions = {};
        this.initPointCloudFilters = {};
        this.initMapImageExpressions = {};
        map.allLayers.concat(map.allTables).forEach(layer => {
            if (!supportedTypes.includes(layer.type))
                return;
            const fl = layer;
            if (fl.type === 'point-cloud') {
                this.initPointCloudFilters[fl.id] = fl.filters;
            }
            else if (fl.type === 'map-image') {
                this.initMapImageExpressions[fl.id] = fl.allSublayers.reduce((acc, sublayer) => {
                    acc[sublayer.id] = sublayer.definitionExpression;
                    return acc;
                }, {});
            }
            else {
                this.initDefExpressions[fl.id] = fl.definitionExpression;
            }
        });
        this.initExpressions();
        this.handleURLParams();
    }
    async handleZoomTo(layerExpression) {
        const zoomId = (layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.sublayerId) ? `#zoom-to-${layerExpression.id}-${layerExpression.sublayerId}` : `#zoom-to-${layerExpression.id}`;
        const zoomToBtn = this.panelEl.querySelector(zoomId);
        const toggleZoomButtonState = (isLoading, isDisabled) => {
            if (zoomToBtn) {
                zoomToBtn.loading = isLoading;
                zoomToBtn.disabled = isDisabled;
            }
        };
        toggleZoomButtonState(true, true);
        await this.getZoomToExtent(layerExpression);
        const goToOptions = this.zoomToExtent.type === 'point' && this.zoomToExtent.count === 1 ? { target: this.zoomToExtent.extent, zoom: 10 } : this.zoomToExtent.extent;
        await this.view.goTo(goToOptions);
        toggleZoomButtonState(false, false);
    }
    async getZoomToExtent(layerExpression) {
        var _a;
        const layerView = this.view.allLayerViews.find(({ layer }) => layer.id === layerExpression.id);
        const baseLayer = layerView.layer;
        const layer = baseLayer.type === 'map-image' ? baseLayer.findSublayerById(layerExpression.sublayerId) : baseLayer;
        if (layer.type !== 'point-cloud' && supportedTypes.includes(layer === null || layer === void 0 ? void 0 : layer.type)) {
            const queryLayer = await this.getQueryLayer(layer);
            const query = queryLayer.createQuery();
            query.where = (_a = queryLayer.definitionExpression) !== null && _a !== void 0 ? _a : '1=1';
            const results = await queryLayer.queryExtent(query);
            this.zoomToExtent = Object.assign(Object.assign({}, results), { type: queryLayer.geometryType });
        }
    }
    applyFilterToQuery(query, layerExpression) {
        var _a, _b;
        const layerView = this.view.allLayerViews.find(({ layer }) => layer.id === layerExpression.id);
        const filter = (_b = (_a = layerView === null || layerView === void 0 ? void 0 : layerView.featureEffect) === null || _a === void 0 ? void 0 : _a.filter) !== null && _b !== void 0 ? _b : layerView.filter;
        if (filter) {
            ['objectIds', 'distance', 'geometry', 'spatialRelationship', 'units', 'where', 'timeExtent'].forEach(prop => {
                if (filter[prop] != null) {
                    query[prop] = filter[prop];
                }
            });
        }
    }
    generateOutput(layerExpression) {
        if (this.view == null)
            return;
        const defExpressions = [];
        let filters = [];
        if (layerExpression) {
            for (const expression of layerExpression.expressions) {
                const { active, definitionExpression, pointCloudFilters } = expression;
                if (active && definitionExpression) {
                    defExpressions.push(`(${definitionExpression})`);
                }
                if (active && pointCloudFilters != null && pointCloudFilters.length > 0) {
                    filters = filters.concat(pointCloudFilters);
                }
            }
            this.updateFilter(layerExpression, defExpressions, filters);
            this.generateURLParams();
            this.filterUpdate.emit();
        }
    }
    numberWithCommas(num) {
        return num.toLocaleString('en-US', { maximumFractionDigits: 20 });
    }
    // If fieldInfo.format.places limits decimal digits then use this for min value to make sure the min is actually included in slider.
    // e.g. when using Math.round() with a min of 1.058 with only 2 decimal places would be 1.06 so the slider wouldn't contain the min. Math.floor() ensures it does.
    // Inverse of this reasoning for roundMaxNumberUp().
    scientificRounding(num, decimalPlaces, operation) {
        if (num == null)
            return undefined;
        let result;
        if (!String(num).includes('e')) {
            result = Math[operation](num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
        }
        else {
            const [base, exponent] = String(num)
                .split('e')
                .map(item => Number(item));
            const adjustedExponent = exponent + decimalPlaces;
            const adjustedNumber = Math[operation](+`${base}e${adjustedExponent}`);
            result = adjustedNumber * Math.pow(10, -decimalPlaces);
        }
        return +result.toFixed(decimalPlaces);
    }
    roundMinNumberDown(num, decimalPlaces) {
        return this.scientificRounding(num, decimalPlaces, 'floor');
    }
    roundMaxNumberUp(num, decimalPlaces) {
        return this.scientificRounding(num, decimalPlaces, 'ceil');
    }
    roundNumber(num, decimalPlaces) {
        var _a;
        return (_a = this.scientificRounding(num, decimalPlaces, 'round')) !== null && _a !== void 0 ? _a : num;
    }
    setExpressionFormat(layer, expression, field) {
        if ((layer === null || layer === void 0 ? void 0 : layer.popupTemplate) != null) {
            const fieldInfo = layer.popupTemplate.fieldInfos.find(({ fieldName }) => fieldName === field);
            expression.format = fieldInfo === null || fieldInfo === void 0 ? void 0 : fieldInfo.format;
        }
    }
    getInitDefExprFromLayer(layer) {
        var _a, _b, _c;
        return layer.type === 'sublayer' ? (_b = (_a = this.initMapImageExpressions) === null || _a === void 0 ? void 0 : _a[layer.layer.id]) === null || _b === void 0 ? void 0 : _b[layer.id] : (_c = this.initDefExpressions) === null || _c === void 0 ? void 0 : _c[layer.id];
    }
    getInitDefExprFromLayerExpression(layerExpression) {
        var _a, _b, _c;
        return (layerExpression === null || layerExpression === void 0 ? void 0 : layerExpression.sublayerId) != null ? (_b = (_a = this.initMapImageExpressions) === null || _a === void 0 ? void 0 : _a[layerExpression.id]) === null || _b === void 0 ? void 0 : _b[layerExpression.sublayerId] : (_c = this.initDefExpressions) === null || _c === void 0 ? void 0 : _c[layerExpression.id];
    }
    findFilterLayer(layerExpression) {
        const allLayersAndTables = this.view.map.allLayers.concat(this.view.map.allTables);
        const layer = allLayersAndTables.find(({ id }) => id === layerExpression.id);
        if (layer.type === 'map-image') {
            return layer === null || layer === void 0 ? void 0 : layer.findSublayerById(layerExpression.sublayerId);
        }
        else {
            return layer;
        }
    }
    createLabel(expression, value) {
        var _a, _b, _c;
        if (expression.type === 'coded-value') {
            return (_a = expression.codedValues) === null || _a === void 0 ? void 0 : _a[value];
        }
        if (expression.type === 'number' && typeof value === 'number') {
            let formattedValue = value;
            if (((_b = expression.format) === null || _b === void 0 ? void 0 : _b.places) != null) {
                formattedValue = this.roundNumber(value, expression.format.places);
            }
            if ((_c = expression.format) === null || _c === void 0 ? void 0 : _c.digitSeparator) {
                return this.numberWithCommas(formattedValue);
            }
            return formattedValue;
        }
        if (expression.type === 'date' && !expression.dateOnly) {
            const format = this.intl.convertDateFormatToIntlOptions('short-date-long-time');
            return this.intl.formatDate(value, format);
        }
        return value;
    }
    buildDateExpression(date, field) {
        if (date) {
            const tmpDate = new Date(date);
            const tmpCompareDate = new Date(date);
            const tmpCompareDate1 = new Date(tmpCompareDate.setDate(tmpDate.getDate() + 1));
            const formattedDate = `${tmpDate.getFullYear()}-${tmpDate.getMonth() + 1}-${tmpDate.getDate()}`;
            const time = `${tmpDate.getHours()}:${tmpDate.getMinutes()}:${tmpDate.getSeconds()}`;
            const compareTime = `${tmpCompareDate1.getHours()}:${tmpCompareDate1.getMinutes()}:${tmpCompareDate1.getSeconds()}`;
            const compareFormattedDate = `${tmpCompareDate1.getFullYear()}-${tmpCompareDate1.getMonth() + 1}-${tmpCompareDate1.getDate()}`;
            return `${field} BETWEEN '${formattedDate} ${time}' AND '${compareFormattedDate} ${compareTime}'`;
        }
        return;
    }
    async getQueryLayer(layer) {
        return layer.type === 'sublayer' ? await layer.createFeatureLayer() : layer;
    }
    applyCacheHint(queryLayer, query) {
        var _a, _b;
        if ((_b = (_a = queryLayer === null || queryLayer === void 0 ? void 0 : queryLayer.capabilities) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.supportsCacheHint) {
            query.cacheHint = true;
        }
    }
    applyQueryGeometryFromExtentSelector(query) {
        if (!this.extentSelector || !this.extentSelectorConfig)
            return;
        const geometry = this.getExtent(this.extentSelector, this.extentSelectorConfig);
        if (!geometry)
            return;
        query.geometry = geometry;
        query.spatialRelationship = 'intersects';
    }
    get el() { return this; }
    static get watchers() { return {
        "view": ["watchViewHandler"],
        "layerExpressions": ["watchLayerExpressions"]
    }; }
    static get style() { return InstantAppsFilterListStyle0; }
}, [1, "instant-apps-filter-list", {
        "layerExpressions": [1040],
        "autoUpdateUrl": [4, "auto-update-url"],
        "closeBtn": [4, "close-btn"],
        "closeBtnOnClick": [16],
        "comboboxOverlayPositioning": [1, "combobox-overlay-positioning"],
        "closeBtnText": [1, "close-btn-text"],
        "openFilters": [4, "open-filters"],
        "extentSelector": [4, "extent-selector"],
        "extentSelectorConfig": [16],
        "urlParams": [1040],
        "filterCount": [1026, "filter-count"],
        "view": [16],
        "zoomBtn": [4, "zoom-btn"],
        "resetBtn": [4, "reset-btn"],
        "resetFiltersOnDisconnect": [4, "reset-filters-on-disconnect"],
        "loading": [32],
        "filterLayerExpressions": [32],
        "messages": [32],
        "baseClass": [32],
        "disabled": [32],
        "hasLayerExpression": [32],
        "initDefExpressions": [32],
        "initMapImageExpressions": [32],
        "initPointCloudFilters": [32],
        "getFilterInitState": [64],
        "forceReset": [64],
        "restoreFilters": [64]
    }, undefined, {
        "view": ["watchViewHandler"],
        "layerExpressions": ["watchLayerExpressions"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-filter-list", "calcite-action", "calcite-action-menu", "calcite-block", "calcite-button", "calcite-checkbox", "calcite-chip", "calcite-combobox", "calcite-combobox-item", "calcite-date-picker", "calcite-date-picker-day", "calcite-date-picker-month", "calcite-date-picker-month-header", "calcite-graph", "calcite-handle", "calcite-icon", "calcite-input-date-picker", "calcite-input-text", "calcite-loader", "calcite-panel", "calcite-popover", "calcite-progress", "calcite-scrim", "calcite-slider"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-filter-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsFilterList);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$n();
            }
            break;
        case "calcite-action-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$m();
            }
            break;
        case "calcite-block":
            if (!customElements.get(tagName)) {
                defineCustomElement$l();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "calcite-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "calcite-chip":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "calcite-combobox":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "calcite-combobox-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "calcite-date-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "calcite-date-picker-day":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "calcite-date-picker-month":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "calcite-date-picker-month-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "calcite-graph":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "calcite-handle":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "calcite-input-date-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-input-text":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-panel":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-scrim":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "calcite-slider":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { InstantAppsFilterList as I, defineCustomElement as d };
