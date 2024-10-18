/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { d as dayjs } from './p-8d0d5a69.js';
import './p-4e6eb06e.js';
import './p-6adaac20.js';
import './p-621ad249.js';
import './p-7d542581.js';
import './p-91371f97.js';
import './p-d6902512.js';
import './p-233f219c.js';
import './p-d25fc2c2.js';
import './p-4a291f79.js';
import './p-ad9d1221.js';
import './p-4f82eb55.js';
import './p-895e7b9c.js';
import './p-ff336351.js';
import './p-4253e9f1.js';
import './p-a02e2069.js';
import './p-27a4a537.js';
import './p-61aebbb5.js';
import './p-efaa77a0.js';
import './p-745efeab.js';
import './p-f0c96a6a.js';

// Italian (Switzerland) [it-ch]
var locale = {
  name: 'it-ch',
  weekdays: 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_'),
  months: 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
  weekStart: 1,
  weekdaysShort: 'dom_lun_mar_mer_gio_ven_sab'.split('_'),
  monthsShort: 'gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic'.split('_'),
  weekdaysMin: 'do_lu_ma_me_gi_ve_sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  },
  relativeTime: {
    future: 'tra %s',
    past: '%s fa',
    s: 'alcuni secondi',
    m: 'un minuto',
    mm: '%d minuti',
    h: 'un\'ora',
    hh: '%d ore',
    d: 'un giorno',
    dd: '%d giorni',
    M: 'un mese',
    MM: '%d mesi',
    y: 'un anno',
    yy: '%d anni'
  }
};
dayjs.locale(locale, null, true);

export { locale as default };
