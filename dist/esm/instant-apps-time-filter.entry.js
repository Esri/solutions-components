/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h as h$2, H as Host, g as getElement } from './index-b793d9aa.js';
import { c as createStore } from './index-2c724afd.js';
import { l as loadModules } from './loadModules-03ba7abe.js';
import { g as getMessages } from './locale-adb5ff0b.js';
import './esri-loader-c6842c6b.js';
import './_commonjsHelpers-089957fe.js';
import './languageUtil-2b6e191a.js';

const { state, onChange } = createStore({
    timeInfoConfigItems: [],
    filterMode: { type: 'filter' },
    view: null,
    timeSlider: null,
    timeInfoItems: [],
    selectedTimeInfoItem: null,
    loading: true,
    timeSliderConfig: {},
    autoPlay: false,
});

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
let e$b;function has(a){return "function"==typeof e$b[a]?e$b[a]=e$b[a](globalThis):e$b[a]}e$b=globalThis.dojoConfig?.has||globalThis.esriConfig?.has?{...globalThis.dojoConfig?.has,...globalThis.esriConfig?.has}:{},has.add=(a,d,o,i)=>((i||void 0===e$b[a])&&(e$b[a]=d),o&&has(a)),has.cache=e$b,has.add("big-integer-warning-enabled",!0),has.add("esri-deprecation-warnings",!0),has.add("esri-tests-disable-screenshots",!1),has.add("esri-tests-use-full-window",!1),has.add("esri-tests-post-to-influx",!0),has.add("esri-cim-animations-enable-status","enabled"),has.add("esri-cim-animations-spotlight",!1),has.add("esri-cim-animations-freeze-time",!1),(()=>{has.add("host-webworker",void 0!==globalThis.WorkerGlobalScope&&self instanceof globalThis.WorkerGlobalScope);const e="undefined"!=typeof window&&"undefined"!=typeof location&&"undefined"!=typeof document&&window.location===location&&window.document===document;if(has.add("host-browser",e),has.add("host-node","object"==typeof globalThis.process&&globalThis.process.versions?.node&&globalThis.process.versions.v8),has.add("dom",e),has("host-browser")){const e=navigator,a=e.userAgent,d=e.appVersion,o=parseFloat(d);if(has.add("wp",parseFloat(a.split("Windows Phone")[1])||void 0),has.add("msapp",parseFloat(a.split("MSAppHost/")[1])||void 0),has.add("khtml",d.includes("Konqueror")?o:void 0),has.add("edge",parseFloat(a.split("Edge/")[1])||void 0),has.add("opr",parseFloat(a.split("OPR/")[1])||void 0),has.add("webkit",!has("wp")&&!has("edge")&&parseFloat(a.split("WebKit/")[1])||void 0),has.add("chrome",!has("edge")&&!has("opr")&&parseFloat(a.split("Chrome/")[1])||void 0),has.add("android",!has("wp")&&parseFloat(a.split("Android ")[1])||void 0),has.add("safari",!d.includes("Safari")||has("wp")||has("chrome")||has("android")||has("edge")||has("opr")?void 0:parseFloat(d.split("Version/")[1])),has.add("mac",d.includes("Macintosh")),!has("wp")&&/(iPhone|iPod|iPad)/.test(a)){const e=RegExp.$1.replace(/P/,"p"),d=/OS ([\d_]+)/.test(a)?RegExp.$1:"1",o=parseFloat(d.replace(/_/,".").replaceAll("_",""));has.add(e,o),has.add("ios",o);}has("webkit")||(!a.includes("Gecko")||has("wp")||has("khtml")||has("edge")||has.add("mozilla",o),has("mozilla")&&has.add("ff",parseFloat(a.split("Firefox/")[1]||a.split("Minefield/")[1])||void 0));}})(),(()=>{if(globalThis.navigator){const e=navigator.userAgent,a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i.test(e),d=/iPhone/i.test(e);a&&has.add("esri-mobile",a),d&&has.add("esri-iPhone",d),has.add("esri-geolocation",!!navigator.geolocation);}has.add("esri-wasm","WebAssembly"in globalThis),has.add("esri-performance-mode-frames-between-render",20),has.add("esri-force-performance-mode",!1),has.add("esri-shared-array-buffer",(()=>{const e="SharedArrayBuffer"in globalThis,a=!1===globalThis.crossOriginIsolated;return e&&!a})),has.add("wasm-simd",(()=>{const e=[0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11];return WebAssembly.validate(new Uint8Array(e))})),has.add("esri-atomics","Atomics"in globalThis),has.add("esri-workers","Worker"in globalThis),has.add("web-feat:cache","caches"in globalThis),has.add("esri-workers-arraybuffer-transfer",!has("safari")||Number(has("safari"))>=12),has.add("workers-pool-size",8),has.add("featurelayer-simplify-thresholds",[.5,.5,.5,.5]),has.add("featurelayer-simplify-payload-size-factors",[1,1,4]),has.add("featurelayer-fast-triangulation-enabled",!0),has.add("featurelayer-animation-enabled",!0),has.add("featurelayer-snapshot-enabled",!0),has.add("featurelayer-snapshot-point-min-threshold",8e4),has.add("featurelayer-snapshot-point-max-threshold",4e5),has.add("featurelayer-snapshot-point-coverage",.1),has.add("featurelayer-query-max-depth",4),has.add("featurelayer-query-pausing-enabled",!1),has.add("featurelayer-advanced-symbols",!1),has.add("featurelayer-pbf",!0),has.add("featurelayer-pbf-statistics",!1),has.add("feature-layers-workers",!0),has.add("feature-polyline-generalization-factor",1),has.add("mapview-transitions-duration",200),has.add("mapview-essential-goto-duration",200),has.add("mapview-srswitch-adjust-rotation-scale-threshold",24e6),has.add("mapserver-pbf-version-support",10.81),has.add("mapservice-popup-identify-max-tolerance",20),has("host-webworker")||has("host-browser")&&(has.add("esri-csp-restrictions",(()=>{try{new Function;}catch{return !0}return !1})),has.add("esri-image-decode",(()=>{if("decode"in new Image){const e=new Image;return e.src='data:image/svg+xml;charset=UTF-8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>',void e.decode().then((()=>{has.add("esri-image-decode",!0,!0,!0);})).catch((()=>{has.add("esri-image-decode",!1,!0,!0);}))}return !1})),has.add("esri-url-encodes-apostrophe",(()=>{const e=window.document.createElement("a");return e.href="?'",e.href.includes("?%27")})));})();

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
function o$8(n){return "Int8Array"===n?.constructor?.name}function u$6(n){return "Uint8Array"===n?.constructor?.name}function e$a(n){return "Uint8ClampedArray"===n?.constructor?.name}function c$6(n){return "Int16Array"===n?.constructor?.name}function i$6(n){return "Uint16Array"===n?.constructor?.name}function a$5(n){return "Int32Array"===n?.constructor?.name}function f$5(n){return "Uint32Array"===n?.constructor?.name}function s$6(n){return "Float32Array"===n?.constructor?.name}function m$5(n){return "Float64Array"===n?.constructor?.name}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
function a$4(t){if(!t||"object"!=typeof t||"function"==typeof t)return t;const n=O$2(t);if(null!=n)return n;if(y$4(t))return t.clone();if(m$4(t))return t.map(a$4);if(b$2(t))return t.clone();const e={};for(const r of Object.getOwnPropertyNames(t))e[r]=a$4(t[r]);return e}function y$4(t){return "function"==typeof t.clone}function m$4(t){return "function"==typeof t.map&&"function"==typeof t.forEach}function b$2(t){return "function"==typeof t.notifyChange&&"function"==typeof t.watch}function O$2(t){if(o$8(t)||u$6(t)||e$a(t)||c$6(t)||i$6(t)||a$5(t)||f$5(t)||s$6(t)||m$5(t))return t.slice();if(t instanceof Date)return new Date(t.getTime());if(t instanceof ArrayBuffer){return t.slice(0,t.byteLength)}if(t instanceof Map){const n=new Map;for(const[e,r]of t)n.set(e,a$4(r));return n}if(t instanceof Set){const n=new Set;for(const e of t)n.add(a$4(e));return n}return null}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
function n$7(r,n,t=!1){return f$4(r,n,t)}function t$4(r,n){if(null!=n)return n[r]||u$5(r.split("."),!1,n)}function u$5(r,n,t){let e=t;for(const i of r){if(null==e)return;if(!(i in e)){if(!n)return;e[i]={};}e=e[i];}return e}function f$4(n,t,e){return t?Object.keys(t).reduce(((n,i)=>{let u=n[i],l=t[i];return u===l?n:void 0===u?(n[i]=a$4(l),n):(Array.isArray(l)||Array.isArray(n)?(u=u?Array.isArray(u)?n[i]=u.slice():n[i]=[u]:n[i]=[],l&&(Array.isArray(l)||(l=[l]),e?l.forEach((r=>{u.includes(r)||u.push(r);})):n[i]=l.slice())):l&&"object"==typeof l?n[i]=f$4(u,l,e):n.hasOwnProperty(i)&&!t.hasOwnProperty(i)||(n[i]=l),n)}),n||{}):n}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
const e$9="20240821";

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
const s$5={apiKey:void 0,applicationName:"",applicationUrl:globalThis.location?.href,assetsPath:"",fontsUrl:"https://static.arcgis.com/fonts",geometryServiceUrl:"https://utility.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer",geoRSSServiceUrl:"https://utility.arcgis.com/sharing/rss",kmlServiceUrl:"https://utility.arcgis.com/sharing/kml",userPrivilegesApplied:!0,portalUrl:"https://www.arcgis.com",respectPrefersReducedMotion:!0,routeServiceUrl:"https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",workers:{loaderConfig:{has:{},paths:{},map:{},packages:[]}},request:{crossOriginNoCorsDomains:null,httpsDomains:["arcgis.com","arcgisonline.com","esrikr.com","premiumservices.blackbridge.com","esripremium.accuweather.com","gbm.digitalglobe.com","firstlook.digitalglobe.com","msi.digitalglobe.com"],interceptors:[],internalInterceptors:[],maxUrlLength:2e3,priority:"high",proxyRules:[],proxyUrl:null,timeout:6e4,trustedServers:[],useIdentity:!0},log:{interceptors:[],level:null}};if(globalThis.esriConfig&&(n$7(s$5,globalThis.esriConfig,!0),delete s$5.has),!s$5.assetsPath){{const e="4.31.0";s$5.assetsPath=`https://cdn.jsdelivr.net/npm/@arcgis/core@${e}-next.${e$9}/assets`;}s$5.defaultAssetsPath=s$5.assetsPath;}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
function l$6(t){let e=0;for(let n=0;n<t.length;n++)e=(e<<5)-e+t.charCodeAt(n),e|=0;return e}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
const r$6={info:0,warn:1,error:2,none:3};class n$6{constructor(e){this.level=null,this._module="",this._parent=null,this.writer=null,this._loggedMessages={error:new Map,warn:new Map,info:new Map},null!=e.level&&(this.level=e.level),null!=e.writer&&(this.writer=e.writer),this._module=e.module,n$6._loggers.set(this.module,this);const t=this.module.lastIndexOf(".");-1!==t&&(this._parent=n$6.getLogger(this.module.slice(0,t)));}get module(){return this._module}get parent(){return this._parent}error(...e){this._log("error","always",...e);}warn(...e){this._log("warn","always",...e);}info(...e){this._log("info","always",...e);}errorOnce(...e){this._log("error","once",...e);}warnOnce(...e){this._log("warn","once",...e);}infoOnce(...e){this._log("info","once",...e);}errorOncePerTick(...e){this._log("error","oncePerTick",...e);}warnOncePerTick(...e){this._log("warn","oncePerTick",...e);}infoOncePerTick(...e){this._log("info","oncePerTick",...e);}get test(){}static get test(){}static getLogger(e){return e="string"!=typeof e?e.declaredClass:e,n$6._loggers.get(e)||new n$6({module:e})}_log(t,r,...i){if(!this._matchLevel(t))return;if("always"!==r&&!n$6._throttlingDisabled){const e=o$7(i),s=this._loggedMessages[t].get(e);if("once"===r&&null!=s||"oncePerTick"===r&&s&&s>=n$6._tickCounter)return;this._loggedMessages[t].set(e,n$6._tickCounter),n$6._scheduleTickCounterIncrement();}for(const n of s$5.log.interceptors)if(n(t,this.module,...i))return;this._inheritedWriter()(t,this.module,...i);}_parentWithMember(e,t){let r=this;for(;null!=r;){const t=r[e];if(null!=t)return t;r=r.parent;}return t}_inheritedWriter(){return this._parentWithMember("writer",i$5)}_matchLevel(t){const n=s$5.log.level||"warn";return r$6[this._parentWithMember("level",n)]<=r$6[t]}static _scheduleTickCounterIncrement(){n$6._tickCounterScheduled||(n$6._tickCounterScheduled=!0,Promise.resolve().then((()=>{n$6._tickCounter++,n$6._tickCounterScheduled=!1;})));}}function i$5(e,t,...r){console[e](`[${t}]`,...r);}function o$7(...e){const r=(e,t)=>"object"!=typeof t||Array.isArray(t)?t:"[Object]";return l$6(JSON.stringify(e,r))}n$6._loggers=new Map,n$6._tickCounter=0,n$6._tickCounterScheduled=!1,n$6._throttlingDisabled=!1;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
function s$4(s,e){return s.replaceAll(/\$\{([^\s:}]*)(?::([^\s:}]+))?\}/g,((s,r)=>{if(""===r)return "$";const i=t$4(r,e);return (i??"").toString()}))}class e$8{constructor(t,e,r=void 0){this.name=t,this.details=r,this.message=(e&&s$4(e,r))??"";}toString(){return "["+this.name+"]: "+this.message}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
class s$3 extends e$8{constructor(e,t,r){super(e,t,r);}toJSON(){if(null!=this.details)try{return {name:this.name,message:this.message,details:JSON.parse(JSON.stringify(this.details,((t,r)=>{if(r&&"object"==typeof r&&"function"==typeof r.toJSON)return r;try{return a$4(r)}catch(s){return "[object]"}})))}}catch(r){throw n$6.getLogger("esri.core.Error").error(r),r}return {name:this.name,message:this.message,details:this.details}}static fromJSON(e){return new s$3(e.name,e.message,e.details)}}s$3.prototype.type="error";

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
const e$7={transparent:[0,0,0,0],black:[0,0,0,1],silver:[192,192,192,1],gray:[128,128,128,1],white:[255,255,255,1],maroon:[128,0,0,1],red:[255,0,0,1],purple:[128,0,128,1],fuchsia:[255,0,255,1],green:[0,128,0,1],lime:[0,255,0,1],olive:[128,128,0,1],yellow:[255,255,0,1],navy:[0,0,128,1],blue:[0,0,255,1],teal:[0,128,128,1],aqua:[0,255,255,1],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],blanchedalmond:[255,235,205,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],oldlace:[253,245,230,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],rebeccapurple:[102,51,153,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],whitesmoke:[245,245,245,1],yellowgreen:[154,205,50,1]};function r$5(r){return !!e$7[r]||!!e$7[r.toLowerCase()]}function l$5(r){return e$7[r]??e$7[r.toLowerCase()]}function a$3(e){return [...l$5(e)]}function n$5(e,r,l){l<0&&++l,l>1&&--l;const a=6*l;return a<1?e+(r-e)*a:2*l<1?r:3*l<2?e+(r-e)*(2/3-l)*6:e}function i$4(e,r,l,a=1){const i=(e%360+360)%360/360,o=l<=.5?l*(r+1):l+r-l*r,t=2*l-o;return [Math.round(255*n$5(t,o,i+1/3)),Math.round(255*n$5(t,o,i)),Math.round(255*n$5(t,o,i-1/3)),a]}function o$6(e){const r=e.length>5,l=r?8:4,a=(1<<l)-1,n=r?1:17,i=r?9===e.length:5===e.length;let o=Number("0x"+e.slice(1));if(isNaN(o))return null;const t=[0,0,0,1];let d;return i&&(d=o&a,o>>=l,t[3]=n*d/255),d=o&a,o>>=l,t[2]=n*d,d=o&a,o>>=l,t[1]=n*d,d=o&a,o>>=l,t[0]=n*d,t}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
const r$4=96;function e$6(n){return n?72*n/r$4:0}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
function e$5(){const e=new Float32Array(16);return e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function r$3(e){const r=new Float32Array(16);return r[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=e[3],r[4]=e[4],r[5]=e[5],r[6]=e[6],r[7]=e[7],r[8]=e[8],r[9]=e[9],r[10]=e[10],r[11]=e[11],r[12]=e[12],r[13]=e[13],r[14]=e[14],r[15]=e[15],r}function t$3(e,r,t,n,o,a,c,u,l,f,i,s,y,w,A,F){const _=new Float32Array(16);return _[0]=e,_[1]=r,_[2]=t,_[3]=n,_[4]=o,_[5]=a,_[6]=c,_[7]=u,_[8]=l,_[9]=f,_[10]=i,_[11]=s,_[12]=y,_[13]=w,_[14]=A,_[15]=F,_}function n$4(e,r){return new Float32Array(e,r,16)}const o$5=e$5();Object.freeze(Object.defineProperty({__proto__:null,IDENTITY:o$5,clone:r$3,create:e$5,createView:n$4,fromValues:t$3},Symbol.toStringTag,{value:"Module"}));

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
function n$3(){return [0,0,0]}function t$2(n){return [n[0],n[1],n[2]]}function r$2(n,t,r){return [n,t,r]}function e$4(t,r=n$3()){const e=Math.min(3,t.length);for(let n=0;n<e;++n)r[n]=t[n];return r}function u$4(n,t){return new Float64Array(n,t,3)}function o$4(){return n$3()}function c$5(){return r$2(1,1,1)}function i$3(){return r$2(1,0,0)}function f$3(){return r$2(0,1,0)}function a$2(){return r$2(0,0,1)}const l$4=o$4(),_$1=c$5(),s$2=i$3(),m$3=f$3(),y$3=a$2();Object.freeze(Object.defineProperty({__proto__:null,ONES:_$1,UNIT_X:s$2,UNIT_Y:m$3,UNIT_Z:y$3,ZEROS:l$4,clone:t$2,create:n$3,createView:u$4,fromArray:e$4,fromValues:r$2,ones:c$5,unitX:i$3,unitY:f$3,unitZ:a$2,zeros:o$4},Symbol.toStringTag,{value:"Module"}));

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
let t$1=1e-6;function e$3(){return t$1}function n$2(e){t$1=e;}const o$3=Math.random,a$1=Math.PI/180,r$1=180/Math.PI;function u$3(t){return t*a$1}function c$4(t){return t*r$1}function i$2(e,n){return Math.abs(e-n)<=t$1*Math.max(1,Math.abs(e),Math.abs(n))}Object.freeze(Object.defineProperty({__proto__:null,RANDOM:o$3,equals:i$2,getEpsilon:e$3,setEpsilon:n$2,toDegree:c$4,toRadian:u$3},Symbol.toStringTag,{value:"Module"}));

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
function n$1(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15],t}function r(t,a,n,r,o,s,e,h,u,M,c,i,f,b,l,m,x){return t[0]=a,t[1]=n,t[2]=r,t[3]=o,t[4]=s,t[5]=e,t[6]=h,t[7]=u,t[8]=M,t[9]=c,t[10]=i,t[11]=f,t[12]=b,t[13]=l,t[14]=m,t[15]=x,t}function o$2(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function s$1(t,a){if(t===a){const n=a[1],r=a[2],o=a[3],s=a[6],e=a[7],h=a[11];t[1]=a[4],t[2]=a[8],t[3]=a[12],t[4]=n,t[6]=a[9],t[7]=a[13],t[8]=r,t[9]=s,t[11]=a[14],t[12]=o,t[13]=e,t[14]=h;}else t[0]=a[0],t[1]=a[4],t[2]=a[8],t[3]=a[12],t[4]=a[1],t[5]=a[5],t[6]=a[9],t[7]=a[13],t[8]=a[2],t[9]=a[6],t[10]=a[10],t[11]=a[14],t[12]=a[3],t[13]=a[7],t[14]=a[11],t[15]=a[15];return t}function e$2(t,a){return h$1(t,a)||o$2(t),t}function h$1(t,a){const n=a[0],r=a[1],o=a[2],s=a[3],e=a[4],h=a[5],u=a[6],M=a[7],c=a[8],i=a[9],f=a[10],b=a[11],l=a[12],m=a[13],x=a[14],q=a[15],d=n*h-r*e,p=n*u-o*e,g=n*M-s*e,y=r*u-o*h,R=r*M-s*h,S=o*M-s*u,v=c*m-i*l,T=c*x-f*l,I=c*q-b*l,O=i*x-f*m,j=i*q-b*m,P=f*q-b*x;let D=d*P-p*j+g*O+y*I-R*T+S*v;return D?(D=1/D,t[0]=(h*P-u*j+M*O)*D,t[1]=(o*j-r*P-s*O)*D,t[2]=(m*S-x*R+q*y)*D,t[3]=(f*R-i*S-b*y)*D,t[4]=(u*I-e*P-M*T)*D,t[5]=(n*P-o*I+s*T)*D,t[6]=(x*g-l*S-q*p)*D,t[7]=(c*S-f*g+b*p)*D,t[8]=(e*j-h*I+M*v)*D,t[9]=(r*I-n*j-s*v)*D,t[10]=(l*R-m*g+q*d)*D,t[11]=(i*g-c*R-b*d)*D,t[12]=(h*T-e*O-u*v)*D,t[13]=(n*O-r*T+o*v)*D,t[14]=(m*p-l*y-x*d)*D,t[15]=(c*y-i*p+f*d)*D,t):null}function u$2(t,a){const n=a[0],r=a[1],o=a[2],s=a[3],e=a[4],h=a[5],u=a[6],M=a[7],c=a[8],i=a[9],f=a[10],b=a[11],l=a[12],m=a[13],x=a[14],q=a[15];return t[0]=h*(f*q-b*x)-i*(u*q-M*x)+m*(u*b-M*f),t[1]=-(r*(f*q-b*x)-i*(o*q-s*x)+m*(o*b-s*f)),t[2]=r*(u*q-M*x)-h*(o*q-s*x)+m*(o*M-s*u),t[3]=-(r*(u*b-M*f)-h*(o*b-s*f)+i*(o*M-s*u)),t[4]=-(e*(f*q-b*x)-c*(u*q-M*x)+l*(u*b-M*f)),t[5]=n*(f*q-b*x)-c*(o*q-s*x)+l*(o*b-s*f),t[6]=-(n*(u*q-M*x)-e*(o*q-s*x)+l*(o*M-s*u)),t[7]=n*(u*b-M*f)-e*(o*b-s*f)+c*(o*M-s*u),t[8]=e*(i*q-b*m)-c*(h*q-M*m)+l*(h*b-M*i),t[9]=-(n*(i*q-b*m)-c*(r*q-s*m)+l*(r*b-s*i)),t[10]=n*(h*q-M*m)-e*(r*q-s*m)+l*(r*M-s*h),t[11]=-(n*(h*b-M*i)-e*(r*b-s*i)+c*(r*M-s*h)),t[12]=-(e*(i*x-f*m)-c*(h*x-u*m)+l*(h*f-u*i)),t[13]=n*(i*x-f*m)-c*(r*x-o*m)+l*(r*f-o*i),t[14]=-(n*(h*x-u*m)-e*(r*x-o*m)+l*(r*u-o*h)),t[15]=n*(h*f-u*i)-e*(r*f-o*i)+c*(r*u-o*h),t}function M$2(t){const a=t[0],n=t[1],r=t[2],o=t[3],s=t[4],e=t[5],h=t[6],u=t[7],M=t[8],c=t[9],i=t[10],f=t[11],b=t[12],l=t[13],m=t[14],x=t[15];return (a*e-n*s)*(i*x-f*m)-(a*h-r*s)*(c*x-f*l)+(a*u-o*s)*(c*m-i*l)+(n*h-r*e)*(M*x-f*b)-(n*u-o*e)*(M*m-i*b)+(r*u-o*h)*(M*l-c*b)}function c$3(t,a,n){const r=a[0],o=a[1],s=a[2],e=a[3],h=a[4],u=a[5],M=a[6],c=a[7],i=a[8],f=a[9],b=a[10],l=a[11],m=a[12],x=a[13],q=a[14],d=a[15];let p=n[0],g=n[1],y=n[2],R=n[3];return t[0]=p*r+g*h+y*i+R*m,t[1]=p*o+g*u+y*f+R*x,t[2]=p*s+g*M+y*b+R*q,t[3]=p*e+g*c+y*l+R*d,p=n[4],g=n[5],y=n[6],R=n[7],t[4]=p*r+g*h+y*i+R*m,t[5]=p*o+g*u+y*f+R*x,t[6]=p*s+g*M+y*b+R*q,t[7]=p*e+g*c+y*l+R*d,p=n[8],g=n[9],y=n[10],R=n[11],t[8]=p*r+g*h+y*i+R*m,t[9]=p*o+g*u+y*f+R*x,t[10]=p*s+g*M+y*b+R*q,t[11]=p*e+g*c+y*l+R*d,p=n[12],g=n[13],y=n[14],R=n[15],t[12]=p*r+g*h+y*i+R*m,t[13]=p*o+g*u+y*f+R*x,t[14]=p*s+g*M+y*b+R*q,t[15]=p*e+g*c+y*l+R*d,t}function i$1(t,a,n){const r=n[0],o=n[1],s=n[2];if(a===t)t[12]=a[0]*r+a[4]*o+a[8]*s+a[12],t[13]=a[1]*r+a[5]*o+a[9]*s+a[13],t[14]=a[2]*r+a[6]*o+a[10]*s+a[14],t[15]=a[3]*r+a[7]*o+a[11]*s+a[15];else {const n=a[0],e=a[1],h=a[2],u=a[3],M=a[4],c=a[5],i=a[6],f=a[7],b=a[8],l=a[9],m=a[10],x=a[11];t[0]=n,t[1]=e,t[2]=h,t[3]=u,t[4]=M,t[5]=c,t[6]=i,t[7]=f,t[8]=b,t[9]=l,t[10]=m,t[11]=x,t[12]=n*r+M*o+b*s+a[12],t[13]=e*r+c*o+l*s+a[13],t[14]=h*r+i*o+m*s+a[14],t[15]=u*r+f*o+x*s+a[15];}return t}function f$2(t,a,n){const r=n[0],o=n[1],s=n[2];return t[0]=a[0]*r,t[1]=a[1]*r,t[2]=a[2]*r,t[3]=a[3]*r,t[4]=a[4]*o,t[5]=a[5]*o,t[6]=a[6]*o,t[7]=a[7]*o,t[8]=a[8]*s,t[9]=a[9]*s,t[10]=a[10]*s,t[11]=a[11]*s,t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15],t}function b$1(t,n,r,o){let s,e,h,u,M,c,i,f,b,l,m,x,q,d,p,g,y,R,S,v,T,I,O,j,P=o[0],D=o[1],_=o[2],A=Math.sqrt(P*P+D*D+_*_);return A<e$3()?null:(A=1/A,P*=A,D*=A,_*=A,s=Math.sin(r),e=Math.cos(r),h=1-e,u=n[0],M=n[1],c=n[2],i=n[3],f=n[4],b=n[5],l=n[6],m=n[7],x=n[8],q=n[9],d=n[10],p=n[11],g=P*P*h+e,y=D*P*h+_*s,R=_*P*h-D*s,S=P*D*h-_*s,v=D*D*h+e,T=_*D*h+P*s,I=P*_*h+D*s,O=D*_*h-P*s,j=_*_*h+e,t[0]=u*g+f*y+x*R,t[1]=M*g+b*y+q*R,t[2]=c*g+l*y+d*R,t[3]=i*g+m*y+p*R,t[4]=u*S+f*v+x*T,t[5]=M*S+b*v+q*T,t[6]=c*S+l*v+d*T,t[7]=i*S+m*v+p*T,t[8]=u*I+f*O+x*j,t[9]=M*I+b*O+q*j,t[10]=c*I+l*O+d*j,t[11]=i*I+m*O+p*j,n!==t&&(t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t)}function l$3(t,a,n){const r=Math.sin(n),o=Math.cos(n),s=a[4],e=a[5],h=a[6],u=a[7],M=a[8],c=a[9],i=a[10],f=a[11];return a!==t&&(t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t[4]=s*o+M*r,t[5]=e*o+c*r,t[6]=h*o+i*r,t[7]=u*o+f*r,t[8]=M*o-s*r,t[9]=c*o-e*r,t[10]=i*o-h*r,t[11]=f*o-u*r,t}function m$2(t,a,n){const r=Math.sin(n),o=Math.cos(n),s=a[0],e=a[1],h=a[2],u=a[3],M=a[8],c=a[9],i=a[10],f=a[11];return a!==t&&(t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t[0]=s*o-M*r,t[1]=e*o-c*r,t[2]=h*o-i*r,t[3]=u*o-f*r,t[8]=s*r+M*o,t[9]=e*r+c*o,t[10]=h*r+i*o,t[11]=u*r+f*o,t}function x$2(t,a,n){const r=Math.sin(n),o=Math.cos(n),s=a[0],e=a[1],h=a[2],u=a[3],M=a[4],c=a[5],i=a[6],f=a[7];return a!==t&&(t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t[0]=s*o+M*r,t[1]=e*o+c*r,t[2]=h*o+i*r,t[3]=u*o+f*r,t[4]=M*o-s*r,t[5]=c*o-e*r,t[6]=i*o-h*r,t[7]=f*o-u*r,t}function q$1(t,a){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=a[0],t[13]=a[1],t[14]=a[2],t[15]=1,t}function d$2(t,a){return t[0]=a[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=a[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function p$1(t,n,r){if(0===n)return o$2(t);let s,e,h,u=r[0],M=r[1],c=r[2],i=Math.sqrt(u*u+M*M+c*c);return i<e$3()?null:(i=1/i,u*=i,M*=i,c*=i,s=Math.sin(n),e=Math.cos(n),h=1-e,t[0]=u*u*h+e,t[1]=M*u*h+c*s,t[2]=c*u*h-M*s,t[3]=0,t[4]=u*M*h-c*s,t[5]=M*M*h+e,t[6]=c*M*h+u*s,t[7]=0,t[8]=u*c*h+M*s,t[9]=M*c*h-u*s,t[10]=c*c*h+e,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t)}function g$1(t,a){const n=Math.sin(a),r=Math.cos(a);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=r,t[6]=n,t[7]=0,t[8]=0,t[9]=-n,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function y$2(t,a){const n=Math.sin(a),r=Math.cos(a);return t[0]=r,t[1]=0,t[2]=-n,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=n,t[9]=0,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function R$1(t,a){const n=Math.sin(a),r=Math.cos(a);return t[0]=r,t[1]=n,t[2]=0,t[3]=0,t[4]=-n,t[5]=r,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function S$1(t,a,n){const r=a[0],o=a[1],s=a[2],e=a[3],h=r+r,u=o+o,M=s+s,c=r*h,i=r*u,f=r*M,b=o*u,l=o*M,m=s*M,x=e*h,q=e*u,d=e*M;return t[0]=1-(b+m),t[1]=i+d,t[2]=f-q,t[3]=0,t[4]=i-d,t[5]=1-(c+m),t[6]=l+x,t[7]=0,t[8]=f+q,t[9]=l-x,t[10]=1-(c+b),t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t}function v$1(t,a){const n=T$1,r=-a[0],o=-a[1],s=-a[2],e=a[3],h=a[4],u=a[5],M=a[6],c=a[7],i=r*r+o*o+s*s+e*e;return i>0?(n[0]=2*(h*e+c*r+u*s-M*o)/i,n[1]=2*(u*e+c*o+M*r-h*s)/i,n[2]=2*(M*e+c*s+h*o-u*r)/i):(n[0]=2*(h*e+c*r+u*s-M*o),n[1]=2*(u*e+c*o+M*r-h*s),n[2]=2*(M*e+c*s+h*o-u*r)),S$1(t,a,n),t}const T$1=n$3();function I$1(t,a){return t[0]=a[12],t[1]=a[13],t[2]=a[14],t}function O$1(t,a){const n=a[0],r=a[1],o=a[2],s=a[4],e=a[5],h=a[6],u=a[8],M=a[9],c=a[10];return t[0]=Math.sqrt(n*n+r*r+o*o),t[1]=Math.sqrt(s*s+e*e+h*h),t[2]=Math.sqrt(u*u+M*M+c*c),t}function j$1(t,a){const n=a[0]+a[5]+a[10];let r=0;return n>0?(r=2*Math.sqrt(n+1),t[3]=.25*r,t[0]=(a[6]-a[9])/r,t[1]=(a[8]-a[2])/r,t[2]=(a[1]-a[4])/r):a[0]>a[5]&&a[0]>a[10]?(r=2*Math.sqrt(1+a[0]-a[5]-a[10]),t[3]=(a[6]-a[9])/r,t[0]=.25*r,t[1]=(a[1]+a[4])/r,t[2]=(a[8]+a[2])/r):a[5]>a[10]?(r=2*Math.sqrt(1+a[5]-a[0]-a[10]),t[3]=(a[8]-a[2])/r,t[0]=(a[1]+a[4])/r,t[1]=.25*r,t[2]=(a[6]+a[9])/r):(r=2*Math.sqrt(1+a[10]-a[0]-a[5]),t[3]=(a[1]-a[4])/r,t[0]=(a[8]+a[2])/r,t[1]=(a[6]+a[9])/r,t[2]=.25*r),t}function P$1(t,a,n,r){const o=a[0],s=a[1],e=a[2],h=a[3],u=o+o,M=s+s,c=e+e,i=o*u,f=o*M,b=o*c,l=s*M,m=s*c,x=e*c,q=h*u,d=h*M,p=h*c,g=r[0],y=r[1],R=r[2];return t[0]=(1-(l+x))*g,t[1]=(f+p)*g,t[2]=(b-d)*g,t[3]=0,t[4]=(f-p)*y,t[5]=(1-(i+x))*y,t[6]=(m+q)*y,t[7]=0,t[8]=(b+d)*R,t[9]=(m-q)*R,t[10]=(1-(i+l))*R,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t}function D$1(t,a,n,r,o){const s=a[0],e=a[1],h=a[2],u=a[3],M=s+s,c=e+e,i=h+h,f=s*M,b=s*c,l=s*i,m=e*c,x=e*i,q=h*i,d=u*M,p=u*c,g=u*i,y=r[0],R=r[1],S=r[2],v=o[0],T=o[1],I=o[2],O=(1-(m+q))*y,j=(b+g)*y,P=(l-p)*y,D=(b-g)*R,_=(1-(f+q))*R,A=(x+d)*R,w=(l+p)*S,F=(x-d)*S,Q=(1-(f+m))*S;return t[0]=O,t[1]=j,t[2]=P,t[3]=0,t[4]=D,t[5]=_,t[6]=A,t[7]=0,t[8]=w,t[9]=F,t[10]=Q,t[11]=0,t[12]=n[0]+v-(O*v+D*T+w*I),t[13]=n[1]+T-(j*v+_*T+F*I),t[14]=n[2]+I-(P*v+A*T+Q*I),t[15]=1,t}function _(t,a){const n=a[0],r=a[1],o=a[2],s=a[3],e=n+n,h=r+r,u=o+o,M=n*e,c=r*e,i=r*h,f=o*e,b=o*h,l=o*u,m=s*e,x=s*h,q=s*u;return t[0]=1-i-l,t[1]=c+q,t[2]=f-x,t[3]=0,t[4]=c-q,t[5]=1-M-l,t[6]=b+m,t[7]=0,t[8]=f+x,t[9]=b-m,t[10]=1-M-i,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function A$1(t,a,n,r,o,s,e){const h=1/(n-a),u=1/(o-r),M=1/(s-e);return t[0]=2*s*h,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*s*u,t[6]=0,t[7]=0,t[8]=(n+a)*h,t[9]=(o+r)*u,t[10]=(e+s)*M,t[11]=-1,t[12]=0,t[13]=0,t[14]=e*s*2*M,t[15]=0,t}function w$1(t,a,n,r,o){const s=1/Math.tan(a/2);let e;return t[0]=s/n,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=s,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=o&&o!==1/0?(e=1/(r-o),t[10]=(o+r)*e,t[14]=2*o*r*e):(t[10]=-1,t[14]=-2*r),t}function F$1(t,a,n,r){const o=Math.tan(a.upDegrees*Math.PI/180),s=Math.tan(a.downDegrees*Math.PI/180),e=Math.tan(a.leftDegrees*Math.PI/180),h=Math.tan(a.rightDegrees*Math.PI/180),u=2/(e+h),M=2/(o+s);return t[0]=u,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=M,t[6]=0,t[7]=0,t[8]=-(e-h)*u*.5,t[9]=(o-s)*M*.5,t[10]=r/(n-r),t[11]=-1,t[12]=0,t[13]=0,t[14]=r*n/(n-r),t[15]=0,t}function Q(t,a,n,r,o,s,e){const h=1/(a-n),u=1/(r-o),M=1/(s-e);return t[0]=-2*h,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*u,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*M,t[11]=0,t[12]=(a+n)*h,t[13]=(o+r)*u,t[14]=(e+s)*M,t[15]=1,t}function X(t,n,r,s){const e=n[0],h=n[1],u=n[2];let M=e-r[0],c=h-r[1],i=u-r[2];const f=e$3();if(Math.abs(M)<f&&Math.abs(c)<f&&Math.abs(i)<f)return void o$2(t);let b=1/Math.sqrt(M*M+c*c+i*i);M*=b,c*=b,i*=b;const l=s[0],m=s[1],x=s[2];let q=m*i-x*c,d=x*M-l*i,p=l*c-m*M;b=Math.sqrt(q*q+d*d+p*p),b?(b=1/b,q*=b,d*=b,p*=b):(q=0,d=0,p=0);let g=c*p-i*d,y=i*q-M*p,R=M*d-c*q;b=Math.sqrt(g*g+y*y+R*R),b?(b=1/b,g*=b,y*=b,R*=b):(g=0,y=0,R=0),t[0]=q,t[1]=g,t[2]=M,t[3]=0,t[4]=d,t[5]=y,t[6]=c,t[7]=0,t[8]=p,t[9]=R,t[10]=i,t[11]=0,t[12]=-(q*e+d*h+p*u),t[13]=-(g*e+y*h+R*u),t[14]=-(M*e+c*h+i*u),t[15]=1;}function Y(t,a,n,r){const o=a[0],s=a[1],e=a[2],h=r[0],u=r[1],M=r[2];let c=o-n[0],i=s-n[1],f=e-n[2],b=c*c+i*i+f*f;b>0&&(b=1/Math.sqrt(b),c*=b,i*=b,f*=b);let l=u*f-M*i,m=M*c-h*f,x=h*i-u*c;return b=l*l+m*m+x*x,b>0&&(b=1/Math.sqrt(b),l*=b,m*=b,x*=b),t[0]=l,t[1]=m,t[2]=x,t[3]=0,t[4]=i*x-f*m,t[5]=f*l-c*x,t[6]=c*m-i*l,t[7]=0,t[8]=c,t[9]=i,t[10]=f,t[11]=0,t[12]=o,t[13]=s,t[14]=e,t[15]=1,t}function Z(t){return "mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"}function k$1(t){return Math.sqrt(t[0]**2+t[1]**2+t[2]**2+t[3]**2+t[4]**2+t[5]**2+t[6]**2+t[7]**2+t[8]**2+t[9]**2+t[10]**2+t[11]**2+t[12]**2+t[13]**2+t[14]**2+t[15]**2)}function z$1(t,a,n){return t[0]=a[0]+n[0],t[1]=a[1]+n[1],t[2]=a[2]+n[2],t[3]=a[3]+n[3],t[4]=a[4]+n[4],t[5]=a[5]+n[5],t[6]=a[6]+n[6],t[7]=a[7]+n[7],t[8]=a[8]+n[8],t[9]=a[9]+n[9],t[10]=a[10]+n[10],t[11]=a[11]+n[11],t[12]=a[12]+n[12],t[13]=a[13]+n[13],t[14]=a[14]+n[14],t[15]=a[15]+n[15],t}function E$1(t,a,n){return t[0]=a[0]-n[0],t[1]=a[1]-n[1],t[2]=a[2]-n[2],t[3]=a[3]-n[3],t[4]=a[4]-n[4],t[5]=a[5]-n[5],t[6]=a[6]-n[6],t[7]=a[7]-n[7],t[8]=a[8]-n[8],t[9]=a[9]-n[9],t[10]=a[10]-n[10],t[11]=a[11]-n[11],t[12]=a[12]-n[12],t[13]=a[13]-n[13],t[14]=a[14]-n[14],t[15]=a[15]-n[15],t}function N$1(t,a,n){return t[0]=a[0]*n,t[1]=a[1]*n,t[2]=a[2]*n,t[3]=a[3]*n,t[4]=a[4]*n,t[5]=a[5]*n,t[6]=a[6]*n,t[7]=a[7]*n,t[8]=a[8]*n,t[9]=a[9]*n,t[10]=a[10]*n,t[11]=a[11]*n,t[12]=a[12]*n,t[13]=a[13]*n,t[14]=a[14]*n,t[15]=a[15]*n,t}function V(t,a,n,r){return t[0]=a[0]+n[0]*r,t[1]=a[1]+n[1]*r,t[2]=a[2]+n[2]*r,t[3]=a[3]+n[3]*r,t[4]=a[4]+n[4]*r,t[5]=a[5]+n[5]*r,t[6]=a[6]+n[6]*r,t[7]=a[7]+n[7]*r,t[8]=a[8]+n[8]*r,t[9]=a[9]+n[9]*r,t[10]=a[10]+n[10]*r,t[11]=a[11]+n[11]*r,t[12]=a[12]+n[12]*r,t[13]=a[13]+n[13]*r,t[14]=a[14]+n[14]*r,t[15]=a[15]+n[15]*r,t}function B$1(t,a){return t[0]===a[0]&&t[1]===a[1]&&t[2]===a[2]&&t[3]===a[3]&&t[4]===a[4]&&t[5]===a[5]&&t[6]===a[6]&&t[7]===a[7]&&t[8]===a[8]&&t[9]===a[9]&&t[10]===a[10]&&t[11]===a[11]&&t[12]===a[12]&&t[13]===a[13]&&t[14]===a[14]&&t[15]===a[15]}function C$1(t,n){if(t===n)return !0;const r=t[0],o=t[1],s=t[2],e=t[3],h=t[4],u=t[5],M=t[6],c=t[7],i=t[8],f=t[9],b=t[10],l=t[11],m=t[12],x=t[13],q=t[14],d=t[15],p=n[0],g=n[1],y=n[2],R=n[3],S=n[4],v=n[5],T=n[6],I=n[7],O=n[8],j=n[9],P=n[10],D=n[11],_=n[12],A=n[13],w=n[14],F=n[15],Q=e$3();return Math.abs(r-p)<=Q*Math.max(1,Math.abs(r),Math.abs(p))&&Math.abs(o-g)<=Q*Math.max(1,Math.abs(o),Math.abs(g))&&Math.abs(s-y)<=Q*Math.max(1,Math.abs(s),Math.abs(y))&&Math.abs(e-R)<=Q*Math.max(1,Math.abs(e),Math.abs(R))&&Math.abs(h-S)<=Q*Math.max(1,Math.abs(h),Math.abs(S))&&Math.abs(u-v)<=Q*Math.max(1,Math.abs(u),Math.abs(v))&&Math.abs(M-T)<=Q*Math.max(1,Math.abs(M),Math.abs(T))&&Math.abs(c-I)<=Q*Math.max(1,Math.abs(c),Math.abs(I))&&Math.abs(i-O)<=Q*Math.max(1,Math.abs(i),Math.abs(O))&&Math.abs(f-j)<=Q*Math.max(1,Math.abs(f),Math.abs(j))&&Math.abs(b-P)<=Q*Math.max(1,Math.abs(b),Math.abs(P))&&Math.abs(l-D)<=Q*Math.max(1,Math.abs(l),Math.abs(D))&&Math.abs(m-_)<=Q*Math.max(1,Math.abs(m),Math.abs(_))&&Math.abs(x-A)<=Q*Math.max(1,Math.abs(x),Math.abs(A))&&Math.abs(q-w)<=Q*Math.max(1,Math.abs(q),Math.abs(w))&&Math.abs(d-F)<=Q*Math.max(1,Math.abs(d),Math.abs(F))}function G$1(t){const n=e$3(),r=t[0],o=t[1],s=t[2],e=t[4],h=t[5],u=t[6],M=t[8],c=t[9],i=t[10];return Math.abs(1-(r*r+e*e+M*M))<=n&&Math.abs(1-(o*o+h*h+c*c))<=n&&Math.abs(1-(s*s+u*u+i*i))<=n}function H(t){return 1===t[0]&&0===t[1]&&0===t[2]&&0===t[4]&&1===t[5]&&0===t[6]&&0===t[8]&&0===t[9]&&1===t[10]}const J=c$3,K=E$1;Object.freeze(Object.defineProperty({__proto__:null,add:z$1,adjoint:u$2,copy:n$1,determinant:M$2,equals:C$1,exactEquals:B$1,frob:k$1,fromQuat:_,fromQuat2:v$1,fromRotation:p$1,fromRotationTranslation:S$1,fromRotationTranslationScale:P$1,fromRotationTranslationScaleOrigin:D$1,fromScaling:d$2,fromTranslation:q$1,fromXRotation:g$1,fromYRotation:y$2,fromZRotation:R$1,frustum:A$1,getRotation:j$1,getScaling:O$1,getTranslation:I$1,hasIdentityRotation:H,identity:o$2,invert:h$1,invertOrIdentity:e$2,isOrthoNormal:G$1,lookAt:X,mul:J,multiply:c$3,multiplyScalar:N$1,multiplyScalarAndAdd:V,ortho:Q,perspective:w$1,perspectiveFromFieldOfView:F$1,rotate:b$1,rotateX:l$3,rotateY:m$2,rotateZ:x$2,scale:f$2,set:r,str:Z,sub:K,subtract:E$1,targetTo:Y,translate:i$1,transpose:s$1},Symbol.toStringTag,{value:"Module"}));

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
const n=(n,o)=>{const s=r(n,o,0,0,0,0,o,0,0,0,0,o,0,0,0,0,1);return s$1(s,s)},o$1=(n,o)=>{const s=r(n,o,0,0,.5-.5*o,0,o,0,.5-.5*o,0,0,o,.5-.5*o,0,0,0,1);return s$1(s,s)},s=(n,o)=>{const s=1-o,c=r(n,.2126+.7874*s,.7152-.7152*s,.0722-.0722*s,0,.2126-.2126*s,.7152+.2848*s,.0722-.0722*s,0,.2126-.2126*s,.7152-.7152*s,.0722+.9278*s,0,0,0,0,1);return s$1(c,c)},c$2=(n,o)=>{const s=Math.sin(o*Math.PI/180),c=Math.cos(o*Math.PI/180),e=r(n,.213+.787*c-.213*s,.715-.715*c-.715*s,.072-.072*c+.928*s,0,.213-.213*c+.143*s,.715+.285*c+.14*s,.072-.072*c-.283*s,0,.213-.213*c-.787*s,.715-.715*c+.715*s,.072+.928*c+.072*s,0,0,0,0,1);return s$1(e,e)},e$1=(n,o)=>{const s=1-2*o,c=r(n,s,0,0,o,0,s,0,o,0,0,s,o,0,0,0,1);return s$1(c,c)},a=(n,o)=>{const s=r(n,.213+.787*o,.715-.715*o,.072-.072*o,0,.213-.213*o,.715+.285*o,.072-.072*o,0,.213-.213*o,.715-.715*o,.072+.928*o,0,0,0,0,1);return s$1(s,s)},u$1=(n,o)=>{const s=1-o,c=r(n,.393+.607*s,.769-.769*s,.189-.189*s,0,.349-.349*s,.686+.314*s,.168-.168*s,0,.272-.272*s,.534-.534*s,.131+.869*s,0,0,0,0,1);return s$1(c,c)};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
class c$1{constructor(t,s,r){this.strength=t,this.radius=s,this.threshold=r,this.type="bloom";}interpolate(t,s,r){this.strength=M$1(t.strength,s.strength,r),this.radius=M$1(t.radius,s.radius,r),this.threshold=M$1(t.threshold,s.threshold,r);}clone(){return new c$1(this.strength,this.radius,this.threshold)}toJSON(){return {type:"bloom",radius:y$1(this.radius),strength:this.strength,threshold:this.threshold}}}class l$2{constructor(t){this.radius=t,this.type="blur";}interpolate(t,s,r){this.radius=Math.round(M$1(t.radius,s.radius,r));}clone(){return new l$2(this.radius)}toJSON(){return {type:"blur",radius:y$1(this.radius)}}}class p{constructor(t,s){this.type=t,this.amount=s,"invert"!==this.type&&"grayscale"!==this.type&&"sepia"!==this.type||(this.amount=Math.min(this.amount,1));}get colorMatrix(){return this._colorMatrix||this._updateMatrix(),this._colorMatrix}interpolate(t,s,r){this.amount=M$1(t.amount,s.amount,r),this._updateMatrix();}clone(){return new p(this.type,this.amount)}toJSON(){return {type:this.type,amount:this.amount}}_updateMatrix(){const t=this._colorMatrix||e$5();switch(this.type){case"brightness":this._colorMatrix=n(t,this.amount);break;case"contrast":this._colorMatrix=o$1(t,this.amount);break;case"grayscale":this._colorMatrix=s(t,this.amount);break;case"invert":this._colorMatrix=e$1(t,this.amount);break;case"saturate":this._colorMatrix=a(t,this.amount);break;case"sepia":this._colorMatrix=u$1(t,this.amount);}}}class d$1{constructor(t,s,r,o){this.offsetX=t,this.offsetY=s,this.blurRadius=r,this.color=o,this.type="drop-shadow";}interpolate(t,s,r){this.offsetX=M$1(t.offsetX,s.offsetX,r),this.offsetY=M$1(t.offsetY,s.offsetY,r),this.blurRadius=M$1(t.blurRadius,s.blurRadius,r),this.color[0]=Math.round(M$1(t.color[0],s.color[0],r)),this.color[1]=Math.round(M$1(t.color[1],s.color[1],r)),this.color[2]=Math.round(M$1(t.color[2],s.color[2],r)),this.color[3]=M$1(t.color[3],s.color[3],r);}clone(){return new d$1(this.offsetX,this.offsetY,this.blurRadius,[...this.color])}toJSON(){const t=[...this.color];return t[3]*=255,{type:"drop-shadow",xoffset:y$1(this.offsetX),yoffset:y$1(this.offsetY),blurRadius:y$1(this.blurRadius),color:t}}}class m$1{constructor(t){this.angle=t,this.type="hue-rotate";}get colorMatrix(){return this._colorMatrix||this._updateMatrix(),this._colorMatrix}interpolate(t,s,r){this.angle=M$1(t.angle,s.angle,r),this._updateMatrix();}clone(){return new m$1(this.angle)}toJSON(){return {type:"hue-rotate",angle:this.angle}}_updateMatrix(){const t=this._colorMatrix||e$5();this._colorMatrix=c$2(t,this.angle);}}class f$1{constructor(t){this.amount=t,this.type="opacity",this.amount=Math.min(this.amount,1);}interpolate(t,s,r){this.amount=M$1(t.amount,s.amount,r);}clone(){return new f$1(this.amount)}toJSON(){return {type:"opacity",amount:this.amount}}}function M$1(t,s,r){return t+(s-t)*r}function y$1(t){return Math.round(1e3*e$6(t))/1e3}function x$1(s){switch(s.type){case"grayscale":case"sepia":case"invert":return new p(s.type,0);case"saturate":case"brightness":case"contrast":return new p(s.type,1);case"opacity":return new f$1(1);case"hue-rotate":return new m$1(0);case"blur":return new l$2(0);case"drop-shadow":return new d$1(0,0,0,[...l$5("transparent")]);case"bloom":return new c$1(0,0,1)}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
function t(n,t){const e=n.length>t.length?n:t;return (n.length>t.length?t:n).every(((n,t)=>n.type===e[t].type))}function e(t,e){const l=t.length>e.length?t:e,r=t.length>e.length?e:t;for(let g=r.length;g<l.length;g++)r.push(x$1(l[g]));}function l$1(n){const t=n[0];return !!t&&"type"in t}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
function h(e,t){function r(){this.constructor=e;}r.prototype=t.prototype,e.prototype=new r;}function m(e,t,r,n){var u=Error.call(this,e);return Object.setPrototypeOf&&Object.setPrototypeOf(u,m.prototype),u.expected=t,u.found=r,u.location=n,u.name="SyntaxError",u}function g(e,t,r){return r=r||" ",e.length>t?e:(t-=e.length,e+(r+=r.repeat(t)).slice(0,t))}function v(e,t){var r,n={},u=(t=void 0!==t?t:{}).grammarSource,a={start:Qe},o=Qe,c="none",i=")",l=",",s="(",f="%",p="px",h="cm",g="mm",v="in",d="pt",y="pc",w="deg",x="rad",A="grad",b="turn",F="#",$=".",C="e",E=/^[ \t\n\r]/,j=/^[a-z\-]/,O=/^[0-9a-fA-F]/,P=/^[+\-]/,q=/^[0-9]/,k=Be("none"),z=Ue("none",!1),I=Ue(")",!1),R=Ue(",",!1),S=Be("whitespace"),M=De([" ","\t","\n","\r"],!1,!1),N=Be("function"),T=Ue("(",!1),U=Be("identifier"),D=De([["a","z"],"-"],!1,!1),L=Be("percentage"),B=Ue("%",!1),G=Be("length"),H=Ue("px",!1),J=Ue("cm",!1),K=Ue("mm",!1),Q=Ue("in",!1),V=Ue("pt",!1),W=Ue("pc",!1),X=Be("angle"),Y=Ue("deg",!1),Z=Ue("rad",!1),_=Ue("grad",!1),ee=Ue("turn",!1),te=Be("number"),re=Be("color"),ne=Ue("#",!1),ue=De([["0","9"],["a","f"],["A","F"]],!1,!1),ae=De(["+","-"],!1,!1),oe=De([["0","9"]],!1,!1),ce=Ue(".",!1),ie=Ue("e",!1),le=function(){return []},se=function(e,t){return {type:"function",name:e,parameters:t||[]}},fe=function(e,t){return t.length>0?lt(e,t,3):[e]},pe=function(e){return {type:"quantity",value:e.value,unit:e.unit}},he=function(e){return {type:"color",colorType:e.type,value:e.value}},me=function(e){return e},ge=function(){return Te()},ve=function(e){return {value:e,unit:"%"}},de=function(e){return {value:e,unit:"px"}},ye=function(e){return {value:e,unit:"cm"}},we=function(e){return {value:e,unit:"mm"}},xe=function(e){return {value:e,unit:"in"}},Ae=function(e){return {value:e,unit:"pt"}},be=function(e){return {value:e,unit:"pc"}},Fe=function(e){return {value:e,unit:"deg"}},$e=function(e){return {value:e,unit:"rad"}},Ce=function(e){return {value:e,unit:"grad"}},Ee=function(e){return {value:e,unit:"turn"}},je=function(e){return {value:e,unit:null}},Oe=function(){return {type:"hex",value:Te()}},Pe=function(e){return {type:"function",value:e}},qe=function(){return {type:"named",value:Te()}},ke=function(){return parseFloat(Te())},ze=0|t.peg$currPos,Ie=ze,Re=[{line:1,column:1}],Se=ze,Me=t.peg$maxFailExpected||[],Ne=0|t.peg$silentFails;if(t.startRule){if(!(t.startRule in a))throw new Error("Can't start parsing from rule \""+t.startRule+'".');o=a[t.startRule];}function Te(){return e.substring(Ie,ze)}function Ue(e,t){return {type:"literal",text:e,ignoreCase:t}}function De(e,t,r){return {type:"class",parts:e,inverted:t,ignoreCase:r}}function Le(){return {type:"end"}}function Be(e){return {type:"other",description:e}}function Ge(t){var r,n=Re[t];if(n)return n;if(t>=Re.length)r=Re.length-1;else for(r=t;!Re[--r];);for(n={line:(n=Re[r]).line,column:n.column};r<t;)10===e.charCodeAt(r)?(n.line++,n.column=1):n.column++,r++;return Re[t]=n,n}function He(e,t,r){var n=Ge(e),a=Ge(t);return {source:u,start:{offset:e,line:n.line,column:n.column},end:{offset:t,line:a.line,column:a.column}}}function Je(e){ze<Se||(ze>Se&&(Se=ze,Me=[]),Me.push(e));}function Ke(e,t,r){return new m(m.buildMessage(e,t),e,t,r)}function Qe(){var e;return (e=Ve())===n&&(e=We()),e}function Ve(){var t,r;return Ne++,t=ze,_e(),e.substr(ze,4)===c?(r=c,ze+=4):(r=n,0===Ne&&Je(z)),r!==n?(_e(),Ie=t,t=le()):(ze=t,t=n),Ne--,t===n&&0===Ne&&Je(k),t}function We(){var e,t;if(e=[],(t=Xe())!==n)for(;t!==n;)e.push(t),t=Xe();else e=n;return e}function Xe(){var t,r,u,a;return t=ze,_e(),(r=et())!==n?(_e(),(u=Ye())===n&&(u=null),_e(),41===e.charCodeAt(ze)?(a=i,ze++):(a=n,0===Ne&&Je(I)),a!==n?(_e(),Ie=t,t=se(r,u)):(ze=t,t=n)):(ze=t,t=n),t}function Ye(){var t,r,u,a,o,c,i,s;if(t=ze,(r=Ze())!==n){for(u=[],a=ze,o=_e(),44===e.charCodeAt(ze)?(c=l,ze++):(c=n,0===Ne&&Je(R)),c===n&&(c=null),i=_e(),(s=Ze())!==n?a=o=[o,c,i,s]:(ze=a,a=n);a!==n;)u.push(a),a=ze,o=_e(),44===e.charCodeAt(ze)?(c=l,ze++):(c=n,0===Ne&&Je(R)),c===n&&(c=null),i=_e(),(s=Ze())!==n?a=o=[o,c,i,s]:(ze=a,a=n);Ie=t,t=fe(r,u);}else ze=t,t=n;return t}function Ze(){var e,t;return e=ze,(t=rt())===n&&(t=nt())===n&&(t=ut())===n&&(t=at()),t!==n&&(Ie=e,t=pe(t)),(e=t)===n&&(e=ze,(t=ot())!==n&&(Ie=e,t=he(t)),e=t),e}function _e(){var t,r;for(Ne++,t=[],r=e.charAt(ze),E.test(r)?ze++:(r=n,0===Ne&&Je(M));r!==n;)t.push(r),r=e.charAt(ze),E.test(r)?ze++:(r=n,0===Ne&&Je(M));return Ne--,r=n,0===Ne&&Je(S),t}function et(){var t,r,u;return Ne++,t=ze,(r=tt())!==n?(40===e.charCodeAt(ze)?(u=s,ze++):(u=n,0===Ne&&Je(T)),u!==n?(Ie=t,t=me(r)):(ze=t,t=n)):(ze=t,t=n),Ne--,t===n&&(r=n,0===Ne&&Je(N)),t}function tt(){var t,r,u;if(Ne++,t=ze,r=[],u=e.charAt(ze),j.test(u)?ze++:(u=n,0===Ne&&Je(D)),u!==n)for(;u!==n;)r.push(u),u=e.charAt(ze),j.test(u)?ze++:(u=n,0===Ne&&Je(D));else r=n;return r!==n&&(Ie=t,r=ge()),Ne--,(t=r)===n&&(r=n,0===Ne&&Je(U)),t}function rt(){var t,r,u;return Ne++,t=ze,_e(),(r=ct())!==n?(37===e.charCodeAt(ze)?(u=f,ze++):(u=n,0===Ne&&Je(B)),u!==n?(Ie=t,t=ve(r)):(ze=t,t=n)):(ze=t,t=n),Ne--,t===n&&0===Ne&&Je(L),t}function nt(){var t,r,u;return Ne++,t=ze,_e(),(r=ct())!==n?(e.substr(ze,2)===p?(u=p,ze+=2):(u=n,0===Ne&&Je(H)),u!==n?(Ie=t,t=de(r)):(ze=t,t=n)):(ze=t,t=n),t===n&&(t=ze,_e(),(r=ct())!==n?(e.substr(ze,2)===h?(u=h,ze+=2):(u=n,0===Ne&&Je(J)),u!==n?(Ie=t,t=ye(r)):(ze=t,t=n)):(ze=t,t=n),t===n&&(t=ze,_e(),(r=ct())!==n?(e.substr(ze,2)===g?(u=g,ze+=2):(u=n,0===Ne&&Je(K)),u!==n?(Ie=t,t=we(r)):(ze=t,t=n)):(ze=t,t=n),t===n&&(t=ze,_e(),(r=ct())!==n?(e.substr(ze,2)===v?(u=v,ze+=2):(u=n,0===Ne&&Je(Q)),u!==n?(Ie=t,t=xe(r)):(ze=t,t=n)):(ze=t,t=n),t===n&&(t=ze,_e(),(r=ct())!==n?(e.substr(ze,2)===d?(u=d,ze+=2):(u=n,0===Ne&&Je(V)),u!==n?(Ie=t,t=Ae(r)):(ze=t,t=n)):(ze=t,t=n),t===n&&(t=ze,_e(),(r=ct())!==n?(e.substr(ze,2)===y?(u=y,ze+=2):(u=n,0===Ne&&Je(W)),u!==n?(Ie=t,t=be(r)):(ze=t,t=n)):(ze=t,t=n)))))),Ne--,t===n&&0===Ne&&Je(G),t}function ut(){var t,r,u;return Ne++,t=ze,(r=ct())!==n?(e.substr(ze,3)===w?(u=w,ze+=3):(u=n,0===Ne&&Je(Y)),u!==n?(Ie=t,t=Fe(r)):(ze=t,t=n)):(ze=t,t=n),t===n&&(t=ze,(r=ct())!==n?(e.substr(ze,3)===x?(u=x,ze+=3):(u=n,0===Ne&&Je(Z)),u!==n?(Ie=t,t=$e(r)):(ze=t,t=n)):(ze=t,t=n),t===n&&(t=ze,(r=ct())!==n?(e.substr(ze,4)===A?(u=A,ze+=4):(u=n,0===Ne&&Je(_)),u!==n?(Ie=t,t=Ce(r)):(ze=t,t=n)):(ze=t,t=n),t===n&&(t=ze,(r=ct())!==n?(e.substr(ze,4)===b?(u=b,ze+=4):(u=n,0===Ne&&Je(ee)),u!==n?(Ie=t,t=Ee(r)):(ze=t,t=n)):(ze=t,t=n)))),Ne--,t===n&&(r=n,0===Ne&&Je(X)),t}function at(){var e,t;return Ne++,e=ze,_e(),(t=ct())!==n?(Ie=e,e=je(t)):(ze=e,e=n),Ne--,e===n&&0===Ne&&Je(te),e}function ot(){var t,r,u,a;if(Ne++,t=ze,35===e.charCodeAt(ze)?(r=F,ze++):(r=n,0===Ne&&Je(ne)),r!==n){if(u=[],a=e.charAt(ze),O.test(a)?ze++:(a=n,0===Ne&&Je(ue)),a!==n)for(;a!==n;)u.push(a),a=e.charAt(ze),O.test(a)?ze++:(a=n,0===Ne&&Je(ue));else u=n;u!==n?(Ie=t,t=Oe()):(ze=t,t=n);}else ze=t,t=n;return t===n&&(t=ze,(r=Xe())!==n&&(Ie=t,r=Pe(r)),(t=r)===n&&(t=ze,(r=tt())!==n&&(Ie=t,r=qe()),t=r)),Ne--,t===n&&(r=n,0===Ne&&Je(re)),t}function ct(){var t,r,u,a,o,c,i,l;for(t=ze,r=e.charAt(ze),P.test(r)?ze++:(r=n,0===Ne&&Je(ae)),r===n&&(r=null),u=ze,a=[],o=e.charAt(ze),q.test(o)?ze++:(o=n,0===Ne&&Je(oe));o!==n;)a.push(o),o=e.charAt(ze),q.test(o)?ze++:(o=n,0===Ne&&Je(oe));if(46===e.charCodeAt(ze)?(o=$,ze++):(o=n,0===Ne&&Je(ce)),o!==n){if(c=[],i=e.charAt(ze),q.test(i)?ze++:(i=n,0===Ne&&Je(oe)),i!==n)for(;i!==n;)c.push(i),i=e.charAt(ze),q.test(i)?ze++:(i=n,0===Ne&&Je(oe));else c=n;c!==n?u=a=[a,o,c]:(ze=u,u=n);}else ze=u,u=n;if(u===n)if(u=[],a=e.charAt(ze),q.test(a)?ze++:(a=n,0===Ne&&Je(oe)),a!==n)for(;a!==n;)u.push(a),a=e.charAt(ze),q.test(a)?ze++:(a=n,0===Ne&&Je(oe));else u=n;if(u!==n){if(a=ze,101===e.charCodeAt(ze)?(o=C,ze++):(o=n,0===Ne&&Je(ie)),o!==n){if(c=e.charAt(ze),P.test(c)?ze++:(c=n,0===Ne&&Je(ae)),c===n&&(c=null),i=[],l=e.charAt(ze),q.test(l)?ze++:(l=n,0===Ne&&Je(oe)),l!==n)for(;l!==n;)i.push(l),l=e.charAt(ze),q.test(l)?ze++:(l=n,0===Ne&&Je(oe));else i=n;i!==n?a=o=[o,c,i]:(ze=a,a=n);}else ze=a,a=n;a===n&&(a=null),Ie=t,t=ke();}else ze=t,t=n;return t}function it(e,t){return e.map((function(e){return e[t]}))}function lt(e,t,r){return [e].concat(it(t,r))}if(r=o(),t.peg$library)return {peg$result:r,peg$currPos:ze,peg$FAILED:n,peg$maxFailExpected:Me,peg$maxFailPos:Se};if(r!==n&&ze===e.length)return r;throw r!==n&&ze<e.length&&Je(Le()),Ke(Me,Se<e.length?e.charAt(Se):null,Se<e.length?He(Se,Se+1):He(Se,Se))}function d(e$1){if(!e$1||0===e$1.length)return null;if("string"==typeof e$1){const t=y(e$1);return t&&0!==t.length?t:null}const t$1=e$1.map((e=>{if(!Number.isFinite(e.scale)||e.scale<=0)throw new s$3("effect:invalid-scale","scale must be finite and greater than 0",{stop:e});return {scale:e.scale,effects:y(e.value)}}));t$1.sort(((e,t)=>t.effects.length-e.effects.length));for(let r=0;r<t$1.length-1;r++){if(!t(t$1[r].effects,t$1[r+1].effects))throw new s$3("effect:interpolation-impossible","Cannot interpolate by scale between 2 lists of mixed effects",{a:t$1[r].effects,b:t$1[r+1].effects});e(t$1[r].effects,t$1[r+1].effects);}return t$1.sort(((e,t)=>t.scale-e.scale)),t$1}function y(e){let t;if(!e)return [];try{t=v(e);}catch(r){throw new s$3("effect:invalid-syntax","Invalid effect syntax",{value:e,error:r})}return t.map((e=>w(e)))}function w(e){try{switch(e.name){case"grayscale":case"sepia":case"saturate":case"invert":case"brightness":case"contrast":return x(e);case"opacity":return A(e);case"hue-rotate":return b(e);case"blur":return F(e);case"drop-shadow":return $(e);case"bloom":return C(e)}}catch(t){throw t.details.filter=e,t}throw new s$3("effect:unknown-effect",`Effect '${e.name}' is not supported`,{effect:e})}function x(e){let t=1;return E(e.parameters,1),1===e.parameters.length&&(t=S(e.parameters[0])),new p(e.name,t)}function A(e){let t=1;return E(e.parameters,1),1===e.parameters.length&&(t=S(e.parameters[0])),new f$1(t)}function b(e){let t=0;return E(e.parameters,1),1===e.parameters.length&&(t=N(e.parameters[0])),new m$1(t)}function F(e){let t=0;return E(e.parameters,1),1===e.parameters.length&&(t=T(e.parameters[0]),O(t,e.parameters[0])),new l$2(t)}function $(e){const t=[];let r=null;for(const n of e.parameters)if("color"===n.type){if(t.length&&Object.freeze(t),r)throw new s$3("effect:type-error","Accepts only one color",{});r=U(n);}else {const e=T(n);if(Object.isFrozen(t))throw new s$3("effect:type-error","<length> parameters not consecutive",{lengths:t});t.push(e),3===t.length&&O(e,n);}if(t.length<2||t.length>3)throw new s$3("effect:type-error",`Expected <length>{2,3}, Actual: <length>{${t.length}}`,{lengths:t});return new d$1(t[0],t[1],t[2]||0,r||D("black"))}function C(e){let t=1,r=0,n=0;return E(e.parameters,3),e.parameters[0]&&(t=S(e.parameters[0])),e.parameters[1]&&(r=T(e.parameters[1]),O(r,e.parameters[1])),e.parameters[2]&&(n=S(e.parameters[2])),new c$1(t,r,n)}function E(e,t){if(e.length>t)throw new s$3("effect:type-error",`Function supports up to ${t} parameters, Actual: ${e.length}`,{parameters:e})}function j(e){if("color"===e.type)return "<color>";if(e.unit){if(e.unit in I)return "<length>";if(e.unit in k)return "<angle>";if("%"===e.unit)return "<percentage>"}return "<double>"}function O(e,t){if(e<0)throw new s$3("effect:type-error",`Negative values are not allowed, Actual: ${e}`,{term:t})}function P(e){if("quantity"!==e.type||null!==e.unit)throw new s$3("effect:type-error",`Expected <double>, Actual: ${j(e)}`,{term:e})}function q(e){if("quantity"!==e.type||null!==e.unit&&"%"!==e.unit)throw new s$3("effect:type-error",`Expected <double> or <percentage>, Actual: ${j(e)}`,{term:e})}h(m,Error),m.prototype.format=function(e){var t="Error: "+this.message;if(this.location){var r,n=null;for(r=0;r<e.length;r++)if(e[r].source===this.location.source){n=e[r].text.split(/\r\n|\n|\r/g);break}var u=this.location.start,a=this.location.source&&"function"==typeof this.location.source.offset?this.location.source.offset(u):u,o=this.location.source+":"+a.line+":"+a.column;if(n){var c=this.location.end,i=g("",a.line.toString().length," "),l=n[u.line-1],s=(u.line===c.line?c.column:l.length+1)-u.column||1;t+="\n --\x3e "+o+"\n"+i+" |\n"+a.line+" | "+l+"\n"+i+" | "+g("",u.column-1," ")+g("",s,"^");}else t+="\n at "+o;}return t},m.buildMessage=function(e,t){var r={literal:function(e){return '"'+u(e.text)+'"'},class:function(e){var t=e.parts.map((function(e){return Array.isArray(e)?a(e[0])+"-"+a(e[1]):a(e)}));return "["+(e.inverted?"^":"")+t.join("")+"]"},any:function(){return "any character"},end:function(){return "end of input"},other:function(e){return e.description}};function n(e){return e.charCodeAt(0).toString(16).toUpperCase()}function u(e){return e.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,(function(e){return "\\x0"+n(e)})).replace(/[\x10-\x1F\x7F-\x9F]/g,(function(e){return "\\x"+n(e)}))}function a(e){return e.replace(/\\/g,"\\\\").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/-/g,"\\-").replace(/\0/g,"\\0").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/[\x00-\x0F]/g,(function(e){return "\\x0"+n(e)})).replace(/[\x10-\x1F\x7F-\x9F]/g,(function(e){return "\\x"+n(e)}))}function o(e){return r[e.type](e)}function c(e){var t,r,n=e.map(o);if(n.sort(),n.length>0){for(t=1,r=1;t<n.length;t++)n[t-1]!==n[t]&&(n[r]=n[t],r++);n.length=r;}switch(n.length){case 1:return n[0];case 2:return n[0]+" or "+n[1];default:return n.slice(0,-1).join(", ")+", or "+n[n.length-1]}}function i(e){return e?'"'+u(e)+'"':"end of input"}return "Expected "+c(e)+" but "+i(t)+" found."};const k={deg:1,grad:.9,rad:180/Math.PI,turn:360};function z(e){if("quantity"!==e.type||!(0===e.value&&null===e.unit||e.unit&&null!=k[e.unit]))throw new s$3("effect:type-error",`Expected <angle>, Actual: ${j(e)}`,{term:e})}const I={px:1,cm:96/2.54,mm:96/2.54/10,in:96,pc:16,pt:96/72};function R(e){if("quantity"!==e.type||!(0===e.value&&null===e.unit||e.unit&&null!=I[e.unit]))throw new s$3("effect:type-error",`Expected <length>, Actual: ${j(e)}`,{term:e})}function S(e){q(e);const t=e.value;return O(t,e),"%"===e.unit?.01*t:t}function M(e){return P(e),O(e.value,e),e.value}function N(e){return z(e),e.value*k[e.unit]||0}function T(e){return R(e),e.value*I[e.unit]||0}function U(t){switch(t.colorType){case"hex":return o$6(t.value);case"named":return D(t.value);case"function":return G(t.value)}}function D(e){if(!r$5(e))throw new s$3("effect:unknown-color",`color '${e}' isn't valid`,{namedColor:e});return a$3(e)}const L=/^rgba?/i,B=/^hsla?/i;function G(e){if(E(e.parameters,4),L.test(e.name))return [S(e.parameters[0]),S(e.parameters[1]),S(e.parameters[2]),e.parameters[3]?S(e.parameters[3]):1];if(B.test(e.name))return i$4(M(e.parameters[0]),S(e.parameters[1]),S(e.parameters[2]),e.parameters[3]?S(e.parameters[3]):1);throw new s$3("effect:syntax-error",`Invalid color function '${e.name}'`,{colorFunction:e})}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.31/esri/copyright.txt for details.
*/
function o(e){const t=d(e);return t?l$1(t)?t.map((e=>e.toJSON())):t.map((({scale:e,effects:t})=>({scale:e,value:t.map((e=>e.toJSON()))}))):null}function c(e){if(!e||0===e.length)return null;if(f(e)){const t=[];for(const r of e)t.push({scale:r.scale,value:i(r.value)});return t}return i(e)}function f(e){const t=e[0];return !!t&&"scale"in t}function i(e){if(!e?.length)return "";const t=[];for(const s of e){let e=[];switch(s.type){case"grayscale":case"sepia":case"saturate":case"invert":case"brightness":case"contrast":case"opacity":e=[u(s,"amount")];break;case"blur":e=[u(s,"radius","pt")];break;case"hue-rotate":e=[u(s,"angle","deg")];break;case"drop-shadow":e=[u(s,"xoffset","pt"),u(s,"yoffset","pt"),u(s,"blurRadius","pt"),l(s,"color")];break;case"bloom":e=[u(s,"strength"),u(s,"radius","pt"),u(s,"threshold")];}const n=`${s.type}(${e.filter(Boolean).join(" ")})`;d(n),t.push(n);}return t.join(" ")}function u(t,r,s){if(null==t[r])throw new s$3("effect:missing-parameter",`Missing parameter '${r}' in ${t.type} effect`,{effect:t});return s?t[r]+s:""+t[r]}function l(t,r){if(null==t[r])throw new s$3("effect:missing-parameter",`Missing parameter '${r}' in ${t.type} effect`,{effect:t});const s=t[r];return `rgba(${s[0]||0}, ${s[1]||0}, ${s[2]||0}, ${s[3]/255||0})`}

function getMergedEffect(presetLayerEffect, featureLayerView, type) {
    const layer = featureLayerView?.layer;
    if (!presetLayerEffect) {
        if (layer?.effect) {
            return layer.effect;
        }
        else if (layer?.featureEffect) {
            return type === "includedEffect"
                ? layer.featureEffect.includedEffect
                : layer.featureEffect.excludedEffect;
        }
        else {
            return null;
        }
    }
    // CONVERT EXISTING EFFECT AND PRESET LAYER EFFECT TO JSON
    const presetLayerEffectJSON = o(presetLayerEffect);
    const layerEffect = layer.effect;
    const layerFeatureEffect = layer.featureEffect;
    let existingEffect = null;
    if (layerFeatureEffect) {
        existingEffect =
            type === "includedEffect"
                ? layer.featureEffect.includedEffect
                : layer.featureEffect.excludedEffect;
    }
    else {
        existingEffect = layerEffect;
    }
    const existingEffectJSON = existingEffect ? o(existingEffect) : null;
    // RETURN PRESET LAYER EFFECT IF THERE ARE NO EXISTING EFFECTS
    if (!existingEffectJSON) {
        return c(presetLayerEffectJSON);
    }
    let effectToUse = [...existingEffectJSON];
    if (presetLayerEffectJSON) {
        // ITERATE THROUGH PRESET LAYER EFFECT JSON
        presetLayerEffectJSON.forEach(presetLayerEffectItem => {
            // ITERATE THROUGH EXISTING EFFECT JSON
            effectToUse.forEach(existingEffectToUseItem => {
                const { value } = existingEffectToUseItem;
                if (value) {
                    // ITERATE THROUGH EXISTING EFFECT JSON VALUES
                    value.forEach((effectValue, effectIndex) => {
                        // REPLACE EXISTING EFFECT VALUE IF SAME TYPE IS PRESENT IN PRESET LAYER EFFECT
                        if (effectValue.type === presetLayerEffectItem.type) {
                            value[effectIndex] = presetLayerEffectItem;
                        }
                        // OTHERWISE MODIFY EXISTING EFFECT
                        else {
                            const notMerged = !existingEffectToUseItem.value.find(existingEffectItemToMerge => existingEffectItemToMerge.type === presetLayerEffectJSON[0].type);
                            // CHECK IF PRESET LAYER EFFECT HAS BEEN MERGED, IF NOT YET MERGED APPEND PRESET LAYER EFFECT TO EXISTING EFFECT
                            if (notMerged) {
                                existingEffectToUseItem.value = [
                                    ...existingEffectToUseItem.value,
                                    ...presetLayerEffectJSON
                                ];
                            }
                        }
                    });
                }
                else {
                    // HANDLE NON SCALE EFFECTS
                    const notMerged = !effectToUse.find(nonScaleEffectToUseItem => nonScaleEffectToUseItem.type === existingEffectToUseItem.type);
                    const presetNotMerged = !effectToUse.find(nonScaleEffectToUseItem => nonScaleEffectToUseItem.type === presetLayerEffectItem.type);
                    if (presetNotMerged) {
                        effectToUse = [...effectToUse, presetLayerEffectItem];
                    }
                    if (notMerged) {
                        effectToUse = [...effectToUse, existingEffectToUseItem];
                    }
                }
            });
        });
    }
    const mergedEffect = c(effectToUse);
    return mergedEffect;
}

const TIME_SLIDER_HANDLE_KEY = 'time-slider-watch';
class InstantAppsTimeFilterViewModel {
    constructor() {
        this.initializeModules();
    }
    async initializeModules() {
        try {
            const [Handles, reactiveUtils, TimeSlider, TimeExtent, TimeInterval, FeatureFilter, FeatureEffect] = await loadModules([
                'esri/core/Handles',
                'esri/core/reactiveUtils',
                'esri/widgets/TimeSlider',
                'esri/time/TimeExtent',
                'esri/time/TimeInterval',
                'esri/layers/support/FeatureFilter',
                'esri/layers/support/FeatureEffect',
            ]);
            this.reactiveUtils = reactiveUtils;
            this.handles = new Handles();
            this.TimeSlider = TimeSlider;
            this.TimeExtent = TimeExtent;
            this.TimeInterval = TimeInterval;
            this.FeatureFilter = FeatureFilter;
            this.FeatureEffect = FeatureEffect;
        }
        catch (_a) { }
    }
    async init(timeSliderRef) {
        var _a, _b;
        if (timeSliderRef)
            timeSliderRef.innerHTML = '';
        if (((_b = (_a = state === null || state === void 0 ? void 0 : state.timeSlider) === null || _a === void 0 ? void 0 : _a.viewModel) === null || _b === void 0 ? void 0 : _b.state) === 'playing')
            state.timeSlider.stop();
        const { view, timeInfoConfigItems } = state;
        if (!view)
            return;
        try {
            await view.when();
            const timeLayerViews = await this.getTimeLayerViews(view, timeInfoConfigItems);
            state.timeInfoItems = this.generateTimeInfoItems(timeLayerViews, timeInfoConfigItems);
            this.initTimeSlider(timeSliderRef);
            this.setupFilterModeWatcher();
            return Promise.resolve();
        }
        catch (_c) { }
    }
    destroy() {
        var _a, _b;
        (_a = this.handles) === null || _a === void 0 ? void 0 : _a.removeAll();
        this.handles = null;
        (_b = state.timeSlider) === null || _b === void 0 ? void 0 : _b.destroy();
    }
    async getTimeLayerViews(view, timeInfoConfigItems) {
        const { allLayers } = view.map;
        const getTimeLayer = (timeInfoLayerId) => allLayers.find(({ id }) => timeInfoLayerId === id);
        const timeLayers = timeInfoConfigItems.map(({ id }) => getTimeLayer(id));
        const timeLVPromises = timeLayers.map(layer => view.whenLayerView(layer));
        return await Promise.all(timeLVPromises);
    }
    generateTimeInfoItems(timeLayerViews, timeConfigItems) {
        const items = [...timeConfigItems];
        return items.map(timeConfigItem => {
            const lv = timeLayerViews.find(({ layer }) => layer.id === timeConfigItem.id);
            return this.generateTimeInfoItem(lv, timeConfigItem);
        });
    }
    generateTimeInfoItem(layerView, { increments, rangeStart, rangeEnd }) {
        var _a;
        const layer = layerView === null || layerView === void 0 ? void 0 : layerView.layer;
        const layerFTE = (_a = layer === null || layer === void 0 ? void 0 : layer.timeInfo) === null || _a === void 0 ? void 0 : _a.fullTimeExtent;
        const timeExtent = layerFTE;
        return {
            layerView: layerView,
            unit: increments,
            rangeStart: new Date(rangeStart),
            rangeEnd: new Date(rangeEnd),
            timeExtent,
            previousTimeExtent: null,
        };
    }
    initTimeSlider(timeSliderRef) {
        var _a, _b;
        const initialTimeInfoItem = (_a = state === null || state === void 0 ? void 0 : state.timeInfoItems) === null || _a === void 0 ? void 0 : _a[0];
        if (!initialTimeInfoItem)
            return;
        const { TimeSlider } = this;
        state.selectedTimeInfoItem = initialTimeInfoItem;
        const config = this.getTimeSliderConfig(timeSliderRef);
        state.timeSlider = new TimeSlider(config);
        if (state.autoPlay)
            state.timeSlider.play();
        if (((_b = state.view) === null || _b === void 0 ? void 0 : _b.type) === '2d')
            this.initialize2DView();
    }
    setupFilterModeWatcher() {
        onChange('filterMode', (newValue) => state.timeInfoItems.forEach(timeInfoItem => {
            var _a, _b, _c;
            const fLayerView = timeInfoItem.layerView;
            this.applyTimeExtent(fLayerView, ((_b = (_a = fLayerView === null || fLayerView === void 0 ? void 0 : fLayerView.featureEffect) === null || _a === void 0 ? void 0 : _a.filter) === null || _b === void 0 ? void 0 : _b.timeExtent) || ((_c = fLayerView.filter) === null || _c === void 0 ? void 0 : _c.timeExtent), newValue);
        }));
    }
    getTimeSliderConfig(timeSliderRef) {
        var _a;
        const [{ timeExtent, rangeStart, rangeEnd, unit }] = state.timeInfoItems;
        const { TimeExtent, TimeInterval } = this;
        const config = Object.assign({ container: timeSliderRef, fullTimeExtent: timeExtent, timeExtent: new TimeExtent({
                start: rangeStart,
                end: rangeEnd,
            }), mode: 'time-window', stops: {
                interval: new TimeInterval({
                    unit,
                    value: 1,
                }),
            }, view: ((_a = state.view) === null || _a === void 0 ? void 0 : _a.type) === '3d' ? state.view : null }, state.timeSliderConfig);
        return config;
    }
    initialize2DView() {
        state.timeInfoItems.forEach(timeInfoItem => this.applyTimeExtent(timeInfoItem.layerView, new this.TimeExtent({ start: timeInfoItem.rangeStart, end: timeInfoItem.rangeEnd })));
        this.setupTimeExtentWatcher();
    }
    applyTimeExtent(layerView, timeExtent, filterMode) {
        var _a;
        if (((_a = state.filterMode) === null || _a === void 0 ? void 0 : _a.type) === 'effect') {
            this.applyFeatureEffect(layerView, timeExtent, filterMode);
        }
        else {
            this.applyFeatureFilter(layerView, timeExtent);
        }
    }
    applyFeatureEffect(layerView, timeExtent, filterMode) {
        if (!layerView)
            return;
        if (layerView.filter)
            layerView.set('filter', null);
        if (!layerView.featureEffect || filterMode) {
            this.handleUpdatedFeatureEffect(layerView, timeExtent);
            return;
        }
        layerView.featureEffect.filter.timeExtent = timeExtent;
    }
    handleUpdatedFeatureEffect(fLayerView, timeExtent) {
        var _a, _b, _c, _d;
        const { FeatureEffect } = this;
        fLayerView.featureEffect = new FeatureEffect({
            filter: { timeExtent },
            includedEffect: getMergedEffect((_b = (_a = state.filterMode) === null || _a === void 0 ? void 0 : _a.effect) === null || _b === void 0 ? void 0 : _b.includedEffect, fLayerView, 'includedEffect'),
            excludedEffect: getMergedEffect((_d = (_c = state.filterMode) === null || _c === void 0 ? void 0 : _c.effect) === null || _d === void 0 ? void 0 : _d.excludedEffect, fLayerView, 'excludedEffect'),
        });
    }
    applyFeatureFilter(layerView, timeExtent) {
        if (layerView.featureEffect)
            layerView.set('featureEffect', null);
        if (!layerView.filter) {
            layerView.filter = new this.FeatureFilter({ timeExtent: timeExtent });
            return;
        }
        layerView.filter.timeExtent = timeExtent;
    }
    setupTimeExtentWatcher() {
        var _a, _b, _c, _d;
        if ((_a = this.handles) === null || _a === void 0 ? void 0 : _a.has(TIME_SLIDER_HANDLE_KEY))
            (_b = this.handles) === null || _b === void 0 ? void 0 : _b.remove(TIME_SLIDER_HANDLE_KEY);
        (_c = this.handles) === null || _c === void 0 ? void 0 : _c.add((_d = state === null || state === void 0 ? void 0 : state.timeSlider) === null || _d === void 0 ? void 0 : _d.watch('timeExtent', timeExtent => { var _a; return this.applyTimeExtent((_a = state.selectedTimeInfoItem) === null || _a === void 0 ? void 0 : _a.layerView, timeExtent); }), TIME_SLIDER_HANDLE_KEY);
    }
    updateSelectedTimeInfoItem(timeInfoItem) {
        if (!state.timeSlider)
            return;
        if (state.selectedTimeInfoItem)
            state.selectedTimeInfoItem.previousTimeExtent = state.timeSlider.timeExtent;
        state.selectedTimeInfoItem = timeInfoItem;
        this.reconfigureTimeSlider(timeInfoItem);
        this.applyTimeExtent(timeInfoItem.layerView, state.timeSlider.timeExtent);
        this.setupTimeExtentWatcher();
    }
    reconfigureTimeSlider(timeInfoItem) {
        if (!state.timeSlider)
            return;
        state.timeSlider.fullTimeExtent = timeInfoItem.timeExtent;
        state.timeSlider.timeExtent = this.getTimeExtent(timeInfoItem);
        state.timeSlider.stops = { interval: this.getTimeInterval(timeInfoItem) };
    }
    getTimeExtent({ rangeStart, rangeEnd, previousTimeExtent }) {
        const { TimeExtent } = this;
        return (previousTimeExtent !== null && previousTimeExtent !== void 0 ? previousTimeExtent : new TimeExtent({
            start: rangeStart,
            end: rangeEnd,
        }));
    }
    getTimeInterval(timeInfoItem) {
        var _a, _b, _c, _d, _e;
        const { TimeInterval } = this;
        const unit = (_a = timeInfoItem.unit) !== null && _a !== void 0 ? _a : (_e = (_d = (_c = (_b = timeInfoItem.layerView) === null || _b === void 0 ? void 0 : _b.layer) === null || _c === void 0 ? void 0 : _c.timeInfo) === null || _d === void 0 ? void 0 : _d.interval) === null || _e === void 0 ? void 0 : _e.unit;
        return new TimeInterval({
            unit: unit,
            value: 1,
        });
    }
    getLabel(timeInfoItem) {
        var _a, _b;
        return ((_b = (_a = timeInfoItem === null || timeInfoItem === void 0 ? void 0 : timeInfoItem.layerView) === null || _a === void 0 ? void 0 : _a.layer) === null || _b === void 0 ? void 0 : _b.title) || '';
    }
}
const viewModel = new InstantAppsTimeFilterViewModel();

const instantAppsTimeFilterCss = ".instant-apps-time-filter{position:relative;display:block;min-width:375px;min-height:200px}.instant-apps-time-filter__background{background-color:var(--calcite-ui-background);position:absolute;top:0;left:0;width:100%;height:100%;z-index:0}.instant-apps-time-filter calcite-dropdown{width:100%}.instant-apps-time-filter calcite-dropdown calcite-button{--calcite-color-brand:var(--calcite-ui-text-1);--calcite-ui-brand:var(--calcite-ui-text-1)}.instant-apps-time-filter__layer-title{font-weight:550;display:inline-block;padding:10px}.instant-apps-time-filter__loading-container{display:flex;justify-content:center;align-items:center;position:absolute;top:0;left:0;width:100%;height:100%;z-index:1}.instant-apps-time-filter--3d{min-height:160px}";
const InstantAppsTimeFilterStyle0 = instantAppsTimeFilterCss;

const CSS = {
    base: 'instant-apps-time-filter',
    layerTitle: 'instant-apps-time-filter__layer-title',
    loadingContainer: 'instant-apps-time-filter__loading-container',
    background: 'instant-apps-time-filter__background',
    threeD: ' instant-apps-time-filter--3d',
};
const InstantAppsTimeFilter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.timeSliderRef = undefined;
        this.timeInfoConfigItems = [];
        this.filterMode = undefined;
        this.view = undefined;
        this.timeSliderConfig = undefined;
        this.autoPlay = false;
    }
    async updateTimeInfoConfigItems() {
        state.timeInfoConfigItems = this.timeInfoConfigItems;
        await viewModel.init(this.timeSliderRef);
    }
    async updateFilterMode() {
        state.filterMode = this.filterMode;
    }
    async updateTimeSliderConfig() {
        state.timeSliderConfig = this.timeSliderConfig;
        await viewModel.init(this.timeSliderRef);
    }
    async updateAutoPlay() {
        state.autoPlay = this.autoPlay;
        if (state.timeSlider) {
            if (state.autoPlay) {
                state.timeSlider.play();
            }
            else {
                state.timeSlider.stop();
            }
        }
    }
    async componentWillLoad() {
        try {
            state.view = this.view;
            state.timeInfoConfigItems = this.timeInfoConfigItems;
            state.autoPlay = !!this.autoPlay;
            if (this.timeSliderConfig)
                state.timeSliderConfig = this.timeSliderConfig;
            if (this.filterMode)
                state.filterMode = this.filterMode;
            await getMessages(this);
        }
        catch (_a) { }
    }
    async componentDidLoad() {
        try {
            await viewModel.init(this.timeSliderRef);
        }
        catch (_a) {
        }
        finally {
            state.loading = false;
        }
    }
    disconnectedcallback() {
        viewModel.destroy();
    }
    render() {
        return h$2(Host, { key: '38a0569dba42d51846760bf75df36ee1c88d71b1' }, this._renderBase());
    }
    _renderBase() {
        return (h$2("div", { class: `${CSS.base}${this.view.type !== '2d' ? CSS.threeD : ''}` }, this._renderLoader(), this.view.type === '2d' && this._renderTopEl(), h$2("div", { key: "time-slider", ref: (ref) => (this.timeSliderRef = ref) })));
    }
    _renderLoader() {
        var _a, _b;
        return (state.loading && (h$2("div", null, h$2("div", { class: CSS.background }), h$2("div", { class: CSS.loadingContainer }, h$2("calcite-loader", { scale: "m", label: (_a = this.messages) === null || _a === void 0 ? void 0 : _a.loading, text: (_b = this.messages) === null || _b === void 0 ? void 0 : _b.loading })))));
    }
    _renderTopEl() {
        const moreThanOneTimeLayer = this.timeInfoConfigItems.length > 1;
        return moreThanOneTimeLayer ? this._renderDropdown() : this._renderLayerTitle();
    }
    _renderLayerTitle() {
        var _a, _b, _c;
        const title = (_c = (_b = (_a = state.selectedTimeInfoItem) === null || _a === void 0 ? void 0 : _a.layerView) === null || _b === void 0 ? void 0 : _b.layer) === null || _c === void 0 ? void 0 : _c.title;
        return h$2("span", { class: CSS.layerTitle }, title);
    }
    _renderDropdown() {
        return (state.selectedTimeInfoItem && (h$2("calcite-dropdown", null, this._renderDropdownButton(), this._renderDropdownItems())));
    }
    _renderDropdownButton() {
        return (h$2("calcite-button", { slot: "trigger", appearance: "transparent", iconEnd: "chevron-down", width: "full", alignment: "space-between" }, viewModel.getLabel(state.selectedTimeInfoItem)));
    }
    _renderDropdownItems() {
        return state.timeInfoItems.map(timeInfoItem => this._renderDropdownItem(timeInfoItem));
    }
    _renderDropdownItem(timeInfoItem) {
        var _a, _b, _c, _d, _e;
        const selectedInfoItemId = (_c = (_b = (_a = state.selectedTimeInfoItem) === null || _a === void 0 ? void 0 : _a.layerView) === null || _b === void 0 ? void 0 : _b.layer) === null || _c === void 0 ? void 0 : _c.id;
        const timeInfoItemId = (_e = (_d = timeInfoItem === null || timeInfoItem === void 0 ? void 0 : timeInfoItem.layerView) === null || _d === void 0 ? void 0 : _d.layer) === null || _e === void 0 ? void 0 : _e.id;
        const selected = selectedInfoItemId === timeInfoItemId;
        return (h$2("calcite-dropdown-item", { onCalciteDropdownItemSelect: () => viewModel.updateSelectedTimeInfoItem(timeInfoItem), selected: selected }, viewModel.getLabel(timeInfoItem)));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "timeInfoConfigItems": ["updateTimeInfoConfigItems"],
        "filterMode": ["updateFilterMode"],
        "timeSliderConfig": ["updateTimeSliderConfig"],
        "autoPlay": ["updateAutoPlay"]
    }; }
};
InstantAppsTimeFilter.style = InstantAppsTimeFilterStyle0;

export { InstantAppsTimeFilter as instant_apps_time_filter };
