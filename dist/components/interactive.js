/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { h } from '@stencil/core/internal/client';
import { g as getUserAgentString } from './browser.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-design-system/blob/dev/LICENSE.md for details.
 * v2.12.0
 */
// ⚠️ browser-sniffing is not a best practice and should be avoided ⚠️
const isFirefox = /firefox/i.test(getUserAgentString());
const disabledElementToParent = isFirefox
    ? new WeakMap()
    : null;
function interceptedClick() {
    const { disabled } = this;
    if (!disabled) {
        HTMLElement.prototype.click.call(this);
    }
}
function onPointerDown(event) {
    const interactiveElement = event.target;
    if (isFirefox && !disabledElementToParent.get(interactiveElement)) {
        return;
    }
    const { disabled } = interactiveElement;
    if (disabled) {
        // prevent click from moving focus on host
        event.preventDefault();
    }
}
const nonBubblingWhenDisabledMouseEvents = ["mousedown", "mouseup", "click"];
function onNonBubblingWhenDisabledMouseEvent(event) {
    const interactiveElement = event.target;
    if (isFirefox && !disabledElementToParent.get(interactiveElement)) {
        return;
    }
    // prevent disallowed mouse events from being emitted on the disabled host (per https://github.com/whatwg/html/issues/5886)
    // ⚠ we generally avoid stopping propagation of events, but this is needed to adhere to the intended spec changes above ⚠
    if (interactiveElement.disabled) {
        event.stopImmediatePropagation();
        event.preventDefault();
    }
}
const captureOnlyOptions = { capture: true };
/**
 * This helper updates the host element to prevent keyboard interaction on its subtree and sets the appropriate aria attribute for accessibility.
 *
 * This should be used in the `componentDidRender` lifecycle hook.
 *
 * **Notes**
 *
 * this util is not needed for simple components whose root element or elements are an interactive component (custom element or native control). For those cases, set the `disabled` props on the root components instead.
 * technically, users can override `tabindex` and restore keyboard navigation, but this will be considered user error
 *
 * @param component
 */
function updateHostInteraction(component) {
    if (component.disabled) {
        component.el.setAttribute("aria-disabled", "true");
        if (component.el.contains(document.activeElement)) {
            document.activeElement.blur();
        }
        blockInteraction(component);
        return;
    }
    restoreInteraction(component);
    component.el.removeAttribute("aria-disabled");
}
function blockInteraction(component) {
    component.el.click = interceptedClick;
    if (isFirefox) {
        const currentParent = getParentElement(component);
        const trackedParent = disabledElementToParent.get(component.el);
        if (trackedParent !== currentParent) {
            removeInteractionListeners(trackedParent);
            disabledElementToParent.set(component.el, currentParent);
        }
        addInteractionListeners(disabledElementToParent.get(component.el));
        return;
    }
    addInteractionListeners(component.el);
}
function addInteractionListeners(element) {
    if (!element) {
        // this early return path is only applicable to Firefox
        return;
    }
    element.addEventListener("pointerdown", onPointerDown, captureOnlyOptions);
    nonBubblingWhenDisabledMouseEvents.forEach((event) => element.addEventListener(event, onNonBubblingWhenDisabledMouseEvent, captureOnlyOptions));
}
function getParentElement(component) {
    return (component.el.parentElement || component.el); /* assume element is host if it has no parent when connected */
}
function isInteractiveHTMLElement(el) {
    return "disabled" in el;
}
function restoreInteraction(component) {
    delete component.el.click; // fallback on HTMLElement.prototype.click
    if (isFirefox) {
        const parent = disabledElementToParent.get(component.el);
        let hasDisabledSiblingElements = false;
        if (parent?.children) {
            for (const child of parent.children) {
                if (isInteractiveHTMLElement(child) && child.disabled && child !== component.el) {
                    hasDisabledSiblingElements = true;
                    break;
                }
            }
        }
        if (!hasDisabledSiblingElements) {
            removeInteractionListeners(parent);
        }
        disabledElementToParent.delete(component.el);
        return;
    }
    removeInteractionListeners(component.el);
}
function removeInteractionListeners(element) {
    if (!element) {
        // this early return path is only applicable to Firefox
        return;
    }
    element.removeEventListener("pointerdown", onPointerDown, captureOnlyOptions);
    nonBubblingWhenDisabledMouseEvents.forEach((event) => element.removeEventListener(event, onNonBubblingWhenDisabledMouseEvent, captureOnlyOptions));
}
/**
 * This utility helps disable components consistently in Firefox.
 *
 * It needs to be called in `connectedCallback` and is only needed for Firefox as it does not call capture event listeners before non-capture ones (see https://bugzilla.mozilla.org/show_bug.cgi?id=1731504).
 *
 * @param component
 */
function connectInteractive(component) {
    if (!component.disabled || !isFirefox) {
        return;
    }
    blockInteraction(component);
}
/**
 * This utility restores interactivity to disabled components consistently in Firefox.
 *
 * It needs to be called in `disconnectedCallback` and is only needed for Firefox as it does not call capture event listeners before non-capture ones (see https://bugzilla.mozilla.org/show_bug.cgi?id=1731504).
 *
 * @param component
 */
function disconnectInteractive(component) {
    if (!isFirefox) {
        return;
    }
    restoreInteraction(component);
}
const CSS = {
    container: "interaction-container",
};
const InteractiveContainer = ({ disabled }, children) => (h("div", { class: CSS.container, inert: disabled }, ...children));

export { InteractiveContainer as I, connectInteractive as c, disconnectInteractive as d, updateHostInteraction as u };
