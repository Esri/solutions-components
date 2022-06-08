import { ILoadScriptOptions, loadModules as _loadModules } from "esri-loader";

export const loadModules = async (moduleNames: string[], options?: ILoadScriptOptions): Promise<any> => {
  const mods = await _loadModules(moduleNames, options);
  return mods.map((mod) => (mod.__esModule && mod.default ? mod.default : mod));
};
