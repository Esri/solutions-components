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

// English (Australia) [en-au]
var locale = {
  name: 'en-au',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  weekStart: 1,
  weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
  monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
  weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY h:mm A',
    LLLL: 'dddd, D MMMM YYYY h:mm A'
  },
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  }
};
dayjs.locale(locale, null, true);

export { locale as default };
