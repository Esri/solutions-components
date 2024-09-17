/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { l as loadModules } from './loadModules2.js';
import { b as getLocaleComponentStrings } from './locale3.js';
import { w as widthBreakpoints } from './breakpoints.js';
import { d as defineCustomElement$5 } from './action.js';
import { d as defineCustomElement$4 } from './icon.js';
import { d as defineCustomElement$3 } from './loader.js';
import { d as defineCustomElement$2 } from './progress.js';

const instantAppsScoreboardCss = ":host{display:block;--instant-apps-scoreboard-background-color:var(--calcite-color-foreground-1);--instant-apps-scoreboard-text-color:var(--calcite-color-text-1);--instant-apps-scoreboard-mobile-position-bottom:0;background-color:var(--instant-apps-scoreboard-background-color);color:var(--instant-apps-scoreboard-text-color)}:host .instant-apps-scoreboard{box-sizing:border-box;border:1px solid var(--calcite-color-border-1);box-shadow:0px 3px 15px rgba(0, 0, 0, 0.2);border-radius:3px}:host .instant-apps-scoreboard calcite-loader{--calcite-loader-padding:1rem}:host .instant-apps-scoreboard__items-container{display:flex}:host .instant-apps-scoreboard__items-container calcite-action{height:100%}:host .instant-apps-scoreboard__items,:host .instant-apps-scoreboard__item{box-sizing:border-box;display:flex}:host .instant-apps-scoreboard__items{list-style-type:none;padding-left:0;margin:0;padding-top:1.75%;padding-bottom:1.75%;width:100%}:host .instant-apps-scoreboard__item{flex-direction:column;justify-content:flex-end;align-items:center;padding:1%}:host .instant-apps-scoreboard__item-label{box-sizing:border-box;line-height:24px;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;word-break:break-word;font-size:1rem;font-weight:400;text-align:center}:host .instant-apps-scoreboard__item-value{display:flex;justify-content:center;align-items:center;min-width:32px;min-height:32px;margin-top:5px;font-size:1.5rem;font-weight:900}:host .instant-apps-scoreboard__item-value-placeholder{display:inline-block;width:32px;height:32px;background-color:var(--calcite-color-foreground-3);border-radius:4px}:host(.instant-apps-scoreboard__position--bottom){bottom:0}:host(.instant-apps-scoreboard__position--bottom) .instant-apps-scoreboard{display:flex;justify-content:center}:host(.instant-apps-scoreboard__position--bottom) .instant-apps-scoreboard__items{display:flex;justify-content:center}:host(.instant-apps-scoreboard__position--bottom) .instant-apps-scoreboard__item{min-width:10vw;vertical-align:top}:host(.instant-apps-scoreboard__position--bottom.instant-apps-scoreboard__mode--floating){left:50%;max-width:calc(100% - 30px);transform:translate(-50%, -15px)}:host(.instant-apps-scoreboard__position--bottom.instant-apps-scoreboard__mode--floating) .instant-apps-scoreboard{min-width:25vw}:host(.instant-apps-scoreboard__position--bottom.instant-apps-scoreboard__mode--pinned){left:unset;bottom:0;transform:unset;width:100%}:host(.instant-apps-scoreboard__position--bottom.instant-apps-scoreboard__mode--pinned) .instant-apps-scoreboard{min-width:unset}:host(.instant-apps-scoreboard__position--bottom.instant-apps-scoreboard__mode--pinned) .instant-apps-scoreboard__items-container{width:100%;justify-content:space-between}:host(.instant-apps-scoreboard__position--side) .instant-apps-scoreboard{display:flex;justify-content:center;align-items:center;width:10vw;overflow-y:auto}:host(.instant-apps-scoreboard__position--side) .instant-apps-scoreboard__items-container{flex-direction:column;height:100%;box-sizing:border-box}:host(.instant-apps-scoreboard__position--side) .instant-apps-scoreboard__items-container calcite-action{height:unset;width:100%}:host(.instant-apps-scoreboard__position--side) .instant-apps-scoreboard__items{flex-direction:column;padding:10px}:host(.instant-apps-scoreboard__position--side) .instant-apps-scoreboard__item{padding-top:0.5vh;padding-bottom:0.5vh}:host(.instant-apps-scoreboard__position--side.instant-apps-scoreboard__mode--floating){top:15px;left:15px;max-height:calc(100% - 30px)}:host(.instant-apps-scoreboard__position--side.instant-apps-scoreboard__mode--floating) .instant-apps-scoreboard{min-width:10vw;min-height:35vh}:host(.instant-apps-scoreboard__position--side.instant-apps-scoreboard__mode--pinned){top:unset;left:unset;transform:unset;height:100%}:host(.instant-apps-scoreboard__position--side.instant-apps-scoreboard__mode--pinned) .instant-apps-scoreboard{height:100%}:host(.instant-apps-scoreboard__position--side.instant-apps-scoreboard__mode--pinned) .instant-apps-scoreboard__items-container{justify-content:space-between}:host(.instant-apps-scoreboard__position--left.instant-apps-scoreboard__mode--floating){left:15px}:host(.instant-apps-scoreboard__position--right.instant-apps-scoreboard__mode--floating){left:unset;right:15px}:host(.instant-apps-scoreboard__position--left.instant-apps-scoreboard__mode--pinned){left:0}:host(.instant-apps-scoreboard__position--right.instant-apps-scoreboard__mode--pinned){left:unset;right:0}@media only screen and (min-width: 992px){:host(.instant-apps-scoreboard__position--bottom.instant-apps-scoreboard__mode--pinned){bottom:var(--instant-apps-scoreboard-mobile-position-bottom)}:host(.instant-apps-scoreboard__position--bottom.instant-apps-scoreboard__mode--pinned) .instant-apps-scoreboard__item{justify-content:center;min-width:unset;flex-grow:1}}";
const InstantAppsScoreboardStyle0 = instantAppsScoreboardCss;

