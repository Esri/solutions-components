import { Component, Host, h, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'solution-template-data',
  styleUrl: 'solution-template-data.css',
  shadow: false
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
              <calcite-shell-center-row slot="center-row" position="start" height-scale="l" width-scale="l" class="json-editor">
                <div class="child-container">
                  <span id="json-editor-span">JSON Editor goes</span>
                </div>
              </calcite-shell-center-row>
              <calcite-shell-panel slot="contextual-panel" position="start" height-scale="l" width-scale="m">
                <div class="child-container">
                  <solution-organization-variables></solution-organization-variables>
                  <solution-variables></solution-variables>
                </div>
              </calcite-shell-panel>
            </calcite-shell>
          </div>
      </Host>
    );
  }

    //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  @Listen("solutionVariableSelected")
  solutionVariableSelected(event: CustomEvent): void {
    const jsonEditor = document.getElementById("json-editor-span");
    jsonEditor.innerHTML += `\n itemId: ${event.detail.itemId} value: ${event.detail.value}`;
  }

  @Listen("organizationVariableSelected")
  organizationVariableSelected(event: CustomEvent): void {
    const jsonEditor = document.getElementById("json-editor-span");
    jsonEditor.innerHTML += `\n itemId: ${event.detail.itemId} value: ${event.detail.value}`;
  }
  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
}
