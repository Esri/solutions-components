/*!
 * Copyright 2022 Esri
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-c6979cbb.js');
const locale = require('./locale-73cab8e8.js');
require('./key-55aca5c0.js');
require('./observers-5311faf8.js');
require('./dom-4a580af6.js');
require('./resources-b56bce71.js');
require('./guid-84ac4d91.js');

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.0.0-beta.97
 */
const CSS = {
  page: "page",
  selected: "is-selected",
  previous: "previous",
  next: "next",
  disabled: "is-disabled",
  ellipsis: "ellipsis",
  ellipsisStart: "ellipsis--start",
  ellipsisEnd: "ellipsis--end"
};
const TEXT = {
  nextLabel: "Next",
  previousLabel: "Previous"
};

const paginationCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing)}:host([hidden]){display:none}:host([scale=s]){--calcite-pagination-spacing:0.25rem 0.5rem}:host([scale=s]) .previous,:host([scale=s]) .next,:host([scale=s]) .page{block-size:1.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .previous,:host([scale=s]) .next{padding-inline:0.25rem}:host([scale=m]){--calcite-pagination-spacing:0.5rem 0.75rem}:host([scale=m]) .previous,:host([scale=m]) .next,:host([scale=m]) .page{block-size:2rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .previous,:host([scale=m]) .next{padding-inline:0.5rem}:host([scale=l]){--calcite-pagination-spacing:0.75rem 1rem}:host([scale=l]) .previous,:host([scale=l]) .next,:host([scale=l]) .page{block-size:2.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .previous,:host([scale=l]) .next{padding-inline:1rem}:host{display:flex;writing-mode:horizontal-tb}:host button{outline-color:transparent}:host button:focus{outline:2px solid var(--calcite-ui-brand);outline-offset:-2px}.previous,.next,.page{box-sizing:border-box;display:flex;cursor:pointer;align-items:center;border-style:none;--tw-border-opacity:0;background-color:transparent;font-family:inherit;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-ui-text-3);border-block:2px solid transparent}.previous:hover,.next:hover,.page:hover{color:var(--calcite-ui-text-1);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.page:hover{border-block-end-color:var(--calcite-ui-border-2)}.page.is-selected{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1);border-block-end-color:var(--calcite-ui-brand)}.previous:hover,.next:hover{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-brand)}.previous:active,.next:active{background-color:var(--calcite-ui-foreground-3)}.previous.is-disabled,.next.is-disabled{pointer-events:none;background-color:transparent}.previous.is-disabled>calcite-icon,.next.is-disabled>calcite-icon{opacity:var(--calcite-ui-opacity-disabled)}.next{-webkit-margin-end:0px;margin-inline-end:0px}.page,.ellipsis{padding:var(--calcite-pagination-spacing)}.ellipsis{display:flex;align-items:flex-end;color:var(--calcite-ui-text-3)}";

const maxPagesDisplayed = 5;
const Pagination = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.calcitePaginationUpdate = index.createEvent(this, "calcitePaginationUpdate", 6);
    this.calcitePaginationChange = index.createEvent(this, "calcitePaginationChange", 6);
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------
    /**
     * When `true`, number values are displayed with a group separator corresponding to the language and country format.
     */
    this.groupSeparator = false;
    /** Specifies the number of items per page. */
    this.num = 20;
    /** Specifies the starting item number. */
    this.start = 1;
    /** Specifies the total number of items. */
    this.total = 0;
    /**
     * Accessible name for the component's next button.
     *
     * @default "Next"
     */
    this.textLabelNext = TEXT.nextLabel;
    /**
     * Accessible name for the component's previous button.
     *
     * @default "Previous"
     */
    this.textLabelPrevious = TEXT.previousLabel;
    /** Specifies the size of the component. */
    this.scale = "m";
    //--------------------------------------------------------------------------
    //
    //  State
    //
    //--------------------------------------------------------------------------
    this.effectiveLocale = "";
    this.previousClicked = () => {
      this.previousPage().then();
      this.emitUpdate();
    };
    this.nextClicked = () => {
      this.nextPage();
      this.emitUpdate();
    };
    /**
     * Returns a string representing the localized label value based on groupSeparator prop being on or off.
     *
     * @param value
     */
    this.determineGroupSeparator = (value) => {
      locale.numberStringFormatter.numberFormatOptions = {
        locale: this.effectiveLocale,
        numberingSystem: this.numberingSystem,
        useGrouping: this.groupSeparator
      };
      return this.groupSeparator
        ? locale.numberStringFormatter.localize(value.toString())
        : value.toString();
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    locale.connectLocalized(this);
  }
  disconnectedCallback() {
    locale.disconnectLocalized(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /** Go to the next page of results. */
  async nextPage() {
    this.start = Math.min(this.getLastStart(), this.start + this.num);
  }
  /** Go to the previous page of results. */
  async previousPage() {
    this.start = Math.max(1, this.start - this.num);
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  getLastStart() {
    const { total, num } = this;
    const lastStart = total % num === 0 ? total - num : Math.floor(total / num) * num;
    return lastStart + 1;
  }
  showLeftEllipsis() {
    return Math.floor(this.start / this.num) > 3;
  }
  showRightEllipsis() {
    return (this.total - this.start) / this.num > 3;
  }
  emitUpdate() {
    const changePayload = {
      start: this.start,
      total: this.total,
      num: this.num
    };
    this.calcitePaginationChange.emit(changePayload);
    this.calcitePaginationUpdate.emit(changePayload);
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  renderPages() {
    const lastStart = this.getLastStart();
    let end;
    let nextStart;
    // if we don't need ellipses render the whole set
    if (this.total / this.num <= maxPagesDisplayed) {
      nextStart = 1 + this.num;
      end = lastStart - this.num;
    }
    else {
      // if we're within max pages of page 1
      if (this.start / this.num < maxPagesDisplayed - 1) {
        nextStart = 1 + this.num;
        end = 1 + 4 * this.num;
      }
      else {
        // if we're within max pages of last page
        if (this.start + 3 * this.num >= this.total) {
          nextStart = lastStart - 4 * this.num;
          end = lastStart - this.num;
        }
        else {
          nextStart = this.start - this.num;
          end = this.start + this.num;
        }
      }
    }
    const pages = [];
    while (nextStart <= end) {
      pages.push(nextStart);
      nextStart = nextStart + this.num;
    }
    return pages.map((page) => this.renderPage(page));
  }
  renderPage(start) {
    const page = Math.floor(start / this.num) + (this.num === 1 ? 0 : 1);
    const displayedPage = this.determineGroupSeparator(page);
    return (index.h("button", { class: {
        [CSS.page]: true,
        [CSS.selected]: start === this.start
      }, onClick: () => {
        this.start = start;
        this.emitUpdate();
      } }, displayedPage));
  }
  renderLeftEllipsis() {
    if (this.total / this.num > maxPagesDisplayed && this.showLeftEllipsis()) {
      return index.h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisStart}` }, "\u2026");
    }
  }
  renderRightEllipsis() {
    if (this.total / this.num > maxPagesDisplayed && this.showRightEllipsis()) {
      return index.h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisEnd}` }, "\u2026");
    }
  }
  render() {
    const { total, num, start } = this;
    const prevDisabled = num === 1 ? start <= num : start < num;
    const nextDisabled = num === 1 ? start + num > total : start + num > total;
    return (index.h(index.Fragment, null, index.h("button", { "aria-label": this.textLabelPrevious, class: {
        [CSS.previous]: true,
        [CSS.disabled]: prevDisabled
      }, disabled: prevDisabled, onClick: this.previousClicked }, index.h("calcite-icon", { flipRtl: true, icon: "chevronLeft", scale: "s" })), total > num ? this.renderPage(1) : null, this.renderLeftEllipsis(), this.renderPages(), this.renderRightEllipsis(), this.renderPage(this.getLastStart()), index.h("button", { "aria-label": this.textLabelNext, class: {
        [CSS.next]: true,
        [CSS.disabled]: nextDisabled
      }, disabled: nextDisabled, onClick: this.nextClicked }, index.h("calcite-icon", { flipRtl: true, icon: "chevronRight", scale: "s" }))));
  }
  get el() { return index.getElement(this); }
};
Pagination.style = paginationCss;

exports.calcite_pagination = Pagination;
