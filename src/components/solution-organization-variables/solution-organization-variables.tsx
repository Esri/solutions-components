import { Component, Element, Event, EventEmitter, Host, h, Prop, VNode } from '@stencil/core';

@Component({
  tag: 'solution-organization-variables',
  styleUrl: 'solution-organization-variables.css',
  shadow: true,
})
export class SolutionOrganizationVariables {

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {
  };

  /**
   * Contains the public value for this component.
   */
  @Prop() value: any = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------


  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
