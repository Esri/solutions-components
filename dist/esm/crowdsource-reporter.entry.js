/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './index-09deaa39.js';

const crowdsourceReporterCss = ":host{display:block}";

const CrowdsourceReporter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------
  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------
  render() {
    return (h(Host, null, h("slot", null)));
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------
  /**
   * Fetches the component's translations
   *
   * @returns Promise when complete
   * @protected
   */
  async _getTranslations() {
    // const messages = await getLocaleComponentStrings(this.el);
    // this._translations = messages[0] as typeof BufferTools_T9n;
  }
  get el() { return getElement(this); }
};
CrowdsourceReporter.style = crowdsourceReporterCss;

export { CrowdsourceReporter as crowdsource_reporter };

//# sourceMappingURL=crowdsource-reporter.entry.js.map