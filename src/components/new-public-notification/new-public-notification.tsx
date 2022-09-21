import { Component, Element, Host, h, State } from '@stencil/core';
import NewPublicNotification_T9n from '../../assets/t9n/new-public-notification/resources.json';
import { getLocaleComponentStrings } from '../../utils/locale';

@Component({
  tag: 'new-public-notification',
  styleUrl: 'new-public-notification.css',
  shadow: false,
})
export class NewPublicNotification {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLNewPublicNotificationElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @State() translations: typeof NewPublicNotification_T9n;

  //--------------------------------------------------------------------------
  //
  //  Properties (private)
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

  async componentWillLoad() {
    await this._getTranslations();
  }

  render() {
    return (
      <Host>
        <calcite-shell>
          <calcite-action-bar class="border-bottom-1 action-bar-size" expand-disabled layout='horizontal' slot="header">
            <calcite-action-group class="action-center" layout='horizontal'>
              <calcite-action alignment='center' class="width-full height-full" compact={false} id="pn-lists" text="" icon="list-check"/>
              
              <calcite-tooltip label="" placement="bottom" reference-element="pn-lists">
                <span>{this.translations?.myLists}</span>
              </calcite-tooltip>

            </calcite-action-group>
            <calcite-action-group class="action-center" layout='horizontal'>
              <calcite-action alignment='center' class="width-full height-full" compact={false} id="pn-pdf" text="" icon="file-pdf"/>
              <calcite-tooltip label="" placement="bottom" reference-element="pn-pdf">
                <span>{this.translations?.downloadPDF}</span>
              </calcite-tooltip>
            </calcite-action-group>
            <calcite-action-group class="action-center" layout='horizontal'>
              <calcite-action alignment='center' class="width-full height-full" compact={false} id="pn-csv" text="" icon="file-csv"/>
              <calcite-tooltip label="" placement="bottom" reference-element="pn-csv">
                <span>{this.translations?.downloadCSV}</span>
              </calcite-tooltip>
            </calcite-action-group>
          </calcite-action-bar>

          <calcite-panel>
            <div class="padding-top-sides-1">
              <calcite-label class="font-bold">{this.translations?.myLists}</calcite-label>
              <calcite-label>{this.translations?.notifications}</calcite-label>
            </div>
            <div class="info-message">
              <calcite-input-message active class="info-blue" scale='m'>{this.translations?.noNotifications}</calcite-input-message>
            </div>
            <calcite-notice active class="padding-1" color="green" icon="lightbulb">
              <div slot="message">{this.translations?.notice}</div>
            </calcite-notice>
            <div class="add-container padding-1">
              <calcite-button width="full">{this.translations?.add}</calcite-button>
            </div>
          </calcite-panel>
        </calcite-shell>
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (private)
  //
  //--------------------------------------------------------------------------

  async _getTranslations() {
    const translations = await getLocaleComponentStrings(this.el);
    this.translations = translations[0] as typeof NewPublicNotification_T9n;
  }
}
