import { Component, Host, h, Prop, Watch } from '@stencil/core';
import state from '../../utils/editStore';
import { getModels } from '../../utils/templates';

@Component({
  tag: 'store-manager',
  shadow: false
})
export class StoreManager {

  // this could be a templates or tremplate
  @Prop({ mutable: true, reflect: true }) value: any = undefined;

  @Watch('value')
  valueSet(newValue: any, oldValue: any) {
    if (newValue !== oldValue) {
      state.models = getModels(Array.isArray(newValue) ? newValue : [newValue]);
    }
  }

  render() {
    return (<Host><div></div></Host>);
  }
}
