/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, h, g as getElement, H as Host } from './index-904bc599.js';
import { g as getFontFamily } from './styles-b3492d9f.js';

var AlignmentPositions;
(function (AlignmentPositions) {
    AlignmentPositions["TopLeft"] = "top-left";
    AlignmentPositions["TopCenter"] = "top-center";
    AlignmentPositions["TopRight"] = "top-right";
    AlignmentPositions["CenterLeft"] = "center-left";
    AlignmentPositions["Center"] = "center";
    AlignmentPositions["CenterRight"] = "center-right";
    AlignmentPositions["BottomLeft"] = "bottom-left";
    AlignmentPositions["BottomCenter"] = "bottom-center";
    AlignmentPositions["BottomRight"] = "bottom-right";
})(AlignmentPositions || (AlignmentPositions = {}));

const instantAppsLandingPageCss = ":host{--instant-apps-landing-page-background-color:var(--calcite-color-brand);--instant-apps-landing-page-text-color:var(--calcite-color-text-inverse);--instant-apps-landing-page-entry-button-color:var(--calcite-color-brand);--instant-apps-landing-page-title-text-font-size:var(--calcite-font-size-6);--instant-apps-landing-page-subtitle-text-font-size:var(--calcite-font-size-3);--instant-apps-landing-page-description-text-font-size:var(--calcite-font-size-0);--instant-apps-landing-page-icon-image-scale--s:100px;--instant-apps-landing-page-icon-image-scale--m:250px;--instant-apps-landing-page-icon-image-scale--l:500px;--instant-apps-landing-page-entry-button-margin:0}:host .instant-apps-landing-page{box-sizing:border-box;position:absolute;top:0;left:0;z-index:9000;display:flex;flex-direction:column;width:100%;height:100%;padding:2.5%;transition:top 0.5s ease-in-out;background-color:var(--instant-apps-landing-page-background-color);color:var(--instant-apps-landing-page-text-color)}:host .instant-apps-landing-page__title-text{color:var(--instant-apps-landing-page-text-color);font-size:var(--instant-apps-landing-page-title-text-font-size);margin:0}:host .instant-apps-landing-page__subtitle-text{font-weight:var(--calcite-font-weight-medium);font-size:var(--instant-apps-landing-page-subtitle-text-font-size);text-align:center}:host .instant-apps-landing-page__description-text{font-size:var(--instant-apps-landing-page-description-text-font-size);width:50%;min-width:250px}:host .instant-apps-landing-page__title-text,:host .instant-apps-landing-page__subtitle-text{text-shadow:0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1), 0px 18px 23px rgba(0, 0, 0, 0.1)}:host .instant-apps-landing-page__icon-image{margin-bottom:5px;max-width:50%}:host .instant-apps-landing-page__icon-image-scale--s{width:100px}:host .instant-apps-landing-page__icon-image-scale--m{width:250px}:host .instant-apps-landing-page__icon-image-scale--l{width:500px}:host .instant-apps-landing-page__button-container{display:flex}:host .instant-apps-landing-page__button-container .instant-apps-landing-page__entry-button{margin:var(--instant-apps-landing-page-entry-button-margin)}:host .instant-apps-landing-page__entry-button{--calcite-color-brand:var(--instant-apps-landing-page-entry-button-color);--calcite-color-brand-hover:var(--instant-apps-landing-page-entry-button-color);--calcite-color-brand-press:var(--instant-apps-landing-page-entry-button-color)}:host .instant-apps-landing-page__remove-transition{transition:none}:host .instant-apps-landing-page__remove-padding{padding:0}:host .instant-apps-landing-page--closed-no-transition{display:none}:host .instant-apps-landing-page--closed{top:-100%}:host .instant-apps-landing-page__alignment--top-center{justify-content:flex-start;align-items:center}:host .instant-apps-landing-page__alignment--top-center .instant-apps-landing-page__content-container{display:flex;flex-direction:column;align-items:center;justify-content:center}:host .instant-apps-landing-page__alignment--top-center .instant-apps-landing-page__description-text{text-align:center}:host .instant-apps-landing-page__alignment--center{justify-content:center;align-items:center}:host .instant-apps-landing-page__alignment--center .instant-apps-landing-page__content-container{display:flex;flex-direction:column;align-items:center}:host .instant-apps-landing-page__alignment--center .instant-apps-landing-page__description-text{text-align:center}:host .instant-apps-landing-page__alignment--bottom-center{justify-content:flex-end;align-items:center}:host .instant-apps-landing-page__alignment--bottom-center .instant-apps-landing-page__content-container{display:flex;flex-direction:column;align-items:center}:host .instant-apps-landing-page__alignment--bottom-center .instant-apps-landing-page__description-text{text-align:center}:host .instant-apps-landing-page__alignment--top-left{justify-content:flex-start;align-items:flex-start}:host .instant-apps-landing-page__alignment--top-left .instant-apps-landing-page__description-text{text-align:left}:host .instant-apps-landing-page__alignment--center-left{justify-content:center;align-items:flex-start}:host .instant-apps-landing-page__alignment--center-left .instant-apps-landing-page__description-text{text-align:left}:host .instant-apps-landing-page__alignment--bottom-left{justify-content:flex-end;align-items:flex-start}:host .instant-apps-landing-page__alignment--bottom-left .instant-apps-landing-page__description-text{text-align:left}:host .instant-apps-landing-page__alignment--top-right{justify-content:flex-start;align-items:flex-end}:host .instant-apps-landing-page__alignment--top-right .instant-apps-landing-page__content-container{display:flex;flex-direction:column;align-items:flex-end}:host .instant-apps-landing-page__alignment--top-right .instant-apps-landing-page__description-text{text-align:right}:host .instant-apps-landing-page__alignment--center-right{justify-content:center;align-items:flex-end}:host .instant-apps-landing-page__alignment--center-right .instant-apps-landing-page__content-container{display:flex;flex-direction:column;align-items:flex-end}:host .instant-apps-landing-page__alignment--center-right .instant-apps-landing-page__description-text{text-align:right}:host .instant-apps-landing-page__alignment--bottom-right{justify-content:flex-end;align-items:flex-end}:host .instant-apps-landing-page__alignment--bottom-right .instant-apps-landing-page__content-container{display:flex;flex-direction:column;align-items:flex-end}:host .instant-apps-landing-page__alignment--bottom-right .instant-apps-landing-page__description-text{text-align:right}:host instant-apps-sign-in{width:50%}@media only screen and (max-width: 768px){:host .instant-apps-landing-page__icon-image{max-width:70%;margin-bottom:20px}:host .instant-apps-landing-page__description-text{width:80%}:host .instant-apps-landing-page__title-text{font-size:var(--calcite-font-size-3)}:host .instant-apps-landing-page__subtitle-text{font-size:var(--calcite-font-size-0)}:host .instant-apps-landing-page__content-container{display:flex;flex-direction:column;align-items:center;margin-top:auto}:host .instant-apps-landing-page__button-container{display:flex;flex-direction:column;width:100%;margin-top:auto}:host .instant-apps-landing-page__button-container .instant-apps-landing-page__entry-button{width:100%;margin-right:unset;margin-bottom:10px}}@media only screen and (max-width: 896px) and (orientation: landscape){:host .instant-apps-landing-page__icon-image{max-width:25%}}";
const InstantAppsLandingPageStyle0 = instantAppsLandingPageCss;

