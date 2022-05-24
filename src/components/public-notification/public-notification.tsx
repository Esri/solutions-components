import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'public-notification',
  styleUrl: 'public-notification.css',
  shadow: true,
})
export class PublicNotification {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
