/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { s as s$1, e } from './p-c04ac6a2.js';
import './p-c2f00d41.js';
import './p-83166522.js';
import './p-729708a3.js';
import './p-a80b3880.js';
import './p-6fe17794.js';
import './p-1c247f54.js';
import './p-9a9955db.js';
import './p-7ab5ac59.js';
import './p-d6c9a34a.js';
import './p-e1a4994d.js';
import './p-3c449907.js';
import './p-be41429f.js';
import './p-4557d5a8.js';
import './p-00444009.js';
import './p-fc884dd6.js';

/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.25/esri/copyright.txt for details.
*/
let r;function s(s,a){let n=a.responseType;n?"array-buffer"!==n&&"blob"!==n&&"json"!==n&&"native"!==n&&"native-request-init"!==n&&"text"!==n&&(n="text"):n="json",a.responseType=n;const o=e(a.signal);return delete a.signal,globalThis.invokeStaticMessage("request",{url:s,options:a},{signal:o}).then((async t=>{let i,l,u,c,b;if(t.data)if(t.data instanceof ArrayBuffer){if(!("json"!==n&&"text"!==n&&"blob"!==n||(i=new Blob([t.data]),"json"!==n&&"text"!==n||(r||(r=new FileReaderSync),c=r.readAsText(i),"json"!==n)))){try{l=JSON.parse(c||null);}catch(f){const t={...f,url:s,requestOptions:a};throw new s$1("request:server",f.message,t)}if(l.error){const t={...l.error,url:s,requestOptions:a};throw new s$1("request:server",l.error.message,t)}}}else "native"===n&&(t.data.signal=o,u=await fetch(t.data.url,t.data));switch(n){case"blob":b=i;break;case"json":b=l;break;case"native":b=u;break;case"text":b=c;break;default:b=t.data;}return {data:b,requestOptions:a,ssl:t.ssl,url:s}}))}

export { s as execute };

//# sourceMappingURL=p-51d0eb46.js.map