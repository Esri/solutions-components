/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{r as t,h as e,H as i,g as n}from"./p-c2f00d41.js";import{r,N as s,c as o,e as a,A as h,g as u,s as c}from"./p-dd11eeb2.js";import{g as l}from"./p-829e6d4f.js";import"./p-00444009.js";import"./p-dbc9a5a8.js";import"./p-e1a4994d.js";
/** @license
 * Copyright 2022 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function d(t){const e=function(t){const e=[];function i(e,r,s=[]){const o=function(t,e){const i=t.findIndex((t=>e===t.itemId));return i>=0?t[i]:null}(t,e);if(o){const t={id:e,dependencies:[]};s.indexOf(e)<0&&(s.push(e),o.dependencies.forEach((e=>{const r=n.indexOf(e);r>=0&&n.splice(r,1),i(e,t.dependencies,s)}))),r.push(t)}}let n=function(t){const e=t.map((t=>t.itemId));return t.forEach((t=>{(t.dependencies||[]).forEach((t=>{const i=e.indexOf(t);i>=0&&e.splice(i,1)}))})),e}(t);const r=t.filter((t=>n.indexOf(t.itemId)<0)).sort(((t,e)=>e.dependencies.length-t.dependencies.length));n=n.concat(r.map((t=>t.itemId)));let s=n.shift();for(;void 0!==s;)i(s,e),s=n.shift();return e}(t),i=e.reduce(((t,e)=>(t.push(e.id),t)),[]);return t.reduce(((n,r)=>{if(i.indexOf(r.itemId)>-1){const i=e.filter((t=>t.id===r.itemId));n.push(p(r,t,i[0].dependencies))}return n}),[])}function f(t,e,i,n){t.forEach((t=>{const r=t.name&&t.name.indexOf("||")>-1?t.name.split("||")[1].replace("}}","").trim():t.name;e.dependencies.push({id:i.itemId,title:`${r} (${n.id})`,value:`{{${i.itemId}.layer${t.id}.id}}`}),e.dependencies.push({id:i.itemId,title:`${r} (${n.name})`,value:`{{${i.itemId}.layer${t.id}.name||${r}}}`})}))}function p(t,e,i){return{id:t.itemId||"",title:t.item.title||"",dependencies:w(i,e),type:t.item.type||"",typeKeywords:t.item.typeKeywords||[]}}function w(t,e){const i=[],n=t.reduce(((t,e)=>(t.push(e.id),i.push(e),t)),[]);return e.reduce(((t,r)=>{const s=n.indexOf(r.itemId);return s>-1&&t.push(p(r,e,i[s].dependencies)),t}),[])}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var v=function(){return v=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var r in e=arguments[i])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t},v.apply(this,arguments)};function g(t,e){var i=e;return i.rawResponse=!1,r(t,i).then((function(t){var e={token:t.access_token,username:t.username,expires:new Date(Date.now()+(1e3*t.expires_in-1e3)),ssl:!0===t.ssl};return t.refresh_token&&(e.refreshToken=t.refresh_token),e}))}function m(t,e){var i=e;return i.params.referer="undefined"!=typeof window&&window.location&&window.location.host?window.location.host:s,r(t,i)}var b=/^https?:\/\/(\S+)\.arcgis\.com.+/;function k(t){return b.test(t)}function y(t){if(!b.test(t))return null;var e=t.match(b)[1].split(".").pop();return e.includes("dev")?"dev":e.includes("qa")?"qa":"production"}var x=function(){function t(t){if(this.clientId=t.clientId,this._refreshToken=t.refreshToken,this._refreshTokenExpires=t.refreshTokenExpires,this.username=t.username,this.password=t.password,this._token=t.token,this._tokenExpires=t.tokenExpires,this.portal=t.portal?o(t.portal):"https://www.arcgis.com/sharing/rest",this.ssl=t.ssl,this.provider=t.provider||"arcgis",this.tokenDuration=t.tokenDuration||20160,this.redirectUri=t.redirectUri,this.refreshTokenTTL=t.refreshTokenTTL||20160,this.server=t.server,this.federatedServers={},this.trustedDomains=[],t.server){var e=this.getServerRootUrl(t.server);this.federatedServers[e]={token:t.token,expires:t.tokenExpires}}this._pendingTokenRequests={}}return Object.defineProperty(t.prototype,"token",{get:function(){return this._token},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"tokenExpires",{get:function(){return this._tokenExpires},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"refreshToken",{get:function(){return this._refreshToken},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"refreshTokenExpires",{get:function(){return this._refreshTokenExpires},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"trustedServers",{get:function(){return console.log("DEPRECATED: use federatedServers instead"),this.federatedServers},enumerable:!1,configurable:!0}),t.beginOAuth2=function(e,i){void 0===i&&(i=window),e.duration&&console.log("DEPRECATED: 'duration' is deprecated - use 'expiration' instead");var n,r=v({portal:"https://www.arcgis.com/sharing/rest",provider:"arcgis",expiration:20160,popup:!0,popupWindowFeatures:"height=400,width=600,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes",state:e.clientId,locale:""},e),s=r.portal,o=r.provider,u=r.clientId,c=r.expiration,l=r.redirectUri,d=r.popup,f=r.popupWindowFeatures,p=r.state,w=r.locale,g=r.params;if(n="arcgis"===o?s+"/oauth2/authorize?client_id="+u+"&response_type=token&expiration="+(e.duration||c)+"&redirect_uri="+encodeURIComponent(l)+"&state="+p+"&locale="+w:s+"/oauth2/social/authorize?client_id="+u+"&socialLoginProviderName="+o+"&autoAccountCreateForSocial=true&response_type=token&expiration="+(e.duration||c)+"&redirect_uri="+encodeURIComponent(l)+"&state="+p+"&locale="+w,g&&(n=n+"&"+a(g)),d){var m,b=((m={promise:null,resolve:null,reject:null}).promise=new Promise((function(t,e){m.resolve=t,m.reject=e})),m);return i["__ESRI_REST_AUTH_HANDLER_"+u]=function(e,i){if(e){var n=JSON.parse(e);b.reject(new h(n.errorMessage,n.error))}else if(i){var r=JSON.parse(i);b.resolve(new t({clientId:u,portal:s,ssl:r.ssl,token:r.token,tokenExpires:new Date(r.expires),username:r.username}))}},i.open(n,"oauth-window",f),b.promise}i.location.href=n},t.completeOAuth2=function(e,i){void 0===i&&(i=window);var n=v({portal:"https://www.arcgis.com/sharing/rest",popup:!0},e),r=n.portal,s=n.clientId,o=n.popup;function a(e,n){try{var a=void 0,u="__ESRI_REST_AUTH_HANDLER_"+s;if(o&&(i.opener?i.opener.parent&&i.opener.parent[u]?a=i.opener.parent[u]:i.opener&&i.opener[u]&&(a=i.opener[u]):i!==i.parent&&i.parent&&i.parent[u]&&(a=i.parent[u]),a))return a(e?JSON.stringify(e):void 0,JSON.stringify(n)),void i.close()}catch(t){throw new h('Unable to complete authentication. It\'s possible you specified popup based oAuth2 but no handler from "beginOAuth2()" present. This generally happens because the "popup" option differs between "beginOAuth2()" and "completeOAuth2()".')}if(e)throw new h(e.errorMessage,e.error);return new t({clientId:s,portal:r,ssl:n.ssl,token:n.token,tokenExpires:n.expires,username:n.username})}var u=i.location.hash.replace(/^#/,"").split("&").reduce((function(t,e){var i=function(t){var e=t.split("="),i=e[1];return{key:decodeURIComponent(e[0]),value:decodeURIComponent(i)}}(e);return t[i.key]=i.value,t}),{});if(!u.access_token){var c=void 0,l="Unknown error";return u.error&&(c=u.error,l=u.error_description),a({error:c,errorMessage:l})}return a(void 0,{token:u.access_token,expires:new Date(Date.now()+1e3*parseInt(u.expires_in,10)-6e4),ssl:"true"===u.ssl,username:u.username})},t.fromParent=function(e,i){var n;return!i&&window&&(i=window),new Promise((function(r,s){i.addEventListener("message",n=function(e){if(e.source===i.parent&&e.data)try{return r(t.parentMessageHandler(e))}catch(t){return s(t)}},!1),i.parent.postMessage({type:"arcgis:auth:requestCredential"},e)})).then((function(t){return i.removeEventListener("message",n,!1),t}))},t.authorize=function(t,e){t.duration&&console.log("DEPRECATED: 'duration' is deprecated - use 'expiration' instead");var i=v({portal:"https://arcgis.com/sharing/rest",expiration:20160},t);e.writeHead(301,{Location:i.portal+"/oauth2/authorize?client_id="+i.clientId+"&expiration="+(t.duration||i.expiration)+"&response_type=code&redirect_uri="+encodeURIComponent(i.redirectUri)}),e.end()},t.exchangeAuthorizationCode=function(e,i){var n=v({portal:"https://www.arcgis.com/sharing/rest",refreshTokenTTL:20160},e),r=n.portal,s=n.clientId,o=n.redirectUri,a=n.refreshTokenTTL;return g(r+"/oauth2/token",{params:{grant_type:"authorization_code",client_id:s,redirect_uri:o,code:i}}).then((function(e){return new t({clientId:s,portal:r,ssl:e.ssl,redirectUri:o,refreshToken:e.refreshToken,refreshTokenTTL:a,refreshTokenExpires:new Date(Date.now()+60*(a-1)*1e3),token:e.token,tokenExpires:e.expires,username:e.username})}))},t.deserialize=function(e){var i=JSON.parse(e);return new t({clientId:i.clientId,refreshToken:i.refreshToken,refreshTokenExpires:new Date(i.refreshTokenExpires),username:i.username,password:i.password,token:i.token,tokenExpires:new Date(i.tokenExpires),portal:i.portal,ssl:i.ssl,tokenDuration:i.tokenDuration,redirectUri:i.redirectUri,refreshTokenTTL:i.refreshTokenTTL})},t.fromCredential=function(e){var i=void 0===e.ssl||e.ssl,n=e.expires||Date.now()+72e5;return new t({portal:e.server.includes("sharing/rest")?e.server:e.server+"/sharing/rest",ssl:i,token:e.token,username:e.userId,tokenExpires:new Date(n)})},t.parentMessageHandler=function(e){if("arcgis:auth:credential"===e.data.type)return t.fromCredential(e.data.credential);if("arcgis:auth:error"===e.data.type){var i=new Error(e.data.error.message);throw i.name=e.data.error.name,i}throw new Error("Unknown message type.")},t.prototype.toCredential=function(){return{expires:this.tokenExpires.getTime(),server:this.portal,ssl:this.ssl,token:this.token,userId:this.username}},t.prototype.getUser=function(t){var e=this;if(this._pendingUserRequest)return this._pendingUserRequest;if(this._user)return Promise.resolve(this._user);var i=this.portal+"/community/self",n=v(v({httpMethod:"GET",authentication:this},t),{rawResponse:!1});return this._pendingUserRequest=r(i,n).then((function(t){return e._user=t,e._pendingUserRequest=null,t})),this._pendingUserRequest},t.prototype.getPortal=function(t){var e=this;if(this._pendingPortalRequest)return this._pendingPortalRequest;if(this._portalInfo)return Promise.resolve(this._portalInfo);var i=this.portal+"/portals/self",n=v(v({httpMethod:"GET",authentication:this},t),{rawResponse:!1});return this._pendingPortalRequest=r(i,n).then((function(t){return e._portalInfo=t,e._pendingPortalRequest=null,t})),this._pendingPortalRequest},t.prototype.getUsername=function(){return this.username?Promise.resolve(this.username):this._user?Promise.resolve(this._user.username):this.getUser().then((function(t){return t.username}))},t.prototype.getToken=function(t,e){return n=t,r=k(i=this.portal),s=k(n),o=y(i),a=y(n),r&&s&&o===a||new RegExp(this.portal,"i").test(t)?this.getFreshToken(e):this.getTokenForServer(t,e);var i,n,r,s,o,a},t.prototype.validateAppAccess=function(t){return this.getToken(this.portal).then((function(e){return function(t,e,i){return void 0===i&&(i="https://www.arcgis.com/sharing/rest"),r(i+"/oauth2/validateAppAccess",{method:"POST",params:{f:"json",client_id:e,token:t}})}(e,t)}))},t.prototype.toJSON=function(){return{clientId:this.clientId,refreshToken:this.refreshToken,refreshTokenExpires:this.refreshTokenExpires,username:this.username,password:this.password,token:this.token,tokenExpires:this.tokenExpires,portal:this.portal,ssl:this.ssl,tokenDuration:this.tokenDuration,redirectUri:this.redirectUri,refreshTokenTTL:this.refreshTokenTTL}},t.prototype.serialize=function(){return JSON.stringify(this)},t.prototype.enablePostMessageAuth=function(t,e){!e&&window&&(e=window),this._hostHandler=this.createPostMessageHandler(t),e.addEventListener("message",this._hostHandler,!1)},t.prototype.disablePostMessageAuth=function(t){!t&&window&&(t=window),t.removeEventListener("message",this._hostHandler,!1)},t.prototype.refreshSession=function(t){return this._user=null,this.username&&this.password?this.refreshWithUsernameAndPassword(t):this.clientId&&this.refreshToken?this.refreshWithRefreshToken():Promise.reject(new h("Unable to refresh token."))},t.prototype.getServerRootUrl=function(t){var e=o(t).split(/\/rest(\/admin)?\/services(?:\/|#|\?|$)/)[0].match(/(https?:\/\/)(.+)/),i=e[1],n=e[2].split("/"),r=n[0],s=n.slice(1);return""+i+r.toLowerCase()+"/"+s.join("/")},t.prototype.getDomainCredentials=function(t){return this.trustedDomains&&this.trustedDomains.length&&this.trustedDomains.some((function(e){return t.startsWith(e)}))?"include":"same-origin"},t.prototype.createPostMessageHandler=function(t){var e=this;return function(i){var n=t.indexOf(i.origin)>-1,r="arcgis:auth:requestCredential"===i.data.type,s=e.tokenExpires.getTime()>Date.now();if(n&&r){var o={};if(s){var a=e.toCredential();a.server=a.server.replace("/sharing/rest",""),o={type:"arcgis:auth:credential",credential:a}}else o={type:"arcgis:auth:error",error:{name:"tokenExpiredError",message:"Session token was expired, and not returned to the child application"}};i.source.postMessage(o,i.origin)}}},t.prototype.getTokenForServer=function(t,e){var i=this,n=this.getServerRootUrl(t),s=this.federatedServers[n];return s&&s.expires&&s.expires.getTime()>Date.now()?Promise.resolve(s.token):(this._pendingTokenRequests[n]||(this._pendingTokenRequests[n]=this.fetchAuthorizedDomains().then((function(){return r(n+"/rest/info",{credentials:i.getDomainCredentials(t)}).then((function(s){if(s.owningSystemUrl){if(a=s.owningSystemUrl,u=o(function(t){if(!b.test(t))return t;switch(y(t)){case"dev":return"https://devext.arcgis.com/sharing/rest";case"qa":return"https://qaext.arcgis.com/sharing/rest";default:return"https://www.arcgis.com/sharing/rest"}}(i.portal)).replace(/https?:\/\//,""),c=o(a).replace(/https?:\/\//,""),new RegExp(c,"i").test(u))return r(s.owningSystemUrl+"/sharing/rest/info",e);throw new h(t+" is not federated with "+i.portal+".","NOT_FEDERATED")}var a,u,c;if(s.authInfo&&void 0!==i.federatedServers[n])return Promise.resolve({authInfo:s.authInfo});throw new h(t+" is not federated with any portal and is not explicitly trusted.","NOT_FEDERATED")})).then((function(t){return t.authInfo.tokenServicesUrl})).then((function(e){return i.token&&i.tokenExpires.getTime()>Date.now()?m(e,{params:{token:i.token,serverUrl:t,expiration:i.tokenDuration,client:"referer"}}):m(e,{params:{username:i.username,password:i.password,expiration:i.tokenDuration,client:"referer"}}).then((function(t){return i._token=t.token,i._tokenExpires=new Date(t.expires),t}))})).then((function(t){return i.federatedServers[n]={expires:new Date(t.expires),token:t.token},delete i._pendingTokenRequests[n],t.token}))}))),this._pendingTokenRequests[n])},t.prototype.getFreshToken=function(t){var e=this;return this.token&&!this.tokenExpires||this.token&&this.tokenExpires&&this.tokenExpires.getTime()>Date.now()?Promise.resolve(this.token):(this._pendingTokenRequests[this.portal]||(this._pendingTokenRequests[this.portal]=this.refreshSession(t).then((function(t){return e._pendingTokenRequests[e.portal]=null,t.token}))),this._pendingTokenRequests[this.portal])},t.prototype.refreshWithUsernameAndPassword=function(t){var e=this,i=v({params:{username:this.username,password:this.password,expiration:this.tokenDuration}},t);return m(this.portal+"/generateToken",i).then((function(t){return e._token=t.token,e._tokenExpires=new Date(t.expires),e}))},t.prototype.refreshWithRefreshToken=function(t){var e=this;if(this.refreshToken&&this.refreshTokenExpires&&this.refreshTokenExpires.getTime()<Date.now())return this.refreshRefreshToken(t);var i=v({params:{client_id:this.clientId,refresh_token:this.refreshToken,grant_type:"refresh_token"}},t);return g(this.portal+"/oauth2/token",i).then((function(t){return e._token=t.token,e._tokenExpires=t.expires,e}))},t.prototype.refreshRefreshToken=function(t){var e=this,i=v({params:{client_id:this.clientId,refresh_token:this.refreshToken,redirect_uri:this.redirectUri,grant_type:"exchange_refresh_token"}},t);return g(this.portal+"/oauth2/token",i).then((function(t){return e._token=t.token,e._tokenExpires=t.expires,e._refreshToken=t.refreshToken,e._refreshTokenExpires=new Date(Date.now()+60*(e.refreshTokenTTL-1)*1e3),e}))},t.prototype.fetchAuthorizedDomains=function(){var t=this;return this.server||!this.portal?Promise.resolve(this):this.getPortal().then((function(e){return e.authorizedCrossOriginDomains&&e.authorizedCrossOriginDomains.length&&(t.trustedDomains=e.authorizedCrossOriginDomains.filter((function(t){return!t.startsWith("http://")})).map((function(t){return t.startsWith("https://")?t:"https://"+t}))),t}))},t}();const E=class{async serializedAuthenticationWatchHandler(){this.authentication=this.serializedAuthentication?x.deserialize(this.serializedAuthentication):new x({})}async valueWatchHandler(){await this._loadSolution(this.solutionItemId)}constructor(e){t(this,e),this._solutionStoreHasChanges=!1,this._solutionEditorHasChanges=!1,this._solutionEditorHasErrors=!1,this._canSave=!1,this.authentication=new x({}),this.serializedAuthentication="",this.solutionItemId="",this.showLoading=!1,this._currentEditItemId="",this._organizationVariables="",this._solutionContentsComponent=void 0,this._solutionIsLoaded=!1,this._solutionVariables="",this._templateHierarchy=[],this._translations=void 0,this._treeOpen=!0,this.serializedAuthentication&&(this.authentication=x.deserialize(this.serializedAuthentication)),this._loadSolution(this.solutionItemId),window.addEventListener("solutionStoreHasChanges",(t=>{this._updateSaveability(this._solutionStoreHasChanges=t.detail,this._solutionEditorHasChanges,this._solutionEditorHasErrors)})),window.addEventListener("solutionEditorHasChanges",(t=>{this._updateSaveability(this._solutionStoreHasChanges,this._solutionEditorHasChanges=t.detail,this._solutionEditorHasErrors)})),window.addEventListener("solutionEditorHasErrors",(t=>{this._updateSaveability(this._solutionStoreHasChanges,this._solutionEditorHasChanges,this._solutionEditorHasErrors=t.detail)}))}async componentWillLoad(){return this._getTranslations()}render(){const t=u(c.getStoreInfo("spatialReferenceInfo"),"spatialReference"),n=c.getStoreInfo("featureServices").length>0,r=c.getStoreInfo("solutionData");var s;return this._solutionVariables=JSON.stringify(function(t,e){const i=[];return t.forEach((t=>{const n={id:t.itemId,title:t.item.title||t.item.name,type:t.type,value:void 0,dependencies:[{id:t.itemId,title:e.itemId,value:`{{${t.itemId}.itemId}}`}]};t.item.url&&n.dependencies.push({id:t.itemId,title:e.url,value:`{{${t.itemId}.url}}`}),"Feature Service"===t.type&&(n.dependencies.push({id:t.itemId,title:e.solutionExtent,value:`{{${t.itemId}.solutionExtent}}`}),f(t.properties.layers||[],n,t,e),f(t.properties.tables||[],n,t,e)),i.push(n)})),i}(r.templates,this._translations)),this._organizationVariables=JSON.stringify([{id:"",title:(s=this._translations).geocodeUrl,value:"{{organization.helperServices.geocode:getDefaultLocatorURL}}"},{id:"",title:s.geometryUrl,value:"{{organization.helperServices.geometry.url}}"},{id:"",title:s.portalBaseUrl,value:"{{portalBaseUrl}}"},{id:"",title:s.routeUrl,value:"{{organization.helperServices.route.url}}"},{id:"",title:s.solutionItemExtent,value:"{{solutionItemExtent}}"}]),e(i,null,this._solutionIsLoaded?null:e("calcite-loader",{active:!0,label:""}),e("div",{class:"configuration-container"},e("div",{class:"configuration"},e("calcite-tabs",{class:"config-tabs"},e("calcite-tab-nav",{slot:"tab-nav"},e("calcite-tab-title",null,this._translations.definitionTab),n?e("calcite-tab-title",null,this._translations.spatialReferenceTab):null),e("calcite-tab",{class:"config-tab",selected:!0},e("div",{class:"config-solution"},e("div",{class:this._treeOpen?"config-inventory":"config-inventory-hide"},e("solution-contents",{id:"configInventory",key:`${this.solutionItemId}-contents`,ref:t=>this._solutionContentsComponent=t})),e("calcite-button",{appearance:"transparent",class:"collapse-btn","icon-start":this._treeOpen?"chevrons-left":"chevrons-right",id:"collapse-vars",onClick:()=>this._toggleTree(),scale:"s",title:this._treeOpen?this._translations.collapse:this._translations.expand}),e("div",{class:"config-item"},e("solution-item",{authentication:this.authentication,"item-id":this._currentEditItemId,key:`${this.solutionItemId}-item`,"organization-variables":this._organizationVariables,"solution-item-id":this.solutionItemId,"solution-variables":this._solutionVariables})))),n?e("calcite-tab",{class:"config-tab"},e("div",{class:"config-solution"},e("solution-spatial-ref",{defaultWkid:t,id:"configure-solution-spatial-ref",key:`${this.solutionItemId}-spatial-ref`,locked:!t,services:c.getStoreInfo("featureServices").map((t=>t.name))}))):null))))}_solutionItemSelected(t){this._currentEditItemId=t.detail}async getSpatialReferenceInfo(){return Promise.resolve(c.getStoreInfo("spatialReferenceInfo"))}async saveSolution(){this._solutionIsLoaded=!1,await c.saveSolution(),this._solutionIsLoaded=!0,this.solutionItemId=null}async unloadSolution(){this.solutionItemId=null}_initProps(){const t=c.getStoreInfo("solutionData");let e;this._templateHierarchy=[...d(t.templates)],this._solutionContentsComponent&&(this._solutionContentsComponent.templateHierarchy=this._templateHierarchy),this._templateHierarchy.length>0&&(e=c.getItemInfo(this._templateHierarchy[0].id)),this._currentEditItemId=e?e.itemId:""}async _loadSolution(t){return t?(this._solutionIsLoaded=!1,await c.loadSolution(t,this.authentication),this._initProps(),this._solutionIsLoaded=!0):this._reset(),Promise.resolve()}_reset(){this._currentEditItemId="",this._organizationVariables="",this._solutionVariables="",this._templateHierarchy=[]}_toggleTree(){this._treeOpen=!this._treeOpen}_updateSaveability(t,e,i){const n=(t||e)&&!i;this._canSave!==n&&window.dispatchEvent(new CustomEvent("solutionCanSave",{detail:n,bubbles:!0,cancelable:!1,composed:!0})),this._canSave=n}async _getTranslations(){const t=await l(this.el);this._translations=t[0]}get el(){return n(this)}static get watchers(){return{serializedAuthentication:["serializedAuthenticationWatchHandler"],solutionItemId:["valueWatchHandler"]}}};E.style=".configuration-container{position:relative;height:100%;width:100%}.configuration{position:absolute;top:0px;right:0px;bottom:0px;left:0px;display:flex;padding:0.5rem;border:1px #808080 solid}.config-tabs{width:100%}.config-tab{width:100%}.config-solution{position:absolute;top:3.5rem;right:-1px;bottom:-1px;left:-1px;display:flex;padding:0.5rem}.config-inventory{display:inline;max-width:-moz-min-content;max-width:min-content;flex-grow:0;overflow-y:auto}.config-inventory-hide{display:none;max-width:-moz-min-content;max-width:min-content;flex-grow:0;overflow-y:auto}.config-item{position:relative;display:inline;flex-grow:1;overflow-y:auto;-webkit-margin-start:0.5rem;margin-inline-start:0.5rem}solution-contents{position:relative;height:100%}solution-item{position:relative;height:100%}solution-spatial-ref{position:relative;height:100%;width:100%;overflow-y:auto}";export{E as solution_configuration}