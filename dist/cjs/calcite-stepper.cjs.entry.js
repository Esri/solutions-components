/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const dom = require('./dom-c9c2c835.js');
const observers = require('./observers-db4527e4.js');
const guid = require('./guid-ae73cd27.js');
const locale = require('./locale-d237c9d5.js');
const t9n = require('./t9n-993a84de.js');
require('./resources-9447c777.js');
require('./key-c5504030.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS$1 = {
    stepBar: "step-bar",
    stepBarActive: "step-bar--active",
    stepBarComplete: "step-bar--complete",
    stepBarDisabled: "step-bar--disabled",
    stepBarError: "step-bar--error",
    stepBarInActive: "step-bar--inactive",
};
const StepBar = ({ disabled, active, complete, error, key, }) => (index.h("svg", { class: {
        [CSS$1.stepBar]: true,
    }, key: key }, index.h("rect", { class: {
        [CSS$1.stepBarActive]: active,
        [CSS$1.stepBarComplete]: complete,
        [CSS$1.stepBarDisabled]: disabled,
        [CSS$1.stepBarError]: error,
        [CSS$1.stepBarInActive]: true,
    }, width: "100%", x: "0", y: "0" })));

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const ITEM_MIN_WIDTH = {
    s: 120,
    m: 180,
    l: 200,
};
const CSS = {
    actionIcon: "action-icon",
    actionIconStart: "action-icon--start",
    actionIconEnd: "action-icon--end",
    actionContainer: "action-container",
    stepBarContainer: "step-bar-container",
    singleView: "single-view",
};

const stepperCss = ":host([scale=s]){--calcite-internal-stepper-item-spacing-unit-s:0.25rem;--calcite-internal-stepper-action-block-size:2.75rem;--calcite-internal-stepper-action-inline-size:2rem;--calcite-internal-step-bar-gap:0.25rem}:host([scale=m]){--calcite-internal-stepper-item-spacing-unit-s:0.5rem;--calcite-internal-stepper-action-block-size:3.25rem;--calcite-internal-stepper-action-inline-size:2.5rem}:host([scale=l]){--calcite-internal-stepper-item-spacing-unit-s:0.75rem;--calcite-internal-stepper-action-block-size:4rem;--calcite-internal-stepper-action-inline-size:3rem;--calcite-internal-step-bar-gap:0.75rem}:host{display:flex}.container{position:relative;display:flex;inline-size:100%;min-inline-size:-moz-fit-content;min-inline-size:fit-content;flex-direction:row;flex-wrap:wrap;align-items:stretch;justify-content:space-between}:host([layout=vertical]) .container{flex:1 1 auto;flex-direction:column}:host([layout=horizontal]) .container{display:grid;grid-template-areas:\"items\" \"content\";gap:0.5rem var(--calcite-internal-stepper-item-spacing-unit-s)}:host([layout=horizontal][scale=s]) .container{gap:0.25rem var(--calcite-internal-stepper-item-spacing-unit-s)}:host([layout=horizontal][scale=l]) .container{gap:0.75rem var(--calcite-internal-stepper-item-spacing-unit-s)}:host([layout=horizontal]) .container.single-view{display:flex;grid-template-columns:none}.action-icon{position:relative;display:flex;flex-grow:0;block-size:var(--calcite-internal-stepper-action-block-size);inline-size:var(--calcite-internal-stepper-action-inline-size)}.action-container{position:absolute;display:flex;justify-content:space-between;padding-block:0.25rem;inline-size:100%}.step-bar{display:flex;block-size:100%;inline-size:100%}.step-bar-container{position:absolute;display:flex;align-items:flex-start;justify-content:space-between;block-size:0.125rem;inline-size:100%;gap:var(--calcite-internal-step-bar-gap, 0.5rem)}.step-bar--inactive{fill:var(--calcite-color-border-3, #dfdfdf);fill-opacity:1;block-size:100%}.step-bar--active{fill:var(--calcite-color-brand)}.step-bar--complete{fill:var(--calcite-color-brand);fill-opacity:0.5}.step-bar--error{fill:var(--calcite-color-status-danger)}.step-bar--disabled{opacity:0.5}:host([hidden]){display:none}[hidden]{display:none}";

