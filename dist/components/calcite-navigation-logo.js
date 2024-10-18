/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { c as componentFocusable, s as setUpLoadableComponent, a as setComponentLoaded } from './loadable.js';
import { H as Heading } from './Heading.js';
import { d as defineCustomElement$2 } from './icon.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
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

const CalciteNavigationLogo$1 = /*@__PURE__*/ proxyCustomElement(class CalciteNavigationLogo extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
        await componentFocusable(this);
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
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderIcon() {
        /** Icon scale is not variable as the component does not have a scale property */
        return h("calcite-icon", { class: CSS.icon, flipRtl: this.iconFlipRtl, icon: this.icon, scale: "l" });
    }
    renderHeaderContent() {
        const { heading, headingLevel, description } = this;
        const headingNode = heading ? (h(Heading, { class: {
                [CSS.heading]: true,
                [CSS.standalone]: !this.description,
            }, key: CSS.heading, level: headingLevel }, heading)) : null;
        const descriptionNode = description ? (h("span", { class: CSS.description, key: CSS.description }, description)) : null;
        return headingNode || descriptionNode ? (h("div", { class: CSS.container, key: CSS.container }, headingNode, descriptionNode)) : null;
    }
    render() {
        const { thumbnail } = this;
        return (h(Host, { key: '40dcb76c1c7919fd1a8b6929616d1d507c1e3301' }, h("a", { key: '7b457d99add3c3d4edbd4478711f9b9c9fb12caf', class: CSS.anchor, href: this.href, rel: this.rel, target: this.target }, thumbnail && h("img", { key: '592aa3cfc2dfa47f9aa603f7edce4521dbaa27ae', alt: this.label || "", class: CSS.image, src: thumbnail }), this.icon && this.renderIcon(), this.renderHeaderContent())));
    }
    static get delegatesFocus() { return true; }
    get el() { return this; }
    static get style() { return CalciteNavigationLogoStyle0; }
}, [17, "calcite-navigation-logo", {
        "active": [516],
        "href": [513],
        "icon": [513],
        "iconFlipRtl": [516, "icon-flip-rtl"],
        "label": [1],
        "rel": [513],
        "description": [1],
        "target": [513],
        "heading": [1],
        "thumbnail": [1],
        "headingLevel": [514, "heading-level"],
        "setFocus": [64]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-navigation-logo", "calcite-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-navigation-logo":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, CalciteNavigationLogo$1);
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteNavigationLogo = CalciteNavigationLogo$1;
const defineCustomElement = defineCustomElement$1;

export { CalciteNavigationLogo, defineCustomElement };
