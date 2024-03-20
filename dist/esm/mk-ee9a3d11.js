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

// Macedonian [mk]
var locale = {
  name: 'mk',
  weekdays: 'недела_понеделник_вторник_среда_четврток_петок_сабота'.split('_'),
  months: 'јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември'.split('_'),
  weekStart: 1,
  weekdaysShort: 'нед_пон_вто_сре_чет_пет_саб'.split('_'),
  monthsShort: 'јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек'.split('_'),
  weekdaysMin: 'нe_пo_вт_ср_че_пе_сa'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'D.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY H:mm',
    LLLL: 'dddd, D MMMM YYYY H:mm'
  },
  relativeTime: {
    future: 'после %s',
    past: 'пред %s',
    s: 'неколку секунди',
    m: 'минута',
    mm: '%d минути',
    h: 'час',
    hh: '%d часа',
    d: 'ден',
    dd: '%d дена',
    M: 'месец',
    MM: '%d месеци',
    y: 'година',
    yy: '%d години'
  }
};
dayjs.locale(locale, null, true);

export default locale;
