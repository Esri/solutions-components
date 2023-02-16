/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const componentToTransitionListeners = new WeakMap();
function transitionStart(event) {
  if (event.propertyName === this.openTransitionProp && event.target === this.transitionEl) {
    this.open ? this.onBeforeOpen() : this.onBeforeClose();
  }
}
function transitionEnd(event) {
  if (event.propertyName === this.openTransitionProp && event.target === this.transitionEl) {
    this.open ? this.onOpen() : this.onClose();
  }
}
/**
 * Helper to keep track of transition listeners on setTransitionEl and connectedCallback on OpenCloseComponent components.
 *
 * @param component
 */
function connectOpenCloseComponent(component) {
  disconnectOpenCloseComponent(component);
  if (component.transitionEl) {
    const boundOnTransitionStart = transitionStart.bind(component);
    const boundOnTransitionEnd = transitionEnd.bind(component);
    componentToTransitionListeners.set(component, [
      component.transitionEl,
      boundOnTransitionStart,
      boundOnTransitionEnd
    ]);
    component.transitionEl.addEventListener("transitionstart", boundOnTransitionStart);
    component.transitionEl.addEventListener("transitionend", boundOnTransitionEnd);
  }
}
/**
 * Helper to tear down transition listeners on disconnectedCallback on OpenCloseComponent components.
 *
 * @param component
 */
function disconnectOpenCloseComponent(component) {
  if (!componentToTransitionListeners.has(component)) {
    return;
  }
  const [transitionEl, start, end] = componentToTransitionListeners.get(component);
  transitionEl.removeEventListener("transitionstart", start);
  transitionEl.removeEventListener("transitionend", end);
  componentToTransitionListeners.delete(component);
}

exports.connectOpenCloseComponent = connectOpenCloseComponent;
exports.disconnectOpenCloseComponent = disconnectOpenCloseComponent;
