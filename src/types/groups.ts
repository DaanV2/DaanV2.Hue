import { DimmingState } from "../colors/dimming";
import { ColorConfig, ColorTemperature } from "./lights";
import { Reference } from "./reference";
import { OnState } from "./states";

export type GroupConfigMap = { [id: string]: GroupConfig };

export interface GroupConfig {
  id: string;
  id_v1: string;
  owner: Reference;
  on: OnState;
  dimming: DimmingState;
  dimming_delta: {};
  color_temperature: {} | ColorTemperature;
  color_temperature_delta: {};
  color: {} | ColorConfig;
  alert: {
    action_values: string[];
  };
  signaling: {
    signal_values: string[];
  };
  dynamics: {};
  type: "grouped_light";
}
