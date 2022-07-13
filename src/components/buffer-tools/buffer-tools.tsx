import { Component, Event, EventEmitter, Host, h, Prop, Watch } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";

@Component({
  tag: 'buffer-tools',
  styleUrl: 'buffer-tools.css',
  shadow: true,
})
export class BufferTools {

  @Prop() translations: any = {};

  @Prop() geometries: __esri.Geometry[];

  @Prop() unionResults = true;

  @Watch('geometries')
  geometriesWatchHandler(v: any, oldV: any): void {
    if (v && v !== oldV) {
      this._buffer();
    }
  }

  @Event() bufferComplete: EventEmitter;

  private geometryEngine:  __esri.geometryEngine;

  private _unit: __esri.LinearUnits;

  private _distance = 0;

  protected _unitDiv: HTMLCalciteSelectElement;

  async componentWillLoad() {
    await this._initModules();
  }

  render() {
    return (
      <Host>
        <calcite-label disable-spacing={true} style={{ "display": "flex", "padding-top": "1rem" }}>
          {this.translations?.searchDistance}
        </calcite-label>
        <div class="c-container">
          <calcite-input
            class="padding-end-1"
            number-button-type="vertical"
            onCalciteInputInput={(evt) => this._setDistance(evt)}
            placeholder="0"
            type="number"
          />
          <calcite-select
            class="flex-1"
            label='label'
            onCalciteSelectChange={() => this._setUnit()}
            ref={(el) => { this._unitDiv = el }}
          >
            {this._addUnits()}
          </calcite-select>
        </div>
      </Host>
    );
  }

  async _initModules(): Promise<void> {
    const [geometryEngine]: [
      __esri.geometryEngine
    ] = await loadModules([
      "esri/geometry/geometryEngine"
    ]);
    this.geometryEngine = geometryEngine;
  }

  _addUnits(): any {
    const units = {
      'feet': this.translations?.units.feet || 'Feet',
      'meters': this.translations?.units.meters || 'Meters',
      'miles': this.translations?.units.miles || 'Miles',
      'kilometers': this.translations?.units.kilometers || 'Kilometers'
    };
    return Object.keys(units).map(u => {
      if (!this._unit) {
        this._unit = u as __esri.LinearUnits;
        
      }
      return (<calcite-option label={units[u]} value={u} />);
    });
  }

  _setDistance(
    event: CustomEvent
  ): void {
    this._distance = event.detail.value;
    this._buffer();
  }

  _setUnit(): void {
    this._unit = this._unitDiv.value as __esri.LinearUnits;
    this._buffer();
  }

  _buffer(): void {
    // needs to be wgs 84 or Web Mercator
    if (this.geometries.length > 0 && this._unit && this._distance > 0) {
       this.bufferComplete.emit(this.geometryEngine.geodesicBuffer(
        this.geometries,
        this._distance,
        this._unit,
        this.unionResults
      ));
    }
  }
}
