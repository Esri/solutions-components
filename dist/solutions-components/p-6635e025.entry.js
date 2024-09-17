/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './p-6eb37ed2.js';
import { g as getMessages } from './p-7bfecd07.js';
import { l as loadModules } from './p-4cd4cb85.js';
import { g as getMode } from './p-a9a72626.js';
import './p-ac122d9e.js';
import './p-0a24ad5f.js';
import './p-d4056c1c.js';

/**
 * Product Glyphs
 * SVGs and product colors located at:
 * https://github.com/ArcGIS/esri-product-logos
 */
const glyphs = {
    'instant-apps': {
        path: 'M11.206 4.805v-1.38a2.231 2.231 0 0 1 2.23-2.231h13.168a2.231 2.231 0 0 1 2.231 2.23v11.15a2.231 2.231 0 0 1-2.23 2.231h-1.398V5.555a.75.75 0 0 0-.75-.75zM30.94 27.204l-5.447-4.41a.211.211 0 0 0-.344.164v2.225H8.197a1.344 1.344 0 0 1-1.344-1.344V11.665a.75.75 0 0 1 .75-.75h9.872a.75.75 0 0 1 .75.75l-.003 7.534a2.422 2.422 0 0 1-.798 1.796l-.945.855h4.3a1.075 1.075 0 0 0 1.074-1.075v-10.54a2.231 2.231 0 0 0-2.23-2.23H5.354a2.148 2.148 0 0 0-2.13 2.23v16.507a2.231 2.231 0 0 0 2.23 2.231l19.695-.003v2.725a.211.211 0 0 0 .344.164l5.447-4.41a.158.158 0 0 0 0-.245z',
        fill: '#83a238',
    },
    'map-viewer': {
        path: 'M21.647 13.706A1.647 1.647 0 1 1 20 15.353a1.647 1.647 0 0 1 1.647-1.647zM19 19.083A1.917 1.917 0 1 1 17.082 21 1.917 1.917 0 0 1 19 19.082zm7.684 3.393a2.433 2.433 0 0 1-.64 1.776l-.01.012c-1.045 1.134-3.215 1.8-5.738 1.8-3.815 0-5.054-1.485-8.586-1.828a6.765 6.765 0 0 1 .566-4.07c.98-1.674 2.445-1.568 3.41-2.724.967-1.157.033-3.384 1.397-4.748 1.539-1.538 3.44-.12 4.57-2.542.877-1.884 1.84-2.98 3.68-3.35a.39.39 0 0 1 .047.07c.132.695 1.097 11.68 1.304 15.604zM6.208 8.864A3.054 3.054 0 0 1 8.115 6.17s2.425-.88 3.09-1.029a2.637 2.637 0 0 1 .314-.01 4.967 4.967 0 0 1 1.157.157l.404.095a7.26 7.26 0 0 0-.238 3.294c.188 1.354.657 2.399-.066 4.361-1.003 2.721-2.901 2.585-3.857 4.562-1.285 2.657.21 6.226-2.182 6.835l.004.002.003.003c-.801.114-1.363.22-1.663.272zm21.549-5.09a.055.055 0 0 0-.022-.037.058.058 0 0 0-.037-.01l-7.37 1.025-8.771-2.742a.227.227 0 0 0-.162.01L3.594 5.566a.054.054 0 0 0-.032.045L1.58 29a41.592 41.592 0 0 1 9.115-1.285c2.765.094 6.646 2.287 10.29 2.177 3.51-.108 8.582-2.382 9.564-2.836a.054.054 0 0 0 .03-.056z',
        fill: '#3DB8FF',
    },
    'story-maps': {
        path: 'M25.5 0C23.015 0 21 .953 21 3.433v8.517a1.467 1.467 0 0 0 .43 1.038l3.837 3.827a.33.33 0 0 0 .466 0l3.836-3.827A1.467 1.467 0 0 0 30 11.95V3.433C30 .953 27.985 0 25.5 0zm0 8.1a2.6 2.6 0 1 1 2.6-2.599A2.599 2.599 0 0 1 25.5 8.1zm-7.856.453c.294-.153.312-.457.312-.788v-2.31a.104.104 0 0 0-.129-.1 6.128 6.128 0 0 0-2.248 1.19.14.14 0 0 1-.167.008c-3.437-2.283-8.543-1.52-12.131-.988-.432.064-1.762.34-2.164.424A.146.146 0 0 0 1 6.133V26.69a.147.147 0 0 0 .05.11.134.134 0 0 0 .116.035A36.394 36.394 0 0 1 9.5 25.781c3.283.054 4.403.96 4.967 1.513l.915.897a.164.164 0 0 0 .23 0l.916-.897a5.98 5.98 0 0 1 3.972-1.47 25.341 25.341 0 0 1 5.715.516c.718.109 1.46.22 2.186.312l1.251.16a.308.308 0 0 0 .348-.305v-7.375a.161.161 0 0 0-.303-.077l-.107.2a7.218 7.218 0 0 1-6.902 3.766 10.455 10.455 0 0 0-5.688.796V9.454a.89.89 0 0 1 .332-.693 2.058 2.058 0 0 1 .312-.208zM14 23.817c-3.071-1.38-5.998-.808-9.447-.293l-.253.036a.263.263 0 0 1-.3-.259V8.525a.098.098 0 0 1 .084-.097l.804-.115c2.518-.372 6.303-1.048 8.708.515a.89.89 0 0 1 .404.746z',
        fill: '#4fbaa9',
    },
    'dashboards': {
        path: 'M25.819 28H23.18a.181.181 0 0 1-.181-.181V13.18a.181.181 0 0 1 .181-.181h2.638a.181.181 0 0 1 .181.181V27.82a.181.181 0 0 1-.181.181zM21 27.816v-9.631a.184.184 0 0 0-.184-.185h-2.631a.184.184 0 0 0-.185.184v9.631a.184.184 0 0 0 .184.185h2.631a.184.184 0 0 0 .185-.184zm9.82.184a.18.18 0 0 0 .18-.18v-7.64a.18.18 0 0 0-.18-.18h-2.64a.18.18 0 0 0-.18.18v7.64a.18.18 0 0 0 .18.18zM7 9.267v10.475c.706.033 3.538-1.718 4.274-4.7.679-2.751 3.485-2.864 4.443-2.94 1.766-.14 3.588-.607 4.566-2.798A.216.216 0 0 0 20.085 9H7.267A.267.267 0 0 0 7 9.267zm18.997-1.053A4.411 4.411 0 0 0 21.63 4H2.684A.684.684 0 0 0 2 4.684V21.81A3.19 3.19 0 0 0 5.19 25h9.565a.245.245 0 0 0 .245-.245v-2.362a.393.393 0 0 0-.393-.393H6.38A1.385 1.385 0 0 1 5 20.619V7.349A.348.348 0 0 1 5.348 7h16.324A1.346 1.346 0 0 1 23 8.363v1.28a.357.357 0 0 0 .357.357h2.599a.046.046 0 0 0 .046-.046z',
        fill: '#ee9e01',
    },
    'experience-builder': {
        path: 'M30.85 12.82l-2.85 5v7.44A1.78 1.78 0 0 1 26.22 27H25V7.75a.76.76 0 0 0-.75-.75H12V1.31a.28.28 0 0 1 .42-.25L17.51 4h8.71A1.78 1.78 0 0 1 28 5.78v4.42l2.54 1.47a.83.83 0 0 1 .31 1.15zM12 18h8v-6h-8zm7.62 5H7.75a.76.76 0 0 1-.75-.75V4H5.78A1.78 1.78 0 0 0 4 5.78V13l-2.89 5a.85.85 0 0 0 .31 1.15L4 20.59v4.61A1.78 1.78 0 0 0 5.78 27h8.62l5.18 3a.28.28 0 0 0 .42-.24v-6.39a.38.38 0 0 0-.38-.37z',
        fill: '#09b8ca',
    },
    // extra glyphs
    'geoBIM': {
        path: 'M17.802 21.398l6.2 2.557-5.14 2.133a.772.772 0 0 1-1.06-.717zM9.311 7.868a.604.604 0 0 1-.003-1.122L16 4.169l8.12 3.148-8.119 3.184zm-3.5 1.541l8.387 3.413v12.554a.772.772 0 0 1-1.06.717l-6.297-2.736a1.639 1.639 0 0 1-1.03-1.521zM3.844 6.03a1.316 1.316 0 0 0-.827 1.22v17.395a1.316 1.316 0 0 0 .827 1.221L16 30.888l12.983-5.317v-2.423l-7.156-3.023 7.156-2.963v-1.95l-5.101-2.2-3.867 1.516L24 16.123l-6.199 2.505v-5.711l.073-.122 11.108-4.487v-1.95l-12.47-5.047a1.384 1.384 0 0 0-1.027 0z',
        fill: '#11ad1d',
    },
    'notebooks': {
        path: 'M2.941 25A.906.906 0 0 1 2 24.135v-.271A.906.906 0 0 1 2.941 23h3.118a.906.906 0 0 1 .941.864v.271a.906.906 0 0 1-.941.865zm3.118-8A.906.906 0 0 0 7 16.135v-.271A.906.906 0 0 0 6.059 15H2.941a.906.906 0 0 0-.941.864v.271a.906.906 0 0 0 .941.865zm0-8A.906.906 0 0 0 7 8.135v-.271A.906.906 0 0 0 6.059 7H2.941A.906.906 0 0 0 2 7.864v.271A.906.906 0 0 0 2.941 9zm9.44 16h-3.726a.773.773 0 0 1-.773-.774V6.171A.172.172 0 0 1 11.172 6H15.5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5H5.342A1.345 1.345 0 0 0 4 4.343V5h2.059A2.904 2.904 0 0 1 9 7.858v.277A2.907 2.907 0 0 1 6.059 11H4v2h2.059A2.907 2.907 0 0 1 9 15.864v.271A2.907 2.907 0 0 1 6.059 19H4v2h2.059A2.907 2.907 0 0 1 9 23.864v.271A2.907 2.907 0 0 1 6.059 27H4v1.405a.595.595 0 0 0 .595.595H15.5a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM20 3.5v2a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 .5.5v18a.5.5 0 0 1-.5.5h-4a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-25a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.499.5z',
        fill: '#6e6e6e',
    },
    'sites': {
        path: 'M2.656 29A.656.656 0 0 1 2 28.344V6.185A3.189 3.189 0 0 1 5.185 3H29.72a.281.281 0 0 1 .281.281v22.53A3.194 3.194 0 0 1 26.81 29zm2.838-3h21.211a.295.295 0 0 0 .296-.295V13.494a.493.493 0 0 0-.493-.494H5v12.506a.494.494 0 0 0 .494.494zM23 9.91a.09.09 0 0 0 .09.09h3.82a.09.09 0 0 0 .09-.09V6.026A.026.026 0 0 0 26.974 6h-3.948a.026.026 0 0 0-.026.026zM6.633 6A1.597 1.597 0 0 0 5 7.595V10h14.523A.477.477 0 0 0 20 9.523V6.477A.477.477 0 0 0 19.523 6zM16 22v-5h7v5zm-7-2v-3h3v3z',
        fill: '#7842ed',
    },
    'webAppBuilder': {
        path: 'M15.044 19.974a.188.188 0 0 1-.192-.001l-3.762-2.35a.188.188 0 0 1-.09-.16v-4.098a.188.188 0 0 1 .096-.163l3.761-2.178a.188.188 0 0 1 .182-.001l3.863 2.179a.188.188 0 0 1 .098.165v4.095a.187.187 0 0 1-.092.161zm15.13-1.04a.052.052 0 0 0 .099.022 8.048 8.048 0 0 0 .67-3.147 7.155 7.155 0 0 0-3.507-6.213L17.59 3.768a4.054 4.054 0 0 0-1.968-.627 3.95 3.95 0 0 0-1.894.485c-.607.334-1.132.67-1.278.754a2.951 2.951 0 0 0-1.39 2.506v1.078a.2.2 0 0 0 .307.167l1.365-.87a4.988 4.988 0 0 1 2.319-.792 4.62 4.62 0 0 1 2.219.792s8.442 5.017 9.392 5.576a7.045 7.045 0 0 1 3.513 6.084zM9.546 23.55l.947-.547a.2.2 0 0 0 0-.345l-1.369-.79a4.326 4.326 0 0 1-2.13-3.842V7.286a7.16 7.16 0 0 1 3.63-6.083l.081-.05a.025.025 0 0 0-.012-.045l-.25-.005a8.333 8.333 0 0 0-3.887.994A7.102 7.102 0 0 0 3.069 8.31v10.786a3.96 3.96 0 0 0 1.89 3.362c.894.545 1.605.974 1.81 1.092a2.787 2.787 0 0 0 2.777 0zm4.383 6.37l9.997-5.773a3.959 3.959 0 0 0 1.967-3.32c.021-.929.034-1.604.034-1.806a2.786 2.786 0 0 0-1.39-2.406l-1.123-.57a.2.2 0 0 0-.289.177v1.604a4.45 4.45 0 0 1-2.218 3.842l-3.708 2.14a3.366 3.366 0 0 1-.256.135L11.6 27.128a6.427 6.427 0 0 1-3.343.938 7.137 7.137 0 0 1-3.513-1.038c-.09-.052-.38-.226-.797-.479a.094.094 0 0 0-.134.12 7.182 7.182 0 0 0 2.942 3.25 7.241 7.241 0 0 0 3.587 1.028 7.243 7.243 0 0 0 3.587-1.028z',
        fill: '#09b8ca',
    },
    'urban': {
        path: 'M32 14l-4 .003a1 1 0 0 0-1 1V21a1 1 0 0 1-1 1h-2V5.451l-7.598-3.335A1 1 0 0 0 15 3.03V25a1 1 0 0 1-1 1h-2V11.24h-.02L7.5 9l-4.48 2.24H3V20H0v4h5a1 1 0 0 0 1-1V12.717L7.5 12l1.5.717V28a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V6.094l3 1.317V24a2 2 0 0 0 2 2h5.02A1.977 1.977 0 0 0 30 24.024V17h2z',
        fill: '#3DB8FF',
    },
};
/**
 * Format glyphs as SVGs
 */
