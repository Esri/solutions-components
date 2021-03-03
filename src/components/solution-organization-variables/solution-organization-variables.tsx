import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'solution-organization-variables',
  styleUrl: 'solution-organization-variables.css',
  shadow: true,
})
export class SolutionOrganizationVariables {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
