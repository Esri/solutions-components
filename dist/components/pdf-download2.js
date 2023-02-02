/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { proxyCustomElement, HTMLElement as HTMLElement$1, h as h$7, Host } from '@stencil/core/internal/client';
import { e as exportCSV } from './csvUtils.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { q as queryFeaturesByID } from './queryUtils.js';
import { d as defineCustomElement$3 } from './icon.js';
import { d as defineCustomElement$2 } from './option.js';
import { d as defineCustomElement$1 } from './select.js';

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function r$6(n){return null!=n}function t$7(n){return null==n}function e$9(n){return n}function s$b(n){return r$6(n)&&n.destroy(),null}function h$6(n){return r$6(n)&&n.remove(),null}function d$4(n){return null}function x$3(n){return n}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function i$8(n,e,r){if(t$7(n)&&t$7(e))return !0;if(t$7(n)||t$7(e)||n.length!==e.length)return !1;if(r){for(let t=0;t<n.length;t++)if(!r(n[t],e[t]))return !1}else for(let t=0;t<n.length;t++)if(n[t]!==e[t])return !1;return !0}class x$2{constructor(){this.last=0;}}const y$3=new x$2;function b$3(t,n,e,r){r=r||y$3;const o=Math.max(0,r.last-10);for(let l=o;l<e;++l)if(t[l]===n)return r.last=l,l;const f=Math.min(o,e);for(let l=0;l<f;++l)if(t[l]===n)return r.last=l,l;return -1}const A$4=new Set;function j$4(t,n,e=t.length,r=n.length,o,f){if(0===r||0===e)return e;A$4.clear();for(let u=0;u<r;++u)A$4.add(n[u]);o=o||y$3;const l=Math.max(0,o.last-10);for(let u=l;u<e;++u)if(A$4.has(t[u])&&(f&&f.push(t[u]),A$4.delete(t[u]),t[u]=t[e-1],--e,--u,0===A$4.size||0===e))return A$4.clear(),e;for(let u=0;u<l;++u)if(A$4.has(t[u])&&(f&&f.push(t[u]),A$4.delete(t[u]),t[u]=t[e-1],--e,--u,0===A$4.size||0===e))return A$4.clear(),e;return A$4.clear(),e}function C$1(t,n){const e=t.indexOf(n);return -1!==e?(t.splice(e,1),n):null}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function t$6(r,n,t){if(r.slice)return r.slice(n,t);void 0===n?n=0:(n<0&&(n+=r.length),n=Math.min(r.length,Math.max(0,n))),void 0===t?t=r.length:(t<0&&(t+=r.length),t=Math.min(r.length,Math.max(0,t)));const o=Math.max(0,t-n),c=new(r.constructor)(o);for(let e=0;e<o;e++)c[e]=r[n+e];return c}function c$7(r){return r instanceof Int8Array||r&&r.constructor&&"Int8Array"===r.constructor.name}function e$8(r){return r instanceof Uint8Array||r&&r.constructor&&"Uint8Array"===r.constructor.name}function a$9(r){return r instanceof Uint8ClampedArray||r&&r.constructor&&"Uint8ClampedArray"===r.constructor.name}function u$6(r){return r instanceof Int16Array||r&&r.constructor&&"Int16Array"===r.constructor.name}function i$7(r){return r instanceof Uint16Array||r&&r.constructor&&"Uint16Array"===r.constructor.name}function f$4(r){return r instanceof Int32Array||r&&r.constructor&&"Int32Array"===r.constructor.name}function s$a(r){return r instanceof Uint32Array||r&&r.constructor&&"Uint32Array"===r.constructor.name}function y$2(r){return r instanceof Float32Array||r&&r.constructor&&"Float32Array"===r.constructor.name}function A$3(r){return r instanceof Float64Array||r&&r.constructor&&"Float64Array"===r.constructor.name}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function p$2(t,n){let e;if(n)for(e in t)t.hasOwnProperty(e)&&(void 0===t[e]?delete t[e]:t[e]instanceof Object&&p$2(t[e],!0));else for(e in t)t.hasOwnProperty(e)&&void 0===t[e]&&delete t[e];return t}function y$1(t){if(!t||"object"!=typeof t||"function"==typeof t)return t;const e=h$5(t);if(r$6(e))return e;if(b$2(t))return t.clone();if(g$2(t))return t.map(y$1);if(O$1(t))return t.clone();const r={};for(const n of Object.getOwnPropertyNames(t))r[n]=y$1(t[n]);return r}function b$2(t){return "function"==typeof t.clone}function g$2(t){return "function"==typeof t.map&&"function"==typeof t.forEach}function O$1(t){return "function"==typeof t.notifyChange&&"function"==typeof t.watch}function j$3(t){if("[object Object]"!==Object.prototype.toString.call(t))return !1;const n=Object.getPrototypeOf(t);return null===n||n===Object.prototype}function h$5(t){if(c$7(t)||e$8(t)||a$9(t)||u$6(t)||i$7(t)||f$4(t)||s$a(t)||y$2(t)||A$3(t))return t$6(t);if(t instanceof Date)return new Date(t.getTime());if(t instanceof ArrayBuffer){return t.slice(0,t.byteLength)}if(t instanceof Map){const n=new Map;for(const[e,r]of t)n.set(e,y$1(r));return n}if(t instanceof Set){const n=new Set;for(const e of t)n.add(y$1(e));return n}return null}function w$1(t,n){return t===n||"number"==typeof t&&isNaN(t)&&"number"==typeof n&&isNaN(n)||"function"==typeof(t||{}).getTime&&"function"==typeof(n||{}).getTime&&t.getTime()===n.getTime()||!1}function N$1(n,e){return n===e||(null==n||"string"==typeof n?n===e:"number"==typeof n?n===e||"number"==typeof e&&isNaN(n)&&isNaN(e):n instanceof Date?e instanceof Date&&n.getTime()===e.getTime():Array.isArray(n)?Array.isArray(e)&&i$8(n,e):n instanceof Set?e instanceof Set&&d$3(n,e):n instanceof Map?e instanceof Map&&P$2(n,e):!!j$3(n)&&(j$3(e)&&T$1(n,e)))}function T$1(t,n){if(null===t||null===n)return !1;const e=Object.keys(t);if(null===n||Object.keys(n).length!==e.length)return !1;for(const r of e)if(t[r]!==n[r]||!Object.prototype.hasOwnProperty.call(n,r))return !1;return !0}function d$3(t,n){if(t.size!==n.size)return !1;for(const e of t)if(!n.has(e))return !1;return !0}function P$2(t,n){if(t.size!==n.size)return !1;for(const[e,r]of t){const t=n.get(e);if(t!==r||void 0===t&&!n.has(e))return !1}return !0}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function n$3(r,n,t=!1){return i$6(r,n,t)}function t$5(r,n){if(null!=n)return n[r]||e$7(r.split("."),!1,n)}function o$6(r,n,t){const o=r.split("."),i=o.pop(),u=e$7(o,!0,t);u&&i&&(u[i]=n);}function e$7(r,n,t){let o=t;for(const e of r){if(null==o)return;if(!(e in o)){if(!n)return;o[e]={};}o=o[e];}return o}function i$6(n,t,o){return t?Object.keys(t).reduce(((n,e)=>{let u=n[e],c=t[e];return u===c?n:void 0===u?(n[e]=y$1(c),n):(Array.isArray(c)||Array.isArray(n)?(u=u?Array.isArray(u)?n[e]=u.concat():n[e]=[u]:n[e]=[],c&&(Array.isArray(c)||(c=[c]),o?c.forEach((r=>{u.includes(r)||u.push(r);})):n[e]=c.concat())):c&&"object"==typeof c?n[e]=i$6(u,c,o):n.hasOwnProperty(e)&&!t.hasOwnProperty(e)||(n[e]=c),n)}),n||{}):n}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
class s$9{constructor(s,o={ignoreUnknown:!1,useNumericKeys:!1}){this._jsonToAPI=s,this._options=o,this.apiValues=[],this.jsonValues=[],this._apiToJSON=this._invertMap(s),this.apiValues=this._getKeysSorted(this._apiToJSON),this.jsonValues=this._getKeysSorted(this._jsonToAPI),this.read=t=>this.fromJSON(t),this.write=(s,o,i)=>{const n=this.toJSON(s);void 0!==n&&o$6(i,n,o);},this.write.isJSONMapWriter=!0;}toJSON(t){if(this._apiToJSON.hasOwnProperty(t)){const s=this._apiToJSON[t];return this._options.useNumericKeys?+s:s}return this._options.ignoreUnknown?void 0:t}fromJSON(t){return this._jsonToAPI.hasOwnProperty(t)?this._jsonToAPI[t]:this._options.ignoreUnknown?void 0:t}_invertMap(t){const s={};for(const o in t)s[t[o]]=o;return s}_getKeysSorted(t){const s=[];for(const o in t)s.push(o);return s.sort(),s}}function o$5(){return function(t,o){return new s$9(t,{ignoreUnknown:!0,...o})}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
let o$4;const e$6=globalThis.esriConfig?.locale??globalThis.dojoConfig?.locale;function t$4(){return e$6??globalThis.navigator?.language??"en"}function l$3(){return void 0===o$4&&(o$4=t$4()),o$4}const u$5=[];function s$8(n){return u$5.push(n),{remove(){u$5.splice(u$5.indexOf(n),1);}}}const f$3=[];function g$1(n){return f$3.push(n),{remove(){u$5.splice(f$3.indexOf(n),1);}}}function h$4(){const e=t$4();o$4!==e&&(o$4=e,[...f$3].forEach((n=>{n.call(null,e);})),[...u$5].forEach((n=>{n.call(null,e);})));}globalThis.addEventListener?.("languagechange",h$4);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const r$5={year:"numeric",month:"numeric",day:"numeric"},n$2={year:"numeric",month:"long",day:"numeric"},a$8={year:"numeric",month:"short",day:"numeric"},h$3={year:"numeric",month:"long",weekday:"long",day:"numeric"},m$4={hour:"numeric",minute:"numeric"},i$5={...m$4,second:"numeric"},s$7={"short-date":r$5,"short-date-short-time":{...r$5,...m$4},"short-date-short-time-24":{...r$5,...m$4,hour12:!1},"short-date-long-time":{...r$5,...i$5},"short-date-long-time-24":{...r$5,...i$5,hour12:!1},"short-date-le":r$5,"short-date-le-short-time":{...r$5,...m$4},"short-date-le-short-time-24":{...r$5,...m$4,hour12:!1},"short-date-le-long-time":{...r$5,...i$5},"short-date-le-long-time-24":{...r$5,...i$5,hour12:!1},"long-month-day-year":n$2,"long-month-day-year-short-time":{...n$2,...m$4},"long-month-day-year-short-time-24":{...n$2,...m$4,hour12:!1},"long-month-day-year-long-time":{...n$2,...i$5},"long-month-day-year-long-time-24":{...n$2,...i$5,hour12:!1},"day-short-month-year":a$8,"day-short-month-year-short-time":{...a$8,...m$4},"day-short-month-year-short-time-24":{...a$8,...m$4,hour12:!1},"day-short-month-year-long-time":{...a$8,...i$5},"day-short-month-year-long-time-24":{...a$8,...i$5,hour12:!1},"long-date":h$3,"long-date-short-time":{...h$3,...m$4},"long-date-short-time-24":{...h$3,...m$4,hour12:!1},"long-date-long-time":{...h$3,...i$5},"long-date-long-time-24":{...h$3,...i$5,hour12:!1},"long-month-year":{month:"long",year:"numeric"},"short-month-year":{month:"short",year:"numeric"},year:{year:"numeric"},"short-time":m$4,"long-time":i$5},l$2=o$5()({shortDate:"short-date",shortDateShortTime:"short-date-short-time",shortDateShortTime24:"short-date-short-time-24",shortDateLongTime:"short-date-long-time",shortDateLongTime24:"short-date-long-time-24",shortDateLE:"short-date-le",shortDateLEShortTime:"short-date-le-short-time",shortDateLEShortTime24:"short-date-le-short-time-24",shortDateLELongTime:"short-date-le-long-time",shortDateLELongTime24:"short-date-le-long-time-24",longMonthDayYear:"long-month-day-year",longMonthDayYearShortTime:"long-month-day-year-short-time",longMonthDayYearShortTime24:"long-month-day-year-short-time-24",longMonthDayYearLongTime:"long-month-day-year-long-time",longMonthDayYearLongTime24:"long-month-day-year-long-time-24",dayShortMonthYear:"day-short-month-year",dayShortMonthYearShortTime:"day-short-month-year-short-time",dayShortMonthYearShortTime24:"day-short-month-year-short-time-24",dayShortMonthYearLongTime:"day-short-month-year-long-time",dayShortMonthYearLongTime24:"day-short-month-year-long-time-24",longDate:"long-date",longDateShortTime:"long-date-short-time",longDateShortTime24:"long-date-short-time-24",longDateLongTime:"long-date-long-time",longDateLongTime24:"long-date-long-time-24",longMonthYear:"long-month-year",shortMonthYear:"short-month-year",year:"year"});l$2.toJSON.bind(l$2);l$2.fromJSON.bind(l$2);const u$4={ar:"ar-u-nu-latn-ca-gregory"};let c$6=new WeakMap,D$3=s$7["short-date-short-time"];function T(t){const o=t||D$3;let r=c$6.get(o);if(!r){const t=l$3(),n=u$4[l$3()]||t;r=new Intl.DateTimeFormat(n,o),c$6.set(o,r);}return r}function L$1(t,o){return T(o).format(t)}g$1((()=>{c$6=new WeakMap,D$3=s$7["short-date-short-time"];}));

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const a$7={ar:"ar-u-nu-latn"};let e$5=new WeakMap,o$3={};function i$4(n){const i=n||o$3;if(!e$5.has(i)){const t=l$3(),o=a$7[l$3()]||t;e$5.set(i,new Intl.NumberFormat(o,n));}return x$3(e$5.get(i))}function m$3(t,n){return -0===t&&(t=0),i$4(n).format(t)}g$1((()=>{e$5=new WeakMap,o$3={};}));

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
let e$4;function has(a){return "function"==typeof e$4[a]?e$4[a]=e$4[a](globalThis):e$4[a]}e$4=globalThis.dojoConfig?.has||globalThis.esriConfig?.has?{...globalThis.dojoConfig?.has,...globalThis.esriConfig?.has}:{},has.add=(a,d,o,r)=>((r||void 0===e$4[a])&&(e$4[a]=d),o&&has(a)),has.cache=e$4,has.add("esri-deprecation-warnings",!0),(()=>{has.add("host-webworker",void 0!==globalThis.WorkerGlobalScope&&self instanceof globalThis.WorkerGlobalScope);const e="undefined"!=typeof window&&"undefined"!=typeof location&&"undefined"!=typeof document&&window.location===location&&window.document===document;if(has.add("host-browser",e),has.add("host-node","object"==typeof globalThis.process&&globalThis.process.versions?.node&&globalThis.process.versions.v8),has.add("dom",e),has("host-browser")){const e=navigator,a=e.userAgent,d=e.appVersion,o=parseFloat(d);if(has.add("wp",parseFloat(a.split("Windows Phone")[1])||void 0),has.add("msapp",parseFloat(a.split("MSAppHost/")[1])||void 0),has.add("khtml",d.includes("Konqueror")?o:void 0),has.add("edge",parseFloat(a.split("Edge/")[1])||void 0),has.add("opr",parseFloat(a.split("OPR/")[1])||void 0),has.add("webkit",!has("wp")&&!has("edge")&&parseFloat(a.split("WebKit/")[1])||void 0),has.add("chrome",!has("edge")&&!has("opr")&&parseFloat(a.split("Chrome/")[1])||void 0),has.add("android",!has("wp")&&parseFloat(a.split("Android ")[1])||void 0),has.add("safari",!d.includes("Safari")||has("wp")||has("chrome")||has("android")||has("edge")||has("opr")?void 0:parseFloat(d.split("Version/")[1])),has.add("mac",d.includes("Macintosh")),!has("wp")&&a.match(/(iPhone|iPod|iPad)/)){const e=RegExp.$1.replace(/P/,"p"),d=a.match(/OS ([\d_]+)/)?RegExp.$1:"1",o=parseFloat(d.replace(/_/,".").replace(/_/g,""));has.add(e,o),has.add("ios",o);}has.add("trident",parseFloat(d.split("Trident/")[1])||void 0),has("webkit")||(!a.includes("Gecko")||has("wp")||has("khtml")||has("trident")||has("edge")||has.add("mozilla",o),has("mozilla")&&has.add("ff",parseFloat(a.split("Firefox/")[1]||a.split("Minefield/")[1])||void 0));}})(),(()=>{if(globalThis.navigator){const e=navigator.userAgent,a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i.test(e),d=/iPhone/i.test(e);a&&has.add("esri-mobile",a),d&&has.add("esri-iPhone",d),has.add("esri-geolocation",!!navigator.geolocation);}has.add("esri-canvas-svg-support",!has("trident")),has.add("esri-wasm","WebAssembly"in globalThis),has.add("esri-shared-array-buffer",(()=>{const e="SharedArrayBuffer"in globalThis,a=!1===globalThis.crossOriginIsolated;return e&&!a})),has.add("wasm-simd",(()=>{const e=[0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11];return WebAssembly.validate(new Uint8Array(e))})),has.add("esri-atomics","Atomics"in globalThis),has.add("esri-workers","Worker"in globalThis),has.add("web-feat:cache","caches"in globalThis),has.add("esri-workers-arraybuffer-transfer",!has("safari")||Number(has("safari"))>=12),has.add("featurelayer-simplify-thresholds",[.5,.5,.5,.5]),has.add("featurelayer-simplify-payload-size-factors",[1,1,4]),has.add("featurelayer-snapshot-enabled",!0),has.add("featurelayer-snapshot-point-min-threshold",8e4),has.add("featurelayer-snapshot-point-max-threshold",4e5),has.add("featurelayer-snapshot-point-coverage",.1),has.add("featurelayer-advanced-symbols",!1),has.add("featurelayer-pbf",!0),has.add("featurelayer-pbf-statistics",!1),has.add("feature-layers-workers",!0),has.add("feature-polyline-generalization-factor",1),has.add("mapview-transitions-duration",200),has.add("mapview-srswitch-adjust-rotation-scale-threshold",24e6),has.add("mapserver-pbf-enabled",!1),has.add("mapimagelayer-popup-identify-max-tolerance",20),has.add("heatmap-allow-raster-fallback",!0),has.add("heatmap-force-raster",!1),has("host-webworker")||has("host-browser")&&(has.add("esri-csp-restrictions",(()=>{try{new Function;}catch{return !0}return !1})),has.add("esri-image-decode",(()=>{if("decode"in new Image){const e=new Image;return e.src='data:image/svg+xml;charset=UTF-8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>',void e.decode().then((()=>{has.add("esri-image-decode",!0,!0,!0);})).catch((()=>{has.add("esri-image-decode",!1,!0,!0);}))}return !1})),has.add("esri-url-encodes-apostrophe",(()=>{const e=window.document.createElement("a");return e.href="?'",e.href.includes("?%27")})));})();

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const s$6={analysisTheme:{accentColor:[255,128,0],textColor:"white"},apiKey:void 0,applicationUrl:globalThis.location?.href,assetsPath:"",fontsUrl:"https://static.arcgis.com/fonts",geometryServiceUrl:"https://utility.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer",geoRSSServiceUrl:"https://utility.arcgis.com/sharing/rss",kmlServiceUrl:"https://utility.arcgis.com/sharing/kml",portalUrl:"https://www.arcgis.com",routeServiceUrl:"https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",workers:{loaderConfig:{has:{},paths:{},map:{},packages:[]}},request:{crossOriginNoCorsDomains:null,httpsDomains:["arcgis.com","arcgisonline.com","esrikr.com","premiumservices.blackbridge.com","esripremium.accuweather.com","gbm.digitalglobe.com","firstlook.digitalglobe.com","msi.digitalglobe.com"],interceptors:[],maxUrlLength:2e3,priority:"high",proxyRules:[],proxyUrl:null,timeout:6e4,trustedServers:[],useIdentity:!0},log:{interceptors:[],level:null}};if(globalThis.esriConfig&&(n$3(s$6,globalThis.esriConfig,!0),delete s$6.has),!s$6.assetsPath){{const e="4.25.5";s$6.assetsPath=`https://js.arcgis.com/${e.slice(0,-2)}/@arcgis/core/assets`;}s$6.defaultAssetsPath=s$6.assetsPath;}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const e$3=/\{([^\}]+)\}/g;function r$4(t){return t??""}function n$1(n,o){return n.replace(e$3,"object"==typeof o?(e,n)=>r$4(t$5(n,o)):(t,e)=>r$4(o(e)))}function c$5(t){let e=0;for(let r=0;r<t.length;r++)e=(e<<5)-e+t.charCodeAt(r),e|=0;return e}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const o$2={info:0,warn:1,error:2,none:3};class s$5{constructor(e){this.level=null,this._module="",this._parent=null,this.writer=null,this._loggedMessages={error:new Map,warn:new Map,info:new Map},null!=e.level&&(this.level=e.level),null!=e.writer&&(this.writer=e.writer),this._module=e.module,s$5._loggers[this.module]=this;const t=this.module.lastIndexOf(".");-1!==t&&(this._parent=s$5.getLogger(this.module.slice(0,t)));}get module(){return this._module}get parent(){return this._parent}error(...e){this._log("error","always",...e);}warn(...e){this._log("warn","always",...e);}info(...e){this._log("info","always",...e);}errorOnce(...e){this._log("error","once",...e);}warnOnce(...e){this._log("warn","once",...e);}infoOnce(...e){this._log("info","once",...e);}errorOncePerTick(...e){this._log("error","oncePerTick",...e);}warnOncePerTick(...e){this._log("warn","oncePerTick",...e);}infoOncePerTick(...e){this._log("info","oncePerTick",...e);}get test(){const e=this;return {loggedMessages:e._loggedMessages,clearLoggedWarnings:()=>e._loggedMessages.warn.clear()}}static get testSingleton(){return {resetLoggers(e={}){const t=s$5._loggers;return s$5._loggers=e,t},set throttlingDisabled(e){s$5._throttlingDisabled=e;}}}static getLogger(e){let t=s$5._loggers[e];return t||(t=new s$5({module:e})),t}_log(t,r,...o){if(!this._matchLevel(t))return;if("always"!==r&&!s$5._throttlingDisabled){const e=this._argsToKey(o),n=this._loggedMessages[t].get(e);if("once"===r&&null!=n||"oncePerTick"===r&&n&&n>=s$5._tickCounter)return;this._loggedMessages[t].set(e,s$5._tickCounter),s$5._scheduleTickCounterIncrement();}for(const s of s$6.log.interceptors)if(s(t,this.module,...o))return;this._inheritedWriter()(t,this.module,...o);}_parentWithMember(e,r){let o=this;for(;r$6(o);){const r=o[e];if(r$6(r))return r;o=o.parent;}return r}_inheritedWriter(){return this._parentWithMember("writer",this._consoleWriter)}_consoleWriter(e,t,...r){console[e](`[${t}]`,...r);}_matchLevel(t){const r=s$6.log.level?s$6.log.level:"warn";return o$2[this._parentWithMember("level",r)]<=o$2[t]}_argsToKey(...e){const t=(e,t)=>"object"!=typeof t||Array.isArray(t)?t:"[Object]";return c$5(JSON.stringify(e,t))}static _scheduleTickCounterIncrement(){s$5._tickCounterScheduled||(s$5._tickCounterScheduled=!0,Promise.resolve().then((()=>{s$5._tickCounter++,s$5._tickCounterScheduled=!1;})));}}s$5._loggers={},s$5._tickCounter=0,s$5._tickCounterScheduled=!1,s$5._throttlingDisabled=!1;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const i$3=s$5.getLogger("esri.intl.substitute");function s$4(t,r,n={}){const{format:o={}}=n;return n$1(t,(t=>u$3(t,r,o)))}function u$3(t,e,n){let o,i;const s=t.indexOf(":");if(-1===s?o=t.trim():(o=t.slice(0,s).trim(),i=t.slice(s+1).trim()),!o)return "";const u=t$5(o,e);if(null==u)return "";const m=(i?n?.[i]:null)??n?.[o];return m?c$4(u,m):i?a$6(u,i):f$2(u)}function c$4(t,r){switch(r.type){case"date":return L$1(t,r.intlOptions);case"number":return m$3(t,r.intlOptions);default:return i$3.warn("missing format descriptor for key {key}"),f$2(t)}}function a$6(t,r){switch(r.toLowerCase()){case"dateformat":return L$1(t);case"numberformat":return m$3(t);default:return i$3.warn(`inline format is unsupported since 4.12: ${r}`),/^(dateformat|datestring)/i.test(r)?L$1(t):/^numberformat/i.test(r)?m$3(t):f$2(t)}}function f$2(t){switch(typeof t){case"string":return t;case"number":return m$3(t);case"boolean":return ""+t;default:return t instanceof Date?L$1(t):""}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function e$2(e,r){return e.replace(/\$\{([^\s\:\}]*)(?:\:([^\s\:\}]+))?\}/g,((e,s)=>{if(""===s)return "$";const n=t$5(s,r),i=n??"";if(void 0===i)throw new Error(`could not find key "${s}" in template`);return i.toString()}))}class r$3{constructor(t,s,n){this.name=t,this.details=n,this instanceof r$3&&(this.message=(s&&e$2(s,n))??"");}toString(){return "["+this.name+"]: "+this.message}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
class s$3 extends r$3{constructor(e,t,r){if(super(e,t,r),!(this instanceof s$3))return new s$3(e,t,r)}toJSON(){if(null!=this.details)try{return {name:this.name,message:this.message,details:JSON.parse(JSON.stringify(this.details,((t,r)=>{if(r&&"object"==typeof r&&"function"==typeof r.toJSON)return r;try{return y$1(r)}catch(s){return "[object]"}})))}}catch(r){throw s$5.getLogger("esri.core.Error").error(r),r}return {name:this.name,message:this.message,details:this.details}}static fromJSON(e){return new s$3(e.name,e.message,e.details)}}s$3.prototype.type="error";

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function e$1(e){return {setTimeout:(t,o)=>{const r=e.setTimeout(t,o);return {remove:()=>e.clearTimeout(r)}}}}const t$3=e$1(globalThis);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function e(e){return e&&("function"==typeof e.on||"function"==typeof e.addEventListener)}function r$2(r,t,n){if(!e(r))throw new TypeError("target is not a Evented or EventTarget object");if("on"in r)return r.on(t,n);if(Array.isArray(t)){const e=t.slice();for(const t of e)r.addEventListener(t,n);return {remove(){for(const t of e)r.removeEventListener(t,n);}}}return r.addEventListener(t,n),{remove(){r.removeEventListener(t,n);}}}function t$2(t,n,o){if(!e(t))throw new TypeError("target is not a Evented or EventTarget object");if("once"in t)return t.once(n,o);const i=r$2(t,n,(e=>{i.remove(),o.call(t,e);}));return {remove(){i.remove();}}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function a$5(t="Aborted"){return new s$3("AbortError",t)}function h$2(t){return r$6(t)?"aborted"in t?t:t.signal:t}function p$1(t){const e=h$2(t);return r$6(e)&&e.aborted}function b$1(t){if(!j$2(t))throw t}function v$1(t,e){const r=h$2(t);if(!t$7(r)){if(!r.aborted)return t$2(r,"abort",(()=>e()));e();}}function j$2(t){return "AbortError"===t?.name}function A$2(){let t=null;const e=new Promise(((e,r)=>{t={promise:void 0,resolve:e,reject:r};}));return t.promise=e,t}async function E$1(t){if(!t)return;if("function"!=typeof t.forEach){const e=Object.keys(t),r=e.map((e=>t[e])),n=await E$1(r),o={};return e.map(((t,e)=>o[t]=n[e])),o}const e=t;return new Promise((t=>{const r=[];let n=e.length;0===n&&t(r),e.forEach((e=>{const o={promise:e||Promise.resolve(e)};r.push(o),o.promise.then((t=>{o.value=t;})).catch((t=>{o.error=t;})).then((()=>{--n,0===n&&t(r);}));}));}))}function U$2(t,e,r){const n=new AbortController;return v$1(r,(()=>n.abort())),new Promise(((r,o)=>{let i=setTimeout((()=>{i=0,r(e);}),t);v$1(n,(()=>{i&&(clearTimeout(i),o(a$5()));}));}))}function C(t){return t&&"function"==typeof t.then}function $$2(t){return C(t)?t:Promise.resolve(t)}function x$1(t,e=-1){let r,n,o,i,s=null;const c=(...l)=>{if(r){n=l,i&&i.reject(a$5()),i=A$2();const t=x$3(i.promise);if(s){const t=s;s=null,t.abort();}return t}if(o=i||A$2(),i=null,e>0){const n=new AbortController;r=$$2(t(...l,n.signal));const o=r;U$2(e).then((()=>{r===o&&(i?n.abort():s=n);}));}else r=1,r=$$2(t(...l));const m=()=>{const t=n;n=o=r=s=null,null!=t&&c(...t);},f=r,h=o;return f.then(m,m),f.then(h.resolve,h.reject),x$3(h.promise)};return c}function D$2(){let e,r;const n=new Promise(((t,n)=>{e=t,r=n;})),o=t=>{e(t);};return o.resolve=t=>e(t),o.reject=t=>r(t),o.timeout=(e,r)=>t$3.setTimeout((()=>o.reject(r)),e),o.promise=n,o}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const r$1=/^([a-z]{2})(?:[-_]([A-Za-z]{2}))?$/,o$1={ar:!0,bg:!0,bs:!0,ca:!0,cs:!0,da:!0,de:!0,el:!0,en:!0,es:!0,et:!0,fi:!0,fr:!0,he:!0,hr:!0,hu:!0,id:!0,it:!0,ja:!0,ko:!0,lt:!0,lv:!0,nb:!0,nl:!0,pl:!0,"pt-BR":!0,"pt-PT":!0,ro:!0,ru:!0,sk:!0,sl:!0,sr:!0,sv:!0,th:!0,tr:!0,uk:!0,vi:!0,"zh-CN":!0,"zh-HK":!0,"zh-TW":!0};function i$2(t){return o$1[t]??!1}const a$4=[],c$3=new Map;function d$2(t){for(const e of c$3.keys())_$1(t.pattern,e)&&c$3.delete(e);}function l$1(t){return a$4.includes(t)||(d$2(t),a$4.unshift(t)),{remove(){const e=a$4.indexOf(t);e>-1&&(a$4.splice(e,1),d$2(t));}}}async function u$2(t){const e=l$3();c$3.has(t)||c$3.set(t,f$1(t,e));const n=c$3.get(t);return n&&await m$2.add(n),n}function h$1(t){if(!r$1.test(t))return null;const e=r$1.exec(t);if(null===e)return null;const[,n,s]=e,o=n+(s?"-"+s.toUpperCase():"");return i$2(o)?o:i$2(n)?n:null}async function f$1(e,n){const s=[];for(const t of a$4)if(_$1(t.pattern,e))try{return await t.fetchMessageBundle(e,n)}catch(r){s.push(r);}if(s.length)throw new s$3("intl:message-bundle-error",`Errors occurred while loading "${e}"`,{errors:s});throw new s$3("intl:no-message-bundle-loader",`No loader found for message bundle "${e}"`)}function _$1(t,e){return "string"==typeof t?e.startsWith(t):t.test(e)}g$1((()=>{c$3.clear();}));const m$2=new class{constructor(){this._numLoading=0,this._dfd=null;}async waitForAll(){this._dfd&&await this._dfd.promise;}add(t){return this._increase(),t.then((()=>this._decrease()),(()=>this._decrease())),this.waitForAll()}_increase(){this._numLoading++,this._dfd||(this._dfd=A$2());}_decrease(){this._numLoading=Math.max(this._numLoading-1,0),this._dfd&&0===this._numLoading&&(this._dfd.resolve(),this._dfd=null);}};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const s$2=s$5.getLogger("esri.core.urlUtils"),u$1=s$6.request,l="esri/config: esriConfig.request.proxyUrl is not set.",c$2=/^\s*[a-z][a-z0-9-+.]*:(?![0-9])/i,f=/^\s*http:/i,a$3=/^\s*https:/i,h=/^\s*file:/i,p=/:\d+$/,d$1=/^https?:\/\/[^/]+\.arcgis.com\/sharing(\/|$)/i,g=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),m$1=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");class y{constructor(t=""){this.uri=t,this.scheme=null,this.authority=null,this.path=null,this.query=null,this.fragment=null,this.user=null,this.password=null,this.host=null,this.port=null;let n=x$3(this.uri.match(g));this.scheme=n[2]||(n[1]?"":null),this.authority=n[4]||(n[3]?"":null),this.path=n[5],this.query=n[7]||(n[6]?"":null),this.fragment=n[9]||(n[8]?"":null),null!=this.authority&&(n=x$3(this.authority.match(m$1)),this.user=n[3]||null,this.password=n[4]||null,this.host=n[6]||n[7],this.port=n[9]||null);}toString(){return this.uri}}const $$1={},x=new y(s$6.applicationUrl);let w=x;const O=q();let U$1=O;const b=()=>w;function q(){const t=x$3(w.path),n=t.substring(0,t.lastIndexOf(t.split("/")[t.split("/").length-1]));return `${`${w.scheme}://${w.host}${null!=w.port?`:${w.port}`:""}`}${n}`}function j$1(t){if(!t)return null;const n={path:null,query:null},e=new y(t),r=t.indexOf("?");return null===e.query?n.path=t:(n.path=t.substring(0,r),n.query=L(e.query)),e.fragment&&(n.hash=e.fragment,null===e.query&&(n.path=n.path.substring(0,n.path.length-(e.fragment.length+1)))),n}function L(t){const n=t.split("&"),e={};for(const r of n){if(!r)continue;const t=r.indexOf("=");let n,o;t<0?(n=decodeURIComponent(r),o=""):(n=decodeURIComponent(r.slice(0,t)),o=decodeURIComponent(r.slice(t+1)));let i=e[n];"string"==typeof i&&(i=e[n]=[i]),Array.isArray(i)?i.push(o):e[n]=o;}return e}function v(t){return t&&"object"==typeof t&&"toJSON"in t&&"function"==typeof t.toJSON}function I$1(t,n){return t?n&&"function"==typeof n?Object.keys(t).map((e=>encodeURIComponent(e)+"="+encodeURIComponent(n(e,t[e])))).join("&"):Object.keys(t).map((e=>{const r=t[e];if(null==r)return "";const o=encodeURIComponent(e)+"=",i=n&&n[e];return i?o+encodeURIComponent(i(r)):Array.isArray(r)?r.map((t=>v(t)?o+encodeURIComponent(JSON.stringify(t)):o+encodeURIComponent(t))).join("&"):v(r)?o+encodeURIComponent(JSON.stringify(r)):o+encodeURIComponent(r)})).filter((t=>t)).join("&"):""}function A$1(t=!1){let e,r=u$1.proxyUrl;if("string"==typeof t){e=ht(t);const n=J$1(t);n&&(r=n.proxyUrl);}else e=!!t;if(!r)throw s$2.warn(l),new s$3("urlutils:proxy-not-set",l);e&&$t()&&(r=mt(r));return j$1(r)}const B$1={path:"",query:""};function P$1(t){const n=t.indexOf("?");return -1!==n?(B$1.path=t.slice(0,n),B$1.query=t.slice(n+1)):(B$1.path=t,B$1.query=null),B$1}function k(t){return t=(t=xt(t=bt(t=P$1(t).path),!0)).toLowerCase()}function E(t){const n={proxyUrl:t.proxyUrl,urlPrefix:k(t.urlPrefix)},e=u$1.proxyRules,r=n.urlPrefix;let o=e.length;for(let i=0;i<e.length;i++){const t=e[i].urlPrefix;if(0===r.indexOf(t)){if(r.length===t.length)return -1;o=i;break}0===t.indexOf(r)&&(o=i+1);}return e.splice(o,0,n),o}function J$1(t){const n=u$1.proxyRules,e=k(t);for(let r=0;r<n.length;r++)if(0===e.indexOf(n[r].urlPrefix))return n[r]}function W$1(t){const n=n=>null==n||n instanceof RegExp&&n.test(t)||"string"==typeof n&&t.startsWith(n),e=u$1.interceptors;if(e)for(const r of e)if(Array.isArray(r.urls)){if(r.urls.some(n))return r}else if(n(r.urls))return r;return null}function z$1(t,n,e=!1){if(!t||!n)return !1;const r=vt(t),o=vt(n);return !(!e&&r.scheme!==o.scheme)&&(null!=r.host&&null!=o.host&&(r.host.toLowerCase()===o.host.toLowerCase()&&r.port===o.port))}function D$1(t){if("string"==typeof t){if(!K$1(t))return !0;t=vt(t);}if(z$1(t,w))return !0;const n=u$1.trustedServers||[];for(let e=0;e<n.length;e++){const r=M$1(n[e]);for(let n=0;n<r.length;n++)if(z$1(t,r[n]))return !0}return !1}function M$1(t){return $$1[t]||(at(t)||ft(t)?$$1[t]=[new y(Q$1(t))]:$$1[t]=[new y(`http://${t}`),new y(`https://${t}`)]),$$1[t]}function Q$1(t,n=U$1,e){return ft(t)?e&&e.preserveProtocolRelative?t:"http"===w.scheme&&w.authority===H$1(t).slice(2)?`http:${t}`:`https:${t}`:at(t)?t:x$3(G$1("/"===t[0]?wt(n):n,t))}function F$1(t){return t=jt(t=Rt(t=qt(t=Q$1(t=t.trim()))))}function G$1(...t){const n=t.filter(r$6);if(!n||!n.length)return;const e=[];if(K$1(n[0])){const t=n[0],r=t.indexOf("//");-1!==r&&(e.push(t.slice(0,r+1)),dt(n[0])&&(e[0]+="/"),n[0]=t.slice(r+2));}else "/"===n[0][0]&&e.push("");const r=n.reduce(((t,n)=>n?t.concat(n.split("/")):t),[]);for(let o=0;o<r.length;o++){const t=r[o];".."===t&&e.length>0&&".."!==e[e.length-1]?e.pop():(!t&&o===r.length-1||t&&("."!==t||0===e.length))&&e.push(t);}return e.join("/")}function H$1(t,n=!1){if(null==t||V$1(t)||X$1(t))return null;let e=t.indexOf("://");if(-1===e&&ft(t))e=2;else {if(-1===e)return null;e+=3;}const r=t.indexOf("/",e);return -1!==r&&(t=t.slice(0,r)),n&&(t=xt(t,!0)),t}function K$1(t){return ft(t)||at(t)}function V$1(t){return null!=t&&"blob:"===t.slice(0,5)}function X$1(t){return null!=t&&"data:"===t.slice(0,5)}function Z(t){return btoa(String.fromCharCode.apply(null,t)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function ft(t){return null!=t&&"/"===t[0]&&"/"===t[1]}function at(t){return null!=t&&c$2.test(t)}function ht(t){return null!=t&&a$3.test(t)||"https"===w.scheme&&ft(t)}function pt(t){return null!=t&&f.test(t)||"http"===w.scheme&&ft(t)}function dt(t){return null!=t&&h.test(t)}function mt(t){return ft(t)?`https:${t}`:t.replace(f,"https:")}function yt(){return "http"===w.scheme}function $t(){return "https"===w.scheme}function xt(t,n=!1){return ft(t)?t.slice(2):(t=t.replace(c$2,""),n&&t.length>1&&"/"===t[0]&&"/"===t[1]&&(t=t.slice(2)),t)}function wt(t){const n=t.indexOf("//"),e=t.indexOf("/",n+2);return -1===e?t:t.slice(0,e)}function bt(t){return t&&"/"===t[t.length-1]?t:`${t}/`}function qt(t){if(/^https?:\/\//i.test(t)){const n=P$1(t);t=(t=n.path.replace(/\/{2,}/g,"/")).replace("/","//"),n.query&&(t+=`?${n.query}`);}return t}function Rt(t){return t.replace(/^(https?:\/\/)(arcgis\.com)/i,"$1www.$2")}function jt(t){const n=u$1.httpsDomains;if(!pt(t))return t;const e=t.indexOf("/",7);let r;if(r=-1===e?t:t.slice(0,e),r=r.toLowerCase().slice(7),p.test(r)){if(!r.endsWith(":80"))return t;r=r.slice(0,-3),t=t.replace(":80","");}return yt()&&r===w.authority&&!d$1.test(t)||($t()&&r===w.authority||n&&n.some((t=>r===t||r.endsWith(`.${t}`)))||$t()&&!J$1(t))&&(t=mt(t)),t}function vt(t){return "string"==typeof t?new y(Q$1(t)):(t.scheme||(t.scheme=w.scheme),t)}function St(t,n,e){const r=j$1(t),o=r.query||{};return o[n]=String(e),`${r.path}?${I$1(o)}`}function Bt(t,n){const e=j$1(t),r=e.query||{};for(const i in n)r[i]=n[i];const o=I$1(r);return o?`${e.path}?${o}`:e.path}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
let s$1;function n(e){s$1=e;}has("host-webworker");

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function t$1(e){return /\/(sharing|usrsvcs)\/(appservices|servers)\//i.test(e)}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const t=["elevation3d.arcgis.com","js.arcgis.com","jsdev.arcgis.com","jsqa.arcgis.com","static.arcgis.com"];function r(c){const r=H$1(c,!0);return !!r&&(r.endsWith(".arcgis.com")&&!t.includes(r)&&!c.endsWith("/sharing/rest/generateToken"))}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function c$1(r,t,n=!1,s){return new Promise(((i,c)=>{if(p$1(s))return void c(a$2());let m=()=>{f(),c(new Error(`Unable to load ${t}`));},u=()=>{const e=r;f(),i(e);},d=()=>{if(!r)return;const e=r;f(),e.src="",c(a$2());};const f=()=>{has("esri-image-decode")||(r.removeEventListener("error",m),r.removeEventListener("load",u)),m=null,u=null,r=null,r$6(s)&&s.removeEventListener("abort",d),d=null,n&&URL.revokeObjectURL(t);};r$6(s)&&s.addEventListener("abort",d),has("esri-image-decode")?r.decode().then(u,m):(r.addEventListener("error",m),r.addEventListener("load",u));}))}function a$2(){try{return new DOMException("Aborted","AbortError")}catch{const r=new Error;return r.name="AbortError",r}}function m(e){s$6.request.crossOriginNoCorsDomains||(s$6.request.crossOriginNoCorsDomains={});const o=s$6.request.crossOriginNoCorsDomains;for(let r of e)r=r.toLowerCase(),/^https?:\/\//.test(r)?o[H$1(r)??""]=0:(o[H$1("http://"+r)??""]=0,o[H$1("https://"+r)??""]=0);}function u(e){const o=s$6.request.crossOriginNoCorsDomains;if(o){let r=H$1(e);if(r)return r=r.toLowerCase(),!z$1(r,b())&&o[r]<Date.now()-36e5}return !1}async function d(e){const o=s$6.request.crossOriginNoCorsDomains,n=H$1(e);o&&n&&(o[n.toLowerCase()]=Date.now());const s=j$1(e);e=s.path,"json"===s.query?.f&&(e+="?f=json");try{await fetch(e,{mode:"no-cors",credentials:"include"});}catch{}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
async function U(e,r){const t=X$1(e),s=V$1(e);s||t||(e=F$1(e));const n={url:e,requestOptions:{...e$9(r)}};let i=W$1(e);if(i){const e=await G(i,n);if(null!=e)return {data:e,getHeader:M,requestOptions:n.requestOptions,url:n.url};i.after||i.error||(i=null);}if(e=n.url,"image"===(r=n.requestOptions).responseType){if(has("host-webworker")||has("host-node"))throw N("request:invalid-parameters",new Error("responseType 'image' is not supported in Web Workers or Node environment"),n)}else if(t)throw N("request:invalid-parameters",new Error("Data URLs are not supported for responseType = "+r.responseType),n);if("head"===r.method){if(r.body)throw N("request:invalid-parameters",new Error("body parameter cannot be set when method is 'head'"),n);if(t||s)throw N("request:invalid-parameters",new Error("data and blob URLs are not supported for method 'head'"),n)}if(await B(),j)return j.execute(e,r);const l=new AbortController;v$1(r,(()=>l.abort()));const m={controller:l,credential:void 0,credentialToken:void 0,fetchOptions:void 0,hasToken:!1,interceptor:i,params:n,redoRequest:!1,useIdentity:P.useIdentity,useProxy:!1,useSSL:!1,withCredentials:!1},h=await Q(m);return i?.after?.(h),h}let j;const P=s$6.request,D="FormData"in globalThis,_=[499,498,403,401],F=["COM_0056","COM_0057","SB_0008"],I=[/\/arcgis\/tokens/i,/\/sharing(\/rest)?\/generatetoken/i,/\/rest\/info/i],M=()=>null,R=Symbol();function A(e){const r=H$1(e);r&&!U._corsServers.includes(r)&&U._corsServers.push(r);}function H(e){const r=H$1(e);return !r||r.endsWith(".arcgis.com")||U._corsServers.includes(r)||D$1(r)}function N(e,r,o,a){let l="Error";const u={url:o.url,requestOptions:o.requestOptions,getHeader:M,ssl:!1};if(r instanceof s$3)return r.details?(r.details=y$1(r.details),r.details.url=o.url,r.details.requestOptions=o.requestOptions):r.details=u,r;if(r){const e=a&&(e=>a.headers.get(e)),t=a&&a.status,s=r.message;s&&(l=s),e&&(u.getHeader=e),u.httpStatus=(null!=r.httpCode?r.httpCode:r.code)||t||0,u.subCode=r.subcode,u.messageCode=r.messageCode,"string"==typeof r.details?u.messages=[r.details]:u.messages=r.details,u.raw=R in r?r[R]:r;}return j$2(r)?a$5():new s$3(e,l,u)}async function B(){has("host-webworker")?j||(j=await import('./request.js')):U._abortableFetch||(U._abortableFetch=globalThis.fetch.bind(globalThis));}async function $(){s$1||await import('./IdentityManager.js');}async function z(t){const s=t.params.url,o=t.params.requestOptions,a=t.controller.signal,n=o.body;let i=null,u=null;if(D&&"HTMLFormElement"in globalThis&&(n instanceof FormData?i=n:n instanceof HTMLFormElement&&(i=new FormData(n))),"string"==typeof n&&(u=n),t.fetchOptions={cache:o.cacheBust&&!U._abortableFetch.polyfill?"no-cache":"default",credentials:"same-origin",headers:o.headers||{},method:"head"===o.method?"HEAD":"GET",mode:"cors",priority:P.priority,redirect:"follow",signal:a},(i||u)&&(t.fetchOptions.body=i||u),"anonymous"===o.authMode&&(t.useIdentity=!1),t.hasToken=!!(/token=/i.test(s)||o.query?.token||i?.get("token")),!t.hasToken&&s$6.apiKey&&r(s)&&(o.query||(o.query={}),o.query.token=s$6.apiKey,t.hasToken=!0),t.useIdentity&&!t.hasToken&&!t.credentialToken&&!K(s)&&!p$1(a)){let e;"immediate"===o.authMode?(await $(),e=await s$1.getCredential(s,{signal:a}),t.credential=e):"no-prompt"===o.authMode?(await $(),e=await s$1.getCredential(s,{prompt:!1,signal:a}).catch((()=>{})),t.credential=e):s$1&&(e=s$1.findCredential(s)),e&&(t.credentialToken=e.token,t.useSSL=!!e.ssl);}}function K(e){return I.some((r=>r.test(e)))}async function W(e){let t=e.params.url;const s=e.params.requestOptions,o=e.fetchOptions??{},a=V$1(t)||X$1(t),n=s.responseType||"json",l=a?0:null!=s.timeout?s.timeout:P.timeout;let d$1=!1;if(!a){e.useSSL&&(t=mt(t)),s.cacheBust&&"default"===o.cache&&(t=St(t,"request.preventCache",Date.now()));let a={...s.query};e.credentialToken&&(a.token=e.credentialToken);let n=I$1(a);has("esri-url-encodes-apostrophe")&&(n=n.replace(/'/g,"%27"));const i=t.length+1+n.length;let l;d$1="delete"===s.method||"post"===s.method||"put"===s.method||!!s.body||i>P.maxUrlLength;const u$1=s.useProxy||!!J$1(t);if(u$1){const e=A$1(t);l=e.path,!d$1&&l.length+1+i>P.maxUrlLength&&(d$1=!0),e.query&&(a={...e.query,...a});}if("HEAD"===o.method&&(d$1||u$1)){if(d$1){if(i>P.maxUrlLength)throw N("request:invalid-parameters",new Error("URL exceeds maximum length"),e.params);throw N("request:invalid-parameters",new Error("cannot use POST request when method is 'head'"),e.params)}if(u$1)throw N("request:invalid-parameters",new Error("cannot use proxy when method is 'head'"),e.params)}if(d$1?(o.method="delete"===s.method?"DELETE":"put"===s.method?"PUT":"POST",s.body?t=Bt(t,a):(o.body=I$1(a),o.headers||(o.headers={}),o.headers["Content-Type"]="application/x-www-form-urlencoded")):t=Bt(t,a),u$1&&(e.useProxy=!0,t=`${l}?${t}`),a.token&&D&&o.body instanceof FormData&&!t$1(t)&&o.body.set("token",a.token),s.hasOwnProperty("withCredentials"))e.withCredentials=s.withCredentials;else if(!z$1(t,b()))if(D$1(t))e.withCredentials=!0;else if(s$1){const s=s$1.findServerInfo(t);s&&s.webTierAuth&&(e.withCredentials=!0);}e.withCredentials&&(o.credentials="include",u(t)&&await d(d$1?Bt(t,a):t));}let p,v,C=0,L=!1;l>0&&(C=setTimeout((()=>{L=!0,e.controller.abort();}),l));try{if("native-request-init"===s.responseType)v=o,v.url=t;else if("image"!==s.responseType||"default"!==o.cache||"GET"!==o.method||d$1||J(s.headers)||!a&&!e.useProxy&&P.proxyUrl&&!H(t)){if(p=await U._abortableFetch(t,o),e.useProxy||A(t),"native"===s.responseType)v=p;else if("HEAD"!==o.method)if(p.ok){switch(n){case"array-buffer":v=await p.arrayBuffer();break;case"blob":case"image":v=await p.blob();break;default:v=await p.text();}if(C&&(clearTimeout(C),C=0),"json"===n||"xml"===n||"document"===n)if(v)switch(n){case"json":v=JSON.parse(v);break;case"xml":v=X(v,"application/xml");break;case"document":v=X(v,"text/html");}else v=null;if(v){if("array-buffer"===n||"blob"===n){const e=p.headers.get("Content-Type");if(e&&/application\/json|text\/plain/i.test(e)&&v["blob"===n?"size":"byteLength"]<=750)try{const e=await new Response(v).json();e.error&&(v=e);}catch{}}"image"===n&&v instanceof Blob&&(v=await Y(URL.createObjectURL(v),e,!0));}}else v=await p.text();}else v=await Y(t,e);}catch(j){if("AbortError"===j.name){if(L)throw new Error("Timeout exceeded");throw a$5("Request canceled")}if(!(!p&&j instanceof TypeError&&P.proxyUrl)||s.body||"delete"===s.method||"head"===s.method||"post"===s.method||"put"===s.method||e.useProxy||H(t))throw j;e.redoRequest=!0,E({proxyUrl:P.proxyUrl,urlPrefix:H$1(t)??""});}finally{C&&clearTimeout(C);}return [p,v]}async function G(e,r){if(null!=e.responseData)return e.responseData;if(e.headers&&(r.requestOptions.headers={...r.requestOptions.headers,...e.headers}),e.query&&(r.requestOptions.query={...r.requestOptions.query,...e.query}),e.before){let o,a;try{a=await e.before(r);}catch(s){o=N("request:interceptor",s,r);}if((a instanceof Error||a instanceof s$3)&&(o=N("request:interceptor",a,r)),o)throw e.error&&e.error(o),o;return a}}function J(e){if(e)for(const r of Object.getOwnPropertyNames(e))if(e[r])return !0;return !1}function X(e,r){let t;try{t=(new DOMParser).parseFromString(e,r);}catch{}if(!t||t.getElementsByTagName("parsererror").length)throw new SyntaxError("XML Parse error");return t}async function Q(e){let t,s;await z(e);try{do{[t,s]=await W(e);}while(!await V(e,t,s))}catch(n){const r=N("request:server",n,e.params,t);throw r.details.ssl=e.useSSL,e.interceptor&&e.interceptor.error&&e.interceptor.error(r),r}const o=e.params.url;if(s&&/\/sharing\/rest\/(accounts|portals)\/self/i.test(o)){if(!e.hasToken&&!e.credentialToken&&s.user?.username&&!D$1(o)){const e=H$1(o,!0);e&&P.trustedServers.push(e);}Array.isArray(s.authorizedCrossOriginNoCorsDomains)&&m(s.authorizedCrossOriginNoCorsDomains);}const a=e.credential;if(a&&s$1){const e=s$1.findServerInfo(a.server);let t=e&&e.owningSystemUrl;if(t){t=t.replace(/\/?$/,"/sharing");const e=s$1.findCredential(t,a.userId);e&&-1===s$1._getIdenticalSvcIdx(t,e)&&e.resources.unshift(t);}}return {data:s,getHeader:t?e=>t?.headers.get(e):M,requestOptions:e.params.requestOptions,ssl:e.useSSL,url:e.params.url}}async function V(e,t,s){if(e.redoRequest)return e.redoRequest=!1,!1;const o=e.params.requestOptions;if(!t||"native"===o.responseType||"native-request-init"===o.responseType)return !0;let a,n;if(!t.ok)throw a=new Error(`Unable to load ${t.url} status: ${t.status}`),a[R]=s,a;s&&(s.error?a=s.error:"error"===s.status&&Array.isArray(s.messages)&&(a={...s},a[R]=s,a.details=s.messages));let i,l=null;a&&(n=Number(a.code),l=a.hasOwnProperty("subcode")?Number(a.subcode):null,i=a.messageCode,i=i&&i.toUpperCase());const u=o.authMode;if(403===n&&(4===l||a.message&&a.message.toLowerCase().includes("ssl")&&!a.message.toLowerCase().includes("permission"))){if(!e.useSSL)return e.useSSL=!0,!1}else if(!e.hasToken&&e.useIdentity&&("no-prompt"!==u||498===n)&&void 0!==n&&_.includes(n)&&!K(e.params.url)&&(403!==n||i&&!F.includes(i)&&(null==l||2===l&&e.credentialToken))){await $();try{const t=await s$1.getCredential(e.params.url,{error:N("request:server",a,e.params),prompt:"no-prompt"!==u,signal:e.controller.signal,token:e.credentialToken});return e.credential=t,e.credentialToken=t.token,e.useSSL=e.useSSL||t.ssl,!1}catch(c){if("no-prompt"===u)return e.credential=void 0,e.credentialToken=void 0,!1;a=c;}}if(a)throw a;return !0}function Y(e,r,t=!1){const s=r.controller.signal,o=new Image;return r.withCredentials?o.crossOrigin="use-credentials":o.crossOrigin="anonymous",o.alt="",o.fetchPriority=P.priority,o.src=e,c$1(o,e,t,s)}U._abortableFetch=null,U._corsServers=["https://server.arcgisonline.com","https://services.arcgisonline.com"];

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
async function o(e,n,o,i){const a=n.exec(o);if(!a)throw new s$3("esri-intl:invalid-bundle",`Bundle id "${o}" is not compatible with the pattern "${n}"`);const c=a[1]?`${a[1]}/`:"",l=a[2],w=h$1(i),h=`${c}${l}.json`,u=w?`${c}${l}_${w}.json`:h;let f;try{f=await s(e(u));}catch(d){if(u===h)throw new s$3("intl:unknown-bundle",`Bundle "${o}" cannot be loaded`,{error:d});try{f=await s(e(h));}catch(d){throw new s$3("intl:unknown-bundle",`Bundle "${o}" cannot be loaded`,{error:d})}}return f}async function s(t){if(r$6(c.fetchBundleAsset))return c.fetchBundleAsset(t);const r=await U(t,{responseType:"text"});return JSON.parse(r.data)}class i$1{constructor({base:e="",pattern:t,location:n=new URL(window.location.href)}){let r;r="string"==typeof n?e=>new URL(e,new URL(n,window.location.href)).href:n instanceof URL?e=>new URL(e,n).href:n,this.pattern="string"==typeof t?new RegExp(`^${t}`):t,this.getAssetUrl=r,e=e?e.endsWith("/")?e:e+"/":"",this.matcher=new RegExp(`^${e}(?:(.*)/)?(.*)$`);}fetchMessageBundle(e,t){return o(this.getAssetUrl,this.matcher,e,t)}}function a$1(e){return new i$1(e)}const c={};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const i=s$5.getLogger("esri.assets");function a(t){if(!s$6.assetsPath)throw i.errorOnce("The API assets location needs to be set using config.assetsPath. More information: https://arcg.is/1OzLe50"),new s$3("assets:path-not-set","config.assetsPath is not set");return G$1(s$6.assetsPath,t)}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
l$1(a$1({pattern:"esri/",location:a}));

const labelFormats = [
	{
		descriptionPDF: {
			labelWidthDisplay: "2-5/8",
			labelHeightDisplay: "1",
			labelsPerPageDisplay: "30",
			averyPartNumber: "*60"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.1875,
				rightMargin: 0.1875,
				topMargin: 0.5,
				bottomMargin: 0.5
			},
			numLabelsAcross: 3,
			numLabelsDown: 10,
			labelWidth: 2.625,
			labelHeight: 1,
			horizGapIn: 0.125,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 11,
			maxNumLabelLines: 4
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "4",
			labelHeightDisplay: "1",
			labelsPerPageDisplay: "20",
			averyPartNumber: "*61"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.15625,
				rightMargin: 0.15625,
				topMargin: 0.47637821,
				bottomMargin: 0.5
			},
			numLabelsAcross: 2,
			numLabelsDown: 10,
			labelWidth: 4,
			labelHeight: 1.0025,
			horizGapIn: 0.1875,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 11,
			maxNumLabelLines: 4
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "4",
			labelHeightDisplay: "1-1/3",
			labelsPerPageDisplay: "14",
			averyPartNumber: "*62"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.15625,
				rightMargin: 0.15625,
				topMargin: 0.81889808,
				bottomMargin: 0.83464612
			},
			numLabelsAcross: 2,
			numLabelsDown: 7,
			labelWidth: 4,
			labelHeight: 1.3352,
			horizGapIn: 0.1875,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 11,
			maxNumLabelLines: 6
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "4",
			labelHeightDisplay: "2",
			labelsPerPageDisplay: "10",
			averyPartNumber: "*63"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.15625,
				rightMargin: 0.15625,
				topMargin: 0.5,
				bottomMargin: 0.5
			},
			numLabelsAcross: 2,
			numLabelsDown: 5,
			labelWidth: 4,
			labelHeight: 2,
			horizGapIn: 0.1875,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 12,
			maxNumLabelLines: 10
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "4",
			labelHeightDisplay: "3-1/3",
			labelsPerPageDisplay: "6",
			averyPartNumber: "*64"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.15625,
				rightMargin: 0.15625,
				topMargin: 0.4724412,
				bottomMargin: 0.50000027
			},
			numLabelsAcross: 2,
			numLabelsDown: 3,
			labelWidth: 4,
			labelHeight: 3.342,
			horizGapIn: 0.1875,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 14,
			maxNumLabelLines: 12
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "1-3/4",
			labelHeightDisplay: "1/2",
			labelsPerPageDisplay: "80",
			averyPartNumber: "*67"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.307086375,
				rightMargin: 0.307086375,
				topMargin: 0.4724412,
				bottomMargin: 0.49606326
			},
			numLabelsAcross: 4,
			numLabelsDown: 20,
			labelWidth: 1.75,
			labelHeight: 0.50155,
			horizGapIn: 0.29527575,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 8,
			maxNumLabelLines: 3
		}
	},
	{
		descriptionPDF: {
			labelWidthDisplay: "1-3/4",
			labelHeightDisplay: "2/3",
			labelsPerPageDisplay: "60",
			averyPartNumber: "*95"
		},
		labelSpec: {
			type: "AVERY",
			pageProperties: {
				pageType: "ANSI A",
				leftMargin: 0.28936983,
				rightMargin: 0.28936983,
				topMargin: 0.53937037,
				bottomMargin: 0.5511814
			},
			numLabelsAcross: 4,
			numLabelsDown: 15,
			labelWidth: 1.75,
			labelHeight: 0.6605,
			horizGapIn: 0.30708678,
			vertGapIn: 0,
			labelPadding: 0.1,
			fontSizePx: 8,
			maxNumLabelLines: 4
		}
	}
];

