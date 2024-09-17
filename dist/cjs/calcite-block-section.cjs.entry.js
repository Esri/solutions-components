/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const dom = require('./dom-6a9b6275.js');
const key = require('./key-d6da79d8.js');
const locale = require('./locale-42c21404.js');
const t9n = require('./t9n-42ba6ea3.js');
const loadable = require('./loadable-2e2626dc.js');
require('./guid-02e5380f.js');
require('./resources-dfe71ff2.js');
require('./observers-8fed90f3.js');
require('./browser-69696af0.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const IDS = {
    content: "content",
    toggle: "toggle",
};
const CSS = {
    chevronIcon: "chevron-icon",
    content: "content",
    iconStart: "icon--start",
    iconEnd: "icon--end",
    invalid: "invalid",
    sectionHeader: "section-header",
    sectionHeaderText: "section-header__text",
    statusIcon: "status-icon",
    switch: "switch",
    toggle: "toggle",
    toggleSwitch: "toggle--switch",
    toggleContainer: "toggle-container",
    toggleSwitchContent: "toggle--switch__content",
    toggleSwitchText: "toggle--switch__text",
    valid: "valid",
};
const ICONS = {
    menuOpen: "chevron-up",
    menuClosed: "chevron-down",
    valid: "check-circle",
    invalid: "exclamation-mark-triangle",
};

const blockSectionCss = ":host{box-sizing:border-box;display:block;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);color:var(--calcite-color-text-2)}:host([open]){border-width:0px;border-block-end-width:1px;border-style:solid;border-block-end-color:var(--calcite-color-border-3)}:host([open]) .toggle{color:var(--calcite-color-text-1)}:host([open]) .toggle:hover{color:var(--calcite-color-text-1)}:host([open]) .chevron-icon{color:var(--calcite-color-text-3)}:host([open]) .chevron-icon:hover{color:var(--calcite-color-text-1)}:host(:last-child){border-block-end-width:0px}.toggle{inline-size:100%;border-width:0px;background-color:transparent;font-family:var(--calcite-font-family);gap:var(--calcite-spacing-md);color:var(--calcite-color-text-2);font-weight:var(--calcite-font-weight-normal)}.toggle:hover{color:var(--calcite-color-text-1)}.toggle--switch,.section-header{margin-inline:0px;margin-block:0.25rem;display:flex;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-items:center;padding-inline:0px;padding-block:0.5rem;font-size:var(--calcite-font-size--1);outline-color:transparent}.toggle--switch:focus,.section-header:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.toggle--switch:hover,.section-header:hover{color:var(--calcite-color-text-1)}.section-header__text{margin-block:0px;flex:1 1 auto;text-align:initial;word-wrap:anywhere}.toggle-container{position:relative;display:flex;align-items:center;background-color:transparent;word-break:break-word}.toggle-container .toggle--switch__content{display:flex;flex:1 1 auto;align-items:center}.toggle-container .icon--end,.toggle-container .icon--start,.toggle-container .chevron-icon{display:flex;align-items:center;color:var(--calcite-color-text-3)}.toggle-container .icon--end:hover,.toggle-container .icon--start:hover,.toggle-container .chevron-icon:hover{color:var(--calcite-color-text-1)}.status-icon{display:flex;align-items:center}.status-icon.valid{color:var(--calcite-color-status-success)}.status-icon.invalid{color:var(--calcite-color-status-danger)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteBlockSectionStyle0 = blockSectionCss;

