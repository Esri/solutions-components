/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{r as a,h as i,H as e,g as s}from"./p-c2f00d41.js";import{g as t}from"./p-829e6d4f.js";import"./p-e1a4994d.js";const n=class{constructor(i){a(this,i),this._translations=void 0}async componentWillLoad(){await this._getTranslations();const a=window.location.href,i=`${a.substring(0,a.lastIndexOf("/"))}/data/generic.png`;this._fakeValues=[{name:"Filename.png",description:"This is an example of what a media description looks like.",url:i},{name:"Filename2.png",description:"Another example of what a media description looks like.",url:i},{name:"Filename3.png",description:"And another example of a media description.",url:i}],this._fakeInfos={Details:"Details info goes here",Name:"Name here",Phone:"(000) 000-0000",Email:"example@gmail.com",Date:"May 11, 2022"}}render(){return i(e,null,i("div",{class:"display-inline-table"},i("div",{class:"w-100 display-flex padding-bottom-1"},i("calcite-button",{appearance:"outline",class:"w-1-2"},this._translations.information),i("calcite-button",{class:"w-1-2"},this._translations.media)),i("div",null,i("media-card",{class:"",values:this._fakeValues}),i("info-card",{class:"display-none",values:this._fakeInfos}))))}async _getTranslations(){const a=await t(this.el);this._translations=a[0]}get el(){return s(this)}};n.style=":host{display:block}.display-inline-table{display:inline-table}.display-flex{display:flex}.display-none{display:none}.w-100{width:100%}.w-1-2{width:50%}.padding-bottom-1{padding-bottom:1rem}";export{n as card_manager}