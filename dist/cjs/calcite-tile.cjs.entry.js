/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-105cf2b9.js');
const conditionalSlot = require('./conditionalSlot-9d7b60d1.js');
const dom = require('./dom-c9c2c835.js');
const interactive = require('./interactive-3ab7044d.js');
require('./observers-db4527e4.js');
require('./guid-ae73cd27.js');
require('./resources-9447c777.js');
require('./browser-d08a5f99.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/main/LICENSE.md for details.
 * v2.4.0
 */
const SLOTS = {
    contentStart: "content-start",
    contentEnd: "content-end",
};

const tileCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{box-sizing:border-box;display:inline-block;-webkit-user-select:none;-moz-user-select:none;user-select:none;background-color:var(--calcite-color-foreground-1);color:var(--calcite-color-text-3);transition-duration:150ms;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}:host .container{pointer-events:none;display:grid;grid-template-columns:repeat(1, minmax(0, 1fr));gap:var(--calcite-spacing-md)}:host .content{display:flex;flex:1 1 auto;flex-direction:column;justify-content:center;inline-size:10%}:host .content-container{display:flex;inline-size:100%;flex:1 1 auto;align-items:stretch;padding:0px;color:var(--calcite-color-text-2);outline-color:transparent}:host .content-slot-container{display:flex;align-items:center}:host .content-slot-container:first-child{padding-inline:0 0.75rem}:host .content-slot-container:last-child{padding-inline:0.75rem 0}:host .heading{pointer-events:none;overflow-wrap:break-word;color:var(--calcite-color-text-2);font-size:var(--calcite-font-size--1);font-weight:500;line-height:1.20313rem}:host .large-visual{align-items:center;text-align:center;min-block-size:12rem}:host .large-visual calcite-icon{align-self:self-end;block-size:64px;inline-size:64px;justify-self:center}:host .large-visual .content-container{align-self:center}:host .description{pointer-events:none;overflow-wrap:break-word;color:var(--calcite-color-text-3);font-size:var(--calcite-font-size--2);font-weight:400;line-height:1.03125rem}:host([scale=s]) .container{gap:var(--calcite-spacing-sm)}:host([scale=s]) .heading{font-size:var(--calcite-font-size--2);line-height:1.03125rem}:host([scale=s]) .description{font-size:var(--calcite-font-size--3);line-height:0.85938rem}:host([scale=l]) .container{gap:var(--calcite-spacing-xl)}:host([scale=l]) .heading{font-size:var(--calcite-font-size-0);line-height:1.375rem}:host([scale=l]) .description{font-size:var(--calcite-font-size--1);line-height:1.20313rem}:host(:not([href])) calcite-icon{color:var(--calcite-color-text-3)}:host([href]) .heading,:host([href]:hover) .heading{-webkit-text-decoration-line:underline;text-decoration-line:underline;color:var(--calcite-color-text-link)}:host(:not([embed])){box-shadow:0 0 0 1px var(--calcite-color-border-2);padding:var(--calcite-spacing-md)}:host(:not([embed])[scale=s]){padding:var(--calcite-spacing-sm)}:host(:not([embed])[scale=l]){padding:var(--calcite-spacing-xl)}:host(:not([embed])[href]:hover){cursor:pointer;box-shadow:0 0 0 2px var(--calcite-color-brand)}:host(:not([embed])[href]:active){box-shadow:0 0 0 3px var(--calcite-color-brand)}:host([icon][heading]:not([description]):not([embed])){padding:0px}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host(:hover) .heading,:host([active]) .heading{color:var(--calcite-color-text-1)}:host(:hover) .description,:host([active]) .description{color:var(--calcite-color-text-2)}:host([hidden]){display:none}[hidden]{display:none}";

const Tile = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.active = false;
        this.description = undefined;
        this.disabled = false;
        this.embed = false;
        this.focused = false;
        this.heading = undefined;
        this.href = undefined;
        this.icon = undefined;
        this.iconFlipRtl = false;
        this.scale = "m";
    }
    // --------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    // --------------------------------------------------------------------------
    connectedCallback() {
        conditionalSlot.connectConditionalSlotComponent(this);
        interactive.connectInteractive(this);
    }
    disconnectedCallback() {
        conditionalSlot.disconnectConditionalSlotComponent(this);
        interactive.disconnectInteractive(this);
    }
    componentDidRender() {
        interactive.updateHostInteraction(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Render Methods
    //
    // --------------------------------------------------------------------------
    renderTile() {
        const { icon, el, heading, description, iconFlipRtl } = this;
        const isLargeVisual = heading && icon && !description;
        return (index.h("div", { class: { container: true, "large-visual": isLargeVisual } }, icon && index.h("calcite-icon", { flipRtl: iconFlipRtl, icon: icon, scale: "l" }), index.h("div", { class: "content-container" }, dom.getSlotted(el, SLOTS.contentStart) ? (index.h("div", { class: "content-slot-container" }, index.h("slot", { name: SLOTS.contentStart }))) : null, index.h("div", { class: "content" }, heading && index.h("div", { class: "heading" }, heading), description && index.h("div", { class: "description" }, description)), dom.getSlotted(el, SLOTS.contentEnd) ? (index.h("div", { class: "content-slot-container" }, index.h("slot", { name: SLOTS.contentEnd }))) : null)));
    }
    render() {
        const { disabled } = this;
        return (index.h(interactive.InteractiveContainer, { disabled: disabled }, this.href ? (index.h("calcite-link", { disabled: disabled, href: this.href }, this.renderTile())) : (this.renderTile())));
    }
    get el() { return index.getElement(this); }
};
Tile.style = tileCss;

exports.calcite_tile = Tile;
