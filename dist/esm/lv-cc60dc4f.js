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

// Latvian [lv]
var locale = {
  name: 'lv',
  weekdays: 'svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena'.split('_'),
  months: 'janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Sv_P_O_T_C_Pk_S'.split('_'),
  monthsShort: 'jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec'.split('_'),
  weekdaysMin: 'Sv_P_O_T_C_Pk_S'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY.',
    LL: 'YYYY. [gada] D. MMMM',
    LLL: 'YYYY. [gada] D. MMMM, HH:mm',
    LLLL: 'YYYY. [gada] D. MMMM, dddd, HH:mm'
  },
  relativeTime: {
    future: 'pēc %s',
    past: 'pirms %s',
    s: 'dažām sekundēm',
    m: 'minūtes',
    mm: '%d minūtēm',
    h: 'stundas',
    hh: '%d stundām',
    d: 'dienas',
    dd: '%d dienām',
    M: 'mēneša',
    MM: '%d mēnešiem',
    y: 'gada',
    yy: '%d gadiem'
  }
};
dayjs.locale(locale, null, true);

export { locale as default };
