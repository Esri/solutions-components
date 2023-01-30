/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ee607805.js');
const locale = require('./locale-d15229c4.js');
require('./_commonjsHelpers-6aafa5de.js');

const cardManagerCss = ":host{display:block}.display-inline-table{display:inline-table}.display-flex{display:flex}.display-none{display:none}.w-100{width:100%}.w-1-2{width:50%}.padding-bottom-1{padding-bottom:1rem}";

const CardManager = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this._translations = undefined;
  }
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
  async componentWillLoad() {
    await this._getTranslations();
    const href = window.location.href;
    const url = href.substring(0, href.lastIndexOf('/'));
    const img = `${url}/data/generic.png`;
    this._fakeValues = [{
        name: "Filename.png",
        description: "This is an example of what a media description looks like.",
        url: img
      }, {
        name: "Filename2.png",
        description: "Another example of what a media description looks like.",
        url: img
      }, {
        name: "Filename3.png",
        description: "And another example of a media description.",
        url: img
      }];
    this._fakeInfos = {
      "Details": "Details info goes here",
      "Name": "Name here",
      "Phone": "(000) 000-0000",
      "Email": "example@gmail.com",
      "Date": "May 11, 2022"
    };
  }
  render() {
    // const mediaCardClass =;
    // const infoCardClass = "";
    return (index.h(index.Host, null, index.h("div", { class: "display-inline-table" }, index.h("div", { class: "w-100 display-flex padding-bottom-1" }, index.h("calcite-button", { appearance: 'outline', class: "w-1-2" }, this._translations.information), index.h("calcite-button", { class: "w-1-2" }, this._translations.media)), index.h("div", null, index.h("media-card", { class: "", values: this._fakeValues }), index.h("info-card", { class: "display-none", values: this._fakeInfos })))));
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
    const messages = await locale.getLocaleComponentStrings(this.el);
    this._translations = messages[0];
  }
  get el() { return index.getElement(this); }
};
CardManager.style = cardManagerCss;

exports.card_manager = CardManager;

//# sourceMappingURL=card-manager.cjs.entry.js.map