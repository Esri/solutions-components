import type { Components, JSX } from "../types/components";

interface ConfigLayerPicker extends Components.ConfigLayerPicker, HTMLElement {}
export const ConfigLayerPicker: {
  prototype: ConfigLayerPicker;
  new (): ConfigLayerPicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
