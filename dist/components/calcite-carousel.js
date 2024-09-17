/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { h as slotChangeGetAssignedElements, y as focusElementInGroup, t as toAriaBoolean, g as getElementDir, z as whenAnimationDone } from './dom.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale2.js';
import { g as guid } from './guid.js';
import { c as connectInteractive, u as updateHostInteraction, d as disconnectInteractive, I as InteractiveContainer } from './interactive.js';
import { a as setComponentLoaded, s as setUpLoadableComponent, c as componentFocusable } from './loadable.js';
import { c as connectMessages, d as disconnectMessages, s as setUpMessages, u as updateMessages } from './t9n.js';
import { g as getRoundRobinIndex } from './array.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './progress.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
const DURATION = 6000;
const CSS = {
    container: "container",
    containerOverlaid: "container--overlaid",
    containerEdged: "container--edged",
    itemContainer: "item-container",
    itemContainerForward: "item-container--forward",
    itemContainerBackward: "item-container--backward",
    pagination: "pagination",
    paginationItems: "pagination-items",
    paginationItem: "pagination-item",
    paginationItemIndividual: "pagination-item--individual",
    paginationItemSelected: "pagination-item--selected",
    pageNext: "page-next",
    pagePrevious: "page-previous",
    autoplayControl: "autoplay-control",
    autoplayProgress: "autoplay-progress",
};
const ICONS = {
    chevronLeft: "chevron-left",
    chevronRight: "chevron-right",
    inactive: "bullet-point",
    active: "bullet-point-large",
    pause: "pause-f",
    play: "play-f",
};

