/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{r as t,c as i,h as e,g as s}from"./p-c2f00d41.js";import{c as n}from"./p-f5d21f80.js";import{D as a,T as o,a as l,H as r,C as h,b as c,R as d}from"./p-34dee41d.js";import{i as p,b as u,f as m}from"./p-83166522.js";import{n as f,C as g,p as b,c as v}from"./p-991ee695.js";import{c as x}from"./p-63f6e8f1.js";import{u as w}from"./p-7daea1df.js";import{i as y}from"./p-73e23995.js";import{d as k,i as C}from"./p-4e32bf8c.js";import"./p-e1a4994d.js";import"./p-729708a3.js";import"./p-a80b3880.js";const S=f(a.hex()),D=class{constructor(s){var m,b,v,w;t(this,s),this.calciteColorPickerChange=i(this,"calciteColorPickerChange",6),this.calciteColorPickerInput=i(this,"calciteColorPickerInput",6),this.allowEmpty=!1,this.appearance="solid",this.color=a,this.disabled=!1,this.format="auto",this.hideHex=!1,this.hideChannels=!1,this.hideSaved=!1,this.intlB=o.b,this.intlBlue=o.blue,this.intlDeleteColor=o.deleteColor,this.intlG=o.g,this.intlGreen=o.green,this.intlH=o.h,this.intlHsv=o.hsv,this.intlHex=o.hex,this.intlHue=o.hue,this.intlNoColor=o.noColor,this.intlR=o.r,this.intlRed=o.red,this.intlRgb=o.rgb,this.intlS=o.s,this.intlSaturation=o.saturation,this.intlSaveColor=o.saveColor,this.intlSaved=o.saved,this.intlV=o.v,this.intlValue=o.value,this.scale="m",this.value=S,this.colorFieldAndSliderHovered=!1,this.hueThumbState="idle",this.internalColorUpdateContext=null,this.mode=g.HEX,this.shiftKeyChannelAdjustment=0,this.sliderThumbState="idle",this.colorFieldAndSliderInteractive=!1,this.channelMode="rgb",this.channels=this.toChannels(a),this.dimensions=l.m,this.savedColors=[],this.handleTabActivate=t=>{this.channelMode=t.currentTarget.getAttribute("data-color-mode"),this.updateChannelsFromColor(this.color)},this.handleColorFieldScopeKeyDown=t=>{const{key:i}=t,e={ArrowUp:{x:0,y:-10},ArrowRight:{x:10,y:0},ArrowDown:{x:0,y:10},ArrowLeft:{x:-10,y:0}};e[i]&&(t.preventDefault(),this.scopeOrientation="ArrowDown"===i||"ArrowUp"===i?"vertical":"horizontal",this.captureColorFieldColor(this.colorFieldScopeLeft+e[i].x||0,this.colorFieldScopeTop+e[i].y||0,!1))},this.handleHueScopeKeyDown=t=>{const i=t.shiftKey?10:1,{key:e}=t,s={ArrowUp:1,ArrowRight:1,ArrowDown:-1,ArrowLeft:-1};if(s[e]){t.preventDefault();const n=s[e]*i,a=this.baseColorFieldColor.hue(),o=this.baseColorFieldColor.hue(a+n);this.internalColorSet(o,!1)}},this.handleHexInputChange=t=>{t.stopPropagation();const{allowEmpty:i,color:e}=this,s=t.target.value;!i||s?s!==(e&&f(e.hex()))&&this.internalColorSet(n(s)):this.internalColorSet(null)},this.handleSavedColorSelect=t=>{this.internalColorSet(n(t.currentTarget.color))},this.handleChannelInput=t=>{const i=t.currentTarget,e=t.detail.nativeEvent.target,s=Number(i.getAttribute("data-channel-index")),n="rgb"===this.channelMode?d[Object.keys(d)[s]]:r[Object.keys(r)[s]];let a;if(this.allowEmpty&&!i.value)a="";else{const t=Number(i.value)+this.shiftKeyChannelAdjustment;a=x(t,0,n).toString()}i.value=a,e.value=a},this.handleChannelChange=t=>{const i=t.currentTarget,e=Number(i.getAttribute("data-channel-index")),s=[...this.channels];if(this.allowEmpty&&!i.value)return this.channels=[null,null,null],void this.internalColorSet(null);s[e]=Number(i.value),this.updateColorFromChannels(s)},this.handleSavedColorKeyDown=t=>{y(t.key)&&(t.preventDefault(),this.handleSavedColorSelect(t))},this.handleColorFieldAndSliderPointerLeave=()=>{this.colorFieldAndSliderInteractive=!1,this.colorFieldAndSliderHovered=!1,"drag"!==this.sliderThumbState&&"drag"!==this.hueThumbState&&(this.hueThumbState="idle",this.sliderThumbState="idle",this.drawColorFieldAndSlider())},this.handleColorFieldAndSliderPointerDown=t=>{var i,e;if(!p(t))return;const{offsetX:s,offsetY:n}=t,a=this.getCanvasRegion(n);"color-field"===a?(this.hueThumbState="drag",this.captureColorFieldColor(s,n),null===(i=this.colorFieldScopeNode)||void 0===i||i.focus()):"slider"===a&&(this.sliderThumbState="drag",this.captureHueSliderColor(s),null===(e=this.hueScopeNode)||void 0===e||e.focus()),t.preventDefault(),document.addEventListener("pointermove",this.globalPointerMoveHandler),document.addEventListener("pointerup",this.globalPointerUpHandler,{once:!0}),this.activeColorFieldAndSliderRect=this.fieldAndSliderRenderingContext.canvas.getBoundingClientRect()},this.globalPointerUpHandler=t=>{if(!p(t))return;const i="drag"===this.sliderThumbState||"drag"===this.hueThumbState;this.hueThumbState="idle",this.sliderThumbState="idle",this.activeColorFieldAndSliderRect=null,this.drawColorFieldAndSlider(),i&&this.calciteColorPickerChange.emit()},this.globalPointerMoveHandler=t=>{const{el:i,dimensions:e}=this,s="drag"===this.hueThumbState;if(!i.isConnected||"drag"!==this.sliderThumbState&&!s)return;let n,a;const o=this.activeColorFieldAndSliderRect,{clientX:l,clientY:r}=t;if(this.colorFieldAndSliderHovered)n=l-o.x,a=r-o.y;else{const t=e.colorField.width,i=e.colorField.height,s=e.slider.height;n=l<o.x+t&&l>o.x?l-o.x:l<o.x?0:t-1,a=r<o.y+i+s&&r>o.y?r-o.y:r<o.y?0:i+s}s?this.captureColorFieldColor(n,a,!1):this.captureHueSliderColor(n)},this.handleColorFieldAndSliderPointerEnterOrMove=({offsetX:t,offsetY:i})=>{const{dimensions:{colorField:e,slider:s,thumb:n}}=this;this.colorFieldAndSliderInteractive=i<=e.height+s.height,this.colorFieldAndSliderHovered=!0;const a=this.getCanvasRegion(i);if("color-field"===a){const s=this.hueThumbState,a=this.baseColorFieldColor.hsv(),o=Math.round(a.saturationv()/(r.s/e.width)),l=Math.round(e.height-a.value()/(r.v/e.height)),h=this.containsPoint(t,i,o,l,n.radius);let c=!1;"idle"===s&&h?(this.hueThumbState="hover",c=!0):"hover"!==s||h||(this.hueThumbState="idle",c=!0),"drag"!==this.hueThumbState&&c&&this.drawColorFieldAndSlider()}else if("slider"===a){const a=this.baseColorFieldColor.hsv().saturationv(100).value(100),o=this.sliderThumbState,l=Math.round(a.hue()/(360/s.width)),r=Math.round((s.height+this.getSliderCapSpacing())/2)+e.height,h=this.containsPoint(t,i,l,r,n.radius);let c=!1;"idle"===o&&h?(this.sliderThumbState="hover",c=!0):"hover"!==o||h||(this.sliderThumbState="idle",c=!0),"drag"!==this.sliderThumbState&&c&&this.drawColorFieldAndSlider()}},this.storeColorFieldScope=t=>{this.colorFieldScopeNode=t},this.storeHueScope=t=>{this.hueScopeNode=t},this.renderChannelsTabTitle=t=>{const{channelMode:i,intlRgb:s,intlHsv:n}=this;return e("calcite-tab-title",{active:t===i,class:h.colorMode,"data-color-mode":t,key:t,onCalciteTabsActivate:this.handleTabActivate},"rgb"===t?s:n)},this.renderChannelsTab=t=>{const{channelMode:i,channels:s,intlB:n,intlBlue:a,intlG:o,intlGreen:l,intlH:r,intlHue:c,intlR:d,intlRed:p,intlS:m,intlSaturation:f,intlV:g,intlValue:b}=this,v=t===i,x="rgb"===t,w=x?[d,o,n]:[r,m,g],y=x?[p,l,a]:[c,f,b],k=u(this.el);return e("calcite-tab",{active:v,class:h.control,key:t},e("div",{class:h.channels,dir:"ltr"},s.map(((t,i)=>this.renderChannel(t,i,w[i],y[i],k)))))},this.renderChannel=(t,i,s,n,a)=>e("calcite-input",{class:h.channel,"data-channel-index":i,dir:a,label:n,numberButtonType:"none",numberingSystem:this.numberingSystem,onCalciteInputChange:this.handleChannelChange,onCalciteInputInput:this.handleChannelInput,onKeyDown:this.handleKeyDown,prefixText:s,scale:"l"===this.scale?"m":"s",type:"number",value:null==t?void 0:t.toString()}),this.deleteColor=()=>{const t=this.color.hex();if(!(this.savedColors.indexOf(t)>-1))return;const i=this.savedColors.filter((i=>i!==t));this.savedColors=i,this.storageId&&localStorage.setItem(`${c}${this.storageId}`,JSON.stringify(i))},this.saveColor=()=>{const t=this.color.hex();if(this.savedColors.indexOf(t)>-1)return;const i=[...this.savedColors,t];this.savedColors=i,this.storageId&&localStorage.setItem(`${c}${this.storageId}`,JSON.stringify(i))},this.drawColorFieldAndSlider=(m=()=>{this.fieldAndSliderRenderingContext&&(this.drawColorField(),this.drawHueSlider())},v=!0,w=!0,C(b)&&(v="leading"in b?!!b.leading:v,w="trailing"in b?!!b.trailing:w),k(m,16,{leading:v,maxWait:16,trailing:w})),this.captureColorFieldColor=(t,i,e=!0)=>{const{dimensions:{colorField:{height:s,width:n}}}=this,a=Math.round(r.s/n*t),o=Math.round(r.v/s*(s-i));this.internalColorSet(this.baseColorFieldColor.hsv().saturationv(a).value(o),e)},this.initColorFieldAndSlider=t=>{this.fieldAndSliderRenderingContext=t.getContext("2d"),this.updateCanvasSize(t)}}handleColorChange(t,i){this.drawColorFieldAndSlider(),this.updateChannelsFromColor(t),this.previousColor=i}handleFormatChange(t){this.setMode(t),this.internalColorSet(this.color,!1,"internal")}handleScaleChange(t="m"){var i;this.updateDimensions(t),this.updateCanvasSize(null===(i=this.fieldAndSliderRenderingContext)||void 0===i?void 0:i.canvas)}handleValueChange(t,i){const{allowEmpty:e,format:s}=this;let a=!1;if(!e||t){const e=b(t);if(!e||"auto"!==s&&e!==s)return this.showIncompatibleColorWarning(t,s),void(this.value=i);a=this.mode!==e,this.setMode(e)}const o="drag"===this.sliderThumbState||"drag"===this.hueThumbState;if("initial"===this.internalColorUpdateContext)return;if("user-interaction"===this.internalColorUpdateContext)return this.calciteColorPickerInput.emit(),void(o||this.calciteColorPickerChange.emit());const l=e&&!t?null:n(t),r=!v(l,this.color);(a||r)&&this.internalColorSet(l,!0,"internal")}get baseColorFieldColor(){return this.color||this.previousColor||a}handleChannelKeyUpOrDown(t){this.shiftKeyChannelAdjustment=0;const{key:i}=t;if("ArrowUp"!==i&&"ArrowDown"!==i||!t.composedPath().some((t=>{var i;return null===(i=t.classList)||void 0===i?void 0:i.contains(h.channel)})))return;const{shiftKey:e}=t;if(t.preventDefault(),!this.color)return this.internalColorSet(this.previousColor),void t.stopPropagation();this.shiftKeyChannelAdjustment="ArrowUp"===i&&e?9:"ArrowDown"===i&&e?-9:0}async setFocus(){return m(this.colorFieldScopeNode)}componentWillLoad(){const{allowEmpty:t,color:i,format:e,value:s}=this,a=t&&!s,o=b(s),l=a||"auto"===e&&o||e===o,r=a?null:l?n(s):i;l||this.showIncompatibleColorWarning(s,e),this.setMode(e),this.internalColorSet(r,!1,"initial"),this.updateDimensions(this.scale);const h=`${c}${this.storageId}`;this.storageId&&localStorage.getItem(h)&&(this.savedColors=JSON.parse(localStorage.getItem(h)))}disconnectedCallback(){document.removeEventListener("pointermove",this.globalPointerMoveHandler),document.removeEventListener("pointerup",this.globalPointerUpHandler)}componentDidRender(){w(this)}render(){const{allowEmpty:t,color:i,intlDeleteColor:s,hideHex:n,hideChannels:o,hideSaved:l,intlHex:c,intlSaved:d,intlSaveColor:p,savedColors:u,scale:m}=this,f=i?i.hex():null,g="l"===m?"m":"s",{colorFieldAndSliderInteractive:b,colorFieldScopeTop:v,colorFieldScopeLeft:x,hueScopeLeft:w,hueScopeTop:y,scopeOrientation:k,dimensions:{colorField:{height:C,width:S},slider:{height:D}}}=this,F=null!=y?y:D/2+C,A=null!=w?w:S*a.hue()/r.h,z=null===i,j="vertical"===k;return e("div",{class:h.container},e("div",{class:h.colorFieldAndSliderWrap},e("canvas",{class:{[h.colorFieldAndSlider]:!0,[h.colorFieldAndSliderInteractive]:b},onPointerDown:this.handleColorFieldAndSliderPointerDown,onPointerEnter:this.handleColorFieldAndSliderPointerEnterOrMove,onPointerLeave:this.handleColorFieldAndSliderPointerLeave,onPointerMove:this.handleColorFieldAndSliderPointerEnterOrMove,ref:this.initColorFieldAndSlider}),e("div",{"aria-label":j?this.intlValue:this.intlSaturation,"aria-valuemax":j?r.v:r.s,"aria-valuemin":"0","aria-valuenow":(j?null==i?void 0:i.saturationv():null==i?void 0:i.value())||"0",class:{[h.scope]:!0,[h.colorFieldScope]:!0},onKeyDown:this.handleColorFieldScopeKeyDown,ref:this.storeColorFieldScope,role:"slider",style:{top:`${v||0}px`,left:`${x||0}px`},tabindex:"0"}),e("div",{"aria-label":this.intlHue,"aria-valuemax":r.h,"aria-valuemin":"0","aria-valuenow":(null==i?void 0:i.round().hue())||a.round().hue(),class:{[h.scope]:!0,[h.hueScope]:!0},onKeyDown:this.handleHueScopeKeyDown,ref:this.storeHueScope,role:"slider",style:{top:`${F}px`,left:`${A}px`},tabindex:"0"})),n&&o?null:e("div",{class:{[h.controlSection]:!0,[h.section]:!0}},n?null:e("div",{class:h.hexOptions},e("span",{class:{[h.header]:!0,[h.headerHex]:!0}},c),e("calcite-color-picker-hex-input",{allowEmpty:t,class:h.control,numberingSystem:this.numberingSystem,onCalciteColorPickerHexInputChange:this.handleHexInputChange,scale:g,value:f})),o?null:e("calcite-tabs",{class:{[h.colorModeContainer]:!0,[h.splitSection]:!0},scale:g},e("calcite-tab-nav",{slot:"tab-nav"},this.renderChannelsTabTitle("rgb"),this.renderChannelsTabTitle("hsv")),this.renderChannelsTab("rgb"),this.renderChannelsTab("hsv"))),l?null:e("div",{class:{[h.savedColorsSection]:!0,[h.section]:!0}},e("div",{class:h.header},e("label",null,d),e("div",{class:h.savedColorsButtons},e("calcite-button",{appearance:"transparent",class:h.deleteColor,color:"neutral",disabled:z,iconStart:"minus",label:s,onClick:this.deleteColor,scale:g,type:"button"}),e("calcite-button",{appearance:"transparent",class:h.saveColor,color:"neutral",disabled:z,iconStart:"plus",label:p,onClick:this.saveColor,scale:g,type:"button"}))),u.length>0?e("div",{class:h.savedColors},[...u.map((t=>e("calcite-color-picker-swatch",{active:f===t,class:h.savedColor,color:t,key:t,onClick:this.handleSavedColorSelect,onKeyDown:this.handleSavedColorKeyDown,scale:m,tabIndex:0})))]):null))}handleKeyDown(t){"Enter"===t.key&&t.preventDefault()}showIncompatibleColorWarning(t,i){console.warn(`ignoring color value (${t}) as it is not compatible with the current format (${i})`)}setMode(t){this.mode="auto"===t?this.mode:t}captureHueSliderColor(t){const{dimensions:{slider:{width:i}}}=this;this.internalColorSet(this.baseColorFieldColor.hue(360/i*t),!1)}getCanvasRegion(t){const{dimensions:{colorField:{height:i},slider:{height:e}}}=this;return t<=i?"color-field":t<=i+e?"slider":"none"}internalColorSet(t,i=!0,e="user-interaction"){i&&v(t,this.color)||(this.internalColorUpdateContext=e,this.color=t,this.value=this.toValue(t),this.internalColorUpdateContext=null)}toValue(t,i=this.mode){if(!t)return null;if(i.includes("hex"))return f(t.round().hex());if(i.includes("-css"))return t[i.replace("-css","").replace("a","")]().round().string();const e=t[i]().round().object();return i.endsWith("a")&&(e.a=e.alpha,delete e.alpha),e}getSliderCapSpacing(){const{dimensions:{slider:{height:t},thumb:{radius:i}}}=this;return 2*i-t}updateDimensions(t="m"){this.dimensions=l[t]}drawColorField(){const t=this.fieldAndSliderRenderingContext,{dimensions:{colorField:{height:i,width:e}}}=this;t.fillStyle=this.baseColorFieldColor.hsv().saturationv(100).value(100).string(),t.fillRect(0,0,e,i);const s=t.createLinearGradient(0,0,e,0);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=s,t.fillRect(0,0,e,i);const n=t.createLinearGradient(0,0,0,i);n.addColorStop(0,"rgba(0,0,0,0)"),n.addColorStop(1,"rgba(0,0,0,1)"),t.fillStyle=n,t.fillRect(0,0,e,i),this.drawActiveColorFieldColor()}setCanvasContextSize(t,{height:i,width:e}){const s=window.devicePixelRatio||1;t.width=e*s,t.height=i*s,t.style.height=`${i}px`,t.style.width=`${e}px`,t.getContext("2d").scale(s,s)}updateCanvasSize(t){t&&(this.setCanvasContextSize(t,{width:this.dimensions.colorField.width,height:this.dimensions.colorField.height+this.dimensions.slider.height+2*this.getSliderCapSpacing()}),this.drawColorFieldAndSlider())}containsPoint(t,i,e,s,n){return Math.pow(t-e,2)+Math.pow(i-s,2)<=Math.pow(n,2)}drawActiveColorFieldColor(){const{color:t}=this;if(!t)return;const i=t.hsv(),{dimensions:{colorField:{height:e,width:s},thumb:{radius:n}}}=this,a=i.saturationv()/(r.s/s),o=e-i.value()/(r.v/e);requestAnimationFrame((()=>{this.colorFieldScopeLeft=a,this.colorFieldScopeTop=o})),this.drawThumb(this.fieldAndSliderRenderingContext,n,a,o,i,this.hueThumbState)}drawThumb(t,i,e,s,n,a){const o=2*Math.PI;t.beginPath(),t.arc(e,s,i,0,o),t.shadowBlur="hover"===a?32:16,t.shadowColor=`rgba(0, 0, 0, ${"drag"===a?.32:.16})`,t.fillStyle="#fff",t.fill(),t.beginPath(),t.arc(e,s,i-3,0,o),t.shadowBlur=0,t.shadowColor="transparent",t.fillStyle=n.rgb().string(),t.fill()}drawActiveHueSliderColor(){const{color:t}=this;if(!t)return;const i=t.hsv().saturationv(100).value(100),{dimensions:{colorField:{height:e},slider:{height:s,width:n},thumb:{radius:a}}}=this,o=i.hue()/(360/n),l=s/2+e;requestAnimationFrame((()=>{this.hueScopeLeft=o,this.hueScopeTop=l})),this.drawThumb(this.fieldAndSliderRenderingContext,a,o,l,i,this.sliderThumbState)}drawHueSlider(){const t=this.fieldAndSliderRenderingContext,{dimensions:{colorField:{height:i},slider:{height:e,width:s}}}=this,a=t.createLinearGradient(0,0,s,0),o=["red","yellow","lime","cyan","blue","magenta","red"],l=1/(o.length-1);let r=0;o.forEach((t=>{a.addColorStop(r,n(t).string()),r+=l})),t.fillStyle=a,t.clearRect(0,i,s,e+2*this.getSliderCapSpacing()),t.fillRect(0,i,s,e),this.drawActiveHueSliderColor()}updateColorFromChannels(t){this.internalColorSet(n(t,this.channelMode))}updateChannelsFromColor(t){this.channels=t?this.toChannels(t):[null,null,null]}toChannels(t){const{channelMode:i}=this;return t[i]().array().map((t=>Math.floor(t)))}get el(){return s(this)}static get watchers(){return{color:["handleColorChange"],format:["handleFormatChange"],scale:["handleScaleChange"],value:["handleValueChange"]}}};D.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:inline-block;font-size:var(--calcite-font-size--2);line-height:1rem;font-weight:var(--calcite-font-weight-normal)}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host([scale=s]) .container{inline-size:160px}:host([scale=s]) .saved-colors{grid-template-columns:repeat(auto-fill, minmax(20px, 1fr))}:host([scale=s]) .channels{flex-direction:column}:host([scale=s]) .channel{inline-size:100%;-webkit-margin-after:4px;margin-block-end:4px}:host([scale=s]) .channel:last-child{-webkit-margin-after:0;margin-block-end:0}:host([scale=m]) .container{inline-size:272px}:host([scale=l]) .header{-webkit-padding-after:0px;padding-block-end:0px}:host([scale=l]){font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=l]) .container{inline-size:464px}:host([scale=l]) .color-field-and-slider{-webkit-margin-after:-20px;margin-block-end:-20px}:host([scale=l]) .section{padding-block:0 16px;padding-inline:16px}:host([scale=l]) .section:first-of-type{-webkit-padding-before:16px;padding-block-start:16px}:host([scale=l]) .saved-colors{grid-template-columns:repeat(auto-fill, minmax(28px, 1fr));grid-gap:12px;-webkit-padding-before:16px;padding-block-start:16px}:host([scale=l]) .control-section{flex-wrap:nowrap;align-items:baseline}:host([scale=l]) .control-section>:nth-child(2){-webkit-margin-start:12px;margin-inline-start:12px}:host([scale=l]) .color-hex-options{display:flex;flex-shrink:1;flex-direction:column;justify-content:space-around;min-block-size:98px;inline-size:160px}:host([scale=l]) .color-mode-container{flex-shrink:3}:host([appearance=minimal]) .container{border:none}.container{background-color:var(--calcite-ui-foreground-1);display:inline-block;border:1px solid var(--calcite-ui-border-1)}.color-field-and-slider-wrap{position:relative}.scope{pointer-events:none;position:absolute;font-size:var(--calcite-font-size--1);outline-color:transparent;outline-offset:14px}.scope:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:16px}.color-field-and-slider{-webkit-margin-after:-16px;margin-block-end:-16px;touch-action:none}.color-field-and-slider--interactive{cursor:pointer}.control-section{display:flex;flex-direction:row;flex-wrap:wrap}.section{padding-block:0 12px;padding-inline:12px}.section:first-of-type{-webkit-padding-before:12px;padding-block-start:12px}.color-hex-options,.section--split{flex-grow:1}.header{display:flex;align-items:center;justify-content:space-between;-webkit-padding-after:0.25rem;padding-block-end:0.25rem;color:var(--calcite-ui-text-1)}.header--hex,.color-mode-container{-webkit-padding-before:12px;padding-block-start:12px}.channels{display:flex;justify-content:space-between}.channel{inline-size:31%}.saved-colors{-webkit-padding-before:12px;padding-block-start:12px;display:grid;grid-template-columns:repeat(auto-fill, minmax(24px, 1fr));grid-gap:8px;inline-size:100%}.saved-colors-buttons{display:flex}.saved-color{outline-offset:0;outline-color:transparent;cursor:pointer}.saved-color:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:2px}.saved-color:hover{transition:outline-color var(--calcite-internal-animation-timing-fast) ease-in-out;outline:2px solid var(--calcite-ui-border-2);outline-offset:2px}";export{D as calcite_color_picker}