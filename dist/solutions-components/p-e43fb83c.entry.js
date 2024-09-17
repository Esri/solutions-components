/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './p-6eb37ed2.js';
import { l as loadModules } from './p-4cd4cb85.js';
import { g as getMessages } from './p-7bfecd07.js';
import { g as getMode } from './p-a9a72626.js';
import './p-0a24ad5f.js';
import './p-d4056c1c.js';
import './p-ac122d9e.js';

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


  .instant-apps-export-print {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -999;
    color: #323232 !important;
    display: grid;
    gap: 24px;
    grid-auto-flow: row;
    --esri-calcite-mode-name: "light";
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
    display: flex;
    justify-content: center;
  }

  .instant-apps-export-print__view-wrapper {
    height: fit-content;
    width: fit-content;
    position: relative;
    display: flex;
    flex-direction: column;
    border: 2pt solid #323232;
    overflow: hidden;
  }

  .instant-apps-export-print__view {
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
  }

  .instant-apps-export-print__content-container {
    display: flex;
    gap: 24px;
    break-inside: avoid;
    break-before: auto;
  }`;
const screenshotStyling = `
.screenshot-preview.hide, .hide {
  display: none;
}

.screenshot-cursor {
  cursor: crosshair;
}

.relative {
  position: relative;
}

#screenshot-mask {
  position: absolute;
  background: var(--instant-apps-screenshot-mask-background);
  border: var(--instant-apps-screenshot-mask-border);
}

.screenshot-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.75);
}

.screenshot-preview * {
  box-sizing: border-box;
}

.screenshot-img-container img {
  max-height: 75%;
  max-width: 75%;
  object-fit: contain;
  border: 10px solid white;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.5);
  margin-bottom: 0.5em;
}

.screenshot-img-container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  margin-bottom: 8px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

