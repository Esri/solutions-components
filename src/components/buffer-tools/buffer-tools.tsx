import { Component, Element, Event, EventEmitter, Host, h, Prop, Watch } from '@stencil/core';
import { loadModules } from "../../utils/loadModules";

@Component({
  tag: 'buffer-tools',
  styleUrl: 'buffer-tools.css',
  shadow: true,
})
export class BufferTools {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLBufferToolsElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Contains the translations for this component.
   * All UI strings should be defined here.
   */
  @Prop() translations: any = {};

  /**
   * esri/geometry/Geometry: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-Geometry.html
   */
  @Prop() geometries: __esri.Geometry[];

  /**
   * boolean: option to control if buffer results should be unioned
   */
  @Prop() unionResults = true;

  /**
   * LinearUnits: https://developers.arcgis.com/javascript/latest/api-reference/esri-geometry-geometryEngine.html#LinearUnits
   */
  @Prop() unit: __esri.LinearUnits;

  /**
   * number: The distance used for buffer
   */
  @Prop() distance = 0;

  //--------------------------------------------------------------------------
  //
  //  Properties (private)
  //
  //--------------------------------------------------------------------------

  protected geometryEngine:  __esri.geometryEngine;

  protected _unitDiv: HTMLCalciteSelectElement;

  protected bufferTimeout: NodeJS.Timeout;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  @Watch('geometries')
  geometriesWatchHandler(v: any, oldV: any): void {
    if (v && v !== oldV) {
      this._buffer();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  @Event() bufferComplete: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

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
            value={this.distance ? this.distance.toString() : undefined}
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

  //--------------------------------------------------------------------------
  //
  //  Functions (private)
  //
  //--------------------------------------------------------------------------

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
      let selected = true;
      if (!this.unit) {
        this.unit = u as __esri.LinearUnits;
      } else if (this.unit !== u) {
        selected = false;
      }
      return (<calcite-option label={units[u]} selected={selected} value={u} />);
    });
  }

  _setDistance(
    event: CustomEvent
  ): void {
    this.distance = event.detail.value;
    if (this.distance > 0) {
      this._buffer();
    } else {
      this.bufferComplete.emit(undefined);
    }
  }

  _setUnit(): void {
    this.unit = this._unitDiv.value as __esri.LinearUnits;
    this._buffer();
  }

  _buffer(): void {
    if (this.bufferTimeout) {
      clearTimeout(this.bufferTimeout);
    }

    this.bufferTimeout = setTimeout(async () => {
      // needs to be wgs 84 or Web Mercator
      if (this.geometries?.length > 0 && this.unit && this.distance > 0) {
        const buffer = this.geometryEngine.geodesicBuffer(
          this.geometries,
          this.distance,
          this.unit,
          this.unionResults
        );
        this.bufferComplete.emit(buffer);
      }
    }, 400);
  }
}
