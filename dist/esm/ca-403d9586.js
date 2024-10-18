/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { d as dayjs } from './calcite-input-time-picker-cc675f33.js';
import './index-904bc599.js';
import './form-d45062d8.js';
import './dom-75c641a7.js';
import './guid-b0fb1de3.js';
import './resources-8e2ed936.js';
import './interactive-98ed6b6f.js';
import './key-e6b442de.js';
import './label-272c5973.js';
import './component-83541c88.js';
import './loadable-7cb2fc6f.js';
import './browser-b67d8df6.js';
import './locale-24516fec.js';
import './observers-c83631e8.js';
import './focusTrapComponent-35b3348c.js';
import './config-16813c92.js';
import './time-fbe17659.js';
import './math-d7c8823c.js';
import './t9n-9a5d28cf.js';
import './Validation-cf136c56.js';
import './input-e01adc49.js';

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
