import { OnState } from "../types/states";

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
  on?: OnState;
  /** The brightness value to set light to. Brightness is a scale from the minimum brightness the light is capable of, 1, to the maximum capable brightness of 100 */
  dimming?: { brightness: number };
}

export interface LightStateXYRequest extends LightBaseStateRequest {
  /** The x and y coordinates of a color in CIE color space */
  color: { xy: { x: number; y: number } };
}

export interface LightStateCTRequest extends LightBaseStateRequest {
  /** The Mired Color temperature of the light. from 153 (6500K) to 500 (2000K) */
  color_temperature: { mirek: number };
}

export type LightStateRequest = LightStateXYRequest | LightStateCTRequest;
