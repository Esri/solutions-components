/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-164d485a.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-12c4fcfb.js';
import { s as slotChangeGetAssignedElements } from './dom-38c6f027.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable-37e7fbd6.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale-904407bf.js';
import { u as updateMessages, c as connectMessages, d as disconnectMessages, s as setUpMessages } from './t9n-436fb2b1.js';
import { t as toggleChildActionText, E as ExpandToggle } from './ExpandToggle-b6eb575e.js';
import { c as createObserver } from './observers-d04d1da9.js';
import { l as loadModules } from './loadModules-877bbb89.js';
import './guid-b75a5f7b.js';
import './resources-8834f920.js';
import './key-c83d835f.js';
import './resources-b0e2b809.js';
import './resources-20074cb1.js';
import './esri-loader-1b324844.js';
import './_commonjsHelpers-0f74c230.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS$1 = {
    actionGroupEnd: "action-group--end",
    container: "container",
};
const SLOTS = {
    expandTooltip: "expand-tooltip",
};

const actionPadCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host{display:block}@keyframes in{0%{opacity:0}100%{opacity:1}}:host{animation:in var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:0.125rem;--calcite-action-pad-expanded-max-width:auto;background:transparent}:host([expanded][layout=vertical]) .container{max-inline-size:var(--calcite-action-pad-expanded-max-width)}::slotted(calcite-action-group){border-width:0px;border-block-end-width:1px;border-style:solid;border-color:var(--calcite-color-border-3);padding-block:0px}.container{display:inline-flex;flex-direction:column;overflow-y:auto;border-radius:0.25rem;background-color:var(--calcite-color-background);--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.action-group--bottom{flex-grow:1;justify-content:flex-end;padding-block-end:0px}:host([layout=horizontal]) .container{flex-direction:row}:host([layout=horizontal]) .container .action-group--bottom{padding:0px}:host([layout=horizontal]) .container ::slotted(calcite-action-group){border-width:0px;padding:0px;border-inline-end-width:1px}::slotted(calcite-action-group:last-child){border-block-end-width:0px}:host([hidden]){display:none}[hidden]{display:none}";

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
            const groups = slotChangeGetAssignedElements(event).filter((el) => el === null || el === void 0 ? void 0 : el.matches("calcite-action-group"));
            this.setGroupLayout(groups);
        };
        this.handleTooltipSlotChange = (event) => {
            const tooltips = slotChangeGetAssignedElements(event).filter((el) => el === null || el === void 0 ? void 0 : el.matches("calcite-tooltip"));
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
        var _a;
        await componentFocusable(this);
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.focus();
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
        const expandToggleNode = !expandDisabled ? (h(ExpandToggle, { collapseText: messages.collapse, el: el, expandText: messages.expand, expanded: expanded, position: position, scale: scale, toggle: toggleExpand, tooltip: this.expandTooltip,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.setExpandToggleRef })) : null;
        return expandToggleNode ? (h("calcite-action-group", { class: CSS$1.actionGroupEnd, label: actionsEndGroupLabel, layout: layout, overlayPositioning: overlayPositioning, scale: scale }, h("slot", { name: SLOTS.expandTooltip, onSlotchange: this.handleTooltipSlotChange }), expandToggleNode)) : null;
    }
    render() {
        return (h(Host, { onCalciteActionMenuOpen: this.actionMenuOpenHandler }, h("div", { class: CSS$1.container }, h("slot", { onSlotchange: this.handleDefaultSlotChange }), this.renderBottomActionGroup())));
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
ActionPad.style = actionPadCss;

const instantAppsMeasurementToolCss = ".sc-instant-apps-measurement-tool-h .esri-measurement.sc-instant-apps-measurement-tool,.sc-instant-apps-measurement-tool-h .esri-coordinate-conversion.sc-instant-apps-measurement-tool{width:300px}.sc-instant-apps-measurement-tool-h .instant-apps-measurement-tool__hide.sc-instant-apps-measurement-tool{display:none}";

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
        return (h(Host, null, h("div", { class: CSS.base }, h("div", { ref: el => {
                this._measureElement = el;
            } }), h("div", { class: CSS.hide, ref: el => {
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
InstantAppsMeasurementTool.style = instantAppsMeasurementToolCss;

export { ActionPad as calcite_action_pad, InstantAppsMeasurementTool as instant_apps_measurement_tool };
