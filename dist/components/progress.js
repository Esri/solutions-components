/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { g as getElementDir } from './dom.js';
import { C as CSS_UTILITY } from './resources.js';

const progressCss = ":host{position:relative;display:block;inline-size:100%}.track,.bar{position:absolute;inset-block-start:0px;block-size:2px}.track{z-index:var(--calcite-z-index);inline-size:100%;overflow:hidden;background:var(--calcite-color-border-3)}.bar{z-index:var(--calcite-z-index);background-color:var(--calcite-color-brand)}@media (forced-colors: active){.track{background-color:highlightText}.bar{background-color:linkText}}.indeterminate{inline-size:20%;animation:looping-progress-bar-ani calc(var(--calcite-internal-animation-timing-medium) / var(--calcite-internal-duration-factor) * 11 / var(--calcite-internal-duration-factor)) linear infinite}.indeterminate.calcite--rtl{animation-name:looping-progress-bar-ani-rtl}.reversed{animation-direction:reverse}.text{padding-inline:0px;padding-block:1rem 0px;text-align:center;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-color-text-2)}@keyframes looping-progress-bar-ani{0%{transform:translate3d(-100%, 0, 0)}50%{inline-size:40%}100%{transform:translate3d(600%, 0, 0)}}@keyframes looping-progress-bar-ani-rtl{0%{transform:translate3d(100%, 0, 0)}50%{inline-size:40%}100%{transform:translate3d(-600%, 0, 0)}}:host([hidden]){display:none}[hidden]{display:none}";
const CalciteProgressStyle0 = progressCss;

const Progress = /*@__PURE__*/ proxyCustomElement(class Progress extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.type = "determinate";
        this.value = 0;
        this.label = undefined;
        this.text = undefined;
        this.reversed = false;
    }
    render() {
        const isDeterminate = this.type === "determinate";
        const barStyles = isDeterminate ? { width: `${this.value * 100}%` } : {};
        const dir = getElementDir(this.el);
        return (h("div", { key: 'e8fa0a71d84cf7af5c16fb1d68691488cb9f28b8', "aria-label": this.label || this.text, "aria-valuemax": 1, "aria-valuemin": 0, "aria-valuenow": this.value, role: "progressbar" }, h("div", { key: 'd779cb380c3aedc8499ce91f6ec935ebc58c3b39', class: "track" }, h("div", { key: '88b61799e4c0e15eb9c3493448cf2704fa481e6c', class: {
                bar: true,
                indeterminate: this.type === "indeterminate",
                [CSS_UTILITY.rtl]: dir === "rtl",
                reversed: this.reversed,
            }, style: barStyles })), this.text ? h("div", { class: "text" }, this.text) : null));
    }
    get el() { return this; }
    static get style() { return CalciteProgressStyle0; }
}, [1, "calcite-progress", {
        "type": [513],
        "value": [2],
        "label": [1],
        "text": [1],
        "reversed": [516]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["calcite-progress"];
    components.forEach(tagName => { switch (tagName) {
        case "calcite-progress":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Progress);
            }
            break;
    } });
}
defineCustomElement();

export { Progress as P, defineCustomElement as d };
