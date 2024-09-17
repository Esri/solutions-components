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

// Hebrew [he]
var texts = {
  s: 'מספר שניות',
  ss: '%d שניות',
  m: 'דקה',
  mm: '%d דקות',
  h: 'שעה',
  hh: '%d שעות',
  hh2: 'שעתיים',
  d: 'יום',
  dd: '%d ימים',
  dd2: 'יומיים',
  M: 'חודש',
  MM: '%d חודשים',
  MM2: 'חודשיים',
  y: 'שנה',
  yy: '%d שנים',
  yy2: 'שנתיים'
};

function relativeTimeFormatter(number, withoutSuffix, key) {
  var text = texts[key + (number === 2 ? '2' : '')] || texts[key];
  return text.replace('%d', number);
}

var locale = {
  name: 'he',
  weekdays: 'ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת'.split('_'),
  weekdaysShort: 'א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳'.split('_'),
  weekdaysMin: 'א׳_ב׳_ג׳_ד׳_ה׳_ו_ש׳'.split('_'),
  months: 'ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר'.split('_'),
  monthsShort: 'ינו_פבר_מרץ_אפר_מאי_יונ_יול_אוג_ספט_אוק_נוב_דצמ'.split('_'),
  relativeTime: {
    future: 'בעוד %s',
    past: 'לפני %s',
    s: relativeTimeFormatter,
    m: relativeTimeFormatter,
    mm: relativeTimeFormatter,
    h: relativeTimeFormatter,
    hh: relativeTimeFormatter,
    d: relativeTimeFormatter,
    dd: relativeTimeFormatter,
    M: relativeTimeFormatter,
    MM: relativeTimeFormatter,
    y: relativeTimeFormatter,
    yy: relativeTimeFormatter
  },
  ordinal: function ordinal(n) {
    return n;
  },
  format: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [ב]MMMM YYYY',
    LLL: 'D [ב]MMMM YYYY HH:mm',
    LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
    l: 'D/M/YYYY',
    ll: 'D MMM YYYY',
    lll: 'D MMM YYYY HH:mm',
    llll: 'ddd, D MMM YYYY HH:mm'
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [ב]MMMM YYYY',
    LLL: 'D [ב]MMMM YYYY HH:mm',
    LLLL: 'dddd, D [ב]MMMM YYYY HH:mm',
    l: 'D/M/YYYY',
    ll: 'D MMM YYYY',
    lll: 'D MMM YYYY HH:mm',
    llll: 'ddd, D MMM YYYY HH:mm'
  }
};
dayjs.locale(locale, null, true);

export { locale as default };