const Stepper = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteStepperItemChange = index.createEvent(this, "calciteStepperItemChange", 6);
        this.calciteInternalStepperItemChange = index.createEvent(this, "calciteInternalStepperItemChange", 6);
        this.enabledItems = [];
        this.itemMap = new Map();
        this.items = [];
        this.mutationObserver = observers.createObserver("mutation", () => this.updateItems());
        /** Specifies if the user is viewing one `stepper-item` at a time when the page width is less than sum of min-width of each item. */
        this.multipleViewMode = false;
        this.guid = `calcite-stepper-action-${guid.guid()}`;
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.resizeObserver = observers.createObserver("resize", (entries) => (this.elWidth = entries[0].contentRect.width));
        this.handleActionClick = (event) => {
            const currentActivePosition = this.currentActivePosition;
            const target = event.target;
            if (target.getAttribute("data-position") === "start") {
                this.prevStep();
            }
            else {
                this.nextStep();
            }
            if (typeof this.currentActivePosition === "number" &&
                currentActivePosition !== this.currentActivePosition &&
                !this.items[this.currentActivePosition].disabled) {
                this.calciteStepperItemChange.emit();
            }
        };
        this.setContainerEl = (el) => {
            this.containerEl = el;
        };
        this.handleDefaultSlotChange = (event) => {
            const items = dom.slotChangeGetAssignedElements(event).filter((el) => (el === null || el === void 0 ? void 0 : el.tagName) === "CALCITE-STEPPER-ITEM");
            this.items = items;
            this.setGridTemplateColumns(items);
            this.setStepperItemNumberingSystem();
        };
        this.icon = false;
        this.layout = "horizontal";
        this.numbered = false;
        this.scale = "m";
        this.messages = undefined;
        this.numberingSystem = undefined;
        this.selectedItem = null;
        this.messageOverrides = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = "";
        this.currentActivePosition = undefined;
        this.elWidth = undefined;
    }
    handleItemPropChange() {
        this.updateItems();
    }
    numberingSystemChange() {
        this.setStepperItemNumberingSystem();
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        var _a;
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true });
        this.updateItems();
        t9n.connectMessages(this);
        locale.connectLocalized(this);
    }
    async componentWillLoad() {
        await t9n.setUpMessages(this);
    }
    componentDidLoad() {
        var _a;
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.observe(this.containerEl);
        // if no stepper items are set as active, default to the first one
        if (typeof this.currentActivePosition !== "number") {
            const enabledStepIndex = this.getFirstEnabledStepperPosition();
            if (enabledStepIndex === 0) {
                this.currentActivePosition = enabledStepIndex;
            }
            this.calciteInternalStepperItemChange.emit({
                position: enabledStepIndex,
            });
        }
    }
    disconnectedCallback() {
        var _a, _b;
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        t9n.disconnectMessages(this);
        locale.disconnectLocalized(this);
        (_b = this.mutationObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
    }
    render() {
        return (index.h(index.Host, { "aria-label": this.messages.label, role: "region" }, index.h("div", { class: { container: true, [CSS.singleView]: !this.multipleViewMode }, ref: this.setContainerEl }, !this.multipleViewMode && this.layout === "horizontal" && (index.h("div", { class: { [CSS.stepBarContainer]: true } }, this.items.map((item, index$1) => (index.h(StepBar, { active: index$1 === this.currentActivePosition, complete: item.complete && index$1 !== this.currentActivePosition && !item.error, disabled: item.disabled && index$1 !== this.currentActivePosition, error: item.error && index$1 !== this.currentActivePosition, key: index$1 }))))), index.h("div", { class: { [CSS.actionContainer]: true } }, this.renderAction("start"), this.renderAction("end")), index.h("slot", { onSlotchange: this.handleDefaultSlotChange }))));
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    calciteInternalStepperItemKeyEvent(event) {
        const item = event.detail.item;
        const itemToFocus = event.target;
        switch (item.key) {
            case "ArrowDown":
            case "ArrowRight":
                dom.focusElementInGroup(this.enabledItems, itemToFocus, "next");
                break;
            case "ArrowUp":
            case "ArrowLeft":
                dom.focusElementInGroup(this.enabledItems, itemToFocus, "previous");
                break;
            case "Home":
                dom.focusElementInGroup(this.enabledItems, itemToFocus, "first");
                break;
            case "End":
                dom.focusElementInGroup(this.enabledItems, itemToFocus, "last");
                break;
        }
        event.stopPropagation();
    }
    registerItem(event) {
        const item = event.target;
        const { content, position } = event.detail;
        this.itemMap.set(item, { position, content });
        this.enabledItems = this.filterItems();
        event.stopPropagation();
    }
    updateItem(event) {
        const { position } = event.detail;
        if (typeof position === "number") {
            this.currentActivePosition = position;
            this.selectedItem = event.target;
        }
        this.calciteInternalStepperItemChange.emit({
            position,
        });
    }
    handleUserRequestedStepperItemSelect() {
        this.calciteStepperItemChange.emit();
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Set the next `calcite-stepper-item` as active. */
    async nextStep() {
        const enabledStepIndex = this.getEnabledStepIndex(this.currentActivePosition + 1, "next");
        if (typeof enabledStepIndex !== "number") {
            return;
        }
        this.updateStep(enabledStepIndex);
    }
    /** Set the previous `calcite-stepper-item` as active. */
    async prevStep() {
        const enabledStepIndex = this.getEnabledStepIndex(this.currentActivePosition - 1, "previous");
        if (typeof enabledStepIndex !== "number") {
            return;
        }
        this.updateStep(enabledStepIndex);
    }
    /**
     * Set a specified `calcite-stepper-item` as active.
     *
     * @param step
     */
    async goToStep(step) {
        const position = step - 1;
        if (this.currentActivePosition !== position) {
            this.updateStep(position);
        }
    }
    /** Set the first `calcite-stepper-item` as active. */
    async startStep() {
        const enabledStepIndex = this.getEnabledStepIndex(0, "next");
        if (typeof enabledStepIndex !== "number") {
            return;
        }
        this.updateStep(enabledStepIndex);
    }
    /** Set the last `calcite-stepper-item` as active. */
    async endStep() {
        const enabledStepIndex = this.getEnabledStepIndex(this.items.length - 1, "previous");
        if (typeof enabledStepIndex !== "number") {
            return;
        }
        this.updateStep(enabledStepIndex);
    }
    effectiveLocaleChange() {
        t9n.updateMessages(this, this.effectiveLocale);
    }
    handlePositionChange() {
        index.readTask(() => {
            this.determineActiveStepper(true);
        });
    }
    handleElWidthChange() {
        index.readTask(() => {
            this.determineActiveStepper();
        });
    }
    updateItems() {
        this.el.querySelectorAll("calcite-stepper-item").forEach((item) => {
            item.icon = this.icon;
            item.numbered = this.numbered;
            item.layout = this.layout;
            item.scale = this.scale;
        });
    }
    determineActiveStepper(currentActivePositionChanged = false) {
        const totalItems = this.items.length;
        if (!this.elWidth || !totalItems || this.layout !== "horizontal" || totalItems === 1) {
            return;
        }
        const activePosition = this.currentActivePosition || 0;
        const totalMinWidthOfItems = totalItems * this.getMinWidthOfStepperItem();
        const totalRowGap = (totalItems - 1) * (parseInt(window.getComputedStyle(this.containerEl).rowGap) || 0);
        if (this.elWidth <= totalMinWidthOfItems + totalRowGap) {
            this.multipleViewMode = false;
            this.items.forEach((item, index) => {
                if (index !== activePosition) {
                    item.hidden = true;
                }
                else {
                    item.hidden = false;
                    item.multipleViewMode = false;
                }
            });
        }
        else if (this.elWidth > totalMinWidthOfItems + totalRowGap) {
            if (this.multipleViewMode && !currentActivePositionChanged) {
                return;
            }
            this.multipleViewMode = true;
            this.setGridTemplateColumns(this.items);
            this.items.forEach((item) => {
                item.hidden = false;
                item.multipleViewMode = true;
            });
        }
    }
    getEnabledStepIndex(startIndex, direction = "next") {
        var _a;
        const { items, currentActivePosition } = this;
        let newIndex = startIndex;
        while (((_a = items[newIndex]) === null || _a === void 0 ? void 0 : _a.disabled) && this.multipleViewMode) {
            newIndex = newIndex + (direction === "previous" ? -1 : 1);
        }
        return newIndex !== currentActivePosition && newIndex < items.length && newIndex >= 0
            ? newIndex
            : null;
    }
    updateStep(position) {
        this.currentActivePosition = position;
        this.calciteInternalStepperItemChange.emit({
            position,
        });
    }
    filterItems() {
        return this.items.filter((item) => !item.disabled);
    }
    setStepperItemNumberingSystem() {
        this.items.forEach((item) => {
            item.numberingSystem = this.numberingSystem;
        });
    }
    renderAction(position) {
        const isPositionStart = position === "start";
        const path = isPositionStart ? "chevron-left" : "chevron-right";
        const { currentActivePosition, multipleViewMode, layout } = this;
        const totalItems = this.items.length;
        const id = `${this.guid}-${isPositionStart ? "start" : "end"}`;
        return layout === "horizontal" && !multipleViewMode ? (index.h("calcite-action", { alignment: "center", appearance: "transparent", class: {
                [CSS.actionIcon]: true,
            }, compact: true, "data-position": position, disabled: (currentActivePosition === 0 && isPositionStart) ||
                (currentActivePosition === totalItems - 1 && !isPositionStart), icon: path, iconFlipRtl: true, id: id, onClick: this.handleActionClick, scale: this.scale, text: isPositionStart ? this.messages.previousStep : this.messages.nextStep })) : null;
    }
    getFirstEnabledStepperPosition() {
        const enabledStepIndex = this.items.findIndex((item) => !item.disabled);
        if (enabledStepIndex > -1) {
            return enabledStepIndex;
        }
        return 0;
    }
    setGridTemplateColumns(items) {
        const minWidth = this.getMinWidthOfStepperItem();
        const spacing = Array(items.length).fill(`minmax(${minWidth}px, 1fr)`).join(" ");
        this.containerEl.style.gridTemplateAreas = spacing;
        this.containerEl.style.gridTemplateColumns = spacing;
    }
    getMinWidthOfStepperItem() {
        return ITEM_MIN_WIDTH[this.scale];
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "icon": ["handleItemPropChange"],
        "layout": ["handleItemPropChange"],
        "numbered": ["handleItemPropChange"],
        "scale": ["handleItemPropChange"],
        "numberingSystem": ["numberingSystemChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"],
        "currentActivePosition": ["handlePositionChange"],
        "elWidth": ["handleElWidthChange"]
    }; }
};
Stepper.style = stepperCss;

exports.calcite_stepper = Stepper;
