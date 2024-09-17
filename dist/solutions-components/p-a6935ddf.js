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

// Serbian [sr]
var translator = {
  words: {
    m: ['jedan minut', 'jednog minuta'],
    mm: ['%d minut', '%d minuta', '%d minuta'],
    h: ['jedan sat', 'jednog sata'],
    hh: ['%d sat', '%d sata', '%d sati'],
    d: ['jedan dan', 'jednog dana'],
    dd: ['%d dan', '%d dana', '%d dana'],
    M: ['jedan mesec', 'jednog meseca'],
    MM: ['%d mesec', '%d meseca', '%d meseci'],
    y: ['jednu godinu', 'jedne godine'],
    yy: ['%d godinu', '%d godine', '%d godina']
  },
  correctGrammarCase: function correctGrammarCase(number, wordKey) {
    if (number % 10 >= 1 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
      return number % 10 === 1 ? wordKey[0] : wordKey[1];
    }

    return wordKey[2];
  },
  relativeTimeFormatter: function relativeTimeFormatter(number, withoutSuffix, key, isFuture) {
    var wordKey = translator.words[key];

    if (key.length === 1) {
      // Nominativ
      if (key === 'y' && withoutSuffix) return 'jedna godina';
      return isFuture || withoutSuffix ? wordKey[0] : wordKey[1];
    }

    var word = translator.correctGrammarCase(number, wordKey); // Nominativ

    if (key === 'yy' && withoutSuffix && word === '%d godinu') return number + " godina";
    return word.replace('%d', number);
  }
};
var locale = {
  name: 'sr',
  weekdays: 'Nedelja_Ponedeljak_Utorak_Sreda_Četvrtak_Petak_Subota'.split('_'),
  weekdaysShort: 'Ned._Pon._Uto._Sre._Čet._Pet._Sub.'.split('_'),
  weekdaysMin: 'ne_po_ut_sr_če_pe_su'.split('_'),
  months: 'Januar_Februar_Mart_April_Maj_Jun_Jul_Avgust_Septembar_Oktobar_Novembar_Decembar'.split('_'),
  monthsShort: 'Jan._Feb._Mar._Apr._Maj_Jun_Jul_Avg._Sep._Okt._Nov._Dec.'.split('_'),
  weekStart: 1,
  relativeTime: {
    future: 'za %s',
    past: 'pre %s',
    s: 'nekoliko sekundi',
    m: translator.relativeTimeFormatter,
    mm: translator.relativeTimeFormatter,
    h: translator.relativeTimeFormatter,
    hh: translator.relativeTimeFormatter,
    d: translator.relativeTimeFormatter,
    dd: translator.relativeTimeFormatter,
    M: translator.relativeTimeFormatter,
    MM: translator.relativeTimeFormatter,
    y: translator.relativeTimeFormatter,
    yy: translator.relativeTimeFormatter
  },
  ordinal: function ordinal(n) {
    return n + ".";
  },
  formats: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'D. M. YYYY.',
    LL: 'D. MMMM YYYY.',
    LLL: 'D. MMMM YYYY. H:mm',
    LLLL: 'dddd, D. MMMM YYYY. H:mm'
  }
};
dayjs.locale(locale, null, true);

export { locale as default };