const carouselCss = ":host([disabled]){cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex;inline-size:100%;--calcite-internal-internal-carousel-item-space:1.5rem;--calcite-internal-internal-carousel-item-space-wide:3.5rem;--calcite-internal-internal-carousel-item-background-color:var(\n    --calcite-internal-carousel-item-background-color,\n    var(--calcite-color-foreground-1)\n  );--calcite-internal-internal-carousel-item-background-color-hover:var(\n    --calcite-internal-carousel-item-background-color-hover,\n    var(--calcite-color-foreground-2)\n  );--calcite-internal-internal-carousel-item-background-color-active:var(\n    --calcite-internal-carousel-item-background-color-active,\n    var(--calcite-color-foreground-2)\n  );--calcite-internal-internal-carousel-item-background-color-selected:var(\n    --calcite-internal-carousel-item-background-color-selected,\n    var(--calcite-color-foreground-1)\n  );--calcite-internal-internal-carousel-item-icon-color-hover:var(\n    --calcite-internal-carousel-item-icon-color-hover,\n    var(--calcite-action-color-transparent-hover)\n  );--calcite-internal-internal-carousel-item-icon-color:var(\n    --calcite-internal-carousel-item-icon-color,\n    var(--calcite-color-border-3)\n  );--calcite-internal-internal-carousel-item-icon-color-selected:var(\n    --calcite-internal-carousel-item-icon-color-selected,\n    var(--calcite-color-brand)\n  );--calcite-internal-internal-carousel-control-color-hover:var(\n    --calcite-internal-carousel-control-color-hover,\n    var(--calcite-internal-carousel-item-icon-color-hover)\n  );--calcite-internal-internal-carousel-control-color:var(\n    --calcite-internal-carousel-item-icon-color,\n    var(--calcite-color-border-input)\n  );--calcite-internal-internal-carousel-autoplay-progress-background-color:var(\n    --calcite-internal-carousel-autoplay-progress-background-color,\n    var(--calcite-color-border-3)\n  );--calcite-internal-internal-carousel-autoplay-progress-fill-color:var(\n    --calcite-internal-carousel-autoplay-progress-fill-color,\n    var(--calcite-color-brand)\n  )}.container{position:relative;display:flex;inline-size:100%;flex-direction:column;overflow:hidden;font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-color-text-2);outline-color:transparent}.container:focus{outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.container--edged:not(.container--overlaid){padding-inline:var(--calcite-internal-internal-carousel-item-space-wide);inline-size:calc(100% - var(--calcite-internal-internal-carousel-item-space-wide) * 2)}.item-container{display:flex;flex:1 1 auto;align-items:flex-start;justify-content:center;overflow:auto;padding:0.25rem;animation-name:none;animation-duration:var(--calcite-animation-timing)}.container--overlaid .item-container{padding:0px}.item-container--forward{animation-name:item-forward}.item-container--backward{animation-name:item-backward}calcite-carousel-item:not([selected]){opacity:0}.pagination{margin:0.75rem;display:flex;flex-direction:row;align-items:center;justify-content:center;inline-size:auto}.pagination-items{display:flex;flex-direction:row;align-items:center}.container--overlaid .pagination{position:absolute}.pagination-item.page-next,.pagination-item.page-previous{color:var(--calcite-internal-internal-carousel-control-color)}.pagination-item.page-next:hover,.pagination-item.page-previous:hover{color:var(--calcite-internal-internal-carousel-control-color-hover)}.container--edged .page-next,.container--edged .page-previous{block-size:3rem;inline-size:3rem;position:absolute;inset-block-start:50%;transform:translateY(-50%)}.container--edged .page-next{inset-inline-end:0}.container--edged .page-previous{inset-inline-start:0}.container--overlaid .pagination{inset-block-start:unset;inset-block-end:0;inset-inline:0}.pagination-item.autoplay-control{position:relative;color:var(--calcite-internal-internal-carousel-control-color);--calcite-color-brand:var(--calcite-internal-internal-carousel-autoplay-progress-fill-color);--calcite-color-border-3:var(--calcite-internal-internal-carousel-autoplay-progress-background-color)}.autoplay-control:focus .autoplay-progress{inset-block-end:4px;inset-inline:2px;inline-size:calc(100% - 4px)}.autoplay-progress{position:absolute;inset-block-end:2px;inset-inline:0;inline-size:100%}.pagination-item{margin:0px;block-size:2rem;inline-size:2rem;cursor:pointer;align-items:center;border-style:none;background-color:transparent;outline-color:transparent;transition:background-color, block-size, border-color, box-shadow, color, inset-block-end, inset-block-start, inset-inline-end, inset-inline-start inset-size, opacity, outline-color, transform var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;-webkit-appearance:none;display:flex;align-content:center;justify-content:center;--calcite-color-foreground-1:var(--calcite-internal-internal-carousel-item-background-color);color:var(--calcite-internal-internal-carousel-item-icon-color)}.pagination-item:hover{background-color:var(--calcite-internal-internal-carousel-item-background-color-hover);color:var(--calcite-internal-internal-carousel-item-icon-color-hover)}.pagination-item:focus{background-color:var(--calcite-internal-internal-carousel-item-background-color-active);outline:2px solid var(--calcite-ui-focus-color, var(--calcite-color-brand));outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-offset-invert-focus),\n                1\n              )\n            )\n          )}.pagination-item:active{background-color:var(--calcite-internal-internal-carousel-item-background-color-active);color:var(--calcite-internal-internal-carousel-item-icon-color-hover)}.pagination-item calcite-icon{color:inherit;pointer-events:none}.pagination-item.pagination-item--selected{--calcite-color-foreground-1:var(--calcite-internal-internal-carousel-item-background-color-selected);--calcite-color-foreground-3:var(--calcite-internal-internal-carousel-item-background-color-selected);color:var(--calcite-internal-internal-carousel-item-icon-color-selected)}.container--overlaid .pagination-item{background-color:var(--calcite-internal-internal-carousel-item-background-color)}.container--overlaid .pagination-item:hover{background-color:var(--calcite-internal-internal-carousel-item-background-color-hover)}.container--overlaid .pagination-item:focus{background-color:var(--calcite-internal-internal-carousel-item-background-color-active)}.container--overlaid .pagination-item:active{background-color:var(--calcite-internal-internal-carousel-item-background-color-active)}@keyframes item-forward{0%{transform:translate3d(100px, 0, 0)}100%{transform:translate3d(0, 0, 0)}}@keyframes item-backward{0%{transform:translate3d(-100px, 0, 0)}100%{transform:translate3d(0, 0, 0)}}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.interaction-container{display:contents}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteCarouselStyle0 = carouselCss;

