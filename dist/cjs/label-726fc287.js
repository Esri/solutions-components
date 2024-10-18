/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const dom = require('./dom-795d4a33.js');
const component = require('./component-5d190962.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.13.0
 */
/**
 * Exported for testing purposes only
 *
 * @internal
 */
const labelClickEvent = "calciteInternalLabelClick";
const labelConnectedEvent = "calciteInternalLabelConnected";
const labelDisconnectedEvent = "calciteInternalLabelDisconnected";
const labelTagName = "calcite-label";
const labelToLabelables = new WeakMap();
const onLabelClickMap = new WeakMap();
const onLabelConnectedMap = new WeakMap();
const onLabelDisconnectedMap = new WeakMap();
const unlabeledComponents = new Set();
const findLabelForComponent = (componentEl) => {
    const { id } = componentEl;
    const forLabel = id && dom.queryElementRoots(componentEl, { selector: `${labelTagName}[for="${id}"]` });
    if (forLabel) {
        return forLabel;
    }
    const parentLabel = dom.closestElementCrossShadowBoundary(componentEl, labelTagName);
    if (!parentLabel ||
        // labelable components within other custom elements are not considered labelable
        hasAncestorCustomElements(parentLabel, componentEl)) {
        return null;
    }
    return parentLabel;
};
function hasAncestorCustomElements(label, componentEl) {
    let traversedElements;
    const customElementAncestorCheckEventType = "custom-element-ancestor-check";
    const listener = (event) => {
        event.stopImmediatePropagation();
        const composedPath = event.composedPath();
        traversedElements = composedPath.slice(composedPath.indexOf(componentEl), composedPath.indexOf(label));
    };
    label.addEventListener(customElementAncestorCheckEventType, listener, { once: true });
    componentEl.dispatchEvent(new CustomEvent(customElementAncestorCheckEventType, { composed: true, bubbles: true }));
    label.removeEventListener(customElementAncestorCheckEventType, listener);
    const ancestorCustomElements = traversedElements
        .filter((el) => el !== componentEl && el !== label)
        .filter((el) => el.tagName?.includes("-"));
    return ancestorCustomElements.length > 0;
}
/**
 * Helper to set up label interactions on connectedCallback.
 *
 * @param component
 */
function connectLabel(component) {
    if (!component) {
        return;
    }
    const labelEl = findLabelForComponent(component.el);
    if ((onLabelClickMap.has(labelEl) && labelEl === component.labelEl) ||
        (!labelEl && unlabeledComponents.has(component))) {
        return;
    }
    const boundOnLabelDisconnected = onLabelDisconnected.bind(component);
    if (labelEl) {
        component.labelEl = labelEl;
        const labelables = labelToLabelables.get(labelEl) || [];
        labelables.push(component);
        labelToLabelables.set(labelEl, labelables.sort(sortByDOMOrder));
        if (!onLabelClickMap.has(component.labelEl)) {
            onLabelClickMap.set(component.labelEl, onLabelClick);
            component.labelEl.addEventListener(labelClickEvent, onLabelClick);
        }
        unlabeledComponents.delete(component);
        document.removeEventListener(labelConnectedEvent, onLabelConnectedMap.get(component));
        onLabelDisconnectedMap.set(component, boundOnLabelDisconnected);
        document.addEventListener(labelDisconnectedEvent, boundOnLabelDisconnected);
    }
    else if (!unlabeledComponents.has(component)) {
        boundOnLabelDisconnected();
        document.removeEventListener(labelDisconnectedEvent, onLabelDisconnectedMap.get(component));
    }
}
/**
 * Helper to tear down label interactions on disconnectedCallback on labelable components.
 *
 * @param component
 */
function disconnectLabel(component) {
    if (!component) {
        return;
    }
    unlabeledComponents.delete(component);
    document.removeEventListener(labelConnectedEvent, onLabelConnectedMap.get(component));
    document.removeEventListener(labelDisconnectedEvent, onLabelDisconnectedMap.get(component));
    onLabelConnectedMap.delete(component);
    onLabelDisconnectedMap.delete(component);
    if (!component.labelEl) {
        return;
    }
    const labelables = labelToLabelables.get(component.labelEl);
    if (labelables.length === 1) {
        component.labelEl.removeEventListener(labelClickEvent, onLabelClickMap.get(component.labelEl));
        onLabelClickMap.delete(component.labelEl);
    }
    labelToLabelables.set(component.labelEl, labelables.filter((labelable) => labelable !== component).sort(sortByDOMOrder));
    component.labelEl = null;
}
function sortByDOMOrder(a, b) {
    return dom.isBefore(a.el, b.el) ? -1 : 1;
}
/**
 * Helper to get the label text from a component.
 *
 * @param component
 */
function getLabelText(component) {
    return component.label || component.labelEl?.textContent?.trim() || "";
}
function onLabelClick(event) {
    const labelClickTarget = event.detail.sourceEvent.target;
    const labelables = labelToLabelables.get(this);
    const clickedLabelable = labelables.find((labelable) => labelable.el === labelClickTarget);
    const labelableChildClicked = labelables.includes(clickedLabelable);
    if (labelableChildClicked) {
        // no need to forward click as labelable will receive focus
        return;
    }
    const firstLabelable = labelables[0];
    if (firstLabelable.disabled) {
        return;
    }
    firstLabelable.onLabelClick(event);
}
function onLabelConnected() {
    if (unlabeledComponents.has(this)) {
        connectLabel(this);
    }
}
function onLabelDisconnected() {
    unlabeledComponents.add(this);
    const boundOnLabelConnected = onLabelConnectedMap.get(this) || onLabelConnected.bind(this);
    onLabelConnectedMap.set(this, boundOnLabelConnected);
    document.addEventListener(labelConnectedEvent, boundOnLabelConnected);
}
/**
 * Helper to associate an explicit label (i.e., using `for`) with a labelable component that does not have an associated label.
 *
 * @param label - the label element
 */
async function associateExplicitLabelToUnlabeledComponent(label) {
    await component.componentOnReady(label);
    const alreadyLabeled = labelToLabelables.has(label);
    if (alreadyLabeled) {
        return;
    }
    const forComponentEl = label.ownerDocument?.getElementById(label.for);
    if (!forComponentEl) {
        return;
    }
    requestAnimationFrame(() => {
        for (const labelable of unlabeledComponents) {
            if (labelable.el === forComponentEl) {
                connectLabel(labelable);
                break;
            }
        }
    });
}

exports.associateExplicitLabelToUnlabeledComponent = associateExplicitLabelToUnlabeledComponent;
exports.connectLabel = connectLabel;
exports.disconnectLabel = disconnectLabel;
exports.getLabelText = getLabelText;
exports.labelConnectedEvent = labelConnectedEvent;
exports.labelDisconnectedEvent = labelDisconnectedEvent;
