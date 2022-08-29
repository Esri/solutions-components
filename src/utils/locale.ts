// https://medium.com/stencil-tricks/implementing-internationalisation-i18n-with-stencil-5e6559554117
import { languageMap } from './languageUtil';
import { getAssetPath } from '@stencil/core';

function getComponentClosestLanguage(element: HTMLElement): string | undefined {
  const closestElement = (element.closest('[lang]') as HTMLElement) ?? element.shadowRoot?.ownerDocument?.documentElement;
  // language set by the calling application or browser. defaults to english.
  const lang = (closestElement?.lang || navigator?.language || 'en').toLowerCase() as string;
  if (languageMap.has(lang)) {
    return languageMap.get(lang);
  } else {
    // "ru-RU" maps to "ru" use case
    if (languageMap.has(lang.slice(0, 2))) {
      return languageMap.get(lang.slice(0, 2));
    } else {
      return 'en';
    }
  }
}

type StringValue = string | StringBundle;

interface StringBundle {
  [key: string]: StringValue;
}

function fetchLocaleStringsForComponent<T extends StringBundle = StringBundle>(componentName: string, locale: string): Promise<T> {
  return new Promise((resolve, reject): void => {
    fetch(getAssetPath(`../assets/t9n/${componentName}/resources_${locale}.json`)).then(
      result => {
        if (result.ok) resolve(result.json());
        else reject();
      },
      () => reject(),
    );
  });
}

export async function getLocaleComponentStrings<T extends StringBundle = StringBundle>(element: HTMLElement): Promise<[T, string]> {
  const componentName = element.tagName.toLowerCase();
  const componentLanguage = getComponentClosestLanguage(element) as string;
  let strings: T;
  try {
    strings = await fetchLocaleStringsForComponent(componentName, componentLanguage);
  } catch (e) {
    console.warn(`no locale for ${componentName} (${componentLanguage}) loading default locale en.`);
    strings = await fetchLocaleStringsForComponent(componentName, 'en');
  }
  return [strings, componentLanguage];
}
