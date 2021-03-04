import { Component, Element, Event, EventEmitter, Host, h, Prop, VNode } from '@stencil/core';

@Component({
  tag: 'solution-template-data',
  styleUrl: 'solution-template-data.css',
  shadow: true,
})
export class SolutionTemplateData {

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
        <div class="parent-container">
            <calcite-shell dir="ltr" theme="light">
              <calcite-shell-center-row slot="center-row" position="start" height-scale="l" width-scale="l">
                <div class="child-container">
                  <span>JSON Editor goes</span>
                </div>
              </calcite-shell-center-row>
              <calcite-shell-panel slot="contextual-panel" position="start" height-scale="l" width-scale="m">
                <div class="child-container">
                  <solution-organization-variables></solution-organization-variables>
                  <solution-solution-variables></solution-solution-variables>
                </div>
              </calcite-shell-panel>
            </calcite-shell>
          </div>
      </Host>
    );
  }

}
