export type GroupConfigMap = { [id: string]: GroupConfig };

export interface GroupConfig {
    name: string;
    /**The ids of lamps in this group */
    lights: string[];
    /**The ids of sensors in this group */
    sensors: string[];
    type: "Room" | "Zone" | "LightGroup";
    state: {
        all_on: boolean;
        any_on: boolean;
    };

    recycle: boolean;
    class: string;
    action: GroupConfigAction;
}

export interface GroupConfigAction {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    effect: "none" | "colorloop";
    xy: [number, number];
    ct: number;
    alert: "none" | "select" | "lselect";
    colormode: "hs" | "xy" | "ct";
}
