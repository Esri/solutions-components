/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { x as x$2, r as r$d, y as y$c, a as s$l, C as C$2, w as w$3, h as has, s as s$m, d as d$c, b as x$3, c as b$6, j as j$7, N as N$1, f as r$e, o as o$h, g as s$n, t as t$l, i as h$8, A as A$4, k as a$c, l as j$8, Q, m as a$d, n as x$4, p as b$7, q as s$o, E as E$2, u as u$d, v as e$n, z as r$f, B as s$p, D as i$i, F as s$q, G as p$f, H as y$d, I as j$9, J as D$4, K as v$7, L as p$g, M as z$1, U as U$2, O as L$2, Z, P as I$2, R as t$m, S as s$r, T as F$1, V as J, W as t$n, X as Bt, Y as n$k } from './calcite-input-message.calcite-notice.map-select-tools.pdf-download.refine-selection-df5cddd5.js';
import './index-c246d90e.js';
import './dom-3bdc69ee.js';
import './resources-436ae282.js';
import './guid-15fce7c0.js';
import './interfaces-4ae145eb.js';
import './conditionalSlot-d09506c4.js';
import './observers-31601001.js';
import './loadModules-4e40f189.js';
import './locale-78c0a2c5.js';
import './_commonjsHelpers-8fd39c50.js';
import './mapViewUtils-8f0754c5.js';
import './interfaces-3b23a5f9.js';
import './publicNotificationStore-b9daaee4.js';
import './index-ac7f66eb.js';
import './csvUtils-81b3e74a.js';
import './publicNotificationUtils-5cb5a607.js';

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function e$m(e,t,r,o){var c,f=arguments.length,n=f<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var l=e.length-1;l>=0;l--)(c=e[l])&&(n=(f<3?c(n):f>3?c(t,r,n):c(t,r))||n);return f>3&&n&&Object.defineProperty(t,r,n),n}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function t$k(n){return null!=n&&"function"==typeof n[Symbol.iterator]}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
class t$j{constructor(){this._groups=new Map;}destroy(){this.removeAll();}get size(){let r=0;return this._groups.forEach((e=>{r+=e.length;})),r}add(e,t){if(t$k(e)){const r=this._getOrCreateGroup(t);for(const t of e)this._isHandle(t)&&r.push(t);}else if(this._isHandle(e)){this._getOrCreateGroup(t).push(e);}return this}forEach(r,e){if("function"==typeof r)this._groups.forEach((e=>e.forEach(r)));else {const t=this._getGroup(r);t&&e&&t.forEach(e);}}has(r){return this._groups.has(this._ensureGroupKey(r))}remove(e){if("string"!=typeof e&&t$k(e)){for(const r of e)this.remove(r);return this}return this.has(e)?(this._removeAllFromGroup(this._getGroup(e)),this._groups.delete(this._ensureGroupKey(e)),this):this}removeAll(){return this._groups.forEach((r=>this._removeAllFromGroup(r))),this._groups.clear(),this}_isHandle(r){return r&&!!r.remove}_getOrCreateGroup(r){if(this.has(r))return this._getGroup(r);const e=[];return this._groups.set(this._ensureGroupKey(r),e),e}_getGroup(r){return x$2(this._groups.get(this._ensureGroupKey(r)))}_ensureGroupKey(r){return r||"_default_"}_removeAllFromGroup(r){r.forEach((r=>r.remove()));}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function r$c(r){return n$j((()=>r.forEach((r=>r$d(r)&&r.remove()))))}function n$j(e){return {remove:()=>{e&&(e(),e=void 0);}}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function e$l(r){return r?r.__accessor__?r.__accessor__:r.propertyInvalidated?r:null:null}function i$h(r,n){return null!=r&&r.metadatas&&null!=r.metadatas[n]}function o$g(r,n,t){if(t){return l$d(r,n,{policy:t,path:""})}return l$d(r,n,null)}function l$d(r,e,i){return e?Object.keys(e).reduce(((r,u)=>{let o=null,a="merge";if(i&&(o=i.path?`${i.path}.${u}`:u,a=i.policy(o)),"replace"===a)return r[u]=e[u],r;if(void 0===r[u])return r[u]=y$c(e[u]),r;let s=r[u],c=e[u];if(s===c)return r;if(Array.isArray(c)||Array.isArray(r))s=s?Array.isArray(s)?r[u]=s.concat():r[u]=[s]:r[u]=[],c&&(Array.isArray(c)||(c=[c]),c.forEach((r=>{s.includes(r)||s.push(r);})));else if(c&&"object"==typeof c)if(i){const n=i.path;i.path=x$2(o),r[u]=l$d(s,c,i),i.path=n;}else r[u]=l$d(s,c,null);else r.hasOwnProperty(u)&&!e.hasOwnProperty(u)||(r[u]=c);return r}),r||{}):r}function s$k(r){return Array.isArray(r)?r:r.split(".")}function c$e(r){return r.includes(",")?r.split(",").map((r=>r.trim())):[r.trim()]}function f$c(r){if(Array.isArray(r)){const n=[];for(const t of r)n.push(...c$e(t));return n}return c$e(r)}function y$b(n,t,e,i){const u=f$c(t);if(1!==u.length){const t=u.map((r=>i(n,r,e)));return r$c(t)}return i(n,u[0],e)}function h$7(r){let n=!1;return ()=>{n||(n=!0,r());}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function e$k(t,e){const i="?"===t[t.length-1]?t.slice(0,-1):t;if(null!=e.getItemAt||Array.isArray(e)){const t=parseInt(i,10);if(!isNaN(t))return Array.isArray(e)?e[t]:e.getItemAt(t)}const u=e$l(e);return i$h(u,i)?u.get(i):e[i]}function i$g(t,n,r){if(null==t)return t;const u=e$k(n[r],t);return !u&&r<n.length-1?void 0:r===n.length-1?u:i$g(u,n,r+1)}function u$c(n,r,u=0){return "string"!=typeof r||r.includes(".")?i$g(n,s$k(r),u):e$k(r,n)}function o$f(t,n){return u$c(t,n)}function s$j(t,n){return void 0!==u$c(n,t)}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
class o$e{constructor(t){this.autoDestroy=!1,this.properties=t;}}function n$i(r){let n=r.constructor.__accessorMetadata__;const c=Object.prototype.hasOwnProperty.call(r.constructor,"__accessorMetadata__");if(n){if(!c){const e=Object.create(n.properties),c=n.autoDestroy;for(const r in e)e[r]=y$c(e[r]);n=new o$e(e),n.autoDestroy=c,Object.defineProperty(r.constructor,"__accessorMetadata__",{value:n,enumerable:!1,configurable:!0,writable:!0});}}else n=new o$e({}),Object.defineProperty(r.constructor,"__accessorMetadata__",{value:n,enumerable:!1,configurable:!0,writable:!0});return x$2(r.constructor.__accessorMetadata__)}function c$d(t){return n$i(t).properties}function s$i(t,e){const r=c$d(t);let o=r[e];return o||(o=r[e]={}),o}function i$f(t,e){return o$g(t,e,_$8)}const p$e=/^(?:[^.]+\.)?(?:value|type|(?:json\.type|json\.origins\.[^.]\.type))$/;function _$8(t){return p$e.test(t)?"replace":"merge"}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function t$i(t){return t&&t.release&&"function"==typeof t.release}function i$e(t){return t&&t.acquire&&"function"==typeof t.acquire}class e$j{constructor(t,i,e,o=1,s=0){if(this._ctor=t,this._acquireFunction=i,this._releaseFunction=e,this.allocationSize=o,this._pool=new Array(s),this._initialSize=s,this._ctor)for(let n=0;n<s;n++)this._pool[n]=new this._ctor;this.allocationSize=Math.max(o,1);}destroy(){this.prune(0);}acquire(...t){let o;if(e$j.test.disabled)o=new this._ctor;else {if(0===this._pool.length){const t=this.allocationSize;for(let i=0;i<t;i++)this._pool[i]=new this._ctor;}o=this._pool.pop();}return this._acquireFunction?this._acquireFunction(o,...t):i$e(o)&&o.acquire(...t),o}release(i){i&&!e$j.test.disabled&&(this._releaseFunction?this._releaseFunction(i):t$i(i)&&i.release(),this._pool.push(i));}prune(t=this._initialSize){if(!(t>=this._pool.length)){for(let i=t;i<this._pool.length;++i){const t=this._pool[i];this._dispose(t);}this._pool.length=t;}}_dispose(t){t.dispose&&"function"==typeof t.dispose&&t.dispose();}}e$j.test={disabled:!1};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
var I$1;!function(I){I[I.INITIALIZING=0]="INITIALIZING",I[I.CONSTRUCTING=1]="CONSTRUCTING",I[I.CONSTRUCTED=2]="CONSTRUCTED";}(I$1||(I$1={}));

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
var r$b;!function(e){e[e.DEFAULTS=0]="DEFAULTS",e[e.COMPUTED=1]="COMPUTED",e[e.SERVICE=2]="SERVICE",e[e.PORTAL_ITEM=3]="PORTAL_ITEM",e[e.WEB_SCENE=4]="WEB_SCENE",e[e.WEB_MAP=5]="WEB_MAP",e[e.USER=6]="USER";}(r$b||(r$b={}));function t$h(e){switch(e){case"defaults":return r$b.DEFAULTS;case"service":return r$b.SERVICE;case"portal-item":return r$b.PORTAL_ITEM;case"web-scene":return r$b.WEB_SCENE;case"web-map":return r$b.WEB_MAP;case"user":return r$b.USER;default:return null}}function n$h(E){switch(E){case r$b.DEFAULTS:return "defaults";case r$b.SERVICE:return "service";case r$b.PORTAL_ITEM:return "portal-item";case r$b.WEB_SCENE:return "web-scene";case r$b.WEB_MAP:return "web-map";case r$b.USER:return "user"}return x$2(void 0)}function c$c(e){return n$h(e)}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
var i$d;!function(i){i[i.Dirty=1]="Dirty",i[i.Overriden=2]="Overriden",i[i.Computing=4]="Computing",i[i.NonNullable=8]="NonNullable",i[i.HasDefaultValue=16]="HasDefaultValue",i[i.DepTrackingInitialized=32]="DepTrackingInitialized",i[i.AutoTracked=64]="AutoTracked",i[i.ExplicitlyTracking=128]="ExplicitlyTracking";}(i$d||(i$d={}));

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const o$d={onObservableAccessed:()=>{},onTrackingEnd:()=>{}},c$b=[];let i$c=o$d;function s$h(t){i$c.onObservableAccessed(t);}let l$c=!1,a$b=!1;function f$b(t,n,e){if(l$c)return u$b(t,n,e);p$d(t);const r=n.call(e);return d$b(),r}function g$6(t,n){return f$b(o$d,t,n)}function u$b(n,e,r){const o=l$c;l$c=!0,p$d(n);let c=null;try{c=e.call(r);}catch(i){a$b&&s$l.getLogger("esri.core.accessorSupport.tracking").error(i);}return d$b(),l$c=o,c}function p$d(t){i$c=t,c$b.push(t);}function d$b(){const t=c$b.length;if(t>1){const n=c$b.pop();i$c=c$b[t-2],n.onTrackingEnd();}else if(1===t){const t=c$b.pop();i$c=o$d,t.onTrackingEnd();}else i$c=o$d;}function m$9(t,n){if(n.flags&i$d.DepTrackingInitialized)return;const e=a$b;a$b=!1,n.flags&i$d.AutoTracked?u$b(n,n.metadata.get,t):y$a(t,n),a$b=e;}const k$4=[];function y$a(t,e){e.flags&i$d.ExplicitlyTracking||(e.flags|=i$d.ExplicitlyTracking,u$b(e,(()=>{const r=e.metadata.dependsOn||k$4;for(const e of r)if("string"!=typeof e||e.includes(".")){const r=s$k(e);for(let n=0,e=t;n<r.length&&null!=e&&"object"==typeof e;++n)e=A$3(e,r[n],n!==r.length-1);}else A$3(t,e,!1);})),e.flags&=~i$d.ExplicitlyTracking);}function A$3(t,n,r){const o="?"===n[n.length-1]?n.slice(0,-1):n;if(null!=t.getItemAt||Array.isArray(t)){const n=parseInt(o,10);if(!isNaN(n))return Array.isArray(t)?t[n]:t.getItemAt(n)}const c=e$l(t)?.properties.get(o);return c&&(s$h(c),m$9(t,c)),r?t[o]:void 0}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
class s$g{constructor(r,s){this._observers=r,this._observer=s;}remove(){C$2(this._observers,this._observer);}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
class l$b{constructor(s,t,e){this.properties=s,this.propertyName=t,this.metadata=e,this._observers=null,this._accessed=null,this._handles=null,this.flags=i$d.Dirty|(e.nonNullable?i$d.NonNullable:0)|(e.hasOwnProperty("value")?i$d.HasDefaultValue:0)|(void 0===e.get?i$d.DepTrackingInitialized:0)|(void 0===e.dependsOn?i$d.AutoTracked:0);}destroy(){if(this.flags&i$d.Dirty&&this._observers){const s=this._observers.slice();for(const t of s)t.onCommitted();}this._accessed=null,this._observers=null,this._clearObservationHandles();}getComputed(){s$h(this);const o=this.properties.store,l=this.propertyName,a=this.flags,h=o.get(l);if(a&i$d.Computing)return h;if(~a&i$d.Dirty&&o.has(l))return h;this.flags|=i$d.Computing;const d=this.properties.host;let c;a&i$d.AutoTracked?c=f$b(this,this.metadata.get,d):(y$a(d,this),c=this.metadata.get.call(d)),o.set(l,c,r$b.COMPUTED);const u=o.get(l);return u===h?this.flags&=~i$d.Dirty:g$6(this.commit,this),this.flags&=~i$d.Computing,u}onObservableAccessed(s){s!==this&&(null===this._accessed&&(this._accessed=[]),this._accessed.includes(s)||this._accessed.push(s));}onTrackingEnd(){this._clearObservationHandles(),this.flags|=i$d.DepTrackingInitialized;const s=this._accessed;if(null===s)return;let t=this._handles;null===t&&(t=this._handles=[]);for(let e=0;e<s.length;++e)t.push(s[e].observe(this));s.length=0;}observe(s){return null===this._observers&&(this._observers=[]),this._observers.includes(s)||this._observers.push(s),new s$g(this._observers,s)}notifyChange(){this.onInvalidated(),this.onCommitted();}invalidate(){this.onInvalidated();}onInvalidated(){~this.flags&i$d.Overriden&&(this.flags|=i$d.Dirty);const s=this._observers;if(null!==s)for(let t=0;t<s.length;++t)s[t].onInvalidated();}commit(){this.flags&=~i$d.Dirty,this.onCommitted();}onCommitted(){if(null===this._observers)return;const s=this._observers.slice();for(let t=0;t<s.length;++t)s[t].onCommitted();}_clearObservationHandles(){const s=this._handles;if(null!==s){for(let t=0;t<s.length;++t)s[t].remove();s.length=0;}}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
class t$g{constructor(){this._values=new Map,this.multipleOriginsSupported=!1;}clone(s){const r=new t$g;return this._values.forEach(((t,i)=>{s&&s.has(i)||r.set(i,y$c(t));})),r}get(e){return this._values.get(e)}originOf(){return r$b.USER}keys(){return [...this._values.keys()]}set(e,s){this._values.set(e,s);}delete(e){this._values.delete(e);}has(e){return this._values.has(e)}forEach(e){this._values.forEach(e);}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function g$5(t,e,s){return void 0!==t}function d$a(t,e,s,r){return void 0!==t&&(!(null==s&&t.flags&i$d.NonNullable)||(!1))}function m$8(t){return t&&"function"==typeof t.destroy}s$l.getLogger("esri.core.accessorSupport.Properties");class v$6{constructor(t){this.host=t,this.properties=new Map,this.ctorArgs=null,this.destroyed=!1,this.lifecycle=I$1.INITIALIZING,this.store=new t$g,this._origin=r$b.USER;const e=this.host.constructor.__accessorMetadata__,s=e.properties;for(const i in s){const t=new l$b(this,i,s[i]);this.properties.set(i,t);}this.metadatas=s,this._autoDestroy=e.autoDestroy;}initialize(){this.lifecycle=I$1.CONSTRUCTING;}constructed(){this.lifecycle=I$1.CONSTRUCTED;}destroy(){if(this.destroyed=!0,this._autoDestroy)for(const[t,e]of this.properties){const s=this.internalGet(t);s&&m$8(s)&&(s.destroy(),~e.flags&i$d.NonNullable&&this._internalSet(e,null)),e.destroy();}else for(const[t,e]of this.properties)e.destroy();}get initialized(){return this.lifecycle!==I$1.INITIALIZING}get(t){const e=this.properties.get(t);if(e.metadata.get)return e.getComputed();s$h(e);const s=this.store;return s.has(t)?s.get(t):e.metadata.value}originOf(t){const e=this.store.originOf(t);if(void 0===e){const e=this.properties.get(t);if(void 0!==e&&e.flags&i$d.HasDefaultValue)return "defaults"}return n$h(e)}has(t){return !!this.properties.has(t)&&this.store.has(t)}keys(){return [...this.properties.keys()]}internalGet(t){const e=this.properties.get(t);if(g$5(e))return this.store.has(t)?this.store.get(t):e.metadata.value}internalSet(t,e){const s=this.properties.get(t);g$5(s)&&this._internalSet(s,e);}getDependsInfo(t,e,s){const i=this.properties.get(e);if(!g$5(i))return "";const o=new Set,n=f$b({onObservableAccessed:t=>o.add(t),onTrackingEnd:()=>{}},(()=>i.metadata.get?.call(t)));let a=`${s}${t.declaredClass.split(".").pop()}.${e}: ${n}\n`;if(0===o.size)return a;s+="  ";for(const l of o){if(!(l instanceof l$b))continue;const t=l.properties.host,e=l.propertyName,i=e$l(t);a+=i?i.getDependsInfo(t,e,s):`${s}${e}: undefined\n`;}return a}setAtOrigin(t,e,s){const i=this.properties.get(t);if(g$5(i))return this._setAtOrigin(i,e,s)}isOverridden(t){const e=this.properties.get(t);return void 0!==e&&!!(e.flags&i$d.Overriden)}clearOverride(t){const e=this.properties.get(t);void 0!==e&&e.flags&i$d.Overriden&&(e.flags&=~i$d.Overriden,e.notifyChange());}override(t,e){const s=this.properties.get(t);if(!d$a(s,t,e))return;const i=s.metadata.cast;if(i){const t=this._cast(i,e),{valid:s,value:r}=t;if(I.release(t),!s)return;e=r;}s.flags|=i$d.Overriden,this._internalSet(s,e);}set(t,e){const s=this.properties.get(t);if(!d$a(s,t,e))return;const i=s.metadata.cast;if(i){const t=this._cast(i,e),{valid:s,value:r}=t;if(I.release(t),!s)return;e=r;}const r=s.metadata.set;r?r.call(this.host,e):this._internalSet(s,e);}setDefaultOrigin(t){this._origin=t$h(t);}getDefaultOrigin(){return n$h(this._origin)}notifyChange(t){const e=this.properties.get(t);void 0!==e&&e.notifyChange();}invalidate(t){const e=this.properties.get(t);void 0!==e&&e.invalidate();}commit(t){const e=this.properties.get(t);void 0!==e&&e.commit();}_internalSet(t,e){const s=this.lifecycle!==I$1.INITIALIZING?this._origin:r$b.DEFAULTS;this._setAtOrigin(t,e,s);}_setAtOrigin(e,s,i){const r=this.store,o=e.propertyName;r.has(o,i)&&w$3(s,r.get(o))&&~e.flags&i$d.Overriden&&i===r.originOf(o)||(e.invalidate(),r.set(o,s,i),e.commit(),m$9(this.host,e));}_cast(t,e){const s=I.acquire();return s.valid=!0,s.value=e,t&&(s.value=t.call(this.host,e,s)),s}}class y$9{constructor(){this.value=null,this.valid=!0;}acquire(){this.valid=!0;}release(){this.value=null;}}const I=new e$j(y$9);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function t$f(o,e,s){if(o&&e)if("object"==typeof e)for(const r of Object.getOwnPropertyNames(e))t$f(o,r,e[r]);else {if(e.includes(".")){const n=e.split("."),i=n.splice(n.length-1,1)[0];return void t$f(o$f(o,n),i,s)}const i=o.__accessor__;null!=i&&n$g(e,i),o[e]=s;}}function n$g(r,t){if(has("esri-unknown-property-errors")&&!e$i(r,t))throw new s$m("set:unknown-property",s$f(r,t))}function e$i(o,r){return null!=r.metadatas[o]}function s$f(o,r){return "setting unknown property '"+o+"' on instance of "+r.host.declaredClass}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function r$a(e){e.length=0;}class t$e{constructor(t=50,o=50){this._pool=new e$j(Array,void 0,r$a,o,t);}acquire(){return this._pool.acquire()}release(e){this._pool.release(e);}prune(){this._pool.prune(0);}static acquire(){return o$c.acquire()}static release(e){return o$c.release(e)}static prune(){o$c.prune();}}const o$c=new t$e(100);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
class t$d extends e$j{constructor(){super(...arguments),this._set=new Set;}destroy(){super.destroy(),this._set=d$c();}acquire(...e){const s=super.acquire(...e);return this._set.delete(s),s}release(e){e&&!this._set.has(e)&&(super.release(e),this._set.add(e));}_dispose(e){this._set.delete(e),super._dispose(e);}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const o$b=[];function t$c(t){o$b.push(t),1===o$b.length&&queueMicrotask((()=>{const t=o$b.slice();o$b.length=0;for(const o of t)o();}));}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
class e$h{constructor(s,e=30){this.name=s,this._counter=0,this._samples=new Array(e);}record(e){r$d(e)&&(this._samples[++this._counter%this._samples.length]=e);}get median(){return this._samples.slice().sort(((s,e)=>s-e))[Math.floor(this._samples.length/2)]}get average(){return this._samples.reduce(((s,e)=>s+e),0)/this._samples.length}get last(){return this._samples[this._counter%this._samples.length]}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
var o$a;!function(o){const t=(o,t,n,e)=>{let i=t,c=t;const l=n>>>1,r=o[i-1];for(;c<=l;){c=i<<1,c<n&&e(o[c-1],o[c])<0&&++c;const t=o[c-1];if(e(t,r)<=0)break;o[i-1]=t,i=c;}o[i-1]=r;},n=(o,t)=>o<t?-1:o>t?1:0;function e(o,e,i,c){void 0===e&&(e=0),void 0===i&&(i=o.length),void 0===c&&(c=n);for(let n=i>>>1;n>e;n--)t(o,n,i,c);const l=e+1;for(let n=i-1;n>e;n--){const i=o[e];o[e]=o[n],o[n]=i,t(o,l,n,c);}}function*i(o,e,i,c){void 0===e&&(e=0),void 0===i&&(i=o.length),void 0===c&&(c=n);for(let n=i>>>1;n>e;n--)t(o,n,i,c),yield;const l=e+1;for(let n=i-1;n>e;n--){const i=o[e];o[e]=o[n],o[n]=i,t(o,l,n,c),yield;}}o.sort=e,o.iterableSort=i;}(o$a||(o$a={}));const t$b=o$a;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const a$a=1.5,e$g=1.1;class l$a{constructor(h){this.data=[],this._length=0,this._allocator=void 0,this._deallocator=()=>null,this._shrink=()=>{},this._hint=new x$3,h&&(h.initialSize&&(this.data=new Array(h.initialSize)),h.allocator&&(this._allocator=h.allocator),void 0!==h.deallocator&&(this._deallocator=h.deallocator),h.shrink&&(this._shrink=()=>n$f(this)));}toArray(){return this.data.slice(0,this.length)}filter(t){const h=new Array;for(let i=0;i<this._length;i++){const s=this.data[i];t(s)&&h.push(s);}return h}getItemAt(t){if(!(t<0||t>=this._length))return this.data[t]}includes(t,h){const i=this.data.indexOf(t,h);return -1!==i&&i<this.length}get length(){return this._length}set length(t){if(t>this._length){if(this._allocator){for(;this._length<t;)this.data[this._length++]=this._allocator(this.data[this._length]);return}this._length=t;}else {if(this._deallocator)for(let h=t;h<this._length;++h)this.data[h]=this._deallocator(this.data[h]);this._length=t,this._shrink();}}clear(){this.length=0;}prune(){this.clear(),this.data=[];}push(t){this.data[this._length++]=t;}pushArray(t,h=t.length){for(let i=0;i<h;i++)this.data[this._length++]=t[i];}fill(t,h){for(let i=0;i<h;i++)this.data[this._length++]=t;}pushNew(){this._allocator&&(this.data[this.length]=this._allocator(this.data[this.length]));const t=this.data[this._length];return ++this._length,t}unshift(t){this.data.unshift(t),this._length++,n$f(this);}pop(){if(0===this.length)return;const t=this.data[this.length-1];return this.length=this.length-1,this._shrink(),t}remove(t){const i=b$6(this.data,t,this.length,this._hint);if(-1!==i)return this.data.splice(i,1),this.length=this.length-1,t}removeUnordered(t){return this.removeUnorderedIndex(b$6(this.data,t,this.length,this._hint))}removeUnorderedIndex(t){if(!(t>=this.length||t<0))return this.swapElements(t,this.length-1),this.pop()}removeUnorderedMany(t,h=t.length,s){this.length=j$7(this.data,t,this.length,h,this._hint,s),this._shrink();}front(){if(0!==this.length)return this.data[0]}back(){if(0!==this.length)return this.data[this.length-1]}swapElements(t,h){if(t>=this.length||h>=this.length||t===h)return;const i=this.data[t];this.data[t]=this.data[h],this.data[h]=i;}sort(t){t$b.sort(this.data,0,this.length,t);}iterableSort(t){return t$b.iterableSort(this.data,0,this.length,t)}some(t,h){for(let i=0;i<this.length;++i)if(t.call(h,this.data[i],i,this.data))return !0;return !1}filterInPlace(t,h){let i=0;for(let s=0;s<this._length;++s){const a=this.data[s];t.call(h,a,s,this.data)&&(this.data[s]=this.data[i],this.data[i]=a,i++);}if(this._deallocator)for(let s=i;s<this._length;s++)this.data[s]=this._deallocator(this.data[s]);return this._length=i,this._shrink(),this}forAll(t,h){const i=this.length,s=this.data;for(let a=0;a<i;++a)t.call(h,s[a],a,s);}forEach(t,h){for(let i=0;i<this.length;++i)t.call(h,this.data[i],i,this.data);}map(t,h){const i=new Array(this.length);for(let s=0;s<this.length;++s)i[s]=t.call(h,this.data[s],s,this.data);return i}reduce(t,h){let i=h;for(let s=0;s<this.length;++s)i=t(i,this.data[s],s,this.data);return i}has(t){const h=this.length,i=this.data;for(let s=0;s<h;++s)if(i[s]===t)return !0;return !1}}function n$f(t){t.data.length>a$a*t.length&&(t.data.length=Math.floor(t.length*e$g));}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function n$e(n){return n}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
class m$7{constructor(e){this.callback=e,this.isActive=!0;}remove(){this.isActive=!1;}}let l$9=0;const u$a={time:n$e(0),deltaTime:n$e(0),elapsedFrameTime:n$e(0),frameDuration:n$e(0)},f$a=["prepare","preRender","render","postRender","update","finish"],h$6=[],d$9=new l$a;const k$3={frameTasks:d$9,willDispatch:!1,clearFrameTasks:j$6,dispatch:b$5,executeFrameTasks:D$3};function v$5(e){const r=new m$7(e);return h$6.push(r),k$3.willDispatch||(k$3.willDispatch=!0,t$c(b$5)),r}function j$6(e=!1){d$9.forAll((e=>{e.removed=!0;})),e&&_$7();}function D$3(e){const t=n$e(e-l$9);l$9=e;const r=1e3/60,s=Math.max(0,t-r);for(let o=0;o<f$a.length;o++){const n=performance.now(),a=f$a[o];d$9.forAll((n=>{if(n.paused||n.removed)return;0===o&&n.ticks++;n.phases[a]&&(u$a.time=e,u$a.deltaTime=0===n.ticks?n$e(0):t,u$a.elapsedFrameTime=n$e(performance.now()-e),u$a.frameDuration=n$e(r-s),n.phases[a]?.call(n,u$a));})),R[o].record(performance.now()-n);}_$7(),q$2.record(performance.now()-e);}const g$4=new l$a;function _$7(){d$9.forAll((e=>{e.removed&&g$4.push(e);})),d$9.removeUnorderedMany(g$4.data,g$4.length),g$4.clear();}function b$5(){for(;h$6.length;){const t=x$2(h$6.shift());t.isActive&&t.callback();}k$3.willDispatch=!1;}const R=f$a.map((e=>new e$h(e))),q$2=new e$h("total");

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
let t$a=0;function e$f(){return ++t$a}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
class s$e{constructor(s){this._notify=s,this._accessed=[],this._handles=[],this._invalidCount=0;}destroy(){this._accessed.length=0,this.clear();}onInvalidated(){this._invalidCount++;}onCommitted(){const s=this._invalidCount;if(1===s)return this._invalidCount=0,void this._notify();this._invalidCount=s>0?s-1:0;}onObservableAccessed(s){this._accessed.includes(s)||this._accessed.push(s);}onTrackingEnd(){const s=this._handles,t=this._accessed;for(let e=0;e<t.length;++e)s.push(t[e].observe(this));t.length=0;}clear(){const s=this._handles;for(let t=0;t<s.length;++t)s[t].remove();s.length=0;}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
let r$9=!1;const e$e=[];function o$9(e,o){let u=new s$e(s),l=null,f=!1;function s(){if(!u||f)return;if(r$9)return void i$b(s);const t=l;u.clear(),r$9=!0,f=!0,l=f$b(u,e),f=!1,r$9=!1,o(l,t),c$a();}function m(){u&&(u.destroy(),u=null,l=null);}return f=!0,l=f$b(u,e),f=!1,{remove:m}}function u$9(r,e){let o=new s$e(l),u=null;function l(){e(u,c);}function i(){o&&(o.destroy(),o=null),u=null;}function c(){return o?(o.clear(),u=f$b(o,r),u):null}return c(),{remove:i}}function i$b(n){e$e.includes(n)||e$e.unshift(n);}function c$a(){for(;e$e.length;)e$e.pop()();}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
var h$5;!function(e){e[e.Untracked=0]="Untracked",e[e.Tracked=1]="Tracked";}(h$5||(h$5={}));class f$9{constructor(){this.uid=e$f(),this.removed=!1,this.type=null,this.oldValue=null,this.callback=null,this.getValue=null,this.target=null,this.path=null,this.equals=null;}static acquireUntracked(e,r,o,l,n){return this.pool.acquire(h$5.Untracked,e,r,o,l,n,w$3)}static acquireTracked(e,t,r,o){return this.pool.acquire(h$5.Tracked,e,t,r,null,null,o)}notify(e,t){this.type===h$5.Untracked?this.callback.call(this.target,e,t,this.path,this.target):this.callback.call(null,e,t);}acquire(e,t,r,o,l,n,s){this.uid=e$f(),this.removed=!1,this.type=e,this.oldValue=t,this.callback=r,this.getValue=o,this.target=l,this.path=n,this.equals=s;}release(){this.target=this.path=this.oldValue=this.callback=this.getValue=null,this.uid=e$f(),this.removed=!0;}}f$9.pool=new t$d(f$9);const m$6=new t$e,p$c=new Set;let v$4;function k$2(e){p$c.delete(e),p$c.add(e),v$4||(v$4=v$5(q$1));}function _$6(e){if(e.removed)return;const t=e.oldValue,r=e.getValue();e.equals(t,r)||(e.oldValue=r,e.notify(r,t));}function g$3(e){for(const t of p$c.values())t.target===e&&(t.removed=!0);}function q$1(){let e=10;for(;v$4&&e--;){v$4=null;const e=j$5(),t=m$6.acquire();for(const r of e){const e=r.uid;_$6(r),e===r.uid&&r.removed&&t.push(r);}for(const r of p$c)r.removed&&(t.push(r),p$c.delete(r));for(const r of t)f$9.pool.release(r);m$6.release(t),m$6.release(e),V.forEach((e=>e()));}}function j$5(){const e=m$6.acquire();e.length=p$c.size;let t=0;for(const r of p$c)e[t]=r,++t;return p$c.clear(),e}const V=new Set;function U$1(e,t,r){let o=y$b(e,t,r,((e,t,r)=>{let l,n,i=u$9((()=>u$c(e,t)),((i,s)=>{e.__accessor__.destroyed||l&&l.uid!==n?o.remove():(l||(l=f$9.acquireUntracked(i,r,s,e,t),n=l.uid),k$2(l));}));return {remove:h$7((()=>{i.remove(),l&&(l.uid!==n||l.removed||(l.removed=!0,k$2(l)),l=null),o=i=null;}))}}));return o}function b$4(e,r,o){const l=y$b(e,r,o,((e,r,o)=>{let n=!1;return o$9((()=>u$c(e,r)),((i,s)=>{e.__accessor__.destroyed?l.remove():n||(n=!0,w$3(s,i)||o.call(e,i,s,r,e),n=!1);}))}));return l}function T$1(e,t,r,o=!1){return !e.__accessor__||e.__accessor__.destroyed?{remove(){}}:o?b$4(e,t,r):U$1(e,t,r)}function w$2(e,t,r){let o,l,n=u$9(e,((e,i)=>{o&&o.uid!==l?n.remove():(o||(o=f$9.acquireTracked(e,t,i,r),l=o.uid),k$2(o));}));return {remove:h$7((()=>{n.remove(),o&&(o.uid!==l||o.removed||(o.removed=!0,k$2(o)),o=null),n=null;}))}}function S$2(e,t,r){let o=!1;return o$9(e,((e,l)=>{o||(o=!0,r(l,e)||t(e,l),o=!1);}))}function P(e,t,o=!1,l=N$1){return o?S$2(e,t,l):w$2(e,t,l)}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function r$8(n,t,r){const o=n.get(t);if(void 0!==o)return o;const u=r();return n.set(t,u),u}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const r$7=s$l.getLogger("esri.core.accessorSupport.ensureTypes");function t$9(e){return null==e?e:new Date(e)}function o$8(e){return null==e?e:!!e}function u$8(e){return null==e?e:e.toString()}function a$9(e){return null==e?e:(e=parseFloat(e),isNaN(e)?0:e)}function s$d(e){return null==e?e:Math.round(parseFloat(e))}function i$a(e){return e&&e.constructor&&void 0!==e.constructor.__accessorMetadata__}function l$8(e,n){return null!=n&&e&&!(n instanceof e)}function c$9(e){return e&&"isCollection"in e}function f$8(e){return e&&e.Type?"function"==typeof e.Type?e.Type:e.Type.base:null}function p$b(e,n){if(!n||!n.constructor||!c$9(n.constructor))return y$8(e,n)?n:new e(n);const r=f$8(e.prototype.itemType),t=f$8(n.constructor.prototype.itemType);return r?t?r===t?n:r.prototype.isPrototypeOf(t.prototype)?new e(n):(y$8(e,n),n):new e(n):n}function y$8(e,n){return !!i$a(n)&&(r$7.error("Accessor#set","Assigning an instance of '"+(n.declaredClass||"unknown")+"' which is not a subclass of '"+g$2(e)+"'"),!0)}function v$3(e,n){return null==n?n:c$9(e)?p$b(e,n):l$8(e,n)?y$8(e,n)?n:new e(n):n}function g$2(e){return e&&e.prototype&&e.prototype.declaredClass||"unknown"}const d$8=new WeakMap;function h$4(e){switch(e){case Number:return a$9;case T:return s$d;case Boolean:return o$8;case String:return u$8;case Date:return t$9;default:return r$8(d$8,e,(()=>v$3.bind(null,e)))}}function b$3(e,n){const r=h$4(e);return 1===arguments.length?r:r(n)}function m$5(e,n,r){return 1===arguments.length?m$5.bind(null,e):n?Array.isArray(n)?n.map((n=>e(n,r))):[e(n,r)]:n}function w$1(e,n){return 1===arguments.length?m$5(b$3.bind(null,e)):m$5(b$3.bind(null,e),n)}function A$2(e,n,r){return 0!==n&&Array.isArray(r)?r.map((r=>A$2(e,n-1,r))):e(r)}function $$1(e,n,r){if(2===arguments.length)return $$1.bind(null,e,n);if(!r)return r;let t=n,o=r=A$2(e,n,r);for(;t>0&&Array.isArray(o);)t--,o=o[0];if(void 0!==o)for(let u=0;u<t;u++)r=[r];return r}function j$4(e,n,r){return 2===arguments.length?$$1(b$3.bind(null,e),n):$$1(b$3.bind(null,e),n,r)}function k$1(e){return !!Array.isArray(e)&&!e.some((n=>{const r=typeof n;return !("string"===r||"number"===r||"function"===r&&e.length>1)}))}function M$1(e,n){if(2===arguments.length)return M$1(e).call(null,n);const t=new Set,o=e.filter((e=>"function"!=typeof e)),u=e.filter((e=>"function"==typeof e));for(const r of e)"string"!=typeof r&&"number"!=typeof r||t.add(r);let a=null,s=null;return (e,n)=>{if(null==e)return e;const i=typeof e,c="string"===i||"number"===i;return c&&(t.has(e)||u.some((e=>"string"===i&&e===String||"number"===i&&e===Number)))||"object"===i&&u.some((n=>!l$8(e,n)))?e:(c&&o.length?(a||(a=o.map((e=>"string"==typeof e?`'${e}'`:`${e}`)).join(", ")),r$7.error("Accessor#set",`'${e}' is not a valid value for this property, only the following values are valid: ${a}`)):"object"==typeof e&&u.length?(s||(s=u.map((e=>g$2(e))).join(", ")),r$7.error("Accessor#set",`'${e}' is not a valid value for this property, value must be one of ${s}`)):r$7.error("Accessor#set",`'${e}' is not a valid value for this property`),n&&(n.valid=!1),null)}}function S$1(e,n){if(2===arguments.length)return S$1(e).call(null,n);const t={},o=[],u=[];for(const r in e.typeMap){const n=e.typeMap[r];t[r]=b$3(n),o.push(g$2(n)),u.push(r);}const a=()=>`'${o.join("', '")}'`,s=()=>`'${u.join("', '")}'`,c="string"==typeof e.key?n=>n[e.key]:e.key;return n=>{if(e.base&&!l$8(e.base,n))return n;if(null==n)return n;const o=c(n)||e.defaultKeyValue,u=t[o];if(!u)return r$7.error("Accessor#set",`Invalid property value, value needs to be one of ${a()}, or a plain object that can autocast (having .type = ${s()})`),null;if(!l$8(e.typeMap[o],n))return n;if("string"==typeof e.key&&!i$a(n)){const r={};for(const t in n)t!==e.key&&(r[t]=n[t]);return u(r)}return u(n)}}class T{}function _$5(e){if(!e||!("type"in e))return !1;switch(e.type){case"native":case"array":case"one-of":return !0}return !1}function B$1(e){switch(e.type){case"native":return b$3(e.value);case"array":return m$5(B$1(e.value));case"one-of":return C$1(e);default:return null}}function C$1(e){let n=null;return (t,o)=>F(t,e)?t:(null==n&&(n=D$2(e)),r$7.error("Accessor#set",`Invalid property value, value needs to be of type ${n}`),o&&(o.valid=!1),null)}function D$2(e){switch(e.type){case"native":switch(e.value){case Number:return "number";case String:return "string";case Boolean:return "boolean";case T:return "integer";case Date:return "date";default:return g$2(e.value)}case"array":return `array of ${D$2(e.value)}`;case"one-of":{const n=e.values.map((e=>D$2(e)));return `one of ${n.slice(0,n.length-1)} or ${n[n.length-1]}`}}return "unknown"}function F(e,n){if(null==e)return !0;switch(n.type){case"native":switch(n.value){case Number:case T:return "number"==typeof e;case Boolean:return "boolean"==typeof e;case String:return "string"==typeof e}return e instanceof n.value;case"array":return !!Array.isArray(e)&&!e.some((e=>!F(e,n.value)));case"one-of":return n.values.some((n=>F(e,n)))}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function y$7(n={}){return (o,s)=>{if(o===Function.prototype)throw new Error(`Inappropriate use of @property() on a static field: ${o.name}.${s}. Accessor does not support static properties.`);const i=Object.getOwnPropertyDescriptor(o,s),a=s$i(o,s);i&&(i.get||i.set?(a.get=i.get||a.get,a.set=i.set||a.set):"value"in i&&("value"in n&&s$l.getLogger("esri.core.accessorSupport.decorators.property").warn(`@property() will redefine the value of "${s}" on "${o.constructor.name}" already defined in the metadata`,n),a.value=n.value=i.value)),null!=n.readOnly&&(a.readOnly=n.readOnly);const p=n.aliasOf;if(p){const t="string"==typeof p?p:p.source,e="string"==typeof p?null:!0===p.overridable;let r;a.dependsOn=[t],a.get=function(){let e=o$f(this,t);if("function"==typeof e){r||(r=t.split(".").slice(0,-1).join("."));const n=o$f(this,r);n&&(e=e.bind(n));}return e},a.readOnly||(a.set=e?function(t){this._override(s,t);}:function(e){t$f(this,t,e);});}const u=n.type,c=n.types;a.cast||(u?a.cast=h$3(u):c&&(Array.isArray(c)?a.cast=m$5(S$1(c[0])):a.cast=S$1(c))),i$f(a,n),n.range&&(a.cast=j$3(a.cast,n.range));}}function h$3(t){let e=0,r=t;if(_$5(t))return B$1(t);for(;Array.isArray(r)&&1===r.length&&"string"!=typeof r[0]&&"number"!=typeof r[0];)r=r[0],e++;const f=r;if(k$1(f))return 0===e?M$1(f):$$1(M$1(f),e);if(1===e)return w$1(f);if(e>1)return j$4(f,e);const l=t;return l.from?l.from:b$3(l)}function j$3(t,e){return r=>{let n=+t(r);return null!=e.step&&(n=Math.round(n/e.step)*e.step),null!=e.min&&(n=Math.max(e.min,n)),null!=e.max&&(n=Math.min(e.max,n)),n}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function n$d(n){if(n.json&&n.json.origins){const o=n.json.origins,e={"web-document":["web-scene","web-map"]};for(const n in e)if(o[n]){const s=o[n];e[n].forEach((n=>{o[n]=s;})),delete o[n];}}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
class t$8 extends r$e{constructor(e,s,r){if(super(e,s,r),!(this instanceof t$8))return new t$8(e,s,r)}}t$8.prototype.type="warning";

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function e$d(e){return !!e&&e.prototype&&e.prototype.declaredClass&&0===e.prototype.declaredClass.indexOf("esri.core.Collection")}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const i$9=s$l.getLogger("esri.core.accessorSupport.extensions.serializableProperty.reader");function p$a(t,r,n){t&&(!n&&!r.read||r.read?.reader||!1===r.read?.enabled||l$7(t)&&o$h("read.reader",s$c(t),r));}function s$c(t){const e=t.ndimArray??0;if(e>1)return c$8(t);if(1===e)return a$8(t);if("type"in t&&d$7(t.type)){const e=t.type.prototype?.itemType?.Type,r=a$8("function"==typeof e?{type:e}:{types:e});return (e,n,o)=>{const i=r(e,n,o);return i?new t.type(i):i}}return u$7(t)}function u$7(t){return "type"in t?y$6(t.type):g$1(t.types)}function y$6(t){return t.prototype.read?(e,r,n)=>{if(null==e)return e;const o=typeof e;if("object"!==o)return void i$9.error(`Expected JSON value of type 'object' to deserialize type '${t.prototype.declaredClass}', but got '${o}'`);const p=new t;return p.read(e,n),p}:t.fromJSON}function f$7(t,e,r,n){return 0!==n&&Array.isArray(e)?e.map((e=>f$7(t,e,r,n-1))):t(e,void 0,r)}function c$8(t){const e=u$7(t),r=f$7.bind(null,e),n=t.ndimArray??0;return (t,e,o)=>{if(null==t)return t;t=r(t,o,n);let i=n,p=t;for(;i>0&&Array.isArray(p);)i--,p=p[0];if(void 0!==p)for(let r=0;r<i;r++)t=[t];return t}}function a$8(t){const e=u$7(t);return (t,r,n)=>{if(null==t)return t;if(Array.isArray(t)){const r=[];for(const o of t){const t=e(o,void 0,n);void 0!==t&&r.push(t);}return r}const o=e(t,void 0,n);return void 0!==o?[o]:void 0}}function d$7(t){if(!e$d(t))return !1;const e=t.prototype.itemType;return !(!e||!e.Type)&&("function"==typeof e.Type?m$4(e.Type):j$2(e.Type))}function l$7(t){return "types"in t?j$2(t.types):m$4(t.type)}function m$4(t){return !Array.isArray(t)&&(!!t&&t.prototype&&("read"in t.prototype||"fromJSON"in t||d$7(t)))}function j$2(t){for(const e in t.typeMap){if(!m$4(t.typeMap[e]))return !1}return !0}function g$1(t){let e=null;const n=t.errorContext??"type";return (o,p,s)=>{if(null==o)return o;const u=typeof o;if("object"!==u)return void i$9.error(`Expected JSON value of type 'object' to deserialize, but got '${u}'`);e||(e=v$2(t));const y=t.key;if("string"!=typeof y)return;const f=o[y],c=f?e[f]:t.defaultKeyValue?t.typeMap[t.defaultKeyValue]:void 0;if(!c){const t=`Type '${f||"unknown"}' is not supported`;return s&&s.messages&&o&&s.messages.push(new t$8(`${n}:unsupported`,t,{definition:o,context:s})),void i$9.error(t)}const a=new c;return a.read(o,s),a}}function v$2(t){const e={};for(const r in t.typeMap){const o=t.typeMap[r],i=n$i(o.prototype);if("function"==typeof t.key)continue;const p=i.properties[t.key];if(!p)continue;p.json?.type&&Array.isArray(p.json.type)&&1===p.json.type.length&&"string"==typeof p.json.type[0]&&(e[p.json.type[0]]=o);const s=p.json?.write;if(!s||!s.writer){e[r]=o;continue}const u=s.target,y="string"==typeof u?u:t.key,f={};s.writer(r,f,y),f[y]&&(e[f[y]]=o);}return e}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function e$c(e){if(e.json||(e.json={}),o$7(e.json),n$c(e.json),r$6(e.json),e.json.origins)for(const t in e.json.origins)o$7(e.json.origins[t]),n$c(e.json.origins[t]),r$6(e.json.origins[t]);return !0}function r$6(e){e.name&&(e.read&&"object"==typeof e.read?void 0===e.read.source&&(e.read.source=e.name):e.read={source:e.name},e.write&&"object"==typeof e.write?void 0===e.write.target&&(e.write.target=e.name):e.write={target:e.name});}function o$7(e){"boolean"==typeof e.read?e.read={enabled:e.read}:"function"==typeof e.read?e.read={enabled:!0,reader:e.read}:e.read&&"object"==typeof e.read&&void 0===e.read.enabled&&(e.read.enabled=!0);}function n$c(e){"boolean"==typeof e.write?e.write={enabled:e.write}:"function"==typeof e.write?e.write={enabled:!0,writer:e.write}:e.write&&"object"==typeof e.write&&void 0===e.write.enabled&&(e.write.enabled=!0);}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function i$8(r,e){if(!e.write||e.write.writer||!1===e.write.enabled&&!e.write.overridePolicy)return;const t=r?.ndimArray??0;r&&(1===t||"type"in r&&e$d(r.type))?e.write.writer=a$7:t>1?e.write.writer=l$6(t):e.types?Array.isArray(e.types)?e.write.writer=f$6(e.types[0]):e.write.writer=o$6(e.types):e.write.writer=s$b;}function o$6(r){return (e,t,n,i)=>e?u$6(e,r,i)?s$b(e,t,n,i):void 0:s$b(e,t,n,i)}function u$6(t,n,i){for(const r in n.typeMap)if(t instanceof n.typeMap[r])return !0;if(i?.messages){const o=n.errorContext??"type",u=`Values of type '${("function"!=typeof n.key?t[n.key]:t.declaredClass)??"Unknown"}' cannot be written`;i&&i.messages&&t&&i.messages.push(new s$m(`${o}:unsupported`,u,{definition:t,context:i})),s$l.getLogger("esri.core.accessorSupport.extensions.serializableProperty.writer").error(u);}return !1}function f$6(r){return (e,t,n,i)=>{if(!e||!Array.isArray(e))return s$b(e,t,n,i);return s$b(e.filter((e=>u$6(e,r,i))),t,n,i)}}function s$b(r,e,n,i){o$h(n,p$9(r,i),e);}function p$9(r,e){return r&&"function"==typeof r.write?r.write({},e):r&&"function"==typeof r.toJSON?r.toJSON():"number"==typeof r?y$5(r):r}function y$5(r){return r===-1/0?-Number.MAX_VALUE:r===1/0?Number.MAX_VALUE:isNaN(r)?null:r}function a$7(r,e,n,i){let o;null===r?o=null:r&&"function"==typeof r.map?(o=r.map((r=>p$9(r,i))),"function"==typeof o.toArray&&(o=o.toArray())):o=[p$9(r,i)],o$h(n,o,e);}function c$7(r,e,t){return 0!==t&&Array.isArray(r)?r.map((r=>c$7(r,e,t-1))):p$9(r,e)}function l$6(r){return (e,n,i,o)=>{let u;if(null===e)u=null;else {u=c$7(e,o,r);let t=r,n=u;for(;t>0&&Array.isArray(n);)t--,n=n[0];if(void 0!==n)for(let r=0;r<t;r++)u=[u];}o$h(i,u,n);}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function t$7(r,n){return a$6(r,"read",n)}function s$a(r,n){return a$6(r,"write",n)}function a$6(r,n,i){let e=r&&r.json;if(r&&r.json&&r.json.origins&&i){const o=i.origin&&r.json.origins[i.origin];o&&("any"===n||n in o)&&(e=o);}return e}function p$8(r){const n=y$4(r);if(r.json.origins)for(const e in r.json.origins){const t=r.json.origins[e],s=t.types?f$5(t):n;p$a(s,t,!1),t.types&&!t.write&&r.json.write&&r.json.write.enabled&&(t.write={...r.json.write}),i$8(s,t);}p$a(n,r.json,!0),i$8(n,r.json);}function y$4(r){return r.json.types?u$5(r.json):r.type?j$1(r):u$5(r)}function f$5(r){return r.type?j$1(r):u$5(r)}function j$1(n){if(!n.type)return;let i=0,e=n.type;for(;Array.isArray(e)&&!k$1(e);)e=e[0],i++;return {type:e,ndimArray:i}}function u$5(r){if(!r.types)return;let n=0,i=r.types;for(;Array.isArray(i);)i=i[0],n++;return {types:i,ndimArray:n}}function c$6(r){e$c(r)&&(n$d(r),p$8(r));}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const s$9=new Set,i$7=new Set;function n$b(e){return r=>{r.prototype.declaredClass=e,c$5(r);const o=[],n=[];let a=r.prototype;for(;a;)a.hasOwnProperty("initialize")&&!s$9.has(a.initialize)&&(s$9.add(a.initialize),o.push(a.initialize)),a.hasOwnProperty("destroy")&&!i$7.has(a.destroy)&&(i$7.add(a.destroy),n.push(a.destroy)),a=Object.getPrototypeOf(a);s$9.clear(),i$7.clear();class l extends r{constructor(...e){if(super(...e),this.constructor===l&&"function"==typeof this.postscript){if(o.length&&Object.defineProperty(this,"initialize",{enumerable:!1,configurable:!0,value(){for(let e=o.length-1;e>=0;e--)o[e].call(this);}}),n.length){let e=!1;Object.defineProperty(this,"destroy",{enumerable:!1,configurable:!0,value(){if(!e){e=!0;for(let e=0;e<n.length;e++)n[e].call(this);}}});}this.postscript(...e);}}}return l.__accessorMetadata__=n$i(r.prototype),l.prototype.declaredClass=e,l}}function a$5(e,t){return null==t.get?function(){const t=this.__accessor__.properties.get(e);if(void 0===t)return;s$h(t);const o=this.__accessor__.store;return o.has(e)?o.get(e):t.metadata.value}:function(){const t=this.__accessor__.properties.get(e);if(void 0!==t)return t.getComputed()}}function c$5(r){const s=r.prototype,i=n$i(s).properties,n={};for(const t of Object.getOwnPropertyNames(i)){const r=i[t];c$6(r),n[t]={enumerable:!0,configurable:!0,get:a$5(t,r),set(o){const s=this.__accessor__;if(void 0!==s){if(!Object.isFrozen(this)){if(s.initialized&&r.readOnly)throw new TypeError(`[accessor] cannot assign to read-only property '${t}' of ${this.declaredClass}`);if(s.lifecycle===I$1.CONSTRUCTED&&r.constructOnly)throw new TypeError(`[accessor] cannot assign to construct-only property '${t}' of ${this.declaredClass}`);s.set(t,o);}}else Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:o});}};}Object.defineProperties(r.prototype,n);}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
var l$5,p$7;function d$6(t){if(null==t)return {value:t};if(Array.isArray(t))return {type:[t[0]],value:null};switch(typeof t){case"object":return t.constructor?.__accessorMetadata__||t instanceof Date?{type:t.constructor,value:t}:t;case"boolean":return {type:Boolean,value:t};case"string":return {type:String,value:t};case"number":return {type:Number,value:t};case"function":return {type:t,value:null};default:return}}const y$3=Symbol("Accessor-Handles"),f$4=Symbol("Accessor-Initialized");class m$3{constructor(...t){if(this[l$5]=null,this[p$7]=!1,this.constructor===m$3)throw new Error("[accessor] cannot instantiate Accessor. This can be fixed by creating a subclass of Accessor");Object.defineProperty(this,"__accessor__",{enumerable:!1,value:new v$6(this)}),t.length>0&&this.normalizeCtorArgs&&(this.__accessor__.ctorArgs=this.normalizeCtorArgs.apply(this,t));}static createSubclass(t={}){if(Array.isArray(t))throw new Error("Multi-inheritance unsupported since 4.16");const{properties:r,declaredClass:e,constructor:s}=t;delete t.declaredClass,delete t.properties,delete t.constructor;const o=this;class c extends o{constructor(...t){super(...t),this.inherited=null,s&&s.apply(this,t);}}n$i(c.prototype);for(const i in t){const r=t[i];c.prototype[i]="function"==typeof r?function(...t){const e=this.inherited;let s;this.inherited=function(...t){if(o.prototype[i])return o.prototype[i].apply(this,t)};try{s=r.apply(this,t);}catch(c){throw this.inherited=e,c}return this.inherited=e,s}:t[i];}for(const i in r){const t=d$6(r[i]);y$7(t)(c.prototype,i);}return n$b(e)(c)}postscript(t){const r=this.__accessor__,e=r.ctorArgs||t;r.initialize(),e&&(this.set(e),r.ctorArgs=null),r.constructed(),this.initialize(),this[f$4]=!0;}initialize(){}destroy(){this.destroyed||(this[y$3]=s$n(this[y$3]),g$3(this),this.__accessor__.destroy());}get constructed(){return this.__accessor__&&this.__accessor__.initialized||!1}get initialized(){return this[f$4]}get destroyed(){return this.__accessor__&&this.__accessor__.destroyed||!1}commitProperty(t){this.get(t);}get(t){return o$f(this,t)}hasOwnProperty(t){return this.__accessor__?this.__accessor__.has(t):Object.prototype.hasOwnProperty.call(this,t)}keys(){return this.__accessor__?this.__accessor__.keys():[]}set(t,r){return t$f(this,t,r),this}watch(t,r,e){return T$1(this,t,r,e)}own(t){this.addHandles(t);}addHandles(r,s){let o=this[y$3];t$l(o)&&(o=this[y$3]=new t$j),o.add(r,s);}removeHandles(t){const r=this[y$3];t$l(r)||r.remove(t);}hasHandles(t){const r=this[y$3];return !!r$d(r)&&r.has(t)}_override(t,r){void 0===r?this.__accessor__.clearOverride(t):this.__accessor__.override(t,r);}_clearOverride(t){return this.__accessor__.clearOverride(t)}_overrideIfSome(t,r){null==r?this.__accessor__.clearOverride(t):this.__accessor__.override(t,r);}_isOverridden(t){return this.__accessor__.isOverridden(t)}notifyChange(t){this.__accessor__.notifyChange(t);}_get(t){return this.__accessor__.internalGet(t)}_set(t,r){return this.__accessor__.internalSet(t,r),this}}l$5=y$3,p$7=f$4;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
class i$6{constructor(){this._emitter=new i$6.EventEmitter(this);}emit(t,e){return this._emitter.emit(t,e)}on(t,e){return this._emitter.on(t,e)}once(t,e){return this._emitter.once(t,e)}hasEventListener(t){return this._emitter.hasEventListener(t)}}!function(n){class o{constructor(t=null){this._target=t,this._listenersMap=null;}clear(){this._listenersMap&&this._listenersMap.clear(),this._listenersMap=null;}emit(t,e){const s=this._listenersMap&&this._listenersMap.get(t);if(!s)return !1;const r=this._target||this;return [...s].forEach((t=>{t.call(r,e);})),s.length>0}on(t,e){if(Array.isArray(t)){const r=t.map((t=>this.on(t,e)));return r$c(r)}if(t.includes(","))throw new TypeError("Evented.on() with a comma delimited string of event types is not supported");this._listenersMap||(this._listenersMap=new Map);const r=this._listenersMap.get(t)||[];return r.push(e),this._listenersMap.set(t,r),{remove:()=>{const s=this._listenersMap&&this._listenersMap.get(t)||[],r=s.indexOf(e);r>=0&&s.splice(r,1);}}}once(t,e){const s=this.on(t,(t=>{s.remove(),e.call(null,t);}));return s}hasEventListener(t){const e=this._listenersMap&&this._listenersMap.get(t);return null!=e&&e.length>0}}n.EventEmitter=o,n.EventedMixin=e=>{let s=class extends e{constructor(){super(...arguments),this._emitter=new o;}destroy(){this._emitter.clear();}emit(t,e){return this._emitter.emit(t,e)}on(t,e){return this._emitter.on(t,e)}once(t,e){return this._emitter.once(t,e)}hasEventListener(t){return this._emitter.hasEventListener(t)}};return s=e$m([n$b("esri.core.Evented")],s),s};let h=class extends m$3{constructor(){super(...arguments),this._emitter=new i$6.EventEmitter(this);}destroy(){this._emitter.clear();}emit(t,e){return this._emitter.emit(t,e)}on(t,e){return this._emitter.on(t,e)}once(t,e){return this._emitter.once(t,e)}hasEventListener(t){return this._emitter.hasEventListener(t)}};h=e$m([n$b("esri.core.Evented")],h),n.EventedAccessor=h;}(i$6||(i$6={}));const n$a=i$6;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function l$4(n,t,r={}){return m$2(n,t,r,y$2)}function f$3(n,t,r={}){return m$2(n,t,r,d$5)}function m$2(n,t,r={},e){let i=null;const u=r.once?(n,r)=>{e(n)&&(h$8(i),t(n,r));}:(n,r)=>{e(n)&&t(n,r);};if(i=P(n,u,r.sync,r.equals),r.initial){const t=n();u(t,t);}return i}function y$2(n){return !0}function d$5(n){return !!n}const h$2={initial:!0};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function e$b(e){return "string"==typeof e?document.getElementById(e):e??null}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
var h$1;!function(s){s[s.PENDING=0]="PENDING",s[s.RESOLVED=1]="RESOLVED",s[s.REJECTED=2]="REJECTED";}(h$1||(h$1={}));class n$9{constructor(s){this.instance=s,this._resolver=A$4(),this._status=h$1.PENDING,this._resolvingPromises=[],this._resolver.promise.then((()=>{this._status=h$1.RESOLVED,this._cleanUp();}),(()=>{this._status=h$1.REJECTED,this._cleanUp();}));}addResolvingPromise(s){this._resolvingPromises.push(s),this._tryResolve();}isResolved(){return this._status===h$1.RESOLVED}isRejected(){return this._status===h$1.REJECTED}isFulfilled(){return this._status!==h$1.PENDING}abort(){this._resolver.reject(a$c());}when(s,e){return this._resolver.promise.then(s,e)}_cleanUp(){this._allPromise=this._resolvingPromises=this._allPromise=null;}_tryResolve(){if(this.isFulfilled())return;const s=A$4(),e=[...this._resolvingPromises,x$2(s.promise)],t=this._allPromise=Promise.all(e);t.then((()=>{this.isFulfilled()||this._allPromise!==t||this._resolver.resolve(this.instance);}),(s=>{this.isFulfilled()||this._allPromise!==t||j$8(s)||this._resolver.reject(s);})),s.resolve();}}const m$1=e=>{let i=class extends e{constructor(...s){super(...s),this._promiseProps=new n$9(this),this.addResolvingPromise(Promise.resolve());}isResolved(){return this._promiseProps.isResolved()}isRejected(){return this._promiseProps.isRejected()}isFulfilled(){return this._promiseProps.isFulfilled()}when(s,e){return new Promise(((s,e)=>{this._promiseProps.when(s,e);})).then(s,e)}catch(s){return this.when(null,s)}addResolvingPromise(s){s&&!this._promiseProps.isFulfilled()&&this._promiseProps.addResolvingPromise("_promiseProps"in s?s.when():s);}};return i=e$m([n$b("esri.core.Promise")],i),i};let _$4=class extends(m$1(m$3)){};_$4=e$m([n$b("esri.core.Promise")],_$4);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const t$6="randomUUID"in crypto;function n$8(){if(t$6)return crypto.randomUUID();const n=crypto.getRandomValues(new Uint16Array(8));n[3]=4095&n[3]|16384,n[4]=16383&n[4]|32768;const r=t=>n[t].toString(16).padStart(4,"0");return r(0)+r(1)+"-"+r(2)+"-"+r(3)+"-"+r(4)+"-"+r(5)+r(6)+r(7)}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const r$5=Object.prototype.toString;function o$5(n){const r="__accessorMetadata__"in n?b$3(n):n;return function(...t){if(t.push(r),"number"==typeof t[2])throw new Error("Using @cast has parameter decorator is not supported since 4.16");return e$a.apply(this,t)}}function e$a(t,r,o,e){s$i(t,r).cast=e;}function i$5(t){return (r,o)=>{s$i(r,t).cast=r[o];}}function s$8(...t){if(3!==t.length||"string"!=typeof t[1])return 1===t.length&&"[object Function]"===r$5.call(t[0])?o$5(t[0]):1===t.length&&"string"==typeof t[0]?i$5(t[0]):void 0}

/*!
 * @esri/arcgis-html-sanitizer - v3.0.1 - Tue Nov 15 2022 09:46:54 GMT-0800 (Pacific Standard Time)
 * Copyright (c) 2022 - Environmental Systems Research Institute, Inc.
 * Apache-2.0
 * 
 * js-xss
 * Copyright (c) 2012-2018 Zongmin Lei(雷宗民) <leizongmin@gmail.com>
 * http://ucdok.com
 * MIT License, see https://github.com/leizongmin/js-xss/blob/master/LICENSE for details
 */
/**
 * Determine if the value is a plain object.
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 */
var isPlainObject = function (value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    if (Object.prototype.toString.call(value) !== "[object Object]") {
        return false;
    }
    var proto = Object.getPrototypeOf(value);
    if (proto === null) {
        return true;
    }
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
};

var lib$1 = {exports: {}};

var _default$1 = {};

var lib = {exports: {}};

var _default = {};

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

function getDefaultWhiteList$1 () {
  // 白名单值说明：
  // true: 允许该属性
  // Function: function (val) { } 返回true表示允许该属性，其他值均表示不允许
  // RegExp: regexp.test(val) 返回true表示允许该属性，其他值均表示不允许
  // 除上面列出的值外均表示不允许
  var whiteList = {};

  whiteList['align-content'] = false; // default: auto
  whiteList['align-items'] = false; // default: auto
  whiteList['align-self'] = false; // default: auto
  whiteList['alignment-adjust'] = false; // default: auto
  whiteList['alignment-baseline'] = false; // default: baseline
  whiteList['all'] = false; // default: depending on individual properties
  whiteList['anchor-point'] = false; // default: none
  whiteList['animation'] = false; // default: depending on individual properties
  whiteList['animation-delay'] = false; // default: 0
  whiteList['animation-direction'] = false; // default: normal
  whiteList['animation-duration'] = false; // default: 0
  whiteList['animation-fill-mode'] = false; // default: none
  whiteList['animation-iteration-count'] = false; // default: 1
  whiteList['animation-name'] = false; // default: none
  whiteList['animation-play-state'] = false; // default: running
  whiteList['animation-timing-function'] = false; // default: ease
  whiteList['azimuth'] = false; // default: center
  whiteList['backface-visibility'] = false; // default: visible
  whiteList['background'] = true; // default: depending on individual properties
  whiteList['background-attachment'] = true; // default: scroll
  whiteList['background-clip'] = true; // default: border-box
  whiteList['background-color'] = true; // default: transparent
  whiteList['background-image'] = true; // default: none
  whiteList['background-origin'] = true; // default: padding-box
  whiteList['background-position'] = true; // default: 0% 0%
  whiteList['background-repeat'] = true; // default: repeat
  whiteList['background-size'] = true; // default: auto
  whiteList['baseline-shift'] = false; // default: baseline
  whiteList['binding'] = false; // default: none
  whiteList['bleed'] = false; // default: 6pt
  whiteList['bookmark-label'] = false; // default: content()
  whiteList['bookmark-level'] = false; // default: none
  whiteList['bookmark-state'] = false; // default: open
  whiteList['border'] = true; // default: depending on individual properties
  whiteList['border-bottom'] = true; // default: depending on individual properties
  whiteList['border-bottom-color'] = true; // default: current color
  whiteList['border-bottom-left-radius'] = true; // default: 0
  whiteList['border-bottom-right-radius'] = true; // default: 0
  whiteList['border-bottom-style'] = true; // default: none
  whiteList['border-bottom-width'] = true; // default: medium
  whiteList['border-collapse'] = true; // default: separate
  whiteList['border-color'] = true; // default: depending on individual properties
  whiteList['border-image'] = true; // default: none
  whiteList['border-image-outset'] = true; // default: 0
  whiteList['border-image-repeat'] = true; // default: stretch
  whiteList['border-image-slice'] = true; // default: 100%
  whiteList['border-image-source'] = true; // default: none
  whiteList['border-image-width'] = true; // default: 1
  whiteList['border-left'] = true; // default: depending on individual properties
  whiteList['border-left-color'] = true; // default: current color
  whiteList['border-left-style'] = true; // default: none
  whiteList['border-left-width'] = true; // default: medium
  whiteList['border-radius'] = true; // default: 0
  whiteList['border-right'] = true; // default: depending on individual properties
  whiteList['border-right-color'] = true; // default: current color
  whiteList['border-right-style'] = true; // default: none
  whiteList['border-right-width'] = true; // default: medium
  whiteList['border-spacing'] = true; // default: 0
  whiteList['border-style'] = true; // default: depending on individual properties
  whiteList['border-top'] = true; // default: depending on individual properties
  whiteList['border-top-color'] = true; // default: current color
  whiteList['border-top-left-radius'] = true; // default: 0
  whiteList['border-top-right-radius'] = true; // default: 0
  whiteList['border-top-style'] = true; // default: none
  whiteList['border-top-width'] = true; // default: medium
  whiteList['border-width'] = true; // default: depending on individual properties
  whiteList['bottom'] = false; // default: auto
  whiteList['box-decoration-break'] = true; // default: slice
  whiteList['box-shadow'] = true; // default: none
  whiteList['box-sizing'] = true; // default: content-box
  whiteList['box-snap'] = true; // default: none
  whiteList['box-suppress'] = true; // default: show
  whiteList['break-after'] = true; // default: auto
  whiteList['break-before'] = true; // default: auto
  whiteList['break-inside'] = true; // default: auto
  whiteList['caption-side'] = false; // default: top
  whiteList['chains'] = false; // default: none
  whiteList['clear'] = true; // default: none
  whiteList['clip'] = false; // default: auto
  whiteList['clip-path'] = false; // default: none
  whiteList['clip-rule'] = false; // default: nonzero
  whiteList['color'] = true; // default: implementation dependent
  whiteList['color-interpolation-filters'] = true; // default: auto
  whiteList['column-count'] = false; // default: auto
  whiteList['column-fill'] = false; // default: balance
  whiteList['column-gap'] = false; // default: normal
  whiteList['column-rule'] = false; // default: depending on individual properties
  whiteList['column-rule-color'] = false; // default: current color
  whiteList['column-rule-style'] = false; // default: medium
  whiteList['column-rule-width'] = false; // default: medium
  whiteList['column-span'] = false; // default: none
  whiteList['column-width'] = false; // default: auto
  whiteList['columns'] = false; // default: depending on individual properties
  whiteList['contain'] = false; // default: none
  whiteList['content'] = false; // default: normal
  whiteList['counter-increment'] = false; // default: none
  whiteList['counter-reset'] = false; // default: none
  whiteList['counter-set'] = false; // default: none
  whiteList['crop'] = false; // default: auto
  whiteList['cue'] = false; // default: depending on individual properties
  whiteList['cue-after'] = false; // default: none
  whiteList['cue-before'] = false; // default: none
  whiteList['cursor'] = false; // default: auto
  whiteList['direction'] = false; // default: ltr
  whiteList['display'] = true; // default: depending on individual properties
  whiteList['display-inside'] = true; // default: auto
  whiteList['display-list'] = true; // default: none
  whiteList['display-outside'] = true; // default: inline-level
  whiteList['dominant-baseline'] = false; // default: auto
  whiteList['elevation'] = false; // default: level
  whiteList['empty-cells'] = false; // default: show
  whiteList['filter'] = false; // default: none
  whiteList['flex'] = false; // default: depending on individual properties
  whiteList['flex-basis'] = false; // default: auto
  whiteList['flex-direction'] = false; // default: row
  whiteList['flex-flow'] = false; // default: depending on individual properties
  whiteList['flex-grow'] = false; // default: 0
  whiteList['flex-shrink'] = false; // default: 1
  whiteList['flex-wrap'] = false; // default: nowrap
  whiteList['float'] = false; // default: none
  whiteList['float-offset'] = false; // default: 0 0
  whiteList['flood-color'] = false; // default: black
  whiteList['flood-opacity'] = false; // default: 1
  whiteList['flow-from'] = false; // default: none
  whiteList['flow-into'] = false; // default: none
  whiteList['font'] = true; // default: depending on individual properties
  whiteList['font-family'] = true; // default: implementation dependent
  whiteList['font-feature-settings'] = true; // default: normal
  whiteList['font-kerning'] = true; // default: auto
  whiteList['font-language-override'] = true; // default: normal
  whiteList['font-size'] = true; // default: medium
  whiteList['font-size-adjust'] = true; // default: none
  whiteList['font-stretch'] = true; // default: normal
  whiteList['font-style'] = true; // default: normal
  whiteList['font-synthesis'] = true; // default: weight style
  whiteList['font-variant'] = true; // default: normal
  whiteList['font-variant-alternates'] = true; // default: normal
  whiteList['font-variant-caps'] = true; // default: normal
  whiteList['font-variant-east-asian'] = true; // default: normal
  whiteList['font-variant-ligatures'] = true; // default: normal
  whiteList['font-variant-numeric'] = true; // default: normal
  whiteList['font-variant-position'] = true; // default: normal
  whiteList['font-weight'] = true; // default: normal
  whiteList['grid'] = false; // default: depending on individual properties
  whiteList['grid-area'] = false; // default: depending on individual properties
  whiteList['grid-auto-columns'] = false; // default: auto
  whiteList['grid-auto-flow'] = false; // default: none
  whiteList['grid-auto-rows'] = false; // default: auto
  whiteList['grid-column'] = false; // default: depending on individual properties
  whiteList['grid-column-end'] = false; // default: auto
  whiteList['grid-column-start'] = false; // default: auto
  whiteList['grid-row'] = false; // default: depending on individual properties
  whiteList['grid-row-end'] = false; // default: auto
  whiteList['grid-row-start'] = false; // default: auto
  whiteList['grid-template'] = false; // default: depending on individual properties
  whiteList['grid-template-areas'] = false; // default: none
  whiteList['grid-template-columns'] = false; // default: none
  whiteList['grid-template-rows'] = false; // default: none
  whiteList['hanging-punctuation'] = false; // default: none
  whiteList['height'] = true; // default: auto
  whiteList['hyphens'] = false; // default: manual
  whiteList['icon'] = false; // default: auto
  whiteList['image-orientation'] = false; // default: auto
  whiteList['image-resolution'] = false; // default: normal
  whiteList['ime-mode'] = false; // default: auto
  whiteList['initial-letters'] = false; // default: normal
  whiteList['inline-box-align'] = false; // default: last
  whiteList['justify-content'] = false; // default: auto
  whiteList['justify-items'] = false; // default: auto
  whiteList['justify-self'] = false; // default: auto
  whiteList['left'] = false; // default: auto
  whiteList['letter-spacing'] = true; // default: normal
  whiteList['lighting-color'] = true; // default: white
  whiteList['line-box-contain'] = false; // default: block inline replaced
  whiteList['line-break'] = false; // default: auto
  whiteList['line-grid'] = false; // default: match-parent
  whiteList['line-height'] = false; // default: normal
  whiteList['line-snap'] = false; // default: none
  whiteList['line-stacking'] = false; // default: depending on individual properties
  whiteList['line-stacking-ruby'] = false; // default: exclude-ruby
  whiteList['line-stacking-shift'] = false; // default: consider-shifts
  whiteList['line-stacking-strategy'] = false; // default: inline-line-height
  whiteList['list-style'] = true; // default: depending on individual properties
  whiteList['list-style-image'] = true; // default: none
  whiteList['list-style-position'] = true; // default: outside
  whiteList['list-style-type'] = true; // default: disc
  whiteList['margin'] = true; // default: depending on individual properties
  whiteList['margin-bottom'] = true; // default: 0
  whiteList['margin-left'] = true; // default: 0
  whiteList['margin-right'] = true; // default: 0
  whiteList['margin-top'] = true; // default: 0
  whiteList['marker-offset'] = false; // default: auto
  whiteList['marker-side'] = false; // default: list-item
  whiteList['marks'] = false; // default: none
  whiteList['mask'] = false; // default: border-box
  whiteList['mask-box'] = false; // default: see individual properties
  whiteList['mask-box-outset'] = false; // default: 0
  whiteList['mask-box-repeat'] = false; // default: stretch
  whiteList['mask-box-slice'] = false; // default: 0 fill
  whiteList['mask-box-source'] = false; // default: none
  whiteList['mask-box-width'] = false; // default: auto
  whiteList['mask-clip'] = false; // default: border-box
  whiteList['mask-image'] = false; // default: none
  whiteList['mask-origin'] = false; // default: border-box
  whiteList['mask-position'] = false; // default: center
  whiteList['mask-repeat'] = false; // default: no-repeat
  whiteList['mask-size'] = false; // default: border-box
  whiteList['mask-source-type'] = false; // default: auto
  whiteList['mask-type'] = false; // default: luminance
  whiteList['max-height'] = true; // default: none
  whiteList['max-lines'] = false; // default: none
  whiteList['max-width'] = true; // default: none
  whiteList['min-height'] = true; // default: 0
  whiteList['min-width'] = true; // default: 0
  whiteList['move-to'] = false; // default: normal
  whiteList['nav-down'] = false; // default: auto
  whiteList['nav-index'] = false; // default: auto
  whiteList['nav-left'] = false; // default: auto
  whiteList['nav-right'] = false; // default: auto
  whiteList['nav-up'] = false; // default: auto
  whiteList['object-fit'] = false; // default: fill
  whiteList['object-position'] = false; // default: 50% 50%
  whiteList['opacity'] = false; // default: 1
  whiteList['order'] = false; // default: 0
  whiteList['orphans'] = false; // default: 2
  whiteList['outline'] = false; // default: depending on individual properties
  whiteList['outline-color'] = false; // default: invert
  whiteList['outline-offset'] = false; // default: 0
  whiteList['outline-style'] = false; // default: none
  whiteList['outline-width'] = false; // default: medium
  whiteList['overflow'] = false; // default: depending on individual properties
  whiteList['overflow-wrap'] = false; // default: normal
  whiteList['overflow-x'] = false; // default: visible
  whiteList['overflow-y'] = false; // default: visible
  whiteList['padding'] = true; // default: depending on individual properties
  whiteList['padding-bottom'] = true; // default: 0
  whiteList['padding-left'] = true; // default: 0
  whiteList['padding-right'] = true; // default: 0
  whiteList['padding-top'] = true; // default: 0
  whiteList['page'] = false; // default: auto
  whiteList['page-break-after'] = false; // default: auto
  whiteList['page-break-before'] = false; // default: auto
  whiteList['page-break-inside'] = false; // default: auto
  whiteList['page-policy'] = false; // default: start
  whiteList['pause'] = false; // default: implementation dependent
  whiteList['pause-after'] = false; // default: implementation dependent
  whiteList['pause-before'] = false; // default: implementation dependent
  whiteList['perspective'] = false; // default: none
  whiteList['perspective-origin'] = false; // default: 50% 50%
  whiteList['pitch'] = false; // default: medium
  whiteList['pitch-range'] = false; // default: 50
  whiteList['play-during'] = false; // default: auto
  whiteList['position'] = false; // default: static
  whiteList['presentation-level'] = false; // default: 0
  whiteList['quotes'] = false; // default: text
  whiteList['region-fragment'] = false; // default: auto
  whiteList['resize'] = false; // default: none
  whiteList['rest'] = false; // default: depending on individual properties
  whiteList['rest-after'] = false; // default: none
  whiteList['rest-before'] = false; // default: none
  whiteList['richness'] = false; // default: 50
  whiteList['right'] = false; // default: auto
  whiteList['rotation'] = false; // default: 0
  whiteList['rotation-point'] = false; // default: 50% 50%
  whiteList['ruby-align'] = false; // default: auto
  whiteList['ruby-merge'] = false; // default: separate
  whiteList['ruby-position'] = false; // default: before
  whiteList['shape-image-threshold'] = false; // default: 0.0
  whiteList['shape-outside'] = false; // default: none
  whiteList['shape-margin'] = false; // default: 0
  whiteList['size'] = false; // default: auto
  whiteList['speak'] = false; // default: auto
  whiteList['speak-as'] = false; // default: normal
  whiteList['speak-header'] = false; // default: once
  whiteList['speak-numeral'] = false; // default: continuous
  whiteList['speak-punctuation'] = false; // default: none
  whiteList['speech-rate'] = false; // default: medium
  whiteList['stress'] = false; // default: 50
  whiteList['string-set'] = false; // default: none
  whiteList['tab-size'] = false; // default: 8
  whiteList['table-layout'] = false; // default: auto
  whiteList['text-align'] = true; // default: start
  whiteList['text-align-last'] = true; // default: auto
  whiteList['text-combine-upright'] = true; // default: none
  whiteList['text-decoration'] = true; // default: none
  whiteList['text-decoration-color'] = true; // default: currentColor
  whiteList['text-decoration-line'] = true; // default: none
  whiteList['text-decoration-skip'] = true; // default: objects
  whiteList['text-decoration-style'] = true; // default: solid
  whiteList['text-emphasis'] = true; // default: depending on individual properties
  whiteList['text-emphasis-color'] = true; // default: currentColor
  whiteList['text-emphasis-position'] = true; // default: over right
  whiteList['text-emphasis-style'] = true; // default: none
  whiteList['text-height'] = true; // default: auto
  whiteList['text-indent'] = true; // default: 0
  whiteList['text-justify'] = true; // default: auto
  whiteList['text-orientation'] = true; // default: mixed
  whiteList['text-overflow'] = true; // default: clip
  whiteList['text-shadow'] = true; // default: none
  whiteList['text-space-collapse'] = true; // default: collapse
  whiteList['text-transform'] = true; // default: none
  whiteList['text-underline-position'] = true; // default: auto
  whiteList['text-wrap'] = true; // default: normal
  whiteList['top'] = false; // default: auto
  whiteList['transform'] = false; // default: none
  whiteList['transform-origin'] = false; // default: 50% 50% 0
  whiteList['transform-style'] = false; // default: flat
  whiteList['transition'] = false; // default: depending on individual properties
  whiteList['transition-delay'] = false; // default: 0s
  whiteList['transition-duration'] = false; // default: 0s
  whiteList['transition-property'] = false; // default: all
  whiteList['transition-timing-function'] = false; // default: ease
  whiteList['unicode-bidi'] = false; // default: normal
  whiteList['vertical-align'] = false; // default: baseline
  whiteList['visibility'] = false; // default: visible
  whiteList['voice-balance'] = false; // default: center
  whiteList['voice-duration'] = false; // default: auto
  whiteList['voice-family'] = false; // default: implementation dependent
  whiteList['voice-pitch'] = false; // default: medium
  whiteList['voice-range'] = false; // default: medium
  whiteList['voice-rate'] = false; // default: normal
  whiteList['voice-stress'] = false; // default: normal
  whiteList['voice-volume'] = false; // default: medium
  whiteList['volume'] = false; // default: medium
  whiteList['white-space'] = false; // default: normal
  whiteList['widows'] = false; // default: 2
  whiteList['width'] = true; // default: auto
  whiteList['will-change'] = false; // default: auto
  whiteList['word-break'] = true; // default: normal
  whiteList['word-spacing'] = true; // default: normal
  whiteList['word-wrap'] = true; // default: normal
  whiteList['wrap-flow'] = false; // default: auto
  whiteList['wrap-through'] = false; // default: wrap
  whiteList['writing-mode'] = false; // default: horizontal-tb
  whiteList['z-index'] = false; // default: auto

  return whiteList;
}


/**
 * 匹配到白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onAttr (name, value, options) {
  // do nothing
}

/**
 * 匹配到不在白名单上的一个属性时
 *
 * @param {String} name
 * @param {String} value
 * @param {Object} options
 * @return {String}
 */
function onIgnoreAttr (name, value, options) {
  // do nothing
}

var REGEXP_URL_JAVASCRIPT = /javascript\s*\:/img;

/**
 * 过滤属性值
 *
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function safeAttrValue$1(name, value) {
  if (REGEXP_URL_JAVASCRIPT.test(value)) return '';
  return value;
}


_default.whiteList = getDefaultWhiteList$1();
_default.getDefaultWhiteList = getDefaultWhiteList$1;
_default.onAttr = onAttr;
_default.onIgnoreAttr = onIgnoreAttr;
_default.safeAttrValue = safeAttrValue$1;

var util$1 = {
  indexOf: function (arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function (arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function (str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, '');
  },
  trimRight: function (str) {
    if (String.prototype.trimRight) {
      return str.trimRight();
    }
    return str.replace(/(\s*$)/g, '');
  }
};

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var _$3 = util$1;


/**
 * 解析style
 *
 * @param {String} css
 * @param {Function} onAttr 处理属性的函数
 *   参数格式： function (sourcePosition, position, name, value, source)
 * @return {String}
 */
function parseStyle$1 (css, onAttr) {
  css = _$3.trimRight(css);
  if (css[css.length - 1] !== ';') css += ';';
  var cssLength = css.length;
  var isParenthesisOpen = false;
  var lastPos = 0;
  var i = 0;
  var retCSS = '';

  function addNewAttr () {
    // 如果没有正常的闭合圆括号，则直接忽略当前属性
    if (!isParenthesisOpen) {
      var source = _$3.trim(css.slice(lastPos, i));
      var j = source.indexOf(':');
      if (j !== -1) {
        var name = _$3.trim(source.slice(0, j));
        var value = _$3.trim(source.slice(j + 1));
        // 必须有属性名称
        if (name) {
          var ret = onAttr(lastPos, retCSS.length, name, value, source);
          if (ret) retCSS += ret + '; ';
        }
      }
    }
    lastPos = i + 1;
  }

  for (; i < cssLength; i++) {
    var c = css[i];
    if (c === '/' && css[i + 1] === '*') {
      // 备注开始
      var j = css.indexOf('*/', i + 2);
      // 如果没有正常的备注结束，则后面的部分全部跳过
      if (j === -1) break;
      // 直接将当前位置调到备注结尾，并且初始化状态
      i = j + 1;
      lastPos = i + 1;
      isParenthesisOpen = false;
    } else if (c === '(') {
      isParenthesisOpen = true;
    } else if (c === ')') {
      isParenthesisOpen = false;
    } else if (c === ';') {
      if (isParenthesisOpen) ; else {
        addNewAttr();
      }
    } else if (c === '\n') {
      addNewAttr();
    }
  }

  return _$3.trim(retCSS);
}

var parser$2 = parseStyle$1;

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var DEFAULT$1 = _default;
var parseStyle = parser$2;


/**
 * 返回值是否为空
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull$1 (obj) {
  return (obj === undefined || obj === null);
}

/**
 * 浅拷贝对象
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject$1 (obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

/**
 * 创建CSS过滤器
 *
 * @param {Object} options
 *   - {Object} whiteList
 *   - {Function} onAttr
 *   - {Function} onIgnoreAttr
 *   - {Function} safeAttrValue
 */
function FilterCSS$2 (options) {
  options = shallowCopyObject$1(options || {});
  options.whiteList = options.whiteList || DEFAULT$1.whiteList;
  options.onAttr = options.onAttr || DEFAULT$1.onAttr;
  options.onIgnoreAttr = options.onIgnoreAttr || DEFAULT$1.onIgnoreAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT$1.safeAttrValue;
  this.options = options;
}

FilterCSS$2.prototype.process = function (css) {
  // 兼容各种奇葩输入
  css = css || '';
  css = css.toString();
  if (!css) return '';

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onAttr = options.onAttr;
  var onIgnoreAttr = options.onIgnoreAttr;
  var safeAttrValue = options.safeAttrValue;

  var retCSS = parseStyle(css, function (sourcePosition, position, name, value, source) {

    var check = whiteList[name];
    var isWhite = false;
    if (check === true) isWhite = check;
    else if (typeof check === 'function') isWhite = check(value);
    else if (check instanceof RegExp) isWhite = check.test(value);
    if (isWhite !== true) isWhite = false;

    // 如果过滤后 value 为空则直接忽略
    value = safeAttrValue(name, value);
    if (!value) return;

    var opts = {
      position: position,
      sourcePosition: sourcePosition,
      source: source,
      isWhite: isWhite
    };

    if (isWhite) {

      var ret = onAttr(name, value, opts);
      if (isNull$1(ret)) {
        return name + ':' + value;
      } else {
        return ret;
      }

    } else {

      var ret = onIgnoreAttr(name, value, opts);
      if (!isNull$1(ret)) {
        return ret;
      }

    }
  });

  return retCSS;
};


var css = FilterCSS$2;

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

(function (module, exports) {
	var DEFAULT = _default;
	var FilterCSS = css;


	/**
	 * XSS过滤
	 *
	 * @param {String} css 要过滤的CSS代码
	 * @param {Object} options 选项：whiteList, onAttr, onIgnoreAttr
	 * @return {String}
	 */
	function filterCSS (html, options) {
	  var xss = new FilterCSS(options);
	  return xss.process(html);
	}


	// 输出
	exports = module.exports = filterCSS;
	exports.FilterCSS = FilterCSS;
	for (var i in DEFAULT) exports[i] = DEFAULT[i];
} (lib, lib.exports));

var util = {
  indexOf: function (arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function (arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function (str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  spaceIndex: function (str) {
    var reg = /\s|\n|\t/;
    var match = reg.exec(str);
    return match ? match.index : -1;
  },
};

/**
 * default settings
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var FilterCSS$1 = lib.exports.FilterCSS;
var getDefaultCSSWhiteList = lib.exports.getDefaultWhiteList;
var _$2 = util;

function getDefaultWhiteList() {
  return {
    a: ["target", "href", "title"],
    abbr: ["title"],
    address: [],
    area: ["shape", "coords", "href", "alt"],
    article: [],
    aside: [],
    audio: [
      "autoplay",
      "controls",
      "crossorigin",
      "loop",
      "muted",
      "preload",
      "src",
    ],
    b: [],
    bdi: ["dir"],
    bdo: ["dir"],
    big: [],
    blockquote: ["cite"],
    br: [],
    caption: [],
    center: [],
    cite: [],
    code: [],
    col: ["align", "valign", "span", "width"],
    colgroup: ["align", "valign", "span", "width"],
    dd: [],
    del: ["datetime"],
    details: ["open"],
    div: [],
    dl: [],
    dt: [],
    em: [],
    figcaption: [],
    figure: [],
    font: ["color", "size", "face"],
    footer: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    header: [],
    hr: [],
    i: [],
    img: ["src", "alt", "title", "width", "height"],
    ins: ["datetime"],
    li: [],
    mark: [],
    nav: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    section: [],
    small: [],
    span: [],
    sub: [],
    summary: [],
    sup: [],
    strong: [],
    strike: [],
    table: ["width", "border", "align", "valign"],
    tbody: ["align", "valign"],
    td: ["width", "rowspan", "colspan", "align", "valign"],
    tfoot: ["align", "valign"],
    th: ["width", "rowspan", "colspan", "align", "valign"],
    thead: ["align", "valign"],
    tr: ["rowspan", "align", "valign"],
    tt: [],
    u: [],
    ul: [],
    video: [
      "autoplay",
      "controls",
      "crossorigin",
      "loop",
      "muted",
      "playsinline",
      "poster",
      "preload",
      "src",
      "height",
      "width",
    ],
  };
}

var defaultCSSFilter = new FilterCSS$1();

/**
 * default onTag function
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onTag(tag, html, options) {
  // do nothing
}

/**
 * default onIgnoreTag function
 *
 * @param {String} tag
 * @param {String} html
 * @param {Object} options
 * @return {String}
 */
function onIgnoreTag(tag, html, options) {
  // do nothing
}

/**
 * default onTagAttr function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onTagAttr(tag, name, value) {
  // do nothing
}

/**
 * default onIgnoreTagAttr function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @return {String}
 */
function onIgnoreTagAttr(tag, name, value) {
  // do nothing
}

/**
 * default escapeHtml function
 *
 * @param {String} html
 */
function escapeHtml(html) {
  return html.replace(REGEXP_LT, "&lt;").replace(REGEXP_GT, "&gt;");
}

/**
 * default safeAttrValue function
 *
 * @param {String} tag
 * @param {String} name
 * @param {String} value
 * @param {Object} cssFilter
 * @return {String}
 */
function safeAttrValue(tag, name, value, cssFilter) {
  // unescape attribute value firstly
  value = friendlyAttrValue(value);

  if (name === "href" || name === "src") {
    // filter `href` and `src` attribute
    // only allow the value that starts with `http://` | `https://` | `mailto:` | `/` | `#`
    value = _$2.trim(value);
    if (value === "#") return "#";
    if (
      !(
        value.substr(0, 7) === "http://" ||
        value.substr(0, 8) === "https://" ||
        value.substr(0, 7) === "mailto:" ||
        value.substr(0, 4) === "tel:" ||
        value.substr(0, 11) === "data:image/" ||
        value.substr(0, 6) === "ftp://" ||
        value.substr(0, 2) === "./" ||
        value.substr(0, 3) === "../" ||
        value[0] === "#" ||
        value[0] === "/"
      )
    ) {
      return "";
    }
  } else if (name === "background") {
    // filter `background` attribute (maybe no use)
    // `javascript:`
    REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
      return "";
    }
  } else if (name === "style") {
    // `expression()`
    REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
      return "";
    }
    // `url()`
    REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
      REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
      if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
        return "";
      }
    }
    if (cssFilter !== false) {
      cssFilter = cssFilter || defaultCSSFilter;
      value = cssFilter.process(value);
    }
  }

  // escape `<>"` before returns
  value = escapeAttrValue(value);
  return value;
}

// RegExp list
var REGEXP_LT = /</g;
var REGEXP_GT = />/g;
var REGEXP_QUOTE = /"/g;
var REGEXP_QUOTE_2 = /&quot;/g;
var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/gim;
var REGEXP_ATTR_VALUE_COLON = /&colon;?/gim;
var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/gim;
// var REGEXP_DEFAULT_ON_TAG_ATTR_3 = /\/\*|\*\//gm;
var REGEXP_DEFAULT_ON_TAG_ATTR_4 =
  /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi;
// var REGEXP_DEFAULT_ON_TAG_ATTR_5 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/gi;
// var REGEXP_DEFAULT_ON_TAG_ATTR_6 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_7 =
  /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi;

/**
 * escape double quote
 *
 * @param {String} str
 * @return {String} str
 */
function escapeQuote(str) {
  return str.replace(REGEXP_QUOTE, "&quot;");
}

/**
 * unescape double quote
 *
 * @param {String} str
 * @return {String} str
 */
function unescapeQuote(str) {
  return str.replace(REGEXP_QUOTE_2, '"');
}

/**
 * escape html entities
 *
 * @param {String} str
 * @return {String}
 */
function escapeHtmlEntities(str) {
  return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode(str, code) {
    return code[0] === "x" || code[0] === "X"
      ? String.fromCharCode(parseInt(code.substr(1), 16))
      : String.fromCharCode(parseInt(code, 10));
  });
}

/**
 * escape html5 new danger entities
 *
 * @param {String} str
 * @return {String}
 */
function escapeDangerHtml5Entities(str) {
  return str
    .replace(REGEXP_ATTR_VALUE_COLON, ":")
    .replace(REGEXP_ATTR_VALUE_NEWLINE, " ");
}

/**
 * clear nonprintable characters
 *
 * @param {String} str
 * @return {String}
 */
function clearNonPrintableCharacter(str) {
  var str2 = "";
  for (var i = 0, len = str.length; i < len; i++) {
    str2 += str.charCodeAt(i) < 32 ? " " : str.charAt(i);
  }
  return _$2.trim(str2);
}

/**
 * get friendly attribute value
 *
 * @param {String} str
 * @return {String}
 */
function friendlyAttrValue(str) {
  str = unescapeQuote(str);
  str = escapeHtmlEntities(str);
  str = escapeDangerHtml5Entities(str);
  str = clearNonPrintableCharacter(str);
  return str;
}

/**
 * unescape attribute value
 *
 * @param {String} str
 * @return {String}
 */
function escapeAttrValue(str) {
  str = escapeQuote(str);
  str = escapeHtml(str);
  return str;
}

/**
 * `onIgnoreTag` function for removing all the tags that are not in whitelist
 */
function onIgnoreTagStripAll() {
  return "";
}

/**
 * remove tag body
 * specify a `tags` list, if the tag is not in the `tags` list then process by the specify function (optional)
 *
 * @param {array} tags
 * @param {function} next
 */
function StripTagBody(tags, next) {
  if (typeof next !== "function") {
    next = function () {};
  }

  var isRemoveAllTag = !Array.isArray(tags);
  function isRemoveTag(tag) {
    if (isRemoveAllTag) return true;
    return _$2.indexOf(tags, tag) !== -1;
  }

  var removeList = [];
  var posStart = false;

  return {
    onIgnoreTag: function (tag, html, options) {
      if (isRemoveTag(tag)) {
        if (options.isClosing) {
          var ret = "[/removed]";
          var end = options.position + ret.length;
          removeList.push([
            posStart !== false ? posStart : options.position,
            end,
          ]);
          posStart = false;
          return ret;
        } else {
          if (!posStart) {
            posStart = options.position;
          }
          return "[removed]";
        }
      } else {
        return next(tag, html, options);
      }
    },
    remove: function (html) {
      var rethtml = "";
      var lastPos = 0;
      _$2.forEach(removeList, function (pos) {
        rethtml += html.slice(lastPos, pos[0]);
        lastPos = pos[1];
      });
      rethtml += html.slice(lastPos);
      return rethtml;
    },
  };
}

/**
 * remove html comments
 *
 * @param {String} html
 * @return {String}
 */
function stripCommentTag(html) {
  var retHtml = "";
  var lastPos = 0;
  while (lastPos < html.length) {
    var i = html.indexOf("<!--", lastPos);
    if (i === -1) {
      retHtml += html.slice(lastPos);
      break;
    }
    retHtml += html.slice(lastPos, i);
    var j = html.indexOf("-->", i);
    if (j === -1) {
      break;
    }
    lastPos = j + 3;
  }
  return retHtml;
}

/**
 * remove invisible characters
 *
 * @param {String} html
 * @return {String}
 */
function stripBlankChar(html) {
  var chars = html.split("");
  chars = chars.filter(function (char) {
    var c = char.charCodeAt(0);
    if (c === 127) return false;
    if (c <= 31) {
      if (c === 10 || c === 13) return true;
      return false;
    }
    return true;
  });
  return chars.join("");
}

_default$1.whiteList = getDefaultWhiteList();
_default$1.getDefaultWhiteList = getDefaultWhiteList;
_default$1.onTag = onTag;
_default$1.onIgnoreTag = onIgnoreTag;
_default$1.onTagAttr = onTagAttr;
_default$1.onIgnoreTagAttr = onIgnoreTagAttr;
_default$1.safeAttrValue = safeAttrValue;
_default$1.escapeHtml = escapeHtml;
_default$1.escapeQuote = escapeQuote;
_default$1.unescapeQuote = unescapeQuote;
_default$1.escapeHtmlEntities = escapeHtmlEntities;
_default$1.escapeDangerHtml5Entities = escapeDangerHtml5Entities;
_default$1.clearNonPrintableCharacter = clearNonPrintableCharacter;
_default$1.friendlyAttrValue = friendlyAttrValue;
_default$1.escapeAttrValue = escapeAttrValue;
_default$1.onIgnoreTagStripAll = onIgnoreTagStripAll;
_default$1.StripTagBody = StripTagBody;
_default$1.stripCommentTag = stripCommentTag;
_default$1.stripBlankChar = stripBlankChar;
_default$1.cssFilter = defaultCSSFilter;
_default$1.getDefaultCSSWhiteList = getDefaultCSSWhiteList;

var parser$1 = {};

/**
 * Simple HTML Parser
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var _$1 = util;

/**
 * get tag name
 *
 * @param {String} html e.g. '<a hef="#">'
 * @return {String}
 */
function getTagName(html) {
  var i = _$1.spaceIndex(html);
  var tagName;
  if (i === -1) {
    tagName = html.slice(1, -1);
  } else {
    tagName = html.slice(1, i + 1);
  }
  tagName = _$1.trim(tagName).toLowerCase();
  if (tagName.slice(0, 1) === "/") tagName = tagName.slice(1);
  if (tagName.slice(-1) === "/") tagName = tagName.slice(0, -1);
  return tagName;
}

/**
 * is close tag?
 *
 * @param {String} html 如：'<a hef="#">'
 * @return {Boolean}
 */
function isClosing(html) {
  return html.slice(0, 2) === "</";
}

/**
 * parse input html and returns processed html
 *
 * @param {String} html
 * @param {Function} onTag e.g. function (sourcePosition, position, tag, html, isClosing)
 * @param {Function} escapeHtml
 * @return {String}
 */
function parseTag$1(html, onTag, escapeHtml) {

  var rethtml = "";
  var lastPos = 0;
  var tagStart = false;
  var quoteStart = false;
  var currentPos = 0;
  var len = html.length;
  var currentTagName = "";
  var currentHtml = "";

  chariterator: for (currentPos = 0; currentPos < len; currentPos++) {
    var c = html.charAt(currentPos);
    if (tagStart === false) {
      if (c === "<") {
        tagStart = currentPos;
        continue;
      }
    } else {
      if (quoteStart === false) {
        if (c === "<") {
          rethtml += escapeHtml(html.slice(lastPos, currentPos));
          tagStart = currentPos;
          lastPos = currentPos;
          continue;
        }
        if (c === ">") {
          rethtml += escapeHtml(html.slice(lastPos, tagStart));
          currentHtml = html.slice(tagStart, currentPos + 1);
          currentTagName = getTagName(currentHtml);
          rethtml += onTag(
            tagStart,
            rethtml.length,
            currentTagName,
            currentHtml,
            isClosing(currentHtml)
          );
          lastPos = currentPos + 1;
          tagStart = false;
          continue;
        }
        if (c === '"' || c === "'") {
          var i = 1;
          var ic = html.charAt(currentPos - i);

          while (ic.trim() === "" || ic === "=") {
            if (ic === "=") {
              quoteStart = c;
              continue chariterator;
            }
            ic = html.charAt(currentPos - ++i);
          }
        }
      } else {
        if (c === quoteStart) {
          quoteStart = false;
          continue;
        }
      }
    }
  }
  if (lastPos < html.length) {
    rethtml += escapeHtml(html.substr(lastPos));
  }

  return rethtml;
}

var REGEXP_ILLEGAL_ATTR_NAME = /[^a-zA-Z0-9\\_:.-]/gim;

/**
 * parse input attributes and returns processed attributes
 *
 * @param {String} html e.g. `href="#" target="_blank"`
 * @param {Function} onAttr e.g. `function (name, value)`
 * @return {String}
 */
function parseAttr$1(html, onAttr) {

  var lastPos = 0;
  var lastMarkPos = 0;
  var retAttrs = [];
  var tmpName = false;
  var len = html.length;

  function addAttr(name, value) {
    name = _$1.trim(name);
    name = name.replace(REGEXP_ILLEGAL_ATTR_NAME, "").toLowerCase();
    if (name.length < 1) return;
    var ret = onAttr(name, value || "");
    if (ret) retAttrs.push(ret);
  }

  // 逐个分析字符
  for (var i = 0; i < len; i++) {
    var c = html.charAt(i);
    var v, j;
    if (tmpName === false && c === "=") {
      tmpName = html.slice(lastPos, i);
      lastPos = i + 1;
      lastMarkPos = html.charAt(lastPos) === '"' || html.charAt(lastPos) === "'" ? lastPos : findNextQuotationMark(html, i + 1);
      continue;
    }
    if (tmpName !== false) {
      if (
        i === lastMarkPos
      ) {
        j = html.indexOf(c, i + 1);
        if (j === -1) {
          break;
        } else {
          v = _$1.trim(html.slice(lastMarkPos + 1, j));
          addAttr(tmpName, v);
          tmpName = false;
          i = j;
          lastPos = i + 1;
          continue;
        }
      }
    }
    if (/\s|\n|\t/.test(c)) {
      html = html.replace(/\s|\n|\t/g, " ");
      if (tmpName === false) {
        j = findNextEqual(html, i);
        if (j === -1) {
          v = _$1.trim(html.slice(lastPos, i));
          addAttr(v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          i = j - 1;
          continue;
        }
      } else {
        j = findBeforeEqual(html, i - 1);
        if (j === -1) {
          v = _$1.trim(html.slice(lastPos, i));
          v = stripQuoteWrap(v);
          addAttr(tmpName, v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          continue;
        }
      }
    }
  }

  if (lastPos < html.length) {
    if (tmpName === false) {
      addAttr(html.slice(lastPos));
    } else {
      addAttr(tmpName, stripQuoteWrap(_$1.trim(html.slice(lastPos))));
    }
  }

  return _$1.trim(retAttrs.join(" "));
}

function findNextEqual(str, i) {
  for (; i < str.length; i++) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}

function findNextQuotationMark(str, i) {
  for (; i < str.length; i++) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "'" || c === '"') return i;
    return -1;
  }
}

function findBeforeEqual(str, i) {
  for (; i > 0; i--) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}

function isQuoteWrapString(text) {
  if (
    (text[0] === '"' && text[text.length - 1] === '"') ||
    (text[0] === "'" && text[text.length - 1] === "'")
  ) {
    return true;
  } else {
    return false;
  }
}

function stripQuoteWrap(text) {
  if (isQuoteWrapString(text)) {
    return text.substr(1, text.length - 2);
  } else {
    return text;
  }
}

parser$1.parseTag = parseTag$1;
parser$1.parseAttr = parseAttr$1;

/**
 * filter xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var FilterCSS = lib.exports.FilterCSS;
var DEFAULT = _default$1;
var parser = parser$1;
var parseTag = parser.parseTag;
var parseAttr = parser.parseAttr;
var _ = util;

/**
 * returns `true` if the input value is `undefined` or `null`
 *
 * @param {Object} obj
 * @return {Boolean}
 */
function isNull(obj) {
  return obj === undefined || obj === null;
}

/**
 * get attributes for a tag
 *
 * @param {String} html
 * @return {Object}
 *   - {String} html
 *   - {Boolean} closing
 */
function getAttrs(html) {
  var i = _.spaceIndex(html);
  if (i === -1) {
    return {
      html: "",
      closing: html[html.length - 2] === "/",
    };
  }
  html = _.trim(html.slice(i + 1, -1));
  var isClosing = html[html.length - 1] === "/";
  if (isClosing) html = _.trim(html.slice(0, -1));
  return {
    html: html,
    closing: isClosing,
  };
}

/**
 * shallow copy
 *
 * @param {Object} obj
 * @return {Object}
 */
function shallowCopyObject(obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}

function keysToLowerCase(obj) {
  var ret = {};
  for (var i in obj) {
    if (Array.isArray(obj[i])) {
      ret[i.toLowerCase()] = obj[i].map(function (item) {
        return item.toLowerCase();
      });
    } else {
      ret[i.toLowerCase()] = obj[i];
    }
  }
  return ret;
}

/**
 * FilterXSS class
 *
 * @param {Object} options
 *        whiteList (or allowList), onTag, onTagAttr, onIgnoreTag,
 *        onIgnoreTagAttr, safeAttrValue, escapeHtml
 *        stripIgnoreTagBody, allowCommentTag, stripBlankChar
 *        css{whiteList, onAttr, onIgnoreAttr} `css=false` means don't use `cssfilter`
 */
function FilterXSS(options) {
  options = shallowCopyObject(options || {});

  if (options.stripIgnoreTag) {
    if (options.onIgnoreTag) {
      console.error(
        'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
      );
    }
    options.onIgnoreTag = DEFAULT.onIgnoreTagStripAll;
  }
  if (options.whiteList || options.allowList) {
    options.whiteList = keysToLowerCase(options.whiteList || options.allowList);
  } else {
    options.whiteList = DEFAULT.whiteList;
  }

  options.onTag = options.onTag || DEFAULT.onTag;
  options.onTagAttr = options.onTagAttr || DEFAULT.onTagAttr;
  options.onIgnoreTag = options.onIgnoreTag || DEFAULT.onIgnoreTag;
  options.onIgnoreTagAttr = options.onIgnoreTagAttr || DEFAULT.onIgnoreTagAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
  options.escapeHtml = options.escapeHtml || DEFAULT.escapeHtml;
  this.options = options;

  if (options.css === false) {
    this.cssFilter = false;
  } else {
    options.css = options.css || {};
    this.cssFilter = new FilterCSS(options.css);
  }
}

/**
 * start process and returns result
 *
 * @param {String} html
 * @return {String}
 */
FilterXSS.prototype.process = function (html) {
  // compatible with the input
  html = html || "";
  html = html.toString();
  if (!html) return "";

  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onTag = options.onTag;
  var onIgnoreTag = options.onIgnoreTag;
  var onTagAttr = options.onTagAttr;
  var onIgnoreTagAttr = options.onIgnoreTagAttr;
  var safeAttrValue = options.safeAttrValue;
  var escapeHtml = options.escapeHtml;
  var cssFilter = me.cssFilter;

  // remove invisible characters
  if (options.stripBlankChar) {
    html = DEFAULT.stripBlankChar(html);
  }

  // remove html comments
  if (!options.allowCommentTag) {
    html = DEFAULT.stripCommentTag(html);
  }

  // if enable stripIgnoreTagBody
  var stripIgnoreTagBody = false;
  if (options.stripIgnoreTagBody) {
    stripIgnoreTagBody = DEFAULT.StripTagBody(
      options.stripIgnoreTagBody,
      onIgnoreTag
    );
    onIgnoreTag = stripIgnoreTagBody.onIgnoreTag;
  }

  var retHtml = parseTag(
    html,
    function (sourcePosition, position, tag, html, isClosing) {
      var info = {
        sourcePosition: sourcePosition,
        position: position,
        isClosing: isClosing,
        isWhite: Object.prototype.hasOwnProperty.call(whiteList, tag),
      };

      // call `onTag()`
      var ret = onTag(tag, html, info);
      if (!isNull(ret)) return ret;

      if (info.isWhite) {
        if (info.isClosing) {
          return "</" + tag + ">";
        }

        var attrs = getAttrs(html);
        var whiteAttrList = whiteList[tag];
        var attrsHtml = parseAttr(attrs.html, function (name, value) {
          // call `onTagAttr()`
          var isWhiteAttr = _.indexOf(whiteAttrList, name) !== -1;
          var ret = onTagAttr(tag, name, value, isWhiteAttr);
          if (!isNull(ret)) return ret;

          if (isWhiteAttr) {
            // call `safeAttrValue()`
            value = safeAttrValue(tag, name, value, cssFilter);
            if (value) {
              return name + '="' + value + '"';
            } else {
              return name;
            }
          } else {
            // call `onIgnoreTagAttr()`
            ret = onIgnoreTagAttr(tag, name, value, isWhiteAttr);
            if (!isNull(ret)) return ret;
            return;
          }
        });

        // build new tag html
        html = "<" + tag;
        if (attrsHtml) html += " " + attrsHtml;
        if (attrs.closing) html += " /";
        html += ">";
        return html;
      } else {
        // call `onIgnoreTag()`
        ret = onIgnoreTag(tag, html, info);
        if (!isNull(ret)) return ret;
        return escapeHtml(html);
      }
    },
    escapeHtml
  );

  // if enable stripIgnoreTagBody
  if (stripIgnoreTagBody) {
    retHtml = stripIgnoreTagBody.remove(retHtml);
  }

  return retHtml;
};

var xss = FilterXSS;

/**
 * xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

(function (module, exports) {
	var DEFAULT = _default$1;
	var parser = parser$1;
	var FilterXSS = xss;

	/**
	 * filter xss function
	 *
	 * @param {String} html
	 * @param {Object} options { whiteList, onTag, onTagAttr, onIgnoreTag, onIgnoreTagAttr, safeAttrValue, escapeHtml }
	 * @return {String}
	 */
	function filterXSS(html, options) {
	  var xss = new FilterXSS(options);
	  return xss.process(html);
	}

