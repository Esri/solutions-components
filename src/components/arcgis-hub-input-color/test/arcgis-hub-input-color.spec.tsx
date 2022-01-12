import { newSpecPage } from '@stencil/core/testing';
import { ArcgisHubInputColor } from '../arcgis-hub-input-color';

const mockEvent = (detail?: unknown) => {
  return {
    stopPropagation: jest.fn(),
    detail
  };
};

describe('arcgis-hub-input-color', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ArcgisHubInputColor],
      html: `<arcgis-hub-input-color placeholder="select a color" value="#ab67ef"></arcgis-hub-input-color>`,
    });
    expect(page.root).toEqualHtml(`
      <arcgis-hub-input-color placeholder="select a color" value="#ab67ef" style="--swatch-color: #ab67ef;">
        <mock:shadow-root>
          <calcite-popover-manager>
            <calcite-input value="#ab67ef" placeholder="select a color" status="valid">
              <calcite-button appearance="outline" id="color-picker-toggle-button" slot="action">
                <div class="swatch">
                  <span class="color-picker-toggle-button-label">
                    arcgis-hub-input-color.colorPickerToggleButtonLabel
                  </span>
                </div>
              </calcite-button>
            </calcite-input>
            <calcite-popover disablepointer="" label=arcgis-hub-input-color.popoverLabel placement="auto" referenceelement="color-picker-toggle-button">
              <calcite-color-picker allowempty="" format="hex" value="#ab67ef" scale="m"></calcite-color-picker>
              <calcite-button>
                arcgis-hub-input-color.colorPickerDoneButtonLabel
              </calcite-button>
            </calcite-popover>
        </calcite-popover-manager>
          </mock:shadow-root>
      </arcgis-hub-input-color>
    `);
  });

  it('renders disabled', async () => {
    const page = await newSpecPage({
      components: [ArcgisHubInputColor],
      html: `<arcgis-hub-input-color placeholder="select a color" value="#ab67ef" disabled></arcgis-hub-input-color>`,
    });
    expect(page.root).toEqualHtml(`
      <arcgis-hub-input-color disabled="" placeholder="select a color" value="#ab67ef" style="--swatch-color: #ab67ef;">
        <mock:shadow-root>
          <calcite-popover-manager>
            <calcite-input disabled="" value="#ab67ef" placeholder="select a color" status="valid">
              <calcite-button disabled="" appearance="outline" id="color-picker-toggle-button" slot="action">
                <div class="swatch">
                  <span class="color-picker-toggle-button-label">
                    arcgis-hub-input-color.colorPickerToggleButtonLabel
                  </span>
                </div>
              </calcite-button>
            </calcite-input>
            <calcite-popover disablepointer="" label=arcgis-hub-input-color.popoverLabel placement="auto" referenceelement="color-picker-toggle-button">
              <calcite-color-picker allowempty="" format="hex" value="#ab67ef" scale="m"></calcite-color-picker>
              <calcite-button>
                arcgis-hub-input-color.colorPickerDoneButtonLabel
              </calcite-button>
            </calcite-popover>
        </calcite-popover-manager>
          </mock:shadow-root>
      </arcgis-hub-input-color>
    `);
  });

  it('renders with no value', async () => {
    const page = await newSpecPage({
      components: [ArcgisHubInputColor],
      html: `<arcgis-hub-input-color placeholder="select a color"></arcgis-hub-input-color>`,
    });
    expect(page.root).toEqualHtml(`
      <arcgis-hub-input-color placeholder="select a color">
        <mock:shadow-root>
          <calcite-popover-manager>
            <calcite-input placeholder="select a color" status="valid">
              <calcite-button appearance="outline" id="color-picker-toggle-button" slot="action">
                <div class="no-color swatch">
                  <span class="color-picker-toggle-button-label">
                    arcgis-hub-input-color.colorPickerToggleButtonLabel
                  </span>
                </div>
              </calcite-button>
            </calcite-input>
            <calcite-popover disablepointer="" label=arcgis-hub-input-color.popoverLabel placement="auto" referenceelement="color-picker-toggle-button">
              <calcite-color-picker allowempty="" format="hex" scale="m"></calcite-color-picker>
              <calcite-button>
                arcgis-hub-input-color.colorPickerDoneButtonLabel
              </calcite-button>
            </calcite-popover>
        </calcite-popover-manager>
          </mock:shadow-root>
      </arcgis-hub-input-color>
    `);
  });

  it('handles handleColorPickerChange', async () => {
    const component = new ArcgisHubInputColor();
    const value = '#abc123';
    await component.componentWillLoad();

    component.colorPickerEl = { value };

    // the event our component raises
    const arcgisHubInputColorChangeSpy = jest.spyOn(component.arcgisHubInputColorChange, 'emit').mockReturnValue(null);
    const elementStyleSetPropertySpy = jest.spyOn(component.element.style, 'setProperty').mockReturnValue(null);

    // the event that our component catches
    const calciteColorPickerChange = mockEvent();
    component.handleColorPickerChange(calciteColorPickerChange as unknown as Event);

    expect(calciteColorPickerChange.stopPropagation).toHaveBeenCalledTimes(1);
    expect(arcgisHubInputColorChangeSpy).toHaveBeenCalledTimes(1);
    expect(arcgisHubInputColorChangeSpy).toHaveBeenCalledWith({ valid: true, value });

    expect(elementStyleSetPropertySpy).toHaveBeenCalledWith('--swatch-color', value);
    expect(component._colorPickerColor).toEqual(value);
    expect(component.status).toEqual('valid');
  });

  it('handles handleInputInput', async () => {
    const component = new ArcgisHubInputColor();
    const value = '#abc123';
    await component.componentWillLoad();

    // the event our component raises
    const arcgisHubInputColorChangeSpy = jest.spyOn(component.arcgisHubInputColorChange, 'emit').mockReturnValue(null);
    const elementStyleSetPropertySpy = jest.spyOn(component.element.style, 'setProperty').mockReturnValue(null);

    // the event that our component catches
    const calciteInputInput = mockEvent({ value });
    component.handleInputInput(calciteInputInput as unknown as CustomEvent);

    expect(calciteInputInput.stopPropagation).toHaveBeenCalledTimes(1);
    expect(arcgisHubInputColorChangeSpy).toHaveBeenCalledTimes(1);
    expect(arcgisHubInputColorChangeSpy).toHaveBeenCalledWith({ valid: true, value });

    expect(elementStyleSetPropertySpy).toHaveBeenCalledWith('--swatch-color', value);
    expect(component._colorPickerColor).toEqual(value);
    expect(component.status).toEqual('valid');
  });

  it('handles handleInputInput with invalid input', async () => {
    const component = new ArcgisHubInputColor();
    const value = '#foobar';
    await component.componentWillLoad();

    // the event our component raises
    const arcgisHubInputColorChangeSpy = jest.spyOn(component.arcgisHubInputColorChange, 'emit').mockReturnValue(null);
    const elementStyleSetPropertySpy = jest.spyOn(component.element.style, 'setProperty').mockReturnValue(null);

    // the event that our component catches
    const calciteInputInput = mockEvent({ value });
    component.handleInputInput(calciteInputInput as unknown as CustomEvent);

    expect(calciteInputInput.stopPropagation).toHaveBeenCalledTimes(1);
    expect(arcgisHubInputColorChangeSpy).toHaveBeenCalledTimes(1);
    expect(arcgisHubInputColorChangeSpy).toHaveBeenCalledWith({ valid: false });

    expect(elementStyleSetPropertySpy).not.toHaveBeenCalled();
    expect(component._colorPickerColor).not.toEqual(value);
    expect(component.status).toEqual('invalid');
  });

  it('validates valid color', async () => {
    const component = new ArcgisHubInputColor();
    const value = '#abc123';
    await component.componentWillLoad();
    const result = component.validate(value);

    expect(result).toMatchObject({ valid: true });
  });

  it('validates empty value when required is false', async () => {
    const component = new ArcgisHubInputColor();
    const value = '';
    component.required = false;
    await component.componentWillLoad();
    const result = component.validate(value);

    expect(result).toMatchObject({ valid: true });
  });

  it('validates empty value when required is true', async () => {
    const component = new ArcgisHubInputColor();
    const value = '';
    component.required = true;
    await component.componentWillLoad();
    const result = component.validate(value);

    expect(result).toMatchObject({ valid: false });
    expect(result.errors[0]).toMatchObject({
      dataPath: '.color',
      keyword: 'format',
      message: 'should match format "hex-color"',
      params: { format: 'hex-color' },
      schemaPath: '#/properties/color/format'
    });
  });

  it('setColor with a valid value', async () => {
    const component = new ArcgisHubInputColor();
    const value = '#abc123';
    await component.componentWillLoad();

    const validateSpy = jest.spyOn(component, 'validate').mockReturnValue({ valid: true });
    const elementStyleSetPropertySpy = jest.spyOn(component.element.style, 'setProperty').mockReturnValue(null);

    component.setColor(value);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(value);

    expect(elementStyleSetPropertySpy).toHaveBeenCalledTimes(1);
    expect(elementStyleSetPropertySpy).toHaveBeenCalledWith('--swatch-color', value);

    expect(component._colorPickerColor).toEqual(value);
    expect(component.status).toEqual('valid');
  });

  it('setColor with an invalid value works', async () => {
    const component = new ArcgisHubInputColor();
    const value = '#foobar';
    await component.componentWillLoad();

    const validateSpy = jest.spyOn(component, 'validate').mockReturnValue({ valid: false, errors: [] });
    const elementStyleSetPropertySpy = jest.spyOn(component.element.style, 'setProperty').mockReturnValue(null);

    component.setColor(value);

    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(validateSpy).toHaveBeenCalledWith(value);

    expect(elementStyleSetPropertySpy).not.toHaveBeenCalled();

    expect(component._colorPickerColor).not.toEqual(value);
    expect(component.status).toEqual('invalid');
  });
});
