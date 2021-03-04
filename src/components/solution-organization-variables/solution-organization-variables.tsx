import { Component, Event, EventEmitter, Host, h, Prop, VNode } from '@stencil/core';

export interface IOrganizationVariableItem {
  id: string;
  title: string;
  value: string;
}

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
    "orgVariables": "Organization Varibles"
  };

  /**
   * Contains the public value for this component.
   */
  @Prop() value: IOrganizationVariableItem[] = [{
    id: "id",
    title: "title",
    value: "value"
  }, {
    id: "id2",
    title: "title2",
    value: "value2"
  }, {
    id: "id3",
    title: "title3",
    value: "value3"
  }, {
    id: "id4",
    title: "title4",
    value: "value4"
  }, {
    id: "id5",
    title: "title5",
    value: "value5"
  }, {
    id: "id6",
    title: "title6",
    value: "value6"
  }];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <div>
          <h4 class="org-var-header">{this.translations.orgVariables}</h4>
        </div>
        <div class="container-border">
          <calcite-label id="variable-label">
            {this.renderHierarchy(this.value)}
          </calcite-label>
        </div>
      </Host>
    );
  }

  renderHierarchy(
    objs: IOrganizationVariableItem[]
  ): VNode[] {
    const hierarchy = objs.map(obj => {
      return (
        <calcite-tree-item onClick={() => this._treeItemSelected(obj.id, obj.value)}>
          {obj.title}
        </calcite-tree-item>
      );
    });
    return hierarchy;
  }

  //--------------------------------------------------------------------------
  //
  //  Variables (private)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() organizationVariableSelected: EventEmitter;

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

  /**
   * Publishes the `organizationVariableSelected` event containing `itemId`, the id of the selected variable and the value of the variable.
   *
   * @param itemId Item id as reported by click event
   * @param value Variable id as reported by click event
   */
  private _treeItemSelected(
    itemId: string,
    value: string
  ): void {
    this.organizationVariableSelected.emit({
      itemId,
      value
    });
  }

}
