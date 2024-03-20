import { APIVersion } from "./types";
export declare const languageMap: Map<string, string>;
export declare function getElementDir(el: HTMLElement): "ltr" | "rtl";
export declare const CSS_UTILITY: {
    readonly rtl: "arcgis--rtl";
};
export declare function formatNumber(number: number, options?: {
    api: APIVersion;
    type: "decimal" | "percent";
    places: number;
}): Promise<string>;
