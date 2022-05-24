import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'map-search',
  styleUrl: 'map-search.css',
  shadow: true,
})
export class MapSearch {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
