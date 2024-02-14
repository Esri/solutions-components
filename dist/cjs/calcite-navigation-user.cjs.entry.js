/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const loadable = require('./loadable-5a794992.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const CSS = {
    textContainer: "text-container",
    fullName: "full-name",
    username: "username",
    button: "button",
};

const navigationUserCss = ":host{display:inline-flex;outline:2px solid transparent;outline-offset:2px}:host .button{background-color:transparent;border:none;margin:0px;display:flex;cursor:pointer;align-items:center;justify-content:center;font-family:var(--calcite-sans-family);font-size:var(--calcite-font-size-0);line-height:1.25rem;outline-color:transparent;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;border-block-end:2px solid transparent}:host(:hover) .button,:host(:focus) .button{background-color:var(--calcite-color-foreground-2)}:host(:focus) .button{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host(:active) .button{background-color:var(--calcite-color-foreground-3);color:var(--calcite-color-text-1)}calcite-avatar{padding-inline:1rem}calcite-avatar~.text-container{padding-inline-start:0px}:host([active]) .button{border-color:var(--calcite-color-brand);color:var(--calcite-color-text-1);--calcite-ui-icon-color:var(--calcite-color-brand)}.text-container{margin-block-start:0.125rem;display:flex;flex-direction:column;padding-inline:1rem;text-align:start}.full-name{margin-inline-start:0px;font-size:var(--calcite-font-size-0);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.username{color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host([hidden]){display:none}[hidden]{display:none}";

const CalciteNavigationUser = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.active = undefined;
        this.fullName = undefined;
        this.label = undefined;
        this.textDisabled = false;
        this.thumbnail = undefined;
        this.userId = undefined;
        this.username = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        this.el.focus();
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    render() {
        return (index.h(index.Host, null, index.h("button", { "aria-label": this.label, class: CSS.button }, index.h("calcite-avatar", { "full-name": this.fullName, label: this.label, thumbnail: this.thumbnail, "user-id": this.userId, username: this.username }), (this.fullName || this.username) && !this.textDisabled && (index.h("div", { class: CSS.textContainer }, this.fullName && (index.h("span", { class: CSS.fullName, key: CSS.fullName }, this.fullName)), this.username && (index.h("span", { class: CSS.username, key: CSS.username }, this.username)))))));
    }
    static get delegatesFocus() { return true; }
    get el() { return index.getElement(this); }
};
CalciteNavigationUser.style = navigationUserCss;

exports.calcite_navigation_user = CalciteNavigationUser;
