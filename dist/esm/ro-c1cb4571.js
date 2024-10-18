/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { d as dayjs } from './calcite-input-time-picker-cc675f33.js';
import './index-904bc599.js';
import './form-d45062d8.js';
import './dom-75c641a7.js';
import './guid-b0fb1de3.js';
import './resources-8e2ed936.js';
import './interactive-98ed6b6f.js';
import './key-e6b442de.js';
import './label-272c5973.js';
import './component-83541c88.js';
import './loadable-7cb2fc6f.js';
import './browser-b67d8df6.js';
import './locale-24516fec.js';
import './observers-c83631e8.js';
import './focusTrapComponent-35b3348c.js';
import './config-16813c92.js';
import './time-fbe17659.js';
import './math-d7c8823c.js';
import './t9n-9a5d28cf.js';
import './Validation-cf136c56.js';
import './input-e01adc49.js';

// Romanian [ro]
var locale = {
  name: 'ro',
  weekdays: 'Duminică_Luni_Marți_Miercuri_Joi_Vineri_Sâmbătă'.split('_'),
  weekdaysShort: 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
  weekdaysMin: 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
  months: 'Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie'.split('_'),
  monthsShort: 'Ian._Febr._Mart._Apr._Mai_Iun._Iul._Aug._Sept._Oct._Nov._Dec.'.split('_'),
  weekStart: 1,
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD.MM.YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY H:mm',
    LLLL: 'dddd, D MMMM YYYY H:mm'
  },
  relativeTime: {
    future: 'peste %s',
    past: 'acum %s',
    s: 'câteva secunde',
    m: 'un minut',
    mm: '%d minute',
    h: 'o oră',
    hh: '%d ore',
    d: 'o zi',
    dd: '%d zile',
    M: 'o lună',
    MM: '%d luni',
    y: 'un an',
    yy: '%d ani'
  },
  ordinal: function ordinal(n) {
    return n;
  }
};
dayjs.locale(locale, null, true);

export { locale as default };
