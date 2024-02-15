/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { d as dayjs } from './calcite-input-time-picker-dbf2079e.js';
import './index-164d485a.js';
import './form-50dcd52e.js';
import './dom-38c6f027.js';
import './guid-b75a5f7b.js';
import './resources-8834f920.js';
import './interactive-39bf5602.js';
import './browser-d60104bd.js';
import './key-c83d835f.js';
import './label-b4cea72e.js';
import './component-edd2c3cd.js';
import './loadable-37e7fbd6.js';
import './locale-904407bf.js';
import './observers-d04d1da9.js';
import './focusTrapComponent-47ddce58.js';
import './time-29001694.js';
import './math-efada7a9.js';
import './t9n-436fb2b1.js';
import './openCloseComponent-9f90f493.js';
import './Validation-ea480265.js';

// Japanese [ja]
var locale = {
  name: 'ja',
  weekdays: '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
  weekdaysShort: '日_月_火_水_木_金_土'.split('_'),
  weekdaysMin: '日_月_火_水_木_金_土'.split('_'),
  months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  ordinal: function ordinal(n) {
    return n + "\u65E5";
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY/MM/DD',
    LL: 'YYYY年M月D日',
    LLL: 'YYYY年M月D日 HH:mm',
    LLLL: 'YYYY年M月D日 dddd HH:mm',
    l: 'YYYY/MM/DD',
    ll: 'YYYY年M月D日',
    lll: 'YYYY年M月D日 HH:mm',
    llll: 'YYYY年M月D日(ddd) HH:mm'
  },
  meridiem: function meridiem(hour) {
    return hour < 12 ? '午前' : '午後';
  },
  relativeTime: {
    future: '%s後',
    past: '%s前',
    s: '数秒',
    m: '1分',
    mm: '%d分',
    h: '1時間',
    hh: '%d時間',
    d: '1日',
    dd: '%d日',
    M: '1ヶ月',
    MM: '%dヶ月',
    y: '1年',
    yy: '%d年'
  }
};
dayjs.locale(locale, null, true);

export default locale;
