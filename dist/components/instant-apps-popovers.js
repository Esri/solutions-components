/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const instantAppsPopoversCss = ":host{display:block}";
const InstantAppsPopoversStyle0 = instantAppsPopoversCss;

const InstantAppsPopovers$1 = /*@__PURE__*/ proxyCustomElement(class InstantAppsPopovers extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
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
    get host() { return this; }
    static get style() { return InstantAppsPopoversStyle0; }
}, [4, "instant-apps-popovers", {
        "inTour": [1540, "in-tour"],
        "currentId": [1537, "current-id"],
        "instantAppsPopovers": [16],
        "beforeOpen": [16],
        "open": [64],
        "close": [64],
        "beginTour": [64],
        "endTour": [64]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["instant-apps-popovers"];
    components.forEach(tagName => { switch (tagName) {
        case "instant-apps-popovers":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InstantAppsPopovers$1);
            }
            break;
    } });
}
defineCustomElement$1();

const InstantAppsPopovers = InstantAppsPopovers$1;
const defineCustomElement = defineCustomElement$1;

export { InstantAppsPopovers, defineCustomElement };
