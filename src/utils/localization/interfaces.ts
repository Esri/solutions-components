// Based on https://medium.com/stencil-tricks/implementing-internationalisation-i18n-with-stencil-5e6559554117
export interface LocaleItem {
  [key: string]: string | LocaleItem;
}

export interface ComponentLocaleItem<T extends LocaleItem> {
  strings: T;
  direction: "ltr" | "rtl";
}

/**
 * Locale list (in alphabetical order) adopted from [JSAPI](https://devtopia.esri.com/WebGIS/arcgis-js-api/tree/master/esri/nls)
 * Full forms adopted from [1](https://www.science.co.il/language/Locale-codes.php) and [2](https://saimana.com/list-of-country-locale-code/)
 */
export const SupportedLocales = {
  Arabic: "ar",
  Bosnian: "bs",
  Catalan: "ca",
  Czech: "cs",
  Danish: "da",
  German: "de",
  Greek: "el",
  English: "en",
  EnglishUSA: "en-US",
  Spanish: "es",
  Estonian: "et",
  Finnish: "fi",
  French: "fr",
  Hebrew: "he",
  Croatian: "hr",
  Hungarian: "hu",
  Indonesian: "id",
  Italian: "it",
  Japanese: "ja",
  Korean: "ko",
  Lithuanian: "lt",
  Latvian: "lv",
  NorwegianBokml: "nb",
  Dutch: "nl",
  Polish: "pl",
  PortugueseBrazil: "pt-BR",
  PortuguesePortugal: "pt-PT",
  Romanian: "ro",
  Russian: "ru",
  Serbian: "sr",
  Slovenian: "sl",
  Slovak: "sk",
  Swedish: "sv",
  Thai: "th",
  Turkish: "tr",
  Ukrainian: "uk",
  Vietnamese: "vi",
  ChineseChina: "zh-CN",
  ChineseHongKong: "zh-HK",
  ChineseTaiwan: "zh-TW"
} as const;
export type SupportedLocales = typeof SupportedLocales[keyof typeof SupportedLocales];

export const SupportedLocalesForFormats = [
  ...Object.values(SupportedLocales),
  "en-AU",
  "en-GB",
  "es-ES",
  "es-MX",
  "de-CH",
  "de-DE",
  "it-CH",
  "it-IT"
];
export type SupportedLocalesForFormats =
  | SupportedLocales
  | "en-AU"
  | "en-GB"
  | "es-ES"
  | "es-MX"
  | "de-CH"
  | "de-DE"
  | "it-CH"
  | "it-IT";

/**
 * List of supported locales that are RTL
 * Adopted from https://devtopia.esri.com/WebGIS/arcgis-js-api/blob/4master/esri/intl/locale.ts
 */
export const RTLLocales: SupportedLocales[] = [SupportedLocales.Arabic, SupportedLocales.Hebrew];

export interface LocaleInfo {
  locale: SupportedLocales;
  formatLocale: SupportedLocalesForFormats;
  rtl: boolean;
}
