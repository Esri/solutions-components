import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'map-draw-tools',
  styleUrl: 'map-draw-tools.css',
  shadow: true,
})
export class MapDrawTools {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
