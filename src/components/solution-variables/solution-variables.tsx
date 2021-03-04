import { Component, Element, Event, EventEmitter, Host, h, Prop, VNode } from '@stencil/core';

export interface IVariableItem {
  id: string;
  title: string;
  type: varType; // May not be necessary...
  value?: string; // May not be necessary...
  dependencies?: IVariableItem[];
}

enum varType {
  PARENT,
  VARIABLE
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
  };

  /**
   * Contains the public value for this component.
   */
  @Prop() value: IVariableItem[] = [];

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <calcite-label id="variable-label">
          {this.renderHierarchy(this.value)}
        </calcite-label>
      </Host>
    );
  }

  renderHierarchy(
    objs: IVariableItem[]
  ): VNode[] {
    // just want the event 
    const hierarchy = objs.map(obj => {
      if (obj.dependencies && obj.dependencies.length > 0) {
        if (obj.type === varType.PARENT) {
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
              <calcite-tree slot="children">
                {this.renderHierarchy(obj.dependencies)}
              </calcite-tree>
            </calcite-tree-item>
          );
        }
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
