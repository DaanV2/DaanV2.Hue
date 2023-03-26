import { UpdateState } from "./update";

export type LightConfigMap = { [lightId: string]: LightConfig };

export interface LightConfig {
    /** The type of the light. */
    capabilities: LightCapabilities;
    config: LightConfig;
    manufacturername: string;
    modelid: string;
    name: string;
    productid: string;
    productname: string;
    state: LightState;
    swconfigid: string;
    swupdate: UpdateState;
    swversion: string;
    type: string;
    uniqueid: string;
}

export interface LightCapabilities {
    certified: boolean;
    control: LightControlCapabilities;
}

export interface LightControlCapabilities {
    mindimlevel: number;
    maxlumen: number;
    colorgamuttype: "C";
    colorgamut: [[number, number], [number, number], [number, number]];
    ct: {
        min: number;
        max: number;
    };
    streaming: {
        renderer: boolean;
        proxy: boolean;
    };
}

export interface LightConfig {
    archetype: string;
    function: "mixed" | "functional" | "decorative";
    direction: "omnidirectional" | "downwards" | "upwards" | "horizontal" | "vertical";
    startup: LightConfigStartup;
}

export interface LightConfigStartup {
    mode: "powerfail" | "safety" | "lastonstate";
    configured: boolean;
}

export interface LightState {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    effect: "none" | string;
    xy: [number, number];
    ct: number;
    alert: "select";
    colormode: "hs" | "ct" | "xy";
    mode: "homeautomation";
    reachable: boolean;
}
