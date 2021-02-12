import { Component, Element, h, Host, Prop } from '@stencil/core';
import "@esri/calcite-components";
import "../../components";

@Component({
  tag: 'solution-spatial-ref',
  styleUrl: 'solution-spatial-ref.css',
  shadow: false
})
export class SolutionSpatialRef {

  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  @Prop({ mutable: true }) translations: any = {
    "specifyParam": "Spatial Reference Parameter",
    "defaultSpatialRef": "Default Spatial Reference",
    "featureServicesHeading": "Feature Services"
  };

  @Prop({ mutable: true }) value: any = {};

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    return (
      <Host>
        <label class="switch-label"><calcite-switch scale="s" class="spatial-ref-switch"></calcite-switch>{this.translations.specifyParam}</label>
        <div id="spatialRefDefn" class="spatial-ref-switch-title">
          <calcite-label>{this.translations.defaultSpatialRef}<label id="item-description-label" class="spatial-ref-default"><calcite-input id="item-description"></calcite-input></label></calcite-label>
          <label class="spatial-ref-current">WGS 1984 Web Mercator Auxiliary Sphere (102100)</label>
          <label class="spatial-ref-item-title">{this.translations.featureServicesHeading}</label>
          <label class="switch-label"><calcite-switch scale="s" class="spatial-ref-item-switch"></calcite-switch>Feature Service 1</label>
          <label class="switch-label"><calcite-switch scale="s" class="spatial-ref-item-switch"></calcite-switch>Feature Service 2</label>
        </div>
      </Host>
    );
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

  //--------------------------------------------------------------------------
  //
  //  Public Methods (async)
  //
  //--------------------------------------------------------------------------

}
