/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{r as t,c as i,h as a,g as n}from"./p-c2f00d41.js";import{n as e,i as s,a as r,r as o,b as c}from"./p-991ee695.js";import{c as l}from"./p-f5d21f80.js";import{f as m}from"./p-83166522.js";import{T as h}from"./p-34dee41d.js";import"./p-e1a4994d.js";import"./p-729708a3.js";import"./p-a80b3880.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */const p=l(),u=class{constructor(a){t(this,a),this.calciteColorPickerHexInputChange=i(this,"calciteColorPickerHexInputChange",6),this.allowEmpty=!1,this.intlHex=h.hex,this.intlNoColor=h.noColor,this.scale="m",this.value=e(p.hex()),this.onCalciteInternalInputBlur=()=>{const t=this.inputNode,i=t.value,a=`#${i}`;this.allowEmpty&&!i||s(a)&&r(a)||(t.value=this.allowEmpty&&!this.internalColor?"":this.formatForInternalInput(o(this.internalColor.object())))},this.onInputChange=()=>{this.internalSetValue(this.inputNode.value,this.value)},this.internalColor=p,this.previousNonNullValue=this.value,this.storeInputRef=t=>{this.inputNode=t}}connectedCallback(){const{allowEmpty:t,value:i}=this;if(i){const t=e(i);s(t)&&this.internalSetValue(t,t,!1)}else t&&this.internalSetValue(null,null,!1)}handleValueChange(t,i){this.internalSetValue(t,i,!1)}onInputKeyDown(t){const{altKey:i,ctrlKey:a,metaKey:n,shiftKey:s}=t,{internalColor:r,value:o}=this,{key:l}=t;if("Tab"===l||"Enter"===l)return void this.onInputChange();const m=this.value;if("ArrowDown"===l||"ArrowUp"===l)return o?(this.internalSetValue(e(this.nudgeRGBChannels(r,(s?10:1)*("ArrowUp"===l?1:-1)).hex()),m),void t.preventDefault()):(this.internalSetValue(this.previousNonNullValue,m),void t.preventDefault());const h=i||a||n,p=1===l.length,u=c.test(l);!p||h||u||t.preventDefault()}onPaste(t){const i=t.clipboardData.getData("text");s(i)&&(t.preventDefault(),this.inputNode.value=i.slice(1))}render(){const{intlHex:t,value:i}=this,n=this.formatForInternalInput(i);return a("div",{class:"container"},a("calcite-input",{class:"input",label:t,maxLength:6,numberingSystem:this.numberingSystem,onCalciteInputChange:this.onInputChange,onCalciteInternalInputBlur:this.onCalciteInternalInputBlur,onKeyDown:this.handleKeyDown,onPaste:this.onPaste,prefixText:"#",ref:this.storeInputRef,scale:this.scale,value:n}),n?a("calcite-color-picker-swatch",{active:!0,class:"preview",color:`#${n}`,scale:this.scale}):null)}async setFocus(){m(this.inputNode)}internalSetValue(t,i,a=!0){if(t){const i=e(t);if(s(i)){const{internalColor:t}=this,n=!t||i!==e(t.hex());return this.internalColor=l(i),this.previousNonNullValue=i,this.value=i,void(n&&a&&this.calciteColorPickerHexInputChange.emit())}}else if(this.allowEmpty)return this.internalColor=null,this.value=null,void(a&&this.calciteColorPickerHexInputChange.emit());this.value=i}formatForInternalInput(t){return t?t.replace("#",""):""}nudgeRGBChannels(t,i){return l.rgb(t.array().map((t=>t+i)))}handleKeyDown(t){"Enter"===t.key&&t.preventDefault()}get el(){return n(this)}static get watchers(){return{value:["handleValueChange"]}}};u.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:block}.container{display:inline-grid;inline-size:100%;align-items:center;grid-template-columns:1fr auto}.preview{grid-column:2/3;pointer-events:none;margin-block:0px;margin-inline:0.25rem;display:flex;align-items:center}.preview,.input{grid-row:1}.input{grid-column:1/3;inline-size:100%;text-transform:uppercase}";export{u as calcite_color_picker_hex_input}