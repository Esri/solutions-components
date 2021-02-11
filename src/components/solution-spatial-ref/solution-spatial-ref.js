var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h } from '@stencil/core';
import "@esri/calcite-components";
import "../../components";
let SolutionSpatialRef = class SolutionSpatialRef {
    render() {
        return (h(Host, null,
            h("label", { class: "switch-label" },
                h("calcite-switch", { scale: "s", class: "spatial-ref-switch" }),
                "Spatial Reference Parameter"),
            h("div", { id: "spatialRefDefn", class: "spatial-ref-switch-title" },
                h("calcite-label", null,
                    "Default Spatial Reference",
                    h("label", { id: "item-description-label", class: "spatial-ref-default" },
                        h("calcite-input", { id: "item-description" }))),
                h("label", { class: "spatial-ref-current" }, "WGS 1984 Web Mercator Auxiliary Sphere (102100)"),
                h("label", { class: "spatial-ref-item-title" }, "Feature Services"),
                h("label", { class: "switch-label" },
                    h("calcite-switch", { scale: "s", class: "spatial-ref-item-switch" }),
                    "Feature Service 1"),
                h("label", { class: "switch-label" },
                    h("calcite-switch", { scale: "s", class: "spatial-ref-item-switch" }),
                    "Feature Service 2"))));
    }
};
SolutionSpatialRef = __decorate([
    Component({
        tag: 'solution-spatial-ref',
        styleUrl: 'solution-spatial-ref.css',
        shadow: false,
    })
], SolutionSpatialRef);
export { SolutionSpatialRef };
