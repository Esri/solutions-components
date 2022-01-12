import {
  ComponentLocaleItem,
  LocaleInfo,
  LocaleItem,
  RTLLocales,
  SupportedLocales,
  SupportedLocalesForFormats
} from "./interfaces";

export { LocaleInfo } from './interfaces';
/*
https://medium.com/@Cookie_Cookson/hi-lisa-backer-d0ebcdc2ff3e
https://dockyard.com/blog/2019/04/16/lazy-loading-custom-assets-with-stenciljs-part-1
uses the loaded script tag of the component to get the resource url 
example:
<script type="module" src="http://127.0.0.1:5500/packages/arcgis-charts-config-components/dist/arcgis-charts-config-components/arcgis-charts-config-components.esm.js" 
data-stencil-namespace="arcgis-charts-config-components"></script>
*/
/* Not working
function getPublicPath(componentName: string): string {
  const script: HTMLScriptElement = document.querySelector(
    `script[data-stencil-namespace='${componentName}']`
  ) as HTMLScriptElement;
  return script?.getAttribute("data-resources-url") ?? "";
}
*/

/**
 * Extracts language portion of locale code
 * Reference: https://github.com/meikidd/locale-code/blob/master/src/index.js#L8
 * Examples:
 * - en-US => en
 * - zh-CN => zh
 * - zh-cn => zh
 * - en => en
 * @param locale
 */
function extractLanguageTag(locale?: string): string {
  const localeCodeRegex = /^([a-z]{2})-([A-Z]{2})$/;
  const match = locale?.match(localeCodeRegex);
  let output: string = SupportedLocales.English;
  if (match !== null && match !== undefined && match?.length > 1) {
    // TODO Remove next Eslint ignore comment.
    // eslint-disable-next-line prefer-destructuring
    output = match[1];
  } else if (locale?.length === 2 && locale.toLowerCase() === locale) {
    output = locale;
  }
  return output;
}

/**
 * Converts a given locale into a supported locale.
 * In case of an unsupported locale, "en" is returned.
 * Examples:
 * - en-US => en-US
 * - zh-CN => zh-CN
 * - en => en
 * - es-AR => es
 * - en-UK => en
 * @param locale
 */
function convertToSupportedLocale(locale?: string): SupportedLocales {
  let output: string = SupportedLocales.English;
  if (locale !== undefined) {
    const supportedLocales = Object.values(SupportedLocales);
    const hyphenatedSupportedLocales = supportedLocales.filter((ele) => {
      return ele.indexOf("-") !== -1;
    });
    if (locale.indexOf("-") !== -1) {
      const [lang, region] = locale.split("-");
      // To make sure it is valid locale code of form `zh-CN`.
      // In ArcGIS Online user locale codes come with region in lower case `zh-cn`.
      // TODO Remove next Eslint ignore comment.
      // eslint-disable-next-line no-param-reassign
      locale = `${lang}-${region.toUpperCase()}`;
    }
    if (hyphenatedSupportedLocales.includes(locale as SupportedLocales) === true) {
      output = locale;
    } else {
      const languageTag = extractLanguageTag(locale);
      if (supportedLocales.includes(languageTag as SupportedLocales) === true) {
        output = languageTag;
      }
    }
  }
  return output as SupportedLocales;
}

/**
 * Converts a given locale into a supported format locale.
 * In case of an unsupported locale, "en" is returned.
 * Examples:
 * - en-AU => en-AU
 * - zh-CN => zh-CN
 * - en => en
 * - en-GB => en-GB
 * - it-CH => it-CH
 * - it-ch => it-CH
 * @param locale
 */ function convertToSupportedFormatLocale(locale?: string): SupportedLocalesForFormats {
  let formatLocale = SupportedLocalesForFormats.find((item) => item === locale);
  if (formatLocale === undefined) {
    formatLocale = locale;
  }
  if (formatLocale !== undefined && formatLocale.indexOf("-") !== -1) {
    const [lang, region] = formatLocale.split("-");
    formatLocale = `${lang}-${region.toUpperCase()}`;
  }
  return formatLocale as SupportedLocalesForFormats;
}

