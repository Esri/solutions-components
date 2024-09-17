/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { d as dayjs } from './calcite-input-time-picker-60dbdc25.js';
import './index-b793d9aa.js';
import './form-ba965042.js';
import './dom-b5c50286.js';
import './guid-4c746a7f.js';
import './resources-defbb49f.js';
import './interactive-742ba555.js';
import './browser-552eb2d0.js';
import './key-58898f0a.js';
import './label-0b82858a.js';
import './component-c2c32481.js';
import './loadable-73f289b6.js';
import './locale-21e40b0c.js';
import './observers-e2484555.js';
import './focusTrapComponent-6ec0f681.js';
import './config-2fa7bb77.js';
import './time-a215e415.js';
import './math-8c04292e.js';
import './t9n-2fb3af62.js';
import './Validation-63949b7d.js';
import './input-d11f5ac8.js';

// Catalan [ca]
var locale = {
  name: 'ca',
  weekdays: 'Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte'.split('_'),
  weekdaysShort: 'Dg._Dl._Dt._Dc._Dj._Dv._Ds.'.split('_'),
  weekdaysMin: 'Dg_Dl_Dt_Dc_Dj_Dv_Ds'.split('_'),
  months: 'Gener_Febrer_Març_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre'.split('_'),
  monthsShort: 'Gen._Febr._Març_Abr._Maig_Juny_Jul._Ag._Set._Oct._Nov._Des.'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM [de] YYYY',
    LLL: 'D MMMM [de] YYYY [a les] H:mm',
    LLLL: 'dddd D MMMM [de] YYYY [a les] H:mm',
    ll: 'D MMM YYYY',
    lll: 'D MMM YYYY, H:mm',
    llll: 'ddd D MMM YYYY, H:mm'
  },
  relativeTime: {
    future: 'd\'aquí %s',
    past: 'fa %s',
    s: 'uns segons',
    m: 'un minut',
    mm: '%d minuts',
    h: 'una hora',
    hh: '%d hores',
    d: 'un dia',
    dd: '%d dies',
    M: 'un mes',
    MM: '%d mesos',
    y: 'un any',
    yy: '%d anys'
  },
  ordinal: function ordinal(n) {
    var ord;
    if (n === 1 || n === 3) ord = 'r';else if (n === 2) ord = 'n';else if (n === 4) ord = 't';else ord = 'è';
    return "" + n + ord;
  }
};
dayjs.locale(locale, null, true);

export { locale as default };
