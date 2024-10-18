/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './p-4e6eb06e.js';
import { g as getElementDir, d as focusElement } from './p-621ad249.js';
import { u as updateHostInteraction, I as InteractiveContainer } from './p-d6902512.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './p-ad9d1221.js';
import { C as CSS_UTILITY } from './p-91371f97.js';
import './p-7d542581.js';
import './p-4f82eb55.js';

const linkCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:inline}:host a,:host span{position:relative;display:flex;cursor:pointer;align-items:center;justify-content:center;border-radius:0px;border-style:none;font-family:inherit;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;text-decoration:none;line-height:inherit;font-size:inherit;-webkit-appearance:none}:host a:hover,:host span:hover{text-decoration:none}:host a,:host span{outline-color:transparent}:host a:focus,:host span:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}calcite-icon{inline-size:1em;block-size:1em;min-inline-size:unset;min-block-size:unset}.calcite-link--icon{vertical-align:middle;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;margin-block-start:-0.25em}:host .calcite-link--icon.icon-start{margin-inline-end:0.5rem}:host .calcite-link--icon.icon-end{margin-inline-start:0.5rem}:host span,:host a{position:relative;display:inline;border-style:none;background-color:transparent;padding:0px;color:var(--calcite-color-text-link);transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;line-height:inherit;white-space:initial;background-image:linear-gradient(currentColor, currentColor), linear-gradient(var(--calcite-color-brand-underline), var(--calcite-color-brand-underline));background-position-x:0%, 100%;background-position-y:min(1.5em, 100%);background-repeat:no-repeat, no-repeat;background-size:0% 1px, 100% 1px}:host span:hover,:host span:focus,:host a:hover,:host a:focus{background-size:100% 1px, 100% 1px}:host span:active,:host a:active{background-size:100% 2px, 100% 2px}:host span.calcite--rtl,:host a.calcite--rtl{background-position:100% 100%, 100% 100%}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteLinkStyle0 = linkCss;

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
    componentWillLoad() {
        setUpLoadableComponent(this);
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    render() {
        const { download, el } = this;
        const dir = getElementDir(el);
        const childElType = this.href ? "a" : "span";
        const iconStartEl = (h("calcite-icon", { key: 'c9844033e9bd5da35333b485aad27ddb2df6b039', class: "calcite-link--icon icon-start", flipRtl: this.iconFlipRtl === "start" || this.iconFlipRtl === "both", icon: this.iconStart, scale: "s" }));
        const iconEndEl = (h("calcite-icon", { key: 'f1de10682fee566552253cf2ae3cb6725f5e5f11', class: "calcite-link--icon icon-end", flipRtl: this.iconFlipRtl === "end" || this.iconFlipRtl === "both", icon: this.iconEnd, scale: "s" }));
        const Tag = childElType;
        const role = childElType === "span" ? "link" : null;
        const tabIndex = childElType === "span" ? 0 : null;
        return (h(Host, { key: '5ad440468fcccb6fe7c146ec57462e7593f96109', role: "presentation" }, h(InteractiveContainer, { key: '916c68cd97c31fa1ec69f408d25d3023749698e1', disabled: this.disabled }, h(Tag, { key: 'e00cebc0c56b95c02192872ac84df996a74a5fa4', class: { [CSS_UTILITY.rtl]: dir === "rtl" },
            /*
          When the 'download' property of type 'boolean | string' is set to true, the value is "".
          This works around that issue for now.
          */
            download: childElType === "a"
                ? download === true || download === ""
                    ? ""
                    : download || null
                : null, href: childElType === "a" && this.href, onClick: this.childElClickHandler, ref: this.storeTagRef, rel: childElType === "a" && this.rel, role: role, tabIndex: tabIndex, target: childElType === "a" && this.target }, this.iconStart ? iconStartEl : null, h("slot", { key: '57b25ff3b8f7f3d048796a559c2911178d6b8ddf' }), this.iconEnd ? iconEndEl : null))));
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
Link.style = CalciteLinkStyle0;

export { Link as calcite_link };
