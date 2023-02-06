/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { s as s$1, e } from './calcite-input-message.calcite-notice.map-select-tools.pdf-download.refine-selection-b2bafb3c.js';
import './index-c246d90e.js';
import './dom-3bdc69ee.js';
import './resources-436ae282.js';
import './guid-15fce7c0.js';
import './interfaces-4ae145eb.js';
import './conditionalSlot-d09506c4.js';
import './observers-31601001.js';
import './loadModules-ca6fd358.js';
import './locale-45b745d6.js';
import './_commonjsHelpers-d5f9d613.js';
import './mapViewUtils-8f0754c5.js';
import './interfaces-3b23a5f9.js';
import './publicNotificationStore-b9daaee4.js';
import './index-ac7f66eb.js';
import './csvUtils-23b5418f.js';
import './publicNotificationUtils-5cb5a607.js';

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
let r;function s(s,a){let n=a.responseType;n?"array-buffer"!==n&&"blob"!==n&&"json"!==n&&"native"!==n&&"native-request-init"!==n&&"text"!==n&&(n="text"):n="json",a.responseType=n;const o=e(a.signal);return delete a.signal,globalThis.invokeStaticMessage("request",{url:s,options:a},{signal:o}).then((async t=>{let i,l,u,c,b;if(t.data)if(t.data instanceof ArrayBuffer){if(!("json"!==n&&"text"!==n&&"blob"!==n||(i=new Blob([t.data]),"json"!==n&&"text"!==n||(r||(r=new FileReaderSync),c=r.readAsText(i),"json"!==n)))){try{l=JSON.parse(c||null);}catch(f){const t={...f,url:s,requestOptions:a};throw new s$1("request:server",f.message,t)}if(l.error){const t={...l.error,url:s,requestOptions:a};throw new s$1("request:server",l.error.message,t)}}}else "native"===n&&(t.data.signal=o,u=await fetch(t.data.url,t.data));switch(n){case"blob":b=i;break;case"json":b=l;break;case"native":b=u;break;case"text":b=c;break;default:b=t.data;}return {data:b,requestOptions:a,ssl:t.ssl,url:s}}))}

export { s as execute };
