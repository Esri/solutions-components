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

// Arabic [ar]
var months = 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_');
var symbolMap = {
  1: '١',
  2: '٢',
  3: '٣',
  4: '٤',
  5: '٥',
  6: '٦',
  7: '٧',
  8: '٨',
  9: '٩',
  0: '٠'
};
var numberMap = {
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
  '٠': '0'
};
var locale = {
  name: 'ar',
  weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
  weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
  weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
  months: months,
  monthsShort: months,
  weekStart: 6,
  meridiem: function meridiem(hour) {
    return hour > 12 ? 'م' : 'ص';
  },
  relativeTime: {
    future: 'بعد %s',
    past: 'منذ %s',
    s: 'ثانية واحدة',
    m: 'دقيقة واحدة',
    mm: '%d دقائق',
    h: 'ساعة واحدة',
    hh: '%d ساعات',
    d: 'يوم واحد',
    dd: '%d أيام',
    M: 'شهر واحد',
    MM: '%d أشهر',
    y: 'عام واحد',
    yy: '%d أعوام'
  },
  preparse: function preparse(string) {
    return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
      return numberMap[match];
    }).replace(/،/g, ',');
  },
  postformat: function postformat(string) {
    return string.replace(/\d/g, function (match) {
      return symbolMap[match];
    }).replace(/,/g, '،');
  },
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'D/‏M/‏YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  }
};
dayjs.locale(locale, null, true);

export default locale;