.screenshot-img-container calcite-button {
  margin: 5px;
}`;

const instantAppsExportCss = ":host{display:block;--instant-apps-export-action-background:var(--calcite-color-foreground-1);--instant-apps-export-action-background-hover:var(--calcite-color-foreground-2);--instant-apps-export-action-background-press:var(--calcite-color-foreground-3);--instant-apps-export-action-height:100%;--instant-apps-export-action-width:fit-content;--instant-apps-export-action-icon-color:var(--calcite-color-text-3);--instant-apps-export-action-icon-hover-color:var(--calcite-color-text-1);--instant-apps-export-background:var(--calcite-color-foreground-1);--instant-apps-export-text-color:var(--calcite-color-text-1);--instant-apps-export-popover-width:250px}.instant-apps-export{height:100%}.instant-apps-export *{box-sizing:border-box}.instant-apps-export__popover-container,.instant-apps-export__inline-container{padding:12px;background:var(--instant-apps-export-background);--calcite-color-text-1:var(--instant-apps-export-text-color)}.instant-apps-export__popover-container{width:var(--instant-apps-export-popover-width)}.instant-apps-export calcite-action{height:var(--instant-apps-export-action-height);width:var(--instant-apps-export-action-width);--calcite-color-foreground-1:var(--instant-apps-export-action-background);--calcite-color-foreground-2:var(--instant-apps-export-action-background-hover);--calcite-color-foreground-3:var(--instant-apps-export-action-background-press);--calcite-color-text-3:var(--instant-apps-export-action-icon-color);--calcite-color-text-1:var(--instant-apps-export-action-icon-hover-color)}.instant-apps-export .instant-apps-export-print{display:none}.instant-apps-export__visually-hidden{position:absolute;top:0;z-index:-1;visibility:hidden}.instant-apps-export calcite-input{--calcite-color-foreground-1:var(--instant-apps-export-background);--calcite-color-text-1:var(--instant-apps-export-text-color)}.instant-apps-export calcite-popover{--calcite-color-foreground-1:var(--instant-apps-export-background)}.instant-apps-export calcite-switch{--calcite-color-foreground-1:#fff;--calcite-color-foreground-2:#f3f3f3}.instant-apps-export calcite-button:last-of-type{margin-top:0.5rem}.instant-apps-export .calcite-mode-dark calcite-switch{--calcite-color-foreground-1:#2b2b2b;--calcite-color-foreground-2:#202020}.instant-apps-export__compass-container.esri-widget{background:#fff;box-shadow:0 1px 2px rgba(0, 0, 0, 0.3)}.instant-apps-export__compass-container.esri-widget .esri-compass__icon.esri-icon-compass{color:#6e6e6e}.hide{display:none}.screenshotCursor{cursor:crosshair}";
const InstantAppsExportStyle0 = instantAppsExportCss;

const CSS = {
    baseDark: 'instant-apps-export calcite-mode-dark',
    baseLight: 'instant-apps-export calcite-mode-light',
    inlineContainer: 'instant-apps-export__inline-container',
    popoverContainer: 'instant-apps-export__popover-container',
    hidden: 'instant-apps-export__visually-hidden',
    print: {
        base: 'instant-apps-export-print',
        contentContainer: 'instant-apps-export-print__content-container',
        extraContainer: 'instant-apps-export-print__extra-container',
        legendContainer: 'instant-apps-export-print__legend-container',
        compassContainer: 'instant-apps-export-print__compass-container',
        scaleBarContainer: 'instant-apps-export-print__scale-bar-container',
        popupContainer: 'instant-apps-export-print__popup-container',
        popupContent: 'instant-apps-export-print__popup-content',
        popupTitle: 'instant-apps-export-print__popup-title',
        view: 'instant-apps-export-print__view',
        viewContainer: 'instant-apps-export-print__view-container',
        viewSection: 'instant-apps-export-print__view-section',
        viewWrapper: 'instant-apps-export-print__view-wrapper',
    },
};
const dragHandlerName = 'instant-app-export-drag';
const InstantAppsExport = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.exportOutputUpdated = createEvent(this, "exportOutputUpdated", 7);
        this.output = undefined;
        this.beforeExport = () => Promise.resolve();
        this.popoverIcon = 'export';
        this.extraContent = undefined;
        this.extraContentLabel = undefined;
        this.headerTitle = '';
        this.includeExtraContent = true;
        this.includeLegend = true;
        this.includeMap = true;
        this.includePopup = false;
        this.mode = 'popover';
        this.popoverPositioning = 'absolute';
        this.popoverPlacement = 'auto';
        this.scale = 'm';
        this.showHeaderTitle = true;
        this.showIncludeLegend = true;
        this.showIncludeMap = false;
        this.showIncludePopup = true;
        this.showScaleBar = false;
        this.view = undefined;
        this.maskBackground = 'rgba(255, 51, 0, 0.1)';
        this.maskBorder = '2px dashed rgb(255, 51, 0)';
        this.baseClass = CSS.baseLight;
        this.exportIsLoading = undefined;
        this.messages = undefined;
    }
    watchIncludeMap(includeMap) {
        if (includeMap) {
            this.updateLegend();
        }
    }
    watchView() {
        this.handleIncludePopup();
    }
    async componentWillLoad() {
        this.baseClass = getMode(this.el) === 'dark' ? CSS.baseDark : CSS.baseLight;
        getMessages(this);
        await this.initializeModules();
    }
    componentDidLoad() {
        this.printContainerEl.prepend(this.printEl);
        this.handleIncludePopup();
    }
    async initializeModules() {
        const [Handles, reactiveUtils] = await loadModules(['esri/core/Handles', 'esri/core/reactiveUtils']);
        this.handles = new Handles();
        this.reactiveUtils = reactiveUtils;
        return Promise.resolve();
    }
    render() {
        const mode = this.mode === 'popover' ? this.renderPopover() : this.renderPanel();
        const compass = this.renderCompass();
        return (h(Host, { key: 'd561a14661edad3e4ad5f0041537acdc1fb724a1' }, h("div", { key: '917848051ac8114c4ba527332c8688791a9c75d0', class: this.baseClass, onMouseEnter: this.handleWidgetCreation.bind(this), onFocusin: this.handleWidgetCreation.bind(this) }, mode, h("div", { key: '3421d8bde7ce6f91062b538f087c155946358e01', class: CSS.hidden }, compass))));
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
        var _a, _b;
        const headerTitle = this.showHeaderTitle ? this.renderTitle() : null;
        const includeExtraContent = this.extraContent != null ? this.renderSwitch('includeExtraContent', this.extraContentLabel) : null;
        const includeMap = this.showIncludeMap ? this.renderSwitch('includeMap') : null;
        const options = this.includeMap ? this.renderMapOptions() : null;
        const print = this.renderPrint();
        const panelClass = this.mode === 'inline' ? CSS.inlineContainer : CSS.popoverContainer;
        return (h("div", { class: panelClass }, headerTitle, includeExtraContent, includeMap, options, this.includeMap ? (h("calcite-button", { appearance: "transparent", width: "full", onClick: this.setMapAreaOnClick.bind(this), disabled: this.exportIsLoading }, (_a = this.messages) === null || _a === void 0 ? void 0 : _a.setMapArea)) : null, h("calcite-button", { width: "full", onClick: this.exportOnClick.bind(this), disabled: this.exportIsLoading }, (_b = this.messages) === null || _b === void 0 ? void 0 : _b.export), print));
    }
    renderTitle() {
        var _a;
        return (h("calcite-label", null, (_a = this.messages) === null || _a === void 0 ? void 0 :
            _a.title, h("calcite-input", { value: this.headerTitle, onCalciteInputInput: this.updateHeaderTitle.bind(this) })));
    }
    renderSwitch(value, label) {
        var _a;
        const checked = this[value];
        const title = label != null ? label : (_a = this.messages) === null || _a === void 0 ? void 0 : _a[value];
        return (h("calcite-label", { layout: "inline-space-between" }, title, h("calcite-switch", { checked: checked, value: value, onCalciteSwitchChange: this.optionOnChange.bind(this) })));
    }
    renderMapOptions() {
        const includeLegend = this.showIncludeLegend ? this.renderSwitch('includeLegend') : null;
        const includePopup = this.showIncludePopup ? this.renderSwitch('includePopup') : null;
        return (h("div", null, includeLegend, includePopup));
    }
    renderPrint() {
        const printMap = this.includeMap ? this.renderPrintMap() : null;
        const extraContent = this.renderExtraContent();
        const legend = this.includeMap && this.showIncludeLegend ? this.renderLegend() : null;
        const popup = this.includeMap && this.showIncludePopup ? this.renderPopup() : null;
        return (h("div", { ref: (el) => (this.printContainerEl = el) }, h("div", { class: CSS.print.base, ref: (el) => (this.printEl = el) }, printMap, legend, h("div", { class: CSS.print.contentContainer }, popup, extraContent))));
    }
    renderPrintMap() {
        return (h("div", { class: CSS.print.viewContainer, ref: (el) => (this.viewContainerEl = el) }, h("div", { class: CSS.print.viewWrapper, ref: (el) => (this.viewWrapperEl = el) }, this.headerTitle ? h("instant-apps-header", { titleText: this.headerTitle, backgroundColor: "#fff", textColor: "#323232" }) : null, h("img", { class: CSS.print.view, ref: (el) => (this.viewEl = el) }), h("div", { class: CSS.print.scaleBarContainer, ref: (el) => (this.scaleBarContainerEl = el) }))));
    }
    renderLegend() {
        return h("div", { class: CSS.print.legendContainer, ref: (el) => (this.legendContainerEl = el) });
    }
    renderCompass() {
        return h("div", { class: CSS.print.compassContainer, ref: (el) => (this.compassContainerEl = el) });
    }
    renderPopup() {
        return (h("div", { class: CSS.print.popupContainer, ref: (el) => (this.popupContainerEl = el) }, h("div", { ref: (el) => (this.popupTitleEl = el), class: CSS.print.popupTitle }), h("div", { ref: (el) => (this.popupContentEl = el), class: CSS.print.popupContent })));
    }
    renderExtraContent() {
        return h("div", { class: CSS.print.extraContainer, id: "export-content", ref: (el) => (this.extraContainerEl = el) });
    }
    optionOnChange(e) {
        const { checked, value } = e.target;
        this[value] = checked;
        this.updateExportOutput();
    }
    updateHeaderTitle(e) {
        this.headerTitle = e.target.value;
        this.updateExportOutput();
    }
    async exportOnClick() {
        this.removeScreenshotElements();
        await this.beforeExport();
        if (this.viewWrapperEl != null && !this.viewWrapperEl.contains(this.compassContainerEl)) {
            this.viewWrapperEl.append(this.compassContainerEl);
        }
        this.handleViewExportOnClick();
        if (this.popoverEl != null) {
            this.popoverEl.open = false;
        }
    }
    async handleViewExportOnClick() {
        if (this.view != null) {
            this.addPrintStyling();
            document.body.prepend(this.printEl);
            this.handleExtraContent();
            if (this.includeMap) {
                this.updateScaleBar();
                this.updatePopupToPrint();
                this.viewScreenshot();
                this.handleImgLoaded();
            }
            else {
                this.handleImgLoaded();
            }
        }
        else {
            if (this.popoverEl != null) {
                this.popoverEl.open = false;
            }
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
    handleExtraContent() {
        const extraContainerEl = this.printEl.querySelector('#export-content');
        if (extraContainerEl != null) {
            extraContainerEl.innerHTML = '';
            if (this.extraContent != null && this.includeExtraContent) {
                extraContainerEl.style.display = 'block';
                extraContainerEl.append(this.extraContent.cloneNode(true));
            }
            else {
                extraContainerEl.style.display = 'none';
            }
        }
    }
    resetPrintContent() {
        var _a, _b;
        if (this.view != null) {
            this.screenshot = null;
            (_a = this.printContainerEl) === null || _a === void 0 ? void 0 : _a.prepend(this.printEl);
            (_b = this.printStyleEl) === null || _b === void 0 ? void 0 : _b.remove();
            this.printStyleEl = undefined;
            const extraContainerEl = this.printEl.querySelector('#export-content');
            if (extraContainerEl) {
                extraContainerEl.innerHTML = '';
            }
        }
    }
    async updatePopupToPrint() {
        var _a, _b;
        if (this.view != null) {
            if (this.popupContainerEl != null) {
                this.popupContainerEl.style.display = this.includePopup && this.view.popup.visible ? 'block' : 'none';
                this.checkPopupOpen();
            }
            if (this.view.popup.visible && this.view.popup.selectedFeature != null) {
                const heading = document.createElement(`h${(_a = this.view.popup.headingLevel) !== null && _a !== void 0 ? _a : 2}`);
                heading.innerHTML = (_b = this.view.popup.title) !== null && _b !== void 0 ? _b : '';
                heading.className = 'esri-widget__heading esri-popup__header-title';
                if (this.popupTitleEl != null) {
                    this.popupTitleEl.style.display = this.view.popup.title ? 'block' : 'none';
                    this.popupTitleEl.innerHTML = '';
                    this.popupTitleEl.prepend(heading);
                }
            }
        }
    }
    updateExportOutput() {
        this.output = {};
        if (this.showHeaderTitle) {
            this.output.headerTitle = this.headerTitle;
        }
        if (this.showIncludeLegend) {
            this.output.includeLegend = this.includeLegend;
        }
        if (this.showIncludeMap) {
            this.output.includeMap = this.includeMap;
        }
        if (this.showIncludePopup) {
            this.output.includePopup = this.includePopup;
        }
        this.exportOutputUpdated.emit();
    }
    setupViewPrintElements() {
        if (this.view != null) {
            this.handleLegendSetup();
            const title = document.title;
            if (this.showHeaderTitle && this.headerTitle) {
                document.title = this.headerTitle;
            }
            window.print();
            document.title = title;
            setTimeout(() => {
                this.resetPrintContent();
            }, 1000);
        }
    }
    handleLegendSetup() {
        var _a;
        if (this.showIncludeLegend && this.view != null && this.includeMap && this.legendContainerEl != null) {
            const hasActiveLayers = this.legend != null && ((_a = this.legend.activeLayerInfos) === null || _a === void 0 ? void 0 : _a.length) > 0;
            this.legendContainerEl.style.display = this.includeLegend && hasActiveLayers ? 'block' : 'none';
        }
    }
    handleWidgetCreation() {
        if (this.includeMap) {
            this.handleLegendCreation();
            this.handleCompassCreation();
        }
    }
    handleIncludePopup() {
        var _a, _b;
        if (this.showIncludePopup) {
            const handleId = 'includePopup';
            (_a = this.handles) === null || _a === void 0 ? void 0 : _a.remove(handleId);
            (_b = this.reactiveUtils) === null || _b === void 0 ? void 0 : _b.whenOnce(() => { var _a; return (_a = this.view) === null || _a === void 0 ? void 0 : _a.ready; }).then(() => {
                var _a;
                (_a = this.handles) === null || _a === void 0 ? void 0 : _a.add(this.reactiveUtils.watch(() => { var _a, _b; return (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.popup) === null || _b === void 0 ? void 0 : _b.visible; }, (visible) => {
                    this.includePopup = visible;
                }), handleId);
            });
        }
    }
    handleLegendCreation() {
        var _a, _b, _c, _d, _e;
        if (this.view != null && this.showIncludeLegend && this.legendContainerEl != null) {
            const map = this.view.map;
            const legendMap = (_b = (_a = this.legend) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.map;
            const checkId = ((_c = map === null || map === void 0 ? void 0 : map.portalItem) === null || _c === void 0 ? void 0 : _c.id) != null && ((_d = map === null || map === void 0 ? void 0 : map.portalItem) === null || _d === void 0 ? void 0 : _d.id) === ((_e = legendMap === null || legendMap === void 0 ? void 0 : legendMap.portalItem) === null || _e === void 0 ? void 0 : _e.id);
            if (!checkId) {
                this.updateLegend();
            }
        }
    }
    updateLegend() {
        var _a;
        (_a = this.view) === null || _a === void 0 ? void 0 : _a.when(async (view) => {
            if (this.legend != null) {
                this.legend.destroy();
                this.legend = null;
            }
            if (this.legendContainerEl != null) {
                this.legendContainerEl.innerHTML = '';
                const legendCont = document.createElement('div');
                this.legendContainerEl.append(legendCont);
                const [Legend] = await loadModules(['esri/widgets/Legend']);
                this.legend = new Legend({
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
    handleCompassCreation() {
        var _a, _b, _c, _d;
        if (this.view != null && this.compassContainerEl != null) {
            const map = this.view.map;
            const compassMap = (_b = (_a = this.compass) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.map;
            const checkId = ((_c = map === null || map === void 0 ? void 0 : map.portalItem) === null || _c === void 0 ? void 0 : _c.id) === ((_d = compassMap === null || compassMap === void 0 ? void 0 : compassMap.portalItem) === null || _d === void 0 ? void 0 : _d.id);
            if (!checkId) {
                this.updateCompass();
            }
        }
    }
    updateCompass() {
        var _a;
        (_a = this.view) === null || _a === void 0 ? void 0 : _a.when(async (view) => {
            var _a;
            (_a = this.compass) === null || _a === void 0 ? void 0 : _a.destroy();
            this.compass = null;
            const container = document.createElement('div');
            this.compassContainerEl.append(container);
            const [Compass] = await loadModules(['esri/widgets/Compass']);
            this.compass = new Compass({ container, view });
        });
    }
    updateScaleBar() {
        if (this.scaleBarContainerEl && this.view != null) {
            this.scaleBarContainerEl.innerHTML = '';
            if (this.showScaleBar) {
                const widgets = this.view.ui.getComponents();
                const scaleBar = widgets === null || widgets === void 0 ? void 0 : widgets.find(({ container }) => { var _a; return (_a = container === null || container === void 0 ? void 0 : container.className) === null || _a === void 0 ? void 0 : _a.includes('esri-scale-bar'); });
                if ((scaleBar === null || scaleBar === void 0 ? void 0 : scaleBar.container) != null && typeof scaleBar.container !== 'string') {
                    this.scaleBarContainerEl.append(scaleBar.container.cloneNode(true));
                }
            }
        }
    }
    async viewScreenshot() {
        var _a;
        if (this.view != null && this.includeMap) {
            if (this.screenshot == null) {
                (_a = this.scaleBarContainerEl) === null || _a === void 0 ? void 0 : _a.classList.toggle('instant-apps-export-print__scale-bar-container--position', this.view.width > 1000);
                this.screenshot = await this.view.takeScreenshot({
                    width: this.view.width * 2,
                    height: this.view.height * 2,
                });
            }
            this.handleScaleBarSize();
            if (this.viewEl != null && this.viewWrapperEl != null) {
                const { height, width } = this.screenshot.data;
                if (height > width) {
                    this.setMaxRowHeightOnViewContainer();
                }
                else {
                    this.setMaxWidthOnViewContainer();
                }
                this.viewEl.src = this.screenshot.dataUrl;
            }
        }
    }
    setMaxRowHeightOnViewContainer() {
        this.printEl.style.gridTemplateRows = 'minmax(auto, 70%)';
        this.viewEl.style.height = '100%';
        this.viewEl.style.width = '';
        this.viewWrapperEl.style.height = '100%';
        this.viewWrapperEl.style.width = 'fit-content';
    }
    setMaxWidthOnViewContainer() {
        this.printEl.style.gridTemplateRows = '';
        this.viewEl.style.width = '100%';
        this.viewEl.style.height = '';
        this.viewWrapperEl.style.height = 'fit-content';
        this.viewWrapperEl.style.width = '100%';
    }
    checkPopupOpen() {
        if (this.view != null) {
            const popupContainer = this.view.popup.container;
            const popup = popupContainer === null || popupContainer === void 0 ? void 0 : popupContainer.querySelector('.esri-popup .esri-feature__main-container');
            if (popup != null) {
                const popupCanvas = popup.querySelectorAll('canvas');
                this.popupContentEl.innerHTML = '';
                this.popupContentEl.append(popup.cloneNode(true));
                const popContCanvas = this.popupContentEl.querySelectorAll('canvas');
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
    }
    createScreenshot() {
        var _a, _b;
        if (this.view != null) {
            this.screenshotPreview = document.createElement('div');
            this.screenshotPreview.className = 'screenshot-preview hide';
            this.screenshotImgContainer = document.createElement('div');
            this.screenshotImgContainer.className = 'screenshot-img-container';
            this.screenshotImg = document.createElement('img');
            const screenshotBtnContainer = document.createElement('div');
            const exportBtn = document.createElement('calcite-button');
            const returnBtn = document.createElement('calcite-button');
            exportBtn.innerHTML = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.export;
            returnBtn.innerHTML = (_b = this.messages) === null || _b === void 0 ? void 0 : _b.returnToMap;
            returnBtn.appearance = 'outline-fill';
            exportBtn.onclick = this.exportOnClick.bind(this);
            returnBtn.onclick = this.screenshotReturn.bind(this);
            screenshotBtnContainer.append(returnBtn, exportBtn);
            this.screenshotImgContainer.append(this.screenshotImg, screenshotBtnContainer);
            this.screenshotPreview.append(this.screenshotImgContainer);
            this.view.container.append(this.screenshotPreview);
        }
    }
    createMaskDiv() {
        if (this.view != null) {
            this.maskDivEl = document.createElement('div');
            this.maskDivEl.id = 'screenshot-mask';
            this.maskDivEl.className = 'hide screenshot-cursor';
            this.maskDivEl.style.setProperty('--instant-apps-screenshot-mask-background', this.maskBackground);
            this.maskDivEl.style.setProperty('--instant-apps-screenshot-mask-border', this.maskBorder);
            this.screenshotStyle = document.createElement('style');
            this.screenshotStyle.innerHTML = screenshotStyling;
            this.view.container.append(this.screenshotStyle);
            this.view.container.append(this.maskDivEl);
        }
    }
    screenshotReturn() {
        this.removeScreenshotElements();
        this.exportIsLoading = false;
        this.screenshot = null;
    }
    setMapAreaOnClick() {
        if (this.view == null)
            return;
        this.exportIsLoading = true;
        this.createMaskDiv();
        this.createScreenshot();
        this.view.container.classList.add('screenshot-cursor', 'relative');
        this.view.addHandles(this.view.on('drag', async (event) => {
            if (this.view == null)
                return;
            event.stopPropagation();
            if (event.action !== 'end') {
                this.updateMaskSize(event);
            }
            else {
                this.maskScreenshot();
            }
        }), dragHandlerName);
    }
    updateMaskSize(event) {
        if (this.view != null) {
            const xmin = this.clamp(Math.min(event.origin.x, event.x), 0, this.view.width);
            const xmax = this.clamp(Math.max(event.origin.x, event.x), 0, this.view.width);
            const ymin = this.clamp(Math.min(event.origin.y, event.y), 0, this.view.height);
            const ymax = this.clamp(Math.max(event.origin.y, event.y), 0, this.view.height);
            this.area = {
                x: xmin,
                y: ymin,
                width: xmax - xmin,
                height: ymax - ymin,
            };
            this.setMaskPosition(this.area);
        }
    }
    maskScreenshot() {
        var _a;
        if (this.view != null && this.area != null) {
            this.view.removeHandles(dragHandlerName);
            const height = this.area.height;
            const width = this.area.width;
            if (this.showScaleBar) {
                const moveSBUnit = this.view.width > 1000 && this.view.width * 0.75 < width;
                (_a = this.scaleBarContainerEl) === null || _a === void 0 ? void 0 : _a.classList.toggle('instant-apps-export-print__scale-bar-container--position', moveSBUnit);
            }
            this.view.takeScreenshot({ area: this.area, width: width * 2, height: height * 2, format: 'jpg' }).then(screenshot => {
                var _a;
                this.screenshot = screenshot;
                this.showPreview();
                (_a = this.view) === null || _a === void 0 ? void 0 : _a.container.classList.remove('screenshot-cursor');
                this.setMaskPosition(null);
            });
        }
    }
    setMaskPosition(area) {
        if (area != null) {
            this.maskDivEl.classList.remove('hide');
            this.maskDivEl.style.left = `${area.x}px`;
            this.maskDivEl.style.top = `${area.y}px`;
            this.maskDivEl.style.width = `${area.width}px`;
            this.maskDivEl.style.height = `${area.height}px`;
        }
        else {
            this.maskDivEl.remove();
        }
    }
    clamp(value, from, to) {
        return value < from ? from : value > to ? to : value;
    }
    showPreview() {
        this.screenshotPreview.classList.remove('hide');
        if (this.screenshotImg != null && this.screenshot != null) {
            this.screenshotImg.src = this.screenshot.dataUrl;
        }
    }
    handleScaleBarSize() {
        var _a;
        if (this.showScaleBar && ((_a = this.view) === null || _a === void 0 ? void 0 : _a.type) === '2d') {
            if (this.scaleBarContainerEl != null) {
                const topBar = this.scaleBarContainerEl.querySelector('.esri-scale-bar__line--top');
                const bottomBar = this.scaleBarContainerEl.querySelector('.esri-scale-bar__line--bottom');
                this.setScalebarWidth(topBar, 'top');
                this.setScalebarWidth(bottomBar, 'bottom');
            }
        }
    }
    setScalebarWidth(bar, position) {
        var _a;
        if (bar != null && this.screenshot != null) {
            const width = this.screenshot.data.width / 2;
            const barWidth = Number(bar.style.width.replace('px', ''));
            const widthPercentage = (barWidth / width) * 100;
            (_a = this.scaleBarContainerEl) === null || _a === void 0 ? void 0 : _a.style.setProperty(`--instant-apps-scale-bar-${position}`, `${widthPercentage}%`);
        }
    }
    removeScreenshotElements() {
        var _a, _b;
        (_a = this.screenshotPreview) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = this.screenshotStyle) === null || _b === void 0 ? void 0 : _b.remove();
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "includeMap": ["watchIncludeMap"],
        "view": ["watchView"]
    }; }
};
InstantAppsExport.style = InstantAppsExportStyle0;

export { InstantAppsExport as instant_apps_export };
