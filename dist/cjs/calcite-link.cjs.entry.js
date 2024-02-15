/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const dom = require('./dom-c9c2c835.js');
const interactive = require('./interactive-3ab7044d.js');
const loadable = require('./loadable-5a794992.js');
const resources = require('./resources-9447c777.js');
require('./guid-ae73cd27.js');
require('./browser-d08a5f99.js');

const linkCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline}:host a,:host span{position:relative;display:flex;cursor:pointer;align-items:center;justify-content:center;border-radius:0px;border-style:none;font-family:inherit;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;text-decoration:none;line-height:inherit;font-size:inherit;-webkit-appearance:none}:host a:hover,:host span:hover{text-decoration:none}:host a,:host span{outline-color:transparent}:host a:focus,:host span:focus{outline:2px solid var(--calcite-color-brand);outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}calcite-icon{inline-size:1em;block-size:1em;min-inline-size:unset;min-block-size:unset}.calcite-link--icon{vertical-align:middle;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;margin-block-start:-0.25em}:host .calcite-link--icon.icon-start{margin-inline-end:0.5rem}:host .calcite-link--icon.icon-end{margin-inline-start:0.5rem}:host span,:host a{position:relative;display:inline;border-style:none;background-color:transparent;padding:0px;color:var(--calcite-color-text-link);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;line-height:inherit;white-space:initial;background-image:linear-gradient(currentColor, currentColor), linear-gradient(var(--calcite-color-brand-underline), var(--calcite-color-brand-underline));background-position-x:0%, 100%;background-position-y:min(1.5em, 100%);background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px}:host span:hover,:host span:focus,:host a:hover,:host a:focus{background-size:100% 1px, 100% 1px}:host span:active,:host a:active{background-size:100% 2px, 100% 2px}:host span.calcite--rtl,:host a.calcite--rtl{background-position:100% 100%, 100% 100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";

const Link = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        interactive.connectInteractive(this);
    }
    componentWillLoad() {
        loadable.setUpLoadableComponent(this);
    }
    componentDidLoad() {
        loadable.setComponentLoaded(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    disconnectedCallback() {
        interactive.disconnectInteractive(this);
    }
    render() {
        const { download, el } = this;
        const dir = dom.getElementDir(el);
        const childElType = this.href ? "a" : "span";
        const iconStartEl = (index.h("calcite-icon", { class: "calcite-link--icon icon-start", flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: "s" }));
        const iconEndEl = (index.h("calcite-icon", { class: "calcite-link--icon icon-end", flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, scale: "s" }));
        const Tag = childElType;
        const role = childElType === "span" ? "link" : null;
        const tabIndex = childElType === "span" ? 0 : null;
        return (index.h(index.Host, { role: "presentation" }, index.h(interactive.InteractiveContainer, { disabled: this.disabled }, index.h(Tag, { class: { [resources.CSS_UTILITY.rtl]: dir === "rtl" },
            /*
          When the 'download' property of type 'boolean | string' is set to true, the value is "".
          This works around that issue for now.
          */
            download: Tag === "a" && (download === "" || download) ? download : null, href: Tag === "a" && this.href, onClick: this.childElClickHandler, rel: Tag === "a" && this.rel, role: role, tabIndex: tabIndex, target: Tag === "a" && this.target,
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref: this.storeTagRef }, this.iconStart ? iconStartEl : null, index.h("slot", null), this.iconEnd ? iconEndEl : null))));
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
        await loadable.componentFocusable(this);
        dom.focusElement(this.childEl);
    }
    get el() { return index.getElement(this); }
};
Link.style = linkCss;

exports.calcite_link = Link;
