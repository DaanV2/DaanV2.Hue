import { Reference } from "./reference";

export interface BridgeSimpleConfig {
  id: string;
  owner: Reference;
  bridge_id: string;
  time_zone: {
    time_zone: string;
  };
  type: "bridge";
}

export namespace BridgeSimpleConfig {
  export function is_cheap(value: any | BridgeSimpleConfig): value is BridgeSimpleConfig {
    return value.type === "bridge";
  }
}
