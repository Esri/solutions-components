/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

const calciteInputTimePicker_entry = require('./calcite-input-time-picker-74396a94.js');
require('./index-4b68e4b4.js');
require('./form-6dd8050a.js');
require('./dom-795d4a33.js');
require('./guid-e84a8375.js');
require('./resources-18f799c7.js');
require('./interactive-a128ac30.js');
require('./key-47c9469a.js');
require('./label-726fc287.js');
require('./component-5d190962.js');
require('./loadable-1c888c87.js');
require('./browser-333a21c5.js');
require('./locale-da840314.js');
require('./observers-18d87cb5.js');
require('./focusTrapComponent-b19fd5d5.js');
require('./config-e76d9931.js');
require('./time-a92ca33f.js');
require('./math-089392ef.js');
require('./t9n-ed5c03a7.js');
require('./Validation-55fc2417.js');
require('./input-8c28213d.js');

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
calciteInputTimePicker_entry.dayjs.locale(locale, null, true);

exports['default'] = locale;
