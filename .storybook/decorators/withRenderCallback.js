import addons from "@storybook/addons";
import { STORY_RENDERED } from "@storybook/core-events"

export const withRenderCallback = (selector, callback) => {
  return (Story, context) => {
    const { args } = context;
    addons.getChannel().once(STORY_RENDERED, () => {
      callback(document.querySelector(selector), { args });
    });
    return Story();
  };
};