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

// Ukrainian [uk]
var monthFormat = 'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'.split('_');
var monthStandalone = 'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'.split('_');
var MONTHS_IN_FORMAT = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;

function plural(word, num) {
  var forms = word.split('_');
  return num % 10 === 1 && num % 100 !== 11 ? forms[0] : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]; // eslint-disable-line
}

function relativeTimeWithPlural(number, withoutSuffix, key) {
  var format = {
    ss: withoutSuffix ? 'секунда_секунди_секунд' : 'секунду_секунди_секунд',
    mm: withoutSuffix ? 'хвилина_хвилини_хвилин' : 'хвилину_хвилини_хвилин',
    hh: withoutSuffix ? 'година_години_годин' : 'годину_години_годин',
    dd: 'день_дні_днів',
    MM: 'місяць_місяці_місяців',
    yy: 'рік_роки_років'
  };

  if (key === 'm') {
    return withoutSuffix ? 'хвилина' : 'хвилину';
  } else if (key === 'h') {
    return withoutSuffix ? 'година' : 'годину';
  }

  return number + " " + plural(format[key], +number);
}

var months = function months(dayjsInstance, format) {
  if (MONTHS_IN_FORMAT.test(format)) {
    return monthFormat[dayjsInstance.month()];
  }

  return monthStandalone[dayjsInstance.month()];
};

months.s = monthStandalone;
months.f = monthFormat;
var locale = {
  name: 'uk',
  weekdays: 'неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота'.split('_'),
  weekdaysShort: 'ндл_пнд_втр_срд_чтв_птн_сбт'.split('_'),
  weekdaysMin: 'нд_пн_вт_ср_чт_пт_сб'.split('_'),
  months: months,
  monthsShort: 'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'.split('_'),
  weekStart: 1,
  relativeTime: {
    future: 'за %s',
    past: '%s тому',
    s: 'декілька секунд',
    m: relativeTimeWithPlural,
    mm: relativeTimeWithPlural,
    h: relativeTimeWithPlural,
    hh: relativeTimeWithPlural,
    d: 'день',
    dd: relativeTimeWithPlural,
    M: 'місяць',
    MM: relativeTimeWithPlural,
    y: 'рік',
    yy: relativeTimeWithPlural
  },
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY р.',
    LLL: 'D MMMM YYYY р., HH:mm',
    LLLL: 'dddd, D MMMM YYYY р., HH:mm'
  }
};
dayjs.locale(locale, null, true);

export default locale;
