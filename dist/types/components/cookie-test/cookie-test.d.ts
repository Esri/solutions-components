/// <reference types="arcgis-js-api" />
import { EventEmitter } from '../../stencil-public-runtime';
import { Telemetry } from "@esri/telemetry";
export interface IConsentResponse {
    granted: boolean;
    instance?: Telemetry;
    messages?: string[];
}
export declare class CookieTest {
    firstUseVar: string;
    measurementIds: string[];
    portal: __esri.Portal;
    _telemetryInstance: Telemetry;
    _loaded: boolean;
    _consentGranted: boolean;
    _shouldRender: boolean;
    consentGranted: EventEmitter<IConsentResponse>;
    getInstance(): Promise<Telemetry | undefined>;
    componentWillLoad(): Promise<void>;
    render(): any;
    _init(): Promise<void>;
    _accept(): void;
    _refuse(): void;
}
