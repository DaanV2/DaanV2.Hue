import { ColorConfig, ColorTemperature } from "./color";
import { Reference } from "./reference";
import { OnState } from "./states";

export interface LightConfig {
  id: string;
  id_v1: string;
  owner: Reference;
  type: "light";
  metadata: {
    name: string;
    archetype: string;
  };
  on: OnState;
  dimming: {
    brightness: number;
    min_dim_level: number;
  };
  dimming_delta: {};
  color_temperature: ColorTemperature;
  color_temperature_delta: {};
  color: ColorConfig;
  dynamics: {
    status: "none" | "dynamic_palette";
    status_values: ("none" | "dynamic_palette")[];
    speed: number;
    speed_valid: boolean;
  };
  alert: {
    action_values: "breathe"[];
  };
  signaling: {
    signal_values: ("no_signal" | "on_off")[];
  };
  mode: "normal";
  effects: {
    status_values: ("no_effect" | "candle" | "fire")[];
    status: "no_effect" | "candle" | "fire";
    effect_values: ("no_effect" | "candle" | "fire")[];
  };
  powerup: {
    preset: "safety";
    configured: boolean;
    on: {
      mode: "on";
      on: {
        on: boolean;
      };
    };
    dimming: {
      mode: "dimming";
      dimming: {
        brightness: number;
      };
    };
    color: {
      mode: "color_temperature";
      color_temperature: {
        mirek: number;
      };
    };
  };
}

export interface LightLevelConfig {
  id: string;
  id_v1: string;
  owner: Reference;
  enabled: boolean;
  light: {
    light_level: number;
    light_level_valid: boolean;
    light_level_report: {
      changed: string;
      light_level: number;
    };
  };
  type: "light_level";
}

export namespace LightConfig {
  export function is_cheap(value: any | LightConfig): value is LightConfig {
    return value.type === "light";
  }
}
