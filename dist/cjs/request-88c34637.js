/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const calciteInputMessage_calciteNotice_mapSelectTools_pdfDownload_refineSelection_entry = require('./calcite-input-message.calcite-notice.map-select-tools.pdf-download.refine-selection-e1ea2b34.js');
require('./index-c6979cbb.js');
require('./dom-4a580af6.js');
require('./resources-b56bce71.js');
require('./guid-84ac4d91.js');
require('./interfaces-e76f31e9.js');
require('./conditionalSlot-baada7a3.js');
require('./observers-5311faf8.js');
require('./loadModules-0eda12cd.js');
require('./locale-81a5f7d0.js');
require('./_commonjsHelpers-384729db.js');
require('./mapViewUtils-55ac76cb.js');
require('./interfaces-772edf61.js');
require('./publicNotificationStore-20e924f5.js');
require('./index-763f87ac.js');
require('./csvUtils-3a56c6d8.js');
require('./publicNotificationUtils-9d585d8d.js');

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
let r;function s(s,a){let n=a.responseType;n?"array-buffer"!==n&&"blob"!==n&&"json"!==n&&"native"!==n&&"native-request-init"!==n&&"text"!==n&&(n="text"):n="json",a.responseType=n;const o=calciteInputMessage_calciteNotice_mapSelectTools_pdfDownload_refineSelection_entry.e(a.signal);return delete a.signal,globalThis.invokeStaticMessage("request",{url:s,options:a},{signal:o}).then((async t=>{let i,l,u,c,b;if(t.data)if(t.data instanceof ArrayBuffer){if(!("json"!==n&&"text"!==n&&"blob"!==n||(i=new Blob([t.data]),"json"!==n&&"text"!==n||(r||(r=new FileReaderSync),c=r.readAsText(i),"json"!==n)))){try{l=JSON.parse(c||null);}catch(f){const t={...f,url:s,requestOptions:a};throw new calciteInputMessage_calciteNotice_mapSelectTools_pdfDownload_refineSelection_entry.s("request:server",f.message,t)}if(l.error){const t={...l.error,url:s,requestOptions:a};throw new calciteInputMessage_calciteNotice_mapSelectTools_pdfDownload_refineSelection_entry.s("request:server",l.error.message,t)}}}else "native"===n&&(t.data.signal=o,u=await fetch(t.data.url,t.data));switch(n){case"blob":b=i;break;case"json":b=l;break;case"native":b=u;break;case"text":b=c;break;default:b=t.data;}return {data:b,requestOptions:a,ssl:t.ssl,url:s}}))}

exports.execute = s;