const productGlyphs = new Map();
Object.keys(glyphs).forEach(glyph => {
    productGlyphs[glyph] = `<svg viewBox="0 0 32 32" width="32" height="32" fill="${glyphs[glyph].fill}"><path d="${glyphs[glyph].path}"/></svg>`;
});
function getProductGlyph(name) {
    return productGlyphs[name] || '';
}

const instantAppsCreateCss = ":host{display:block;--instant-apps-create-action-background:var(--calcite-color-foreground-1);--instant-apps-create-action-background-hover:var(--calcite-color-foreground-2);--instant-apps-create-action-background-press:var(--calcite-color-foreground-3);--instant-apps-create-action-height:100%;--instant-apps-create-action-width:fit-content;--instant-apps-create-action-icon-color:var(--calcite-color-text-3);--instant-apps-create-action-icon-hover-color:var(--calcite-color-text-1);--instant-apps-create-background:var(--calcite-color-foreground-1);--instant-apps-create-text-color:var(--calcite-color-text-1);--instant-apps-create-popover-width:450px}.instant-apps-create{height:100%}.instant-apps-create *{box-sizing:border-box}.instant-apps-create__popover-container,.instant-apps-create__inline-container{padding:1rem 1.5rem;background:var(--instant-apps-create-background);--calcite-color-text-1:var(--instant-apps-create-text-color)}.instant-apps-create__popover-container{width:var(--instant-apps-create-popover-width)}.instant-apps-create calcite-popover{--calcite-color-foreground-1:var(--instant-apps-create-background)}.instant-apps-create calcite-button:last-of-type{margin-top:0.5rem}.instant-apps-create__header h3{margin:0;font-weight:var(--calcite-font-weight-medium)}.instant-apps-create__header p{margin:0;padding:0 0 0.5rem 0;font-weight:var(--calcite-font-weight-normal)}.instant-apps-create__options{display:flex;justify-content:space-between;align-items:center;flex-direction:column}.instant-apps-create__option{display:flex;color:inherit;text-decoration:inherit;height:-moz-fit-content;height:fit-content;margin-bottom:0.5rem;cursor:pointer;--calcite-color-text-link:var(--calcite-color-text-1);align-items:stretch;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-ring-shadow, 0 0 rgba(0, 0, 0, 0)), var(--tw-shadow);outline-offset:0;outline-color:transparent;transition:outline-offset 100ms ease-in-out, outline-color 100ms ease-in-out}.instant-apps-create__option:first-of-type{margin-top:0.5rem}.instant-apps-create__option:last-of-type{margin-bottom:0}.instant-apps-create__option:hover{outline:1px solid var(--calcite-color-border-1);outline-offset:2px}.instant-apps-create__option-icon{display:flex;background:var(--calcite-color-foreground-2);color:var(--calcite-color-text-1);font-size:1.25rem;background-color:var(--calcite-color-background);justify-content:center;align-items:center;flex:1 1 auto;max-width:5rem;min-width:5rem;height:auto}.instant-apps-create__option-icon svg{display:block;overflow-clip-margin:content-box;overflow:hidden}.instant-apps-create__option-text{min-height:2rem;font-size:0.75rem;color:var(--calcite-color-text-2);padding:0.75rem 0 0 0.75rem}.instant-apps-create__option-text-wrapper{display:flex;align-items:center}.instant-apps-create__option-text h3{margin:0;font-size:var(--calcite-font-size-0);font-weight:var(--calcite-font-weight-medium)}.instant-apps-create__option-text calcite-icon{margin-left:0.25rem;color:rgb(126, 126, 126);--tw-translate-x:0px;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0;transition-property:all;transition-duration:150ms;transition-timing-function:ease-in-out;transition-delay:0s}a:hover .instant-apps-create__option-text calcite-icon{opacity:1;--tw-translate-x:0.5rem;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.instant-apps-create__option-text p{margin:0;font-size:var(--calcite-font-size--1);color:var(--calcite-color-text-3);line-height:1.35;min-height:3rem}";
const InstantAppsCreateStyle0 = instantAppsCreateCss;

