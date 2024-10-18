/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-904bc599.js';
import { s as slotChangeHasAssignedElement, t as toAriaBoolean, o as getSlotted } from './dom-75c641a7.js';
import { a as setComponentLoaded, s as setUpLoadableComponent, c as componentFocusable } from './loadable-7cb2fc6f.js';
import { u as updateMessages, c as connectMessages, d as disconnectMessages, s as setUpMessages } from './t9n-9a5d28cf.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './interactive-98ed6b6f.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale-24516fec.js';
import { i as isActivationKey } from './key-e6b442de.js';
import { g as getIconScale } from './component-83541c88.js';
import { i as isBrowser } from './browser-b67d8df6.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-8a0b08ef.js';
import { g as guid } from './guid-b0fb1de3.js';
import { g as getAncestors, i as isSingleLike, a as getDepth } from './utils-b5a6dbcd.js';
import './resources-8e2ed936.js';
import './observers-c83631e8.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
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

const chipCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline-flex;cursor:default;border-radius:var(--calcite-chip-corner-radius, 9999px)}:host([closed]){display:none}:host([appearance=outline]) .container,:host([appearance=outline-fill]) .container{color:var(--calcite-chip-text-color, var(--calcite-color-text-1))}:host([appearance=outline]):host([kind=brand]) .container,:host([appearance=outline-fill]):host([kind=brand]) .container{border-color:var(--calcite-chip-border-color, var(--calcite-color-brand))}:host([appearance=outline]):host([kind=inverse]) .container,:host([appearance=outline-fill]):host([kind=inverse]) .container{border-color:var(--calcite-chip-border-color, var(--calcite-color-border-inverse))}:host([appearance=outline]):host([kind=neutral]) .container,:host([appearance=outline-fill]):host([kind=neutral]) .container{border-color:var(--calcite-chip-border-color, var(--calcite-color-border-1))}:host([appearance=outline]) .close,:host([appearance=outline-fill]) .close{color:var(--calcite-chip-close-icon-color, var(--calcite-close-icon-color, var(--calcite-color-text-3)))}:host([appearance=outline]) .container{background-color:transparent}:host([appearance=outline-fill]) .container{background-color:var(--calcite-chip-background-color, var(--calcite-color-foreground-1))}:host([appearance=solid]) .container{border-color:transparent}:host([appearance=solid]):host([kind=brand]) .container,:host([appearance=solid]):host([kind=inverse]) .container{color:var(--calcite-chip-text-color, var(--calcite-color-text-inverse))}:host([appearance=solid]):host([kind=brand]) .close,:host([appearance=solid]):host([kind=inverse]) .close{outline-color:var(--calcite-color-text-inverse)}:host([appearance=solid]):host([kind=brand]) .container{background-color:var(--calcite-chip-background-color, var(--calcite-color-brand))}:host([appearance=solid]):host([kind=inverse]) .container{background-color:var(--calcite-chip-background-color, var(--calcite-color-inverse))}:host([appearance=solid]):host([kind=neutral]) .container{background-color:var(--calcite-chip-background-color, var(--calcite-color-foreground-2))}:host([kind=neutral]) .container{color:var(--calcite-chip-text-color, var(--calcite-color-text-1))}:host([kind=neutral]) .container .close{color:var(--calcite-chip-close-icon-color, var(--calcite-close-icon-color, var(--calcite-color-text-3)))}:host([selected]) .select-icon{opacity:1}:host([scale=s]) .container{--calcite-internal-chip-block-size:1.5rem ;--calcite-internal-chip-container-space-x-end:0.25rem ;--calcite-internal-chip-container-space-x-start:0.25rem ;--calcite-internal-chip-font-size:var(--calcite-font-size--2);--calcite-internal-chip-icon-size:1rem ;--calcite-internal-chip-icon-space:0.25rem ;--calcite-internal-chip-image-size:1.25rem ;--calcite-internal-chip-title-space:0.25rem ;--calcite-internal-close-size:1rem }:host([scale=s]) .container:not(.closable).is-circle{--calcite-internal-chip-container-space-x-start:var(--calcite-spacing-px);--calcite-internal-chip-container-space-x-end:var(--calcite-spacing-px)}:host([scale=s]) .container.image--slotted:has(.chip-icon),:host([scale=s]) .container.image--slotted.text--slotted,:host([scale=s]) .container.image--slotted.closable{--calcite-internal-chip-image-space-x-end:0.25rem }:host([scale=s]) .container.image--slotted:not(.text--slotted,:has(.chip-icon)),:host([scale=s]) .container.image--slotted:not(.selectable){--calcite-internal-chip-container-space-x-start:var(--calcite-spacing-px)}:host([scale=s]) .container.selectable.single:not(.is-circle).image--slotted{--calcite-internal-chip-container-space-x-start:var(--calcite-spacing-px)}:host([scale=s]) .container.selectable.single:not(.is-circle).selected{--calcite-internal-chip-select-space-x-end:0.375rem ;--calcite-internal-chip-select-space-x-start:0}:host([scale=s]) .container.selectable.single:not(.is-circle).selected.image--slotted{--calcite-internal-chip-select-space-x-end:0.5rem ;--calcite-internal-chip-select-space-x-start:0.125rem }:host([scale=s]) .container.multiple:not(.is-circle){--calcite-internal-chip-container-space-x-start:0.25rem ;--calcite-internal-chip-select-space-x-end:0.25rem ;--calcite-internal-chip-select-space-x-start:0.25rem }:host([scale=s]) .container.multiple:not(.is-circle).image--slotted{--calcite-internal-chip-select-space-x-end:0.5rem ;--calcite-internal-chip-select-space-x-start:0.375rem ;--calcite-internal-chip-container-space-x-start:var(--calcite-spacing-px)}:host([scale=s]) .container.multiple:not(.is-circle).image--slotted:not(.text--slotted){--calcite-internal-chip-select-space-x-start:0.375rem }:host([scale=m]) .container{--calcite-internal-chip-block-size:2rem ;--calcite-internal-chip-container-space-x-end:0.375rem ;--calcite-internal-chip-container-space-x-start:0.375rem ;--calcite-internal-chip-font-size:var(--calcite-font-size--1);--calcite-internal-chip-icon-size:1.5rem ;--calcite-internal-chip-icon-space:0.375rem ;--calcite-internal-chip-image-size:1.5rem ;--calcite-internal-chip-title-space:0.375rem ;--calcite-internal-close-size:1.5rem }:host([scale=m]) .container:not(.closable).is-circle{--calcite-internal-chip-container-space-x-end:var(--calcite-spacing-px);--calcite-internal-chip-container-space-x-start:var(--calcite-spacing-px)}:host([scale=m]) .container.image--slotted:not(.is-circle){--calcite-internal-chip-container-space-x-start:0.25rem }:host([scale=m]) .container.image--slotted:has(.chip-icon),:host([scale=m]) .container.image--slotted.text--slotted,:host([scale=m]) .container.image--slotted.closable{--calcite-internal-chip-image-space-x-end:0.375rem }:host([scale=m]) .container.selectable.single:not(.is-circle).image--slotted{--calcite-internal-chip-container-space-x-start:0.25rem }:host([scale=m]) .container.selectable.single:not(.is-circle).selected{--calcite-internal-chip-select-space-x-end:var(--calcite-spacing-px);--calcite-internal-chip-select-space-x-start:0}:host([scale=m]) .container.selectable.single:not(.is-circle).selected.image--slotted{--calcite-internal-chip-select-space-x-end:0.25rem ;--calcite-internal-chip-select-space-x-start:0.375rem }:host([scale=m]) .container.multiple:not(.is-circle){--calcite-internal-chip-select-space-x-end:0.125rem ;--calcite-internal-chip-select-space-x-start:0.125rem }:host([scale=m]) .container.multiple:not(.is-circle).image--slotted{--calcite-internal-chip-select-space-x-end:0.5rem ;--calcite-internal-chip-select-space-x-start:0.25rem }:host([scale=m]) .container.closable:not(.is-circle){--calcite-internal-chip-container-space-x-end:0.25rem }:host([scale=l]) .container{--calcite-internal-chip-block-size:2.75rem ;--calcite-internal-chip-container-space-x-end:0.5rem ;--calcite-internal-chip-container-space-x-start:0.5rem ;--calcite-internal-chip-font-size:var(--calcite-font-size-0);--calcite-internal-chip-icon-size:2rem ;--calcite-internal-chip-icon-space:0.5rem ;--calcite-internal-chip-image-size:2rem ;--calcite-internal-chip-title-space:0.5rem ;--calcite-internal-close-size:2rem }:host([scale=l]) .container:not(.closable).is-circle{--calcite-internal-chip-container-space-x-end:0.25rem ;--calcite-internal-chip-container-space-x-start:0.25rem }:host([scale=l]) .container.image--slotted:not(.is-circle){--calcite-internal-chip-container-space-x-start:0.375rem }:host([scale=l]) .container.image--slotted:has(.chip-icon),:host([scale=l]) .container.image--slotted.text--slotted,:host([scale=l]) .container.image--slotted.closable{--calcite-internal-chip-image-space-x-end:0.5rem }:host([scale=l]) .container.selectable.single:not(.is-circle).image--slotted{--calcite-internal-chip-container-space-x-start:0.375rem }:host([scale=l]) .container.selectable.single:not(.is-circle).selected{--calcite-internal-chip-select-space-x-end:0.25rem ;--calcite-internal-chip-select-space-x-start:0}:host([scale=l]) .container.selectable.single:not(.is-circle).selected.image--slotted{--calcite-internal-chip-select-space-x-end:0.375rem ;--calcite-internal-chip-select-space-x-start:0.5rem }:host([scale=l]) .container.multiple:not(.is-circle){--calcite-internal-chip-container-space-x-start:0.5rem ;--calcite-internal-chip-select-space-x-end:0.25rem ;--calcite-internal-chip-select-space-x-start:0.25rem }:host([scale=l]) .container.multiple:not(.is-circle).image--slotted{--calcite-internal-chip-select-space-x-end:0.75rem }:host([scale=l]) .container.closable:not(.is-circle){--calcite-internal-chip-container-space-x-end:0.375rem }.container{box-sizing:border-box;display:inline-flex;block-size:100%;max-inline-size:100%;align-items:center;justify-content:center;font-weight:var(--calcite-font-weight-medium);outline-color:transparent;border-radius:var(--calcite-chip-corner-radius, 9999px);border-width:var(--calcite-border-width-sm);border-style:solid;font-size:var(--calcite-internal-chip-font-size, var(--calcite-font-size));padding-inline-start:var(--calcite-internal-chip-container-space-x-start);padding-inline-end:var(--calcite-internal-chip-container-space-x-end);block-size:var(--calcite-internal-chip-block-size, auto);inline-size:var(--calcite-internal-chip-inline-size, auto);min-inline-size:var(--calcite-internal-chip-block-size, auto)}.container:hover .select-icon--active{opacity:1}.container.selectable{cursor:pointer}.container:not(.non-interactive):focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.container.text--slotted .title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.container:not(.text--slotted) .title,.container:not(.image--slotted) .image-container{display:none}.container.is-circle .chip-icon,.container.is-circle .image-container{padding:0}.title{padding-inline:var(--calcite-internal-chip-title-space)}.image-container{display:inline-flex;overflow:hidden;align-items:center;justify-content:center;pointer-events:none;block-size:var(--calcite-internal-chip-image-size, 1.5rem);inline-size:var(--calcite-internal-chip-image-size, 1.5rem);padding-inline-start:0;padding-inline-end:var(--calcite-internal-chip-image-space-x-end, 0)}.chip-icon{position:relative;margin-block:0px;display:inline-flex;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);color:var(--calcite-chip-icon-color, var(--calcite-chip-text-color, var(--calcite-icon-color, currentColor)));padding-inline:var(--calcite-internal-chip-icon-space, 0.375rem)}.select-icon{align-self:center;justify-content:center;align-items:center;display:flex;inset-block-start:-1px;position:absolute;visibility:hidden;inline-size:auto;opacity:0;transition:opacity 0.15s ease-in-out, inline-size 0.15s ease-in-out;color:var(--calcite-chip-select-icon-color, currentColor)}.select-icon.select-icon--active{position:relative;visibility:visible;opacity:0.5;color:var(--calcite-chip-select-icon-color-pressed, var(--calcite-chip-select-icon-color, currentColor))}.multiple .select-icon{display:flex;align-items:center;justify-content:center}.multiple .select-icon,.single .select-icon--active{padding-inline-start:var(--calcite-internal-chip-select-space-x-start);padding-inline-end:var(--calcite-internal-chip-select-space-x-end);block-size:var(--calcite-internal-chip-icon-size, 1.5rem);inline-size:var(--calcite-internal-chip-icon-size, 1.5rem)}.close{color:var(--calcite-chip-close-icon-color, var(--calcite-close-icon-color, currentColor))}slot[name=image]::slotted(*){display:flex;block-size:100%;inline-size:100%;overflow:hidden;border-radius:50%}.close{margin:0px;cursor:pointer;align-items:center;border-radius:50%;border-style:none;outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;background-color:var(--calcite-close-background-color, var(--calcite-color-transparent));-webkit-appearance:none;display:flex;align-content:center;justify-content:center;color:var(--calcite-close-icon-color, var(--calcite-color-text-1));block-size:var(--calcite-internal-close-size, 1.5rem );inline-size:var(--calcite-internal-close-size, 1.5rem );padding:0}.close:hover,.close:focus{background-color:var(--calcite-close-background-color-hover, var(--calcite-color-transparent-hover))}.close:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.close:active{background-color:var(--calcite-close-background-color-press, var(--calcite-color-transparent-press))}.close calcite-icon{color:inherit}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteChipStyle0 = chipCss;

