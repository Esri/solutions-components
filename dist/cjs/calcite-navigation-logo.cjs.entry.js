/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5a0af791.js');
const loadable = require('./loadable-2e2626dc.js');
const Heading = require('./Heading-2333bcd2.js');
require('./browser-69696af0.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    container: "container",
    heading: "heading",
    description: "description",
    anchor: "anchor",
    image: "image",
    standalone: "standalone",
    icon: "icon",
};

const navigationLogoCss = ":host{display:inline-flex;outline:2px solid transparent;outline-offset:2px}.anchor{margin:0px;display:flex;cursor:pointer;align-items:center;justify-content:center;font-size:var(--calcite-font-size-0);line-height:1.25rem;text-decoration-line:none;outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;color:inherit;border-block-end:2px solid transparent}.anchor:hover,.anchor:focus{background-color:var(--calcite-color-foreground-2)}.anchor:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.anchor:active{background-color:var(--calcite-color-foreground-3)}.image,.icon{margin:0px;display:flex;block-size:1.75rem;padding-inline:1rem}.image~.icon{padding-inline-start:0px}.image~.container,.icon~.container{padding-inline-start:0px}:host(:active) .anchor{color:var(--calcite-color-text-1)}:host([active]) .anchor{color:var(--calcite-color-text-1);border-color:var(--calcite-color-brand);--calcite-icon-color:var(--calcite-color-brand)}.container{margin-block-start:0.125rem;display:flex;flex-direction:column;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding-inline:1rem;text-align:start}.heading{margin-inline-start:0px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:var(--calcite-font-size-0);font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-1)}.standalone{font-size:var(--calcite-font-size-1)}.description{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteNavigationLogoStyle0 = navigationLogoCss;

const CalciteNavigationLogo = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.active = undefined;
        this.href = undefined;
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.label = undefined;
        this.rel = undefined;
        this.description = undefined;
        this.target = undefined;
        this.heading = undefined;
        this.thumbnail = undefined;
        this.headingLevel = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await loadable.componentFocusable(this);
        if (this.href) {
            this.el.focus();
        }
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
    renderIcon() {
        /** Icon scale is not variable as the component does not have a scale property */
        return index.h("calcite-icon", { class: CSS.icon, flipRtl: this.iconFlipRtl, icon: this.icon, scale: "l" });
    }
    renderHeaderContent() {
        const { heading, headingLevel, description } = this;
        const headingNode = heading ? (index.h(Heading.Heading, { class: {
                [CSS.heading]: true,
                [CSS.standalone]: !this.description,
            }, key: CSS.heading, level: headingLevel }, heading)) : null;
        const descriptionNode = description ? (index.h("span", { class: CSS.description, key: CSS.description }, description)) : null;
        return headingNode || descriptionNode ? (index.h("div", { class: CSS.container, key: CSS.container }, headingNode, descriptionNode)) : null;
    }
    render() {
        const { thumbnail } = this;
        return (index.h(index.Host, { key: 'b76572e79734c7190d373225662f453423450d9a' }, index.h("a", { key: '77d1604fd344f2d5aea65842067a615343aa591b', class: CSS.anchor, href: this.href, rel: this.rel, target: this.target }, thumbnail && index.h("img", { key: 'abf6396d63acf26f5ad5e2bb5c9dd280c3728134', alt: this.label || "", class: CSS.image, src: thumbnail }), this.icon && this.renderIcon(), this.renderHeaderContent())));
    }
    static get delegatesFocus() { return true; }
    get el() { return index.getElement(this); }
};
CalciteNavigationLogo.style = CalciteNavigationLogoStyle0;

exports.calcite_navigation_logo = CalciteNavigationLogo;
