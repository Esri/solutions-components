/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{r as t,c as n,h as s,F as a}from"./p-7d280d8a.js";const e=class{constructor(s){t(this,s),this.calciteInternalOptionGroupChange=n(this,"calciteInternalOptionGroupChange",6),this.disabled=!1,this.label=void 0}handlePropChange(){this.calciteInternalOptionGroupChange.emit()}render(){return s(a,null,s("div",null,this.label),s("slot",null))}static get watchers(){return{disabled:["handlePropChange"],label:["handlePropChange"]}}};e.style=":host{display:block}:host([hidden]){display:none}[hidden]{display:none}";export{e as calcite_option_group}