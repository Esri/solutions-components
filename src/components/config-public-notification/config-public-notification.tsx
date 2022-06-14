import { Component, Host, h, Prop, VNode } from '@stencil/core';

@Component({
  tag: 'config-public-notification',
  styleUrl: 'config-public-notification.css',
  shadow: true,
})
export class ConfigPublicNotification {

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  @Prop({ mutable: true }) isOpen = false;

  render() {
    return (
      <Host>
        {this.isOpen ? this._renderModal() : this._renderBtn()}
      </Host>
    );
  }

  _renderModal(): VNode {
    return (<calcite-modal active aria-labelledby="modal-title" disable-close-button fullscreen>
      <div id="modal-title" slot="header">Modal title</div>
      <div slot="content">
        Config options go here
      </div>
      <calcite-button
        appearance="outline"
        onClick={() => this._closeSettings()}
        slot="secondary"
        width="full"
      >Cancel</calcite-button>
      <calcite-button
        onClick={() => this._saveSettings()}
        slot="primary"
        width="full"
      >Save</calcite-button>
    </calcite-modal>);
  }

  _renderBtn(): VNode {
    return (<calcite-button
      appearance="outline"
      class="settings-btn"
      iconStart="gear"
      onClick={() => this._openSettings()}
      width="full"
    />);
  }

  _closeSettings(): void {
    this.isOpen = false;
  }

  _openSettings(): void {
    this.isOpen = true;
  }

  _saveSettings(): void {
    //do save stuff

    this._closeSettings();
  }

}
