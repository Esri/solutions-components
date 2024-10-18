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

// Croatian [hr]
var monthFormat = 'siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca'.split('_');
var monthStandalone = 'siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac'.split('_');
var MONTHS_IN_FORMAT = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;

var months = function months(dayjsInstance, format) {
  if (MONTHS_IN_FORMAT.test(format)) {
    return monthFormat[dayjsInstance.month()];
  }

  return monthStandalone[dayjsInstance.month()];
};

months.s = monthStandalone;
months.f = monthFormat;
var locale = {
  name: 'hr',
  weekdays: 'nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota'.split('_'),
  weekdaysShort: 'ned._pon._uto._sri._čet._pet._sub.'.split('_'),
  weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
  months: months,
  monthsShort: 'sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D. MMMM YYYY',
    LLL: 'D. MMMM YYYY H:mm',
    LLLL: 'dddd, D. MMMM YYYY H:mm'
  },
  relativeTime: {
    future: 'za %s',
    past: 'prije %s',
    s: 'sekunda',
    m: 'minuta',
    mm: '%d minuta',
    h: 'sat',
    hh: '%d sati',
    d: 'dan',
    dd: '%d dana',
    M: 'mjesec',
    MM: '%d mjeseci',
    y: 'godina',
    yy: '%d godine'
  },
  ordinal: function ordinal(n) {
    return n + ".";
  }
};
dayjs.locale(locale, null, true);

export { locale as default };
