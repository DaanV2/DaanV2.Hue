export interface StateChangeSuccess {
    success: {
        [route: string]: boolean;
    };
}

export namespace StateChangeSuccess {
    export function forEach(success: StateChangeSuccess, callback: (route: string, value: boolean) => void) {
        for (const route in success.success) {
            callback(route, success.success[route]);
        }
    }

    export function getLight(success: StateChangeSuccess, lightId: string) {
        return success.success[`/lights/${lightId}/state/on`] !== undefined;
    }
}

export interface LightBaseStateRequest {
    /** The on/off state of the light. On=true, Off=false */
    on?: boolean;
    /** The brightness of the light. This is a scale from the minimum brightness the light is capable of, 1, to the maximum capable brightness, 254. */
    bri?: number;
}

export interface LightStateHueRequest extends LightBaseStateRequest {
    /** The saturation or itensity of the colors */
    sat?: number;
    /** The hue value to set light to. This is a wrapping value between 0 and 65535. Both 0 and 65535 are red, 25500 is green and 46920 is blue. */
    hue?: number;
}

export interface LightStateXYRequest extends LightBaseStateRequest {
    /** The x and y coordinates of a color in CIE color space */
    xy?: [number, number];
}

export interface LightStateCTRequest extends LightBaseStateRequest {
    /** The Mired Color temperature of the light. 2012 connected lights are capable of 153 (6500K) to 500 (2000K) */
    ct?: number;
}

export type LightStateRequest = LightStateHueRequest | LightStateXYRequest | LightStateCTRequest;
