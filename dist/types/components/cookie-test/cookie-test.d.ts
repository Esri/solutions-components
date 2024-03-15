/// <reference types="arcgis-js-api" />
import { Telemetry } from "@esri/telemetry";
export declare class CookieTest {
    measurementIds: string[];
    portal: __esri.Portal;
    _telemetryInstance: Telemetry;
    _loaded: boolean;
    getInstance(): Promise<void>;
    render(): any;
    _init(): Promise<void>;
}