const Chip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.calciteChipClose = createEvent(this, "calciteChipClose", 6);
        this.calciteChipSelect = createEvent(this, "calciteChipSelect", 6);
        this.calciteInternalChipKeyEvent = createEvent(this, "calciteInternalChipKeyEvent", 6);
        this.calciteInternalChipSelect = createEvent(this, "calciteInternalChipSelect", 6);
        this.calciteInternalSyncSelectedChips = createEvent(this, "calciteInternalSyncSelectedChips", 6);
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
            if (isActivationKey(event.key)) {
                event.preventDefault();
                this.close();
            }
        };
        this.handleSlotImageChange = (event) => {
            this.hasImage = slotChangeHasAssignedElement(event);
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
        updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        connectMessages(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
        if (this.selectionMode !== "none" && this.interactive && this.selected) {
            this.handleSelectionPropertyChange(this.selected);
        }
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectLocalized(this);
        disconnectMessages(this);
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        if (isBrowser()) {
            await setUpMessages(this);
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
        await componentFocusable(this);
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
        return (h("div", { class: CSS$1.imageContainer }, h("slot", { name: SLOTS$1.image, onSlotchange: this.handleSlotImageChange })));
    }
    renderSelectionIcon() {
        const icon = this.selectionMode === "multiple"
            ? this.selected
                ? ICONS.checkedMultiple
                : ICONS.uncheckedMultiple
            : this.selected
                ? ICONS.checkedSingle
                : undefined;
        return (h("div", { class: {
                [CSS$1.selectIcon]: true,
                [CSS$1.selectIconActive]: this.selectionMode === "multiple" || this.selected,
            } }, icon ? h("calcite-icon", { icon: icon, scale: getIconScale(this.scale) }) : null));
    }
    renderCloseButton() {
        return (h("button", { "aria-label": this.messages.dismissLabel, class: CSS$1.close, onClick: this.close, onKeyDown: this.closeButtonKeyDownHandler, ref: (el) => (this.closeButtonEl = el), tabIndex: this.disabled ? -1 : 0 }, h("calcite-icon", { icon: ICONS.close, scale: getIconScale(this.scale) })));
    }
    renderIcon() {
        return (h("calcite-icon", { class: CSS$1.chipIcon, flipRtl: this.iconFlipRtl, icon: this.icon, scale: getIconScale(this.scale) }));
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
        return (h(Host, { key: '7feca8bad37627baabfc4abd25cf135e1e9f196b' }, h(InteractiveContainer, { key: 'af2360b4b768ae8c643d52f4bdb9f5d282504114', disabled: disabled }, h("div", { key: '8d905c4ab20d271a211282b95ebcb2d305d76cb7', "aria-checked": this.selectionMode !== "none" && this.interactive
                ? toAriaBoolean(this.selected)
                : undefined, "aria-label": this.label, class: {
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
            }, onClick: this.handleEmittingEvent, ref: (el) => (this.containerEl = el), role: role, tabIndex: disableInteraction ? -1 : 0 }, this.selectionMode !== "none" && this.renderSelectionIcon(), this.renderChipImage(), this.icon && this.renderIcon(), h("span", { key: 'dab6eae3f8330b85ffac4c7fe1b2fcbb53327196', class: CSS$1.title }, h("slot", { key: '72ba5bd0c7a97c30f766da119f419261aab24acb', onSlotchange: this.handleDefaultSlotChange })), this.closable && this.renderCloseButton()))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
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
 * v2.13.0
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
        registerInstance(this, hostRef);
        this.calciteComboboxItemChange = createEvent(this, "calciteComboboxItemChange", 6);
        this.calciteInternalComboboxItemChange = createEvent(this, "calciteInternalComboboxItemChange", 6);
        this.itemClickHandler = () => {
            this.toggleSelected();
        };
        this.active = false;
        this.ancestors = undefined;
        this.description = undefined;
        this.disabled = false;
        this.filterDisabled = undefined;
        this.filterTextMatchPattern = undefined;
        this.guid = guid();
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
        this.ancestors = getAncestors(this.el);
        connectConditionalSlotComponent(this);
    }
    disconnectedCallback() {
        disconnectConditionalSlotComponent(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
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
        return this.icon ? (h("calcite-icon", { class: {
                [CSS.custom]: !!this.icon,
                [CSS.iconActive]: this.icon && this.selected,
            }, flipRtl: this.iconFlipRtl, icon: this.icon || iconPath, key: "icon", scale: getIconScale(this.scale) })) : null;
    }
    renderSelectIndicator(showDot, iconPath) {
        return showDot ? (h("span", { class: {
                [CSS.icon]: true,
                [CSS.dot]: true,
            } })) : (h("calcite-icon", { class: {
                [CSS.icon]: true,
                [CSS.iconActive]: this.selected,
            }, flipRtl: this.iconFlipRtl, icon: iconPath, key: "indicator", scale: getIconScale(this.scale) }));
    }
    renderChildren() {
        if (getSlotted(this.el)) {
            return (h("ul", { key: "default-slot-container" }, h("slot", null)));
        }
        return null;
    }
    render() {
        const { disabled, heading, label, textLabel, value } = this;
        const isSingleSelect = isSingleLike(this.selectionMode);
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
        const depth = getDepth(this.el) + 1;
        return (h(Host, { key: '484c17421421afe7739dc37cc3edb46c2fd0e083', "aria-hidden": "true", "aria-label": itemLabel }, h(InteractiveContainer, { key: '71135810fa4af5e17b668d13af219c7575085a9e', disabled: disabled }, h("div", { key: '2db3e68f23449032b1ac5957a9376a68815e03c5', class: {
                [CSS.container]: true,
                [CSS.scale(this.scale)]: true,
            }, style: { "--calcite-combobox-item-spacing-indent-multiplier": `${depth}` } }, h("li", { key: '153f7e8af6cb925630fb08fc5cfcf4a8df48ad2a', class: classes, id: this.guid, onClick: this.itemClickHandler }, this.renderSelectIndicator(showDot, iconPath), this.renderIcon(iconPath), h("div", { key: '4d9bbd0bc113dc2196e3141a84f6137e7d48b95e', class: CSS.centerContent }, h("div", { key: 'd531d42c8af37b9fbdbda7457e88f4688427911b', class: CSS.title }, this.renderTextContent(headingText)), this.description ? (h("div", { class: CSS.description }, this.renderTextContent(this.description))) : null), this.shortHeading ? (h("div", { class: CSS.shortText }, this.renderTextContent(this.shortHeading))) : null, h("slot", { key: 'f4c71258fff023a30662c7105e1a7492edafa14a', name: SLOTS.contentEnd })), this.renderChildren()))));
    }
    renderTextContent(text) {
        const pattern = this.filterTextMatchPattern;
        if (!pattern || !text) {
            return text;
        }
        const parts = text.split(pattern);
        if (parts.length > 1) {
            // we only highlight the first match
            parts[1] = h("mark", { class: CSS.filterMatch }, parts[1]);
        }
        return parts;
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "disabled": ["handleComboboxItemPropsChange"],
        "textLabel": ["handleComboboxItemPropsChange"],
        "selected": ["selectedWatchHandler"]
    }; }
};
ComboboxItem.style = CalciteComboboxItemStyle0;

export { Chip as calcite_chip, ComboboxItem as calcite_combobox_item };
