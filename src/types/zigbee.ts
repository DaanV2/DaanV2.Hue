import { Reference } from "./reference";

export interface ZigbeeConnectivity {
  id: string;
  id_v1: string;
  owner: Reference;
  status: "connected" | "connectivity_issue";
  mac_address: string;
  type: "zigbee_connectivity";
}
