/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { h, r as registerInstance, c as createEvent, H as Host, d as readTask, g as getElement } from './p-4e6eb06e.js';
import { e as slotChangeGetAssignedElements, b as focusElementInGroup } from './p-621ad249.js';
import { c as createObserver } from './p-ff336351.js';
import { g as guid } from './p-7d542581.js';
import { c as connectLocalized, d as disconnectLocalized } from './p-895e7b9c.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './p-efaa77a0.js';
import './p-91371f97.js';
import './p-4f82eb55.js';
import './p-233f219c.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS$1 = {
    actionIcon: "action-icon",
    actionIconStart: "action-icon--start",
    actionIconEnd: "action-icon--end",
    actionContainer: "action-container",
    stepBarContainer: "step-bar-container",
    singleView: "single-view",
};

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    stepBar: "step-bar",
    stepBarActive: "step-bar--active",
    stepBarComplete: "step-bar--complete",
    stepBarDisabled: "step-bar--disabled",
    stepBarError: "step-bar--error",
    stepBarInActive: "step-bar--inactive",
};
const StepBar = ({ disabled, active, complete, error, key, }) => (h("svg", { class: {
        [CSS.stepBar]: true,
    }, key: key }, h("rect", { class: {
        [CSS.stepBarActive]: active,
        [CSS.stepBarComplete]: complete,
        [CSS.stepBarDisabled]: disabled,
        [CSS.stepBarError]: error,
        [CSS.stepBarInActive]: true,
    }, width: "100%", x: "0", y: "0" })));

const stepperCss = ":host([scale=s]){--calcite-internal-stepper-item-spacing-unit-s:0.25rem;--calcite-internal-stepper-action-block-size:2.75rem;--calcite-internal-stepper-action-inline-size:2rem;--calcite-internal-step-bar-gap:0.25rem}:host([scale=m]){--calcite-internal-stepper-item-spacing-unit-s:0.5rem;--calcite-internal-stepper-action-block-size:3.25rem;--calcite-internal-stepper-action-inline-size:2.5rem}:host([scale=l]){--calcite-internal-stepper-item-spacing-unit-s:0.75rem;--calcite-internal-stepper-action-block-size:4rem;--calcite-internal-stepper-action-inline-size:3rem;--calcite-internal-step-bar-gap:0.75rem}:host{display:flex}.container{position:relative;display:flex;inline-size:100%;min-inline-size:-moz-fit-content;min-inline-size:fit-content;flex-direction:row;flex-wrap:wrap;align-items:stretch;justify-content:space-between}:host([layout=vertical]) .container{flex:1 1 auto;flex-direction:column}:host([layout=horizontal]) .container,:host([layout=horizontal-single]) .container{display:grid;grid-template-areas:\"items\" \"content\";gap:0.5rem var(--calcite-internal-stepper-item-spacing-unit-s)}:host([layout=horizontal][scale=s]) .container,:host([layout=horizontal-single][scale=s]) .container{gap:0.25rem var(--calcite-internal-stepper-item-spacing-unit-s)}:host([layout=horizontal][scale=l]) .container,:host([layout=horizontal-single][scale=l]) .container{gap:0.75rem var(--calcite-internal-stepper-item-spacing-unit-s)}:host([layout=horizontal]) .container.single-view{display:flex;grid-template-columns:none}.action-icon{position:relative;display:flex;flex-grow:0;block-size:var(--calcite-internal-stepper-action-block-size);inline-size:var(--calcite-internal-stepper-action-inline-size)}.action-container{position:absolute;display:flex;justify-content:space-between;padding-block:0.25rem;inline-size:100%}.step-bar{display:flex;block-size:100%;inline-size:100%}.step-bar-container{position:absolute;display:flex;align-items:flex-start;justify-content:space-between;block-size:0.125rem;inline-size:100%;gap:var(--calcite-internal-step-bar-gap, 0.5rem)}.step-bar--inactive{fill:var(--calcite-color-border-3, #dfdfdf);fill-opacity:1;block-size:100%}.step-bar--active{fill:var(--calcite-color-brand)}.step-bar--complete{fill:var(--calcite-color-brand);fill-opacity:0.5}.step-bar--error{fill:var(--calcite-color-status-danger)}.step-bar--disabled{opacity:0.5}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteStepperStyle0 = stepperCss;

