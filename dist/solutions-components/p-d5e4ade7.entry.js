/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import{r as e,c as t,h as i,H as a,g as o,a as n}from"./p-c2f00d41.js";import{f as c,n as r,m as s,a as l,b as d,t as m,j as p}from"./p-83166522.js";import{C as h}from"./p-729708a3.js";import{c as u,d as g}from"./p-1c247f54.js";import{u as b}from"./p-7daea1df.js";import"./p-a80b3880.js";import"./p-9a9955db.js";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */var f;function k(e,t){const i="down"===t?"nextElementSibling":"previousElementSibling";let a=e,o=null;for(;null==(n=a)?void 0:n.matches("calcite-tree-item");){if(!a.disabled){o=a;break}a=a[i]}
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
var n;return o}!function(e){e.Single="single",e.Multi="multi",e.None="none",e.Children="children",e.MultiChildren="multi-children",e.Ancestors="ancestors"}(f||(f={}));const y=class{constructor(i){e(this,i),this.calciteTreeSelect=t(this,"calciteTreeSelect",6),this.lines=!1,this.inputEnabled=!1,this.scale="m",this.selectionMode=f.Single}componentWillRender(){var e;const t=null===(e=this.el.parentElement)||void 0===e?void 0:e.closest("calcite-tree");this.lines=t?t.lines:this.lines,this.scale=t?t.scale:this.scale,this.selectionMode=t?t.selectionMode:this.selectionMode,this.child=!!t}render(){return i(a,{"aria-multiselectable":this.child?void 0:(this.selectionMode===f.Multi||this.selectionMode===f.MultiChildren).toString(),role:this.child?void 0:"tree",tabIndex:this.getRootTabIndex()},i("slot",null))}onFocus(){if(!this.child){const e=this.el.querySelector("calcite-tree-item[selected]:not([disabled])")||this.el.querySelector("calcite-tree-item:not([disabled])");c(e)}}onFocusIn(e){(e.relatedTarget===this.el||!this.el.contains(e.relatedTarget))&&this.el.removeAttribute("tabindex")}onFocusOut(e){!this.el.contains(e.relatedTarget)&&(this.el.tabIndex=this.getRootTabIndex())}onClick(e){const t=e.target,i=r(t.querySelectorAll("calcite-tree-item"));if(this.child)return;if(this.child||(e.preventDefault(),e.stopPropagation()),this.selectionMode===f.Ancestors&&!this.child)return void this.updateAncestorTree(e);const a=this.selectionMode===f.None,o=!a&&e.detail.modifyCurrentSelection&&(this.selectionMode===f.Multi||this.selectionMode===f.MultiChildren),n=this.selectionMode===f.MultiChildren||this.selectionMode===f.Children,c=!o&&((this.selectionMode===f.Single||this.selectionMode===f.Multi)&&i.length<=0||this.selectionMode===f.Children||this.selectionMode===f.MultiChildren),s=this.selectionMode===f.Children||this.selectionMode===f.MultiChildren;if(!this.child){const l=[];null!==this.selectionMode&&(!t.hasChildren||t.hasChildren&&(this.selectionMode===f.Children||this.selectionMode===f.MultiChildren))&&l.push(t),n&&i.forEach((e=>{l.push(e)})),c&&r(this.el.querySelectorAll("calcite-tree-item[selected]")).forEach((e=>{l.includes(e)||(e.selected=!1)})),s&&!e.detail.forceToggle&&(t.expanded=!0),o&&window.getSelection().removeAllRanges(),o&&t.selected||n&&e.detail.forceToggle?l.forEach((e=>{e.disabled||(e.selected=!1)})):a||l.forEach((e=>{e.disabled||(e.selected=!0)}))}const l=a?[t]:r(this.el.querySelectorAll("calcite-tree-item")).filter((e=>e.selected));this.calciteTreeSelect.emit({selected:l}),e.stopPropagation()}keyDownHandler(e){var t;const i=this.el.closest("calcite-tree:not([child])"),a=e.target;if(i===this.el&&"CALCITE-TREE-ITEM"===a.tagName&&this.el.contains(a))if("ArrowDown"!==e.key){if("ArrowUp"===e.key){const t=k(a.previousElementSibling,"up");t&&(t.focus(),e.preventDefault())}if("ArrowLeft"===e.key&&!a.disabled){if(a.hasChildren&&a.expanded)return a.expanded=!1,void e.preventDefault();const t=a.parentElement.closest("calcite-tree-item");return!t||a.hasChildren&&!1!==a.expanded?void 0:(t.focus(),void e.preventDefault())}"ArrowRight"!==e.key||a.disabled||a.hasChildren&&(a.expanded&&s(this.el).activeElement===a?(null===(t=k(a.querySelector("calcite-tree-item"),"down"))||void 0===t||t.focus(),e.preventDefault()):(a.expanded=!0,e.preventDefault()))}else{const t=k(a.nextElementSibling,"down");t&&(t.focus(),e.preventDefault())}}updateAncestorTree(e){const t=e.target;if(t.disabled)return;const i=[];let a=t.parentElement.closest("calcite-tree-item");for(;a;)i.push(a),a=a.parentElement.closest("calcite-tree-item");const o=Array.from(t.querySelectorAll("calcite-tree-item:not([disabled])")),n=o.filter((e=>!e.hasChildren)),c=o.filter((e=>e.hasChildren)),s=t.hasChildren?!(t.selected||t.indeterminate):!t.selected;function l(e,t){const i=e.filter((e=>e.selected)),a=e.filter((e=>!e.selected));t.selected=i.length===e.length,t.indeterminate=i.length>0&&a.length>0}n.forEach((e=>{e.selected=s,e.indeterminate=!1})),c.forEach((e=>{l(Array.from(e.querySelectorAll(":scope > calcite-tree > calcite-tree-item")),e)})),t.hasChildren?l(o,t):(t.selected=s,t.indeterminate=!1),i.forEach((e=>{const t=r(e.querySelectorAll("calcite-tree-item")),i=t.filter((e=>e.selected));if(0===i.length)return e.selected=!1,void(e.indeterminate=!1);const a=i.length<t.length;e.indeterminate=a,e.selected=!a})),this.calciteTreeSelect.emit({selected:r(this.el.querySelectorAll("calcite-tree-item")).filter((e=>e.selected))})}getRootTabIndex(){return this.child?-1:0}get el(){return o(this)}};y.style="@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host{display:block}:host(:focus){outline:2px solid transparent;outline-offset:2px}";
/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const v="children",w="bullet-point",x="check",_=class{constructor(i){e(this,i),this.calciteInternalTreeItemSelect=t(this,"calciteInternalTreeItemSelect",6),this.disabled=!1,this.selected=!1,this.expanded=!1,this.parentExpanded=!1,this.depth=-1,this.hasChildren=null,this.iconClickHandler=e=>{e.stopPropagation(),this.expanded=!this.expanded},this.childrenClickHandler=e=>e.stopPropagation(),this.updateParentIsExpanded=(e,t)=>{l(e,v,{all:!0,selector:"calcite-tree-item"}).forEach((e=>e.parentExpanded=t))},this.updateAncestorTree=()=>{var e;if(this.selected&&this.selectionMode===f.Ancestors){const t=[];let i=this.parentTreeItem;for(;i;)t.push(i),i=null===(e=i.parentElement)||void 0===e?void 0:e.closest("calcite-tree-item");t.forEach((e=>e.indeterminate=!0))}}}expandedHandler(e){this.updateParentIsExpanded(this.el,e)}getselectionMode(){this.isSelectionMultiLike=this.selectionMode===f.Multi||this.selectionMode===f.MultiChildren}connectedCallback(){var e;if(this.parentTreeItem=null===(e=this.el.parentElement)||void 0===e?void 0:e.closest("calcite-tree-item"),this.parentTreeItem){const{expanded:e}=this.parentTreeItem;this.updateParentIsExpanded(this.parentTreeItem,e)}u(this)}disconnectedCallback(){g(this)}componentWillRender(){var e;this.hasChildren=!!this.el.querySelector("calcite-tree"),this.depth=0;let t,i=this.el.closest("calcite-tree");if(i)for(this.selectionMode=i.selectionMode,this.scale=i.scale||"m",this.lines=i.lines;i&&(t=null===(e=i.parentElement)||void 0===e?void 0:e.closest("calcite-tree"),t!==i);)i=t,this.depth=this.depth+1}componentDidLoad(){this.updateAncestorTree()}componentDidRender(){b(this,(()=>this.parentExpanded||1===this.depth))}render(){const e="rtl"===d(this.el),t=this.selectionMode===f.Single||this.selectionMode===f.Children,o=this.selectionMode===f.Multi||this.selectionMode===f.MultiChildren,n=this.selectionMode===f.None&&!this.hasChildren,c=this.hasChildren?i("calcite-icon",{class:{chevron:!0,[h.rtl]:e},"data-test-id":"icon",icon:"chevron-right",onClick:this.iconClickHandler,scale:"s"}):null,r=i("slot",{key:"default-slot"}),s=this.selectionMode===f.Ancestors?i("label",{class:"checkbox-label",key:"checkbox-label"},i("calcite-checkbox",{checked:this.selected,class:"checkbox","data-test-id":"checkbox",indeterminate:this.hasChildren&&this.indeterminate,scale:this.scale,tabIndex:-1}),r):null,l=t?w:o?x:n?"blank":null,p=l?i("calcite-icon",{class:{"bullet-point":l===w,checkmark:l===x,[h.rtl]:e},icon:l,scale:"s"}):null,u=!(this.parentExpanded||1===this.depth);return i(a,{"aria-expanded":this.hasChildren?m(this.expanded):void 0,"aria-hidden":m(u),"aria-selected":this.selected?"true":o?"false":void 0,"calcite-hydrated-hidden":u,role:"treeitem"},i("div",{class:{"node-container":!0,[h.rtl]:e},"data-selection-mode":this.selectionMode,ref:e=>this.defaultSlotWrapper=e},c,p,s||r),i("div",{class:{"children-container":!0,[h.rtl]:e},"data-test-id":"calcite-tree-children",onClick:this.childrenClickHandler,ref:e=>this.childrenSlotWrapper=e,role:this.hasChildren?"group":void 0},i("slot",{name:v})))}onClick(e){const[t]=p(this.el,"a");t&&"a"!==e.composedPath()[0].tagName.toLowerCase()&&window.open(t.href,""===t.target?"_self":t.target),this.calciteInternalTreeItemSelect.emit({modifyCurrentSelection:this.selectionMode===f.Ancestors||this.isSelectionMultiLike,forceToggle:!1})}keyDownHandler(e){let t;switch(e.key){case" ":this.calciteInternalTreeItemSelect.emit({modifyCurrentSelection:this.isSelectionMultiLike,forceToggle:!1}),e.preventDefault();break;case"Enter":const i=r(this.el.children).find((e=>e.matches("a")));i?(i.click(),this.selected=!0):this.calciteInternalTreeItemSelect.emit({modifyCurrentSelection:this.isSelectionMultiLike,forceToggle:!1}),e.preventDefault();break;case"Home":t=this.el.closest("calcite-tree:not([child])");const a=t.querySelector("calcite-tree-item");null==a||a.focus();break;case"End":t=this.el.closest("calcite-tree:not([child])");let o=t.children[t.children.length-1],n=r(o.children).find((e=>e.matches("calcite-tree")));for(;n;)o=n.children[t.children.length-1],n=r(o.children).find((e=>e.matches("calcite-tree")));null==o||o.focus()}}get el(){return o(this)}static get watchers(){return{expanded:["expandedHandler"],selectionMode:["getselectionMode"]}}};_.style='@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([disabled]){pointer-events:none;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host{display:block;max-inline-size:100%;cursor:pointer;color:var(--calcite-ui-text-3)}:host([calcite-hydrated-hidden]){visibility:hidden !important;pointer-events:none}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host([scale=s]){font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .node-container{--calcite-tree-padding-y:0.25rem}:host([scale=s]) .node-container .checkbox,:host([scale=s]) .node-container .chevron,:host([scale=s]) .node-container .checkmark,:host([scale=s]) .node-container .bullet-point{margin-inline:0.25rem}:host([scale=m]){font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .node-container{--calcite-tree-padding-y:0.5rem}:host([scale=m]) .node-container .checkbox,:host([scale=m]) .node-container .chevron,:host([scale=m]) .node-container .checkmark,:host([scale=m]) .node-container .bullet-point{margin-inline:0.5rem}:host([scale=l]){font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .node-container{--calcite-tree-padding-y:0.75rem}:host([scale=l]) .node-container .checkbox,:host([scale=l]) .node-container .chevron,:host([scale=l]) .node-container .checkmark,:host([scale=l]) .node-container .bullet-point{margin-inline:0.75rem}:host([lines]) .children-container:after{position:absolute;inset-block-start:0px;z-index:1;inline-size:1px;transition-property:color, background-color, border-color, fill, stroke, -webkit-text-decoration-color;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, -webkit-text-decoration-color;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;block-size:96%;content:"";background-color:var(--calcite-ui-border-2)}:host(:not([lines])) .node-container:after{display:none}::slotted(*){min-inline-size:0px;max-inline-size:100%;overflow-wrap:break-word;color:inherit;text-decoration:none !important}::slotted(*):hover{text-decoration:none !important}::slotted(a){inline-size:100%;-webkit-text-decoration-line:none;text-decoration-line:none}:host{outline-color:transparent}:host(:focus:not([disabled])){outline:2px solid transparent;outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.checkbox{line-height:0}.checkbox-label{pointer-events:none;display:flex;align-items:center}.checkbox:focus{outline:2px solid transparent;outline-offset:2px}.children-container{position:relative;block-size:0px;overflow:hidden;-webkit-margin-start:1.25rem;margin-inline-start:1.25rem;transform:scaleY(0);opacity:0;transition:var(--calcite-animation-timing) cubic-bezier(0.215, 0.44, 0.42, 0.88), opacity var(--calcite-animation-timing) cubic-bezier(0.215, 0.44, 0.42, 0.88), all var(--calcite-animation-timing) ease-in-out;transform-origin:top}:host([expanded])>.children-container{transform:scaleY(1);opacity:1;block-size:auto}.node-container{position:relative;display:flex;align-items:center;padding-block:var(--calcite-tree-padding-y);padding-inline:0}.node-container .checkmark,.node-container .bullet-point{opacity:0;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;color:var(--calcite-ui-border-1)}.node-container:hover .checkmark,.node-container:hover .bullet-point,:host([selected]) .node-container:hover .checkmark,:host([selected]) .node-container:hover .bullet-point,:host(:focus:not([disabled])) .node-container .checkmark,:host(:focus:not([disabled])) .node-container .bullet-point{opacity:1}:host([selected])>.node-container,:host([selected])>.node-container:hover{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1)}:host([selected])>.node-container .bullet-point,:host([selected])>.node-container .checkmark,:host([selected])>.node-container:hover .bullet-point,:host([selected])>.node-container:hover .checkmark{opacity:1;color:var(--calcite-ui-brand)}:host([selection-mode=none]:not([has-children])):host([scale=s])>.node-container{-webkit-padding-start:0.5rem;padding-inline-start:0.5rem}:host([selection-mode=none]:not([has-children])):host([scale=m])>.node-container{-webkit-padding-start:1rem;padding-inline-start:1rem}:host([selection-mode=none]:not([has-children])):host([scale=l])>.node-container{-webkit-padding-start:1.5rem;padding-inline-start:1.5rem}:host(:not([has-children])):host([scale=s])>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-padding-start:1.25rem;padding-inline-start:1.25rem}:host(:not([has-children])):host([scale=m])>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-padding-start:1.5rem;padding-inline-start:1.5rem}:host(:not([has-children])):host([scale=l])>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-padding-start:1.75rem;padding-inline-start:1.75rem}:host([has-children])>.node-container[data-selection-mode=ancestors] .checkbox{-webkit-margin-start:0;margin-inline-start:0}:host([has-children])>.node-container .bullet-point,:host([has-children])>.node-container .checkmark{display:none}:host([has-children][expanded]:not([selected]):not([selection-mode=none]))>.node-container ::slotted(*){font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1)}:host([has-children][selected])>.node-container[data-selection-mode=children],:host([has-children][selected])>.node-container[data-selection-mode=multi-children]{color:var(--calcite-ui-brand)}.chevron{position:relative;align-self:center;color:var(--calcite-ui-text-3);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;flex:0 0 auto;transform:rotate(0deg)}.calcite--rtl .chevron{transform:rotate(180deg)}:host([expanded])>.node-container>.chevron{transform:rotate(90deg)}:host([selected]) .checkmark,:host([selected]) .bullet-point{color:var(--calcite-ui-brand)}';const D=class{constructor(t){e(this,t),this.isPortal=!1,this.type="",this.typeKeywords=[]}render(){return i("div",{title:this.type},i("img",{class:"item-type-icon item-type-icon-margin",height:"16",src:this._getIconUrl(this.type,this.typeKeywords),width:"16"}))}_getIconUrl(e,t){const i=e&&e.toLowerCase()||"";let a=!1,o=!1,c=!1,r=!1,s=!1,l=!1,d="";return t=t||[],i.indexOf("service")>0||"feature collection"===i||"kml"===i||"wms"===i||"wmts"===i||"wfs"===i?(a=t.indexOf("Hosted Service")>-1,"feature service"===i||"feature collection"===i||"kml"===i||"wfs"===i?(r=t.indexOf("Table")>-1,o=t.indexOf("Route Layer")>-1,c=t.indexOf("Markup")>-1,s=-1!==t.indexOf("Spatiotemporal"),d=s&&r?"spatiotemporaltable":r?"table":o?"routelayer":c?"markup":s?"spatiotemporal":a?"featureshosted":"features"):"map service"===i||"wms"===i||"wmts"===i?(s=-1!==t.indexOf("Spatiotemporal"),l=-1!==t.indexOf("Relational"),d=s||l?"mapimages":a||t.indexOf("Tiled")>-1||"wmts"===i?"maptiles":"mapimages"):d="scene service"===i?t.indexOf("Line")>-1?"sceneweblayerline":t.indexOf("3DObject")>-1?"sceneweblayermultipatch":t.indexOf("Point")>-1?"sceneweblayerpoint":t.indexOf("IntegratedMesh")>-1?"sceneweblayermesh":t.indexOf("PointCloud")>-1?"sceneweblayerpointcloud":t.indexOf("Polygon")>-1?"sceneweblayerpolygon":t.indexOf("Building")>-1?"sceneweblayerbuilding":"sceneweblayer":"image service"===i?t.indexOf("Elevation 3D Layer")>-1?"elevationlayer":t.indexOf("Tiled Imagery")>-1?"tiledimagerylayer":"imagery":"stream service"===i?"streamlayer":"vector tile service"===i?"vectortile":"datastore catalog service"===i?"datastorecollection":"geocoding service"===i?"geocodeservice":"geoprocessing service"===i&&t.indexOf("Web Tool")>-1&&this.isPortal?"tool":"layers"):d="web map"===i||"cityengine web scene"===i?"maps":"web scene"===i?t.indexOf("ViewingMode-Local")>-1?"webscenelocal":"websceneglobal":"web mapping application"===i||"mobile application"===i||"application"===i||"operation view"===i||"desktop application"===i?"apps":"map document"===i||"map package"===i||"published map"===i||"scene document"===i||"globe document"===i||"basemap package"===i||"mobile basemap package"===i||"mobile map package"===i||"project package"===i||"project template"===i||"pro map"===i||"layout"===i||"layer"===i&&t.indexOf("ArcGIS Pro")>-1||"explorer map"===i&&t.indexOf("Explorer Document")?"mapsgray":"service definition"===i||"csv"===i||"shapefile"===i||"cad drawing"===i||"geojson"===i||"360 vr experience"===i||"netcdf"===i||"administrative report"===i?"datafiles":"explorer add in"===i||"desktop add in"===i||"windows viewer add in"===i||"windows viewer configuration"===i?"appsgray":"arcgis pro add in"===i||"arcgis pro configuration"===i?"addindesktop":"rule package"===i||"file geodatabase"===i||"sqlite geodatabase"===i||"csv collection"===i||"kml collection"===i||"windows mobile package"===i||"map template"===i||"desktop application template"===i||"gml"===i||"arcpad package"===i||"code sample"===i||"form"===i||"document link"===i||"operations dashboard add in"===i||"rules package"===i||"image"===i||"workflow manager package"===i||"explorer map"===i&&t.indexOf("Explorer Mapping Application")>-1||t.indexOf("Document")>-1?"datafilesgray":"network analysis service"===i||"geoprocessing service"===i||"geodata service"===i||"geometry service"===i||"geoprocessing package"===i||"locator package"===i||"geoprocessing sample"===i||"workflow manager service"===i?"toolsgray":"layer"===i||"layer package"===i||"explorer layer"===i?"layersgray":"scene package"===i?"scenepackage":"mobile scene package"===i?"mobilescenepackage":"tile package"===i||"compact tile package"===i?"tilepackage":"task file"===i?"taskfile":"report template"===i?"report-template":"statistical data collection"===i?"statisticaldatacollection":"insights workbook"===i?"workbook":"insights model"===i?"insightsmodel":"insights page"===i?"insightspage":"insights theme"===i?"insightstheme":"hub initiative"===i?"hubinitiative":"hub page"===i?"hubpage":"hub site application"===i?"hubsite":"hub event"===i?"hubevent":"relational database connection"===i?"relationaldatabaseconnection":"big data file share"===i?"datastorecollection":"image collection"===i?"imagecollection":"desktop style"===i?"desktopstyle":"style"===i?"style":"dashboard"===i?"dashboard":"raster function template"===i?"rasterprocessingtemplate":"vector tile package"===i?"vectortilepackage":"ortho mapping project"===i?"orthomappingproject":"ortho mapping template"===i?"orthomappingtemplate":"solution"===i?"solutions":"geopackage"===i?"geopackage":"deep learning package"===i?"deeplearningpackage":"real time analytic"===i?"realtimeanalytics":"big data analytic"===i?"bigdataanalytics":"feed"===i?"feed":"excalibur imagery project"===i?"excaliburimageryproject":"notebook"===i?"notebook":"storymap"===i?"storymap":"survey123 add in"===i?"survey123addin":"mission"===i?"mission":"mission report"===i?"missionreport":"quickcapture project"===i?"quickcaptureproject":"pro report"===i?"proreport":"urban model"===i?"urbanmodel":"web experience"===i?"experiencebuilder":"web experience template"===i?"webexperiencetemplate":"workflow"===i?"workflow":"kernel gateway connection"===i?"kernelgatewayconnection":"insights script"===i?"insightsscript":"hub initiative template"===i?"hubinitiativetemplate":"storymap theme"===i?"storymaptheme":"group"===i?"group":"maps",d?n("./item-icons/"+d+"16.png"):null}static get assetsDirs(){return["item-icons"]}get el(){return o(this)}};D.style='.item-type-icon{pointer-events:none;display:block;height:1rem;box-sizing:border-box;margin-left:0.75rem;margin-right:0.75rem;min-width:0;flex-grow:0;flex-shrink:1}.item-type-icon-group-1-up>.block{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.item-type-icon-group-2-up>.block{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.item-type-icon-group-3-up>.block{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.item-type-icon-group-4-up>.block{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.item-type-icon-group-5-up>.block{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.item-type-icon-group-6-up>.block{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.item-type-icon-group-7-up>.block{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.item-type-icon-group-8-up>.block{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.tablet-block-group-1-up>.item-type-icon{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.tablet-block-group-2-up>.item-type-icon{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.tablet-block-group-3-up>.item-type-icon{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.tablet-block-group-4-up>.item-type-icon{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.tablet-block-group-5-up>.item-type-icon{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.tablet-block-group-6-up>.item-type-icon{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.tablet-block-group-7-up>.item-type-icon{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.tablet-block-group-8-up>.item-type-icon{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.phone-block-group-1-up>.item-type-icon{flex-basis:calc(100% - 1.5rem);width:calc(100% - 1.5rem)}.phone-block-group-2-up>.item-type-icon{flex-basis:calc(50% - 1.5rem);width:calc(50% - 1.5rem)}.phone-block-group-3-up>.item-type-icon{flex-basis:calc(33.33333% - 1.5rem);width:calc(33.33333% - 1.5rem)}.phone-block-group-4-up>.item-type-icon{flex-basis:calc(25% - 1.5rem);width:calc(25% - 1.5rem)}.phone-block-group-5-up>.item-type-icon{flex-basis:calc(20% - 1.5rem);width:calc(20% - 1.5rem)}.phone-block-group-6-up>.item-type-icon{flex-basis:calc(16.66666% - 1.5rem);width:calc(16.66666% - 1.5rem)}.phone-block-group-7-up>.item-type-icon{flex-basis:calc(14.2857% - 1.5rem);width:calc(14.2857% - 1.5rem)}.phone-block-group-8-up>.item-type-icon{flex-basis:calc(12.5% - 1.5rem);width:calc(12.5% - 1.5rem)}.code-face .item-type-icon{letter-spacing:0em;font-family:"Consolas", "Andale Mono", "Lucida Console", "Monaco", monospace;font-weight:400;font-style:normal}.code-face .item-type-icon b,.code-face .item-type-icon strong{font-weight:400}.code-italic .item-type-icon{letter-spacing:0em;font-family:"Consolas", "Andale Mono", "Lucida Console", "Monaco", monospace;font-weight:400;font-style:italic}.code-italic .item-type-icon b,.code-italic .item-type-icon strong{font-weight:400}.item-type-icon{margin-top:0.15em !important;min-width:16px;fill:currentColor;transform:rotate(360deg)}.item-type-icon-margin{-webkit-margin-end:0.375rem;margin-inline-end:0.375rem}';export{y as calcite_tree,_ as calcite_tree_item,D as solution_item_icon}