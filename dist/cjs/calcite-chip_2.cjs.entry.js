/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const dom = require('./dom-6a9b6275.js');
const loadable = require('./loadable-2e2626dc.js');
const t9n = require('./t9n-42ba6ea3.js');
const interactive = require('./interactive-89f913ba.js');
const locale = require('./locale-42c21404.js');
const key = require('./key-d6da79d8.js');
const component = require('./component-a4c6a35d.js');
const browser = require('./browser-69696af0.js');
const conditionalSlot = require('./conditionalSlot-6b5d9b84.js');
const guid = require('./guid-02e5380f.js');
const utils = require('./utils-051e0119.js');
require('./resources-dfe71ff2.js');
require('./observers-8fed90f3.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
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
    single: "single",
    selectable: "selectable",
    selectIcon: "select-icon",
    selectIconActive: "select-icon--active",
    nonInteractive: "non-interactive",
    isCircle: "is-circle",
    selected: "selected",
};
const SLOTS$1 = {
    image: "image",
};
const ICONS = {
    close: "x",
    checkedSingle: "circle-f",
    uncheckedMultiple: "square",
    checkedMultiple: "check-square-f",
};

const chipCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}.container,.select-icon,.title{padding-inline-start:var(--calcite-internal-chip-padding-start);padding-inline-end:var(--calcite-internal-chip-padding-end)}.select-icon:not(.select-icon--active){padding-inline:0}:host([scale=s]){block-size:1.5rem;font-size:var(--calcite-font-size--2);--calcite-chip-spacing-s-internal:0.25rem;--calcite-chip-spacing-l-internal:0.5rem}:host([scale=s]) .close,:host([scale=s]) .select-icon--active{block-size:1rem;inline-size:1rem}:host([scale=s]) .image-container{block-size:1.25rem;inline-size:1.25rem}:host([scale=s]) .container.is-circle,:host([scale=s]) .container.is-circle.image--slotted{block-size:1.5rem;inline-size:1.5rem;--calcite-internal-chip-padding-start:var(--calcite-spacing-px);--calcite-internal-chip-padding-end:var(--calcite-spacing-px)}:host([scale=s]) .multiple .select-icon{--calcite-internal-chip-padding-start:var(--calcite-spacing-xxs);--calcite-internal-chip-padding-end:var(--calcite-spacing-xxs)}:host([scale=s]) .multiple.image--slotted .select-icon{--calcite-internal-chip-padding-start:var(--calcite-spacing-xs);--calcite-internal-chip-padding-end:var(--calcite-spacing-sm)}:host([scale=s]) .multiple.image--slotted.text--slotted{--calcite-internal-chip-padding-start:var(--calcite-spacing-px);--calcite-internal-chip-padding-end:var(--calcite-spacing-xxs)}:host([scale=s]) .container{--calcite-internal-chip-padding-start:var(--calcite-spacing-xxs);--calcite-internal-chip-padding-end:var(--calcite-spacing-xxs)}:host([scale=s]) .container.image--slotted{--calcite-internal-chip-padding-start:var(--calcite-spacing-px);--calcite-internal-chip-padding-end:var(--calcite-spacing-xxs)}:host([scale=s]) .container.image--slotted.closable{--calcite-internal-chip-padding-end:var(--calcite-spacing-xxs)}:host([scale=s]) .container:not(.is-circle):not(.multiple):not(.image-slotted) .select-icon.select-icon--active{padding-inline-start:0;padding-inline-end:var(--calcite-spacing-xs)}:host([scale=s]) .container:not(.is-circle):not(.multiple).image--slotted .select-icon.select-icon--active{padding-inline-start:var(--calcite-spacing-base);padding-inline-end:var(--calcite-spacing-sm)}:host([scale=s][closable]) .container{--calcite-internal-chip-padding-start:var(--calcite-spacing-xxs);--calcite-internal-chip-padding-end:var(--calcite-spacing-xxs)}:host([scale=m]){block-size:2rem;font-size:var(--calcite-font-size--1);--calcite-chip-spacing-s-internal:0.375rem;--calcite-chip-spacing-l-internal:0.5rem}:host([scale=m]) .close,:host([scale=m]) .image-container,:host([scale=m]) .select-icon--active{block-size:1.5rem;inline-size:1.5rem;--calcite-internal-chip-padding-start:var(--calcite-spacing-xxs);--calcite-internal-chip-padding-end:var(--calcite-spacing-xxs)}:host([scale=m]) .container.is-circle,:host([scale=m]) .container.is-circle.image--slotted{block-size:2rem;inline-size:2rem;--calcite-internal-chip-padding-start:var(--calcite-spacing-px);--calcite-internal-chip-padding-end:var(--calcite-spacing-px)}:host([scale=m]) .multiple .select-icon{--calcite-internal-chip-padding-start:var(--calcite-spacing-base);--calcite-internal-chip-padding-end:var(--calcite-spacing-base)}:host([scale=m]) .multiple.image--slotted .select-icon{--calcite-internal-chip-padding-start:var(--calcite-spacing-xxs);--calcite-internal-chip-padding-end:var(--calcite-spacing-sm)}:host([scale=m]) .multiple.image--slotted.text--slotted{--calcite-internal-chip-padding-start:var(--calcite-spacing-xxs);--calcite-internal-chip-padding-end:var(--calcite-spacing-xs)}:host([scale=m]) .container{--calcite-internal-chip-padding-start:var(--calcite-spacing-xs);--calcite-internal-chip-padding-end:var(--calcite-spacing-xs)}:host([scale=m]) .container.image--slotted{--calcite-internal-chip-padding-start:var(--calcite-spacing-xxs);--calcite-internal-chip-padding-end:var(--calcite-spacing-xs)}:host([scale=m]) .container.image--slotted.closable{--calcite-internal-chip-padding-start:var(--calcite-spacing-xxs);--calcite-internal-chip-padding-end:var(--calcite-spacing-xxs)}:host([scale=m]) .container:not(.is-circle):not(.multiple):not(.image-slotted) .select-icon.select-icon--active{padding-inline-start:0;padding-inline-end:var(--calcite-spacing-px)}:host([scale=m]) .container:not(.is-circle):not(.multiple).image--slotted .select-icon.select-icon--active{padding-inline-start:0;padding-inline-end:var(--calcite-spacing-sm)}:host([scale=m][closable]) .container{--calcite-internal-chip-padding-start:var(--calcite-spacing-xs);--calcite-internal-chip-padding-end:var(--calcite-spacing-xxs)}:host([scale=l]){block-size:2.75rem;font-size:var(--calcite-font-size-0);--calcite-chip-spacing-s-internal:0.5rem;--calcite-chip-spacing-l-internal:0.75rem}:host([scale=l]) .image-container,:host([scale=l]) .close,:host([scale=l]) .select-icon--active{block-size:2rem;inline-size:2rem;--calcite-internal-chip-padding-start:var(--calcite-spacing-xxs);--calcite-internal-chip-padding-end:var(--calcite-spacing-xxs)}:host([scale=l]) .container.is-circle,:host([scale=l]) .container.is-circle.image--slotted{block-size:2.75rem;inline-size:2.75rem;--calcite-internal-chip-padding-start:var(--calcite-spacing-xxs);--calcite-internal-chip-padding-end:var(--calcite-spacing-xxs)}:host([scale=l]) .multiple .select-icon{--calcite-internal-chip-padding-start:var(--calcite-spacing-xxs);--calcite-internal-chip-padding-end:var(--calcite-spacing-xxs)}:host([scale=l]) .multiple.image--slotted .select-icon{--calcite-internal-chip-padding-start:var(--calcite-spacing-xs);--calcite-internal-chip-padding-end:var(--calcite-spacing-md)}:host([scale=l]) .container{--calcite-internal-chip-padding-start:var(--calcite-spacing-sm);--calcite-internal-chip-padding-end:var(--calcite-spacing-sm)}:host([scale=l]) .container.image--slotted{--calcite-internal-chip-padding-start:var(--calcite-spacing-xs);--calcite-internal-chip-padding-end:var(--calcite-spacing-sm)}:host([scale=l]) .container.image--slotted.closable{--calcite-internal-chip-padding-start:var(--calcite-spacing-xs);--calcite-internal-chip-padding-end:var(--calcite-spacing-xs)}:host([scale=l]) .container:not(.is-circle):not(.multiple):not(.image-slotted) .select-icon.select-icon--active{padding-inline-start:0;padding-inline-end:var(--calcite-spacing-xxs)}:host([scale=l]) .container:not(.is-circle):not(.multiple).image--slotted .select-icon.select-icon--active{padding-inline-start:0;padding-inline-end:var(--calcite-spacing-md)}:host([scale=l][closable]) .container{--calcite-internal-chip-padding-start:var(--calcite-spacing-sm);--calcite-internal-chip-padding-end:var(--calcite-spacing-xs)}:host{display:inline-flex;cursor:default;border-radius:9999px}.container{box-sizing:border-box;display:inline-flex;block-size:100%;max-inline-size:100%;align-items:center;justify-content:center;border-radius:9999px;border-width:1px;border-style:solid;border-color:var(--calcite-color-border-1);font-weight:var(--calcite-font-weight-medium);outline-color:transparent}.container.selectable{cursor:pointer}.container:not(.non-interactive):focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([scale=s]) .container.selectable.single.image--slotted{--calcite-internal-chip-padding-end:calc(0.125rem / 2)}:host([scale=s]) .container:not(.selected):not(.multiple).image--slotted{--calcite-internal-chip-padding-start:calc(0.125rem / 2)}.container.text--slotted .title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;--calcite-internal-chip-padding-start:var(--calcite-chip-spacing-s-internal);--calcite-internal-chip-padding-end:var(--calcite-chip-spacing-s-internal)}.container:not(.text--slotted) .title{display:none}.container:not(.image--slotted) .image-container{display:none}.container:not(.is-circle).image--slotted .image-container{margin-inline-end:var(--calcite-chip-spacing-s-internal)}.container:not(.is-circle).image--slotted .image-container~.chip-icon{margin-inline-start:var(--calcite-chip-spacing-s-internal)}.container:not(.is-circle).selectable:not(.text--slotted) .chip-icon{margin-inline-end:var(--calcite-chip-spacing-s-internal)}.container:not(.is-circle):not(.selectable):not(.text--slotted) .chip-icon{margin-inline-start:var(--calcite-chip-spacing-s-internal)}.container:not(.is-circle):not(.text--slotted) .chip-icon{margin-inline-end:var(--calcite-chip-spacing-s-internal)}.container:not(.is-circle):not(.text-slotted).image--slotted .image-container{margin-inline-end:var(--calcite-chip-spacing-s-internal)}.container:not(.is-circle):not(.closable):not(.text--slotted).image--slotted.selectable .image-container{margin-inline-end:0}.container:not(.is-circle):not(.closable):not(.text--slotted).image--slotted.selectable .image-container~.chip-icon{margin-inline-start:calc(var(--calcite-chip-spacing-s-internal) * 2)}.chip-icon{position:relative;margin-block:0px;display:inline-flex;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);margin-inline:var(--calcite-chip-spacing-s-internal)}.image-container{display:inline-flex;overflow:hidden;align-items:center;justify-content:center;pointer-events:none}.close{margin:0px;cursor:pointer;align-items:center;border-style:none;background-color:transparent;color:var(--calcite-color-text-1);outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;-webkit-appearance:none;display:flex;border-radius:50%;align-content:center;justify-content:center;--calcite-chip-transparent-hover:var(--calcite-color-transparent-hover);--calcite-chip-transparent-press:var(--calcite-color-transparent-press);--calcite-internal-chip-padding-start:var(--calcite-spacing-xxs);--calcite-internal-chip-padding-end:var(--calcite-spacing-xxs)}.close:hover{background-color:var(--calcite-chip-transparent-hover)}.close:focus{background-color:var(--calcite-chip-transparent-hover);outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.close:active{background-color:var(--calcite-chip-transparent-press)}.close calcite-icon{color:inherit}.select-icon{align-self:center;justify-content:center;align-items:center;display:flex;inset-block-start:-1px;position:relative;visibility:hidden;inline-size:0;opacity:0;transition:opacity 0.15s ease-in-out, inline-size 0.15s ease-in-out}.select-icon.select-icon--active{visibility:visible;opacity:0.5}:host([selected]) .select-icon{opacity:1}.container:hover .select-icon--active{opacity:1}.multiple .select-icon{display:flex;align-items:center;justify-content:center}slot[name=image]::slotted(*){display:flex;block-size:100%;inline-size:100%;overflow:hidden;border-radius:50%}:host([kind=neutral]){background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1)}:host([kind=neutral]) .container{border-color:transparent}:host([kind=neutral]) .close{color:var(--calcite-color-text-3)}:host([kind=inverse]){background-color:var(--calcite-color-inverse);color:var(--calcite-color-text-inverse)}:host([kind=inverse]) .container{border-color:transparent}:host([kind=inverse]) .close{color:var(--calcite-color-text-inverse)}:host([kind=brand]){background-color:var(--calcite-color-brand);color:var(--calcite-color-text-inverse)}:host([kind=brand]) .container{border-color:transparent}:host([kind=brand]) .close{color:var(--calcite-color-text-inverse)}:host([appearance=outline-fill]),:host([appearance=outline]){background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-1)}:host([appearance=outline-fill]) .close,:host([appearance=outline]) .close{color:var(--calcite-color-text-3)}:host([appearance=outline-fill]){background-color:var(--calcite-color-foreground-1)}:host([appearance=outline]){background-color:transparent}:host([kind=neutral][appearance=outline-fill]) .container,:host([kind=neutral][appearance=outline]) .container{border-color:var(--calcite-color-border-1)}:host([kind=inverse][appearance=outline-fill]) .container,:host([kind=inverse][appearance=outline]) .container{border-color:var(--calcite-color-border-inverse)}:host([kind=brand][appearance=outline-fill]) .container,:host([kind=brand][appearance=outline]) .container{border-color:var(--calcite-color-brand)}:host([kind=brand][appearance=solid]) button,:host([kind=inverse][appearance=solid]) button{outline-color:var(--calcite-color-text-inverse)}:host([closed]){display:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteChipStyle0 = chipCss;

const Chip = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteChipClose = index.createEvent(this, "calciteChipClose", 6);
        this.calciteChipSelect = index.createEvent(this, "calciteChipSelect", 6);
        this.calciteInternalChipKeyEvent = index.createEvent(this, "calciteInternalChipKeyEvent", 6);
        this.calciteInternalChipSelect = index.createEvent(this, "calciteInternalChipSelect", 6);
        this.calciteInternalSyncSelectedChips = index.createEvent(this, "calciteInternalSyncSelectedChips", 6);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleDefaultSlotChange = () => {
            this.updateHasText();
        };
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
        this.parentChipGroup = undefined;
        this.defaultMessages = undefined;
        this.effectiveLocale = undefined;
        this.hasText = false;
        this.hasImage = false;
    }
    watchSelected(selected) {
        if (this.selectionMode === "none") {
            return;
        }
        this.handleSelectionPropertyChange(selected);
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
        interactive.connectInteractive(this);
        locale.connectLocalized(this);
        t9n.connectMessages(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
        if (this.selectionMode !== "none" && this.interactive && this.selected) {
            this.handleSelectionPropertyChange(this.selected);
        }
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
    }
    async componentWillLoad() {
        loadable.setUpLoadableComponent(this);
        if (browser.isBrowser()) {
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
        await loadable.componentFocusable(this);
        if (!this.disabled && this.interactive) {
            this.containerEl?.focus();
        }
        else if (!this.disabled && this.closable) {
            this.closeButtonEl?.focus();
        }
    }
    updateHasText() {
        this.hasText = this.el.textContent.trim().length > 0;
    }
    handleSelectionPropertyChange(selected) {
        if (this.selectionMode === "single") {
            this.calciteInternalSyncSelectedChips.emit();
        }
        const selectedInParent = this.parentChipGroup.selectedItems.includes(this.el);
        if (!selectedInParent && selected && this.selectionMode !== "multiple") {
            this.calciteInternalChipSelect.emit();
        }
        if (this.selectionMode !== "single") {
            this.calciteInternalSyncSelectedChips.emit();
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Render Methods
    //
    //--------------------------------------------------------------------------
    renderChipImage() {
        return (index.h("div", { class: CSS$1.imageContainer }, index.h("slot", { name: SLOTS$1.image, onSlotchange: this.handleSlotImageChange })));
    }
    renderSelectionIcon() {
        const icon = this.selectionMode === "multiple"
            ? this.selected
                ? ICONS.checkedMultiple
                : ICONS.uncheckedMultiple
            : this.selected
                ? ICONS.checkedSingle
                : undefined;
        return (index.h("div", { class: {
                [CSS$1.selectIcon]: true,
                [CSS$1.selectIconActive]: this.selectionMode === "multiple" || this.selected,
            } }, icon ? index.h("calcite-icon", { icon: icon, scale: component.getIconScale(this.scale) }) : null));
    }
    renderCloseButton() {
        return (index.h("button", { "aria-label": this.messages.dismissLabel, class: CSS$1.close, onClick: this.close, onKeyDown: this.closeButtonKeyDownHandler, ref: (el) => (this.closeButtonEl = el), tabIndex: this.disabled ? -1 : 0 }, index.h("calcite-icon", { icon: ICONS.close, scale: component.getIconScale(this.scale) })));
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
        return (index.h(index.Host, { key: '6d76da5a2ae7a51ceffa4d1ca67d2f610b900a1c' }, index.h(interactive.InteractiveContainer, { key: 'fd0190d60cffb6d0f564a91f55b0e4f69663fb5b', disabled: disabled }, index.h("div", { key: '825b342318201ee13735f9b6e830f26b0fb4e137', "aria-checked": this.selectionMode !== "none" && this.interactive
                ? dom.toAriaBoolean(this.selected)
                : undefined, "aria-disabled": disableInteraction ? dom.toAriaBoolean(disabled) : undefined, "aria-label": this.label, class: {
                [CSS$1.container]: true,
                [CSS$1.textSlotted]: this.hasText,
                [CSS$1.imageSlotted]: this.hasImage,
                [CSS$1.selectable]: this.selectionMode !== "none",
                [CSS$1.multiple]: this.selectionMode === "multiple",
                [CSS$1.single]: this.selectionMode === "single" || this.selectionMode === "single-persist",
                [CSS$1.selected]: this.selected,
                [CSS$1.closable]: this.closable,
                [CSS$1.nonInteractive]: !this.interactive,
                [CSS$1.isCircle]: !this.closable &&
                    !this.hasText &&
                    (!this.icon || !this.hasImage) &&
                    (this.selectionMode === "none" ||
                        (!!this.selectionMode && this.selectionMode !== "multiple" && !this.selected)),
            }, onClick: this.handleEmittingEvent, ref: (el) => (this.containerEl = el), role: role, tabIndex: disableInteraction ? -1 : 0 }, this.selectionMode !== "none" && this.renderSelectionIcon(), this.renderChipImage(), this.icon && this.renderIcon(), index.h("span", { key: '0b3d668d66e359ecc3690ad87033e7e49a9250ef', class: CSS$1.title }, index.h("slot", { key: 'ff1af06039b94df6108f5e371e23ad9debfd388e', onSlotchange: this.handleDefaultSlotChange })), this.closable && this.renderCloseButton()))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "selected": ["watchSelected"],
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Chip.style = CalciteChipStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    active: "label--active",
    centerContent: "center-content",
    container: "container",
    custom: "icon--custom",
    description: "description",
    dot: "icon--dot",
    filterMatch: "filter-match",
    icon: "icon",
    iconActive: "icon--active",
    label: "label",
    scale: (scale) => `scale--${scale}`,
    selected: "label--selected",
    shortText: "short-text",
    single: "label--single",
    textContainer: "text-container",
    title: "title",
};
const SLOTS = {
    contentEnd: "content-end",
};

const comboboxItemCss = "@charset \"UTF-8\";:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([hidden]){display:none}[hidden]{display:none}.scale--s{font-size:var(--calcite-font-size--2);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.5rem;--calcite-combobox-item-spacing-unit-s:0.25rem;--calcite-combobox-item-spacing-indent:0.5rem;--calcite-combobox-item-selector-icon-size:1rem;--calcite-internal-combobox-item-description-font-size:var(--calcite-font-size-xs)}.scale--m{font-size:var(--calcite-font-size--1);line-height:1rem;--calcite-combobox-item-spacing-unit-l:0.75rem;--calcite-combobox-item-spacing-unit-s:0.375rem;--calcite-combobox-item-spacing-indent:0.75rem;--calcite-combobox-item-selector-icon-size:1rem;--calcite-internal-combobox-item-description-font-size:var(--calcite-font-size-sm)}.scale--l{font-size:var(--calcite-font-size-0);line-height:1.25rem;--calcite-combobox-item-spacing-unit-l:1rem;--calcite-combobox-item-spacing-unit-s:0.625rem;--calcite-combobox-item-spacing-indent:1rem;--calcite-combobox-item-selector-icon-size:1.5rem;--calcite-internal-combobox-item-description-font-size:var(--calcite-font-size)}.container{--calcite-combobox-item-indent-value:calc(\n    var(--calcite-combobox-item-spacing-indent) * var(--calcite-combobox-item-spacing-indent-multiplier)\n  )}:host(:focus){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host,ul{margin:0px;display:flex;flex-direction:column;padding:0px}:host(:focus),ul:focus{outline:2px solid transparent;outline-offset:2px}.label{position:relative;box-sizing:border-box;display:flex;inline-size:100%;min-inline-size:100%;cursor:pointer;align-items:center;color:var(--calcite-color-text-3);text-decoration-line:none;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);outline-color:transparent;word-wrap:break-word;word-break:break-word;justify-content:space-around;gap:var(--calcite-combobox-item-spacing-unit-l);padding-block:var(--calcite-combobox-item-spacing-unit-s);padding-inline:var(--calcite-combobox-item-spacing-unit-l);padding-inline-start:var(--calcite-combobox-item-indent-value)}:host([disabled]) .label{cursor:default}.label--selected{color:var(--calcite-color-text-1)}.label--selected .title{font-weight:var(--calcite-font-weight-medium)}.label--active{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.label:hover,.label:active{background-color:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1);text-decoration-line:none;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.icon{display:inline-flex;opacity:0;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);color:var(--calcite-color-border-1)}.icon--custom{margin-block-start:-1px;color:var(--calcite-color-text-3)}.icon--active{color:var(--calcite-color-text-1)}.icon--dot{display:flex;justify-content:center;min-inline-size:var(--calcite-combobox-item-selector-icon-size)}.icon--dot::before{text-align:start;content:\"•\"}.label--active .icon{opacity:1}.label--selected .icon{opacity:1;color:var(--calcite-color-brand)}:host(:hover[disabled]) .icon{opacity:1}.filter-match{font-weight:var(--calcite-font-weight-bold);color:var(--calcite-color-text-1);background-color:var(--calcite-color-foreground-current)}.center-content{display:flex;flex-direction:column;flex-grow:1;padding-block:0}.description{font-size:var(--calcite-internal-combobox-item-description-font-size)}:host([selected]) .description,:host(:hover) .description{color:var(--calcite-color-text-2)}.short-text{color:var(--calcite-color-text-3);white-space:nowrap}.title{color:var(--calcite-color-text-1)}.title,.description,.short-text{line-height:var(--calcite-font-line-height-relative-snug)}";
const CalciteComboboxItemStyle0 = comboboxItemCss;

const ComboboxItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteComboboxItemChange = index.createEvent(this, "calciteComboboxItemChange", 6);
        this.calciteInternalComboboxItemChange = index.createEvent(this, "calciteInternalComboboxItemChange", 6);
        this.itemClickHandler = () => {
            this.toggleSelected();
        };
        this.active = false;
        this.ancestors = undefined;
        this.description = undefined;
        this.disabled = false;
        this.filterDisabled = undefined;
        this.filterTextMatchPattern = undefined;
        this.guid = guid.guid();
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.metadata = undefined;
        this.scale = "m";
        this.selected = false;
        this.selectionMode = "multiple";
        this.shortHeading = undefined;
        this.heading = undefined;
        this.textLabel = undefined;
        this.value = undefined;
        this.label = undefined;
    }
    handleComboboxItemPropsChange() {
        this.calciteInternalComboboxItemChange.emit();
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
            }, flipRtl: this.iconFlipRtl, icon: this.icon || iconPath, key: "icon", scale: component.getIconScale(this.scale) })) : null;
    }
    renderSelectIndicator(showDot, iconPath) {
        return showDot ? (index.h("span", { class: {
                [CSS.icon]: true,
                [CSS.dot]: true,
            } })) : (index.h("calcite-icon", { class: {
                [CSS.icon]: true,
                [CSS.iconActive]: this.selected,
            }, flipRtl: this.iconFlipRtl, icon: iconPath, key: "indicator", scale: component.getIconScale(this.scale) }));
    }
    renderChildren() {
        if (dom.getSlotted(this.el)) {
            return (index.h("ul", { key: "default-slot-container" }, index.h("slot", null)));
        }
        return null;
    }
    render() {
        const { disabled, heading, label, textLabel, value } = this;
        const isSingleSelect = utils.isSingleLike(this.selectionMode);
        const defaultIcon = isSingleSelect ? undefined : "check";
        const headingText = heading || textLabel;
        const iconPath = disabled ? undefined : defaultIcon;
        const itemLabel = label || value;
        const showDot = isSingleSelect && !disabled;
        const classes = {
            [CSS.label]: true,
            [CSS.selected]: this.selected,
            [CSS.active]: this.active,
            [CSS.single]: isSingleSelect,
        };
        const depth = utils.getDepth(this.el) + 1;
        return (index.h(index.Host, { key: '893a354b69619332b4f45458224aa8b41f90111e', "aria-hidden": "true", "aria-label": itemLabel }, index.h(interactive.InteractiveContainer, { key: 'd476f526f4d55a6b7b2cf498f97eb2a8db67222b', disabled: disabled }, index.h("div", { key: '327153394df9ebd4e6cd5dbd409d7fdd473beb3e', class: {
                [CSS.container]: true,
                [CSS.scale(this.scale)]: true,
            }, style: { "--calcite-combobox-item-spacing-indent-multiplier": `${depth}` } }, index.h("li", { key: 'f9a623aafce0135cb4e7e9e30579f98e18bf38e6', class: classes, id: this.guid, onClick: this.itemClickHandler }, this.renderSelectIndicator(showDot, iconPath), this.renderIcon(iconPath), index.h("div", { key: '8d90ab670e01f935a4217e24e175cc9e6cebfecf', class: CSS.centerContent }, index.h("div", { key: '176cc0659c8778c2f77be2f3912963b121e99ee7', class: CSS.title }, this.renderTextContent(headingText)), this.description ? (index.h("div", { class: CSS.description }, this.renderTextContent(this.description))) : null), this.shortHeading ? (index.h("div", { class: CSS.shortText }, this.renderTextContent(this.shortHeading))) : null, index.h("slot", { key: '8646cb9cde757ea2e34ec0c3f8cdc6ac806e1142', name: SLOTS.contentEnd })), this.renderChildren()))));
    }
    renderTextContent(text) {
        const pattern = this.filterTextMatchPattern;
        if (!pattern || !text) {
            return text;
        }
        const parts = text.split(pattern);
        if (parts.length > 1) {
            // we only highlight the first match
            parts[1] = index.h("mark", { class: CSS.filterMatch }, parts[1]);
        }
        return parts;
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "disabled": ["handleComboboxItemPropsChange"],
        "textLabel": ["handleComboboxItemPropsChange"],
        "selected": ["selectedWatchHandler"]
    }; }
};
ComboboxItem.style = CalciteComboboxItemStyle0;

exports.calcite_chip = Chip;
exports.calcite_combobox_item = ComboboxItem;
