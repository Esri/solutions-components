/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, f as forceUpdate, h, H as Host, g as getElement } from './p-6eb37ed2.js';
import { t as toAriaBoolean } from './p-68ec5c15.js';
import { g as guid } from './p-ff8343ec.js';
import { c as connectInteractive, d as disconnectInteractive, u as updateHostInteraction, I as InteractiveContainer } from './p-415cf05e.js';
import { s as setUpLoadableComponent, a as setComponentLoaded, c as componentFocusable } from './p-18f18ab3.js';
import { c as connectLocalized, d as disconnectLocalized } from './p-939bc1b4.js';
import { c as createObserver } from './p-c638d28e.js';
import { g as getIconScale } from './p-d559f79c.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './p-1a9a47a0.js';
import { i as isBrowser } from './p-acaae81d.js';
import './p-b39c5275.js';
import './p-fe6f7734.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS$1 = {
    button: "button",
    buttonTextVisible: "button--text-visible",
    buttonCompact: "button--compact",
    indicatorText: "indicator-text",
    iconContainer: "icon-container",
    slotContainer: "slot-container",
    slotContainerHidden: "slot-container--hidden",
    textContainer: "text-container",
    textContainerVisible: "text-container--visible",
    indicatorWithIcon: "indicator-with-icon",
    indicatorWithoutIcon: "indicator-without-icon",
};
const SLOTS = {
    tooltip: "tooltip",
};

const actionCss = ":host{box-sizing:border-box;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;background-color:transparent}.button{position:relative;margin:0px;display:flex;inline-size:auto;cursor:pointer;align-items:center;justify-content:flex-start;border-style:none;font-family:var(--calcite-font-family);font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-medium);outline-color:transparent;background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1));color:var(--calcite-action-text-color, var(--calcite-color-text-3));text-align:unset;flex:1 0 auto}.button:hover,.button:focus{background-color:var(--calcite-action-background-color-hover, var(--calcite-color-foreground-2));color:var(--calcite-action-text-color-pressed, var(--calcite-color-text-1))}.button:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.button:active{background-color:var(--calcite-action-background-color-pressed, var(--calcite-color-foreground-3))}.icon-container{pointer-events:none;margin:0px;display:flex;align-items:center;justify-content:center;min-inline-size:1rem;min-block-size:1.5rem}.text-container{margin:0px;inline-size:0px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;line-height:1.5rem;opacity:0;transition-property:opacity;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-property:margin;transition-property:inline-size}.text-container--visible{inline-size:auto;flex:1 1 auto;opacity:1}:host([active]) .button,:host([active]) .button:hover,:host([active]) .button:focus{color:var(--calcite-action-text-color-pressed, var(--calcite-color-text-1));background-color:var(--calcite-action-background-color-pressed, var(--calcite-color-foreground-3))}:host([active]) .button:active{background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1))}:host([loading]) .button:hover,:host([loading]) .button:focus{background-color:var(--calcite-action-background-color, var(--calcite-color-foreground-1))}:host([loading]) .text-container{opacity:var(--calcite-opacity-disabled)}:host([loading]) calcite-loader[inline]{margin-inline-end:0px}:host([appearance=transparent]) .button{background-color:transparent;transition-property:box-shadow;transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}:host([appearance=transparent]) .button:hover,:host([appearance=transparent]) .button:focus{background-color:var(--calcite-color-transparent-hover)}:host([appearance=transparent]) .button:active{background-color:var(--calcite-color-transparent-press)}:host([data-active]) .button{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}:host([scale=s]) .button{padding-inline:0.5rem;padding-block:0.25rem;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-normal)}:host([scale=s]) .button--text-visible .icon-container{margin-inline-end:0.5rem}:host([scale=m]) .button{padding-inline:1rem;padding-block:0.75rem;font-size:var(--calcite-font-size--1);line-height:1rem;font-weight:var(--calcite-font-weight-normal)}:host([scale=m]) .button--text-visible .icon-container{margin-inline-end:0.75rem}:host([scale=l]) .button{padding:1.25rem;font-size:var(--calcite-font-size-0);line-height:1.25rem;font-weight:var(--calcite-font-weight-normal)}:host([scale=l]) .button--text-visible .icon-container{margin-inline-end:1rem}:host([alignment=center]) .button{justify-content:center}:host([alignment=end]) .button{justify-content:flex-end}:host([alignment=center]) .button .text-container--visible,:host([alignment=end]) .button .text-container--visible{flex:0 1 auto}:host([scale=s][compact]) .button,:host([scale=m][compact]) .button,:host([scale=l][compact]) .button{padding-inline:0px}.slot-container{display:flex}.slot-container--hidden{display:none}.button--text-visible{inline-size:100%}.indicator-with-icon{position:relative}.indicator-with-icon::after{content:\"\";position:absolute;block-size:0.5rem;inline-size:0.5rem;border-radius:9999px;inset-block-end:-0.275rem;inset-inline-end:-0.275rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand))}.indicator-without-icon{margin-inline:0.25rem;inline-size:1rem;position:relative}.indicator-without-icon::after{content:\"\";position:absolute;block-size:0.5rem;inline-size:0.5rem;border-radius:9999px;inset-block-end:-0.275rem;inset-inline-end:-0.275rem;background-color:var(--calcite-action-indicator-color, var(--calcite-color-brand))}.indicator-text{position:absolute;inline-size:1px;block-size:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border-width:0}:host([hidden]){display:none}[hidden]{display:none}:host([disabled]) .button,:host([disabled]) .button:hover,:host([disabled]) .button:focus{cursor:default;background-color:var(--calcite-color-foreground-1);opacity:var(--calcite-opacity-disabled)}:host([disabled]):host([active]) .button,:host([disabled]):host([active]) .button:hover,:host([disabled]):host([active]) .button:focus{background-color:var(--calcite-color-foreground-3);opacity:var(--calcite-opacity-disabled)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}";
const CalciteActionStyle0 = actionCss;

