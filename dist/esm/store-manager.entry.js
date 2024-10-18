/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, c as createEvent, g as getElement } from './index-904bc599.js';
import { s as state } from './solution-store-ff13861b.js';
import { c as getFeatureServices, d as getSpatialReferenceInfo } from './templates-0b442208.js';
import './index-39bc2e6d.js';
import './interfaces-659e3836.js';
import './solution-resource-f5809979.js';
import './_commonjsHelpers-089957fe.js';
import './index-e14fade9.js';
import './restHelpersGet-48113381.js';

const StoreManager = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.stateLoaded = createEvent(this, "stateLoaded", 7);
        this.value = "";
        this.templates = [];
        this.authentication = undefined;
    }
    get el() { return getElement(this); }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    connectedCallback() {
        // Handle an initial value
        this._handleValueChange(this.value);
        // Set up an oberver to watch for changes to the value attribute
        this._initValueObserver();
    }
    /**
     * Renders the component.
     */
    render() {
        return (null);
    }
    //--------------------------------------------------------------------------
    //
    //  Events
    //
    //--------------------------------------------------------------------------
    stateLoaded;
    //--------------------------------------------------------------------------
    //
    //  Public Methods (async)
    //
    //--------------------------------------------------------------------------
    /**
     * Returns the store info for the supplied property name.
     *
     * @param propName Name of the property to return
     */
    async getStoreInfo(propName) {
        return Promise.resolve(state.getStoreInfo(propName));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    _valueObserver;
    /**
     * Loads a store when supplied with a non-empty value.
     *
     * @param newValue New store value to load
     */
    _handleValueChange(newValue) {
        if (newValue !== "") {
            const solutionData = JSON.parse(newValue);
            state.setStoreInfo("solutionData", solutionData);
            const services = getFeatureServices(solutionData.templates);
            state.setStoreInfo("featureServices", services);
            state.setStoreInfo("spatialReferenceInfo", getSpatialReferenceInfo(services, solutionData));
            this.templates = solutionData.templates;
            this.stateLoaded.emit(state);
        }
    }
    /**
     * Initialize the observer that will monitor and respond to changes in the value.
     * When we get a new value we are dealing with a new solution and need to fetch the item's data and load the state.
     */
    _initValueObserver() {
        this._valueObserver = new MutationObserver(ml => {
            ml.some(mutation => {
                const newValue = mutation.target[mutation.attributeName];
                if (mutation.type === 'attributes' && mutation.attributeName === "value" && newValue !== mutation.oldValue) {
                    this._handleValueChange(newValue);
                    return true;
                }
            });
        });
        this._valueObserver.observe(this.el, { attributes: true, attributeOldValue: true });
    }
};

export { StoreManager as store_manager };