const pdfUtils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': labelFormats
});

const pdfDownloadCss = ":host{display:block}";

const PdfDownload = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement$1 {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.disabled = false;
    this.enabledSizeValues = [];
    this.layerView = undefined;
    this._translations = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------
  /**
   * Downloads pdf of mailing labels for the provided list of ids
   *
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   * @returns Promise resolving when function is done
   */
  async downloadPDF(ids, removeDuplicates) {
    // Get the attributes of the features to export
    const featureSet = await queryFeaturesByID(ids, this.layerView.layer);
    const featuresAttrs = featureSet.features.map(f => f.attributes);
    // What data fields are used in the labels?
    // Example labelFormat: ['{NAME}', '{STREET}', '{CITY}, {STATE} {ZIP}']
    const labelFormat = this._convertPopupToLabelSpec(this.layerView.layer.popupTemplate.content[0].text);
    // Convert attributes into an array of labels
    const labels = featuresAttrs.map(featureAttributes => {
      const label = [];
      labelFormat.forEach(labelLineTemplate => {
        const labelLine = s$4(labelLineTemplate, featureAttributes).trim();
        if (labelLine.length > 0) {
          label.push(labelLine);
        }
      });
      return label;
    }).filter(label => label.length > 0);
    if (removeDuplicates) {
      console.log("remove duplicates"); //???
    }
    console.log(labels); //???
    /*
    const contents: string[][] = attributes.map(attr => Object.values(attr));

    // Get the column headings from the first record
    const columnNames: string[] = [];
    const entry = attributes[0];
    Object.keys(entry).forEach(k => {
      if (entry.hasOwnProperty(k)) {
        columnNames.push(k);
      }
    });
    console.log(columnNames);//???

    // Extract the label data

    const labelPageDescription = this._labelInfoElement.selectedOption.value;

    return exportPDF(contents, columnNames, labelFormat, labelPageDescription, removeDuplicates);
    */
  }
  /**
   * Downloads csv of mailing labels for the provided list of ids
   *
   * @param ids List of ids to download
   * @param removeDuplicates When true a single label is generated when multiple featues have a shared address value
   * @returns Promise resolving when function is done
   */
  async downloadCSV(ids, removeDuplicates) {
    // Get the attributes of the features to export
    const featureSet = await queryFeaturesByID(ids, this.layerView.layer);
    const attributes = featureSet.features.map(f => f.attributes);
    // Get the column headings from the first record
    const columnNames = {};
    const entry = attributes[0];
    Object.keys(entry).forEach(k => {
      if (entry.hasOwnProperty(k)) {
        columnNames[k] = k;
      }
    });
    console.log(typeof attributes, typeof columnNames); //???
    const labelFormat = this._convertPopupToLabelSpec(this.layerView.layer.popupTemplate.content[0].text);
    exportCSV(attributes, columnNames, labelFormat, removeDuplicates);
    return Promise.resolve();
  }
  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   */
  async componentWillLoad() {
    await this._getTranslations();
  }
  /**
   * Renders the component.
   */
  render() {
    return (h$7(Host, null, h$7("calcite-select", { disabled: this.disabled, label: "", ref: (el) => { this._labelInfoElement = el; } }, this._renderItems())));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Converts the text of a custom popup into a multiline label specification; conversion splits text into
   * lines on <br>s, and removes HTML tags. It does not handle Arcade and related records.
   *
   * @param popupInfo Layer's popupInfo structure containing description, fieldInfos, and expressionInfos, e.g.,
   * "<div style='text-align: left;'>{NAME}<br />{STREET}<br />{CITY}, {STATE} {ZIP} <br /></div>"
   * @return Label spec
   */
  _convertPopupToLabelSpec(popupInfo) {
    // Replace <br>, <br/> with |
    popupInfo = popupInfo.replace(/<br\s*\/?>/gi, "|");
    // Remove remaining HTML tags
    let labelSpec = popupInfo.replace(/<[\s.]*[^<>]*\/?>/gi, "").split("|");
    // Trim lines and remove empties
    labelSpec = labelSpec.map(line => line.trim()).filter(line => line.length > 0);
    return labelSpec;
  }
  ;
  /**
   * Gets the formatted pdf export size text
   *
   * @param labelInfo current user selected label info
   *
   * @returns the pdf label as a string
   * @protected
   */
  _getLabelSizeText(labelInfo) {
    const lNum = labelInfo.descriptionPDF.labelsPerPageDisplay;
    const lSize = `${labelInfo.descriptionPDF.labelWidthDisplay} x ${labelInfo.descriptionPDF.labelHeightDisplay}`;
    return this._translations.pdfLabel.replace("{{n}}", lNum).replace("{{labelSize}}", lSize);
  }
  /**
   * Fetches the component's translations
   *
   * @protected
   */
  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this._translations = translations[0];
  }
  /**
   * Renders the pdf export size options
   *
   * @returns Node array of size options
   *
   * @protected
   */
  _renderItems() {
    const s = pdfUtils;
    const sortedPdfIndo = (s.default || s).sort((a, b) => {
      const _a = parseInt(a.descriptionPDF.labelsPerPageDisplay, 10);
      const _b = parseInt(b.descriptionPDF.labelsPerPageDisplay, 10);
      return _a < _b ? -1 : _a > _b ? 1 : 0;
    });
    return sortedPdfIndo.map((l) => {
      return (h$7("calcite-option", { value: l }, this._getLabelSizeText(l)));
    });
  }
  get el() { return this; }
  static get style() { return pdfDownloadCss; }
}, [1, "pdf-download", {
    "disabled": [4],
    "enabledSizeValues": [16],
    "layerView": [16],
    "_translations": [32],
    "downloadPDF": [64],
    "downloadCSV": [64]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["pdf-download", "calcite-icon", "calcite-option", "calcite-select"];
  components.forEach(tagName => { switch (tagName) {
    case "pdf-download":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, PdfDownload);
      }
      break;
    case "calcite-icon":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "calcite-option":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "calcite-select":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}
defineCustomElement();

export { n as $, A$2 as A, r$2 as B, C$1 as C, s$4 as D, E$1 as E, i$8 as F, s$1 as G, p$2 as H, y as I, j$1 as J, D$2 as K, v$1 as L, p$1 as M, N$1 as N, z$1 as O, PdfDownload as P, Q$1 as Q, L as R, I$1 as S, t$1 as T, U, s$6 as V, F$1 as W, J$1 as X, t$5 as Y, Z, Bt as _, s$5 as a, d$4 as b, x$2 as c, defineCustomElement as d, e$9 as e, b$3 as f, r$3 as g, has as h, s$b as i, j$4 as j, h$6 as k, a$5 as l, j$2 as m, a as n, o$6 as o, x$1 as p, b$1 as q, r$6 as r, s$3 as s, t$7 as t, s$8 as u, u$2 as v, w$1 as w, x$3 as x, y$1 as y, e as z };
