/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{r as i,c as t,h as s,H as a,g as e}from"./p-c2f00d41.js";import{l as o}from"./p-4aa3ba60.js";import{g as r}from"./p-829e6d4f.js";import"./p-e1a4994d.js";const h=class{constructor(s){i(this,s),this.searchChange=t(this,"searchChange",7),this.mapView=void 0,this.searchConfiguration=void 0,this._searchTerm=void 0,this._translations=void 0}async clear(){this._searchWidget.clear()}async componentWillLoad(){await this._getTranslations(),await this._initModules()}componentDidLoad(){this._init()}render(){return s(a,null,s("div",{class:"search-widget",ref:i=>{this._searchElement=i}}))}async _initModules(){const[i,t]=await o(["esri/widgets/Search","esri/layers/FeatureLayer"]);this.Search=i,this.FeatureLayer=t}_init(){this._initSearchWidget()}_initSearchWidget(){if(this.mapView&&this._searchElement){const i=this._getSearchConfig(this.searchConfiguration,this.mapView),t=Object.assign({view:this.mapView,container:this._searchElement,searchTerm:this._searchTerm},i);this._searchWidget=new this.Search(t),this._searchWidget.on("search-clear",(()=>{this._searchResult=void 0,this.searchChange.emit(this._searchResult)})),this._searchWidget.on("select-result",(i=>{this._searchResult=void 0,i.result&&(this._searchResult=i.result,this.searchChange.emit({graphics:[i.result.feature],name:i.result.name||""}))}))}}_getSearchConfig(i,t){var s;const a=null==i?void 0:i.sources;return a&&a.forEach((i=>{var s,a,e;if(i.hasOwnProperty("layer")){const o=i,r=(null===(s=o.layer)||void 0===s?void 0:s.id)?t.map.findLayerById(o.layer.id):null;r?o.layer=r:(null===(a=null==o?void 0:o.layer)||void 0===a?void 0:a.url)&&(o.layer=new this.FeatureLayer(null===(e=null==o?void 0:o.layer)||void 0===e?void 0:e.url))}})),null===(s=null==i?void 0:i.sources)||void 0===s||s.forEach((i=>{if(i.hasOwnProperty("locator")){const t=i;t.url=t.url,delete t.url}})),i}async _getTranslations(){const i=await r(this.el);this._translations=i[0]}get el(){return e(this)}};h.style=":host{display:block}.search-widget{width:100% !important;border:1px solid var(--calcite-ui-border-input)}";export{h as map_search}