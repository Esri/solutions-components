/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, g as getElement, h, H as Host } from './p-4e6eb06e.js';
import { g as getLocaleComponentStrings } from './p-f4aadb3b.js';
import './p-0a24ad5f.js';
import './p-d4056c1c.js';

function shouldDisableTracking(options = {}) {
    const { disabled, portal } = options;
    if (disabled || (portal === null || portal === void 0 ? void 0 : portal.eueiEnabled) === false) {
        return true;
    }
    if (!portal || hasEueiEnabledAndIsMemberOfOrg(portal) || isRegisteredUserWithoutOrgInUSA(portal) || isAnonymousUserInUSA(portal)) {
        return false;
    }
    return true;
}
function hasEueiEnabledAndIsMemberOfOrg(portal) {
    return portal.eueiEnabled && portal.user && portal.user.orgId === portal.id;
}
function isRegisteredUserWithoutOrgInUSA(portal) {
    return portal.user && !portal.user.orgId && portal.ipCntryCode === 'US';
}
function isAnonymousUserInUSA(portal) {
    return !portal.user && portal.ipCntryCode === 'US';
}

const storage = {
    storage: {},
    memory: true,
    get(key) {
        let stored;
        try {
            stored =
                (window.localStorage && window.localStorage.getItem(key)) ||
                    this.storage[key];
        }
        catch (e) {
            stored = this.storage[key];
        }
        if (stored) {
            try {
                return JSON.parse(stored);
            }
            catch (e) {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    },
    set(key, value) {
        // handle Safari private mode (setItem is not allowed)
        const valueToString = JSON.stringify(value);
        try {
            window.localStorage.setItem(key, valueToString);
        }
        catch (e) {
            if (!this.memory) {
                console.error('setting local storage failed, falling back to in-memory storage');
                this.memory = true;
            }
            this.storage[key] = value;
        }
    },
    delete(key) {
        try {
            window.localStorage.removeItem(key);
        }
        catch (e) {
            if (!this.memory) {
                console.error('setting local storage failed, falling back to in-memory storage');
                this.memory = true;
            }
            delete this.storage[key];
        }
    },
};

const ESRI_TELEMETRY_DATA_ATTRIBUTE = 'esri-telemetry';
function injectScriptElementAsync(attributes) {
    const onloadPromise = new Promise((resolve, reject) => {
        attributes.onload = resolve;
        attributes.onerror = reject;
        const script = injectScriptElement(attributes);
        if (!script || attributes.body) {
            // this is for the case where the script is already loaded or it has a body instead of a src
            resolve();
        }
    });
    return onloadPromise;
}
function scriptExists(attributes) {
    const { id, dataAttribute } = attributes;
    return !!document.getElementById(id) || !!document.querySelector(`[data-${ESRI_TELEMETRY_DATA_ATTRIBUTE}="${dataAttribute}"]`);
}
function injectScriptElement(attributes) {
    const { body, src, id, dataAttribute, section = 'body', type = 'text/javascript', async = false, defer = false, onload, onerror } = attributes;
    if (typeof window === 'undefined') {
        throw new WindowUndefinedError('Window is undefined: Cannot add script element.');
    }
    if (scriptExists(attributes)) {
        console.log(`script (${id || dataAttribute}) is already present, skipping`);
        return;
    }
    const scriptElement = createScriptElementWithAttributes({
        id,
        dataAttribute,
        type,
        async,
        defer,
        body,
        src,
        onload,
        onerror
    });
    return section === 'body'
        ? document.body.appendChild(scriptElement)
        : document.head.appendChild(scriptElement);
}
class WindowUndefinedError extends Error {
}
function createScriptElementWithAttributes({ id, dataAttribute, type, async, defer, body, src, onload, onerror }) {
    const scriptElement = document.createElement('script');
    if (id) {
        scriptElement.id = id;
    }
    if (dataAttribute) {
        scriptElement.setAttribute(`data-${ESRI_TELEMETRY_DATA_ATTRIBUTE}`, dataAttribute);
    }
    src && (scriptElement.src = src);
    body && (scriptElement.innerText = body);
    scriptElement.type = type;
    scriptElement.async = async;
    scriptElement.defer = defer;
    onload && (scriptElement.onload = onload);
    onerror && (scriptElement.onerror = onerror);
    return scriptElement;
}

function createScriptTags(scripts) {
    return scripts.map(scriptObj => {
        const attrs = [];
        ['src', 'id', 'dataAttribute', 'type'].forEach(attr => {
            let attrName = attr;
            if (attr === 'dataAttribute') {
                attrName = 'data-esri-telemetry';
            }
            if (scriptObj[attr]) {
                attrs.push(`${attrName}="${scriptObj[attr]}"`);
            }
        });
        ['async', 'defer'].forEach(attr => {
            if (scriptObj[attr]) {
                attrs.push(`${attr}`);
            }
        });
        return `<script ${attrs.join(' ')}>${scriptObj.body ? scriptObj.body : ''}</script>`;
    }).join('');
}

const INTERNAL_ORGS = [
    'esri.com',
    'esriuk.com',
    'esri.de',
    'esri.ca',
    'esrifrance.fr',
    'esri.nl',
    'esri-portugal.pt',
    'esribulgaria.com',
    'esri.fi',
    'esri.kr',
    'esrimalaysia.com.my',
    'esri.es',
    'esriaustralia.com.au',
    'esri-southafrica.com',
    'esri.cl',
    'esrichina.com.cn',
    'esri.co',
    'esriturkey.com.tr',
    'geodata.no',
    'esriitalia.it',
    'esri.pl',
];
/**
 * Telemetry class
 */
class Telemetry {
    constructor(options) {
        var _a, _b, _c;
        this.trackers = [];
        this.options = options;
        this.debug = options.debug;
        this.suppressDisabledWarnings = options.suppressDisabledWarnings;
        this.disabled = shouldDisableTracking(options);
        this.logger = options.logger || console;
        if (this.disabled && !this.suppressDisabledWarnings) {
            this.logger.info('Telemetry Disabled');
        }
        const user = ((_a = options.portal) === null || _a === void 0 ? void 0 : _a.user) || options.user;
        if (user) {
            this.setUser(user, (_c = (_b = options.portal) === null || _b === void 0 ? void 0 : _b.subscriptionInfo) === null || _c === void 0 ? void 0 : _c.type);
        }
        if (!this.disabled) {
            this.initializeTrackers();
        }
    }
    initializeTrackers() {
        if (this.options.plugins) {
            this.trackers.push(...this.options.plugins);
        }
        if (!this.trackers.length) {
            this.logger.error(new Error('No trackers configured'));
        }
    }
    getScriptTags() {
        return this.trackers
            .map((tracker) => {
            return tracker.getScriptTags && tracker.getScriptTags();
        })
            .join('');
    }
    async init() {
        const promises = this.trackers.map((tracker) => {
            return tracker.init();
        });
        await Promise.all(promises);
    }
    setUser(user = {}, orgType = 'Public') {
        user = typeof user === 'string' ? { username: user } : user;
        this.user = user;
        this.user.accountType = orgType;
        let internalDomain;
        if (user.email && user.email.split) {
            const domain = user.email.split('@')[1];
            internalDomain =
                INTERNAL_ORGS.filter((org) => {
                    return domain === org;
                }).length > 0;
        }
        if (internalDomain ||
            ['In House', 'Demo and Marketing'].indexOf(orgType) > -1) {
            this.user.internalUser = true;
        }
    }
    logPageView(page, event = {}, options = {}) {
        if (this.disabled && !this.suppressDisabledWarnings) {
            this.logger.info('Page view was not logged because telemetry is disabled.');
            return false;
        }
        const enabledTrackers = this.trackers.filter(({ disabled, hasError }) => !disabled && !hasError);
        if (!enabledTrackers.length) {
            this.logger.warn('Page view was not logged because no enabled telemetry-plugins are registered.');
            return false;
        }
        const attributes = this.preProcess(event, options);
        if (this.debug) {
            this.logger.info('Tracking page view', JSON.stringify(attributes));
        }
        const promises = enabledTrackers.map((tracker) => {
            return tracker.logPageView(page, attributes);
        });
        Promise.all(promises).then();
        return true;
    }
    logEvent(event, options = {}) {
        if (this.disabled && !this.suppressDisabledWarnings) {
            this.logger.info('Event was not logged because telemetry is disabled.');
            return false;
        }
        const enabledTrackers = this.trackers.filter(({ disabled, hasError }) => !disabled && !hasError);
        if (!enabledTrackers.length) {
            this.logger.warn('Event was not logged because no enabled telemetry-plugins are registered.');
            return false;
        }
        const eventAttributes = this.preProcess(event, options);
        if (this.debug) {
            this.logger.info('Tracking event', JSON.stringify(eventAttributes));
        }
        const promises = enabledTrackers.map((tracker) => {
            return tracker.logEvent(eventAttributes);
        });
        Promise.all(promises).then();
        return true;
    }
    logError(event = {}) {
        event = Object.assign({ eventType: 'error' }, event);
        this.logEvent(event);
    }
    startWorkflow(name, attributes = {}) {
        const workflow = {
            name,
            start: Date.now(),
            steps: [],
            workflowId: Math.floor((1 + Math.random()) * 0x100000000000).toString(16),
        };
        this.saveWorkflow(workflow);
        const workflowObj = Object.assign({ name, step: 'start' }, attributes);
        this.logWorkflow(workflowObj);
        return workflow;
    }
    stepWorkflow(name, step, attributes = {}) {
        //TODO: check if the check for attributes being a string is useful or can be removed
        const details = typeof attributes === 'string' ? attributes : attributes.details;
        const workflowObj = Object.assign({ name, step, details }, attributes);
        this.logWorkflow(workflowObj);
    }
    endWorkflow(name, attributes = {}) {
        const workflowObj = Object.assign({ name, step: 'finish' }, attributes);
        this.logWorkflow(workflowObj);
    }
    cancelWorkflow(name, attributes = {}) {
        const workflowObj = Object.assign({ name, step: 'cancel' }, attributes);
        this.logWorkflow(workflowObj);
    }
    getWorkflow(name) {
        const workflow = storage.get(`TELEMETRY-WORKFLOW:${name}`);
        // do not let old workflows be returned
        if (workflow) {
            const workflowAge = Date.now() - workflow.start;
            const timeout = 30 * 60 * 1000;
            if (workflowAge < timeout) {
                return workflow;
            }
            else {
                this.deleteWorkflow(workflow);
            }
        }
    }
    saveWorkflow(workflow) {
        storage.set(`TELEMETRY-WORKFLOW:${workflow.name}`, workflow);
    }
    deleteWorkflow(workflow) {
        storage.delete(`TELEMETRY-WORKFLOW:${workflow.name}`);
    }
    logWorkflow(options = {}) {
        /*
        const workflow = {
          name: 'add layer to map',
          step: 'start',
          details: 'some details about the step'
        }
        */
        options = this.preProcess(options);
        let workflow = this.getWorkflow(options.name);
        if (!workflow) {
            this.startWorkflow(options.name);
            workflow = this.getWorkflow(options.name);
        }
        workflow.steps.push(options.step);
        workflow.duration = (Date.now() - workflow.start) / 1000;
        if (['cancel', 'finish'].indexOf(options.step) > -1) {
            this.deleteWorkflow(workflow);
        }
        else {
            this.saveWorkflow(workflow);
        }
        const track = Object.assign(options, {
            eventType: 'workflow',
            category: options.name,
            action: options.step,
            label: options.details,
            duration: workflow.duration,
            workflowId: workflow.workflowId,
        });
        this.logEvent(track);
    }
    preProcess(event = {}, options = {}) {
        let userMetadata = {};
        if (this.user) {
            userMetadata = {
                user: 'unknown',
                org: 'unknown',
                lastLogin: this.user.lastLogin,
                userSince: this.user.created,
                internalUser: this.user.internalUser || false,
                accountType: this.user.accountType,
            };
        }
        return Object.entries(Object.assign(Object.assign({}, event), userMetadata)).reduce(makeEventPayload(options.omitComplexData, this.logger), {});
    }
    disableTracker(trackerName) {
        var _a;
        const tracker = this.trackers.find(({ name }) => name === trackerName);
        if (tracker && !tracker.hasError) {
            tracker.disabled = true;
            (_a = tracker.disable) === null || _a === void 0 ? void 0 : _a.call(tracker);
        }
    }
    enableTracker(trackerName) {
        var _a;
        const tracker = this.trackers.find(({ name }) => name === trackerName);
        if (tracker && !tracker.hasError) {
            tracker.disabled = false;
            (_a = tracker.enable) === null || _a === void 0 ? void 0 : _a.call(tracker);
        }
    }
}
function makeEventPayload(omitComplexData, logger) {
    return function (acc, [key, val]) {
        if (isPrimitive(val)) {
            acc[key] = val;
        }
        else if (!omitComplexData) {
            logger.warn(`You are trying to log a non-primitive value, ${key}:${JSON.stringify(val)}. This will get logged as [object Object]`);
            acc[key] = val;
        }
        return acc;
    };
}
function isPrimitive(val) {
    const primitives = ['string', 'number', 'boolean', 'undefined'];
    return (primitives.includes(typeof val) ||
        (val && typeof val.valueOf() === 'string'));
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * Class supporting Google Analytics 4
 */
class GoogleAnalytics {
    constructor(options) {
        var _a;
        this.name = 'googleAnalytics';
        this.dimensions = {};
        this.metrics = {};
        if (typeof window !== 'undefined' && !((_a = options === null || options === void 0 ? void 0 : options.measurementIds) === null || _a === void 0 ? void 0 : _a.length)) {
            // browser environment
            throw new Error('at least one measurementId needs to be provided in your configuration');
        }
        Object.assign(this, options);
    }
    _getScripts() {
        const measurementId = this.measurementIds ? this.measurementIds[0] : '';
        return [
            {
                dataAttribute: 'google-analytics',
                async: true,
                src: `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
            },
        ];
    }
    getScriptTags() {
        return createScriptTags(this._getScripts());
    }
    async init() {
        // for use in a broswer environment
        if (typeof window === 'undefined') {
            throw new WindowUndefinedError('Window is undefined: Cannot add script element.');
        }
        // calls _getScripts() and then iterates over the array and adds dom nodes for each and resolves once all have loaded.
        // injectScriptElementAsync will check if a script with the specified id already exists and, if so, do nothing
        await Promise.all(this._getScripts().map(scriptObj => {
            return injectScriptElementAsync(scriptObj);
        }));
        // runs second script
        this.injectConfig();
    }
    // we log page views manually, even though ga4 can do so automatically for pages now
    logPageView(page, options = {}) {
        const cleanedOptions = this.buildCustomParams(options);
        const pageViewOptionsObject = Object.assign({ page_title: page || window.location.pathname }, cleanedOptions);
        window.gtag('event', 'page_view', pageViewOptionsObject);
        return true;
    }
    logEvent(event) {
        // eventType is name of our event
        let { action } = event, customParams = __rest(event, ["action"]);
        const eventType = action || 'other';
        // if using telemetry wrapper, custom metrics/dimensions in customParams; if not, in options
        const eventParams = this.buildCustomParams(customParams);
        // should have custom metric & dimension data that looks like
        // metric_name: metric_value
        // dimension_name: dimension_value
        window.gtag('event', eventType, eventParams);
        return true;
    }
    disable() {
        if (this.measurementIds) {
            this.measurementIds.forEach(id => {
                window[`ga-disable-${id}`] = true;
            });
        }
    }
    enable() {
        if (this.measurementIds) {
            this.measurementIds.forEach(id => {
                window[`ga-disable-${id}`] = undefined;
            });
        }
    }
    // injects configs for each measurement id 
    injectConfig() {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        const configOptions = {
            'custom_map': this.createDimensionsAndMetricsCustomMap(this.dimensions, this.metrics),
            'send_page_view': false,
            'anonymize_ip': true // anonymize ip for each event/page view tracked
        };
        this.measurementIds.forEach(measurementId => {
            window.gtag('config', measurementId, configOptions);
        });
    }
    buildCustomParams(eventParams) {
        let cleanedEventParams;
        let { category, label } = eventParams;
        // verify that all are valid custom metrics/dimensions
        cleanedEventParams = this.verifyCustomDimensionAndMetrics(eventParams);
        // ga3 syntax uses category/action/label, which have been changed
        // to event_category, event_action, and event_label in ga4
        if (category) {
            cleanedEventParams = Object.assign(Object.assign({}, cleanedEventParams), { event_category: category });
        }
        if (label) {
            cleanedEventParams = Object.assign(Object.assign({}, cleanedEventParams), { event_label: label });
        }
        return cleanedEventParams;
    }
    verifyCustomDimensionAndMetrics(eventParams) {
        // all valid metric names and dimension names
        // since we store metrics/dimensions as dimension<index>: dimension_name, we want values
        const metricAndDimensionsMap = this.createDimensionsAndMetricsCustomMap(this.dimensions, this.metrics);
        const metricAndDimensionNames = Object.values(metricAndDimensionsMap);
        // get all keys (name of metric/dimension), 
        // filter out any keys not in valid names, 
        // and then recreate new object with filtered keys and values only
        const cleanedEventParams = Object.keys(eventParams)
            .filter(key => metricAndDimensionNames.includes(key))
            .reduce((cur, key) => { return Object.assign(cur, { [key]: eventParams[key] }); }, {});
        return cleanedEventParams;
    }
    createDimensionsAndMetricsCustomMap(dimensions = {}, metrics = {}) {
        const metricsMap = this.createMetricCustomMap(metrics);
        const dimensionsMap = this.createDimensionCustomMap(dimensions);
        return Object.assign(Object.assign({}, metricsMap), dimensionsMap);
    }
    // under the assumption that our metrics come like { timeMetric: 1, otherMetric: 3} where metric_name: index
    createMetricCustomMap(metrics = {}) {
        return Object.keys(metrics)
            .map(function (key) {
            return {
                // format of metric<Index>: metric_name
                key: `metric${metrics[key]}`,
                value: key
            };
        })
            .filter((val) => val)
            .reduce((acc, { key, value }) => {
            acc[key] = value;
            return acc;
        }, {});
    }
    // under the assumption that our dimensions come like { someAttribute: 7, datasetId: 6} where dimension_name: index
    createDimensionCustomMap(dimensions = {}) {
        return Object.keys(dimensions)
            .map(function (key) {
            return {
                // format of dimension<Index>: dimension_name
                key: `dimension${dimensions[key]}`,
                value: key
            };
        })
            .filter((val) => val)
            .reduce((acc, { key, value }) => {
            acc[key] = value;
            return acc;
        }, {});
    }
}

const consentManagerCss = ":host{display:block}.consent-panel{position:fixed;display:block;z-index:5000;bottom:0;left:0;width:100%;height:auto;text-align:center}.cookie-consent-popup-container{position:relative;display:block;bottom:0;left:0;width:100%;margin:0;padding-top:1rem;padding-bottom:1rem;transition:transform 0.5s ease-out 0s;background-color:rgba(51, 51, 51, 0.95);color:#fff}.button-container{position:static;margin-bottom:1rem;display:flex;justify-content:center;flex-wrap:wrap}.padding-end-1{padding-inline-end:1rem}.link-text{--calcite-ui-text-link:var(--calcite-color-text-inverse);--calcite-ui-brand:var(--calcite-color-text-inverse);--calcite-color-text-link:var(--calcite-color-text-inverse);--calcite-color-brand-underline:var(--calcite-color-text-inverse);--calcite-color-brand:var(--calcite-color-text-inverse)}";
const ConsentManagerStyle0 = consentManagerCss;

const ConsentManager = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.consentGranted = createEvent(this, "consentGranted", 7);
        this.firstUseVar = undefined;
        this.measurementIds = undefined;
        this.portal = undefined;
        this._shouldRender = undefined;
        this._translations = undefined;
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Properties (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * boolean: When true the user has granted consent and the telemetry instance will be avaliable
     */
    _consentGranted = false;
    /**
     * boolean: When true the telemetry instance has been loaded
     */
    _loaded = false;
    /**
     * Telemetry: The telemetry instance that can be used to log events by the consuming application
     * https://www.npmjs.com/package/@esri/telemetry
     */
    _telemetryInstance;
    //--------------------------------------------------------------------------
    //
    //  Watch handlers
    //
    //--------------------------------------------------------------------------
    //--------------------------------------------------------------------------
    //
    //  Methods (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Initialize and return the telemetry instance if consent has been granted
     */
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    async getInstance() {
        if (localStorage.getItem(this.firstUseVar) === "true") {
            await this._init();
            return this._telemetryInstance;
        }
        else {
            return undefined;
        }
    }
    //--------------------------------------------------------------------------
    //
    //  Events (public)
    //
    //--------------------------------------------------------------------------
    /**
     * Emitted on demand when the user accepts or denies consent
     */
    consentGranted;
    //--------------------------------------------------------------------------
    //
    //  Functions (lifecycle)
    //
    //--------------------------------------------------------------------------
    /**
     * StencilJS: Called once just after the component is first connected to the DOM.
     *
     * @returns Promise when complete
     */
    async componentWillLoad() {
        await this._getTranslations();
        this._shouldRender = localStorage.getItem(this.firstUseVar) === null;
    }
    /**
     * Renders the component.
     */
    render() {
        return this._shouldRender ? (h(Host, null, h("calcite-panel", { class: "consent-panel calcite-mode-dark", id: "cookie-policy" }, h("div", { class: "cookie-consent-popup-container" }, h("div", { id: "cookie-policy-description-top", tabindex: "-1" }, h("p", null, this._translations.dearVisitor), h("p", null, this._translations.useAnalytics)), h("div", { class: "button-container" }, h("calcite-button", { appearance: "solid", class: "padding-end-1", kind: "brand", onClick: () => this._refuse() }, this._translations.refuseAnalytics), h("calcite-button", { appearance: "solid", kind: "brand", onClick: () => this._accept() }, this._translations.acceptAnalytics)), h("div", null, h("p", null, this._translations.moreInfo, "\u00A0", h("calcite-link", { class: "link-text", href: "https://www.arcgis.com/", rel: "noopener noreferrer", target: "_blank" }, this._translations.protectionPolicy), this._translations.our, "\u00A0", h("calcite-link", { class: "link-text", href: "https://www.arcgis.com/", rel: "noopener noreferrer", target: "_blank" }, this._translations.cookiePolicy, "\u00A0"), this._translations.andOur, "\u00A0", h("calcite-link", { class: "link-text", href: "https://www.arcgis.com/", rel: "noopener noreferrer", target: "_blank" }, this._translations.cookiesInventory))))))) : undefined;
    }
    /**
     * Called once after the component is loaded
     *
     * @returns Promise when complete
     */
    async componentDidLoad() {
        this.consentGranted.emit({
            granted: localStorage.getItem(this.firstUseVar) === "true"
        });
    }
    //--------------------------------------------------------------------------
    //
    //  Functions (protected)
    //
    //--------------------------------------------------------------------------
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    async _init() {
        if (!this._loaded && this.measurementIds?.length > 0 && this.portal) {
            const googleAnalyticsTracker = new GoogleAnalytics({
                measurementIds: this.measurementIds
            });
            this._telemetryInstance = new Telemetry({
                plugins: [googleAnalyticsTracker],
                portal: this.portal
            });
            await this._telemetryInstance.init();
            this._loaded = true;
        }
    }
    /**
     * Store the users granting of consent
     *
     * @protected
     */
    _accept() {
        this._consentGranted = true;
        this._handleConsent();
    }
    /**
     * Store the users refusal of consent
     *
     * @protected
     */
    _refuse() {
        this._consentGranted = false;
        this._handleConsent();
    }
    /**
     * Store and emit the users choice for consent
     *
     * @protected
     */
    _handleConsent() {
        this._shouldRender = false;
        localStorage.setItem(this.firstUseVar, this._consentGranted.toString());
        this.consentGranted.emit({
            granted: this._consentGranted
        });
    }
    /**
     * Fetches the component's translations
     *
     * @returns Promise when complete
     * @protected
     */
    async _getTranslations() {
        const messages = await getLocaleComponentStrings(this.el);
        this._translations = messages[0];
    }
};
ConsentManager.style = ConsentManagerStyle0;

export { ConsentManager as consent_manager };