const CSS = {
    BASE: 'instant-apps-landing-page',
    titleText: 'instant-apps-landing-page__title-text',
    subtitleText: 'instant-apps-landing-page__subtitle-text',
    descriptionText: 'instant-apps-landing-page__description-text',
    closed: 'instant-apps-landing-page--closed',
    closedNoTransition: 'instant-apps-landing-page--closed-no-transition',
    iconImage: 'instant-apps-landing-page__icon-image',
    removeTransition: 'instant-apps-landing-page__remove-transition',
    removePadding: 'instant-apps-landing-page__remove-padding',
    alignment: 'instant-apps-landing-page__alignment--',
    entryButton: 'instant-apps-landing-page__entry-button',
    contentContainer: 'instant-apps-landing-page__content-container',
    buttonContainer: 'instant-apps-landing-page__button-container',
    iconImageScale: {
        s: ' instant-apps-landing-page__icon-image-scale--s',
        m: ' instant-apps-landing-page__icon-image-scale--m',
        l: ' instant-apps-landing-page__icon-image-scale--l',
    },
};
const InstantAppsLandingPage = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.landingPageOpen = createEvent(this, "landingPageOpen", 7);
        this.landingPageClose = createEvent(this, "landingPageClose", 7);
        this.titleText = undefined;
        this.subtitleText = undefined;
        this.descriptionText = undefined;
        this.entryButtonText = undefined;
        this.iconImage = undefined;
        this.iconImageScale = 'm';
        this.iconImageAltText = undefined;
        this.alignment = AlignmentPositions.Center;
        this.disableTransition = true;
        this.backgroundImageSrc = undefined;
        this.open = true;
        this.entryButtonScale = 'l';
        this.fontFamily = 'var(--calcite-sans-family);';
        this.enableSignIn = undefined;
        this.portal = undefined;
        this.oauthappid = undefined;
    }
    emitToggleEvent() {
        if (this.open) {
            this.landingPageOpen.emit();
        }
        else {
            this.landingPageClose.emit();
        }
    }
    componentWillLoad() {
        if (this.enableSignIn) {
            const signInTime = localStorage.getItem('signing-in') ? new Date(Number(localStorage.getItem('signing-in'))) : null;
            if (signInTime != null) {
                const minuteLimit = 2;
                if ((Date.now() - signInTime.getTime()) / (60 * 1000) < minuteLimit) {
                    this.open = false;
                }
                localStorage.removeItem('signing-in');
            }
        }
    }
    render() {
        const content = this.renderLandingPageContent();
        return h(Host, { key: 'f12e6b4ea673c94e8979d82809984b23e6bd6781' }, content);
    }
    renderLandingPageContent() {
        const closed = !this.open ? (this.disableTransition ? ` ${CSS.closedNoTransition}` : ` ${CSS.closed}`) : '';
        const alignmentClass = this.getAlignmentClass();
        const removeTransition = this.disableTransition ? ` ${CSS.removeTransition}` : '';
        const style = this.getContentStyle();
        return (h("div", { style: style, class: `${CSS.BASE}${alignmentClass}${closed}${removeTransition}` }, h("div", { class: CSS.contentContainer }, this.renderIconImage(), this.renderTitleText(), this.renderSubtitleText(), this.renderDescriptionText()), this.renderEntryButtonContainer()));
    }
    renderEntryButtonContainer() {
        return this.enableSignIn ? (this.renderLandingPageSignIn()) : (h("div", { class: CSS.buttonContainer }, this.renderEntryButton(), h("slot", { name: "secondary-action" })));
    }
    renderLandingPageSignIn() {
        return (h("instant-apps-sign-in", { type: "landingPage", landingPage: true, portal: this.portal, oauthappid: this.oauthappid, titleText: this.titleText, subtitleText: this.subtitleText, descriptionText: this.descriptionText, closeLandingPage: this.closeLandingPage.bind(this) }));
    }
    renderIconImage() {
        return this.iconImage ? h("img", { class: `${CSS.iconImage}${this.getIconImageScale()}`, src: this.iconImage, alt: this.iconImageAltText }) : null;
    }
    renderTitleText() {
        return h("h1", { class: CSS.titleText }, this.titleText);
    }
    renderSubtitleText() {
        return h("span", { class: CSS.subtitleText }, this.subtitleText);
    }
    renderDescriptionText() {
        return h("p", { class: CSS.descriptionText }, this.descriptionText);
    }
    renderEntryButton() {
        return (h("calcite-button", { class: CSS.entryButton, onClick: this.closeLandingPage.bind(this), scale: this.entryButtonScale, appearance: "outline-fill" }, this.entryButtonText ? this.entryButtonText : 'Enter'));
    }
    closeLandingPage() {
        this.open = false;
    }
    getAlignmentClass() {
        return ` ${CSS.alignment}${this.alignment}`;
    }
    getIconImageScale() {
        const { iconImageScale } = this;
        const { s, m, l } = CSS.iconImageScale;
        return iconImageScale === 'l' ? l : iconImageScale === 's' ? s : m;
    }
    getContentStyle() {
        const fontFamily = getFontFamily(this.fontFamily);
        return this.backgroundImageSrc
            ? {
                fontFamily,
                backgroundSize: 'cover',
                backgroundImage: `url("${this.backgroundImageSrc}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }
            : { fontFamily };
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "open": ["emitToggleEvent"]
    }; }
};
InstantAppsLandingPage.style = InstantAppsLandingPageStyle0;

export { InstantAppsLandingPage as instant_apps_landing_page };
