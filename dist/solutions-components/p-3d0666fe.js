/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { d as dayjs } from './p-62c6764c.js';
import './p-6eb37ed2.js';
import './p-9f63a45c.js';
import './p-68ec5c15.js';
import './p-ff8343ec.js';
import './p-b39c5275.js';
import './p-415cf05e.js';
import './p-acaae81d.js';
import './p-fe6f7734.js';
import './p-ac52e0ba.js';
import './p-d559f79c.js';
import './p-18f18ab3.js';
import './p-939bc1b4.js';
import './p-c638d28e.js';
import './p-ead8696c.js';
import './p-aeb86188.js';
import './p-f31a44b7.js';
import './p-9f0b8f8b.js';
import './p-1a9a47a0.js';
import './p-40724bfb.js';
import './p-8524bacc.js';

// Dutch [nl]
var locale = {
  name: 'nl',
  weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
  weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
  weekdaysMin: 'zo_ma_di_wo_do_vr_za'.split('_'),
  months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
  monthsShort: 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_'),
  ordinal: function ordinal(n) {
    return "[" + n + (n === 1 || n === 8 || n >= 20 ? 'ste' : 'de') + "]";
  },
  weekStart: 1,
  yearStart: 4,
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD-MM-YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'over %s',
    past: '%s geleden',
    s: 'een paar seconden',
    m: 'een minuut',
    mm: '%d minuten',
    h: 'een uur',
    hh: '%d uur',
    d: 'een dag',
    dd: '%d dagen',
    M: 'een maand',
    MM: '%d maanden',
    y: 'een jaar',
    yy: '%d jaar'
  }
};
dayjs.locale(locale, null, true);

export { locale as default };
