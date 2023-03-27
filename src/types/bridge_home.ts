import { Reference } from "./reference";

export interface BridgeHomeConfig {
  id: string;
  id_v1: string;
  children: Reference[];
  services: Reference[];
  type: "bridge_home";
}