// Constants
const BASE = 'instant-apps-scoreboard';
const ITEM_LIMIT_FALLBACK = 6;
const KEY_PREFIX = `${BASE}--`;
const __BASE__ = `${BASE}__`;
const MOBILE_BREAKPOINT = widthBreakpoints.medium[1];
const CSS = {
    BASE,
    itemsContainer: `${__BASE__}items-container`,
    items: `${__BASE__}items`,
    item: `${__BASE__}item`,
    label: `${__BASE__}item-label`,
    value: `${__BASE__}item-value`,
    valuePlaceholder: `${__BASE__}item-value-placeholder`,
    position: {
        bottom: `${__BASE__}position--bottom`,
        side: `${__BASE__}position--side`,
        left: `${__BASE__}position--left`,
        right: `${__BASE__}position--right`,
    },
    mode: {
        floating: `${__BASE__}mode--floating`,
        pinned: `${__BASE__}mode--pinned`,
    },
};
const InstantAppsScoreboard$1 = /*@__PURE__*/ proxyCustomElement(class InstantAppsScoreboard extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.scoreboardItemsUpdated = createEvent(this, "scoreboardItemsUpdated", 7);
        this.view = undefined;
        this.items = undefined;
        this.position = "bottom" /* Scoreboard.Bottom */;
        this.mode = "floating" /* Scoreboard.Floating */;
        this.itemLimit = 6;
        this.autoDockEnabled = true;
        this.geometry = null;
        this.state = "loading" /* Scoreboard.Loading */;
        this.messages = undefined;
        this.itemIndex = 0;
        this.layers = undefined;
        this.layerViews = undefined;
        this.isMobile = false;
    }
    scoreboardItemsUpdatedHandler() {
        this.scoreboardItemsUpdated.emit(this.items);
    }
    // Watchers
    generateUIDs() {
        // Generates a series of UIDs (unique identifiers) to ensure each item is unique to properly handle comparisons
        this.itemIndex = 0;
        this.items.forEach(this.generateUID());
    }
    async storeLayers() {
        this.state = "calculating" /* Scoreboard.Calculating */;
        await this.view.map.loadAll();
        const layerIds = this.items.map(item => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.layer) === null || _a === void 0 ? void 0 : _a.id; });
        const isNotTable = (layer) => !layer.isTable;
        const isAcceptableLayer = (layer) => layer.type === 'feature' || layer.type === 'scene';
        const notAddedYet = (layer) => layerIds.indexOf(layer.id) > -1;
        const validateLayer = (layer) => isNotTable(layer) && isAcceptableLayer(layer) && notAddedYet(layer);
        this.layers = this.view.map.allLayers.filter(layer => validateLayer(layer));
        this.watchLayerVisibility();
    }
    async storeLayerViews() {
        if (this.layers && this.layers.length > 0) {
            this.layers.forEach(layer => (layer.outFields = ['*']));
            const promises = [];
            this.layers.forEach(layer => {
                const layerToLoad = layer;
                const layerViewToLoad = this.view.whenLayerView(layerToLoad);
                promises.push(layerViewToLoad);
            });
            const settledPromises = await Promise.allSettled(promises);
            const fulfilledPromises = settledPromises.filter(promise => promise.status == 'fulfilled' && promise.value);
            const layerViews = fulfilledPromises.map(fulfilledPromise => fulfilledPromise.value);
            const layerViewUpdatePromises = [];
            layerViews.forEach(layerView => { var _a; return layerViewUpdatePromises.push((_a = this.reactiveUtils) === null || _a === void 0 ? void 0 : _a.whenOnce(() => !layerView.updating)); });
            await Promise.all(layerViewUpdatePromises);
            this.layerViews = new this.Collection([...layerViews]);
        }
    }
    calculateScoreboardItemValuesFromGeometry() {
        this.calculateScoreboardItemValues();
    }
    async calculateScoreboardItemValues() {
        if ((this.layers && this.layers.length === 0) || (this.layerViews && this.layerViews.length === 0))
            return;
        this.state = "calculating" /* Scoreboard.Calculating */;
        const items_temp = [...this.items];
        const queryFeaturePromises = [];
        this.queryStatDefinitions(items_temp, queryFeaturePromises);
        const queryFeaturesRes = await Promise.all(queryFeaturePromises);
        this.handleQueryFeaturesResponses(queryFeaturesRes, items_temp);
        this.items.length = 0;
        items_temp.forEach(item => this.items.push(item));
        this.state = "complete" /* Scoreboard.Complete */;
        this.scoreboardItemsUpdatedHandler();
        this.initStationaryWatcher();
    }
    // Lifecycle methods
    async componentWillLoad() {
        var _a;
        const resizeObesrver = new ResizeObserver(() => {
            this.itemIndex = 0;
            if (this.autoDockEnabled)
                this.isMobile = !!this.checkMobile;
        });
        resizeObesrver.observe((_a = this.el) === null || _a === void 0 ? void 0 : _a.parentElement);
        try {
            this.state = "loading" /* Scoreboard.Loading */;
            await this.initMessages();
        }
        catch (_b) {
            this.state = "disabled" /* Scoreboard.Disabled */;
            return Promise.reject();
        }
        finally {
            if (!this.view || !this.items) {
                this.state = "disabled" /* Scoreboard.Disabled */;
                return Promise.reject();
            }
            else {
                try {
                    await this.initModules();
                    return Promise.resolve();
                }
                catch (_c) {
                    this.state = "disabled" /* Scoreboard.Disabled */;
                    return Promise.reject();
                }
            }
        }
    }
    async componentDidLoad() {
        var _a;
        if (this.state === "disabled" /* Scoreboard.Disabled */)
            return;
        try {
            await ((_a = this.reactiveUtils) === null || _a === void 0 ? void 0 : _a.whenOnce(() => { var _a; return (_a = this.view) === null || _a === void 0 ? void 0 : _a.ready; }));
            this.generateUIDs();
            await this.loadMapResources();
            this.storeLayers();
            this.initViewUpdateWatcher();
        }
        catch (_b) {
            this.state = "disabled" /* Scoreboard.Disabled */;
            console.error(`${BASE}: FAILED TO LOAD MAP RESOURCES`);
        }
    }
    disconnectedCallback() {
        var _a, _b, _c, _d, _e, _f;
        this.state = "disabled" /* Scoreboard.Disabled */;
        this.itemIndex = 0;
        (_a = this.layers) === null || _a === void 0 ? void 0 : _a.removeAll();
        (_b = this.layers) === null || _b === void 0 ? void 0 : _b.destroy();
        this.layers = null;
        (_c = this.layerViews) === null || _c === void 0 ? void 0 : _c.removeAll();
        (_d = this.layerViews) === null || _d === void 0 ? void 0 : _d.destroy();
        this.layerViews = null;
        (_e = this.handles) === null || _e === void 0 ? void 0 : _e.removeAll();
        (_f = this.handles) === null || _f === void 0 ? void 0 : _f.destroy();
        this.handles = null;
    }
    // Initialize
    async initMessages() {
        let messages;
        try {
            const res = await getLocaleComponentStrings(this.el);
            messages = res[0];
            this.messages = Object.assign(Object.assign({}, this.messages), messages);
            return Promise.resolve();
        }
        catch (err) {
            console.error('FAILED TO LOAD MESSAGES');
            Promise.reject();
        }
    }
    async initModules() {
        try {
            const [Handles, reactiveUtils, Collection, intl] = await loadModules(['esri/core/Handles', 'esri/core/reactiveUtils', 'esri/core/Collection', 'esri/intl']);
            // Store modules for future use
            this.reactiveUtils = reactiveUtils;
            this.Collection = Collection;
            this.intl = intl;
            // Instantiate handles and collections
            this.handles = new Handles();
            this.layers = new Collection();
            this.layerViews = new Collection();
            return Promise.resolve();
        }
        catch (err) {
            console.error(err);
            this.state = "disabled" /* Scoreboard.Disabled */;
            return Promise.reject();
        }
    }
    async loadMapResources() {
        const { map } = this.view;
        const webItem = map;
        try {
            await webItem.loadAll();
            return Promise.resolve();
        }
        catch (err) {
            console.error(err);
            this.state = "disabled" /* Scoreboard.Disabled */;
            return Promise.reject();
        }
    }
    generateUID() {
        return (item) => {
            // Generates a random number to be used for radix in Number.toString()
            const randNum = Math.random();
            const randomInt = Math.floor(Math.random() * 10) + 11;
            // Generates a random string of characters - remove redundant '0.';
            const randStr = randNum.toString(randomInt).replace('0.', '');
            const uid = randStr;
            item['uid'] = uid;
        };
    }
    // Start of render methods
    render() {
        var _a, _b;
        const { state } = this;
        const isLoading = state === "loading" /* Scoreboard.Loading */;
        const isCalculating = state === "calculating" /* Scoreboard.Calculating */;
        const isDisabled = state === "disabled" /* Scoreboard.Disabled */;
        const progress = isLoading || isCalculating || ((_a = this.view) === null || _a === void 0 ? void 0 : _a.updating) ? this.renderProgress() : null;
        const positionClass = this.getPositionClass;
        const styleClass = this.getStyleClass;
        return h(Host, { key: '0a4e0bd527aa63498f71650b418da1167c0570c0', class: `${positionClass} ${styleClass}` }, isDisabled ? null : [progress, ((_b = this.items) === null || _b === void 0 ? void 0 : _b.length) > 0 ? this.renderBase() : null]);
    }
    renderBase() {
        return (h("div", { key: "instant-apps-scoreboard-base", class: BASE }, this.renderContent()));
    }
    renderContent() {
        const { state } = this;
        return state === "loading" /* Scoreboard.Loading */ ? this.renderLoader() : state === "calculating" /* Scoreboard.Calculating */ || state === "complete" /* Scoreboard.Complete */ ? this.renderItemsContainer() : null;
    }
    renderItemsContainer() {
        const [previousButton, nextButton] = this.renderPreviousNextButtons();
        return (h("div", { class: CSS.itemsContainer }, previousButton, this.renderItems(), nextButton));
    }
    renderPreviousNextButtons() {
        var _a, _b, _c;
        const itemLimit = this.getItemLimit();
        const isBelowOrAtLimit = ((_a = this.items.filter(item => item.visible)) === null || _a === void 0 ? void 0 : _a.length) <= itemLimit;
        const isBeginning = this.itemIndex === 0;
        const isEnd = this.isEnd;
        const isBottom = this.isMobile ? true : this.position === "bottom" /* Scoreboard.Bottom */;
        const iconPosition = isBottom ? "start" /* ScoreboardAlignment.Start */ : "center" /* ScoreboardAlignment.Center */;
        const previous = isBottom ? "chevron-left" /* ScoreboardIcons.Left */ : "chevron-up" /* ScoreboardIcons.Up */;
        const next = isBottom ? "chevron-right" /* ScoreboardIcons.Right */ : "chevron-down" /* ScoreboardIcons.Down */;
        const iconType = { previous, next };
        const previousIcon = isBeginning || isBelowOrAtLimit ? "blank" /* ScoreboardIcons.Blank */ : iconType.previous;
        const nextIcon = isEnd || isBelowOrAtLimit ? "blank" /* ScoreboardIcons.Blank */ : iconType.next;
        const isDisabled = { previous: isBeginning || isBelowOrAtLimit, next: isEnd || isBelowOrAtLimit };
        const appearance = "transparent" /* ScoreboardAppearance.Transparent */;
        const scale = this.isMobile ? "s" /* ScoreboardScale.Small */ : "l" /* ScoreboardScale.Large */;
        const t9n = {
            previous: (_b = this.messages) === null || _b === void 0 ? void 0 : _b.previous,
            next: (_c = this.messages) === null || _c === void 0 ? void 0 : _c.next,
        };
        return [
            h("calcite-action", { onClick: this.previousItem.bind(this), icon: previousIcon, disabled: isDisabled.previous, alignment: iconPosition, scale: scale, appearance: appearance, text: t9n.previous, label: t9n.previous }),
            h("calcite-action", { onClick: this.nextItem.bind(this), icon: nextIcon, disabled: isDisabled.next, alignment: iconPosition, scale: scale, appearance: appearance, text: t9n.next, label: t9n.next }),
        ];
    }
    renderItems() {
        const { items } = CSS;
        const itemToDisplay = this.getItemsToDisplay;
        const scoreboardItems = itemToDisplay.map(item => this.renderItem(item));
        return h("ul", { class: items }, scoreboardItems);
    }
    renderItem(scoreboardItem) {
        const { label } = scoreboardItem;
        return (h("li", { class: CSS.item }, h("span", { class: CSS.label, title: label }, label), this.renderValue(scoreboardItem)));
    }
    renderValue(scoreboardItem) {
        var _a, _b, _c;
        const { displayValue } = scoreboardItem;
        const isCalculating = this.state === "calculating" /* Scoreboard.Calculating */;
        const isDisabled = this.state === "disabled" /* Scoreboard.Disabled */;
        const showPlaceholder = displayValue === undefined && isCalculating;
        const valueToDisplay = displayValue ? displayValue : (_a = this.messages) === null || _a === void 0 ? void 0 : _a.NA;
        const layer = (_b = this.layers) === null || _b === void 0 ? void 0 : _b.find(layer => { var _a; return ((_a = scoreboardItem === null || scoreboardItem === void 0 ? void 0 : scoreboardItem.layer) === null || _a === void 0 ? void 0 : _a.id) === layer.id; });
        const isNotVisible = !(layer === null || layer === void 0 ? void 0 : layer.visible);
        const content = showPlaceholder ? (this.renderValuePlaceholder()) : !isDisabled ? (isNotVisible ? (h("calcite-icon", { icon: "view-hide", scale: "l", title: (_c = this.messages) === null || _c === void 0 ? void 0 : _c.layerVisibilityOff })) : (valueToDisplay)) : ('');
        return h("span", { class: CSS.value }, content);
    }
    renderValuePlaceholder() {
        return h("span", { class: CSS.valuePlaceholder });
    }
    renderProgress() {
        const key = `${KEY_PREFIX}calcite-`;
        return h("calcite-progress", { key: `${key}progress`, type: "indeterminate" });
    }
    renderLoader() {
        var _a;
        const key = `${KEY_PREFIX}calcite-`;
        const loading = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.loading;
        return h("calcite-loader", { key: `${key}loader`, label: loading, text: loading, scale: "m" });
    }
    // End of render methods
    // Getters
    get getPositionClass() {
        const { bottom, left, right, side } = CSS.position;
        const leftRight = `${this.position === "left" /* Scoreboard.Left */ ? left : right} ${side}`;
        return this.isMobile || this.position === "bottom" /* Scoreboard.Bottom */ ? bottom : leftRight;
    }
    get getStyleClass() {
        const { floating, pinned } = CSS.mode;
        return this.isMobile ? pinned : this.mode === "floating" /* Scoreboard.Floating */ ? floating : pinned;
    }
    get checkMobile() {
        var _a, _b;
        const hostElParentWidth = (_b = (_a = this.el) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.offsetWidth;
        return !isNaN(hostElParentWidth) && hostElParentWidth > 0 ? hostElParentWidth < MOBILE_BREAKPOINT : false;
    }
    get getItemsToDisplay() {
        const itemLimit = this.getItemLimit();
        return this.items.filter(item => item.visible).slice(this.itemIndex, itemLimit + this.itemIndex);
    }
    get isEnd() {
        const itemLimit = this.getItemLimit();
        const lastItems = this.items.slice(this.items.length - itemLimit);
        const uidsOfLast = lastItems.map(item => item['uid']);
        const uidsOfCurrent = this.items.slice(this.itemIndex, this.itemIndex + itemLimit).map(item => item['uid']);
        return uidsOfLast.every((val, index) => val === uidsOfCurrent[index]);
    }
    // UI interactions
    previousItem() {
        this.itemIndex = this.itemIndex - 1;
    }
    nextItem() {
        this.itemIndex = this.itemIndex + 1;
    }
    // Query statistic definitions (FeatreLayerView/SceneLayerView.queryFeatures())
    queryStatDefinitions(items, queryFeaturePromises) {
        const getStatsDefinition = (item) => {
            const { field, operation } = item;
            const onStatisticField = field;
            const outStatisticFieldName = `${field}_${operation}`;
            const statisticType = operation;
            return { onStatisticField, outStatisticFieldName, statisticType };
        };
        const getStatDefinitionQuery = (layerView, statDefinition) => {
            var _a, _b, _c, _d, _e;
            const query = layerView.createQuery();
            const outStatistics = [statDefinition];
            const geometry = this.geometry ? this.geometry : this.view.extent;
            query.outStatistics = outStatistics;
            query.geometry = geometry;
            const timeExtent = (_e = (_b = (_a = layerView === null || layerView === void 0 ? void 0 : layerView.filter) === null || _a === void 0 ? void 0 : _a.timeExtent) !== null && _b !== void 0 ? _b : (_d = (_c = layerView === null || layerView === void 0 ? void 0 : layerView.featureEffect) === null || _c === void 0 ? void 0 : _c.filter) === null || _d === void 0 ? void 0 : _d.timeExtent) !== null && _e !== void 0 ? _e : null;
            if (timeExtent)
                query.timeExtent = timeExtent;
            return query;
        };
        const queryFeaturesForItem_LayerView = () => {
            return async (item) => {
                var _a;
                const layerView = (_a = this.layerViews) === null || _a === void 0 ? void 0 : _a.find(layerView => { var _a; return layerView.layer.id === ((_a = item === null || item === void 0 ? void 0 : item.layer) === null || _a === void 0 ? void 0 : _a.id); });
                if (!layerView)
                    return;
                const statDefinition = getStatsDefinition(item);
                const query = getStatDefinitionQuery(layerView, statDefinition);
                const queryFeaturesRes = layerView.queryFeatures(query);
                queryFeaturePromises.push(queryFeaturesRes);
            };
        };
        items.forEach(queryFeaturesForItem_LayerView());
    }
    handleQueryFeaturesResponses(queryFeaturesRes, items) {
        const getValue = (stat) => {
            const features = stat.features;
            const feature = features[0];
            const { attributes } = feature;
            const attrValues = Object.values(attributes);
            return attrValues[0];
        };
        const getNumberFormatOptions = () => {
            const notation = 'compact';
            const compactDisplay = 'short';
            return { notation, compactDisplay };
        };
        const updateItemValue = () => {
            return (stat, statIndex) => {
                const value = getValue(stat);
                const numberFormatOptions = getNumberFormatOptions();
                const isNotNull = value !== null;
                const formattedNumber = isNotNull ? this.intl.formatNumber(value, numberFormatOptions) : null;
                const displayValue = isNotNull ? `${formattedNumber}` : '';
                items[statIndex].displayValue = displayValue;
                items[statIndex].value = value;
            };
        };
        queryFeaturesRes.forEach(updateItemValue());
    }
    initStationaryWatcher() {
        var _a, _b;
        const whenOnceConfig = { once: true, initial: true };
        const isNotInteractingWatcher = () => {
            var _a;
            return (_a = this.reactiveUtils) === null || _a === void 0 ? void 0 : _a.when(() => { var _a; return !((_a = this.view) === null || _a === void 0 ? void 0 : _a.interacting); }, () => this.calculateScoreboardItemValues(), whenOnceConfig);
        };
        const stationaryWatcher = () => {
            var _a;
            return (_a = this.reactiveUtils) === null || _a === void 0 ? void 0 : _a.when(() => { var _a; return (_a = this.view) === null || _a === void 0 ? void 0 : _a.stationary; }, () => isNotInteractingWatcher());
        };
        const stationaryWatcherKey = 'stationary-watcher-key';
        if ((_a = this.handles) === null || _a === void 0 ? void 0 : _a.has(stationaryWatcherKey))
            this.handles.remove(stationaryWatcherKey);
        (_b = this.handles) === null || _b === void 0 ? void 0 : _b.add(stationaryWatcher(), stationaryWatcherKey);
    }
    initViewUpdateWatcher() {
        return this.reactiveUtils.watch(() => { var _a; return (_a = this.view) === null || _a === void 0 ? void 0 : _a.updating; }, () => {
            this.reactiveUtils.when(() => { var _a; return !((_a = this.view) === null || _a === void 0 ? void 0 : _a.updating); }, () => this.calculateScoreboardItemValues(), { once: true, initial: true });
        }, { initial: true });
    }
    watchLayerVisibility() {
        var _a, _b;
        if (!this.layers)
            return;
        const visibilityWatcherKey = 'visbilityWatcherKey';
        (_a = this.handles) === null || _a === void 0 ? void 0 : _a.remove(visibilityWatcherKey);
        const visibilityWatchers = [];
        const watchVisbilityForLayer = (layer) => {
            const activateScoreboardItemCalculation = async () => {
                const layerView = await this.view.whenLayerView(layer);
                await this.reactiveUtils.whenOnce(() => (layerView === null || layerView === void 0 ? void 0 : layerView.updating) === false);
                this.calculateScoreboardItemValues();
            };
            const watcher = this.reactiveUtils.watch(() => layer === null || layer === void 0 ? void 0 : layer.visible, async () => activateScoreboardItemCalculation());
            visibilityWatchers.push(watcher);
        };
        this.layers.forEach(watchVisbilityForLayer);
        (_b = this.handles) === null || _b === void 0 ? void 0 : _b.add([...visibilityWatchers], visibilityWatcherKey);
    }
    getItemLimit() {
        return this.itemLimit < 2 || this.itemLimit > 6 ? ITEM_LIMIT_FALLBACK : this.itemLimit;
    }
    get el() { return this; }
    static get watchers() { return {
        "items": ["generateUIDs", "storeLayers"],
        "layers": ["storeLayerViews"],
        "geometry": ["calculateScoreboardItemValuesFromGeometry"],
        "layerViews": ["calculateScoreboardItemValues"]
    }; }
    static get style() { return InstantAppsScoreboardStyle0; }
}, [1, "instant-apps-scoreboard", {
        "view": [16],
        "items": [16],
        "position": [1],
        "mode": [1],
        "itemLimit": [2, "item-limit"],
        "autoDockEnabled": [4, "auto-dock-enabled"],
        "geometry": [1040],
        "state": [32],
        "messages": [32],
        "itemIndex": [32],
        "layers": [32],
        "layerViews": [32],
        "isMobile": [32]
    }, undefined, {
        "items": ["generateUIDs", "storeLayers"],
        "layers": ["storeLayerViews"],
        "geometry": ["calculateScoreboardItemValuesFromGeometry"],
        "layerViews": ["calculateScoreboardItemValues"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-scoreboard", "calcite-action", "calcite-icon", "calcite-loader", "calcite-progress"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-scoreboard":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsScoreboard$1);
            }
            break;
        case "calcite-action":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "calcite-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "calcite-loader":
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

const InstantAppsScoreboard = InstantAppsScoreboard$1;
const defineCustomElement = defineCustomElement$1;

export { InstantAppsScoreboard, defineCustomElement };
