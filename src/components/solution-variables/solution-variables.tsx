import { Component, Element, Event, EventEmitter, Host, h, Prop, VNode } from '@stencil/core';

export interface IVariableItem {
  id: string;
  title: string;
  value: string;
  dependencies?: IVariableItem[];
}

@Component({
  tag: 'solution-variables',
  styleUrl: 'solution-variables.css',
  shadow: true,
})
export class SolutionVariables {

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   */
  @Prop({ mutable: true }) translations: any = {
    "solVariables": "Solution Varibles"
  };

  /**
   * Contains the public value for this component.
   */
  @Prop() value: IVariableItem[] = [{
    id: "db1",
    title: "Dashboard 1",
    value: "{{Dashboard 1 value}}",
    dependencies: [{
      id: "db1ItemId",
      title: "Item Id",
      value: "{{db1ItemId value}}"
    }, {
      id: "db1Url",
      title: "Url",
      value: "{{db1Url value}}"
    }]
  }, {
    id: "db2",
    title: "Dashboard 2",
    value: "Dashboard 2 value",
    dependencies: [{
      id: "db2ItemId",
      title: "Item Id",
      value: "{{db2ItemId value}}"
    }, {
      id: "db2Url",
      title: "Url",
      value: "{{db2Url value}}"
    }]
  }, {
    id: "fs1",
    title: "Feature Service 1",
    value: "{{Feature Service 1 value}}",
    dependencies: [{
      id: "fs1ItemId",
      title: "Item Id",
      value: "{{fs1ItemId value}}"
    }, {
      id: "fs1Url",
      title: "Url",
      value: "{{fs1Url value}}"
    }, {
      id: "fs1Name",
      title: "Name",
      value: "{{fs1Name value}}"
    }, {
      id: "layer0",
      title: "Layer 0",
      value: "{{layer0 value}}",
      dependencies: [{
        id: "layer0Id",
        title: "Id",
        value: "{{layer0Id value}}"
      }, {
        id: "layer0Url",
        title: "Url",
        value: "{{layer0Url value}}"
      }]
    }, {
      id: "layer1",
      title: "Layer 1",
      value: "{{layer1 value}}",
      dependencies: [{
        id: "layer1Id",
        title: "Id",
        value: "{{layer1Id value}}"
      }, {
        id: "layer1Url",
        title: "Url",
        value: "{{layer1Url value}}"
      }]
    }]
  }, {
    id: "grp1",
    title: "Group 1",
    value: "{{Group 1 value}}",
    dependencies: [{
      id: "group1Id",
      title: "Group Id",
      value: "{{group1Id value}}"
    }]
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
          <h4 class="org-var-header">{this.translations.solVariables}</h4>
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
    objs: IVariableItem[]
  ): VNode[] {
    const hierarchy = objs.map(obj => {
      if (obj.dependencies && obj.dependencies.length > 0) {
        return (
          <calcite-tree-item>
            {obj.title}
            <calcite-tree slot="children">
              {this.renderHierarchy(obj.dependencies)}
            </calcite-tree>
          </calcite-tree-item>
        );
      } else {
        return (
          <calcite-tree-item onClick={() => this._treeItemSelected(obj.id, obj.value)}>
            {obj.title}
          </calcite-tree-item>
        );
      }
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

  @Event() solutionVariableSelected: EventEmitter;

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
   * Publishes the `solutionVariableSelected` event containing `itemId`, the id of the selected variable and the value of the variable.
   *
   * @param id Item id as reported by click event
   * @param value Variable id as reported by click event
   */
  private _treeItemSelected(
    id: string,
    value: string
  ): void {
    this.solutionVariableSelected.emit({
      itemId: id,
      value
    });
  }

}