const Stepper = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteStepperChange = createEvent(this, "calciteStepperChange", 6);
        this.calciteStepperItemChange = createEvent(this, "calciteStepperItemChange", 6);
        this.calciteInternalStepperItemChange = createEvent(this, "calciteInternalStepperItemChange", 6);
        this.enabledItems = [];
        this.itemMap = new Map();
        this.items = [];
        this.mutationObserver = createObserver("mutation", () => this.updateItems());
        /** Specifies if the user is viewing one `stepper-item` at a time when the page width is less than sum of min-width of each item. */
        this.multipleViewMode = false;
        this.guid = `calcite-stepper-action-${guid()}`;
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
                this.emitItemSelect();
            }
        };
        this.setContainerEl = (el) => {
            this.containerEl = el;
        };
        this.handleDefaultSlotChange = (event) => {
            const items = slotChangeGetAssignedElements(event).filter((el) => el?.tagName === "CALCITE-STEPPER-ITEM");
            this.items = items;
            const spacing = Array(items.length).fill("1fr").join(" ");
            this.containerEl.style.gridTemplateAreas = spacing;
            this.containerEl.style.gridTemplateColumns = spacing;
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
    }
    handleItemPropChange() {
        this.updateItems();
        this.determineActiveStepper();
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
        this.mutationObserver?.observe(this.el, { childList: true });
        this.updateItems();
        connectMessages(this);
        connectLocalized(this);
    }
    async componentWillLoad() {
        await setUpMessages(this);
    }
    componentDidLoad() {
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
        disconnectMessages(this);
        disconnectLocalized(this);
        this.mutationObserver?.disconnect();
    }
    render() {
        return (h(Host, { key: 'cf7174442aa44f3a2bd72893900a60bcbf7e1d5e', "aria-label": this.messages.label, role: "region" }, h("div", { key: '1036b66baff637f74ca2296c725f8ec091955c55', class: { container: true, [CSS$1.singleView]: this.layout === "horizontal-single" }, ref: this.setContainerEl }, this.layout === "horizontal-single" && (h("div", { key: '2ebc80f63ea8938538630181ac165712ce645b69', class: { [CSS$1.stepBarContainer]: true } }, this.items.map((item, index) => (h(StepBar, { active: index === this.currentActivePosition, complete: item.complete && index !== this.currentActivePosition && !item.error, disabled: item.disabled && index !== this.currentActivePosition, error: item.error && index !== this.currentActivePosition, key: index }))))), this.layout === "horizontal-single" && (h("div", { key: 'c471f0b44071da745850a7a5910894f27eccce02', class: { [CSS$1.actionContainer]: true } }, this.renderAction("start"), this.renderAction("end"))), h("slot", { key: 'd7f6599abe59d4ed86e0deefe991a3556fe3e270', onSlotchange: this.handleDefaultSlotChange }))));
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
                focusElementInGroup(this.enabledItems, itemToFocus, "next");
                break;
            case "ArrowUp":
            case "ArrowLeft":
                focusElementInGroup(this.enabledItems, itemToFocus, "previous");
                break;
            case "Home":
                focusElementInGroup(this.enabledItems, itemToFocus, "first");
                break;
            case "End":
                focusElementInGroup(this.enabledItems, itemToFocus, "last");
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
    handleItemSelect() {
        this.emitItemSelect();
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
        updateMessages(this, this.effectiveLocale);
    }
    handlePositionChange() {
        readTask(() => {
            this.determineActiveStepper();
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    emitItemSelect() {
        this.calciteStepperItemChange.emit();
        this.calciteStepperChange.emit();
    }
    updateItems() {
        this.el.querySelectorAll("calcite-stepper-item").forEach((item) => {
            item.icon = this.icon;
            item.numbered = this.numbered;
            item.layout = this.layout;
            item.scale = this.scale;
        });
    }
    determineActiveStepper() {
        const { items } = this;
        if (items.length < 2) {
            return;
        }
        const { currentActivePosition, layout } = this;
        this.multipleViewMode = layout !== "horizontal-single";
        items.forEach((item, index) => {
            item.hidden = layout === "horizontal-single" && index !== (currentActivePosition || 0);
        });
    }
    getEnabledStepIndex(startIndex, direction = "next") {
        const { items, currentActivePosition } = this;
        let newIndex = startIndex;
        while (items[newIndex]?.disabled && this.layout !== "horizontal-single") {
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
        return layout === "horizontal-single" && !multipleViewMode ? (h("calcite-action", { alignment: "center", appearance: "transparent", class: {
                [CSS$1.actionIcon]: true,
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
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "icon": ["handleItemPropChange"],
        "layout": ["handleItemPropChange"],
        "numbered": ["handleItemPropChange"],
        "scale": ["handleItemPropChange"],
        "numberingSystem": ["numberingSystemChange"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"],
        "currentActivePosition": ["handlePositionChange"]
    }; }
};
Stepper.style = CalciteStepperStyle0;

export { Stepper as calcite_stepper };
