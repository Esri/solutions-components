/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const conditionalSlot = require('./conditionalSlot-37ff4832.js');
const dom = require('./dom-795d4a33.js');
const loadable = require('./loadable-1c888c87.js');
const locale = require('./locale-da840314.js');
const t9n = require('./t9n-ed5c03a7.js');
const ExpandToggle = require('./ExpandToggle-2cdd9a8e.js');
const observers = require('./observers-18d87cb5.js');
const loadModules = require('./loadModules-8567855e.js');
require('./guid-e84a8375.js');
require('./resources-18f799c7.js');
require('./browser-333a21c5.js');
require('./key-47c9469a.js');
require('./resources-9c07e2ea.js');
require('./resources-b3dc59f7.js');
require('./esri-loader-08dc41bd.js');
require('./_commonjsHelpers-baf43783.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS$1 = {
    actionGroupEnd: "action-group--end",
    container: "container",
};
const SLOTS = {
    expandTooltip: "expand-tooltip",
};

const actionPadCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:block}@keyframes in{0%{opacity:0}100%{opacity:1}}:host{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:var(--calcite-action-pad-corner-radius, 0.125rem);background:transparent}:host([expanded][layout=vertical]) .container{max-inline-size:var(--calcite-action-pad-expanded-max-width, auto)}:host([layout=vertical]) ::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:1px}.container{display:inline-flex;flex-direction:column;overflow-y:auto;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);gap:var(--calcite-action-pad-items-space, 0);border-radius:calc(var(--calcite-action-pad-corner-radius, 0.125rem) * 2);background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1))}.action-group--bottom{flex-grow:1;justify-content:flex-end;padding-block-end:0px}:host([layout=horizontal]) .container{flex-direction:row}:host([layout=horizontal]) .container .action-group--bottom{padding:0px}:host([layout=horizontal]) .container ::slotted(calcite-action-group:not(:last-of-type)){border-inline-end-width:1px}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteActionPadStyle0 = actionPadCss;

