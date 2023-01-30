/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { r as registerInstance, h, H as Host, g as getElement } from './p-c023e6a1.js';

const listItemCss = ":host{display:block}";

const ListItem = class {
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
ListItem.style = listItemCss;

export { ListItem as list_item };

//# sourceMappingURL=p-b57bc4eb.entry.js.map