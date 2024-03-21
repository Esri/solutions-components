/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const dom = require('./dom-c9c2c835.js');
const conditionalSlot = require('./conditionalSlot-9d7b60d1.js');
const loadable = require('./loadable-5a794992.js');
const t9n = require('./t9n-993a84de.js');
const interactive = require('./interactive-3ab7044d.js');
const locale = require('./locale-d237c9d5.js');
const observers = require('./observers-db4527e4.js');
const key = require('./key-c5504030.js');
const component = require('./component-ac7c3bd8.js');
const guid = require('./guid-ae73cd27.js');
const utils = require('./utils-65d812ea.js');
require('./resources-9447c777.js');
require('./browser-d08a5f99.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS$1 = {
    title: "title",
    close: "close",
    imageContainer: "image-container",
    chipIcon: "chip-icon",
    textSlotted: "text--slotted",
    container: "container",
    imageSlotted: "image--slotted",
    closable: "closable",
    multiple: "multiple",
    selectable: "selectable",
    selectIcon: "select-icon",
    selectIconActive: "select-icon--active",
    nonInteractive: "non-interactive",
    isCircle: "is-circle",
};
const SLOTS = {
    image: "image",
};
const ICONS = {
    close: "x",
    unchecked: "circle",
    checkedSingle: "circle-f",
    checked: "check-circle-f",
};

const chipCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]){block-size:1.5rem;font-size:var(--calcite-font-size--2);--calcite-chip-spacing-s-internal:0.25rem;--calcite-chip-spacing-l-internal:0.5rem}:host([scale=s]) .close,:host([scale=s]) .select-icon--active{block-size:1rem;inline-size:1rem}:host([scale=s]) .image-container{block-size:1.25rem;inline-size:1.25rem}:host([scale=s]) .container.is-circle{block-size:1.5rem;inline-size:1.5rem}:host([scale=m]){block-size:2rem;font-size:var(--calcite-font-size--1);--calcite-chip-spacing-s-internal:0.375rem;--calcite-chip-spacing-l-internal:0.5rem}:host([scale=m]) .close,:host([scale=m]) .image-container,:host([scale=m]) .select-icon--active{block-size:1.5rem;inline-size:1.5rem}:host([scale=m]) .container.is-circle{block-size:2rem;inline-size:2rem}:host([scale=l]){block-size:2.75rem;font-size:var(--calcite-font-size-0);--calcite-chip-spacing-s-internal:0.5rem;--calcite-chip-spacing-l-internal:0.75rem}:host([scale=l]) .image-container,:host([scale=l]) .close,:host([scale=l]) .select-icon--active{block-size:2rem;inline-size:2rem}:host([scale=l]) .container.is-circle{block-size:2.75rem;inline-size:2.75rem}:host{display:inline-flex;cursor:default;border-radius:9999px}.container{box-sizing:border-box;display:inline-flex;block-size:100%;max-inline-size:100%;align-items:center;justify-content:center;border-radius:9999px;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-1);font-weight:var(--calcite-font-weight-medium);outline-color:transparent}.container:not(.is-circle){padding-inline:var(--calcite-chip-spacing-s-internal)}.container.selectable{cursor:pointer}.container:not(.non-interactive):focus{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([scale=s]) .container.image--slotted{padding-inline-start:calc(0.125rem / 2)}:host([scale=s]) .container.is-circle{padding-inline:0}.container.text--slotted .title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-inline:var(--calcite-chip-spacing-s-internal)}.container:not(.text--slotted) .title{display:none}.container:not(.image--slotted) .image-container{display:none}.container.closable{padding-inline-end:calc(var(--calcite-chip-spacing-l-internal) / 2)}.container:not(.is-circle).image--slotted{padding-inline-start:calc(var(--calcite-chip-spacing-l-internal) / 2)}.container:not(.is-circle).image--slotted .image-container{margin-inline-end:var(--calcite-chip-spacing-s-internal)}.container:not(.is-circle).image--slotted .image-container~.chip-icon{margin-inline-start:var(--calcite-chip-spacing-s-internal)}.container:not(.is-circle).selectable:not(.text--slotted) .chip-icon{margin-inline-end:var(--calcite-chip-spacing-s-internal)}.container:not(.is-circle):not(.selectable):not(.text--slotted) .chip-icon{margin-inline-start:var(--calcite-chip-spacing-s-internal)}.container:not(.is-circle):not(.text--slotted) .chip-icon{margin-inline-end:var(--calcite-chip-spacing-s-internal)}.container:not(.is-circle):not(.text-slotted).image--slotted .image-container{margin-inline-end:var(--calcite-chip-spacing-s-internal)}.container:not(.is-circle):not(.closable):not(.text--slotted).image--slotted.selectable .image-container{margin-inline-end:0}.container:not(.is-circle):not(.closable):not(.text--slotted).image--slotted.selectable .image-container~.chip-icon{margin-inline-start:calc(var(--calcite-chip-spacing-s-internal) * 2)}.chip-icon{position:relative;margin-block:0px;display:inline-flex;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);margin-inline:var(--calcite-chip-spacing-s-internal)}.image-container{display:inline-flex;overflow:hidden;align-items:center;justify-content:center;pointer-events:none}.close{margin:0px;cursor:pointer;align-items:center;border-style:none;background-color:transparent;color:var(--calcite-color-text-1);outline-color:transparent;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;-webkit-appearance:none;display:flex;border-radius:50%;align-content:center;justify-content:center;--calcite-chip-transparent-hover:var(--calcite-color-transparent-hover);--calcite-chip-transparent-press:var(--calcite-color-transparent-press)}.close:hover{background-color:var(--calcite-chip-transparent-hover)}.close:focus{background-color:var(--calcite-chip-transparent-hover);outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.close:active{background-color:var(--calcite-chip-transparent-press)}.close calcite-icon{color:inherit}.select-icon{align-self:center;justify-content:center;align-items:center;display:flex;inset-block-start:-1px;position:relative;visibility:hidden;inline-size:0;opacity:0;transition:opacity 0.15s ease-in-out, inline-size 0.15s ease-in-out}.select-icon.select-icon--active{visibility:visible;opacity:0.5}.container:not(.is-circle).image--slotted .select-icon.select-icon--active{margin-inline-end:var(--calcite-chip-spacing-s-internal)}:host([selected]) .select-icon{opacity:1}.container:hover .select-icon--active{opacity:1}slot[name=image]::slotted(*){display:flex;block-size:100%;inline-size:100%;overflow:hidden;border-radius:50%}:host([kind=neutral]){background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1)}:host([kind=neutral]) .container{border-color:transparent}:host([kind=neutral]) .close{color:var(--calcite-color-text-3)}:host([kind=neutral]) .chip-icon{color:var(--calcite-ui-icon-color, var(--calcite-color-text-3))}:host([kind=inverse]){background-color:var(--calcite-color-inverse);color:var(--calcite-color-text-inverse)}:host([kind=inverse]) .container{border-color:transparent}:host([kind=inverse]) .close{color:var(--calcite-color-text-inverse)}:host([kind=inverse]) .chip-icon{color:var(--calcite-ui-icon-color, var(--calcite-color-text-inverse))}:host([kind=brand]){background-color:var(--calcite-color-brand);color:var(--calcite-color-text-inverse)}:host([kind=brand]) .container{border-color:transparent}:host([kind=brand]) .close{color:var(--calcite-color-text-inverse)}:host([kind=brand]) .chip-icon{color:var(--calcite-ui-icon-color, var(--calcite-color-text-inverse))}:host([appearance=outline-fill]),:host([appearance=outline]){background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-1)}:host([appearance=outline-fill]) .close,:host([appearance=outline]) .close{color:var(--calcite-color-text-3)}:host([appearance=outline-fill]) .chip-icon,:host([appearance=outline]) .chip-icon{color:var(--calcite-ui-icon-color, var(--calcite-color-text-3))}:host([appearance=outline-fill]){background-color:var(--calcite-color-foreground-1)}:host([appearance=outline]){background-color:transparent}:host([kind=neutral][appearance=outline-fill]) .container,:host([kind=neutral][appearance=outline]) .container{border-color:var(--calcite-color-border-1)}:host([kind=inverse][appearance=outline-fill]) .container,:host([kind=inverse][appearance=outline]) .container{border-color:var(--calcite-color-border-inverse)}:host([kind=brand][appearance=outline-fill]) .container,:host([kind=brand][appearance=outline]) .container{border-color:var(--calcite-color-brand)}:host([kind=brand][appearance=solid]) button,:host([kind=inverse][appearance=solid]) button{outline-color:var(--calcite-color-text-inverse)}:host([closed]){display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";

const Chip = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteChipClose = index.createEvent(this, "calciteChipClose", 6);
        this.calciteChipSelect = index.createEvent(this, "calciteChipSelect", 6);
        this.calciteInternalChipKeyEvent = index.createEvent(this, "calciteInternalChipKeyEvent", 6);
        this.mutationObserver = observers.createObserver("mutation", () => this.updateHasText());
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.close = () => {
            this.calciteChipClose.emit();
            this.selected = false;
            this.closed = true;
        };
        this.closeButtonKeyDownHandler = (event) => {
            if (key.isActivationKey(event.key)) {
                event.preventDefault();
                this.close();
            }
        };
        this.handleSlotImageChange = (event) => {
            this.hasImage = dom.slotChangeHasAssignedElement(event);
        };
        this.handleEmittingEvent = () => {
            if (this.interactive) {
                this.calciteChipSelect.emit();
            }
        };
        this.disabled = false;
        this.appearance = "solid";
        this.kind = "neutral";
        this.closable = false;
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.scale = "m";
        this.label = undefined;
        this.value = undefined;
        this.closed = false;
        this.selectionMode = "none";
        this.selected = false;
        this.messageOverrides = undefined;
        this.messages = undefined;
        this.interactive = false;
        this.defaultMessages = undefined;
        this.effectiveLocale = undefined;
        this.hasText = false;
        this.hasImage = false;
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
        var _a;
        conditionalSlot.connectConditionalSlotComponent(this);
        interactive.connectInteractive(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        var _a;
        conditionalSlot.disconnectConditionalSlotComponent(this);
        interactive.disconnectInteractive(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
        (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        {
            await t9n.setUpMessages(this);
            this.updateHasText();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    keyDownHandler(event) {
        if (event.target === this.el) {
            switch (event.key) {
                case " ":
                case "Enter":
                    this.handleEmittingEvent();
                    event.preventDefault();
                    break;
                case "ArrowRight":
                case "ArrowLeft":
                case "Home":
                case "End":
                    this.calciteInternalChipKeyEvent.emit(event);
                    event.preventDefault();
                    break;
            }
        }
    }
    clickHandler() {
        if (!this.interactive && this.closable) {
            this.closeButtonEl.focus();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        var _a, _b;
        await loadable.componentFocusable(this);
        if (!this.disabled && this.interactive) {
            (_a = this.containerEl) === null || _a === void 0 ? void 0 : _a.focus();
        }
        else if (!this.disabled && this.closable) {
            (_b = this.closeButtonEl) === null || _b === void 0 ? void 0 : _b.focus();
        }
    }
    updateHasText() {
        this.hasText = this.el.textContent.trim().length > 0;
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    renderChipImage() {
        return (index.h("div", { class: CSS$1.imageContainer }, index.h("slot", { name: SLOTS.image, onSlotchange: this.handleSlotImageChange })));
    }
    renderSelectionIcon() {
        const icon = this.selectionMode === "multiple" && this.selected
            ? ICONS.checked
            : this.selectionMode === "multiple"
                ? ICONS.unchecked
                : this.selected
                    ? ICONS.checkedSingle
                    : undefined;
        return (index.h("div", { class: {
                [CSS$1.selectIcon]: true,
                [CSS$1.selectIconActive]: this.selectionMode === "multiple" || this.selected,
            } }, icon ? index.h("calcite-icon", { icon: icon, scale: component.getIconScale(this.scale) }) : null));
    }
    renderCloseButton() {
        return (index.h("button", { "aria-label": this.messages.dismissLabel, class: CSS$1.close, onClick: this.close, onKeyDown: this.closeButtonKeyDownHandler, tabIndex: this.disabled ? -1 : 0,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.closeButtonEl = el) }, index.h("calcite-icon", { icon: ICONS.close, scale: component.getIconScale(this.scale) })));
    }
    renderIcon() {
        return (index.h("calcite-icon", { class: CSS$1.chipIcon, flipRtl: this.iconFlipRtl, icon: this.icon, scale: component.getIconScale(this.scale) }));
    }
    render() {
        const { disabled } = this;
        const disableInteraction = disabled || (!disabled && !this.interactive);
        const role = this.selectionMode === "multiple" && this.interactive
            ? "checkbox"
            : this.selectionMode !== "none" && this.interactive
                ? "radio"
                : this.interactive
                    ? "button"
                    : undefined;
        return (index.h(index.Host, null, index.h(interactive.InteractiveContainer, { disabled: disabled }, index.h("div", { "aria-checked": this.selectionMode !== "none" && this.interactive
                ? dom.toAriaBoolean(this.selected)
                : undefined, "aria-disabled": disableInteraction ? dom.toAriaBoolean(disabled) : undefined, "aria-label": this.label, class: {
                [CSS$1.container]: true,
                [CSS$1.textSlotted]: this.hasText,
                [CSS$1.imageSlotted]: this.hasImage,
                [CSS$1.selectable]: this.selectionMode !== "none",
                [CSS$1.multiple]: this.selectionMode === "multiple",
                [CSS$1.closable]: this.closable,
                [CSS$1.nonInteractive]: !this.interactive,
                [CSS$1.isCircle]: !this.closable &&
                    !this.hasText &&
                    (!this.icon || !this.hasImage) &&
                    (this.selectionMode === "none" ||
                        (!!this.selectionMode && this.selectionMode !== "multiple" && !this.selected)),
            }, onClick: this.handleEmittingEvent, role: role, tabIndex: disableInteraction ? -1 : 0,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: (el) => (this.containerEl = el) }, this.selectionMode !== "none" && this.renderSelectionIcon(), this.renderChipImage(), this.icon && this.renderIcon(), index.h("span", { class: CSS$1.title }, index.h("slot", null)), this.closable && this.renderCloseButton()))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Chip.style = chipCss;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    icon: "icon",
    iconActive: "icon--active",
    iconIndent: "icon--indent",
    custom: "icon--custom",
    dot: "icon--dot",
    single: "label--single",
    label: "label",
    active: "label--active",
    selected: "label--selected",
    title: "title",
    textContainer: "text-container",
};

const comboboxItemCss = "@charset \"UTF-8\";:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([hidden]){display:none}[hidden]{display:none}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-item-spacing-indent:0.5rem;--calcite-combobox-item-selector-icon-size:1rem}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.5rem;--calcite-combobox-item-spacing-indent:0.75rem;--calcite-combobox-item-selector-icon-size:1rem}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.625rem;--calcite-combobox-item-spacing-indent:1rem;--calcite-combobox-item-selector-icon-size:1.5rem}.container{--calcite-combobox-item-indent-value:calc(\n    var(--calcite-combobox-item-spacing-indent) * var(--calcite-combobox-item-spacing-indent-multiplier)\n  )}:host(:focus){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host,ul{margin:0px;display:flex;flex-direction:column;padding:0px}:host(:focus),ul:focus{outline:2px solid transparent;outline-offset:2px}.label{position:relative;box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:100%;cursor:pointer;align-items:center;color:var(--calcite-color-text-3);-webkit-text-decoration-line:none;text-decoration-line:none;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);outline-color:transparent;word-wrap:break-word;word-break:break-word;padding-block:var(--calcite-combobox-item-spacing-unit-s);padding-inline:var(--calcite-combobox-item-spacing-unit-l)}:host([disabled]) .label{cursor:default}.label--selected{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.label--active{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.label:hover,.label:active{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1);-webkit-text-decoration-line:none;text-decoration-line:none;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.title{padding-block:0;padding-inline:var(--calcite-combobox-item-spacing-unit-l)}.icon{display:inline-flex;opacity:0;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);color:var(--calcite-color-border-1)}.icon--indent{padding-inline-start:var(--calcite-combobox-item-indent-value)}.icon--custom{margin-block-start:-1px;padding-inline-start:var(--calcite-combobox-item-spacing-unit-l);color:var(--calcite-color-text-3)}.icon--active{color:var(--calcite-color-text-1)}.icon--dot{display:flex;justify-content:center;min-inline-size:var(--calcite-combobox-item-selector-icon-size)}.icon--dot:before{text-align:start;content:\"•\"}.label--active .icon{opacity:1}.label--selected .icon{opacity:1;color:var(--calcite-color-brand)}:host(:hover[disabled]) .icon{opacity:1}";

const ComboboxItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteComboboxItemChange = index.createEvent(this, "calciteComboboxItemChange", 6);
        this.itemClickHandler = () => {
            this.toggleSelected();
        };
        this.disabled = false;
        this.selected = false;
        this.active = false;
        this.ancestors = undefined;
        this.guid = guid.guid();
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.textLabel = undefined;
        this.value = undefined;
        this.filterDisabled = undefined;
        this.selectionMode = "multiple";
        this.scale = "m";
    }
    selectedWatchHandler() {
        this.calciteComboboxItemChange.emit();
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        this.ancestors = utils.getAncestors(this.el);
        conditionalSlot.connectConditionalSlotComponent(this);
        interactive.connectInteractive(this);
    }
    disconnectedCallback() {
        conditionalSlot.disconnectConditionalSlotComponent(this);
        interactive.disconnectInteractive(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    toggleSelected() {
        const isSinglePersistSelect = this.selectionMode === "single-persist";
        if (this.disabled || (isSinglePersistSelect && this.selected)) {
            return;
        }
        this.selected = !this.selected;
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderIcon(iconPath) {
        return this.icon ? (index.h("calcite-icon", { class: {
                [CSS.custom]: !!this.icon,
                [CSS.iconActive]: this.icon && this.selected,
                [CSS.iconIndent]: true,
            }, flipRtl: this.iconFlipRtl, icon: this.icon || iconPath, key: "icon", scale: component.getIconScale(this.scale) })) : null;
    }
    renderSelectIndicator(showDot, iconPath) {
        return showDot ? (index.h("span", { class: {
                [CSS.icon]: true,
                [CSS.dot]: true,
                [CSS.iconIndent]: true,
            } })) : (index.h("calcite-icon", { class: {
                [CSS.icon]: true,
                [CSS.iconActive]: this.selected,
                [CSS.iconIndent]: true,
            }, flipRtl: this.iconFlipRtl, icon: iconPath, key: "indicator", scale: component.getIconScale(this.scale) }));
    }
    renderChildren() {
        if (dom.getSlotted(this.el)) {
            return (index.h("ul", { key: "default-slot-container" }, index.h("slot", null)));
        }
        return null;
    }
    render() {
        const { disabled } = this;
        const isSingleSelect = utils.isSingleLike(this.selectionMode);
        const showDot = isSingleSelect && !disabled;
        const defaultIcon = isSingleSelect ? "dot" : "check";
        const iconPath = disabled ? "" : defaultIcon;
        const classes = {
            [CSS.label]: true,
            [CSS.selected]: this.selected,
            [CSS.active]: this.active,
            [CSS.single]: isSingleSelect,
        };
        const depth = utils.getDepth(this.el);
        return (index.h(index.Host, { "aria-hidden": "true" }, index.h(interactive.InteractiveContainer, { disabled: disabled }, index.h("div", { class: `container scale--${this.scale}`, style: { "--calcite-combobox-item-spacing-indent-multiplier": `${depth}` } }, index.h("li", { class: classes, id: this.guid, onClick: this.itemClickHandler }, this.renderSelectIndicator(showDot, iconPath), this.renderIcon(iconPath), index.h("span", { class: "title" }, this.textLabel)), this.renderChildren()))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "selected": ["selectedWatchHandler"]
    }; }
};
ComboboxItem.style = comboboxItemCss;

exports.calcite_chip = Chip;
exports.calcite_combobox_item = ComboboxItem;
