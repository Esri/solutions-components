// NOTE: we hope to move this module into it's own library
// like @esri/stencil-intl to be shared w/ other teams at Esri
import { createIntl, createIntlCache, IntlShape } from '@formatjs/intl';
import { getAssetPath } from '@stencil/core';
import { getLocaleInfo, fetchComponentLocaleStrings } from '../localization';

export interface ComponentIntl {
  locale: string;
  direction?: 'ltr' | 'rtl';
  t: (key: string, values?: Record<string, unknown>, options?: unknown) => string;
}

class _ComponentIntl implements ComponentIntl {
  private _componentName: string;

  private _intl: IntlShape;

  direction?: 'ltr' | 'rtl'

  constructor(
    componentName,
    intl,
    direction
  ) {
    this._componentName = componentName;
    this._intl = intl;
    // NOTE: we currently set this in the constructor b/c we allow
    // component's dir attribute to override, but
    // maybe it should just be a getter based on locale instead
    this.direction = direction;
  }

  // expose intl properties and methods
  get locale () {
    return this._intl.locale;
  }
  // TODO: other methods like formatNumber() and formatDate()

  // expose ember-intl API
  t (key, values?, opts?) {
    const id = `${this._componentName}.${key}`;
    return this._intl.formatMessage({ id }, values, opts);
  }
  // TODO: others?
}

export interface IntlManager {
  assetPath: string
  fileNamePattern: string
  loadIntlForComponent: (element: Element, baseUrl?: string) => Promise<ComponentIntl>
}

export interface CreateIntlManagerOptions {
  /** 
   * Base path where the translation files will be fetched from.
   * This is passed to Stencils's getAssetPath().
   * Default: 't9n'
  */
  assetPath?: string
  /**
   * The pattern for translation file names.
   * The {tagName} and {locale} tokens will be replaced w/ their lower-case values
   * Default: '{tagName}.t9n.{locale}.json'
   * */
  fileNamePattern?: string
}

class _IntlManager implements IntlManager {
  // intl instances for each locale
  private _intls: Record<string, IntlShape> = {}

  assetPath: string

  fileNamePattern: string

  constructor (options: CreateIntlManagerOptions = {}) {
    const { assetPath = 't9n', fileNamePattern = '{tagName}.t9n.{locale}.json' } = options;
    this.assetPath = assetPath,
    this.fileNamePattern = fileNamePattern;
  }

  async loadIntlForComponent (element: Element, baseUrl?: string): Promise<ComponentIntl> {
    // determine component locale (TODO: fall back to default locale defined here)
    // TODO: it'd be nice if this returned direction instead of fetchComponentLocaleStrings()
    const { locale } = getLocaleInfo(element);
    // fetch messages for this component
    // TODO: lazy load these
    const { fileNamePattern, assetPath } = this;
    const { strings, direction } = await fetchComponentLocaleStrings(
      element,
      baseUrl || getAssetPath(assetPath),
      fileNamePattern
    );
    // prepend component name to all message keys
    // and merge w/ existing messages for this locale, if any
    const componentName = element.tagName.toLowerCase();
    let intl = this._intls[locale];
    const messages = Object.entries(strings).reduce((accum, [key, string]) => {
      accum[`${componentName}.${key}`] = string as string;
      return accum;
    }, intl ? intl.messages : {});
    // NOTE: for now, we _always_
    // create a new intl instance for this locale w/ this component's messages
    // though we'd like to re-use a previous instance
    // and just append the new messages
    const cache = createIntlCache();
    intl = createIntl({
      locale,
      messages
    }, cache)
    // cache the instance for use amongst other components
    this._intls[locale] = intl;
    return new _ComponentIntl(componentName, intl, direction);
  }
}

/**
 * Factory function to initialize a new instance of IntlManager
 * @param options 
 * @returns 
 */
export const createIntlManager = (options?: CreateIntlManagerOptions): IntlManager => {
  return new _IntlManager(options);
}
