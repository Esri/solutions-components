import { Component, Event, EventEmitter, Host, h, Prop, VNode } from '@stencil/core';
import { getMapLayerNames } from '../../utils/mapViewUtils';

@Component({
  tag: 'config-public-notification',
  styleUrl: 'config-public-notification.css',
  shadow: true,
})
export class ConfigPublicNotification {

  /**
   * esri/views/View: https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html
   */
  @Prop() mapView: __esri.MapView;

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {};

  @Prop({ mutable: true }) isOpen = false;

  @Prop({ mutable: true }) layerNames: string[] = [];

  @Event() configSaved: EventEmitter;

  async componentDidLoad() {
    await this._setLayers();
  }

  render() {
    return (
      <Host>
        {this.isOpen ? this._renderModal() : this._renderBtn()}
      </Host>
    );
  }

  protected _searchConfig: HTMLConfigMapSearchElement;

  _renderModal(): VNode {
    return (<calcite-modal active aria-labelledby="modal-title" disable-close-button fullscreen>
      <div id="modal-title" slot="header">Modal title</div>
      <div slot="content">
        <config-map-search layers={this.layerNames} ref={(el) => { this._searchConfig = el }}/>
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

  async _setLayers(): Promise<void> {
    if (this.mapView) {
      this.layerNames = await getMapLayerNames(this.mapView);
    }
  }

  _closeSettings(): void {
    this.isOpen = false;
  }

  _openSettings(): void {
    this.isOpen = true;
  }

  _saveSettings(): void {
    this._searchConfig.getConfig().then((searchConfig) => {
      this.configSaved.emit(searchConfig);
      this._closeSettings();
    })
  }

}
