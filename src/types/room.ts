import { Reference } from "./reference";

export interface RoomConfig {
  id: string;
  id_v1: string;
  children: Reference[];
  services: Reference[];
  metadata: RoomMetadata;
  type: "room";
}

export interface RoomMetadata {
  name: string;
  archetype: string;
}
