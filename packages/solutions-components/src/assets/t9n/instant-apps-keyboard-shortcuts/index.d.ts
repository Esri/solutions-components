export type InstantAppsKeyboardShortcutsMessages = {
  mapShortcuts: MapShortcuts;
  sceneShortcuts: SceneShortcuts;
  generalShortcuts: GeneralShortcuts;
};

export type GeneralShortcuts = {
  menu: string;
  shortcut: string;
  action: string;
  title: string;
  label: string;
};

export type MapShortcuts = {
  arrowKeys: string;
  nudge: string;
  N: string;
  A: string;
  D: string;
  plus: string;
  minus: string;
};

export type SceneShortcuts = {
  P: string;
  N: string;
  W: string;
  A: string;
  D: string;
  S: string;
  globalCommands: GlobalCommands;
};

export type GlobalCommands = {
  J: string;
  U: string;
};
