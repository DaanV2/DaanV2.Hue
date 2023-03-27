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
