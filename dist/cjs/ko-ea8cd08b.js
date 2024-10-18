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

// Korean [ko]
var locale = {
  name: 'ko',
  weekdays: '일요일_월요일_화요일_수요일_목요일_금요일_토요일'.split('_'),
  weekdaysShort: '일_월_화_수_목_금_토'.split('_'),
  weekdaysMin: '일_월_화_수_목_금_토'.split('_'),
  months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
  monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
  ordinal: function ordinal(n) {
    return n + "\uC77C";
  },
  formats: {
    LT: 'A h:mm',
    LTS: 'A h:mm:ss',
    L: 'YYYY.MM.DD.',
    LL: 'YYYY년 MMMM D일',
    LLL: 'YYYY년 MMMM D일 A h:mm',
    LLLL: 'YYYY년 MMMM D일 dddd A h:mm',
    l: 'YYYY.MM.DD.',
    ll: 'YYYY년 MMMM D일',
    lll: 'YYYY년 MMMM D일 A h:mm',
    llll: 'YYYY년 MMMM D일 dddd A h:mm'
  },
  meridiem: function meridiem(hour) {
    return hour < 12 ? '오전' : '오후';
  },
  relativeTime: {
    future: '%s 후',
    past: '%s 전',
    s: '몇 초',
    m: '1분',
    mm: '%d분',
    h: '한 시간',
    hh: '%d시간',
    d: '하루',
    dd: '%d일',
    M: '한 달',
    MM: '%d달',
    y: '일 년',
    yy: '%d년'
  }
};
calciteInputTimePicker_entry.dayjs.locale(locale, null, true);

exports['default'] = locale;
