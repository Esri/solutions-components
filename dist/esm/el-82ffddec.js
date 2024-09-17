/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { d as dayjs } from './calcite-input-time-picker-60dbdc25.js';
import './index-b793d9aa.js';
import './form-ba965042.js';
import './dom-b5c50286.js';
import './guid-4c746a7f.js';
import './resources-defbb49f.js';
import './interactive-742ba555.js';
import './browser-552eb2d0.js';
import './key-58898f0a.js';
import './label-0b82858a.js';
import './component-c2c32481.js';
import './loadable-73f289b6.js';
import './locale-21e40b0c.js';
import './observers-e2484555.js';
import './focusTrapComponent-6ec0f681.js';
import './config-2fa7bb77.js';
import './time-a215e415.js';
import './math-8c04292e.js';
import './t9n-2fb3af62.js';
import './Validation-63949b7d.js';
import './input-d11f5ac8.js';

// Greek [el]
var locale = {
  name: 'el',
  weekdays: 'Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο'.split('_'),
  weekdaysShort: 'Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ'.split('_'),
  weekdaysMin: 'Κυ_Δε_Τρ_Τε_Πε_Πα_Σα'.split('_'),
  months: 'Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος'.split('_'),
  monthsShort: 'Ιαν_Φεβ_Μαρ_Απρ_Μαι_Ιουν_Ιουλ_Αυγ_Σεπτ_Οκτ_Νοε_Δεκ'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  weekStart: 1,
  relativeTime: {
    future: 'σε %s',
    past: 'πριν %s',
    s: 'μερικά δευτερόλεπτα',
    m: 'ένα λεπτό',
    mm: '%d λεπτά',
    h: 'μία ώρα',
    hh: '%d ώρες',
    d: 'μία μέρα',
    dd: '%d μέρες',
    M: 'ένα μήνα',
    MM: '%d μήνες',
    y: 'ένα χρόνο',
    yy: '%d χρόνια'
  },
  formats: {
    LT: 'h:mm A',
    LTS: 'h:mm:ss A',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY h:mm A',
    LLLL: 'dddd, D MMMM YYYY h:mm A'
  }
};
dayjs.locale(locale, null, true);

export { locale as default };
