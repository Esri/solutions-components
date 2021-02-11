var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h } from '@stencil/core';
import "@esri/calcite-components";
import "../../components";
let SolutionConfiguration = class SolutionConfiguration {
    render() {
        return (h(Host, null,
            h("div", { class: "configuration-container" },
                h("div", { class: "configuration" },
                    h("calcite-tabs", { class: "config-tabs" },
                        h("calcite-tab-nav", { slot: "tab-nav" },
                            h("calcite-tab-title", null, "Definition"),
                            h("calcite-tab-title", null, "Spatial Reference")),
                        h("calcite-tab", { class: "config-tab", active: true },
                            h("div", { class: "config-solution" },
                                h("div", { class: "config-inventory" },
                                    h("solution-inventory", null)),
                                h("div", { class: "config-item" },
                                    h("solution-item", null)))),
                        h("calcite-tab", { class: "config-tab" },
                            h("div", { class: "config-solution" },
                                h("solution-spatial-ref", null))))))));
    }
};
SolutionConfiguration = __decorate([
    Component({
        tag: 'solution-configuration',
        styleUrl: 'solution-configuration.css',
        shadow: false,
    })
], SolutionConfiguration);
export { SolutionConfiguration };
