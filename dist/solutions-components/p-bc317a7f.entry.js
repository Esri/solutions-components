/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{r as t,c as s,g as e}from"./p-c023e6a1.js";const r=class{constructor(e){t(this,e),this.stateLoaded=s(this,"stateLoaded",7),this.value="",this.templates=[],this.authentication=void 0}connectedCallback(){this._initValueObserver()}render(){return null}_initValueObserver(){this._valueObserver=new MutationObserver((t=>{t.some((t=>{const s=t.target[t.attributeName];if("attributes"===t.type&&"value"===t.attributeName&&s!==t.oldValue&&""!==s)return!0}))})),this._valueObserver.observe(this.el,{attributes:!0,attributeOldValue:!0})}get el(){return e(this)}};export{r as store_manager}