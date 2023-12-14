export type InstantAppsSocialShareMessages = {
  share: Share;
  embed: Embed;
  info: Info;
  success: Success;
  options: Options;
};

export type Embed = {
  label: string;
  copy: string;
  width: string;
  height: string;
};

export type Info = {
  label: string;
  tooltip: string;
};

export type Options = {
  link: Info;
  facebook: Info;
  twitter: Info;
  linkedIn: Info;
};

export type Share = {
  label: string;
};

export type Success = {
  label: string;
  url: string;
  embed: string;
};
