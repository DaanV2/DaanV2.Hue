import { LightStateCTRequest, LightStateRequest } from "../messages/lights";
import { Reference } from "./reference";

export interface SceneConfig {
  id: string;
  id_v1: string;
  actions: SceneAction[];
  recall: {};
  metadata: {
    name: string;
    image: Reference;
  };
  group: Reference;
  palette: {
    color: any[];
    dimming: any[];
    color_temperature: LightStateCTRequest[];
  };
  speed: number;
  auto_dynamic: boolean;
  status: {
    active: string;
  };
  type: "scene";
}

export interface SceneAction {
  target: Reference;
  action: LightStateRequest;
}
