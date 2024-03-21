/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const dom = require('./dom-c9c2c835.js');
const key = require('./key-c5504030.js');
const locale = require('./locale-d237c9d5.js');
const t9n = require('./t9n-993a84de.js');
const loadable = require('./loadable-5a794992.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./observers-db4527e4.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const IDS = {
    content: "content",
    toggle: "toggle",
};
const CSS = {
    content: "content",
    focusGuard: "focus-guard",
    invalid: "invalid",
    sectionHeader: "section-header",
    sectionHeaderText: "section-header__text",
    statusIcon: "status-icon",
    toggle: "toggle",
    toggleSwitch: "toggle--switch",
    toggleSwitchContainer: "toggle--switch-container",
    toggleSwitchContent: "toggle--switch__content",
    toggleSwitchText: "toggle--switch__text",
    valid: "valid",
};
const ICONS = {
    menuOpen: "chevron-down",
    menuClosedLeft: "chevron-left",
    menuClosedRight: "chevron-right",
    valid: "check-circle",
    invalid: "exclamation-mark-triangle",
};

const blockSectionCss = ":host{box-sizing:border-box;display:block;background-color:var(--calcite-color-foreground-1);font-size:var(--calcite-font-size--1);color:var(--calcite-color-text-2)}:host([open]){border-width:0px;border-block-end-width:1px;border-style:solid;border-block-end-color:var(--calcite-color-border-3)}:host(:last-child){border-block-end-width:0px}.toggle{inline-size:100%;border-width:0px;background-color:transparent;font-family:var(--calcite-sans-family);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2)}.toggle--switch,.section-header{margin-inline:0px;margin-block:0.25rem;display:flex;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-items:center;padding-inline:0px;padding-block:0.5rem;font-size:var(--calcite-font-size--1);outline-color:transparent}.toggle--switch:focus,.section-header:focus{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.toggle--switch:hover,.section-header:hover{color:var(--calcite-color-text-1)}.section-header .status-icon{align-self:flex-end}.section-header__text{margin-inline:0.75rem;margin-block:0px;flex:1 1 auto;text-align:initial;word-wrap:anywhere}.toggle--switch-container{position:relative;display:flex;inline-size:100%;align-items:center;background-color:transparent;word-break:break-word}.toggle--switch-container .focus-guard{--calcite-label-margin-bottom:0;pointer-events:none;position:absolute;inset-inline-end:0;margin-inline-start:0.25rem}.toggle--switch .status-icon{margin-inline-start:0.5rem}.toggle--switch__content{display:flex;flex:1 1 auto;align-items:center}.status-icon.valid{color:var(--calcite-color-status-success)}.status-icon.invalid{color:var(--calcite-color-status-danger)}:host([toggle-display=switch]) .toggle .toggle--switch__content{margin-inline-end:1.75rem}:host([hidden]){display:none}[hidden]{display:none}";

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
        var _a;
        const { status } = this;
        const statusIcon = (_a = ICONS[status]) !== null && _a !== void 0 ? _a : false;
        const statusIconClasses = {
            [CSS.statusIcon]: true,
            [CSS.valid]: status == "valid",
            [CSS.invalid]: status == "invalid",
        };
        return !!statusIcon ? (index.h("calcite-icon", { class: statusIconClasses, icon: statusIcon, scale: "s" })) : null;
    }
    render() {
        const { el, messages, open, text, toggleDisplay } = this;
        const dir = dom.getElementDir(el);
        const arrowIcon = open
            ? ICONS.menuOpen
            : dir === "rtl"
                ? ICONS.menuClosedLeft
                : ICONS.menuClosedRight;
        const toggleLabel = open ? messages.collapse : messages.expand;
        const headerNode = toggleDisplay === "switch" ? (index.h("div", { class: {
                [CSS.toggleSwitchContainer]: true,
            } }, index.h("div", { "aria-controls": IDS.content, "aria-expanded": dom.toAriaBoolean(open), class: {
                [CSS.toggle]: true,
                [CSS.toggleSwitch]: true,
            }, id: IDS.toggle, onClick: this.toggleSection, onKeyDown: this.handleHeaderKeyDown, role: "button", tabIndex: 0, title: toggleLabel }, index.h("div", { class: CSS.toggleSwitchContent }, index.h("span", { class: CSS.toggleSwitchText }, text)), this.renderStatusIcon()), index.h("calcite-label", { class: CSS.focusGuard, layout: "inline", tabIndex: -1 }, index.h("calcite-switch", { checked: open, label: toggleLabel, scale: "s" })))) : (index.h("button", { "aria-controls": IDS.content, "aria-expanded": dom.toAriaBoolean(open), class: {
                [CSS.sectionHeader]: true,
                [CSS.toggle]: true,
            }, id: IDS.toggle, onClick: this.toggleSection }, index.h("calcite-icon", { icon: arrowIcon, scale: "s" }), index.h("span", { class: CSS.sectionHeaderText }, text), this.renderStatusIcon()));
        return (index.h(index.Host, null, headerNode, index.h("section", { "aria-labelledby": IDS.toggle, class: CSS.content, hidden: !open, id: IDS.content }, index.h("slot", null))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
BlockSection.style = blockSectionCss;

exports.calcite_block_section = BlockSection;
