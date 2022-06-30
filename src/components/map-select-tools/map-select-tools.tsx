import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'map-select-tools',
  styleUrl: 'map-select-tools.css',
  shadow: true,
})
export class MapSelectTools {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
