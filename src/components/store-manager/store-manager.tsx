import { Component, Event, EventEmitter, Host, h, Prop, Watch } from '@stencil/core';
import state from '../../utils/editStore';
import { getModels } from '../../utils/templates';

@Component({
  tag: 'store-manager',
  shadow: false
})
export class StoreManager {

  // this could be a templates or template
  @Prop({ mutable: true, reflect: true }) value: any = undefined;

  @Watch('value')
  async valueSet(newValue: any, oldValue: any) {
    if (newValue !== oldValue) {
      state.models = await getModels(Array.isArray(newValue) ? newValue : [newValue]);
    }
  }

  async componentWillRender(): Promise<any> {
    if (this.value) {
      state.models = await getModels(Array.isArray(this.value) ? this.value : [this.value]);
    }
    this.stateLoaded.emit(state);
    return;
  }

  render() {
    return (<Host><div></div></Host>);
  }

  @Event() stateLoaded: EventEmitter;
}
