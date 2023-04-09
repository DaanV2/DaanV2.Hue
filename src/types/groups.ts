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

export interface ServicesContainer {
  services: Reference[];
}

export namespace GroupConfig {
  export function getGroupConfig(container: ServicesContainer): Reference | undefined {
    return container.services.find((s) => s.rtype === "grouped_light");
  }

  export function hasGroup(container: ServicesContainer, group: Reference): boolean {
    return container.services.some((s) => s.rid === group.rid);
  }
}
