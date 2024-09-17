/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules2.js';
import { g as getMessages } from './locale3.js';
import { g as getMode } from './mode.js';
import { d as defineCustomElement$8 } from './action.js';
import { d as defineCustomElement$7 } from './button.js';
import { d as defineCustomElement$6 } from './icon.js';
import { d as defineCustomElement$5 } from './label2.js';
import { d as defineCustomElement$4 } from './loader.js';
import { d as defineCustomElement$3 } from './popover.js';
import { d as defineCustomElement$2 } from './switch.js';

const printStyling = `
  @media print {
    @page {
      size:  Portrait;
      margin: .25in;
    }

    html, body {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
    }

    body > *:not(.instant-apps-export-print) { display: none; }
  }

  * {
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }

  instant-apps-header {
    height: 50px;
    display: block;
  }


  .instant-apps-export-print {
    z-index: -999;
    color: #323232 !important;
    display: grid;
    grid-auto-flow: row;
    --esri-calcite-mode-name: "light";
    position: absolute;
  }

  .instant-apps-export-print__view-header {
    background: #fff;
  }

  .instant-apps-export-print__view-header h1 {
    font-size: 16px;
    font-weight: 500;
    color: #323232;
    margin: 6px;
  }

  .instant-apps-export-print__views-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .instant-apps-export-print__view-content:first-child {
    page-break-before: unset;
  } 

  .instant-apps-export-print__view-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    page-break-before: always;
  }

  .instant-apps-export-print, .instant-apps-export-print * {
    box-sizing: border-box;
  }

  .instant-apps-export-print__view-section {
    height: 100%;
  }

  .instant-apps-export-print__view-container {
    height: 100%;
    width: 100%;
    break-inside: avoid;
  }

  .instant-apps-export-print__view-wrapper {
    height: fit-content;
    width: min-content;
    position: relative;
    display: flex;
    flex-direction: column;
    border: 2pt solid #323232;
    overflow: hidden;
  }

  .instant-apps-export-print__view {
    max-height: 60vh;
    max-width: calc(100vw - .25in);
    object-fit: contain;
  }

  .instant-apps-export-print__popup-container {
    height: min-content;
    max-width: 350px;
    display: none;
    color: #323232;
    background: #fff;
    border: 1pt solid #323232;
    break-inside: avoid;
  }

  .instant-apps-export-print__popup-title {
    border-bottom: 1pt solid #323232;
  }

  .instant-apps-export-print__popup-content {
    background: #fff;
    padding-top: 8pt;
  }

  .instant-apps-export-print__popup-content .esri-feature-media__chart {
    background: #fff;
  }

  .instant-apps-export-print__legend-container {
    height: min-content;
    background: #fff;
    overflow: unset;
  }

  .esri-legend--card, .esri-legend--card__service-content {
    flex-flow: row wrap;
  }

  .instant-apps-export-print .esri-widget > *:not(.esri-scale-bar.esri-widget > *) {
    background: #fff;
    color: #323232;
  }

  .instant-apps-export-print__popup-content * {
    color: #323232;
  }

  .instant-apps-export-print .esri-widget__heading {
    margin: 2pt 7pt;
    padding: 0;
    color: #323232;
  }

  .instant-apps-export-print .esri-legend__ramp-label:before {
    border-color: rgba(0,0,0,0) rgba(50,50,50,.8) rgba(0,0,0,0) rgba(0,0,0,0);
  }

  .instant-apps-export-print .esri-legend--card__section {
    padding: 4pt 0 4pt;
    min-width: unset;
    border-left: none;
  }

  .instant-apps-export-print .esri-legend--card__section:first-child {
    border-left: none;
  }

  .instant-apps-export-print .esri-legend--card__service {
    border: none;
    flex: 0 1 auto;
    break-inside: avoid;
  }

  .instant-apps-export-print .esri-legend--card {
    border: none;
    gap: 6pt 12pt;
  }

  .instant-apps-export-print .esri-legend--card:not(:first-child),
  .instant-apps-export-print .esri-compass.esri-widget:not(:first-child) {
    display: none;
  }

  .instant-apps-export-print .esri-legend--card__service-caption-container {
    height: unset;
    padding: 0;
    border-bottom: none;
  }

  .instant-apps-export-print .esri-legend--card__service-caption-text {
    padding-bottom: 4px;
  }

  .instant-apps-export-print__compass-container {
    position: absolute;
    top: 65px;
    left: 15px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    --calcite-ui-icon-color: #000;
    border-radius: 50%;
    height: fit-content;
  }

  .instant-apps-export-print__compass-container .esri-compass {
    background: #fff;
  }

  .instant-apps-export-print__compass-container .esri-compass__icon.esri-icon-compass {
    color: #000;
  }

  .instant-apps-export-print__compass-container.esri-compass.esri-widget--button {
    background: #fff;
  }

  .instant-apps-export-print__scale-bar-container {
    width: 100%;
    position: absolute;
    bottom: 15px;
    margin: 0 15px;
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__label {
    color: #323232;
    font-size: 10px;
    padding: 0 4px;
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__label-container--line {
    height: 16px;
    overflow: hidden;
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__label-container--top {
    bottom: 1px;
  }
  
  .instant-apps-export-print__scale-bar-container--position .esri-scale-bar__label {
    height: 10px;
    padding: 0 2px;
    line-height: 11px;
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__bar-container:nth-child(1n+3) {
    display: none;
  }

  .instant-apps-export-print__scale-bar-container--position .esri-scale-bar__bar-container.esri-scale-bar__bar-container--line {
    align-items: center;
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__line {
    background-color: rgba(255, 255, 255, 0.66);
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__line--top {
    width: var(--instant-apps-scale-bar-top) !important;
    border-bottom: 2px solid #323232;
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__line--bottom {
    width: var(--instant-apps-scale-bar-bottom) !important;
    border-top: 2px solid #323232;
  }

  .instant-apps-export-print__scale-bar-container--position .esri-scale-bar__label-container--line {
    position: unset;
    margin: 0 2px;
    background-color: rgba(255, 255, 255, 0.66);
    height: 10px;
    display: flex;
    align-items: center;
  }

  .instant-apps-export-print__scale-bar-container .esri-scale-bar__line--top:before,
  .instant-apps-export-print__scale-bar-container .esri-scale-bar__line--top:after,
  .instant-apps-export-print__scale-bar-container .esri-scale-bar__line--bottom:before,
  .instant-apps-export-print__scale-bar-container .esri-scale-bar__line--bottom:after {
    background-color: #323232;
    border-right: 2px solid #323232;
  }

  .instant-apps-export-print__popup-container .esri-feature-media__item-navigation {
    display: none;
  }

  .instant-apps-export-print__popup-container .esri-feature-media__chart.esri-feature-media__chart--rendered * {
    width: 100%!important;
  }

  .instant-apps-export-print__popup-content .esri-popup__content {
    margin: 0;
  }`;

