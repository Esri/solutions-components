/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{r as t,h as i,H as a,g as s}from"./p-c2f00d41.js";import{g as l}from"./p-9260d75a.js";import"./p-e1a4994d.js";const o=class{constructor(i){t(this,i),this.open=!1,this._translations=void 0}async componentWillLoad(){await this._getTranslations()}render(){return i(a,null,i("div",null,i("calcite-modal",{open:this.open,width:"s"},i("div",{class:"font-500",slot:"header"},this._translations.addRecord),i("div",{slot:"content"},i("div",null,i("div",{class:"padding-bottom-1"},i("calcite-label",{class:"font-bold"},this._translations.source,i("calcite-input",{placeholder:this._translations.textField,type:"textarea"}))),i("div",{class:"padding-bottom-1"},i("calcite-label",{class:"font-bold"},this._translations.publicView,i("calcite-input",{placeholder:this._translations.textField,type:"textarea"}))),i("div",{class:"padding-bottom-1"},i("calcite-label",{class:"font-bold"},this._translations.attachments,i("div",null,i("input",{class:"display-none",onChange:t=>this._updateAttachment(t),ref:t=>this._browseForAttachment=t,type:"file"}),i("calcite-button",{appearance:"solid",color:"neutral",onClick:()=>this._browse(),width:"auto"},this._translations.browse)))))),i("calcite-button",{appearance:"outline",onClick:()=>this._cancel(),slot:"secondary",width:"full"},this._translations.cancel),i("calcite-button",{appearance:"solid",onClick:()=>this._save(),slot:"primary",width:"full"},this._translations.save))))}_browse(){this._browseForAttachment.click()}_cancel(){this.open=!1}_save(){this.open=!1}_updateAttachment(t){const i=t.target.files;i&&i[0]&&console.log(i[0])}async _getTranslations(){const t=await l(this.el);this._translations=t[0]}get el(){return s(this)}};o.style=":host{display:block;--calcite-label-margin-bottom:0px}.padding-bottom-1{padding-bottom:1rem}.font-bold{font-weight:bold}.font-500{font-weight:500}.display-none{display:none}";export{o as add_record_modal}