const CSS = {
    baseDark: 'instant-apps-create calcite-mode-dark',
    baseLight: 'instant-apps-create calcite-mode-light',
    inlineContainer: 'instant-apps-create__inline-container',
    popoverContainer: 'instant-apps-create__popover-container',
    hidden: 'instant-apps-create__visually-hidden',
    header: 'instant-apps-create__header',
    options: 'instant-apps-create__options',
    option: 'instant-apps-create__option',
    optionIcon: 'instant-apps-create__option-icon',
    optionText: 'instant-apps-create__option-text',
    optionTextWrapper: 'instant-apps-create__option-text-wrapper',
    optionTitle: 'instant-apps-create__option-title',
    optionSubtitle: 'instant-apps-create__option-subtitle',
    optionLink: 'instant-apps-create__option-link',
};
const InstantAppsCreate = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.popoverIcon = 'grid';
        this.mode = 'inline';
        this.popoverPositioning = 'absolute';
        this.popoverPlacement = 'auto';
        this.showHeader = true;
        this.content = undefined;
        this.options = ['instant-apps', 'map-viewer', 'story-maps', 'experience-builder', 'dashboards'];
        this.portal = undefined;
        this.baseClass = CSS.baseLight;
        this.messages = {};
        this.CreateOptionsLookup = undefined;
    }
    contentChanged() {
        Object.keys(this.CreateOptionsLookup).forEach(key => {
            this.CreateOptionsLookup[key].href = this.hrefLookup(key);
        });
    }
    componentWillLoad() {
        this.baseClass = getMode(this.el) === 'dark' ? CSS.baseDark : CSS.baseLight;
        this.initializeModules();
        return getMessages(this).then(() => {
            this.initializePredefinedOptions();
        });
    }
    disconnectedCallback() {
        var _a, _b;
        (_a = this.handles) === null || _a === void 0 ? void 0 : _a.removeAll();
        (_b = this.handles) === null || _b === void 0 ? void 0 : _b.destroy();
        this.handles = null;
    }
    render() {
        const mode = this.mode === 'popover' ? this.renderPopover() : this.renderPanel();
        return (h(Host, { key: 'ee6a5076dce36a238288216de4cbd77d16347c15' }, h("div", { key: 'c22b60a05f5d0b430c76ab8edcf52577f1eecfaa', class: this.baseClass }, mode)));
    }
    async initializeModules() {
        const [Handles] = await loadModules(['esri/core/Handles']);
        this.handles = new Handles();
        return Promise.resolve();
    }
    initializePredefinedOptions() {
        const { instantApps, instantAppsDesc, mapViewer, mapViewerDesc, arcgisStoryMaps, storyMapsDesc, experienceBuilder, experienceBuilderDesc, dashboards, dashboardsDesc } = this.messages;
        this.CreateOptionsLookup = {
            'instant-apps': {
                title: instantApps,
                subtitle: instantAppsDesc,
                img: getProductGlyph('instant-apps'),
                href: this.hrefLookup('instant-apps'),
            },
            'map-viewer': {
                title: mapViewer,
                subtitle: mapViewerDesc,
                img: getProductGlyph('map-viewer'),
                href: this.hrefLookup('map-viewer'),
            },
            'story-maps': {
                title: arcgisStoryMaps,
                subtitle: storyMapsDesc,
                img: getProductGlyph('story-maps'),
                href: this.hrefLookup('story-maps'),
            },
            'experience-builder': {
                title: experienceBuilder,
                subtitle: experienceBuilderDesc,
                img: getProductGlyph('experience-builder'),
                href: this.hrefLookup('experience-builder'),
            },
            'dashboards': {
                title: dashboards,
                subtitle: dashboardsDesc,
                img: getProductGlyph('dashboards'),
                href: this.hrefLookup('dashboards'),
            },
        };
    }
    hrefLookup(predefined) {
        var _a, _b;
        const portalUrl = this.getBaseUrl(this.portal);
        const env = this._getEnvironment(portalUrl);
        const contentParam = this.contentHref();
        switch (predefined) {
            case 'instant-apps':
                return `${portalUrl}/apps/instantgallery/index.html?${contentParam}`;
            case 'dashboards':
                return `${portalUrl}/apps/dashboards/new#id=${(_b = (_a = this.content) === null || _a === void 0 ? void 0 : _a.portalItem) === null || _b === void 0 ? void 0 : _b.id}`;
            case 'map-viewer':
                return `${portalUrl}/apps/mapviewer/index.html?${contentParam}`;
            case 'story-maps':
                return `https://storymaps${env === 'prod' ? '' : env}.arcgis.com/stories/new?${contentParam}`;
            case 'experience-builder':
                return `https://experience${env === 'prod' ? '' : env}.arcgis.com/builder/page/template/?${contentParam}`;
        }
        return '';
    }
    contentHref() {
        var _a, _b, _c, _d, _e;
        if (((_b = (_a = this === null || this === void 0 ? void 0 : this.content) === null || _a === void 0 ? void 0 : _a.portalItem) === null || _b === void 0 ? void 0 : _b.type) === 'Web Map') {
            return `webmap=${this.content.portalItem.id}`;
        }
        else if (((_d = (_c = this === null || this === void 0 ? void 0 : this.content) === null || _c === void 0 ? void 0 : _c.portalItem) === null || _d === void 0 ? void 0 : _d.type) === 'Web Scene') {
            return `webscene=${this.content.portalItem.id}`;
        }
        else if (typeof ((_e = this === null || this === void 0 ? void 0 : this.content) === null || _e === void 0 ? void 0 : _e.fetchMembers) === 'function') {
            return `group=${this.content.id}`;
        }
        else {
            return '';
        }
    }
    // getBaseUrl
    getBaseUrl(portal) {
        if (!portal) {
            return '';
        }
        const { customBaseUrl, portalHostname, urlKey } = portal;
        const { protocol } = location;
        const url = urlKey ? `${urlKey}.${customBaseUrl}` : portalHostname;
        return `${protocol}//${url}`;
    }
    _getEnvironment(url) {
        var _a;
        let hostname = null;
        try {
            hostname = (_a = new URL(url)) === null || _a === void 0 ? void 0 : _a.hostname;
        }
        catch (e) { }
        if (hostname == null || hostname.indexOf('arcgis.com') === -1) {
            return 'dev';
        }
        else {
            return (hostname.indexOf('devext') !== -1 && 'dev') || (hostname.indexOf('qaext') !== -1 && 'qa') || 'prod';
        }
    }
    renderPopover() {
        var _a, _b;
        const panel = this.renderPanel();
        return [
            h("calcite-popover", { referenceElement: "create-popover-btn", overlayPositioning: this.popoverPositioning, placement: this.popoverPlacement, autoClose: true, ref: (el) => (this.popoverEl = el),
                // HARDCODED IN EN
                label: "Create panel" }, panel),
            h("calcite-action", { id: "create-popover-btn", alignment: "center", icon: this.popoverIcon, title: (_a = this.messages) === null || _a === void 0 ? void 0 : _a.create, text: (_b = this.messages) === null || _b === void 0 ? void 0 : _b.create }),
        ];
    }
    renderPanel() {
        const header = this.showHeader ? this.renderHeader() : null;
        const options = this.renderOptions();
        const panelClass = this.mode === 'inline' ? CSS.inlineContainer : CSS.popoverContainer;
        return (h("div", { class: panelClass }, header, options));
    }
    renderHeader() {
        const { create, createSubheading } = this.messages;
        return (h("div", { class: CSS.header }, h("h3", null, create), h("p", null, createSubheading)));
    }
    renderOptions() {
        return h("nav", null, this.options.map(option => this.renderOption(option)));
    }
    renderOption(option) {
        var _a;
        if (typeof option === 'string') {
            option = (_a = this === null || this === void 0 ? void 0 : this.CreateOptionsLookup) === null || _a === void 0 ? void 0 : _a[option];
        }
        const { title, subtitle, img, href } = option || {};
        return (h("a", { class: CSS.option, href: href, target: "_blank" }, h("span", { class: CSS.optionIcon, innerHTML: img }), h("span", { class: CSS.optionText }, h("span", { class: CSS.optionTextWrapper }, h("h3", { class: CSS.optionTitle }, title), h("calcite-icon", { scale: "s", icon: "launch" })), h("p", { class: CSS.optionSubtitle }, subtitle))));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "content": ["contentChanged"]
    }; }
};
InstantAppsCreate.style = InstantAppsCreateStyle0;

export { InstantAppsCreate as instant_apps_create };
