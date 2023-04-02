import { Reference } from "./reference";

export interface DeviceConfig {
  id: string;
  id_v1: string;
  product_data: ProductConfig;
  metadata: {
    name: string;
    archetype: string;
  };
  identify: {};
  services: Reference[];
  type: "device";
}

export interface ProductConfig {
  model_id: string;
  manufacturer_name: string;
  product_name: string;
  product_archetype: string;
  certified: boolean;
  software_version: string;
  hardware_platform_type: string;
}

export interface DevicePowerConfig {
  id: string;
  id_v1: string;
  owner: Reference;
  power_state: {
    battery_state: string;
    battery_level: number;
  };
  type: "device_power";
}
