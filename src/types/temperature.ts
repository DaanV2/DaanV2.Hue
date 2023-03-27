import { Reference } from "./reference";

export interface TemperatureConfig {
  id: string;
  id_v1: string;
  owner: Reference;
  enabled: boolean;
  temperature: {
    temperature: number;
    temperature_valid: boolean;
    temperature_report: {
      changed: string;
      temperature: number;
    };
  };
  type: "temperature";
}