	exports = module.exports = filterXSS;
	exports.filterXSS = filterXSS;
	exports.FilterXSS = FilterXSS;

	(function () {
	  for (var i in DEFAULT) {
	    exports[i] = DEFAULT[i];
	  }
	  for (var j in parser) {
	    exports[j] = parser[j];
	  }
	})();

	// using `xss` on the WebWorker, output `filterXSS` to the globals
	function isWorkerEnv() {
	  return (
	    typeof self !== "undefined" &&
	    typeof DedicatedWorkerGlobalScope !== "undefined" &&
	    self instanceof DedicatedWorkerGlobalScope
	  );
	}
	if (isWorkerEnv()) {
	  self.filterXSS = module.exports;
	}
} (lib$1, lib$1.exports));

/* Copyright (c) 2020 Environmental Systems Research Institute, Inc.
 * Apache-2.0
 *
 * js-xss
 * Copyright (c) 2012-2018 Zongmin Lei(雷宗民) <leizongmin@gmail.com>
 * http://ucdok.com
 * The MIT License, see
 * https://github.com/leizongmin/js-xss/blob/master/LICENSE for details
 * */
/**
 * The Sanitizer Class
 *
 * @export
 * @class Sanitizer
 */
var Sanitizer = /** @class */ (function () {
    function Sanitizer(filterOptions, extendDefaults) {
        var _this = this;
        // Supported HTML Spec: https://doc.arcgis.com/en/arcgis-online/reference/supported-html.htm
        this.arcgisWhiteList = {
            a: ["href", "style", "target"],
            abbr: ["title"],
            audio: ["autoplay", "controls", "loop", "muted", "preload"],
            b: [],
            br: [],
            dd: ["style"],
            div: ["align", "style"],
            dl: ["style"],
            dt: ["style"],
            em: [],
            figcaption: ["style"],
            figure: ["style"],
            font: ["color", "face", "size", "style"],
            h1: ["style"],
            h2: ["style"],
            h3: ["style"],
            h4: ["style"],
            h5: ["style"],
            h6: ["style"],
            hr: [],
            i: [],
            img: ["alt", "border", "height", "src", "style", "width"],
            li: [],
            ol: [],
            p: ["style"],
            source: ["media", "src", "type"],
            span: ["style"],
            strong: [],
            sub: ["style"],
            sup: ["style"],
            table: ["border", "cellpadding", "cellspacing", "height", "style", "width"],
            tbody: [],
            tr: ["align", "height", "style", "valign"],
            td: [
                "align",
                "colspan",
                "height",
                "nowrap",
                "rowspan",
                "style",
                "valign",
                "width",
            ],
            th: [
                "align",
                "colspan",
                "height",
                "nowrap",
                "rowspan",
                "style",
                "valign",
                "width",
            ],
            u: [],
            ul: [],
            video: [
                "autoplay",
                "controls",
                "height",
                "loop",
                "muted",
                "poster",
                "preload",
                "width",
            ],
        };
        this.allowedProtocols = [
            "http",
            "https",
            "mailto",
            "iform",
            "tel",
            "flow",
            "lfmobile",
            "arcgis-navigator",
            "arcgis-appstudio-player",
            "arcgis-survey123",
            "arcgis-collector",
            "arcgis-workforce",
            "arcgis-explorer",
            "arcgis-trek2there",
            "arcgis-quickcapture",
            "mspbi",
            "comgooglemaps",
            "pdfefile",
            "pdfehttp",
            "pdfehttps",
            "boxapp",
            "boxemm",
            "awb",
            "awbs",
            "gropen",
            "radarscope",
        ];
        this.arcgisFilterOptions = {
            allowCommentTag: true,
            safeAttrValue: function (tag, name, value, cssFilter) {
                // Take over safe attribute filtering for `a` `href`, `img` `src`,
                // and `source` `src` attributes, otherwise pass onto the
                // default `XSS.safeAttrValue` method.
                if ((tag === "a" && name === "href") ||
                    ((tag === "img" || tag === "source") && name === "src")) {
                    return _this.sanitizeUrl(value);
                }
                return lib$1.exports.safeAttrValue(tag, name, value, cssFilter);
            },
        };
        this._entityMap = {
            "&": "&#x38;",
            "<": "&#x3C;",
            ">": "&#x3E;",
            '"': "&#x22;",
            "'": "&#x27;",
            "/": "&#x2F;",
        };
        var xssFilterOptions;
        if (filterOptions && !extendDefaults) {
            // Override the defaults
            xssFilterOptions = filterOptions;
        }
        else if (filterOptions && extendDefaults) {
            // Extend the defaults
            xssFilterOptions = Object.create(this.arcgisFilterOptions);
            Object.keys(filterOptions).forEach(function (key) {
                if (key === "whiteList") {
                    // Extend the whitelist by concatenating arrays
                    xssFilterOptions.whiteList = _this._extendObjectOfArrays([
                        _this.arcgisWhiteList,
                        filterOptions.whiteList || {},
                    ]);
                }
                else {
                    xssFilterOptions[key] = filterOptions[key];
                }
            });
        }
        else {
            // Only use the defaults
            xssFilterOptions = Object.create(this.arcgisFilterOptions);
            xssFilterOptions.whiteList = this.arcgisWhiteList;
        }
        this.xssFilterOptions = xssFilterOptions;
        // Make this readable to tests
        this._xssFilter = new lib$1.exports.FilterXSS(xssFilterOptions);
    }
    /**
     * Sanitizes value to remove invalid HTML tags.
     *
     * Note: If the value passed does not contain a valid JSON data type (String,
     * Number, JSON Object, Array, Boolean, or null), the value will be nullified.
     *
     * @param {any} value The value to sanitize.
     * @returns {any} The sanitized value.
     * @memberof Sanitizer
     */
    Sanitizer.prototype.sanitize = function (value, options) {
        if (options === void 0) { options = {}; }
        switch (typeof value) {
            case "number":
                if (isNaN(value) || !isFinite(value)) {
                    return null;
                }
                return value;
            case "boolean":
                return value;
            case "string":
                return this._xssFilter.process(value);
            case "object":
                return this._iterateOverObject(value, options);
            default:
                if (options.allowUndefined && typeof value === "undefined") {
                    return;
                }
                return null;
        }
    };
    /**
     * Sanitizes a URL string following the allowed protocols and sanitization rules.
     *
     * @param {string} value The URL to sanitize.
     * @param {{ isProtocolRequired: boolean }} options Configuration options for URL checking.
     * @returns {string} The sanitized URL if it's valid, or an empty string if the URL is invalid.
     */
    Sanitizer.prototype.sanitizeUrl = function (value, options) {
        var _a = (options !== null && options !== void 0 ? options : {}).isProtocolRequired, isProtocolRequired = _a === void 0 ? true : _a;
        var protocol = this._trim(value.substring(0, value.indexOf(":")));
        var isRootUrl = value === '/';
        var isUrlFragment = /^#/.test(value);
        var isValidProtocol = protocol && this.allowedProtocols.indexOf(protocol.toLowerCase()) > -1;
        if (isRootUrl || isUrlFragment || isValidProtocol) {
            return lib$1.exports.escapeAttrValue(value);
        }
        if (!protocol && !isProtocolRequired) {
            return lib$1.exports.escapeAttrValue("https://".concat(value));
        }
        return "";
    };
    /**
     * Sanitizes an HTML attribute value.
     *
     * @param {string} tag The tagname of the HTML element.
     * @param {string} attribute The attribute name of the HTML element.
     * @param {string} value The raw value to be used for the HTML attribute value.
     * @param {XSS.ICSSFilter} [cssFilter] The CSS filter to be used.
     * @returns {string} The sanitized attribute value.
     * @memberof Sanitizer
     */
    Sanitizer.prototype.sanitizeHTMLAttribute = function (tag, attribute, value, cssFilter) {
        // use the custom safeAttrValue function if provided
        if (typeof this.xssFilterOptions.safeAttrValue === "function") {
            return this.xssFilterOptions.safeAttrValue(tag, attribute, value, 
            // @ts-expect-error safeAttrValue does handle undefined cssFilter
            cssFilter);
        }
        // otherwise use the default
        // @ts-ignore safeAttrValue does handle undefined cssFilter
        return lib$1.exports.safeAttrValue(tag, attribute, value, cssFilter);
    };
    /**
     * Checks if a value only contains valid HTML.
     *
     * @param {any} value The value to validate.
     * @returns {boolean}
     * @memberof Sanitizer
     */
    Sanitizer.prototype.validate = function (value, options) {
        if (options === void 0) { options = {}; }
        var sanitized = this.sanitize(value, options);
        return {
            isValid: value === sanitized,
            sanitized: sanitized,
        };
    };
    /**
     * Encodes the following characters, `& < > \" ' /` to their hexadecimal HTML entity code.
     * Example: "&middot;" => "&#x38;middot;"
     *
     * @param {string} value The value to encode.
     * @returns {string} The encoded string value.
     * @memberof Sanitizer
     */
    Sanitizer.prototype.encodeHTML = function (value) {
        var _this = this;
        return String(value).replace(/[&<>"'\/]/g, function (s) {
            return _this._entityMap[s];
        });
    };
    /**
     * Encodes all non-alphanumeric ASCII characters to their hexadecimal HTML entity codes.
     * Example: "alert(document.cookie)" => "alert&#x28;document&#x2e;cookie&#x29;"
     *
     * @param {string} value The value to encode.
     * @returns {string} The encoded string value.
     * @memberof Sanitizer
     */
    Sanitizer.prototype.encodeAttrValue = function (value) {
        var alphanumericRE = /^[a-zA-Z0-9]$/;
        return String(value).replace(/[\x00-\xFF]/g, function (c, idx) {
            return !alphanumericRE.test(c)
                ? "&#x".concat(Number(value.charCodeAt(idx)).toString(16), ";")
                : c;
        });
    };
    /**
     * Extends an object of arrays by by concatenating arrays of the same object
     * keys. If the if the previous key's value is not an array, the next key's
     * value will replace the previous key. This method is used for extending the
     * whiteList in the XSS filter options.
     *
     * @private
     * @param {Array<{}>} objects An array of objects.
     * @returns {{}} The extended object.
     * @memberof Sanitizer
     */
    Sanitizer.prototype._extendObjectOfArrays = function (objects) {
        var finalObj = {};
        objects.forEach(function (obj) {
            Object.keys(obj).forEach(function (key) {
                if (Array.isArray(obj[key]) && Array.isArray(finalObj[key])) {
                    finalObj[key] = finalObj[key].concat(obj[key]);
                }
                else {
                    finalObj[key] = obj[key];
                }
            });
        });
        return finalObj;
    };
    /**
     * Iterate over a plain object or array to deeply sanitize each value.
     *
     * @private
     * @param {object} obj The object to iterate over.
     * @returns {(object | null)} The sanitized object.
     * @memberof Sanitizer
     */
    Sanitizer.prototype._iterateOverObject = function (obj, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        try {
            var hasChanged_1 = false;
            var changedObj = void 0;
            if (Array.isArray(obj)) {
                changedObj = obj.reduce(function (prev, value) {
                    var validation = _this.validate(value, options);
                    if (validation.isValid) {
                        return prev.concat([value]);
                    }
                    else {
                        hasChanged_1 = true;
                        return prev.concat([validation.sanitized]);
                    }
                }, []);
            }
            else if (!isPlainObject(obj)) {
                if (options.allowUndefined && typeof obj === "undefined") {
                    return;
                }
                return null;
            }
            else {
                var keys = Object.keys(obj);
                changedObj = keys.reduce(function (prev, key) {
                    var value = obj[key];
                    var validation = _this.validate(value, options);
                    if (validation.isValid) {
                        prev[key] = value;
                    }
                    else {
                        hasChanged_1 = true;
                        prev[key] = validation.sanitized;
                    }
                    return prev;
                }, {});
            }
            if (hasChanged_1) {
                return changedObj;
            }
            return obj;
        }
        catch (err) {
            return null;
        }
    };
    /**
     * Trim whitespace from the start and ends of a string.
     * @param {string} val The string to trim.
     * @returns {string} The trimmed string.
     */
    Sanitizer.prototype._trim = function (val) {
        // @ts-ignore This is used by Jest,
        // but TypeScript errors since it assumes `trim` is always available.
        return String.prototype.trim
            ? val.trim()
            : val.replace(/(^\s*)|(\s*$)/g, "");
    };
    return Sanitizer;
}());

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const n$7=new Map;function t$5(){n$7.clear();}function e$9(t){return n$7.get(t)}function c$4(t,e){n$7.set(t,e);}function o$4(t){n$7.delete(t);}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const u$4=s$l.getLogger("esri.widgets.support.widgetUtils");function p$6(e){const n=t$e.acquire();for(let t=0;t<arguments.length;t++){const e=arguments[t],r=typeof e;if("string"===r)n.push(e);else if(Array.isArray(e))n.push.apply(n,e);else if("object"===r)for(const t in e)e[t]&&n.push(t);}const r=n.join(" ");return t$e.release(n),r}(()=>{const e=new Map,t=new ResizeObserver((t=>{t$5();for(const n of t)e.get(n.target)?.(n);}));return (r,i,o)=>(e.has(r)&&u$4.error("Already observing element",r),e.set(r,i),t.observe(r,o),n$j((()=>{t.unobserve(r),e.delete(r);})))})();function v$1(e){const t="data-node-ref";this[e.getAttribute(t)]=e;}const L$1=["dd","dl","dt","h1","h2","h3","h4","h5","h6","sub","sup",...["animate","animatetransform","circle","clippath","defs","ellipse","g","image","line","lineargradient","marker","mask","path","pattern","polygon","polyline","radialgradient","rect","stop","svg","switch","symbol","text","textpath","tspan","use"]],b$2=L$1.reduce(((e,t)=>(e[t]=[],e)),{}),y$1=["align","alink","alt","bgcolor","border","cellpadding","cellspacing","class","color","cols","colspan","coords","d","dir","face","height","hspace","ismap","lang","marginheight","marginwidth","multiple","nohref","noresize","noshade","nowrap","ref","rel","rev","rows","rowspan","scrolling","shape","span","summary","tabindex","title","usemap","valign","value","vlink","vspace","width"],E$1=new Sanitizer({whiteList:b$2,onTagAttr:(e,t,n)=>{const r=`${t}="${n}"`;if(y$1.includes(t))return r},stripIgnoreTag:!0,stripIgnoreTagBody:["script","style"]},!0);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const t$4="http://www.w3.org/",r$4=`${t$4}2000/svg`,o$3=`${t$4}1999/xlink`;let i$4,l$3=[],n$6=(e,t)=>{let r={};return Object.keys(e).forEach((t=>{r[t]=e[t];})),t&&Object.keys(t).forEach((e=>{r[e]=t[e];})),r},s$7=(e,t)=>e.vnodeSelector===t.vnodeSelector&&(e.properties&&t.properties?e.properties.key===t.properties.key&&e.properties.bind===t.properties.bind:!e.properties&&!t.properties),p$5=e=>{if("string"!=typeof e)throw new Error("Style values must be strings")},d$4=(e,t,r)=>{if(""!==t.vnodeSelector)for(let o=r;o<e.length;o++)if(s$7(e[o],t))return o;return -1},a$4=(e,t,r,o)=>{let i=e[t];if(""===i.vnodeSelector)return;let l=i.properties;if(!(l?void 0===l.key?l.bind:l.key:void 0))for(let n=0;n<e.length;n++)if(n!==t){let t=e[n];if(s$7(t,i))throw new Error(`${r.vnodeSelector} had a ${i.vnodeSelector} child ${"added"===o?o:"removed"}, but there is now more than one. You must add unique key properties to make them distinguishable.`)}},f$2=e=>{if(e.properties){let t=e.properties.enterAnimation;t&&t(e.domNode,e.properties);}},c$3=[],u$3=!1,h=e=>{(e.children||[]).forEach(h),e.properties&&e.properties.afterRemoved&&e.properties.afterRemoved.apply(e.properties.bind||e.properties,[e.domNode]);},m=()=>{u$3=!1,c$3.forEach(h),c$3.length=0;},v=e=>{c$3.push(e),u$3||(u$3=!0,"undefined"!=typeof window&&"requestIdleCallback"in window?window.requestIdleCallback(m,{timeout:16}):setTimeout(m,16));},y=e=>{let t=e.domNode;if(e.properties){let r=e.properties.exitAnimation;if(r){t.style.pointerEvents="none";let o=()=>{t.parentNode&&(t.parentNode.removeChild(t),v(e));};return void r(t,o,e.properties)}}t.parentNode&&(t.parentNode.removeChild(t),v(e));},g=(t,i,l)=>{if(!i)return;let n=l.eventHandlerInterceptor,s=Object.keys(i),d=s.length;for(let a=0;a<d;a++){let d=s[a],f=i[d];if("className"===d)throw new Error('Property "className" is not supported, use "class".');if("class"===d)x$1(t,f,!0);else if("classes"===d){let e=Object.keys(f),r=e.length;for(let o=0;o<r;o++){let r=e[o];f[r]&&t.classList.add(r);}}else if("styles"===d){let e=Object.keys(f),r=e.length;for(let o=0;o<r;o++){let r=e[o],i=f[r];i&&(p$5(i),l.styleApplyer(t,r,i));}}else if("key"!==d&&null!=f){let s=typeof f;"function"===s?(0===d.lastIndexOf("on",0)&&(n&&(f=n(d,f,t,i)),"oninput"===d&&function(){let e=f;f=function(t){e.apply(this,[t]),t.target["oninput-value"]=t.target.value;};}()),t[d]=f):l.namespace===r$4?"href"===d?t.setAttributeNS(o$3,d,f):t.setAttribute(d,f):"string"===s&&"value"!==d?"innerHTML"===d?t[d]=E$1.sanitize(f):t.setAttribute(d,f):t[d]=f;}}},b$1=(e,t,r)=>{if(t)for(let o of t)w(o,e,void 0,r);},N=(e,t,r)=>{b$1(e,t.children,r),t.text&&(e.textContent=t.text),g(e,t.properties,r),t.properties&&t.properties.afterCreate&&t.properties.afterCreate.apply(t.properties.bind||t.properties,[e,r,t.vnodeSelector,t.properties,t.children]);},w=(e,t,o,i)=>{let l,s=0,p=e.vnodeSelector,d=t.ownerDocument;if(""===p)l=e.domNode=d.createTextNode(e.text),void 0!==o?t.insertBefore(l,o):t.appendChild(l);else {for(let a=0;a<=p.length;++a){let f=p.charAt(a);if(a===p.length||"."===f||"#"===f){let f=p.charAt(s-1),c=p.slice(s,a);"."===f?l.classList.add(c):"#"===f?l.id=c:("svg"===c&&(i=n$6(i,{namespace:r$4})),void 0!==i.namespace?l=e.domNode=d.createElementNS(i.namespace,c):(l=e.domNode=e.domNode||d.createElement(c),"input"===c&&e.properties&&void 0!==e.properties.type&&l.setAttribute("type",e.properties.type)),void 0!==o?t.insertBefore(l,o):l.parentNode!==t&&t.appendChild(l)),s=a+1;}}N(l,e,i);}},x$1=(e,t,r)=>{t&&t.split(" ").forEach((t=>{t&&e.classList.toggle(t,r);}));},k=(t,i,l,n)=>{if(!l)return;let s=!1,d=Object.keys(l),a=d.length;for(let f=0;f<a;f++){let a=d[f],c=l[a],u=i[a];if("class"===a)u!==c&&(x$1(t,u,!1),x$1(t,c,!0));else if("classes"===a){let e=t.classList,r=Object.keys(c),o=r.length;for(let t=0;t<o;t++){let o=r[t],i=!!c[o];i!==!!u[o]&&(s=!0,i?e.add(o):e.remove(o));}}else if("styles"===a){let e=Object.keys(c),r=e.length;for(let o=0;o<r;o++){let r=e[o],i=c[r];i!==u[r]&&(s=!0,i?(p$5(i),n.styleApplyer(t,r,i)):n.styleApplyer(t,r,""));}}else if(c||"string"!=typeof u||(c=""),"value"===a){let e=t[a];e!==c&&(t["oninput-value"]?e===t["oninput-value"]:c!==u)&&(t[a]=c,t["oninput-value"]=void 0),c!==u&&(s=!0);}else if(c!==u){let i=typeof c;"function"===i&&n.eventHandlerInterceptor||(n.namespace===r$4?"href"===a?t.setAttributeNS(o$3,a,c):t.setAttribute(a,c):"string"===i?"innerHTML"===a?t[a]=E$1.sanitize(c):"role"===a&&""===c?t.removeAttribute(a):t.setAttribute(a,c):t[a]!==c&&(t[a]=c),s=!0);}}return s},A$1=(e,t,r,o,n)=>{if(r===o)return !1;o=o||l$3;let p,c=(r=r||l$3).length,u=o.length,h=0,m=0,v=!1;for(;m<u;){let l=h<c?r[h]:void 0,u=o[m];if(void 0!==l&&s$7(l,u))v=i$4(l,u,n)||v,h++;else {let l=d$4(r,u,h+1);if(l>=0){for(p=h;p<l;p++)y(r[p]),a$4(r,p,e,"removed");v=i$4(r[l],u,n)||v,h=l+1;}else w(u,t,h<c?r[h].domNode:void 0,n),f$2(u),a$4(o,m,e,"added");}m++;}if(c>h)for(p=h;p<c;p++)y(r[p]),a$4(r,p,e,"removed");return v};i$4=(e,t,o)=>{let i=e.domNode,l=!1;if(e===t)return !1;let s=!1;if(""===t.vnodeSelector){if(t.text!==e.text){let e=i.ownerDocument.createTextNode(t.text);return i.parentNode.replaceChild(e,i),t.domNode=e,l=!0,l}t.domNode=i;}else 0===t.vnodeSelector.lastIndexOf("svg",0)&&(o=n$6(o,{namespace:r$4})),e.text!==t.text&&(s=!0,void 0===t.text?i.removeChild(i.firstChild):i.textContent=t.text),t.domNode=i,s=A$1(t,i,e.children,t.children,o)||s,s=k(i,e.properties,t.properties,o)||s,t.properties&&t.properties.afterUpdate&&t.properties.afterUpdate.apply(t.properties.bind||t.properties,[i,o,t.vnodeSelector,t.properties,t.children]);return s&&t.properties&&t.properties.updateAnimation&&t.properties.updateAnimation(i,t.properties,e.properties),l};let S=(e,t)=>({getLastRender:()=>e,update:r=>{if(e.vnodeSelector!==r.vnodeSelector)throw new Error("The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)");let o=e;e=r,i$4(o,r,t);},domNode:e.domNode});

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const p$4={namespace:void 0,performanceLogger:()=>{},eventHandlerInterceptor:void 0,styleApplyer:(e,r,o)=>{"-"===r.charAt(0)?e.style.setProperty(r,o):e.style[r]=o;}};let d$3=r=>n$6(p$4,r),n$5={create:(e,t)=>(t=d$3(t),w(e,document.createElement("div"),void 0,t),S(e,t)),append:(e,t,p)=>(p=d$3(p),w(t,e,void 0,p),S(t,p)),insertBefore:(e,t,p)=>(p=d$3(p),w(t,e.parentNode,e,p),S(t,p)),merge:(e,r,p)=>(p=d$3(p),r.domNode=e,N(e,r,p),S(r,p)),replace:(e,t,p)=>(p=d$3(p),w(t,e.parentNode,e,p),e.parentNode.removeChild(e),S(t,p))};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const e$8={handleInterceptedEvent:(e,p,t,n)=>(e.scheduleRender(),p.properties[`on${n.type}`].apply(p.properties.bind||t,[n]))};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const e$7={namespace:void 0,performanceLogger:()=>{},eventHandlerInterceptor:void 0,styleApplyer:(e,r,o)=>{e.style[r]=o;}},r$3=r=>({...e$7,...r});

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const o$2=(e,t)=>{const r=[];for(;e&&e!==t;)r.push(e),e=e.parentNode;return r},n$4=(e,t)=>e.find(t),d$2=(e,t,r=!1)=>{let o=e;return t.forEach(((e,d)=>{const s=o?.children?n$4(o.children,(t=>t.domNode===e)):void 0;r&&!s&&d!==t.length-1||(o=s);})),o},s$6=n=>{let s;const i={...e$8,...n},c=r$3(i),a=c.performanceLogger;let m,p=!0,l=!1;const f=[],u=[],h=(e,t,r)=>{let n;c.eventHandlerInterceptor=(e,t,r,c)=>function(e){let t;a("domEvent",e);const r=o$2(e.currentTarget,n.domNode),c=r.some((e=>customElements.get(e?.tagName?.toLowerCase())));if(e.eventPhase===Event.CAPTURING_PHASE||!c)r.reverse(),t=d$2(n.getLastRender(),r);else {const r=e.composedPath(),o=r.slice(r.indexOf(e.currentTarget),r.indexOf(n.domNode)).filter((e=>e.getRootNode()===e.ownerDocument)).reverse();t=d$2(n.getLastRender(),o,!0);}let m;return t&&(m=i.handleInterceptedEvent(s,t,this,e)),a("domEventProcessed",e),m},i.postProcessProjectionOptions?.(c);const m=r();n=e(t,m,c),f.push(n),u.push(r),i.afterFirstVNodeRendered&&i.afterFirstVNodeRendered(n,m);};let v=()=>{if(m=void 0,p){p=!1,a("renderStart",void 0);for(let e=0;e<f.length;e++){const t=u[e]();a("rendered",void 0),f[e].update(t),a("patched",void 0);}a("renderDone",void 0),p=!0;}};return i.modifyDoRenderImplementation&&(v=i.modifyDoRenderImplementation(v,f,u)),s={renderNow:v,scheduleRender:()=>{m||l||(m=requestAnimationFrame(v));},stop:()=>{m&&(cancelAnimationFrame(m),m=void 0),l=!0;},resume:()=>{l=!1,p=!0,s.scheduleRender();},append:(t,r)=>{h(n$5.append,t,r);},insertBefore:(t,r)=>{h(n$5.insertBefore,t,r);},merge:(t,r)=>{h(n$5.merge,t,r);},replace:(t,r)=>{h(n$5.replace,t,r);},detach:e=>{for(let t=0;t<u.length;t++)if(u[t]===e)return u.splice(t,1),f.splice(t,1)[0];throw new Error("renderFunction was not found")}},s};

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/snabbdom/snabbdom/blob/master/LICENSE
 *
 * Modified for Stencil's renderer and slot projection
 */
const setAssetPath = (path) => (path);

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */

const autoTheme = "calcite-theme-auto";
const darkTheme = "calcite-theme-dark";

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */

/**
 * Emits when the theme is dynamically toggled between light and dark on <body> or in OS preferences.
 */
function initThemeChangeEvent() {
  const { classList } = document.body;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const getTheme = () => classList.contains(darkTheme) || (classList.contains(autoTheme) && prefersDark) ? "dark" : "light";
  const emitThemeChange = (theme) => document.body.dispatchEvent(new CustomEvent("calciteThemeChange", { bubbles: true, detail: { theme } }));
  const themeChangeHandler = (newTheme) => {
    currentTheme !== newTheme && emitThemeChange(newTheme);
    currentTheme = newTheme;
  };
  let currentTheme = getTheme();
  // emits event on page load
  emitThemeChange(currentTheme);
  // emits event when changing OS theme preferences
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => themeChangeHandler(event.matches ? "dark" : "light"));
  // emits event when toggling between theme classes on <body>
  new MutationObserver(() => themeChangeHandler(getTheme())).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });
}

/**
 * This file is imported in Stencil's `globalScript` config option.
 *
 * @see {@link https://stenciljs.com/docs/config#globalscript}
 */
function appGlobalScript () {
  const isBrowser = typeof window !== "undefined" &&
    typeof location !== "undefined" &&
    typeof document !== "undefined" &&
    window.location === location &&
    window.document === document;
  if (isBrowser) {
    if (document.readyState === "interactive") {
      initThemeChangeEvent();
    }
    else {
      document.addEventListener("DOMContentLoaded", () => initThemeChangeEvent(), { once: true });
    }
  }
}

const globalScripts = appGlobalScript;

globalScripts();

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
let e$6;function r$2(){setAssetPath(Q(a$d(e$6)));}e$6="components/assets";

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const t$3=Symbol("widget"),r$1=[],n$3={},o$1=new WeakMap;function i$3(e,t){let o=t.children;if(o&&o.length)for(let r=0;r<o.length;++r)o[r]=i$3(e,o[r]);else o=r$1;const l=t.vnodeSelector;if(a$3(l)){const r=t.properties||n$3,i=r.key||l;return {vnodeSelector:"div",properties:{key:i,afterCreate:d$1,afterUpdate:c$2,afterRemoved:s$5,parentWidget:e,widgetConstructor:l,widgetProperties:{...r,key:i,children:o}},children:void 0,text:void 0,domNode:null}}return t}function d$1(t,r,n,{parentWidget:i,widgetConstructor:d,widgetProperties:c}){const a=new d(c);a.container=t,o$1.set(t,a),a.afterCreate?.(a,t),i._internalHandles.add(n$j((()=>s$5(t))));}function c$2(e,t,r,{widgetProperties:n}){const i=o$1.get(e);i&&(i.set(n),i.afterUpdate?.(i,e));}function s$5(e){const t=o$1.get(e);t&&(t.destroy(),o$1.delete(e));}function a$3(e){return "function"==typeof e&&e[t$3]}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const e$5=new Set;function n$2(n){e$5.add(n),n.finally((()=>e$5.delete(n)));}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const U="esri.widgets.Widget";let $=0;const x={widgetIcon:"esri-icon-checkbox-unchecked"};function z(e,t){for(const r in t)null!=e[r]&&("object"==typeof e[r]&&"object"==typeof t[r]?z(e[r],t?.[r]):e[r]=t[r]);return e}const A=s$6({postProcessProjectionOptions(e){const t=e.eventHandlerInterceptor,r=/capture$/i;e.eventHandlerInterceptor=(e,o,s,i)=>{const n=t?.(e,o,s,i),a=r.test(e);if(!((e=e.replace(r,"")).toLowerCase()in s)||a){const t=e[2].toLowerCase()+e.slice(3),r=e=>n?.call(s,e);s.addEventListener(t,r,a);const o=()=>s.removeEventListener(t,r,a),c=i.afterRemoved;i.afterRemoved=e=>{c?.(e),o();};}return n};},handleInterceptedEvent(e,t,r,o){const{eventPhase:s,type:i}=o,n=s===Event.CAPTURING_PHASE;let a=`on${i}${n?"capture":""}`;const c=t.properties;(c&&a in c||(a=`on${i[0].toUpperCase()}${i.slice(1)}${n?"Capture":""}`,c&&a in c))&&(t$5(),e.scheduleRender(),c[a].call(c.bind||r,o));}});let B=!1,D$1=class extends(m$1(n$a.EventedAccessor)){constructor(e,t){super(e,t),this._attached=!1,this._internalHandles=new t$j,this._projector=A,this._readyForTrueRender=!1,this.iconClass=x.widgetIcon,this.key=this,this._loadLocale=x$4((async()=>{if(this._messageBundleProps&&this._messageBundleProps.length){const e=await E$2(this._messageBundleProps.map((async({bundlePath:e,propertyName:t})=>{let r=await u$d(e);this.uiStrings&&Object.keys(this.uiStrings)&&(r=z(y$c(r),this.uiStrings)),this[t]=r;})));for(const t of e)t.error&&s$l.getLogger(this.declaredClass).error("widget-intl:locale-error",this.declaredClass,t.error);}await this.loadLocale();})),r$2();const r="esri-widget-uid-"+n$8(),o=this.render.bind(this);this._trackingTarget=new s$e((()=>this.scheduleRender()));const s=()=>{if(!this._readyForTrueRender||this.destroyed)return null;if(!this.visible)return {vnodeSelector:"div",properties:{key:r,class:"",styles:{display:"none"}},domNode:null,children:void 0,text:void 0};const e=o();let{properties:t}=e;t||(e.properties=t={});let{key:s,styles:i}=t;s||(t.key=r),i||(t.styles=i={}),i.display||(i.display="");let n=0;return e.children?.forEach((e=>{if(a$3(e.vnodeSelector))return;let{properties:t}=e;t||(e.properties=t={}),t.key||(t.key=`${this.id}--${n++}`);})),i$3(this,e)};this.render=()=>{if(B)return s();let e=e$9(this)??null;if(e)return e;this._trackingTarget.clear(),B=!0;try{e=f$b(this._trackingTarget,s);}catch(t){throw console.error(t),t}finally{B=!1;}return e&&c$4(this,e),e},this.addResolvingPromise(this._resourcesFetch=this.beforeFirstRender().then((()=>{this._readyForTrueRender=!0,this._postInitialize();}))),n$2(this._resourcesFetch);}normalizeCtorArgs(e,t){const r={...e};return t&&(r.container=t),r}postInitialize(){}beforeFirstRender(){return Promise.all([this.loadDependencies(),this._loadLocale()]).then((()=>{})).catch(b$7)}async loadDependencies(){}async loadLocale(){}destroy(){this.destroyed||(s$n(this._trackingTarget),s$n(this.viewModel),this._detach(this.container),this._set("container",null),this._internalHandles.destroy(),this._emitter.clear(),this.render=()=>null,this._projector=null,o$4(this));}set container(e){this._get("container")||this._set("container",e);}castContainer(e){return e$b(e)}get domNode(){return this.container}set domNode(e){this.container=e;}get id(){return this._get("id")||this.get("container.id")||Date.now().toString(16)+"-widget-"+$++}set id(e){e&&this._set("id",e);}get label(){return this.declaredClass.split(".").pop()}set label(e){this._overrideIfSome("label",e);}get renderable(){return this._resourcesFetch}get visible(){return this._get("visible")}set visible(e){this._set("visible",e);}get test(){return {projector:this._projector}}render(){throw new Error("not implemented")}scheduleRender(){this.destroyed||(o$4(this),this._projector.scheduleRender());}classes(...e){return p$6.apply(this,e)}renderNow(){o$4(this),this._projector.renderNow();}_postInitialize(){if(this.destroyed)return;this.scheduleRender(),this._delegatedEventNames?.length&&this._internalHandles.add(l$4((()=>this.viewModel),((e,t)=>{t&&this._internalHandles.remove("delegated-events"),e&&e$n(e)&&this._internalHandles.add(this._delegatedEventNames.map((t=>r$f(e,t,(e=>{this.emit(t,e);})))),"delegated-events");}),h$2)),this.postInitialize();const e=async()=>{await this._loadLocale().catch(b$7),this.scheduleRender();};this._internalHandles.add([s$o(e),l$4((()=>this.uiStrings),e),f$3((()=>this.container),(e=>{this.destroyed||this._attach(e);}),{initial:!0,once:!0})]);}_attach(e){e&&(this._projector.merge(e,this.render),this._attached=!0);}_detach(e){this._attached&&(this._projector.detach(this.render),this._attached=!1),e?.parentNode?.removeChild(e);}};D$1[t$3]=!0,e$m([y$7()],D$1.prototype,"_readyForTrueRender",void 0),e$m([y$7({value:null})],D$1.prototype,"container",null),e$m([s$8("container")],D$1.prototype,"castContainer",null),e$m([y$7()],D$1.prototype,"domNode",null),e$m([y$7()],D$1.prototype,"iconClass",void 0),e$m([y$7()],D$1.prototype,"id",null),e$m([y$7()],D$1.prototype,"label",null),e$m([y$7()],D$1.prototype,"renderable",null),e$m([y$7()],D$1.prototype,"uiStrings",void 0),e$m([y$7()],D$1.prototype,"viewModel",void 0),e$m([y$7({value:!0})],D$1.prototype,"visible",null),e$m([y$7()],D$1.prototype,"key",void 0),e$m([y$7()],D$1.prototype,"children",void 0),e$m([y$7()],D$1.prototype,"afterCreate",void 0),e$m([y$7()],D$1.prototype,"afterUpdate",void 0),e$m([y$7()],D$1.prototype,"afterRemoved",void 0),D$1=e$m([n$b(U)],D$1);const M=D$1;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function e$4(e){return (s,r)=>{s.hasOwnProperty("_messageBundleProps")||(s._messageBundleProps=s._messageBundleProps?s._messageBundleProps.slice():[]);s._messageBundleProps.push({bundlePath:e,propertyName:r});}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
var e$3=function(r){return {vnodeSelector:"",properties:void 0,children:void 0,text:r.toString(),domNode:null}},o=function(r,t){for(var n=0,i=r.length;n<i;n++){var d=r[n];Array.isArray(d)?o(d,t):null!=d&&!1!==d&&(d.hasOwnProperty("vnodeSelector")||(d=e$3(d)),t.push(d));}},t$2=function(r,e){for(var t=[],n=2;n<arguments.length;n++)t[n-2]=arguments[n];if(1===t.length&&"string"==typeof t[0])return {vnodeSelector:r,properties:e||void 0,children:void 0,text:t[0],domNode:null};var i=[];return o(t,i),{vnodeSelector:r,properties:e||void 0,children:i,text:void 0,domNode:null}};function n$1(e,o,...n){return "function"!=typeof e||a$3(e)?t$2(e,o,...n):e(o,...n)}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const a$2={base:"esri-identity-form",group:"esri-identity-form__group",label:"esri-identity-form__label",footer:"esri-identity-form__footer",esriInput:"esri-input",esriButton:"esri-button",esriButtonSecondary:"esri-button--secondary"},l$2="ArcGIS Online";let p$3=class extends M{constructor(s,e){super(s,e),this._usernameInputNode=null,this._passwordInputNode=null,this.signingIn=!1,this.server=null,this.resource=null,this.error=null,this.oAuthPrompt=!1;}render(){const{error:s,server:e,resource:t,signingIn:o,oAuthPrompt:n,messages:p}=this,d=n$1("div",{class:a$2.group},s$p(n?p.oAuthInfo:p.info,{server:e&&/\.arcgis\.com/i.test(e)?l$2:e,resource:`(${t||p.lblItem})`})),c=n?null:n$1("div",{class:a$2.group,key:"username"},n$1("label",{class:a$2.label},p.lblUser,n$1("input",{value:"",required:!0,autocomplete:"off",spellcheck:!1,type:"text",bind:this,afterCreate:v$1,"data-node-ref":"_usernameInputNode",class:a$2.esriInput}))),m=n?null:n$1("div",{class:a$2.group,key:"password"},n$1("label",{class:a$2.label},p.lblPwd,n$1("input",{value:"",required:!0,type:"password",bind:this,afterCreate:v$1,"data-node-ref":"_passwordInputNode",class:a$2.esriInput}))),h=n$1("div",{class:this.classes(a$2.group,a$2.footer)},n$1("input",{type:"submit",disabled:!!o,value:o?p.lblSigning:p.lblOk,class:a$2.esriButton}),n$1("input",{type:"button",value:p.lblCancel,bind:this,onclick:this._cancel,class:this.classes(a$2.esriButton,a$2.esriButtonSecondary)})),b=s?n$1("div",null,s.details&&s.details.httpStatus?p.invalidUser:p.noAuthService):null;return n$1("form",{class:a$2.base,bind:this,onsubmit:this._submit},d,b,c,m,h)}_cancel(){this._set("signingIn",!1),this._usernameInputNode&&(this._usernameInputNode.value=""),this._passwordInputNode&&(this._passwordInputNode.value=""),this.emit("cancel");}_submit(s){s.preventDefault(),this._set("signingIn",!0);const e=this.oAuthPrompt?{}:{username:this._usernameInputNode&&this._usernameInputNode.value,password:this._passwordInputNode&&this._passwordInputNode.value};this.emit("submit",e);}};e$m([y$7(),e$4("esri/identity/t9n/identity")],p$3.prototype,"messages",void 0),e$m([y$7()],p$3.prototype,"signingIn",void 0),e$m([y$7()],p$3.prototype,"server",void 0),e$m([y$7()],p$3.prototype,"resource",void 0),e$m([y$7()],p$3.prototype,"error",void 0),e$m([y$7()],p$3.prototype,"oAuthPrompt",void 0),p$3=e$m([n$b("esri.identity.IdentityForm")],p$3);const d=p$3;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function e$2(e){return e&&"function"==typeof e.render}

/*!
* tabbable 6.0.1
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]:not(slot)', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])', 'details>summary:first-of-type', 'details'];
var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
var NoElement = typeof Element === 'undefined';
var matches = NoElement ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function (element) {
  return element.getRootNode();
} : function (element) {
  return element.ownerDocument;
};

/**
 * @param {Element} el container to check in
 * @param {boolean} includeContainer add container to check
 * @param {(node: Element) => boolean} filter filter candidates
 * @returns {Element[]}
 */
var getCandidates = function getCandidates(el, includeContainer, filter) {
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};

/**
 * @callback GetShadowRoot
 * @param {Element} element to check for shadow root
 * @returns {ShadowRoot|boolean} ShadowRoot if available or boolean indicating if a shadowRoot is attached but not available.
 */

/**
 * @callback ShadowRootFilter
 * @param {Element} shadowHostNode the element which contains shadow content
 * @returns {boolean} true if a shadow root could potentially contain valid candidates.
 */

/**
 * @typedef {Object} CandidateScope
 * @property {Element} scopeParent contains inner candidates
 * @property {Element[]} candidates list of candidates found in the scope parent
 */

/**
 * @typedef {Object} IterativeOptions
 * @property {GetShadowRoot|boolean} getShadowRoot true if shadow support is enabled; falsy if not;
 *  if a function, implies shadow support is enabled and either returns the shadow root of an element
 *  or a boolean stating if it has an undisclosed shadow root
 * @property {(node: Element) => boolean} filter filter candidates
 * @property {boolean} flatten if true then result will flatten any CandidateScope into the returned list
 * @property {ShadowRootFilter} shadowRootFilter filter shadow roots;
 */

/**
 * @param {Element[]} elements list of element containers to match candidates from
 * @param {boolean} includeContainer add container list to check
 * @param {IterativeOptions} options
 * @returns {Array.<Element|CandidateScope>}
 */
var getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (element.tagName === 'SLOT') {
      // add shadow dom slot scope (slot itself cannot be focusable)
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      // check candidate element
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }

      // iterate over shadow content if possible
      var shadowRoot = element.shadowRoot ||
      // check for an undisclosed shadow
      typeof options.getShadowRoot === 'function' && options.getShadowRoot(element);
      var validShadowRoot = !options.shadowRootFilter || options.shadowRootFilter(element);
      if (shadowRoot && validShadowRoot) {
        // add shadow dom scope IIF a shadow root node was given; otherwise, an undisclosed
        //  shadow exists, so look at light dom children as fallback BUT create a scope for any
        //  child candidates found because they're likely slotted elements (elements that are
        //  children of the web component element (which has the shadow), in the light dom, but
        //  slotted somewhere _inside_ the undisclosed shadow) -- the scope is created below,
        //  _after_ we return from this recursive call
        var _nestedCandidates = getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        // there's not shadow so just dig into the element's (light dom) children
        //  __without__ giving the element special scope treatment
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var getTabindex = function getTabindex(node, isScope) {
  if (node.tabIndex < 0) {
    // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
    // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
    // yet they are still part of the regular tab order; in FF, they get a default
    // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
    // order, consider their tab index to be 0.
    // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
    // so if they don't have a tabindex attribute specifically set, assume it's 0.
    //
    // isScope is positive for custom element with shadow root or slot that by default
    // have tabIndex -1, but need to be sorted by document order in order for their
    // content to be inserted in the correct position
    if ((isScope || /^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || node.isContentEditable) && isNaN(parseInt(node.getAttribute('tabindex'), 10))) {
      return 0;
    }
  }
  return node.tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput(node) {
  return node.tagName === 'INPUT';
};
var isHiddenInput = function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
};
var isDetailsWithSummary = function isDetailsWithSummary(node) {
  var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
    return child.tagName === 'SUMMARY';
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio(node) {
  return isInput(node) && node.type === 'radio';
};
var isNonTabbableRadio = function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
};

// determines if a node is ultimately attached to the window's document
var isNodeAttached = function isNodeAttached(node) {
  var _nodeRootHost;
  // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
  //  (but NOT _the_ document; see second 'If' comment below for more).
  // If rootNode is shadow root, it'll have a host, which is the element to which the shadow
  //  is attached, and the one we need to check if it's in the document or not (because the
  //  shadow, and all nodes it contains, is never considered in the document since shadows
  //  behave like self-contained DOMs; but if the shadow's HOST, which is part of the document,
  //  is hidden, or is not in the document itself but is detached, it will affect the shadow's
  //  visibility, including all the nodes it contains). The host could be any normal node,
  //  or a custom element (i.e. web component). Either way, that's the one that is considered
  //  part of the document, not the shadow root, nor any of its children (i.e. the node being
  //  tested).
  // To further complicate things, we have to look all the way up until we find a shadow HOST
  //  that is attached (or find none) because the node might be in nested shadows...
  // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
  //  document (per the docs) and while it's a Document-type object, that document does not
  //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
  //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
  //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
  //  node is actually detached.
  var nodeRootHost = getRootNode(node).host;
  var attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && _nodeRootHost.ownerDocument.contains(nodeRootHost) || node.ownerDocument.contains(node));
  while (!attached && nodeRootHost) {
    var _nodeRootHost2;
    // since it's not attached and we have a root host, the node MUST be in a nested shadow DOM,
    //  which means we need to get the host's host and check if that parent host is contained
    //  in (i.e. attached to) the document
    nodeRootHost = getRootNode(nodeRootHost).host;
    attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && _nodeRootHost2.ownerDocument.contains(nodeRootHost));
  }
  return attached;
};
var isZeroArea = function isZeroArea(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(),
    width = _node$getBoundingClie.width,
    height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden(node, _ref) {
  var displayCheck = _ref.displayCheck,
    getShadowRoot = _ref.getShadowRoot;
  // NOTE: visibility will be `undefined` if node is detached from the document
  //  (see notes about this further down), which means we will consider it visible
  //  (this is legacy behavior from a very long way back)
  // NOTE: we check this regardless of `displayCheck="none"` because this is a
  //  _visibility_ check, not a _display_ check
  if (getComputedStyle(node).visibility === 'hidden') {
    return true;
  }
  var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true;
  }
  if (!displayCheck || displayCheck === 'full' || displayCheck === 'legacy-full') {
    if (typeof getShadowRoot === 'function') {
      // figure out if we should consider the node to be in an undisclosed shadow and use the
      //  'non-zero-area' fallback
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
        ) {
          // node has an undisclosed shadow which means we can only treat it as a black box, so we
          //  fall back to a non-zero-area test
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          // iterate up slot
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          // cross shadow boundary
          node = rootNode.host;
        } else {
          // iterate up normal dom
          node = parentElement;
        }
      }
      node = originalNode;
    }
    // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
    //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
    //  it might be a falsy value, which means shadow DOM support is disabled

    // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
    //  now we can just test to see if it would normally be visible or not, provided it's
    //  attached to the main document.
    // NOTE: We must consider case where node is inside a shadow DOM and given directly to
    //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.

    if (isNodeAttached(node)) {
      // this works wherever the node is: if there's at least one client rect, it's
      //  somehow displayed; it also covers the CSS 'display: contents' case where the
      //  node itself is hidden in place of its contents; and there's no need to search
      //  up the hierarchy either
      return !node.getClientRects().length;
    }

    // Else, the node isn't attached to the document, which means the `getClientRects()`
    //  API will __always__ return zero rects (this can happen, for example, if React
    //  is used to render nodes onto a detached tree, as confirmed in this thread:
    //  https://github.com/facebook/react/issues/9117#issuecomment-284228870)
    //
    // It also means that even window.getComputedStyle(node).display will return `undefined`
    //  because styles are only computed for nodes that are in the document.
    //
    // NOTE: THIS HAS BEEN THE CASE FOR YEARS. It is not new, nor is it caused by tabbable
    //  somehow. Though it was never stated officially, anyone who has ever used tabbable
    //  APIs on nodes in detached containers has actually implicitly used tabbable in what
    //  was later (as of v5.2.0 on Apr 9, 2021) called `displayCheck="none"` mode -- essentially
    //  considering __everything__ to be visible because of the innability to determine styles.
    //
    // v6.0.0: As of this major release, the default 'full' option __no longer treats detached
    //  nodes as visible with the 'none' fallback.__
    if (displayCheck !== 'legacy-full') {
      return true; // hidden
    }
    // else, fallback to 'none' mode and consider the node visible
  } else if (displayCheck === 'non-zero-area') {
    // NOTE: Even though this tests that the node's client rect is non-zero to determine
    //  whether it's displayed, and that a detached node will __always__ have a zero-area
    //  client rect, we don't special-case for whether the node is attached or not. In
    //  this mode, we do want to consider nodes that have a zero area to be hidden at all
    //  times, and that includes attached or not.
    return isZeroArea(node);
  }

