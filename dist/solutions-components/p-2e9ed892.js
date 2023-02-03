/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const t=new WeakMap;function i(t){t.propertyName===this.openTransitionProp&&t.target===this.transitionEl&&(this.open?this.onBeforeOpen():this.onBeforeClose())}function n(t){t.propertyName===this.openTransitionProp&&t.target===this.transitionEl&&(this.open?this.onOpen():this.onClose())}function s(s){if(o(s),s.transitionEl){const o=i.bind(s),a=n.bind(s);t.set(s,[s.transitionEl,o,a]),s.transitionEl.addEventListener("transitionstart",o),s.transitionEl.addEventListener("transitionend",a)}}function o(i){if(!t.has(i))return;const[n,s,o]=t.get(i);n.removeEventListener("transitionstart",s),n.removeEventListener("transitionend",o),t.delete(i)}export{s as c,o as d}