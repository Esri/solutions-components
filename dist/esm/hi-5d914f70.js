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

// Hindi [hi]
var locale = {
  name: 'hi',
  weekdays: 'रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार'.split('_'),
  months: 'जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर'.split('_'),
  weekdaysShort: 'रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि'.split('_'),
  monthsShort: 'जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.'.split('_'),
  weekdaysMin: 'र_सो_मं_बु_गु_शु_श'.split('_'),
  ordinal: function ordinal(n) {
    return n;
  },
  formats: {
    LT: 'A h:mm बजे',
    LTS: 'A h:mm:ss बजे',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, A h:mm बजे',
    LLLL: 'dddd, D MMMM YYYY, A h:mm बजे'
  },
  relativeTime: {
    future: '%s में',
    past: '%s पहले',
    s: 'कुछ ही क्षण',
    m: 'एक मिनट',
    mm: '%d मिनट',
    h: 'एक घंटा',
    hh: '%d घंटे',
    d: 'एक दिन',
    dd: '%d दिन',
    M: 'एक महीने',
    MM: '%d महीने',
    y: 'एक वर्ष',
    yy: '%d वर्ष'
  }
};
dayjs.locale(locale, null, true);

export default locale;