const instantAppsExportViewsCss = ":host{display:block;--instant-apps-export-action-background:var(--calcite-color-foreground-1);--instant-apps-export-action-background-hover:var(--calcite-color-foreground-2);--instant-apps-export-action-background-press:var(--calcite-color-foreground-3);--instant-apps-export-action-height:100%;--instant-apps-export-action-width:fit-content;--instant-apps-export-action-icon-color:var(--calcite-color-text-3);--instant-apps-export-action-icon-hover-color:var(--calcite-color-text-1);--instant-apps-export-background:var(--calcite-color-foreground-1);--instant-apps-export-text-color:var(--calcite-color-text-1);--instant-apps-export-popover-width:250px}.instant-apps-export{height:100%}.instant-apps-export *{box-sizing:border-box}.instant-apps-export__popover-container,.instant-apps-export__inline-container{padding:12px;background:var(--instant-apps-export-background);--calcite-color-text-1:var(--instant-apps-export-text-color)}.instant-apps-export__popover-container{width:var(--instant-apps-export-popover-width)}.instant-apps-export calcite-action{height:var(--instant-apps-export-action-height);width:var(--instant-apps-export-action-width);--calcite-color-foreground-1:var(--instant-apps-export-action-background);--calcite-color-foreground-2:var(--instant-apps-export-action-background-hover);--calcite-color-foreground-3:var(--instant-apps-export-action-background-press);--calcite-color-text-3:var(--instant-apps-export-action-icon-color);--calcite-color-text-1:var(--instant-apps-export-action-icon-hover-color)}.instant-apps-export .instant-apps-export-print{display:none}.instant-apps-export__visually-hidden{position:absolute;top:0;z-index:-1;visibility:hidden}.instant-apps-export calcite-input{--calcite-color-foreground-1:var(--instant-apps-export-background);--calcite-color-text-1:var(--instant-apps-export-text-color)}.instant-apps-export calcite-popover{--calcite-color-foreground-1:var(--instant-apps-export-background)}.instant-apps-export calcite-switch{--calcite-color-foreground-1:#fff;--calcite-color-foreground-2:#f3f3f3}.instant-apps-export calcite-button:last-of-type{margin-top:0.5rem}.instant-apps-export .calcite-mode-dark calcite-switch{--calcite-color-foreground-1:#2b2b2b;--calcite-color-foreground-2:#202020}.instant-apps-export__compass-container.esri-widget{background:#fff;box-shadow:0 1px 2px rgba(0, 0, 0, 0.3)}.instant-apps-export__compass-container.esri-widget .esri-compass__icon.esri-icon-compass{color:#6e6e6e}.hide{display:none}.screenshotCursor{cursor:crosshair}";
const InstantAppsExportViewsStyle0 = instantAppsExportViewsCss;

