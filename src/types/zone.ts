import { Reference } from "./reference";

export interface ZoneConfig {
  id: string;
  id_v1: string;
  children: Reference[];
  services: Reference[];
  metadata: {
    name: string;
    archetype: string;
  };
  type: "zone";
}

export namespace ZoneConfig {
  export function is_cheap(value: any | ZoneConfig): value is ZoneConfig {
    return value.type === "zone";
  }
}
