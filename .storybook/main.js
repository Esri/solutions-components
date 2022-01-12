module.exports = {
  stories: [
    "../src/**/*.stories.@(mdx|ts|tsx)",
    "../doc/**/*.stories.mdx"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@pxtrn/storybook-addon-docs-stencil",
    //"@storybook/addon-controls", // recommended replacement for @storybook/addon-knobs
    "./addons/theme/register",
    "@storybook/addon-a11y",
    "@storybook/addon-knobs" // we don't use knobs but calcite-components does
  ],
  refs: {
    calciteComponents: {
      title: "Calcite Components",
      url: "https://esri.github.io/calcite-components"
    },
  },
}