const Action = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.mutationObserver = createObserver("mutation", () => forceUpdate(this));
        this.guid = `calcite-action-${guid()}`;
        this.indicatorId = `${this.guid}-indicator`;
        this.buttonId = `${this.guid}-button`;
        // --------------------------------------------------------------------------
        //
        //  Private Methods
        //
        // --------------------------------------------------------------------------
        this.handleTooltipSlotChange = (event) => {
            const tooltips = event.target
                .assignedElements({
                flatten: true,
            })
                .filter((el) => el?.matches("calcite-tooltip"));
            const tooltip = tooltips[0];
            if (tooltip) {
                tooltip.referenceElement = this.buttonEl;
            }
        };
        this.active = false;
        this.alignment = undefined;
        this.appearance = "solid";
        this.compact = false;
        this.disabled = false;
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.indicator = false;
        this.label = undefined;
        this.loading = false;
        this.scale = "m";
        this.text = undefined;
        this.textEnabled = false;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.effectiveLocale = "";
        this.defaultMessages = undefined;
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
        connectInteractive(this);
        connectLocalized(this);
        connectMessages(this);
        this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
    }
    async componentWillLoad() {
        setUpLoadableComponent(this);
        if (isBrowser()) {
            await setUpMessages(this);
        }
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLocalized(this);
        disconnectMessages(this);
        this.mutationObserver?.disconnect();
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        this.buttonEl?.focus();
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderTextContainer() {
        const { text, textEnabled } = this;
        const textContainerClasses = {
            [CSS$1.textContainer]: true,
            [CSS$1.textContainerVisible]: textEnabled,
        };
        return text ? (h("div", { class: textContainerClasses, key: "text-container" }, text)) : null;
    }
    renderIndicatorText() {
        const { indicator, messages, indicatorId, buttonId } = this;
        return (h("div", { "aria-labelledby": buttonId, "aria-live": "polite", class: CSS$1.indicatorText, id: indicatorId, role: "region" }, indicator ? messages.indicator : null));
    }
    renderIconContainer() {
        const { loading, icon, scale, el, iconFlipRtl, indicator } = this;
        const loaderScale = scale === "l" ? "l" : "m";
        const calciteLoaderNode = loading ? (h("calcite-loader", { inline: true, label: this.messages.loading, scale: loaderScale })) : null;
        const calciteIconNode = icon ? (h("calcite-icon", { class: { [CSS$1.indicatorWithIcon]: indicator }, flipRtl: iconFlipRtl, icon: icon, scale: getIconScale(this.scale) })) : null;
        const iconNode = calciteLoaderNode || calciteIconNode;
        const hasIconToDisplay = iconNode || el.children?.length;
        const slotContainerNode = (h("div", { class: {
                [CSS$1.slotContainer]: true,
                [CSS$1.slotContainerHidden]: loading,
            } }, h("slot", null)));
        return hasIconToDisplay ? (h("div", { "aria-hidden": "true", class: CSS$1.iconContainer, key: "icon-container" }, iconNode, slotContainerNode)) : null;
    }
    render() {
        const { active, compact, disabled, icon, loading, textEnabled, label, text, indicator, indicatorId, buttonId, messages, } = this;
        const labelFallback = label || text;
        const ariaLabel = labelFallback
            ? `${labelFallback}${indicator ? ` (${messages.indicator})` : ""}`
            : "";
        const buttonClasses = {
            [CSS$1.button]: true,
            [CSS$1.buttonTextVisible]: textEnabled,
            [CSS$1.buttonCompact]: compact,
        };
        return (h(Host, { key: '0e061330c72e61acb61e53d2d94e1478c03c8083' }, h(InteractiveContainer, { key: 'd34028dbfeb72982aa3fe6847663b16672f3e6ea', disabled: disabled }, h("button", { key: 'c05c642ffb09bb466c0c4d1be0b8aac79b2dcdff', "aria-busy": toAriaBoolean(loading), "aria-controls": indicator ? indicatorId : null, "aria-disabled": toAriaBoolean(disabled), "aria-label": ariaLabel, "aria-pressed": toAriaBoolean(active), class: buttonClasses, disabled: disabled, id: buttonId, ref: (buttonEl) => (this.buttonEl = buttonEl) }, this.renderIconContainer(), this.renderTextContainer(), !icon && indicator && h("div", { class: CSS$1.indicatorWithoutIcon, key: "indicator-no-icon" })), h("slot", { key: '8ab8d03371d7cd7211e5ab1a083b9b7b9017db79', name: SLOTS.tooltip, onSlotchange: this.handleTooltipSlotChange }), this.renderIndicatorText())));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return getElement(this); }
    static get watchers() { return {
        "messageOverrides": ["onMessagesChange"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
};
Action.style = CalciteActionStyle0;

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const CSS = {
    loader: "loader",
    loaderParts: "loader__svgs",
    loaderPart: "loader__svg",
    loaderPartId: (partId) => `${CSS.loaderPart}--${partId}`,
    loaderText: "loader__text",
    loaderPercentage: "loader__percentage",
};

const loaderCss = "@charset \"UTF-8\";@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0}}:host{position:relative;margin-inline:auto;display:none;align-items:center;justify-content:center;opacity:1;min-block-size:var(--calcite-loader-size);font-size:var(--calcite-loader-font-size);stroke:var(--calcite-color-brand);stroke-width:3;fill:none;transform:scale(1, 1);animation:loader-color-shift scaleDuration(--calcite-internal-animation-timing-slow, 2) alternate-reverse infinite linear;padding-block:var(--calcite-loader-padding, 4rem);will-change:contents}:host([scale=s]){--calcite-loader-font-size:var(--calcite-font-size--3);--calcite-loader-size:2rem;--calcite-loader-size-inline:0.75rem;--calcite-internal-loader-value-line-height:0.625rem}:host([scale=m]){--calcite-loader-font-size:var(--calcite-font-size-0);--calcite-loader-size:4rem;--calcite-loader-size-inline:1rem;--calcite-internal-loader-value-line-height:1.375rem}:host([scale=l]){--calcite-loader-font-size:var(--calcite-font-size-2);--calcite-loader-size:6rem;--calcite-loader-size-inline:1.5rem;--calcite-internal-loader-value-line-height:1.71875rem}:host([no-padding]){padding-block:0px}:host{display:flex}.loader__text{display:block;text-align:center;font-size:var(--calcite-font-size--2);line-height:1rem;color:var(--calcite-color-text-1);margin-block-start:calc(var(--calcite-loader-size) + 1.5rem)}.loader__percentage{display:block;text-align:center;color:var(--calcite-color-text-1);font-size:var(--calcite-loader-font-size);inline-size:var(--calcite-loader-size);line-height:var(--calcite-internal-loader-value-line-height);align-self:center}.loader__svgs{position:absolute;overflow:visible;opacity:1;inline-size:var(--calcite-loader-size);block-size:var(--calcite-loader-size);inset-inline-start:50%;margin-inline-start:calc(var(--calcite-loader-size) / 2 * -1);animation-iteration-count:infinite;animation-timing-function:linear;animation-duration:scaleDuration(--calcite-internal-animation-timing-slow, 6.66);animation-name:loader-clockwise;display:flex}.loader__svg{position:absolute;inset-block-start:0px;transform-origin:center;overflow:visible;inset-inline-start:0;inline-size:var(--calcite-loader-size);block-size:var(--calcite-loader-size);animation-iteration-count:infinite;animation-timing-function:linear}.loader__svg--1{animation-name:loader-offset-1}.loader__svg--2{animation-name:loader-offset-2}.loader__svg--3{animation-name:loader-offset-3}:host([type=determinate]),:host([type=determinate-value]){animation:none;stroke:var(--calcite-color-border-3)}:host([type=determinate]) .loader__svgs,:host([type=determinate-value]) .loader__svgs{animation:none}:host([type=determinate]) .loader__svg--3,:host([type=determinate-value]) .loader__svg--3{animation:none;stroke:var(--calcite-color-brand);stroke-dasharray:150.79632;transform:rotate(-90deg);transition:all var(--calcite-internal-animation-timing-fast) linear}:host([inline]){position:relative;margin:0px;animation:none;stroke:currentColor;stroke-width:2;padding-block:0px;block-size:var(--calcite-loader-size-inline);min-block-size:var(--calcite-loader-size-inline);inline-size:var(--calcite-loader-size-inline);margin-inline-end:calc(var(--calcite-loader-size-inline) * 0.5);vertical-align:calc(var(--calcite-loader-size-inline) * -1 * 0.2)}:host([inline]) .loader__svgs{inset-block-start:0px;margin:0px;inset-inline-start:0;inline-size:var(--calcite-loader-size-inline);block-size:var(--calcite-loader-size-inline)}:host([inline]) .loader__svg{inline-size:var(--calcite-loader-size-inline);block-size:var(--calcite-loader-size-inline)}:host([complete]){opacity:0;transform:scale(0.75, 0.75);transform-origin:center;transition:opacity var(--calcite-internal-animation-timing-medium) linear 1000ms, transform var(--calcite-internal-animation-timing-medium) linear 1000ms}:host([complete]) .loader__svgs{opacity:0;transform:scale(0.75, 0.75);transform-origin:center;transition:opacity calc(180ms * var(--calcite-internal-duration-factor)) linear 800ms, transform calc(180ms * var(--calcite-internal-duration-factor)) linear 800ms}:host([complete]) .loader__percentage{color:var(--calcite-color-brand);transform:scale(1.05, 1.05);transform-origin:center;transition:color var(--calcite-internal-animation-timing-medium) linear, transform var(--calcite-internal-animation-timing-medium) linear}.loader__svg--1{stroke-dasharray:27.9252444444 139.6262222222;animation-duration:scaleDuration(--calcite-internal-animation-timing-slow, 4.8)}@keyframes loader-offset-1{0%{stroke-dasharray:27.9252444444 251.3272;stroke-dashoffset:0}50%{stroke-dasharray:139.6262222222 139.6262222222;stroke-dashoffset:-83.7757333333}100%{stroke-dasharray:27.9252444444 251.3272;stroke-dashoffset:-279.2524444444}}.loader__svg--2{stroke-dasharray:55.8504888889 139.6262222222;animation-duration:scaleDuration(--calcite-internal-animation-timing-slow, 6.4)}@keyframes loader-offset-2{0%{stroke-dasharray:55.8504888889 223.4019555556;stroke-dashoffset:0}50%{stroke-dasharray:139.6262222222 139.6262222222;stroke-dashoffset:-97.7383555556}100%{stroke-dasharray:55.8504888889 223.4019555556;stroke-dashoffset:-279.2524444444}}.loader__svg--3{stroke-dasharray:13.9626222222 139.6262222222;animation-duration:scaleDuration(--calcite-internal-animation-timing-slow, 7.734)}@keyframes loader-offset-3{0%{stroke-dasharray:13.9626222222 265.2898222222;stroke-dashoffset:0}50%{stroke-dasharray:139.6262222222 139.6262222222;stroke-dashoffset:-76.7944222222}100%{stroke-dasharray:13.9626222222 265.2898222222;stroke-dashoffset:-279.2524444444}}@keyframes loader-color-shift{0%{stroke:var(--calcite-color-brand)}33%{stroke:var(--calcite-color-brand-press)}66%{stroke:var(--calcite-color-brand-hover)}100%{stroke:var(--calcite-color-brand)}}@keyframes loader-clockwise{100%{transform:rotate(360deg)}}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteLoaderStyle0 = loaderCss;

const Loader = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.formatValue = () => {
            if (this.type !== "determinate-value") {
                return `${this.value}`;
            }
            return this.formatter.format(this.value / 100);
        };
        this.inline = false;
        this.label = undefined;
        this.scale = "m";
        this.type = undefined;
        this.value = 0;
        this.text = "";
        this.effectiveLocale = "";
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        connectLocalized(this);
        this.updateFormatter();
    }
    disconnectedCallback() {
        disconnectLocalized(this);
    }
    render() {
        const { el, inline, label, scale, text, type, value } = this;
        const id = el.id || guid();
        const radiusRatio = 0.45;
        const size = inline ? this.getInlineSize(scale) : this.getSize(scale);
        const radius = size * radiusRatio;
        const viewbox = `0 0 ${size} ${size}`;
        const isDeterminate = type?.startsWith("determinate");
        const circumference = 2 * radius * Math.PI;
        const progress = (value / 100) * circumference;
        const remaining = circumference - progress;
        const valueNow = Math.floor(value);
        const hostAttributes = {
            "aria-valuenow": valueNow,
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            complete: valueNow === 100,
        };
        const svgAttributes = { r: radius, cx: size / 2, cy: size / 2 };
        const determinateStyle = { "stroke-dasharray": `${progress} ${remaining}` };
        return (h(Host, { key: 'b84a28c551e2484735b2cb7bad89a7a1d608fe13', "aria-label": label, id: id, role: "progressbar", ...(isDeterminate ? hostAttributes : {}) }, h("div", { key: '7ea0d6f2a742c8950cff2196bc454cc8ec3be037', class: CSS.loaderParts }, [1, 2, 3].map((index) => (h("svg", { "aria-hidden": "true", class: {
                [CSS.loaderPart]: true,
                [CSS.loaderPartId(index)]: true,
            }, key: index, viewBox: viewbox, ...(index === 3 && isDeterminate ? { style: determinateStyle } : {}) }, h("circle", { ...svgAttributes })))), isDeterminate && h("div", { key: '2732fc9cbbaade638eb6241776b2aecea6177ed5', class: CSS.loaderPercentage }, this.formatValue())), text && h("div", { key: '5050af5bb4d979e4f83ac997f0f98aa69be86f52', class: CSS.loaderText }, text)));
    }
    formatterPropsChange() {
        this.updateFormatter();
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Return the proper sizes based on the scale property
     *
     * @param scale
     */
    getSize(scale) {
        return {
            s: 32,
            m: 56,
            l: 80,
        }[scale];
    }
    getInlineSize(scale) {
        return {
            s: 12,
            m: 16,
            l: 20,
        }[scale];
    }
    updateFormatter() {
        if (this.type !== "determinate-value" ||
            this.formatter?.resolvedOptions().locale === this.effectiveLocale) {
            return;
        }
        this.formatter = new Intl.NumberFormat(this.effectiveLocale, {
            style: "percent",
        });
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "effectiveLocale": ["formatterPropsChange"],
        "type": ["formatterPropsChange"]
    }; }
};
Loader.style = CalciteLoaderStyle0;

export { Action as calcite_action, Loader as calcite_loader };
