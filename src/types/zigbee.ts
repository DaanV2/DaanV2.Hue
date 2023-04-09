import { Reference } from "./reference";

export interface ZigbeeConnectivity {
  id: string;
  id_v1: string;
  owner: Reference;
  status: "connected" | "connectivity_issue";
  mac_address: string;
  type: "zigbee_connectivity";
}

export namespace ZigbeeConnectivity {
  export function is_cheap(value: any | ZigbeeConnectivity): value is ZigbeeConnectivity {
    return value.type === "zigbee_connectivity";
  }
}