/**
 * Helper function to find the closest element crossing multiple (parent) shadowDOM boundaries.
 * The implementation is based on [this](https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd) solution.
 *
 * @param {string} selector
 * @param {Element} base
 */
function getClosestElement(selector: string, base: Element): Element | null {
  function closestFrom(el?: Element | Window | Document): Element | null {
    let element;
    if (el === undefined || el === document || el === window) {element = null;}
    else {
      const found = (el as Element).closest(selector);
      element = found || closestFrom(((el as Element).getRootNode() as ShadowRoot).host);
    }
    return element;
  }
  return closestFrom(base);
}

/**
 * Finds the locale of the closest element to the given element.
 * If no element given, and converts `window.navigator.language` into a supported locale.
 * @param element
 */
export function getLocaleInfo(element: Element = document.documentElement as Element): LocaleInfo {
  const closestElement = getClosestElement("[lang]", element);
  const locale = (closestElement as HTMLElement)?.lang ?? window.navigator.language;
  const convertedLocale = convertToSupportedLocale(locale);
  const formatLocale = convertToSupportedFormatLocale(locale);
  return { locale: convertedLocale, rtl: RTLLocales.includes(convertedLocale), formatLocale };
}

/**
 * Fetches the locale file of the given component; defaults to `"en"` locale
 * @param componentName
 * @param locale
 * @param resourcesUrl
 */
async function fetchLocaleStrings<T extends LocaleItem>(props: {
  path: string;
  locale: string;
  baseURL: string;
  fileNamePattern?: string;
}): Promise<T> {
  const { path, locale, baseURL, fileNamePattern = '{tagName}.t9n.{locale}.json' } = props;
  // Using the getPublicPath method that leverages `data-resources-url` currently this is not working.
  // const rUrl = getPublicPath(componentName) || resourcesUrl;
  let localeData = {} as T;
  const getFileName = _locale => fileNamePattern.replace('{tagName}', path).replace('{locale}', _locale);
  try {
    const response = await fetch(`${baseURL}/${getFileName(locale)}`);
    localeData = await response.json();
  } catch (e) {
    const defaultResponse = await fetch(`${baseURL}/${getFileName(SupportedLocales.English)}`);
    localeData = await defaultResponse.json();
  }
  return localeData;
}

/**
 * Fetches locale string for the given component
 * @param element
 * @param baseURL
 */
export async function fetchComponentLocaleStrings<T extends LocaleItem>(
  element: Element,
  baseURL: string,
  fileNamePattern?: string
): Promise<ComponentLocaleItem<T>> {
  const componentName = element.tagName.toLowerCase();
  const { locale, rtl } = getLocaleInfo(element);
  const strings = await fetchLocaleStrings<T>({ path: componentName, locale, baseURL, fileNamePattern });

  // Element's "dir" attribute takes precedence over the rtl boolean inferred from language
  let direction = element.getAttribute("dir");
  if (direction !== "ltr" && direction !== "rtl") {
    direction = rtl === true ? "rtl" : "ltr";
  }
  return { strings, direction: direction as "ltr" | "rtl" };
}

/**
 * Returns if the detected language is rtl or ltr and returns the direction
 * @param element
 */
export function fetchLanguageDirection(element?: Element): "rtl" | "ltr" {
  const { rtl } = getLocaleInfo(element);
  return rtl === true ? "rtl" : "ltr";
}

/**
 * Performs locale aware parse float
 * @param localizedString string that has to be parsed
 * @param locale  locale used for parsing the float
 */
export function localeParseFloat(localizedString: string, locale: string): number {
  // Based on function described in https://stackoverflow.com/questions/59678901/using-parsefloat-in-different-locales
  // Get the thousands and decimal separator characters used in the locale.
  const [, thousandsSeparator, , , , decimalSeparator] = (1111.1).toLocaleString(locale);
  // Remove thousand separators and put a point where the decimal separator occurs
  const compatibleString = localizedString.replace(thousandsSeparator, "").replace(decimalSeparator, ".");
  return parseFloat(compatibleString);
}
