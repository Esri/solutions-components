var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Element, h, Host, Prop } from '@stencil/core';
import "@esri/calcite-components";
import "../../components";
let SolutionConfiguration = class SolutionConfiguration {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties (public)
        //
        //--------------------------------------------------------------------------
        this.translations = {
            "definitionTab": "Definition",
            "spatialReferenceTab": "Spatial Reference",
            // Information about an item
            "item": {
                "itemDetailsTab": "Item Details",
                "dataTab": "Data",
                "propertiesTab": "Properties",
                "groupDetailsTab": "Group Details",
                "sharingTab": "Sharing",
                // Item details
                "item_details": {
                    "editThumbnail": "Edit Thumbnail",
                    "description": "Description",
                    "tags": "Tags",
                    "credits": "Credits",
                    "termsOfUse": "Terms of Use",
                    "snippetCountPattern": "{{n}} of 250"
                },
                "json_editing": {
                    "startEditing": "Start editing",
                    "search": "Search" // search within JSON editor
                }
            },
            "spatialRef": {
                "specifyParam": "Spatial Reference Parameter",
                "defaultSpatialRef": "Default Spatial Reference",
                "featureServicesHeading": "Feature Services"
            }
        };
        this.value = {};
        //--------------------------------------------------------------------------
        //
        //  Event Listeners
        //
        //--------------------------------------------------------------------------
        //--------------------------------------------------------------------------
        //
        //  Events
        //
        //--------------------------------------------------------------------------
        //--------------------------------------------------------------------------
        //
        //  Public Methods (async)
        //
        //--------------------------------------------------------------------------
    }
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        return (h(Host, null,
            h("div", { class: "configuration-container" },
                h("div", { class: "configuration" },
                    h("calcite-tabs", { class: "config-tabs" },
                        h("calcite-tab-nav", { slot: "tab-nav" },
                            h("calcite-tab-title", null, this.translations.definitionTab),
                            h("calcite-tab-title", null, this.translations.spatialReferenceTab)),
                        h("calcite-tab", { class: "config-tab", active: true },
                            h("div", { class: "config-solution" },
                                h("div", { class: "config-inventory" },
                                    h("solution-inventory", { id: "configInventory" })),
                                h("div", { class: "config-item" },
                                    h("solution-item", { ref: (el) => (this.item = el) })))),
                        h("calcite-tab", { class: "config-tab" },
                            h("div", { class: "config-solution" },
                                h("solution-spatial-ref", { ref: (el) => (this.spatialRef = el) }))))))));
    }
    componentDidRender() {
        // Forward the translations to children
        this.item.translations = this.translations.item;
        this.spatialRef.translations = this.translations.spatialRef;
    }
};
__decorate([
    Element()
], SolutionConfiguration.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true })
], SolutionConfiguration.prototype, "translations", void 0);
__decorate([
    Prop({ mutable: true })
], SolutionConfiguration.prototype, "value", void 0);
SolutionConfiguration = __decorate([
    Component({
        tag: 'solution-configuration',
        styleUrl: 'solution-configuration.css',
        shadow: false
    })
], SolutionConfiguration);
export { SolutionConfiguration };
