/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const guid = require('./guid-e84a8375.js');
const interactive = require('./interactive-a128ac30.js');
const loadable = require('./loadable-1c888c87.js');
const logger = require('./logger-f177776b.js');
require('./browser-333a21c5.js');
require('./config-e76d9931.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
const CSS = {
    checked: "checked",
    description: "description",
    descriptionOnly: "description-only",
    disabled: "disabled",
    heading: "heading",
    headingOnly: "heading-only",
    icon: "icon",
    iconOnly: "icon-only",
    inputAlignmentEnd: "input-alignment-end",
    inputAlignmentStart: "input-alignment-start",
    inputEnabled: "input-enabled",
    largeVisual: "large-visual",
    tile: "tile",
    tileContentContainer: "tile-content-container",
    tileContent: "tile-content",
    tileDescription: "tile-description",
    tileHeading: "tile-heading",
    tileLargeVisual: "tile--large-visual",
    widthAuto: "width-auto",
    widthFull: "width-full",
};

const tileSelectCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host .container{background-color:var(--calcite-color-foreground-1);box-shadow:0 0 0 1px var(--calcite-color-border-2);box-sizing:border-box;cursor:pointer;display:inline-block;block-size:100%;max-inline-size:300px;padding:0.75rem;position:relative;vertical-align:top;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}:host .container.checked{z-index:var(--calcite-z-index);box-shadow:0 0 0 1px var(--calcite-color-brand)}:host .container.heading-only{align-items:center}:host .container:not(.input-enabled) ::slotted(calcite-checkbox),:host .container:not(.input-enabled) ::slotted(calcite-radio-button){position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host .container.focused{outline-color:transparent}:host .container.focused:not(.disabled):not(.input-enabled){outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          );outline-offset:-4px;box-shadow:0 0 0 1px var(--calcite-color-brand), inset 0 0 0 2px var(--calcite-color-foreground-1)}:host .container.input-enabled.input-alignment-start.width-auto.heading-only,:host .container.input-enabled.input-alignment-start.width-auto.icon-only,:host .container.input-enabled.input-alignment-start.width-auto.description-only,:host .container.input-enabled.input-alignment-start.width-auto.heading.description,:host .container.input-enabled.input-alignment-start.width-auto.icon.description,:host .container.input-enabled.input-alignment-start.width-auto.heading.icon.description{display:inline-grid;grid-template-columns:max-content 1fr}:host .container.input-enabled.input-alignment-start.heading-only,:host .container.input-enabled.input-alignment-start.icon-only,:host .container.input-enabled.input-alignment-start.description-only,:host .container.input-enabled.input-alignment-start.heading.description,:host .container.input-enabled.input-alignment-start.icon.description,:host .container.input-enabled.input-alignment-start.heading.icon.description{gap:0.75rem}:host .container.input-enabled.input-alignment-start .tile{order:1}:host .container.input-enabled.input-alignment-start.large-visual ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-start.large-visual ::slotted(calcite-radio-button){position:absolute;inset-block-start:0.75rem;inset-inline-start:0.75rem}:host .container.input-enabled.input-alignment-end.width-auto.heading-only,:host .container.input-enabled.input-alignment-end.width-auto.icon-only{display:inline-grid;grid-gap:0.75rem;grid-template-columns:max-content 1fr}:host .container.input-enabled.input-alignment-end.heading-only,:host .container.input-enabled.input-alignment-end.icon-only{gap:0.75rem}:host .container.input-enabled.input-alignment-end.description-only ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-end.description-only ::slotted(calcite-radio-button),:host .container.input-enabled.input-alignment-end.heading.description ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-end.heading.description ::slotted(calcite-radio-button),:host .container.input-enabled.input-alignment-end.icon.description ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-end.icon.description ::slotted(calcite-radio-button),:host .container.input-enabled.input-alignment-end.heading.icon.description ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-end.heading.icon.description ::slotted(calcite-radio-button){position:absolute;inset-block-start:0.75rem;inset-inline-end:0.75rem}:host .container.input-enabled.input-alignment-end.large-visual ::slotted(calcite-checkbox),:host .container.input-enabled.input-alignment-end.large-visual ::slotted(calcite-radio-button){position:absolute;inset-block-start:0.75rem;inset-inline-end:0.75rem}:host .container.width-full{display:flex;max-inline-size:none}:host .container.width-full .tile{flex:1 1 auto}.tile{pointer-events:none;box-sizing:border-box;display:flex;-webkit-user-select:none;-moz-user-select:none;user-select:none;flex-direction:column;gap:0.5rem;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-3);transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.tile-content-container{display:flex;inline-size:100%;align-items:stretch;padding:0px;color:var(--calcite-color-text-2);outline-color:transparent}.tile-content{display:flex;flex:1 1 auto;flex-direction:column;gap:0.5rem;inline-size:10%}.tile-heading{pointer-events:none;overflow-wrap:break-word;font-size:var(--calcite-font-size--1);line-height:1.375;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2);transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.tile-description{pointer-events:none;overflow-wrap:break-word;font-size:var(--calcite-font-size--2);line-height:1.375;color:var(--calcite-color-text-3);transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.tile--large-visual{display:grid;justify-content:center;text-align:center;min-block-size:12rem}.tile--large-visual .icon{align-self:flex-end}.tile--large-visual calcite-icon{block-size:64px;inline-size:64px}.tile--large-visual .tile-content-container{align-self:center}:host(:hover) .container:not(.input-enabled){box-shadow:0 0 0 1px var(--calcite-color-brand)}:host(:hover) .tile-heading,.checked .tile-heading{color:var(--calcite-color-text-1)}:host(:hover) .tile-description,.checked .tile-description{color:var(--calcite-color-text-2)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteTileSelectStyle0 = tileSelectCss;

logger.logger.deprecated("component", {
    name: "tile-select",
    removalVersion: 4,
    suggested: ["tile", "tile-group"],
});
const TileSelect = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteTileSelectChange = index.createEvent(this, "calciteTileSelectChange", 6);
        this.guid = `calcite-tile-select-${guid.guid()}`;
        this.checked = false;
        this.description = undefined;
        this.disabled = false;
        this.heading = undefined;
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.name = undefined;
        this.inputEnabled = false;
        this.inputAlignment = "start";
        this.type = "radio";
        this.value = undefined;
        this.width = "auto";
        this.focused = false;
    }
    checkedChanged(newChecked) {
        this.input.checked = newChecked;
    }
    nameChanged(newName) {
        this.input.name = newName;
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        return this.input?.setFocus();
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    checkboxChangeHandler(event) {
        const checkbox = event.target;
        if (checkbox === this.input) {
            this.checked = checkbox.checked;
        }
        event.stopPropagation();
        this.calciteTileSelectChange.emit();
    }
    checkboxFocusBlurHandler(event) {
        const checkbox = event.target;
        if (checkbox === this.input) {
            this.focused = event.detail;
        }
        event.stopPropagation();
    }
    radioButtonChangeHandler(event) {
        const radioButton = event.target;
        if (radioButton === this.input) {
            this.checked = radioButton.checked;
        }
        event.stopPropagation();
        this.calciteTileSelectChange.emit();
    }
    radioButtonCheckedChangeHandler(event) {
        const radioButton = event.target;
        if (radioButton === this.input) {
            this.checked = radioButton.checked;
        }
        event.stopPropagation();
    }
    radioButtonFocusBlurHandler(event) {
        const radioButton = event.target;
        if (radioButton === this.input) {
            this.focused = radioButton.focused;
        }
        event.stopPropagation();
    }
    clickHandler(event) {
        if (this.disabled) {
            return;
        }
        const target = event.target;
        const targets = ["calcite-tile", "calcite-tile-select"];
        if (targets.includes(target.localName)) {
            this.input.click();
        }
    }
    pointerEnterHandler() {
        if (this.disabled) {
            return;
        }
        const { localName } = this.input;
        if (localName === "calcite-radio-button" || localName === "calcite-checkbox") {
            this.input.hovered = true;
        }
    }
    pointerLeaveHandler() {
        if (this.disabled) {
            return;
        }
        const { localName } = this.input;
        if (localName === "calcite-radio-button" || localName === "calcite-checkbox") {
            this.input.hovered = false;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        this.renderInput();
    }
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    disconnectedCallback() {
        this.input.parentNode.removeChild(this.input);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderInput() {
        this.input =
            this.type === "radio"
                ? /* we need to call createElement(x) separately to ensure supporting components are properly bundled */
                    document.createElement("calcite-radio-button")
                : document.createElement("calcite-checkbox");
        this.input.checked = this.checked;
        this.input.disabled = this.disabled;
        this.input.hidden = this.el.hidden;
        this.input.id = this.guid;
        this.input.label = this.heading || this.name || "";
        if (this.name) {
            this.input.name = this.name;
        }
        if (this.value) {
            this.input.value = this.value != null ? this.value.toString() : "";
        }
        this.el.insertAdjacentElement("beforeend", this.input);
    }
    render() {
        const { checked, description, disabled, focused, heading, icon, inputAlignment, inputEnabled, width, iconFlipRtl, } = this;
        const isLargeVisual = heading && icon && !description;
        const renderIcon = Boolean(icon);
        return (index.h(interactive.InteractiveContainer, { key: 'b4fb6d82534b03b51abeb0837e82f0eebf03e882', disabled: disabled }, index.h("div", { key: 'b600dccfa114222d765c7937e0a01646c59ef5e9', class: {
                checked,
                container: true,
                [CSS.description]: Boolean(description),
                [CSS.descriptionOnly]: Boolean(!heading && !icon && description),
                disabled,
                focused,
                [CSS.heading]: Boolean(heading),
                [CSS.headingOnly]: heading && !icon && !description,
                [CSS.icon]: renderIcon,
                [CSS.iconOnly]: !heading && icon && !description,
                [CSS.inputAlignmentEnd]: inputAlignment === "end",
                [CSS.inputAlignmentStart]: inputAlignment === "start",
                [CSS.inputEnabled]: inputEnabled,
                [CSS.largeVisual]: isLargeVisual,
                [CSS.widthAuto]: width === "auto",
                [CSS.widthFull]: width === "full",
            } }, index.h("div", { key: '3beecb159a117c775e541fd658e7a3b8426c10c7', class: { [CSS.tile]: true, [CSS.tileLargeVisual]: isLargeVisual } }, icon && (index.h("div", { key: 'b1be68fded421b3196c0ab1af79f64df378a8def', class: { [CSS.icon]: renderIcon } }, index.h("calcite-icon", { key: '515fb12c5d3d436fcf41f0029a79f2a613d4c36d', flipRtl: iconFlipRtl, icon: icon, scale: "l" }))), index.h("div", { key: 'b1e4da0dcdf03bcd4690664e95bd83231af5d4a7', class: CSS.tileContentContainer }, index.h("div", { key: '439d258883fb6223b36fca919bdeb4eb5a586286', class: CSS.tileContent }, heading && index.h("div", { key: '84292dd16f68a95f562cfc0cfc8a8f33e922f5bd', class: CSS.tileHeading }, heading), description && index.h("div", { key: '7d6eb7bb116c6f98656348cca96efa1b446347ee', class: CSS.tileDescription }, description)))), index.h("slot", { key: '2fe8ada0d56e69984b02b47bb08e5b66d551ae47' }))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "checked": ["checkedChanged"],
        "name": ["nameChanged"]
    }; }
};
TileSelect.style = CalciteTileSelectStyle0;

exports.calcite_tile_select = TileSelect;