const BlockSection = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.calciteBlockSectionToggle = index.createEvent(this, "calciteBlockSectionToggle", 6);
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleHeaderKeyDown = (event) => {
            if (key.isActivationKey(event.key)) {
                this.toggleSection();
                event.preventDefault();
                event.stopPropagation();
            }
        };
        this.toggleSection = () => {
            this.open = !this.open;
            this.calciteBlockSectionToggle.emit();
        };
        this.iconEnd = undefined;
        this.iconFlipRtl = undefined;
        this.iconStart = undefined;
        this.open = false;
        this.status = undefined;
        this.text = undefined;
        this.toggleDisplay = "button";
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.effectiveLocale = undefined;
        this.defaultMessages = undefined;
    }
    onMessagesChange() {
        /* wired up by t9n util */
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Sets focus on the component's first tabbable element.
     *
     */
    async setFocus() {
        await loadable.componentFocusable(this);
        dom.focusFirstTabbable(this.el);
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
        locale.connectLocalized(this);
        t9n.connectMessages(this);
    }
    async componentWillLoad() {
        await t9n.setUpMessages(this);
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    disconnectedCallback() {
        locale.disconnectLocalized(this);
        t9n.disconnectMessages(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderStatusIcon() {
        const { status } = this;
        const statusIcon = ICONS[status] ?? false;
        const statusIconClasses = {
            [CSS.statusIcon]: true,
            [CSS.valid]: status == "valid",
            [CSS.invalid]: status == "invalid",
        };
        return statusIcon ? (index.h("calcite-icon", { class: statusIconClasses, icon: statusIcon, scale: "s" })) : null;
    }
    renderIcon(icon) {
        const { iconFlipRtl } = this;
        if (icon === undefined) {
            return null;
        }
        const flipRtlStart = iconFlipRtl === "both" || iconFlipRtl === "start";
        const flipRtlEnd = iconFlipRtl === "both" || iconFlipRtl === "end";
        const isIconStart = icon === this.iconStart;
        /** Icon scale is not variable as the component does not have a scale property */
        return (index.h("calcite-icon", { class: isIconStart ? CSS.iconStart : CSS.iconEnd, flipRtl: isIconStart ? flipRtlStart : flipRtlEnd, icon: isIconStart ? this.iconStart : this.iconEnd, key: isIconStart ? this.iconStart : this.iconEnd, scale: "s" }));
    }
    render() {
        const { messages, open, text, toggleDisplay } = this;
        const arrowIcon = open ? ICONS.menuOpen : ICONS.menuClosed;
        const toggleLabel = open ? messages.collapse : messages.expand;
        const headerNode = toggleDisplay === "switch" ? (index.h("div", { class: {
                [CSS.toggleContainer]: true,
            } }, index.h("div", { "aria-controls": IDS.content, "aria-expanded": dom.toAriaBoolean(open), class: {
                [CSS.toggle]: true,
                [CSS.toggleSwitch]: true,
            }, id: IDS.toggle, onClick: this.toggleSection, onKeyDown: this.handleHeaderKeyDown, role: "button", tabIndex: 0, title: toggleLabel }, this.renderIcon(this.iconStart), index.h("div", { class: CSS.toggleSwitchContent }, index.h("span", { class: CSS.toggleSwitchText }, text)), this.renderIcon(this.iconEnd), this.renderStatusIcon(), index.h("calcite-switch", { checked: open, class: CSS.switch, inert: true, label: toggleLabel, scale: "s" })))) : (index.h("div", { class: {
                [CSS.toggleContainer]: true,
            } }, index.h("button", { "aria-controls": IDS.content, "aria-expanded": dom.toAriaBoolean(open), class: {
                [CSS.sectionHeader]: true,
                [CSS.toggle]: true,
            }, id: IDS.toggle, onClick: this.toggleSection }, this.renderIcon(this.iconStart), index.h("span", { class: CSS.sectionHeaderText }, text), this.renderIcon(this.iconEnd), this.renderStatusIcon(), index.h("calcite-icon", { class: CSS.chevronIcon, icon: arrowIcon, scale: "s" }))));
        return (index.h(index.Host, { key: '224c2187de037da1611a3228195e95ba43bde093' }, headerNode, index.h("section", { key: '8b8849645851e21e26c63cef44428f30d2429a0b', "aria-labelledby": IDS.toggle, class: CSS.content, hidden: !open, id: IDS.content }, index.h("slot", { key: '3f6d783aaa6d886bb4533a4dec96aafc8ba058ef' }))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
BlockSection.style = CalciteBlockSectionStyle0;

exports.calcite_block_section = BlockSection;