const Carousel = /*@__PURE__*/ proxyCustomElement(class Carousel extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.calciteCarouselChange = createEvent(this, "calciteCarouselChange", 6);
        this.calciteCarouselPlay = createEvent(this, "calciteCarouselPlay", 6);
        this.calciteCarouselStop = createEvent(this, "calciteCarouselStop", 6);
        this.calciteCarouselPause = createEvent(this, "calciteCarouselPause", 6);
        this.calciteCarouselResume = createEvent(this, "calciteCarouselResume", 6);
        this.containerId = `calcite-carousel-container-${guid()}`;
        this.slideDurationInterval = null;
        this.slideInterval = null;
        this.autoplayHandler = () => {
            this.clearIntervals();
            this.slideDurationInterval = setInterval(this.timer, this.autoplayDuration / 100);
        };
        this.timer = () => {
            let time = this.slideDurationRemaining;
            const notSuspended = (!this.suspendedDueToFocus && !this.suspendedDueToHover) || this.userPreventsSuspend;
            if (notSuspended) {
                if (time <= 0.01) {
                    time = 1;
                    this.nextItem(false);
                }
                else {
                    time = time - 0.01;
                }
            }
            if (time > 0) {
                this.slideDurationRemaining = time;
            }
        };
        this.handleSlotChange = (event) => {
            const items = slotChangeGetAssignedElements(event);
            if (items.length < 1) {
                return;
            }
            const activeItemIndex = items.findIndex((item) => item.selected);
            const requestedSelectedIndex = activeItemIndex > -1 ? activeItemIndex : 0;
            this.items = items;
            this.setSelectedItem(requestedSelectedIndex, false);
        };
        this.setSelectedItem = (requestedIndex, emit) => {
            const previousSelected = this.selectedIndex;
            this.items.forEach((el, index) => {
                const isMatch = requestedIndex === index;
                el.selected = isMatch;
                if (isMatch) {
                    this.selectedItem = el;
                    this.selectedIndex = index;
                }
            });
            if (emit) {
                this.playing = false;
                if (previousSelected !== this.selectedIndex) {
                    this.calciteCarouselChange.emit();
                }
            }
        };
        this.handleArrowClick = (event) => {
            const direction = event.target.dataset.direction;
            if (direction === "next") {
                this.direction = "forward";
                this.nextItem(true);
            }
            else if (direction === "previous") {
                this.direction = "backward";
                this.previousItem();
            }
        };
        this.handleItemSelection = (event) => {
            const item = event.target;
            const requestedPosition = parseInt(item.dataset.index);
            if (requestedPosition === this.selectedIndex) {
                return;
            }
            if (this.playing) {
                this.handlePause(true);
            }
            this.direction = requestedPosition > this.selectedIndex ? "forward" : "backward";
            this.setSelectedItem(requestedPosition, true);
        };
        this.toggleRotation = () => {
            this.userPreventsSuspend = true;
            if (this.playing) {
                this.handlePause(true);
            }
            else {
                this.handlePlay(true);
            }
        };
        this.handleFocusIn = () => {
            const isPlaying = this.playing;
            if (isPlaying) {
                this.suspendedDueToFocus = true;
            }
            if ((!this.suspendedDueToFocus || !this.suspendedDueToHover) && isPlaying) {
                this.calciteCarouselPause.emit();
            }
        };
        this.handleMouseIn = () => {
            const isPlaying = this.playing;
            if (isPlaying) {
                this.suspendedDueToHover = true;
            }
            if ((!this.suspendedDueToFocus || !this.suspendedDueToHover) && isPlaying) {
                this.calciteCarouselPause.emit();
            }
        };
        this.handleMouseOut = (event) => {
            const leavingComponent = !this.el.contains(event.relatedTarget);
            const isPlaying = this.playing;
            if (leavingComponent && isPlaying) {
                this.suspendedDueToHover = false;
            }
            if (leavingComponent && isPlaying && !this.suspendedDueToFocus) {
                this.userPreventsSuspend = false;
                this.calciteCarouselResume.emit();
            }
        };
        this.handleFocusOut = (event) => {
            const leavingComponent = !event.composedPath().includes(event.relatedTarget);
            const isPlaying = this.playing;
            if (leavingComponent && isPlaying) {
                this.suspendedDueToFocus = false;
            }
            if (leavingComponent && isPlaying && !this.suspendedDueToHover) {
                this.userPreventsSuspend = false;
                this.calciteCarouselResume.emit();
            }
        };
        this.containerKeyDownHandler = (event) => {
            if (event.target !== this.container) {
                return;
            }
            const lastItem = this.items.length - 1;
            switch (event.key) {
                case " ":
                case "Enter":
                    event.preventDefault();
                    if (this.autoplay === "" || this.autoplay || this.autoplay === "paused") {
                        this.toggleRotation();
                    }
                    break;
                case "ArrowRight":
                    this.direction = "forward";
                    this.nextItem(true);
                    break;
                case "ArrowLeft":
                    this.direction = "backward";
                    this.previousItem();
                    break;
                case "Home":
                    event.preventDefault();
                    if (this.selectedIndex === 0) {
                        return;
                    }
                    this.direction = "backward";
                    this.setSelectedItem(0, true);
                    break;
                case "End":
                    event.preventDefault();
                    if (this.selectedIndex === lastItem) {
                        return;
                    }
                    this.direction = "forward";
                    this.setSelectedItem(lastItem, true);
                    break;
            }
        };
        this.tabListKeyDownHandler = (event) => {
            const interactiveItems = Array(...this.tabList.querySelectorAll("button"));
            const currentEl = event.target;
            switch (event.key) {
                case "ArrowRight":
                    focusElementInGroup(interactiveItems, currentEl, "next");
                    break;
                case "ArrowLeft":
                    focusElementInGroup(interactiveItems, currentEl, "previous");
                    break;
                case "Home":
                    event.preventDefault();
                    focusElementInGroup(interactiveItems, currentEl, "first");
                    break;
                case "End":
                    event.preventDefault();
                    focusElementInGroup(interactiveItems, currentEl, "last");
                    break;
            }
        };
        this.storeTabListRef = (el) => {
            this.tabList = el;
        };
        this.storeContainerRef = (el) => {
            this.container = el;
        };
        this.storeItemContainerRef = (el) => {
            this.itemContainer = el;
        };
        // --------------------------------------------------------------------------
        //
        //  Render Methods
        //
        // --------------------------------------------------------------------------
        this.renderRotationControl = () => {
            const text = this.playing ? this.messages.pause : this.messages.play;
            return (h("button", { "aria-label": text, class: {
                    [CSS.paginationItem]: true,
                    [CSS.autoplayControl]: true,
                }, onClick: this.toggleRotation, title: text }, h("calcite-icon", { icon: this.playing ? ICONS.pause : ICONS.play, scale: "s" }), this.playing && (h("calcite-progress", { class: CSS.autoplayProgress, label: this.messages.carouselItemProgress, value: this.slideDurationRemaining }))));
        };
        this.renderPaginationArea = () => (h("div", { class: {
                [CSS.pagination]: true,
                [CSS.containerOverlaid]: this.controlOverlay,
            }, onKeyDown: this.tabListKeyDownHandler, ref: this.storeTabListRef }, (this.playing || this.autoplay === "" || this.autoplay || this.autoplay === "paused") &&
            this.renderRotationControl(), this.arrowType === "inline" && this.renderArrow("previous"), this.renderPaginationItems(), this.arrowType === "inline" && this.renderArrow("next")));
        this.renderPaginationItems = () => (h("div", { "aria-label": this.label, class: CSS.paginationItems, role: "tablist" }, this.items.map((item, index) => {
            const isMatch = index === this.selectedIndex;
            return (h("button", { "aria-controls": !isMatch ? item.id : undefined, "aria-selected": toAriaBoolean(isMatch), class: {
                    [CSS.paginationItem]: true,
                    [CSS.paginationItemIndividual]: true,
                    [CSS.paginationItemSelected]: isMatch,
                }, "data-index": index, key: item.id, onClick: this.handleItemSelection, role: "tab", title: item.label }, h("calcite-icon", { icon: isMatch ? ICONS.active : ICONS.inactive, scale: "l" })));
        })));
        this.renderArrow = (direction) => {
            const isPrev = direction === "previous";
            const dir = getElementDir(this.el);
            const scale = this.arrowType === "edge" ? "m" : "s";
            const css = isPrev ? CSS.pagePrevious : CSS.pageNext;
            const title = isPrev ? this.messages.previous : this.messages.next;
            const icon = isPrev ? ICONS.chevronLeft : ICONS.chevronRight;
            return (h("button", { "aria-controls": this.containerId, class: { [CSS.paginationItem]: true, [css]: true }, "data-direction": direction, onClick: this.handleArrowClick, title: title }, h("calcite-icon", { flipRtl: dir === "rtl", icon: icon, scale: scale })));
        };
        this.autoplay = false;
        this.arrowType = "inline";
        this.autoplayDuration = DURATION;
        this.controlOverlay = false;
        this.disabled = false;
        this.label = undefined;
        this.messages = undefined;
        this.messageOverrides = undefined;
        this.paused = undefined;
        this.selectedItem = undefined;
        this.selectedIndex = undefined;
        this.items = [];
        this.direction = "standby";
        this.defaultMessages = undefined;
        this.playing = false;
        this.suspendedDueToFocus = false;
        this.suspendedDueToHover = false;
        this.userPreventsSuspend = false;
        this.effectiveLocale = "";
        this.suspendedSlideDurationRemaining = 1;
        this.slideDurationRemaining = 1;
    }
    autoplayWatcher(autoplay) {
        if (!autoplay) {
            this.handlePause(false);
        }
    }
    onMessagesChange() {
        /* wired up by t9n util */
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
    }
    componentDidLoad() {
        setComponentLoaded(this);
    }
    componentDidRender() {
        updateHostInteraction(this);
    }
    disconnectedCallback() {
        disconnectInteractive(this);
        disconnectLocalized(this);
        disconnectMessages(this);
        this.clearIntervals();
    }
    async componentWillLoad() {
        /* When the 'autoplay' property of type 'boolean | string' is set to true, the value is "". */
        if ((this.autoplay === "" || this.autoplay) && this.autoplay !== "paused") {
            this.handlePlay(false);
        }
        else if (this.autoplay === "paused") {
            this.paused = true;
        }
        setUpLoadableComponent(this);
        await setUpMessages(this);
    }
    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------
    /** Sets focus on the component. */
    async setFocus() {
        await componentFocusable(this);
        this.container?.focus();
    }
    /** Play the carousel. If `autoplay` is not enabled (initialized either to `true` or `"paused"`), these methods will have no effect. */
    async play() {
        /* When the 'autoplay' property of type 'boolean | string' is set to true, the value is "". */
        if (this.playing || (this.autoplay !== "" && !this.autoplay && this.autoplay !== "paused")) {
            return;
        }
        this.handlePlay(true);
    }
    /** Stop the carousel. If `autoplay` is not enabled (initialized either to `true` or `"paused"`), these methods will have no effect. */
    async stop() {
        if (!this.playing) {
            return;
        }
        this.handlePause(true);
    }
    async directionWatcher(direction) {
        if (direction === "standby") {
            return;
        }
        await whenAnimationDone(this.itemContainer, direction === "forward" ? "item-forward" : "item-backward");
        this.direction = "standby";
    }
    playingWatcher() {
        this.paused = !this.playing;
    }
    suspendWatcher() {
        if (!this.suspendedDueToFocus && !this.suspendedDueToHover) {
            this.suspendEnd();
        }
        else {
            this.suspendStart();
        }
    }
    async effectiveLocaleChange() {
        await updateMessages(this, this.effectiveLocale);
    }
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    clearIntervals() {
        clearInterval(this.slideDurationInterval);
        clearInterval(this.slideInterval);
    }
    nextItem(emit) {
        if (this.playing && emit) {
            this.playing = false;
        }
        const nextIndex = getRoundRobinIndex(this.selectedIndex + 1, this.items.length);
        this.setSelectedItem(nextIndex, emit);
    }
    previousItem() {
        this.playing = false;
        const prevIndex = getRoundRobinIndex(Math.max(this.selectedIndex - 1, -1), this.items.length);
        this.setSelectedItem(prevIndex, true);
    }
    handlePlay(emit) {
        this.playing = true;
        this.autoplayHandler();
        this.slideInterval = setInterval(this.autoplayHandler, this.autoplayDuration);
        if (emit) {
            this.calciteCarouselPlay.emit();
        }
    }
    handlePause(emit) {
        this.playing = false;
        this.clearIntervals();
        this.slideDurationRemaining = 1;
        this.suspendedSlideDurationRemaining = 1;
        if (emit) {
            this.calciteCarouselStop.emit();
        }
    }
    suspendStart() {
        this.suspendedSlideDurationRemaining = this.slideDurationRemaining;
    }
    suspendEnd() {
        this.slideDurationRemaining = this.suspendedSlideDurationRemaining;
    }
    render() {
        const { direction } = this;
        return (h(Host, { key: 'bff4155cb4358665eb6530b6637322598604d873' }, h(InteractiveContainer, { key: '7a388be689aca07856f350963c33bce1d4e5e278', disabled: this.disabled }, h("div", { key: 'c53c92b22ace937c0d2a6568ddd729ccb1b91108', "aria-label": this.label, "aria-live": this.playing ? "off" : "polite", "aria-roledescription": this.messages.carousel, class: {
                [CSS.container]: true,
                [CSS.containerOverlaid]: this.controlOverlay,
                [CSS.containerEdged]: this.arrowType === "edge",
            }, onFocusin: this.handleFocusIn, onFocusout: this.handleFocusOut, onKeyDown: this.containerKeyDownHandler, onMouseEnter: this.handleMouseIn, onMouseLeave: this.handleMouseOut, ref: this.storeContainerRef, role: "group", tabIndex: 0 }, h("section", { key: 'cae379b167a37ef82417ab308c7d623300790122', class: {
                [CSS.itemContainer]: true,
                [CSS.itemContainerForward]: direction === "forward",
                [CSS.itemContainerBackward]: direction === "backward",
            }, id: this.containerId,
            // eslint-disable-next-line react/jsx-sort-props -- auto-generated by @esri/calcite-components/enforce-ref-last-prop
            ref: this.storeItemContainerRef }, h("slot", { key: 'bf14a67b46e8946e9cafc57a8d0625b65513f702', onSlotchange: this.handleSlotChange })), this.items.length > 1 && this.renderPaginationArea(), this.arrowType === "edge" && this.renderArrow("previous"), this.arrowType === "edge" && this.renderArrow("next")))));
    }
    static get assetsDirs() { return ["assets"]; }
    get el() { return this; }
    static get watchers() { return {
        "autoplay": ["autoplayWatcher"],
        "messageOverrides": ["onMessagesChange"],
        "direction": ["directionWatcher"],
        "playing": ["playingWatcher"],
        "suspendedDueToFocus": ["suspendWatcher"],
        "suspendedDueToHover": ["suspendWatcher"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }; }
    static get style() { return CalciteCarouselStyle0; }
}, [1, "calcite-carousel", {
        "autoplay": [520],
        "arrowType": [513, "arrow-type"],
        "autoplayDuration": [514, "autoplay-duration"],
        "controlOverlay": [516, "control-overlay"],
        "disabled": [516],
        "label": [1],
        "messages": [1040],
        "messageOverrides": [1040],
        "paused": [1028],
        "selectedItem": [1040],
        "selectedIndex": [32],
        "items": [32],
        "direction": [32],
        "defaultMessages": [32],
        "playing": [32],
        "suspendedDueToFocus": [32],
        "suspendedDueToHover": [32],
        "userPreventsSuspend": [32],
        "effectiveLocale": [32],
        "suspendedSlideDurationRemaining": [32],
        "slideDurationRemaining": [32],
        "setFocus": [64],
        "play": [64],
        "stop": [64]
    }, undefined, {
        "autoplay": ["autoplayWatcher"],
        "messageOverrides": ["onMessagesChange"],
        "direction": ["directionWatcher"],
        "playing": ["playingWatcher"],
        "suspendedDueToFocus": ["suspendWatcher"],
        "suspendedDueToHover": ["suspendWatcher"],
        "effectiveLocale": ["effectiveLocaleChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-carousel", "calcite-icon", "calcite-progress"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-carousel":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Carousel);
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const CalciteCarousel = Carousel;
const defineCustomElement = defineCustomElement$1;

export { CalciteCarousel, defineCustomElement };