  // visible, as far as we can tell, or per current `displayCheck=none` mode, we assume
  //  it's visible
  return false;
};

// form fields (nested) inside a disabled fieldset are not focusable/tabbable
//  unless they are in the _first_ <legend> element of the top-most disabled
//  fieldset
var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    // check if `node` is contained in a disabled <fieldset>
    while (parentNode) {
      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
        // look for the first <legend> among the children of the disabled <fieldset>
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          // when the first <legend> (in document order) is found
          if (child.tagName === 'LEGEND') {
            // if its parent <fieldset> is not nested in another disabled <fieldset>,
            // return whether `node` is a descendant of its first <legend>
            return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
          }
        }
        // the disabled <fieldset> containing `node` has no <legend>
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }

  // else, node's tabbable/focusable state should not be affected by a fieldset's
  //  enabled/disabled state
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options) ||
  // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
  if (isNonTabbableRadio(node) || getTabindex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute('tabindex'), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  // If a custom element has an explicit negative tabindex,
  // browsers will not allow tab targeting said element's children.
  return false;
};

/**
 * @param {Array.<Element|CandidateScope>} candidates
 * @returns Element[]
 */
var sortByOrder = function sortByOrder(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function (item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getTabindex(element, isScope);
    var elements = isScope ? sortByOrder(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item: item,
        isScope: isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function (acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable(el, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var focusable = function focusable(el, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }
  return candidates;
};
var isTabbable = function isTabbable(node, options) {
  options = options || {};
  if (!node) {
    throw new Error('No node provided');
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
var focusableCandidateSelector = /* #__PURE__ */candidateSelectors.concat('iframe').join(',');
var isFocusable = function isFocusable(node, options) {
  options = options || {};
  if (!node) {
    throw new Error('No node provided');
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};

/*!
* focus-trap 7.0.0
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var activeFocusTraps = function () {
  var trapQueue = [];
  return {
    activateTrap: function activateTrap(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];

        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trap) {
      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
}();

var isSelectableInput = function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
};

var isEscapeEvent = function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
};

var isTabEvent = function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
};

var delay = function delay(fn) {
  return setTimeout(fn, 0);
}; // Array.find/findIndex() are not supported on IE; this replicates enough
//  of Array.findIndex() for our needs


var findIndex = function findIndex(arr, fn) {
  var idx = -1;
  arr.every(function (value, i) {
    if (fn(value)) {
      idx = i;
      return false; // break
    }

    return true; // next
  });
  return idx;
};
/**
 * Get an option's value when it could be a plain value, or a handler that provides
 *  the value.
 * @param {*} value Option's value to check.
 * @param {...*} [params] Any parameters to pass to the handler, if `value` is a function.
 * @returns {*} The `value`, or the handler's returned value.
 */


var valueOrHandler = function valueOrHandler(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return typeof value === 'function' ? value.apply(void 0, params) : value;
};

var getActualTarget = function getActualTarget(event) {
  // NOTE: If the trap is _inside_ a shadow DOM, event.target will always be the
  //  shadow host. However, event.target.composedPath() will be an array of
  //  nodes "clicked" from inner-most (the actual element inside the shadow) to
  //  outer-most (the host HTML document). If we have access to composedPath(),
  //  then use its first element; otherwise, fall back to event.target (and
  //  this only works for an _open_ shadow DOM; otherwise,
  //  composedPath()[0] === event.target always).
  return event.target.shadowRoot && typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target;
};

var createFocusTrap = function createFocusTrap(elements, userOptions) {
  // SSR: a live trap shouldn't be created in this type of environment so this
  //  should be safe code to execute if the `document` option isn't specified
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;

  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true
  }, userOptions);

  var state = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   firstTabbableNode: HTMLElement|null,
    //   lastTabbableNode: HTMLElement|null,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: undefined
  };
  var trap; // eslint-disable-line prefer-const -- some private functions reference it, and its methods reference private functions, so we must declare here and define later

  /**
   * Gets a configuration option value.
   * @param {Object|undefined} configOverrideOptions If true, and option is defined in this set,
   *  value will be taken from this object. Otherwise, value will be taken from base configuration.
   * @param {string} optionName Name of the option whose value is sought.
   * @param {string|undefined} [configOptionName] Name of option to use __instead of__ `optionName`
   *  IIF `configOverrideOptions` is not defined. Otherwise, `optionName` is used.
   */

  var getOption = function getOption(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== undefined ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };
  /**
   * Finds the index of the container that contains the element.
   * @param {HTMLElement} element
   * @returns {number} Index of the container in either `state.containers` or
   *  `state.containerGroups` (the order/length of these lists are the same); -1
   *  if the element isn't found.
   */


  var findContainerIndex = function findContainerIndex(element) {
    // NOTE: search `containerGroups` because it's possible a group contains no tabbable
    //  nodes, but still contains focusable nodes (e.g. if they all have `tabindex=-1`)
    //  and we still need to find the element in there
    return state.containerGroups.findIndex(function (_ref) {
      var container = _ref.container,
          tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      tabbableNodes.find(function (node) {
        return node === element;
      });
    });
  };
  /**
   * Gets the node for the given option, which is expected to be an option that
   *  can be either a DOM node, a string that is a selector to get a node, `false`
   *  (if a node is explicitly NOT given), or a function that returns any of these
   *  values.
   * @param {string} optionName
   * @returns {undefined | false | HTMLElement | SVGElement} Returns
   *  `undefined` if the option is not specified; `false` if the option
   *  resolved to `false` (node explicitly not given); otherwise, the resolved
   *  DOM node.
   * @throws {Error} If the option is set, not `false`, and is not, or does not
   *  resolve to a node.
   */


  var getNodeForOption = function getNodeForOption(optionName) {
    var optionValue = config[optionName];

    if (typeof optionValue === 'function') {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }

      optionValue = optionValue.apply(void 0, params);
    }

    if (optionValue === true) {
      optionValue = undefined; // use default value
    }

    if (!optionValue) {
      if (optionValue === undefined || optionValue === false) {
        return optionValue;
      } // else, empty string (invalid), null (invalid), 0 (invalid)


      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }

    var node = optionValue; // could be HTMLElement, SVGElement, or non-empty string at this point

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue); // resolve to node, or null if fails

      if (!node) {
        throw new Error("`".concat(optionName, "` as selector refers to no known node"));
      }
    }

    return node;
  };

  var getInitialFocusNode = function getInitialFocusNode() {
    var node = getNodeForOption('initialFocus'); // false explicitly indicates we want no initialFocus at all

    if (node === false) {
      return false;
    }

    if (node === undefined) {
      // option not specified: use fallback options
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode; // NOTE: `fallbackFocus` option function cannot return `false` (not supported)

        node = firstTabbableNode || getNodeForOption('fallbackFocus');
      }
    }

    if (!node) {
      throw new Error('Your focus-trap needs to have at least one focusable element');
    }

    return node;
  };

  var updateTabbableNodes = function updateTabbableNodes() {
    state.containerGroups = state.containers.map(function (container) {
      var tabbableNodes = tabbable(container, config.tabbableOptions); // NOTE: if we have tabbable nodes, we must have focusable nodes; focusable nodes
      //  are a superset of tabbable nodes

      var focusableNodes = focusable(container, config.tabbableOptions);
      return {
        container: container,
        tabbableNodes: tabbableNodes,
        focusableNodes: focusableNodes,
        firstTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[0] : null,
        lastTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : null,

        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          // NOTE: If tabindex is positive (in order to manipulate the tab order separate
          //  from the DOM order), this __will not work__ because the list of focusableNodes,
          //  while it contains tabbable nodes, does not sort its nodes in any order other
          //  than DOM order, because it can't: Where would you place focusable (but not
          //  tabbable) nodes in that order? They have no order, because they aren't tabbale...
          // Support for positive tabindex is already broken and hard to manage (possibly
          //  not supportable, TBD), so this isn't going to make things worse than they
          //  already are, and at least makes things better for the majority of cases where
          //  tabindex is either 0/unset or negative.
          // FYI, positive tabindex issue: https://github.com/focus-trap/focus-trap/issues/375
          var nodeIdx = focusableNodes.findIndex(function (n) {
            return n === node;
          });

          if (nodeIdx < 0) {
            return undefined;
          }

          if (forward) {
            return focusableNodes.slice(nodeIdx + 1).find(function (n) {
              return isTabbable(n, config.tabbableOptions);
            });
          }

          return focusableNodes.slice(0, nodeIdx).reverse().find(function (n) {
            return isTabbable(n, config.tabbableOptions);
          });
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function (group) {
      return group.tabbableNodes.length > 0;
    }); // throw if no groups have tabbable nodes and we don't have a fallback focus node either

    if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus') // returning false not supported for this option
    ) {
      throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times');
    }
  };

  var tryFocus = function tryFocus(node) {
    if (node === false) {
      return;
    }

    if (node === doc.activeElement) {
      return;
    }

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  };

  var getReturnFocusNode = function getReturnFocusNode(previousActiveElement) {
    var node = getNodeForOption('setReturnFocus', previousActiveElement);
    return node ? node : node === false ? false : previousActiveElement;
  }; // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.


  var checkPointerDown = function checkPointerDown(e) {
    var target = getActualTarget(e);

    if (findContainerIndex(target) >= 0) {
      // allow the click since it ocurred inside the trap
      return;
    }

    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      // immediately deactivate the trap
      trap.deactivate({
        // if, on deactivation, we should return focus to the node originally-focused
        //  when the trap was activated (or the configured `setReturnFocus` node),
        //  then assume it's also OK to return focus to the outside node that was
        //  just clicked, causing deactivation, as long as that node is focusable;
        //  if it isn't focusable, then return focus to the original node focused
        //  on activation (or the configured `setReturnFocus` node)
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked, whether it's focusable or not; by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node)
        returnFocus: config.returnFocusOnDeactivate && !isFocusable(target, config.tabbableOptions)
      });
      return;
    } // This is needed for mobile devices.
    // (If we'll only let `click` events through,
    // then on mobile they will be blocked anyways if `touchstart` is blocked.)


    if (valueOrHandler(config.allowOutsideClick, e)) {
      // allow the click outside the trap to take place
      return;
    } // otherwise, prevent the click


    e.preventDefault();
  }; // In case focus escapes the trap for some strange reason, pull it back in.


  var checkFocusIn = function checkFocusIn(e) {
    var target = getActualTarget(e);
    var targetContained = findContainerIndex(target) >= 0; // In Firefox when you Tab out of an iframe the Document is briefly focused.

    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      // escaped! pull it back in to where it just left
      e.stopImmediatePropagation();
      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
    }
  }; // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.


  var checkTab = function checkTab(e) {
    var target = getActualTarget(e);
    updateTabbableNodes();
    var destinationNode = null;

    if (state.tabbableGroups.length > 0) {
      // make sure the target is actually contained in a group
      // NOTE: the target may also be the container itself if it's focusable
      //  with tabIndex='-1' and was given initial focus
      var containerIndex = findContainerIndex(target);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : undefined;

      if (containerIndex < 0) {
        // target not found in any group: quite possible focus has escaped the trap,
        //  so bring it back in to...
        if (e.shiftKey) {
          // ...the last node in the last group
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          // ...the first node in the first group
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (e.shiftKey) {
        // REVERSE
        // is the target the first tabbable node in a group?
        var startOfGroupIndex = findIndex(state.tabbableGroups, function (_ref2) {
          var firstTabbableNode = _ref2.firstTabbableNode;
          return target === firstTabbableNode;
        });

        if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          // an exception case where the target is either the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle shift+tab as if focus were on the container's
          //  first tabbable node, and go to the last tabbable node of the LAST group
          startOfGroupIndex = containerIndex;
        }

        if (startOfGroupIndex >= 0) {
          // YES: then shift+tab should go to the last tabbable node in the
          //  previous group (and wrap around to the last tabbable node of
          //  the LAST group if it's the first tabbable node of the FIRST group)
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.lastTabbableNode;
        }
      } else {
        // FORWARD
        // is the target the last tabbable node in a group?
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function (_ref3) {
          var lastTabbableNode = _ref3.lastTabbableNode;
          return target === lastTabbableNode;
        });

        if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          // an exception case where the target is the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle tab as if focus were on the container's
          //  last tabbable node, and go to the first tabbable node of the FIRST group
          lastOfGroupIndex = containerIndex;
        }

        if (lastOfGroupIndex >= 0) {
          // YES: then tab should go to the first tabbable node in the next
          //  group (and wrap around to the first tabbable node of the FIRST
          //  group if it's the last tabbable node of the LAST group)
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;

          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = _destinationGroup.firstTabbableNode;
        }
      }
    } else {
      // NOTE: the fallbackFocus option does not support returning false to opt-out
      destinationNode = getNodeForOption('fallbackFocus');
    }

    if (destinationNode) {
      e.preventDefault();
      tryFocus(destinationNode);
    } // else, let the browser take care of [shift+]tab and move the focus

  };

  var checkKey = function checkKey(e) {
    if (isEscapeEvent(e) && valueOrHandler(config.escapeDeactivates, e) !== false) {
      e.preventDefault();
      trap.deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  };

  var checkClick = function checkClick(e) {
    var target = getActualTarget(e);

    if (findContainerIndex(target) >= 0) {
      return;
    }

    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }

    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();
  }; //
  // EVENT LISTENERS
  //


  var addListeners = function addListeners() {
    if (!state.active) {
      return;
    } // There can be only one listening focus trap at a time


    activeFocusTraps.activateTrap(trap); // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.

    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function () {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };

  var removeListeners = function removeListeners() {
    if (!state.active) {
      return;
    }

    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    return trap;
  }; //
  // TRAP DEFINITION
  //


  trap = {
    get active() {
      return state.active;
    },

    get paused() {
      return state.paused;
    },

    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }

      var onActivate = getOption(activateOptions, 'onActivate');
      var onPostActivate = getOption(activateOptions, 'onPostActivate');
      var checkCanFocusTrap = getOption(activateOptions, 'checkCanFocusTrap');

      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }

      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;

      if (onActivate) {
        onActivate();
      }

      var finishActivation = function finishActivation() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }

        addListeners();

        if (onPostActivate) {
          onPostActivate();
        }
      };

      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }

      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }

      var options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus
      }, deactivateOptions);

      clearTimeout(state.delayInitialFocusTimer); // noop if undefined

      state.delayInitialFocusTimer = undefined;
      removeListeners();
      state.active = false;
      state.paused = false;
      activeFocusTraps.deactivateTrap(trap);
      var onDeactivate = getOption(options, 'onDeactivate');
      var onPostDeactivate = getOption(options, 'onPostDeactivate');
      var checkCanReturnFocus = getOption(options, 'checkCanReturnFocus');
      var returnFocus = getOption(options, 'returnFocus', 'returnFocusOnDeactivate');

      if (onDeactivate) {
        onDeactivate();
      }

      var finishDeactivation = function finishDeactivation() {
        delay(function () {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }

          if (onPostDeactivate) {
            onPostDeactivate();
          }
        });
      };

      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }

      finishDeactivation();
      return this;
    },
    pause: function pause() {
      if (state.paused || !state.active) {
        return this;
      }

      state.paused = true;
      removeListeners();
      return this;
    },
    unpause: function unpause() {
      if (!state.paused || !state.active) {
        return this;
      }

      state.paused = false;
      updateTabbableNodes();
      addListeners();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function (element) {
        return typeof element === 'string' ? doc.querySelector(element) : element;
      });

      if (state.active) {
        updateTabbableNodes();
      }

      return this;
    }
  }; // initialize container elements

  trap.updateContainerElements(elements);
  return trap;
};

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const l$1={base:"esri-identity-modal",open:"esri-identity-modal--open",closed:"esri-identity-modal--closed",title:"esri-identity-modal__title",dialog:"esri-identity-modal__dialog",content:"esri-identity-modal__content",closeButton:"esri-identity-modal__close-button",iconClose:"esri-icon-close"};let p$2=class extends M{constructor(t,e){super(t,e),this.container=document.createElement("div"),this.content=null,this.open=!1,this._focusTrap=null,this._close=()=>{this.open=!1;},document.body.appendChild(this.container),this.addHandles(l$4((()=>this.open),(()=>this._toggleFocusTrap())));}destroy(){this._destroyFocusTrap();}get title(){return this.messages?.auth.signIn}render(){const t=this.id,{open:e,content:o,title:s,messages:i}=this,r=e&&!!o,n={[l$1.open]:r,[l$1.closed]:!r},a=n$1("button",{class:l$1.closeButton,"aria-label":i.close,title:i.close,bind:this,onclick:this._close,type:"button"},n$1("span",{"aria-hidden":"true",class:l$1.iconClose})),d=`${t}_title`,p=`${t}_content`,u=s?n$1("h1",{id:d,class:l$1.title},s):null,m=r?n$1("div",{bind:this,class:l$1.dialog,role:"dialog","aria-labelledby":d,"aria-describedby":p,afterCreate:this._createFocusTrap},a,u,this._renderContent(p)):null;return n$1("div",{tabIndex:-1,class:this.classes(l$1.base,n)},m)}_destroyFocusTrap(){this._focusTrap?.deactivate({onDeactivate:()=>{}}),this._focusTrap=null;}_toggleFocusTrap(){const{_focusTrap:t,open:e}=this;t&&(e?t.activate():t.deactivate());}_createFocusTrap(t){this._destroyFocusTrap();const o=requestAnimationFrame((()=>{this._focusTrap=createFocusTrap(t,{initialFocus:"input",onDeactivate:this._close}),this._toggleFocusTrap();}));this.addHandles(n$j((()=>cancelAnimationFrame(o))));}_renderContent(t){const e=this.content;return "string"==typeof e?n$1("div",{class:l$1.content,id:t,innerHTML:e}):e$2(e)?n$1("div",{class:l$1.content,id:t},e.render()):e instanceof HTMLElement?n$1("div",{class:l$1.content,id:t,bind:e,afterCreate:this._attachToNode}):null}_attachToNode(t){const e=this;t.appendChild(e);}};e$m([y$7({readOnly:!0})],p$2.prototype,"container",void 0),e$m([y$7()],p$2.prototype,"content",void 0),e$m([y$7()],p$2.prototype,"open",void 0),e$m([y$7(),e$4("esri/t9n/common")],p$2.prototype,"messages",void 0),e$m([y$7()],p$2.prototype,"title",null),p$2=e$m([n$b("esri.identity.IdentityModal")],p$2);const u$2=p$2;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const t$1="esriJSAPIOAuth";class e$1{constructor(t,e){this.oAuthInfo=null,this.storage=null,this.appId=null,this.codeVerifier=null,this.expires=null,this.refreshToken=null,this.ssl=null,this.stateUID=null,this.token=null,this.userId=null,this.oAuthInfo=t,this.storage=e,this._init();}isValid(){let t=!1;if(this.oAuthInfo&&this.userId&&(this.refreshToken||this.token))if(null==this.expires&&this.refreshToken)t=!0;else if(this.expires){const e=Date.now();if(this.expires>e){(this.expires-e)/1e3>60*this.oAuthInfo.minTimeUntilExpiration&&(t=!0);}}return t}save(){if(!this.storage)return !1;const e=this._load(),s=this.oAuthInfo;if(s&&s.authNamespace&&s.portalUrl){let r=e[s.authNamespace];r||(r=e[s.authNamespace]={}),this.appId||(this.appId=s.appId),r[s.portalUrl]={appId:this.appId,codeVerifier:this.codeVerifier,expires:this.expires,refreshToken:this.refreshToken,ssl:this.ssl,stateUID:this.stateUID,token:this.token,userId:this.userId};try{this.storage.setItem(t$1,JSON.stringify(e));}catch(i){return console.warn(i),!1}return !0}return !1}destroy(){const e=this._load(),s=this.oAuthInfo;if(s&&s.appId&&s.portalUrl&&(null==this.expires||this.expires>Date.now())&&(this.refreshToken||this.token)){const t=s.portalUrl.replace(/^http:/i,"https:")+"/sharing/rest/oauth2/revokeToken",e=new FormData;if(e.append("f","json"),e.append("auth_token",this.refreshToken||this.token),e.append("client_id",s.appId),e.append("token_type_hint",this.refreshToken?"refresh_token":"access_token"),"function"==typeof navigator.sendBeacon)navigator.sendBeacon(t,e);else {const s=new XMLHttpRequest;s.open("POST",t),s.send(e);}}if(s&&s.authNamespace&&s.portalUrl&&this.storage){const r=e[s.authNamespace];if(r){delete r[s.portalUrl];try{this.storage.setItem(t$1,JSON.stringify(e));}catch(i){console.log(i);}}}s&&(s._oAuthCred=null,this.oAuthInfo=null);}_init(){const t=this._load(),e=this.oAuthInfo;if(e&&e.authNamespace&&e.portalUrl){let s=t[e.authNamespace];s&&(s=s[e.portalUrl],s&&(this.appId=s.appId,this.codeVerifier=s.codeVerifier,this.expires=s.expires,this.refreshToken=s.refreshToken,this.ssl=s.ssl,this.stateUID=s.stateUID,this.token=s.token,this.userId=s.userId));}}_load(){let e={};if(this.storage){const i=this.storage.getItem(t$1);if(i)try{e=JSON.parse(i);}catch(s){console.warn(s);}}return e}}e$1.prototype.declaredClass="esri.identity.OAuthCredential";

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
class s$4{constructor(){this._values=new Map,this.multipleOriginsSupported=!1;}clone(e){const t=new s$4;return this._values.forEach(((s,r)=>{e&&e.has(r)||t.set(r,y$c(s.value),s.origin);})),t}get(i,e){e=this._normalizeOrigin(e);const s=this._values.get(i);return null==e||s?.origin===e?s?.value:void 0}originOf(i){return this._values.get(i)?.origin??r$b.USER}keys(i){i=this._normalizeOrigin(i);const e=[...this._values.keys()];return null==i?e:e.filter((e=>this._values.get(e)?.origin===i))}set(i,s,r){if((r=this._normalizeOrigin(r))===r$b.DEFAULTS){const e=this._values.get(i);if(e&&null!=e.origin&&e.origin>r)return}this._values.set(i,new t(s,r));}delete(i,e){null!=(e=this._normalizeOrigin(e))&&this._values.get(i)?.origin!==e||this._values.delete(i);}has(i,e){return null!=(e=this._normalizeOrigin(e))?this._values.get(i)?.origin===e:this._values.has(i)}forEach(i){this._values.forEach((({value:e},s)=>i(e,s)));}_normalizeOrigin(i){if(null!=i)return i===r$b.DEFAULTS?i:r$b.USER}}class t{constructor(i,e){this.value=i,this.origin=e;}}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function e(e,r,n){r.keys().forEach((e=>{n.set(e,r.get(e),r$b.DEFAULTS);}));const o=e.metadatas;Object.keys(o).forEach((r=>{e.internalGet(r)&&n.set(r,e.internalGet(r),r$b.DEFAULTS);}));}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function s$3(e,r,n){if(!e||!e.read||!1===e.read.enabled||!e.read.source)return !1;const o=e.read.source;if("string"==typeof o){if(o===r)return !0;if(o.includes(".")&&0===o.indexOf(r)&&s$j(o,n))return !0}else for(const s of o){if(s===r)return !0;if(s.includes(".")&&0===s.indexOf(r)&&s$j(s,n))return !0}return !1}function i$2(e){return e&&(!e.read||!1!==e.read.enabled&&!e.read.source)}function a$1(e,t,r,o,a){let f=t$7(t[r],a);i$2(f)&&(e[r]=!0);for(const i of Object.getOwnPropertyNames(t))f=t$7(t[i],a),s$3(f,r,o)&&(e[i]=!0);}function f$1(e,t,r,n){const s=r.metadatas,i=a$6(s[t],"any",n),a=i&&i.default;if(void 0===a)return;const f="function"==typeof a?a.call(e,t,n):a;void 0!==f&&r.set(t,f);}const c$1={origin:"service"};function u$1(t,o,s=c$1){if(!o||"object"!=typeof o)return;const i=e$l(t),u=i.metadatas,d={};for(const e of Object.getOwnPropertyNames(o))a$1(d,u,e,o,s);i.setDefaultOrigin(s.origin);for(const r of Object.getOwnPropertyNames(d)){const a=t$7(u[r],s).read,f=a&&a.source;let c;c=f&&"string"==typeof f?u$c(o,f):o[r],a&&a.reader&&(c=a.reader.call(t,c,o,s)),void 0!==c&&i.set(r,c);}if(!s||!s.ignoreDefaults){i.setDefaultOrigin("defaults");for(const e of Object.getOwnPropertyNames(u))d[e]||f$1(t,e,i,s);}i.setDefaultOrigin("user");}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
function a(r,e,t,i,o){const n={};return e.write?.writer?.call(r,i,n,t,o),n}function f(r,i,s,u,l,a){if(!u||!u.write)return !1;const f=r.get(s);if(!l&&u.write.overridePolicy){const e=u.write.overridePolicy.call(r,f,s,a);void 0!==e&&(l=e);}if(l||(l=u.write),!l||!1===l.enabled)return !1;if((null===f&&!l.allowNull&&!l.writerEnsuresNonNull||void 0===f)&&l.isRequired){const i=new s$m("web-document-write:property-required",`Missing value for required property '${s}' on '${r.declaredClass}'`,{propertyName:s,target:r});return i&&a&&a.messages?a.messages.push(i):i&&!a&&s$l.getLogger("esri.core.accessorSupport.write").error(i.name,i.message),!1}if(void 0===f)return !1;if(null===f&&!l.allowNull&&!l.writerEnsuresNonNull)return !1;if((!i.store.multipleOriginsSupported||i.store.originOf(s)===r$b.DEFAULTS)&&p$1(r,s,a,u,f))return !1;if(!l.ignoreOrigin&&a&&a.origin&&i.store.multipleOriginsSupported){if(i.store.originOf(s)<t$h(a.origin))return !1}return !0}function p$1(e,t,i,o,n){const s=o.default;if(void 0===s)return !1;if(null!=o.defaultEquals)return o.defaultEquals(n);if("function"==typeof s){if(Array.isArray(n)){const o=s.call(e,t,i);return i$i(o,n)}return !1}return s===n}function c(r,e,t){if(r&&"function"==typeof r.toJSON&&(!r.toJSON.isDefaultToJSON||!r.write))return o$g(e,r.toJSON(t));const o=e$l(r),n=o.metadatas;for(const s in n){const p=s$a(n[s],t);if(!f(r,o,s,p,void 0,t))continue;const g=r.get(s),c=a(r,p,p.write&&"string"==typeof p.write.target?p.write.target:s,g,t);Object.keys(c).length>0&&(e=o$g(e,c),t?.resources?.pendingOperations?.length&&Promise.all(t.resources.pendingOperations).then((()=>o$g(e,c))),t&&t.writtenProperties&&t.writtenProperties.push({target:r,propName:s,oldOrigin:c$c(o.store.originOf(s)),newOrigin:t.origin}));}return e}

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const u=t=>{let u=class extends t{constructor(...r){super(...r);const t=x$2(e$l(this)),i=t.store,p=new s$4;t.store=p,e(t,i,p);}read(r,t){u$1(this,r,t);}write(r={},t){return c(this,r,t)}toJSON(r){return this.write({},r)}static fromJSON(r,t){return n.call(this,r,t)}};return u=e$m([n$b("esri.core.JSONSupport")],u),u.prototype.toJSON.isDefaultToJSON=!0,u};function n(r,t){if(!r)return null;if(r.declaredClass)throw new Error("JSON object is already hydrated");const s=new this;return s.read(r,t),s}let l=class extends(u(m$3)){};l=e$m([n$b("esri.core.JSONSupport")],l);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
var p;let s$2=p=class extends l{constructor(o){super(o),this._oAuthCred=null,this.appId=null,this.authNamespace="/",this.expiration=20160,this.flowType="auto",this.forceLogin=!1,this.forceUserId=!1,this.locale=null,this.minTimeUntilExpiration=30,this.popup=!1,this.popupCallbackUrl="oauth-callback.html",this.popupWindowFeatures="height=490,width=800,resizable,scrollbars,status",this.portalUrl="https://www.arcgis.com",this.preserveUrlHash=!1,this.userId=null;}clone(){return p.fromJSON(this.toJSON())}};e$m([y$7({json:{write:!0}})],s$2.prototype,"appId",void 0),e$m([y$7({json:{write:!0}})],s$2.prototype,"authNamespace",void 0),e$m([y$7({json:{write:!0}})],s$2.prototype,"expiration",void 0),e$m([y$7({json:{write:!0}})],s$2.prototype,"flowType",void 0),e$m([y$7({json:{write:!0}})],s$2.prototype,"forceLogin",void 0),e$m([y$7({json:{write:!0}})],s$2.prototype,"forceUserId",void 0),e$m([y$7({json:{write:!0}})],s$2.prototype,"locale",void 0),e$m([y$7({json:{write:!0}})],s$2.prototype,"minTimeUntilExpiration",void 0),e$m([y$7({json:{write:!0}})],s$2.prototype,"popup",void 0),e$m([y$7({json:{write:!0}})],s$2.prototype,"popupCallbackUrl",void 0),e$m([y$7({json:{write:!0}})],s$2.prototype,"popupWindowFeatures",void 0),e$m([y$7({json:{write:!0}})],s$2.prototype,"portalUrl",void 0),e$m([y$7({json:{write:!0}})],s$2.prototype,"preserveUrlHash",void 0),e$m([y$7({json:{write:!0}})],s$2.prototype,"userId",void 0),s$2=p=e$m([n$b("esri.identity.OAuthInfo")],s$2);const i$1=s$2;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
let s$1=class extends l{constructor(o){super(o),this.adminTokenServiceUrl=null,this.currentVersion=null,this.hasPortal=null,this.hasServer=null,this.owningSystemUrl=null,this.owningTenant=null,this.server=null,this.shortLivedTokenValidity=null,this.tokenServiceUrl=null,this.webTierAuth=null;}};e$m([y$7({json:{write:!0}})],s$1.prototype,"adminTokenServiceUrl",void 0),e$m([y$7({json:{write:!0}})],s$1.prototype,"currentVersion",void 0),e$m([y$7({json:{write:!0}})],s$1.prototype,"hasPortal",void 0),e$m([y$7({json:{write:!0}})],s$1.prototype,"hasServer",void 0),e$m([y$7({json:{write:!0}})],s$1.prototype,"owningSystemUrl",void 0),e$m([y$7({json:{write:!0}})],s$1.prototype,"owningTenant",void 0),e$m([y$7({json:{write:!0}})],s$1.prototype,"server",void 0),e$m([y$7({json:{write:!0}})],s$1.prototype,"shortLivedTokenValidity",void 0),e$m([y$7({json:{write:!0}})],s$1.prototype,"tokenServiceUrl",void 0),e$m([y$7({json:{write:!0}})],s$1.prototype,"webTierAuth",void 0),s$1=e$m([n$b("esri.identity.ServerInfo")],s$1);const i=s$1;

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
const C={},b=e=>{const t=new y$d(e.owningSystemUrl).host,r=new y$d(e.server).host,s=/.+\.arcgis\.com$/i;return s.test(t)&&s.test(r)},D=(e,t)=>!!(b(e)&&t&&t.some((t=>t.test(e.server))));let q=null,j=null;try{q=window.localStorage,j=window.sessionStorage;}catch{}class E extends n$a{constructor(){super(),this._portalConfig=globalThis.esriGeowConfig,this.serverInfos=[],this.oAuthInfos=[],this.credentials=[],this._soReqs=[],this._xoReqs=[],this._portals=[],this._defaultOAuthInfo=null,this._defaultTokenValidity=60,this.dialog=null,this.formConstructor=d,this.tokenValidity=null,this.normalizeWebTierAuth=!1,this._appOrigin="null"!==window.origin?window.origin:window.location.origin,this._appUrlObj=j$9(window.location.href),this._busy=null,this._rejectOnPersistedPageShow=!1,this._oAuthLocationParams=null,this._gwTokenUrl="/sharing/rest/generateToken",this._agsRest="/rest/services",this._agsPortal=/\/sharing(\/|$)/i,this._agsAdmin=/(https?:\/\/[^\/]+\/[^\/]+)\/admin\/?(\/.*)?$/i,this._adminSvcs=/\/rest\/admin\/services(\/|$)/i,this._gwDomains=[{regex:/^https?:\/\/www\.arcgis\.com/i,customBaseUrl:"maps.arcgis.com",tokenServiceUrl:"https://www.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/(?:dev|[a-z\d-]+\.mapsdev)\.arcgis\.com/i,customBaseUrl:"mapsdev.arcgis.com",tokenServiceUrl:"https://dev.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/(?:devext|[a-z\d-]+\.mapsdevext)\.arcgis\.com/i,customBaseUrl:"mapsdevext.arcgis.com",tokenServiceUrl:"https://devext.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/(?:qaext|[a-z\d-]+\.mapsqa)\.arcgis\.com/i,customBaseUrl:"mapsqa.arcgis.com",tokenServiceUrl:"https://qaext.arcgis.com/sharing/rest/generateToken"},{regex:/^https?:\/\/[a-z\d-]+\.maps\.arcgis\.com/i,customBaseUrl:"maps.arcgis.com",tokenServiceUrl:"https://www.arcgis.com/sharing/rest/generateToken"}],this._legacyFed=[],this._regexSDirUrl=/http.+\/rest\/services\/?/gi,this._regexServerType=/(\/(FeatureServer|GPServer|GeoDataServer|GeocodeServer|GeoenrichmentServer|GeometryServer|GlobeServer|ImageServer|KnowledgeGraphServer|MapServer|MobileServer|NAServer|NetworkDiagramServer|OGCFeatureServer|ParcelFabricServer|RelationalCatalogServer|SceneServer|StreamServer|UtilityNetworkServer|ValidationServer|VectorTileServer|VersionManagementServer)).*/gi,this._gwUser=/http.+\/users\/([^\/]+)\/?.*/i,this._gwItem=/http.+\/items\/([^\/]+)\/?.*/i,this._gwGroup=/http.+\/groups\/([^\/]+)\/?.*/i,this._rePortalTokenSvc=/\/sharing(\/rest)?\/generatetoken/i,this._createDefaultOAuthInfo=!0,this._hasTestedIfAppIsOnPortal=!1,this._getOAuthLocationParams(),window.addEventListener("pageshow",(e=>{this._pageShowHandler(e);}));}registerServers(e){const t=this.serverInfos;t?(e=e.filter((e=>!this.findServerInfo(e.server))),this.serverInfos=t.concat(e)):this.serverInfos=e,e.forEach((e=>{e.owningSystemUrl&&this._portals.push(e.owningSystemUrl),e.hasPortal&&this._portals.push(e.server);}));}registerOAuthInfos(e){const t=this.oAuthInfos;if(t){for(const r of e){const e=this.findOAuthInfo(r.portalUrl);e&&t.splice(t.indexOf(e),1);}this.oAuthInfos=t.concat(e);}else this.oAuthInfos=e;}registerToken(e){e={...e};const t=this._sanitizeUrl(e.server),r=this._isServerRsrc(t);let s,i$1=this.findServerInfo(t),o=!0;i$1||(i$1=new i,i$1.server=this._getServerInstanceRoot(t),r?i$1.hasServer=!0:(i$1.tokenServiceUrl=this._getTokenSvcUrl(t),i$1.hasPortal=!0),this.registerServers([i$1])),s=this._findCredential(t),s?(delete e.server,Object.assign(s,e),o=!1):(s=new L({userId:e.userId,server:i$1.server,token:e.token,expires:e.expires,ssl:e.ssl,scope:r?"server":"portal"}),s.resources=[t],this.credentials.push(s)),s.emitTokenChange(!1),o||s.refreshServerTokens();}toJSON(){return p$f({serverInfos:this.serverInfos.map((e=>e.toJSON())),oAuthInfos:this.oAuthInfos.map((e=>e.toJSON())),credentials:this.credentials.map((e=>e.toJSON()))})}initialize(e){if(!e)return;"string"==typeof e&&(e=JSON.parse(e));const t=e.serverInfos,r=e.oAuthInfos,s=e.credentials;if(t){const e=[];t.forEach((t=>{t.server&&t.tokenServiceUrl&&e.push(t.declaredClass?t:new i(t));})),e.length&&this.registerServers(e);}if(r){const e=[];r.forEach((t=>{t.appId&&e.push(t.declaredClass?t:new i$1(t));})),e.length&&this.registerOAuthInfos(e);}s&&s.forEach((e=>{e.server&&e.token&&e.expires&&e.expires>Date.now()&&((e=e.declaredClass?e:new L(e)).emitTokenChange(),this.credentials.push(e));}));}findServerInfo(e){let t;e=this._sanitizeUrl(e);for(const r of this.serverInfos)if(this._hasSameServerInstance(r.server,e)){t=r;break}return t}findOAuthInfo(e){let t;e=this._sanitizeUrl(e);for(const r of this.oAuthInfos)if(this._hasSameServerInstance(r.portalUrl,e)){t=r;break}return t}findCredential(e,t){if(!e)return;let r;e=this._sanitizeUrl(e);const s=this._isServerRsrc(e)?"server":"portal";if(t){for(const i of this.credentials)if(this._hasSameServerInstance(i.server,e)&&t===i.userId&&i.scope===s){r=i;break}}else for(const i of this.credentials)if(this._hasSameServerInstance(i.server,e)&&-1!==this._getIdenticalSvcIdx(e,i)&&i.scope===s){r=i;break}return r}getCredential(e,t){let r,s,o=!0;t&&(r=!!t.token,s=t.error,o=!1!==t.prompt),t={...t},e=this._sanitizeUrl(e);const n=new AbortController,a=D$4();if(t.signal&&v$7(t.signal,(()=>{n.abort();})),v$7(n,(()=>{a.reject(new s$m("identity-manager:user-aborted","ABORTED"));})),p$g(n))return a.promise;t.signal=n.signal;const h=this._isAdminResource(e),u=r?this.findCredential(e):null;let p;if(u&&s&&s.details&&498===s.details.httpStatus)u.destroy();else if(u)return p=new s$m("identity-manager:not-authorized","You are currently signed in as: '"+u.userId+"'. You do not have access to this resource: "+e,{error:s}),a.reject(p),a.promise;const f=this._findCredential(e,t);if(f)return a.resolve(f),a.promise;let g=this.findServerInfo(e);if(g)!g.hasServer&&this._isServerRsrc(e)&&(g._restInfoPms=this._getTokenSvcUrl(e),g.hasServer=!0);else {const t=this._getTokenSvcUrl(e);if(!t)return p=new s$m("identity-manager:unknown-resource","Unknown resource - could not find token service endpoint."),a.reject(p),a.promise;g=new i,g.server=this._getServerInstanceRoot(e),"string"==typeof t?(g.tokenServiceUrl=t,g.hasPortal=!0):(g._restInfoPms=t,g.hasServer=!0),this.registerServers([g]);}return g.hasPortal&&void 0===g._selfReq&&(o||z$1(g.tokenServiceUrl,this._appOrigin)||this._gwDomains.some((e=>e.tokenServiceUrl===g.tokenServiceUrl)))&&(g._selfReq={owningTenant:t&&t.owningTenant,selfDfd:this._getPortalSelf(g.tokenServiceUrl.replace(this._rePortalTokenSvc,"/sharing/rest/portals/self"),e)}),this._enqueue(e,g,t,a,h)}getResourceName(e){return this._isRESTService(e)?e.replace(this._regexSDirUrl,"").replace(this._regexServerType,"")||"":this._gwUser.test(e)&&e.replace(this._gwUser,"$1")||this._gwItem.test(e)&&e.replace(this._gwItem,"$1")||this._gwGroup.test(e)&&e.replace(this._gwGroup,"$1")||""}generateToken(e,t,r){const o=this._rePortalTokenSvc.test(e.tokenServiceUrl),n=new y$d(this._appOrigin),a=e.shortLivedTokenValidity;let h,l,c,d,u,p,g,m;t&&(m=this.tokenValidity||a||this._defaultTokenValidity,m>a&&a>0&&(m=a)),r&&(h=r.isAdmin,l=r.serverUrl,c=r.token,p=r.signal,g=r.ssl,e.customParameters=r.customParameters),h?d=e.adminTokenServiceUrl:(d=e.tokenServiceUrl,u=new y$d(d.toLowerCase()),e.webTierAuth&&r?.serverUrl&&!g&&"http"===n.scheme&&(z$1(n.uri,d,!0)||"https"===u.scheme&&n.host===u.host&&"7080"===n.port&&"7443"===u.port)&&(d=d.replace(/^https:/i,"http:").replace(/:7443/i,":7080")));const v={query:{request:"getToken",username:t?.username,password:t?.password,serverUrl:l,token:c,expiration:m,referer:h||o?this._appOrigin:null,client:h?"referer":null,f:"json",...e.customParameters},method:"post",authMode:"anonymous",useProxy:this._useProxy(e,r),signal:p,...r?.ioArgs};o||(v.withCredentials=!1);return U$2(d,v).then((r=>{const s=r.data;if(!s||!s.token)return new s$m("identity-manager:authentication-failed","Unable to generate token");const o=e.server;return C[o]||(C[o]={}),t&&(C[o][t.username]=t.password),s.validity=m,s}))}isBusy(){return !!this._busy}checkSignInStatus(e){return this.checkAppAccess(e,"").then((e=>e.credential))}checkAppAccess(e,t,r){let o=!1;return this.getCredential(e,{prompt:!1}).then((n=>{let a;const h={f:"json"};if("portal"===n.scope)if(t&&(this._doPortalSignIn(e)||r&&r.force))a=n.server+"/sharing/rest/oauth2/validateAppAccess",h.client_id=t;else {if(!n.token)return {credential:n};a=n.server+"/sharing/rest";}else {if(!n.token)return {credential:n};a=n.server+"/rest/services";}return n.token&&(h.token=n.token),U$2(a,{query:h,authMode:"anonymous"}).then((e=>{if(!1===e.data.valid)throw new s$m("identity-manager:not-authorized",`You are currently signed in as: '${n.userId}'.`,e.data);return o=!!e.data.viewOnlyUserTypeApp,{credential:n}})).catch((e=>{if("identity-manager:not-authorized"===e.name)throw e;const t=e.details&&e.details.httpStatus;if(498===t)throw n.destroy(),new s$m("identity-manager:not-authenticated","User is not signed in.");if(400===t)throw new s$m("identity-manager:invalid-request");return {credential:n}}))})).then((e=>({credential:e.credential,viewOnly:o})))}setOAuthResponseHash(e){e&&("#"===e.charAt(0)&&(e=e.substring(1)),this._processOAuthPopupParams(L$2(e)));}setOAuthRedirectionHandler(e){this._oAuthRedirectFunc=e;}setProtocolErrorHandler(e){this._protocolFunc=e;}signIn(e,t,r={}){const s=D$4(),o=()=>{h?.remove(),d?.remove(),p?.remove(),a?.destroy(),this.dialog?.destroy(),this.dialog=a=h=d=p=null;},n=()=>{o(),this._oAuthDfd=null,s.reject(new s$m("identity-manager:user-aborted","ABORTED"));};r.signal&&v$7(r.signal,(()=>{n();}));let a=new this.formConstructor;a.resource=this.getResourceName(e),a.server=t.server,this.dialog=new u$2,this.dialog.content=a,this.dialog.open=!0,this.emit("dialog-create");let h=a.on("cancel",n),d=l$4((()=>this.dialog.open),n),p=a.on("submit",(e=>{this.generateToken(t,e,{isAdmin:r.isAdmin,signal:r.signal}).then((i=>{o();const n=new L({userId:e.username,server:t.server,token:i.token,expires:null!=i.expires?Number(i.expires):null,ssl:!!i.ssl,isAdmin:r.isAdmin,validity:i.validity});s.resolve(n);})).catch((e=>{a.error=e,a.signingIn=!1;}));}));return s.promise}oAuthSignIn(e,t,r,s){this._oAuthDfd=D$4();const o=this._oAuthDfd;let n;s?.signal&&v$7(s.signal,(()=>{const e=this._oAuthDfd&&this._oAuthDfd.oAuthWin_;e&&!e.closed?e.close():this.dialog&&f();})),o.resUrl_=e,o.sinfo_=t,o.oinfo_=r;const a=r._oAuthCred;if(a.storage&&("authorization-code"===r.flowType||"auto"===r.flowType&&!r.popup&&t.currentVersion>=8.4)){let e=crypto.getRandomValues(new Uint8Array(32));n=Z(e),a.codeVerifier=n,e=crypto.getRandomValues(new Uint8Array(32)),a.stateUID=Z(e),a.save()||(a.codeVerifier=n=null);}else a.codeVerifier=null;let h,d,p,_;this._getCodeChallenge(n).then((i=>{const o=!s||!1!==s.oAuthPopupConfirmation;r.popup&&o?(h=new this.formConstructor,h.oAuthPrompt=!0,h.server=t.server,this.dialog=new u$2,this.dialog.content=h,this.dialog.open=!0,this.emit("dialog-create"),d=h.on("cancel",f),p=l$4((()=>this.dialog.open),f),_=h.on("submit",(()=>{g(),this._doOAuthSignIn(e,t,r,i);}))):this._doOAuthSignIn(e,t,r,i);}));const f=()=>{g(),this._oAuthDfd=null,o.reject(new s$m("identity-manager:user-aborted","ABORTED"));},g=()=>{d?.remove(),p?.remove(),_?.remove(),h?.destroy(),this.dialog?.destroy(),this.dialog=null;};return o.promise}destroyCredentials(){if(this.credentials){this.credentials.slice().forEach((e=>{e.destroy();}));}this.emit("credentials-destroy");}enablePostMessageAuth(e="https://www.arcgis.com/sharing/rest"){this._postMessageAuthHandle&&this._postMessageAuthHandle.remove(),this._postMessageAuthHandle=r$f(window,"message",(t=>{if((t.origin===this._appOrigin||t.origin.endsWith(".arcgis.com"))&&"arcgis:auth:requestCredential"===t.data?.type){const r=t.source;this.getCredential(e).then((e=>{r.postMessage({type:"arcgis:auth:credential",credential:{expires:e.expires,server:e.server,ssl:e.ssl,token:e.token,userId:e.userId}},t.origin);})).catch((e=>{r.postMessage({type:"arcgis:auth:error",error:{name:e.name,message:e.message}},t.origin);}));}}));}disablePostMessageAuth(){this._postMessageAuthHandle&&(this._postMessageAuthHandle.remove(),this._postMessageAuthHandle=null);}_getOAuthLocationParams(){let e=window.location.hash;if(e){"#"===e.charAt(0)&&(e=e.substring(1));const t=L$2(e);let r=!1;if(t.access_token&&t.expires_in&&t.state&&t.hasOwnProperty("username"))try{t.state=JSON.parse(t.state),t.state.portalUrl&&(this._oAuthLocationParams=t,r=!0);}catch{}else if(t.error&&t.error_description&&(console.log("IdentityManager OAuth Error: ",t.error," - ",t.error_description),"access_denied"===t.error&&(r=!0,t.state)))try{t.state=JSON.parse(t.state);}catch{}r&&(window.location.hash=t.state?.hash||"");}let t=window.location.search;if(t){"?"===t.charAt(0)&&(t=t.substring(1));const e=L$2(t);let r=!1;if(e.code&&e.state)try{e.state=JSON.parse(e.state),e.state.portalUrl&&e.state.uid&&(this._oAuthLocationParams=e,r=!0);}catch{}else if(e.error&&e.error_description&&(console.log("IdentityManager OAuth Error: ",e.error," - ",e.error_description),"access_denied"===e.error&&(r=!0,e.state)))try{e.state=JSON.parse(e.state);}catch{}if(r){const t={...e};["code","error","error_description","message_code","persist","state"].forEach((e=>{delete t[e];}));const r=I$2(t),s=window.location.pathname+(r?`?${r}`:"")+(e.state?.hash||"");window.history.replaceState(window.history.state,"",s);}}}_getOAuthToken(e,t,r,i,o){return e=e.replace(/^http:/i,"https:"),U$2(`${e}/sharing/rest/oauth2/token`,{authMode:"anonymous",method:"post",query:i&&o?{grant_type:"authorization_code",code:t,redirect_uri:i,client_id:r,code_verifier:o}:{grant_type:"refresh_token",refresh_token:t,client_id:r}}).then((e=>e.data))}_getCodeChallenge(e){if(e&&globalThis.isSecureContext){const t=(new TextEncoder).encode(e);return crypto.subtle.digest("SHA-256",t).then((e=>Z(new Uint8Array(e))))}return Promise.resolve(null)}_pageShowHandler(e){if(e.persisted&&this.isBusy()&&this._rejectOnPersistedPageShow){const e=new s$m("identity-manager:user-aborted","ABORTED");this._errbackFunc(e);}}_findCredential(e,t){let r,s,i,o,n=-1;const a=t&&t.token,h=t&&t.resource,l=this._isServerRsrc(e)?"server":"portal",c=this.credentials.filter((t=>this._hasSameServerInstance(t.server,e)&&t.scope===l));if(e=h||e,c.length)if(1===c.length){if(r=c[0],i=this.findServerInfo(r.server),s=i&&i.owningSystemUrl,o=s?this.findCredential(s,r.userId):void 0,n=this._getIdenticalSvcIdx(e,r),!a)return -1===n&&r.resources.push(e),this._addResource(e,o),r;-1!==n&&(r.resources.splice(n,1),this._removeResource(e,o));}else {let t,r;if(c.some((a=>(r=this._getIdenticalSvcIdx(e,a),-1!==r&&(t=a,i=this.findServerInfo(t.server),s=i&&i.owningSystemUrl,o=s?this.findCredential(s,t.userId):void 0,n=r,!0)))),a)t&&(t.resources.splice(n,1),this._removeResource(e,o));else if(t)return this._addResource(e,o),t}}_findOAuthInfo(e){let t=this.findOAuthInfo(e);if(!t)for(const r of this.oAuthInfos)if(this._isIdProvider(r.portalUrl,e)){t=r;break}return t}_addResource(e,t){t&&-1===this._getIdenticalSvcIdx(e,t)&&t.resources.push(e);}_removeResource(e,t){let r=-1;t&&(r=this._getIdenticalSvcIdx(e,t),r>-1&&t.resources.splice(r,1));}_useProxy(e,t){return t&&t.isAdmin&&!z$1(e.adminTokenServiceUrl,this._appOrigin)||!this._isPortalDomain(e.tokenServiceUrl)&&"10.1"===String(e.currentVersion)&&!z$1(e.tokenServiceUrl,this._appOrigin)}_getOrigin(e){const t=new y$d(e);return t.scheme+"://"+t.host+(null!=t.port?":"+t.port:"")}_getServerInstanceRoot(e){const t=e.toLowerCase();let r=t.indexOf(this._agsRest);return -1===r&&this._isAdminResource(e)&&(r=this._agsAdmin.test(e)?e.replace(this._agsAdmin,"$1").length:e.search(this._adminSvcs)),-1!==r||t$m(t)||(r=t.indexOf("/sharing")),-1===r&&"/"===t.substr(-1)&&(r=t.length-1),r>-1?e.substring(0,r):e}_hasSameServerInstance(e,t){return "/"===e.substr(-1)&&(e=e.slice(0,-1)),e=e.toLowerCase(),t=this._getServerInstanceRoot(t).toLowerCase(),e=this._normalizeAGOLorgDomain(e),t=this._normalizeAGOLorgDomain(t),(e=e.substr(e.indexOf(":")))===(t=t.substr(t.indexOf(":")))}_normalizeAGOLorgDomain(e){const t=/^https?:\/\/(?:cdn|[a-z\d-]+\.maps)\.arcgis\.com/i,r=/^https?:\/\/(?:cdndev|[a-z\d-]+\.mapsdevext)\.arcgis\.com/i,s=/^https?:\/\/(?:cdnqa|[a-z\d-]+\.mapsqa)\.arcgis\.com/i;return t.test(e)?e=e.replace(t,"https://www.arcgis.com"):r.test(e)?e=e.replace(r,"https://devext.arcgis.com"):s.test(e)&&(e=e.replace(s,"https://qaext.arcgis.com")),e}_sanitizeUrl(e){const r=(s$r.request.proxyUrl||"").toLowerCase(),s=r?e.toLowerCase().indexOf(r+"?"):-1;return -1!==s&&(e=e.substring(s+r.length+1)),e=F$1(e),j$9(e).path}_isRESTService(e){return e.includes(this._agsRest)}_isAdminResource(e){return this._agsAdmin.test(e)||this._adminSvcs.test(e)}_isServerRsrc(e){return this._isRESTService(e)||this._isAdminResource(e)}_isIdenticalService(e,t){let r=!1;if(this._isRESTService(e)&&this._isRESTService(t)){const s=this._getSuffix(e).toLowerCase(),i=this._getSuffix(t).toLowerCase();if(r=s===i,!r){const e=/(.*)\/(MapServer|FeatureServer|UtilityNetworkServer).*/gi;r=s.replace(e,"$1")===i.replace(e,"$1");}}else this._isAdminResource(e)&&this._isAdminResource(t)?r=!0:this._isServerRsrc(e)||this._isServerRsrc(t)||!this._isPortalDomain(e)||(r=!0);return r}_isPortalDomain(e){const r=new y$d(e.toLowerCase()),s=this._portalConfig;let i=this._gwDomains.some((e=>e.regex.test(r.uri)));return !i&&s&&(i=this._hasSameServerInstance(this._getServerInstanceRoot(s.restBaseUrl),r.uri)),i||s$r.portalUrl&&(i=z$1(r,s$r.portalUrl,!0)),i||(i=this._portals.some((e=>this._hasSameServerInstance(e,r.uri)))),i=i||this._agsPortal.test(r.path),i}_isIdProvider(e,t){let r=-1,s=-1;this._gwDomains.forEach(((i,o)=>{-1===r&&i.regex.test(e)&&(r=o),-1===s&&i.regex.test(t)&&(s=o);}));let i=!1;if(r>-1&&s>-1&&(0===r||4===r?0!==s&&4!==s||(i=!0):1===r?1!==s&&2!==s||(i=!0):2===r?2===s&&(i=!0):3===r&&3===s&&(i=!0)),!i){const r=this.findServerInfo(t),s=r&&r.owningSystemUrl;s&&b(r)&&this._isPortalDomain(s)&&this._isIdProvider(e,s)&&(i=!0);}return i}_getIdenticalSvcIdx(e,t){let r=-1;for(let s=0;s<t.resources.length;s++){const i=t.resources[s];if(this._isIdenticalService(e,i)){r=s;break}}return r}_getSuffix(e){return e.replace(this._regexSDirUrl,"").replace(this._regexServerType,"$1")}_getTokenSvcUrl(e){let t,r,i;if(this._isRESTService(e)||this._isAdminResource(e)){const i=this._getServerInstanceRoot(e);return t=i+"/admin/generateToken",r=U$2(e=i+"/rest/info",{query:{f:"json"}}).then((e=>e.data)),{adminUrl:t,promise:r}}if(this._isPortalDomain(e)){let t="";if(this._gwDomains.some((r=>(r.regex.test(e)&&(t=r.tokenServiceUrl),!!t))),t||this._portals.some((r=>(this._hasSameServerInstance(r,e)&&(t=r+this._gwTokenUrl),!!t))),t||(i=e.toLowerCase().indexOf("/sharing"),-1!==i&&(t=e.substring(0,i)+this._gwTokenUrl)),t||(t=this._getOrigin(e)+this._gwTokenUrl),t){const r=new y$d(e).port;/^http:\/\//i.test(e)&&"7080"===r&&(t=t.replace(/:7080/i,":7443")),t=t.replace(/http:/i,"https:");}return t}if(e.toLowerCase().includes("premium.arcgisonline.com"))return "https://premium.arcgisonline.com/server/tokens"}_processOAuthResponseParams(e,t,r){const s=t._oAuthCred;if(e.code){const i=s.codeVerifier;return s.codeVerifier=null,s.stateUID=null,s.save(),this._getOAuthToken(r.server,e.code,t.appId,this._getRedirectURI(t,!0),i).then((i=>{const o=new L({userId:i.username,server:r.server,token:i.access_token,expires:Date.now()+1e3*i.expires_in,ssl:i.ssl,oAuthState:e.state,_oAuthCred:s});return t.userId=o.userId,s.storage=i.persist?q:j,s.refreshToken=i.refresh_token,s.token=null,s.expires=i.refresh_token_expires_in?Date.now()+1e3*i.refresh_token_expires_in:null,s.userId=o.userId,s.ssl=o.ssl,s.save(),o}))}const i=new L({userId:e.username,server:r.server,token:e.access_token,expires:Date.now()+1e3*Number(e.expires_in),ssl:"true"===e.ssl,oAuthState:e.state,_oAuthCred:s});return t.userId=i.userId,s.storage=e.persist?q:j,s.refreshToken=null,s.token=i.token,s.expires=i.expires,s.userId=i.userId,s.ssl=i.ssl,s.save(),Promise.resolve(i)}_processOAuthPopupParams(e){const t=this._oAuthDfd;if(this._oAuthDfd=null,t)if(clearInterval(this._oAuthIntervalId),this._oAuthOnPopupHandle?.remove(),e.error){const r="access_denied"===e.error,s=new s$m(r?"identity-manager:user-aborted":"identity-manager:authentication-failed",r?"ABORTED":"OAuth: "+e.error+" - "+e.error_description);t.reject(s);}else this._processOAuthResponseParams(e,t.oinfo_,t.sinfo_).then((e=>{t.resolve(e);})).catch((e=>{t.reject(e);}));}_setOAuthResponseQueryString(e){e&&("?"===e.charAt(0)&&(e=e.substring(1)),this._processOAuthPopupParams(L$2(e)));}_exchangeToken(e,t,r){return U$2(`${e}/sharing/rest/oauth2/exchangeToken`,{authMode:"anonymous",method:"post",query:{f:"json",client_id:t,token:r}}).then((e=>e.data.token))}_getPlatformSelf(e,t){return e=e.replace(/^http:/i,"https:"),U$2(`${e}/sharing/rest/oauth2/platformSelf`,{authMode:"anonymous",headers:{"X-Esri-Auth-Client-Id":t,"X-Esri-Auth-Redirect-Uri":window.location.href.replace(/#.*$/,"")},method:"post",query:{f:"json",expiration:30},withCredentials:!0}).then((e=>e.data))}_getPortalSelf(e,t){let r;if(this._gwDomains.some((t=>(t.regex.test(e)&&(r=t.customBaseUrl),!!r))),r)return Promise.resolve({allSSL:!0,currentVersion:"8.4",customBaseUrl:r,portalMode:"multitenant",supportsOAuth:!0});this._appOrigin.startsWith("https:")?e=e.replace(/^http:/i,"https:").replace(/:7080/i,":7443"):/^http:/i.test(t)&&(e=e.replace(/^https:/i,"http:").replace(/:7443/i,":7080"));return U$2(e,{query:{f:"json"},authMode:"anonymous",withCredentials:!0}).then((e=>e.data))}_doPortalSignIn(e){const t=this._portalConfig,r=window.location.href,s=this.findServerInfo(e);return !(!t&&!this._isPortalDomain(r)||!(s?s.hasPortal||s.owningSystemUrl&&this._isPortalDomain(s.owningSystemUrl):this._isPortalDomain(e))||!(this._isIdProvider(r,e)||t&&(this._hasSameServerInstance(this._getServerInstanceRoot(t.restBaseUrl),e)||this._isIdProvider(t.restBaseUrl,e))||z$1(r,e,!0)))}_checkProtocol(e,t,r,s){let o=!0;const n=s?t.adminTokenServiceUrl:t.tokenServiceUrl;if(n.trim().toLowerCase().startsWith("https:")&&!this._appOrigin.startsWith("https:")&&J(n)&&(o=!!this._protocolFunc&&!!this._protocolFunc({resourceUrl:e,serverInfo:t}),!o)){r(new s$m("identity-manager:aborted","Aborted the Sign-In process to avoid sending password over insecure connection."));}return o}_enqueue(e,t,r,s,i,o){return s||(s=D$4()),s.resUrl_=e,s.sinfo_=t,s.options_=r,s.admin_=i,s.refresh_=o,this._busy?this._hasSameServerInstance(this._getServerInstanceRoot(e),this._busy.resUrl_)?(this._oAuthDfd&&this._oAuthDfd.oAuthWin_&&this._oAuthDfd.oAuthWin_.focus(),this._soReqs.push(s)):this._xoReqs.push(s):this._doSignIn(s),s.promise}_doSignIn(e){this._busy=e,this._rejectOnPersistedPageShow=!1;const t=t=>{const r=e.options_&&e.options_.resource,s=e.resUrl_,i=e.refresh_;let o=!1;this.credentials.includes(t)||(i&&this.credentials.includes(i)?(i.userId=t.userId,i.token=t.token,i.expires=t.expires,i.validity=t.validity,i.ssl=t.ssl,i.creationTime=t.creationTime,o=!0,t=i):this.credentials.push(t)),t.resources||(t.resources=[]),t.resources.includes(r||s)||t.resources.push(r||s),t.scope=this._isServerRsrc(s)?"server":"portal",t.emitTokenChange();const n=this._soReqs,a={};this._soReqs=[],n.forEach((e=>{if(!this._isIdenticalService(s,e.resUrl_)){const r=this._getSuffix(e.resUrl_);a[r]||(a[r]=!0,t.resources.push(e.resUrl_));}})),e.resolve(t),n.forEach((e=>{this._hasSameServerInstance(this._getServerInstanceRoot(s),e.resUrl_)?e.resolve(t):this._soReqs.push(e);})),this._busy=e.resUrl_=e.sinfo_=e.refresh_=null,o||this.emit("credential-create",{credential:t}),this._soReqs.length?this._doSignIn(this._soReqs.shift()):this._xoReqs.length&&this._doSignIn(this._xoReqs.shift());},r=t=>{e.reject(t),this._busy=e.resUrl_=e.sinfo_=e.refresh_=null,this._soReqs.length?this._doSignIn(this._soReqs.shift()):this._xoReqs.length&&this._doSignIn(this._xoReqs.shift());},s=(o,a,h,l)=>{const d=e.sinfo_,u=!e.options_||!1!==e.options_.prompt,p=d.hasPortal&&this._findOAuthInfo(e.resUrl_);let f,g;if(o)t(new L({userId:o,server:d.server,token:h||null,expires:null!=l?Number(l):null,ssl:!!a}));else if(window!==window.parent&&this._appUrlObj.query?.["arcgis-auth-origin"]&&this._appUrlObj.query?.["arcgis-auth-portal"]&&this._hasSameServerInstance(this._getServerInstanceRoot(this._appUrlObj.query["arcgis-auth-portal"]),e.resUrl_)){window.parent.postMessage({type:"arcgis:auth:requestCredential"},this._appUrlObj.query["arcgis-auth-origin"]);const s=r$f(window,"message",(e=>{e.source===window.parent&&e.data&&("arcgis:auth:credential"===e.data.type?(s.remove(),e.data.credential.expires<Date.now()?r(new s$m("identity-manager:credential-request-failed","Parent application's token has expired.")):t(new L(e.data.credential))):"arcgis:auth:error"===e.data.type&&(s.remove(),"tokenExpiredError"===e.data.error.name?r(new s$m("identity-manager:credential-request-failed","Parent application's token has expired.")):r(s$m.fromJSON(e.data.error))));}));v$7(e.options_?.signal,(()=>{s.remove();}));}else if(p){let o=p._oAuthCred;if(!o){const e=new e$1(p,q),t=new e$1(p,j);e.isValid()&&t.isValid()?e.expires>t.expires?(o=e,t.destroy()):(o=t,e.destroy()):o=e.isValid()?e:t,p._oAuthCred=o;}if(o.isValid()){f=new L({userId:o.userId,server:d.server,token:o.token,expires:o.expires,ssl:o.ssl,_oAuthCred:o});const r=p.appId!==o.appId&&this._doPortalSignIn(e.resUrl_);r||o.refreshToken?(e._pendingDfd=o.refreshToken?this._getOAuthToken(d.server,o.refreshToken,o.appId).then((e=>(f.expires=Date.now()+1e3*e.expires_in,f.token=e.access_token,f))):Promise.resolve(f),e._pendingDfd.then((e=>r?this._exchangeToken(e.server,p.appId,e.token).then((t=>(e.token=t,e))).catch((()=>e)):e)).then((e=>{t(e);})).catch((()=>{o?.destroy(),s();}))):t(f);}else if(this._oAuthLocationParams&&this._hasSameServerInstance(p.portalUrl,this._oAuthLocationParams.state.portalUrl)&&(this._oAuthLocationParams.access_token||this._oAuthLocationParams.code&&this._oAuthLocationParams.state.uid===o.stateUID&&o.codeVerifier)){const s=this._oAuthLocationParams;this._oAuthLocationParams=null,e._pendingDfd=this._processOAuthResponseParams(s,p,d).then((e=>{t(e);})).catch(r);}else {const s=()=>{u?e._pendingDfd=this.oAuthSignIn(e.resUrl_,d,p,e.options_).then(t,r):(g=new s$m("identity-manager:not-authenticated","User is not signed in."),r(g));};this._doPortalSignIn(e.resUrl_)?e._pendingDfd=this._getPlatformSelf(d.server,p.appId).then((e=>{z$1(e.portalUrl,this._appOrigin,!0)?(f=new L({userId:e.username,server:d.server,expires:Date.now()+1e3*e.expires_in,token:e.token}),t(f)):s();})).catch(s):s();}}else if(u){if(this._checkProtocol(e.resUrl_,d,r,e.admin_)){let s=e.options_;e.admin_&&(s=s||{},s.isAdmin=!0),e._pendingDfd=this.signIn(e.resUrl_,d,s).then(t,r);}}else g=new s$m("identity-manager:not-authenticated","User is not signed in."),r(g);},o=()=>{const s=e.sinfo_,i=s.owningSystemUrl,o=e.options_;let n,a,h,l;if(o&&(n=o.token,a=o.error,h=o.prompt),l=this._findCredential(i,{token:n,resource:e.resUrl_}),!l)for(const e of this.credentials)if(this._isIdProvider(i,e.server)){l=e;break}if(l){const i=this.findCredential(e.resUrl_,l.userId);if(i)t(i);else if(D(s,this._legacyFed)){const e=l.toJSON();e.server=s.server,e.resources=null,t(new L(e));}else {(e._pendingDfd=this.generateToken(this.findServerInfo(l.server),null,{serverUrl:e.resUrl_,token:l.token,signal:e.options_.signal,ssl:l.ssl})).then((r=>{t(new L({userId:l?.userId,server:s.server,token:r.token,expires:null!=r.expires?Number(r.expires):null,ssl:!!r.ssl,isAdmin:e.admin_,validity:r.validity}));}),r);}}else {this._busy=null,n&&(e.options_.token=null);(e._pendingDfd=this.getCredential(i.replace(/\/?$/,"/sharing"),{resource:e.resUrl_,owningTenant:s.owningTenant,signal:e.options_.signal,token:n,error:a,prompt:h})).then((()=>{this._enqueue(e.resUrl_,e.sinfo_,e.options_,e,e.admin_);}),(t=>{e.resUrl_=e.sinfo_=e.refresh_=null,e.reject(t);}));}};this._errbackFunc=r;const a=e.sinfo_.owningSystemUrl,l=this._isServerRsrc(e.resUrl_),d=e.sinfo_._restInfoPms;d?d.promise.then((t=>{const r=e.sinfo_;if(r._restInfoPms){r.adminTokenServiceUrl=r._restInfoPms.adminUrl,r._restInfoPms=null,r.tokenServiceUrl=(t$n("authInfo.tokenServicesUrl",t)||t$n("authInfo.tokenServiceUrl",t)||t$n("tokenServiceUrl",t))??null,r.shortLivedTokenValidity=t$n("authInfo.shortLivedTokenValidity",t)??null,r.currentVersion=t.currentVersion,r.owningTenant=t.owningTenant;const e=r.owningSystemUrl=t.owningSystemUrl;e&&this._portals.push(e);}l&&r.owningSystemUrl?o():s();}),(()=>{e.sinfo_._restInfoPms=null;const t=new s$m("identity-manager:server-identification-failed","Unknown resource - could not find token service endpoint.");r(t);})):l&&a?o():e.sinfo_._selfReq?e.sinfo_._selfReq.selfDfd.then((t=>{const r={};let s,i,o,n;return t&&(s=t.user&&t.user.username,r.username=s,r.allSSL=t.allSSL,i=t.supportsOAuth,n=parseFloat(t.currentVersion),"multitenant"===t.portalMode&&(o=t.customBaseUrl),e.sinfo_.currentVersion=n),e.sinfo_.webTierAuth=!!s,s&&this.normalizeWebTierAuth?this.generateToken(e.sinfo_,null,{ssl:r.allSSL}).catch((()=>null)).then((e=>(r.portalToken=e&&e.token,r.tokenExpiration=e&&e.expires,r))):!s&&i&&n>=4.4&&!this._findOAuthInfo(e.resUrl_)?this._generateOAuthInfo({portalUrl:e.sinfo_.server,customBaseUrl:o,owningTenant:e.sinfo_._selfReq.owningTenant}).catch((()=>null)).then((()=>r)):r})).catch((()=>null)).then((t=>{e.sinfo_._selfReq=null,t?s(t.username,t.allSSL,t.portalToken,t.tokenExpiration):s();})):s();}_generateOAuthInfo(e){let t,r=null,i=e.portalUrl;const o=e.customBaseUrl,n=e.owningTenant,a=!this._defaultOAuthInfo&&this._createDefaultOAuthInfo&&!this._hasTestedIfAppIsOnPortal;if(a){r=window.location.href;let e=r.indexOf("?");e>-1&&(r=r.slice(0,e)),e=r.search(/\/(apps|home)\//),r=e>-1?r.slice(0,e):null;}return a&&r?(this._hasTestedIfAppIsOnPortal=!0,t=U$2(r+"/sharing/rest",{query:{f:"json"}}).then((()=>{this._defaultOAuthInfo=new i$1({appId:"arcgisonline",popupCallbackUrl:r+"/home/oauth-callback.html"});}))):t=Promise.resolve(),t.then((()=>{if(this._defaultOAuthInfo)return i=i.replace(/^http:/i,"https:"),U$2(i+"/sharing/rest/oauth2/validateRedirectUri",{query:{accountId:n,client_id:this._defaultOAuthInfo.appId,redirect_uri:Q(this._defaultOAuthInfo.popupCallbackUrl),f:"json"}}).then((e=>{if(e.data.valid){const t=this._defaultOAuthInfo.clone();e.data.urlKey&&o?t.portalUrl="https://"+e.data.urlKey.toLowerCase()+"."+o:t.portalUrl=i,t.popup=window!==window.top||!(z$1(i,this._appOrigin)||this._gwDomains.some((e=>e.regex.test(i)&&e.regex.test(this._appOrigin)))),this.oAuthInfos.push(t);}}))}))}_doOAuthSignIn(e,t,r,s){const o=r._oAuthCred,a={portalUrl:r.portalUrl};!r.popup&&r.preserveUrlHash&&window.location.hash&&(a.hash=window.location.hash),o.stateUID&&(a.uid=o.stateUID);const h={client_id:r.appId,response_type:o.codeVerifier?"code":"token",state:JSON.stringify(a),expiration:r.expiration,locale:r.locale,redirect_uri:this._getRedirectURI(r,!!o.codeVerifier)};r.forceLogin&&(h.force_login=!0),r.forceUserId&&r.userId&&(h.prepopulatedusername=r.userId),!r.popup&&this._doPortalSignIn(e)&&(h.redirectToUserOrgUrl=!0),o.codeVerifier&&(h.code_challenge=s||o.codeVerifier,h.code_challenge_method=s?"S256":"plain");const l=r.portalUrl.replace(/^http:/i,"https:")+"/sharing/oauth2/authorize",c=l+"?"+I$2(h);if(r.popup){const e=window.open(c,"esriJSAPIOAuth",r.popupWindowFeatures);if(e)e.focus(),this._oAuthDfd.oAuthWin_=e,this._oAuthIntervalId=setInterval((()=>{if(e.closed){clearInterval(this._oAuthIntervalId),this._oAuthOnPopupHandle.remove();const e=this._oAuthDfd;if(e){const t=new s$m("identity-manager:user-aborted","ABORTED");e.reject(t);}}}),500),this._oAuthOnPopupHandle=r$f(window,["arcgis:auth:hash","arcgis:auth:location:search"],(e=>{"arcgis:auth:hash"===e.type?this.setOAuthResponseHash(e.detail):this._setOAuthResponseQueryString(e.detail);}));else {const e=new s$m("identity-manager:popup-blocked","ABORTED");this._oAuthDfd.reject(e);}}else this._rejectOnPersistedPageShow=!0,this._oAuthRedirectFunc?this._oAuthRedirectFunc({authorizeParams:h,authorizeUrl:l,resourceUrl:e,serverInfo:t,oAuthInfo:r}):window.location.href=c;}_getRedirectURI(e,t){const r=window.location.href.replace(/#.*$/,"");if(e.popup)return Q(e.popupCallbackUrl);if(t){const e=j$9(r);return e.query&&["code","error","error_description","message_code","persist","state"].forEach((t=>{delete e.query[t];})),Bt(e.path,e.query)}return r}}E.prototype.declaredClass="esri.identity.IdentityManagerBase";let L=class extends n$a.EventedAccessor{constructor(e){super(e),this._oAuthCred=null,this.tokenRefreshBuffer=2,e&&e._oAuthCred&&(this._oAuthCred=e._oAuthCred);}initialize(){this.resources=this.resources||[],null==this.creationTime&&(this.creationTime=Date.now());}refreshToken(){const e=s$q.findServerInfo(this.server),t=e&&e.owningSystemUrl,s=!!t&&"server"===this.scope,i=s&&D(e,s$q._legacyFed),o=e.webTierAuth,n=o&&s$q.normalizeWebTierAuth,a=C[this.server],h=a&&a[this.userId];let l,c=this.resources&&this.resources[0],d=s?s$q.findServerInfo(t):null,u={username:this.userId,password:h};if(o&&!n)return;s&&!d&&s$q.serverInfos.some((e=>(s$q._isIdProvider(t,e.server)&&(d=e),!!d)));const p=d?s$q.findCredential(d.server,this.userId):null;if(!s||p){if(!i){if(s)l={serverUrl:c,token:p&&p.token,ssl:p&&p.ssl};else if(n)u=null,l={ssl:this.ssl};else {if(!h){let t;return c&&(c=s$q._sanitizeUrl(c),this._enqueued=1,t=s$q._enqueue(c,e,null,null,this.isAdmin,this),t.then((()=>{this._enqueued=0,this.refreshServerTokens();})).catch((()=>{this._enqueued=0;}))),t}this.isAdmin&&(l={isAdmin:!0});}return s$q.generateToken(s?d:e,s?null:u,l).then((e=>{this.token=e.token,this.expires=null!=e.expires?Number(e.expires):null,this.creationTime=Date.now(),this.validity=e.validity,this.emitTokenChange(),this.refreshServerTokens();})).catch((()=>{}))}p?.refreshToken();}}refreshServerTokens(){"portal"===this.scope&&s$q.credentials.forEach((e=>{const t=s$q.findServerInfo(e.server),s=t&&t.owningSystemUrl;e!==this&&e.userId===this.userId&&s&&"server"===e.scope&&(s$q._hasSameServerInstance(this.server,s)||s$q._isIdProvider(s,this.server))&&(D(t,s$q._legacyFed)?(e.token=this.token,e.expires=this.expires,e.creationTime=this.creationTime,e.validity=this.validity,e.emitTokenChange()):e.refreshToken());}));}emitTokenChange(e){clearTimeout(this._refreshTimer);const t=this.server&&s$q.findServerInfo(this.server),s=t&&t.owningSystemUrl,i=s&&s$q.findServerInfo(s);!1===e||s&&"portal"!==this.scope&&(!i||!i.webTierAuth||s$q.normalizeWebTierAuth)||null==this.expires&&null==this.validity||this._startRefreshTimer(),this.emit("token-change");}destroy(){this.userId=this.server=this.token=this.expires=this.validity=this.resources=this.creationTime=null,this._oAuthCred&&(this._oAuthCred.destroy(),this._oAuthCred=null);const e=s$q.credentials.indexOf(this);e>-1&&s$q.credentials.splice(e,1),this.emitTokenChange(),this.emit("destroy");}toJSON(){const e=p$f({userId:this.userId,server:this.server,token:this.token,expires:this.expires,validity:this.validity,ssl:this.ssl,isAdmin:this.isAdmin,creationTime:this.creationTime,scope:this.scope}),t=this.resources;return t&&t.length>0&&(e.resources=t.slice()),e}_startRefreshTimer(){clearTimeout(this._refreshTimer);const e=6e4*this.tokenRefreshBuffer,t=2**31-1;let r=(this.validity?this.creationTime+6e4*this.validity:this.expires)-Date.now();r<0?r=0:r>t&&(r=t),this._refreshTimer=setTimeout(this.refreshToken.bind(this),r>e?r-e:r);}};e$m([y$7()],L.prototype,"creationTime",void 0),e$m([y$7()],L.prototype,"expires",void 0),e$m([y$7()],L.prototype,"isAdmin",void 0),e$m([y$7()],L.prototype,"oAuthState",void 0),e$m([y$7()],L.prototype,"resources",void 0),e$m([y$7()],L.prototype,"scope",void 0),e$m([y$7()],L.prototype,"server",void 0),e$m([y$7()],L.prototype,"ssl",void 0),e$m([y$7()],L.prototype,"token",void 0),e$m([y$7()],L.prototype,"tokenRefreshBuffer",void 0),e$m([y$7()],L.prototype,"userId",void 0),e$m([y$7()],L.prototype,"validity",void 0),L=e$m([n$b("esri.identity.Credential")],L);

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
class r extends E{}r.prototype.declaredClass="esri.identity.IdentityManager";const s=new r;n$k(s);

export default s;