const ActionPad = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteActionPadToggle = index.createEvent(this, "calciteActionPadToggle", 6);
        this.mutationObserver = observers.createObserver("mutation", () => this.setGroupLayout(Array.from(this.el.querySelectorAll("calcite-action-group"))));
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.actionMenuOpenHandler = (event) => {
            if (event.target.menuOpen) {
                const composedPath = event.composedPath();
                Array.from(this.el.querySelectorAll("calcite-action-group")).forEach((group) => {
                    if (!composedPath.includes(group)) {
                        group.menuOpen = false;
                    }
                });
            }
        };
        this.toggleExpand = () => {
            this.expanded = !this.expanded;
            this.calciteActionPadToggle.emit();
        };
        this.handleDefaultSlotChange = (event) => {
            const groups = dom.slotChangeGetAssignedElements(event).filter((el) => el?.matches("calcite-action-group"));
            this.setGroupLayout(groups);
        };
        this.handleTooltipSlotChange = (event) => {
            const tooltips = dom.slotChangeGetAssignedElements(event).filter((el) => el?.matches("calcite-tooltip"));
            this.expandTooltip = tooltips[0];
        };
        this.actionsEndGroupLabel = undefined;
        this.expandDisabled = false;
        this.expanded = false;
        this.layout = "vertical";
        this.position = undefined;
        this.scale = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.overlayPositioning = "absolute";
        this.expandTooltip = undefined;
        this.effectiveLocale = "";
        this.defaultMessages = undefined;
    }
    expandedHandler(expanded) {
        ExpandToggle.toggleChildActionText({ el: this.el, expanded });
    }
    layoutHandler() {
        this.updateGroups();
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        conditionalSlot.connectConditionalSlotComponent(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    }
    disconnectedCallback() {
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        conditionalSlot.disconnectConditionalSlotComponent(this);
        this.mutationObserver?.disconnect();
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        const { el, expanded } = this;
        ExpandToggle.toggleChildActionText({ el, expanded });
        await t9n.setUpMessages(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /**
     * Sets focus on the component's first focusable element.
     */
    async setFocus() {
        await loadable.componentFocusable(this);
        this.el?.focus();
    }
    updateGroups() {
        this.setGroupLayout(Array.from(this.el.querySelectorAll("calcite-action-group")));
    }
    setGroupLayout(groups) {
        groups.forEach((group) => (group.layout = this.layout));
    }
    // --------------------------------------------------------------------------
    //
    //  Component Methods
    //
    // --------------------------------------------------------------------------
    renderBottomActionGroup() {
        const { expanded, expandDisabled, messages, el, position, toggleExpand, scale, layout, actionsEndGroupLabel, overlayPositioning, } = this;
        const expandToggleNode = !expandDisabled ? (index.h(ExpandToggle.ExpandToggle, { collapseLabel: messages.collapseLabel, collapseText: messages.collapse, el: el, expandLabel: messages.expandLabel, expandText: messages.expand, expanded: expanded, position: position, scale: scale, toggle: toggleExpand, tooltip: this.expandTooltip })) : null;
        return expandToggleNode ? (index.h("calcite-action-group", { class: CSS$1.actionGroupEnd, label: actionsEndGroupLabel, layout: layout, overlayPositioning: overlayPositioning, scale: scale }, index.h("slot", { name: SLOTS.expandTooltip, onSlotchange: this.handleTooltipSlotChange }), expandToggleNode)) : null;
    }
    render() {
        return (index.h(index.Host, { key: 'ca50c5f475d78b92b5347ab912727587420ceea5', onCalciteActionMenuOpen: this.actionMenuOpenHandler }, index.h("div", { key: '81b26e9b6bd0a04357fe00ef55111c6bb609f4e7', class: CSS$1.container }, index.h("slot", { key: 'e346dc6cfab0e26cfc694b43063715d7b845ae32', onSlotchange: this.handleDefaultSlotChange }), this.renderBottomActionGroup())));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "expanded": ["expandedHandler"],
        "layout": ["layoutHandler"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
ActionPad.style = CalciteActionPadStyle0;

const instantAppsMeasurementToolCss = ".sc-instant-apps-measurement-tool-h .esri-measurement.sc-instant-apps-measurement-tool,.sc-instant-apps-measurement-tool-h .esri-coordinate-conversion.sc-instant-apps-measurement-tool{width:300px}.sc-instant-apps-measurement-tool-h .instant-apps-measurement-tool__hide.sc-instant-apps-measurement-tool{display:none}";
const InstantAppsMeasurementToolStyle0 = instantAppsMeasurementToolCss;

const base = 'instant-apps-measurement-tool';
const CSS = {
    base,
    hide: `${base}__hide`,
};
const InstantAppsMeasurementTool = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.view = undefined;
        this.measureConfiguration = undefined;
        this.activeTool = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    async componentWillLoad() {
        await this._initModules();
    }
    componentDidLoad() {
        this._init();
    }
    render() {
        return (index.h(index.Host, { key: '4357b8a39789ea390bedfcd96f4d21c1a0211484' }, index.h("div", { key: 'b42cca8e290ba490b8a1afca1818c9d95dfcc32b', class: CSS.base }, index.h("div", { key: '59be3dd42e293dcd8f7fa3e132fa65cfef12ffa7', ref: el => {
                this._measureElement = el;
            } }), index.h("div", { key: '2ee6045804e3b7eeb3db1a5bdb5dc5d0cf15a5c8', class: CSS.hide, ref: el => {
                this._coordinateElement = el;
            } }))));
    }
    disconnectedCallback() {
        var _a, _b;
        (_a = this._measureWidget) === null || _a === void 0 ? void 0 : _a.destroy();
        (_b = this._coordinateWidget) === null || _b === void 0 ? void 0 : _b.destroy();
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Load esri javascript api modules
     *
     * @returns Promise resolving when function is done
     *
     * @protected
     */
    async _initModules() {
        const [Measurement, CoordinateConversion, Conversion] = await loadModules.loadModules([
            'esri/widgets/Measurement',
            'esri/widgets/CoordinateConversion',
            'esri/widgets/CoordinateConversion/support/Conversion',
        ]);
        this.Measurement = Measurement;
        this.CoordinateConversion = CoordinateConversion;
        this.Conversion = Conversion;
    }
    /**
     * Initialize the measurement widget
     *
     */
    _init() {
        this._initMeasurementWidget();
        this._initCoordinateWidget();
    }
    _updateToolType(tool) {
        this._setActiveTool(tool);
    }
    /**
     * Initialize the measurement widget and listen to key events
     *
     * @protected
     */
    _initMeasurementWidget() {
        if (this.view && this._measureElement && !this._measureWidget) {
            this._measureWidget = new this.Measurement(Object.assign({ view: this.view, container: this._measureElement }, this.measureConfiguration));
            if (this.measureConfiguration.activeToolType)
                this._setActiveTool(this.measureConfiguration.activeToolType);
        }
    }
    _setActiveTool(tool) {
        var _a, _b, _c;
        const viewType = this.view.type;
        this._measureWidget.clear();
        (_a = this._coordinateElement) === null || _a === void 0 ? void 0 : _a.classList.add(CSS.hide);
        if (tool === 'distance') {
            this._measureWidget.activeTool = viewType === '2d' ? 'distance' : 'direct-line';
        }
        else if (tool === 'area') {
            this._measureWidget.activeTool = 'area';
        }
        else if (tool === 'point') {
            (_c = (_b = this._coordinateElement) === null || _b === void 0 ? void 0 : _b.classList) === null || _c === void 0 ? void 0 : _c.remove(CSS.hide);
        }
    }
    _initCoordinateWidget() {
        var _a, _b;
        const { activeToolType, coordinateFormat } = this.measureConfiguration;
        if ((this === null || this === void 0 ? void 0 : this.view) && this._coordinateElement && !this._coordinateWidget) {
            this._coordinateWidget = new this.CoordinateConversion({ view: this.view, storageEnabled: false, container: this._coordinateElement });
            if (coordinateFormat != null) {
                const format = this._coordinateWidget.formats.find(f => {
                    return f.name === coordinateFormat;
                });
                (_b = (_a = this._coordinateWidget) === null || _a === void 0 ? void 0 : _a.conversions) === null || _b === void 0 ? void 0 : _b.splice(0, 0, new this.Conversion({ format }));
            }
        }
        if (activeToolType != null)
            this._setActiveTool(activeToolType);
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "activeTool": ["_updateToolType"]
    }; }
};
InstantAppsMeasurementTool.style = InstantAppsMeasurementToolStyle0;

exports.calcite_action_pad = ActionPad;
exports.instant_apps_measurement_tool = InstantAppsMeasurementTool;
