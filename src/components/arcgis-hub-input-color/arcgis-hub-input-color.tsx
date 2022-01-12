import { Component, Element, h, Prop, State, EventEmitter, Event, Watch } from '@stencil/core';
import { HTMLCalcitePopoverElement, HTMLCalciteColorPickerElement } from '@esri/calcite-components/dist';
import { Status } from '@esri/calcite-components/dist/types/components/interfaces';
import { CSS } from "./resources";
import Bind from '../../decorators/bind';
import Ajv from 'ajv';
import { ComponentIntl } from '../../utils/stencil-intl'
import intlManager from '../../utils/intl-manager';

export interface IChangeEventDetail {
  value?: string,
  valid: boolean,
}

/*
  NOTE: Down the line, this may be able to be replaced with calcite-components
  see:
    - https://github.com/Esri/calcite-components/issues/1934
    - https://github.com/Esri/calcite-components/issues/1616
*/

/*
  NOTE: there are issues using popover/colorpicker in shadow dom (ie with shadow: true on this component) as we are doing
  and this has informed the design/structure of this component
    with shadow: true:
      - the popover won't open automatically
        - so we are just doing it manually
      - auto-close causes the popover to close whenever you click *inside* the popover
        - so we have turned off auto-close and are using the done button
      - the colorpicker events do not have the new color value (i haven't verified that this one is related to shadow dom)
        - so we get it from the color picker
*/

@Component({
  tag: 'arcgis-hub-input-color',
  styleUrl: 'arcgis-hub-input-color.css',
  assetsDirs: ['locales'],
  shadow: true
})
export class ArcgisHubInputColor {
  @Element() element: HTMLElement;

  popoverEl: HTMLCalcitePopoverElement;

  colorPickerEl: HTMLCalciteColorPickerElement;

  validator: Ajv.ValidateFunction;

  intl: ComponentIntl;

  /**
   * The color
   */
  @Prop({ mutable: true, reflect: true }) value: string;

  /**
   * A boolean value indicating whether the control is disabled
   */
  @Prop() disabled = false;

  /**
   * A boolean value indicating whether the control should consider empty values valid
   */
  @Prop() required = false;

  @Prop() placeholder: string;

  @State() status: Status = 'idle';

  @State() _colorPickerColor: string;

  /**
   * This custom event is emitted when the color is changed.
   */
  @Event() arcgisHubInputColorChange: EventEmitter<IChangeEventDetail>;

  /**
   * Property watchers
   */

  @Watch('value')
  handleValueChanged (value) {
    this.setColor(value);
  }

  /**
   * Event handling
   */

  @Bind()
  togglePopover () {
    if (this.popoverEl) {
      this.popoverEl.toggle();
    }
  }

  @Bind()
  handleColorPickerChange (event: Event) {
    event.stopPropagation();

    const newColor = this.colorPickerEl.value ?? '';
    if (newColor === this.value) { return; }

    const validationResult = this.setColor(newColor);
    this.emitChangeEvent(newColor, validationResult);
  }

  @Bind()
  handleInputInput (event: CustomEvent) {
    event.stopPropagation();

    const newColor = event.detail.value ?? '';

    const validationResult = this.setColor(newColor);
    this.emitChangeEvent(newColor, validationResult);
  }

  /**
   * Hooks
   */

  async componentWillLoad () {
    this.intl = await intlManager.loadIntlForComponent(this.element);

    const ajv = new Ajv({ allErrors: true });
    const regexp = this.required
      ? /^#(?:[0-9a-fA-F]{6})$/ // required regex
      : /^$|^#(?:[0-9a-fA-F]{6})$/; // not required regex also matches empty string
    ajv.addFormat('hex-color', regexp);

    const schema = {
      type: 'object',
      properties: {
        color: {
          type: 'string',
          format: 'hex-color'
        }
      }
    };
    this.validator = ajv.compile(schema);

    this.setColor(this.value);
  }

  /**
   * Functions
   */

  validate (color = '') {
    const valid = this.validator({ color });
    return valid ? { valid } : { valid, errors: this.validator.errors };
  }

  emitChangeEvent (value, validationResult) {
    if (this.disabled) {
      return;
    }

    const { valid } = validationResult;
    const detail: IChangeEventDetail = { valid };

    if (valid) {
      detail.value = value
    }

    this.arcgisHubInputColorChange.emit(detail);
  }

  setColor (color) {
    const validationResult = this.validate(color);
    const { valid } = validationResult;
    this.value = color;

    if (valid) {
      // we only set the swatch and the colorpicker color if it is valid
      this.element.style.setProperty(CSS.swatchProp, color);
      this._colorPickerColor = color;
    }

    this.status = valid ? 'valid' : 'invalid';
    return validationResult;
  }

  @Bind()
  setPopoverEl (el) {
    this.popoverEl = el;
  }

  @Bind()
  setColorPickerEl (el) {
    this.colorPickerEl = el;
  }

  render () {
    return (
      <calcite-popover-manager>
        <calcite-input
          disabled={this.disabled}
          onCalciteInputInput={this.handleInputInput}
          placeholder={this.placeholder}
          status={this.status}
          value={this.value}
        >
          <calcite-button
            appearance="outline"
            disabled={this.disabled}
            id="color-picker-toggle-button"
            onClick={this.togglePopover}
            slot="action"
          >
            <div
              class={{
                [CSS.swatch]: true,
                [CSS.noColor]: !this.value
              }}
            >
              &nbsp;
              <span class={CSS.toggleButtonLabel}>{this.intl.t('colorPickerToggleButtonLabel')}</span>
            </div>
          </calcite-button>
        </calcite-input>
        <calcite-popover
          disablePointer={true}
          label={this.intl.t('popoverLabel')}
          placement="auto"
          ref={this.setPopoverEl}
          referenceElement="color-picker-toggle-button"
        >
          <calcite-color-picker
            allowEmpty={!this.required}
            format="hex"
            onCalciteColorPickerChange={this.handleColorPickerChange}
            ref={this.setColorPickerEl}
            scale="m"
            value={this._colorPickerColor}
          />
          <calcite-button onClick={this.togglePopover}>{this.intl.t('colorPickerDoneButtonLabel')}</calcite-button>
        </calcite-popover>
      </calcite-popover-manager>
    );
  }
}
