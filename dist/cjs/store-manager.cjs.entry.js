/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4b68e4b4.js');
const solutionStore = require('./solution-store-4de89072.js');
const templates = require('./templates-0b7f886f.js');
require('./index-2b13a4d5.js');
require('./interfaces-09c4c40e.js');
require('./solution-resource-40e70253.js');
require('./_commonjsHelpers-baf43783.js');
require('./index-f052f656.js');
require('./restHelpersGet-5c2245a3.js');

const StoreManager = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.stateLoaded = index.createEvent(this, "stateLoaded", 7);
        this.value = "";
        this.templates = [];
        this.authentication = undefined;
    }
    get el() { return index.getElement(this); }
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
        return Promise.resolve(solutionStore.state.getStoreInfo(propName));
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
            solutionStore.state.setStoreInfo("solutionData", solutionData);
            const services = templates.getFeatureServices(solutionData.templates);
            solutionStore.state.setStoreInfo("featureServices", services);
            solutionStore.state.setStoreInfo("spatialReferenceInfo", templates.getSpatialReferenceInfo(services, solutionData));
            this.templates = solutionData.templates;
            this.stateLoaded.emit(solutionStore.state);
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

exports.store_manager = StoreManager;
