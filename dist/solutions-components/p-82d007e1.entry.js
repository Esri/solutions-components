/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './p-6eb37ed2.js';

const instantAppsPopoversCss = ":host{display:block}";
const InstantAppsPopoversStyle0 = instantAppsPopoversCss;

const InstantAppsPopovers = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.inTour = undefined;
        this.currentId = undefined;
        this.instantAppsPopovers = new Map();
        this.beforeOpen = () => Promise.resolve();
    }
    componentWillLoad() {
        var _a;
        const popovers = Array.from((_a = this.host.querySelector("[slot='popovers']")) === null || _a === void 0 ? void 0 : _a.children);
        popovers.forEach((popover, popoverIndex) => {
            const refId = popover.getAttribute('ref-id');
            popover.parent = this;
            popover.index = popoverIndex;
            this.instantAppsPopovers.set(refId, popover);
        });
        this.host.addEventListener('calcitePopoverOpen', e => {
            const node = e.target;
            const refId = node.getAttribute('ref-id');
            this.currentId = refId;
        });
    }
    render() {
        return (h(Host, { key: '02dd6367b259671584e90cc0961394d9e2c95593' }, h("slot", { key: '97eed5108c00e29ea2efc8f4ec772d3953224d82', name: "popovers" })));
    }
    next() {
        const refIds = Array.from(this.instantAppsPopovers.keys());
        const index = refIds.indexOf(this.currentId) + 1;
        const nextId = refIds[index];
        this.close(this.currentId);
        this.open(nextId);
    }
    previous() {
        const refIds = Array.from(this.instantAppsPopovers.keys());
        const index = refIds.indexOf(this.currentId) - 1;
        const previousId = refIds[index];
        this.close(this.currentId);
        this.open(previousId);
    }
    done() {
        this.endTour();
    }
    handlePopoverProps(config) {
        var _a;
        const popovers = Array.from((_a = this.host.querySelector("[slot='popovers']")) === null || _a === void 0 ? void 0 : _a.children);
        popovers.forEach(popover => {
            popover.disableAction = config.disableAction;
            popover.pagination = config.pagination;
        });
    }
    async open(key) {
        return this.beforeOpen().then(() => {
            var _a;
            const popover = (_a = this.instantAppsPopovers.get(key)) === null || _a === void 0 ? void 0 : _a.firstElementChild;
            popover.open = true;
        });
    }
    async close(key) {
        var _a;
        const popover = (_a = this.instantAppsPopovers.get(key)) === null || _a === void 0 ? void 0 : _a.firstElementChild;
        popover.open = false;
    }
    async beginTour() {
        this.inTour = true;
        this.handlePopoverProps({ pagination: true, disableAction: true });
        const refIds = Array.from(this.instantAppsPopovers.keys());
        this.open(refIds[0]);
    }
    async endTour() {
        this.close(this.currentId);
        this.inTour = false;
        this.handlePopoverProps({ pagination: false, disableAction: false });
    }
    get host() { return getElement(this); }
};
InstantAppsPopovers.style = InstantAppsPopoversStyle0;

export { InstantAppsPopovers as instant_apps_popovers };
