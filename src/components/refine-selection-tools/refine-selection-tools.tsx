import { Component, Host, h, Prop } from '@stencil/core';
import { ERefineMode } from '../../utils/interfaces';

@Component({
  tag: 'refine-selection-tools',
  styleUrl: 'refine-selection-tools.css',
  shadow: true,
})
export class RefineSelectionTools {

  @Prop() mode: ERefineMode;

  @Prop() translations: any = {};

  @Prop() mapView: __esri.MapView;

  @Prop() searchLayers: __esri.Layer[];

  render() {
    return (
      <Host>
        <div>
          <div class={"esri-sketch esri-widget"}>
            <div class={"esri-sketch__panel"}>
              <div class={"esri-sketch__tool-section esri-sketch__section"}>
                <calcite-action icon="select" scale="s" text={this.translations?.select} />
              </div>
              <div class={"esri-sketch__tool-section esri-sketch__section"}>
                <calcite-action icon="line" scale="s" text={this.translations?.selectLine} />
                <calcite-action icon="polygon" scale="s" text={this.translations?.selectPolygon} />
                <calcite-action icon="rectangle" scale="s" text={this.translations?.selectRectangle} />
              </div>
              <div class={"esri-sketch__tool-section esri-sketch__section"}>
                <calcite-action icon="undo" scale="s" text={this.translations?.undo} />
                <calcite-action icon="redo" scale="s" text={this.translations?.redo} />
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