const CSS = {
    baseDark: 'instant-apps-export calcite-mode-dark',
    baseLight: 'instant-apps-export calcite-mode-light',
    inlineContainer: 'instant-apps-export__inline-container',
    popoverContainer: 'instant-apps-export__popover-container',
    hidden: 'instant-apps-export__visually-hidden',
    print: {
        base: 'instant-apps-export-print',
        legendContainer: 'instant-apps-export-print__legend-container',
        compassContainer: 'instant-apps-export-print__compass-container',
        scaleBarContainer: 'instant-apps-export-print__scale-bar-container',
        popupContainer: 'instant-apps-export-print__popup-container',
        popupContent: 'instant-apps-export-print__popup-content',
        popupTitle: 'instant-apps-export-print__popup-title',
        view: 'instant-apps-export-print__view',
        viewContainer: 'instant-apps-export-print__view-container',
        viewsContainer: 'instant-apps-export-print__views-container',
        viewSection: 'instant-apps-export-print__view-section',
        viewWrapper: 'instant-apps-export-print__view-wrapper',
        viewContent: 'instant-apps-export-print__view-content',
        viewHeader: 'instant-apps-export-print__view-header',
    },
};
const InstantAppsExportViews$1 = /*@__PURE__*/ proxyCustomElement(class InstantAppsExportViews extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.exportOutputUpdated = createEvent(this, "exportOutputUpdated", 7);
        this.legends = {};
        this.compasses = {};
        this.output = undefined;
        this.beforeExport = () => Promise.resolve();
        this.popoverIcon = 'export';
        this.includeLegend = true;
        this.includeMap = true;
        this.includePopup = false;
        this.includeHeader = false;
        this.mode = 'popover';
        this.popoverPositioning = 'absolute';
        this.popoverPlacement = 'auto';
        this.scale = 'm';
        this.showIncludeLegend = true;
        this.showIncludeMap = false;
        this.showIncludePopup = true;
        this.showIncludeHeader = true;
        this.showScaleBar = false;
        this.exportViews = undefined;
        this.baseClass = CSS.baseLight;
        this.exportIsLoading = undefined;
        this.messages = undefined;
    }
    watchIncludeMap(includeMap) {
        var _a;
        if (includeMap) {
            (_a = this.exportViews) === null || _a === void 0 ? void 0 : _a.forEach(({ view }, index) => {
                const legendContainerEl = this.printEl.querySelector(`#legend-${index}`);
                if (legendContainerEl != null) {
                    this.updateLegend(view, index, legendContainerEl);
                }
            });
        }
    }
    watchView() {
        var _a;
        (_a = this.exportViews) === null || _a === void 0 ? void 0 : _a.forEach(({ view }, index) => {
            this.handleIncludePopup(view, index);
        });
    }
    async componentWillLoad() {
        this.baseClass = getMode(this.el) === 'dark' ? CSS.baseDark : CSS.baseLight;
        getMessages(this);
        await this.initializeModules();
    }
    componentDidLoad() {
        var _a;
        this.printContainerEl.prepend(this.printEl);
        (_a = this.exportViews) === null || _a === void 0 ? void 0 : _a.forEach(({ view }, index) => {
            this.handleIncludePopup(view, index);
        });
    }
    componentDidUpdate() {
        var _a;
        (_a = this.exportViews) === null || _a === void 0 ? void 0 : _a.forEach(({ view }, index) => {
            const lengendContainerEl = this.printEl.querySelector(`#legend-${index}`);
            this.updateLegend(view, index, lengendContainerEl);
        });
    }
    async initializeModules() {
        const [Handles, reactiveUtils] = await loadModules(['esri/core/Handles', 'esri/core/reactiveUtils']);
        this.handles = new Handles();
        this.reactiveUtils = reactiveUtils;
        return Promise.resolve();
    }
    render() {
        const mode = this.mode === 'popover' ? this.renderPopover() : this.renderPanel();
        return (h(Host, { key: '1b0428743837a0f1c176cba3e58af38104f4ac7b' }, h("div", { key: '8d39535015a0e5ab498a66c8757c28ae556bd326', class: this.baseClass, onMouseEnter: this.handleWidgetCreation.bind(this), onFocusin: this.handleWidgetCreation.bind(this) }, mode)));
    }
    renderPopover() {
        var _a, _b, _c;
        const panel = this.renderPanel();
        return [
            h("calcite-popover", { referenceElement: "export-popover-btn", label: (_a = this.messages) === null || _a === void 0 ? void 0 : _a.exportPopover, overlayPositioning: this.popoverPositioning, placement: this.popoverPlacement, autoClose: true, ref: (el) => (this.popoverEl = el) }, panel),
            h("calcite-action", { id: "export-popover-btn", alignment: "center", icon: this.popoverIcon, scale: this.scale, title: (_b = this.messages) === null || _b === void 0 ? void 0 : _b.exportBtn, text: (_c = this.messages) === null || _c === void 0 ? void 0 : _c.exportBtn }),
        ];
    }
    renderPanel() {
        var _a;
        const includeMap = this.showIncludeMap ? this.renderSwitch('includeMap') : null;
        const options = this.includeMap ? this.renderMapOptions() : null;
        const print = this.renderPrint();
        const panelClass = this.mode === 'inline' ? CSS.inlineContainer : CSS.popoverContainer;
        return (h("div", { class: panelClass }, includeMap, options, h("calcite-button", { width: "full", onClick: this.exportOnClick.bind(this), disabled: this.exportIsLoading }, (_a = this.messages) === null || _a === void 0 ? void 0 : _a.export), print));
    }
    renderSwitch(value, label) {
        var _a;
        const checked = this[value];
        const title = label != null ? label : (_a = this.messages) === null || _a === void 0 ? void 0 : _a[value];
        return (h("calcite-label", { layout: "inline-space-between" }, title, h("calcite-switch", { checked: checked, value: value, onCalciteSwitchChange: this.optionOnChange.bind(this) })));
    }
    renderMapOptions() {
        // HARDCODED_IN_EN
        const includeHeader = this.showIncludeHeader ? this.renderSwitch('includeHeader', 'Include header') : null;
        const includeLegend = this.showIncludeLegend ? this.renderSwitch('includeLegend') : null;
        const includePopup = this.showIncludePopup ? this.renderSwitch('includePopup') : null;
        return (h("div", null, includeHeader, includeLegend, includePopup));
    }
    renderPrint() {
        var _a;
        return (h("div", { ref: (el) => (this.printContainerEl = el) }, h("div", { class: CSS.print.base, ref: (el) => (this.printEl = el) }, h("div", { class: CSS.print.viewsContainer }, (_a = this.exportViews) === null || _a === void 0 ? void 0 : _a.map(({ title, view }, index) => {
            var _a, _b;
            const mapId = (_b = (_a = view.map) === null || _a === void 0 ? void 0 : _a.portalItem) === null || _b === void 0 ? void 0 : _b.id;
            const printMap = this.includeMap ? this.renderPrintMap(title, index) : null;
            const legend = this.includeMap && this.showIncludeLegend ? this.renderLegend(index) : null;
            const popup = this.includeMap && this.showIncludePopup ? this.renderPopup(index) : null;
            return (h("div", { key: mapId, id: `print-${index}`, class: CSS.print.viewContent }, printMap, legend, popup));
        })))));
    }
    renderPrintMap(title, index) {
        return (h("div", { id: `view-container-${index}`, class: CSS.print.viewContainer }, h("div", { id: `view-wrapper-${index}`, class: CSS.print.viewWrapper }, this.includeHeader && title ? (h("div", { class: CSS.print.viewHeader }, h("h1", null, title))) : null, h("img", { id: `view-${index}`, class: CSS.print.view }), h("div", { id: `scalebar-container-${index}`, class: CSS.print.scaleBarContainer }))));
    }
    renderLegend(index) {
        return h("div", { id: `legend-${index}`, class: CSS.print.legendContainer });
    }
    renderCompass(index) {
        return h("div", { id: `compass-${index}`, class: CSS.print.compassContainer });
    }
    renderPopup(index) {
        return (h("div", { id: `popup-${index}`, class: CSS.print.popupContainer }, h("div", { id: `popup-title-${index}`, class: CSS.print.popupTitle }), h("div", { id: `popup-content-${index}`, class: CSS.print.popupContent })));
    }
    optionOnChange(e) {
        const { checked, value } = e.target;
        this[value] = checked;
        this.updateExportOutput();
    }
    async exportOnClick() {
        var _a;
        await this.beforeExport();
        if ((_a = this.exportViews) === null || _a === void 0 ? void 0 : _a.length) {
            this.addPrintStyling();
            document.body.prepend(this.printEl);
            this.exportViews.forEach(({ view }, index) => {
                // Hide compass this release
                // const viewWrapperEl = this.printEl.querySelector(`#view-wrapper-${index}`);
                // const compassContainerEl = this.compassContainerEl.querySelector(`#compass-${index}`) as HTMLElement;
                // if (viewWrapperEl != null && compassContainerEl != null && !viewWrapperEl.contains(compassContainerEl)) {
                //   if (!title) compassContainerEl.style.top = '15px';
                //   viewWrapperEl.append(compassContainerEl);
                // }
                this.handleViewExportOnClick(view, index);
            });
            this.handleImgLoaded();
        }
        else {
            if (this.popoverEl != null) {
                this.popoverEl.open = false;
            }
        }
    }
    async handleViewExportOnClick(view, index) {
        if (this.includeMap) {
            this.updateScaleBar(view, index);
            this.updatePopupToPrint(view, index);
            this.viewScreenshot(view, index);
            this.handleLegendSetup(index);
        }
    }
    addPrintStyling() {
        if (this.printStyleEl == null) {
            this.printStyleEl = document.createElement('style');
            this.printStyleEl.innerHTML = printStyling;
            document.body.prepend(this.printStyleEl);
        }
    }
    handleImgLoaded() {
        this.exportIsLoading = true;
        setTimeout(() => {
            this.exportIsLoading = undefined;
            this.setupViewPrintElements();
        }, 1500);
    }
    resetPrintContent() {
        // this.printContainerEl?.prepend(this.printEl);
        // this.printStyleEl?.remove();
        // this.printStyleEl = undefined;
    }
    async updatePopupToPrint(view, index) {
        var _a, _b;
        const popupContainerEl = this.printEl.querySelector(`#popup-${index}`);
        if (popupContainerEl != null) {
            popupContainerEl.style.display = this.includePopup && view.popup.visible ? 'block' : 'none';
            this.checkPopupOpen(view, index);
        }
        if (view.popup.visible && view.popup.selectedFeature != null) {
            const heading = document.createElement(`h${(_a = view.popup.headingLevel) !== null && _a !== void 0 ? _a : 2}`);
            heading.innerHTML = (_b = view.popup.title) !== null && _b !== void 0 ? _b : '';
            heading.className = 'esri-widget__heading esri-popup__header-title';
            const popupTitleEl = this.printEl.querySelector(`#popup-title-${index}`);
            if (popupTitleEl != null) {
                popupTitleEl.style.display = view.popup.title ? 'block' : 'none';
                popupTitleEl.innerHTML = '';
                popupTitleEl.prepend(heading);
            }
        }
    }
    updateExportOutput() {
        this.output = {};
        if (this.showIncludeLegend) {
            this.output.includeLegend = this.includeLegend;
        }
        if (this.showIncludeMap) {
            this.output.includeMap = this.includeMap;
        }
        if (this.showIncludePopup) {
            this.output.includePopup = this.includePopup;
        }
        if (this.showIncludeHeader) {
            this.output.includeHeader = this.includeHeader;
        }
        this.exportOutputUpdated.emit();
    }
    setupViewPrintElements() {
        const title = document.title;
        window.print();
        document.title = title;
        setTimeout(() => {
            this.resetPrintContent();
        }, 1000);
    }
    handleLegendSetup(index) {
        var _a;
        const legendContainerEl = this.printEl.querySelector(`#legend-${index}`);
        if (this.showIncludeLegend && this.includeMap && legendContainerEl) {
            const legend = this.legends[index];
            const hasActiveLayers = legend != null && ((_a = legend.activeLayerInfos) === null || _a === void 0 ? void 0 : _a.length) > 0;
            legendContainerEl.style.display = this.includeLegend && hasActiveLayers ? 'block' : 'none';
        }
    }
    handleWidgetCreation() {
        var _a;
        if (this.includeMap) {
            (_a = this.exportViews) === null || _a === void 0 ? void 0 : _a.forEach(({ view }, index) => {
                this.handleLegendCreation(view, index);
                // Hide compass this release
                // this.handleCompassCreation(view, index);
            });
        }
    }
    handleIncludePopup(view, index) {
        var _a, _b;
        if (this.showIncludePopup) {
            const handleId = `includePopup-${index}`;
            (_a = this.handles) === null || _a === void 0 ? void 0 : _a.remove(handleId);
            (_b = this.reactiveUtils) === null || _b === void 0 ? void 0 : _b.whenOnce(() => view === null || view === void 0 ? void 0 : view.ready).then(() => {
                var _a;
                (_a = this.handles) === null || _a === void 0 ? void 0 : _a.add(this.reactiveUtils.watch(() => { var _a; return (_a = view === null || view === void 0 ? void 0 : view.popup) === null || _a === void 0 ? void 0 : _a.visible; }, (visible) => {
                    this.includePopup = visible;
                }), handleId);
            });
        }
    }
    handleLegendCreation(view, index) {
        var _a, _b, _c, _d;
        const legendContainerEl = this.printEl.querySelector(`#legend-${index}`);
        if (this.showIncludeLegend && legendContainerEl != null) {
            const map = view.map;
            const legend = this.legends[index];
            const legendMap = (_a = legend === null || legend === void 0 ? void 0 : legend.view) === null || _a === void 0 ? void 0 : _a.map;
            const checkId = ((_b = map === null || map === void 0 ? void 0 : map.portalItem) === null || _b === void 0 ? void 0 : _b.id) != null && ((_c = map === null || map === void 0 ? void 0 : map.portalItem) === null || _c === void 0 ? void 0 : _c.id) === ((_d = legendMap === null || legendMap === void 0 ? void 0 : legendMap.portalItem) === null || _d === void 0 ? void 0 : _d.id);
            if (!checkId) {
                this.updateLegend(view, index, legendContainerEl);
            }
        }
    }
    async updateLegend(view, index, legendContainerEl) {
        view === null || view === void 0 ? void 0 : view.when(async (view) => {
            if (this.legends[index] == null && legendContainerEl != null) {
                legendContainerEl.innerHTML = '';
                const legendCont = document.createElement('div');
                legendContainerEl.append(legendCont);
                const [Legend] = await loadModules(['esri/widgets/Legend']);
                this.legends[index] = new Legend({
                    id: `legend-widget-${index}`,
                    container: legendCont,
                    view,
                    style: {
                        type: 'card',
                        layout: 'side-by-side',
                    },
                });
            }
        });
    }
    handleCompassCreation(view, index) {
        var _a, _b, _c;
        const compassContainerEl = this.compassContainerEl.querySelector(`#compass-${index}`);
        if (compassContainerEl != null) {
            const map = view.map;
            const compass = this.compasses[index];
            const compassMap = (_a = compass === null || compass === void 0 ? void 0 : compass.view) === null || _a === void 0 ? void 0 : _a.map;
            const checkId = ((_b = map === null || map === void 0 ? void 0 : map.portalItem) === null || _b === void 0 ? void 0 : _b.id) === ((_c = compassMap === null || compassMap === void 0 ? void 0 : compassMap.portalItem) === null || _c === void 0 ? void 0 : _c.id);
            if (!checkId) {
                this.updateCompass(view, index, compassContainerEl);
            }
        }
    }
    updateCompass(view, index, compassContainerEl) {
        view === null || view === void 0 ? void 0 : view.when(async (view) => {
            const container = document.createElement('div');
            if (compassContainerEl == null)
                return;
            compassContainerEl.append(container);
            const [Compass] = await loadModules(['esri/widgets/Compass']);
            this.compasses[index] = new Compass({ id: `compass-widget-${index}`, container, view });
        });
    }
    updateScaleBar(view, index) {
        const scaleBarContainerEl = this.printEl.querySelector(`#scalebar-container-${index}`);
        if (scaleBarContainerEl && view != null) {
            scaleBarContainerEl.innerHTML = '';
            if (this.showScaleBar) {
                const widgets = view.ui.getComponents();
                const scaleBar = widgets === null || widgets === void 0 ? void 0 : widgets.find(({ container }) => { var _a; return (_a = container === null || container === void 0 ? void 0 : container.className) === null || _a === void 0 ? void 0 : _a.includes('esri-scale-bar'); });
                if ((scaleBar === null || scaleBar === void 0 ? void 0 : scaleBar.container) != null && typeof scaleBar.container !== 'string') {
                    scaleBarContainerEl.append(scaleBar.container.cloneNode(true));
                }
            }
        }
    }
    async viewScreenshot(view, index) {
        if (this.includeMap) {
            const scaleBarContainerEl = this.printEl.querySelector(`#scalebar-container-${index}`);
            scaleBarContainerEl === null || scaleBarContainerEl === void 0 ? void 0 : scaleBarContainerEl.classList.toggle('instant-apps-export-print__scale-bar-container--position', view.width > 1000);
            const screenshot = await view.takeScreenshot({
                width: view.width * 2,
                height: view.height * 2,
            });
            this.handleScaleBarSize(view, screenshot, scaleBarContainerEl);
            const viewEl = this.printEl.querySelector(`#view-${index}`);
            if (screenshot != null && viewEl != null) {
                viewEl.src = screenshot.dataUrl;
            }
        }
    }
    checkPopupOpen(view, index) {
        const popupContainer = view.popup.container;
        const popup = popupContainer === null || popupContainer === void 0 ? void 0 : popupContainer.querySelector('.esri-popup .esri-feature__main-container');
        if (popup != null) {
            const popupCanvas = popup.querySelectorAll('canvas');
            const popupContentEl = this.printEl.querySelector(`#popup-content-${index}`);
            if (popupContentEl == null)
                return;
            popupContentEl.innerHTML = '';
            popupContentEl.append(popup.cloneNode(true));
            const popContCanvas = popupContentEl.querySelectorAll('canvas');
            popupCanvas.forEach((canvas, key) => {
                var _a;
                const image = canvas.toDataURL();
                const img = document.createElement('img');
                img.src = image;
                const style = canvas.getAttribute('style');
                if (style) {
                    img.setAttribute('style', style);
                }
                const popCanvas = popContCanvas[key];
                if (popCanvas != null) {
                    popCanvas.replaceWith(img);
                    if (document.querySelector("link[href*='esri/themes/dark/main.css']") && ((_a = img.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) != null) {
                        img.parentElement.style.background = '#242424';
                        img.parentElement.parentElement.style.background = '#242424';
                    }
                }
            });
        }
    }
    handleScaleBarSize(view, screenshot, scaleBarContainerEl) {
        if (this.showScaleBar && (view === null || view === void 0 ? void 0 : view.type) === '2d') {
            if (scaleBarContainerEl != null) {
                const topBar = scaleBarContainerEl.querySelector('.esri-scale-bar__line--top');
                const bottomBar = scaleBarContainerEl.querySelector('.esri-scale-bar__line--bottom');
                this.setScalebarWidth(screenshot, scaleBarContainerEl, topBar, 'top');
                this.setScalebarWidth(screenshot, scaleBarContainerEl, bottomBar, 'bottom');
            }
        }
    }
    setScalebarWidth(screenshot, scaleBarContainerEl, bar, position) {
        if (bar != null && screenshot != null) {
            const width = screenshot.data.width / 2;
            const barWidth = Number(bar.style.width.replace('px', ''));
            const widthPercentage = (barWidth / width) * 100;
            scaleBarContainerEl === null || scaleBarContainerEl === void 0 ? void 0 : scaleBarContainerEl.style.setProperty(`--instant-apps-scale-bar-${position}`, `${widthPercentage}%`);
        }
    }
    get el() { return this; }
    static get watchers() { return {
        "includeMap": ["watchIncludeMap"],
        "exportViews": ["watchView"]
    }; }
    static get style() { return InstantAppsExportViewsStyle0; }
}, [1, "instant-apps-export-views", {
        "output": [1040],
        "beforeExport": [16],
        "popoverIcon": [1, "popover-icon"],
        "includeLegend": [1028, "include-legend"],
        "includeMap": [1028, "include-map"],
        "includePopup": [1028, "include-popup"],
        "includeHeader": [1028, "include-header"],
        "mode": [513],
        "popoverPositioning": [1, "popover-positioning"],
        "popoverPlacement": [1, "popover-placement"],
        "scale": [1],
        "showIncludeLegend": [4, "show-include-legend"],
        "showIncludeMap": [4, "show-include-map"],
        "showIncludePopup": [4, "show-include-popup"],
        "showIncludeHeader": [4, "show-include-header"],
        "showScaleBar": [4, "show-scale-bar"],
        "exportViews": [16],
        "baseClass": [32],
        "exportIsLoading": [32],
        "messages": [32]
    }, undefined, {
        "includeMap": ["watchIncludeMap"],
        "exportViews": ["watchView"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-export-views", "calcite-action", "calcite-button", "calcite-icon", "calcite-label", "calcite-loader", "calcite-popover", "calcite-switch"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-export-views":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsExportViews$1);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "calcite-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "calcite-label":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-loader":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-popover":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "calcite-switch":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const InstantAppsExportViews = InstantAppsExportViews$1;
const defineCustomElement = defineCustomElement$1;

export { InstantAppsExportViews, defineCustomElement };
