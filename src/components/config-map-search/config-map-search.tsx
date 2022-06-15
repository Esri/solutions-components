import { Component, Host, h, Method, Prop, VNode, Watch } from '@stencil/core';
import { ISearchConfig } from '../../utils/interfaces';

@Component({
  tag: 'config-map-search',
  styleUrl: 'config-map-search.css',
  shadow: true,
})
export class ConfigMapSearch {

  @Prop({ mutable: true }) useLayerUrl = true;

  @Prop({ mutable: true }) useLocatorUrl = true;
  
  @Prop({ mutable: true }) layers = [];
  
  @Watch('layers')
  layersWatchHandler(v: any, oldV: any): void {
    if (v && v !== oldV) {
      this._initSelectedLayers();
    }
  }

  render() {
    return (
      <Host>
        <div>
          <calcite-input-message active scale='l'>Search configuration</calcite-input-message>
          <calcite-tabs>
            <calcite-tab-nav slot="tab-nav">
              <calcite-tab-title active>Layer</calcite-tab-title>
              <calcite-tab-title>Locator</calcite-tab-title>
            </calcite-tab-nav>
            <calcite-tab active class="tab-padding">
              <calcite-radio-button-group layout="vertical" name="layer-group">
                <calcite-label layout="inline">
                  <calcite-radio-button
                    checked={this.useLayerUrl}
                    onCalciteRadioButtonChange={(evt) => this._checkChanged(evt)}
                    value="layer-url"
                  />From URL
                </calcite-label>
                <calcite-label layout="inline">
                  <calcite-radio-button
                    checked={!this.useLayerUrl}
                    onCalciteRadioButtonChange={(evt) => this._checkChanged(evt)}
                    value="layer-map"
                  />Map
                </calcite-label>
              </calcite-radio-button-group>
              {
                this.useLayerUrl ? 
                  this._getUrlInput("Enter Layer Url", "layer-url") :
                  this._getLayerListInput()
              }
            </calcite-tab>
            <calcite-tab class="tab-padding">
              <calcite-radio-button-group layout="vertical" name="locator-group">
                <calcite-label layout="inline">
                  <calcite-radio-button checked={this.useLocatorUrl} value="locator-url"/>From URL
                </calcite-label>
                <calcite-label layout="inline">
                  <calcite-radio-button checked={!this.useLocatorUrl} value="locator-map"/>From existing locator
                </calcite-label>
              </calcite-radio-button-group>
              {
                this.useLocatorUrl ? 
                  this._getUrlInput("Enter Locator Url", "locator-url") :
                  this._getLayerListInput()
              }
            </calcite-tab>
          </calcite-tabs>
        </div>
      </Host>
    );
  }

  protected _layerUrl = "";

  protected _selectedMapLayers = {};

  protected _locatorUrl = "";

  @Method()
  getConfig(): Promise<ISearchConfig> {
    const layers = Object.keys(this._selectedMapLayers).reduce((prev, cur) => {
      if (this._selectedMapLayers[cur]) {
        prev.push(cur);
      }
      return prev;
    }, []);

    const locators = [];

    return Promise.resolve({
      layers,
      layerUrl: this._layerUrl,
      locators,
      locatorUrl: this._locatorUrl
    });
  }

  _getUrlInput(msg: string, name: string): VNode {
    return (
      <calcite-label>
        {msg}
        <calcite-input name={name} onCalciteInputInput={(evt) => this._urlChanged(evt)} type='url' />
      </calcite-label>
    );
  }

  _getLayerListInput(): VNode {
    const layers = Object.keys(this._selectedMapLayers).length !== this.layers.length ?
      this._initSelectedLayers() : this._selectedMapLayers;
    return (
      <calcite-pick-list class="pick-list-padding" multiple>
        {
          Object.keys(layers).map(k => {
            return (<calcite-pick-list-item
              label={k}
              onCalciteListItemChange={(evt) => this._mapLayerChanged(evt)}
              selected={layers[k]}
              value={k}
            />);
          })
        }
      </calcite-pick-list>
    );
  }

  _initSelectedLayers(): any {
    this.layers.forEach(l => {
      if(Object.keys(this._selectedMapLayers).indexOf(l) < 0){
        this._selectedMapLayers[l] = false;
      }
    });
    return this._selectedMapLayers;
  }

  _checkChanged(evt: CustomEvent): void {
    switch ((evt.currentTarget as HTMLCalciteRadioButtonElement).value) {
      case 'layer-url':
        this.useLayerUrl = true;
        break;     
      case 'layer-map':
        this.useLayerUrl = false;
        break;
      case 'locator-url':
        this.useLocatorUrl = true;
        break;
      case 'locator-map':
        this.useLocatorUrl = false;
        break;
    }
  }

  _mapLayerChanged(evt: CustomEvent): void {
    this._selectedMapLayers[evt.detail.value] = evt.detail.selected;
  }

  _urlChanged(evt: CustomEvent): void {
    // TODO add some sort of validation
    if (evt.detail.element.name === 'layer-url') {
      this._layerUrl = evt.detail.value;
    } else {
      this._locatorUrl = evt.detail.value;
    }
  }

}
