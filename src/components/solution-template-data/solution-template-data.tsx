import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'solution-template-data',
  styleUrl: 'solution-template-data.css',
  shadow: true,
})
export class SolutionTemplateData {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
