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

export interface ColorTemperature {
  mirek: number;
  mirek_valid: boolean;
  mirek_schema: {
    mirek_minimum: number;
    mirek_maximum: number;
  };
}

export interface ColorConfig {
  xy: {
    x: number;
    y: number;
  };
  gamut_type: "C" | "A" | "B";
  gamut: {
    red: {
      x: number;
      y: number;
    };
    green: {
      x: number;
      y: number;
    };
    blue: {
      x: number;
      y: number;
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
