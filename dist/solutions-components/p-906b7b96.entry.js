/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{r as t,h as s,H as e,g as i}from"./p-c023e6a1.js";const r=class{constructor(s){t(this,s),this._elements=[],this.defaultChecked=!0,this.values=void 0}async getConfigInfo(){return this._elements.reduce(((t,s)=>(t[s.value]=s.checked,t)),{})}async componentDidLoad(){this.defaultChecked&&this._elements.forEach((t=>{t.checked=!0}))}render(){return s(e,null,s("div",null,this._renderCheckboxes(this.values)))}_renderCheckboxes(t){return t.map((t=>s("calcite-label",{layout:"inline"},s("calcite-checkbox",{ref:t=>this._elements.push(t),value:t}),t)))}get el(){return i(this)}};r.style=":host{display:block}";export{r as check_list}