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
