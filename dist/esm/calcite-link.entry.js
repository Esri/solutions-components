/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './index-164d485a.js';
import { a as getElementDir, e as focusElement } from './dom-38c6f027.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './interactive-39bf5602.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './loadable-37e7fbd6.js';
import { C as CSS_UTILITY } from './resources-8834f920.js';
import './guid-b75a5f7b.js';
import './browser-d60104bd.js';

const linkCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline}:host a,:host span{position:relative;display:flex;cursor:pointer;align-items:center;justify-content:center;border-radius:0px;border-style:none;font-family:inherit;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;text-decoration:none;line-height:inherit;font-size:inherit;-webkit-appearance:none}:host a:hover,:host span:hover{text-decoration:none}:host a,:host span{outline-color:transparent}:host a:focus,:host span:focus{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}calcite-icon{inline-size:1em;block-size:1em;min-inline-size:unset;min-block-size:unset}.calcite-link--icon{vertical-align:middle;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;margin-block-start:-0.25em}:host .calcite-link--icon.icon-start{margin-inline-end:0.5rem}:host .calcite-link--icon.icon-end{margin-inline-start:0.5rem}:host span,:host a{position:relative;display:inline;border-style:none;background-color:transparent;padding:0px;color:var(--calcite-color-text-link);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;line-height:inherit;white-space:initial;background-image:linear-gradient(currentColor, currentColor), linear-gradient(var(--calcite-color-brand-underline), var(--calcite-color-brand-underline));background-position-x:0%, 100%;background-position-y:min(1.5em, 100%);background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px}:host span:hover,:host span:focus,:host a:hover,:host a:focus{background-size:100% 1px, 100% 1px}:host span:active,:host a:active{background-size:100% 2px, 100% 2px}:host span.calcite--rtl,:host a.calcite--rtl{background-position:100% 100%, 100% 100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";

const Link = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.childElClickHandler = (event) => {
            if (!event.isTrusted) {
                // click was invoked internally, we stop it here
                event.stopPropagation();
            }
        };
        //--------------------------------------------------------------------------
        //
        //  Private Methods
        //
        //--------------------------------------------------------------------------
        this.storeTagRef = (el) => {
            this.childEl = el;
        };
        this.disabled = false;
        this.download = false;
        this.href = undefined;
        this.iconEnd = undefined;
        this.iconFlipRtl = undefined;
        this.iconStart = undefined;
        this.rel = undefined;
        this.target = undefined;
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectInteractive(this);
    }
    componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
    }
    render() {
        const { download, el } = this;
        const dir = getElementDir(el);
        const childElType = this.href ? "a" : "span";
        const iconStartEl = (h("calcite-icon", { class: "calcite-link--icon icon-start", flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: "s" }));
        const iconEndEl = (h("calcite-icon", { class: "calcite-link--icon icon-end", flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, scale: "s" }));
        const Tag = childElType;
        const role = childElType === "span" ? "link" : null;
        const tabIndex = childElType === "span" ? 0 : null;
        return (h(Host, { role: "presentation" }, h(InteractiveContainer, { disabled: this.disabled }, h(Tag, { class: { [CSS_UTILITY.rtl]: dir === "rtl" },
            /*
          When the 'download' property of type 'boolean | string' is set to true, the value is "".
          This works around that issue for now.
          */
            download: Tag === "a" && (download === "" || download) ? download : null, href: Tag === "a" && this.href, onClick: this.childElClickHandler, rel: Tag === "a" && this.rel, role: role, tabIndex: tabIndex, target: Tag === "a" && this.target,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.storeTagRef }, this.iconStart ? iconStartEl : null, h("slot", null), this.iconEnd ? iconEndEl : null))));
    }
    //--------------------------------------------------------------------------
    //
    //  Events
    //
    //--------------------------------------------------------------------------
    clickHandler(event) {
        if (this.disabled) {
            return;
        }
        // forwards the click() to the internal link for non user-initiated events
        if (!event.isTrusted) {
            this.childEl.click();
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
        focusElement(this.childEl);
    }
    get el() { return getElement(this); }
};
Link.style = linkCss;

export { Link as calcite_link };
