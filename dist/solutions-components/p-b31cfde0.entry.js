/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './p-6eb37ed2.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './p-06084e6c.js';
import { h as slotChangeGetAssignedElements } from './p-68ec5c15.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './p-18f18ab3.js';
import { c as connectLocalized, d as disconnectLocalized } from './p-939bc1b4.js';
import { u as updateMessages, c as connectMessages, d as disconnectMessages, s as setUpMessages } from './p-1a9a47a0.js';
import { t as toggleChildActionText, E as ExpandToggle } from './p-089bc565.js';
import { c as createObserver } from './p-c638d28e.js';
import { l as loadModules } from './p-4cd4cb85.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';
import './p-acaae81d.js';
import './p-fe6f7734.js';
import './p-7699e80b.js';
import './p-c5e13ebc.js';
import './p-0a24ad5f.js';
import './p-d4056c1c.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS$1 = {
    actionGroupEnd: "action-group--end",
    container: "container",
};
const SLOTS = {
    expandTooltip: "expand-tooltip",
};

const actionPadCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:block}@keyframes in{0%{opacity:0}100%{opacity:1}}:host{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:var(--calcite-action-pad-corner-radius, 0.125rem);background:transparent}:host([expanded][layout=vertical]) .container{max-inline-size:var(--calcite-action-pad-expanded-max-width, auto)}::slotted(calcite-action-group:not(:last-of-type)){border-block-end-width:1px}.container{display:inline-flex;flex-direction:column;overflow-y:auto;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);gap:var(--calcite-action-pad-items-space, 0);border-radius:calc(var(--calcite-action-pad-corner-radius, 0.125rem) * 2);background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1))}.action-group--bottom{flex-grow:1;justify-content:flex-end;padding-block-end:0px}:host([layout=horizontal]) .container{flex-direction:row}:host([layout=horizontal]) .container .action-group--bottom{padding:0px}:host([layout=horizontal]) .container ::slotted(calcite-action-group:not(:last-of-type)){border-inline-end-width:1px}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteActionPadStyle0 = actionPadCss;

const ActionPad = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteActionPadToggle = createEvent(this, "calciteActionPadToggle", 6);
        this.mutationObserver = createObserver("mutation", () => this.setGroupLayout(Array.from(this.el.querySelectorAll("calcite-action-group"))));
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
        this.setExpandToggleRef = (el) => {
            this.expandToggleEl = el;
        };
        this.handleDefaultSlotChange = (event) => {
            const groups = slotChangeGetAssignedElements(event).filter((el) => el?.matches("calcite-action-group"));
            this.setGroupLayout(groups);
        };
        this.handleTooltipSlotChange = (event) => {
            const tooltips = slotChangeGetAssignedElements(event).filter((el) => el?.matches("calcite-tooltip"));
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
        toggleChildActionText({ el: this.el, expanded });
    }
    layoutHandler() {
        this.updateGroups();
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    effectiveLocaleChange() {
        updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectConditionalSlotComponent(this);
        connectLocalized(this);
        connectMessages(this);
    }
    disconnectedCallback() {
        disconnectLocalized(this);
        disconnectMessages(this);
        disconnectConditionalSlotComponent(this);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        const { el, expanded } = this;
        toggleChildActionText({ el, expanded });
        await setUpMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
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
        await componentFocusable(this);
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
        const expandToggleNode = !expandDisabled ? (h(ExpandToggle, { collapseLabel: messages.collapseLabel, collapseText: messages.collapse, el: el, expandLabel: messages.expandLabel, expandText: messages.expand, expanded: expanded, position: position, ref: this.setExpandToggleRef, scale: scale, toggle: toggleExpand, tooltip: this.expandTooltip })) : null;
        return expandToggleNode ? (h("calcite-action-group", { class: CSS$1.actionGroupEnd, label: actionsEndGroupLabel, layout: layout, overlayPositioning: overlayPositioning, scale: scale }, h("slot", { name: SLOTS.expandTooltip, onSlotchange: this.handleTooltipSlotChange }), expandToggleNode)) : null;
    }
    render() {
        return (h(Host, { key: '5bbd7e4402b9d4f0a319c7c8fe98ce20a9646d89', onCalciteActionMenuOpen: this.actionMenuOpenHandler }, h("div", { key: '7757b0e8e4b47eacd05fd99a74d564ff855c157d', class: CSS$1.container }, h("slot", { key: '2d9e826255494320a4c374282fa8b0c59ed26ddd', onSlotchange: this.handleDefaultSlotChange }), this.renderBottomActionGroup())));
    }
    static get delegatesFocus() { return true; }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
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
        registerInstance(this, hostRef);
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
        return (h(Host, { key: 'f49b77294093fbd2a6b31cb1081367b9151f575b' }, h("div", { key: '9a6ac16c6184c4416e9f2a287e0faaf9ff0a533b', class: CSS.base }, h("div", { key: '5ba7577ad0b9978113e854fcea10086f2758d07c', ref: el => {
                this._measureElement = el;
            } }), h("div", { key: 'adcacc2ea84e2c3d292407df71336a4d2cace92a', class: CSS.hide, ref: el => {
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
        const [Measurement, CoordinateConversion, Conversion] = await loadModules([
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
    get el() { return getElement(this); }
    static get watchers() { return {
        "activeTool": ["_updateToolType"]
    }; }
};
InstantAppsMeasurementTool.style = InstantAppsMeasurementToolStyle0;

export { ActionPad as calcite_action_pad, InstantAppsMeasurementTool as instant_apps_measurement_tool };
