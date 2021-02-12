var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Element, h, Host, Prop } from '@stencil/core';
import "@esri/calcite-components";
import "../../components";
let SolutionItem = class SolutionItem {
    constructor() {
        //--------------------------------------------------------------------------
        //
        //  Properties (public)
        //
        //--------------------------------------------------------------------------
        this.translations = {
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
        };
        this.value = {};
        //--------------------------------------------------------------------------
        //
        //  Variables (private)
        //
        //--------------------------------------------------------------------------
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
                            h("calcite-tab-title", null, this.translations.itemDetailsTab),
                            h("calcite-tab-title", null, this.translations.dataTab),
                            h("calcite-tab-title", null, this.translations.propertiesTab)),
                        h("calcite-tab", { class: "config-tab", active: true }, "solution-item-details/solution-item-details"),
                        h("calcite-tab", { class: "config-tab" }, "solution-item-json/solution-item-json"),
                        h("calcite-tab", { class: "config-tab" }, "solution-item-json/solution-item-json"))))));
    }
};
__decorate([
    Element()
], SolutionItem.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true })
], SolutionItem.prototype, "translations", void 0);
__decorate([
    Prop({ mutable: true })
], SolutionItem.prototype, "value", void 0);
SolutionItem = __decorate([
    Component({
        tag: 'solution-item',
        styleUrl: 'solution-item.css',
        shadow: false
    })
], SolutionItem);
export { SolutionItem };
