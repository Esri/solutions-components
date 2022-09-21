import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'new-public-notification',
  styleUrl: 'new-public-notification.css',
  shadow: true,
})
export class NewPublicNotification {

  render() {
    return (
      <Host>
        <calcite-shell>
          <calcite-action-bar class="border-bottom-1 action-bar-size" expand-disabled layout='horizontal' slot="header">
            <calcite-action-group class="action-center" layout='horizontal'>
              <calcite-action alignment='center' class="width-full height-full" compact={false} text="" icon="list-check"></calcite-action>
            </calcite-action-group>
            <calcite-action-group class="action-center" layout='horizontal'>
              <calcite-action alignment='center' class="width-full height-full" compact={false} text="" icon="file-pdf"></calcite-action>
            </calcite-action-group>
            <calcite-action-group class="action-center" layout='horizontal'>
              <calcite-action alignment='center' class="width-full height-full" compact={false} text="" icon="file-csv"></calcite-action>
            </calcite-action-group>
          </calcite-action-bar>

          <calcite-panel>
            <div class="padding-1">
              <calcite-label class="font-bold">My Lists</calcite-label>
              <calcite-label>Notifications</calcite-label>
            </div>
            <div class="padding-1 info-message">
              <calcite-input-message active class="info-blue" scale='m'>You have no notification list yet.</calcite-input-message>
            </div>
            <calcite-notice active class="padding-1" color="green" icon="lightbulb">
              <div slot="message">Click on the "add" button to create a notification list.</div>
            </calcite-notice>
            <div class="add-container padding-1">
              <calcite-button width="full">Add</calcite-button>
            </div>
          </calcite-panel>
        </calcite-shell>
      </Host>
    );
  }

}
