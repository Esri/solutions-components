import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'map-layer-picker',
  styleUrl: 'map-layer-picker.css',
  shadow: true,
})
export class MapLayerPicker {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
