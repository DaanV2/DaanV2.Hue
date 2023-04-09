import { Reference } from "./reference";

export interface BridgeHomeConfig {
  id: string;
  id_v1: string;
  children: Reference[];
  services: Reference[];
  type: "bridge_home";
}

export namespace BridgeHomeConfig {
  export function is_cheap(value: any | BridgeHomeConfig): value is BridgeHomeConfig {
    return value.type === "bridge_home";
  }
}
