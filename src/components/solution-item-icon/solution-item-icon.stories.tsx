export default {
  title: 'Components/SolutionItemIcon',
  component: 'solution-item-icon',
};

const defaultArgs = {
  value: "Cyd"
};

export const Default = args => `
  <i>${args.value}</i>
`;

Default.args = { ...defaultArgs };
Default.storyName = 'SolutionItemIcon';
