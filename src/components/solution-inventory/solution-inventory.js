var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h } from '@stencil/core';
import "@esri/calcite-components";
let SolutionInventory = class SolutionInventory {
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        return (h(Host, null,
            h("calcite-tree", null,
                h("calcite-tree-item", null,
                    h("a", null, "Dashboard 1"),
                    h("calcite-tree", { slot: "children" },
                        h("calcite-tree-item", null,
                            h("a", null,
                                h("i", null, "dependencies"))))),
                h("calcite-tree-item", null,
                    h("a", null, "Dashboard 2"),
                    h("calcite-tree", { slot: "children" },
                        h("calcite-tree-item", null,
                            h("a", null, "Map 1"),
                            h("calcite-tree", { slot: "children" },
                                h("calcite-tree-item", null,
                                    h("a", null, "View 1"),
                                    h("calcite-tree", { slot: "children" },
                                        h("calcite-tree-item", null,
                                            h("a", null, "Feature Service 1")))))))),
                h("calcite-tree-item", null,
                    h("a", null, "Application 1"),
                    h("calcite-tree", { slot: "children" },
                        h("calcite-tree-item", null,
                            h("a", null, "Group 1"),
                            h("calcite-tree", { slot: "children" },
                                h("calcite-tree-item", null,
                                    h("a", null, "Map 2"),
                                    h("calcite-tree", { slot: "children" },
                                        h("calcite-tree-item", null,
                                            h("a", null, "Feature Service 2")))))))),
                h("calcite-tree-item", null,
                    h("a", null, "Notebook 1"),
                    h("calcite-tree", { slot: "children" },
                        h("calcite-tree-item", null,
                            h("a", null,
                                h("i", null, "dependencies"))))),
                h("calcite-tree-item", null,
                    h("a", null, "Survey 1"),
                    h("calcite-tree", { slot: "children" },
                        h("calcite-tree-item", null,
                            h("a", null,
                                h("i", null, "dependencies"))))))));
    }
};
SolutionInventory = __decorate([
    Component({
        tag: 'solution-inventory',
        styleUrl: 'solution-inventory.css',
        shadow: false
    })
], SolutionInventory);
export { SolutionInventory };
