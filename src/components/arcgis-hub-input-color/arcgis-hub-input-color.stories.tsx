export default {
  title: 'Components/ArcgisHubInputColor',
  component: 'arcgis-hub-input-color',
  parameters: {
    actions: {
      handles: ['arcgisHubInputColorChange', 'calciteColorPickerChange', 'calciteInputInput'], // i expect it to never catch calciteColorPickerChange or calciteInputInput... just checking
    },
    a11y: {
      // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
      config: {
        rules: [
          {
            id: 'label',
            // selector: '*:not(arcgis-hub-input-color#color-picker-inputinput)',
            enabled: false // we expect consumers to supply a label
          }
        ]
      }
    }
  },
  decorators: [
    Story => `<div style="width: 40%; min-width: 200px; margin: 20px auto;">${Story()}</div>`
  ]
};

const defaultArgs = {
  value: '#24d4c4',
  required: true,
  disabled: false,
  placeholder: 'select a color'
};

export const Default = args => `
  <arcgis-hub-input-color
    value="${args.value}"
    required="${args.allowEmpty}"
    disabled="${args.disabled}"
    placeholder="${args.placeholder}"
  ></arcgis-hub-input-color>
`;

Default.args = { ...defaultArgs };
Default.storyName = 'ArcgisHubInputColor';
